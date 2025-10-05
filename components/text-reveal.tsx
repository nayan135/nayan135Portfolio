"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
}

export function TextReveal({ text, className = "", delay = 0 }: TextRevealProps) {
  const [displayText, setDisplayText] = useState("")

  useEffect(() => {
    setDisplayText("")
    const timer = setTimeout(() => {
      let currentIndex = 0
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(interval)
        }
      }, 50)
      return () => clearInterval(interval)
    }, delay)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <div className={`relative ${className}`}>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="block"
      >
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
          className="inline-block w-0.5 h-full bg-primary ml-1"
        />
      </motion.span>
    </div>
  )
}