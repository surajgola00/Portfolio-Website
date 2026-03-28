import { useEffect, useRef } from "react";
import gsap from "gsap";
import "../../styles/sections.css";

function CertificatesSection({ certificates }) {
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
        <h2>🏆 Certificates & Achievements</h2>
        <div className="certificates-grid">
          {certificates.map((cert) => (
            <div key={cert.id} className="certificate-card">
              <div className="cert-icon">🎓</div>
              <h3>{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <p className="cert-date">{cert.date}</p>
              {cert.credentialUrl && cert.credentialUrl !== "#" && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-link"
                >
                  View Credential
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
