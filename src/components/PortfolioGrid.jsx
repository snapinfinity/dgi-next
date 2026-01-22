"use client";

// Clean bento grid with balanced proportions - all areas form proper rectangles
const bentoLayouts = [
  // Layout 1: Large left, horizontal top, center + right stack
  {
    template: `
      "a a b b b"
      "a a c c d"
      "a a c c e"
    `,
    columns: "1fr 1fr 1fr 1fr 1fr",
    rows: "180px 180px 180px",
    items: [
      { area: "a", seed: "interior" },
      { area: "b", seed: "office" },
      { area: "c", seed: "lounge" },
      { area: "d", seed: "detail" },
      { area: "e", seed: "light" },
    ]
  },
  // Layout 2: Top row split, tall left, stacked right
  {
    template: `
      "a a a b b"
      "c c d d d"
      "c c e e e"
    `,
    columns: "1fr 1fr 1fr 1fr 1fr",
    rows: "200px 170px 170px",
    items: [
      { area: "a", seed: "reception" },
      { area: "b", seed: "meeting" },
      { area: "c", seed: "workspace" },
      { area: "d", seed: "booth" },
      { area: "e", seed: "lobby" },
    ]
  },
  // Layout 3: Tall right feature
  {
    template: `
      "a a b b c c"
      "a a d d c c"
      "e e d d f f"
    `,
    columns: "1fr 1fr 1fr 1fr 1fr 1fr",
    rows: "180px 180px 180px",
    items: [
      { area: "a", seed: "hall" },
      { area: "b", seed: "table" },
      { area: "c", seed: "window" },
      { area: "d", seed: "corner" },
      { area: "e", seed: "art" },
      { area: "f", seed: "desk" },
    ]
  },
];

const BentoGrid = ({ layout, groupIndex }) => {
  return (
    <div 
      className="grid gap-3"
      style={{
        gridTemplateAreas: layout.template,
        gridTemplateColumns: layout.columns,
        gridTemplateRows: layout.rows,
      }}
    >
      {layout.items.map((item, idx) => (
        <div
          key={idx}
          className="group relative overflow-hidden cursor-pointer"
          style={{ gridArea: item.area }}
        >
          <img
            src={`https://picsum.photos/seed/${item.seed}${groupIndex}/800/700`}
            alt={`Portfolio ${item.seed}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
      ))}
    </div>
  );
};

export default function PortfolioGrid() {
  return (
    <section className="relative py-16 px-6 lg:px-20 overflow-hidden bg-white">
      <div className="relative max-w-[1400px] mx-auto space-y-6">
        {/* Cycle through layouts */}
        {[0, 1, 2, 3, 4, 5].map((groupIndex) => (
          <BentoGrid 
            key={groupIndex} 
            layout={bentoLayouts[groupIndex % bentoLayouts.length]} 
            groupIndex={groupIndex} 
          />
        ))}
      </div>
    </section>
  );
}
