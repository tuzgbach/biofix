import createMiddleware from 'next-intl/middleware'
import { locales, localePrefix } from '@/i18n'
import { NextRequest, NextResponse } from 'next/server'

const nextIntlMiddleware = createMiddleware({
    locales,
    localePrefix,
    defaultLocale: 'vi',
})

const redirectMap = {
    en: [
        { pattern: /\/tin-tuc(.*)/, replace: '/news$1' },
        { pattern: /\/gioi-thieu(.*)/, replace: '/contact$1' },
        { pattern: /\/danh-muc-san-pham(.*)/, replace: '/category$1' },
        { pattern: /\/san-pham(.*)/, replace: '/product$1' },
    ],
    vi: [
        { pattern: /\/news(.*)/, replace: '/tin-tuc$1' },
        { pattern: /\/contact(.*)/, replace: '/gioi-thieu$1' },
        { pattern: /\/category(.*)/, replace: '/danh-muc-san-pham$1' },
        { pattern: /\/product(.*)/, replace: '/san-pham$1' },
    ],
}

export default function middleware(req: NextRequest): NextResponse {
    const { pathname } = req.nextUrl
    const locale = req.nextUrl.pathname.slice(1, 3) === 'en' ? 'en' : 'vi'

    const redirects = redirectMap[locale]

    for (const { pattern, replace } of redirects) {
        if (pattern.test(pathname)) {
            const newPathname = pathname.replace(pattern, replace)

            const newUrl = req.nextUrl.clone()
            newUrl.pathname = `${newPathname}`

            return NextResponse.redirect(newUrl)
        }
    }

    return nextIntlMiddleware(req)
}

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}
