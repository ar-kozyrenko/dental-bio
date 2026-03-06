import { test } from '../../fixtures/baseFixture'
import { expect } from '@playwright/test'
import {
    VALID_LOGIN_DATA,
    INVALID_EMAIL_DATA,
    INVALID_PASSWORD_DATA,
    EMPTY_EMAIL_DATA,
    EMPTY_PASSWORD_DATA,
} from '../../test-data/LoginTestData'

test.describe('Log In Flow', () => {
    test.beforeEach('Open start URL', async ({ pageManager }) => {
        await pageManager.logInPage.openPage('/login')
    })

    test.describe('Positive tests', () => {
        test('successful login', async ({ pageManager }) => {
            await pageManager.logInPage.fillLogInForm(VALID_LOGIN_DATA)
            await pageManager.logInPage.clickLogInButton()
            await pageManager.logInPage.expectToBeOnPage('dashboard', 10000)
        })
    })
    test.describe('Negative tests', () => {
        test('not registered email', async ({ pageManager }) => {
            await pageManager.logInPage.fillLogInForm(INVALID_EMAIL_DATA)
            await pageManager.logInPage.clickLogInButton()
            await expect(
                pageManager.logInPage.locator.formValidationError
            ).toBeVisible({ timeout: 10000 })
        })
        test('not registered password', async ({ pageManager }) => {
            await pageManager.logInPage.fillLogInForm(INVALID_PASSWORD_DATA)
            await pageManager.logInPage.clickLogInButton()
            await expect(
                pageManager.logInPage.locator.formValidationError
            ).toBeVisible()
        })
        test('empty email', async ({ pageManager }) => {
            await pageManager.logInPage.fillLogInForm(EMPTY_EMAIL_DATA)
            await pageManager.logInPage.clickLogInButton()
            const validationMessage =
                await pageManager.logInPage.getEmptyEmailValidationMessage()
            await expect(validationMessage).toBeTruthy()
            await expect(validationMessage).toContain('fill')
        })
        test('empty password', async ({ pageManager }) => {
            await pageManager.logInPage.fillLogInForm(EMPTY_PASSWORD_DATA)
            await pageManager.logInPage.clickLogInButton()
            const validationMessage =
                await pageManager.logInPage.getEmptyPasswordValidationMessage()
            await expect(validationMessage).toBeTruthy()
            await expect(validationMessage).toContain('fill')
        })
    })
})
