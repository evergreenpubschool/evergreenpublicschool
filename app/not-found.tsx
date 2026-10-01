import Link from "next/link";

function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F8FC] px-5 py-16 sm:px-8">
      <section className="w-full max-w-2xl text-center">
        {/* Decorative number */}
        <div className="relative mx-auto mb-8 w-fit">
          <span className="text-[9rem] font-black leading-none tracking-tighter text-[#E8F4EB] sm:text-[12rem]">
            404
          </span>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-[#A8D5BA] px-5 py-2 text-sm font-semibold tracking-[0.18em] text-[#26352B] shadow-sm">
              PAGE NOT FOUND
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-[#26352B] sm:text-4xl">
          Looks like this page took a different route.
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#68736C] sm:text-lg">
          The page you are looking for may have been moved, removed, or the
          address may be incorrect.
        </p>

        {/* Action */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-w-36 items-center justify-center rounded-full bg-[#8FBEA0] px-6 py-3 text-sm font-semibold text-[#203428] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#A8D5BA] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#8FBEA0] focus:ring-offset-2"
          >
            Back to Home
          </Link>

          <Link
            href="/contact"
            className="inline-flex min-w-36 items-center justify-center rounded-full border border-[#DDE7E1] bg-white px-6 py-3 text-sm font-semibold text-[#315D3E] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#A8D5BA] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#A8D5BA] focus:ring-offset-2"
          >
            Contact Us
          </Link>
        </div>

        {/* Small decorative accents */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#A8D5BA]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F8E7A1]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#D8C7F0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#BFDCF1]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#F3C6D3]" />
        </div>
      </section>
    </main>
  );
}


export default NotFound;