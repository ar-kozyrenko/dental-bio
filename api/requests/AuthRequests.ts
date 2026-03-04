import { APIRequestContext, APIResponse } from '@playwright/test'
import { SendOtpData, VerifyOtpData } from '../../types/SignUp/RegistrationData'

const BASE_URL = 'https://dental.bio/api'

export class AuthRequests {
    constructor(private request: APIRequestContext) {}

    async sendOtp(data: SendOtpData): Promise<APIResponse> {
        return await this.request.post(`${BASE_URL}/register/send-otp`, {
            data,
        })
    }

    async verifyOtp(data: VerifyOtpData): Promise<APIResponse> {
        return await this.request.post(`${BASE_URL}/register/verify-otp`, {
            data,
        })
    }

    async getUser(verifyOtpResponse: APIResponse): Promise<APIResponse> {
        // Playwright объединяет set-cookie в одну строку через \n — берём только name=value части
        const rawCookies = verifyOtpResponse.headers()['set-cookie'] ?? ''
        const cookies = rawCookies
            .split('\n')
            .map((c) => c.split(';')[0].trim())
            .filter(Boolean)
            .join('; ')

        return await this.request.post(`${BASE_URL}/user`, {
            headers: {
                'content-type': 'text/plain;charset=UTF-8',
                cookie: cookies,
            },
            data: { targetUserId: null },
        })
    }
}
