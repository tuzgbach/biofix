import newsApi, { News } from '@/http/newsApi'
import DetailNews from './DetailNews'
import ErrorPage from '@/components/ErrorPage'
import { Metadata, ResolvingMetadata } from 'next'
import { baseOpenGraph } from '@/utils/seo'
import { Locale } from '@/i18n'
import { processNewsUrl } from '@/utils'


const getDetailNews = async (slug: string) => {
    const news = await newsApi.getDetail(slug, { next: { revalidate: 60 } })
    const process = processNewsUrl([news])
    return process[0]
}
const getAllNews = async () => {
    const news = await newsApi.get({ size: 1000, sort: 'createdAt,desc', next: { revalidate: 60 } })
    news.content = processNewsUrl(news.content)
    return news
}

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: { locale: Locale; slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}): Promise<Metadata> {
    const { locale, slug } = params
    const news = await getDetailNews(slug)
    const { meta, name, description, thumb } = news
    const url = `${process.env.NEXT_PUBLIC_URL}/${locale}/${slug}`

    const images = [
        ...(news.images?.map((v) => ({ url: v, alt: name[locale] })) ?? []),
        { url: thumb, alt: name[locale] },
    ]

    return {
        title: meta.metaTitle ?? name[locale],
        description: meta.metaDescription ?? description[locale],
        openGraph: {
            ...baseOpenGraph,
            title: name[locale],
            description: description[locale],
            url,
            images,
        },
        alternates: {
            canonical: url,
        },
    }
}

export async function generateStaticParams() {
    const news = await getAllNews()
    const { content } = news
    return content.map((n) => ({ slug: n.slug }))
}

export interface IPageDetailNewsProps {
    params: {
        slug: string
    }
}

const PageDetailNews = async ({ params: { slug } }: IPageDetailNewsProps) => {
    let news: News
    let allNews: News[]

    try {
        news = await getDetailNews(slug)
        allNews = (await getAllNews()).content
    } catch (error) {
        return <ErrorPage type="404" subTitle="Không tìm thấy bài viết" />
    }

    return (
        <div>
            <DetailNews news={news} allNews={allNews} />
        </div>
    )
}

export default PageDetailNews

