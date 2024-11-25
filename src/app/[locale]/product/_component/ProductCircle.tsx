'use client'

import { Button } from '@nextui-org/react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import { SyntheticEvent, useCallback, useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useLocale, useTranslations } from 'next-intl'
import { Category } from '@/http/categoryApi'
import { useCategory } from '@/context/CategoryContext'
import { ModalContact } from '@/components/modalContact'
import { Locale } from '@/i18n'
import { useRouter } from '@/navigation'
import { findCateById, findRootCategory } from '@/utils'
import { isClient } from '@/http'
import './ShowProduct.css'

type Props = {
    categories: Category[]
    selectCateId: string
    changeSelectCateId: (id: string) => void
}

const ProductCircle = ({ categories, selectCateId, changeSelectCateId }: Props) => {
    const t = useTranslations()
    const router = useRouter()
    const locale = useLocale() as Locale
    const { categories: allCates } = useCategory()
    const [open, setOpen] = useState(false)
    const [angleOffsets, setAngleOffsets] = useState<number[]>([])
    const controls = useAnimation()
    const [selectedTab, setSelectedTab] = useState(selectCateId)

    useEffect(() => {
        setSelectedTab(selectCateId)
    }, [selectCateId])

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue)
        handleClick(newValue)
    }

    const getCate: () => Category = useCallback(() => {
        const cate = categories.find((v) => v.id === selectCateId)

        return cate ?? categories[0]
    }, [categories, selectCateId])

    const handleClick = (id: string) => {
        const index = categories.findIndex((v) => v.id === id)
        if (angleOffsets && angleOffsets.length > 0) {
            const newAngleOffsets = angleOffsets.map((_, i) => {
                return (angleOffsets[i] - angleOffsets[index] + 90) % 360
            })
            setAngleOffsets(newAngleOffsets)
        }
        changeSelectCateId(id)
        controls.start({ scale: [0, 1], transition: { duration: 1 } })
    }

    const calculatePosition = (angle: number, radius: number) => {
        const x = 50 + radius * Math.cos((angle * Math.PI) / 180)
        const y = 50 + radius * Math.sin((angle * Math.PI) / 180)
        return { x, y }
    }

    // useEffect(() => {
    //     const cate = categories.find((v) => v.id === selectedTab)
    //     setSelectCate((prev) => cate ?? prev)
    // }, [categories, selectedTab])

    useEffect(() => {
        if (categories && categories.length > 0) {
            const initialAngleOffset = categories.map((_, index) => {
                const angle = (360 / categories.length) * index + 90
                return angle < 0 ? angle + 360 : angle
            })
            setAngleOffsets(initialAngleOffset.sort((a, b) => a - b))
        }
    }, [categories])

    return (
        <div className="md:px-[8rem] md:mt-0 mt-6 px-4 py-7">
            <ModalContact open={open} onCancel={() => setOpen(false)} />
            <div className="relative mb-4">
                <div className="border border-sky-300 mt-20" />
                <span className="absolute text-sky-600 md:top-[-1.5rem] top-[-3rem] md:text-4xl text-xl md:left-[1rem] left-[-1rem] font-bold bg-white px-5">
                    {categories?.[0]?.parentName?.[locale] ?? 'Kinh tế tuần hoàn'}
                </span>
            </div>

            <div className="md:flex items-center w-full pt-2 md:pt-[1.5rem] pl-0 md:pl-10 md:space-x-10">
                {/* circle */}
                <div className="mx-auto md:mx-0 flex justify-center items-center w-3/4 sm:w-3/4 md:w-1/2 lg:w-[35%] border-[4px] border-sky-800 rounded-full">
                    <div className="relative w-full h-full pb-[100%] rounded-full">
                        <motion.img
                            src={getCate().image ?? ''}
                            alt="center"
                            className="absolute w-[80%] sm:w-[80%] md:w-[60%] lg:w-[60%] h-[80%] sm:h-[80%] md:h-[60%] lg:h-[60%] top-[10%] sm:top-[10%] md:top-[20%] lg:top-[20%] left-[10%] sm:left-[10%] md:left-[20%] lg:left-[20%] rounded-full object-cover"
                            initial={false}
                            animate={controls}
                        />
                        {categories &&
                            categories.map((v, index) => {
                                const { x, y } = calculatePosition(
                                    angleOffsets && angleOffsets.length > 0
                                        ? angleOffsets[index]
                                        : (360 / categories.length) * index + 90,
                                    40
                                )
                                return (
                                    <motion.img
                                        key={v.id}
                                        src={v.icon}
                                        alt={`${index}`}
                                        className="z-10 rounded-full border-1"
                                        style={{
                                            position: 'absolute',
                                            width: '15%',
                                            height: '15%',
                                            top: `${y}%`,
                                            left: `${x}%`,
                                            transform: 'translate(-50%, -50%)',
                                            cursor: 'pointer',
                                            background:
                                                selectCateId === v.id ? 'black' : 'transparent',
                                            boxShadow:
                                                selectCateId === v.id
                                                    ? '0 0 0 3px #0F67B1'
                                                    : 'none',
                                        }}
                                        initial={false}
                                        animate={{
                                            top: `${y}%`,
                                            left: `${x}%`,
                                        }}
                                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                                        onClick={() => handleClick(v.id)}
                                    />
                                )
                            })}
                    </div>
                </div>

                {/* tab */}
                <div className="mt-10 md:mt-0 flex-1 w-full space-y-4 md:p-8 p-0">
                    <Tabs
                        value={selectedTab}
                        onChange={handleChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="custom tabs"
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#3FA2F6',
                                height: '0px',
                                borderRadius: '2px',
                                transition: 'transform 0.7s ease-in-out',
                            },
                            '& .MuiTab-root': {
                                minWidth: 'auto',
                                fontSize: { xs: '14px', sm: '16px', md: '18px' },
                                fontWeight: 'normal',
                                color: '#2F3645',
                                transition: 'color 0.2s ease-in-out, 0.2s ease-in-out',
                                '&:hover': {
                                    color: '#3ABEF9',
                                    opacity: 1,
                                },
                                '&.Mui-selected': {
                                    color: '#F3F7EC',
                                    fontWeight: 'bold',
                                    backgroundColor: '#222831',
                                    borderRadius: '100px',
                                    boxShadow: '0 0 0 2px #222831',
                                },
                                padding: { xs: '8px 12px', sm: '12px 16px', md: '14px 18px' },
                                margin: '0 4px',
                            },
                            '& .MuiTabs-flexContainer': {
                                backgroundColor: '#ffffff',
                                padding: '15px',
                                borderRadius: '20px',
                            },
                            '@media (max-width: 960px)': {
                                '& .MuiTab-root': {
                                    padding: '8px 12px',
                                    fontSize: '14px',
                                },
                            },
                            '@media (max-width: 640px)': {
                                '& .MuiTab-root': {
                                    padding: '6px 8px',
                                    fontSize: '12px',
                                    minWidth: '72px',
                                },
                            },
                        }}
                    >
                        {categories &&
                            categories.map((category) => (
                                <Tab
                                    key={category.id}
                                    label={category.name[locale]}
                                    value={category.id}
                                />
                            ))}
                    </Tabs>

                    <div className="relative">
                        <div className="mt-5 relative px-1 md:h-[15rem] h-auto rounded-lg bg-white overflow-hidden shadow-sm">
                            <div
                                className="font-bold md:text-[20px] text-[17px] mt-1 ml-6 text-gray-900"
                                style={{
                                    fontFamily: "'Poppins', sans-serif",
                                }}
                            >
                                Mô tả nhóm ngành
                            </div>
                            <div className="p-5">
                                <AnimatePresence>
                                    <motion.div
                                        key={selectCateId}
                                        initial={{ x: '100%' }}
                                        animate={{ x: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="md:text-[17px] text-[14px] font-roboto font-medium leading-7 text-gray-600 w-full p-2 max-h-[15rem] overflow-y-auto">
                                            {getCate().description[locale]}
                                        </p>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                        <div className="pt-5 bottom-0 left-0 right-0 flex justify-center space-x-4 md:mb-6 mb-0">
                            {getCate().level !== 1 && (
                                <Button
                                    className="md:px-8 px-2 md:py-2 bg-gray-200 hover:bg-black text-gray-800 hover:text-white rounded-3xl"
                                    radius="md"
                                    onClick={() => {
                                        if (getCate().level === 2)
                                            router.push('/product', { locale })
                                        if (getCate().level === 3) {
                                            const parent = findCateById(
                                                allCates,
                                                getCate().parentId ?? ''
                                            )
                                            const root = findCateById(
                                                allCates,
                                                parent?.parentId ?? ''
                                            ) // level 1

                                            router.push(`/category/${root?.slug}`, {
                                                locale,
                                            })
                                        }
                                    }}
                                >
                                    Trở về
                                </Button>
                            )}
                            <Button
                                onClick={() => {
                                    getCate().level >= 3 && isClient()
                                        ? document
                                              .getElementById('cc')
                                              ?.scrollIntoView({ behavior: 'smooth' })
                                        : router.push(`/category/${getCate().slug}`, {
                                              locale,
                                          })
                                }}
                                className="px-5 py-2 bg-gray-200 hover:bg-black text-gray-800 hover:text-white rounded-3xl"
                                radius="md"
                            >
                                {t('admin.product.moreProduct')}
                            </Button>
                            <Button
                                onClick={() => setOpen(true)}
                                className="px-8 py-2 bg-gray-200 hover:bg-black text-gray-800 hover:text-white rounded-3xl"
                                radius="md"
                            >
                                {t('common.contact')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCircle
