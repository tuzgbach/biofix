import categoryApi from '@/http/categoryApi'
import categoryNewsApi from '@/http/categoryNewsApi'
import infoApi from '@/http/infoApi'
import newsApi from '@/http/newsApi'
import productApi from '@/http/productApi'
import { parseDateTime } from '@/utils'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const url = process.env.NEXT_PUBLIC_URL ?? 'https://biofixfresh.com'

    const allNews = (await newsApi.get({ params: { size: 1000 } })).content

    const products = (await productApi.get({ params: { size: 1000 } })).content

    const info = await infoApi.get()

    const cates = await categoryApi.getCategories()

    const catesNews = await categoryNewsApi.getCategories()

    // news detail endpoints
    const newsEndpoints: MetadataRoute.Sitemap = allNews.map((news) => ({
        url: `${url}/${news.slug}`,
        lastModified: parseDateTime(news.updatedAt),
        changeFrequency: 'weekly',
    }))

    // product detail endpoints
    const productEndpoints: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${url}/product/${product.slug}`,
        lastModified: parseDateTime(product.updatedAt),
        changeFrequency: 'weekly',
    }))

    const productEndpointsVi: MetadataRoute.Sitemap = products.map((product) => ({
        url: `${url}/san-pham/${product.slug}`,
        lastModified: parseDateTime(product.updatedAt),
        changeFrequency: 'weekly',
    }))

    // category endpoints
    const cateEndpoints: MetadataRoute.Sitemap = cates.map((cate) => ({
        url: `${url}/category/${cate.slug}`,
        lastModified: parseDateTime(cate.updatedAt),
        changeFrequency: 'weekly',
    }))

    const cateEndpointsVi: MetadataRoute.Sitemap = cates.map((cate) => ({
        url: `${url}/danh-muc-san-pham/${cate.slug}`,
        lastModified: parseDateTime(cate.updatedAt),
        changeFrequency: 'weekly',
    }))

    // category news endpoints
    const cateNewsEndpoints: MetadataRoute.Sitemap = catesNews.map((cate) => ({
        url: `${url}/news/${cate.slug}`,
        lastModified: parseDateTime(cate.updatedAt),
        changeFrequency: 'weekly',
    }))

    const cateNewsEndpointsVi: MetadataRoute.Sitemap = catesNews.map((cate) => ({
        url: `${url}/tin-tuc/${cate.slug}`,
        lastModified: parseDateTime(cate.updatedAt),
        changeFrequency: 'weekly',
    }))

    return [
        {
            url,
            lastModified: parseDateTime(info.updatedAt) ?? new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${url}/product`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${url}/san-pham`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${url}/news`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${url}/tin-tuc`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${url}/contact`,
            lastModified: parseDateTime(info.updatedAt) ?? new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${url}/gioi-thieu`,
            lastModified: parseDateTime(info.updatedAt) ?? new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },

        ...cateNewsEndpointsVi,
        ...newsEndpoints,
        ...productEndpointsVi,
        ...productEndpoints,
        ...cateEndpointsVi,
        ...cateEndpoints,
        ...cateNewsEndpoints,
    ]
}
