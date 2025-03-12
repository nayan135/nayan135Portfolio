import { projects } from "@/lib/projects";
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Base URL (only use one primary domain for the sitemap)
  const baseUrl = "https://nayan135.com.np";
  
  // Basic pages
  const pages = [
    '',
    '/about',
    '/projects',
  ];
  
  const sitemapEntries: MetadataRoute.Sitemap = [];
  
  // Add entries for main pages
  pages.forEach(page => {
    sitemapEntries.push({
      url: `${baseUrl}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: page === '' ? 1.0 : 0.8,
    });
  });
  
  // Add project detail pages
  projects.forEach(project => {
    sitemapEntries.push({
      url: `${baseUrl}/projects/${project.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  });
  
  return sitemapEntries;
}
