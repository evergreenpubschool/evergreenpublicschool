import {
  BookOpen,
  BriefcaseBusiness,
  Brain,
  CheckCircle2,
  GraduationCap,
  HeartHandshake,
  Lightbulb,
  Microscope,
  ShieldCheck,
  Users,
} from "lucide-react";

const reasons = [
  {
    title: "Industry-Focused Curriculum",
    description:
      "Learning designed to connect academic concepts with real-world skills.",
    icon: BriefcaseBusiness,
    color: "bg-[#edf6fc]",
    iconBg: "bg-[#bfdcf1]",
    iconColor: "text-[#36566b]",
  },
  {
    title: "Strong Academic Foundation",
    description:
      "Focused teaching that builds strong concepts and academic confidence.",
    icon: BookOpen,
    color: "bg-[#e8f4eb]",
    iconBg: "bg-[#a8d5ba]",
    iconColor: "text-[#315d3e]",
  },
  {
    title: "Future-Ready Skills",
    description:
      "Students develop communication, problem-solving and practical skills.",
    icon: Lightbulb,
    color: "bg-[#fff8dc]",
    iconBg: "bg-[#f8e7a1]",
    iconColor: "text-[#66591d]",
  },
  {
    title: "Experienced Educators",
    description:
      "Dedicated teachers who guide students with care and academic expertise.",
    icon: GraduationCap,
    color: "bg-[#f4effb]",
    iconBg: "bg-[#d8c7f0]",
    iconColor: "text-[#604c7b]",
  },
  {
    title: "Science & Innovation",
    description:
      "Encouraging curiosity, experimentation and scientific thinking.",
    icon: Microscope,
    color: "bg-[#fdf0f4]",
    iconBg: "bg-[#f3c6d3]",
    iconColor: "text-[#875468]",
  },
  {
    title: "Student-Centered Learning",
    description:
      "A learning environment that recognizes every student's potential.",
    icon: Users,
    color: "bg-[#e8f4eb]",
    iconBg: "bg-[#a8d5ba]",
    iconColor: "text-[#315d3e]",
  },
  {
    title: "Holistic Development",
    description:
      "Equal importance to academics, personality, confidence and character.",
    icon: Brain,
    color: "bg-[#f4effb]",
    iconBg: "bg-[#d8c7f0]",
    iconColor: "text-[#604c7b]",
  },
  {
    title: "Safe & Supportive Environment",
    description:
      "A positive atmosphere where students can learn, grow and express themselves.",
    icon: ShieldCheck,
    color: "bg-[#edf6fc]",
    iconBg: "bg-[#bfdcf1]",
    iconColor: "text-[#36566b]",
  },
  {
    title: "Personal Guidance",
    description:
      "Individual attention and guidance to help students move toward their goals.",
    icon: HeartHandshake,
    color: "bg-[#fdf0f4]",
    iconBg: "bg-[#f3c6d3]",
    iconColor: "text-[#875468]",
  },
  {
    title: "Focus on Excellence",
    description:
      "A culture that encourages students to aim higher and perform their best.",
    icon: CheckCircle2,
    color: "bg-[#fff8dc]",
    iconBg: "bg-[#f8e7a1]",
    iconColor: "text-[#66591d]",
  },
];

export default function SchoolIntroduction() {
  return (
    <section className="relative overflow-hidden bg-[#f5f8fc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      {/* Decorative pastel shapes */}
      <div className="pointer-events-none absolute -left-24 top-20 h-64 w-64 rounded-full bg-[#f3c6d3]/35 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-[#d8c7f0]/35 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-[#f8e7a1]/25 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl">
        {/* Section heading */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b9f7a]">
            What makes us different
          </p>

          <h2 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-[#26352b] sm:text-5xl lg:text-6xl">
            Why Choose Evergreen?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#68736c] sm:text-base sm:leading-8">
            A learning environment where strong academics, practical skills
            and personal growth come together to prepare students for the
            future.
          </p>
        </div>

        {/* Feature cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {reasons.map((reason) => {
            const Icon = reason.icon;

            return (
              <div
                key={reason.title}
                className={`group rounded-2xl border border-white/80 ${reason.color} p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
              >
                {/* Icon */}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${reason.iconBg} ${reason.iconColor} shadow-sm transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="mt-5 text-base font-semibold leading-6 text-[#26352b]">
                  {reason.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#68736c]">
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
