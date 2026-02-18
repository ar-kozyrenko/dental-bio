import { Page } from '@playwright/test'
import { LoginFormData } from '../types/LogIn/LogInFormData'
import { LoginPageLocators } from './locators/LoginPageLocators'
import { BasePage } from '../base/BasePage'

export class LoginPage extends BasePage {
    locator: LoginPageLocators

    constructor(page: Page) {
        super(page)
        this.locator = new LoginPageLocators(page)
    }

    async fillEmail(email: string): Promise<void> {
        await this.locator.emailInput.fill(email)
    }
    async fillPassword(password: string): Promise<void> {
        await this.locator.passwordInput.fill(password)
    }

    async clickLogInButton(): Promise<void> {
        await this.locator.loginButton.click()
    }
    async fillLogInForm(form: LoginFormData): Promise<void> {
        await this.fillEmail(form.email)
        await this.fillPassword(form.password)
    }

    async getEmptyEmailValidationError(): Promise<string> {
        return await this.locator.emailInput.evaluate(
            (el: HTMLInputElement) => el.validationMessage
        )
    }
    async getEmptyPasswordValidationError(): Promise<string> {
        return await this.locator.passwordInput.evaluate(
            (el: HTMLInputElement) => el.validationMessage
        )
    }
}
