'use client'

import { isClient } from '@/http'
import { usePathname } from '@/navigation'
import { useLayoutEffect } from 'react'

export default function RestoreScroll() {
    const pathname = usePathname()

    useLayoutEffect(() => {
        if (isClient()) window.scrollTo({ top: 0, behavior: 'smooth' })
    }, [pathname])
    return null
}
