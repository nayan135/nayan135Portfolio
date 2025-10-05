"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"
import { EnhancedProjectCard } from "@/components/enhanced-project-card"
import { AdvancedShuffle } from "@/components/advanced-shuffle"
import type { Project } from "@/lib/projects"

interface ShuffleProjectsProps {
  projects: Project[]
}

export function ShuffleProjects({ projects }: ShuffleProjectsProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  return (
    <div className="space-y-8">
      {/* View Mode Toggle */}
      <motion.div 
        className="flex justify-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="flex items-center gap-2"
          >
            <Grid className="w-4 h-4" />
            Grid View
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            List View
          </Button>
        </div>
      </motion.div>

      {/* Advanced Shuffle with Projects */}
      {viewMode === 'grid' ? (
        <AdvancedShuffle projects={projects}>
          {(project, index) => <EnhancedProjectCard project={project} />}
        </AdvancedShuffle>
      ) : (
        <AdvancedShuffle projects={projects}>
          {(project, index) => <ListProjectCard project={project} />}
        </AdvancedShuffle>
      )}
    </div>
  )
}

// Enhanced List view component
function ListProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      className="flex items-center gap-6 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all duration-300 w-full group"
      whileHover={{ 
        x: 8,
        boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"
      }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div 
        className="flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      <div className="flex-1">
        <motion.h3 
          className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors"
          whileHover={{ x: 4 }}
        >
          {project.title}
        </motion.h3>
        <motion.p 
          className="text-muted-foreground text-sm"
          whileHover={{ x: 4 }}
          transition={{ delay: 0.05 }}
        >
          {project.description}
        </motion.p>
      </div>
      
      <motion.div 
        className="flex items-center gap-3"
        whileHover={{ x: -4 }}
      >
        <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
          <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            Demo
          </a>
        </Button>
        <Button variant="outline" size="sm" asChild className="hover:scale-105 transition-transform">
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
            Code
          </a>
        </Button>
      </motion.div>
    </motion.div>
  )
}