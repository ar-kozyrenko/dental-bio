import { HomePage } from '../pages/HomePage'
import { test } from '@playwright/test'
import { HomePageTestData } from '../test-data/HomePageTestData'

test.beforeEach('Open the HomePage', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.openHomePage('/')
})

test.describe('Home page - user name validation', () => {
    test('username is unique - registration page is opened', async ({
        page,
    }) => {
        const homePage = new HomePage(page)
        const uniqueUserName = HomePageTestData.generateUniqueUserName()

        await homePage.claimUniqueUserName(uniqueUserName)
    })
    test('username is taken - error is displayed', async ({ page }) => {
        const homePage = new HomePage(page)
        const takenUserName = HomePageTestData.returnTakenUserName()
        await homePage.claimTakenUsername(takenUserName)
    })
})
