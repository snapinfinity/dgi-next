"use client";

import { useState } from "react";
import Link from "next/link";
import WhiteHeader from "@/components/WhiteHeader";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";

// All portfolio images - simulating different project photos
const allImages = [
  // Corporate Offices
  { seed: "corp1", category: "office", slug: "corp-office-1" },
  { seed: "corp2", category: "office", slug: "corp-office-2" },
  { seed: "corp3", category: "office", slug: "corp-office-3" },
  { seed: "corp4", category: "office", slug: "corp-office-4" },
  { seed: "corp5", category: "office", slug: "corp-office-5" },
  { seed: "corp6", category: "office", slug: "corp-office-6" },
  { seed: "corp7", category: "office", slug: "corp-office-7" },
  { seed: "corp8", category: "office", slug: "corp-office-8" },
  { seed: "corp9", category: "office", slug: "corp-office-9" },
  { seed: "corp10", category: "office", slug: "corp-office-10" },
  // Retail
  { seed: "retail1", category: "retail", slug: "retail-space-1" },
  { seed: "retail2", category: "retail", slug: "retail-space-2" },
  { seed: "retail3", category: "retail", slug: "retail-space-3" },
  { seed: "retail4", category: "retail", slug: "retail-space-4" },
  { seed: "retail5", category: "retail", slug: "retail-space-5" },
  { seed: "retail6", category: "retail", slug: "retail-space-6" },
  { seed: "retail7", category: "retail", slug: "retail-space-7" },
  { seed: "retail8", category: "retail", slug: "retail-space-8" },
  { seed: "retail9", category: "retail", slug: "retail-space-9" },
  { seed: "retail10", category: "retail", slug: "retail-space-10" },
  // Villas
  { seed: "villa1", category: "villa", slug: "villa-1" },
  { seed: "villa2", category: "villa", slug: "villa-2" },
  { seed: "villa3", category: "villa", slug: "villa-3" },
  { seed: "villa4", category: "villa", slug: "villa-4" },
  { seed: "villa5", category: "villa", slug: "villa-5" },
  { seed: "villa6", category: "villa", slug: "villa-6" },
  { seed: "villa7", category: "villa", slug: "villa-7" },
  { seed: "villa8", category: "villa", slug: "villa-8" },
  { seed: "villa9", category: "villa", slug: "villa-9" },
  { seed: "villa10", category: "villa", slug: "villa-10" },
  // Entertainment
  { seed: "ent1", category: "entertainment", slug: "entertainment-1" },
  { seed: "ent2", category: "entertainment", slug: "entertainment-2" },
  { seed: "ent3", category: "entertainment", slug: "entertainment-3" },
  { seed: "ent4", category: "entertainment", slug: "entertainment-4" },
  { seed: "ent5", category: "entertainment", slug: "entertainment-5" },
  { seed: "ent6", category: "entertainment", slug: "entertainment-6" },
  { seed: "ent7", category: "entertainment", slug: "entertainment-7" },
  { seed: "ent8", category: "entertainment", slug: "entertainment-8" },
  { seed: "ent9", category: "entertainment", slug: "entertainment-9" },
  { seed: "ent10", category: "entertainment", slug: "entertainment-10" },
  // F&B
  { seed: "cafe1", category: "fnb", slug: "cafe-1" },
  { seed: "cafe2", category: "fnb", slug: "cafe-2" },
  { seed: "cafe3", category: "fnb", slug: "cafe-3" },
  { seed: "cafe4", category: "fnb", slug: "cafe-4" },
  { seed: "cafe5", category: "fnb", slug: "cafe-5" },
  { seed: "cafe6", category: "fnb", slug: "cafe-6" },
  { seed: "cafe7", category: "fnb", slug: "cafe-7" },
  { seed: "cafe8", category: "fnb", slug: "cafe-8" },
  { seed: "cafe9", category: "fnb", slug: "cafe-9" },
  { seed: "cafe10", category: "fnb", slug: "cafe-10" },
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
              <Link
                key={idx}
                href={`/portfolio/${img.slug}`}
                className="relative mb-4 break-inside-avoid overflow-hidden rounded-lg group cursor-pointer block"
              >
                <img
                  src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
                  alt={`Portfolio ${idx + 1}`}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </Link>
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
