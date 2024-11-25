import { LinkLocale } from '@/components/LinkLocale'
import { ModalContact } from '@/components/modalContact'
import { useCategory } from '@/context/CategoryContext'
import { useCategoryNews } from '@/context/CategoryNewsContext'
import { useInfo } from '@/context/InfoContext'
import { Locale } from '@/i18n'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { SetStateAction, useEffect, useState } from 'react'
import { FcNext, FcPrevious } from 'react-icons/fc'
import { AiFillPlusCircle } from 'react-icons/ai'
import Modal from 'react-modal'
import { AiFillCloseCircle } from 'react-icons/ai'
import { IoIosArrowBack } from 'react-icons/io'

interface Category {
    name: { [key: string]: string }
    description: { [key: string]: string }
    image: string
    children?: Category[]
}

const CardCategory = () => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const { categories } = useCategory()
    const { categoriesNews } = useCategoryNews()
    const [open, setOpen] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [categoryStack, setCategoryStack] = useState<Category[]>([])
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const {
        info: { brands },
    } = useInfo()

    useEffect(() => {
        const interval = setInterval(() => {
            if (categoriesNews && categoriesNews.length > 0) {
                setCurrentImageIndex((currentImageIndex + 1) % categoriesNews.length)
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [currentImageIndex, categoriesNews])

    const handlePrevImage = () => {
        if (categoriesNews && categoriesNews.length > 0) {
            setCurrentImageIndex(
                (currentImageIndex - 1 + categoriesNews.length) % categoriesNews.length
            )
        }
    }

    const handleNextImage = () => {
        if (categoriesNews && categoriesNews.length > 0) {
            setCurrentImageIndex((currentImageIndex + 1) % categoriesNews.length)
        }
    }

    const openModalWithCategory = (category: SetStateAction<Category | null>) => {
        if (selectedCategory) {
            setCategoryStack([...categoryStack, selectedCategory])
        }
        setSelectedCategory(category)
        setModalOpen(true)
    }

    const handleBack = () => {
        const previousCategory = categoryStack.pop()
        setSelectedCategory(previousCategory || null)
        setCategoryStack([...categoryStack])
    }

    return (
        <div>
            <ModalContact open={open} onCancel={() => setOpen(false)} />
            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                className="modal"
                overlayClassName="overlay"
            >
                <div className="p-4 sm:p-6 md:p-10 w-auto h-auto bg-white max-h-screen overflow-y-auto rounded-lg shadow-2xl relative max-w-4xl mx-auto">
                    <div className="absolute top-0 right-0 p-2 sm:p-4">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="text-2xl sm:text-4xl text-gray-700 hover:text-gray-900 transition duration-300"
                        >
                            <AiFillCloseCircle />
                        </button>
                    </div>
                    {selectedCategory ? (
                        <>
                            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
                                <div className="w-full md:w-[20rem] p-4 sm:p-6 md:p-10 rounded-xl bg-gray-100 shadow-sm">
                                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-gray-800">
                                        {selectedCategory?.name[locale]}
                                    </h2>
                                    <p className="text-sm sm:text-base md:text-[1rem] mb-4 text-gray-600">
                                        {selectedCategory.description[locale]}
                                    </p>
                                </div>
                                <div className="w-full md:flex-1">
                                    <Image
                                        src={selectedCategory.image}
                                        alt="img-category"
                                        layout="responsive"
                                        width={800}
                                        height={800}
                                        objectFit="cover"
                                        className="rounded-lg shadow-lg"
                                    />
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {selectedCategory.children?.map((child, index) => (
                                    <div
                                        key={index}
                                        className="p-2 sm:p-4 cursor-pointer border-b-1 border-sky-500"
                                        onClick={() => openModalWithCategory(child)}
                                        aria-label={`Navigate to category ${child.name[locale]}`}
                                        role="button"
                                        tabIndex={0}
                                    >
                                        <div className="relative w-full h-24 sm:h-32 rounded-2xl overflow-hidden">
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
                                            <span className="text-sm sm:text-md">
                                                {child.name[locale]}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {categoryStack.length > 0 && (
                                <button
                                    onClick={handleBack}
                                    className="mt-4 py-2 px-4 text-white rounded-full bg-black hover:bg-white hover:text-black border-1"
                                >
                                    <IoIosArrowBack className="text-2xl mr-2" />
                                </button>
                            )}
                        </>
                    ) : (
                        <p className="text-center text-gray-500">Loading...</p>
                    )}
                </div>
            </Modal>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 relative w-full py-10 sm:py-20 px-4 sm:px-6 md:px-8 lg:px-[10rem] -mt-10">
                {categories &&
                    categories.map((cate, i) => (
                        <div key={i} className="h-full text-white relative">
                            <div className="relative mt-2 md:mt-5">
                                <LinkLocale href={cate.slug ? `/category/${cate.slug}` : '#'}>
                                    <div className="aspect-[4/5] w-full h-[200px] sm:h-[300px] md:h-[600px] shadow-xl rounded-lg overflow-hidden relative hover:border-[#333] cursor-pointer transition-transform duration-300 ease-in-out group">
                                        <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 transition-opacity duration-300 ease-in-out group-hover:opacity-0"></div>
                                        <div className="absolute top-0 left-0 w-full p-4 sm:p-6 z-20 flex flex-col justify-end">
                                            <div
                                                className="text-2xl sm:text-3xl md:text-4xl text-white font-lora drop-shadow-lg"
                                                style={{ fontWeight: 500 }}
                                            >
                                                <p className="text-ellipsis line-clamp-1">
                                                    {cate.name[locale]}
                                                </p>
                                            </div>
                                            <p
                                                className="text-sm sm:text-base md:text-lg font-light text-white text-ellipsis line-clamp-2 mt-2 drop-shadow-md"
                                                style={{ fontWeight: 400 }}
                                            >
                                                {cate.description[locale]}
                                            </p>
                                        </div>
                                        <Image
                                            className="transition-all duration-500 ease-in-out transform hover:scale-105 hover:border-[#333] w-full h-full"
                                            src={cate.image}
                                            alt="img-category"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </LinkLocale>
                                <div className="absolute bottom-0 right-0 p-2 sm:p-5 z-30">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            openModalWithCategory(cate)
                                        }}
                                    >
                                        <AiFillPlusCircle className="text-3xl sm:text-5xl" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* register */}
            <div className="py-10 sm:py-12 md:p-12 p-0 -mt-14">
                <div className="container mx-auto px-4 sm:px-8 lg:px-16 grid md:grid-cols-2 gap-6 sm:gap-12 items-center">
                    {/* Image Carousel Section */}
                    <div className="relative">
                        <div className="overflow-hidden object-cover relative">
                            <Image
                                src={
                                    categoriesNews && categoriesNews[currentImageIndex]
                                        ? categoriesNews[currentImageIndex].image
                                        : ''
                                }
                                alt=""
                                width={500}
                                height={500}
                                objectFit="cover"
                                className="transition-all p-4 duration-500 mt-5 w-full h-full object-cover rounded-[30px]"
                            />
                        </div>
                        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10">
                            <button
                                onClick={handlePrevImage}
                                className="bg-white text-[#1d6490] hover:bg-[#22537e] rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out"
                            >
                                <FcPrevious size={24} />
                            </button>
                        </div>
                        <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10">
                            <button
                                onClick={handleNextImage}
                                className="bg-white text-[#1d6490] hover:bg-[#22537e] rounded-full p-2 shadow-lg transition-all duration-300 ease-in-out"
                            >
                                <FcNext size={24} />
                            </button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="flex flex-col items-center md:items-start p-3 sm:p-6 md:p-10 transition-all duration-500 ease-in-out">
                        <p className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.3rem] font-bold text-[#227bc9] mb-4 text-center md:text-left">
                            {brands[2]?.title[locale]}
                        </p>
                        <p className="text-sm sm:text-base md:text-lg font-bold text-gray-600 mb-6 text-center md:text-left">
                            {brands[2]?.slogan[locale]}
                        </p>
                        <p className="hidden md:block text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6 text-ellipsis line-clamp-2 text-center md:text-left">
                            {brands[2]?.description[locale]}
                        </p>

                        <button
                            onClick={() => setOpen(true)}
                            className="py-2 sm:py-3 px-4 sm:px-8 md:py-4 md:px-10 rounded-full bg-[#2ca8f6] text-white font-bold hover:bg-[#22537e] transition duration-300 ease-in-out shadow-xl transform hover:-translate-y-1 hover:shadow-2xl"
                        >
                            Đăng ký đồng hành
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

CardCategory.propTypes = {
    brand: PropTypes.object,
}

export default CardCategory
