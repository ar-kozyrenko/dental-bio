import { test, expect } from '@playwright/test'

test('signup successfully - with all the fields are filled', async ({
    page,
}) => {
    const yourNameInput = page.locator('(//input[@placeholder="yourname"])[1]')
    const claimButton = page.locator('(//*[contains(text(), "Claim")])[1]')
    const almostThereText = page.locator('//*[text()="Almost there"]')
    const selectTitleDropdownButton = page.locator(
        '//*[text() = "Select Title"]'
    )
    const mrButton = page.locator('//button[text() = "Dr"]')
    const emailInput = page.locator('input[name="email"]')
    const firstNameInput = page.locator('input[name="firstName"]]')
    const lastNameInput = page.locator('input[name="lastName"]]')
    const dayInput = page.locator('input[aria-label="Day"]')
    const monthInput = page.locator('input[aria-label="Month"]')
    const yearInput = page.locator('input[aria-label="Year"]')
    const selectPositionDropdownButton = page.locator(
        '//*[text() = "Select Position"]'
    )
    const dentistButton = page.locator('//button[text() = "Dentist"]')
    const selectCountryDropdownButton = page.locator(
        '//*[text() = "Select Country"]'
    )
    const unitedKingdomButton = page.locator(
        '//button[text() = "United Kingdom"]'
    )
    const offerCodeInput = page.locator('input[name="offerCode"]')
    const passwordInput = page.locator('input[placeholder="Password"]')
    const confirmPasswordInput = page.locator(
        'input[placeholder="Confirm Password"]'
    )

    await page.goto('https://dental.bio/')
    await yourNameInput.fill('test10')
    await expect(yourNameInput).toHaveValue('test10')
    await claimButton.click()
    await expect(almostThereText).toBeVisible()
})
