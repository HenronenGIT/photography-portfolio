'use client'

import { Photo } from '@/shared/types/types'
import { AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface PhotoCardProps {
  photo: Photo
  onPhotoClick: (photo: Photo) => void
}

const PhotoCard = ({ photo, onPhotoClick }: PhotoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  if (isError) {
    return (
      <div className="group relative flex aspect-[4/5] flex-col items-center justify-center bg-neutral-100 p-4 text-center">
        <AlertTriangle className="h-12 w-12 text-neutral-400" />
        <h3 className="mt-4 font-semibold text-neutral-700">{photo.title}</h3>
        <p className="mt-1 text-xs text-neutral-500">Could not load image</p>
      </div>
    )
  }

  return (
    <div
      className="group relative aspect-[4/5] cursor-pointer overflow-hidden bg-neutral-100"
      onClick={() => onPhotoClick(photo)}
    >
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-all duration-700 group-hover:scale-[1.02] ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />

      {/* Overlay with photo details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="mb-1 font-serif text-lg font-light tracking-wide">
            {photo.title}
          </h3>
          {photo.location && (
            <p className="text-xs font-light uppercase tracking-wider text-neutral-200">
              {photo.location}
            </p>
          )}
        </div>
      </div>

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 animate-spin rounded-full border border-neutral-300 border-t-neutral-600"></div>
        </div>
      )}
    </div>
  )
}

export default PhotoCard
