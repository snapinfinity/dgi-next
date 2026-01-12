"use client";

import WhiteHeader from "@/components/WhiteHeader";
import AboutHeroSection from "@/components/AboutHeroSection";
import ServicesSection from "@/components/ServicesSection";
import WhyDecographSection from "@/components/WhyDecographSection";
import PortfolioPreviewSection from "@/components/PortfolioPreviewSection";
import ClienteleSection from "@/components/ClienteleSection";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <WhiteHeader />

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
