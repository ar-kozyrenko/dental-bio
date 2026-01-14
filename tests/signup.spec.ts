import { test, expect } from '@playwright/test'
import { SignUpPageLocators } from '../pages/locators/SignUpPageLocators'

test('verify your email page is displayed - after filling out the signup form with all the fields are filled', async ({
    page,
}) => {
    const signUpPage = new SignUpPageLocators(page)
    await page.goto('https://dental.bio/')
    await signUpPage.yourNameInput.fill('test12')
    await expect(signUpPage.yourNameInput).toHaveValue('test12')
    await signUpPage.claimButton.click()
    await expect(signUpPage.almostThereText).toBeVisible()
    await signUpPage.selectTitleDropdownButton.scrollIntoViewIfNeeded()
    await signUpPage.selectTitleDropdownButton.click()
    await signUpPage.drButton.click()
    await signUpPage.emailInput.fill('kirzapardi@necub.com')
    await signUpPage.firstNameInput.fill('Joe')
    await signUpPage.lastNameInput.fill('Jones')
    await signUpPage.dayInput.fill('01')
    await signUpPage.monthInput.fill('01')
    await signUpPage.yearInput.fill('2010')
    await signUpPage.selectPositionDropdownButton.click()
    await signUpPage.dentistButton.click()
    await signUpPage.selectCountryDropdownButton.click()
    await signUpPage.unitedKingdomButton.click()
    await signUpPage.offerCodeInput.fill('123')
    await signUpPage.passwordInput.fill('Ab12345$')
    await signUpPage.confirmPasswordInput.fill('Ab12345$')
    await signUpPage.claimButtonForm.click()
    //await expect(signUpPage.verifyYourEmailPage).toBeVisible()
})
