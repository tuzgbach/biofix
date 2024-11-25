import React from 'react'
import { useLocale } from 'next-intl'
import { Locale } from '@/i18n'
import { Product } from '@/http/productApi'
import Image from 'next/image'
import { Category } from '@/http/categoryApi'

type Props = {
    product?: Product
    currentCate: Category | null
    openContact?: boolean
}

const DetailProduct = ({ product, currentCate }: Props) => {
    const locale = useLocale() as Locale
    return (
        <div className="w-full">
            <div className="container mx-auto p-6 flex flex-col lg:flex-row gap-6 lg:gap-12 items-start w-[90%]">
                {/* Phần hình ảnh */}
                <div className="md:sticky sticky-0 top-40 mt-14 w-full lg:w-[30%] bg-white p-6 rounded-lg shadow-lg z-10">
                    <div className="bg-white p-3 w-full lg:w-[20rem] rounded-sm flex-shrink-0">
                        <div className="aspect-square w-full flex justify-center relative">
                            <div className="flex justify-center items-center w-full h-full">
                                <Image
                                    src={product?.image ?? ''}
                                    alt=""
                                    className="object-contain rounded-lg"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phần thông tin sản phẩm */}
                <div className="flex-1 mt-14 overflow-y-auto bg-white p-6 rounded-lg">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6 border-b-4 border-blue-500 pb-4 border rounded-lg p-4">
                        {product?.name[locale]}
                    </h1>
                    <p className="text-lg text-gray-700 mb-6 border-b border-gray-200 pb-4 border rounded-lg p-4">
                        {product?.description[locale]}
                    </p>
                    <div
                        className="text-gray-700 mb-4  overflow-y-auto border rounded-lg p-4"
                        dangerouslySetInnerHTML={{
                            __html: product?.content[locale] ?? '',
                        }}
                    ></div>
                </div>
            </div>
        </div>
    )
}

export default DetailProduct
