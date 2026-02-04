"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/about#services", label: "Services" },
  { href: "/about#portfolio", label: "Portfolio" },
  { href: "/about#clientele", label: "Clientele" },
];

export default function Header({ isScrolled, onSubscribeClick, isDark = false, isWhiteBg = false, hideGradient = false, hideLogo = false }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const pathname = usePathname();
  
  // Intersection Observer for section detection on about page
  useEffect(() => {
    if (pathname !== "/about") {
      setActiveSection("");
      return;
    }

    const sections = ["services", "portfolio", "clientele"];
    const observers = [];

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions = {
      rootMargin: "-40% 0px -40% 0px", // Middle 20% of viewport triggers
      threshold: 0,
    };

    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(element);
        observers.push(observer);
      }
    });

    // Handle scroll to detect when at top (About section)
    const handleScroll = () => {
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Check if a link is active
  const isLinkActive = (href) => {
    // For hash links on about page
    if (href.includes("#") && pathname === "/about") {
      const hash = href.split("#")[1];
      return activeSection === hash;
    }
    
    // For /about without hash - active when no section is in view
    if (href === "/about" && pathname === "/about") {
      return activeSection === "";
    }
    
    // For other pages
    if (!href.includes("#")) {
      return pathname === href || pathname.startsWith(href + "/");
    }
    
    return false;
  };
  
  const getTextColor = (href) => {
    // If menu is open, always use black text for visibility on white background
    if (isMenuOpen) return "text-black";
    
    const isActive = isLinkActive(href);
    if (isActive) {
      // When nav text is white (isDark=false), highlight in black; otherwise red
      return isDark ? "text-decograph-red" : "text-black";
    }
    return isDark ? "text-black" : "text-white";
  };
  
  // If menu is open, force red logo (since background is white)
  const logoSrc = (isWhiteBg || isMenuOpen) ? "/images/logo-red.png" : "/images/logo.png";
  const iconColorClass = isDark ? "stroke-decograph-red" : "stroke-white";
  const desktopBgClass = isWhiteBg ? "lg:bg-white" : "lg:bg-transparent";
  
  // Toggle handler
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Icon line color: Black if menu open or isDark, White otherwise
  const menuIconColor = (isMenuOpen || isDark) ? "bg-black" : "bg-white";

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-white ${desktopBgClass} transition-all duration-300`}>
      <div className="w-full px-4 lg:px-6 xl:px-8 relative z-50">
        <nav className="flex items-center justify-between h-20 relative">
          {/* Mobile Menu Icon (Animated) */}
          <button 
            onClick={toggleMenu}
            className="lg:hidden p-2 -ml-2 hover:opacity-70 transition-opacity flex flex-col justify-center gap-[6px] w-8 h-8"
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
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:hidden">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img 
                src="/images/logo-red.png"
                alt="Decograph Interiors" 
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Left Navigation (Desktop) */}
          <ul className="hidden lg:flex items-center gap-0 xl:gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`px-3 py-2 text-sm font-normal ${getTextColor(link.href)} transition-colors duration-300 ${isDark ? 'hover:text-decograph-red' : 'hover:text-black'}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Center Logo (Desktop) */}
          {!hideLogo && (
            <Link href="/" className="hidden lg:block absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <img 
                src={logoSrc}
                alt="Decograph Interiors" 
                className="w-[75px] md:w-[98px] lg:w-[120px] h-auto"
              />
            </Link>
          )}

          {/* Right - Contact (Desktop) */}
          <Link
            href="/contact"
            className={`hidden lg:block px-3 py-2 text-sm font-normal ${getTextColor("/contact")} transition-colors duration-300 ${isDark ? 'hover:text-decograph-red' : 'hover:text-black'}`}
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-500 ease-in-out lg:hidden flex flex-col justify-start items-start pt-24 px-6 ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        <ul className="flex flex-col items-start gap-0 w-full">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);
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
        
        {/* Powered by Snapinfinity */}
        <div className="absolute bottom-8 left-6 right-6">
          <span className="text-xs text-gray-400">
            Powered by{' '}
            <a href="https://snapinfinity.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-decograph-red transition-colors">Snapinfinity</a>
          </span>
        </div>
      </div>
      
      {/* Mobile Gradient - Always Visible (Hidden when menu is open or hideGradient is true) */}
      {!isMenuOpen && !hideGradient && (
        <div 
          className="lg:hidden absolute left-0 right-0 h-16 top-full -mt-px"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.98759) 9.9%, hsla(0, 0%, 100%, 0.96314) 19.5%, hsla(0, 0%, 100%, 0.926) 28.7%, hsla(0, 0%, 100%, 0.87667) 37.3%, hsla(0, 0%, 100%, 0.81624) 45.2%, hsla(0, 0%, 100%, 0.74699) 52.3%, hsla(0, 0%, 100%, 0.66999) 58.7%, hsla(0, 0%, 100%, 0.58775) 64.4%, hsla(0, 0%, 100%, 0.50184) 69.5%, hsla(0, 0%, 100%, 0.41394) 74.1%, hsla(0, 0%, 100%, 0.3238) 78.4%, hsla(0, 0%, 100%, 0.23172) 82.6%, hsla(0, 0%, 100%, 0.1409) 86.9%, hsla(0, 0%, 100%, 0.0541) 92%, hsla(0, 0%, 100%, 0))'
          }}
        />
      )}

      {/* Desktop fade effect - only visible when white background and hideGradient is false */}
      {isWhiteBg && !hideGradient && (
        <div 
          className="hidden lg:block absolute left-0 right-0 h-24 -bottom-24"
          style={{
            backgroundImage: 'linear-gradient(hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.98759) 9.9%, hsla(0, 0%, 100%, 0.96314) 19.5%, hsla(0, 0%, 100%, 0.926) 28.7%, hsla(0, 0%, 100%, 0.87667) 37.3%, hsla(0, 0%, 100%, 0.81624) 45.2%, hsla(0, 0%, 100%, 0.74699) 52.3%, hsla(0, 0%, 100%, 0.66999) 58.7%, hsla(0, 0%, 100%, 0.58775) 64.4%, hsla(0, 0%, 100%, 0.50184) 69.5%, hsla(0, 0%, 100%, 0.41394) 74.1%, hsla(0, 0%, 100%, 0.3238) 78.4%, hsla(0, 0%, 100%, 0.23172) 82.6%, hsla(0, 0%, 100%, 0.1409) 86.9%, hsla(0, 0%, 100%, 0.0541) 92%, hsla(0, 0%, 100%, 0))'
          }}
        />
      )}
    </header>
  );
}
