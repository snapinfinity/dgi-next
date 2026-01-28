"use client";

const services = [
  {
    title: "Interior Fitout",
    description: "End-to-end interior fitout solutions tailored to commercial and residential spaces, delivering functionality, aesthetics, and quality finishes."
  },
  {
    title: "Carpentry & Joinery",
    description: "Custom-crafted carpentry and joinery solutions that combine precision, durability, and refined detailing for every space."
  },
  {
    title: "Mechanical, Electrical & Plumbing (MEP)",
    description: "Integrated MEP services ensuring efficient systems, safety compliance, and seamless coordination within your interiors."
  },
  {
    title: "Pools & Landscaping",
    description: "Thoughtfully designed pools and landscaping solutions that enhance outdoor spaces with elegance and sustainability."
  },
  {
    title: "Facility Management",
    description: "Comprehensive facility management services to maintain, operate, and optimize spaces for long-term performance."
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <h2 className="about-heading text-decograph-red mb-4">Services</h2>
      <p className="about-text text-gray-900 max-w-xl mb-12">
        Our services are designed to transform spaces through expert planning,
        skilled execution, and attention to detail across every stage of the
        project.
      </p>

      {/* Services List */}
      <div>
        {services.map((service, idx) => (
          <div
            key={idx}
            className="py-8 border-b border-decograph-red group cursor-pointer"
          >
            {/* Collapsed State - Service Title (desktop only, hidden on hover) */}
            <div className="hidden md:flex items-center justify-between md:group-hover:hidden">
              <span className="service-title text-gray-900">{service.title}</span>
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
            
            {/* Expanded State - Bullet + Title + Description (always on mobile, hover on desktop) */}
            <div className="block md:hidden md:group-hover:block">
              <div className="flex items-start gap-4">
                {/* Bullet Point */}
                <div 
                  className="w-7 h-7 rounded-full bg-decograph-red flex-shrink-0 mt-1"
                  style={{ minWidth: '28px', minHeight: '28px' }}
                />
                <div>
                  {/* Title */}
                  <h3 className="service-title text-decograph-red mb-3">
                    {service.title}
                  </h3>
                  {/* Description */}
                  <p className="service-description text-gray-900">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
