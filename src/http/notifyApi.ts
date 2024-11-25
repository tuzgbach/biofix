import { http } from '.'
import { Category } from './categoryApi'
import { Customer } from './customerApi'
import { Page } from './http'

export type Notify = {
    content: Customer
    id: string
    sendToRoles: string[]
    type: 'CUSTOMER_REGISTER'
    isRead: boolean
    createdAt: string
}

const notifyApi = {
    get: () => http.post<Page<Notify>>('v1/notify', null),
}

export default notifyApi
