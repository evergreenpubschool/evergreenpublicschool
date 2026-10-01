"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [topperCount, setTopperCount] = useState(0);
  const [managementCount, setManagementCount] = useState(0);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [topperResponse, managementResponse] =
          await Promise.all([
            fetch("/api/toppers"),
            fetch("/api/management"),
          ]);

        const topperData = await topperResponse.json();
        const managementData = await managementResponse.json();

        if (topperData.success) {
          setTopperCount(topperData.toppers.length);
        }

        if (managementData.success) {
          setManagementCount(managementData.management.length);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      }
    }

    fetchCounts();
  }, []);

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto w-full max-w-6xl">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">
            School Admin Dashboard
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
            Manage your school&apos;s website content.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  Topper Collages
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage the topper images displayed on the homepage.
                </p>
              </div>

              <span className="text-2xl">🏆</span>
            </div>

            <p className="mt-5 text-2xl font-bold">
              {topperCount}
            </p>

            <p className="text-sm text-gray-500">
              {topperCount === 1 ? "collage" : "collages"}
            </p>

            <Link
              href="/admin/toppers"
              className="mt-6 inline-block rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Manage Toppers
            </Link>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold">
                  School Management
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage the management members displayed on the website.
                </p>
              </div>

              <span className="text-2xl">👥</span>
            </div>

            <p className="mt-5 text-2xl font-bold">
              {managementCount}
            </p>

            <p className="text-sm text-gray-500">
              {managementCount === 1 ? "member" : "members"}
            </p>

            <Link
              href="/admin/management"
              className="mt-6 inline-block rounded-lg bg-black px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
            >
              Manage Management
            </Link>
            
          </div>
        </div>
      </div>
    </main>
  );
}
