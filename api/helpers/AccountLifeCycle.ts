import {
    APIRequestContext,
    APIResponse,
    Browser,
    request,
} from '@playwright/test'
import { AuthRequests } from '../requests/AuthRequests'
import { EmailHelper } from './EmailHelper'
import { SignUpTestData } from '../../test-data/SignUpTestData'

//currently there is an issue with delete user in the app
//MailSlurp reached the free limit
//The methods are NOT relevant untill delete is fied and MailSlurp hasbeen unlocked

export const SESSION_FILE = 'session.json'
export class AccountLifecycle {
    private browser!: Browser
    private verifyOtpResponse!: APIResponse
    private apiContext!: APIRequestContext
    private auth!: AuthRequests
    private email!: EmailHelper

    public userEmail!: string
    public username!: string
    public password!: string

    // Creates a new account via OTP registration and saves the authenticated
    // browser session to a file for reuse across tests via storageState.
    async setup(browser: Browser): Promise<void> {
        this.browser = browser
        this.apiContext = await request.newContext()
        this.auth = new AuthRequests(this.apiContext)
        this.email = new EmailHelper()

        // 1. Создать временный inbox
        const { email, inboxId } = await this.email.createInbox()
        this.userEmail = email

        // 2. Отправить OTP
        const sendOtpData = SignUpTestData.createSendOtpData(email)
        this.username = sendOtpData.username
        this.password = sendOtpData.password

        const sendOtpResponse = await this.auth.sendOtp(sendOtpData)
        if (sendOtpResponse.status() !== 200) {
            throw new Error(`sendOtp failed: ${sendOtpResponse.status()}`)
        }

        // 3. Получить OTP из email
        const otp = await this.email.getOtp(inboxId)

        // 4. Verify OTP — получаем сессию
        const { isResend, ...otpDataWithoutIsResend } = sendOtpData
        this.verifyOtpResponse = await this.auth.verifyOtp({
            ...otpDataWithoutIsResend,
            otp,
        })
        if (this.verifyOtpResponse.status() !== 200) {
            throw new Error(
                `verifyOtp failed: ${this.verifyOtpResponse.status()}`
            )
        }

        // 5. Парсим cookies и сохраняем storageState
        const rawCookieString = AuthRequests.extractCookies(
            this.verifyOtpResponse
        )
        const parsedCookies = rawCookieString
            .split('; ')
            .map((cookie) => {
                const [name, ...rest] = cookie.split('=')
                return {
                    name,
                    value: rest.join('='),
                    domain: 'dental.bio',
                    path: '/',
                }
            })
            .filter((c) => c.name && c.value)

        // 6. Сохраняем сессию в файл
        const context = await this.browser.newContext()
        await context.addCookies(parsedCookies)
        await context.storageState({ path: SESSION_FILE })
        await context.close()

        console.log(`\n Account created: ${this.userEmail}`)
        console.log(`Password: ${this.password}`)
        console.log(`Username: ${this.username}`)
        console.log(`Session saved to ${SESSION_FILE}`)
    }

    // Deletes account via UI: navigates to settings, clicks Delete Bio → confirms in popup
    async deleteAccountViaUI(): Promise<void> {
        const context = await this.browser.newContext({
            storageState: SESSION_FILE,
        })
        const page = await context.newPage()

        await page.goto('https://dental.bio/dashboard/settings')
        await page.waitForLoadState('domcontentloaded')

        const deleteButton = page.getByRole('button', { name: 'Delete Bio' })
        await deleteButton.scrollIntoViewIfNeeded()
        await deleteButton.click()

        const confirmButton = page
            .getByRole('dialog')
            .getByRole('button', { name: 'Delete', exact: true })
        await confirmButton.waitFor({ state: 'visible' })
        const requestPromise = page.waitForRequest(
            (request) =>
                request.url().includes('/dashboard/settings') &&
                request.method() === 'POST'
        )
        await confirmButton.click()
        await requestPromise

        await context.close()
    }

    async teardown(): Promise<void> {
        if (!this.verifyOtpResponse) {
            throw new Error('Cannot delete account: setup() was not called')
        }

        // 1. Удаляем аккаунт через UI
        await this.deleteAccountViaUI()

        // 2. Убедиться что аккаунт удалён
        const userResponse = await this.auth.getUser(this.verifyOtpResponse)
        if (userResponse.status() !== 500) {
            throw new Error(
                `Account was not deleted. getUser returned: ${userResponse.status()}`
            )
        }

        // 3. Закрываем собственный API контекст
        await this.apiContext.dispose()

        console.log(`\n Account deleted: ${this.userEmail}`)
    }
}
