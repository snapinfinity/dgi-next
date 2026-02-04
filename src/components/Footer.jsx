"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

export default function Footer({ onSubscribeClick, showBorder = false }) {
  const connectTextRef = useRef(null);
  const socialsRef = useRef(null);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const locationTextRef = useRef(null);
  const locationsRef = useRef(null);
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
    if (isMobile) return; // Mobile uses CSS animations
    
    const tl = gsap.timeline();
    
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
    setIsConnectOpen(!isConnectOpen);
  };

  const handleLocationClick = () => {
    if (isMobile) return; // Mobile uses CSS animations
    
    const tl = gsap.timeline();
    
    if (!isLocationOpen) {
      tl.to([connectTextRef.current, socialsRef.current, locationTextRef.current, locationsRef.current], { x: -10, duration: 0.15, ease: "power1.out" })
        .to(locationTextRef.current, { y: -30, duration: 0.3, ease: "power1.out" })
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
    setIsLocationOpen(!isLocationOpen);
  };

  // Mobile toggle handlers
  const toggleMobileConnect = () => {
    if (!isMobile) return;
    setIsConnectOpen(!isConnectOpen);
  };

  const toggleMobileLocation = () => {
    if (!isMobile) return;
    setIsLocationOpen(!isLocationOpen);
  };

  return (
    <footer className="relative py-8 px-6 lg:px-20 bg-white">
      <div className="mx-auto">
        {showBorder && <div className="border-t border-black mb-32" />}
        
        {/* Mobile Footer */}
        <div className="md:hidden">
          {/* Top row - Connect and Location with icons */}
          <div className="flex justify-between items-start mb-8">
            {/* Connect Section */}
            <div>
              <button
                onClick={toggleMobileConnect}
                className={`flex items-center gap-2 text-base font-medium mb-3 transition-colors ${isConnectOpen ? "text-decograph-red" : "text-gray-900"}`}
              >
                Connect
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isConnectOpen ? "rotate-180" : ""}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${isConnectOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <a href="#" className="text-sm text-gray-600 hover:text-decograph-red transition-colors">
                  X (Twitter)
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-decograph-red transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-sm text-gray-600 hover:text-decograph-red transition-colors">
                  YouTube
                </a>
              </div>
            </div>

            {/* Location Section */}
            <div className="text-right">
              <button
                onClick={toggleMobileLocation}
                className={`flex items-center gap-2 text-base font-medium mb-3 transition-colors ${isLocationOpen ? "text-decograph-red" : "text-gray-900"}`}
              >
                Location
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isLocationOpen ? "rotate-180" : ""}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`flex flex-col gap-2 overflow-hidden transition-all duration-300 ${isLocationOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                <span className="text-sm text-gray-600">Dubai, UAE</span>
              </div>
            </div>
          </div>

          {/* Subscribe button */}
          <button
            onClick={onSubscribeClick}
            className="w-full py-3 border border-decograph-red text-decograph-red text-center font-medium hover:bg-decograph-red hover:text-white transition-colors mb-6"
          >
            Subscribe to Newsletter
          </button>

          {/* Bottom links */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <Link href="/privacy-policy" className="hover:text-decograph-red transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-conditions" className="hover:text-decograph-red transition-colors">
              Terms & Conditions
            </Link>
          </div>
        </div>

        {/* Desktop Footer - Original GSAP animation style */}
        <div className="hidden md:flex flex-row items-start justify-between gap-4 text-gray-900 helvetica-regular text-base leading-none tracking-normal">
          {/* Left Links */}
          <div className="flex flex-row items-center gap-6">
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
            
            <span className="">
              Powered by{' '}
              <a href="https://snapinfinity.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-decograph-red transition-colors">Snapinfinity</a>
            </span>
          </div>

          {/* Right Links */}
          <div className="flex flex-row items-center gap-6">
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
                className="absolute bottom-0 left-0 flex-col items-start gap-2"
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
                className="absolute bottom-0 left-0 flex-col items-start gap-2"
                style={{ opacity: 0, display: 'none' }}
              >
                <span className="hover:text-decograph-red transition-colors whitespace-nowrap">
                  Dubai, UAE
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
