"use client";

import ManagementForm from "@/components/admin/management/ManagementForm";
import ManagementList from "@/components/admin/management/ManagementList";

import { useEffect, useState } from "react";

type Management = {
    _id: string;
    name: string;
    designation: string;
    imageUrl: string;
    publicId: string;
    order: number;
};

export default function ManagementPage() {
    const [management, setManagement] = useState<Management[]>([]);
    const [editingManagement, setEditingManagement] =
        useState<Management | null>(null);
    const [loading, setLoading] = useState(true);

    async function fetchManagement() {
        try {
            const response = await fetch("/api/management");
            const data = await response.json();

            if (data.success) {
                setManagement(data.management);
            }
        } catch (error) {
            console.error("Failed to fetch management:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchManagement();
    }, []);

    if (loading) {
        return (
            <main className="p-8">
                <p className="text-gray-500">
                    Loading management...
                </p>
            </main>
        );
    }

    return (
        <main className="p-8">
            <div>
                <h1 className="text-3xl font-bold">
                    Manage School Management
                </h1>

                <p className="mt-2 text-gray-600">
                    Manage the school management members shown on the website.
                </p>
            </div>

            <ManagementForm
                onSuccess={() => {
                    fetchManagement();
                    setEditingManagement(null);
                }}
                management={editingManagement || undefined}
            />

            {editingManagement && (
                <button
                    onClick={() => setEditingManagement(null)}
                    className="mt-2 rounded-md border px-4 py-2 text-sm"
                >
                    Cancel Edit
                </button>
            )}

            <ManagementList management={management}
                onDelete={fetchManagement}
                onEdit={(member) => {
                    setEditingManagement(member);
                }} />
        </main>
    );
}