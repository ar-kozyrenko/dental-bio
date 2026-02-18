import { Page, expect } from '@playwright/test'
import { HomePageLocators } from './locators/HomePageLocators'
import { BasePage } from '../base/BasePage'

export class HomePage extends BasePage {
    locator: HomePageLocators

    constructor(page: Page) {
        super(page)
        this.locator = new HomePageLocators(page)
    }

    async claimYourName(username: string): Promise<void> {
        await this.locator.yourNameInput.fill(username)
        await expect(this.locator.yourNameInput).toHaveValue(username)
        await this.locator.claimButton.click()
    }

    async claimUniqueUserName(username: string): Promise<void> {
        await this.claimYourName(username)
        await expect(this.page).toHaveURL(
            new RegExp(`/register\\?username=${username}`)
        )
    }

    async claimTakenUsername(username: string): Promise<void> {
        await this.claimYourName(username)
        await expect(this.locator.userNameTakenErrorContainer).toContainText([
            'Oops! That username is taken.',
            'Choose a different one or get creative!',
        ])
    }
}
