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

    positionRef.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    targetRef.current = { ...positionRef.current };

    const handleMouseMove = (e) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      if (cursorRef.current) {
        cursorRef.current.classList.add("visible");
      }

      if (dotRef.current) {
        dotRef.current.classList.add("visible");
      }
    };

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.classList.remove("visible", "hover");
      }

      if (dotRef.current) {
        dotRef.current.classList.remove("visible");
      }
    };

    const updateHoverState = (target) => {
      const isInteractive = target?.closest(
        'a, button, input, textarea, select, label, [role="button"], .project-link, .member-card, .skill-tag, .badge',
      );

      if (cursorRef.current) {
        cursorRef.current.classList.toggle("hover", Boolean(isInteractive));
      }
    };

    const handleHoverEvent = (event) => {
      const target = event.type === "mouseout" ? event.relatedTarget : event.target;
      updateHoverState(target);
    };

    const animateCursor = () => {
      if (cursorRef.current && dotRef.current) {
        positionRef.current.x +=
          (targetRef.current.x - positionRef.current.x) * 0.28;
        positionRef.current.y +=
          (targetRef.current.y - positionRef.current.y) * 0.28;

        cursorRef.current.style.left = `${positionRef.current.x}px`;
        cursorRef.current.style.top = `${positionRef.current.y}px`;

        dotRef.current.style.left = `${targetRef.current.x}px`;
        dotRef.current.style.top = `${targetRef.current.y}px`;
      }

      animationFrameRef.current = requestAnimationFrame(animateCursor);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverEvent);
    document.addEventListener("focusin", handleHoverEvent);
    document.addEventListener("mouseout", handleHoverEvent);

    animationFrameRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverEvent);
      document.removeEventListener("focusin", handleHoverEvent);
      document.removeEventListener("mouseout", handleHoverEvent);
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
