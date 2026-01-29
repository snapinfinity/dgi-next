"use client";

import Link from "next/link";
import { useProjects } from "@/hooks/useProjects";

// Building icon SVG component
const BuildingIcon = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.5756 37.7704H32.3486V30.968C32.3486 30.6525 32.0912 30.3961 31.7744 30.3961H28.419V12.5069C28.419 5.61009 22.785 0 15.8609 0H7.30502C6.98824 0 6.7308 0.256391 6.7308 0.571875V30.3971H3.37545C3.05867 30.3971 2.80123 30.6535 2.80123 30.9689V37.7714H0.574219C0.257441 37.7714 0 38.0278 0 38.3433C0 38.6587 0.257441 38.9151 0.574219 38.9151H34.5756C34.8924 38.9151 35.1498 38.6587 35.1498 38.3433C35.1498 38.0278 34.8924 37.7714 34.5756 37.7714V37.7704Z" fill="white"/>
  </svg>
);

const PortfolioItem = ({ coverImage, slug, title, category }) => (
  <Link
    href={`/works/${slug || '#'}`}
    className="relative overflow-hidden group cursor-pointer block h-full w-full"
  >
    {coverImage && (
      <img
        src={coverImage}
        alt={title || "Project"}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
    )}
    <div className="absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
      <BuildingIcon />
      <span className="portfolio-title1 mt-4">{category || "Category"}</span>
      <span className="portfolio-title2 mt-1">{title || "Project Name"}</span>
    </div>
  </Link>
);

// Single Bento Grid component
const BentoGrid = ({ works }) => {
  // Take first 10 items for the grid
  const gridWorks = works.slice(0, 10);
  const getWork = (idx) => gridWorks[idx] || null;

  return (
    <div 
      className="hidden md:grid gap-3"
      style={{
        gridTemplateAreas: `
          "a b"
          "a c"
        `,
        gridTemplateColumns: '349fr 881fr',
        gridTemplateRows: '229fr 601fr',
        aspectRatio: '1230 / 830',
      }}
    >
      {/* Box A - 3 stacked images */}
      <div 
        className="grid gap-3"
        style={{ 
          gridArea: 'a',
          gridTemplateRows: '348fr 204fr 238fr',
        }}
      >
        {[0, 1, 2].map((idx) => {
          const work = getWork(idx);
          return work ? <PortfolioItem key={idx} {...work} /> : null;
        })}
      </div>

      {/* Box B - 3 horizontal images */}
      <div 
        className="grid gap-3"
        style={{ 
          gridArea: 'b',
          gridTemplateColumns: '311fr 227fr 282fr',
        }}
      >
        {[3, 4, 5].map((idx) => {
          const work = getWork(idx);
          return work ? <PortfolioItem key={idx} {...work} /> : null;
        })}
      </div>

      {/* Box C - 2 columns with 2 stacked images each */}
      <div 
        className="grid gap-3"
        style={{ 
          gridArea: 'c',
          gridTemplateColumns: '401fr 440fr',
        }}
      >
        {/* Left column - 2 stacked images */}
        <div 
          className="grid gap-3"
          style={{ gridTemplateRows: '217fr 344fr' }}
        >
          {[6, 7].map((idx) => {
            const work = getWork(idx);
            return work ? <PortfolioItem key={idx} {...work} /> : null;
          })}
        </div>

        {/* Right column - 2 stacked images */}
        <div 
          className="grid gap-3"
          style={{ gridTemplateRows: '323fr 238fr' }}
        >
          {[8, 9].map((idx) => {
            const work = getWork(idx);
            return work ? <PortfolioItem key={idx} {...work} /> : null;
          })}
        </div>
      </div>
    </div>
  );
};

export default function PortfolioGrid() {
  const { data: projects = [], isLoading } = useProjects();

  if (isLoading) {
    return (
      <section className="relative min-h-screen py-8 md:py-16 px-6 lg:px-20 overflow-hidden bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="w-full h-[600px] bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </section>
    );
  }

  // If no projects, show empty state but keep the container to maintain layout/background
  if (projects.length === 0) {
    return (
      <section className="relative min-h-screen py-8 md:py-16 px-6 lg:px-20 overflow-hidden bg-white">
         <div className="relative max-w-[1400px] mx-auto space-y-3 flex items-center justify-center h-full">
            <p className="text-gray-400">No projects available.</p>
         </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen py-8 md:py-16 px-6 lg:px-20 overflow-hidden bg-white">
      <div className="relative max-w-[1400px] mx-auto space-y-3">
        {/* Mobile View: Simple stacked layout (Limit to first 10) */}
        <div className="md:hidden space-y-3">
          {projects.slice(0, 10).map((project, idx) => (
            <div key={idx} className="h-64">
              <PortfolioItem {...project} />
            </div>
          ))}
        </div>

        {/* Desktop: Single Bento Grid (Limit to first 10) */}
        <BentoGrid works={projects} />
      </div>
    </section>
  );
}
