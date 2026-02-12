import { Page } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SignUpPage } from '../pages/SignUpPage'

export class PageManager {
    page: Page
    homePage: HomePage
    signUpPage: SignUpPage

    constructor(page: Page) {
        this.page = page
        this.homePage = new HomePage(page)
        this.signUpPage = new SignUpPage(page)
    }
}
