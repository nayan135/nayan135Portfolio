import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import { PersonalInfo } from '@/lib/models'

export async function GET() {
  try {
    await dbConnect()
    
    const personalInfo = await PersonalInfo.findOne().lean()
    
    if (!personalInfo) {
      return NextResponse.json(
        { success: false, error: 'Personal info not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({
      success: true,
      data: personalInfo
    })
  } catch (error) {
    console.error('Error fetching personal info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch personal info' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    
    let personalInfo = await PersonalInfo.findOne()
    
    if (!personalInfo) {
      personalInfo = new PersonalInfo(body)
    } else {
      Object.assign(personalInfo, body)
    }
    
    await personalInfo.save()
    
    return NextResponse.json({
      success: true,
      data: personalInfo
    })
  } catch (error) {
    console.error('Error updating personal info:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to update personal info' },
      { status: 500 }
    )
  }
}