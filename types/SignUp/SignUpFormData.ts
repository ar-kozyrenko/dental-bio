import { Title } from './Title'
import { Country } from './Country'
import { Position } from './Position'
import { BirthDate } from './BirthDate'

export interface SignUpFormData {
    title: Title
    email: string
    firstName: string
    lastName: string
    birthDate?: BirthDate
    position: Position
    country?: Country
    offerCode?: string
    password: string
    confirmPassword?: string
}
