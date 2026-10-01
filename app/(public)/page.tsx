import GallerySection from "@/components/public/GallerySection";
import ManagementSection from "@/components/public/ManagementSection";
import SchoolHero from "@/components/public/SchoolHero";
import SchoolIntroduction from "@/components/public/SchoolIntroduction";
import TopperCarousel from "@/components/public/TopperCarousel";
import { connectDB } from "@/lib/dbConnect";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Evergreen Public Sr. Sec. School offers quality education from Pre-Nursery to Class 12, with strong academics, modern facilities and a supportive learning environment.",
};

const Home = async () => {
  await connectDB();

  return (
    <div>
      <TopperCarousel />

      <SchoolHero />

      <SchoolIntroduction />

      <ManagementSection />

      <GallerySection />

     
    </div>
  );
};

export default Home;
