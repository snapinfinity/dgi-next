"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

// ── Icons ──────────────────────────────────────────────────────────────────────
const StructureIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#721b24" strokeWidth="1.5">
    <rect x="15" y="50" width="50" height="16" />
    <rect x="24" y="34" width="32" height="16" />
    <rect x="32" y="18" width="16" height="16" />
    <line x1="40" y1="14" x2="40" y2="18" />
  </svg>
);
const ExecuteIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#721b24" strokeWidth="1.5">
    <circle cx="40" cy="40" r="28" /><circle cx="40" cy="40" r="18" />
    <circle cx="40" cy="40" r="6" fill="#721b24" fillOpacity="0.3" />
    <line x1="40" y1="12" x2="40" y2="22" /><line x1="40" y1="58" x2="40" y2="68" />
    <line x1="12" y1="40" x2="22" y2="40" /><line x1="58" y1="40" x2="68" y2="40" />
  </svg>
);
const HandoverIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="#721b24" strokeWidth="1.5">
    <rect x="14" y="30" width="52" height="36" />
    <polyline points="14,30 40,14 66,30" />
    <rect x="32" y="46" width="16" height="20" />
    <line x1="40" y1="14" x2="40" y2="8" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────
const pillars = [
  { Icon: StructureIcon, title: "Structure", description: "Every build starts with a solid foundation. Our structural planning ensures safety, longevity, and the perfect canvas for the design above." },
  { Icon: ExecuteIcon,   title: "Execute",   description: "Our site teams execute with surgical precision. Every trade is coordinated to a single programme, minimising delays and maximising quality." },
  { Icon: HandoverIcon,  title: "Handover",  description: "We deliver finished spaces that exceed the brief. Post-handover support ensures every element performs exactly as designed." },
];

const processSteps = [
  { num: "01", title: "The Brief",     description: "Every build begins with a thorough consultation where we establish project goals, timelines, and budget. We align every stakeholder before a single wall goes up, ensuring clarity and confidence from day one.", image: "/images/build/build-stage-1.webp" },
  { num: "02", title: "Takes Shape",   description: "Skilled craftsmen bring the design to life on site. From structural works to specialist fit-out, our teams execute every element with precision and an uncompromising eye for quality.", image: "/images/build/build-stage-2.webp" },
  { num: "03", title: "The Handover",  description: "The moment we deliver your completed space. Following rigorous snagging and quality checks, we hand over a project that exceeds expectations — and remain on hand for aftercare long after completion.", image: "/images/build/build-stage-3.webp" },
];

const stats = [
  { value: 150, suffix: "+", label: "Projects Delivered" },
  { value: 12,  suffix: "+", label: "Years of Expertise" },
  { value: 500, suffix: "+", label: "Happy Clients" },
  { value: 100, suffix: "%", label: "Quality Commitment" },
];

// ── Process Step (alternating layout) ─────────────────────────────────────────
function ProcessStep({ num, title, description, image, reversed }) {
  const stepRef  = useRef(null);
  const imgRef   = useRef(null);
  const imgInner = useRef(null);
  const numRef   = useRef(null);
  const titleRef = useRef(null);
  const lineRef  = useRef(null);
  const descRef  = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(numRef.current, {
        opacity: 0, x: reversed ? 40 : -40, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: stepRef.current, start: "top 78%" },
      });
      gsap.from(titleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 18, duration: 1.1, ease: "power3.out", delay: 0.18,
        scrollTrigger: { trigger: stepRef.current, start: "top 78%" },
      });
      gsap.from(lineRef.current, {
        scaleX: 0, duration: 0.9, ease: "power3.inOut", delay: 0.38,
        transformOrigin: "left center",
        scrollTrigger: { trigger: stepRef.current, start: "top 78%" },
      });
      gsap.from(descRef.current, {
        opacity: 0, y: 22, duration: 1, ease: "power3.out", delay: 0.5,
        scrollTrigger: { trigger: stepRef.current, start: "top 78%" },
      });
      gsap.from(imgRef.current, {
        clipPath: "inset(100% 0% 0% 0%)", duration: 1.8, ease: "power3.out",
        scrollTrigger: { trigger: imgRef.current, start: "top 82%" },
      });
      gsap.fromTo(imgInner.current,
        { scale: 1.12 },
        { scale: 1, duration: 2.6, ease: "power2.out",
          scrollTrigger: { trigger: imgRef.current, start: "top 82%" } }
      );
    }, stepRef);
    return () => ctx.revert();
  }, [reversed]);

  const textPanel = (
    <div className="flex flex-col justify-center h-full px-8 lg:px-14 xl:px-20 py-12 lg:py-0">
      <span ref={numRef} className="font-bold text-gray-100 leading-none select-none mb-3" style={{ fontSize: "clamp(4.5rem, 9vw, 7rem)" }}>
        {num}
      </span>
      <h3 ref={titleRef} className="deuterium-regular text-gray-900 mb-4" style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.2rem)" }}>
        {title}
      </h3>
      <div ref={lineRef} className="w-14 h-0.5 bg-decograph-red mb-5" />
      <p ref={descRef} className="about-text text-gray-500 leading-relaxed">{description}</p>
    </div>
  );

  const imagePanel = (
    <div ref={imgRef} className="relative overflow-hidden" style={{ minHeight: "clamp(320px, 48vw, 660px)" }}>
      <div ref={imgInner} className="absolute inset-0">
        <Image src={image} alt={title} fill unoptimized className="object-cover object-center" />
      </div>
    </div>
  );

  return (
    <div ref={stepRef} className="border-t border-gray-100">
      {/* Mobile */}
      <div className="lg:hidden">
        {imagePanel}
        <div className="px-6 py-10">
          <span className="font-bold text-gray-100 leading-none select-none" style={{ fontSize: "5rem" }}>{num}</span>
          <h3 className="deuterium-regular text-gray-900 mt-2 mb-3" style={{ fontSize: "1.7rem" }}>{title}</h3>
          <div className="w-12 h-0.5 bg-decograph-red mb-4" />
          <p className="about-text text-gray-500">{description}</p>
        </div>
      </div>
      {/* Desktop */}
      <div className={`hidden lg:grid grid-cols-2`}>
        {reversed ? <>{imagePanel}{textPanel}</> : <>{textPanel}{imagePanel}</>}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function BuildPage() {
  const heroImgRef      = useRef(null);
  const heroTitleRef    = useRef(null);
  const heroSubRef      = useRef(null);
  const heroLineRef     = useRef(null);
  const introLeftRef    = useRef(null);
  const introRightRef   = useRef(null);
  const marqueeRef      = useRef(null);
  const processTitleRef = useRef(null);
  const processLineRef  = useRef(null);
  const statCounters    = useRef([]);
  const statLabels      = useRef([]);
  const approachRef     = useRef(null);
  const pillarRefs      = useRef([]);
  const ctaRef          = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {

      // ── Hero ────────────────────────────────────────────────────────────
      gsap.fromTo(heroImgRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 3.5, ease: "power2.out" }
      );
      gsap.from(heroTitleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 32,
        duration: 1.5, ease: "power3.out", delay: 0.3,
      });
      gsap.from(heroSubRef.current, {
        opacity: 0, y: 14, letterSpacing: "0.7em",
        duration: 1.2, ease: "power3.out", delay: 1.1,
      });
      gsap.from(heroLineRef.current, {
        scaleX: 0, duration: 1.4, ease: "power3.inOut", delay: 1.5,
        transformOrigin: "center center",
      });

      // ── Intro ───────────────────────────────────────────────────────────
      gsap.from(introLeftRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 20, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: introLeftRef.current, start: "top 82%" },
      });
      gsap.from(introRightRef.current, {
        opacity: 0, y: 36, duration: 1.1, ease: "power3.out", delay: 0.2,
        scrollTrigger: { trigger: introLeftRef.current, start: "top 82%" },
      });

      // ── Marquee ─────────────────────────────────────────────────────────
      const track = marqueeRef.current;
      if (track) {
        gsap.to(track, {
          x: () => -(track.scrollWidth / 2),
          ease: "none", duration: 24, repeat: -1,
        });
      }

      // ── Process heading ──────────────────────────────────────────────────
      gsap.from(processTitleRef.current, {
        clipPath: "inset(0 0 100% 0)", y: 20, duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: processTitleRef.current, start: "top 85%" },
      });
      gsap.from(processLineRef.current, {
        scaleX: 0, duration: 1, ease: "power3.inOut", delay: 0.2,
        transformOrigin: "left center",
        scrollTrigger: { trigger: processTitleRef.current, start: "top 85%" },
      });

      // ── Stats ────────────────────────────────────────────────────────────
      statCounters.current.forEach((el, i) => {
        if (!el) return;
        const { value, suffix } = stats[i];
        const obj = { val: 0 };
        gsap.from(statLabels.current[i], {
          opacity: 0, y: 16, duration: 0.9, ease: "power3.out", delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        gsap.to(obj, {
          val: value, duration: 2.4, ease: "power2.out",
          delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
          onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
        });
      });

      // ── Approach ─────────────────────────────────────────────────────────
      gsap.from(approachRef.current, {
        opacity: 0, y: 28, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: approachRef.current, start: "top 84%" },
      });
      gsap.from(pillarRefs.current, {
        opacity: 0, y: 50, duration: 1.0, ease: "power3.out", stagger: 0.15,
        scrollTrigger: { trigger: pillarRefs.current[0], start: "top 80%" },
      });

      // ── CTA ──────────────────────────────────────────────────────────────
      gsap.from(ctaRef.current, {
        opacity: 0, y: 36, duration: 1.1, ease: "power3.out",
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
          <Image src="/images/build/build-hero-cover.webp" alt="Build" fill priority unoptimized className="object-cover object-center" />
        </div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1
            ref={heroTitleRef}
            style={{
              fontFamily: 'var(--font-cormorant), "Playfair Display", Georgia, serif',
              fontStyle: "italic", fontWeight: 400,
              fontSize: "clamp(5rem, 14vw, 12rem)",
              color: "#fff", letterSpacing: "-0.02em", lineHeight: 0.95,
            }}
          >
            Build
          </h1>
          <p ref={heroSubRef} className="helvetica-regular text-white/55 uppercase tracking-[0.4em] text-xs mt-7">
            Decograph Interiors
          </p>
          <div ref={heroLineRef} className="w-24 h-px bg-white/30 mt-8" />
        </div>
      </section>

      {/* ── Intro ─────────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          <div>
            <h2 ref={introLeftRef} className="about-heading text-decograph-red mb-4">Build</h2>
            <div className="w-20 h-0.5 bg-decograph-red" />
          </div>
          <p ref={introRightRef} className="about-text text-gray-600 leading-loose pt-2">
            Our Build capability ensures the design intent is never lost in translation. From first fix to final finish, our site teams deliver craftsmanship you can see — and quality you can feel — under one roof.
          </p>
        </div>
      </section>

      {/* ── Marquee Strip ─────────────────────────────────────────────────── */}
      <div className="overflow-hidden bg-decograph-red py-[18px]">
        <div ref={marqueeRef} className="flex whitespace-nowrap">
          {[0, 1].map((i) => (
            <div key={i} className="flex items-center shrink-0">
              {["THE BRIEF", "TAKES SHAPE", "THE HANDOVER", "PRECISION BUILT", "QUALITY CRAFTED", "DELIVERED"].map((word) => (
                <span key={word} className="helvetica-regular text-white/90 text-[11px] uppercase tracking-[0.32em] px-7 flex items-center gap-7">
                  {word}
                  <span className="inline-block w-1 h-1 rounded-full bg-white/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── Process Section ───────────────────────────────────────────────── */}
      <section className="pt-20 md:pt-28">
        <div className="px-6 lg:px-24 max-w-[1440px] mx-auto mb-14">
          <h2 ref={processTitleRef} className="about-heading text-decograph-red mb-4">
            From Foundation to Finish
          </h2>
          <div ref={processLineRef} className="w-20 h-0.5 bg-decograph-red" />
        </div>

        {processSteps.map((step, idx) => (
          <ProcessStep key={step.num} {...step} reversed={idx % 2 !== 0} />
        ))}
      </section>

      {/* ── Stats ─────────────────────────────────────────────────────────── */}
      <section className="bg-gray-950">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center py-16 px-6">
              <span
                ref={el => (statCounters.current[i] = el)}
                className="font-bold leading-none text-decograph-red"
                style={{ fontSize: "clamp(2.6rem, 5vw, 4rem)" }}
              >
                0{stat.suffix}
              </span>
              <span
                ref={el => (statLabels.current[i] = el)}
                className="helvetica-regular text-white/50 text-xs uppercase tracking-[0.22em] mt-4"
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Approach Section ──────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div ref={approachRef} className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Our Approach</p>
            <h2 className="text-gray-900" style={{ fontWeight: 600, fontSize: "clamp(1.6rem, 3vw, 2.6rem)", letterSpacing: "-0.02em" }}>
              Building Exceptional Spaces
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
            <p className="about-text text-gray-500">Ready to bring your build vision to life?</p>
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
