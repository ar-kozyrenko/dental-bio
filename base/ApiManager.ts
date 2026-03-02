import { APIRequestContext } from '@playwright/test'
import { AuthRequests } from '../api/requests/AuthRequests'
import { EmailHelper } from '../api/helpers/EmailHelper'

export class ApiManager {
    auth: AuthRequests
    email: EmailHelper

    constructor(request: APIRequestContext) {
        this.auth = new AuthRequests(request)
        this.email = new EmailHelper(request)
    }
}
