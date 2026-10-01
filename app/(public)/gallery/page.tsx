import GallerySection from "@/components/public/GallerySection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Gallery",
  description:
    "Explore school events, celebrations, activities and memorable moments from Evergreen Public Sr. Sec. School.",
};

export default function GalleryPage() {
  return <GallerySection />;
}
