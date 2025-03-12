"use client"

import React, { useState, useEffect } from "react"
import { Sidebar } from "@/components/sidebar"
import { LoadingAnimation } from "@/components/loading-animation"

export default function ClientContent({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])
  
  if (isLoading) {
    return <LoadingAnimation />
  }
  
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 ml-16 md:ml-20">
        {children}
      </main>
    </div>
  )
}
