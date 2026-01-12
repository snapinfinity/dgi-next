"use client";

export default function AboutHeroSection() {
  return (
    <section className="py-16 px-6 lg:px-24 max-w-[1440px] mx-auto border-b border-decograph-red">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left - Text Content */}
        <div>
          <h1 className="text-4xl lg:text-5xl font-medium text-decograph-red mb-6">
            About
          </h1>
          <p className="text-gray-900 font-light leading-relaxed">
            Decograph Interiors, where spaces transform, and dreams come to
            life. With a sharp eye for design and an unwavering commitment to
            precision, we specialize in turning ordinary environments into
            extraordinary experiences. Our expertise spans across retail,
            residential, and commercial sectors, encompassing a full suite of
            services from interior design to civil and MEP (Mechanical,
            Electrical, and Plumbing) solutions.
          </p>
        </div>

        {/* Right - Image */}
        <div className="relative">
          <div className="aspect-[3/2] rounded-2xl overflow-hidden">
            <img
              src="https://picsum.photos/seed/abouthero/600/400"
              alt="Decograph Interior Design"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
