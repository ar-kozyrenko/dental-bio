export interface SendOtpData {
    isResend: boolean
    email: string
    password: string
    username: string
    firstName: string
    lastName: string
    birthday: string | null
    position: string
    offerCode: string
    country: string
    title: string
    inviteUserName: string | null
    location: string
    domain: string
    brand: string
    vertical: string
}

export interface VerifyOtpData extends Omit<SendOtpData, 'isResend'> {
    otp: string
}
