'use client'

import { Photo } from '@/shared/types/types'
import { useState } from 'react'
import PhotoCard from './PhotoCard'
import { PhotoCardSkeleton } from './PhotoCardSkeleton'
import PhotoDialog from './PhotoDialog'

interface GalleryProps {
  photos: Photo[]
  isLoading: boolean
  isError?: boolean
}

const Gallery = ({ photos, isLoading, isError }: GalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
  }

  const handleCloseDialog = () => {
    setSelectedPhoto(null)
  }

  if (isError) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold text-red-600">
          Something went wrong
        </h3>
        <p className="mt-2 text-neutral-500">
          We couldn&apos;t load the photos. Please try again later.
        </p>
      </div>
    )
  }

  if (!isLoading && photos.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-semibold text-neutral-800">
          No Photos Found
        </h3>
        <p className="mt-2 text-neutral-500">
          There are no images to display at the moment.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <PhotoCardSkeleton key={index} />
            ))
          : photos.map((photo) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onPhotoClick={handlePhotoClick}
              />
            ))}
      </div>

      <PhotoDialog
        isOpen={!!selectedPhoto}
        onClose={handleCloseDialog}
        photo={selectedPhoto}
      />
    </>
  )
}

export default Gallery
