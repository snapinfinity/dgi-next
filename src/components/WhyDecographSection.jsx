"use client";

const pillars = [
  {
    number: "01",
    title: "Design Excellence",
    description:
      "Award-winning designs that blend aesthetics with functionality, creating spaces that inspire and perform.",
  },
  {
    number: "02",
    title: "Quality Execution",
    description:
      "Meticulous attention to detail and premium materials ensure every project meets the highest standards.",
  },
  {
    number: "03",
    title: "Client Partnership",
    description:
      "We work closely with you at every stage, ensuring your vision is realized beyond expectations.",
  },
  {
    number: "04",
    title: "Timely Delivery",
    description:
      "Professional project management ensures your space is ready when you need it, without compromising quality.",
  },
];

export default function WhyDecographSection() {
  return (
    <section className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-medium text-decograph-red mb-4">
          Why Decograph
        </h2>
        <div className="w-20 h-0.5 bg-decograph-red mx-auto mb-4" />
        <p className="text-gray-900 font-light max-w-xl mx-auto">
          Four pillars that define our commitment to transforming spaces and
          exceeding expectations.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pillars.map((pillar, idx) => (
          <div
            key={idx}
            className="relative p-8 rounded-lg border border-decograph-red/20 hover:border-decograph-red/50 transition-colors group"
          >
            {/* Top accent line (shown on hover) */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-decograph-red rounded-t-lg opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Number */}
            <span className="text-5xl font-medium text-decograph-red/20 mb-4 block">
              {pillar.number}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-medium text-decograph-red mb-3">
              {pillar.title}
            </h3>

            {/* Description */}
            <p className="text-gray-900/70 font-light leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
