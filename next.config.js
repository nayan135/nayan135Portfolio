/** @type {import('next').NextConfig} */
const nextConfig = {
    // The appDir option is no longer needed in Next.js 14+
    // as the App Router is the default now
    images: {
        domains: ['nayan135.com.np', 'nayan135.night-owls.tech', 'nayanacharya.xyz'],
    },
    async headers() {
        return [{
            source: '/(.*)',
            headers: [{
                key: 'X-DNS-Prefetch-Control',
                value: 'on',
            },
            {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains; preload',
            },
            {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
            },
            {
                key: 'X-Frame-Options',
                value: 'DENY',
            },
            {
                key: 'X-XSS-Protection',
                value: '1; mode=block',
            },
            {
                key: 'Referrer-Policy',
                value: 'origin-when-cross-origin',
            },
            ],
        },];
    },
}

module.exports = nextConfig