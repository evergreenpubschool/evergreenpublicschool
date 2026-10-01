"use client";
import Image from "next/image";

import { FormEvent, useEffect, useState } from "react";

export default function HeroPage() {
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchHero() {
      try {
        const response = await fetch("/api/school-hero");
        const data = await response.json();

        if (data.success && data.hero) {
          setImageUrl(data.hero.imageUrl);
        }
      } catch (error) {
        console.error("Failed to fetch hero:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHero();
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!file) {
      setMessage("Please select an image.");
      return;
    }

    setSaving(true);
    setUploading(true);
    setMessage("");

    try {
      // 1. Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        setMessage(uploadData.message || "Failed to upload image.");
        return;
      }

      // 2. Get Cloudinary URL
      const uploadedImageUrl = uploadData.imageUrl;

      setImageUrl(uploadedImageUrl);

      // 3. Save Cloudinary URL to MongoDB
      const response = await fetch("/api/school-hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: uploadedImageUrl,
          publicId: uploadData.publicId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Failed to update hero image.");
        return;
      }

      setMessage("Hero image updated successfully.");
      setFile(null);
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong.");
    } finally {
      setUploading(false);
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <p className="text-gray-500">Loading hero...</p>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Manage School Hero
        </h1>

        <p className="mt-2 text-gray-600">
          Change the main school image displayed on the homepage.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium"
            >
              School Hero Image
            </label>

            <input
              id="image"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setFile(event.target.files?.[0] || null);
              }}
              className="w-full rounded-md border px-3 py-2.5"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white disabled:opacity-50"
          >
            {uploading
              ? "Uploading..."
              : saving
                ? "Saving..."
                : "Save Hero Image"}
          </button>

          {message && (
            <p className="text-sm text-gray-600">
              {message}
            </p>
          )}
        </form>

        {imageUrl && (

          <div className="mt-8 overflow-hidden rounded-xl border bg-white">
            <Image
              src={imageUrl}
              alt="School hero preview"
              width={1920}
              height={730}
              sizes="(max-width: 1023px) 100vw, 512px"
              className="h-auto w-full object-contain"
            />
          </div>

        )}
      </div>
    </main>
  );
}