import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { MEMBERS_ARRAY, getMemberById } from "../data/members";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ObjectiveSection from "../components/sections/ObjectiveSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import CertificatesSection from "../components/sections/CertificatesSection";
import SectionNav from "../components/SectionNav";
import Footer from "../components/Footer";
import { updateDocumentMetadata } from "../utils/seo";
import "../styles/portfolio.css";

function MemberPortfolio() {
  const { memberName } = useParams();
  const navigate = useNavigate();
  const memberData = useMemo(() => getMemberById(memberName), [memberName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [memberName]);

  useEffect(() => {
    if (!memberData) {
      navigate("/", { replace: true });
      return;
    }

    updateDocumentMetadata({
      title: `${memberData.name} | ${memberData.role} | TodFodCoders`,
      description: memberData.bio || memberData.objective,
    });
  }, [memberData, navigate]);

  if (!memberData) {
    return null;
  }

  const contactItems = [
    memberData.contact.email
      ? {
          label: "Email",
          href: `mailto:${memberData.contact.email}`,
          value: memberData.contact.email,
        }
      : null,
    memberData.contact.phone && !/[xX]{2,}/.test(memberData.contact.phone)
      ? {
          label: "Phone",
          href: `tel:${memberData.contact.phone.replace(/[^\d+]/g, "")}`,
          value: memberData.contact.phone,
        }
      : memberData.contact.phone
        ? { label: "Phone", value: memberData.contact.phone }
        : null,
    memberData.contact.location
      ? { label: "Location", value: memberData.contact.location }
      : null,
  ].filter(Boolean);

  const hasCertificatesSection =
    (memberData.certificates?.length || 0) > 0 ||
    (memberData.achievements?.length || 0) > 0;

  const hasResumeSection =
    contactItems.length > 0 ||
    Boolean(memberData.resumeUrl) ||
    Boolean(memberData.resume?.heading) ||
    (memberData.resume?.sections?.length || 0) > 0;

  const sections = [
    memberData.objective
      ? { id: "objective", className: "objective-section", label: "Objective", icon: "\u{1F3AF}" }
      : null,
    memberData.aboutParagraphs?.length > 0
      ? { id: "about", className: "about-section", label: "About", icon: "\u{1F464}" }
      : null,
    memberData.skills?.length > 0
      ? { id: "skills", className: "skills-section", label: "Skills", icon: "\u{1F6E0}" }
      : null,
    memberData.projects?.length > 0
      ? { id: "projects", className: "projects-section", label: "Projects", icon: "\u{1F680}" }
      : null,
    hasCertificatesSection
      ? {
          id: "certificates",
          className: "certificates-section",
          label: "Certificates",
          icon: "\u{1F3C6}",
        }
      : null,
    hasResumeSection
      ? {
          id: "resume-certifications",
          className: "resume-section",
          label: "Resume & Certifications",
          icon: "\u{1F4C4}",
          targetClassNames: hasCertificatesSection
            ? ["resume-section", "certificates-section"]
            : ["resume-section"],
        }
      : null,
  ].filter(Boolean);

  return (
    <div className="portfolio-page" key={memberName}>
      <Header currentMemberId={memberData.id} allMembers={MEMBERS_ARRAY} />
      <SectionNav sections={sections} />

      <main className="portfolio-content">
        <HeroSection member={memberData} />

        <div className="sections-container">
          {memberData.objective && (
            <section className="objective-section">
              <ObjectiveSection objective={memberData.objective} />
            </section>
          )}
          {memberData.aboutParagraphs?.length > 0 && (
            <section className="about-section">
              <AboutSection aboutParagraphs={memberData.aboutParagraphs} />
            </section>
          )}
          {memberData.skills?.length > 0 && (
            <section className="skills-section">
              <SkillsSection skills={memberData.skills} />
            </section>
          )}
          {memberData.projects?.length > 0 && (
            <section className="projects-section">
              <ProjectsSection projects={memberData.projects} />
            </section>
          )}
          {hasCertificatesSection && (
            <section className="certificates-section">
              <CertificatesSection
                certificates={memberData.certificates}
                achievements={memberData.achievements}
              />
            </section>
          )}
          {hasResumeSection && (
            <section className="resume-section">
              <div className="container">
                <h2>Resume & Contact</h2>
                <div className="resume-content">
                  {memberData.resume?.heading && (
                    <p className="resume-heading">{memberData.resume.heading}</p>
                  )}

                  {contactItems.length > 0 && (
                    <div className="contact-links">
                      {contactItems.map((item) =>
                        item.href ? (
                          <a
                            key={item.label}
                            href={item.href}
                            className="contact-link"
                          >
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </a>
                        ) : (
                          <div key={item.label} className="contact-link static">
                            <span>{item.label}</span>
                            <strong>{item.value}</strong>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {memberData.resumeUrl && (
                    <a
                      href={memberData.resumeUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-btn"
                    >
                      Download Resume
                    </a>
                  )}

                  {memberData.resume?.sections?.length > 0 && (
                    <div className="resume-grid">
                      {memberData.resume.sections.map((section) => (
                        <article key={section.title} className="resume-card">
                          <h3>{section.title}</h3>
                          <p>{section.content}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default MemberPortfolio;
