
import ContactUs from "@/components/public/ContactUs";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Evergreen Public Sr. Sec. School for admissions, enquiries, and other school-related information.",
};

export default function ContactPage(){
  return(
    <ContactUs/>
  );
}