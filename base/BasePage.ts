import { Page, expect } from '@playwright/test'

export class BasePage {
    page: Page

    constructor(page: Page) {
        this.page = page
    }

    async openPage(url: string): Promise<void> {
        this.page.goto(url)
    }

    async expectToBeOnPage(endpoint: string, time = 5000): Promise<void> {
        const pattern = new RegExp(`/${endpoint}$`)
        await expect(this.page).toHaveURL(pattern, { timeout: time })
    }
}
