"use client";

import Link from "next/link";

// Building icon SVG component
const BuildingIcon = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.5756 37.7704H32.3486V30.968C32.3486 30.6525 32.0912 30.3961 31.7744 30.3961H28.419V12.5069C28.419 5.61009 22.785 0 15.8609 0H7.30502C6.98824 0 6.7308 0.256391 6.7308 0.571875V30.3971H3.37545C3.05867 30.3971 2.80123 30.6535 2.80123 30.9689V37.7714H0.574219C0.257441 37.7714 0 38.0278 0 38.3433C0 38.6587 0.257441 38.9151 0.574219 38.9151H34.5756C34.8924 38.9151 35.1498 38.6587 35.1498 38.3433C35.1498 38.0278 34.8924 37.7714 34.5756 37.7714V37.7704Z" fill="white"/>
  </svg>
);

// Portfolio item component
const PortfolioItem = ({ seed, slug, title1 = "Corporate Office", title2 = "Heading Text" }) => (
  <Link
    href={`/works/${slug}`}
    className="relative overflow-hidden group cursor-pointer block"
  >
    <img
      src={`https://picsum.photos/seed/${seed}/800/600`}
      alt={`Portfolio ${seed}`}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
      <BuildingIcon />
      <span className="portfolio-title1 mt-4">{title1}</span>
      <span className="portfolio-title2 mt-1">{title2}</span>
    </div>
  </Link>
);

// Single Bento Grid component
const BentoGrid = ({ groupIndex }) => (
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
      {[
        { seed: `grid${groupIndex}a1`, slug: `office-${groupIndex}-1` },
        { seed: `grid${groupIndex}a2`, slug: `office-${groupIndex}-2` },
        { seed: `grid${groupIndex}a3`, slug: `office-${groupIndex}-3` },
      ].map((item, idx) => (
        <PortfolioItem key={idx} {...item} />
      ))}
    </div>

    {/* Box B - 3 horizontal images */}
    <div 
      className="grid gap-3"
      style={{ 
        gridArea: 'b',
        gridTemplateColumns: '311fr 227fr 282fr',
      }}
    >
      {[
        { seed: `grid${groupIndex}b1`, slug: `office-${groupIndex}-4` },
        { seed: `grid${groupIndex}b2`, slug: `office-${groupIndex}-5` },
        { seed: `grid${groupIndex}b3`, slug: `office-${groupIndex}-6` },
      ].map((item, idx) => (
        <PortfolioItem key={idx} {...item} />
      ))}
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
        {[
          { seed: `grid${groupIndex}c1`, slug: `office-${groupIndex}-7` },
          { seed: `grid${groupIndex}c2`, slug: `office-${groupIndex}-8` },
        ].map((item, idx) => (
          <PortfolioItem key={idx} {...item} />
        ))}
      </div>

      {/* Right column - 2 stacked images */}
      <div 
        className="grid gap-3"
        style={{ gridTemplateRows: '323fr 238fr' }}
      >
        {[
          { seed: `grid${groupIndex}c3`, slug: `office-${groupIndex}-9` },
          { seed: `grid${groupIndex}c4`, slug: `office-${groupIndex}-10` },
        ].map((item, idx) => (
          <PortfolioItem key={idx} {...item} />
        ))}
      </div>
    </div>
  </div>
);

export default function PortfolioGrid() {
  return (
    <section className="relative py-8 md:py-16 px-6 lg:px-20 overflow-hidden bg-white">
      <div className="relative max-w-[1400px] mx-auto space-y-3">
        {/* Mobile View: Simple stacked layout */}
        <div className="md:hidden space-y-3">
          {[0, 1, 2].map((groupIndex) => (
            [
              { seed: `grid${groupIndex}a1`, slug: `office-${groupIndex}-1` },
              { seed: `grid${groupIndex}a2`, slug: `office-${groupIndex}-2` },
              { seed: `grid${groupIndex}b1`, slug: `office-${groupIndex}-3` },
              { seed: `grid${groupIndex}b2`, slug: `office-${groupIndex}-4` },
              { seed: `grid${groupIndex}c1`, slug: `office-${groupIndex}-5` },
              { seed: `grid${groupIndex}c2`, slug: `office-${groupIndex}-6` },
            ].map((item, idx) => (
              <PortfolioItem key={`${groupIndex}-${idx}`} {...item} />
            ))
          ))}
        </div>

        {/* Desktop: 3 Bento Grids */}
        {[0, 1, 2].map((groupIndex) => (
          <BentoGrid key={groupIndex} groupIndex={groupIndex} />
        ))}
      </div>
    </section>
  );
}
