import { http } from '.'
import { Options, Page } from './http'
import { News } from './newsApi'
import { Product } from './productApi'

export type MetaSeo = {
    metaTitle?: string
    metaDescription?: string
    metaImage?: string
    metaKeywords?: string[]
    metaTags?: string[]
}

export type BrandsInfo = {
    title: { en: string; vi: string }
    slogan: { en: string; vi: string }
    description: { en: string; vi: string }
    image: string
}
export type AddressInfo = {
    key: { en: string; vi: string }
    value: { en: string; vi: string }
    x: number | null
    y: number | null
}

export type Info = {
    id: string
    name: { en: string; vi: string }
    description: { en: string; vi: string }
    email: string
    logo: string
    address: AddressInfo[]
    hostLines: Array<{ key: { en: string; vi: string }; value: { en: string; vi: string } }>
    linkChannels: Array<{ name: string; url: string; icon: string }>
    linkShops: Array<{ name: string; url: string; icon: string }>
    policies: Array<{ key: { en: string; vi: string }; value: { en: string; vi: string } }>
    banner: string
    routeLogin: string
    banners: string[]
    images: string[]
    brands: BrandsInfo[]
    brandsInProduct: BrandsInfo[]
    createdAt: string
    updatedAt: string
    meta: MetaSeo
    metaProduct: MetaSeo
    metaNews: MetaSeo
    metaAbout: MetaSeo
}

const infoApi = {
    get: (options?: Options) => http.get<Info>('/v1/info', options),
    getNewsShowInfo: (options?: Options) => http.get<News[]>('/v1/news/show-in-home', options),
    getProductsShowInfo: (options?: Options) =>
        http.get<Product[]>('/v1/product/show-in-home', options),
    getEventShowInfo: (options?: Options) =>
        http.get<Page<News>>('/v1/news', {
            ...options,
            params: { type: 'EVENT', size: 10, sort: 'createdAt,desc' },
        }),
}

export default infoApi
