import { defineConfig, devices } from '@playwright/test'
import dotenv from 'dotenv'

dotenv.config()

export default defineConfig({
    testDir: './tests',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    outputDir: 'test-results',

    reporter: [['html', { open: 'always' }]],

    use: {
        trace: 'on-first-retry',
        headless: !!process.env.CI,
        navigationTimeout: 30000,
        actionTimeout: 15000,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        baseURL: process.env.BASE_URL || 'https://dental.bio',
        screenshot: 'only-on-failure',
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
            },
        },
    ],
})
