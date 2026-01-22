"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about#clientele", label: "Clientele" },
];

export default function Header({ isScrolled, onSubscribeClick, isDark = false, isWhiteBg = false }) {
  const textColorClass = isDark ? "text-black" : "text-white";
  const bgClass = isWhiteBg ? "bg-white" : "bg-transparent";
  
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${bgClass} transition-all duration-300`}>
      <div className="w-full px-4 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-20">
          {/* Left Navigation */}
          <ul className="flex items-center gap-0 lg:gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-normal ${textColorClass} transition-colors duration-300 hover:opacity-70`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right - Contact */}
          <Link
            href="/contact"
            className={`px-3 py-2 text-sm font-normal ${textColorClass} transition-colors duration-300 hover:opacity-70`}
          >
            Contact
          </Link>
        </nav>
      </div>
      
      {/* Bottom fade effect - only visible when white background */}
      {isWhiteBg && (
        <div 
          className="absolute left-0 right-0 h-24 -bottom-24"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.98759) 9.9%, hsla(0, 0%, 100%, 0.96314) 19.5%, hsla(0, 0%, 100%, 0.926) 28.7%, hsla(0, 0%, 100%, 0.87667) 37.3%, hsla(0, 0%, 100%, 0.81624) 45.2%, hsla(0, 0%, 100%, 0.74699) 52.3%, hsla(0, 0%, 100%, 0.66999) 58.7%, hsla(0, 0%, 100%, 0.58775) 64.4%, hsla(0, 0%, 100%, 0.50184) 69.5%, hsla(0, 0%, 100%, 0.41394) 74.1%, hsla(0, 0%, 100%, 0.3238) 78.4%, hsla(0, 0%, 100%, 0.23172) 82.6%, hsla(0, 0%, 100%, 0.1409) 86.9%, hsla(0, 0%, 100%, 0.0541) 92%, hsla(0, 0%, 100%, 0))'
          }}
        />
      )}
    </header>
  );
}
