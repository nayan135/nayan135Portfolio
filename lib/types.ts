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
  status: 'active' | 'inactive' | 'draft'
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
  phone: string
  location: string
  avatar: string
  social: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
  skills: string[]
  resume: string
  createdAt?: Date
  updatedAt?: Date
}

export interface ISiteSettings {
  _id?: string
  siteName: string
  siteDescription: string
  siteUrl: string
  logo: string
  favicon: string
  gtmId: string
  analyticsId: string
  contactEmail: string
  socialLinks: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
  seoSettings: {
    keywords: string[]
    ogImage: string
    twitterHandle: string
  }
  createdAt?: Date
  updatedAt?: Date
}