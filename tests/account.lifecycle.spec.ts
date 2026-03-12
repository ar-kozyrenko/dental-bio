import { test, expect } from '@playwright/test'
import { AccountLifecycle } from '../api/helpers/AccountLifeCycle'

const NEXT_ACTION_HASH = '153ba030649f5c8c946390dfa0eb65b20631be6b'

test.describe('Account Lifecycle Smoke', () => {
    const account = new AccountLifecycle()

    test.beforeAll(async ({ browser }) => {
        await account.setup(browser)
    })

    test.afterAll(async () => {
        await account.teardown(NEXT_ACTION_HASH)
    })

    test('should be logged in after setup', async ({ browser }) => {
        const context = await browser.newContext({
            storageState: 'session.json',
        })
        const page = await context.newPage()

        await page.goto('/dashboard')

        await expect(page).not.toHaveURL(/login/)
        await expect(page).toHaveURL(/dashboard/)

        await context.close()
    })
})
