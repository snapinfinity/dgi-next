"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Twitter, Instagram, Youtube } from "lucide-react";
import gsap from "gsap";

export default function Footer({ onSubscribeClick, showBorder = false }) {
  const connectTextRef = useRef(null);
  const socialsRef = useRef(null);
  const socialsMobileRef = useRef(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const locationTextRef = useRef(null);
  const locationsRef = useRef(null);
  const locationsMobileRef = useRef(null);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleConnectClick = () => {
    const tl = gsap.timeline();
    
    if (isMobile) {
      // Mobile: simple expand/collapse below
      if (!isConnectOpen) {
        tl.to(socialsMobileRef.current, { 
          height: "auto",
          opacity: 1, 
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        tl.to(socialsMobileRef.current, { 
          height: 0,
          opacity: 0, 
          duration: 0.2,
          ease: "power2.in"
        });
      }
    } else {
      // Desktop: Move left first, then up
      if (!isConnectOpen) {
        tl.to([connectTextRef.current, socialsRef.current], { x: -20, duration: 0.15, ease: "power1.out" })
          .to(connectTextRef.current, { y: -85, duration: 0.3, ease: "power1.out" })
          .to(socialsRef.current, { 
            display: "flex", 
            opacity: 1, 
            duration: 0.3,
            ease: "power2.out"
          }, "-=0.2");
      } else {
        tl.to(socialsRef.current, { opacity: 0, duration: 0.2, display: "none" })
          .to(connectTextRef.current, { y: 0, duration: 0.2 })
          .to([connectTextRef.current, socialsRef.current], { x: 0, duration: 0.15 });
      }
    }
    setIsConnectOpen(!isConnectOpen);
  };

  const handleLocationClick = () => {
    const tl = gsap.timeline();
    
    if (isMobile) {
      // Mobile: simple expand/collapse below
      if (!isLocationOpen) {
        tl.to(locationsMobileRef.current, { 
          height: "auto",
          opacity: 1, 
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        tl.to(locationsMobileRef.current, { 
          height: 0,
          opacity: 0, 
          duration: 0.2,
          ease: "power2.in"
        });
      }
    } else {
      // Desktop: Move left first (both Connect and Location sections), then up
      if (!isLocationOpen) {
        tl.to([connectTextRef.current, socialsRef.current, locationTextRef.current, locationsRef.current], { x: -10, duration: 0.15, ease: "power1.out" })
          .to(locationTextRef.current, { y: -85, duration: 0.3, ease: "power1.out" })
          .to(locationsRef.current, { 
            display: "flex", 
            opacity: 1, 
            duration: 0.3,
            ease: "power2.out"
          }, "-=0.2");
      } else {
        tl.to(locationsRef.current, { opacity: 0, duration: 0.2, display: "none" })
          .to(locationTextRef.current, { y: 0, duration: 0.2 })
          .to([connectTextRef.current, socialsRef.current, locationTextRef.current, locationsRef.current], { x: 0, duration: 0.15 });
      }
    }
    setIsLocationOpen(!isLocationOpen);
  };

  return (
    <footer className="relative py-8 px-6 lg:px-20 bg-white">
      <div className="mx-auto">
        {showBorder && <div className="border-t border-black mb-6" />}
        <div className="flex flex-row items-start justify-between md:justify-between gap-8 md:gap-4 text-gray-900 helvetica-regular text-base leading-none tracking-normal">
          {/* Left Links - vertical list on mobile */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <Link
              href="/privacy-policy"
              className="hover:text-decograph-red transition-colors"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms-conditions"
              className="hover:text-decograph-red transition-colors"
            >
              Terms & Conditions
            </Link>
          </div>

          {/* Right Links - vertical list on mobile, centered */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
            <div className="relative flex flex-col items-start">
              <button
                ref={connectTextRef}
                onClick={handleConnectClick}
                className={`hover:text-decograph-red transition-colors cursor-pointer ${isConnectOpen ? "text-decograph-red" : ""}`}
              >
                Connect
              </button>
              
              {/* Social Icons - Desktop (absolute positioned) */}
              <div 
                ref={socialsRef}
                className="absolute bottom-0 left-0 hidden md:hidden flex-col items-start gap-2"
                style={{ opacity: 0, display: 'none' }}
              >
                <a href="#" className="hover:text-decograph-red transition-colors whitespace-nowrap">
                  X
                </a>
                <a href="#" className="hover:text-decograph-red transition-colors whitespace-nowrap">
                  Instagram
                </a>
                <a href="#" className="hover:text-decograph-red transition-colors whitespace-nowrap">
                  YouTube
                </a>
              </div>

              {/* Social Icons - Mobile (inline expand) */}
              <div 
                ref={socialsMobileRef}
                className="md:hidden flex-col items-start gap-2 overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <a href="#" className="hover:text-decograph-red transition-colors whitespace-nowrap block pt-2">
                  X
                </a>
                <a href="#" className="hover:text-decograph-red transition-colors whitespace-nowrap block">
                  Instagram
                </a>
                <a href="#" className="hover:text-decograph-red transition-colors whitespace-nowrap block">
                  YouTube
                </a>
              </div>
            </div>

            <div className="relative flex flex-col items-start">
              <button
                ref={locationTextRef}
                onClick={handleLocationClick}
                className={`hover:text-decograph-red transition-colors cursor-pointer ${isLocationOpen ? "text-decograph-red" : ""}`}
              >
                Location
              </button>
              
              {/* Locations List - Desktop (absolute positioned) */}
              <div 
                ref={locationsRef}
                className="absolute bottom-0 left-0 hidden md:hidden flex-col items-start gap-2"
                style={{ opacity: 0, display: 'none' }}
              >
                <span className="hover:text-decograph-red transition-colors whitespace-nowrap">
                  Mumbai
                </span>
                <span className="hover:text-decograph-red transition-colors whitespace-nowrap">
                  Delhi
                </span>
                <span className="hover:text-decograph-red transition-colors whitespace-nowrap">
                  Kolkata
                </span>
              </div>

              {/* Locations List - Mobile (inline expand) */}
              <div 
                ref={locationsMobileRef}
                className="md:hidden flex-col items-start gap-2 overflow-hidden"
                style={{ height: 0, opacity: 0 }}
              >
                <span className="hover:text-decograph-red transition-colors whitespace-nowrap block pt-2">
                  Mumbai
                </span>
                <span className="hover:text-decograph-red transition-colors whitespace-nowrap block">
                  Delhi
                </span>
                <span className="hover:text-decograph-red transition-colors whitespace-nowrap block">
                  Kolkata
                </span>
              </div>
            </div>

            <button
              onClick={onSubscribeClick}
              className="hover:text-decograph-red transition-colors cursor-pointer"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
