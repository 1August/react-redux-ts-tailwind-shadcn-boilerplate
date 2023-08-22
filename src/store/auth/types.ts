export type AuthState = {
    user: {
        name: string
        email: string
    } | null
    token: string | null
    loading: boolean
    status: number | null
    message: string | null
}
