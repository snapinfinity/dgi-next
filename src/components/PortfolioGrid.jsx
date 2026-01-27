"use client";

import Link from "next/link";

// Building icon SVG component
const BuildingIcon = () => (
  <svg width="36" height="39" viewBox="0 0 36 39" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34.5756 37.7704H32.3486V30.968C32.3486 30.6525 32.0912 30.3961 31.7744 30.3961H28.419V12.5069C28.419 5.61009 22.785 0 15.8609 0H7.30502C6.98824 0 6.7308 0.256391 6.7308 0.571875V30.3971H3.37545C3.05867 30.3971 2.80123 30.6535 2.80123 30.9689V37.7714H0.574219C0.257441 37.7714 0 38.0278 0 38.3433C0 38.6587 0.257441 38.9151 0.574219 38.9151H34.5756C34.8924 38.9151 35.1498 38.6587 35.1498 38.3433C35.1498 38.0278 34.8924 37.7714 34.5756 37.7714V37.7704ZM15.8609 1.14375C22.1524 1.14375 27.2706 6.24106 27.2706 12.5069V30.3971H25.2436V15.8981C25.2436 15.839 25.2427 15.7799 25.2417 15.7208C25.2436 15.7027 25.2446 15.6837 25.2436 15.6646C25.2436 15.6446 25.2417 15.6246 25.2398 15.6055C25.168 12.8453 24.0885 10.33 22.3543 8.41228C22.3333 8.38464 22.3094 8.35795 22.2835 8.33508C21.4643 7.44581 20.5025 6.68903 19.4354 6.09905C19.3445 5.9942 19.2153 5.92272 19.0688 5.90556C18.2123 5.47284 17.2926 5.14592 16.3279 4.94291C16.26 4.91431 16.1844 4.89811 16.1059 4.89811C15.4235 4.76848 14.7201 4.70081 14.0004 4.70081H7.88115V1.14375H15.8628H15.8609ZM19.5751 30.3971V27.6406L21.3217 27.6216V30.3971H19.5751ZM16.6801 30.3971V27.673L18.4267 27.654V30.3971H16.6801ZM13.7851 30.3971V27.7045L15.5317 27.6854V30.3971H13.7851ZM10.8901 30.3971V27.7359L12.6366 27.7169V30.3971H10.8901ZM12.6366 5.84361V15.2309L10.8901 15.25V5.84361H12.6366ZM13.9995 5.84361C14.5201 5.84361 15.0321 5.88269 15.5317 5.95894V15.1985L13.7851 15.2176V5.84361H13.9995ZM18.4267 6.86345V15.1671L16.6801 15.1861V6.20389C17.2869 6.37069 17.8706 6.59181 18.4267 6.86345ZM21.3217 8.9832V15.1356L19.5751 15.1547V7.52016C20.2115 7.94144 20.7972 8.4323 21.3217 8.9832ZM24.0636 15.1051L22.4701 15.1223V10.4329C23.3611 11.7987 23.9296 13.3914 24.0636 15.1051ZM19.5751 20.1109L21.3217 20.0919V22.7606L19.5751 22.7797V20.1109ZM18.4267 22.7921L16.6801 22.8111V20.1424L18.4267 20.1233V22.7921ZM22.4701 20.0795L24.0952 20.0614V22.7301L22.4701 22.7482V20.0795ZM24.0952 18.9176L22.4701 18.9357V16.267L24.0952 16.2489V18.9176ZM21.3217 18.9481L19.5751 18.9672V16.2984L21.3217 16.2794V18.9481ZM18.4267 18.9796L16.6801 18.9986V16.3299L18.4267 16.3108V18.9796ZM15.5317 19.011L13.7851 19.0301V16.3613L15.5317 16.3423V19.011ZM12.6366 19.0425L10.8901 19.0615V16.3928L12.6366 16.3737V19.0425ZM9.74162 19.0739L7.88019 19.094V16.4252L9.74162 16.4052V19.0739ZM7.88019 20.2387L9.74162 20.2186V22.8874L7.88019 22.9074V20.2387ZM10.8901 20.2053L12.6366 20.1862V22.855L10.8901 22.874V20.2053ZM13.7851 20.1738L15.5317 20.1548V22.8235L13.7851 22.8426V20.1738ZM15.5317 23.9673V26.5407L13.7851 26.5598V23.9863L15.5317 23.9673ZM16.6801 23.9549L18.4267 23.9358V26.5093L16.6801 26.5283V23.9549ZM19.5751 23.9234L21.3217 23.9044V26.4778L19.5751 26.4969V23.9234ZM22.4701 23.892L24.0952 23.8739V26.4473L22.4701 26.4654V23.892ZM9.74162 15.2624L7.88019 15.2824V5.84361H9.74162V15.2624ZM7.88019 24.0521L9.74162 24.0321V26.6055L7.88019 26.6255V24.0521ZM10.8901 24.0187L12.6366 23.9997V26.5731L10.8901 26.5922V24.0187ZM22.4701 27.6092L24.0952 27.5911V30.3971H22.4701V27.6092ZM7.88019 27.7693L9.74162 27.7493V30.3971H7.88019V27.7693ZM6.63892 37.7704V33.4823H7.91082V37.7704H6.63892ZM11.7897 37.7704V33.4823H13.0616V37.7704H11.7897ZM16.9404 37.7704V33.4823H18.2123V37.7704H16.9404ZM22.0912 37.7704V33.4823H23.363V37.7704H22.0912ZM27.2419 37.7704V33.4823H28.5138V37.7704H27.2419ZM29.6622 37.7704V32.9104C29.6622 32.595 29.4048 32.3386 29.088 32.3386H26.6677C26.3509 32.3386 26.0935 32.595 26.0935 32.9104V37.7704H24.5115V32.9104C24.5115 32.595 24.254 32.3386 23.9373 32.3386H21.5169C21.2002 32.3386 20.9427 32.595 20.9427 32.9104V37.7704H19.3607V32.9104C19.3607 32.595 19.1033 32.3386 18.7865 32.3386H16.3662C16.0494 32.3386 15.792 32.595 15.792 32.9104V37.7704H14.21V32.9104C14.21 32.595 13.9526 32.3386 13.6358 32.3386H11.2154C10.8987 32.3386 10.6412 32.595 10.6412 32.9104V37.7704H9.05926V32.9104C9.05926 32.595 8.80182 32.3386 8.48504 32.3386H6.06471C5.74793 32.3386 5.49049 32.595 5.49049 32.9104V37.7704H3.94967V31.5399H31.2002V37.7704H29.6594H29.6622Z" fill="white"/>
  </svg>
);

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
      { area: "a", seed: "interior", slug: "interior-design-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "b", seed: "office", slug: "office-space-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "c", seed: "lounge", slug: "lounge-area-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "d", seed: "detail", slug: "detail-work-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "e", seed: "light", slug: "lighting-design-1", title1: "Corporate Office", title2: "Heading Text" },
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
      { area: "a", seed: "reception", slug: "reception-area-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "b", seed: "meeting", slug: "meeting-room-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "c", seed: "workspace", slug: "workspace-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "d", seed: "booth", slug: "booth-design-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "e", seed: "lobby", slug: "lobby-area-1", title1: "Corporate Office", title2: "Heading Text" },
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
      { area: "a", seed: "hall", slug: "hall-design-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "b", seed: "table", slug: "table-area-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "c", seed: "window", slug: "window-design-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "d", seed: "corner", slug: "corner-space-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "e", seed: "art", slug: "art-installation-1", title1: "Corporate Office", title2: "Heading Text" },
      { area: "f", seed: "desk", slug: "desk-area-1", title1: "Corporate Office", title2: "Heading Text" },
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
        <Link
          key={idx}
          href={`/portfolio/${item.slug}`}
          className="group relative overflow-hidden cursor-pointer block"
          style={{ gridArea: item.area }}
        >
          <img
            src={`https://picsum.photos/seed/${item.seed}${groupIndex}/800/700`}
            alt={`Portfolio ${item.seed}`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Hover overlay with red background and content */}
          <div className="absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
            <BuildingIcon />
            <span className="portfolio-title1 mt-4">{item.title1}</span>
            <span className="portfolio-title2 mt-1">{item.title2}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default function PortfolioGrid() {
  const groups = [0, 1, 2, 3, 4, 5];

  return (
    <section className="relative py-8 md:py-16 px-6 lg:px-20 overflow-hidden bg-white">
      <div className="relative max-w-[1400px] mx-auto">
        {/* Mobile View: Simple Grid (1 Column) */}
        <div className="md:hidden space-y-4">
          {groups.map((groupIndex) => {
            const layout = bentoLayouts[groupIndex % bentoLayouts.length];
            return layout.items.map((item, idx) => (
              <Link
                key={`${groupIndex}-${idx}`}
                href={`/portfolio/${item.slug}`}
                className="group relative overflow-hidden cursor-pointer h-[300px] block"
              >
                <img
                  src={`https://picsum.photos/seed/${item.seed}${groupIndex}/800/700`}
                  alt={`Portfolio ${item.seed}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Hover overlay with red background and content */}
                <div className="absolute inset-0 bg-decograph-red opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                  <BuildingIcon />
                  <span className="portfolio-title1 mt-4">{item.title1}</span>
                  <span className="portfolio-title2 mt-1">{item.title2}</span>
                </div>
              </Link>
            ));
          })}
        </div>

        {/* Desktop View: Bento Grid */}
        <div className="hidden md:block space-y-6">
          {groups.map((groupIndex) => (
            <BentoGrid 
              key={groupIndex} 
              layout={bentoLayouts[groupIndex % bentoLayouts.length]} 
              groupIndex={groupIndex} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}
