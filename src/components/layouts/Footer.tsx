'use client'

import { useInfo } from '@/context/InfoContext'
import { Locale } from '@/i18n'
import { common } from '@mui/material/colors'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'

const Footer = () => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const {
        info: { address, email, linkChannels, hostLines, description, logo, name },
    } = useInfo()
    return (
        <footer className="bg-gradient-to-r from-sky-800 to-sky-700 w-full py-14 text-white shadow-xl relative overflow-hidden">
            <div className="container mx-auto px-3 grid grid-cols-1 md:grid-cols-3 gap-8 md:ml-[10rem] ml-5">
                {/* Logo and Address */}
                <div className="flex flex-col items-start">
                    <Image
                        width={500}
                        height={500}
                        src={logo}
                        alt="Logo"
                        className="h-16 w-auto mb-5"
                    />
                    <p className="font-normal text-sm mb-4">{description?.[locale]}</p>
                    <p className="text-sm">
                        {t('common.receive-information')}: {email}
                    </p>
                </div>

                {/* Hotlines */}
                <div className="flex flex-col mt-8">
                    <h3 className="text-lg font-bold mb-5">{name?.[locale]}</h3>
                    {Array.isArray(address) && address.length > 0 && (
                        <div className="text-sm mb-4">
                            <div className="font-bold">{address[0].key[locale]}</div>
                            <div>{address[0].value[locale]}</div>
                        </div>
                    )}
                    {Array.isArray(hostLines) &&
                        hostLines.map((line, index) => (
                            <div key={index} className="mb-4 text-sm flex items-center gap-2">
                                <div>{line.key[locale]}:</div>
                                <div>{line.value[locale]}</div>
                            </div>
                        ))}
                    <p className="text-sm">
                        {t('common.email')}: {email}
                    </p>
                </div>

                {/* Channels */}
                <div className="flex flex-col mt-8">
                    <p className="text-xl font-bold mb-5">{t('common.socical')}</p>
                    <div className="flex gap-5">
                        {linkChannels.map((channel, index) => (
                            <a
                                key={index}
                                href={channel.url}
                                className="hover:text-blue-300 transition-colors duration-200 mb-4 flex flex-col items-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={channel.icon}
                                    alt={channel.name}
                                    className="w-8 h-8 mb-2"
                                    width={32}
                                    height={32}
                                />
                                <span className="text-sm font-light">{channel.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-sky-600 mt-10"></div>

            {/* Copyright */}
            <div className="text-center mt-6">
                <p className="text-sm">
                    Bản quyền © {new Date().getFullYear()} {t('common.copyright')}.
                </p>
            </div>
        </footer>
    )
}

export default Footer
