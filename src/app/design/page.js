"use client";

import { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const SketchIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    {Array.from({ length: 24 }).map((_, i) => {
      const angle = (i * 360) / 24;
      const rad = (angle * Math.PI) / 180;
      const inner = i % 2 === 0 ? 10 : 6;
      const cos = parseFloat(Math.cos(rad).toFixed(6));
      const sin = parseFloat(Math.sin(rad).toFixed(6));
      return (
        <line key={i}
          x1={40 + inner * cos} y1={40 + inner * sin}
          x2={40 + 36 * cos}   y2={40 + 36 * sin}
          stroke="#721b24" strokeWidth="1"
        />
      );
    })}
    <circle cx="40" cy="40" r="4" fill="#721b24" />
  </svg>
);

const DevelopmentIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#721b24" strokeWidth="1.5">
    <rect x="22" y="18" width="16" height="10" />
    <rect x="42" y="18" width="16" height="10" />
    <rect x="14" y="32" width="20" height="10" />
    <rect x="38" y="32" width="22" height="10" />
    <rect x="22" y="46" width="16" height="10" />
    <rect x="42" y="46" width="16" height="10" />
  </svg>
);

const DeliveredIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#721b24" strokeWidth="1.5">
    <polygon points="40,12 68,58 12,58" />
    <polygon points="47,34 63,58 47,58" fill="#721b24" fillOpacity="0.25" />
    <line x1="47" y1="12" x2="68" y2="58" strokeWidth="1" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const scrollStages = [
  {
    title: "Contours of Modern Elegance",
    description: "Where raw vision meets refined form. Our design philosophy begins with understanding the soul of a space before a single line is drawn.",
    image: "/images/design/contours-hero-4k.webp",
  },
  {
    title: "Into Design",
    description: 'Every project begins "Into Design", where your ideas are transformed into creative and practical concepts. We focus on balancing innovation with functionality, ensuring that the foundation of the project captures your vision perfectly. This stage sets the tone for everything that follows.',
    image: "/images/design/stage-2-4k.webp",
  },
  {
    title: "Takes Shape",
    description: "The blueprint breathes. Skilled hands bring the design to life, layer by layer, texture by texture, until the space begins to speak.",
    image: "/images/design/stage-3-v2-4k.webp",
  },
  {
    title: "The Spark",
    description: "The moment a space transcends its function and becomes an experience. Every detail lands exactly where it was always meant to be.",
    image: "/images/design/stage-4-v2-4k.webp",
  },
];

const pillars = [
  { Icon: SketchIcon,      title: "Sketch",      description: "We begin with creative sketches that capture your vision. This stage lays the foundation for innovative and functional design." },
  { Icon: DevelopmentIcon, title: "Development", description: "Concepts evolve into detailed plans with expert precision. We ensure every element is refined and ready for execution." },
  { Icon: DeliveredIcon,   title: "Delivered",   description: "Your project is brought to life with excellence and quality. We deliver results that match your vision and exceed expectations." },
];

// ── Scroll Stages Section ─────────────────────────────────────────────────────
function ScrollStagesSection() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const imageRefs    = useRef([]);
  const titleRefs    = useRef([]);
  const descRefs     = useRef([]);
  const prevIndexRef = useRef(0);

  useLayoutEffect(() => {
    scrollStages.forEach((_, i) => {
      if (imageRefs.current[i]) {
        gsap.set(imageRefs.current[i], {
          clipPath: i === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          zIndex: i === 0 ? 1 : 0,
        });
      }
      if (titleRefs.current[i]) {
        gsap.set(titleRefs.current[i], {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 20,
          display: i === 0 ? "block" : "none",
        });
      }
      if (descRefs.current[i]) {
        gsap.set(descRefs.current[i], {
          opacity: i === 0 ? 1 : 0,
          y: i === 0 ? 0 : 15,
          xPercent: -50,
          display: i === 0 ? "block" : "none",
        });
      }
    });

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;
      scrollStages.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: () => `top+=${i * vh} top`,
          end:   () => `top+=${(i + 1) * vh} top`,
          onEnter:     () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const prev = prevIndexRef.current;
    const curr = activeIndex;
    if (prev === curr) return;

    // Kill any active tweens on the slide nodes to prevent conflicting animations on rapid scroll
    scrollStages.forEach((_, idx) => {
      if (imageRefs.current[idx]) gsap.killTweensOf(imageRefs.current[idx]);
      if (titleRefs.current[idx]) gsap.killTweensOf(titleRefs.current[idx]);
      if (descRefs.current[idx]) gsap.killTweensOf(descRefs.current[idx]);
    });

    // Proactively force-hide all other slides that are NOT part of the current active/previous cross-fade
    scrollStages.forEach((_, idx) => {
      if (idx !== curr && idx !== prev) {
        if (titleRefs.current[idx]) gsap.set(titleRefs.current[idx], { opacity: 0, display: "none" });
        if (descRefs.current[idx]) gsap.set(descRefs.current[idx], { opacity: 0, display: "none" });
      }
    });

    // Image clip animation
    const fromClip = curr > prev ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)";
    gsap.set(imageRefs.current[curr], { zIndex: 2 });
    gsap.set(imageRefs.current[prev], { zIndex: 1 });
    gsap.fromTo(imageRefs.current[curr],
      { clipPath: fromClip },
      { 
        clipPath: "inset(0% 0% 0% 0%)", 
        duration: 1.8, 
        ease: "power2.inOut",
        onComplete: () => {
          // Clean up and reset all non-active slides to fully clipped state and base z-index
          scrollStages.forEach((_, idx) => {
            if (idx !== curr && imageRefs.current[idx]) {
              gsap.set(imageRefs.current[idx], {
                clipPath: "inset(100% 0% 0% 0%)",
                zIndex: 0
              });
            }
          });
          // Lock current slide in at zIndex 1
          if (imageRefs.current[curr]) {
            gsap.set(imageRefs.current[curr], { zIndex: 1 });
          }
        }
      }
    );

    // Synchronized Title GSAP Transition (sequential display-none to prevent overlapping)
    gsap.to(titleRefs.current[prev], {
      opacity: 0,
      y: curr > prev ? -20 : 20,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(titleRefs.current[prev], { display: "none" });
      }
    });

    gsap.set(titleRefs.current[curr], { display: "block" });
    gsap.fromTo(titleRefs.current[curr],
      { opacity: 0, y: curr > prev ? 20 : -20 },
      { opacity: 1, y: 0, duration: 1.0, ease: "power2.out", delay: 0.35 }
    );

    // Synchronized Description GSAP Transition (sequential display-none to prevent overlapping)
    gsap.to(descRefs.current[prev], {
      opacity: 0,
      y: curr > prev ? -15 : 15,
      xPercent: -50,
      duration: 0.45,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.set(descRefs.current[prev], { display: "none" });
      }
    });

    gsap.set(descRefs.current[curr], { display: "block" });
    gsap.fromTo(descRefs.current[curr],
      { opacity: 0, y: curr > prev ? 15 : -15, xPercent: -50 },
      { opacity: 1, y: 0, xPercent: -50, duration: 1.0, ease: "power2.out", delay: 0.5 }
    );

    prevIndexRef.current = curr;
  }, [activeIndex]);

  return (
    <div ref={containerRef} style={{ height: `${(scrollStages.length + 1) * 100}vh` }} className="relative">
      <div className="sticky top-0 h-screen bg-white flex flex-col overflow-hidden">

        {/* Title */}
        <div className="shrink-0 relative" style={{ height: "clamp(120px, 18vh, 150px)" }}>
          {scrollStages.map((stage, i) => (
            <h2
              key={i}
              ref={el => (titleRefs.current[i] = el)}
              className="absolute bottom-4 left-0 right-0 text-center px-6 deuterium-regular text-gray-900"
              style={{
                fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)",
                willChange: "transform, opacity",
              }}
            >
              {stage.title}
            </h2>
          ))}
        </div>

        {/* Image */}
        <div className="relative flex-1 w-full max-w-[1280px] mx-auto px-6 lg:px-24 flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full max-h-[500px] aspect-[4/3] md:aspect-[16/7] overflow-hidden">
            {scrollStages.map((stage, i) => (
              <div key={i} ref={el => (imageRefs.current[i] = el)} className="absolute inset-0">
                <Image src={stage.image} alt={stage.title} fill unoptimized className="object-cover object-center" />
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="shrink-0 relative" style={{ height: "clamp(140px, 18vh, 180px)" }}>
          {scrollStages.map((stage, i) => (
            <p
              key={i}
              ref={el => (descRefs.current[i] = el)}
              className="about-text text-gray-500 text-center"
              style={{
                position: "absolute",
                top: "1rem",
                left: "50%",
                width: "min(860px, calc(100% - 3rem))",
                willChange: "transform, opacity",
              }}
            >
              {stage.description}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function DesignPage() {
  const heroImgRef    = useRef(null);
  const heroTitleRef  = useRef(null);
  const heroSubRef    = useRef(null);
  const introRef      = useRef(null);
  const approachLine1 = useRef(null);
  const pillarRefs    = useRef([]);
  const ctaRef        = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(heroImgRef.current,
        { scale: 1.08 },
        { scale: 1, duration: 3.2, ease: "power2.out" }
      );
      gsap.from(heroTitleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 24,
        duration: 1.4, ease: "power3.out", delay: 0.35,
      });
      gsap.from(heroSubRef.current, {
        opacity: 0, y: 12, letterSpacing: "0.6em",
        duration: 1.1, ease: "power3.out", delay: 1.15,
      });
      gsap.from(introRef.current, {
        opacity: 0, y: 40, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: introRef.current, start: "top 82%" },
      });
      gsap.from(approachLine1.current, {
        opacity: 0, y: 30, duration: 0.95, ease: "power3.out",
        scrollTrigger: { trigger: approachLine1.current, start: "top 82%" },
      });
      gsap.from(pillarRefs.current, {
        opacity: 0, y: 50, duration: 1.0, ease: "power3.out", stagger: 0.14,
        scrollTrigger: { trigger: pillarRefs.current[0], start: "top 80%" },
      });
      gsap.from(ctaRef.current, {
        opacity: 0, y: 36, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header isWhiteBg={false} isDark={false} hideGradient={true} hideOnScrollDown={true} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative h-screen w-full overflow-hidden">
        <div ref={heroImgRef} className="absolute inset-0">
          <Image src="/images/hero/hero-2.webp" alt="Design" fill priority unoptimized className="object-cover object-center" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 45%, rgba(0,0,0,0.6) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1
            ref={heroTitleRef}
            style={{
              fontFamily: 'var(--font-cormorant), "Playfair Display", Georgia, serif',
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(4.5rem, 13vw, 11rem)",
              color: "#fff",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            Design
          </h1>
          <p ref={heroSubRef} className="helvetica-regular text-white/60 uppercase tracking-[0.35em] text-xs mt-6">
            Decograph Interiors
          </p>
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div ref={introRef}>
          <h2 className="about-heading text-decograph-red mb-4">Design</h2>
          <div className="w-20 h-0.5 bg-decograph-red mb-6" />
          <p className="about-text text-gray-900 max-w-xl">
            Our Design service integrates creativity with construction expertise. We handle everything from initial concept to final delivery under one roof — ensuring efficiency, cost-effectiveness, and uncompromising quality.
          </p>
        </div>
      </section>

      {/* ── Scroll Stages ─────────────────────────────────────────────────── */}
      <ScrollStagesSection />

      {/* ── Approach Section ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p ref={approachLine1} className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">
              Our Approach
            </p>
            <h2 className="text-gray-900" style={{ fontWeight: 600, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.02em" }}>
              Designing Built Environments
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-gray-200 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {pillars.map(({ Icon, title, description }, idx) => (
              <div
                key={title}
                ref={el => (pillarRefs.current[idx] = el)}
                className="flex flex-col items-center text-center py-14 px-8"
              >
                <div className="mb-8"><Icon /></div>
                <h3 className="mb-4 text-gray-900 font-medium text-lg">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="about-heading text-decograph-red mb-2">Start Your Project</h2>
            <p className="about-text text-gray-500">Ready to bring your design vision to life?</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-block px-10 py-3 border border-decograph-red text-decograph-red helvetica-regular text-sm uppercase tracking-widest hover:bg-decograph-red hover:text-white transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
