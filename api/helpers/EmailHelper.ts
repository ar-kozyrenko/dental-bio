import { APIRequestContext } from '@playwright/test'

const GUERRILLA_BASE = 'https://api.guerrillamail.com/ajax.php'
const POLLING_INTERVAL_MS = 3000
const POLLING_TIMEOUT_MS = 30000

interface GuerrillaInbox {
    email: string
    sidToken: string
}

export class EmailHelper {
    constructor(private request: APIRequestContext) {}

    // Создать новый временный инбокс
    async createInbox(): Promise<GuerrillaInbox> {
        const response = await this.request.get(
            `${GUERRILLA_BASE}?f=get_email_address`
        )
        const body = await response.json()
        return {
            email: body.email_addr,
            sidToken: body.sid_token,
        }
    }

    // Ждать письмо от dental.bio и вернуть mail_id
    async waitForEmail(sidToken: string): Promise<string> {
        const startTime = Date.now()

        while (Date.now() - startTime < POLLING_TIMEOUT_MS) {
            const response = await this.request.get(
                `${GUERRILLA_BASE}?f=check_email&seq=0&sid_token=${sidToken}`
            )
            const body = await response.json()

            const dentalbioEmail = body.list?.find(
                (mail: { mail_from: string }) =>
                    mail.mail_from === 'noreply@dental.bio'
            )

            if (dentalbioEmail) {
                return dentalbioEmail.mail_id
            }

            await new Promise((resolve) =>
                setTimeout(resolve, POLLING_INTERVAL_MS)
            )
        }

        throw new Error(
            `Email from dental.bio not received within ${POLLING_TIMEOUT_MS / 1000}s`
        )
    }

    // Получить OTP код из письма
    async getOtpFromEmail(sidToken: string, mailId: string): Promise<string> {
        const response = await this.request.get(
            `${GUERRILLA_BASE}?f=fetch_email&email_id=${mailId}&sid_token=${sidToken}`
        )
        const body = await response.json()
        const mailBody: string = body.mail_body

        // OTP находится внутри <strong>XXXXXX</strong>
        const match = mailBody.match(/<strong>(\d{6})<\/strong>/)
        if (!match) {
            throw new Error('OTP code not found in email body')
        }

        return match[1]
    }

    // Удобный метод — сразу ждёт и возвращает OTP
    async getOtp(sidToken: string): Promise<string> {
        const mailId = await this.waitForEmail(sidToken)
        return await this.getOtpFromEmail(sidToken, mailId)
    }
}
