import { test, expect } from '@playwright/test'
import { SignUpPage } from '../pages/SignUpPage'

test('verify your email page is displayed - after filling out the signup form with all the fields are filled', async ({
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
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName('test15')
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

test('required fields are highlighted and error message is - after sending empty form', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName('test15')
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
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName('test15')
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

test('select date in date-picker - verify the selected field value', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName('test15')
    await signUpPage.selectDateInDatePicker()
})

test('search for a country - full marching', async ({ page }) => {
    const searchedCountry: string = 'Canada'
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName('test12')
    await signUpPage.searchCountry(searchedCountry)
    await signUpPage.expectFirstCountryToBe(searchedCountry)
    await signUpPage.expectOnlyOneCountryResult()
})

test('search for a country - first country is Brazil on searching by "br"', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName('test12')
    await signUpPage.searchCountry('br')
    await signUpPage.expectFirstCountryIsBrazil()
})

test('search for a country - no options found is displayed on entering "klmn"', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    await signUpPage.claimYourName('test12')
    await signUpPage.searchCountry('klmn')
    await signUpPage.expectNoOptionsFoundIsDisplayed()
})
