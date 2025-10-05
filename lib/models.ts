import mongoose, { Schema, Document } from 'mongoose'

export interface IContributor {
  name: string
  role: string
  avatar: string
  link: string
}

export interface IProject extends Document {
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
  createdAt: Date
  updatedAt: Date
  order: number
}

export interface IPersonalInfo extends Document {
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
  updatedAt: Date
}

export interface ISiteSettings extends Document {
  seoTitle: string
  seoDescription: string
  seoKeywords: string[]
  ogImage: string
  favicon: string
  googleAnalytics?: string
  gtmId?: string
  maintenanceMode: boolean
  themeColor: string
  updatedAt: Date
}

const ContributorSchema = new Schema<IContributor>({
  name: { type: String, required: true },
  role: { type: String, required: true },
  avatar: { type: String, required: true },
  link: { type: String, required: true }
})

const ProjectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  image: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  demoUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  contributors: [ContributorSchema],
  images: [{ type: String }],
  featured: { type: Boolean, default: false },
  technologies: [{ type: String }],
  status: { 
    type: String, 
    enum: ['active', 'archived', 'in-development'], 
    default: 'active' 
  },
  order: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

const PersonalInfoSchema = new Schema<IPersonalInfo>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  bio: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
  resume: { type: String, required: true },
  social: {
    github: { type: String, required: true },
    linkedin: { type: String, required: true },
    twitter: { type: String },
    website: { type: String }
  },
  skills: [{ type: String }],
  experience: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true }
  }],
  education: [{
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String }
  }],
  updatedAt: { type: Date, default: Date.now }
})

const SiteSettingsSchema = new Schema<ISiteSettings>({
  seoTitle: { type: String, required: true },
  seoDescription: { type: String, required: true },
  seoKeywords: [{ type: String }],
  ogImage: { type: String, required: true },
  favicon: { type: String, required: true },
  googleAnalytics: { type: String },
  gtmId: { type: String },
  maintenanceMode: { type: Boolean, default: false },
  themeColor: { type: String, default: '#000000' },
  updatedAt: { type: Date, default: Date.now }
})

// Update timestamps on save
ProjectSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

PersonalInfoSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

SiteSettingsSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema)
export const PersonalInfo = mongoose.models.PersonalInfo || mongoose.model<IPersonalInfo>('PersonalInfo', PersonalInfoSchema)
export const SiteSettings = mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)