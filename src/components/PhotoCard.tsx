"use client";

import Image from "next/image";
import { useState } from "react";

interface Photo {
  id: number;
  src: string;
  title: string;
  category: string;
  location?: string;
}

interface PhotoCardProps {
  photo: Photo;
  onPhotoClick: (photo: Photo) => void;
}

const PhotoCard = ({ photo, onPhotoClick }: PhotoCardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="group relative overflow-hidden bg-neutral-100 aspect-[4/5] cursor-pointer"
      onClick={() => onPhotoClick(photo)}
    >
      <Image
        src={photo.src}
        alt={photo.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className={`object-cover transition-all duration-700 group-hover:scale-[1.02] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setIsLoaded(true)}
      />

      {/* Overlay with photo details */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="font-light text-lg mb-1 tracking-wide font-serif">
            {photo.title}
          </h3>
          {photo.location && (
            <p className="text-xs text-neutral-200 font-light tracking-wider uppercase">
              {photo.location}
            </p>
          )}
        </div>
      </div>

      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border border-neutral-300 border-t-neutral-600 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
