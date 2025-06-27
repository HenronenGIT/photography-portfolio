
"use client"

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';
import NextImage from 'next/image';

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  location?: string;
}

interface PhotoDialogProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

const PhotoDialog = ({ photo, isOpen, onClose }: PhotoDialogProps) => {
  if (!photo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full h-[90vh] border-none bg-transparent p-0 overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div className="relative w-full h-full">
            <NextImage
              src={photo.src}
              alt={photo.title}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>

          {/* Photo details */}
          <div className="absolute bottom-6 left-6 text-white">
            <h3 className="text-xl font-light tracking-wide font-serif mb-1">
              {photo.title}
            </h3>
            {photo.location && (
              <p className="text-sm text-neutral-300 font-light tracking-wider uppercase">
                {photo.location}
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoDialog;
