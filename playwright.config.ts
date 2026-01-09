import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright Test configuration
 * Только Chromium для локального запуска
 * Trace включается только при падении теста
 */
export default defineConfig({
    testDir: './tests', // папка с тестами
    fullyParallel: true, // тесты в файлах можно запускать параллельно
    forbidOnly: !!process.env.CI, // запретить test.only на CI
    retries: process.env.CI ? 2 : 0, // повторять падения только на CI
    workers: process.env.CI ? 1 : undefined, // ограничить количество воркеров на CI
    reporter: 'html', // HTML отчет

    use: {
        // базовые настройки для всех тестов
        trace: 'on-first-retry', // собираем trace только при первом повторе (т.е. при падении)
        headless: process.env.CI ? true : false, // GUI локально, headless на CI
        navigationTimeout: 30000,
        actionTimeout: 15000,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true, // иногда полезно для dev-серверов с самоподписанным SSL
    },

    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: false, // локально видим браузер
            },
        },
    ],

    // Опционально: запуск dev-сервера перед тестами
    // webServer: {
    //     command: "npm run start",
    //     url: "http://localhost:3000",
    //     reuseExistingServer: !process.env.CI,
    // },
})
