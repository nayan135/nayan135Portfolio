import { projects } from "@/lib/projects";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URLs for all your domains - include all domains
  const baseUrls = [
    "https://nayan135.com.np",
    "https://nayan135.night-owls.tech",
    "https://nayanacharya.xyz"
  ]
  
  // Basic pages
  const pages = [
    '',  // homepage
    '/about',
    '/projects',
  ]
  
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Current date for lastModified
  const currentDate = new Date()
  
  // Add entries for each combination of base URL and page
  baseUrls.forEach(baseUrl => {
    pages.forEach(page => {
      sitemapEntries.push({
        url: `${baseUrl}${page}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: page === '' ? 1.0 : 0.8,
      })
    })
    
    // Add project detail pages
    projects.forEach(project => {
      sitemapEntries.push({
        url: `${baseUrl}/projects/${project.slug}`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7,
      })
    })
  })
  
  return sitemapEntries
}
