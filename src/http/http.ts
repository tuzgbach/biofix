import { normalizePath } from '@/utils'

import { isClient } from '.'
import { Auth } from './authApi'

export type Params = { [key: string]: string | number | boolean } | undefined

export type CustomOptions = Omit<RequestInit, 'method'> & {
    baseUrl?: string | undefined
    params?: Params
}

export type Page<Object> = {
    content: Object[]
    totalPage: number
    currentPage: number
    pageSize: number
    totalElement: number
    last: boolean
}

export type PayLoad<Object> = {
    code: number
    status: string
    message: string
    data: Object
}

export class ErrorPayload extends Error {
    code: number
    status: string
    message: string
    data: any

    constructor(payload: PayLoad<any>) {
        super(payload.data ?? payload.message ?? 'unknown error')
        this.code = payload.code as number
        this.status = payload.status as string
        this.message = payload.message as string
        this.data = payload.data
    }
}

const AUTHENTICATION_ERROR_STATUS: number = 401

let clientLogoutRequest: null | Promise<any> = null

const request = async <Response>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    options?: CustomOptions | undefined
) => {
    let body: FormData | string | undefined = undefined

    if (options?.body instanceof FormData) body = options.body
    else if (options?.body) body = JSON.stringify(options.body)

    const baseHeaders: { [key: string]: string } =
        body instanceof FormData ? {} : { 'Content-Type': 'application/json' }

    // if (isClient()) {
    //     baseHeaders['x-client-id'] = clientIdStorage.get() ?? ''
    //     baseHeaders['authorization'] = accessTokenStorage.get() ?? ''
    // }

    // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
    // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

    if (options?.params) {
        const params = Object.entries(options.params).reduce((acc, [key, value]) => {
            if (value !== undefined && value !== null) {
                acc[key] = String(value)
            }
            return acc
        }, {} as Record<string, string>)
        url += '?' + new URLSearchParams(params).toString()
    }

    const baseUrl =
        options?.baseUrl === undefined ? process.env.NEXT_PUBLIC_API_URL + '/api' : options.baseUrl

    const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`

    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers,
        } as any,
        body,
        method,
    })

    const payload: PayLoad<Response> = await res.json()

    const { code, status, message, data } = payload

    // if (normalizePath(url) === 'v1/info') {
    // }

    if (!res.ok) {
        throw new ErrorPayload(payload)
    }

    // Đảm bảo logic dưới đây chỉ chạy ở phía client (browser)
    // if (isClient()) {
    //     if (['v1/auth/login', 'v1/auth/register'].some((item) => item === normalizePath(url))) {
    //         const {
    //             user,
    //             token: { accessToken, refreshToken },
    //         } = data as Auth
    //         clientIdStorage.set(user.id)
    //         accessTokenStorage.set(accessToken)
    //         refreshTokenStorage.set(refreshToken)
    //     } else if ('auth/logout' === normalizePath(url)) {
    //         removeAllLocalStorage()
    //         location.href = '/login'
    //     }
    // }
    return data as Response
}

export type Options = Omit<CustomOptions, 'body'> | undefined

const http = {
    get<Response>(url: string, options?: Options) {
        return request<Response>('GET', url, options)
    },
    post<Response>(url: string, body: any, options?: Options) {
        return request<Response>('POST', url, { ...options, body })
    },
    put<Response>(url: string, body: any, options?: Options) {
        return request<Response>('PUT', url, { ...options, body })
    },
    delete<Response>(url: string, options?: Options) {
        return request<Response>('DELETE', url, { ...options })
    },
}

export default http
