import { getRequestConfig } from 'next-intl/server'
import { notFound } from 'next/navigation'

export const locales = ['vi', 'en'] as const
export type Locale = (typeof locales)[number]

export const localePrefix = 'as-needed'

export default getRequestConfig(async ({ locale }) => {
    // const baseLocale = new Intl.Locale(locale).baseName
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(locale as Locale)) notFound()

    return {
        messages: (await import(`./messages/${locale}.json`)).default,
    }
})
