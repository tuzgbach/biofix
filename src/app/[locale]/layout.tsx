import RestoreScroll from '@/components/RestoreScroll'
import Footer from '@/components/layouts/Footer'
import NavLeft from '@/components/layouts/NavLeft'
import Navbar from '@/components/layouts/Navbar'
import CategoryProvider from '@/context/CategoryContext'
import CategoryNewsProvider from '@/context/CategoryNewsContext'
import InfoProvider from '@/context/InfoContext'
import MessageProvider from '@/context/MessageContext'
import categoryApi, { Category } from '@/http/categoryApi'
import categoryNewsApi, { CategoryNews } from '@/http/categoryNewsApi'
import infoApi, { Info } from '@/http/infoApi'
import { Locale, locales } from '@/i18n'
import { processCategoriesNewsUrl, processCategoriesUrl, processInfoUrl } from '@/utils'
import { baseOpenGraph } from '@/utils/seo'
import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, unstable_setRequestLocale } from 'next-intl/server'
import '../globals.css'

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
    params,
}: {
    params: { locale: Locale }
}): Promise<Metadata> {
    const { locale } = params
    const info = processInfoUrl(await infoApi.get())
    const { brands, meta, logo, linkChannels } = info
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
            siteName: brand.title[locale],
        },
        alternates: {
            canonical: url,
        },
        keywords: meta?.metaKeywords,
        icons: { href: url, icon: logo, username: 'biofixfresh' },
        authors: { url: linkChannels[0].url, name: 'Biofix Fresh' },
        abstract: description,
    }
}

export default async function RootLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: Locale }
}) {
    unstable_setRequestLocale(locale)
    const messages = await getMessages({ locale })

    let info: Info
    let categories: Category[]
    let categoryNews: CategoryNews[]

    try {
        info = processInfoUrl(await infoApi.get())
        categories = processCategoriesUrl(await categoryApi.getCategories())
        categoryNews = processCategoriesNewsUrl(await categoryNewsApi.getCategories())
    } catch (error) {
        info = {} as Info
        categories = []
        categoryNews = []
    }

    // const structuredData = {
    //     '@context': 'https://schema.org',
    //     '@type': 'Organization',
    //     url: 'https://yourwebsite.com',
    //     logo: 'https://yourwebsite.com/path/to/logo.png',
    //     contactPoint: [
    //         {
    //             '@type': 'ContactPoint',
    //             telephone: '+1-800-555-5555',
    //             contactType: 'Customer service',
    //         },
    //     ],
    // }

    return (
        <html lang={locale}>
            {/* <Head>
                <title>{metadata.title}</title>
                <meta name="description" content={metadata.description} />
                <meta name="keywords" content={metadata.keywords?.join(', ')} />
                <link rel="icon" href="https://yourwebsite.com/path/to/logo.png" type="image/png" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </Head> */}
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <InfoProvider initInfo={info}>
                        <CategoryProvider initCategories={categories}>
                            <CategoryNewsProvider initCategories={categoryNews}>
                                <MessageProvider>
                                    <RestoreScroll />
                                    <div className="w-full">
                                        <NavLeft className="z-50 w-[6.5rem] hidden lg:block" />
                                        <Navbar className="bg-white shadow-md lg:pl-[4rem] h-[4rem] lg:h-[5rem] fixed z-40 top-0 right-0 left-0" />
                                        <div className="to-biofixfresh-background flex flex-col w-full ">
                                            <main className="lg:pl-[6.5rem] lg:pt-[5rem]">
                                                {children}
                                            </main>
                                        </div>
                                        <Footer />
                                    </div>
                                </MessageProvider>
                            </CategoryNewsProvider>
                        </CategoryProvider>
                    </InfoProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    )
}
