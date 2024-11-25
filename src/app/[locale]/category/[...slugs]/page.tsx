import PageProductCategory from '../../product/PageProductCategory'
import infoApi from '@/http/infoApi'
import { Locale } from '@/i18n'
import { Metadata } from 'next'
import { baseOpenGraph } from '@/utils/seo'

import { processInfoUrl } from '@/utils'

const getInfo = async () => {
    const info = await infoApi.get({ next: { revalidate: 60 }, params: { isDeleted: false } })
    return processInfoUrl(info)
}
type Props = {
    params: { locale: Locale }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const { locale } = params
    const info = await getInfo()
    const { brands, metaProduct: meta } = info
    const brand = brands[0]
    const url = `${process.env.NEXT_PUBLIC_URL}/${locale === 'vi' ? '' : locale}`

    const description = meta?.metaDescription ?? brands.map((v) => v.slogan[locale]).join(' ')

    const title = meta?.metaTitle ?? brand.title[locale]

    const images = [meta?.metaImage].map((v, i) => ({
        url: v ?? brands[i].image,
        alt: brands[i]?.slogan[locale] ?? 'Biofix fresh',
    }))
    return {
        title,
        description,
        openGraph: {
            ...baseOpenGraph,
            title,
            description,
            url,
            images,
        },
        alternates: {
            canonical: url,
        },
    }
}

export default function CategoryPage({ params: { slugs } }: { params: { slugs: string[] } }) {
    return <PageProductCategory slug={slugs[slugs.length - 1]} />
}
