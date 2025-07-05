'use client'

import FilterBar from '@/components/FilterBar'
import Gallery from '@/components/Gallery'
import { Photo } from '@/shared/types/types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const fetchPhotos = async (): Promise<Photo[]> => {
  const res = await fetch('/api/images')
  if (!res.ok) {
    throw new Error('Network response was not ok')
  }
  return res.json()
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const {
    data: photos = [],
    isLoading,
    isError,
  } = useQuery<Photo[]>({
    queryKey: ['photos'],
    queryFn: fetchPhotos,
  })

  // TODO: Implement category filtering based on actual data
  const categories = ['All', 'Landscapes', 'Travel', 'People', 'Nature']

  const filteredPhotos =
    activeFilter === 'All'
      ? photos
      : photos.filter((photo) => photo.category === activeFilter)

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 font-serif text-4xl font-light tracking-wider text-neutral-900 lg:text-5xl">
            Portfolio
          </h1>
          <div className="mx-auto h-px w-16 bg-neutral-300"></div>
        </div>

        {/* Filter Bar */}
        <div className="mb-12">
          <FilterBar
            categories={categories}
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Photo Grid */}
        <Gallery
          photos={filteredPhotos}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  )
}
