import React, { useEffect, useRef } from 'react';

export const StarryNight: React.FC<{
  showLanterns?: boolean;
  density?: number;
  className?: string;
}> = ({ showLanterns = true, density = 60, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Stars
    interface Star {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speed: number;
      phase: number;
    }

    const stars: Star[] = [];
    const count = Math.floor((canvas.width * canvas.height) / (120000 / density));

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.03 + 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Lanterns
    interface Lantern {
      x: number;
      y: number;
      radius: number;
      speedY: number;
      swaySpeed: number;
      swayOffset: number;
      alpha: number;
    }

    const lanterns: Lantern[] = [];
    if (showLanterns) {
      for (let i = 0; i < 15; i++) {
        lanterns.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 3 + 2,
          speedY: Math.random() * 0.4 + 0.2,
          swaySpeed: Math.random() * 0.02 + 0.01,
          swayOffset: Math.random() * Math.PI * 2,
          alpha: Math.random() * 0.4 + 0.4,
        });
      }
    }

    // Shooting stars
    interface ShootingStar {
      x: number;
      y: number;
      len: number;
      speed: number;
      angle: number;
      alpha: number;
      active: boolean;
    }

    const shootingStar: ShootingStar = {
      x: 0,
      y: 0,
      len: 120,
      speed: 16,
      angle: (Math.PI / 4), // 45 deg
      alpha: 0,
      active: false,
    };

    let nextShootingStarTime = Date.now() + 4000;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Stars
      for (const star of stars) {
        star.phase += star.speed;
        const currentAlpha = 0.3 + 0.7 * (Math.sin(star.phase) * 0.5 + 0.5);

        ctx.beginPath();
        ctx.fillStyle = `rgba(255, 255, 255, ${currentAlpha * star.alpha})`;
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw Lanterns
      if (showLanterns) {
        for (const lantern of lanterns) {
          lantern.y -= lantern.speedY;
          lantern.swayOffset += lantern.swaySpeed;
          const currentX = lantern.x + Math.sin(lantern.swayOffset) * 15;

          if (lantern.y < -20) {
            lantern.y = canvas.height + 20;
            lantern.x = Math.random() * canvas.width;
          }

          // Outer warm glow
          const grad = ctx.createRadialGradient(
            currentX,
            lantern.y,
            0,
            currentX,
            lantern.y,
            lantern.radius * 4
          );
          grad.addColorStop(0, `rgba(251, 191, 36, ${lantern.alpha})`);
          grad.addColorStop(0.5, `rgba(245, 158, 11, ${lantern.alpha * 0.4})`);
          grad.addColorStop(1, 'rgba(245, 158, 11, 0)');

          ctx.beginPath();
          ctx.fillStyle = grad;
          ctx.arc(currentX, lantern.y, lantern.radius * 4, 0, Math.PI * 2);
          ctx.fill();

          // Lantern core
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 243, 205, ${lantern.alpha + 0.2})`;
          ctx.arc(currentX, lantern.y, lantern.radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Handle shooting star
      const now = Date.now();
      if (!shootingStar.active && now > nextShootingStarTime) {
        shootingStar.active = true;
        shootingStar.x = Math.random() * (canvas.width * 0.7);
        shootingStar.y = Math.random() * (canvas.height * 0.3);
        shootingStar.alpha = 1;
        nextShootingStarTime = now + (Math.random() * 7000 + 5000);
      }

      if (shootingStar.active) {
        shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed;
        shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed;
        shootingStar.alpha -= 0.015;

        const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.len;
        const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.len;

        const grad = ctx.createLinearGradient(shootingStar.x, shootingStar.y, tailX, tailY);
        grad.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.alpha})`);
        grad.addColorStop(0.3, `rgba(251, 191, 36, ${shootingStar.alpha * 0.7})`);
        grad.addColorStop(1, 'rgba(251, 191, 36, 0)');

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(shootingStar.x, shootingStar.y);
        ctx.stroke();

        if (
          shootingStar.alpha <= 0 ||
          shootingStar.x > canvas.width ||
          shootingStar.y > canvas.height
        ) {
          shootingStar.active = false;
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [showLanterns, density]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
};
