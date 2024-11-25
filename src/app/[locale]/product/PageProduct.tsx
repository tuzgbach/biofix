'use client'

import { useCategory } from '@/context/CategoryContext'
import { memo, useLayoutEffect, useState } from 'react'
import ProductCircle from './_component/ProductCircle'
import ProductSolution from './_component/ProductSolution'
import ProductBanner from './_component/ProductBanner'

const PageProduct = () => {
    const [selectedId, setSelectedId] = useState<string>('')
    const { categories: cates } = useCategory()

    useLayoutEffect(() => {
        cates && setSelectedId(cates[0]?.id)
    }, [cates])

    return (
        <div>
            <div className="h-full w-full">
                <div className="hidden md:block">
                    <ProductBanner />
                </div>
                {cates && (
                    <ProductCircle
                        categories={cates}
                        changeSelectCateId={(id) => setSelectedId(id)}
                        selectCateId={selectedId}
                    />
                )}
            </div>
            <div>
                <ProductSolution />
            </div>
        </div>
    )
}

export default memo(PageProduct)
