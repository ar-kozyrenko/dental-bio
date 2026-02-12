import { HomePage } from '../pages/HomePage'
import { test } from '../fixtures/baseFixture'
import { HomePageTestData } from '../test-data/HomePageTestData'

test.beforeEach('Open the HomePage', async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.openHomePage('/')
})

test.describe('Home page - user name validation', () => {
    test('username is unique - registration page is opened', async ({
        pageManager,
    }) => {
        const uniqueUserName = HomePageTestData.generateUniqueUserName()

        await pageManager.homePage.claimUniqueUserName(uniqueUserName)
    })
    test('username is taken - error is displayed', async ({ pageManager }) => {
        const takenUserName = HomePageTestData.returnTakenUserName()
        await pageManager.homePage.claimTakenUsername(takenUserName)
    })
})
