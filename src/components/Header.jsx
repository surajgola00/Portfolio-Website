import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TEAM_CONFIG } from "../config/teamConfig";
import "../styles/header.css";

function Header({ currentMemberId, allMembers }) {
  const navigate = useNavigate();
  const navigationTimeoutRef = useRef(null);

  useEffect(() => {
    if (gsap) {
      const activeMember = document.querySelector(
        `[data-member-id="${currentMemberId}"]`,
      );
      if (activeMember) {
        gsap.to(activeMember, {
          color: "var(--primary)",
          duration: 0.3,
          ease: "power2.out",
        });
      }
    }
  }, [currentMemberId]);

  useEffect(
    () => () => {
      if (navigationTimeoutRef.current) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    },
    [],
  );

  const handleMemberClick = (memberId) => {
    if (memberId !== currentMemberId) {
      const transitionDuration = gsap?.to ? 300 : 0;

      if (navigationTimeoutRef.current) {
        window.clearTimeout(navigationTimeoutRef.current);
      }

      if (gsap) {
        gsap.to(".portfolio-content", {
          opacity: 0,
          duration: 0.3,
          ease: "power1.in",
        });
      }

      navigationTimeoutRef.current = window.setTimeout(() => {
        navigate(`/${memberId}`);
      }, transitionDuration);
    }
  };

  return (
    <header className="portfolio-header">
      <div className="header-container">
        {/* Team Name */}
        <Link to="/" className="header-logo">
          <span className="logo-text">{TEAM_CONFIG.teamName}</span>
        </Link>

        {/* Member Navigation */}
        <nav className="member-nav" aria-label="Team members">
          {allMembers.map((member) => (
            <button
              type="button"
              key={member.id}
              data-member-id={member.id}
              className={`member-nav-item ${member.id === currentMemberId ? "active" : ""}`}
              onClick={() => handleMemberClick(member.id)}
              title={member.name}
              aria-current={member.id === currentMemberId ? "page" : undefined}
            >
              {member.name.split(" ")[0]}
            </button>
          ))}
        </nav>

        {/* Back to landing button */}
        <Link to="/" className="header-back">
          ← Team
        </Link>
      </div>
    </header>
  );
}

export default Header;
