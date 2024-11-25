'use client'

import { LinkLocale } from '@/components/LinkLocale'
import { News } from '@/http/newsApi'
import { Locale } from '@/i18n'
import { parseDate } from '@internationalized/date'
import { Button, Card, CardBody, CardHeader, DateRangePicker, Pagination } from '@nextui-org/react'
import moment from 'moment'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'

const dateFormat = (dateStr: string | null) => {
    const date = moment(dateStr, 'DD-MM-YYYY HH:mm:ss')
    return date.format('YYYY-MM-DD')
}

type Props = {
    events: News[]
    news: News[]
}

const EventInHome = ({ events, news }: Props) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const router = useRouter()
    const [indexEvent, setIndexEvent] = useState<number>(0)

    const handlePreviousPage = () => {
        setIndexEvent((prev) => (prev <= 0 ? events.length - 1 : prev - 1))
    }

    const handleNextPage = () => {
        setIndexEvent((prev) => (prev < events.length - 1 ? prev + 1 : 0))
    }

    return (
        <>
            {/* 2 news */}
            <Suspense fallback={<span className="w-1000 h-500 bg-black">.......</span>}>
                <div className="w-full md:w-1/2 md:ml-5">
                    {news &&
                        news.map((item, index) => (
                            <LinkLocale href={`/${item.slug}`} key={index} className="w-full">
                                <div className="lg:flex border-b-2 px-5 py-5 md:mb-2 lg:mb-10 cursor-pointer">
                                    <div className="aspect-4/3 w-full lg:aspect-video lg:w-1/3 overflow-hidden rounded-lg">
                                        <Image
                                            width={500}
                                            height={500}
                                            alt={item.name[locale]}
                                            src={item.thumb}
                                        />
                                    </div>

                                    <div className="w-full lg:w-2/3 bg-white rounded md:px-4 px-0 flex flex-col justify-between leading-normal mt-4 lg:mt-0 lg:ml-4">
                                        <div>
                                            <div className="md:mt-0 text-gray-500 font-bold text-sm mb-2">
                                                {item.name[locale]}
                                            </div>
                                            <p className="text-gray-700 text-base font-semibold">
                                                {item.description[locale]}
                                            </p>
                                        </div>

                                        <div className="flex mt-4 items-center">
                                            <div>
                                                <p className="font-semibold text-gray-700 text-sm capitalize">
                                                    {item.createdBy[locale]}
                                                </p>
                                                <p className="text-gray-600 text-xs">
                                                    {item.createdAt}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </LinkLocale>
                        ))}
                </div>
            </Suspense>

            {/* event */}
            <div className="w-full lg:w-1/3 md:ml-[3rem] ml-0 md:mt-0 mt-5">
                <h5 className="font-bold text-lg uppercase text-gray-700 px-1">
                    {t('common.event')}
                </h5>
                {events && (
                    <div className="mt-4">
                        <Card className="py-4">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-roboto">
                                    {events[indexEvent]?.description?.[locale] ??
                                        'Default Description'}
                                </p>
                                <small className="mt-3 mb-5">
                                    {events &&
                                    indexEvent >= 0 &&
                                    indexEvent < events.length &&
                                    events[indexEvent].startDate &&
                                    events[indexEvent].endDate ? (
                                        <DateRangePicker
                                            label="Thời gian diễn ra"
                                            isReadOnly
                                            defaultValue={{
                                                start: parseDate(
                                                    dateFormat(events[indexEvent].startDate)
                                                ),
                                                end: parseDate(
                                                    dateFormat(events[indexEvent].endDate)
                                                ),
                                            }}
                                            className="max-w-xs"
                                        />
                                    ) : (
                                        <div>Thông tin sự kiện không khả dụng</div>
                                    )}
                                </small>
                                {events[indexEvent] &&
                                events[indexEvent].name &&
                                typeof events[indexEvent].name === 'object' ? (
                                    <h4 className="font-bold text-large">
                                        {events[indexEvent].name[locale]}
                                    </h4>
                                ) : (
                                    <h4 className="font-bold text-large">
                                        Event Name Not Available
                                    </h4>
                                )}
                            </CardHeader>
                            <CardBody className="overflow-visible py-2 flex">
                                {events[indexEvent] ? (
                                    <LinkLocale href={`/${events[indexEvent].slug}`}>
                                        <Image
                                            alt="Card background"
                                            className="object-cover rounded-xl"
                                            src={events[indexEvent].thumb}
                                            width={270}
                                            height={200}
                                        />
                                    </LinkLocale>
                                ) : (
                                    <div>Event not found</div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                )}
                <div className="ml-[8.4rem] mt-5 mb-[7rem]">
                    <Pagination
                        loop
                        showControls
                        color="warning"
                        total={events.length}
                        initialPage={indexEvent + 1}
                        onChange={(page) => setIndexEvent(page - 1)}
                    />
                </div>
            </div>
        </>
    )
}

export default EventInHome
