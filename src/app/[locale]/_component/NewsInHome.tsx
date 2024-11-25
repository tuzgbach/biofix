'use client'

// import "./Brand.css"
import { useInfo } from '@/context/InfoContext'
import { BrandsInfo } from '@/http/infoApi'
import { News } from '@/http/newsApi'
import { Locale } from '@/i18n'
import { useLocale } from 'next-intl'
import Image from 'next/image'

const NewsInHome = ({ brand, news }: { brand: BrandsInfo; news: News[] }) => {
    const locale = useLocale() as Locale

    const {
        info: { brands },
    } = useInfo()

    return (
        <div className="flex justify-center items-center md:py-10 py-0 md:p-16 p-0">
            <div className="w-full px-4 md:container mx-auto md:px-8 lg:px-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <div className="text-center p-3 md:text-left md:p-10">
                    <p className="text-3xl md:text-4xl lg:text-6xl py-2 font-bold text-[#333] bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
                        {brands[3].title[locale]}
                    </p>
                    <p className="text-base md:text-[18px] text-gray-600 font-semibold mb-6 mt-0 md:mt-[2rem]">
                        {brands[3].slogan[locale]}
                    </p>
                    <p className="text-sm md:text-[17px] text-gray-600 leading-relaxed text-ellipsis line-clamp-3">
                        {brands[3].description[locale]}
                    </p>
                </div>
                {/* Image */}
                <div className="mx-auto relative">
                    <div className="aspect-w-16 aspect-h-9 border shadow-lg">
                        <Image
                            width={1000}
                            height={1000}
                            src={brands[3].image}
                            alt=""
                            className="transition-transform transform p-2 -mt-16 md:-mt-[0] w-full md:w-[35rem] h-full md:h-[35rem] object-cover"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewsInHome
