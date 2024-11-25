import { LinkLocale } from '@/components/LinkLocale'
import { useCategory } from '@/context/CategoryContext'
import { Category } from '@/http/categoryApi'
import { Locale } from '@/i18n'
import { useRouter } from '@/navigation'
import { flattenCategories } from '@/utils'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { FC } from 'react'
type Props = {
    current: Category
    categories: Category[] | []
}

const SloganDetail = ({ current, categories }: Props) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const router = useRouter()
    const result = flattenCategories(categories)

    return (
        <div className="mt-14 md:mb-[10rem] mb-16 mx-2 md:mx-36 overflow-hidden bg-white">
            <div className="relative mb-8 shadow-lg">
                <div className="mt-4 mb-3 w-full rounded-lg overflow-hidden shadow-md">
                    <Image
                        src={current?.image}
                        alt={current?.name[locale]}
                        className="object-cover w-full h-[20rem] md:h-[30rem] transition duration-300 ease-in-out transform hover:scale-105"
                        width={1000}
                        height={1000}
                    />
                </div>
                <span className="absolute text-white top-[-1rem] md:top-[-1rem] text-sm md:text-[18px] left-2 md:left-10 font-[500] bg-gradient-to-r from-sky-700 to-sky-600 md:px-3 px-2 md:py-2 py-1 rounded-full shadow-sm">
                    {current?.name[locale]}
                </span>
            </div>
            <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 grid-cols-2 md:px-16 px-0">
                {categories &&
                    categories.map((v, i) => (
                        <div
                            key={i}
                            className="overflow-hidden bg-white rounded-lg transition-shadow"
                        >
                            <p className="md:text-[19px] text-[15px] font-[550] px-5 py-3">
                                {v.name[locale]}
                            </p>
                            {v.children.map((child, index) => (
                                <LinkLocale
                                    key={child.slug}
                                    href={`/category/${v.slug}?child=${child.slug}`}
                                    locale={locale}
                                >
                                    <div
                                        key={index}
                                        className="p-4 cursor-pointer border-b-1 border-sky-500"
                                        aria-label={`Navigate to category ${child.name[locale]}`}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className="relative w-full h-32 rounded-2xl overflow-hidden">
                                            <Image
                                                src={child.image}
                                                alt={child.name[locale]}
                                                className="object-cover w-full h-full transition duration-300 ease-in-out transform hover:scale-105"
                                                width={1000}
                                                height={1000}
                                            />
                                            <div className="absolute inset-0 bg-black opacity-30 hover:opacity-0 transition-opacity duration-300 ease-in-out"></div>
                                        </div>
                                        <div className="mt-2">
                                            <span className="text-md">{child.name[locale]}</span>
                                        </div>
                                    </div>
                                </LinkLocale>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    )
}

const ProductSolution = () => {
    const { categories } = useCategory()

    return (
        <>
            {categories &&
                categories.map((cate, i) => (
                    <SloganDetail key={i} categories={cate.children} current={cate} />
                ))}
        </>
    )
}

export default ProductSolution
