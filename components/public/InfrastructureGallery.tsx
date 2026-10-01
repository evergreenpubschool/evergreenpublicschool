"use client";

import Image from "next/image";
import { useState } from "react";

type InfrastructurePhoto = {
  _id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  order: number;
};

export default function InfrastructureGallery({
  photos,
}: {
  photos: InfrastructurePhoto[];
}) {
  const [selectedPhoto, setSelectedPhoto] =
    useState<InfrastructurePhoto | null>(null);

  return (
    <>
      {/* Image Layout */}

      <div className="grid gap-4 md:grid-cols-2">
        {photos.map((photo, index) => (
          <button
            key={photo._id}
            type="button"
            onClick={() => setSelectedPhoto(photo)}
            className={`group relative overflow-hidden rounded-2xl text-left ${
              index === 0
                ? "md:col-span-2"
                : ""
            }`}
          >
            <div
              className={`relative ${
                index === 0
                  ? "aspect-[16/8]"
                  : "aspect-[4/3]"
              }`}
            >
              <Image
                src={photo.imageUrl}
                alt={photo.title}
                fill
                priority={index === 0}
                sizes={
                  index === 0
                    ? "100vw"
                    : "(max-width: 768px) 100vw, 50vw"
                }
                className="object-cover transition duration-500 group-hover:scale-105"
              />

              {/* Bottom gradient */}

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-5 pt-16 sm:p-7 sm:pt-20">
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  {photo.title}
                </h2>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}

      {selectedPhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Close image"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-2xl text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            ×
          </button>

          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={selectedPhoto.imageUrl}
              alt={selectedPhoto.title}
              fill
              sizes="100vw"
              className="object-contain"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-12">
              <p className="text-center text-base font-medium text-white sm:text-lg">
                {selectedPhoto.title}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
