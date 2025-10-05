import { IProject, IPersonalInfo, ISiteSettings } from './types'

// Get the base URL for API calls
function getBaseUrl() {
  // In browser
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // On server
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL
  }
  
  return 'http://localhost:3000'
}

export class DataService {
  private static async fetchWithError(url: string, options?: RequestInit) {
    const baseUrl = getBaseUrl()
    const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`
    
    const response = await fetch(fullUrl, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (!data.success) {
      throw new Error(data.error || 'Request failed')
    }

    return data.data
  }

  // Projects
  static async getProjects(params?: { featured?: boolean; status?: string }): Promise<IProject[]> {
    const searchParams = new URLSearchParams()
    if (params?.featured) searchParams.set('featured', 'true')
    if (params?.status) searchParams.set('status', params.status)
    
    const url = `/api/projects${searchParams.toString() ? `?${searchParams}` : ''}`
    return this.fetchWithError(url)
  }

  static async getProject(slug: string): Promise<IProject> {
    return this.fetchWithError(`/api/projects/${slug}`)
  }

  static async createProject(project: Partial<IProject>): Promise<IProject> {
    return this.fetchWithError(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify(project),
    })
  }

  static async updateProject(slug: string, project: Partial<IProject>): Promise<IProject> {
    return this.fetchWithError(`/api/projects/${slug}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    })
  }

  static async deleteProject(slug: string): Promise<void> {
    await this.fetchWithError(`/api/projects/${slug}`, {
      method: 'DELETE',
    })
  }

  // Personal Info
  static async getPersonalInfo(): Promise<IPersonalInfo> {
    return this.fetchWithError(`/api/personal-info`)
  }

  static async updatePersonalInfo(info: Partial<IPersonalInfo>): Promise<IPersonalInfo> {
    return this.fetchWithError(`/api/personal-info`, {
      method: 'PUT',
      body: JSON.stringify(info),
    })
  }

  // Site Settings
  static async getSiteSettings(): Promise<ISiteSettings> {
    return this.fetchWithError(`/api/settings`)
  }

  static async updateSiteSettings(settings: Partial<ISiteSettings>): Promise<ISiteSettings> {
    return this.fetchWithError(`/api/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  }
}

// Server-side data fetching functions with direct database access
import dbConnect from './mongodb'
import { Project, PersonalInfo, SiteSettings } from './models'

export async function getProjectsStatic(params?: { featured?: boolean; status?: string }): Promise<IProject[]> {
  try {
    await dbConnect()
    
    let query: any = {}
    if (params?.featured) query.featured = true
    if (params?.status) query.status = params.status
    
    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean()
    
    return JSON.parse(JSON.stringify(projects)) // Serialize for Next.js
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProjectStatic(slug: string): Promise<IProject | null> {
  try {
    await dbConnect()
    const project = await Project.findOne({ slug }).lean()
    return project ? JSON.parse(JSON.stringify(project)) : null
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getPersonalInfoStatic(): Promise<IPersonalInfo | null> {
  try {
    await dbConnect()
    const personalInfo = await PersonalInfo.findOne().lean()
    return personalInfo ? JSON.parse(JSON.stringify(personalInfo)) : null
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return null
  }
}

export async function getSiteSettingsStatic(): Promise<ISiteSettings | null> {
  try {
    await dbConnect()
    const settings = await SiteSettings.findOne().lean()
    return settings ? JSON.parse(JSON.stringify(settings)) : null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}