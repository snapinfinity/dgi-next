"use client";

import Image from "next/image";

// Client logos count
const clientCount = 10;

export default function ClienteleSection() {
  return (
    <section id="clientele" className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="about-heading text-decograph-red mb-4">
          Clientele
        </h2>
        <p className="about-text text-gray-900 max-w-xl mx-auto">
          Building long-term partnerships with leading organizations across
          diverse industries.
        </p>
      </div>

      {/* Client Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
        {Array.from({ length: clientCount }).map((_, idx) => (
          <div
            key={idx}
            className="w-32 h-16 relative grayscale hover:grayscale-0 transition-all duration-300"
          >
            <Image
              src="/images/client-1.png"
              alt={`Client ${idx + 1}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
