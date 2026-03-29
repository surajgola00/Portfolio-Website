import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import "../../styles/sections.css";

function CertificatesSection({ certificates = [], achievements = [] }) {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);
  const timerRef = useRef(null);
  const credentialItems = useMemo(
    () => [
      ...certificates.map((certificate) => ({
        ...certificate,
        type: "certificate",
      })),
      ...achievements.map((achievement) => ({
        ...achievement,
        type: "achievement",
      })),
    ],
    [achievements, certificates],
  );

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
                entry.target.querySelectorAll(".certificate-card"),
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
    <section
      className="portfolio-section certificates-section"
      ref={sectionRef}
    >
      <div className="container">
        <h2>Certificates & Achievements</h2>
        <div className="certificates-grid">
          {credentialItems.map((item) => (
            <div key={item.id} className="certificate-card">
              <div className="cert-icon">
                {item.type === "achievement" ? "Award" : "Certificate"}
              </div>
              <h3>{item.title}</h3>
              <p className="cert-issuer">{item.issuer}</p>
              {item.date && <p className="cert-date">{item.date}</p>}
              {item.description && (
                <p className="cert-description">{item.description}</p>
              )}
              {item.credentialUrl && item.credentialUrl !== "#" && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  {item.type === "achievement" ? "View Details" : "View Credential"}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CertificatesSection;
