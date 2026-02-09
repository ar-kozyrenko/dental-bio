import { Page, Locator } from '@playwright/test'

export class HomePageLocators {
    page: Page
    yourNameInput: Locator
    claimButton: Locator
    almostThereText: Locator
    userNameTakenErrorContainer: Locator

    constructor(page: Page) {
        this.page = page
        this.yourNameInput = page.locator(
            '(//input[@placeholder="yourname"])[1]'
        )
        this.claimButton = page.locator('(//button[@type="submit"])[1]')
        this.almostThereText = page.locator('//*[text()="Almost there"]')
        this.userNameTakenErrorContainer = page
            .locator('div')
            .filter({ hasText: 'Oops' })
    }
}
