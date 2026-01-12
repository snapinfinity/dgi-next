"use client";

import { useState } from "react";
import WhiteHeader from "@/components/WhiteHeader";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";

// All portfolio images - simulating different project photos
const allImages = [
  // Corporate Offices
  { seed: "corp1", category: "office" },
  { seed: "corp2", category: "office" },
  { seed: "corp3", category: "office" },
  { seed: "corp4", category: "office" },
  { seed: "corp5", category: "office" },
  { seed: "corp6", category: "office" },
  { seed: "corp7", category: "office" },
  { seed: "corp8", category: "office" },
  { seed: "corp9", category: "office" },
  { seed: "corp10", category: "office" },
  // Retail
  { seed: "retail1", category: "retail" },
  { seed: "retail2", category: "retail" },
  { seed: "retail3", category: "retail" },
  { seed: "retail4", category: "retail" },
  { seed: "retail5", category: "retail" },
  { seed: "retail6", category: "retail" },
  { seed: "retail7", category: "retail" },
  { seed: "retail8", category: "retail" },
  { seed: "retail9", category: "retail" },
  { seed: "retail10", category: "retail" },
  // Villas
  { seed: "villa1", category: "villa" },
  { seed: "villa2", category: "villa" },
  { seed: "villa3", category: "villa" },
  { seed: "villa4", category: "villa" },
  { seed: "villa5", category: "villa" },
  { seed: "villa6", category: "villa" },
  { seed: "villa7", category: "villa" },
  { seed: "villa8", category: "villa" },
  { seed: "villa9", category: "villa" },
  { seed: "villa10", category: "villa" },
  // Entertainment
  { seed: "ent1", category: "entertainment" },
  { seed: "ent2", category: "entertainment" },
  { seed: "ent3", category: "entertainment" },
  { seed: "ent4", category: "entertainment" },
  { seed: "ent5", category: "entertainment" },
  { seed: "ent6", category: "entertainment" },
  { seed: "ent7", category: "entertainment" },
  { seed: "ent8", category: "entertainment" },
  { seed: "ent9", category: "entertainment" },
  { seed: "ent10", category: "entertainment" },
  // F&B
  { seed: "cafe1", category: "fnb" },
  { seed: "cafe2", category: "fnb" },
  { seed: "cafe3", category: "fnb" },
  { seed: "cafe4", category: "fnb" },
  { seed: "cafe5", category: "fnb" },
  { seed: "cafe6", category: "fnb" },
  { seed: "cafe7", category: "fnb" },
  { seed: "cafe8", category: "fnb" },
  { seed: "cafe9", category: "fnb" },
  { seed: "cafe10", category: "fnb" },
];

// Generate masonry layout with varying sizes
const generateMasonryLayout = (images) => {
  const sizes = [
    { w: 311, h: 229 },
    { w: 401, h: 217 },
    { w: 349, h: 348 },
    { w: 440, h: 323 },
    { w: 227, h: 229 },
    { w: 282, h: 229 },
    { w: 349, h: 204 },
    { w: 401, h: 344 },
    { w: 440, h: 238 },
    { w: 349, h: 238 },
  ];

  return images.map((img, idx) => ({
    ...img,
    ...sizes[idx % sizes.length],
  }));
};

export default function PortfolioPage() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const layoutImages = generateMasonryLayout(allImages);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <WhiteHeader />

      {/* Portfolio Grid */}
      <section className="py-8 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          {/* Masonry Grid using CSS columns */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4"
            style={{ columnFill: "balance" }}
          >
            {layoutImages.map((img, idx) => (
              <div
                key={idx}
                className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg group cursor-pointer"
              >
                <img
                  src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
                  alt={`Portfolio ${idx + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer onSubscribeClick={() => setIsSubscribeOpen(true)} />

      {/* Subscribe Modal */}
      {isSubscribeOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.8)"
          placement="Centered"
          onOutsideClick={() => setIsSubscribeOpen(false)}
        >
          <SubscribeModal onClose={() => setIsSubscribeOpen(false)} />
        </PortalPopup>
      )}
    </div>
  );
}
