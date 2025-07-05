import { getPhotosFromGCS } from '@/lib/gcs'
import logger from '@/lib/logger'
import { NextResponse } from 'next/server'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  try {
    logger.info('Fetching photos from GCS via API route')
    const photoData = await getPhotosFromGCS('landing-page/')
    logger.info(
      { photoCount: photoData.length },
      'Successfully fetched photos from GCS',
    )
    return NextResponse.json(photoData)
  } catch (error) {
    logger.error({ error }, 'Failed to fetch images from GCS')
    return NextResponse.json(
      { error: 'Failed to fetch images. Check server logs for details.' },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
