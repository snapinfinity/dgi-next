"use client";

import Link from "next/link";

import { useProjects } from "@/hooks/useProjects";

const portfolioItems = [];

export default function PortfolioPreviewSection() {
  const { data: projects = [], isLoading } = useProjects(6);

  if (isLoading) {
    return (
      <section id="portfolio" className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className="about-heading text-decograph-red mb-4">Portfolio</h2>
            <p className="about-text text-gray-900 max-w-xl">
              A showcase of our completed projects reflecting quality,
              craftsmanship, and attention to detail across diverse spaces.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
             <div key={i} className="animate-pulse">
               <div className="aspect-[4/3] bg-gray-200 mb-4 rounded"></div>
               <div className="h-6 w-3/4 bg-gray-200 mb-2 rounded"></div>
               <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
             </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="about-heading text-decograph-red mb-4">
            Portfolio
          </h2>
          <p className="about-text text-gray-900 max-w-xl">
            A showcase of our completed projects reflecting quality,
            craftsmanship, and attention to detail across diverse spaces.
          </p>
        </div>

        <Link 
          href="/works"
          className="text-decograph-red hover:opacity-70 transition-opacity text-sm uppercase tracking-wider"
        >
          View All Projects →
        </Link>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((item, idx) => (
          <Link key={idx} href={`/works/${item.slug}`} className="group cursor-pointer block">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
              <img
                src={item.coverImage || `https://picsum.photos/seed/${item.slug}/420/315`}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>

            {/* Text */}
            <h3 className="text-xl text-gray-900 mb-1 transition-all duration-300 group-hover:text-decograph-red group-hover:-translate-y-1">
              {item.title}
            </h3>
            <p className="text-sm text-gray-900/60 font-light">
              {item.category}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
