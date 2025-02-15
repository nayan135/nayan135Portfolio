import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { projects, type Contributor } from "@/lib/projects"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-16 min-h-screen">
      <Link href="/projects" className="inline-flex items-center text-primary hover:underline mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
          <p className="text-lg text-muted-foreground mb-6">{project.description}</p>
          <div className="flex space-x-4 mb-8">
            <Button asChild>
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Demo
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
          </div>
        </div>
        <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
          <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
        </div>
      </div>

      {project.contributors?.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contributors</h2>
          <div className="flex flex-wrap gap-6">
            {project.contributors.map((contributor, index) => (
              <ContributorCard key={index} contributor={contributor} />
            ))}
          </div>
        </div>
      )}

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <div
          className="space-y-8"
          dangerouslySetInnerHTML={{
            __html: project.detailedDescription
              .replace(/<h2>/g, '<h2 class="text-2xl font-semibold mt-8 mb-4">')
              .replace(/<p>/g, '<p class="text-base text-muted-foreground">')
              .replace(/<ul>/g, '<ul class="list-disc list-inside space-y-2 ml-4">'),
          }}
        />
      </article>
    </div>
  )
}

function ContributorCard({ contributor }: { contributor: Contributor }) {
  return (
    <a
      href={contributor.link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center space-x-4 p-4 bg-card rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <Avatar className="w-12 h-12">
        <AvatarImage src={contributor.avatar} alt={contributor.name} />
        <AvatarFallback>
          {contributor.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold">{contributor.name}</h3>
        <p className="text-sm text-muted-foreground">{contributor.role}</p>
      </div>
    </a>
  )
}

