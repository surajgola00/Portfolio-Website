import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/sections.css";

function SkillsSection({ skills }) {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current && gsap) {
            hasAnimatedRef.current = true;

            gsap.fromTo(
              entry.target.querySelector("h2"),
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            );

            timerRef.current = window.setTimeout(() => {
              gsap.fromTo(
                entry.target.querySelectorAll(".skill-category"),
                { opacity: 0, y: 30 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  ease: "power2.out",
                },
              );
            }, 200);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <section className="portfolio-section skills-section" ref={sectionRef}>
      <div className="container">
        <h2>💻 Skills</h2>
        <div className="skills-grid">
          {skills.map((skillGroup, idx) => (
            <div key={idx} className="skill-category">
              <h3>{skillGroup.category}</h3>
              <div className="skill-tags">
                {skillGroup.items.map((skill, skillIdx) => (
                  <span key={skillIdx} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
