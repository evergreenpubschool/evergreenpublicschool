import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Academics",
  description:
    "Explore academics at Evergreen Public Sr. Sec. School, from Pre-Nursery to Class 12, including Medical, Non-Medical, Commerce and Arts streams.",
};

export default function AcademicsPage() {
  return (
    <main>
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {/* Decorative pastel shapes */}
        <div className="pointer-events-none absolute -left-24 top-10 h-56 w-56 rounded-full bg-[#A8D5BA]/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-[#D8C7F0]/30 blur-3xl" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-[#BFDCF1]/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm">
            Academics · Kaithal
          </p>

          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-[#26352B] sm:text-4xl lg:text-5xl">
            Academic excellence at Ever Green Public Sr. Sec. School, Kaithal
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8 lg:text-lg">
            From Pre-Nursery to Class XII, Ever Green Public Sr. Sec. School,
            Kaithal focuses on strong academic foundations, practical learning
            and the development of confident, capable students.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="rounded-full border border-[#A8D5BA] bg-[#E8F4EB] px-4 py-2 text-sm font-medium text-[#315D3E]">
              Pre-Nursery to Class XII
            </span>

            <span className="rounded-full border border-[#BFDCF1] bg-[#EDF6FC] px-4 py-2 text-sm font-medium text-[#3F6175]">
              CBSE Pattern
            </span>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACADEMIC JOURNEY
      ========================================================= */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm">
              Academic Journey
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              Education for every stage
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              Our academic journey supports students from their early years
              through senior secondary education, helping them build knowledge,
              confidence and independent learning habits.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-3 sm:gap-6">
            {/* Foundational */}
            <article className="group rounded-3xl border border-[#F3C6D3] bg-[#FDF0F4] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🌱
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#26352B]">
                Foundational Years
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#68736C]">
                Building curiosity, confidence and essential learning habits
                through engaging experiences.
              </p>

              <p className="mt-5 text-sm font-semibold text-[#A65C73]">
                Pre-Nursery – Class V
              </p>
            </article>

            {/* Secondary */}
            <article className="group rounded-3xl border border-[#BFDCF1] bg-[#EDF6FC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                📘
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#26352B]">
                Middle & Secondary
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#68736C]">
                Developing stronger concepts, deeper subject knowledge and
                independent learning skills.
              </p>

              <p className="mt-5 text-sm font-semibold text-[#4D7188]">
                Classes VI – X
              </p>
            </article>

            {/* Senior Secondary */}
            <article className="group rounded-3xl border border-[#D8C7F0] bg-[#F4EFFB] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🎓
              </div>

              <h3 className="mt-6 text-xl font-semibold text-[#26352B]">
                Senior Secondary
              </h3>

              <p className="mt-3 text-sm leading-7 text-[#68736C]">
                Focused subject specialization and preparation for higher
                education and future careers.
              </p>

              <p className="mt-5 text-sm font-semibold text-[#8065A6]">
                Classes XI – XII
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          SENIOR SECONDARY STREAMS
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-24 bottom-0 h-56 w-56 rounded-full bg-[#F8E7A1]/30 blur-3xl" />

        <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-[#F3C6D3]/25 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8065A6] sm:text-sm">
              Classes XI – XII
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              Choose a path for your future
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              Senior secondary students at our school in Kaithal can choose
              from different academic streams according to their interests,
              strengths and future aspirations.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {/* Medical */}
            <article className="group rounded-3xl border border-[#A8D5BA] bg-[#E8F4EB] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🧪
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#26352B] sm:text-xl">
                Medical
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                For students interested in life sciences, medicine and related
                fields.
              </p>
            </article>

            {/* Non-Medical */}
            <article className="group rounded-3xl border border-[#BFDCF1] bg-[#EDF6FC] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🔬
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#26352B] sm:text-xl">
                Non-Medical
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                For students pursuing interests in mathematics, science and
                technical fields.
              </p>
            </article>

            {/* Commerce */}
            <article className="group rounded-3xl border border-[#F8E7A1] bg-[#FFF8DC] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                💼
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#26352B] sm:text-xl">
                Commerce
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Supporting students interested in business, finance and
                commerce-related careers.
              </p>
            </article>

            {/* Arts */}
            <article className="group rounded-3xl border border-[#F3C6D3] bg-[#FDF0F4] p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                🎨
              </div>

              <h3 className="mt-5 text-lg font-semibold text-[#26352B] sm:text-xl">
                Arts
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Encouraging students to explore humanities, creativity and
                social sciences.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          LEARNING APPROACH
      ========================================================= */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 top-16 h-64 w-64 rounded-full bg-[#D8C7F0]/25 blur-3xl" />

        <div className="relative mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-center lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm">
              Our Approach
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              Learning beyond textbooks
            </h2>

            <p className="mt-5 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              We believe meaningful education combines subject knowledge with
              practical experiences, curiosity and the development of skills
              that students can carry into the future.
            </p>

            <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              Our learning approach includes activity-based learning,
              communication and thinking-skills workshops, personality
              development and a round-table concept that encourages students
              to participate actively in the learning process.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-2xl border border-[#A8D5BA] bg-[#E8F4EB] p-5 shadow-sm">
              <h3 className="font-semibold text-[#26352B]">
                Activity-Based Learning
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Making learning more engaging through practical activities and
                participation.
              </p>
            </article>

            <article className="rounded-2xl border border-[#BFDCF1] bg-[#EDF6FC] p-5 shadow-sm">
              <h3 className="font-semibold text-[#26352B]">
                Digital Classrooms
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Digital classrooms designed to support modern teaching and
                learning.
              </p>
            </article>

            <article className="rounded-2xl border border-[#F8E7A1] bg-[#FFF8DC] p-5 shadow-sm">
              <h3 className="font-semibold text-[#26352B]">
                Skills & Workshops
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Communication, thinking skills and personality development
                through regular workshops.
              </p>
            </article>

            <article className="rounded-2xl border border-[#F3C6D3] bg-[#FDF0F4] p-5 shadow-sm">
              <h3 className="font-semibold text-[#26352B]">
                Handwriting Development
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#68736C]">
                Focused activities that encourage better handwriting and
                foundational learning habits.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          ACADEMIC FACILITIES
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4D7188] sm:text-sm">
              Academic Facilities
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              Spaces that support learning
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              Students at our Kaithal school have access to facilities
              designed to support classroom learning, practical exploration
              and independent study.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <div className="rounded-2xl border border-[#A8D5BA] bg-white p-5 text-center shadow-sm">
              <div className="text-2xl">🧑‍💻</div>

              <h3 className="mt-3 text-sm font-semibold text-[#26352B]">
                Digital Classrooms
              </h3>
            </div>

            <div className="rounded-2xl border border-[#F3C6D3] bg-white p-5 text-center shadow-sm">
              <div className="text-2xl">⚛️</div>

              <h3 className="mt-3 text-sm font-semibold text-[#26352B]">
                Physics Lab
              </h3>
            </div>

            <div className="rounded-2xl border border-[#F8E7A1] bg-white p-5 text-center shadow-sm">
              <div className="text-2xl">🧪</div>

              <h3 className="mt-3 text-sm font-semibold text-[#26352B]">
                Chemistry Lab
              </h3>
            </div>

            <div className="rounded-2xl border border-[#D8C7F0] bg-white p-5 text-center shadow-sm">
              <div className="text-2xl">🔬</div>

              <h3 className="mt-3 text-sm font-semibold text-[#26352B]">
                Biology Lab
              </h3>
            </div>

            <div className="rounded-2xl border border-[#BFDCF1] bg-white p-5 text-center shadow-sm">
              <div className="text-2xl">📚</div>

              <h3 className="mt-3 text-sm font-semibold text-[#26352B]">
                Library
              </h3>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-[#E3E8E2] bg-white p-5 text-center shadow-sm sm:p-6">
            <p className="text-sm leading-7 text-[#68736C] sm:text-base">
              The school also provides air-conditioned classrooms and a
              peaceful learning environment supported by experienced teaching
              faculty.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          BEYOND ACADEMICS
      ========================================================= */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -left-24 top-20 h-56 w-56 rounded-full bg-[#F8E7A1]/25 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A65C73] sm:text-sm">
              Beyond Academics
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
              Developing the whole student
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
              Education extends beyond the classroom. Students are encouraged
              to explore creative activities, sports and cultural experiences.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[
              "Music",
              "Dance",
              "Art & Craft",
              "Indoor Games",
              "Outdoor Games",
              "Sports Competitions",
              "Cultural Events",
              "Festivals",
            ].map((activity) => (
              <span
                key={activity}
                className="rounded-full border border-[#E3E8E2] bg-[#F5F8FC] px-4 py-2.5 text-sm font-medium text-[#526158] shadow-sm"
              >
                {activity}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SENIOR SECONDARY FOCUS
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#F5F8FC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="pointer-events-none absolute -right-24 top-10 h-64 w-64 rounded-full bg-[#D8C7F0]/30 blur-3xl" />

        <div className="relative mx-auto w-full max-w-6xl">
          <div className="overflow-hidden rounded-[2rem] border border-[#D8C7F0] bg-[#F4EFFB] p-6 shadow-sm sm:p-10 lg:p-14">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8065A6] sm:text-sm">
                Senior Secondary
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
                Preparing students for what comes next
              </h2>

              <p className="mt-5 text-sm leading-7 text-[#68736C] sm:text-base sm:leading-8">
                Classes XI and XII are an important stage in a student's
                academic journey. At Evergreen Public Sr. Sec. School,
                Kaithal. Students can choose from Medical, Non-Medical,
                Commerce and Arts streams while developing the subject
                knowledge, confidence and skills needed for higher education
                and future opportunities.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-[#26352B]">
                  Subject Knowledge
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#68736C]">
                  Building strong understanding of subjects and core concepts.
                </p>
              </div>

              <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-[#26352B]">
                  Independent Thinking
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#68736C]">
                  Encouraging students to think, question and participate
                  actively in learning.
                </p>
              </div>

              <div className="rounded-2xl border border-white/80 bg-white p-5 shadow-sm">
                <h3 className="font-semibold text-[#26352B]">
                  Future Readiness
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#68736C]">
                  Developing confidence and skills for higher education and
                  future opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
