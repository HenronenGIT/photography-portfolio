import { Photo } from '@/shared/types/types'
import { File, Storage } from '@google-cloud/storage'
import logger from './logger'

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID
if (!projectId) {
  logger.error('GOOGLE_CLOUD_PROJECT_ID environment variable is not set.')
  throw new Error('GOOGLE_CLOUD_PROJECT_ID environment variable is required.')
}

export const storage = new Storage({
  projectId,
})

const bucketName = process.env.GCS_BUCKET_NAME
if (!bucketName) {
  logger.error('GCS_BUCKET_NAME environment variable is not set')
  throw new Error('GCS_BUCKET_NAME environment variable is required')
}

export const bucket = storage.bucket(bucketName)

export async function getPhotosFromGCS(prefix?: string): Promise<Photo[]> {
  try {
    logger.debug(
      { prefix, bucketName: bucket.name },
      'Fetching photos from GCS',
    )
    const [files] = await bucket.getFiles({ prefix })
    logger.debug({ fileCount: files.length }, 'Files fetched from GCS')

    const photos: Photo[] = files
      .filter((file: File) => !file.name.endsWith('/') && file.name !== prefix)
      .map((file: File, index: number) => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`
        const filename = file.name.split('/').pop() || ''
        const title = filename.split('.')[0] || 'Untitled'

        return {
          id: index,
          src: publicUrl,
          title: title,
          category: prefix ? prefix.split('/')[0] : '',
        }
      })

    logger.debug(
      { photoCount: photos.length },
      'Successfully fetched photos from GCS',
    )
    return photos
  } catch (error) {
    logger.error(
      { error, bucketName: bucket.name, prefix },
      'Error fetching photos from GCS',
    )
    throw error
  }
}
