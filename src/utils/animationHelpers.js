import anime from "animejs";

/**
 * Fade and slide in animation
 */
export const fadeSlideInUp = (element, options = {}) => {
  return anime({
    targets: element,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: options.duration || 800,
    easing: options.easing || "easeOutCubic",
    ...options,
  });
};

/**
 * Scale in animation
 */
export const scaleIn = (element, options = {}) => {
  return anime({
    targets: element,
    opacity: [0, 1],
    scale: [0.95, 1],
    duration: options.duration || 600,
    easing: options.easing || "easeOutCubic",
    ...options,
  });
};

/**
 * Staggered animation for multiple elements
 */
export const staggerAnimation = (elements, options = {}) => {
  return anime({
    targets: elements,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: options.duration || 600,
    delay: anime.stagger(options.delay || 100),
    easing: options.easing || "easeOutCubic",
    ...options,
  });
};

/**
 * Parallax effect based on scroll
 */
export const handleParallax = (element, scrollProgress, options = {}) => {
  const distance = options.distance || 150;
  const intensity = options.intensity || 1;

  const moveDistance = Math.min(
    scrollProgress * distance * intensity,
    distance,
  );

  anime.set(element, {
    translateX: moveDistance,
    duration: 0,
  });
};

/**
 * Floating animation (hover effect)
 */
export const floatingAnimation = (element, options = {}) => {
  return anime({
    targets: element,
    translateY: [-10, 10],
    duration: options.duration || 3000,
    direction: "alternate",
    easing: options.easing || "easeInOutQuad",
    loop: true,
    ...options,
  });
};

/**
 * Glow animation (pulsing glow effect)
 */
export const glowAnimation = (element, options = {}) => {
  return anime({
    targets: element,
    boxShadow: [
      "0 0 10px rgba(0, 212, 255, 0.3)",
      "0 0 20px rgba(0, 212, 255, 0.6)",
    ],
    duration: options.duration || 2000,
    direction: "alternate",
    loop: true,
    easing: options.easing || "easeInOutQuad",
    ...options,
  });
};

/**
 * Page transition animation (fade out and navigation)
 */
export const pageTransitionOut = (options = {}) => {
  return anime({
    targets: ".portfolio-page, .landing-page",
    opacity: [1, 0],
    duration: options.duration || 300,
    easing: options.easing || "easeInQuad",
    ...options,
  });
};

/**
 * Page transition animation (fade in on new page load)
 */
export const pageTransitionIn = (options = {}) => {
  return anime({
    targets: ".portfolio-page, .landing-page",
    opacity: [0, 1],
    duration: options.duration || 500,
    easing: options.easing || "easeOutCubic",
    ...options,
  });
};

/**
 * Tilt effect for 3D appearance
 */
export const applyTiltEffect = (element, mouseX, mouseY, options = {}) => {
  const rotateAmount = options.rotateAmount || 5;
  const perspective = options.perspective || 1000;

  const elementRect = element.getBoundingClientRect();
  const elementCenterX = elementRect.left + elementRect.width / 2;
  const elementCenterY = elementRect.top + elementRect.height / 2;

  const angleX =
    ((mouseY - elementCenterY) / elementRect.height) * rotateAmount;
  const angleY =
    ((mouseX - elementCenterX) / elementRect.width) * -rotateAmount;

  anime.set(element, {
    perspective: perspective,
    rotateX: angleX,
    rotateY: angleY,
    duration: 0,
  });
};

/**
 * Reset tilt effect
 */
export const resetTiltEffect = (element, options = {}) => {
  return anime({
    targets: element,
    rotateX: 0,
    rotateY: 0,
    duration: options.duration || 400,
    easing: options.easing || "easeOutCubic",
    ...options,
  });
};

/**
 * Cursor follow animation (for interactive elements)
 */
export const cursorFollowAnimation = (
  element,
  targetX,
  targetY,
  options = {},
) => {
  const speed = options.speed || 0.3;

  return anime({
    targets: element,
    left: targetX,
    top: targetY,
    duration: options.duration || Math.max(50, Math.round(240 / speed)),
    easing: options.easing || "linear",
  });
};

export default {
  fadeSlideInUp,
  scaleIn,
  staggerAnimation,
  handleParallax,
  floatingAnimation,
  glowAnimation,
  pageTransitionOut,
  pageTransitionIn,
  applyTiltEffect,
  resetTiltEffect,
  cursorFollowAnimation,
};
