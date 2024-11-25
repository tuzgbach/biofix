'use client'

import notifyApi, { Notify } from '@/http/notifyApi'
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react'

type NotifyContextType = {
    notify: Notify[]
    totalElements: number
    totalPages: number
    number: number
    last: boolean
    setNotify: React.Dispatch<React.SetStateAction<Notify[]>>
}

const NotifyContext = createContext<NotifyContextType>({} as NotifyContextType)

export const useNotify = () => useContext(NotifyContext)

export default function NotifyProvider({ children }: { children: React.ReactNode }) {
    const [notify, setNotify] = useState<Notify[]>([] as Notify[])
    const [option, setOption] = useState({
        totalElements: 0,
        totalPages: 0,
        number: 0,
        last: true,
    })

    useLayoutEffect(() => {
        ;(async () => {
            const a = await notifyApi.get()

            setNotify(a.content)
            setOption({
                totalElements: a.totalElement,
                totalPages: a.totalPage,
                number: a.currentPage,
                last: a.last,
            })
        })()
    }, [])

    const { totalElements, totalPages, number, last } = option

    return (
        <NotifyContext.Provider
            value={{ notify, setNotify, totalElements, totalPages, number, last }}
        >
            {children}
        </NotifyContext.Provider>
    )
}
