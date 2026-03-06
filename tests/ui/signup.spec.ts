import { test } from '../../fixtures/baseFixture'
import { SignUpTestData } from '../../test-data/SignUpTestData'
import { SignUpFormData } from '../../types/SignUp/SignUpFormData'
import { Country } from '../../types/SignUp/Country'
import { HomePageTestData } from '../../test-data/HomePageTestData'

test.describe('Sign Up - Registration flow', () => {
    test.beforeEach('Claim a unique username', async ({ pageManager }) => {
        const userName = HomePageTestData.generateUniqueUserName()
        await pageManager.homePage.openPage('/')
        await pageManager.homePage.claimUniqueUserName(userName)
    })

    test.describe('Form submission', () => {
        test('submit with all the fields - verify your email page is displayed', async ({
            pageManager,
        }) => {
            const form: SignUpFormData = SignUpTestData.createSignUpFormData()

            await pageManager.signUpPage.fillSignUpFormWithAllFields(form)
            await pageManager.signUpPage.submitForm()
            // await signUpPage.verifyYourEmailPageAvailable()
        })

        test('submit with empty fields - required fields with red borders and error message is displayed', async ({
            pageManager,
        }) => {
            await pageManager.signUpPage.submitForm()
            await pageManager.signUpPage.verifyRequiredFieldsErrorsValidation()
        })
    })

    test.describe('Password validation', () => {
        test('password confirmation is failed - the field with red borders', async ({
            pageManager,
        }) => {
            const missMatchedConfirmPassword =
                SignUpTestData.generateNotValidPassword()
            const form = SignUpTestData.createSignUpFormData({
                confirmPassword: missMatchedConfirmPassword,
            })

            await pageManager.signUpPage.fillSignUpFormWithAllFields(form)
            await pageManager.signUpPage.submitForm()
            await pageManager.signUpPage.expectConfirmPasswordError()
        })
    })

    test.describe('Date picker', () => {
        test('select date in date-picker - verify the date is displayed in the field', async ({
            pageManager,
        }) => {
            await pageManager.signUpPage.selectDateInDatePicker()
            await pageManager.signUpPage.expectDateIsSelected()
        })
    })

    test.describe('Country search', () => {
        test('search for a country (Canada) by full matching - only one result is displayed', async ({
            pageManager,
        }) => {
            const country = Country.CANADA

            await pageManager.signUpPage.searchCountry(country)
            await pageManager.signUpPage.expectFirstCountryToBe(country)
            await pageManager.signUpPage.expectOnlyOneCountryResult()
        })

        test('search for a country by "br" substring - first country is Brazil in the list', async ({
            pageManager,
        }) => {
            await pageManager.signUpPage.searchCountry('br')
            await pageManager.signUpPage.expectFirstCountryIsBrazil()
        })

        test('search for a country by mismatching substring - no options found is displayed', async ({
            pageManager,
        }) => {
            await pageManager.signUpPage.searchCountry('klmn')
            await pageManager.signUpPage.expectNoOptionsFoundIsDisplayed()
        })
    })
})
