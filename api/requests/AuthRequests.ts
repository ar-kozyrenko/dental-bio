import { APIRequestContext, APIResponse } from '@playwright/test'
import { SendOtpData, VerifyOtpData } from '../../types/SignUp/RegistrationData'

const BASE_URL = 'https://dental.bio/api'
const APP_URL = 'https://dental.bio'

export class AuthRequests {
    constructor(private request: APIRequestContext) {}

    private extractCookies(response: APIResponse): string {
        const rawCookies = response.headers()['set-cookie'] ?? ''
        return rawCookies
            .split('\n')
            .map((c) => c.split(';')[0].trim())
            .filter(Boolean)
            .join('; ')
    }

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
        const cookies = this.extractCookies(verifyOtpResponse)

        return await this.request.post(`${BASE_URL}/user`, {
            headers: {
                'content-type': 'text/plain;charset=UTF-8',
                cookie: cookies,
            },
            data: { targetUserId: null },
        })
    }

    async deleteAccount(
        verifyOtpResponse: APIResponse,
        nextActionHash: string
    ): Promise<APIResponse> {
        const cookies = this.extractCookies(verifyOtpResponse)

        return await this.request.post(`${APP_URL}/dashboard/settings`, {
            headers: {
                'content-type': 'text/plain;charset=UTF-8',
                'next-action': nextActionHash,
                'next-router-state-tree':
                    '%5B%22%22%2C%7B%22children%22%3A%5B%22dashboard%22%2C%7B%22children%22%3A%5B%22settings%22%2C%7B%22children%22%3A%5B%22__PAGE__%22%2C%7B%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%5D%7D%2Cnull%2Cnull%2Ctrue%5D',
                cookie: cookies,
            },
            data: '[""]',
        })
    }
}
