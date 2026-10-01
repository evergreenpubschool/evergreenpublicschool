import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://evergreenpublicschoolkaithal.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Evergreen Public Sr. Sec. School",
    template: "%s | Evergreen Public Sr. Sec. School",
  },

  description:
    "Evergreen Public Sr. Sec. School provides quality education from Pre-Nursery to Class 12, with a strong academic foundation and a supportive learning environment.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Evergreen Public Sr. Sec. School",
    description:
      "Evergreen Public Sr. Sec. School provides quality education from Pre-Nursery to Class 12, with a strong academic foundation and a supportive learning environment.",
    type: "website",
    locale: "en_IN",
    siteName: "Evergreen Public Sr. Sec. School",
    url: "/",
  },

  twitter: {
    card: "summary_large_image",
    title: "Evergreen Public Sr. Sec. School",
    description:
      "Evergreen Public Sr. Sec. School provides quality education from Pre-Nursery to Class 12, with a strong academic foundation and a supportive learning environment.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
