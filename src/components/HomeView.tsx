'use client'

import PhotoCard from '@/components/PhotoCard'
import PhotoDialog from '@/components/PhotoDialog'
import { Button } from '@/components/ui/button'
import { Photo } from '@/shared/types/types'
import { Camera, Instagram, Mail, Phone } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface HomeViewProps {
  featuredPhotos: Photo[]
}

export default function HomeView({ featuredPhotos }: HomeViewProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setSelectedPhoto(null)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Title */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mb-6 flex items-center justify-center gap-3">
            <Camera className="h-6 w-6 text-neutral-600" />
            <span className="text-sm font-medium uppercase tracking-wider text-neutral-600">
              Visual Storyteller
            </span>
          </div>
          <h1 className="mb-6 font-serif text-5xl font-light tracking-wide text-neutral-900 md:text-7xl">
            Captured Moments
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl font-light leading-relaxed text-neutral-600 md:text-2xl">
            Exploring the raw beauty of landscapes and the stories they tell
          </p>
          <div className="mx-auto h-px w-12 bg-neutral-400"></div>
        </div>
      </section>

      {/* Photo Grid Section */}
      <section className="pb-20">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {featuredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="animate-fade-in opacity-0"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: 'both',
                }}
              >
                <PhotoCard photo={photo} onPhotoClick={handlePhotoClick} />
              </div>
            ))}
          </div>

          {/* View More Link */}
          <div className="mt-16 text-center">
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="border-neutral-300 px-8 py-3 text-lg font-light hover:bg-neutral-50"
              >
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-900 px-8 py-20 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 font-serif text-3xl font-light tracking-wide md:text-4xl">
            Lets Create Something Beautiful
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-neutral-300">
            Available for commissions, collaborations, and capturing your most
            important moments.
          </p>

          <div className="mb-12 flex flex-col items-center justify-center gap-8 md:flex-row">
            <a
              href="mailto:hello@capturedmoments.com"
              className="flex items-center gap-3 text-white transition-colors hover:text-neutral-300"
            >
              <Mail className="h-5 w-5" />
              <span className="font-light">hello@capturedmoments.com</span>
            </a>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-3 text-white transition-colors hover:text-neutral-300"
            >
              <Phone className="h-5 w-5" />
              <span className="font-light">+1 (234) 567-890</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white transition-colors hover:text-neutral-300"
            >
              <Instagram className="h-5 w-5" />
              <span className="font-light">@capturedmoments</span>
            </a>
          </div>

          <Button className="bg-white px-8 py-3 text-lg font-light text-black hover:bg-neutral-100">
            Get In Touch
          </Button>
        </div>
      </section>

      {/* Photo Dialog */}
      <PhotoDialog
        photo={selectedPhoto}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
      />
    </div>
  )
}
