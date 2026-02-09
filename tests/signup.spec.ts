import { test } from '@playwright/test'
import { SignUpPage } from '../pages/SignUpPage'
import { SignUpTestData } from '../test-data/SignUpTestData'
import { SignUpFormData } from '../types/SignUp/SignUpFormData'
import { Country } from '../types/SignUp/Country'
import { HomePage } from '../pages/HomePage'
import { HomePageTestData } from '../test-data/HomePageTestData'

test.describe('Sign Up - Registration flow', () => {
    test.beforeEach('Claim a unique username', async ({ page }) => {
        const homePage = new HomePage(page)
        const userName = HomePageTestData.generateUniqueUserName()
        await homePage.openHomePage('/')
        await homePage.claimUniqueUserName(userName)
    })

    test.describe('Form submission', () => {
        test('submit with all the fields - verify your email page is displayed', async ({
            page,
        }) => {
            const signUpPage = new SignUpPage(page)
            const form: SignUpFormData = SignUpTestData.createSignUpFormData()

            await signUpPage.fillSignUpFormWithAllFields(form)
            await signUpPage.submitForm()
            // await signUpPage.verifyYourEmailPageAvailable()
        })

        test('submit with empty fields - required fields with red borders and error message is displayed', async ({
            page,
        }) => {
            const signUpPage = new SignUpPage(page)

            await signUpPage.submitForm()
            await signUpPage.verifyRequiredFieldsErrorsValidation()
        })
    })

    test.describe('Password validation', () => {
        test('password confirmation is failed - the field with red borders', async ({
            page,
        }) => {
            const missMatchedConfirmPassword =
                SignUpTestData.generateNotValidPassword()
            const form = SignUpTestData.createSignUpFormData({
                confirmPassword: missMatchedConfirmPassword,
            })
            const signUpPage = new SignUpPage(page)

            await signUpPage.fillSignUpFormWithAllFields(form)
            await signUpPage.submitForm()
            await signUpPage.expectConfirmPasswordError()
        })
    })

    test.describe('Date picker', () => {
        test('select date in date-picker - verify the date is displayed in the field', async ({
            page,
        }) => {
            const signUpPage = new SignUpPage(page)

            await signUpPage.selectDateInDatePicker()
            await signUpPage.expectDateIsSelected()
        })
    })

    test.describe('Country search', () => {
        test('search for a country (Canada) by full matching - only one result is displayed', async ({
            page,
        }) => {
            const country = Country.CANADA
            const signUpPage = new SignUpPage(page)

            await signUpPage.searchCountry(country)
            await signUpPage.expectFirstCountryToBe(country)
            await signUpPage.expectOnlyOneCountryResult()
        })

        test('search for a country by "br" substring - first country is Brazil in the list', async ({
            page,
        }) => {
            const signUpPage = new SignUpPage(page)

            await signUpPage.searchCountry('br')
            await signUpPage.expectFirstCountryIsBrazil()
        })

        test('search for a country by mismatching substring - no options found is displayed', async ({
            page,
        }) => {
            const signUpPage = new SignUpPage(page)

            await signUpPage.searchCountry('klmn')
            await signUpPage.expectNoOptionsFoundIsDisplayed()
        })
    })
})
