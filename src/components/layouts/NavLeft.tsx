'use client'

import { Avatar } from '@nextui-org/react'
import { memo, useEffect, useState } from 'react'
import { CgMenuGridO } from 'react-icons/cg'
import { TbSocial } from 'react-icons/tb'

import { useInfo } from '@/context/InfoContext'
import { Locale, locales } from '@/i18n'
import { useLocale, useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'
import FanPage from '../socialPlugin/FanPage'
import Image from 'next/image'
import { LinkLocale } from '../LinkLocale'

const NavLeft = ({ ...rest }) => {
    const pathname = usePathname()
    const t = useTranslations()
    const locale = useLocale() as Locale

    const [isOpen, setIsOpen] = useState(false)
    const {
        info: { name, description, brands, email, address, hostLines, linkChannels, images },
    } = useInfo()

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    }, [isOpen])

    const handleButtonClick = () => {
        const newIsOpen = !isOpen
        setIsOpen(newIsOpen)
        window.dispatchEvent(new CustomEvent('navbarLeftToggle', { detail: { isOpen: newIsOpen } }))
    }

    const pathNames = pathname.split('/').filter((i) => !locales.includes(i as any))

    return (
        <div
            style={{
                position: 'fixed',
                boxShadow: isOpen ? 'none' : 'inset 0 0 0 1px #e5e5e5', // Shadow inner
                height: '100vh', // Full height
                backgroundColor: isOpen ? '#1a202c' : '#ffffff', // Background color based on isOpen
                color: isOpen ? '#ffffff' : '#000000', // Text color based on isOpen
                transitionProperty: 'background-color, color', // Transition properties
                transitionDuration: '500ms', // Transition duration
            }}
            {...rest}
        >
            <div
                className={`h-screen flex flex-col items-center justify-between py-8 ${
                    isOpen ? 'text-white' : 'text-gray-800'
                }`}
            >
                <div className="items-center">
                    <button className="mb-5 pt-4 focus:outline-none" onClick={handleButtonClick}>
                        <CgMenuGridO
                            className={`text-4xl ${
                                isOpen ? 'text-white' : 'text-gray-800 hover:text-black'
                            }`}
                        />
                    </button>
                </div>
                <span className="flex flex-row items-center">
                    {t(`common.${pathNames[0] || 'company'}`)
                        .split(' ')
                        .map((v, i) => (
                            <span
                                key={i}
                                className={`font-light text-black text-2sm mr-1 ${
                                    isOpen ? 'text-white' : 'text-gray-800 hover:text-black'
                                }`}
                            >
                                {v}
                            </span>
                        ))}
                </span>

                <ul className="space-y-8 mb-[3rem]">
                    {linkChannels.map((link, index) => (
                        <li key={index} className="group">
                            <LinkLocale
                                href={link.url}
                                className="flex items-center justify-center bg-gray-200 p-1 rounded-full transition-all duration-300 ease-in-out hover:bg-white"
                            >
                                <Avatar
                                    src={link.icon}
                                    alt={link.name}
                                    size="sm"
                                    className={`${
                                        isOpen ? 'text-white' : 'text-gray-800'
                                    } group-hover:text-black transition-colors duration-300 ease-in-out`}
                                />
                            </LinkLocale>
                        </li>
                    ))}
                </ul>
            </div>
            {isOpen && (
                <div className="fixed top-0 ml-[6.5rem] border bg-white w-full h-full flex z-50">
                    <div className="w-3/5 h-full ml-[1rem] space-y-5 p-10">
                        <div className="h-[4%] flex items-end">
                            <TbSocial size={'2rem'} style={{ color: 'blue' }} className="pr-2" />
                            <h3 className="font-roboto font-bold text-black">
                                __Giới thiệu BiofixFresh.
                            </h3>
                        </div>

                        <div className="h-[38%] w-full">
                            <div className="flex h-full w-full gap-2 overflow-hidden">
                                <div className="relative aspect-video w-3/5 overflow-hidden rounded-xl">
                                    <Image
                                        alt="Biofix Image with Zoom"
                                        src={images[1]}
                                        layout="fill"
                                        objectFit="cover"
                                        className="hover:scale-105 transition-all duration-300 ease-in-out"
                                    />
                                </div>
                                <FanPage />
                            </div>
                        </div>

                        <div
                            className="h-[50%] pt-3 w-full flex overflow-hidden space-x-5  border-gray-500 rounded-3xl"
                            style={{
                                backgroundImage: `url('https://tokyugardencity.com/assets/media/about-overview-bg.6b26d65c.jpg')`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                padding: '15px',
                            }}
                        >
                            <div className="w-1/6 justify-start item-start h-full overflow-hidden">
                                <div className="transform rotate-90 translate-y-1/2 p-5">
                                    <p className="text-4xl font-bold border-l-5 pl-3 border-gray-900 text-gray-900">
                                        about Biofix_fresh
                                    </p>
                                </div>
                            </div>
                            <div className="w-2/6 flex justify-center">
                                <Image
                                    alt="Biofix Image with Zoom"
                                    className="object-contain h-[80%] w-full my-auto"
                                    src="https://tokyugardencity.com/images/about/vn-map.png?w=3840"
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="w-2/3 flex items-center justify-center">
                                <div>
                                    <h4 className="text-gray-700 font-roboto text-lg font-semibold mb-2">
                                        {name[locale]}
                                    </h4>
                                    <p className="text-gray-500 font-roboto text-sm border-t border-gray-300 pt-2">
                                        {description?.[locale]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-2/5 ml-5 overflow-hidden">
                        <Image
                            alt="cc"
                            src={images[2]}
                            className="h-full w-full object-cover"
                            width={1000}
                            height={1000}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}

export default memo(NavLeft)
