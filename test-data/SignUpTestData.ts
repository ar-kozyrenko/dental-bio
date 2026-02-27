import { faker } from '@faker-js/faker'
import { SignUpFormData } from '../types/SignUp/SignUpFormData'
import { Country } from '../types/SignUp/Country'
import { Position } from '../types/SignUp/Position'
import { Title } from '../types/SignUp/Title'
import { BirthDate } from '../types/SignUp/BirthDate'
import { BaseTestData } from './BaseTestData'
import { SendOtpData } from '../types/SignUp/RegistrationData'
import { HomePageTestData } from './HomePageTestData'

export interface Name {
    firstName: string
    lastName: string
}

export type Password = string

export class SignUpTestData {
    static generateEmail(): string {
        const base = BaseTestData.generateBaseIdentity()
        const email = `${BaseTestData.EMAIL_PREFIX}${base}@test.com`
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
    static createSendOtpData(
        email: string,
        overrides?: Partial<SendOtpData>
    ): SendOtpData {
        const name = this.generateName()
        return {
            isResend: false,
            email,
            password: this.generateNotValidPassword(),
            username: HomePageTestData.generateUniqueUserName(),
            firstName: name.firstName,
            lastName: name.lastName,
            birthday: null,
            position: Position.CONSULTANT,
            offerCode: '',
            country: Country.ALBANIA,
            title: Title.Dr,
            inviteUserName: null,
            location: 'Ukraine',
            domain: 'dental.bio',
            brand: 'Dentalbio',
            vertical: 'dental',
            ...overrides,
        }
    }
    static createVerifyOtpData(email: string, otp: string): VerifyOtpData {
        const { isResend, ...rest } = this.createSendOtpData(email)
        return { ...rest, otp }
    }
}
