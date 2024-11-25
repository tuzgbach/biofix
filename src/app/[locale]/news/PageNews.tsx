'use client'

import { IfElse } from '@/components/Condition'
import ErrorPage from '@/components/ErrorPage'
import { LinkLocale } from '@/components/LinkLocale'
import { useCategoryNews } from '@/context/CategoryNewsContext'
import { CategoryNews } from '@/http/categoryNewsApi'
import newsApi, { News } from '@/http/newsApi'
import { Locale } from '@/i18n'
import { useRouter } from '@/navigation'
import { processNewsUrl } from '@/utils'
import { BreadcrumbItem, Breadcrumbs, Listbox, ListboxItem } from '@nextui-org/react'
import { Avatar, Divider, Pagination } from 'antd'
import { useLocale, useTranslations } from 'next-intl'
import { Suspense, useEffect, useState } from 'react'
import { IoMdDoneAll } from 'react-icons/io'
import CardNews, { CardNewsType } from './CardNews'

const queryInitialState = {
    page: 0,
    size: 10,
    sort: null,
    keySearch: null,
    categoryId: null,
}

type QueryInitialState = {
    page: number
    size: number
    sort: string | null
    keySearch: string | null
    categoryId: string | null
}

const PageNews = ({ categorySlug }: { categorySlug?: string }) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const router = useRouter()

    const category = categorySlug
    const { categoriesNews } = useCategoryNews()
    const [news, setNews] = useState<News[]>([])
    const [err, setErr] = useState<string>('')
    const [totalElement, setTotalElement] = useState<number>(0)
    const [query, setQuery] = useState<QueryInitialState>(queryInitialState)
    const [selectedUi, setSelectedUi] = useState<CardNewsType>('table')
    const [allNews, setAllNews] = useState<News[]>([])

    useEffect(() => {
        if (category) {
            const foundCate =
                categoriesNews && categoriesNews.find((cate) => cate.slug === category)
            if (!foundCate) setErr('Trang không tồn tại')
            else {
                setQuery((prev) => ({ ...prev, categoryId: foundCate?.id }))
                setErr('')
            }
        } else {
            setQuery((prev) => ({ ...prev, categoryId: null }))
        }
    }, [category, categoriesNews])

    useEffect(() => {
        let isMounted = true
        ;(async () => {
            try {
                const res = await newsApi.get({ params: query })
                if (isMounted) {
                    setQuery((prev) => ({
                        ...prev,
                        page: res.currentPage,
                        size: res.pageSize,
                    }))
                    setTotalElement(res.totalElement)
                    const processedNews = processNewsUrl(res.content)
                    setAllNews(processedNews)
                    setNews(processedNews)
                }
            } catch (error) {
                if (isMounted) setErr(error as string)
            }
        })()

        return () => {
            isMounted = false
        }
    }, [query.page, query.size, query.categoryId])

    const currentItems = allNews.slice(0, 7)

    return (
        <Suspense fallback={<div>....... Đang load</div>}>
            <div className="md:ml-[7rem] ml-0 mt-20">
                <div className="w-[95%] mx-auto my-10">
                    <IfElse if={!err} else={<ErrorPage type="404" subTitle={err} />}>
                        <Breadcrumbs className="text-2xl font-semibold">
                            <BreadcrumbItem>Trang chủ</BreadcrumbItem>
                            <BreadcrumbItem>News</BreadcrumbItem>
                        </Breadcrumbs>

                        <p className="text-3xl md:text-5xl font-sans font-semibold text-start mt-5">
                            {t('common.news')}
                        </p>

                        {/* Center news */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2 order-2 lg:order-none p-5">
                                <div
                                    className={`${
                                        selectedUi === 'table'
                                            ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-none'
                                            : 'space-y-4 rounded-none'
                                    }`}
                                >
                                    {news &&
                                        news.map((item) => (
                                            <CardNews key={item.id} item={item} type={selectedUi} />
                                        ))}
                                </div>
                            </div>

                            {/* Sidebar news */}
                            <div className="order-1 lg:order-none p-5 bg-white">
                                <p className="text-xl font-semibold mb-2">
                                    {t('page-news.category')}
                                </p>
                                <Divider className="my-5" />

                                <Listbox
                                    variant="flat"
                                    aria-label="Listbox menu with descriptions"
                                    className="border rounded-sm"
                                >
                                    <ListboxItem
                                        onClick={() => router.push('/news')}
                                        key={'0'}
                                        startContent={<Avatar icon={<IoMdDoneAll />} />}
                                        className={!category ? 'bg-[#f2f2f5]' : ''}
                                    >
                                        {`${t('common.all-category')} category`}
                                    </ListboxItem>
                                    {categoriesNews &&
                                        (categoriesNews.map((cate: CategoryNews) => (
                                            <ListboxItem
                                                key={cate.id}
                                                startContent={<Avatar src={cate.image} />}
                                                onClick={() => {
                                                    setQuery((prev) => ({
                                                        ...prev,
                                                        categoryId: cate.id,
                                                        page: 0,
                                                    }))
                                                    router.push(`/news/${cate.slug}`)
                                                }}
                                                className={
                                                    category === cate.slug ? 'bg-[#f2f2f5]' : ''
                                                }
                                                value={cate.id}
                                            >
                                                <LinkLocale
                                                    href={`/news/${cate.slug}`}
                                                    onClick={() => {
                                                        setQuery((prev) => ({
                                                            ...prev,
                                                            page: 0,
                                                        }))
                                                    }}
                                                    className="w-full"
                                                >
                                                    {cate.name[locale]}
                                                </LinkLocale>
                                            </ListboxItem>
                                        )) as any)}
                                </Listbox>
                                <div>
                                    <p className="text-lg my-3">{t('page-news.canUNeed')}</p>
                                    <div className="space-y-2">
                                        {currentItems &&
                                            currentItems.map((item, i) => (
                                                <CardNews key={item.id} item={item} type="slider" />
                                            ))}
                                    </div>
                                </div>
                            </div>
                            {/* End sidebar news */}
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
                            <div className="col-span-2 flex justify-center">
                                <Pagination
                                    pageSize={query.size}
                                    total={totalElement}
                                    current={query.page + 1}
                                    showSizeChanger={true}
                                    className="mx-5"
                                    onShowSizeChange={(current, pageSize) =>
                                        setQuery((prev) => ({ ...prev, page: 0, size: pageSize }))
                                    }
                                    onChange={(page, pageSize) =>
                                        setQuery((prev) => ({
                                            ...prev,
                                            page: page - 1,
                                            size: pageSize,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </IfElse>
                </div>
            </div>
        </Suspense>
    )
}

export default PageNews
