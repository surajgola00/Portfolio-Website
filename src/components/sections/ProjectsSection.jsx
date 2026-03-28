import { useEffect, useRef } from "react";
import gsap from "gsap";
import ProjectCard from "../ProjectCard";
import "../../styles/sections.css";

function ProjectsSection({ projects }) {
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
                entry.target.querySelectorAll(".project-card"),
                { opacity: 0, scale: 0.95 },
                {
                  opacity: 1,
                  scale: 1,
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
    <section className="portfolio-section projects-section" ref={sectionRef}>
      <div className="container">
        <h2>🚀 Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
