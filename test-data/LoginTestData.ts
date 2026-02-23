import { LoginFormData } from '../types/LogIn/LogInFormData'

export const VALID_LOGIN_DATA: LoginFormData = {
    email: process.env.DEFAULT_USER_LOGIN || '',
    password: process.env.DEFAULT_USER_PASSWORD || '',
}
export const INVALID_EMAIL_DATA: LoginFormData = {
    email: 'mastinirke@necub2.com',
    password: process.env.DEFAULT_USER_PASSWORD || '',
}
export const INVALID_PASSWORD_DATA: LoginFormData = {
    email: process.env.DEFAULT_USER_LOGIN || '',
    password: 'Ab12345',
}

export const EMPTY_EMAIL_DATA: LoginFormData = {
    email: '',
    password: process.env.DEFAULT_USER_PASSWORD || '',
}
export const EMPTY_PASSWORD_DATA: LoginFormData = {
    email: process.env.DEFAULT_USER_LOGIN || '',
    password: '',
}
