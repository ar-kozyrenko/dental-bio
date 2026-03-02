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
}
