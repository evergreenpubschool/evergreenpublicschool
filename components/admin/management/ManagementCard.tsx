"use client";
import Image from "next/image";

type Management = {
  _id: string;
  name: string;
  designation: string;
  imageUrl: string;
  order: number;
};

type ManagementCardProps = {
  management: Management;
  onDelete: () => void;
  onEdit: () => void;
};

export default function ManagementCard({
  management,
  onDelete,
  onEdit,
}: ManagementCardProps) {

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this management member?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `/api/management/${management._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete management member");
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

      <div className="relative h-64 w-full">
        <Image
          src={management.imageUrl}
          alt={management.name}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
          className="object-cover"
        />
      </div>


      <div className="p-4">
        <h3 className="text-lg font-semibold">
          {management.name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {management.designation}
        </p>

        <p className="mt-2 text-xs text-gray-400">
          Display order: {management.order}
        </p>

        <div className="mt-4">
          <button
            onClick={onEdit}
            className="rounded-md border px-3 py-2 text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="rounded-md bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}