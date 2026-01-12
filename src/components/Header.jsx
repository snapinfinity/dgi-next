"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about#clientele", label: "Clientele" },
];

export default function Header({ isScrolled, onSubscribeClick }) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
        <nav className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <ul className="flex items-center gap-2 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:opacity-70 ${
                    isScrolled ? "text-gray-900" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center Logo (only visible when scrolled) */}
          <div
            className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 ${
              isScrolled ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Link href="/" className="block">
              <h1
                className={`font-serif text-2xl tracking-wide ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                <span className="font-light">decograph</span>
                <span className="block text-xs tracking-[0.3em] uppercase">
                  Interiors
                </span>
              </h1>
            </Link>
          </div>

          {/* Right - Contact */}
          <Link
            href="/contact"
            className={`px-3 py-2 text-sm font-medium transition-colors hover:opacity-70 ${
              isScrolled ? "text-gray-900" : "text-white"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
