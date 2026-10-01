"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { adminNavItems } from "@/lib/constants/adminNavigation";

export default function AdminMobileSidebar() {
  const [open, setOpen] = useState(false);

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
    <>
      {/* Mobile top bar */}
      <header className="flex h-16 items-center gap-3 border-b bg-white px-4 md:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg border px-3 py-2 text-lg"
          aria-label="Open admin menu"
        >
          ☰
        </button>

        <h2 className="text-lg font-bold">
          School Admin
        </h2>
      </header>

      {/* Dark overlay */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          aria-label="Close admin menu"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 bg-white shadow-xl transition-transform duration-300 md:hidden ${open ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-lg font-bold">
            School Admin
          </h2>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-md border px-3 py-2 text-sm"
            aria-label="Close admin menu"
          >
            ✕
          </button>
        </div>

        <nav className="p-4">
          <div className="flex flex-col gap-1">
            {adminNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm font-medium hover:bg-gray-100"
            >
              {item.label}
            </Link>
          ))}
            

            

            <button
              onClick={handleLogout}
              className="mt-auto rounded-lg px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        </nav>
      </aside>
    </>
  );
}
