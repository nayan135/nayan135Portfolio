"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Head from "next/head"
import { FloatingParticles } from "@/components/floating-particles"
import { MagneticButton } from "@/components/magnetic-button"
import { TextReveal } from "@/components/text-reveal"
import { IPersonalInfo } from "@/lib/types"
import { GTMEvents, useGTMPageView, useGTMTimeTracking, useGTMScrollTracking } from "@/lib/gtm"

// Enhanced roles with more specific developer-focused terms for better SEO
const roles = ["Full-Stack Developer", "Student", "Web Developer", "Next.js Developer", "UI/UX Enthusiast"]

interface MainSectionProps {
  personalInfo?: IPersonalInfo | null
}

export function MainSection({ personalInfo }: MainSectionProps) {
  // GTM tracking hooks
  useGTMPageView('Home')
  useGTMTimeTracking('Home')
  useGTMScrollTracking('Home')

  const [displayedRole, setDisplayedRole] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [delta, setDelta] = useState(100)

  // Include variations of your name for SEO, both Latin and Devanagari scripts
  const names = personalInfo ? [personalInfo.name] : ["Nayan Acharya", "नयन Acharya", "Nayan आचार्य", "नयन आचार्य"]
  const [nameIndex, setNameIndex] = useState(0)

  // New: Random avatar selection
  const avatars = personalInfo ? [personalInfo.avatar] : [
    "/images/avatars/myself.jpg",
    "/images/avatars/myself-1.jpg",
    "/images/avatars/myself-2.jpg",
  ]
  const [avatar, setAvatar] = useState(avatars[0])
  
  useEffect(() => {
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)]
    setAvatar(randomAvatar)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setNameIndex((prev) => (prev + 1) % names.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const displayedName = names[nameIndex]

  useEffect(() => {
    let timer: NodeJS.Timeout

    const tick = () => {
      const currentRole = roles[roleIndex]

      if (!isDeleting) {
        setDisplayedRole(currentRole.substring(0, displayedRole.length + 1))

        if (displayedRole.length === currentRole.length) {
          setIsDeleting(true)
          setDelta(1000)
        }
      } else {
        setDisplayedRole(currentRole.substring(0, displayedRole.length - 1))

        if (displayedRole.length === 0) {
          setIsDeleting(false)
          setRoleIndex((prev) => (prev + 1) % roles.length)
          setDelta(100)
        }
      }
    }

    timer = setTimeout(tick, delta)

    return () => clearTimeout(timer)
  }, [displayedRole, delta, isDeleting, roleIndex])

  return (
    <>
      <FloatingParticles />
      <Head>
        {/* Additional meta tags for this section of Nayan Acharya's profile */}
        <meta name="keywords" content="Nayan Acharya, Nayan135, नयन आचार्य, Full-Stack Developer, NextJS Developer, Portfolio" />
      </Head>
      <section className="p-4 md:p-12 lg:p-16 bg-background text-foreground">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden min-h-screen py-8 md:py-16"
        >
          <div className="absolute inset-0 bg-pattern" />

          <div className="container mx-auto px-4 md:px-6 lg:px-8 flex items-center min-h-[calc(100vh-4rem)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10 w-full">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-4 md:space-y-6 order-last lg:order-first"
              >
                <h2 className="text-sm md:text-lg font-medium text-primary">Welcome to my portfolio</h2>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                  Hey there! I'm{" "}
                  <motion.span
                    className="text-primary"
                    key={displayedName}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {displayedName}
                  </motion.span>
                </h1>
                <div className="h-8 md:h-12">
                  <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
                    A <span className="text-primary font-medium">{displayedRole}</span>
                    <span className="animate-blink text-primary">|</span>
                  </p>
                </div>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {personalInfo?.bio || "I build responsive, accessible, and performant web applications using Next.js, React, and TypeScript."}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  <Button size="lg" className="group" asChild>
                    <Link 
                      href="/projects"
                      onClick={() => GTMEvents.navigationClick('Projects')}
                    >
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a 
                      href={personalInfo?.resume || "/images/resume.pdf"} 
                      download
                      onClick={() => GTMEvents.resumeDownload()}
                    >
                      Download Resume
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href={personalInfo?.social?.github || "https://github.com/nayan135"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${personalInfo?.name || "Nayan Acharya"}'s GitHub profile`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => GTMEvents.socialClick('GitHub', personalInfo?.social?.github || "https://github.com/nayan135")}
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href={personalInfo?.social?.linkedin || "https://linkedin.com/in/nayan135"}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Connect with ${personalInfo?.name || "Nayan Acharya"} on LinkedIn`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    onClick={() => GTMEvents.socialClick('LinkedIn', personalInfo?.social?.linkedin || "https://linkedin.com/in/nayan135")}
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  {(personalInfo?.social?.twitter || "https://x.com/nooneknows135") && (
                    <a
                      href={personalInfo?.social?.twitter || "https://x.com/nooneknows135"}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Follow ${personalInfo?.name || "Nayan Acharya"} on X (Twitter)`}
                      className="text-muted-foreground hover:text-primary transition-colors"
                      onClick={() => GTMEvents.socialClick('Twitter', personalInfo?.social?.twitter || "https://x.com/nooneknows135")}
                    >
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative mt-8 lg:mt-0 order-first lg:order-last"
              >
                <div className="relative aspect-[4/5] w-full max-w-sm md:max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl -rotate-6 transform-gpu" />
                  <Image
                    src={avatar}
                    alt={`${personalInfo?.name || "Nayan Acharya"} - ${personalInfo?.title || "Full Stack Developer"}`}
                    fill
                    className="object-cover rounded-2xl shadow-2xl"
                    priority
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl" />
              </motion.div>
            </div>
          </div>
        </motion.section>
      </section>
    </>
  )
}

