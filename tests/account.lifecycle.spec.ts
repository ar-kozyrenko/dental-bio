import { test, expect } from '@playwright/test'
import { AccountLifecycle, SESSION_FILE } from '../api/helpers/AccountLifeCycle'

//the test was created for testing the browser test transition and account deleting methods
//currently the tests are NOT relevant because: delete account feature has been broken in the app and MailSlurp reached the limit

test.describe('Account Lifecycle Smoke', () => {
    const account = new AccountLifecycle()

    // все тесты в этом describe стартуют залогиненными
    test.use({ storageState: SESSION_FILE })

    test.beforeAll(async ({ browser }) => {
        await account.setup(browser)
    })

    test.afterAll(async () => {
        await account.teardown()
    })

    test('should be logged in after setup', async ({ page }) => {
        // page уже залогинен через storageState — не нужно создавать контекст вручную
        await page.goto('/dashboard')

        await expect(page).not.toHaveURL(/login/)
        await expect(page).toHaveURL(/dashboard/)
    })
})
