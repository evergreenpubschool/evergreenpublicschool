"use client";

import { FormEvent, useEffect, useState } from "react";

export default function AdminVideoPage() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchVideo() {
      try {
        const response = await fetch("/api/school-video");
        const data = await response.json();

        if (data.success && data.video) {
          setYoutubeUrl(data.video.youtubeUrl);
        }
      } catch (error) {
        console.error("Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideo();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setMessage("");

    try {
      const response = await fetch("/api/school-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          youtubeUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update video");
        return;
      }

      setMessage("Video updated successfully");
      setYoutubeUrl(data.video.youtubeUrl);
    } catch (error) {
      console.error("Save video error:", error);
      setMessage("Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="p-6">
        <p className="text-sm text-[#5F6B62]">Loading...</p>
      </main>
    );
  }

  return (
    <main className="p-6 sm:p-8 lg:p-10">
      <div className="mx-auto max-w-3xl">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            About Us
          </p>

          <h1 className="mt-2 text-3xl font-bold text-[#17201A]">
            School Video
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#5F6B62]">
            Add or replace the YouTube video displayed on the About Us page.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-2xl border bg-white p-6 shadow-sm sm:p-8"
        >
          <label
            htmlFor="youtubeUrl"
            className="text-sm font-medium text-[#17201A]"
          >
            YouTube URL
          </label>

          <input
            id="youtubeUrl"
            type="url"
            value={youtubeUrl}
            onChange={(event) => setYoutubeUrl(event.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-2 w-full rounded-lg border px-4 py-3 text-sm outline-none transition focus:border-green-700"
            required
          />

          <p className="mt-2 text-xs leading-5 text-[#5F6B62]">
            You can paste a normal YouTube link or a youtu.be link.
          </p>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 rounded-lg bg-green-700 px-5 py-3 text-sm font-medium text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Video"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-[#5F6B62]">
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}