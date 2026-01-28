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
    formErrorMessage: Locator
    selectTitleContainer: Locator
    emailContainer: Locator
    firstNameContainer: Locator
    lastNameContainer: Locator
    selectPositionContainer: Locator
    passwordContainer: Locator
    confirmPasswordContainer: Locator
    datePickerButton: Locator
    chooseMonthButton: Locator
    chooseYearButton: Locator
    selectDayButton: Locator
    selectedDayButton: Locator
    selectedMonthButton: Locator
    selectedYearButton: Locator
    selectCountryButton: Locator
    countrySearchInput: Locator
    countryButtons: Locator
    firstCountryButton: Locator
    noOptionsFoundText: Locator
    userNameTakenErrorContainer: Locator

    constructor(page: Page) {
        this.page = page
        this.yourNameInput = page.locator(
            '(//input[@placeholder="yourname"])[1]'
        )
        this.claimButton = page.locator('(//button[@type="submit"])[1]') //(//*[contains(text(), "Claim")])[1]
        // this.claimButton = page
        //     .locator('form')
        //     .filter({ has: page.locator('input[placeholder="yourname"]') })
        //     .first()
        // .locator('button[type="submit"]')
        this.almostThereText = page.locator('//*[text()="Almost there"]')
        this.selectTitleDropdownButton = page.locator(
            '//*[text() = "Select Title"]'
        )
        this.userNameTakenErrorContainer = page
            .locator('div')
            .filter({ hasText: 'Oops' })
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
        // this.claimButtonForm = page.locator(
        //     '//button[contains(text(), "Claim @")]'
        // )

        this.claimButtonForm = page.getByRole('button', { name: /^Claim @/ })
        this.verifyYourEmailPage = page.locator(
            '//*[text() = "Verify your email"]'
        )
        this.formErrorMessage = page.locator(
            '//*[text() = "Oops! It looks like you missed some fields."]'
        )
        this.selectTitleContainer = page.locator(
            '//*[text() = "Select Title"]/ancestor::div[contains(@class, "border")]'
        )
        this.emailContainer = page.locator(
            '//input[@name = "email"]/ancestor::div[contains(@class, "border")]'
        )
        this.firstNameContainer = page.locator(
            '//input[@name = "firstName"]/ancestor::div[contains(@class, "border")]'
        )
        this.lastNameContainer = page.locator(
            '//input[@name = "lastName"]/ancestor::div[contains(@class, "border")]'
        )
        this.selectPositionContainer = page.locator(
            '//*[text() = "Select Position"]/ancestor::div[contains(@class, "border")]'
        )
        this.passwordContainer = page.locator(
            '//input[@placeholder = "Password"]/ancestor::div[contains(@class, "border")]'
        )
        this.confirmPasswordContainer = page.locator(
            '//input[@placeholder = "Confirm Password"]/ancestor::div[contains(@class, "border")]'
        )

        this.datePickerButton = page.locator('input[placeholder="dd"]')
        this.chooseMonthButton = page.locator(
            'select[aria-label="Choose the Month"]'
        )
        this.chooseYearButton = page.locator(
            'select[aria-label="Choose the Year"]'
        )
        this.selectDayButton = page.locator('td[data-day="2012-08-07"]')
        this.selectedDayButton = page.locator('input[aria-label="Day"]')
        this.selectedMonthButton = page.locator('input[aria-label="Month"]')
        this.selectedYearButton = page.locator('input[aria-label="Year"]')
        this.selectCountryButton = page.getByText('Select Country')
        this.countrySearchInput = page.getByPlaceholder('Search ...')
        this.countryButtons = page.locator(
            '//input[@placeholder="Search ..."]/following-sibling::button'
        )
        this.firstCountryButton = page.locator(
            '//input[@placeholder="Search ..."]/following-sibling::button[1]'
        )
        this.noOptionsFoundText = page.locator(
            '//input[@placeholder="Search ..."]/following-sibling::p'
        )
    }
}
