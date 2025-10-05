import { getProjectsStatic, getSiteSettingsStatic } from "@/lib/data-service"
import { ClientProjectsPage } from "@/components/client-projects-page"
import { Metadata } from "next"

// Generate metadata dynamically
export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettingsStatic()
  
  return {
    title: `Projects - ${siteSettings?.seoTitle || 'Nayan Acharya'}`,
    description: 'Explore my latest projects, creative solutions, and innovative web applications built with modern technologies.',
    keywords: [...(siteSettings?.seoKeywords || []), 'projects', 'portfolio', 'web development', 'full-stack'],
  }
}

export default async function ProjectsPage() {
  // Fetch projects with ISR for SEO benefits
  const projects = await getProjectsStatic({ status: 'active' })

  return <ClientProjectsPage projects={projects} />
}

// Enable ISR - revalidate every hour
export const revalidate = 3600

