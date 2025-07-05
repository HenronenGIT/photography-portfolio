'use client';

import { X } from 'lucide-react';
import NextImage from 'next/image';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Photo } from '@/shared/types/types';

interface PhotoDialogProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
}

const PhotoDialog = ({ photo, isOpen, onClose }: PhotoDialogProps) => {
  if (!photo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="h-[90vh] w-full max-w-4xl overflow-hidden border-none bg-transparent p-0">
        <div className="relative flex h-full w-full items-center justify-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-sm transition-colors hover:bg-black/40"
          >
            <X size={20} />
          </button>

          {/* Image */}
          <div className="relative h-full w-full">
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
            <h3 className="mb-1 font-serif text-xl font-light tracking-wide">
              {photo.title}
            </h3>
            {photo.location && (
              <p className="text-sm font-light uppercase tracking-wider text-neutral-300">
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
