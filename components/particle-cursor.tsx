"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CursorState {
  x: number
  y: number
  isHovering: boolean
  isClicking: boolean
  cursorType: 'default' | 'link' | 'button' | 'text'
}

interface Particle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
}

export function ParticleCursor() {
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    isHovering: false,
    isClicking: false,
    cursorType: 'default'
  })
  const [particles, setParticles] = useState<Particle[]>([])
  const [isMobile, setIsMobile] = useState(false)

  const updatePosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setCursor(prev => ({ ...prev, x: e.clientX, y: e.clientY }))
      
      // Add new particles on movement
      if (Math.random() > 0.8) {
        const newParticle: Particle = {
          id: Date.now() + Math.random(),
          x: e.clientX + (Math.random() - 0.5) * 20,
          y: e.clientY + (Math.random() - 0.5) * 20,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2,
          life: 60,
          maxLife: 60,
          size: Math.random() * 4 + 2,
        }
        
        setParticles(prev => [...prev.slice(-20), newParticle])
      }
    })
  }, [])

  const handleMouseDown = useCallback(() => {
    setCursor(prev => ({ ...prev, isClicking: true }))
    
    // Burst of particles on click
    const burstParticles: Particle[] = []
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2
      const speed = Math.random() * 3 + 2
      burstParticles.push({
        id: Date.now() + i,
        x: cursor.x,
        y: cursor.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 80,
        maxLife: 80,
        size: Math.random() * 6 + 3,
      })
    }
    setParticles(prev => [...prev, ...burstParticles])
  }, [cursor.x, cursor.y])

  const handleMouseUp = useCallback(() => {
    setCursor(prev => ({ ...prev, isClicking: false }))
  }, [])

  const handleMouseEnter = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    let cursorType: CursorState['cursorType'] = 'default'
    
    if (target.tagName === 'A' || target.closest('a')) {
      cursorType = 'link'
    } else if (target.tagName === 'BUTTON' || target.closest('button')) {
      cursorType = 'button'
    } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
      cursorType = 'text'
    }

    setCursor(prev => ({ ...prev, isHovering: true, cursorType }))
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursor(prev => ({ ...prev, isHovering: false, cursorType: 'default' }))
  }, [])

  // Update particles
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles(prev => prev
        .map(particle => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life - 1,
          vy: particle.vy + 0.1, // gravity
        }))
        .filter(particle => particle.life > 0)
      )
    }, 16) // ~60fps

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) return

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    const interactiveElements = document.querySelectorAll('a, button, input, textarea, [role="button"]')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [updatePosition, handleMouseDown, handleMouseUp, handleMouseEnter, handleMouseLeave, isMobile])

  if (isMobile) return null

  const getCursorColor = () => {
    switch (cursor.cursorType) {
      case 'link': return '#10b981'
      case 'button': return '#3b82f6'
      case 'text': return '#8b5cf6'
      default: return 'hsl(var(--primary))'
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.x - particle.size / 2,
            top: particle.y - particle.size / 2,
            width: particle.size,
            height: particle.size,
            backgroundColor: getCursorColor(),
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 ${particle.size * 2}px ${getCursorColor()}40`,
          }}
        />
      ))}

      {/* Main Cursor */}
      <motion.div
        className="absolute"
        style={{ left: cursor.x, top: cursor.y }}
        animate={{
          x: -8,
          y: -8,
          scale: cursor.isClicking ? 1.5 : cursor.isHovering ? 1.2 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        {/* Core */}
        <motion.div
          className="w-4 h-4 rounded-full border-2"
          style={{
            borderColor: getCursorColor(),
            backgroundColor: cursor.isClicking ? getCursorColor() : 'transparent',
          }}
          animate={{
            rotate: cursor.isHovering ? 360 : 0,
          }}
          transition={{
            rotate: { duration: 2, repeat: cursor.isHovering ? Infinity : 0, ease: "linear" }
          }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-1 rounded-full -translate-x-1/2 -translate-y-1/2"
          style={{ backgroundColor: getCursorColor() }}
          animate={{
            scale: cursor.isClicking ? 0 : 1,
          }}
        />
      </motion.div>

      {/* Hover Label */}
      <AnimatePresence>
        {cursor.isHovering && cursor.cursorType !== 'default' && (
          <motion.div
            className="absolute bg-foreground text-background px-2 py-1 text-xs rounded font-medium"
            style={{
              left: cursor.x + 20,
              top: cursor.y - 10,
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            ✨ {cursor.cursorType.toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}