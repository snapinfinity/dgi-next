"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeModal from "@/components/SubscribeModal";
import PortalPopup from "@/components/PortalPopup";
import { useProjects } from "@/hooks/useProjects";
import { shimmer, toBase64 } from "@/lib/shimmer";

// Building icon SVG component
const BuildingIcon = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.5756 37.7704H32.3486V30.968C32.3486 30.6525 32.0912 30.3961 31.7744 30.3961H28.419V12.5069C28.419 5.61009 22.785 0 15.8609 0H7.30502C6.98824 0 6.7308 0.256391 6.7308 0.571875V30.3971H3.37545C3.05867 30.3971 2.80123 30.6535 2.80123 30.9689V37.7714H0.574219C0.257441 37.7714 0 38.0278 0 38.3433C0 38.6587 0.257441 38.9151 0.574219 38.9151H34.5756C34.8924 38.9151 35.1498 38.6587 35.1498 38.3433C35.1498 38.0278 34.8924 37.7714 34.5756 37.7714V37.7704Z" fill="white"/>
  </svg>
);

// Portfolio item component
const PortfolioItem = ({ coverImage, slug, title, category, isRevealed, onReveal }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleTouch = () => {
    // On touch, immediately reveal the card
    if (!isRevealed) {
      onReveal();
    }
  };

  const handleClick = (e) => {
    // On mobile, prevent default navigation and reveal first
    if (window.innerWidth < 768) {
      if (!isRevealed && !isNavigating) {
        e.preventDefault();
        onReveal();
        setIsNavigating(true);
        // Delay navigation to show the reveal animation
        setTimeout(() => {
          window.location.href = `/works/${slug || '#'}`;
        }, 300);
      }
    }
  };

  return (
    <Link
      href={`/works/${slug || '#'}`}
      className="relative overflow-hidden group cursor-pointer block h-full w-full"
      onTouchStart={handleTouch}
      onClick={handleClick}
    >
      {coverImage && (
        <Image
          src={coverImage}
          alt={title || "Portfolio Item"}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      )}
      
      {/* Desktop: CSS hover (original behavior) */}
      <div className="hidden md:flex absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center text-white pointer-events-none">
        <BuildingIcon />
        <span className="portfolio-title1 mt-4">{category || "Category"}</span>
        <span className="portfolio-title2 mt-1">{title || "Project Name"}</span>
      </div>
      
      {/* Mobile: State-based reveal (persistent until another card is touched) */}
      <div className={`md:hidden absolute inset-0 bg-decograph-red transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none ${
        isRevealed ? "opacity-100" : "opacity-0"
      }`}>
        <BuildingIcon />
        <span className="portfolio-title1 mt-4">{category || "Category"}</span>
        <span className="portfolio-title2 mt-1">{title || "Project Name"}</span>
      </div>
    </Link>
  );
};

// Bento Grid Skeleton Component
const BentoGridSkeleton = () => {
  const SkeletonItem = () => (
    <div className="w-full h-full bg-gray-100 animate-pulse rounded-none" />
  );

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
      <div className="grid gap-3" style={{ gridArea: 'a', gridTemplateRows: '348fr 204fr 238fr' }}>
        {[0, 1, 2].map(i => <SkeletonItem key={i} />)}
      </div>

      {/* Box B - 3 horizontal images */}
      <div className="grid gap-3" style={{ gridArea: 'b', gridTemplateColumns: '311fr 227fr 282fr' }}>
         {[3, 4, 5].map(i => <SkeletonItem key={i} />)}
      </div>

      {/* Box C - 2 columns */}
      <div className="grid gap-3" style={{ gridArea: 'c', gridTemplateColumns: '401fr 440fr' }}>
        <div className="grid gap-3" style={{ gridTemplateRows: '217fr 344fr' }}>
           {[6, 7].map(i => <SkeletonItem key={i} />)}
        </div>
        <div className="grid gap-3" style={{ gridTemplateRows: '323fr 238fr' }}>
           {[8, 9].map(i => <SkeletonItem key={i} />)}
        </div>
      </div>
    </div>
  );
};

// Empty placeholder for grid slots without images
const EmptySlot = () => <div className="bg-gray-100 h-full w-full" />;

// Grid positions:
// Box A: positions 0, 1, 2 (3 vertical images)
// Box B: positions 3, 4, 5 (3 horizontal images)
// Box C-Left: positions 6, 7 (2 stacked images)
// Box C-Right: positions 8, 9 (2 stacked images)
const IMAGES_PER_GRID = 10;

// Bento Grid component - always maintains full structure
const BentoGrid = ({ works, startIndex }) => {
  const [revealedIndex, setRevealedIndex] = useState(null);
  const gridWorks = works.slice(startIndex, startIndex + IMAGES_PER_GRID);
  
  // Get image at specific position or null
  const getWork = (position) => gridWorks[position] || null;

  return (
    <div 
      className="hidden md:grid gap-3"
      style={{
        gridTemplateAreas: `"a b" "a c"`,
        gridTemplateColumns: '349fr 881fr',
        gridTemplateRows: '229fr 601fr',
        aspectRatio: '1230 / 830',
      }}
    >
      {/* Box A - 3 stacked images (positions 0, 1, 2) */}
      <div 
        className="grid gap-3"
        style={{ 
          gridArea: 'a',
          gridTemplateRows: '348fr 204fr 238fr',
        }}
      >
        {[0, 1, 2].map((pos) => {
          const work = getWork(pos);
          return work ? (
            <PortfolioItem 
              key={pos} 
              {...work} 
              isRevealed={revealedIndex === pos}
              onReveal={() => setRevealedIndex(pos)}
            />
          ) : <div key={pos} className="bg-gray-50/50" />;
        })}
      </div>

      {/* Box B - 3 horizontal images (positions 3, 4, 5) */}
      <div 
        className="grid gap-3"
        style={{ 
          gridArea: 'b',
          gridTemplateColumns: '311fr 227fr 282fr',
        }}
      >
        {[3, 4, 5].map((pos) => {
          const work = getWork(pos);
          return work ? (
            <PortfolioItem 
              key={pos} 
              {...work} 
              isRevealed={revealedIndex === pos}
              onReveal={() => setRevealedIndex(pos)}
            />
          ) : <div key={pos} className="bg-gray-50/50" />;
        })}
      </div>

      {/* Box C - 2 columns with stacked images each */}
      <div 
        className="grid gap-3"
        style={{ 
          gridArea: 'c',
          gridTemplateColumns: '401fr 440fr',
        }}
      >
        {/* Left column (positions 6, 7) */}
        <div 
          className="grid gap-3"
          style={{ gridTemplateRows: '217fr 344fr' }}
        >
          {[6, 7].map((pos) => {
            const work = getWork(pos);
            return work ? (
              <PortfolioItem 
                key={pos} 
                {...work} 
                isRevealed={revealedIndex === pos}
                onReveal={() => setRevealedIndex(pos)}
              />
            ) : <div key={pos} className="bg-gray-50/50" />;
          })}
        </div>

        {/* Right column (positions 8, 9, 10) */}
        <div 
          className="grid gap-3"
          style={{ gridTemplateRows: '323fr 238fr' }}
        >
          {[8, 9].map((pos) => {
            const work = getWork(pos);
            return work ? (
              <PortfolioItem 
                key={pos} 
                {...work} 
                isRevealed={revealedIndex === pos}
                onReveal={() => setRevealedIndex(pos)}
              />
            ) : <div key={pos} className="bg-gray-50/50" />;
          })}
        </div>
      </div>
    </div>
  );
};

export default function PortfolioPage() {
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [mobileRevealedIndex, setMobileRevealedIndex] = useState(null);
  const { data: allProjects = [], isLoading } = useProjects();
  
  // Calculate number of grids needed
  const fullGridCount = Math.floor(allProjects.length / IMAGES_PER_GRID);
  const remainingImages = allProjects.length % IMAGES_PER_GRID;
  const totalGrids = allProjects.length > 0 ? (remainingImages > 0 ? fullGridCount + 1 : fullGridCount) : 0;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white pt-14 md:pt-16">
      {/* Header */}
      <Header isWhiteBg={true} isDark={true} hideGradient={!hasScrolled} />

      {/* Portfolio Grid */}
      <section className="py-8 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto space-y-3">
          
          {isLoading ? (
             // Loading Skeleton
             <>
                <div className="md:hidden space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-100 animate-pulse w-full"></div>
                  ))}
                </div>
                <BentoGridSkeleton />
             </>
          ) : (
            <>
              {/* Mobile View: Simple stacked layout */}
              <div className="md:hidden space-y-3">
                {allProjects.map((project, idx) => (
                  <div key={idx} className="h-64">
                   <PortfolioItem 
                     {...project} 
                     isRevealed={mobileRevealedIndex === idx}
                     onReveal={() => setMobileRevealedIndex(idx)}
                   />
                  </div>
                ))}
              </div>

              {/* Desktop: Multiple Bento Grids */}
              {Array.from({ length: totalGrids }).map((_, gridIndex) => (
                <BentoGrid 
                  key={gridIndex} 
                  works={allProjects} 
                  startIndex={gridIndex * IMAGES_PER_GRID} 
                />
              ))}

              {/* Empty State */}
              {allProjects.length === 0 && (
                <div className="text-center py-20 text-gray-500">
                  <p>No works found.</p>
                </div>
              )}
            </>
          )}

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
