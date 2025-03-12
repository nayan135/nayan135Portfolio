import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://nayan135.com.np/sitemap.xml',
    host: 'https://nayan135.com.np',
  };
}
