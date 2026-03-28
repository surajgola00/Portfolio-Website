import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TEAM_CONFIG } from "../config/teamConfig";
import { MEMBERS_ARRAY } from "../data/members";
import MemberCard from "../components/MemberCard";
import {
  DEFAULT_PAGE_DESCRIPTION,
  DEFAULT_PAGE_TITLE,
  updateDocumentMetadata,
} from "../utils/seo";
import "../styles/landing.css";

function LandingPage() {
  const navigate = useNavigate();
  const navigationTimeoutRef = useRef(null);

  useEffect(() => {
    updateDocumentMetadata({
      title: DEFAULT_PAGE_TITLE,
      description: DEFAULT_PAGE_DESCRIPTION,
    });

    if (!gsap?.timeline) {
      return undefined;
    }

    const timeline = gsap.timeline();

    timeline
      .fromTo(
        ".landing-hero h1",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      )
      .fromTo(
        ".landing-hero p",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.8",
      )
      .fromTo(
        ".member-card",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        },
        "-=0.4",
      );

    return () => {
      timeline.kill();
    };
  }, []);

  useEffect(
    () => () => {
      if (navigationTimeoutRef.current) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    },
    [],
  );

  const handleMemberClick = (memberId) => {
    const transitionDuration = gsap?.to ? 300 : 0;

    if (navigationTimeoutRef.current) {
      window.clearTimeout(navigationTimeoutRef.current);
    }

    if (gsap?.to) {
      gsap.to(".member-card", {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: "power1.in",
      });
    }

    navigationTimeoutRef.current = window.setTimeout(() => {
      navigate(`/${memberId}`);
    }, transitionDuration);
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="landing-hero">
        <div className="container">
          <h1>{TEAM_CONFIG.teamName}</h1>
          <p className="subtitle">
            A passionate team innovating at {TEAM_CONFIG.hackathonName}
          </p>
          <p className="description">{TEAM_CONFIG.hackathonDescription}</p>
        </div>
      </section>

      {/* Team Members Grid */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="members-grid">
            {MEMBERS_ARRAY.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                onClick={() => handleMemberClick(member.id)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleMemberClick(member.id);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="container">
          <p>
            &copy; {new Date().getFullYear()} {TEAM_CONFIG.teamName}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
