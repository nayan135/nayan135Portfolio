"use client"

import { motion } from "framer-motion"

export function MorphingLoader() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="relative">
        <motion.div
          className="w-16 h-16 border-4 border-primary rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            borderRadius: ["50%", "25%", "50%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute inset-4 bg-primary rounded-full"
          animate={{
            scale: [0.5, 0.8, 0.5],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.div
          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-primary font-mono text-sm">Initializing...</span>
        </motion.div>
      </div>
    </div>
  )
}