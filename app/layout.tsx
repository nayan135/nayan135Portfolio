"use client"

import type React from "react"
import { Component } from 'react';
import Head from "next/head"

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
    <html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
        <meta name="keywords" content="FitGreen, Education, health tracking, fitness, wellness, projects, edumentor, aalankar, tic-tac-toe, weather app" />
        <meta name="author" content="Nayan Acharya, Nayan135, Nayanacharya, Nayan" />
        <link rel="icon" href="/images/favicon.ico" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="NAYAN ACHARYA PORTFOLIO" />
        <meta property="og:description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
        <meta property="og:image" content="/images/avatars/myself.jpg" />
        <meta property="og:url" content="https://nayan135.com.np" />
        <meta property="og:site_name" content="Nayan Acharya Projects" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AYAN ACHARYA PORTFOLIO" />
        <meta name="twitter:description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
        <meta name="twitter:image" content="/images/avatars/myself.jpg" />

        {/* HTML Meta Tags */}
        <title>NAYAN ACHARYA | PORTFOLIO</title>
        <meta name="description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
<meta name="google-adsense-account" content="ca-pub-7528456570041321">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7528456570041321"
     crossorigin="anonymous"></script>
        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="NAYAN ACHARYA | PORTFOLIO" />
        <meta itemProp="description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
        <meta itemProp="image" content="https://nayan135.vercel.app/images/favicon.ico" />

        {/* Facebook Meta Tags */}
        <meta property="og:url" content="https://nayan135.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="NAYAN ACHARYA | PORTFOLIO" />
        <meta property="og:description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
        <meta property="og:image" content="https://nayan135.vercel.app/images/favicon.ico" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="NAYAN ACHARYA | PORTFOLIO" />
        <meta name="twitter:description" content="Explore my projects including FitGreen, Edumentor, Aalankar, Tic-Tac-Toe, and Weather App, all built to empower healthier lifestyles." />
        <meta name="twitter:image" content="https://nayan135.vercel.app/images/avatars/myself.jpg" />
      </Head>
      <body className={`${inter.className} bg-pattern min-h-screen`}>
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


