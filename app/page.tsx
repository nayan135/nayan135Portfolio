import { MainSection } from "@/components/main-section"
import { getPersonalInfoStatic, getSiteSettingsStatic } from "@/lib/data-service"
import { Metadata } from "next"

// Generate metadata dynamically from database
export async function generateMetadata(): Promise<Metadata> {
  const [personalInfo, siteSettings] = await Promise.all([
    getPersonalInfoStatic(),
    getSiteSettingsStatic()
  ])

  const title = siteSettings?.seoTitle || `${personalInfo?.name || 'Portfolio'} - ${personalInfo?.title || 'Developer'}`
  const description = siteSettings?.seoDescription || personalInfo?.bio || 'Professional portfolio website'

  return {
    title,
    description,
    keywords: siteSettings?.seoKeywords || [],
    openGraph: {
      title,
      description,
      images: [siteSettings?.ogImage || '/images/og-image.jpg'],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [siteSettings?.ogImage || '/images/og-image.jpg'],
    },
  }
}

export default async function Home() {
  // Fetch data at build time for SEO
  const personalInfo = await getPersonalInfoStatic()

  return (
    <div className="h-screen flex items-center justify-center">
      <MainSection personalInfo={personalInfo} />
    </div>
  )
}

// Enable ISR - revalidate every hour
export const revalidate = 3600

