import { MailSlurp } from 'mailslurp-client'

const POLLING_TIMEOUT_MS = 60000

interface Inbox {
    email: string
    inboxId: string
}

export class EmailHelper {
    private mailslurp: MailSlurp

    constructor() {
        this.mailslurp = new MailSlurp({
            apiKey: process.env.MAILSLURP_API_KEY!,
        })
    }

    async createInbox(): Promise<Inbox> {
        const inbox = await this.mailslurp.createInbox()
        return {
            email: inbox.emailAddress!,
            inboxId: inbox.id!,
        }
    }

    async getOtp(inboxId: string): Promise<string> {
        const email = await this.mailslurp.waitForLatestEmail(
            inboxId,
            POLLING_TIMEOUT_MS
        )

        const body = email.body ?? ''
        const match = body.match(/<strong[^>]*>(\d{6})<\/strong>/)
        if (!match) {
            throw new Error('OTP code not found in email body')
        }
        return match[1]
    }
}
