import { useEffect, useRef } from "react";
import "../styles/particle-background.css";

const PARTICLE_COLORS = [
  "rgba(0, 212, 255",
  "rgba(131, 56, 236",
  "rgba(255, 0, 255",
];

const createParticle = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
  size: Math.random() * 2 + 0.5,
  speedX: (Math.random() - 0.5) * 0.5,
  speedY: (Math.random() - 0.5) * 0.5,
  opacity: Math.random() * 0.5 + 0.2,
  color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
});

const updateParticle = (particle, bounds, mouse) => {
  particle.x += particle.speedX;
  particle.y += particle.speedY;

  if (particle.x > bounds.width) particle.x = 0;
  if (particle.x < 0) particle.x = bounds.width;
  if (particle.y > bounds.height) particle.y = 0;
  if (particle.y < 0) particle.y = bounds.height;

  const dx = mouse.x - particle.x;
  const dy = mouse.y - particle.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 100) {
    const angle = Math.atan2(dy, dx);
    particle.x -= Math.cos(angle) * 0.3;
    particle.y -= Math.sin(angle) * 0.3;
  }
};

const drawParticle = (ctx, particle) => {
  ctx.fillStyle = `${particle.color}, ${particle.opacity})`;
  ctx.beginPath();
  ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
  ctx.fill();
};

const drawConnections = (ctx, particles) => {
  particles.forEach((particle, index) => {
    particles.slice(index + 1).forEach((neighbor) => {
      const dx = particle.x - neighbor.x;
      const dy = particle.y - neighbor.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 80) {
        ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 80)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(neighbor.x, neighbor.y);
        ctx.stroke();
      }
    });
  });
};

const getParticleCount = (width) => (width < 768 ? 30 : 60);

function ParticleBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId = 0;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = Array.from(
        { length: getParticleCount(width) },
        () => createParticle(width, height),
      );
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (event) => {
      mouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const animate = () => {
      ctx.fillStyle = "rgba(15, 20, 50, 0.1)";
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      particlesRef.current.forEach((particle) => {
        updateParticle(
          particle,
          { width: window.innerWidth, height: window.innerHeight },
          mouseRef.current,
        );
        drawParticle(ctx, particle);
      });

      drawConnections(ctx, particlesRef.current);

      animationFrameId = requestAnimationFrame(animate);
    };

    document.addEventListener("pointermove", handleMouseMove, {
      passive: true,
    });
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener("pointermove", handleMouseMove);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="particle-background"
      aria-hidden="true"
    ></canvas>
  );
}

export default ParticleBackground;
