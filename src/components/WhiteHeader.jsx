"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about#clientele", label: "Clientele" },
];

export default function WhiteHeader() {
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
        <nav className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <ul className="flex items-center gap-2 lg:gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors hover:text-decograph-red ${
                    isActive(link.href) ? "text-decograph-red" : "text-gray-900"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2">
            <h1 className="font-serif text-2xl tracking-wide text-gray-900">
              <span className="font-light">decograph</span>
              <span className="block text-xs tracking-[0.3em] uppercase text-center">
                Interiors
              </span>
            </h1>
          </Link>

          {/* Right - Contact */}
          <Link
            href="/contact"
            className={`px-3 py-2 text-sm font-medium transition-colors hover:text-decograph-red ${
              isActive("/contact") ? "text-decograph-red" : "text-gray-900"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
