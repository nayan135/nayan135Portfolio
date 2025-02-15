import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface ProjectCardProps {
  project: {
    title: string
    description: string
    image: string
    slug: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} className="bg-card rounded-lg overflow-hidden shadow-lg">
      <div className="relative h-48">
        <Image src={project.image || "/placeholder.svg"} alt={project.title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4">{project.description}</p>
        <Link href={`/projects/${project.slug}`} className="inline-flex items-center text-primary hover:underline">
          View Project
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}

