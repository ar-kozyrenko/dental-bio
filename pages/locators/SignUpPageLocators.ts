import { Page, Locator } from '@playwright/test'

export class SignUpPageLocators {
    page: Page
    yourNameInput: Locator
    claimButton: Locator
    almostThereText: Locator
    selectTitleDropdownButton: Locator
    drButton: Locator
    emailInput: Locator
    firstNameInput: Locator
    lastNameInput: Locator
    dayInput: Locator
    monthInput: Locator
    yearInput: Locator
    selectPositionDropdownButton: Locator
    dentistButton: Locator
    selectCountryDropdownButton: Locator
    unitedKingdomButton: Locator
    offerCodeInput: Locator
    passwordInput: Locator
    confirmPasswordInput: Locator
    claimButtonForm: Locator
    verifyYourEmailPage: Locator

    constructor(page: Page) {
        this.page = page
        this.yourNameInput = page.locator(
            '(//input[@placeholder="yourname"])[1]'
        )
        this.claimButton = page.locator('(//*[contains(text(), "Claim")])[1]')
        this.almostThereText = page.locator('//*[text()="Almost there"]')
        this.selectTitleDropdownButton = page.locator(
            '//*[text() = "Select Title"]'
        )
        this.drButton = page.locator('//button[text() = "Dr"]')
        this.emailInput = page.locator('input[name="email"]')
        this.firstNameInput = page.locator('input[name="firstName"]')
        this.lastNameInput = page.locator('input[name="lastName"]')
        this.dayInput = page.locator('input[aria-label="Day"]')
        this.monthInput = page.locator('input[aria-label="Month"]')
        this.yearInput = page.locator('input[aria-label="Year"]')
        this.selectPositionDropdownButton = page.locator(
            '//*[text() = "Select Position"]'
        )
        this.dentistButton = page.locator('//button[text() = "Dentist"]')
        this.selectCountryDropdownButton = page.locator(
            '//*[text() = "Select Country"]'
        )
        this.unitedKingdomButton = page.locator(
            '//button[text() = "United Kingdom"]'
        )
        this.offerCodeInput = page.locator('input[name="offerCode"]')
        this.passwordInput = page.locator('input[placeholder="Password"]')
        this.confirmPasswordInput = page.locator(
            'input[placeholder="Confirm Password"]'
        )
        this.claimButtonForm = page.locator(
            '//button[contains(text(), "Claim")]'
        )
        this.verifyYourEmailPage = page.locator(
            '//*[text() = "Verify your email"]'
        )
    }
}
