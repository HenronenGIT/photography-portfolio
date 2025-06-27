"use client";

import PhotoCard from "@/components/PhotoCard";
import PhotoDialog from "@/components/PhotoDialog";
import { Button } from "@/components/ui/button";
import { Camera, Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  location?: string;
}

export default function HomePage() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const featuredPhotos: Photo[] = [
    
  ];

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Title */}
      <section className="py-20 px-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Camera className="w-6 h-6 text-neutral-600" />
            <span className="text-sm font-medium text-neutral-600 tracking-wider uppercase">
              Visual Storyteller
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-light mb-6 tracking-wide text-neutral-900 font-serif">
            Captured Moments
          </h1>
          <p className="text-xl md:text-2xl font-light text-neutral-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Exploring the raw beauty of landscapes and the stories they tell
          </p>
          <div className="w-12 h-px bg-neutral-400 mx-auto"></div>
        </div>
      </section>

      {/* Photo Grid Section */}
      <section className="px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredPhotos.map((photo, index) => (
              <div
                key={photo.id}
                className="opacity-0 animate-fade-in"
                style={{
                  animationDelay: `${index * 150}ms`,
                  animationFillMode: "both",
                }}
              >
                <PhotoCard photo={photo} onPhotoClick={handlePhotoClick} />
              </div>
            ))}
          </div>

          {/* View More Link */}
          <div className="text-center mt-16">
            <Link href="/portfolio">
              <Button
                variant="outline"
                className="px-8 py-3 text-lg font-light border-neutral-300 hover:bg-neutral-50"
              >
                View Full Portfolio
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-neutral-900 text-white py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6 tracking-wide font-serif">
            Let's Create Something Beautiful
          </h2>
          <p className="text-lg font-light text-neutral-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Available for commissions, collaborations, and capturing your most
            important moments.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
            <a
              href="mailto:hello@capturedmoments.com"
              className="flex items-center gap-3 text-white hover:text-neutral-300 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span className="font-light">hello@capturedmoments.com</span>
            </a>

            <a
              href="tel:+1234567890"
              className="flex items-center gap-3 text-white hover:text-neutral-300 transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="font-light">+1 (234) 567-890</span>
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-white hover:text-neutral-300 transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-light">@capturedmoments</span>
            </a>
          </div>

          <Button className="bg-white text-black hover:bg-neutral-100 px-8 py-3 text-lg font-light">
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
  );
}
