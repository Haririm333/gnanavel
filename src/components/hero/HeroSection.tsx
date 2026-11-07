import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { siteConfig } from '../../config';
import { fireDoubleCannons, fireMiniPop } from '../../utils/confetti';
import { soundFx } from '../../utils/audio';

interface BalloonItem {
  id: number;
  x: number; // percentage 5 - 95
  speed: number;
  size: number;
  color: string;
  swayDuration: number;
}

export const HeroSection: React.FC<{ introDone: boolean }> = ({ introDone }) => {
  const { scrollY } = useScroll();

  // Scroll parallax transforms for flying through clouds feeling
  const cloud1Y = useTransform(scrollY, [0, 800], [0, -180]);
  const cloud2Y = useTransform(scrollY, [0, 800], [0, -120]);
  const cloud3Y = useTransform(scrollY, [0, 800], [0, -60]);
  const cloudScale = useTransform(scrollY, [0, 600], [1, 1.4]);
  const cloudOpacity = useTransform(scrollY, [0, 500], [0.8, 0.1]);

  // Balloons state
  const [balloons, setBalloons] = useState<BalloonItem[]>([]);

  useEffect(() => {
    // Generate initial set of balloons
    const balloonColors = [
      '#f43f5e', // Rose
      '#06b6d4', // Cyan
      '#f59e0b', // Amber
      '#8b5cf6', // Violet
      '#10b981', // Emerald
      '#ec4899', // Pink
      '#3b82f6', // Blue
    ];

    const initialBalloons: BalloonItem[] = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: 10 + (i * 11) + (Math.random() * 5 - 2.5),
      speed: 18 + Math.random() * 12,
      size: 42 + Math.random() * 20,
      color: balloonColors[i % balloonColors.length],
      swayDuration: 3 + Math.random() * 2,
    }));
    setBalloons(initialBalloons);
  }, []);

  const handleBalloonPop = (id: number, e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    soundFx.playPop();

    let clientX = window.innerWidth / 2;
    let clientY = window.innerHeight / 2;

    if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.touches && e.touches[0]) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    fireMiniPop(clientX, clientY);

    // Remove popped balloon and respawn after delay
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setTimeout(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: 5 + Math.random() * 90,
          speed: 18 + Math.random() * 10,
          size: 42 + Math.random() * 18,
          color: ['#f43f5e', '#06b6d4', '#f59e0b', '#8b5cf6', '#10b981'][
            Math.floor(Math.random() * 5)
          ],
          swayDuration: 3.5,
        },
      ]);
    }, 2000);
  };

  const handleConfettiClick = () => {
    soundFx.playSparkle();
    fireDoubleCannons();
  };

  const scrollToNext = () => {
    const el = document.getElementById('age');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stagger variants for letters
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: -50, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 150,
      },
    },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex flex-col justify-between pt-16 pb-12 transition-all duration-700 select-none bg-gradient-to-b from-[#fdba74] via-[#f472b6] to-[#38bdf8]"
    >
      {/* Sun with glowing soft rays */}
      <div className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 md:left-1/4 -translate-y-1/4 z-0">
        <div className="relative h-64 w-64 md:h-80 md:w-80 rounded-full bg-gradient-to-tr from-amber-300 via-yellow-200 to-amber-100 opacity-90 blur-xl animate-pulse-glow" />
        <div className="absolute inset-0 m-auto h-40 w-40 md:h-52 md:w-52 rounded-full bg-yellow-200 shadow-[0_0_80px_rgba(253,224,71,0.8)]" />
      </div>

      {/* Birthday Bunting Triangle Flags */}
      <div className="pointer-events-none absolute top-0 inset-x-0 z-30 overflow-hidden h-24">
        <svg
          viewBox="0 0 1200 120"
          className="w-full h-full text-amber-500 animate-sway"
          preserveAspectRatio="none"
        >
          {/* Curved string line */}
          <path
            d="M0,15 Q300,55 600,20 T1200,25"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="2.5"
            strokeDasharray="4 2"
          />
          {/* Bunting triangles */}
          {[
            { x: 50, color: '#f43f5e' },
            { x: 130, color: '#38bdf8' },
            { x: 210, color: '#fbbf24' },
            { x: 290, color: '#a855f7' },
            { x: 370, color: '#34d399' },
            { x: 450, color: '#fb923c' },
            { x: 530, color: '#f43f5e' },
            { x: 610, color: '#60a5fa' },
            { x: 690, color: '#facc15' },
            { x: 770, color: '#c084fc' },
            { x: 850, color: '#2dd4bf' },
            { x: 930, color: '#fb7185' },
            { x: 1010, color: '#38bdf8' },
            { x: 1090, color: '#f59e0b' },
            { x: 1160, color: '#a855f7' },
          ].map((flag, idx) => (
            <polygon
              key={idx}
              points={`${flag.x},25 ${flag.x + 36},27 ${flag.x + 18},70`}
              fill={flag.color}
              filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
            />
          ))}
        </svg>
      </div>

      {/* Looping Paper Plane with curved dotted trail */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-20 h-48 overflow-hidden">
        <svg viewBox="0 0 1000 200" className="w-full h-full" preserveAspectRatio="none">
          <path
            id="flightPath"
            d="M -100,120 Q 250,20 500,90 T 1100,50"
            fill="none"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeDasharray="6 6"
          />
        </svg>
        <motion.div
          animate={{
            x: ['-10%', '115%'],
            y: [80, 20, 60, 30],
            rotate: [5, -8, 12, -2],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute top-0 left-0 text-white drop-shadow-md text-2xl md:text-3xl"
        >
          ✈️
        </motion.div>
      </div>

      {/* Colorful Rising Balloons (Tap to pop) */}
      <div className="pointer-events-auto absolute inset-0 z-20 overflow-hidden">
        {balloons.map((b) => (
          <motion.div
            key={b.id}
            initial={{ y: '110vh' }}
            animate={{ y: '-20vh' }}
            transition={{
              duration: b.speed,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{ left: `${b.x}%` }}
            className="absolute cursor-pointer select-none group"
            onClick={(e) => handleBalloonPop(b.id, e)}
          >
            <motion.div
              animate={{ x: [-8, 8, -8] }}
              transition={{
                duration: b.swayDuration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center"
            >
              {/* Balloon shape */}
              <div
                style={{
                  width: `${b.size}px`,
                  height: `${b.size * 1.25}px`,
                  backgroundColor: b.color,
                }}
                className="relative rounded-t-full rounded-b-3xl shadow-lg transition-transform group-hover:brightness-110"
              >
                {/* Specular highlight */}
                <div className="absolute top-2 left-2.5 h-3 w-1.5 rounded-full bg-white/60 blur-[0.5px]" />
                {/* Tie knot */}
                <div
                  style={{ backgroundColor: b.color }}
                  className="absolute -bottom-1 left-1/2 h-1.5 w-2 -translate-x-1/2 rounded-b-sm"
                />
              </div>
              {/* String */}
              <div className="h-10 w-0.5 bg-white/40" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Parallax Clouds Layers */}
      <motion.div
        style={{ y: cloud1Y, scale: cloudScale, opacity: cloudOpacity }}
        className="pointer-events-none absolute bottom-0 inset-x-0 z-10"
      >
        <svg
          viewBox="0 0 1440 320"
          className="w-full text-white/50"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,192L60,197.3C120,203,240,213,360,208C480,203,600,181,720,181.3C840,181,960,203,1080,208C1200,213,1320,203,1380,197.3L1440,192L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: cloud2Y, scale: cloudScale, opacity: cloudOpacity }}
        className="pointer-events-none absolute bottom-0 inset-x-0 z-10"
      >
        <svg
          viewBox="0 0 1440 280"
          className="w-full text-white/70"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,128L80,149.3C160,171,320,213,480,208C640,203,800,149,960,138.7C1120,128,1280,160,1360,176L1440,192L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          />
        </svg>
      </motion.div>

      <motion.div
        style={{ y: cloud3Y, scale: cloudScale, opacity: cloudOpacity }}
        className="pointer-events-none absolute bottom-0 inset-x-0 z-10"
      >
        <svg
          viewBox="0 0 1440 220"
          className="w-full text-white"
          preserveAspectRatio="none"
        >
          <path
            fill="currentColor"
            d="M0,96L60,112C120,128,240,160,360,154.7C480,149,600,107,720,106.7C840,107,960,149,1080,154.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
      </motion.div>

      {/* Top spacer */}
      <div className="h-6" />

      {/* Main Hero Reveal Content */}
      <div className="relative z-30 mx-auto max-w-4xl px-4 text-center">
        {introDone && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center"
          >
            {/* Sparkle badge */}
            <motion.div
              variants={letterVariants}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-5 py-1.5 text-xs sm:text-sm font-semibold tracking-wider text-slate-900 shadow-md backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4 text-amber-500 animate-spin" style={{ animationDuration: '3s' }} />
              <span>THE 18TH CHAPTER BEGINS</span>
            </motion.div>

            {/* Letter by Letter Drop-in: "HAPPY BIRTHDAY" */}
            <h2 className="flex flex-wrap justify-center font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
              {siteConfig.hero.greeting.split('').map((char, index) => (
                <motion.span
                  key={`greeting-${index}`}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h2>

            {/* Big Name Reveal: "GNANAVEL!" */}
            <h1 className="mt-2 flex flex-wrap justify-center font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 drop-shadow-[0_6px_20px_rgba(0,0,0,0.35)]">
              {siteConfig.hero.name.split('').map((char, index) => (
                <motion.span
                  key={`name-${index}`}
                  variants={letterVariants}
                  className="inline-block transform hover:scale-110 transition-transform"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </h1>

            {/* Huge glowing, pulsing "18" in golden light */}
            <motion.div
              variants={letterVariants}
              className="relative my-4 flex items-center justify-center"
            >
              <motion.div
                animate={{
                  scale: [1, 1.08, 1],
                  filter: [
                    'drop-shadow(0 0 25px rgba(251,191,36,0.7))',
                    'drop-shadow(0 0 45px rgba(251,191,36,0.95))',
                    'drop-shadow(0 0 25px rgba(251,191,36,0.7))',
                  ],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="font-display text-7xl sm:text-9xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-amber-300 to-amber-500 leading-none select-none"
              >
                18
              </motion.div>

              {/* Floating sparkles around 18 */}
              <div className="absolute -top-3 -right-6 text-2xl animate-float">✨</div>
              <div className="absolute -bottom-2 -left-6 text-2xl animate-float-reverse">🌟</div>
              <div className="absolute top-1/2 -left-8 text-xl animate-float">💫</div>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={letterVariants}
              className="max-w-xl text-base sm:text-xl font-medium text-slate-900/90 drop-shadow-sm px-4"
            >
              {siteConfig.hero.subtitle}
            </motion.p>

            {/* Interactive Action Buttons */}
            <motion.div
              variants={letterVariants}
              className="mt-8 flex flex-wrap items-center justify-center gap-4 px-4"
            >
              {/* Confetti button */}
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                onClick={handleConfettiClick}
                className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-orange-500/30 transition-all hover:shadow-orange-500/50"
              >
                <span>{siteConfig.hero.confettiButtonText}</span>
              </motion.button>

              {/* Scroll button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToNext}
                className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/30 backdrop-blur-md px-6 py-3.5 text-base font-semibold text-slate-900 shadow-md transition-all hover:bg-white/40"
              >
                <span>{siteConfig.hero.scrollButtonText}</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Subtle indicator at bottom */}
      <div className="relative z-20 flex justify-center pb-2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="text-white/80 cursor-pointer"
          onClick={scrollToNext}
        >
          <div className="h-8 w-5 rounded-full border-2 border-white/60 flex items-start justify-center p-1">
            <div className="h-1.5 w-1 bg-white rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
