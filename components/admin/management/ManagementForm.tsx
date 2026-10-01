"use client";

import { FormEvent, useEffect, useState } from "react";

type Management = {
  _id: string;
  name: string;
  designation: string;
  imageUrl: string;
  publicId: string;
  order: number;
};

type ManagementFormProps = {
  onSuccess: () => void;
  management?: Management;
};

export default function ManagementForm({
  onSuccess,
  management,
}: ManagementFormProps) {
  const [name, setName] = useState(
    management?.name || ""
  );

  const [designation, setDesignation] = useState(
    management?.designation || ""
  );

  const [imageUrl, setImageUrl] = useState(
    management?.imageUrl || ""
  );

  const [publicId, setPublicId] = useState(
    management?.publicId || ""
  );

  const [order, setOrder] = useState(
    management?.order?.toString() || ""
  );

  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (management) {
      setName(management.name);
      setDesignation(management.designation);
      setImageUrl(management.imageUrl);
      setPublicId(management.publicId);
      setOrder(management.order.toString());
    } else {
      setName("");
      setDesignation("");
      setImageUrl("");
      setPublicId("");
      setOrder("");
      setFile(null);
    }
  }, [management]);

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

      const response = await fetch(
        management
          ? `/api/management/${management._id}`
          : "/api/management",
        {
          method: management ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            designation,
            imageUrl: finalImageUrl,
            publicId: finalPublicId,
            order: Number(order),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message ||
            "Failed to save management member"
        );
        return;
      }

      setName("");
      setDesignation("");
      setImageUrl("");
      setPublicId("");
      setOrder("");
      setFile(null);

      onSuccess();
    } catch (error) {
      console.error(error);
      setError("Something went wrong");
    } finally {
      setUploading(false);
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 max-w-lg space-y-5"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-2 block text-sm font-medium"
        >
          Name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          placeholder="Mr. Rajesh Garg"
          required
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="designation"
          className="mb-2 block text-sm font-medium"
        >
          Designation
        </label>

        <input
          id="designation"
          type="text"
          value={designation}
          onChange={(event) =>
            setDesignation(event.target.value)
          }
          placeholder="Principal"
          required
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
        />
      </div>

      <div>
        <label
          htmlFor="image"
          className="mb-2 block text-sm font-medium"
        >
          Management Photo
        </label>

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={(event) => {
            setFile(
              event.target.files?.[0] || null
            );
          }}
          required={!management}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>

      <div>
        <label
          htmlFor="order"
          className="mb-2 block text-sm font-medium"
        >
          Display Order
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
          className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2"
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
        className="w-full rounded-md bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {uploading
          ? "Uploading..."
          : loading
          ? management
            ? "Updating..."
            : "Adding..."
          : management
          ? "Update Management Member"
          : "Add Management Member"}
      </button>
    </form>
  );
}