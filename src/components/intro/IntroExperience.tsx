import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import { siteConfig } from '../../config';
import { StarryNight } from '../effects/StarryNight';
import { FireworksCanvas, type FireworksHandle } from '../canvas/FireworksCanvas';
import { soundFx } from '../../utils/audio';
import { fireDoubleCannons, fireGlitterShower } from '../../utils/confetti';

interface IntroExperienceProps {
  onIntroComplete: () => void;
}

type IntroPhase = 'INITIAL' | 'COUNTING' | 'ROCKET' | 'BLAST' | 'COMPLETE';

export const IntroExperience: React.FC<IntroExperienceProps> = ({ onIntroComplete }) => {
  const [phase, setPhase] = useState<IntroPhase>('INITIAL');
  const [count, setCount] = useState<number>(10);
  const [screenFlash, setScreenFlash] = useState<boolean>(false);
  const [screenShake, setScreenShake] = useState<boolean>(false);
  const fireworksRef = useRef<FireworksHandle | null>(null);

  // Background gradient shifts from deep midnight to pre-dawn as count decreases
  const getSkyGradient = () => {
    if (phase === 'INITIAL') return 'from-[#030612] via-[#070d24] to-[#040817]';
    if (phase === 'COUNTING') {
      if (count > 7) return 'from-[#05091a] via-[#091133] to-[#060a1d]';
      if (count > 4) return 'from-[#0b1338] via-[#111e54] to-[#0c163c]';
      if (count > 1) return 'from-[#141e4d] via-[#1f3073] to-[#121c45]';
      return 'from-[#1c285e] via-[#2d3a82] to-[#1d2757]';
    }
    if (phase === 'ROCKET' || phase === 'BLAST') {
      return 'from-[#251e4a] via-[#4a2e68] to-[#1f1d47]';
    }
    // Warm dawn transition
    return 'from-[#fdba74] via-[#f472b6] to-[#818cf8]';
  };

  // Trigger sky shot rocket & explosion
  const triggerSkyShot = () => {
    setPhase('ROCKET');
    soundFx.playRocketLaunch();

    if (fireworksRef.current) {
      fireworksRef.current.launchSkyShot(() => {
        // After blast completes and dawn rises
        setTimeout(() => {
          setPhase('COMPLETE');
          onIntroComplete();
        }, 1200);
      });
    } else {
      // Fallback if canvas handle missing
      handleScreenFlash();
      handleScreenShake();
      fireDoubleCannons();
      setTimeout(() => {
        setPhase('COMPLETE');
        onIntroComplete();
      }, 1500);
    }
  };

  const handleScreenFlash = () => {
    setScreenFlash(true);
    setTimeout(() => setScreenFlash(false), 450);
  };

  const handleScreenShake = () => {
    setScreenShake(true);
    soundFx.playExplosion();
    fireDoubleCannons();
    fireGlitterShower();
    setTimeout(() => setScreenShake(false), 800);
  };

  // Start the 10 -> 1 countdown (1 number per second)
  const handleStartIntro = () => {
    setPhase('COUNTING');
    setCount(10);
    soundFx.playTick();
  };

  // Countdown timer logic
  useEffect(() => {
    if (phase !== 'COUNTING') return;

    if (count > 1) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
        soundFx.playTick();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 1) {
      // Wait 1 second at '1', then vanish and launch rocket
      const timer = setTimeout(() => {
        triggerSkyShot();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [phase, count]);

  // Skip intro handler
  const handleSkip = () => {
    handleScreenFlash();
    soundFx.playExplosion();
    fireDoubleCannons();
    setPhase('COMPLETE');
    onIntroComplete();
  };

  if (phase === 'COMPLETE') return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden transition-colors duration-1000 select-none bg-gradient-to-b ${getSkyGradient()} ${
        screenShake ? 'animate-shake' : ''
      }`}
      style={{
        animation: screenShake ? 'shake 0.7s cubic-bezier(.36,.07,.19,.97) both' : undefined,
      }}
    >
      {/* Screen flash on firework detonation */}
      <AnimatePresence>
        {screenFlash && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="pointer-events-none fixed inset-0 z-50 bg-white"
          />
        )}
      </AnimatePresence>

      {/* Starry Night canvas */}
      <StarryNight
        showLanterns={phase === 'INITIAL' || phase === 'COUNTING'}
        density={phase === 'COUNTING' && count < 5 ? 40 : 80}
      />

      {/* Fireworks canvas for sky shot & multi-bursts */}
      <FireworksCanvas
        refCallback={(handle) => {
          fireworksRef.current = handle;
        }}
        onScreenFlash={handleScreenFlash}
        onScreenShake={handleScreenShake}
      />

      {/* Skip Intro button in top corner */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-6 z-50 flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium tracking-wide text-white/80 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
      >
        <span>{siteConfig.intro.skipText}</span>
        <ArrowRight className="h-3 w-3" />
      </button>

      {/* Center content */}
      <div className="relative z-40 flex flex-col items-center text-center px-6">
        {/* Phase 1: Tap to Start celebration screen */}
        {phase === 'INITIAL' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center max-w-md"
          >
            {/* Subtle glowing badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-amber-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
              <span>Special Moment Ahead</span>
            </div>

            <h1 className="mb-8 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white drop-shadow-md">
              An 18th Celebration for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-500 font-extrabold">
                {siteConfig.name}
              </span>
            </h1>

            {/* Glowing start button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStartIntro}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 p-0.5 text-base font-semibold text-white shadow-xl shadow-orange-500/25 transition-all duration-300 hover:shadow-orange-500/40"
            >
              <span className="relative flex items-center gap-2.5 rounded-full bg-slate-950/80 px-7 py-3.5 transition-all duration-300 group-hover:bg-transparent">
                <span className="text-lg">🎉</span>
                <span className="font-display font-semibold tracking-wide text-white">
                  {siteConfig.intro.startButtonText}
                </span>
              </span>
            </motion.button>
          </motion.div>
        )}

        {/* Phase 2: Countdown 10 -> 1 */}
        {phase === 'COUNTING' && (
          <div className="flex flex-col items-center justify-center min-h-[300px]">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={count}
                initial={{ opacity: 0, scale: 0.4, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.6, filter: 'blur(10px)' }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="relative flex items-center justify-center"
              >
                {/* Glowing expanding pulse ring */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0.8 }}
                  animate={{ scale: 2.2, opacity: 0 }}
                  transition={{ duration: 0.95, ease: 'easeOut' }}
                  className="absolute h-40 w-40 sm:h-56 sm:w-56 rounded-full border-2 border-amber-300/60 shadow-[0_0_30px_rgba(251,191,36,0.6)]"
                />
                <motion.div
                  initial={{ scale: 0.9, opacity: 0.9 }}
                  animate={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.85, ease: 'easeOut', delay: 0.1 }}
                  className="absolute h-32 w-32 sm:h-44 sm:w-44 rounded-full bg-amber-400/20 blur-md"
                />

                {/* Big Glowing Countdown Number */}
                <span className="font-display text-8xl sm:text-9xl md:text-[11rem] font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-amber-100 to-amber-400 drop-shadow-[0_0_45px_rgba(251,191,36,0.9)] select-none">
                  {count}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Faint hint text at bottom */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.75 }}
              className="mt-8 text-sm sm:text-base font-light tracking-widest text-slate-300 font-sans"
            >
              {siteConfig.intro.countdownHint}
            </motion.p>
          </div>
        )}

        {/* Phase 3 & 4: Rocket launch and burst placeholder text */}
        {(phase === 'ROCKET' || phase === 'BLAST') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="h-10" />
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-2px, -2px, 0); }
          20%, 80% { transform: translate3d(3px, 3px, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 1px, 0); }
          40%, 60% { transform: translate3d(4px, -2px, 0); }
        }
      `}</style>
    </div>
  );
};
