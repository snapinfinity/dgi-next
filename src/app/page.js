"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AnimatedLogo from "@/components/AnimatedLogo";
import AboutSection from "@/components/AboutSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";
import PortalPopup from "@/components/PortalPopup";
import SubscribeModal from "@/components/SubscribeModal";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubscribeOpen, setSubscribeOpen] = useState(false);
  const [isNavDark, setIsNavDark] = useState(false);
  const [isNavWhiteBg, setIsNavWhiteBg] = useState(false);
  const [isLogoRed, setIsLogoRed] = useState(false);
  const whiteGradientRef = useRef(null);
  const portfolioRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (!isScrolled && e.deltaY > 0) {
        // Scrolling down - trigger animation
        setIsScrolled(true);
      } else if (isScrolled && e.deltaY < 0 && window.scrollY <= 0) {
        // Scrolling up at top of page - reverse animation
        setIsScrolled(false);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScrolled]);

  useEffect(() => {
    if (isScrolled) {
      // Animate scroll to content using GSAP
      const targetScroll = window.innerHeight;
      gsap.to(window, {
        scrollTo: { y: targetScroll, autoKill: false },
        duration: 0.6,
        ease: "none",
        onComplete: () => {
          ScrollTrigger.refresh();
        }
      });
    } else {
      // Animate scroll back to top
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 0.6,
        ease: "none"
      });
    }
  }, [isScrolled]);

  // ScrollTrigger for nav color change when white gradient reaches top
  useEffect(() => {
    if (!whiteGradientRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: whiteGradientRef.current,
      start: "top top",
      end: "bottom top",
      onEnter: () => setIsNavDark(true),
      onLeaveBack: () => setIsNavDark(false),
    });

    return () => trigger.kill();
  }, []);

  // ScrollTrigger for navbar white bg and red logo when white gradient reaches white color
  useEffect(() => {
    if (!whiteGradientRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: whiteGradientRef.current,
      start: "bottom top+=200",
      end: "bottom top+=200",
      onEnter: () => {
        setIsNavWhiteBg(true);
        setIsLogoRed(true);
      },
      onLeaveBack: () => {
        setIsNavWhiteBg(false);
        setIsLogoRed(false);
      },
    });

    return () => trigger.kill();
  }, []);

  const openSubscribe = () => setSubscribeOpen(true);
  const closeSubscribe = () => setSubscribeOpen(false);

  return (
    <>
      <div className="bg-decograph-red min-h-screen">
        {/* Header/Navigation */}
        <Header isScrolled={isScrolled} onSubscribeClick={openSubscribe} isDark={isNavDark} isWhiteBg={isNavWhiteBg} />

        {/* Hero Section with Carousel (Fixed) */}
        <HeroCarousel />
        
        {/* Animated Logo Overlay */}
        <AnimatedLogo isRed={isLogoRed} />

        {/* Content stack that slides up */}
        <div className="relative z-10 mt-[100vh]">
          {/* Part 1: Gradient Part (Full Screen) */}
          <div 
            className="h-screen w-full"
            style={{
              background: 'linear-gradient(to bottom, rgba(237, 53, 56, 0), rgba(237, 53, 56, 0.015) 8.8%, rgba(237, 53, 56, 0.059) 17.4%, rgba(237, 53, 56, 0.121) 24.8%, rgba(237, 53, 56, 0.193) 31.3%, rgba(237, 53, 56, 0.269) 37.2%, rgba(237, 53, 56, 0.348) 42.8%, rgba(237, 53, 56, 0.429) 48.3%, rgba(237, 53, 56, 0.509) 53.8%, rgba(237, 53, 56, 0.589) 59.4%, rgba(237, 53, 56, 0.667) 65.2%, rgba(237, 53, 56, 0.743) 71.3%, rgba(237, 53, 56, 0.815) 77.8%, rgba(237, 53, 56, 0.883) 84.7%, rgba(237, 53, 56, 0.945) 92.1%, rgb(237, 53, 56))'
            }}
          />
          
          {/* Part 2: About Section (Sticky - stays fixed while content scrolls over) */}
          <AboutSection />

          {/* Spacer for text animation scroll distance */}
          <div className="h-[150vh]" />

          {/* Part 3: Transition Gradient (White fade) - scrolls over About */}
          <div 
            ref={whiteGradientRef}
            className="h-screen w-full relative z-10"
            style={{
              backgroundImage: 'linear-gradient(to top, hsl(0, 0%, 100%), hsla(0, 0%, 100%, 0.94505) 7.9%, hsla(0, 0%, 100%, 0.88294) 15.3%, hsla(0, 0%, 100%, 0.81522) 22.2%, hsla(0, 0%, 100%, 0.7426) 28.7%, hsla(0, 0%, 100%, 0.66692) 34.8%, hsla(0, 0%, 100%, 0.58891) 40.6%, hsla(0, 0%, 100%, 0.50925) 46.2%, hsla(0, 0%, 100%, 0.42866) 51.7%, hsla(0, 0%, 100%, 0.34817) 57.2%, hsla(0, 0%, 100%, 0.2693) 62.8%, hsla(0, 0%, 100%, 0.19309) 68.7%, hsla(0, 0%, 100%, 0.12126) 75.2%, hsla(0, 0%, 100%, 0.05882) 82.6%, hsla(0, 0%, 100%, 0.01457) 91.2%, hsla(0, 0%, 100%, 0))'
            }}
          />

          {/* Part 4: Portfolio Gallery (white background) - scrolls over About */}
          <div ref={portfolioRef} className="relative z-10">
            <PortfolioGrid />

            {/* Footer */}
            <Footer onSubscribeClick={openSubscribe} />
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      {isSubscribeOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.8)"
          onOutsideClick={closeSubscribe}
        >
          <SubscribeModal onClose={closeSubscribe} />
        </PortalPopup>
      )}
    </>
  );
}
