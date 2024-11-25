'use client'

import { BrandsInfo } from '@/http/infoApi'
import { Product } from '@/http/productApi'
import { Locale } from '@/i18n'
import { useLocale, useTranslations } from 'next-intl'
import { memo, useEffect, useState, useRef, useCallback } from 'react'
import './home.css'
import Image from 'next/image'
import { useCategory } from '@/context/CategoryContext'
import { useRouter } from '@/navigation'
import { findCateById } from '@/utils'
import { motion } from 'framer-motion'

type Props = {
    brand: BrandsInfo
    productsShow: Product[]
}

const ProductInHome = ({ brand, productsShow }: Props) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const { categories } = useCategory()
    const router = useRouter()
    const [showButton, setShowButton] = useState(false)
    const [fixedButton, setFixedButton] = useState(false)
    const buttonRef = useRef<HTMLDivElement>(null)
    const productInHomeRef = useRef<HTMLDivElement>(null)

    const handleShowButton = useCallback((isIntersecting: boolean) => {
        console.log('isIntersecting:', isIntersecting)
        if (isIntersecting) {
            setShowButton(true)
        } else {
            setShowButton(false)
        }
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    console.log('entry:', entry)
                    handleShowButton(entry.isIntersecting)
                })
            },
            { threshold: 0.1 }
        )

        if (productInHomeRef.current) {
            observer.observe(productInHomeRef.current)
        }

        return () => {
            if (productInHomeRef.current) {
                observer.unobserve(productInHomeRef.current)
            }
        }
    }, [handleShowButton])

    const handleClickProduct = (item: Product) => () => {
        const cate = findCateById(categories, item.category?.parentId ?? '')
        router.push(`/${locale}/category/${cate?.slug}?product=${item.slug}`)
    }

    return (
        <motion.div
            ref={productInHomeRef}
            className="menu-home block md:flex justify-center items-center p-10 w-full h-full relative space-y-3 md:space-x-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="w-full px-2 sm:px-4 md:w-1/3 md:px-6 lg:px-8 text-white transition-all duration-500 mb-8 md:mb-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                {brand && (
                    <div className="flex flex-col items-center bg-white p-4 sm:p-6 shadow-lg rounded-lg">
                        <Image
                            src={brand.image}
                            alt={brand.title[locale]}
                            className="max-w-full h-auto rounded-2xl mb-4"
                            layout="responsive"
                            width={500}
                            height={500}
                        />
                        <p className="text-lg px-2 sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#2ba0f3] mb-1 md:mt-5 mt-1">
                            {brand.title[locale]}
                        </p>
                        <p className="hidden md:block text-sm p-2 md:text-lg lg:text-lg text-[#2ba0f3] font-semibold mb-1">
                            {brand.slogan[locale]}
                        </p>
                        <p
                            className={`hidden md:block text-xs p-2 md:text-md lg:text-4sm font-[Lato, sans-serif] text-gray-600 text-start leading-6`}
                        >
                            {brand.description[locale]}
                        </p>
                    </div>
                )}
            </motion.div>

            {/* product */}
            <motion.div
                className="w-full md:w-2/3 col-span-2 grid grid-cols-2 md:gap-4 gap-2 px-0 md:px-[2rem] lg:px-[10rem]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                {productsShow &&
                    productsShow.slice(0, 4).map((item, i) => (
                        <motion.div
                            key={i}
                            className="rounded-lg bg-white overflow-hidden shadow-md w-full h-full md:ml-[1rem] md:mx-0 mx-auto hover:cursor-pointer transition-transform transform hover:scale-105"
                            onClick={handleClickProduct(item)}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                        >
                            <div className="aspect-square w-[80%] flex justify-center relative mx-auto">
                                <div className="flex justify-center items-center w-full h-full">
                                    <Image
                                        src={item.image}
                                        alt={item.name[locale]}
                                        className="object-contain rounded-t-lg"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            </div>
                            <div className="px-4 py-3 md:mt-6 mt-0 h-full">
                                <div className="md:h-40 h-auto">
                                    <p className="md:text-xl text-sm font-bold text-gray-500 font-roboto line-clamp-2 mt-2">
                                        {item.name[locale]}
                                    </p>
                                    <p className="text-4sm text-gray-500 font-roboto line-clamp-2 mt-4">
                                        {item.description[locale]}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                <motion.div
                    ref={buttonRef}
                    className={`w-full flex justify-center mt-8 transition-opacity duration-500 ${
                        fixedButton ? 'fixed bottom-4 right-4' : ''
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: showButton ? 1 : 0, y: showButton ? 0 : 20 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    {showButton && (
                        <motion.button
                            onClick={() => router.push(`/${locale}/product`)}
                            className="px-3 py-2 text-white text-[14px] bg-black rounded-full hover:bg-gray-800 transition duration-300"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1 }}
                        >
                            Trang sản phẩm
                        </motion.button>
                    )}
                </motion.div>
            </motion.div>
        </motion.div>
    )
}

export default memo(ProductInHome)
