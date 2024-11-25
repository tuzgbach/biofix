'use client'
import { Locale } from '@/i18n'
import { Link } from '@/navigation'
import { useLocale } from 'next-intl'
import { ComponentProps, ReactNode } from 'react'

type LinkProps = ComponentProps<typeof Link>

export const LinkLocale = ({ href, children, className, ...rest }: LinkProps) => {
    const locale = useLocale() as Locale
    return (
        <Link locale={locale} href={href} className={className} {...rest}>
            {children}
        </Link>
    )
}
