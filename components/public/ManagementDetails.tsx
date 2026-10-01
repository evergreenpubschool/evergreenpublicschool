import { managementDetails } from "@/lib/constants/management";
import Image from "next/image";

type Management = {
  _id: string;
  name: string;
  designation: string;
  imageUrl: string;
  order: number;
};

type ManagementDetailsProps = {
  management: Management[];
};

export default function ManagementDetails({
  management,
}: ManagementDetailsProps) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-sm">
            Our Management
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17201A] sm:text-4xl lg:text-5xl">
            Leadership that guides our journey
          </h2>
        </div>

        <div className="mt-12 space-y-12">
          {management.map((person) => {
            const details = managementDetails.find(
              (item) => item.name === person.name
            );

            return (
              <article
                key={person._id}
                className="grid gap-8 md:grid-cols-[280px_1fr] md:gap-10 lg:grid-cols-[320px_1fr] lg:gap-14"
              >
                <div className="relative">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                    <Image src={person.imageUrl}
                      alt={person.name}
                      fill sizes="(max-width: 767px) 100vw, 280px"
                      className="object-cover" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#17201A] sm:text-3xl">
                    {person.name}
                  </h3>

                  <p className="mt-2 text-base font-medium text-green-700">
                    {person.designation}
                  </p>

                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#17201A]">
                      Education
                    </p>

                    <p className="mt-2 text-base leading-7 text-[#5F6B62]">
                      {details?.education}
                    </p>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm font-semibold uppercase tracking-wide text-[#17201A]">
                      About
                    </p>

                    <p className="mt-2 text-base leading-7 text-[#5F6B62]">
                      {details?.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
