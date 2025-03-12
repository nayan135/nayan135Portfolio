import { MetadataRoute } from 'next'


export function getHostname(requestHeaders?: Headers): string {
  return 'nayan135.com.np'; 
}

// Dynamic robots file that adapts to the hostname
export default function robots(): MetadataRoute.Robots {
  const defaultRules = {
    userAgent: '*',
    allow: '/',
  };

  // Return the appropriate robots configuration
  return {
    rules: defaultRules,
   
    sitemap: 'https://nayan135.com.np/sitemap.xml', 
    host: 'https://nayan135.com.np', 
  }
}
