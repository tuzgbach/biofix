'use client'

import { IfElse } from '@/components/Condition'
import ErrorPage from '@/components/ErrorPage'
import LikeShare from '@/components/LikeShare'
import { News } from '@/http/newsApi'
import { Locale } from '@/i18n'

import Comment from '@/components/socialPlugin/Comment'
import { BreadcrumbItem, Breadcrumbs, Button } from '@nextui-org/react'
import moment from 'moment'
import { useLocale, useTranslations } from 'next-intl'
import { memo, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6'
import { usePathname } from '@/navigation'
import CardNews from '../../news/CardNews'

const dateFormat = (dateStr: string | null) => {
    if (!dateStr) return ''
    const date = moment(dateStr, 'DD-MM-YYYY HH:mm:ss')
    return date.format('DD/MM/YYYY')
}

const formatDate = (dateString: string) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' } as const
    return new Date(dateString).toLocaleDateString('en-US', options)
}

const formatSentence = (sentence: string | null) => {
    if (sentence) {
        let sentences = sentence.toLowerCase().split('. ')
        sentences = sentences.map(
            (sentence) => sentence.charAt(0).toUpperCase() + sentence.slice(1)
        )
        return sentences.join('. ')
    }
    return ''
}

const NewDetail = ({ news, allNews }: { news: News; allNews: News[] }) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const [err, setErr] = useState<string>('')
    const dataHref = process.env.NEXT_PUBLIC_URL + '/' + usePathname()

    return (
        <div className="px-2 md:px-6 lg:px-16 w-full mt-20 md:mt-20">
            <Breadcrumbs className="my-2 mx-2 ml-2 sm:mx-4 sm:ml-4 md:mx-10 md:ml-[5rem] lg:my-6 ">
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>News</BreadcrumbItem>
                <BreadcrumbItem className="w-full md:w-auto overflow-hidden text-ellipsis whitespace-nowrap">
                    {news.slug}
                </BreadcrumbItem>
            </Breadcrumbs>
            <IfElse if={!err} else={<ErrorPage type="404" subTitle={err} />}>
                <div className="space-y-4 ml-2 md:ml-[5rem]">
                    <div className="border-l-4 md:border-l-8 border-black md:w-[60%] w-full">
                        <h1 className="font-bold text-xl md:text-4xl lg:text-4xl pl-5 md:pl-10 text-sky-700">
                            {news?.name?.[locale]}
                        </h1>
                    </div>
                    <div className="flex justify-between md:w-[60%] w-full items-center bg-white p-1 rounded-full shadow">
                        <div className="font-semibold text-md md:text-sm">
                            {formatSentence(news?.type)}
                        </div>
                        <div className="text-gray-500 text-xs md:text-sm">
                            {dateFormat(news?.createdAt)}
                        </div>
                    </div>
                </div>

                <div className="md:grid md:grid-cols-6 md:gap-3 p-4">
                    <div className="flex flex-col md:flex-row md:space-x-6 col-span-4">
                        <LikeShare
                            className="hidden md:flex md:flex-col justify-start mb-4 md:mb-0"
                            linkShare={dataHref}
                            commentId="comment"
                        />
                        <div className="flex-grow ">
                            <div
                                className="prose lg:prose-xl mx-4 lg:mx-8 my-5 text-justify"
                                dangerouslySetInnerHTML={{
                                    __html: news?.content?.[locale],
                                }}
                            ></div>
                            <div className="flex justify-end mx-8 mt-2">
                                <span className="font-semibold text-gray-800">
                                    {news?.createdBy?.name}
                                </span>
                            </div>
                            <Button className="rounded-md border border-gray-300 mt-4 mb-5 ml-8 bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 ease-in-out shadow">
                                <span className="flex items-center">
                                    <FaArrowLeftLong className="mr-2" />
                                    New list
                                </span>
                            </Button>
                            <div className="w-full md:w-[90%] mb-4 mx-4 lg:mx-8 rounded-xl border bg-[#f8f9fa] shadow-sm">
                                <Comment dataHref={dataHref}></Comment>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 space-y-4 md:w-[90%] w-full md:ml-10 ml-0">
                        <div className="bg-white rounded-lg p-5">
                            <p className="text-xl font-bold mb-4 border-b border-gray-300 pb-4">
                                Bài viết liên quan
                            </p>
                            {allNews && allNews.length > 0 ? (
                                allNews.map((item) => (
                                    <CardNews
                                        key={item.id}
                                        item={item}
                                        type="list"
                                        clampName={4}
                                        clampDes={2}
                                    />
                                ))
                            ) : (
                                <p>Không có bài viết liên quan để hiển thị.</p>
                            )}
                        </div>
                    </div>
                </div>
            </IfElse>
        </div>
    )
}

export default memo(NewDetail)
