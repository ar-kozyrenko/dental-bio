import js from '@eslint/js'
import ts from '@typescript-eslint/eslint-plugin'
import playwright from 'eslint-plugin-playwright'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    // JS правила
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: { globals: globals.browser },
        plugins: { js, prettier },
        rules: {
            'no-var': 'error',
            'prefer-const': 'error',
            'no-unused-vars': 'error',
            'prettier/prettier': 'error', // включаем Prettier
        },
    },

    // TypeScript правила
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
        },
        plugins: { ts, prettier },
        rules: {
            'no-unused-vars': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            'no-use-before-define': 'error',
            'prettier/prettier': 'error',
        },
    },

    // Playwright тесты
    {
        files: ['tests/**/*.ts'],
        plugins: { playwright },
        rules: {
            'playwright/no-focused-test': 'error',
        },
    },
])
