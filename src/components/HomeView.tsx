'use client'

import PhotoCard from '@/components/PhotoCard'
import PhotoDialog from '@/components/PhotoDialog'
import { Button } from '@/components/ui/button'
import { Photo } from '@/shared/types/types'
import { ArrowDown, Camera, Instagram, Mail, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface HomeViewProps {
  heroPhoto: Photo
  galleryPhotos: Photo[]
}

export default function HomeView({ heroPhoto, galleryPhotos }: HomeViewProps) {
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
      {/* Full-screen Hero Image */}
      {heroPhoto && (
        <section className="relative h-screen w-screen">
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.title}
            layout="fill"
            objectFit="cover"
            className="z-0"
            priority
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black bg-opacity-30 p-8 text-white">
            <div className="text-center">
              <div className="mb-6 flex items-center justify-center gap-3">
                <Camera className="h-6 w-6" />
                <span className="text-sm font-medium uppercase tracking-wider">
                  Visual Storyteller
                </span>
              </div>
              <h1 className="mb-6 font-serif text-5xl font-light tracking-wide text-white md:text-7xl">
                Captured Moments
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl font-light leading-relaxed md:text-2xl">
                Exploring the raw beauty of landscapes and the stories they tell
              </p>
              <div className="mx-auto h-px w-12 bg-white/50"></div>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 animate-bounce">
            <ArrowDown className="h-8 w-8 text-white" />
          </div>
        </section>
      )}

      {/* Photo Grid Section */}
      <section className="pb-20">
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {galleryPhotos.map((photo, index) => (
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
