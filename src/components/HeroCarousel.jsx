"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

// Hero images organized by row (7 images per row)
const heroImageRows = [
  // Row 1: images 1-7
  [
    "/images/hero/hero-1.webp",
    "/images/hero/hero-2.webp",
    "/images/hero/hero-3.webp",
    "/images/hero/hero-4.webp",
    "/images/hero/hero-5.webp",
    "/images/hero/hero-6.webp",
    "/images/hero/hero-7.webp",
  ],
  // Row 2: images 8-14
  [
    "/images/hero/hero-8.webp",
    "/images/hero/hero-9.webp",
    "/images/hero/hero-10.webp",
    "/images/hero/hero-11.webp",
    "/images/hero/hero-12.webp",
    "/images/hero/hero-13.webp",
    "/images/hero/hero-14.webp",
  ],
  // Row 3: images 15-17 + 1-4
  [
    "/images/hero/hero-15.webp",
    "/images/hero/hero-16.webp",
    "/images/hero/hero-17.webp",
    "/images/hero/hero-1.webp",
    "/images/hero/hero-2.webp",
    "/images/hero/hero-3.webp",
    "/images/hero/hero-4.webp",
  ],
  // Row 4: images 5-11
  [
    "/images/hero/hero-5.webp",
    "/images/hero/hero-6.webp",
    "/images/hero/hero-7.webp",
    "/images/hero/hero-8.webp",
    "/images/hero/hero-9.webp",
    "/images/hero/hero-10.webp",
    "/images/hero/hero-11.webp",
  ],
];

const CarouselRow = ({ rowIndex }) => {
  const images = heroImageRows[rowIndex] || heroImageRows[0];
  // Duplicate images multiple times for seamless infinite loop
  const allImages = [...images, ...images, ...images, ...images];
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - trackRef.current.offsetLeft);
    setScrollLeft(trackRef.current.scrollLeft);
    trackRef.current.style.animationPlayState = "paused";
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      trackRef.current.style.animationPlayState = "running";
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    trackRef.current.style.animationPlayState = "running";
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    trackRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div 
      className="w-full overflow-hidden cursor-grab active:cursor-grabbing"
      ref={trackRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <div className="carousel-track flex gap-35">
        {allImages.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 group"
          >
            <div className="w-[160px] h-[100px] overflow-hidden">
              <img
                src={src}
                alt={`Interior Design Project ${idx + 1}`}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </div>
            {/* Subtitle below image - visible on hover */}
            <p className="text-white text-xs mt-1 font-deuterium opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left">
              Interior Design Project
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default function HeroCarousel() {
  return (
    <section className="fixed inset-0 h-screen bg-decograph-red overflow-hidden z-0">
      {/* Carousel Container */}
      <div className="h-full flex flex-col justify-evenly">
        <CarouselRow rowIndex={0} />
        <CarouselRow rowIndex={1} />
        <CarouselRow rowIndex={2} />
        <CarouselRow rowIndex={3} />
      </div>
    </section>
  );
}
