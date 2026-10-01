import ManagementDetails from "@/components/public/ManagementDetails";
import { connectDB } from "@/lib/dbConnect";
import Management from "@/models/Management";
import SchoolVideo from "@/components/public/SchoolVideo";
import SchoolVideoModel from "@/models/SchoolVideo";
import Link from "next/link";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Evergreen Public Sr. Sec. School, our vision, mission, leadership, and commitment to providing quality education.",
};

export default async function AboutPage() {
  await connectDB();

  const managementData = await Management.find()
    .sort({ order: 1 })
    .lean();

  const videoData = await SchoolVideoModel.findOne().lean();
  const youtubeUrl = videoData?.youtubeUrl ?? null;

  const management = managementData.map((person) => ({
    _id: person._id.toString(),
    name: person.name,
    designation: person.designation,
    imageUrl: person.imageUrl,
    order: person.order,
  }));

  return (
    <main>
      {/* About intro */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* Decorative pastel shapes */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#F3C6D3]/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#D8C7F0]/30 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#BFDCF1]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm">
            About Our School
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl lg:text-5xl">
            A place to Learn, Grow and Thrive
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8 lg:text-lg">
            Our school is committed to creating a supportive learning
            environment where students are encouraged to develop academically,
            personally and socially.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-2 md:gap-8">
          {/* Vision */}
          <article className="group relative overflow-hidden rounded-3xl border border-[#E8F4EB] bg-[#E8F4EB] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 lg:p-10">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#A8D5BA]/40 blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <div className="relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🎯
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E8560]">
                Our Vision
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#26352B] sm:text-3xl">
                Preparing students for the future
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
                We aim to nurture confident, responsible and capable individuals
                who are prepared to meet the opportunities and challenges of a
                changing world.
              </p>
            </div>
          </article>

          {/* Mission */}
          <article className="group relative overflow-hidden rounded-3xl border border-[#F4EFFB] bg-[#F4EFFB] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8 lg:p-10">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D8C7F0]/50 blur-2xl transition-transform duration-500 group-hover:scale-125" />

            <div className="relative">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🌱
              </div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8065A6]">
                Our Mission
              </p>

              <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#26352B] sm:text-3xl">
                Learning beyond the classroom
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
                We provide meaningful learning experiences that encourage
                curiosity, strong values, creativity and the development of
                skills needed for lifelong learning.
              </p>
            </div>
          </article>
        </div>
      </section>

      <ManagementDetails management={management} />

      {youtubeUrl && <SchoolVideo youtubeUrl={youtubeUrl} />}

{/* Contact Information */}
<section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
  {/* Decorative pastel shapes */}
  <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-[#F8E7A1]/35 blur-3xl" />

  <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-[#BFDCF1]/35 blur-3xl" />

  <div className="relative mx-auto max-w-6xl">
    <div className="overflow-hidden rounded-[2rem] border border-[#E3E8E2] bg-[#F5F8FC] shadow-sm">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left side */}
        <div className="relative overflow-hidden bg-[#E8F4EB] p-7 sm:p-10 lg:p-12">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#A8D5BA]/50 blur-2xl" />

          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E8560] sm:text-sm">
              Get in Touch
            </p>

            <h2 className="mt-3 max-w-lg text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl">
              We would love to hear from you
            </h2>

            <p className="mt-4 max-w-lg text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              Have a question about admissions, academics or school life?
              Reach out to us and our team will be happy to assist you.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center rounded-xl bg-[#26352B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
            >
              Contact Us
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>

        {/* Right side */}
        <div className="grid gap-3 p-5 sm:grid-cols-2 sm:gap-4 sm:p-7 lg:grid-cols-1 lg:p-8">
          {/* Address */}
          <div className="rounded-2xl border border-[#F3C6D3] bg-[#FDF0F4] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                📍
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#26352B]">
                  School Address
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#68736C]">
                  
                  Jind Road, Behind I.T.I., In Front of Power House Substation, Patel Nagar Kaithal
                </p>
              </div>
            </div>
          </div>

          {/* Phone */}
          <div className="rounded-2xl border border-[#D8C7F0] bg-[#F4EFFB] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                📞
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#26352B]">
                  Phone
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#68736C]">
                  +91 95181-01455
                </p>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-[#BFDCF1] bg-[#EDF6FC] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                ✉️
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#26352B]">
                  Email
                </h3>

                <p className="mt-1 break-all text-sm leading-6 text-[#68736C]">
                  evergreenpubschoolkaithal@gmail.com 
                </p>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div className="rounded-2xl border border-[#F8E7A1] bg-[#FFF8DC] p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                🕐
              </div>

              <div>
                <h3 className="text-sm font-semibold text-[#26352B]">
                  Office Hours
                </h3>

                <p className="mt-1 text-sm leading-6 text-[#68736C]">
                  Monday – Saturday
                  <br />
                  8:00 AM – 3:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </main>
  )
};