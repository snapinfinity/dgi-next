"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import AboutHeroSection from "@/components/AboutHeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyDecographSection from "@/components/WhyDecographSection";
import PortfolioPreviewSection from "@/components/PortfolioPreviewSection";
import ClienteleSection from "@/components/ClienteleSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-14 md:pt-16">
      {/* Header */}
      <Header isWhiteBg={true} isDark={true} hideGradient={!hasScrolled} />

      {/* About Hero Section */}
      <AboutHeroSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Why Decograph Section */}
      <WhyDecographSection />

      {/* Portfolio Preview Section */}
      <PortfolioPreviewSection />

      {/* Clientele Section */}
      <ClienteleSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
