"use client";

import { useServices } from "@/hooks/useServices";

export default function ServicesSection() {
  const { data: services = [], isLoading } = useServices();

  if (isLoading) {
    return (
      <section id="services" className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
        {/* Section Header */}
        <h2 className="about-heading text-decograph-red mb-4">Services</h2>
        <p className="about-text text-gray-900 max-w-xl mb-12">
          Our services are designed to transform spaces through expert planning,
          skilled execution, and attention to detail across every stage of the
          project.
        </p>

        {/* Loading Skeleton */}
        <div>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="py-8 border-b border-decograph-red animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

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
            key={service.id || idx}
            className="py-8 border-b border-decograph-red group cursor-pointer"
          >
            {/* Collapsed State - Service Title (desktop only, hidden on hover) */}
            <div className="hidden md:flex items-center justify-between md:group-hover:hidden">
              <span className="service-title text-gray-900">{service.heading || service.title}</span>
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
                    {service.heading || service.title}
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
