"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Topper = {
  _id: string;
  imageUrl: string;
  year: number;
  order: number;
};

export default function TopperCarousel() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToppers() {
      try {
        const response = await fetch("/api/toppers");
        const data = await response.json();

        if (data.success) {
          setToppers(data.toppers);
        }
      } catch (error) {
        console.error("Failed to fetch toppers:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchToppers();
  }, []);

  useEffect(() => {
    if (toppers.length <= 1) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((current) =>
        current === toppers.length - 1 ? 0 : current + 1
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [toppers.length]);

  if (loading) {
    return (
      <section className="w-full bg-[#F5F8FC]">
        <div className="aspect-[4/3] w-full animate-pulse bg-[#EDF6FC] sm:aspect-[16/9]" />
      </section>
    );
  }

  if (toppers.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#F5F8FC]">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDF6FC] sm:aspect-[16/9]">
        {/* Sliding track */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {toppers.map((topper, index) => (
            <div
              key={topper._id}
              className="relative flex h-full w-full shrink-0 items-center justify-center"
            >
              <Image
                src={topper.imageUrl}
                alt={`Topper collage ${topper.year}`}
                fill
                sizes="100vw"
                priority={index === 0}
                className="object-contain"
              />
            </div>
          ))}
        </div>

        {/* Bottom gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/30 to-transparent sm:h-24" />

        {/* Previous button */}
        {toppers.length > 1 && (
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((current) =>
                current === 0 ? toppers.length - 1 : current - 1
              )
            }
            className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 text-lg text-[#26352B] shadow-md backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:left-4 sm:h-11 sm:w-11 sm:text-xl lg:left-6 lg:h-12 lg:w-12"
            aria-label="Previous topper collage"
          >
            ←
          </button>
        )}

        {/* Next button */}
        {toppers.length > 1 && (
          <button
            type="button"
            onClick={() =>
              setCurrentIndex((current) =>
                current === toppers.length - 1 ? 0 : current + 1
              )
            }
            className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/85 text-lg text-[#26352B] shadow-md backdrop-blur-sm transition hover:scale-105 hover:bg-white sm:right-4 sm:h-11 sm:w-11 sm:text-xl lg:right-6 lg:h-12 lg:w-12"
            aria-label="Next topper collage"
          >
            →
          </button>
        )}

        {/* Slide indicators */}
        {toppers.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-white/75 px-3 py-2 shadow-sm backdrop-blur-sm sm:bottom-5 sm:gap-2">
            {toppers.map((topper, index) => (
              <button
                key={topper._id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 rounded-full transition-all duration-300 sm:h-2 ${
                  index === currentIndex
                    ? "w-6 bg-green-700 sm:w-8"
                    : "w-1.5 bg-[#A8D5BA] hover:bg-green-600 sm:w-2"
                }`}
                aria-label={`Go to topper collage ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
