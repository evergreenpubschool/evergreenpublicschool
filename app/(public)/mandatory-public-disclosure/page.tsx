import React from "react";
import { generalInformation, resultYears } from "@/lib/constants/mandatoryDisclosure";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Mandatory Public Disclosure",
  description:
    "View the mandatory public disclosure information of Evergreen Public Sr. Sec. School, including general information, academics, staff, infrastructure and board results.",
};


export default function MandatoryPublicDisclosurePage() {


  return (
    <main className="min-h-screen bg-[#F5F8FC] px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Page Header */}
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#6B9F7A] sm:text-sm sm:tracking-[0.2em]">
            Appendix IX
          </p>

          <h1 className="mt-3 text-2xl font-bold tracking-tight text-[#26352B] sm:text-3xl md:text-4xl lg:text-5xl">
            Mandatory Public Disclosure
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#68736C] sm:text-base sm:leading-7">
            Information and documents disclosed by Ever Green Public Sr. Sec.
            School in accordance with the applicable requirements.
          </p>
        </header>

        {/* A. GENERAL INFORMATION */}
        <section className="mt-12 sm:mt-16">
          <SectionHeading letter="A" title="General Information" />

          <DisclosureTable
            headers={["S.No.", "Information", "Details"]}
          >
            {generalInformation.map(([number, label, value]) => (
              <tr
                key={number}
                className="transition-colors hover:bg-[#F8FAFC]"
              >
                <td className="w-12 border-b border-r border-black px-3 py-3 text-center text-[#68736C] sm:px-4">
                  {number}
                </td>

                <td className="border-b border-r border-black px-3 py-3 font-medium text-[#26352B] sm:px-4">
                  {label}
                </td>

                <td className="border-b border-r border-black px-3 py-3 text-[#A65C73] sm:px-4">
                  {value}
                </td>
              </tr>
            ))}
          </DisclosureTable>
        </section>

       

        {/* F. BOARD EXAMINATION RESULTS */}
        <section className="mt-12 sm:mt-16">
          <SectionHeading
            letter="B"
            title="Results of the Board Examination — Last Three Years"
          />

          {/* Class X */}
          <div className="mb-8">
            <h3 className="mb-3 text-base font-semibold text-[#26352B] sm:text-lg">
              Class X
            </h3>

            <DisclosureTable
              headers={[
                "Academic Year",
                "No. of Registered Students",
                "No. of Students Passed",
                "Pass %",
                "Remarks",
              ]}
            >
              {resultYears.map((year) => (
                <tr
                  key={`x-${year}`}
                  className="transition-colors hover:bg-[#F8FAFC]"
                >
                  <td className="border-b border-r border-black px-3 py-3 font-medium text-[#26352B] sm:px-4">
                    {year}
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#A65C73] sm:px-4">
                    To be updated
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#A65C73] sm:px-4">
                    To be updated
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#A65C73] sm:px-4">
                    To be updated
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#68736C] sm:px-4">
                    —
                  </td>
                </tr>
              ))}
            </DisclosureTable>
          </div>

          {/* Class XII */}
          <div>
            <h3 className="mb-3 text-base font-semibold text-[#26352B] sm:text-lg">
              Class XII
            </h3>

            <DisclosureTable
              headers={[
                "Academic Year",
                "No. of Registered Students",
                "No. of Students Passed",
                "Pass %",
                "Remarks",
              ]}
            >
              {resultYears.map((year) => (
                <tr
                  key={`xii-${year}`}
                  className="transition-colors hover:bg-[#F8FAFC]"
                >
                  <td className="border-b border-r border-black px-3 py-3 font-medium text-[#26352B] sm:px-4">
                    {year}
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#A65C73] sm:px-4">
                    To be updated
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#A65C73] sm:px-4">
                    To be updated
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#A65C73] sm:px-4">
                    To be updated
                  </td>

                  <td className="border-b border-r border-black px-3 py-3 text-[#68736C] sm:px-4">
                    —
                  </td>
                </tr>
              ))}
            </DisclosureTable>
          </div>
        </section>
      </div>
    </main>
  );
}

/* =========================================================
   SECTION HEADING
========================================================= */

function SectionHeading({
  letter,
  title,
}: {
  letter: string;
  title: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F4EB] text-sm font-bold text-[#4E8560]">
        {letter}
      </div>

      <h2 className="text-lg font-bold tracking-tight text-[#26352B] sm:text-xl">
        {title}
      </h2>
    </div>
  );
}

/* =========================================================
   DISCLOSURE TABLE
========================================================= */

function DisclosureTable({
  headers,
  children,
}: {
  headers: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-black bg-white shadow-sm">
      <table className="w-full min-w-[700px] border-collapse text-left text-xs sm:text-sm">
        <thead>
          <tr className="bg-[#E8F4EB]">
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-r border-black px-3 py-3 font-semibold text-[#26352B] sm:px-4 sm:py-3.5"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
