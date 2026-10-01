"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { adminNavItems } from "@/lib/constants/adminNavigation";

export default function AdminSidebar() {
  async function handleLogout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/admin/login";
        },
      },
    });
  }

  return (
    <aside className="hidden w-64 shrink-0 border-r bg-white md:block">
      <div className="sticky top-0 flex h-screen flex-col p-6">
        <h2 className="text-xl font-bold">
          School Admin
        </h2>

        <nav className="mt-8 flex flex-col gap-2">
          {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}


        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}