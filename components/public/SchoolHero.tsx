"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type SchoolHero = {
  _id: string;
  imageUrl: string;
};

export default function SchoolHero() {
  const [hero, setHero] = useState<SchoolHero | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHero() {
      try {
        const response = await fetch("/api/school-hero");
        const data = await response.json();

        if (data.success) {
          setHero(data.hero);
        }
      } catch (error) {
        console.error("Failed to fetch school hero:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#F5F8FC]">
        <div className="aspect-[4/3] w-full animate-pulse bg-[#E8F4EB] sm:aspect-[16/9] lg:aspect-[21/8]" />
      </section>
    );
  }

  if (!hero) {
    return null;
  }

  return (
    <section className="w-full bg-[#F5F8FC]">
      <div className="relative w-full overflow-hidden bg-[#E8F4EB]">
        <Image
          src={hero.imageUrl}
          alt="School campus"
          width={1920}
          height={730}
          sizes="100vw"
          priority
          className="block h-auto max-h-[520px] w-full object-cover"
        />

        {/* Soft bottom transition */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F5F8FC]/40 to-transparent sm:h-24" />
      </div>
    </section>
  );
}
