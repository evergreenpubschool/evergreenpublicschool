"use client";
import Image from "next/image";


type Topper = {
  _id: string;
  imageUrl: string;
  year: number;
  order: number;
};

type TopperCardProps = {
  topper: Topper;
  onDelete: () => void;
  onEdit: () => void;
};

export default function TopperCard({
  topper,
  onDelete,
  onEdit,
}: TopperCardProps) {
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this topper collage?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/toppers/${topper._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete topper");
        return;
      }

      onDelete();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  }

  return (
    <div className="overflow-hidden rounded-xl border bg-white">

      <Image
        src={topper.imageUrl}
        alt={`Topper collage ${topper.year}`}
        width={1200}
        height={675}
        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
        className="h-auto w-full object-contain"
      />


      <div className="p-4">
        <h3 className="font-semibold">
          Academic Year {topper.year}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          Carousel position: {topper.order}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={onEdit}
            className="rounded-md border px-4 py-2 text-sm"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
