"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

// Enhanced roles with more specific developer-focused terms for better SEO
const roles = ["Full-Stack Developer", "Student", "Web Developer", "Next.js Developer", "UI/UX Enthusiast"]

export function MainSection() {
  const [displayedRole, setDisplayedRole] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [delta, setDelta] = useState(100)

  // Include variations of your name for SEO, both Latin and Devanagari scripts
  const names = ["Nayan Acharya", "नयन Acharya", "Nayan आचार्य", "नयन आचार्य"]
  const [nameIndex, setNameIndex] = useState(0)

  // New: Random avatar selection
  const avatars = [
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
      <Head>
        {/* Additional meta tags for this section of Nayan Acharya's profile */}
        <meta name="keywords" content="Nayan Acharya, Nayan135, नयन आचार्य, Full-Stack Developer, NextJS Developer, Portfolio" />
      </Head>
      <section className="p-4 md:p-12 lg:p-16 bg-background text-foreground">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden min-h-[calc(100vh-80px)]"
        >
          <div className="absolute inset-0 bg-pattern" />

          <div className="container mx-auto px-4 h-screen flex items-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <h2 className="text-lg font-medium text-primary">Welcome to my portfolio</h2>
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
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
                <div className="h-12">
                  <p className="text-xl md:text-2xl text-muted-foreground">
                    A <span className="text-primary font-medium">{displayedRole}</span>
                    <span className="animate-blink text-primary">|</span>
                  </p>
                </div>
                <p className="text-lg text-muted-foreground">
                  I build responsive, accessible, and performant web applications using Next.js, React, and TypeScript.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="group" asChild>
                    <Link href="/projects">
                      View My Work
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="/images/resume.pdf" download>
                      Download Resume
                    </a>
                  </Button>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <a
                    href="https://github.com/nayan135"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit Nayan Acharya's GitHub profile"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com/in/nayan135"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Connect with Nayan Acharya on LinkedIn"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://x.com/nooneknows135"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Follow Nayan Acharya on X (Twitter)"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="relative aspect-[4/5] w-full max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl -rotate-6 transform-gpu" />
                  <Image
                    src={avatar}
                    alt="Nayan Acharya - Full Stack Developer"
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

