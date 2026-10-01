"use client"

type SchoolVideoProps = {
  youtubeUrl: string;
};

function getYouTubeEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    // Normal YouTube URL:
    // https://www.youtube.com/watch?v=VIDEO_ID
    if (
      parsedUrl.hostname === "www.youtube.com" ||
      parsedUrl.hostname === "youtube.com" ||
      parsedUrl.hostname === "m.youtube.com"
    ) {
      const videoId = parsedUrl.searchParams.get("v");

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // Short YouTube URL:
    // https://youtu.be/VIDEO_ID
    if (parsedUrl.hostname === "youtu.be") {
      const videoId = parsedUrl.pathname.slice(1);

      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export default function SchoolVideo({
  youtubeUrl,
}: SchoolVideoProps) {
  const embedUrl = getYouTubeEmbedUrl(youtubeUrl);

  if (!embedUrl) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-green-700 sm:text-sm">
            Our School
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#17201A] sm:text-4xl lg:text-5xl">
            Discover our school
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#5F6B62] sm:text-base sm:leading-8">
            Take a closer look at our school, learning environment and
            the experiences we create for our students.
          </p>
        </div>

        <div className="mt-10 aspect-video overflow-hidden rounded-2xl border bg-black shadow-sm">
          <iframe
            src={embedUrl}
            title="About Our School"
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}