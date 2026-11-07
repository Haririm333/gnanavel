import confetti from 'canvas-confetti';

// Double cannon burst from both corners (for intro cracker, hero button, cake finale)
export function fireDoubleCannons() {
  const count = 200;
  const defaults = {
    origin: { y: 0.8 },
    colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#8b5cf6', '#fbbf24', '#ffffff'],
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Left corner
  confetti({
    particleCount: 80,
    angle: 60,
    spread: 65,
    origin: { x: 0, y: 0.9 },
    colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24'],
    zIndex: 9999,
  });

  // Right corner
  confetti({
    particleCount: 80,
    angle: 120,
    spread: 65,
    origin: { x: 1, y: 0.9 },
    colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#fbbf24'],
    zIndex: 9999,
  });

  // Center celebration mix
  fire(0.25, {
    spread: 40,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 70,
  });
  fire(0.35, {
    spread: 110,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 130,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    shapes: ['star', 'circle'],
  });
}

// Mini pop for balloon tap or photo tap
export function fireMiniPop(x: number, y: number) {
  const originX = Math.max(0, Math.min(1, x / window.innerWidth));
  const originY = Math.max(0, Math.min(1, y / window.innerHeight));

  confetti({
    particleCount: 35,
    spread: 60,
    origin: { x: originX, y: originY },
    colors: ['#f59e0b', '#ec4899', '#3b82f6', '#10b981', '#f43f5e', '#a855f7'],
    disableForReducedMotion: true,
    zIndex: 9999,
  });
}

// Gold glitter shower
export function fireGlitterShower() {
  const duration = 2.5 * 1000;
  const animationEnd = Date.now() + duration;

  const frame = () => {
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.2 },
      colors: ['#fbbf24', '#f59e0b', '#ffffff'],
      shapes: ['star', 'circle'],
      zIndex: 9999,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.2 },
      colors: ['#fbbf24', '#f59e0b', '#ffffff'],
      shapes: ['star', 'circle'],
      zIndex: 9999,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  };
  frame();
}
