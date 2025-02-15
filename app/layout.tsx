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
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="FitGreen - A comprehensive health tracking platform empowering users to monitor and improve their wellness." />
        <meta name="keywords" content="FitGreen, health tracking, fitness, wellness, projects, edumentor, aalankar, tic-tac-toe, weather app" />
        <meta name="author" content="Nayan Acharya, Nayan135, Nayanacharya, Nayan" />
        <link rel="icon" href="/images/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="FitGreen & Other Projects by Nayan Acharya" />
        <meta property="og:description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
        <meta property="og:image" content="/images/fitgreen.jpg" />
        <meta property="og:url" content="https:nayan135.com.np" />
        <meta property="og:site_name" content="Nayan Acharya Projects" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FitGreen & Other Projects by Nayan Acharya" />
        <meta name="twitter:description" content="Discover a collection of innovative projects aimed at promoting health and engagement." />
        <meta name="twitter:image" content="/images/fitgreen.jpg" />
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


