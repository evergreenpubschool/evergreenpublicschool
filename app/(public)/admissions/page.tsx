import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admissions",
  description:
    "Learn about admissions at Evergreen Public Sr. Sec. School, including the admission process, requirements, and how to get in touch with the school.",
};


export default function AdmissionsPage() {
  return (
    <main>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* Decorative pastel shapes */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#A8D5BA]/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#F8E7A1]/30 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#F3C6D3]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm">
            Admissions · Kaithal
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl lg:text-5xl">
            Begin your journey with us
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8 lg:text-lg">
            We welcome families looking for a supportive and enriching learning
            environment where students can grow academically, personally and
            socially at Ever Green Public Sr. Sec. School, Kaithal.
          </p>
        </div>
      </section>

      {/* =========================================================
          ADMISSION INFORMATION
      ========================================================= */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#D8C7F0]/25 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8065A6] sm:text-sm">
              Admissions Open
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              Apply for admission
            </h2>

            <div className="mt-5 space-y-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              <p>
                Parents and guardians interested in seeking admission for their
                child can submit their details through our online admission
                form.
              </p>

              <p>
                Please complete the form carefully and provide the required
                information. The school will get in touch with you regarding
                the next steps in the admission process.
              </p>
            </div>
          </div>

          {/* Admission CTA */}
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[#A8D5BA] bg-[#E8F4EB] shadow-sm">
            <div className="grid lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="p-7 sm:p-10 lg:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E8560]">
                  Start your application
                </p>

                <h3 className="mt-3 text-2xl font-bold tracking-tight text-[#26352B] sm:text-3xl">
                  Take the first step today
                </h3>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#68736C] sm:text-base">
                  Complete our online admission form and share the required
                  details with the school.
                </p>
              </div>

              <div className="px-7 pb-7 sm:px-10 sm:pb-10 lg:px-12 lg:py-12">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScQeJLrqapahappwsYj_EP-q_obHIDZD6WlcW7ZrQOXo04QkQ/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[#26352B] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2 sm:w-auto"
                >
                  Apply for Admission
                  <span className="ml-2">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          ADMISSION SUPPORT
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-[#BFDCF1]/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4D7188] sm:text-sm">
              Need Help?
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              Have questions about admission?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              If you have any questions about the admission process, please
              get in touch with the school.
            </p>

            <Link
              href="/contact"
              className="mt-7 inline-flex items-center rounded-xl border border-[#6B9F7A] bg-white px-6 py-3 text-sm font-semibold text-[#315D3E] shadow-sm transition hover:-translate-y-0.5 hover:bg-[#E8F4EB] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
            >
              Contact Us
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}