import { Page, expect } from '@playwright/test'
import { SignUpPageLocators } from './locators/SignUpPageLocators'

export class SignUpPage {
    locator: SignUpPageLocators
    page: Page

    constructor(page: Page) {
        this.locator = new SignUpPageLocators(page)
        this.page = page
    }

    async fillSignUpFormWithAllFields() {
        await this.locator.selectTitleDropdownButton.scrollIntoViewIfNeeded()
        await this.locator.selectTitleDropdownButton.click()
        await this.locator.drButton.click()
        await this.locator.emailInput.fill('kirzapardi@necub.com')
        await this.locator.firstNameInput.fill('Joe')
        await this.locator.lastNameInput.fill('Jones')
        await this.locator.dayInput.fill('01')
        await this.locator.monthInput.fill('01')
        await this.locator.yearInput.fill('2010')
        await this.locator.selectPositionDropdownButton.click()
        await this.locator.dentistButton.click()
        await this.locator.selectCountryDropdownButton.click()
        await this.locator.unitedKingdomButton.click()
        await this.locator.offerCodeInput.fill('123')
        await this.locator.passwordInput.fill('Ab12345$')
        await this.locator.confirmPasswordInput.fill('Ab12345$')
    }
    async submitForm() {
        await this.locator.claimButtonForm.click()
    }
    async claimYourName() {
        await this.page.goto('https://dental.bio/')
        await this.locator.yourNameInput.fill('test12')
        await expect(this.locator.yourNameInput).toHaveValue('test12')
        await this.locator.claimButton.click()
        await expect(this.locator.almostThereText).toBeVisible()
    }
}

//  await page.goto('https://dental.bio/')
//     await signUpPage.yourNameInput.fill('test12')
//     await expect(signUpPage.yourNameInput).toHaveValue('test12')
//     await signUpPage.claimButton.click()
//     await expect(signUpPage.almostThereText).toBeVisible()
//
//await signUpPage.selectTitleDropdownButton.scrollIntoViewIfNeeded()
//     await signUpPage.selectTitleDropdownButton.click()
//     await signUpPage.drButton.click()
//     await signUpPage.emailInput.fill('kirzapardi@necub.com')
//     await signUpPage.firstNameInput.fill('Joe')
//     await signUpPage.lastNameInput.fill('Jones')
//     await signUpPage.dayInput.fill('01')
//     await signUpPage.monthInput.fill('01')
//     await signUpPage.yearInput.fill('2010')
//     await signUpPage.selectPositionDropdownButton.click()
//     await signUpPage.dentistButton.click()
//     await signUpPage.selectCountryDropdownButton.click()
//     await signUpPage.unitedKingdomButton.click()
//     await signUpPage.offerCodeInput.fill('123')
//     await signUpPage.passwordInput.fill('Ab12345$')
//     await signUpPage.confirmPasswordInput.fill('Ab12345$')
//     await signUpPage.claimButtonForm.click()
//     //await expect(signUpPage.verifyYourEmailPage).toBeVisible()
