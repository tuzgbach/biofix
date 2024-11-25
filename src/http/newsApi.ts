import { http } from '.'
import { Category } from './categoryApi'
import { CustomOptions, Options, Page } from './http'

export type News = {
    id: string
    name: { vi: string; en: string }
    content: { vi: string; en: string }
    description: { vi: string; en: string }
    thumb: string
    slug: string
    images: string[] | []
    isPublished: boolean
    category: Category
    totalView: number
    tags: string[]
    meta: {
        metaTitle: string | null
        metaDescription: string | null
        metaImage: string | null
        metaKeywords: string[] | []
        metaTags: string[] | []
    }
    isShowInHome: boolean
    type: 'NEWS' | 'EVENT'
    startDate: string
    endDate: string
    createdAt: any
    updatedAt: any
    createdBy: any
    updatedBy: any
}

const newsApi = {
    get: (body: any) => http.get<Page<News>>('/v1/news', body),
    getDetail: (slug: string, options?: Options) => http.get<News>(`/v1/news/${slug}`, options),
}
export default newsApi
