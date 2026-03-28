import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/sections.css";

function AboutSection({ aboutParagraphs }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gsap) {
            gsap.fromTo(
              entry.target,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="portfolio-section about-section" ref={sectionRef}>
      <div className="container">
        <h2>👤 About Me</h2>
        <div className="section-rich-text">
          {aboutParagraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph}`} className="section-text">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
