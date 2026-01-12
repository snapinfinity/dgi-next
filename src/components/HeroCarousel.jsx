"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/autoplay";

// Placeholder images - these would be replaced with actual project images
const getPlaceholderImages = (row) => {
  const themes = [
    "office",
    "living-room",
    "bedroom",
    "kitchen",
    "restaurant",
    "retail",
    "lobby",
    "bathroom",
  ];
  return themes.map(
    (theme, idx) =>
      `https://picsum.photos/seed/${theme}${row}${idx}/230/124`
  );
};

const CarouselRow = ({ reverse = false, speed = 5000, rowIndex }) => {
  const images = getPlaceholderImages(rowIndex);
  // Duplicate images for seamless loop
  const allImages = [...images, ...images, ...images];

  return (
    <div className="w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, FreeMode]}
        spaceBetween={16}
        slidesPerView="auto"
        loop={true}
        freeMode={true}
        speed={speed}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverse,
        }}
        className="!overflow-visible"
      >
        {allImages.map((src, idx) => (
          <SwiperSlide key={idx} className="!w-auto">
            <div className="w-[230px] h-[124px] rounded-lg overflow-hidden">
              <img
                src={src}
                alt={`Interior Design Project ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default function HeroCarousel({ isScrolled }) {
  return (
    <section className="relative min-h-screen bg-decograph-red overflow-hidden">
      {/* Carousel Container */}
      <div className="pt-24 pb-16 flex flex-col gap-4">
        <CarouselRow rowIndex={0} reverse={false} speed={8000} />
        <CarouselRow rowIndex={1} reverse={true} speed={7000} />
        <CarouselRow rowIndex={2} reverse={false} speed={9000} />
        <CarouselRow rowIndex={3} reverse={true} speed={6000} />
      </div>

      {/* Centered Logo Overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-700 ${
          isScrolled ? "opacity-0 scale-75" : "opacity-100 scale-100"
        }`}
      >
        <div className="text-center">
          <h1 className="font-serif text-white text-6xl md:text-8xl lg:text-9xl tracking-wide">
            decograph
          </h1>
          <p className="text-white text-xl md:text-2xl tracking-[0.5em] uppercase mt-2">
            Interiors
          </p>
        </div>
      </div>
    </section>
  );
}
