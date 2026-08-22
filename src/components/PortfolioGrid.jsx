"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useProjects } from "@/hooks/useProjects";
import { shimmer, toBase64 } from "@/lib/shimmer";

const BuildingIcon = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.5756 37.7704H32.3486V30.968C32.3486 30.6525 32.0912 30.3961 31.7744 30.3961H28.419V12.5069C28.419 5.61009 22.785 0 15.8609 0H7.30502C6.98824 0 6.7308 0.256391 6.7308 0.571875V30.3971H3.37545C3.05867 30.3971 2.80123 30.6535 2.80123 30.9689V37.7714H0.574219C0.257441 37.7714 0 38.0278 0 38.3433C0 38.6587 0.257441 38.9151 0.574219 38.9151H34.5756C34.8924 38.9151 35.1498 38.6587 35.1498 38.3433C35.1498 38.0278 34.8924 37.7714 34.5756 37.7714V37.7704Z" fill="white" />
  </svg>
);

const PortfolioItem = ({ coverImage, slug, title, category, isRevealed, onReveal }) => {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleTouch = () => {
    if (!isRevealed) onReveal();
  };

  const handleClick = (e) => {
    if (window.innerWidth < 768) {
      if (!isRevealed && !isNavigating) {
        e.preventDefault();
        onReveal();
        setIsNavigating(true);
        setTimeout(() => { window.location.href = `/works/${slug || "#"}`; }, 300);
      }
    }
  };

  return (
    <Link
      href={`/works/${slug || "#"}`}
      className="relative overflow-hidden group cursor-pointer block h-full w-full"
      onTouchStart={handleTouch}
      onClick={handleClick}
    >
      {coverImage && (
        <Image
          src={coverImage}
          alt={title || "Project"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority={false}
        />
      )}
      {/* Desktop: CSS hover */}
      <div className="hidden md:flex absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center text-white pointer-events-none">
        <BuildingIcon />
        <span className="portfolio-title1 mt-4">{category || "Category"}</span>
        <span className="portfolio-title2 mt-1">{title || "Project Name"}</span>
      </div>
      {/* Mobile: State-based reveal */}
      <div className={`md:hidden absolute inset-0 bg-decograph-red transition-opacity duration-300 flex flex-col items-center justify-center text-white pointer-events-none ${isRevealed ? "opacity-100" : "opacity-0"}`}>
        <BuildingIcon />
        <span className="portfolio-title1 mt-4">{category || "Category"}</span>
        <span className="portfolio-title2 mt-1">{title || "Project Name"}</span>
      </div>
    </Link>
  );
};

export default function PortfolioGrid() {
  const { data: projects = [], isLoading } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [revealedIndex, setRevealedIndex] = useState(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w >= 1024) setSlidesPerView(3);
      else if (w >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, projects.length - slidesPerView);

  const goNext = () => setCurrentIndex((i) => Math.min(i + 1, maxIndex));
  const goPrev = () => setCurrentIndex((i) => Math.max(i - 1, 0));

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 px-6 lg:px-20 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="h-10 w-48 bg-gray-100 animate-pulse" />
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gray-100 animate-pulse" />
              <div className="w-10 h-10 bg-gray-100 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-gray-100 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-12 md:py-16 px-6 lg:px-20 bg-white">
        <div className="max-w-[1400px] mx-auto flex items-center justify-center h-64">
          <p className="text-gray-400">No projects available.</p>
        </div>
      </section>
    );
  }

  const progressPercent = Math.min(((currentIndex + slidesPerView) / projects.length) * 100, 100);

  return (
    <section className="relative py-12 md:py-16 px-6 lg:px-20 bg-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <h2 className="about-heading text-gray-900">Our Projects</h2>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400 hidden sm:block">
              {Math.min(currentIndex + slidesPerView, projects.length)} / {projects.length}
            </span>
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-decograph-red hover:text-decograph-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === maxIndex}
              className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:border-decograph-red hover:text-decograph-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Track */}
        <div
          className="overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
          >
            {projects.map((project, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 px-1.5"
                style={{ width: `${100 / slidesPerView}%` }}
              >
                <div className="relative aspect-[4/3]">
                  <PortfolioItem
                    {...project}
                    isRevealed={revealedIndex === idx}
                    onReveal={() => setRevealedIndex(idx)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200">
            <div
              className="h-full bg-decograph-red transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* View All Link */}
        <div className="flex justify-center mt-10">
          <Link
            href="/works"
            className="inline-flex items-center gap-2 px-6 py-3 border border-decograph-red text-decograph-red hover:bg-decograph-red hover:text-white transition-colors text-sm font-normal"
          >
            View All Projects
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
