import React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { ParticleCursor } from "@/components/particle-cursor"
import ClientContent from "./ClientContent"
import { ErrorBoundary } from "@/components/error-boundary"
import Script from "next/script"
import { GoogleTagManager, GoogleTagManagerNoScript } from "@/components/google-tag-manager"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

// Expanded metadata for better SEO
export const metadata = {
  title: "Nayan Acharya | Portfolio & Projects | Developer",
  description: "Nayan Acharya (Nayan135) is a full-stack developer specializing in web development. Explore projects including FitGreen, Edumentor, Aalankar, and more.",
  keywords: "Nayan Acharya, Nayan135, Nayan, FitGreen, Edumentor, Aalankar, developer portfolio, web development, full-stack developer, Nepal developer",
  authors: [{ name: "Nayan Acharya", url: "https://github.com/nayan135" }],
  creator: "Nayan Acharya",
  publisher: "Nayan Acharya",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  openGraph: {
    title: "Nayan Acharya | Full-Stack Developer Portfolio",
    description: "Explore Nayan Acharya's (Nayan135) development projects including FitGreen, Edumentor, and more. Full-stack developer specializing in modern web applications.",
    url: "https://nayan135.com.np",
    siteName: "Nayan Acharya Portfolio",
    images: [{ 
      url: "/images/avatars/myself.jpg",
      width: 1200,
      height: 630,
      alt: "Nayan Acharya - Full Stack Developer"
    }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nayan Acharya | Developer Portfolio",
    description: "Check out Nayan Acharya's (Nayan135) projects and skills in full-stack development.",
    creator: "@nooneknows135",
    images: ["/images/avatars/myself.jpg"],
  },
  alternates: {
    canonical: "https://nayan135.com.np",
    languages: {
      'en-US': 'https://nayan135.com.np/en-US',
    },
  },
  metadataBase: new URL("https://nayan135.com.np"),
  // Removed the placeholder verification code since domain is already verified through Cloudflare
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Get GTM ID from environment variable with fallback
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-MTB58SV7'

  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager - Head */}
        <GoogleTagManager gtmId={gtmId} />
        
        <meta name="google-adsense-account" content="ca-pub-7528456570041321" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7528456570041321" crossOrigin="anonymous" />
        <link rel="canonical" href="https://nayan135.com.np" />
        <link rel="alternate" href="https://nayan135.night-owls.tech" />
        <link rel="alternate" href="https://nayanacharya.xyz" />
      </head>
      <body className={`${inter.className} bg-pattern min-h-screen`}>
        {/* Google Tag Manager - NoScript */}
        <GoogleTagManagerNoScript gtmId={gtmId} />
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ErrorBoundary>
            <ClientContent>
              {children}
            </ClientContent>
            <ParticleCursor />
          </ErrorBoundary>
        </ThemeProvider>
        <Toaster position="top-right" richColors />
        
        {/* Structured data for better SEO */}
        <Script id="person-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": "Nayan Acharya",
          "alternateName": "Nayan135",
          "url": "https://nayan135.com.np",
          "sameAs": [
            "https://github.com/nayan135",
            "https://linkedin.com/in/nayan135",
            "https://x.com/nooneknows135"
          ],
          "jobTitle": "Developer",
          "worksFor": {
            "@type": "Organization",
            "name": "Nayan Acharya Portfolio"
          },
          "image": "https://nayan135.com.np/images/avatars/myself.jpg",
          "description": "Nayan Acharya is a full-stack developer specializing in web development, creating projects like FitGreen and Edumentor."
        })}} />
        
        {/* Website schema */}
        <Script id="website-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "url": "https://nayan135.com.np",
          "name": "Nayan Acharya Portfolio",
          "alternateName": ["Nayan135 Portfolio", "Nayan Acharya Developer", "नयन आचार्य"],
          "potentialAction": {
            "@type": "SearchAction",
            "target": {
              "@type": "EntryPoint",
              "urlTemplate": "https://nayan135.com.np/search?q={search_term_string}"
            },
            "query-input": "required name=search_term_string"
          }
        })}} />
      </body>
    </html>
  )
}



