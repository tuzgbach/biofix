'use client'

import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useLocale, useTranslations } from 'next-intl'
import { Locale } from '@/i18n'
import { ModalContact } from '@/components/modalContact'
import { Button, Typography } from 'antd'
import { useInfo } from '@/context/InfoContext'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { LinkLocale } from '@/components/LinkLocale'
// import MapComponent from './MapComponent'

const xDefault = 10.8297
const yDefault = 106.7985

// Dynamic import cho thành phần MapComponent
const MapComponent = dynamic(() => import('./MapComponent'), { ssr: false })

const PageContact: React.FC = () => {
    const t = useTranslations()
    const locale = useLocale() as Locale
    const mapRef = useRef<HTMLDivElement | null>(null)
    const mapInstance = useRef<L.Map | null>(null)
    const {
        info: { name, description, brands, email, address, hostLines, linkChannels, linkShops },
    } = useInfo()
    const [open, setOpen] = useState(false)

    return (
        <section className="px-4 py-4 lg:px-8 lg:py-16 md:mt-0 mt-10">
            <ModalContact open={open} onCancel={() => setOpen(false)} />
            <div className="container mx-auto w-full text-center">
                <div className="text-center mx-auto max-w-3xl py-8">
                    <Typography color="blue-gray" className="mb-4 !text-3xl lg:!text-4xl font-bold">
                        {name?.[locale]}
                    </Typography>
                    <Typography className="mb-10 font-normal lg:text-lg text-gray-600">
                        {description?.[locale]}
                    </Typography>
                </div>
                <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-center mx-auto lg:ml-[12rem]">
                    {/* <div
                        ref={mapRef}
                        id="map"
                        className="z-10"
                        style={{ width: '100%', height: '100%', maxHeight: '510px' }}
                    /> */}
                    <MapComponent mapRef={mapRef} address={address} locale={locale} />
                    <form action="#" className="flex flex-col gap-4 lg:max-w-lg">
                        <Typography className="!font-semibold !text-gray-600 text-lg lg:text-xl text-start mb-4">
                            {/* Hãy cùng chung tay để xây dựng môi trường bền vững */}
                            {brands?.[0]?.title?.[locale]}
                        </Typography>

                        <div className="ml-1 border-l-4 p-6 border-[#1d6490]">
                            <Typography className="py-2 text-2xl lg:text-3xl font-bold text-[#333]">
                                {/* Join <span className="text-[#1d6490]">World BiofixFresh</span>{" "}
                            learning platform today */}
                                {brands?.[0]?.slogan?.[locale]}
                            </Typography>
                            <Typography className="py-2 text-gray-600">{email}</Typography>
                            <Button
                                onClick={() => setOpen(true)}
                                className="w-full my-4 py-3 rounded-full bg-[#1d6490] text-white font-bold hover:bg-[#333] transition duration-500 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
                            >
                                Đăng ký hợp tác
                            </Button>
                        </div>
                    </form>
                </div>
                <div className="mt-8 flex w-full flex-col lg:flex-row justify-center gap-8">
                    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
                        <div className="p-4 sm:p-6 md:p-10 bg-white rounded-lg text-start lg:ml-[7rem]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
                                {Array.isArray(address) &&
                                    address.map((addr, index) => (
                                        <div key={index} className="border-b pb-4">
                                            <h4 className="font-bold text-gray-800">
                                                {addr.key[locale]}
                                            </h4>
                                            <p className="text-sm">{addr.value[locale]}</p>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center w-full max-w-md mx-auto">
                        <div className="p-4">
                            <div className="text-center text-lg text-gray-600">
                                {Array.isArray(hostLines) &&
                                    hostLines.map((line, index) => (
                                        <div key={index} className="mb-4">
                                            <div className="font-bold text-gray-800">
                                                {line.key[locale]}
                                            </div>
                                            <div className="text-sm">{line.value[locale]}</div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className="w-full max-w-md">
                            <div className="flex justify-center flex-wrap gap-4">
                                {Array.isArray(linkChannels) &&
                                    linkChannels.map((channel, index) => (
                                        <LinkLocale
                                            key={index}
                                            href={channel.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex flex-col items-center p-2 bg-white rounded-lg"
                                        >
                                            <Image
                                                src={channel.icon}
                                                alt={channel.name}
                                                className="w-10 h-10 mb-2"
                                                width={40}
                                                height={40}
                                            />
                                            <span className="text-sm text-gray-600">
                                                {channel.name}
                                            </span>
                                        </LinkLocale>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PageContact
