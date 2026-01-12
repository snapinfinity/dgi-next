"use client";

// Placeholder images for portfolio
const portfolioItems = [
  { width: 311, height: 229, seed: "office1" },
  { width: 401, height: 217, seed: "retail1" },
  { width: 401, height: 344, seed: "lobby1" },
  { width: 349, height: 348, seed: "restaurant1" },
  { width: 440, height: 323, seed: "living1" },
  { width: 440, height: 238, seed: "bedroom1" },
  { width: 349, height: 204, seed: "kitchen1" },
  { width: 349, height: 238, seed: "bathroom1" },
  { width: 227, height: 229, seed: "hotel1" },
  { width: 282, height: 229, seed: "spa1" },
];

const PortfolioGroup = ({ groupIndex }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 auto-rows-auto">
      {portfolioItems.map((item, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden rounded-lg cursor-pointer"
          style={{
            gridRow: `span ${Math.ceil(item.height / 120)}`,
          }}
        >
          <img
            src={`https://picsum.photos/seed/${item.seed}${groupIndex}/440/320`}
            alt={`Portfolio Project ${idx + 1}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );
};

export default function PortfolioGrid() {
  return (
    <section className="relative py-20 px-6 lg:px-24 overflow-hidden">
      {/* Blurred White Background */}
      <div className="absolute inset-0 bg-white blur-[366px] -z-10" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto space-y-16">
        {/* Portfolio Groups */}
        {[0, 1, 2, 3, 4, 5].map((groupIndex) => (
          <PortfolioGroup key={groupIndex} groupIndex={groupIndex} />
        ))}
      </div>
    </section>
  );
}
