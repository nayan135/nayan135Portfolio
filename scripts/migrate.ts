// Load environment variables first
require('dotenv').config({ path: './.env.local' })

import dbConnect from '@/lib/mongodb'
import { Project, PersonalInfo, SiteSettings } from '@/lib/models'
import { projects } from '@/lib/projects'

async function migrateData() {
  try {
    await dbConnect()
    console.log('Connected to MongoDB')

    // Clear existing data
    await Project.deleteMany({})
    await PersonalInfo.deleteMany({})
    await SiteSettings.deleteMany({})
    console.log('Cleared existing data')

    // Migrate projects
    const projectsWithOrder = projects.map((project, index) => ({
      ...project,
      featured: index < 3, // First 3 projects are featured
      technologies: [], // You can add technologies later
      status: 'active' as const,
      order: index
    }))

    await Project.insertMany(projectsWithOrder)
    console.log(`Migrated ${projectsWithOrder.length} projects`)

    // Create personal info
    const personalInfo = {
      name: 'Nayan Acharya',
      title: 'Full-Stack Developer',
      bio: 'Passionate full-stack developer with expertise in modern web technologies. I love creating innovative solutions that make a difference.',
      email: 'nayan.acharya@example.com',
      avatar: '/images/avatars/myself.jpg',
      resume: '/resume.pdf',
      social: {
        github: 'https://github.com/nayan135',
        linkedin: 'https://linkedin.com/in/nayan-acharya',
        twitter: 'https://twitter.com/nayan135',
        website: 'https://nayanacharya.info.np'
      },
      skills: [
        'React', 'Next.js', 'TypeScript', 'Node.js', 'MongoDB', 
        'PostgreSQL', 'Python', 'Express.js', 'Tailwind CSS', 
        'Framer Motion', 'Docker', 'AWS'
      ],
      experience: [
        {
          company: 'Freelance',
          position: 'Full-Stack Developer',
          duration: '2022 - Present',
          description: 'Developing web applications using modern technologies and best practices.'
        }
      ],
      education: [
        {
          institution: 'Your University',
          degree: 'Computer Science',
          duration: '2020 - 2024',
          description: 'Focused on software engineering and web development.'
        }
      ]
    }

    await PersonalInfo.create(personalInfo)
    console.log('Created personal info')

    // Create site settings
    const siteSettings = {
      seoTitle: 'Nayan Acharya - Full-Stack Developer',
      seoDescription: 'Portfolio of Nayan Acharya, a passionate full-stack developer creating innovative web solutions.',
      seoKeywords: ['nayan acharya', 'full-stack developer', 'web developer', 'react', 'next.js', 'portfolio'],
      ogImage: '/images/og-image.jpg',
      favicon: '/images/favicon.ico',
      maintenanceMode: false,
      themeColor: '#000000'
    }

    await SiteSettings.create(siteSettings)
    console.log('Created site settings')

    console.log('Migration completed successfully!')
  } catch (error) {
    console.error('Migration failed:', error)
  }
}

// Run migration if this file is executed directly
if (require.main === module) {
  migrateData()
    .then(() => {
      console.log('Migration script completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Migration script failed:', error)
      process.exit(1)
    })
}

export default migrateData