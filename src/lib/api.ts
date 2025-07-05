// This file will contain helper functions for making API requests.
import { Photo } from '@/shared/types/types'

export async function getPhotos(): Promise<Photo[]> {
  const response = await fetch('/api/images')
  if (!response.ok) {
    throw new Error('Failed to fetch photos')
  }
  return response.json()
}
