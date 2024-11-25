'use client'

import { useCategory } from '@/context/CategoryContext'
import { useCategoryNews } from '@/context/CategoryNewsContext'
import { Category } from '@/http/categoryApi'
import { Locale } from '@/i18n'
import { usePathname, useRouter } from '@/navigation'
// import { usePathname, useRouter } from '@/navigation'

import { Button, Dropdown, DropdownTrigger } from '@nextui-org/react'
import { Drawer, Dropdown as DropdownAntd, Menu } from 'antd'
import { motion } from 'framer-motion'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

import { useInfo } from '@/context/InfoContext'
import { memo, useEffect, useState } from 'react'
import { MdMenu } from 'react-icons/md'
import { RiArrowDropDownLine } from 'react-icons/ri'
import { VscGlobe, VscGrabber } from 'react-icons/vsc'
import { LinkLocale } from '../LinkLocale'
import SearchInHome from '../search/SearchInHome'

const Navbar = ({ ...rest }) => {
    const locale = useLocale() as Locale
    const t = useTranslations()
    const pathname = usePathname()
    const { categories } = useCategory()
    const { categoriesNews } = useCategoryNews()
    const {
        info: { logo, images },
    } = useInfo()

    const [isNavbarLeftOpen, setIsNavbarLeftOpen] = useState(false)
    const [showCategories, setShowCategories] = useState(false)

    const [openMenu, setOpenMenu] = useState(false)

    const handleCloseMenu = () => setOpenMenu(false)

    const variants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    }

    useEffect(() => {
        const handleNavbarLeftToggle = (event: any) => {
            setIsNavbarLeftOpen(event.detail.isOpen)
        }

        window.addEventListener('navbarLeftToggle', handleNavbarLeftToggle)
        return () => {
            window.removeEventListener('navbarLeftToggle', handleNavbarLeftToggle)
        }
    }, [])

    if (isNavbarLeftOpen) {
        return null // Nếu component chưa được mount, không render gì cả
    }

    return (
        <div {...rest} style={{}}>
            <div className="h-full flex items-center">
                {/* logo */}
                <div className="w-2/5 md:w-[23%] h-full flex items-center justify-between lg:justify-center">
                    {/* screen 900 ẩn menu */}
                    <div className="w-[20%] h-full lg:hidden flex items-center justify-center">
                        <div
                            className="h-full w-full text-4sm font-bold flex justify-center items-center whitespace-nowrap hover:bg-sky-800 text-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 shadow-md"
                            onClick={() => setOpenMenu(true)}
                        >
                            <MdMenu size={30} />
                        </div>
                    </div>
                    <LinkLocale href="/" className="py-1 h-[80%]">
                        <div className="aspect-video h-full overflow-hidden">
                            <Image
                                className="cursor-pointer"
                                src={logo}
                                alt="Biofix Fresh Logo"
                                width={100}
                                height={100}
                            />
                        </div>
                    </LinkLocale>
                </div>

                {/* menu */}
                <div className="w-3/6 hidden lg:flex h-full items-center">
                    <div className="flex h-full w-full items-center justify-end">
                        {/* Home */}
                        <LinkLocale
                            href="/"
                            className="h-full w-1/4 text-3sm font-bold flex justify-center items-center whitespace-nowrap hover:bg-sky-800 text-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 roboto-thin"
                        >
                            <span>{t('common.home').toUpperCase()}</span>
                        </LinkLocale>
                        {/* product */}
                        <LinkLocale
                            href="/product"
                            className="h-full w-1/4 text-3sm font-bold flex justify-center items-center whitespace-nowrap hover:bg-sky-800 text-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 roboto-thin"
                            onMouseEnter={() => setShowCategories(true)}
                            onMouseLeave={() => setShowCategories(false)}
                        >
                            <span>{t('common.product').toUpperCase()}</span>
                            <RiArrowDropDownLine fill="currentColor" size={30} />
                        </LinkLocale>
                        {showCategories && (
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={variants}
                                className="absolute w-full top-[100%] left-16 right-0 rounded-lg bg-gradient-to-r from-white to-gray-200 overflow-hidden shadow-2xl"
                                onMouseEnter={() => setShowCategories(true)}
                                onMouseLeave={() => setShowCategories(false)}
                            >
                                <div className="flex gap-4 p-3 ml-7 text-md font-semibold h-auto">
                                    {/* Div chứa hình ảnh chính */}
                                    <div className="w-[35%] flex flex-col justify-center items-center overflow-hidden">
                                        <Image
                                            src={
                                                images[Math.floor(Math.random() * images.length)] ??
                                                logo
                                            }
                                            className="h-full w-full object-cover shadow-2xl ml-6"
                                            alt="Product"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                    {/* Div chứa các categories */}
                                    <div className="w-[40%] grid gap-2 border-e-2 p-2">
                                        {categories &&
                                            categories.map((cate, index) => {
                                                const children = cate?.children
                                                return (
                                                    <div
                                                        key={cate.id}
                                                        className="flex items-start pb-2"
                                                    >
                                                        {/* Wrap Image with LinkLocale */}
                                                        <LinkLocale
                                                            href={`/category/${cate.slug}`}
                                                            className="mr-2"
                                                        >
                                                            <Image
                                                                alt="Product category"
                                                                src={cate.image}
                                                                className="w-[6rem] h-24 object-cover rounded-sm shadow-lg transition-transform duration-500 hover:scale-105"
                                                                width={100}
                                                                height={100}
                                                            />
                                                        </LinkLocale>
                                                        <div className="flex flex-col">
                                                            <LinkLocale
                                                                href={`/category/${cate.slug}`}
                                                                className="font-helvetica text-3sm font-semibold text-cyan-900 hover:underline"
                                                            >
                                                                {cate.name[locale]}
                                                            </LinkLocale>
                                                            {children && (
                                                                <div className="mt-1">
                                                                    {children.map((item) => (
                                                                        <LinkLocale
                                                                            key={item.id}
                                                                            href={`/category/${cate.slug}/${item.slug}`}
                                                                            className="my-0.5 cursor-pointer hover:text-gray-400 transform hover:scale-105 transition-transform duration-200"
                                                                        >
                                                                            <div className="font-helvetica font-light text-2sm text-cyan-900 hover:text-cyan-600">
                                                                                {item.name[locale]}
                                                                            </div>
                                                                        </LinkLocale>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                    </div>
                                    {/* Div chứa tag news */}
                                    <div className="w-[25%] flex flex-col justify-start items-start gap-1 p-2">
                                        {categoriesNews &&
                                            categoriesNews.map((cate, index) => (
                                                <div
                                                    key={cate.id}
                                                    className="bg-white text-2sm text-cyan-900 py-1 px-2 font-sans rounded-full cursor-pointer shadow-md transition-transform duration-500 hover:scale-105"
                                                >
                                                    <LinkLocale href={`/news/${cate.slug}`}>
                                                        {cate.name[locale]}
                                                    </LinkLocale>
                                                </div>
                                            ))}
                                        <Image
                                            src={
                                                categoriesNews[
                                                    Math.floor(
                                                        Math.random() * categoriesNews.length
                                                    )
                                                ]?.image ?? logo
                                            }
                                            className="h-[10rem] w-[14rem] object-cover shadow-2xl ml-1 rounded-lg mt-3"
                                            alt="Product"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        {/* about */}
                        <LinkLocale
                            href="/contact"
                            className="h-full w-1/4 text-3sm font-bold flex justify-center items-center whitespace-nowrap hover:bg-sky-800 text-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 roboto-thin"
                        >
                            <span>{t('common.company').toUpperCase()}</span>
                            <RiArrowDropDownLine fill="currentColor" size={30} />
                        </LinkLocale>
                        {/* news */}
                        <DropdownAntd
                            menu={{
                                items:
                                    categoriesNews &&
                                    categoriesNews.map((v) => ({
                                        ...v,
                                        key: v.id,
                                        label: (
                                            <LinkLocale
                                                href={`/news/${v.slug}`}
                                                className="flex items-center space-x-4 px-1 transition duration-300 ease-in-out"
                                            >
                                                <div className="w-10 h-10 flex-shrink-0">
                                                    <Image
                                                        src={v.image}
                                                        alt={v.name[locale]}
                                                        className="w-full h-full object-cover rounded-lg shadow-md"
                                                        width={100}
                                                        height={100}
                                                    />
                                                </div>
                                                <p className="text-sm font-medium text-gray-800">
                                                    {v.name[locale]}
                                                </p>
                                            </LinkLocale>
                                        ),
                                    })),
                            }}
                        >
                            <div className="h-full w-1/4 text-3sm font-bold flex justify-center items-center whitespace-nowrap hover:bg-sky-800 text-gray-800 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105 roboto-thin">
                                <LinkLocale
                                    href="/news"
                                    className="h-full w-full text-3sm font-bold flex justify-center items-center whitespace-nowrap hover:bg-sky-800 text-gray-800 hover:text-white"
                                >
                                    <span>{t('common.news').toUpperCase()}</span>
                                    <RiArrowDropDownLine fill="currentColor" size={30} />
                                </LinkLocale>
                            </div>
                        </DropdownAntd>
                    </div>
                </div>

                <div className="w-3/5 lg:w-[20.666667%] h-full flex items-center justify-end lg:justify-end">
                    <SearchInHome className="h-full px-3 ml-10 hidden md:flex" />
                </div>

                {/* locale */}
                <Dropdown
                    backdrop="opaque"
                    className="transition-all duration-500 ease-in-out transform hover:scale-105"
                >
                    {[
                        <DropdownTrigger key="dropdown-trigger">
                            <LinkLocale href={pathname} locale={locale === 'en' ? 'vi' : 'en'}>
                                <Button
                                    className="relative border mt-1 border-gray-500 rounded-full inline-flex items-center justify-center md:px-2 px-0 md:py-6 py-0 mb-2 mr-2 text-sm font-light transition duration-150 ease-in-out bg-white bg-opacity-20 text-black hover:bg-opacity-30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-300 dark:focus:ring-purple-500"
                                    variant="solid"
                                >
                                    <svg
                                        className="w-5 h-5 -mr-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        ></path>
                                    </svg>
                                    <span
                                        className="font-semibold"
                                        style={{ fontFamily: '"Open Sans", sans-serif' }}
                                    >
                                        {locale === 'en' ? 'En' : 'Vn'}
                                    </span>
                                </Button>
                            </LinkLocale>
                        </DropdownTrigger>,
                    ]}
                </Dropdown>
            </div>
            <Drawer
                title="Menu"
                placement="left"
                size="default"
                onClose={handleCloseMenu}
                open={openMenu}
            >
                {/* search md */}
                <div>
                    <SearchInHome className="h-full md:flex" />
                </div>

                <div>
                    <div className="mt-5">
                        <LinkLocale href="/product" className="text-black font-bold">
                            {t('common.product')}
                        </LinkLocale>
                        <div className="mt-2 grid grid-cols-2 gap-4" onClick={handleCloseMenu}>
                            {categories &&
                                categories
                                    .reduce<JSX.Element[][]>((resultArray, item, index) => {
                                        const chunkIndex = Math.floor(index / 2)

                                        if (!resultArray[chunkIndex]) {
                                            resultArray[chunkIndex] = []
                                        }

                                        resultArray[chunkIndex].push(
                                            <div key={item.id} className="flex items-start pb-2">
                                                <Image
                                                    src={item.image}
                                                    className="w-[5rem] h-20 object-cover rounded-lg mr-2 shadow-lg transition-transform duration-500 hover:scale-105"
                                                    width={80}
                                                    height={80}
                                                    alt={item.name[locale]}
                                                />
                                                <div className="flex flex-col">
                                                    <LinkLocale href={`/category/${item.slug}`}>
                                                        <span className="font-helvetica text-3sm font-semibold text-cyan-900 hover:underline">
                                                            {item.name[locale]}
                                                        </span>
                                                    </LinkLocale>
                                                </div>
                                            </div>
                                        )

                                        return resultArray
                                    }, [])
                                    .map((chunk, index) => (
                                        <div key={index} className="col-span-1">
                                            {chunk}
                                        </div>
                                    ))}
                        </div>
                    </div>

                    <div className="mt-5">
                        <LinkLocale
                            href="/news"
                            className="font-bold text-black"
                            onClick={handleCloseMenu}
                        >
                            {t('common.news')}
                        </LinkLocale>
                        <Menu
                            className="grid grid-cols-2 -ml-5"
                            items={
                                categoriesNews &&
                                categoriesNews.map((v) => ({
                                    ...v,
                                    key: v.id,
                                    label: (
                                        <LinkLocale href={`/news/${v.slug}`}>
                                            <span className="flex items-center space-x-3 mt-1 transition duration-300 ease-in-out">
                                                <div className="w-10 h-10 flex-shrink-0">
                                                    <Image
                                                        src={v.image}
                                                        alt={v.name[locale]}
                                                        className="w-full h-full object-cover rounded-lg shadow-md"
                                                        width={40}
                                                        height={40}
                                                    />
                                                </div>
                                                <span className="text-sm font-medium text-gray-800">
                                                    {v.name[locale]}
                                                </span>
                                            </span>
                                        </LinkLocale>
                                    ),
                                }))
                            }
                        />
                    </div>

                    <div className="mt-8 border-e-3 border-gray-400 w-[8rem]">
                        <LinkLocale
                            href="/contact"
                            className="text-cyan-700 text-xl font-bold"
                            onClick={handleCloseMenu}
                        >
                            {t('common.company')}
                        </LinkLocale>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}

export default memo(Navbar)
