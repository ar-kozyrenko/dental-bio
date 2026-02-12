import { test as base } from '@playwright/test'
import { PageManager } from '../base/PageManager'

type Pages = {
    pageManager: PageManager
}

export const test = base.extend<Pages>({
    pageManager: async ({ page }, use) => {
        const pageManager = new PageManager(page)
        await use(pageManager)
    },
})
