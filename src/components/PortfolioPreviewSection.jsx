"use client";

import Link from "next/link";

const portfolioItems = [
  { title: "JLT Office", category: "Corporate Office", seed: "jlt" },
  { title: "White Hearts", category: "Entertainment", seed: "whiteheart" },
  { title: "Executive Residence", category: "Villa", seed: "villa" },
  { title: "Realmadrid Office", category: "Retail", seed: "realmadrid" },
  { title: "Academy Cafe", category: "Food and Beverages", seed: "cafe" },
  { title: "Jazz", category: "Wellness", seed: "jazz" },
];

export default function PortfolioPreviewSection() {
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
          href="/portfolio"
          className="text-decograph-red hover:underline transition-all"
        >
          View All
        </Link>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolioItems.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            {/* Image */}
            <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden mb-4">
              <img
                src={`https://picsum.photos/seed/${item.seed}/420/315`}
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
          </div>
        ))}
      </div>
    </section>
  );
}
