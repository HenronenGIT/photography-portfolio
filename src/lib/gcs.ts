import { File, Storage, StorageOptions } from '@google-cloud/storage';

import { Photo } from '@/shared/types/types';

import logger from './logger';

const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID;
if (!projectId) {
  logger.error('GOOGLE_CLOUD_PROJECT_ID environment variable is not set.');
  throw new Error('GOOGLE_CLOUD_PROJECT_ID environment variable is required.');
}

const gcpCredentials = process.env.GCP_CREDENTIALS;

const storageConfig: StorageOptions = {
  projectId,
};

if (gcpCredentials) {
  try {
    const credentials = JSON.parse(gcpCredentials);
    storageConfig.credentials = credentials;
    logger.info('Using GCP_CREDENTIALS for GCS authentication.');
  } catch (error) {
    logger.error({ error }, 'Failed to parse GCP_CREDENTIALS');
    throw new Error('Failed to parse GCP_CREDENTIALS');
  }
} else {
  logger.info('Using Application Default Credentials for GCS authentication.');
}

export const storage = new Storage(storageConfig);

const bucketName = process.env.GCS_BUCKET_NAME;
if (!bucketName) {
  logger.error('GCS_BUCKET_NAME environment variable is not set');
  throw new Error('GCS_BUCKET_NAME environment variable is required');
}

export const bucket = storage.bucket(bucketName);

export async function getPhotosFromGCS(prefix?: string): Promise<Photo[]> {
  try {
    logger.debug(
      { prefix, bucketName: bucket.name },
      'Fetching photos from GCS'
    );
    const [files] = await bucket.getFiles({ prefix });
    logger.debug({ fileCount: files.length }, 'Files fetched from GCS');

    const photos: Photo[] = await Promise.all(
      files
        .filter(
          (file: File) => !file.name.endsWith('/') && file.name !== prefix
        )
        .map(async (file: File, index: number) => {
          const [signedUrl] = await file.getSignedUrl({
            action: 'read',
            expires: Date.now() + 60 * 60 * 1000, // 1 hour
          });

          const [metadata] = await file.getMetadata();
          const filename = file.name.split('/').pop() || '';
          const title = filename.split('.')[0] || 'Untitled';

          return {
            id: index,
            src: signedUrl,
            title: title,
            category: prefix ? prefix.split('/')[0] : '',
            createdAt: metadata.timeCreated,
            size: Number(metadata.size),
          };
        })
    );

    logger.debug(
      { photoCount: photos.length },
      'Successfully fetched photos from GCS'
    );
    return photos;
  } catch (error) {
    logger.error(
      { error, bucketName: bucket.name, prefix },
      'Error fetching photos from GCS'
    );
    throw error;
  }
}
