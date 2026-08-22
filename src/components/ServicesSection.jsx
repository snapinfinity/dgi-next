"use client";

import { useServices } from "@/hooks/useServices";

const fallbackServices = [
  {
    id: "carpentry-joinery",
    heading: "Carpentry & Joinery",
    description:
      "Custom woodwork and precision joinery crafted to elevate every interior space with unmatched quality, craftsmanship, and attention to detail.",
  },
  {
    id: "interior-fitout",
    heading: "Interior Fitout",
    description:
      "End-to-end fit-out solutions for residential, commercial, retail, and hospitality environments — delivered with precision and structured project management.",
  },
  {
    id: "facility-management",
    heading: "Facility Management",
    description:
      "Comprehensive facility management services to maintain, operate, and enhance the long-term performance and condition of your space.",
  },
  {
    id: "pools-landscaping",
    heading: "Pools & Landscaping",
    description:
      "Bespoke pool design and landscaping solutions that complement and extend your interior vision seamlessly into outdoor environments.",
  },
  {
    id: "mep",
    heading: "Mechanical, Electrical & Plumbing (MEP)",
    description:
      "Integrated MEP services ensuring efficient systems, safety compliance, and seamless coordination within your interiors.",
  },
];

const serviceIcons = [
  // Carpentry & Joinery
  <svg key="joinery" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>,
  // Interior Fitout
  <svg key="fitout" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>,
  // Facility Management
  <svg key="facility" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
  // Pools & Landscaping
  <svg key="pools" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1.5M6.343 6.343l-1.06 1.06M3 12H1.5M6.343 17.657l-1.06 1.06M12 19.5V21M17.657 17.657l1.06 1.06M21 12h-1.5M17.657 6.343l1.06-1.06M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
  </svg>,
  // MEP
  <svg key="mep" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>,
  // Extra fallback icon
  <svg key="design" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
  </svg>,
];

function ServiceCard({ service, idx }) {
  return (
    <div className="group relative border border-gray-100 hover:border-decograph-red p-8 transition-all duration-300 hover:shadow-md bg-white cursor-default overflow-hidden">
      {/* Animated top border accent */}
      <div className="absolute top-0 left-0 w-0 group-hover:w-full h-0.5 bg-decograph-red transition-all duration-500" />

      {/* Background number */}
      <span className="absolute top-5 right-6 text-gray-100 group-hover:text-red-50 transition-colors text-4xl font-bold select-none leading-none">
        {String(idx + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center bg-gray-50 group-hover:bg-red-50 transition-colors mb-6 text-decograph-red">
        {serviceIcons[idx % serviceIcons.length]}
      </div>

      {/* Title */}
      <h3 className="service-title text-gray-900 mb-3 group-hover:text-decograph-red transition-colors leading-snug">
        {service.heading || service.title}
      </h3>

      {/* Description */}
      <p className="service-description text-gray-500 leading-relaxed">
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  const { data: fetchedServices = [], isLoading } = useServices();

  const services = fetchedServices.length > 0 ? fetchedServices : fallbackServices;

  if (isLoading) {
    return (
      <section id="services" className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
        <h2 className="about-heading text-decograph-red mb-4">Services</h2>
        <p className="about-text text-gray-900 max-w-xl mb-12">
          Our services are designed to transform spaces through expert planning,
          skilled execution, and attention to detail across every stage of the project.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div key={idx} className="h-56 bg-gray-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto">
      <h2 className="about-heading text-decograph-red mb-4">Services</h2>
      <p className="about-text text-gray-900 max-w-xl mb-12">
        Our services are designed to transform spaces through expert planning,
        skilled execution, and attention to detail across every stage of the project.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <ServiceCard key={service.id || idx} service={service} idx={idx} />
        ))}
      </div>
    </section>
  );
}
