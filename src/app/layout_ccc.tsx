// import CategoryProvider from '@/context/CategoryContext'
// import CategoryNewsProvider from '@/context/CategoryNewsContext'
// import InfoProvider from '@/context/InfoContext'
// import categoryApi, { Category } from '@/http/categoryApi'
// import categoryNewsApi, { CategoryNews } from '@/http/categoryNewsApi'
// import infoApi, { Info } from '@/http/infoApi'
// import { Locale, locales } from '@/i18n'
// import { Metadata } from 'next'
// import { NextIntlClientProvider } from 'next-intl'
// import { getMessages, unstable_setRequestLocale } from 'next-intl/server'

// export async function generateStaticParams() {
//     return locales.map((locale) => ({ locale }))
// }

// export const metadata: Metadata = {
//     title: 'Trang chủ | Biofix fresh',
//     description: 'Biofix fresh',
//     icons: [{ rel: 'icon', url: './favicon.ico' }],
//     verification: {
//         google: 'QZAsBJDJCrYl4AhVYgf441FD2Vcy3SYP',
//     },
// }

// export default async function RootLayout({
//     children,
//     params: { locale },
// }: {
//     children: React.ReactNode
//     params: { locale: Locale }
// }) {
//     unstable_setRequestLocale(locale)
//     const messages = await getMessages({ locale })

//     let info: Info
//     let categories: Category[]
//     let categoryNews: CategoryNews[]

//     try {
//         info = await infoApi.get()
//         categories = await categoryApi.getCategories()
//         categoryNews = await categoryNewsApi.getCategories()
//     } catch (error) {
//         info = {} as Info
//         categories = []
//         categoryNews = []
//     }

//     return (
//         <html lang={locale}>
//             <body>
//                 <NextIntlClientProvider locale={locale} messages={messages}>
//                     <InfoProvider initInfo={info}>
//                         <CategoryProvider initCategories={categories}>
//                             <CategoryNewsProvider initCategories={categoryNews}>
//                                 <main>{children}</main>
//                             </CategoryNewsProvider>
//                         </CategoryProvider>
//                     </InfoProvider>
//                 </NextIntlClientProvider>
//             </body>
//         </html>
//     )
// }
