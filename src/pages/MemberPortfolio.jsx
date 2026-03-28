import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { MEMBERS_ARRAY, getMemberById } from "../data/members";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import ObjectiveSection from "../components/sections/ObjectiveSection";
import AboutSection from "../components/sections/AboutSection";
import SkillsSection from "../components/sections/SkillsSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import ExperienceSection from "../components/sections/ExperienceSection";
import CertificatesSection from "../components/sections/CertificatesSection";
import { updateDocumentMetadata } from "../utils/seo";
import "../styles/portfolio.css";

function MemberPortfolio() {
  const { memberName } = useParams();
  const navigate = useNavigate();
  const memberData = useMemo(() => getMemberById(memberName), [memberName]);

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

  return (
    <div className="portfolio-page">
      <Header currentMemberId={memberData.id} allMembers={MEMBERS_ARRAY} />

      <main className="portfolio-content">
        <HeroSection member={memberData} />

        <div className="sections-container">
          {memberData.objective && (
            <ObjectiveSection objective={memberData.objective} />
          )}
          {memberData.aboutParagraphs?.length > 0 && (
            <AboutSection aboutParagraphs={memberData.aboutParagraphs} />
          )}
          {memberData.skills?.length > 0 && (
            <SkillsSection skills={memberData.skills} />
          )}
          {memberData.projects?.length > 0 && (
            <ProjectsSection projects={memberData.projects} />
          )}
          {memberData.experience?.length > 0 && (
            <ExperienceSection experience={memberData.experience} />
          )}
          {memberData.certificates?.length > 0 && (
            <CertificatesSection certificates={memberData.certificates} />
          )}

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
                    📥 Download Resume
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
        </div>
      </main>
    </div>
  );
}

export default MemberPortfolio;
