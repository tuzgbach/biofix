import infoApi from '@/http/infoApi'
import PageContact from './PageContact'
import { processInfoUrl } from '@/utils'
import { Locale } from '@/i18n'
import { Metadata } from 'next'
import { baseOpenGraph } from '@/utils/seo'

const getInfo = async () => {
    const info = await infoApi.get({ next: { revalidate: 60 } })
    return processInfoUrl(info)
}
type Props = {
    params: { locale: Locale }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const strTitle = 'Tổng hợp bài viết mới nhất'
    const { locale } = params
    const info = await getInfo()
    const { brands, metaAbout: meta } = info
    const brand = brands[0]
    const url = `${process.env.NEXT_PUBLIC_URL}/${locale === 'vi' ? '' : locale}`

    const description = meta?.metaDescription ?? brands.map((v) => v.slogan[locale]).join(' ')

    const title = meta?.metaTitle ?? brand.title[locale]

    const images = [meta?.metaImage, ...info.images].map((v, i) => ({
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

export default function Contact() {
    return (
        <>
            <PageContact />
        </>
    )
}
