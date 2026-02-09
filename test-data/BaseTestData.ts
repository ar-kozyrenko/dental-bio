import { faker } from '@faker-js/faker'

export class BaseTestData {
    static readonly EMAIL_PREFIX = 'wtl-auto-'
    static readonly USERNAME_PREFIX = 'wtl-auto-'

    static generateBaseIdentity(): string {
        return faker.string.alphanumeric(8).toLowerCase()
    }
}
