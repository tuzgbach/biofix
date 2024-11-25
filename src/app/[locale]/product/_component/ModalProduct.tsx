import React, { Dispatch, SetStateAction } from 'react'
import { Modal, ModalContent, ModalHeader, ModalFooter } from '@nextui-org/react'
import { motion } from 'framer-motion'
import { useLocale } from 'next-intl'
import { Locale } from '@/i18n'
import { Product } from '@/http/productApi'
import Image from 'next/image'
import { Category } from '@/http/categoryApi'
type Props = {
    isOpen: boolean
    onClose: () => void
    product?: Product
    currentCate: Category | null
    openContact?: boolean
    setOpenContact: Dispatch<SetStateAction<boolean>>
}
const ModalProduct = ({ isOpen, onClose, product, currentCate, setOpenContact }: Props) => {
    const locale = useLocale() as Locale

    return (
        <div>
            <Modal
                backdrop="opaque"
                isOpen={isOpen}
                onOpenChange={onClose}
                classNames={{
                    backdrop: 'bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20',
                }}
            >
                <ModalContent className="w-full max-w-4xl mx-auto p-4 sm:p-8 lg:p-14">
                    <div className="w-full h-full max-h-[80vh] overflow-y-auto">
                        <ModalHeader className="flex flex-col gap-1 items-start">
                            <p className="text-xl sm:text-2xl font-bold text-gray-800">
                                {product?.name[locale]}
                            </p>
                            <span className="mt-1 font-light text-xs sm:text-3sm bg-gray-500 text-white px-2 rounded-lg">
                                {product?.code}
                            </span>
                        </ModalHeader>
                        <div className="flex flex-col lg:flex-row gap-4 lg:gap-10 items-start">
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
                                <div className="w-full h-auto">
                                    <video
                                        controls
                                        className="w-full rounded-lg"
                                        style={{ maxHeight: '200px' }}
                                    >
                                        <source src={currentCate?.video} />
                                    </video>
                                </div>
                            </div>
                            <div className="flex-1">
                                <p className="mb-7 font-bold bg-gray-400 text-white rounded-lg p-2 sm:p-1 text-xs sm:text-base">
                                    {product?.description[locale]}
                                </p>
                                <div
                                    className="text-gray-700 mb-4 max-h-96 overflow-y-auto"
                                    dangerouslySetInnerHTML={{
                                        __html: product?.content[locale] ?? '',
                                    }}
                                ></div>
                            </div>
                        </div>
                        <ModalFooter className="flex flex-col sm:flex-row justify-end gap-4 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onClose}
                                className="bg-gray-400 text-gray-800 text-sm px-4 py-2 rounded-full flex items-center justify-center hover:shadow-lg transition duration-300"
                            >
                                Đóng
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setOpenContact(true)
                                    onClose()
                                }}
                                className="bg-cyan-700 text-white text-sm px-4 py-2 rounded-full flex items-center justify-center hover:shadow-lg transition duration-300"
                            >
                                Liên hệ
                            </motion.button>
                        </ModalFooter>
                    </div>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default ModalProduct
