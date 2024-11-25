'use client'

import infoApi, { Info } from '@/http/infoApi'
import { processInfoUrl, processUrl } from '@/utils'
import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react'

type InfoContextType = {
    info: Info
    setInfo: React.Dispatch<React.SetStateAction<Info>>
}

const InfoContext = createContext<InfoContextType>({} as InfoContextType)

export const useInfo = () => useContext(InfoContext)

export default function InfoProvider({
    children,
    initInfo,
}: {
    children: React.ReactNode
    initInfo: Info | null
}) {
    const [info, setInfo] = useState<Info>(initInfo as Info)

    useLayoutEffect(() => {
        // if (!info)
        ;(async () => {
            const i = await infoApi.get()

            setInfo(processInfoUrl(i))
        })()
    }, [])

    return <InfoContext.Provider value={{ info, setInfo }}>{children}</InfoContext.Provider>
}
