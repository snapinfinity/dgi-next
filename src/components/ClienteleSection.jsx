"use client";

// Placeholder client logos - would be replaced with actual client logos
const clients = [
  "Informa",
  "Client 2",
  "Client 3",
  "Client 4",
  "Client 5",
  "Client 6",
  "Client 7",
  "Client 8",
  "Client 9",
  "Client 10",
];

export default function ClienteleSection() {
  return (
    <section id="clientele" className="py-24 px-6 lg:px-24 max-w-[1440px] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-medium text-decograph-red mb-4">
          Clientele
        </h2>
        <p className="text-gray-900 font-light max-w-xl mx-auto">
          Building long-term partnerships with leading organizations across
          diverse industries.
        </p>
      </div>

      {/* Client Logos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center justify-items-center">
        {clients.map((client, idx) => (
          <div
            key={idx}
            className="w-32 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 text-sm font-light hover:bg-gray-200 transition-colors"
          >
            {client}
          </div>
        ))}
      </div>
    </section>
  );
}
