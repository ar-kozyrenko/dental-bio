import {
    APIRequestContext,
    APIResponse,
    Browser,
    request,
} from '@playwright/test'
import { AuthRequests } from '../requests/AuthRequests'
import { EmailHelper } from './EmailHelper'
import { SignUpTestData } from '../../test-data/SignUpTestData'

const SESSION_FILE = 'session.json'

export class AccountLifecycle {
    private verifyOtpResponse!: APIResponse
    private apiContext!: APIRequestContext // собственный контекст
    private auth!: AuthRequests
    private email!: EmailHelper

    public userEmail!: string
    public username!: string
    public password!: string

    async setup(browser: Browser): Promise<void> {
        // Создаём собственный APIRequestContext — не зависит от fixture lifecycle
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
        const context = await browser.newContext()
        await context.addCookies(parsedCookies)
        await context.storageState({ path: SESSION_FILE })
        await context.close()

        console.log(`\n🟢 Account created: ${this.userEmail}`)
        console.log(`🔑 Password: ${this.password}`)
        console.log(`💾 Session saved to ${SESSION_FILE}`)
    }

    async teardown(nextActionHash: string): Promise<void> {
        if (!this.verifyOtpResponse) {
            throw new Error('Cannot delete account: setup() was not called')
        }

        // 1. Удалить аккаунт
        const deleteResponse = await this.auth.deleteAccount(
            this.verifyOtpResponse,
            nextActionHash
        )
        if (deleteResponse.status() !== 303) {
            throw new Error(`deleteAccount failed: ${deleteResponse.status()}`)
        }

        // 2. Убедиться что аккаунт удалён
        const userResponse = await this.auth.getUser(this.verifyOtpResponse)
        if (userResponse.status() !== 500) {
            throw new Error(
                `Account was not deleted. getUser returned: ${userResponse.status()}`
            )
        }

        // 3. Закрываем собственный APIRequestContext
        await this.apiContext.dispose()

        console.log(`\n🔴 Account deleted: ${this.userEmail}`)
    }
}
