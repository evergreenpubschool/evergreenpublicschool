"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type GalleryEvent = {
  _id: string;
  title: string;
  imageUrl: string;
  googlePhotosUrl: string;
  order: number;
};

export default function GallerySection() {
  const [gallery, setGallery] = useState<GalleryEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch gallery");
        }

        setGallery(data.gallery);
      } catch (error) {
        console.error("Gallery fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGallery();
  }, []);

  /*
   * School founded on 23 February 2000.
   * The number automatically increases every 23 February.
   */
  const foundingDate = new Date("2000-02-23");
  const today = new Date();

  let yearsOfExcellence =
    today.getFullYear() - foundingDate.getFullYear();

  if (
    today.getMonth() < foundingDate.getMonth() ||
    (today.getMonth() === foundingDate.getMonth() &&
      today.getDate() < foundingDate.getDate())
  ) {
    yearsOfExcellence--;
  }

  if (loading) {
    return (
      <section className="bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-40 items-center justify-center">
            <p className="text-sm text-[#68736C]">
              Loading gallery...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Decorative pastel shapes */}
      <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#F3C6D3]/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-[#D8C7F0]/30 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-52 w-52 rounded-full bg-[#F8E7A1]/25 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6B9F7A]">
            School Memories
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl lg:text-5xl">
            Ever Green Public Sr. Sec. School Gallery
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
            Celebrating {yearsOfExcellence} years of learning,
            achievements and memorable moments from our school community.
          </p>
        </div>

        {/* Empty state */}
        {gallery.length === 0 ? (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-[#E3E8E2] bg-white p-8 text-center shadow-sm">
            <p className="text-sm leading-6 text-[#68736C]">
              Gallery events will appear here soon.
            </p>
          </div>
        ) : (
          /* Gallery cards */
          <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-7">
            {gallery.map((event, index) => (
              <article
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-white/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Cover image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#EDF6FC]">
                  <Image
                    src={event.imageUrl}
                    alt={`${event.title} at Ever Green Public Sr. Sec. School`}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  {/* Event number */}
                  <div className="absolute left-3 top-3 rounded-full bg-[#FFF8DC] px-3 py-1.5 text-xs font-semibold text-[#66591D] shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Card content */}
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-semibold leading-7 text-[#26352B]">
                    {event.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#68736C]">
                    Explore photos and memories from this event.
                  </p>

                  <Link
                    href={event.googlePhotosUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center rounded-xl bg-[#E8F4EB] px-4 py-2.5 text-sm font-semibold text-[#315D3E] transition hover:bg-[#A8D5BA] focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
                  >
                    View Photos

                    <span className="ml-2 transition-transform duration-200 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
