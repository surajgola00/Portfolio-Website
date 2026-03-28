import { useEffect, useRef, useState } from "react";

/**
 * Custom hook to handle intersection observer for scroll animations
 * @param {Object} options - IntersectionObserver options
 * @returns {[React.RefObject, boolean]} - ref to attach to element and boolean indicating if element is in view
 */
export const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const { threshold = 0.2, root = null, rootMargin = "0px" } = options;

  useEffect(() => {
    const observedElement = elementRef.current;

    if (!observedElement) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        root,
        rootMargin,
      },
    );

    observer.observe(observedElement);

    return () => {
      observer.unobserve(observedElement);
      observer.disconnect();
    };
  }, [root, rootMargin, threshold]);

  return [elementRef, isInView];
};

export default useScrollAnimation;
