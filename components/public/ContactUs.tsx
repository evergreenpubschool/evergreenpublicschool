"use client";


import { FormEvent, useState } from "react";


export default function ContactUs() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Failed to send message.");
        return;
      }

      setMessage("Your message has been sent successfully.");
      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F5F8FC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm sm:tracking-[0.2em]">
            Get In Touch · Kaithal
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#26352B] sm:text-3xl md:text-4xl lg:text-5xl">
            Contact Us
          </h1>

          <p className="mt-4 text-sm leading-6 text-[#68736C] sm:text-base sm:leading-7">
            Have a question about our school or admissions? Get in touch with
            us and our team will be happy to help.
          </p>
        </div>

        {/* Content */}
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact Information */}
          <div className="rounded-2xl border border-[#D8C7F0] bg-[#F4EFFB] p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-[#26352B] sm:text-2xl">
              School Information
            </h2>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-medium text-[#8065A6]">
                  Address
                </p>

                <p className="mt-1 text-sm leading-6 text-[#26352B]">
                  Ever Green Public Sr. Sec. School, Jind Road, Behind I.T.I., In Front of Power House Substation, Patel Nagar Kaithal,
                  Kaithal, Haryana
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#8065A6]">
                  Phone
                </p>

                <p className="mt-1 text-sm text-[#26352B]">
                  +91 95181-01455
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#8065A6]">
                  Email
                </p>

                <p className="mt-1 break-words text-sm text-[#26352B]">
                  evergreenpubschoolkaithal@gmail.com
                </p>
              </div>

              <div>
                <p className="text-sm font-medium text-[#8065A6]">
                  Admissions
                </p>

                <p className="mt-1 text-sm leading-6 text-[#68736C]">
                  For admission enquiries, please use the contact form and
                  provide the relevant details.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-2xl border border-[#A8D5BA] bg-[#E8F4EB] p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-[#26352B] sm:text-2xl">
              Send Us a Message
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-[#26352B]"
                  >
                    Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-[#DDE7E1] bg-white px-3 py-2.5 text-[#26352B] outline-none transition placeholder:text-[#9AA59E] focus:border-[#8FBEA0] focus:ring-2 focus:ring-[#A8D5BA]/50"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-[#26352B]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-[#DDE7E1] bg-white px-3 py-2.5 text-[#26352B] outline-none transition placeholder:text-[#9AA59E] focus:border-[#8FBEA0] focus:ring-2 focus:ring-[#A8D5BA]/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-medium text-[#26352B]"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="w-full rounded-lg border border-[#DDE7E1] bg-white px-3 py-2.5 text-[#26352B] outline-none transition placeholder:text-[#9AA59E] focus:border-[#8FBEA0] focus:ring-2 focus:ring-[#A8D5BA]/50"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-[#26352B]"
                >
                  Subject
                </label>

                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  className="w-full rounded-lg border border-[#DDE7E1] bg-white px-3 py-2.5 text-[#26352B] outline-none transition placeholder:text-[#9AA59E] focus:border-[#8FBEA0] focus:ring-2 focus:ring-[#A8D5BA]/50"
                  placeholder="Admission enquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-[#26352B]"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="w-full resize-y rounded-lg border border-[#DDE7E1] bg-white px-3 py-2.5 text-[#26352B] outline-none transition placeholder:text-[#9AA59E] focus:border-[#8FBEA0] focus:ring-2 focus:ring-[#A8D5BA]/50"
                  placeholder="Write your message..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#26352B] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#315D3E] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

              {message && (
                <p
                  className={`text-sm ${
                    message.includes("successfully")
                      ? "text-[#4E8560]"
                      : "text-[#A65C73]"
                  }`}
                >
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
