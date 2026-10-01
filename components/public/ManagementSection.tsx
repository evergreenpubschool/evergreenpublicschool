"use client";

import { pastelThemes } from "@/lib/constants/pastelThemes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { managementDetails } from "@/lib/constants/management";

type Management = {
  _id: string;
  name: string;
  designation: string;
  imageUrl: string;
  order: number;
};

export default function ManagementSection() {
  const [management, setManagement] = useState<Management[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchManagement() {
      try {
        const response = await fetch("/api/management");
        const data = await response.json();

        if (data.success) {
          setManagement(data.management);
        }
      } catch (error) {
        console.error("Failed to fetch management:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchManagement();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F5F8FC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto h-8 w-48 animate-pulse rounded bg-[#E8F4EB]" />
        </div>
      </section>
    );
  }

  if (management.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      {/* Decorative pastel shapes */}
      <div className="pointer-events-none absolute -left-28 top-20 h-56 w-56 rounded-full bg-[#F8E7A1]/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-64 w-64 rounded-full bg-[#D8C7F0]/30 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#BFDCF1]/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm sm:tracking-[0.2em]">
            Leadership
          </p>

          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl md:text-5xl">
            Our Management
          </h2>

          <p className="mt-4 text-sm leading-6 text-[#68736C] sm:text-base sm:leading-7 lg:text-lg lg:leading-8">
            Meet the people who guide our school and help create an
            environment where students can learn and grow.
          </p>
        </div>

        {/* Management Cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3 lg:gap-8">
          {management.map((member, index) => {
            const theme =
              pastelThemes[index % pastelThemes.length];

            const details = managementDetails.find(
              (mem) => mem.name === member.name
            );

            return (
              <div
                key={member._id}
                className={`group overflow-hidden rounded-2xl border ${theme.border} ${theme.card} shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                {/* Image */}
                <div className="relative aspect-[4/4.5] w-full overflow-hidden sm:aspect-[4/5]">
                  <Image
                    src={member.imageUrl}
                    alt={`${member.name}, ${member.designation}`}
                    fill
                    sizes="(max-width: 639px) 50vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Information */}
                <div className="p-3 text-center sm:p-5">
                  <h3
                    className={`text-sm font-semibold leading-5 sm:text-lg sm:leading-6 ${theme.name}`}
                  >
                    {member.name}
                  </h3>

                  <p
                    className={`mt-1 text-xs font-medium sm:text-sm ${theme.designation}`}
                  >
                    {member.designation}
                  </p>

                  {/* Educational Qualification */}
                  {details?.education && (
                    <div className="mt-4">
                      

                      <p
                        className={`mt-1 text-xs leading-5 sm:text-sm sm:leading-6 ${theme.designation}`}
                      >
                        {details.education}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}