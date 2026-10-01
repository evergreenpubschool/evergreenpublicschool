"use client";

import { useState } from "react";
import Link from "next/link";
import {
  galleryItems,
  navItems,
} from "@/lib/constants/navigation";
import Image from "next/image";
import logo from "@/app/favicon.ico";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 border-b border-[#DDE7E1] bg-[#F5F8FC]/95 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex min-h-[80px] items-center py-3 sm:min-h-[90px] sm:py-4">

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="mr-2 shrink-0 rounded-xl border border-[#DDE7E1] bg-white px-3 py-2.5 text-lg text-[#26352B] shadow-sm transition hover:bg-[#E8F4EB] hover:text-[#315D3E] md:hidden"
            aria-label="Open navigation menu"
          >
            ☰
          </button>

          {/* School Logo / Name */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex min-w-0 shrink items-center gap-2 text-[#26352B] transition-colors hover:text-[#4E8560]"
          >
            {/* Logo */}
            <Image
              src={logo}
              alt="Ever Green Public Sr. Sec. School"
              width={28}
              height={28}
              className="h-7 w-7 shrink-0 object-contain sm:h-9 sm:w-9"
            />

            {/* School Name */}
            <span className="min-w-0 font-renfrew text-[14px] leading-5 tracking-[0.03em] sm:text-[18px] sm:leading-6 sm:tracking-[0.04em]">
              EVER GREEN PUBLIC SR. SEC. SCHOOL
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="ml-auto hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              if (item.label === "Gallery") {
                return (
                  <div
                    key={item.label}
                    className="group relative"
                  >
                    {/* Gallery Button */}
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-xl px-4 py-2.5 text-[18px] font-medium text-[#536158] transition-all hover:bg-[#E8F4EB] hover:text-[#315D3E]"
                    >
                      Gallery
                      <span className="text-xs">▾</span>
                    </button>

                    {/* Desktop Dropdown */}
                    <div className="invisible absolute right-0 top-full z-50 w-52 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="overflow-hidden rounded-2xl border border-[#DDE7E1] bg-white p-2 shadow-lg">
                        {galleryItems.map((galleryItem) => (
                          <Link
                            key={galleryItem.href}
                            href={galleryItem.href}
                            className="block rounded-xl px-4 py-3 text-[17px] font-medium text-[#536158] transition-colors hover:bg-[#E8F4EB] hover:text-[#315D3E]"
                          >
                            {galleryItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              {/* Normal Desktop Link */}
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-4 py-2.5 text-[18px] font-medium text-[#536158] transition-all hover:bg-[#E8F4EB] hover:text-[#315D3E]"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dark Overlay */}
      {open && (
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[#26352B]/30 backdrop-blur-[2px] md:hidden"
          aria-label="Close navigation menu"
        />
      )}

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-80 bg-[#F5F8FC] shadow-2xl transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between border-b border-[#DDE7E1] p-5">
          <h2 className="font-renfrew max-w-[220px] text-base font-bold leading-6 text-[#26352B]">
            Ever Green Public Sr. Sec. School
          </h2>

          <button
            type="button"
            onClick={() => {
              setOpen(false);
              setGalleryOpen(false);
            }}
            className="rounded-xl border border-[#DDE7E1] bg-white px-3 py-2 text-sm text-[#536158] shadow-sm transition hover:bg-[#FDF0F4] hover:text-[#8C5365]"
            aria-label="Close navigation menu"
          >
            ✕
          </button>
        </div>

        {/* Sidebar Navigation */}
        <nav className="p-4">
          <div className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              {/* Mobile Gallery */}
              if (item.label === "Gallery") {
                return (
                  <div key={item.label}>
                    <button
                      type="button"
                      onClick={() =>
                        setGalleryOpen((current) => !current)
                      }
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-sm font-medium text-[#536158] transition-all hover:bg-[#E8F4EB] hover:text-[#315D3E]"
                      aria-expanded={galleryOpen}
                    >
                      <span>Gallery</span>

                      <span
                        className={`text-xs transition-transform duration-200 ${
                          galleryOpen ? "rotate-180" : ""
                        }`}
                      >
                        ▾
                      </span>
                    </button>

                    {/* Mobile Gallery Submenu */}
                    {galleryOpen && (
                      <div className="ml-3 mt-1 space-y-1 border-l-2 border-[#D8C7F0] pl-3">
                        {galleryItems.map((galleryItem) => (
                          <Link
                            key={galleryItem.href}
                            href={galleryItem.href}
                            onClick={() => {
                              setOpen(false);
                              setGalleryOpen(false);
                            }}
                            className="block rounded-xl px-4 py-3 text-sm text-[#68736C] transition-colors hover:bg-[#F4EFFB] hover:text-[#8065A6]"
                          >
                            {galleryItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              {/* Normal Mobile Link */}
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3.5 text-sm font-medium text-[#536158] transition-all hover:bg-[#E8F4EB] hover:text-[#315D3E]"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </aside>
    </nav>
  );
}
