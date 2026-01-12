"use client";

const services = [
  "Interior Fitout",
  "Carpentry & Joinery",
  "Mechanical, Electrical & Plumbing (MEP)",
  "Pools & Landscaping",
  "Facility Management",
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <h2 className="text-4xl font-medium text-decograph-red mb-4">Services</h2>
      <p className="text-gray-900 font-light max-w-xl mb-12">
        Our services are designed to transform spaces through expert planning,
        skilled execution, and attention to detail across every stage of the
        project.
      </p>

      {/* Services List */}
      <div className="border-t border-decograph-red">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="py-8 border-b border-decograph-red flex items-center justify-between group cursor-pointer hover:bg-gray-50 transition-colors px-4 -mx-4"
          >
            <span className="text-xl lg:text-2xl text-gray-900">{service}</span>
            <svg
              className="w-6 h-6 text-decograph-red opacity-0 group-hover:opacity-100 transition-opacity"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
