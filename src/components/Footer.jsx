"use client";

import Link from "next/link";

export default function Footer({ onSubscribeClick }) {
  return (
    <footer className="relative py-8 px-6 lg:px-24 bg-gradient-to-t from-white via-white to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-gray-900 text-sm">
          {/* Left Links */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:opacity-70 transition-opacity"
            >
              Privacy Policy
            </Link>
            <Link href="/report" className="hover:opacity-70 transition-opacity">
              Report
            </Link>
            <Link
              href="/terms-conditions"
              className="hover:opacity-70 transition-opacity"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              href="/connect"
              className="hover:opacity-70 transition-opacity"
            >
              Connect
            </Link>
            <Link
              href="/location"
              className="hover:opacity-70 transition-opacity"
            >
              Location
            </Link>
            <button
              onClick={onSubscribeClick}
              className="hover:opacity-70 transition-opacity cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
