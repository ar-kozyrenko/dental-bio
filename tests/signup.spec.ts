import { test, expect } from '@playwright/test'

test('signup successfully - with all the fields are filled', async ({
    page,
}) => {
    const yourNameInput = page.locator('(//input[@placeholder="yourname"])[1]')
    const claimButton = page.locator('(//*[contains(text(), "Claim")])[1]')
    const almostThereText = page.locator('//*[text()="Almost there"]')

    await page.goto('https://dental.bio/')
    await yourNameInput.fill('test10')
    await expect(yourNameInput).toHaveValue('test10')
    await claimButton.click()
    await expect(almostThereText).toBeVisible()
})
