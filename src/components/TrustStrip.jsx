"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 200, suffix: "+", label: "Projects Completed" },
  { value: 50000, suffix: "+", label: "Square Meters Designed", display: "50,000+" },
  { value: 30, suffix: "+", label: "Designer Projects" },
];

function CountUp({ target, suffix, display, inView }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || display) return;

    let current = 0;
    const steps = 60;
    const increment = target / steps;
    const interval = 2000 / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [inView, target, display]);

  if (display) return <span>{display}</span>;
  return <span>{inView ? count.toLocaleString() + suffix : "0" + suffix}</span>;
}

export default function TrustStrip() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-decograph-red py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 text-white">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`flex flex-col items-center text-center ${
                i < stats.length - 1 ? "md:border-r md:border-white/20" : ""
              }`}
            >
              <span className="text-5xl lg:text-6xl font-light tracking-tight mb-3">
                <CountUp
                  target={stat.value}
                  suffix={stat.suffix}
                  display={stat.display}
                  inView={inView}
                />
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
