import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { Project } from '@/lib/models'

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const status = searchParams.get('status')
    
    let query: any = {}
    
    if (featured === 'true') {
      query.featured = true
    }
    
    if (status) {
      query.status = status
    }
    
    const projects = await Project.find(query)
      .sort({ order: 1, createdAt: -1 })
      .lean()
    
    return NextResponse.json({
      success: true,
      data: projects
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const project = new Project(body)
    await project.save()
    
    return NextResponse.json({
      success: true,
      data: project
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    )
  }
}