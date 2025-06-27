'use client'

import FilterBar from '@/components/FilterBar';
import PhotoCard from '@/components/PhotoCard';
import PhotoDialog from '@/components/PhotoDialog';
import { useState } from 'react';

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  location?: string;
}

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const photos: Photo[] = [
 
  ];

  const categories = ['All', 'Landscapes', 'Travel', 'People', 'Nature'];

  const filteredPhotos = activeFilter === 'All'
    ? photos
    : photos.filter(photo => photo.category === activeFilter);

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-6xl mx-auto px-8 py-16">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl font-light text-neutral-900 tracking-wider mb-4 font-serif">
            Portfolio
          </h1>
          <div className="w-12 h-px bg-neutral-400 mx-auto"></div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          categories={categories}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />

        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="opacity-0 animate-fade-in"
              style={{
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'both'
              }}
            >
              <PhotoCard photo={photo} onPhotoClick={handlePhotoClick} />
            </div>
          ))}
        </div>
      </div>

      {/* Photo Dialog */}
      <PhotoDialog
        photo={selectedPhoto}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  );
}