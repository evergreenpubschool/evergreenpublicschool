"use client";

import { socialLinks } from "@/lib/socials";

export default function SocialSidebar() {
  return (
    <div className="fixed right-3 top-1/2 z-30 -translate-y-1/2 flex-col gap-2 sm:flex">
      {socialLinks.map((social) => {
        const Icon = social.icon;

        return (
          <a
            key={social.name}
            href={social.href}
            target={social.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              social.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            aria-label={`Visit our ${social.name}`}
            className={`flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-all duration-200 hover:-translate-x-1 hover:shadow-md ${social.className}`}
          >
            <Icon className="h-5 w-5" />
          </a>
        );
      })}
    </div>
  );
}
