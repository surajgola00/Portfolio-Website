import { useEffect, useRef } from "react";
import "../styles/cursor.css";

function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef(0);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!supportsFinePointer || prefersReducedMotion) {
      return undefined;
    }

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("visible");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("visible");
      }
    };

    // Hover effects on interactive elements
    const handleMouseOverInteractive = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.add("hover");
      }
    };

    const handleMouseOutInteractive = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("hover");
      }
    };

    // Animation loop to smoothly follow cursor
    const animateCursor = () => {
      if (cursorRef.current && dotRef.current) {
        positionRef.current.x +=
          (targetRef.current.x - positionRef.current.x) * 0.3;
        positionRef.current.y +=
          (targetRef.current.y - positionRef.current.y) * 0.3;

        cursorRef.current.style.left = positionRef.current.x + "px";
        cursorRef.current.style.top = positionRef.current.y + "px";

        dotRef.current.style.left = targetRef.current.x + "px";
        dotRef.current.style.top = targetRef.current.y + "px";
      }

      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    const interactiveElements = document.querySelectorAll(
      'a, button, input, textarea, [role="button"], .project-link, .member-card, .skill-tag, .badge',
    );

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseOverInteractive);
      el.addEventListener("mouseleave", handleMouseOutInteractive);
    });

    animationFrameRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseOverInteractive);
        el.removeEventListener("mouseleave", handleMouseOutInteractive);
      });
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <div className="cursor-dot" ref={dotRef}></div>
    </>
  );
}

export default CustomCursor;
