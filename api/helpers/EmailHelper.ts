import { TempMail } from 'tempmail.lol'

const POLLING_INTERVAL_MS = 3000
const POLLING_TIMEOUT_MS = 60000

const tempmail = new TempMail()

interface Inbox {
    email: string
    token: string
}

export class EmailHelper {
    // Создать новый временный инбокс
    async createInbox(): Promise<Inbox> {
        const inbox = await tempmail.createInbox()
        return {
            email: inbox.address,
            token: inbox.token,
        }
    }

    // Ждать письмо от dental.bio и вернуть OTP
    async getOtp(token: string): Promise<string> {
        const startTime = Date.now()

        while (Date.now() - startTime < POLLING_TIMEOUT_MS) {
            const emails = await tempmail.checkInbox(token)

            if (emails) {
                const dentalbioEmail = emails.find((e) =>
                    e.from.includes('noreply@dental.bio')
                )

                if (dentalbioEmail) {
                    const body = dentalbioEmail.html ?? dentalbioEmail.body
                    const match = body.match(/<strong[^>]*>(\d{6})<\/strong>/)
                    if (!match) {
                        throw new Error('OTP code not found in email body')
                    }
                    return match[1]
                }
            }

            await new Promise((resolve) =>
                setTimeout(resolve, POLLING_INTERVAL_MS)
            )
        }

        throw new Error(
            `Email from dental.bio not received within ${POLLING_TIMEOUT_MS / 1000}s`
        )
    }
}
