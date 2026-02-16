import { Page, Locator } from '@playwright/test'

export class LoginPageLocators {
    emailInput: Locator
    passwordInput: Locator
    loginButton: Locator
    formValidationError: Locator

    constructor(page: Page) {
        this.emailInput = page.locator('input[name="email"]')
        this.passwordInput = page.locator('input[name="password"]')
        this.loginButton = page.getByRole('button', { name: 'Log In' })
        this.formValidationError = page.getByText(
            'Incorrect username or password.'
        )
    }
}
