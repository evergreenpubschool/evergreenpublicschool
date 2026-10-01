import Image from "next/image";
import InfrastructureGallery from "@/components/public/InfrastructureGallery";
import { connectDB } from "@/lib/dbConnect";
import Infrastructure from "@/models/Infrastructure";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infrastructure",
  description:
    "Explore the campus, facilities, classrooms, laboratories and learning spaces at Evergreen Public Sr. Sec. School.",
};

export default async function InfrastructurePage() {
  await connectDB();

  const photos = await Infrastructure.find()
    .sort({ order: 1, createdAt: 1 })
    .lean();

  const serializedPhotos = photos.map((photo) => ({
    _id: photo._id.toString(),
    title: photo.title,
    imageUrl: photo.imageUrl,
    publicId: photo.publicId,
    order: photo.order,
  }));

  return (
    <main className="min-h-screen bg-[#F5F8FC]">
      {/* Hero */}

      <section className="px-5 pb-12 pt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#4E8560]">
            Our Campus
          </p>

          <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-[#26352B] sm:text-5xl lg:text-6xl">
            Infrastructure built for learning.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#68736C] sm:text-lg">
            Explore the spaces, facilities, and learning environment
            that support our students throughout their school journey.
          </p>
        </div>
      </section>

      {/* Gallery */}

      <section className="px-5 pb-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {serializedPhotos.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg font-semibold text-[#26352B]">
                Infrastructure photos coming soon.
              </p>

              <p className="mt-2 text-sm text-[#68736C]">
                We are preparing a showcase of our school facilities.
              </p>
            </div>
          ) : (
            <InfrastructureGallery photos={serializedPhotos} />
          )}
        </div>
      </section>
    </main>
  );
}
