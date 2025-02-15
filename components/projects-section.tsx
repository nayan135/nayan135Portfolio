"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"

const projects = [
  { title: "FITGREEN", image: "/images/fitgreen.jpg", slug: "fitgreen" },
  { title: "EDUMENTOR", image: "/images/edumentor.jpg", slug: "edumentor" },
  { title: "AALANKAR", image: "/images/aalankar.jpg", slug: "aalankar" },
  { title: "TIC-TAC-TOE", image: "/images/tic-tac-toe.jpg", slug: "tic-tac-toe" },
  { title: "WEATHER APP", image: "/images/weather-app.jpg", slug: "weather-app" },
]

export function ProjectsSection() {
  const router = useRouter()

  return (
    <section className="p-8 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
      <p className="text-lg md:text-xl mb-8 max-w-2xl">
        Here are some of the projects I've worked on. Click on a project to learn more.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <button
            key={project.slug}
            onClick={() => router.push(`/projects/${project.slug}`)}
            className="group relative h-64 overflow-hidden rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 group-hover:opacity-75" />
            <h3 className="absolute bottom-4 left-4 text-white text-2xl font-bold">{project.title}</h3>
          </button>
        ))}
      </div>
    </section>
  )
}

