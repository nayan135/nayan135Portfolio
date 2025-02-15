"use client"

import { ProjectCard } from "@/components/project-card"
import { projects } from "@/lib/projects"
import { motion } from "@/components/ClientMotionWrapper"

export default function ProjectsPage() {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <h1 className="text-4xl font-bold mb-8">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}

