"use client";

import { useState } from "react";
import Link from "next/link";
import WhiteHeader from "@/components/WhiteHeader";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";

// Sample project data - would come from CMS or database
const projectData = {
  slug: "dubai-courts",
  title: "Dubai Courts",
  category: "Interior Design",
  year: "2025",
  client: "Dubai Courts",
  description:
    "A sophisticated transformation of a modern residence, blending contemporary aesthetics with timeless elegance. This project showcases our commitment to creating spaces that are both functional and visually stunning, with careful attention to every detail from material selection to spatial flow.",
  challenge:
    "The challenge was to maximize natural light while maintaining privacy, and to create distinct zones within an open floor plan without compromising the sense of spaciousness.",
  solution:
    "We introduced strategic partition elements, layered lighting solutions, and a carefully curated palette of natural materials. Custom furniture pieces were designed to define spaces while maintaining visual continuity throughout the home.",
  images: [
    { seed: "court1", w: 1230, h: 820 },
    { seed: "court2", w: 636, h: 318 },
    { seed: "court3", w: 565, h: 407 },
    { seed: "court4", w: 636, h: 486 },
    { seed: "court5", w: 565, h: 397 },
  ],
};

export default function WorkDetailPage({ params }) {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <WhiteHeader />

      {/* Content */}
      <main className="max-w-[1280px] mx-auto px-6 lg:px-24 py-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between py-4 border-b border-gray-900 mb-12">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-gray-900 hover:text-decograph-red transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-xl">Our Work</span>
          </Link>
          <button className="flex items-center gap-2 text-gray-900 hover:text-decograph-red transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span className="text-xl">More Info</span>
          </button>
        </div>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
            <span className="bg-gray-100 px-3 py-1 rounded-full">
              {projectData.category}
            </span>
            <span>{projectData.year}</span>
            <span>•</span>
            <span>Client: {projectData.client}</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-light text-gray-900 tracking-tight">
            {projectData.title}
          </h1>
        </div>

        {/* Hero Image */}
        <div className="relative mb-16 rounded-lg overflow-hidden bg-gray-100">
          <img
            src={`https://picsum.photos/seed/${projectData.images[0].seed}/${projectData.images[0].w}/${projectData.images[0].h}`}
            alt={projectData.title}
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Project Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* About */}
          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              About the Project
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              {projectData.description}
            </p>
          </div>

          {/* Challenge & Solution */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Challenge
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {projectData.challenge}
              </p>
            </div>
            <div>
              <h3 className="text-xl font-medium text-gray-900 mb-3">
                Solution
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {projectData.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {projectData.images.slice(1).map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden bg-gray-100"
            >
              <img
                src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
                alt={`${projectData.title} gallery ${idx + 1}`}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </main>

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
