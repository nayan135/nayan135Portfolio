"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { 
  Shuffle, 
  Grid, 
  List, 
  Sparkles, 
  Zap, 
  RotateCcw,
  Filter
} from "lucide-react"
import { MagneticButton } from "@/components/magnetic-button"
import type { Project } from "@/lib/projects"

interface AdvancedShuffleProps {
  projects: Project[]
  children: (project: Project, index: number) => React.ReactNode
}

type ShufflePattern = 'random' | 'reverse' | 'spiral' | 'wave' | 'explosion'

export function AdvancedShuffle({ projects, children }: AdvancedShuffleProps) {
  const [shuffledProjects, setShuffledProjects] = useState(projects)
  const [isShuffling, setIsShuffling] = useState(false)
  const [currentPattern, setCurrentPattern] = useState<ShufflePattern>('random')

  const shufflePatterns = {
    random: () => [...shuffledProjects].sort(() => Math.random() - 0.5),
    reverse: () => [...shuffledProjects].reverse(),
    spiral: () => {
      const result = [...shuffledProjects]
      const n = result.length
      const spiraled = []
      let left = 0, right = n - 1, top = 0, bottom = Math.ceil(n / 3) - 1
      
      // Simple spiral-like reordering
      for (let i = 0; i < n; i++) {
        if (i % 4 === 0) spiraled.push(result[left++])
        else if (i % 4 === 1) spiraled.push(result[right--])
        else if (i % 4 === 2) spiraled.push(result[top++])
        else spiraled.push(result[bottom--])
      }
      return spiraled.filter(Boolean)
    },
    wave: () => {
      const result = [...shuffledProjects]
      const waved = []
      const cols = 3
      
      for (let col = 0; col < cols; col++) {
        for (let row = 0; row * cols + col < result.length; row++) {
          const index = row * cols + col
          if (col % 2 === 0) {
            waved.push(result[index])
          } else {
            waved.unshift(result[index])
          }
        }
      }
      return waved.filter(Boolean)
    },
    explosion: () => {
      const result = [...shuffledProjects]
      const center = Math.floor(result.length / 2)
      const exploded = [result[center]]
      
      for (let i = 1; i <= center; i++) {
        if (center - i >= 0) exploded.unshift(result[center - i])
        if (center + i < result.length) exploded.push(result[center + i])
      }
      return exploded
    }
  }

  const shuffleWithPattern = (pattern: ShufflePattern) => {
    setIsShuffling(true)
    setCurrentPattern(pattern)
    
    setTimeout(() => {
      const newOrder = shufflePatterns[pattern]()
      setShuffledProjects(newOrder)
      setIsShuffling(false)
    }, 300)
  }

  const resetOrder = () => {
    setIsShuffling(true)
    setTimeout(() => {
      setShuffledProjects(projects)
      setIsShuffling(false)
    }, 300)
  }

  const getPatternIcon = (pattern: ShufflePattern) => {
    switch (pattern) {
      case 'random': return <Shuffle className="w-4 h-4" />
      case 'reverse': return <RotateCcw className="w-4 h-4" />
      case 'spiral': return <Sparkles className="w-4 h-4" />
      case 'wave': return <Zap className="w-4 h-4" />
      case 'explosion': return <Filter className="w-4 h-4" />
    }
  }

  const getShuffleAnimation = (index: number) => {
    switch (currentPattern) {
      case 'explosion':
        return {
          initial: { scale: 0, rotate: 180 },
          animate: { 
            scale: 1, 
            rotate: 0,
            transition: {
              delay: index * 0.05,
              type: "spring",
              stiffness: 200
            }
          }
        }
      case 'spiral':
        return {
          initial: { opacity: 0, rotateY: -90, x: -100 },
          animate: { 
            opacity: 1, 
            rotateY: 0, 
            x: 0,
            transition: {
              delay: index * 0.1,
              duration: 0.6,
              type: "spring"
            }
          }
        }
      case 'wave':
        return {
          initial: { opacity: 0, y: index % 2 === 0 ? -50 : 50 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: {
              delay: index * 0.08,
              type: "spring",
              stiffness: 150
            }
          }
        }
      case 'reverse':
        return {
          initial: { opacity: 0, rotateX: 90 },
          animate: { 
            opacity: 1, 
            rotateX: 0,
            transition: {
              delay: (shuffledProjects.length - index) * 0.05,
              duration: 0.4
            }
          }
        }
      default:
        return {
          initial: { opacity: 0, scale: 0.8 },
          animate: { 
            opacity: 1, 
            scale: 1,
            transition: {
              delay: index * 0.1,
              type: "spring"
            }
          }
        }
    }
  }

  return (
    <div className="space-y-8">
      {/* Enhanced Controls */}
      <motion.div
        className="flex flex-wrap items-center justify-center gap-3 p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm text-muted-foreground mb-2 w-full text-center">
          Choose a shuffle pattern:
        </div>
        
        <div className="flex flex-wrap justify-center gap-2">
          {Object.keys(shufflePatterns).map((pattern) => (
            <MagneticButton
              key={pattern}
              onClick={() => shuffleWithPattern(pattern as ShufflePattern)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                ${currentPattern === pattern 
                  ? 'bg-primary text-primary-foreground shadow-lg' 
                  : 'bg-muted hover:bg-muted/80'
                }
              `}
            >
              <motion.div
                animate={{ 
                  rotate: isShuffling && currentPattern === pattern ? 360 : 0,
                  scale: isShuffling && currentPattern === pattern ? 1.2 : 1
                }}
                transition={{ duration: 0.5 }}
              >
                {getPatternIcon(pattern as ShufflePattern)}
              </motion.div>
              <span className="capitalize text-sm">{pattern}</span>
            </MagneticButton>
          ))}
          
          <Button 
            variant="outline" 
            onClick={resetOrder}
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </Button>
        </div>
      </motion.div>

      {/* Shuffled Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {shuffledProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              layout
              {...getShuffleAnimation(index)}
              exit={{ 
                opacity: 0, 
                scale: 0.8,
                transition: { duration: 0.2 }
              }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              {children(project, index)}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Shuffle Status Indicator */}
      <AnimatePresence>
        {isShuffling && (
          <motion.div
            className="fixed bottom-8 right-8 z-50"
            initial={{ opacity: 0, scale: 0, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 90 }}
          >
            <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                {getPatternIcon(currentPattern)}
              </motion.div>
              <span className="text-sm font-medium">
                {currentPattern.charAt(0).toUpperCase() + currentPattern.slice(1)} shuffle...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}