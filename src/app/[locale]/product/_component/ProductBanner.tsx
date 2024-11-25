'use client'

import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useInfo } from '@/context/InfoContext'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/i18n'
import Image from 'next/image'
import './ShowProduct.css'

const LiNgoo = () => (
    <li
        className={classNames(
            "relative cursor-pointer md:w-[8%] md:first:w-[1%] md:last:w-[1%] md:[&[aria-current='true']]:w-[48%]",
            'md:[transition:width_var(--transition,200ms_ease-in)]',
            'md:before-block before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white',
            'md:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] md:hover:w-[12%]',
            'first:pointer-events-none last:pointer-events-none md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0'
        )}
    >
        <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-300">
            <Image
                className="absolute right-0 top-1/2 h-auto w-24 max-w-none -translate-y-1/2 object-cover md:left-1/2 md:h-[550px] md:w-[740px] md:-translate-x-1/2"
                src={''}
                alt={''}
                width="1000"
                height="1000"
            />
            <div
                className={classNames(
                    'inset-0 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity md:opacity-0'
                )}
            />
            <div
                className={classNames(
                    'left-8 top-8 w-[590px] p-4 transition-[transform,opacity] md:absolute md:p-0 md:translate-x-4 md:opacity-0'
                )}
            >
                <p className="text-sm uppercase md:text-2xl text-white">c</p>
                <p className="text-lg font-bold md:text-4xl text-sky-400">c</p>
            </div>
        </div>
    </li>
)

const ProductBanner = () => {
    const locale = useLocale() as Locale
    const [activeItem, setActiveItem] = useState<number | null>(0)
    const t = useTranslations()
    const {
        info: { brandsInProduct },
    } = useInfo()

    const handleItemClick = (index: number) => {
        setActiveItem(index)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveItem((prevItem) => {
                if (brandsInProduct && prevItem !== null) {
                    return (prevItem + 1) % brandsInProduct.length
                }
                return 0
            })
        }, 3000) // Chuyển tiếp hình ảnh sau mỗi 3 giây

        return () => clearInterval(interval)
    }, [brandsInProduct])

    return (
        <div className="flex items-center justify-center md:mt-5 mt-[5rem]">
            <div className="w-[98%] max-w-full">
                <ul className="group md:flex flex-col gap-3 md:h-[550px] md:flex-row md:gap-[1.5%] grid md:grid-cols-none grid-cols-2">
                    <LiNgoo />
                    {brandsInProduct &&
                        brandsInProduct.map((brand, index) => (
                            <li
                                onClick={() => handleItemClick(index)}
                                aria-current={activeItem === index}
                                className={classNames(
                                    "relative cursor-pointer md:w-[8%] md:first:w-[1%] md:last:w-[1%] md:[&[aria-current='true']]:w-[48%]",
                                    'md:[transition:width_var(--transition,200ms_ease-in)]',
                                    'md:before-block before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white',
                                    'md:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] md:hover:w-[12%]',
                                    'first:pointer-events-none last:pointer-events-none md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0'
                                )}
                                key={index}
                            >
                                <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-300">
                                    <Image
                                        className="object-cover"
                                        src={brand.image ?? ''}
                                        alt={brand.title[locale]}
                                        layout="fill"
                                        objectFit="cover"
                                        quality={100}
                                    />
                                    <div
                                        className={classNames(
                                            'inset-0 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px] before:z-10 before:bg-texture  after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 after:bg-texture md:absolute md:transition-opacity',
                                            activeItem === index ? 'md:opacity-0' : 'md:opacity-0'
                                        )}
                                    />
                                    <div
                                        className={classNames(
                                            'left-8 top-8 w-[590px] md:w-full p-6 md:p-8 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm rounded-es-3xl shadow-lg transition-all duration-500 ease-in-out',
                                            'md:absolute',
                                            activeItem === index
                                                ? 'md:translate-x-0 md:opacity-100'
                                                : 'md:translate-x-4 md:opacity-0'
                                        )}
                                    >
                                        <p className="text-2xl md:text-2xl text-gray-800 font-bold font-roboto">
                                            {brand.title[locale]}
                                        </p>
                                        <p className="text-base md:text-5sm mt-3 font-roboto font-medium text-sky-800">
                                            {brand.description[locale]}
                                        </p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    <LiNgoo />
                </ul>
            </div>
        </div>
    )
}

export default ProductBanner
