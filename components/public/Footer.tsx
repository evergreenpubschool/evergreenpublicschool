import Link from "next/link";
import GoogleMap from "@/components/public/GoogleMap";
import { SCHOOL_LOCATION } from "@/lib/school";
import { navItems } from "@/lib/constants/navigation";


import { socialLinks } from "@/lib/socials";

export default function Footer() {
  return (
    <footer className="border-t border-[#DDE7E1] bg-[#F5F8FC] shadow-[0_-4px_20px_rgba(38,53,43,0.04)]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8 lg:py-16">
        {/* School info */}
        <div>
          <h2 className="text-xl font-bold tracking-tight text-[#26352B]">
            Evergreen Public Sr. Sec. School
          </h2>

          <div className="mt-3 h-1 w-12 rounded-full bg-[#A8D5BA]" />

          <p className="mt-5 max-w-sm text-sm leading-7 text-[#68736C]">
            Providing students with a strong academic foundation, meaningful
            experiences and an environment to grow.
          </p>

          {/* Social media */}
          <div className="mt-6">
            <p className="text-sm font-semibold text-[#26352B]">
              Follow Us
            </p>

            <div className="mt-3 flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${social.name}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2 ${social.className}`}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#26352B]">
            Quick Links
          </h3>

          <div className="mt-3 h-1 w-8 rounded-full bg-[#F8E7A1]" />

          <nav className="mt-5 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="w-fit text-sm text-[#68736C] transition-colors duration-200 hover:text-[#315D3E] focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/mandatory-public-disclosure"
              className="w-fit text-sm text-[#68736C] transition-colors duration-200 hover:text-[#315D3E] focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
            >
              Mandatory Public Disclosure
            </Link>
          </nav>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-[#26352B]">
            Visit Us
          </h3>

          <div className="mt-3 h-1 w-8 rounded-full bg-[#BFDCF1]" />

          <p className="mt-5 text-sm leading-7 text-[#68736C]">
            {SCHOOL_LOCATION}
          </p>

          <div className="mt-5 overflow-hidden rounded-2xl border border-[#DDE7E1] bg-white shadow-sm">
            <GoogleMap location={SCHOOL_LOCATION} />
          </div>
        </div>
      </div>

      {/* Copyright & Developer Credit */}
      <div className="border-t border-[#DDE7E1] bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-[#68736C] sm:flex-row sm:px-6 lg:px-8">

          <p>
            © {new Date().getFullYear()} Evergreen Public Sr. Secondary School.
            All rights reserved.
          </p>

          <p>
            Website Created by{" "}
            <a
              href="mailto:harshaggarwalweb2@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#315D3E] transition-colors hover:text-[#26352B] hover:underline"
            >
              Harsh Aggarwal
            </a>
          </p>

        </div>
      </div>
    </footer>
  );
}
