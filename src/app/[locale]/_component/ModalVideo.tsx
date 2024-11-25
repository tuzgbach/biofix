'use client'

import PropTypes from 'prop-types'
import { Suspense, useEffect, useState } from 'react'
import './home.css'
import { useLocale, useTranslations } from 'next-intl'
import { BrandsInfo } from '@/http/infoApi'
import { Locale } from '@/i18n'

type Props = {
    video: string | undefined
    isHome?: boolean
    images?: string[] | []
    brand?: BrandsInfo | null
}

const ModalVideos = ({ video, isHome = false, brand = null, images = [] }: Props) => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const [isOpen, setOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [scale, setScale] = useState(1)

    const handleVideoClick = () => {
        setOpen(true)
    }

    const handleCloseVideo = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (images.length === 0) return

        const timer = setInterval(() => {
            setCurrentImageIndex((currentImageIndex + 2) % images.length)
        }, 3000)

        return () => clearInterval(timer)
    }, [currentImageIndex, images.length])

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY
            const newScale = Math.max(0.9, 1 - scrollY / 4000)
            setScale(newScale)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        console.log('Video URL:', video)
    }, [video])

    return (
        <div
            className={`w-full h-[50vh] md:h-[50vh] lg:h-[90vh] relative ${
                !isHome && 'h-[90.5vh]'
            } rounded-lg`}
            style={{ transform: `scale(${scale})`, transition: 'transform 0.3s ease-out' }}
        >
            <div className="w-full h-full">
                <Suspense fallback={<span className="w-full h-full bg-black rounded-lg"></span>}>
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        controlsList="nodownload"
                        className={`w-full h-full ${
                            !isHome ? 'h-[90vh]' : 'object-cover'
                        } rounded-b-xl`}
                    >
                        <source src={video} type="video/mp4" />
                    </video>
                </Suspense>
            </div>
            <div className="absolute bottom-4 right-4">
                <button
                    onClick={handleVideoClick}
                    className="px-4 py-2 m-4 bg-black text-white rounded-full hover:bg-white hover:text-black"
                >
                    <span className="text-1sm">{t('common.watch-video').toUpperCase()}</span>
                </button>
            </div>
            {isOpen && (
                <div className="modal" onClick={handleCloseVideo}>
                    <div className="modal-content rounded-xl">
                        <video controls autoPlay className="w-full h-full rounded-xl">
                            <source src={video} type="video/mp4" />
                        </video>
                    </div>
                </div>
            )}

            {/* text on video */}
            {isHome && images && brand && (
                <div className="absolute left-[3%] top-[12rem] w-[52%] animate-fadeInLeft z-20 rounded-lg text-white">
                    <div className="md:mt-[4rem] mt-[0]">
                        <h1
                            className="font-semibold md:text-6sm lg:text-7sm overflow-hidden text-ellipsis"
                            style={{ wordWrap: 'break-word', lineHeight: '1.2' }}
                            dangerouslySetInnerHTML={{ __html: brand.title[locale] }}
                        ></h1>
                        <h2
                            className="md:text-2xl lg:text-3xl text-1sm font-semibold md:mb-[2rem] mb-[1rem] md:mt-[1rem] mt-[10px]"
                            style={{ wordWrap: 'break-word', lineHeight: '1' }}
                            dangerouslySetInnerHTML={{ __html: brand.slogan[locale] }}
                        ></h2>
                    </div>
                </div>
            )}
        </div>
    )
}

ModalVideos.propTypes = {
    video: PropTypes.string,
}

export default ModalVideos
