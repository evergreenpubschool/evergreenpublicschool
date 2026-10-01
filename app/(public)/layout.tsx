import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import SocialSidebar from "@/components/public/SocialSidebar";

const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "School",
  name: "Evergreen Public Sr. Sec. School",

  description:
    "Evergreen Public Sr. Sec. School provides quality education from Pre-Nursery to Class 12, with a strong academic foundation and a supportive learning environment.",

  url: "https://evergreenpublicschoolkaithal.com",

  logo: "https://evergreenpublicschoolkaithal.com/favicon.ico",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Jind Road, Behind I.T.I., In Front of Power House Substation, Patel Nagar Kaithal",
    addressLocality: "Kaithal",
    addressRegion: "Haryana",
    postalCode: "136027",
    addressCountry: "IN",
  },

  telephone: "9518101455",
  email: "evergreenpubschoolkaithal@gmail.com",

  sameAs: [
    "https://www.instagram.com/evergreenpublicschoolktl/",
    "https://www.facebook.com/evergreenpublicschoolktl/",
    "https://youtube.com/@evergreenpublicschoolktl",
  ],
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      {children}

      <SocialSidebar />

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schoolSchema),
        }}
      />
    </>
  );
}
