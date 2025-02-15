"use client"

import { useState, useEffect, useCallback } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const updatePosition = useCallback((e: MouseEvent) => {
    requestAnimationFrame(() => {
      setPosition({ x: e.clientX, y: e.clientY })
    })
  }, [])

  useEffect(() => {
    document.addEventListener("mousemove", updatePosition)
    return () => {
      document.removeEventListener("mousemove", updatePosition)
    }
  }, [updatePosition])

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

