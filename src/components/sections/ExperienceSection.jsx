import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/sections.css";

function ExperienceSection({ experience }) {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const timerRef = useRef(null);

  const getExperienceLabel = (type) => {
    if (type === "hackathon") return "🏆 Hackathon";
    if (type === "education") return "📖 Education";
    if (type === "project") return "🚀 Project";
    return "💼 Work";
  };

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
                entry.target.querySelectorAll(".experience-item"),
                { opacity: 0, x: -30 },
                {
                  opacity: 1,
                  x: 0,
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
    <section className="portfolio-section experience-section" ref={sectionRef}>
      <div className="container">
        <h2>📚 Experience</h2>
        <div className="experience-timeline">
          {experience.map((exp) => (
            <div
              key={exp.id}
              className={`experience-item ${exp.highlight ? "highlight" : ""}`}
            >
              <div className="experience-marker"></div>
              <div className="experience-content">
                <h3>{exp.title}</h3>
                <p className="org-name">{exp.organization}</p>
                <p className="exp-type">{getExperienceLabel(exp.type)}</p>
                <p className="exp-date">{exp.date}</p>
                <p className="exp-description">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ExperienceSection;
