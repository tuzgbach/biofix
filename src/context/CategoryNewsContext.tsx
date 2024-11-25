'use client'

import categoryNewsApi, { CategoryNews } from '@/http/categoryNewsApi'
import { processCategoriesNewsUrl } from '@/utils'
import { createContext, useContext, useLayoutEffect, useState } from 'react'

type CategoryNewsContextType = {
    categoriesNews: CategoryNews[]
    setCategoriesNews: React.Dispatch<React.SetStateAction<CategoryNews[]>>
}

const CategoryNewsContext = createContext<CategoryNewsContextType>({} as CategoryNewsContextType)

export const useCategoryNews = () => useContext(CategoryNewsContext)

export default function CategoryNewsProvider({
    children,
    initCategories,
}: {
    children: React.ReactNode
    initCategories: CategoryNews[] | []
}) {
    const [categoriesNews, setCategoriesNews] = useState<CategoryNews[]>(
        initCategories as CategoryNews[]
    )

    useLayoutEffect(() => {
        // if (!categoriesNews || categoriesNews.length === 0)
        ;(async () => {
            const cates = await categoryNewsApi.getCategories()

            setCategoriesNews(processCategoriesNewsUrl(cates))
        })()
    }, [])

    return (
        <CategoryNewsContext.Provider value={{ categoriesNews, setCategoriesNews }}>
            {children}
        </CategoryNewsContext.Provider>
    )
}
