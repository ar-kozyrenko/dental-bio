import { test } from '../../fixtures/baseFixture'
import { SignUpTestData } from '../../test-data/SignUpTestData'
import { expect } from '@playwright/test'

test.describe('Registration API', () => {
    test('should register user via API with OTP verification', async ({
        apiManager,
    }) => {
        // Шаг 1: Создаём временный инбокс
        const { email, sidToken } = await apiManager.email.createInbox()

        // Шаг 2: Отправляем форму регистрации → сервер шлёт OTP на email
        const sendOtpResponse = await apiManager.auth.sendOtp(
            SignUpTestData.createSendOtpData(email)
        )
        await expect(sendOtpResponse.status()).toBe(200)
        const sendOtpBody = await sendOtpResponse.json()
        await expect(sendOtpBody.message).toBe('OTP sent successfully.')

        // Шаг 3: Ждём письмо и извлекаем OTP
        const otp = await apiManager.email.getOtp(sidToken)
        await expect(otp).toMatch(/^\d{6}$/)

        // Шаг 4: Верифицируем OTP → завершаем регистрацию
        const verifyOtpResponse = await apiManager.auth.verifyOtp(
            SignUpTestData.createVerifyOtpData(email, otp)
        )
        await expect(verifyOtpResponse.status()).toBe(200)
        const verifyOtpBody = await verifyOtpResponse.json()
        await expect(verifyOtpBody.message).toContain(
            'User updated successfully'
        )
    })
})
