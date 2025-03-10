import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const global = await prisma.global.create({
      data: {
        id: 1,
        contrib_30_days: 0,
        token_distributions: 0,
        data_point_submitted: 0,
        total_submissions: 0,
        approval_rate: 0,
        training_progress: 0,
        average_response_time: 0
      }
    })

    return NextResponse.json({ success: true, data: global })
  } catch (error) {
    console.error('Error creating global record:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create global record' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
} 