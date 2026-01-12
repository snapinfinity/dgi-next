"use client";

export default function AboutSection() {
  return (
    <section className="relative py-32 px-6 lg:px-24 overflow-hidden">
      {/* Blurred Red Background */}
      <div className="absolute inset-0 bg-decograph-red blur-[366px] opacity-80" />

      {/* Content */}
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="font-serif text-2xl md:text-4xl lg:text-5xl leading-relaxed text-white">
          <span className="text-white">
            Decograph Interior Design Studio is a full-service interior design
            and fit-out company specializing in residential, commercial, retail,
            and hospitality spaces.{" "}
          </span>
          <span className="text-white/35">
            We provide end-to-end solutions including interior design, civil
            works, custom joinery, and complete MEP and HVAC services. Our work
            style combines modern, clean aesthetics with strong functionality
            and technical precision. Every project is executed with meticulous
            attention to detail, structured project management, and strict
            quality standards. At Decograph, we create refined, durable, and
            efficient interiors that enhance the way spaces are experienced.
          </span>
        </p>
      </div>
    </section>
  );
}
