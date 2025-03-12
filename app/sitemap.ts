import { projects } from "@/lib/projects";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URLs for all your domains
  const baseUrls = [
    "https://nayan135.com.np",
    "https://nayan135.night-owls.tech",
    "https://nayanacharya.xyz"
  ]
  
  // Basic pages
  const pages = [
    '',
    '/about',
    '/projects',
  ]
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add entries for each combination of base URL and page
  baseUrls.forEach(baseUrl => {
    pages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}${page}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: page === '' ? 1.0 : 0.8,
      })
    })
    
    // Add project detail pages
    projects.forEach(project => {
      sitemapEntries.push({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
      })
    })
  })
  
  return sitemapEntries
}
