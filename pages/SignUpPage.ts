import { Page, expect } from '@playwright/test'
import { SignUpPageLocators } from './locators/SignUpPageLocators'

export class SignUpPage {
    locator: SignUpPageLocators
    page: Page

    constructor(page: Page) {
        this.locator = new SignUpPageLocators(page)
        this.page = page
    }

    async claimYourName(yourname: string) {
        await this.page.goto('https://dental.bio/')
        await this.locator.yourNameInput.fill(yourname)
        await expect(this.locator.yourNameInput).toHaveValue(yourname)
        await this.locator.claimButton.click()
    }

    async expectTakenUsernameError(): Promise<void> {
        await expect(this.locator.userNameTakenErrorContainer).toContainText([
            'Oops! That username is taken.',
            'Choose a different one or get creative!',
        ])
    }

    async fillSignUpFormWithAllFields(
        email: string,
        firstName: string,
        lastName: string,
        day: string,
        month: string,
        year: string,
        offerCode: string,
        password: string,
        confirmPassword?: string
    ) {
        await this.locator.selectTitleDropdownButton.scrollIntoViewIfNeeded()
        await this.locator.selectTitleDropdownButton.click()
        await this.locator.drButton.click()
        await this.locator.emailInput.fill(email)
        await this.locator.firstNameInput.fill(firstName)
        await this.locator.lastNameInput.fill(lastName)
        await this.locator.dayInput.fill(day)
        await this.locator.monthInput.fill(month)
        await this.locator.yearInput.fill(year)
        await this.locator.selectPositionDropdownButton.click()
        await this.locator.dentistButton.click()
        await this.locator.selectCountryDropdownButton.click()
        await this.locator.unitedKingdomButton.click()
        await this.locator.offerCodeInput.fill(offerCode)
        await this.locator.passwordInput.fill(password) //'Ab12345$'
        await this.locator.confirmPasswordInput.fill(
            confirmPassword ?? password
        ) // fill password if there is no confirm password
    }
    async submitForm() {
        await this.locator.claimButtonForm.scrollIntoViewIfNeeded()
        // Ждем чтобы кнопка стала кликабельной (не disabled, не covered)
        await expect(this.locator.claimButtonForm).toBeEnabled()

        // // Клик с небольшой задержкой для стабильности
        // await this.locator.claimButtonForm.click({ delay: 100 })
        await this.locator.claimButtonForm.click()
    }

    async verifyYourEmailPageAvailable() {
        await expect(this.locator.verifyYourEmailPage).toBeVisible()
    }
    async verifyRequiredFieldsErrorsValidation() {
        await expect(this.locator.formErrorMessage).toBeVisible()
        await expect(this.locator.formErrorMessage).toContainText(
            'Oops! It looks like you missed some fields.'
        )
        const requiredFields = [
            this.locator.selectTitleContainer,
            this.locator.emailContainer,
            this.locator.firstNameContainer,
            this.locator.lastNameContainer,
            this.locator.selectPositionContainer,
            this.locator.passwordContainer,
            this.locator.confirmPasswordContainer,
        ]
        for (const field of requiredFields) {
            await expect(field).toHaveClass(/border-red-500/)
        }
    }

    async expectConfirmPasswordError() {
        expect(this.locator.confirmPasswordContainer).toHaveClass(
            /border-red-500/
        )
    }

    async selectDateInDatePicker() {
        // Убедимся что элемент готов к взаимодействию
        await this.locator.datePickerButton.waitFor({ state: 'visible' })
        await this.locator.datePickerButton.waitFor({ state: 'attached' })
        await this.locator.datePickerButton.click({ delay: 100 })

        // Явное ожидание появления календаря
        // await this.page.waitForSelector(
        //     'select[aria-label="Choose the Month"]',
        //     { state: 'visible', timeout: 10000 }
        // )
        await this.locator.chooseMonthButton.isVisible()

        await this.locator.chooseMonthButton.selectOption('7')
        await this.locator.chooseYearButton.selectOption('2012')
        await this.locator.selectDayButton.click()

        await expect(this.locator.selectedDayButton).toHaveValue('07')
        await expect(this.locator.selectedMonthButton).toHaveValue('08')
        await expect(this.locator.selectedYearButton).toHaveValue('2012')
    }

    async searchCountry(countryName: string) {
        await this.locator.selectCountryButton.scrollIntoViewIfNeeded()
        await this.locator.selectCountryButton.click()
        await expect(this.locator.countrySearchInput).toBeVisible()
        await this.locator.countrySearchInput.fill(countryName)
        await expect(this.locator.countrySearchInput).toHaveValue(countryName)
    }

    async expectFirstCountryToBe(countryName: string) {
        await expect(this.locator.firstCountryButton).toBeVisible()
        await expect(this.locator.firstCountryButton).toHaveText(countryName)
    }

    async expectOnlyOneCountryResult() {
        await expect(this.locator.countryButtons).toBeVisible()
        await expect(this.locator.countryButtons).toHaveCount(1)
    }

    async expectFirstCountryIsBrazil() {
        const firstCountryWithSubstring = this.locator.countryButtons.first()
        await expect(firstCountryWithSubstring).toBeVisible({ timeout: 10000 })
        await expect(firstCountryWithSubstring).toHaveText('Brazil')
    }

    async expectNoOptionsFoundIsDisplayed() {
        await expect(this.locator.noOptionsFoundText).toContainText(
            'No options found'
        )
    }
}
