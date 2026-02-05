import { faker } from '@faker-js/faker'
import { SignUpFormData } from '../types/SignUp/SignUpFormData'
import { Country } from '../types/SignUp/Country'
import { Position } from '../types/SignUp/Position'
import { Title } from '../types/SignUp/Title'
import { BirthDate } from '../types/SignUp/BirthDate'

export interface Name {
    firstName: string
    lastName: string
}

export type Password = string

export class SignUpTestData {
    private static readonly EMAIL_PREFIX = 'wtl-auto-'
    private static readonly USERNAME_PREFIX = 'wtl-auto-'

    private static generateBaseIdentity(): string {
        return faker.string.alphanumeric(8).toLowerCase()
    }
    static generateUserName(): string {
        const base = this.generateBaseIdentity()
        const username = `${this.USERNAME_PREFIX}${base}`
        return username
    }

    static generateEmail(): string {
        const base = this.generateBaseIdentity()
        const email = `${this.EMAIL_PREFIX}${base}@test.com`
        return email
    }

    static generateName(): Name {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
        }
    }

    static generateBirthDate(): BirthDate {
        return {
            day: '01',
            month: '12',
            year: '2010',
        }
    }
    static generateOfferCode(): string {
        const offerCode = faker.string.alphanumeric({ length: 3 })
        return offerCode
    }

    static generateValidPassword(): Password {
        const upper = faker.string.alpha({ length: 1, casing: 'upper' })
        const lower = faker.string.alpha({ length: 1, casing: 'lower' })
        const number = faker.number.int({ min: 0, max: 9 })
        const specialCharacter = faker.helpers.arrayElement([
            '!',
            '$',
            '#',
            '&',
        ])
        const rest = faker.string.alpha(4)
        return faker.helpers
            .shuffle([upper, lower, number, specialCharacter, rest])
            .join('')
    }

    static generateNotValidPassword(): Password {
        const notValidPassword = faker.string.alpha(7)
        return notValidPassword
    }
    static createSignUpFormData(
        overrides?: Partial<SignUpFormData>
    ): SignUpFormData {
        const password = this.generateNotValidPassword()
        return {
            title: Title.Dr,
            email: this.generateEmail(),
            firstName: this.generateName().firstName,
            lastName: this.generateName().lastName,
            birthDate: this.generateBirthDate(),
            position: Position.DENTAL_HYGIENIST,
            country: Country.ALBANIA,
            offerCode: this.generateOfferCode(),
            password,
            confirmPassword: password,
            ...overrides,
        }
    }
}
