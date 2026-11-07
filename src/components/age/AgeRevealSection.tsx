import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Trophy, Gamepad2, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config';
import { fireDoubleCannons } from '../../utils/confetti';
import { soundFx } from '../../utils/audio';

export const AgeRevealSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const [currentAge, setCurrentAge] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (!isInView) return;

    let count = 0;
    const duration = 1800; // 1.8 seconds total
    const steps = 18;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      count++;
      if (count <= 18) {
        setCurrentAge(count);
        soundFx.playTick();
      }
      if (count === 18) {
        clearInterval(timer);
        setIsCompleted(true);
        setTimeout(() => {
          soundFx.playSparkle();
          fireDoubleCannons();
        }, 150);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView]);

  return (
    <section
      id="age"
      ref={containerRef}
      className="relative min-h-[85vh] w-full flex items-center justify-center py-20 px-4 overflow-hidden bg-gradient-to-b from-[#38bdf8] via-[#1e293b] to-[#0f172a] text-white"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-96 w-96 rounded-full bg-amber-500/15 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Level badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-500/10 px-5 py-2 text-sm font-semibold tracking-widest text-amber-300 backdrop-blur-md shadow-lg"
        >
          <Gamepad2 className="h-4 w-4 text-amber-400" />
          <span>{siteConfig.ageReveal.prefix} 18 STATUS: ACTIVE</span>
        </motion.div>

        {/* Big Counter Display */}
        <div className="my-6 relative flex flex-col items-center justify-center">
          <div className="relative">
            {/* Pulsing ring around counter when complete */}
            {isCompleted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-8 rounded-full border-2 border-amber-400/40 bg-amber-400/5 blur-sm"
              />
            )}

            <div className="font-display text-8xl sm:text-9xl md:text-[12rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-200 to-amber-400 drop-shadow-[0_0_60px_rgba(251,191,36,0.6)] leading-none select-none">
              {currentAge}
            </div>
          </div>

          {/* Golden unlocked label */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isCompleted ? { opacity: 1, y: 0 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-4 flex items-center gap-2 text-amber-300 font-display font-bold text-xl sm:text-2xl"
          >
            <Trophy className="h-6 w-6 text-yellow-400 animate-bounce" />
            <span>LEVEL 18 UNLOCKED!</span>
            <Sparkles className="h-5 w-5 text-amber-300" />
          </motion.div>
        </div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-xl text-lg sm:text-2xl font-medium text-slate-200 drop-shadow-sm"
        >
          {siteConfig.ageReveal.caption}
        </motion.p>

        {/* Fun Gamer / Milestone Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
        >
          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all">
            <div className="text-3xl font-black text-amber-400 font-display">6,574</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-semibold">
              Days of Awesomeness
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all">
            <div className="text-3xl font-black text-sky-400 font-display">157,776</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-semibold">
              Hours of Legendary Moments
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all">
            <div className="text-3xl font-black text-emerald-400 font-display">100%</div>
            <div className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-semibold">
              Adulthood Unlocked
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
