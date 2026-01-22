import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const text1 = "Decograph Interior Design Studio is a full-service interior design and fit-out company specializing in residential, commercial, retail, and hospitality spaces.";
  const text2 = "We provide end-to-end solutions including interior design, civil works, custom joinery, and complete MEP and HVAC services. Our work style combines modern, clean aesthetics with strong functionality and technical precision. Every project is executed with meticulous attention to detail, structured project management, and strict quality standards. At Decograph, we create refined, durable, and efficient interiors that enhance the way spaces are experienced.";

  const splitText = (text) => {
    return text.split("").map((char, index) => (
      <span key={index} className="char" style={{ color: "#FFFFFF59" }}>
        {char}
      </span>
    ));
  };

  useLayoutEffect(() => {
    const chars = textRef.current.querySelectorAll(".char");
    const totalChars = chars.length;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "+=150%",
        scrub: true,
        onUpdate: (self) => {
          // Calculate how many characters should be lit based on scroll progress
          const progress = self.progress;
          const litCount = Math.floor(progress * totalChars);
          
          chars.forEach((char, index) => {
            if (index < litCount) {
              char.style.color = "#ffffff";
            } else {
              char.style.color = "#FFFFFF59";
            }
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="sticky top-0 z-0 py-32 px-6 lg:px-24 overflow-hidden h-screen flex items-center justify-center bg-decograph-red">

      {/* Content */}
      <div className="relative max-w-7xl mx-auto text-center">
        <p ref={textRef} className="font-serif text-xl md:text-2xl lg:text-4xl leading-relaxed">
          <span>
            {splitText(text1)}
          </span>
          {" "}
          <span>
            {splitText(text2)}
          </span>
        </p>
      </div>
    </section>
  );
}
