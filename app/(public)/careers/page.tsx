import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Careers",
  description:
    "Explore career opportunities at Evergreen Public Sr. Sec. School and learn how to apply for teaching and other positions.",
};

export default function CareersPage() {
  return (
    <main>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* Decorative pastel shapes */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#A8D5BA]/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#F3C6D3]/30 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#D8C7F0]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm">
            Careers · Kaithal
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl lg:text-5xl">
            Join us in shaping young minds
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8 lg:text-lg">
            Build a meaningful career at Ever Green Public Sr. Sec. School,
            Kaithal, and contribute to an environment where students are
            encouraged to learn, grow and thrive.
          </p>
        </div>
      </section>

      {/* =========================================================
          TEACHING AS A CAREER
      ========================================================= */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-[#BFDCF1]/25 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8065A6] sm:text-sm">
              A Meaningful Career
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              More than a Profession
            </h2>
          </div>

          <div className="mt-10 space-y-6 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
            <p className="rounded-3xl border border-[#F8E7A1] bg-[#FFF8DC] p-6 font-medium text-[#514820] shadow-sm sm:p-8">
              Blessed are those who take up teaching as a career. It is here
              that one gets the golden opportunity to shape lives and touch the
              future.
            </p>

            <p className="mx-auto max-w-4xl">
              Evergreen Public Sr. Sec. School is an institution committed to
              serving society by training and chiselling young minds. Our staff
              lights the way for their holistic development through dedication,
              polite communication and a positive mindset.
            </p>

            <p className="mx-auto max-w-4xl">
              The work ethos here is aptly reflected in our confident students,
              who remain rooted in strong values. If you are a committed and
              responsible teacher who wishes to join us on our tireless journey
              towards excellence, we would be pleased to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE VALUE
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-[#D8C7F0]/25 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A65C73] sm:text-sm">
              Our Values
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              What we value in our educators
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              We value educators who contribute positively to the academic,
              personal and social development of our students.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
            <article className="rounded-3xl border border-[#A8D5BA] bg-[#E8F4EB] p-5 text-center shadow-sm sm:p-7">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🎓
              </div>

              <h3 className="mt-5 text-base font-semibold text-[#26352B] sm:text-lg">
                Dedication
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                A genuine commitment to teaching and student development.
              </p>
            </article>

            <article className="rounded-3xl border border-[#BFDCF1] bg-[#EDF6FC] p-5 text-center shadow-sm sm:p-7">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                💬
              </div>

              <h3 className="mt-5 text-base font-semibold text-[#26352B] sm:text-lg">
                Communication
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Clear, respectful and positive communication with students.
              </p>
            </article>

            <article className="rounded-3xl border border-[#F3C6D3] bg-[#FDF0F4] p-5 text-center shadow-sm sm:p-7">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🌱
              </div>

              <h3 className="mt-5 text-base font-semibold text-[#26352B] sm:text-lg">
                Growth Mindset
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Encouraging curiosity, learning and continuous improvement.
              </p>
            </article>

            <article className="rounded-3xl border border-[#D8C7F0] bg-[#F4EFFB] p-5 text-center shadow-sm sm:p-7">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🤝
              </div>

              <h3 className="mt-5 text-base font-semibold text-[#26352B] sm:text-lg">
                Responsibility
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Supporting students with professionalism and care.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          JOIN OUR TEAM
      ========================================================= */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-20 top-10 h-56 w-56 rounded-full bg-[#F8E7A1]/30 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-[2rem] border border-[#A8D5BA] bg-[#E8F4EB] shadow-sm">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              {/* Left */}
              <div className="p-7 sm:p-10 lg:p-14">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E8560] sm:text-sm">
                  Join Our Team
                </p>

                <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl">
                  Interested in joining our team?
                </h2>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
                  If you are a committed and responsible educator who would
                  like to contribute to the learning and development of our
                  students, we would be pleased to hear from you.
                </p>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
                  Please share your resume with us for current or future
                  teaching opportunities at the school.
                </p>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScNO0Hp0WMAvHPqqN1V8t7XhO78FAf8mudlvdOSQhTNu_RhDQ/viewform?usp=publish-editor"
                  target="_blank"
                  rel="noopener noreferrer"

                  className="mt-7 inline-flex items-center rounded-xl bg-[#26352B] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
                >
                  Send Your Resume
                  <span className="ml-2">→</span>
                </a>
              </div>

              {/* Right visual */}
              <div className="relative flex min-h-[220px] items-center justify-center overflow-hidden bg-[#FFF8DC] p-8 lg:min-h-full">
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#F8E7A1]/60 blur-2xl" />

                <div className="absolute -bottom-16 -left-10 h-40 w-40 rounded-full bg-[#F3C6D3]/40 blur-2xl" />

                <div className="relative text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-4xl shadow-sm">
                    👩‍🏫
                  </div>

                  <p className="mt-5 text-sm font-semibold text-[#514820]">
                    Shape the future
                  </p>

                  <p className="mt-2 max-w-xs text-sm leading-6 text-[#68736C]">
                    Inspire students. Share knowledge. Make a difference.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}