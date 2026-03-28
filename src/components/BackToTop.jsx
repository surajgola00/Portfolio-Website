import { useEffect, useState } from "react";
import "../styles/back-to-top.css";

function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    // Smooth scroll to top
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to top"
          title="Back to top"
        >
          ↑
        </button>
      )}
    </>
  );
}

export default BackToTop;
