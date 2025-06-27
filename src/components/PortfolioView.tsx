'use client'

import FilterBar from '@/components/FilterBar'
import PhotoCard from '@/components/PhotoCard'
import PhotoDialog from '@/components/PhotoDialog'
import { Photo } from '@/lib/google-photos'
import { useState } from 'react'

interface PortfolioViewProps {
  photos: Photo[]
}

export default function PortfolioView({ photos }: PortfolioViewProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const categories = ['All']

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedPhoto(null)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-white shadow-md dark:bg-gray-950">
        <div className="container mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">My Portfolio</h1>
            <FilterBar
              categories={categories}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">
            {photos.map((photo) => (
              <div key={photo.id} className="mb-6 break-inside-avoid">
                <PhotoCard
                  photo={photo}
                  onPhotoClick={handlePhotoClick}
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <PhotoDialog
        photo={selectedPhoto}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  )
}
