import { useEffect, useRef, useState } from "react";
import "../styles/section-nav.css";

function SectionNav({ sections }) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id || "objective");
  const navRef = useRef(null);

  useEffect(() => {
    setActiveSection(sections[0]?.id || "objective");
  }, [sections]);

  useEffect(() => {
    const getTargetSelectors = (section) =>
      section.targetClassNames?.length > 0
        ? section.targetClassNames
        : section.className
          ? [section.className]
          : [];

    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2;

      for (const section of sections) {
        const targetSelectors = getTargetSelectors(section);

        for (const selector of targetSelectors) {
          const element = document.querySelector(`.${selector}`);
          if (!element) {
            continue;
          }

          const rect = element.getBoundingClientRect();
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            setActiveSection(section.id);
            return;
          }
        }
      }

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        setActiveSection(sections[sections.length - 1]?.id || activeSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection, sections]);

  const handleNavClick = (section) => {
    const targetSelectors =
      section.targetClassNames?.length > 0
        ? section.targetClassNames
        : section.className
          ? [section.className]
          : [];

    const element = targetSelectors
      .map((selector) => document.querySelector(`.${selector}`))
      .find(Boolean);

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="section-nav" ref={navRef}>
      <div className="nav-container">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`nav-item ${activeSection === section.id ? "active" : ""}`}
            onClick={() => handleNavClick(section)}
            title={section.label}
          >
            <span className="nav-icon">{section.icon}</span>
            <span className="nav-label">{section.label}</span>
            {activeSection === section.id && <span className="nav-indicator"></span>}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default SectionNav;
