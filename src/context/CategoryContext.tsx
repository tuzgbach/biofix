'use client'

import categoryApi, { Category, filterIsDeleteFalseInCategory } from '@/http/categoryApi'
import { processCategoriesUrl } from '@/utils'
import { createContext, useContext, useLayoutEffect, useState } from 'react'

type CategoryContextType = {
    categories: Category[]
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

const CategoryContext = createContext<CategoryContextType>({} as CategoryContextType)

export const useCategory = () => useContext(CategoryContext)

export default function CategoryProvider({
    children,
    initCategories,
}: {
    children: React.ReactNode
    initCategories: Category[] | []
}) {
    const [categories, setCategories] = useState<Category[]>(initCategories as Category[])

    useLayoutEffect(() => {
        // if (!categories || categories.length === 0)
        ;(async () => {
            const cates = await categoryApi.getCategories()
            setCategories(processCategoriesUrl(filterIsDeleteFalseInCategory(cates)))
        })()
    }, [])

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    )
}
