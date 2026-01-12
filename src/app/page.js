"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import PortfolioGrid from "@/components/PortfolioGrid";
import Footer from "@/components/Footer";
import PortalPopup from "@/components/PortalPopup";
import SubscribeModal from "@/components/SubscribeModal";

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubscribeOpen, setSubscribeOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scroll state change when user scrolls past 100px
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openSubscribe = () => setSubscribeOpen(true);
  const closeSubscribe = () => setSubscribeOpen(false);

  return (
    <>
      <div className="min-h-screen bg-decograph-red">
        {/* Header/Navigation */}
        <Header isScrolled={isScrolled} onSubscribeClick={openSubscribe} />

        {/* Hero Section with Carousel */}
        <HeroCarousel isScrolled={isScrolled} />

        {/* About Section */}
        <AboutSection />

        {/* Portfolio Gallery */}
        <PortfolioGrid />

        {/* Footer */}
        <Footer onSubscribeClick={openSubscribe} />
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
