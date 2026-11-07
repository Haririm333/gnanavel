import React, { useEffect, useRef } from 'react';

export interface FireworksHandle {
  launchSkyShot: (onComplete?: () => void) => void;
  startFinaleFireworks: (durationMs?: number) => void;
  stopFireworks: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  decay: number;
  size: number;
  gravity: number;
  flicker: boolean;
  trail: { x: number; y: number }[];
}

interface Rocket {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetY: number;
  color: string;
  sparks: { x: number; y: number; alpha: number; size: number }[];
  isPaused: boolean;
  pauseTimer: number;
  onExplode: () => void;
}

interface Smoke {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  radius: number;
}

export const FireworksCanvas: React.FC<{
  onScreenFlash?: () => void;
  onScreenShake?: () => void;
  className?: string;
  refCallback?: (handle: FireworksHandle) => void;
}> = ({ onScreenFlash, onScreenShake, className = '', refCallback }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rocketsRef = useRef<Rocket[]>([]);
  const smokesRef = useRef<Smoke[]>([]);
  const isRunningRef = useRef(false);
  const finaleIntervalRef = useRef<number | null>(null);

  const colors = [
    '#f59e0b', // Amber
    '#ec4899', // Pink
    '#38bdf8', // Sky
    '#a855f7', // Purple
    '#10b981', // Emerald
    '#fbbf24', // Gold
    '#ef4444', // Red
    '#ffffff', // White
  ];

  // Helper to create firework explosion
  const createBurst = (
    x: number,
    y: number,
    particleCount = 90,
    colorOverride?: string,
    speedMultiplier = 1
  ) => {
    const baseColor = colorOverride || colors[Math.floor(Math.random() * colors.length)];
    const secondColor = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
      const speed = (Math.random() * 5 + 2) * speedMultiplier;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        color: Math.random() > 0.4 ? baseColor : secondColor,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        size: Math.random() * 2.5 + 1.5,
        gravity: 0.07,
        flicker: Math.random() > 0.5,
        trail: [],
      });
    }

    // Add slow falling golden glitter
    for (let i = 0; i < 25; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2.5 + 0.5;
      particlesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed * 0.8,
        color: '#fbbf24',
        alpha: 1,
        decay: Math.random() * 0.008 + 0.005,
        size: Math.random() * 2 + 1,
        gravity: 0.035,
        flicker: true,
        trail: [],
      });
    }

    // Add drifting smoke wisps
    for (let i = 0; i < 6; i++) {
      smokesRef.current.push({
        x: x + (Math.random() - 0.5) * 30,
        y: y + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -Math.random() * 0.4 - 0.2,
        alpha: 0.35,
        radius: Math.random() * 15 + 15,
      });
    }
  };

  // Launch the intro sky shot
  const launchSkyShot = (onComplete?: () => void) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    isRunningRef.current = true;
    startAnimationLoop();

    const startX = canvas.width / (2 * (window.devicePixelRatio || 1));
    const startY = canvas.height / (window.devicePixelRatio || 1);
    const targetY = (canvas.height / (window.devicePixelRatio || 1)) * 0.22;

    rocketsRef.current.push({
      x: startX,
      y: startY,
      vx: 0,
      vy: -15,
      targetY,
      color: '#fbbf24',
      sparks: [],
      isPaused: false,
      pauseTimer: 0,
      onExplode: () => {
        // 1. Flash and shake screen
        onScreenFlash?.();
        onScreenShake?.();

        // 2. Primary huge multi-color explosion
        createBurst(startX, targetY, 150, '#fbbf24', 1.4);
        createBurst(startX, targetY, 100, '#ec4899', 1.1);

        // 3. Followed by 5 to 8 secondary bursts across the sky
        const secondaryCount = Math.floor(Math.random() * 4) + 5; // 5 to 8
        const width = canvas.width / (window.devicePixelRatio || 1);
        const height = canvas.height / (window.devicePixelRatio || 1);

        for (let i = 0; i < secondaryCount; i++) {
          setTimeout(() => {
            const sx = width * (0.15 + Math.random() * 0.7);
            const sy = height * (0.12 + Math.random() * 0.35);
            createBurst(sx, sy, Math.floor(Math.random() * 30) + 70, undefined, 1.1);
          }, 300 + i * 280);
        }

        // Call onComplete after initial main blast
        setTimeout(() => {
          onComplete?.();
        }, 1200);
      },
    });
  };

  // Start continuous cake finale fireworks show
  const startFinaleFireworks = (durationMs = 8000) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    isRunningRef.current = true;
    startAnimationLoop();

    const width = canvas.width / (window.devicePixelRatio || 1);
    const height = canvas.height / (window.devicePixelRatio || 1);

    // Initial big burst
    createBurst(width * 0.5, height * 0.25, 120, '#fbbf24', 1.3);
    createBurst(width * 0.3, height * 0.35, 90, '#ec4899', 1.1);
    createBurst(width * 0.7, height * 0.35, 90, '#38bdf8', 1.1);

    if (finaleIntervalRef.current) clearInterval(finaleIntervalRef.current);

    finaleIntervalRef.current = window.setInterval(() => {
      const bx = width * (0.15 + Math.random() * 0.7);
      const by = height * (0.15 + Math.random() * 0.35);
      createBurst(bx, by, Math.floor(Math.random() * 40) + 70);
    }, 450);

    setTimeout(() => {
      stopFireworks();
    }, durationMs);
  };

  const stopFireworks = () => {
    if (finaleIntervalRef.current) {
      clearInterval(finaleIntervalRef.current);
      finaleIntervalRef.current = null;
    }
  };

  // Render & physics loop
  const startAnimationLoop = () => {
    if (animIdRef.current) return;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Draw and update smoke wisps
      for (let i = smokesRef.current.length - 1; i >= 0; i--) {
        const s = smokesRef.current[i];
        s.x += s.vx;
        s.y += s.vy;
        s.radius += 0.25;
        s.alpha -= 0.003;

        if (s.alpha <= 0) {
          smokesRef.current.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.radius);
        grad.addColorStop(0, `rgba(200, 210, 230, ${s.alpha * 0.4})`);
        grad.addColorStop(1, 'rgba(200, 210, 230, 0)');
        ctx.fillStyle = grad;
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. Draw and update rockets
      for (let i = rocketsRef.current.length - 1; i >= 0; i--) {
        const r = rocketsRef.current[i];

        if (r.isPaused) {
          r.pauseTimer++;
          if (r.pauseTimer >= 10) {
            // Beat finished -> Explode!
            r.onExplode();
            rocketsRef.current.splice(i, 1);
            continue;
          }
        } else {
          // Add spark trail
          for (let s = 0; s < 3; s++) {
            r.sparks.push({
              x: r.x + (Math.random() - 0.5) * 4,
              y: r.y + Math.random() * 8,
              alpha: 1,
              size: Math.random() * 2 + 1,
            });
          }

          r.y += r.vy;
          // Decelerate as it nears apex
          if (r.vy < -3) {
            r.vy *= 0.94;
          }

          if (r.y <= r.targetY || r.vy >= -2) {
            r.isPaused = true;
          }
        }

        // Draw sparks behind rocket
        for (let s = r.sparks.length - 1; s >= 0; s--) {
          const sp = r.sparks[s];
          sp.y += 1.5;
          sp.alpha -= 0.035;
          if (sp.alpha <= 0) {
            r.sparks.splice(s, 1);
            continue;
          }
          ctx.beginPath();
          ctx.fillStyle = `rgba(251, 191, 36, ${sp.alpha})`;
          ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw rocket head
        if (!r.isPaused) {
          ctx.beginPath();
          ctx.fillStyle = '#ffffff';
          ctx.shadowColor = '#fbbf24';
          ctx.shadowBlur = 12;
          ctx.arc(r.x, r.y, 3.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // 3. Draw and update explosion particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];

        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
          continue;
        }

        const currentAlpha = p.flicker ? p.alpha * (0.6 + Math.random() * 0.4) : p.alpha;

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
      }

      ctx.restore();

      // Check if we should keep rendering
      const hasActiveObjects =
        particlesRef.current.length > 0 ||
        rocketsRef.current.length > 0 ||
        smokesRef.current.length > 0;

      if (isRunningRef.current || hasActiveObjects) {
        animIdRef.current = requestAnimationFrame(render);
      } else {
        animIdRef.current = null;
      }
    };

    animIdRef.current = requestAnimationFrame(render);
  };

  // Resize canvas according to display size
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Expose API
  useEffect(() => {
    if (refCallback) {
      refCallback({
        launchSkyShot,
        startFinaleFireworks,
        stopFireworks,
      });
    }
  }, [refCallback]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (animIdRef.current) cancelAnimationFrame(animIdRef.current);
      if (finaleIntervalRef.current) clearInterval(finaleIntervalRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-40 h-full w-full ${className}`}
    />
  );
};
