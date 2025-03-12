/** @type {import('next').NextConfig} */
const nextConfig = {
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
    // Handle redirects to ensure robots.txt and sitemap.xml are accessible on all domains
    async rewrites() {
        return {
            beforeFiles: [
                // Make sitemap.xml accessible on all domains
                {
                    source: '/sitemap.xml',
                    destination: '/api/sitemap',
                    has: [{
                        type: 'host',
                        value: 'nayanacharya.xyz',
                    },],
                },
            ],
        };
    },
}

module.exports = nextConfig