import { BaseTestData } from './BaseTestData'

export class HomePageTestData {
    static generateUniqueUserName(): string {
        const base = BaseTestData.generateBaseIdentity()
        const username = `${BaseTestData.USERNAME_PREFIX}${base}`
        return username
    }
    static returnTakenUserName(): string {
        const takenUserName = 'test12'
        return takenUserName
    }
}
