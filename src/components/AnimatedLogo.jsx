"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedLogo() {
  const iconRef = useRef(null); // Group 36.png — hero icon
  const logoRef = useRef(null); // logo.png  — full logo

  useEffect(() => {
    const icon = iconRef.current;
    const logo = logoRef.current;
    if (!icon || !logo) return;

    // ── Target: Header logo position ───────────────────────────────────────
    const navH       = 80;                          // header h-20
    const navLogoW   = 120;                         // Header lg:w-[120px]
    const navCenterY = navH / 2;                    // 40px from top
    const heroLogoW  = logo.offsetWidth;            // e.g. 800px (CSS clamp resolved)
    const navScale   = navLogoW / heroLogoW;

    // ── Initial GSAP state ────────────────────────────────────────────────
    gsap.set(icon, { opacity: 1 });

    // logo.png: GSAP manages ALL transforms (no inline transform on element)
    // xPercent:-10 → icon centre (≈10 % from left) lands at left:50% = 50 vw
    // yPercent:-50 → vertically centres element at top:50%
    gsap.set(logo, {
      xPercent: -10,
      yPercent: -50,
      clipPath:  "inset(0 80% 0 0)",
      opacity:   0,   // already 0 via inline style; re-affirm for GSAP ownership
      scale:     1,
      y:         0,
    });

    // Measure hero centre-Y after gsap.set has repositioned the element
    const rect        = logo.getBoundingClientRect();
    const heroCenterY = rect.top + rect.height / 2;   // ≈ 50 vh
    const deltaY      = navCenterY - heroCenterY;      // negative (move up)

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.body,
          start:   0,
          end:     () => window.innerHeight,
          scrub:   0.6,
        },
      });

      // ── Phase 1a (0 → 25 %): Group 36.png fades out COMPLETELY ─────────
      // logo.png is still invisible — no overlap, no misalignment.
      tl.to(icon, { opacity: 0, ease: "none", duration: 0.25 }, 0);

      // ── Phase 1b (25 → 55 %): logo.png fades in + text slides in ───────
      // Only starts once Group 36.png is gone.
      // Clip goes from "icon only" → full logo (text slides in from right).
      tl.to(logo, {
        opacity:  1,
        clipPath: "inset(0 0% 0 0)",
        ease:     "none",
        duration: 0.3,
      }, 0.25);

      // ── Phase 2 (55 → 92 %): complete logo flies to exact navbar pos ───
      // xPercent: -50  re-centres full logo (not just icon)
      // y: deltaY      moves from 50 vh down to 40 px (navbar centre)
      // scale          shrinks to 120 px wide (navbar logo size)
      tl.to(logo, {
        xPercent: -50,
        y:        deltaY,
        scale:    navScale,
        ease:     "none",
        duration: 0.37,
      }, 0.55);

      // ── Phase 3 (92 → 100 %): fade out; Header static logo takes over ──
      tl.to(logo, { opacity: 0, ease: "none", duration: 0.08 }, 0.92);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Group 36.png — large standalone icon, anchored at hero centre */}
      <img
        ref={iconRef}
        src="/images/Group 36.png"
        alt=""
        style={{
          position:  "absolute",
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          height:    "clamp(200px, 30vh, 380px)",
          width:     "auto",
        }}
      />

      {/*
        logo.png — opacity:0 in inline style so it is invisible on first paint,
        before useEffect runs and GSAP takes ownership.
        GSAP controls ALL transforms; no inline transform here.
        left:50% + top:50% are the CSS anchor; GSAP adds xPercent/yPercent/y/scale.
      */}
      <img
        ref={logoRef}
        src="/images/logo.png"
        alt="Decograph Interiors"
        style={{
          position: "absolute",
          top:      "50%",
          left:     "50%",
          width:    "clamp(500px, 50vw, 800px)",
          height:   "auto",
          opacity:  0,
        }}
      />
    </div>
  );
}
