import { Page } from '@playwright/test'
import { HomePage } from '../pages/HomePage'
import { SignUpPage } from '../pages/SignUpPage'
import { LoginPage } from '../pages/LoginPage'

export class PageManager {
    homePage: HomePage
    signUpPage: SignUpPage
    logInPage: LoginPage

    constructor(page: Page) {
        this.homePage = new HomePage(page)
        this.signUpPage = new SignUpPage(page)
        this.logInPage = new LoginPage(page)
    }
}
