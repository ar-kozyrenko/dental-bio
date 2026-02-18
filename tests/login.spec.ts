import { test } from '../fixtures/baseFixture'
import { expect } from '@playwright/test'
import { LoginFormData } from '../types/LogIn/LogInFormData'

test.describe('Log In Flow', () => {
    test.beforeEach('Open start URL', async ({ pageManager }) => {
        await pageManager.logInPage.openPage('/login')
    })

    test.describe('Positive tests', () => {
        test('successfull login', async ({ pageManager }) => {
            const loginData: LoginFormData = {
                email: 'mastinirke@necub.com',
                password: 'Ab12345$',
            }
            await pageManager.logInPage.fillLogInForm(loginData)
            await pageManager.logInPage.clickLogInButton()
            await pageManager.logInPage.expectToBeOnPage('dashboard', 10000)
        })
    })
    test.describe('Negative tests', () => {
        test('not registered email', async ({ pageManager }) => {
            const loginData: LoginFormData = {
                email: 'mastinirke@necub2.com',
                password: 'Ab12345$',
            }
            await pageManager.logInPage.fillLogInForm(loginData)
            await pageManager.logInPage.clickLogInButton()
            await expect(
                pageManager.logInPage.locator.formValidationError
            ).toBeVisible({ timeout: 10000 })
        })
        test('not registered password', async ({ pageManager }) => {
            const loginData: LoginFormData = {
                email: 'mastinirke@necub.com',
                password: 'Ab12345',
            }
            await pageManager.logInPage.fillLogInForm(loginData)
            await pageManager.logInPage.clickLogInButton()
            await expect(
                pageManager.logInPage.locator.formValidationError
            ).toBeVisible()
        })
        test('empty email', async ({ pageManager }) => {
            const loginData: LoginFormData = {
                email: '',
                password: 'Ab12345$',
            }
            await pageManager.logInPage.fillLogInForm(loginData)
            await pageManager.logInPage.clickLogInButton()
            await pageManager.logInPage.getEmptyEmailValidationError()
            const validationMessage =
                await pageManager.logInPage.getEmptyEmailValidationError()
            await expect(validationMessage).toBeTruthy()
            await expect(validationMessage).toContain('fill')
        })
        test('empty password', async ({ pageManager }) => {
            const loginData: LoginFormData = {
                email: 'mastinirke@necub.com',
                password: '',
            }
            await pageManager.logInPage.fillLogInForm(loginData)
            await pageManager.logInPage.clickLogInButton()
            const validationMessage =
                await pageManager.logInPage.getEmptyPasswordValidationError()
            await expect(validationMessage).toBeTruthy()
            await expect(validationMessage).toContain('fill')
        })
    })
})
