'use client'

import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './home.css'
import { useLocale, useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'
import { BrandsInfo } from '@/http/infoApi'
import { Locale } from '@/i18n'
import Image from 'next/image'

const Text = ({ brand, images }: { brand: BrandsInfo; images: string[] }) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 2) % images.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [currentImageIndex, images.length])

    return (
        <div className="py-5 absolute left-[7rem] w-[70%] animate-fadeInLeft z-20 rounded-lg text-white">
            <div className="block mt-[4.5rem]">
                <span
                    className="font-semibold text-7sm overflow-auto"
                    style={{ wordWrap: 'break-word', lineHeight: '1.2' }}
                    dangerouslySetInnerHTML={{ __html: brand.title[locale] }}
                ></span>
                <p
                    className="text-3xl font-light mb-8 mt-10"
                    style={{ wordWrap: 'break-word' }}
                    dangerouslySetInnerHTML={{ __html: brand.slogan[locale] }}
                ></p>
            </div>
            <div className="rounded-sm overflow-hidden animate-imageDiv">
                <span className="flex gap-6 h-auto w-full">
                    {[currentImageIndex, (currentImageIndex + 1) % images.length].map(
                        (imgIndex, i) => (
                            <Image
                                alt=""
                                key={i}
                                src={images[imgIndex]}
                                className="mt-7 w-[35%] h-auto rounded-2xl shadow-lg transition duration-500 ease-in-out transform"
                                style={{ filter: 'brightness(100%) contrast(100%)' }}
                                width={500}
                                height={500}
                            />
                        )
                    )}
                </span>
            </div>
        </div>
    )
}

Text.propTypes = {
    brand: PropTypes.object,
    images: PropTypes.array,
}

export default Text
