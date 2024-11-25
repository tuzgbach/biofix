// components/MapComponent.tsx
import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { Locale } from '@/i18n'
import { AddressInfo } from '@/http/infoApi'

interface MapComponentProps {
    mapRef: React.RefObject<HTMLDivElement>
    address: AddressInfo[]
    locale: Locale
}

const MapComponent: React.FC<MapComponentProps> = ({ mapRef, address, locale }) => {
    const mapInstance = useRef<L.Map | null>(null)

    useEffect(() => {
        if (
            mapRef.current &&
            !mapInstance.current &&
            address &&
            address.length > 0 &&
            address.some((a) => a.x && a.y)
        ) {
            // Khởi tạo bản đồ và thiết lập vị trí ban đầu
            mapInstance.current = L.map(mapRef.current).setView([10.8297, 106.7985], 7)

            // Thêm layer tile cho bản đồ từ OpenStreetMap
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance.current)

            // Thêm các marker cho các địa điểm mới
            address
                .filter((a) => a.x && a.y)
                .reverse()
                .forEach((v) => {
                    L.marker([v.x ? Number(v.x) : 10.8297, v.y ? Number(v.y) : 106.7985], {
                        icon: L.icon({
                            iconUrl: '/location.svg',
                            iconSize: [25, 41],
                            iconAnchor: [12, 41],
                        }),
                    })
                        .addTo(mapInstance.current!)
                        .bindPopup(v.key[locale])
                        .openPopup()
                })
        }
    }, [address, locale])

    return (
        <div
            ref={mapRef}
            id="map"
            style={{ width: '100%', height: '100%', maxHeight: '510px' }}
            className="z-10"
        />
    )
}

export default MapComponent
