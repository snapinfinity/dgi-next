"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#services", label: "Services", sectionId: "services" },
  { href: "/works", label: "Works", sectionId: "portfolio" },
  { href: "/about#clientele", label: "Clientele", sectionId: "clientele" },
];

export default function WhiteHeader() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const sectionIds = ["services", "portfolio", "clientele"];
    
    // Check if we're above all sections (at the top)
    const handleScroll = () => {
      const firstSection = document.getElementById("services");
      if (firstSection) {
        const rect = firstSection.getBoundingClientRect();
        // If top of first section is below 40% of viewport, we're at the top
        if (rect.top > window.innerHeight * 0.4) {
          setActiveSection(null);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    
    const observers = sectionIds.map((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(sectionId);
            }
          });
        },
        {
          rootMargin: "-20% 0px -60% 0px", // Trigger when section is in upper 40% of viewport
        }
      );

      observer.observe(element);
      return observer;
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((observer) => observer?.disconnect());
    };
  }, [pathname]);

  const isActive = (link) => {
    // If there's an active section, highlight matching link
    if (activeSection && link.sectionId === activeSection) {
      return true;
    }
    // If no section is active, fall back to pathname matching
    if (!activeSection) {
      if (link.href === "/") return pathname === "/";
      if (link.href.includes("#")) return false;
      return pathname.startsWith(link.href);
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="w-full px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <ul className="flex items-center gap-0 lg:gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-normal transition-colors hover:opacity-70 ${
                    isActive(link) ? "text-decograph-red" : "text-black"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <img 
              src="/images/logo-red.png" 
              alt="Decograph Interiors" 
              className="h-12 w-auto"
            />
          </Link>

          {/* Right - Contact */}
          <Link
            href="/contact"
            className={`px-3 py-2 text-sm font-normal transition-colors hover:opacity-70 ${
              pathname === "/contact" ? "text-decograph-red" : "text-black"
            }`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
