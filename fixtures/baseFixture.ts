import { test as base } from '@playwright/test'
import { PageManager } from '../base/PageManager'
import { ApiManager } from '../base/ApiManager'

type Pages = {
    pageManager: PageManager
    apiManager: ApiManager
}

export const test = base.extend<Pages>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page)
        await use(pageManager)
    },
    apiManager: async ({ request }, use) => {
        const apiManager = new ApiManager(request)
        await use(apiManager)
    },
})
