import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import playwright from 'eslint-plugin-playwright'
import prettier from 'eslint-plugin-prettier'
import globals from 'globals'
import { defineConfig } from 'eslint/config'

export default defineConfig([
    // ===== JavaScript =====
    {
        files: ['**/*.{js,mjs,cjs}'],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            js,
            prettier,
        },
        rules: {
            'no-var': 'error',
            'prefer-const': 'error',
            'no-unused-vars': 'error',
            'prettier/prettier': 'error',
        },
    },

    // ===== TypeScript =====
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
            prettier,
        },
        rules: {
            // ❗ базовое правило отключаем
            'no-unused-vars': 'off',

            // ✅ используем TS-версию
            '@typescript-eslint/no-unused-vars': 'error',

            'prefer-const': 'error',
            'no-var': 'error',
            'prettier/prettier': 'error',
        },
    },

    // ===== Playwright tests =====
    {
        files: ['tests/**/*.ts'],
        plugins: {
            playwright,
        },
        rules: {
            'playwright/no-focused-test': 'error',
            'playwright/no-page-pause': 'warn',
        },
    },
])
