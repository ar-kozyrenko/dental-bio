import { test } from '@playwright/test'
import { SignUpPage } from '../pages/SignUpPage'
import { SignUpTestData } from '../test-data/SignUpTestData'
import { SignUpFormData } from '../types/SignUp/SignUpFormData'
import { Country } from '../types/SignUp/Country'

test('submit the form with all the fields - verify your email page is displayed', async ({
    page,
}) => {
    const username: string = SignUpTestData.generateUserName()
    const form: SignUpFormData = SignUpTestData.createSignUpFormData()
    const signUpPage = new SignUpPage(page)

    await signUpPage.claimYourName(username)
    await signUpPage.fillSignUpFormWithAllFields(form)
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
    const userName = SignUpTestData.generateUserName()
    const signUpPage = new SignUpPage(page)

    await signUpPage.claimYourName(userName)
    await signUpPage.submitForm()
    await signUpPage.verifyRequiredFieldsErrorsValidation()
})

test('password confirmation is failed - the field with red borders', async ({
    page,
}) => {
    const userName = SignUpTestData.generateUserName()
    const missMatchedConfirmPassword = SignUpTestData.generateNotValidPassword()
    const form = SignUpTestData.createSignUpFormData({
        confirmPassword: missMatchedConfirmPassword,
    })
    const signUpPage = new SignUpPage(page)

    await signUpPage.claimYourName(userName)
    await signUpPage.fillSignUpFormWithAllFields(form)
    await signUpPage.submitForm()
    await signUpPage.expectConfirmPasswordError()
})

test('select date in date-picker - verify the selected value in the field', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    const userName = SignUpTestData.generateUserName()

    await signUpPage.claimYourName(userName)
    await signUpPage.selectDateInDatePicker()
})

test('search for a country (Canada) by full matching - only one result is displayed', async ({
    page,
}) => {
    const searchedCountry = Country.CANADA
    const userName = SignUpTestData.generateUserName()
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
    const userName = SignUpTestData.generateUserName()

    await signUpPage.claimYourName(userName)
    await signUpPage.searchCountry('br')
    await signUpPage.expectFirstCountryIsBrazil()
})

test('search for a country by not valid "klmn" substring - no options found is displayed', async ({
    page,
}) => {
    const signUpPage = new SignUpPage(page)
    const userName = SignUpTestData.generateUserName()

    await signUpPage.claimYourName(userName)
    await signUpPage.searchCountry('klmn')
    await signUpPage.expectNoOptionsFoundIsDisplayed()
})
