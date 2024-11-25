'use client'
import { BrandsInfo } from '@/http/infoApi'
import { Locale } from '@/i18n'
import { useLocale } from 'next-intl'
import Marquee from 'react-fast-marquee'
import './home.css'

const Brands = ({ brand }: { brand: BrandsInfo }) => {
    const locale = useLocale() as Locale

    return (
        <div className="mt-2 sm:mt-[2rem] md:mt-[4.5rem] lg:mt-[6rem] animate-fadeIn bg-white rounded-lg overflow-hidden">
            <div className="content-with-line flex flex-col items-center">
                <div className="w-full max-w-[100%] sm:max-w-[100%] md:max-w-[100%] lg:max-w-[100%] flex flex-col items-center">
                    <p
                        className="font-bold text-xl sm:text-2xl md:text-[2.5rem] lg:text-[2.5rem] p-2 sm:p-4 md:p-6 lg:p-8 text-gray-800 leading-tight transition-colors duration-500 text-center"
                        style={{ userSelect: 'none' }}
                    >
                        {brand.title[locale]}
                    </p>
                    <div
                        style={{ userSelect: 'none' }}
                        className="flex justify-center md:ml-0 ml-2 slogan text-xs sm:text-sm md:text-lg lg:text-2xl text-gray-700 leading-normal text-center"
                    >
                        {brand.slogan[locale]}
                    </div>
                </div>
                <div className="ticker md:p-2 p-0 rounded-full mt-4 sm:mt-4 lg:mt-8 md:mb-8 mb-6 bg-gray-100 transition-all duration-500 shadow-inner flex justify-center text-center">
                    <Marquee speed={40} gradient={true} gradientColor={'255, 255, 255'}>
                        <p
                            className="ticker-text text-black text-sm sm:text-sm md:text-xl leading-normal"
                            style={{ userSelect: 'none' }}
                        >
                            {brand.description[locale]}
                        </p>
                    </Marquee>
                </div>
            </div>
        </div>
    )
}

export default Brands
