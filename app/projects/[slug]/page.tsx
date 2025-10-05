import { notFound } from "next/navigation"
import { getProjectStatic, getProjectsStatic } from "@/lib/data-service"
import { ClientProjectPage } from "@/components/client-project-page"
import { Metadata } from "next"

// Generate metadata for this page
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProjectStatic(params.slug)
  
  if (!project) {
    return {
      title: "Project Not Found",
    }
  }
  
  return {
    title: `${project.title} | Nayan Acharya's Portfolio`,
    description: project.description,
    keywords: [`Nayan Acharya ${project.title}`, `Nayan135 ${project.title}`, project.title, "project", "development", "portfolio"],
    openGraph: {
      title: `${project.title} | Nayan Acharya's Project`,
      description: project.description,
      type: "article",
      url: `https://nayan135.com.np/projects/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.image],
    }
  }
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = await getProjectsStatic()
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProjectStatic(params.slug)

  if (!project) {
    notFound()
  }

  return <ClientProjectPage project={project} />
}

// Enable ISR - revalidate every hour
export const revalidate = 3600

