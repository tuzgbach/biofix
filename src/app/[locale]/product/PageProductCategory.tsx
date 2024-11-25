'use client'

import { Category } from '@/http/categoryApi'
import ModalVideos from '../_component/ModalVideo'
import { useLocale } from 'next-intl'
import { Locale } from '@/i18n'
import CollapseCustom from './_component/CollapseCustom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import productApi, { Product } from '@/http/productApi'
import { findCateById, findCateBySlug, processProductsUrl } from '@/utils'
import { FiEye } from 'react-icons/fi'
import ModalProduct from './_component/ModalProduct'
import Image from 'next/image'
import { Pagination } from 'antd'
import { useCategory } from '@/context/CategoryContext'
import { useSearchParams } from 'next/navigation'
import ProductCircle from './_component/ProductCircle'
import ShowProducts from './_component/ShowProduct'

type Props = {
    category: Category
}

const PageProductCategory = ({ slug: categorySlug }: { slug: string }) => {
    const locale = useLocale() as Locale
    const searchParams = useSearchParams()
    const selectedSlug = searchParams.get('child')
    const productSlug = searchParams.get('product')

    const { categories: cates } = useCategory()
    const [cate, setCate] = useState<Category | null>(null)
    const [err, setErr] = useState(false)
    const [selectedId, setSelectedId] = useState('')

    useEffect(() => {
        if (cates && categorySlug) {
            const foundCategory = findCateBySlug(cates, categorySlug)
            if (foundCategory) {
                setCate(foundCategory)
            } else {
                setErr(true)
            }
        }
    }, [cates, categorySlug])

    useEffect(() => {
        if (cate && !selectedSlug) {
            setSelectedId(cate.children[0].id)
        } else if (cate && selectedSlug) {
            const foundChild = findCateBySlug(cate.children, selectedSlug)

            if (foundChild) {
                setSelectedId(foundChild.id)
            }
        }
    }, [cate, selectedSlug])

    return (
        <div className="relative">
            {err ? (
                <div className="text-red-500">{'Không tìm thấy danh mục'}</div>
            ) : (
                <div>
                    {/* Video Section */}
                    <div className="object-cover overflow-hidden relative border-b-1 shadow-sm -mt-[8rem] md:-mt-0 md:h-full h-[80vh]">
                        {cate && cate.video && <ModalVideos video={cate.video} key={cate.id} />}
                    </div>

                    {/* Circle Product Selector */}
                    <div className="px-4 md:px-14 -mt-10 py-8">
                        {cate && cate.children && (
                            <div className="overflow-hidden">
                                <ProductCircle
                                    categories={cate.children}
                                    selectCateId={selectedId}
                                    changeSelectCateId={(id) => setSelectedId(id)}
                                />
                            </div>
                        )}
                    </div>

                    {/* Product Display */}
                    <div className="mt-0 md:-mt-[10rem]">
                        {cate && (
                            <div className="bg-white rounded-lg p-0 md:p-8 shadow-lg">
                                <ShowProducts
                                    defaultCateId={selectedId}
                                    currentCate={
                                        cate?.level !== 1
                                            ? cates.find((v) => v.id === cate?.parentId) ?? cate
                                            : cate
                                    }
                                    defaultOpenProductSlug={productSlug ?? ''}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
export default PageProductCategory
