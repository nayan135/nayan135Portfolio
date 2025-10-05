"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { DataService } from '@/lib/data-service'
import { IProject, IPersonalInfo, ISiteSettings } from '@/lib/types'
import { Plus, Edit, Trash2, Save, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export function AdminPanel() {
  const [projects, setProjects] = useState<IProject[]>([])
  const [personalInfo, setPersonalInfo] = useState<IPersonalInfo | null>(null)
  const [siteSettings, setSiteSettings] = useState<ISiteSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Partial<IProject> | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsData, personalData, settingsData] = await Promise.all([
        DataService.getProjects(),
        DataService.getPersonalInfo(),
        DataService.getSiteSettings()
      ])
      setProjects(projectsData)
      setPersonalInfo(personalData)
      setSiteSettings(settingsData)
    } catch (error) {
      toast.error('Failed to load data')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProject = async () => {
    if (!editingProject) return

    try {
      if (editingProject._id) {
        // Update existing project
        await DataService.updateProject(editingProject.slug!, editingProject)
        toast.success('Project updated successfully')
      } else {
        // Create new project
        await DataService.createProject(editingProject)
        toast.success('Project created successfully')
      }
      setEditingProject(null)
      loadData()
    } catch (error) {
      toast.error('Failed to save project')
      console.error(error)
    }
  }

  const handleDeleteProject = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await DataService.deleteProject(slug)
      toast.success('Project deleted successfully')
      loadData()
    } catch (error) {
      toast.error('Failed to delete project')
      console.error(error)
    }
  }

  const handleSavePersonalInfo = async () => {
    if (!personalInfo) return

    try {
      await DataService.updatePersonalInfo(personalInfo)
      toast.success('Personal info updated successfully')
    } catch (error) {
      toast.error('Failed to update personal info')
      console.error(error)
    }
  }

  const handleSaveSiteSettings = async () => {
    if (!siteSettings) return

    try {
      await DataService.updateSiteSettings(siteSettings)
      toast.success('Site settings updated successfully')
    } catch (error) {
      toast.error('Failed to update site settings')
      console.error(error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <Button onClick={loadData} variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Projects Management</h2>
            <Button onClick={() => setEditingProject({})}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </div>

          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project._id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                    <Button size="sm" variant="outline" onClick={() => setEditingProject(project)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProject(project.slug)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Personal Information</h2>
            <Button onClick={handleSavePersonalInfo}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          {personalInfo && (
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={personalInfo.name}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Title</label>
                    <Input
                      value={personalInfo.title}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, title: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Bio</label>
                  <Textarea
                    value={personalInfo.bio}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, bio: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Avatar URL</label>
                    <Input
                      value={personalInfo.avatar}
                      onChange={(e) => setPersonalInfo({ ...personalInfo, avatar: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Site Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Site Settings</h2>
            <Button onClick={handleSaveSiteSettings}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          {siteSettings && (
            <Card>
              <CardContent className="space-y-4 pt-6">
                <div>
                  <label className="text-sm font-medium">SEO Title</label>
                  <Input
                    value={siteSettings.seoTitle}
                    onChange={(e) => setSiteSettings({ ...siteSettings, seoTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">SEO Description</label>
                  <Textarea
                    value={siteSettings.seoDescription}
                    onChange={(e) => setSiteSettings({ ...siteSettings, seoDescription: e.target.value })}
                    rows={3}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">OG Image URL</label>
                  <Input
                    value={siteSettings.ogImage}
                    onChange={(e) => setSiteSettings({ ...siteSettings, ogImage: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Project Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle>{editingProject._id ? 'Edit Project' : 'Add Project'}</CardTitle>
              <Button variant="ghost" onClick={() => setEditingProject(null)}>×</Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={editingProject.title || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                  value={editingProject.slug || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex space-x-4">
                <Button onClick={handleSaveProject}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={() => setEditingProject(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}