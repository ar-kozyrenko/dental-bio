import { test } from '../../fixtures/baseFixture'
import { SignUpTestData } from '../../test-data/SignUpTestData'
import { expect } from '@playwright/test'

test.describe('Registration API', () => {
    test('should register user via API with OTP verification', async ({
        apiManager,
    }) => {
        const { email, inboxId } =
            await test.step('Create temporary inbox', async () => {
                const inbox = await apiManager.email.createInbox()
                console.log(`\n📧 Registered email: ${inbox.email}`)
                return inbox
            })

        const sendOtpData = await test.step('Send OTP', async () => {
            const data = SignUpTestData.createSendOtpData(email)
            console.log(`🔑 Password: ${data.password}`)
            const response = await apiManager.auth.sendOtp(data)
            await expect(response.status()).toBe(200)
            const body = await response.json()
            await expect(body.message).toBe('OTP sent successfully.')
            return data
        })

        const otp = await test.step('Wait for OTP email', async () => {
            const code = await apiManager.email.getOtp(inboxId)
            await expect(code).toMatch(/^\d{6}$/)
            return code
        })

        const verifyOtpResponse = await test.step('Verify OTP', async () => {
            const { isResend, ...otpDataWithoutIsResend } = sendOtpData
            const response = await apiManager.auth.verifyOtp({
                ...otpDataWithoutIsResend,
                otp,
            })
            await expect(response.status()).toBe(200)
            const body = await response.json()
            await expect(body.message).toContain('User updated successfully')
            return response
        })

        await test.step('Verify user is registered via GET /api/user', async () => {
            const response = await apiManager.auth.getUser(verifyOtpResponse)
            await expect(response.status()).toBe(200)

            const user = await response.json()
            await expect(user.email).toBe(email)
            await expect(user.username).toBe(sendOtpData.username)
            await expect(user.first_name).toBe(sendOtpData.firstName)
            await expect(user.last_name).toBe(sendOtpData.lastName)
        })
        await test.step('Delete account', async () => {
            // хэш из перехваченного curl — временно захардкодим для проверки
            const NEXT_ACTION_HASH = '153ba030649f5c8c946390dfa0eb65b20631be6b'

            const response = await apiManager.auth.deleteAccount(
                verifyOtpResponse,
                NEXT_ACTION_HASH
            )

            await expect(response.status()).toBe(303)
        })

        await test.step('Verify account is deleted', async () => {
            const response = await apiManager.auth.getUser(verifyOtpResponse)
            await expect(response.status()).toBe(500)
        })
    })
})
