"use client"

import type React from "react"

import { Home, FolderKanban, User, Download, Sun, Moon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Sidebar() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [activeIcon, setActiveIcon] = useState<string | null>(null)

  const navigate = (path: string) => {
    router.push(path)
  }

  const handleIconClick = (path: string, iconName: string) => {
    navigate(path)
    setActiveIcon(iconName)
  }

  return (
    <nav className="fixed left-0 top-0 h-screen w-16 md:w-20 bg-background border-r flex flex-col items-center justify-between py-8">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <NavIcon
          icon={Home}
          onClick={() => handleIconClick("/", "home")}
          isActive={activeIcon === "home"}
          label="Home"
        />
        <NavIcon
          icon={FolderKanban}
          onClick={() => handleIconClick("/projects", "projects")}
          isActive={activeIcon === "projects"}
          label="Projects"
        />
        <NavIcon
          icon={User}
          onClick={() => handleIconClick("/about", "about")}
          isActive={activeIcon === "about"}
          label="About"
        />
        <NavIcon
          icon={Download}
          onClick={() => {}}
          isActive={false}
          label="Download Resume"
          href="/images/resume.pdf"
          download
        />
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="w-12 h-12 rounded-full hover:bg-primary/10 transition-colors"
      >
        <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </nav>
  )
}

interface NavIconProps {
  icon: React.ElementType
  onClick: () => void
  isActive: boolean
  label: string
  href?: string
  download?: boolean
}

function NavIcon({ icon: Icon, onClick, isActive, label, href, download }: NavIconProps) {
  const buttonClass = `w-12 h-12 rounded-full transition-colors relative
    ${isActive ? "text-purple-500" : "text-foreground hover:text-primary"}` // removed after effect

  const inner = (
    <>
      <Icon className="h-6 w-6 z-10" />
      <span className="sr-only">{label}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} download={download} className={buttonClass}>
        {inner}
      </a>
    )
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {inner}
    </button>
  )
}

