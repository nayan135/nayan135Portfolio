import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { SiteSettings } from '@/lib/models'

export async function GET() {
  try {
    await dbConnect()
    
    const settings = await SiteSettings.findOne().lean()
    
    if (!settings) {
      return NextResponse.json(
        { success: false, error: 'Site settings not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: settings
    })
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch site settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    let settings = await SiteSettings.findOne()
    
    if (!settings) {
      settings = new SiteSettings(body)
    } else {
      Object.assign(settings, body)
    }
    
    await settings.save()
    
    return NextResponse.json({
      success: true,
      data: settings
    })
  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update site settings' },
      { status: 500 }
    )
  }
}