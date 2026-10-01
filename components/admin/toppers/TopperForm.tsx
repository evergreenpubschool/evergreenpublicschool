"use client";

import { FormEvent, useEffect, useState } from "react";

type Topper = {
  _id: string;
  imageUrl: string;
  publicId: string;
  year: number;
  order: number;
};

type TopperFormProps = {
  onSuccess: () => void;
  topper?: Topper;
};

export default function TopperForm({
  onSuccess,
  topper,
}: TopperFormProps) {
  const [imageUrl, setImageUrl] = useState(
    topper?.imageUrl || ""
  );
  const [publicId, setPublicId] = useState(
    topper?.publicId || ""
  );
  const [year, setYear] = useState(
    topper?.year?.toString() || ""
  );
  const [order, setOrder] = useState(
    topper?.order?.toString() || ""
  );
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (topper) {
      setImageUrl(topper.imageUrl);
      setPublicId(topper.publicId);
      setYear(topper.year.toString());
      setOrder(topper.order.toString());
    } else {
      setImageUrl("");
      setPublicId("");
      setYear("");
      setOrder("");
      setFile(null);
    }
  }, [topper]);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      let finalImageUrl = imageUrl;
      let finalPublicId = publicId;

      // Upload a new image if one was selected
      if (file) {
        setUploading(true);

        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          setError(
            uploadData.message || "Failed to upload image."
          );
          return;
        }

        finalImageUrl = uploadData.imageUrl;
        finalPublicId = uploadData.publicId;

        setImageUrl(finalImageUrl);
        setPublicId(finalPublicId);
      }

      // Create or update topper
      const response = await fetch(
        topper
          ? `/api/toppers/${topper._id}`
          : "/api/toppers",
        {
          method: topper ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            imageUrl: finalImageUrl,
            publicId: finalPublicId,
            year: Number(year),
            order: Number(order),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Failed to save topper collage."
        );
        return;
      }

      setImageUrl("");
      setPublicId("");
      setYear("");
      setOrder("");
      setFile(null);

      onSuccess();
    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setUploading(false);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 w-full max-w-lg space-y-5"
    >
      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium"
        >
          Topper Collage Image
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            setFile(event.target.files?.[0] || null);
          }}
          className="w-full rounded-md border px-3 py-3 text-base outline-none focus:ring-2 sm:text-sm"
          required={!topper}
        />
      </div>

      <div>
        <label
          htmlFor="year"
          className="mb-2 block text-sm font-medium"
        >
          Academic Year
        </label>

        <input
          id="year"
          type="number"
          value={year}
          onChange={(event) =>
            setYear(event.target.value)
          }
          placeholder="2026"
          min="2000"
          required
          className="w-full rounded-md border px-3 py-3 text-base outline-none focus:ring-2 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="order"
          className="mb-2 block text-sm font-medium"
        >
          Carousel Position
        </label>

        <input
          id="order"
          type="number"
          value={order}
          onChange={(event) =>
            setOrder(event.target.value)
          }
          placeholder="1"
          min="1"
          required
          className="w-full rounded-md border px-3 py-3 text-base outline-none focus:ring-2 sm:text-sm"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-black px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
      >
        {uploading
          ? "Uploading..."
          : loading
          ? topper
            ? "Updating..."
            : "Adding..."
          : topper
          ? "Update Topper Collage"
          : "Add Topper Collage"}
      </button>
    </form>
  );
}
