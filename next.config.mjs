import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const imagesPatterns = [
    'res.cloudinary.com',
    'be.shopipi.click',
    'be.biofixfresh.com',
    'greenfeed.com.vn',
    'www.greenfeed.com.vn',
    'tokyugardencity.com',
]

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
    output: 'standalone',
    images: {
        remotePatterns: [
            ...imagesPatterns.map((v) => ({
                protocol: 'https',
                hostname: v,
                port: '',
                pathname: '/**',
            })),
            {
                protocol: 'http',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**',
            },
        ],
    },

    async headers() {
        return [
            {
                source: '/uploads/:path*', // Áp dụng cho tất cả hình ảnh trong thư mục uploads
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=0, must-revalidate', // Không cache
                    },
                ],
            },
        ]
    },
}

export default withNextIntl(nextConfig)
