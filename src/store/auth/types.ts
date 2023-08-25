import { ApiResponse } from '@/lib/api';
import { z } from 'zod';

export type AuthState = UserResponse & ApiResponse
export type NullableAuthState = NullableUserResponse & ApiResponse

export type UserResponse = {
    user: User
    token: UserToken
}

export type NullableUserResponse = {
    user: User | null
    token: UserToken | null
}

export type User = {
    name: string
    email: string
}

export type UserToken = string

// Login
const loginDataSchema = z.object({
    email: z.string().email({ message: 'Should be valid email' }).min(6).max(32),
    password: z.string().min(6).max(32).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
})

export type LoginData = z.infer<typeof loginDataSchema>

// loginDataSchema.safeParse({
//     email: 'qwerty@gmail.com',
//     password: 'Qwerty123'
// })
