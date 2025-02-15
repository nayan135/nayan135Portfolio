"use client"

import type React from "react"
import { Component } from 'react';

import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Sidebar } from "@/components/sidebar"
import { CustomCursor } from "@/components/custom-cursor"
import { LoadingAnimation } from "@/components/loading-animation"
import { useState, useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.error('ErrorBoundary caught an error:', error);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-pattern`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            {isLoading ? (
              <LoadingAnimation />
            ) : (
              <div className="flex">
                <Sidebar />
                <main className="flex-1 ml-16 md:ml-20">{children}</main>
              </div>
            )}
            <CustomCursor />
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  )
}

import './globals.css'


