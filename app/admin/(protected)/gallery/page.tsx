"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type GalleryEvent = {
  _id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  googlePhotosUrl: string;
  order: number;
};

type FormData = {
  title: string;
  googlePhotosUrl: string;
  order: string;
};

const initialForm: FormData = {
  title: "",
  googlePhotosUrl: "",
  order: "1",
};

export default function GalleryAdminPage() {
  const [gallery, setGallery] = useState<GalleryEvent[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState<FormData>(initialForm);

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [uploadedImage, setUploadedImage] = useState<{
    imageUrl: string;
    publicId: string;
  } | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function fetchGallery() {
    try {
      setLoading(true);

      const response = await fetch("/api/gallery");

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch gallery");
      }

      setGallery(data.gallery);
    } catch (error) {
      console.error(error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch gallery"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchGallery();
  }, []);

  function resetForm() {
    setForm(initialForm);
    setImageFile(null);
    setUploadedImage(null);
    setEditingId(null);
    setShowForm(false);
    setMessage("");
    setError("");
  }

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  }

  function handleImageChange(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0] ?? null;

    setImageFile(file);

    // New image means old uploaded image should not
    // be considered the selected image.
    setUploadedImage(null);
  }

  async function uploadCoverImage() {
    if (!imageFile) {
      setError("Please select a cover image.");
      return null;
    }

    try {
      setUploading(true);
      setError("");
      setMessage("");

      const uploadData = new FormData();

      uploadData.append("file", imageFile);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Image upload failed"
        );
      }

      const uploaded = {
        imageUrl: data.imageUrl,
        publicId: data.publicId,
      };

      setUploadedImage(uploaded);

      setMessage("Cover image uploaded successfully.");

      return uploaded;
    } catch (error) {
      console.error("Cover image upload error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Image upload failed"
      );

      return null;
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.title.trim()) {
      setError("Please enter an event title.");
      return;
    }

    if (!form.googlePhotosUrl.trim()) {
      setError("Please enter the Google Photos album URL.");
      return;
    }

    const order = Number(form.order);

    if (!Number.isInteger(order) || order < 1) {
      setError("Display order must be at least 1.");
      return;
    }

    try {
      setSaving(true);

      let image = uploadedImage;

      // If the admin selected an image but hasn't uploaded it yet,
      // upload it automatically when submitting.
      if (imageFile && !image) {
        image = await uploadCoverImage();

        if (!image) {
          return;
        }
      }

      // New event requires an image.
      if (!editingId && !image) {
        setError("Please select a cover image.");
        return;
      }

      const payload = {
        ...(editingId ? { _id: editingId } : {}),
        title: form.title.trim(),
        imageUrl: image?.imageUrl,
        publicId: image?.publicId,
        googlePhotosUrl: form.googlePhotosUrl.trim(),
        order,
      };

      const response = await fetch("/api/gallery", {
        method: editingId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save gallery event"
        );
      }

      setMessage(
        editingId
          ? "Gallery event updated successfully."
          : "Gallery event added successfully."
      );

      await fetchGallery();

      resetForm();
    } catch (error) {
      console.error("Save gallery event error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to save gallery event"
      );
    } finally {
      setSaving(false);
    }
  }

  function startEditing(event: GalleryEvent) {
    setEditingId(event._id);

    setForm({
      title: event.title,
      googlePhotosUrl: event.googlePhotosUrl,
      order: String(event.order),
    });

    setUploadedImage({
      imageUrl: event.imageUrl,
      publicId: event.publicId,
    });

    setImageFile(null);

    setShowForm(true);

    setMessage("");
    setError("");
  }

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this gallery event?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(id);
      setError("");
      setMessage("");

      const response = await fetch("/api/gallery", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete event"
        );
      }

      setGallery((current) =>
        current.filter((event) => event._id !== id)
      );

      setMessage("Gallery event deleted successfully.");
    } catch (error) {
      console.error("Delete gallery event error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to delete gallery event"
      );
    } finally {
      setDeleting(null);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f8fc]">
        <p className="text-sm text-[#68736c]">
          Loading gallery...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f8fc] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6b9f7a]">
              School Gallery
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#26352b]">
              Gallery Events
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#68736c]">
              Manage event covers, Google Photos albums and display
              order for the school gallery.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              if (showForm) {
                resetForm();
              } else {
                setShowForm(true);
              }
            }}
            className="rounded-xl bg-[#a8d5ba] px-5 py-3 text-sm font-semibold text-[#315d3e] shadow-sm transition hover:bg-[#8fc5a4]"
          >
            {showForm ? "Close Form" : "+ Add Event"}
          </button>
        </div>

        {/* STATUS */}
        {message && (
          <div className="mt-6 rounded-xl border border-[#d5eadb] bg-[#e8f4eb] px-4 py-3 text-sm text-[#315d3e]">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-[#f5dce5] bg-[#fdf0f4] px-4 py-3 text-sm text-[#875468]">
            {error}
          </div>
        )}

        {/* FORM */}
        {showForm && (
          <div className="mt-8 rounded-2xl border border-white bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a78a4]">
                  {editingId ? "Edit Event" : "New Event"}
                </p>

                <h2 className="mt-1 text-xl font-semibold text-[#26352b]">
                  {editingId
                    ? "Edit Gallery Event"
                    : "Add Gallery Event"}
                </h2>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-5 md:grid-cols-2"
            >
              {/* TITLE */}
              <div className="md:col-span-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-[#26352b]"
                >
                  Event Title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleInputChange}
                  placeholder="e.g. Raksha Bandhan Celebration"
                  className="mt-2 w-full rounded-xl border border-[#dfe8e2] bg-[#f5f8fc] px-4 py-3 text-sm text-[#26352b] outline-none transition placeholder:text-[#9aa59e] focus:border-[#a8d5ba] focus:ring-2 focus:ring-[#a8d5ba]/30"
                />
              </div>

              {/* IMAGE */}
              <div>
                <label
                  htmlFor="image"
                  className="text-sm font-medium text-[#26352b]"
                >
                  Cover Image
                </label>

                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 block w-full rounded-xl border border-[#dfe8e2] bg-[#f5f8fc] px-4 py-3 text-sm text-[#68736c] file:mr-4 file:rounded-lg file:border-0 file:bg-[#e8f4eb] file:px-3 file:py-2 file:text-sm file:font-medium file:text-[#315d3e]"
                />

                <p className="mt-2 text-xs text-[#68736c]">
                  One cover image is stored on Cloudinary.
                </p>

                {uploadedImage && (
                  <div className="mt-4 overflow-hidden rounded-xl border border-[#dcecf7]">
                    <Image src={uploadedImage.imageUrl}
                      alt="Cover preview"
                      width={800}
                      height={320}
                      className="h-40 w-full object-cover" />
                  </div>
                )}
              </div>

              {/* ORDER */}
              <div>
                <label
                  htmlFor="order"
                  className="text-sm font-medium text-[#26352b]"
                >
                  Display Order
                </label>

                <input
                  id="order"
                  name="order"
                  type="number"
                  min="1"
                  value={form.order}
                  onChange={handleInputChange}
                  className="mt-2 w-full rounded-xl border border-[#dfe8e2] bg-[#f5f8fc] px-4 py-3 text-sm text-[#26352b] outline-none transition focus:border-[#d8c7f0] focus:ring-2 focus:ring-[#d8c7f0]/30"
                />

                <p className="mt-2 text-xs text-[#68736c]">
                  Smaller numbers appear first.
                </p>
              </div>

              {/* GOOGLE PHOTOS */}
              <div className="md:col-span-2">
                <label
                  htmlFor="googlePhotosUrl"
                  className="text-sm font-medium text-[#26352b]"
                >
                  Google Photos Album URL
                </label>

                <input
                  id="googlePhotosUrl"
                  name="googlePhotosUrl"
                  type="url"
                  value={form.googlePhotosUrl}
                  onChange={handleInputChange}
                  placeholder="https://photos.google.com/..."
                  className="mt-2 w-full rounded-xl border border-[#dfe8e2] bg-[#f5f8fc] px-4 py-3 text-sm text-[#26352b] outline-none transition placeholder:text-[#9aa59e] focus:border-[#bfdcf1] focus:ring-2 focus:ring-[#bfdcf1]/30"
                />

                <p className="mt-2 text-xs text-[#68736c]">
                  Visitors will open this album to view all event
                  photos.
                </p>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-col gap-3 pt-2 sm:flex-row md:col-span-2">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving || uploading}
                  className="rounded-xl border border-[#dfe8e2] bg-white px-5 py-3 text-sm font-medium text-[#536158] transition hover:bg-[#fdf0f4] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="rounded-xl bg-[#d8c7f0] px-5 py-3 text-sm font-semibold text-[#604c7b] transition hover:bg-[#cbb5e8] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {uploading
                    ? "Uploading image..."
                    : saving
                      ? "Saving..."
                      : editingId
                        ? "Update Event"
                        : "Add Event"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* EVENTS */}
        {gallery.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-[#dcecf7] bg-white p-10 text-center shadow-sm">
            <p className="text-sm text-[#68736c]">
              No gallery events have been added yet.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
              className="mt-4 rounded-xl bg-[#edf6fc] px-4 py-2.5 text-sm font-medium text-[#36566b] transition hover:bg-[#bfdcf1]"
            >
              Add your first event
            </button>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((event, index) => (
              <div
                key={event._id}
                className="group overflow-hidden rounded-2xl border border-white bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#edf6fc]">
                  
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  


                  <div className="absolute left-3 top-3 rounded-full bg-[#fff8dc] px-3 py-1.5 text-xs font-semibold text-[#66591d] shadow-sm">
                    #{event.order}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8a78a4]">
                    Event {index + 1}
                  </p>

                  <h2 className="mt-2 text-lg font-semibold text-[#26352b]">
                    {event.title}
                  </h2>

                  <div className="mt-5 flex flex-wrap gap-2">
                    <Link
                      href={event.googlePhotosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#e8f4eb] px-3.5 py-2 text-sm font-medium text-[#315d3e] transition hover:bg-[#a8d5ba]"
                    >
                      View Album
                    </Link>

                    <button
                      type="button"
                      onClick={() => startEditing(event)}
                      className="rounded-xl bg-[#edf6fc] px-3.5 py-2 text-sm font-medium text-[#36566b] transition hover:bg-[#bfdcf1]"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(event._id)}
                      disabled={deleting === event._id}
                      className="rounded-xl bg-[#fdf0f4] px-3.5 py-2 text-sm font-medium text-[#875468] transition hover:bg-[#f3c6d3] disabled:opacity-50"
                    >
                      {deleting === event._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
