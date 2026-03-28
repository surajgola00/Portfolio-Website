import { useEffect, useRef, useState } from "react";

/**
 * Custom hook for lazy loading images with Intersection Observer
 * @param {string} src - Image source URL
 * @param {string} placeholder - Placeholder image (optional)
 */
export function useLazyImage(
  src,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg"%3E%3C/svg%3E',
) {
  const ref = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imageElement = ref.current;

    if (!imageElement) return;

    imageElement.src = placeholder;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            imageElement.src = src;
            setIsLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.01,
      },
    );

    observer.observe(imageElement);

    return () => observer.disconnect();
  }, [placeholder, src]);

  return { ref, isLoaded, currentSrc: isLoaded ? src : placeholder };
}

export default useLazyImage;
