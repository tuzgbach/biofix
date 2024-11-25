'use client'
import { Avatar, Breadcrumb, Dropdown, Menu, Pagination } from 'antd'
import propTypes from 'prop-types'
import { useCallback, useEffect, useState } from 'react'
import { FiEye } from 'react-icons/fi'
import { motion } from 'framer-motion'
import './ShowProduct.css'
import { Category } from '@/http/categoryApi'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/i18n'
import { useCategory } from '@/context/CategoryContext'
import { findAllParentCategories, findCateById, processProductsUrl } from '@/utils'
import productApi, { Product } from '@/http/productApi'
import { SelectInfo } from 'rc-menu/lib/interface'
import Image from 'next/image'
import ModalProduct from './ModalProduct'
import { ModalContact } from '@/components/modalContact'
import { useRouter } from 'next/navigation'

const queryInitialState = {
    page: 0,
    size: 8,
    sort: null,
    keySearch: null,
    categoryId: null,
}

type Props = {
    defaultCateId?: string
    currentCate: Category | null
    defaultOpenProductSlug?: string
}

const ShowProducts = ({ defaultCateId, currentCate, defaultOpenProductSlug = '' }: Props) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const { categories } = useCategory()
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
    const [selectKeysMenu, setSelectKeysMenu] = useState<string[]>([])
    const [query, setQuery] = useState(queryInitialState)
    const [totalElement, setTotalElement] = useState(0)
    const [products, setProducts] = useState<Product[]>([])
    const [openContact, setOpenContact] = useState(false)

    useEffect(() => {
        if (defaultCateId && categories) {
            const cc = findAllParentCategories(categories, defaultCateId)
            setSelectKeysMenu(cc)
        }
    }, [categories, defaultCateId])

    useEffect(() => {
        // eslint-disable-next-line no-extra-semi
        ;(async () => {
            const a = selectKeysMenu
                .map((v) => findCateById(categories, v))
                .map((v) => ({ name: v?.name[locale], id: v?.id }))
            console.log('selectKeyCallApi', a)
            const params = {
                ...query,
                categoryId: selectKeysMenu[selectKeysMenu.length - 1] ?? null,
            }
            try {
                const res = await productApi.get(params)
                console.log('params', params)
                console.log('products ', res.content)
                setProducts(processProductsUrl(res.content))
                setTotalElement(res.totalElement)
            } catch (error) {
                console.log('error', error)
            }
        })()
    }, [selectKeysMenu, query.page])

    useEffect(() => {
        if (defaultOpenProductSlug) {
            const p = products.find((v) => v.slug === defaultOpenProductSlug)
            if (p) {
                setSelectedProduct(p)
                setIsModalOpen(true)
            }
        }
    }, [defaultOpenProductSlug, products])

    const handleSelectMenu = (info: SelectInfo, isParent = true) => {
        const keyPath = isParent ? [info.key] : info.keyPath.reverse()

        if (currentCate?.children) {
            const a = keyPath.map((v) => findCateById(currentCate?.children, v))
            console.log(a)
            setSelectKeysMenu(keyPath)
        }
    }

    return (
        <>
            <div id="cc" className="w-full h-full bg-white p-4 sm:p-8 md:p-10 overflow-hidden">
                <div className="relative bg-white md:py-0 py-0 md:px-10 px-0">
                    <p className="text-[28px] font-bold text-gray-800 md:mt-[4rem] mt-2 ml-5 md:-mb-7 mb-0">
                        Danh mục chi tiết
                    </p>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full md:w-1/5 md:mt-[3rem] mt-3">
                            {currentCate?.children && (
                                <Menu
                                    className="mb-4 md:mb-0 custom-menu"
                                    items={[
                                        ...processCateViewMenu(
                                            currentCate?.children,
                                            locale,
                                            handleSelectMenu
                                        ),
                                    ]}
                                    mode="inline"
                                    selectedKeys={selectKeysMenu}
                                    onSelect={(info) => handleSelectMenu(info, false)}
                                />
                            )}
                        </div>
                        <div className="w-full md:w-4/5 md:ml-6">
                            <Breadcrumb
                                className="flex justify-end hover:text-blue-500 mb-4"
                                items={
                                    selectKeysMenu && [
                                        ...selectKeysMenu.map((v, i) => {
                                            const cate = findCateById(categories, v)
                                            return {
                                                key: cate?.id,
                                                title: cate?.name[locale],
                                                className: 'hover:text-blue-500 cursor-pointer',
                                                onClick: () =>
                                                    setSelectKeysMenu(
                                                        selectKeysMenu.slice(0, i + 1)
                                                    ),
                                            }
                                        }),
                                    ]
                                }
                            />
                            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products &&
                                    products.map((v, i) => (
                                        <div
                                            key={i}
                                            className="bg-white p-4 rounded-xl border shadow-lg"
                                        >
                                            <div className="aspect-square w-full overflow-hidden rounded-lg mb-4 relative">
                                                <div className="flex justify-center items-center w-full h-full">
                                                    <Image
                                                        src={v.image}
                                                        alt=""
                                                        className="object-contain rounded-lg transition-transform duration-300 hover:scale-110"
                                                        layout="fill" // Keep layout="fill" to adjust the image according to the container
                                                        objectFit="contain" // Add objectFit="contain" to keep the image aspect ratio without cropping
                                                    />
                                                </div>
                                            </div>
                                            <h3 className="md:text-[15px] text-[11px] text-gray-800 font-semibold truncate">
                                                {v.name[locale]}
                                            </h3>
                                            <p className="text-gray-600 md:text-[13.5px] text-[10px] md:my-4 my-2 line-clamp-3">
                                                {v.description[locale]}
                                            </p>
                                            <div className="flex gap-2">
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        setSelectedProduct(v)
                                                        setIsModalOpen(true)
                                                    }}
                                                    className="flex-1 bg-white text-[10px] sm:text-xs md:text-sm text-black hover:text-white md:px-3 px-2 md:py-1.5 py-1 rounded-full border-zinc-200 border-1 flex items-center justify-center hover:bg-black transition duration-300"
                                                >
                                                    Xem nhanh
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => {
                                                        router.push(`/product/${v.slug}`)
                                                    }}
                                                    className="flex-1 bg-white text-[10px] sm:text-xs md:text-sm text-black hover:text-white md:px-3 px-2 md:py-1.5 py-1 rounded-full border-zinc-800 border-1 flex items-center justify-center hover:bg-black transition duration-300"
                                                >
                                                    Chi tiết
                                                </motion.button>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    pageSize={query.size}
                                    current={query.page + 1}
                                    total={totalElement}
                                    onChange={(page, pageSize) =>
                                        setQuery((prev) => ({
                                            ...prev,
                                            page: page - 1,
                                            size: pageSize,
                                        }))
                                    }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedProduct && (
                <ModalProduct
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                        setSelectedProduct(null)
                    }}
                    currentCate={findCateById(
                        categories,
                        selectKeysMenu[selectKeysMenu.length - 1]
                    )}
                    product={selectedProduct}
                    setOpenContact={setOpenContact}
                />
            )}
            <ModalContact
                open={openContact}
                onCancel={() => setOpenContact(false)}
                // onOk={() => setOpenContact(false)}
            />
        </>
    )
}

const processCateViewMenu = (
    categories: Category[],
    locale: Locale,
    handleSelectMenu?: (info: SelectInfo) => void
): any[] => {
    return categories
        ? categories.map((cate) => ({
              ...cate,
              key: cate.id,
              label: cate.name[locale],
              icon: <Avatar src={cate.icon} size={20} />,
              onTitleClick: handleSelectMenu ? handleSelectMenu : null,
              children:
                  cate.children.length > 0
                      ? processCateViewMenu(cate.children, locale, handleSelectMenu)
                      : null,
          }))
        : []
}

ShowProducts.propTypes = {
    defaultCateId: propTypes.string,
    currentCate: propTypes.object.isRequired,
}
export default ShowProducts
