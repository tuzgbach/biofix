import ErrorPage from '@/components/ErrorPage'
import productApi, { Product } from '@/http/productApi'
import { Locale } from '@/i18n'
import { processProductsUrl } from '@/utils'
import { baseOpenGraph } from '@/utils/seo'
import next, { Metadata } from 'next'
import DetailProduct from './DetailProduct'

const getDetailProduct = async (slug: string) => {
    const product = await productApi.getDetail(slug, { next: { revalidate: 60 } })
    const process = processProductsUrl([product])
    return process[0]
}
const getAllProduct = async () => {
    const products = await productApi.get({
        params: {
            page: 0,
            size: 1000,
        },
        next: { revalidate: 60 },
    })
    return processProductsUrl(products.content)
}

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { locale: Locale; slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
    const { locale, slug } = params
    const product = await getDetailProduct(slug)
    const { meta, name, description, image, video } = product
    const url = `${process.env.NEXT_PUBLIC_URL}/${locale}/${slug}`

    const images = [{ url: image, alt: name[locale] }]

    return {
        title: meta.metaTitle ?? name[locale],
        description: meta.metaDescription ?? description[locale],
        openGraph: {
            ...baseOpenGraph,
            title: name[locale],
            description: description[locale],
            url,
            images,
            videos: [{ url: video }],
            tags: meta.metaTags?.split(',').map((v) => v.trim()) ?? [],
        },
        alternates: {
            canonical: url,
        },
    }
}

export async function generateStaticParams() {
    const products = await getAllProduct()
    return products.map((n) => ({ slug: n.slug }))
}

const PageDetailProduct = async ({ params: { slug } }: { params: { slug: string } }) => {
    let product: Product
    try {
        product = await getDetailProduct(slug)
    } catch (error) {
        return <ErrorPage type="404" subTitle="Không tìm thấy sản phẩm" />
    }

    return (
        <>
            <DetailProduct product={product} currentCate={null} />
        </>
    )
}

export default PageDetailProduct
