import { http } from '@/http'
import { User } from './authApi'
import { Category } from './categoryApi'
import { CustomOptions, Options, Page } from './http'

export type Product = {
    id: string
    code: string
    name: {
        en: string
        vi: string
    }
    slug: string
    meta: {
        metaTitle: string | null
        metaDescription: string | null
        metaImage: string | null
        metaKeywords: string | null
        metaTags: string | null
    }
    description: {
        en: string
        vi: string
    }
    content: {
        en: string
        vi: string
    }
    image: string
    video: string
    positives: {
        en: string
        vi: string
    }[]
    composition: {
        en: string | null
        vi: string | null
    }
    microbialDensity: {
        en: string | null
        vi: string | null
    }
    isDeleted: boolean
    category: Category
    isShowInHome: boolean
    createdBy: User
    updatedBy: User
    createdAt: string
    updatedAt: string
}

const productApi = {
    get: async (params: any, options?: Options) =>
        http.get<Page<Product>>('/v1/product/with-page', { ...options, params }),
    getDetail: (slug: string, options?: Options) =>
        http.get<Product>(`/v1/product/${slug}`, options),
}

export default productApi
