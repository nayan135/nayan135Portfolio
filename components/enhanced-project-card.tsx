"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLink, Github } from "lucide-react"
import type { Project } from "@/lib/projects"

interface EnhancedProjectCardProps {
  project: Project
}

export function EnhancedProjectCard({ project }: EnhancedProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className="group relative overflow-hidden rounded-2xl bg-card border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Background gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image container */}
      <div className="relative overflow-hidden aspect-video">
        <motion.div
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
          />
        </motion.div>
        
        {/* Overlay with links */}
        <motion.div
          className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ExternalLink className="w-5 h-5 text-white" />
          </motion.a>
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-5 h-5 text-white" />
          </motion.a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 relative z-10">
        <motion.h3
          className="text-xl font-semibold mb-2 text-foreground"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>
        <motion.p
          className="text-muted-foreground text-sm leading-relaxed"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          {project.description}
        </motion.p>
        
        <motion.div
          className="mt-4"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <Link
            href={`/projects/${project.slug}`}
            className="text-primary font-medium text-sm hover:underline"
          >
            Learn more →
          </Link>
        </motion.div>
      </div>

      {/* Animated border */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-primary"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}