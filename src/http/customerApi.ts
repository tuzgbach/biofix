import { CustomerDemand, CustomerState } from '@/utils/constants'
import { Category } from './categoryApi'
import http, { CustomOptions } from './http'

export type Demand = keyof typeof CustomerDemand
export type State = keyof typeof CustomerState

export type Customer = {
    id: string
    name: string
    email: string
    phone: string
    address: string
    content: string
    category: Category
    isRead: boolean
    demand: Demand
    state: State
    createdAt: string
}

const customerApi = {
    register: (body: any) => http.post<any>('v1/customer/register', body),
}

export default customerApi
