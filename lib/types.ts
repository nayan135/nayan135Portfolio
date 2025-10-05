// Client-side type definitions (without mongoose dependencies)
export interface IContributor {
  name: string
  role: string
  avatar: string
  link: string
}

export interface IProject {
  _id?: string
  title: string
  description: string
  detailedDescription: string
  image: string
  slug: string
  demoUrl: string
  githubUrl: string
  contributors: IContributor[]
  images: string[]
  featured: boolean
  technologies: string[]
  status: 'active' | 'archived' | 'in-development'
  order: number
  createdAt?: Date
  updatedAt?: Date
}

export interface IPersonalInfo {
  _id?: string
  name: string
  title: string
  bio: string
  email: string
  avatar: string
  resume: string
  social: {
    github: string
    linkedin: string
    twitter?: string
    website?: string
  }
  skills: string[]
  experience: {
    company: string
    position: string
    duration: string
    description: string
  }[]
  education: {
    institution: string
    degree: string
    duration: string
    description?: string
  }[]
  createdAt?: Date
  updatedAt?: Date
}

export interface ISiteSettings {
  _id?: string
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  ogImage: string
  favicon: string
  googleAnalytics?: string
  gtmId?: string
  maintenanceMode: boolean
  themeColor: string
  createdAt?: Date
  updatedAt?: Date
}