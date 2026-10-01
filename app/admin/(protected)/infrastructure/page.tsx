"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type InfrastructurePhoto = {
  _id: string;
  title: string;
  imageUrl: string;
  publicId: string;
  order: number;
};

export default function InfrastructurePage() {
  const [photos, setPhotos] = useState<InfrastructurePhoto[]>([]);

  const [title, setTitle] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [editingPhoto, setEditingPhoto] =
    useState<InfrastructurePhoto | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editFile, setEditFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [message, setMessage] = useState("");

  /* =========================
     Fetch photos
  ========================= */

  const fetchPhotos = async () => {
    try {
      setFetching(true);

      const response = await fetch("/api/infrastructure");
      const data = await response.json();

      if (data.success) {
        setPhotos(data.photos);
      }
    } catch (error) {
      console.error("Failed to fetch infrastructure:", error);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  /* =========================
     Add photo
  ========================= */

  const handleAddPhoto = async () => {
    if (!title.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    if (!selectedFile) {
      setMessage("Please select an image.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const uploadData = await uploadResponse.json();

      if (!uploadResponse.ok) {
        setMessage(
          uploadData.message || "Image upload failed."
        );
        return;
      }

      const infrastructureResponse = await fetch(
        "/api/infrastructure",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            imageUrl: uploadData.imageUrl,
            publicId: uploadData.publicId,
            order: photos.length,
          }),
        }
      );

      const infrastructureData =
        await infrastructureResponse.json();

      if (!infrastructureResponse.ok) {
        setMessage(
          infrastructureData.message ||
            "Failed to save infrastructure photo."
        );
        return;
      }

      setTitle("");
      setSelectedFile(null);

      const fileInput = document.getElementById(
        "infrastructure-image"
      ) as HTMLInputElement | null;

      if (fileInput) {
        fileInput.value = "";
      }

      setMessage("Photo added successfully.");

      await fetchPhotos();
    } catch (error) {
      console.error("Add infrastructure error:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Start editing
  ========================= */

  const handleStartEdit = (photo: InfrastructurePhoto) => {
    setEditingPhoto(photo);
    setEditTitle(photo.title);
    setEditFile(null);
    setMessage("");
  };

  /* =========================
     Cancel editing
  ========================= */

  const handleCancelEdit = () => {
    setEditingPhoto(null);
    setEditTitle("");
    setEditFile(null);
  };

  /* =========================
     Update photo
  ========================= */

  const handleUpdatePhoto = async () => {
    if (!editingPhoto) {
      return;
    }

    if (!editTitle.trim()) {
      setMessage("Please enter a title.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      let imageUrl = editingPhoto.imageUrl;
      let publicId = editingPhoto.publicId;

      /* -------------------------
         Upload replacement image
      ------------------------- */

      if (editFile) {
        const formData = new FormData();
        formData.append("file", editFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadData = await uploadResponse.json();

        if (!uploadResponse.ok) {
          setMessage(
            uploadData.message || "Image upload failed."
          );
          return;
        }

        imageUrl = uploadData.imageUrl;
        publicId = uploadData.publicId;
      }

      /* -------------------------
         Update MongoDB
      ------------------------- */

      const response = await fetch("/api/infrastructure", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingPhoto._id,
          title: editTitle.trim(),
          imageUrl,
          publicId,
          order: editingPhoto.order,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Failed to update photo."
        );
        return;
      }

      setMessage("Photo updated successfully.");

      handleCancelEdit();
      await fetchPhotos();
    } catch (error) {
      console.error("Update infrastructure error:", error);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Delete photo
  ========================= */

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this photo?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/infrastructure?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Failed to delete photo."
        );
        return;
      }

      setMessage("Photo deleted successfully.");

      await fetchPhotos();
    } catch (error) {
      console.error("Delete infrastructure error:", error);
      setMessage("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F8FC] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#26352B] sm:text-3xl">
            Infrastructure
          </h1>

          <p className="mt-2 text-sm text-[#68736C] sm:text-base">
            Manage photos showcasing the school campus and facilities.
          </p>
        </div>

        {/* Add Photo */}

        <div className="mb-10 rounded-2xl border border-[#E3E8E2] bg-white p-5 shadow-sm sm:p-6">
          <h2 className="text-lg font-semibold text-[#26352B]">
            Add Infrastructure Photo
          </h2>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="infrastructure-title"
                className="mb-2 block text-sm font-medium text-[#26352B]"
              >
                Title
              </label>

              <input
                id="infrastructure-title"
                type="text"
                value={title}
                onChange={(event) =>
                  setTitle(event.target.value)
                }
                placeholder="e.g. Physics Laboratory"
                className="w-full rounded-xl border border-[#E3E8E2] bg-white px-4 py-3 text-sm text-[#26352B] outline-none transition focus:border-[#8FBEA0] focus:ring-2 focus:ring-[#A8D5BA]/30"
              />
            </div>

            <div>
              <label
                htmlFor="infrastructure-image"
                className="mb-2 block text-sm font-medium text-[#26352B]"
              >
                Image
              </label>

              <input
                id="infrastructure-image"
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setSelectedFile(
                    event.target.files?.[0] ?? null
                  )
                }
                className="block w-full cursor-pointer rounded-xl border border-[#E3E8E2] bg-white text-sm text-[#68736C] file:mr-4 file:border-0 file:bg-[#E8F4EB] file:px-4 file:py-3 file:font-medium file:text-[#26352B] hover:file:bg-[#A8D5BA]"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddPhoto}
            disabled={loading}
            className="mt-5 rounded-xl bg-[#8FBEA0] px-5 py-3 text-sm font-semibold text-[#203428] transition hover:bg-[#A8D5BA] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Add Photo"}
          </button>

          {message && (
            <p className="mt-4 text-sm text-[#68736C]">
              {message}
            </p>
          )}
        </div>

        {/* Existing Photos */}

        <div>
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#26352B]">
              Existing Photos
            </h2>

            <span className="text-sm text-[#68736C]">
              {photos.length}{" "}
              {photos.length === 1 ? "photo" : "photos"}
            </span>
          </div>

          {fetching ? (
            <div className="rounded-2xl border border-[#E3E8E2] bg-white p-8 text-center text-sm text-[#68736C]">
              Loading photos...
            </div>
          ) : photos.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#C8D8CC] bg-white p-10 text-center">
              <p className="font-medium text-[#26352B]">
                No infrastructure photos yet.
              </p>

              <p className="mt-1 text-sm text-[#68736C]">
                Add your first photo above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className="overflow-hidden rounded-2xl border border-[#E3E8E2] bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={photo.imageUrl}
                      alt={photo.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-[#26352B]">
                      {photo.title}
                    </h3>

                    <div className="mt-4 flex gap-4">
                      <button
                        type="button"
                        onClick={() =>
                          handleStartEdit(photo)
                        }
                        className="text-sm font-semibold text-[#4E8560] hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(photo._id)
                        }
                        className="text-sm font-semibold text-[#B65F5F] hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Edit Modal */}

        {editingPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-[#26352B]">
                Edit Infrastructure Photo
              </h2>

              <div className="mt-5">
                <label
                  htmlFor="edit-infrastructure-title"
                  className="mb-2 block text-sm font-medium text-[#26352B]"
                >
                  Title
                </label>

                <input
                  id="edit-infrastructure-title"
                  type="text"
                  value={editTitle}
                  onChange={(event) =>
                    setEditTitle(event.target.value)
                  }
                  className="w-full rounded-xl border border-[#E3E8E2] px-4 py-3 text-sm text-[#26352B] outline-none focus:border-[#8FBEA0] focus:ring-2 focus:ring-[#A8D5BA]/30"
                />
              </div>

              <div className="mt-5">
                <p className="mb-2 text-sm font-medium text-[#26352B]">
                  Current Image
                </p>

                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <Image
                    src={
                      editFile
                        ? URL.createObjectURL(editFile)
                        : editingPhoto.imageUrl
                    }
                    alt={editingPhoto.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 512px"
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label
                  htmlFor="edit-infrastructure-image"
                  className="mb-2 block text-sm font-medium text-[#26352B]"
                >
                  Replace Image
                </label>

                <input
                  id="edit-infrastructure-image"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setEditFile(
                      event.target.files?.[0] ?? null
                    )
                  }
                  className="block w-full cursor-pointer rounded-xl border border-[#E3E8E2] bg-white text-sm text-[#68736C] file:mr-4 file:border-0 file:bg-[#E8F4EB] file:px-4 file:py-3 file:font-medium file:text-[#26352B]"
                />
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  disabled={loading}
                  className="rounded-xl border border-[#E3E8E2] px-5 py-3 text-sm font-semibold text-[#26352B] hover:bg-[#F5F8FC]"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleUpdatePhoto}
                  disabled={loading}
                  className="rounded-xl bg-[#8FBEA0] px-5 py-3 text-sm font-semibold text-[#203428] hover:bg-[#A8D5BA] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
