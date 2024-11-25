import http, { CustomOptions } from './http'

export type User = {
    id: string
    name: string
    email: string
    image: string | null
    isDeleted: boolean
    verify: boolean
    authType: string
    roles: string[]
    address: string | null
    createdAt: string
    updateAt: string
    oauth2Id: string | null
}

export type Auth = {
    user: User
    token: { accessToken: string; refreshToken: string }
}

const authApi = {
    login: (body: any) => http.post<any>('v1/auth/login', body),

    getProfile: () => http.post<User>('v1/user/profile', {}),
}

export default authApi
