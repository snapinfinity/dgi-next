"use client";

import Image from "next/image";

export default function AboutHeroSection() {
  return (
    <section className="border-b border-decograph-red">
      <div className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left - Text Content */}
        <div>
          <h1 className="about-heading text-decograph-red mb-6">
            About
          </h1>
          <p className="about-text text-gray-900">
            Decograph Interiors, where spaces transform, and dreams come to
            life. With a sharp eye for design and an unwavering commitment to
            precision, we specialize in turning ordinary environments into
            extraordinary experiences. Our expertise spans across retail,
            residential, and commercial sectors, encompassing a full suite of
            services from interior design to civil and MEP (Mechanical,
            Electrical, and Plumbing) solutions.
          </p>
        </div>

        {/* Right - Image */}
        <div className="relative">
          <Image
            src="/images/about-hero.webp"
            alt="Decograph Interior Design"
            width={600}
            height={332}
            className="w-full h-auto"
          />
        </div>
        </div>
      </div>
    </section>
  );
}
