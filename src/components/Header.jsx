"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#services", label: "Services" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about#clientele", label: "Clientele" },
];

export default function Header({ isScrolled, onSubscribeClick, isDark = false, isWhiteBg = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const getTextColor = (href) => {
    // If menu is open, always use black text for visibility on white background
    if (isMenuOpen) return "text-black";
    
    const isActive = href === "/" ? pathname === "/" : pathname.startsWith(href);
    if (isActive) {
      // When nav text is white (isDark=false), highlight in black; otherwise red
      return isDark ? "text-decograph-red" : "text-black";
    }
    return isDark ? "text-black" : "text-white";
  };
  
  // If menu is open, force red logo (since background is white)
  const logoSrc = (isWhiteBg || isMenuOpen) ? "/images/logo-red.png" : "/images/logo.png";
  const iconColorClass = isDark ? "stroke-decograph-red" : "stroke-white";
  const desktopBgClass = isWhiteBg ? "md:bg-white" : "md:bg-transparent";
  
  // Toggle handler
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Icon line color: Black if menu open or isDark, White otherwise
  const menuIconColor = (isMenuOpen || isDark) ? "bg-black" : "bg-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white ${desktopBgClass} transition-all duration-300`}>
      <div className="w-full px-4 md:px-6 lg:px-8 relative z-50">
        <nav className="flex items-center justify-between h-20 relative">
          {/* Mobile Menu Icon (Animated) */}
          <button 
            onClick={toggleMenu}
            className="md:hidden p-2 -ml-2 hover:opacity-70 transition-opacity flex flex-col justify-center gap-[6px] w-8 h-8"
            aria-label="Toggle Menu"
          >
            <span 
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out origin-center ${isMenuOpen ? "rotate-45 translate-y-[4px]" : ""}`}
            />
            <span 
              className={`block w-6 h-0.5 bg-black transition-transform duration-300 ease-in-out origin-center ${isMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""}`}
            />
          </button>

          {/* Mobile Logo (Center) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:hidden">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="/images/logo-red.png"
                alt="Decograph Interiors" 
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Left Navigation (Desktop) */}
          <ul className="hidden md:flex items-center gap-0 lg:gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-normal ${getTextColor(link.href)} transition-colors duration-300 hover:opacity-70`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right - Contact (Desktop) */}
          <Link
            href="/contact"
            className={`hidden md:block px-3 py-2 text-sm font-normal ${getTextColor("/contact")} transition-colors duration-300 hover:opacity-70`}
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out md:hidden flex flex-col justify-start items-start pt-24 px-6 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <ul className="flex flex-col items-start gap-0 w-full">
          {navLinks.map((link) => {
            const isActive = link.href === "/" ? pathname === "/" : pathname === link.href || pathname.startsWith(link.href.split('#')[0]) && link.href.includes('#');
            return (
              <li key={link.href} className="w-full text-left">
                <Link
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-5xl font-normal ${isActive ? 'text-decograph-red' : 'text-black'} hover:text-decograph-red transition-colors uppercase leading-[0.95] block w-full`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
          <li className="w-full text-left">
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className={`text-5xl font-normal ${pathname === '/contact' ? 'text-decograph-red' : 'text-black'} hover:text-decograph-red transition-colors uppercase leading-[0.85] block w-full`}
            >
              Contact
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Mobile Gradient - Always Visible (Hidden when menu is open to be clean) */}
      {!isMenuOpen && (
        <div 
          className="md:hidden absolute left-0 right-0 h-16 top-full -mt-px"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.98759) 9.9%, hsla(0, 0%, 100%, 0.96314) 19.5%, hsla(0, 0%, 100%, 0.926) 28.7%, hsla(0, 0%, 100%, 0.87667) 37.3%, hsla(0, 0%, 100%, 0.81624) 45.2%, hsla(0, 0%, 100%, 0.74699) 52.3%, hsla(0, 0%, 100%, 0.66999) 58.7%, hsla(0, 0%, 100%, 0.58775) 64.4%, hsla(0, 0%, 100%, 0.50184) 69.5%, hsla(0, 0%, 100%, 0.41394) 74.1%, hsla(0, 0%, 100%, 0.3238) 78.4%, hsla(0, 0%, 100%, 0.23172) 82.6%, hsla(0, 0%, 100%, 0.1409) 86.9%, hsla(0, 0%, 100%, 0.0541) 92%, hsla(0, 0%, 100%, 0))'
          }}
        />
      )}

      {/* Desktop fade effect - only visible when white background */}
      {isWhiteBg && (
        <div 
          className="hidden md:block absolute left-0 right-0 h-24 -bottom-24"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.98759) 9.9%, hsla(0, 0%, 100%, 0.96314) 19.5%, hsla(0, 0%, 100%, 0.926) 28.7%, hsla(0, 0%, 100%, 0.87667) 37.3%, hsla(0, 0%, 100%, 0.81624) 45.2%, hsla(0, 0%, 100%, 0.74699) 52.3%, hsla(0, 0%, 100%, 0.66999) 58.7%, hsla(0, 0%, 100%, 0.58775) 64.4%, hsla(0, 0%, 100%, 0.50184) 69.5%, hsla(0, 0%, 100%, 0.41394) 74.1%, hsla(0, 0%, 100%, 0.3238) 78.4%, hsla(0, 0%, 100%, 0.23172) 82.6%, hsla(0, 0%, 100%, 0.1409) 86.9%, hsla(0, 0%, 100%, 0.0541) 92%, hsla(0, 0%, 100%, 0))'
          }}
        />
      )}
    </header>
  );
}
