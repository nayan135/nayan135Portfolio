"use client"

import { useState, useEffect, useCallback } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  const updatePosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition)
    return () => {
      document.removeEventListener("mousemove", updatePosition)
    }
  }, [updatePosition])

  if (isMobile) return null

  return (
    <div
      className="fixed w-6 h-6 rounded-full pointer-events-none z-50 border-2 border-primary transition-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    />
  )
}

