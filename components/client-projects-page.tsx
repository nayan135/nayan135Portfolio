"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/project-card"
import { FloatingParticles } from "@/components/floating-particles"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { IProject } from "@/lib/types"
import { useGTMPageView, useGTMTimeTracking, useGTMScrollTracking } from "@/lib/gtm"

interface ClientProjectsPageProps {
  projects: IProject[]
}

export function ClientProjectsPage({ projects }: ClientProjectsPageProps) {
  // GTM tracking
  useGTMPageView('Projects')
  useGTMTimeTracking('Projects')
  useGTMScrollTracking('Projects')

  return (
    <>
      <FloatingParticles />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 py-16 min-h-screen relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore my latest work and creative solutions. Each project represents a journey of learning and innovation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.1 * index,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  )
}