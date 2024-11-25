import { http } from '.'
import { User } from './authApi'

export type CategoryNews = {
    id: string
    name: {
        en: string
        vi: string
    }
    slug: string
    image: string
    createdBy: User
    updatedBy: User
    createdAt: string
    updatedAt: string
    deleted: boolean
}
const categoryNewsApi = {
    getCategories: () => http.get<CategoryNews[]>('/v1/categoryNews'),
}

export default categoryNewsApi
