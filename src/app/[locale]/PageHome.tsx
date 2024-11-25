'use client'
import Brands from './_component/Brands'
import ModalVideos from './_component/ModalVideo'
import ProductInHome from './_component/ProductInHome'

import { useInfo } from '@/context/InfoContext'
import { News } from '@/http/newsApi'
import { Product } from '@/http/productApi'
import EventInHome from './_component/EventInHome'

import CardCategory from './_component/CardCategory'
import NewsInHome from './_component/NewsInHome'
import { useEffect, useState } from 'react'
import { processNewsUrl, processProductsUrl } from '@/utils'
import infoApi from '@/http/infoApi'
import { useTranslations } from 'next-intl'

type Props = {
    newsShow: News[]
    productsShow: Product[]
    eventsShow: News[]
}

const PageHome = ({ newsShow, eventsShow, productsShow }: Props) => {
    const { info } = useInfo()
    const { brands, images, banner } = info
    const t = useTranslations()

    return (
        <div className="w-full">
            {/* banner and brand 1 */}
            <ModalVideos video={banner} isHome={true} images={images} brand={brands[0]} />

            {/* Brand 2: text run */}
            <Brands brand={brands[1]} />

            {/* cate and banner register information for company */}
            <CardCategory />

            <div className="block lg:flex lg:space-x-2 px-2 lg:p-0 mt-10 mb-10">
                {productsShow.length !== 0 && (
                    <ProductInHome brand={brands[0]} productsShow={productsShow} />
                )}
            </div>

            {/* brand cuối vs các tin tức */}
            <div className="flex flex-col sm:flex-row">
                <NewsInHome brand={brands[3]} news={newsShow && newsShow.slice(0, 8)} />
            </div>

            {/* brand cuối vs các tin tức (event) */}
            <div className="bg-white shadow-lg p-8">
                <p className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold ml-4 md:mb-4 mb-0 sm:ml-6 md:ml-8 lg:ml-[6rem] border-b-2 border-gray-200 pb-2">
                    {t('common.news')}
                </p>
                <div className="flex flex-col sm:flex-row ml-0 lg:ml-[5rem] md:p-5 p-0">
                    <EventInHome events={eventsShow} news={newsShow && newsShow.slice(8, 10)} />
                </div>
            </div>
        </div>
    )
}

export default PageHome
