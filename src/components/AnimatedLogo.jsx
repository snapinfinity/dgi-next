"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedLogo({ isRed = false }) {
  const logoRef = useRef(null);

  useEffect(() => {
    if (!logoRef.current) return;

    // Tie logo animation directly to scroll position using scroll-based trigger
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          // Calculate progress within first viewport height
          const scrollY = window.scrollY;
          const vh = window.innerHeight;
          const progress = Math.min(scrollY / vh, 1);
          
          // Apply transforms based on scroll progress
          gsap.set(logoRef.current, {
            y: `${-45 * progress}vh`,
            scale: 1 - (0.85 * progress), // 1 -> 0.15
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const logoSrc = isRed ? "/images/logo-red.png" : "/images/logo.png";
  const shadowStyle = isRed 
    ? {} 
    : { };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <img
        ref={logoRef}
        src={logoSrc}
        alt="Decograph Interiors"
        className="w-[500px] md:w-[650px] lg:w-[800px] h-auto"
        style={shadowStyle}
      />
    </div>
  );
}
