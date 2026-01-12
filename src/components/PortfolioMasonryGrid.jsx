"use client";

// Portfolio images organized in rows with varying sizes
const portfolioImages = [
  // Row 1
  [
    { seed: "office1", w: 311, h: 229 },
    { seed: "office2", w: 401, h: 229 },
    { seed: "office3", w: 227, h: 229 },
    { seed: "office4", w: 282, h: 229 },
  ],
  // Row 2
  [
    { seed: "retail1", w: 349, h: 217 },
    { seed: "retail2", w: 401, h: 217 },
    { seed: "retail3", w: 440, h: 217 },
  ],
  // Row 3
  [
    { seed: "villa1", w: 349, h: 344 },
    { seed: "villa2", w: 401, h: 344 },
    { seed: "villa3", w: 440, h: 344 },
  ],
  // Row 4
  [
    { seed: "cafe1", w: 311, h: 238 },
    { seed: "cafe2", w: 401, h: 238 },
    { seed: "cafe3", w: 227, h: 238 },
    { seed: "cafe4", w: 282, h: 238 },
  ],
  // Row 5
  [
    { seed: "event1", w: 349, h: 323 },
    { seed: "event2", w: 440, h: 323 },
    { seed: "event3", w: 401, h: 323 },
  ],
  // Row 6
  [
    { seed: "sports1", w: 349, h: 204 },
    { seed: "sports2", w: 401, h: 204 },
    { seed: "sports3", w: 440, h: 204 },
  ],
];

export default function PortfolioMasonryGrid() {
  return (
    <section className="py-16 px-6 lg:px-16 max-w-[1440px] mx-auto">
      <div className="space-y-4">
        {portfolioImages.map((row, rowIdx) => (
          <div key={rowIdx} className="flex gap-4 justify-center flex-wrap">
            {row.map((img, imgIdx) => (
              <div
                key={imgIdx}
                className="relative overflow-hidden rounded-lg group cursor-pointer"
                style={{
                  width: `${img.w}px`,
                  height: `${img.h}px`,
                  flexShrink: 0,
                }}
              >
                <img
                  src={`https://picsum.photos/seed/${img.seed}/${img.w}/${img.h}`}
                  alt={`Portfolio ${rowIdx}-${imgIdx}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
