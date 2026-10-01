"use client";

import { useEffect, useState } from "react";
import TopperForm from "@/components/admin/toppers/TopperForm";
import TopperList from "@/components/admin/toppers/TopperList";

type Topper = {
  _id: string;
  imageUrl: string;
  publicId: string;
  year: number;
  order: number;
};

export default function ToppersPage() {
  const [toppers, setToppers] = useState<Topper[]>([]);
  const [editingTopper, setEditingTopper] =
    useState<Topper | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchToppers() {
    try {
      const response = await fetch("/api/toppers");
      const data = await response.json();

      if (data.success) {
        setToppers(data.toppers);
      }
    } catch (error) {
      console.error("Failed to fetch toppers:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchToppers();
  }, []);

  if (loading) {
    return (
      <main className="p-4 sm:p-6 lg:p-8">
        <p className="text-gray-500">Loading toppers...</p>
      </main>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Manage Toppers
        </h1>

        <p className="mt-2 text-gray-600">
          Manage the topper collage images shown on the homepage.
        </p>
      </div>

      <TopperForm
        onSuccess={() => {
          fetchToppers();
          setEditingTopper(null);
        }}
        topper={editingTopper || undefined}
      />

      {editingTopper && (
        <button
          onClick={() => setEditingTopper(null)}
          className="mt-2 rounded-md border px-4 py-2 text-sm"
        >
          Cancel Edit
        </button>
      )}

      <TopperList
        toppers={toppers}
        onDelete={fetchToppers}
        onEdit={(topper) => {
          setEditingTopper(topper);
        }}
      />
    </main>
  );
}
