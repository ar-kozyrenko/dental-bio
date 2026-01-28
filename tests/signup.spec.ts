import { test } from '@playwright/test'
import { SignUpPage } from '../pages/SignUpPage'

test('submit the form with all the fields are filled - verify your email page is displayed', async ({
    page,
}) => {
    const email = 'nortidarta@necub.com'
    const firstName = 'Joe'
    const lastName = 'Jones'
    const day = '01'
    const month = '12'
    const year = '2010'
    const offerCode = '123'
    const password = 'Ab12345$'
    const userName = 'test15'
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName(userName)
    await signUpPage.fillSignUpFormWithAllFields(
        email,
        firstName,
        lastName,
        day,
        month,
        year,
        offerCode,
        password
    )
    await signUpPage.submitForm()
    // await signUpPage.verifyYourEmailPageAvailable()
})

test('username is taken - error is displayed', async ({ page }) => {
    const signUpPage = new SignUpPage(page)
    const takenUserName = 'test12'
    await signUpPage.claimYourName(takenUserName)
    await signUpPage.expectTakenUsernameError()
})

test('submit the form with empty fields - required fields are highlighted and error message is', async ({
    page,
}) => {
    const userName = 'test15'
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName(userName)
    await signUpPage.submitForm()
    await signUpPage.verifyRequiredFieldsErrorsValidation()
})

test('password confirmation is failed - the field with red borders', async ({
    page,
}) => {
    const email = 'nortidarta@necub.com'
    const firstName = 'Joe'
    const lastName = 'Jones'
    const day = '01'
    const month = '12'
    const year = '2010'
    const offerCode = '123'
    const password = 'Ab12345$'
    const confirmPassword = 'Ab12345!'
    const userName = 'test15'
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName(userName)
    await signUpPage.fillSignUpFormWithAllFields(
        email,
        firstName,
        lastName,
        day,
        month,
        year,
        offerCode,
        password,
        confirmPassword
    )
    await signUpPage.submitForm()
    await signUpPage.expectConfirmPasswordError()
})

test('select date in date-picker - verify the selected value in the field', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    const userName = 'test15'
    await signUpPage.claimYourName(userName)
    await signUpPage.selectDateInDatePicker()
})

test('search for a country (Canada) by full matching - only one result is displayed', async ({
    page,
}) => {
    const searchedCountry: string = 'Canada'
    const userName = 'test15'
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName(userName)
    await signUpPage.searchCountry(searchedCountry)
    await signUpPage.expectFirstCountryToBe(searchedCountry)
    await signUpPage.expectOnlyOneCountryResult()
})

test('search for a country by "br" substring - first country is Brazil in the list', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    const userName = 'test15'
    await signUpPage.claimYourName(userName)
    await signUpPage.searchCountry('br')
    await signUpPage.expectFirstCountryIsBrazil()
})

test('search for a country by not valid "klmn" substring - no options found is displayed', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    const userName = 'test15'
    await signUpPage.claimYourName(userName)
    await signUpPage.searchCountry('klmn')
    await signUpPage.expectNoOptionsFoundIsDisplayed()
})
