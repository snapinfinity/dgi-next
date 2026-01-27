"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
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
  const [isMoreInfoOpen, setIsMoreInfoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white pt-14 md:pt-16">
      {/* Header */}
      <Header isWhiteBg={true} isDark={true} />

      {/* Content */}
      <main className="max-w-[1280px] mx-auto px-4 lg:px-12 py-12">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between py-4 border-b border-gray-900">
          <Link
            href="/portfolio"
            className="flex items-center gap-2 text-gray-900 hover:text-decograph-red transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span style={{ fontFamily: 'Deuterium Variable, sans-serif', fontWeight: 400, fontSize: '20px' }}>Our Work</span>
          </Link>
          <button 
            onClick={() => setIsMoreInfoOpen(!isMoreInfoOpen)}
            className="flex items-center gap-2 text-gray-900 hover:text-decograph-red transition-colors"
          >
            <svg 
              className={`w-6 h-6 transition-transform duration-300 ${isMoreInfoOpen ? 'rotate-45' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span style={{ fontFamily: 'Deuterium Variable, sans-serif', fontWeight: 400, fontSize: '20px' }}>More Info</span>
          </button>
        </div>

        {/* Expandable Description */}
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${isMoreInfoOpen ? 'max-h-96 opacity-100 py-6' : 'max-h-0 opacity-0'}`}
        >
          <p 
            className="leading-relaxed border-b border-gray-200 pb-6 max-w-3xl"
            style={{ 
              fontFamily: 'Deuterium Variable, sans-serif',
              fontWeight: 400,
              fontSize: '16px',
              color: '#4B5563'
            }}
          >
            This project reflects Decograph Interiors' expertise in transforming spaces through thoughtful design and 
            precise execution. From concept to completion, every element was carefully planned to balance 
            aesthetics, functionality, and durability, resulting in a refined environment that elevates user experience 
            and meets the client's vision seamlessly.
          </p>
        </div>

        <div className="mb-12 mt-12">
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
        <div className="relative mb-16 rounded-lg overflow-hidden bg-gray-100 group">
          <img
            src={`https://picsum.photos/seed/${projectData.images[0].seed}/${projectData.images[0].w}/${projectData.images[0].h}`}
            alt={projectData.title}
            className="w-full h-auto object-cover transition-transform duration-1500 ease-out group-hover:scale-110"
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

        {/* Gallery Grid - Single column on mobile */}
        <div className="mb-16 grid grid-cols-1 gap-4 lg:hidden">
          {projectData.images.slice(1).map((img, idx) => (
            <div
              key={idx}
              className="relative rounded-lg overflow-hidden bg-gray-100 aspect-[4/3]"
            >
              <img
                src={`https://picsum.photos/seed/${img.seed}/800/600`}
                alt={`${projectData.title} gallery ${idx + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Bento Gallery Grid - Desktop only */}
        <div 
          className="mb-16 gap-4 hidden lg:grid"
          style={{
            gridTemplateAreas: `"a a b b" "a a c d"`,
            gridTemplateColumns: '1fr 1fr 1fr 1fr',
            gridTemplateRows: '250px 250px',
          }}
        >
          {projectData.images.slice(1).map((img, idx) => {
            const areas = ['a', 'b', 'c', 'd'];
            return (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden bg-gray-100"
                style={{ gridArea: areas[idx] }}
              >
                <img
                  src={`https://picsum.photos/seed/${img.seed}/800/600`}
                  alt={`${projectData.title} gallery ${idx + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            );
          })}
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
