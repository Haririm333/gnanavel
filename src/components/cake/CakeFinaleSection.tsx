import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../config';
import { StarryNight } from '../effects/StarryNight';
import { FireworksCanvas, type FireworksHandle } from '../canvas/FireworksCanvas';
import { soundFx } from '../../utils/audio';
import { fireDoubleCannons, fireGlitterShower } from '../../utils/confetti';
import { Sparkles, Flame, Wind } from 'lucide-react';

export const CakeFinaleSection: React.FC = () => {
  const [candlesLit, setCandlesLit] = useState<boolean[]>(Array(18).fill(true));
  const [isBlowing, setIsBlowing] = useState<boolean>(false);
  const [isBlown, setIsBlown] = useState<boolean>(false);
  const [screenDim, setScreenDim] = useState<boolean>(false);
  const [showWishText, setShowWishText] = useState<boolean>(false);

  const fireworksRef = useRef<FireworksHandle | null>(null);

  const handleBlowCandles = () => {
    if (isBlowing || isBlown) return;
    setIsBlowing(true);
    soundFx.playBlow();

    // Extinguish candles one by one
    for (let i = 0; i < 18; i++) {
      setTimeout(() => {
        setCandlesLit((prev) => {
          const next = [...prev];
          next[i] = false;
          return next;
        });
      }, i * 65);
    }

    // After all 18 extinguished
    setTimeout(() => {
      // Screen dims for a second
      setScreenDim(true);

      setTimeout(() => {
        setScreenDim(false);
        setIsBlown(true);
        setShowWishText(true);

        // Sound & Fireworks Show
        soundFx.playExplosion();
        soundFx.playSparkle();
        fireDoubleCannons();
        fireGlitterShower();

        if (fireworksRef.current) {
          fireworksRef.current.startFinaleFireworks(9000);
        }
      }, 1000);
    }, 18 * 65 + 200);
  };

  const handleReplayFireworks = () => {
    soundFx.playExplosion();
    soundFx.playSparkle();
    fireDoubleCannons();
    fireGlitterShower();

    if (fireworksRef.current) {
      fireworksRef.current.startFinaleFireworks(8000);
    }
  };

  const handleRelight = () => {
    setCandlesLit(Array(18).fill(true));
    setIsBlowing(false);
    setIsBlown(false);
    setShowWishText(false);
    if (fireworksRef.current) {
      fireworksRef.current.stopFireworks();
    }
  };

  return (
    <section
      id="cake"
      className="relative min-h-screen w-full py-24 px-4 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#0a0f1d] via-[#050813] to-[#04060f] text-white select-none"
    >
      {/* Starry Night Sky */}
      <StarryNight showLanterns={true} density={90} />

      {/* Screen Dim effect when candles go out */}
      <AnimatePresence>
        {screenDim && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pointer-events-none fixed inset-0 z-40 bg-black"
          />
        )}
      </AnimatePresence>

      {/* Finale Fireworks Canvas */}
      <FireworksCanvas
        refCallback={(handle) => {
          fireworksRef.current = handle;
        }}
      />

      <div className="relative z-30 mx-auto max-w-4xl text-center flex flex-col items-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-300 backdrop-blur-md"
        >
          <Sparkles className="h-3.5 w-3.5 text-amber-400" />
          <span>FINALE CEREMONY</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md"
        >
          {siteConfig.cake.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm sm:text-base text-slate-400 max-w-md mx-auto mb-10"
        >
          {siteConfig.cake.subtitle}
        </motion.p>

        {/* Wish Text Reveal after blowing candles */}
        <AnimatePresence>
          {showWishText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="mb-8 p-4 rounded-3xl glass-panel border border-amber-400/50 bg-amber-400/10 shadow-[0_0_40px_rgba(251,191,36,0.4)]"
            >
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-400 drop-shadow-lg">
                {siteConfig.cake.wishText}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 3-Tier Cake Container */}
        <div className="relative my-6 flex flex-col items-center">
          {/* Top 18 Candles Rows */}
          <div className="relative z-20 flex flex-col items-center mb-[-2px]">
            {/* Top row of 8 candles */}
            <div className="flex items-end justify-center gap-2 sm:gap-3.5 mb-1">
              {Array.from({ length: 8 }).map((_, idx) => {
                const isLit = candlesLit[idx];
                return (
                  <div key={`candle-top-${idx}`} className="flex flex-col items-center">
                    {/* Flame or Smoke */}
                    <div className="h-6 w-3 flex items-center justify-center">
                      {isLit ? (
                        <div className="relative">
                          <div className="h-4 w-2.5 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-flame" />
                          <div className="absolute inset-0 m-auto h-2 w-1 rounded-full bg-white opacity-80" />
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                          animate={{ opacity: 0, y: -12, scale: 1.4 }}
                          transition={{ duration: 0.8 }}
                          className="h-2 w-2 rounded-full bg-slate-300/60 blur-[1px]"
                        />
                      )}
                    </div>
                    {/* Wick */}
                    <div className="h-1.5 w-0.5 bg-slate-700" />
                    {/* Candle body */}
                    <div
                      className={`h-9 w-2.5 sm:w-3 rounded-t-sm shadow-md ${
                        idx % 2 === 0
                          ? 'bg-gradient-to-b from-amber-300 to-amber-500'
                          : 'bg-gradient-to-b from-rose-300 to-rose-500'
                      }`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Middle row of 10 candles */}
            <div className="flex items-end justify-center gap-2 sm:gap-3">
              {Array.from({ length: 10 }).map((_, idx) => {
                const candleIdx = 8 + idx;
                const isLit = candlesLit[candleIdx];
                return (
                  <div key={`candle-mid-${idx}`} className="flex flex-col items-center">
                    {/* Flame or Smoke */}
                    <div className="h-6 w-3 flex items-center justify-center">
                      {isLit ? (
                        <div className="relative">
                          <div className="h-4 w-2.5 rounded-full bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 animate-flame" />
                          <div className="absolute inset-0 m-auto h-2 w-1 rounded-full bg-white opacity-80" />
                        </div>
                      ) : (
                        <motion.div
                          initial={{ opacity: 0.8, y: 0, scale: 0.6 }}
                          animate={{ opacity: 0, y: -12, scale: 1.4 }}
                          transition={{ duration: 0.8 }}
                          className="h-2 w-2 rounded-full bg-slate-300/60 blur-[1px]"
                        />
                      )}
                    </div>
                    {/* Wick */}
                    <div className="h-1.5 w-0.5 bg-slate-700" />
                    {/* Candle body */}
                    <div
                      className={`h-9 w-2.5 sm:w-3 rounded-t-sm shadow-md ${
                        idx % 3 === 0
                          ? 'bg-gradient-to-b from-sky-300 to-sky-500'
                          : idx % 3 === 1
                          ? 'bg-gradient-to-b from-emerald-300 to-emerald-500'
                          : 'bg-gradient-to-b from-purple-300 to-purple-500'
                      }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tier 1 (Top) */}
          <div className="relative z-10 h-16 w-48 sm:w-60 rounded-t-2xl bg-gradient-to-r from-amber-100 via-white to-amber-100 shadow-md border-b-2 border-amber-200/50 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3 w-4 rounded-b-full bg-rose-400/90 shadow-sm"
                />
              ))}
            </div>
            <span className="font-display font-bold text-slate-800 text-xs sm:text-sm tracking-widest uppercase mt-2">
              18 YEARS
            </span>
          </div>

          {/* Tier 2 (Middle) */}
          <div className="relative z-0 -mt-1 h-20 w-64 sm:w-80 rounded-t-2xl bg-gradient-to-r from-rose-200 via-rose-100 to-rose-200 shadow-lg border-b-2 border-rose-300/60 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-4 flex justify-between px-2">
              {Array.from({ length: 11 }).map((_, i) => (
                <div
                  key={i}
                  className="h-3.5 w-5 rounded-b-full bg-amber-400/90 shadow-sm"
                />
              ))}
            </div>
            <span className="font-display font-black text-rose-800/80 text-sm sm:text-base tracking-wider uppercase mt-2">
              GNANAVEL
            </span>
          </div>

          {/* Tier 3 (Base) */}
          <div className="relative z-0 -mt-1 h-24 w-80 sm:w-96 rounded-t-2xl bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 shadow-2xl border-b-4 border-amber-300 flex items-center justify-center overflow-hidden">
            {/* Frosting drips */}
            <div className="absolute top-0 inset-x-0 h-5 flex justify-between px-2">
              {Array.from({ length: 13 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-6 rounded-b-full bg-sky-400/90 shadow-sm"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="font-display font-black text-slate-800 text-base sm:text-lg tracking-widest uppercase">
                LEVEL 18 CELEBRATION
              </span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </div>
          </div>

          {/* Cake Stand Plate */}
          <div className="h-4 w-96 sm:w-[26rem] rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-2xl border-t border-white" />
          <div className="h-6 w-32 rounded-b-xl bg-gradient-to-b from-slate-300 to-slate-500 shadow-inner" />
          <div className="h-2.5 w-44 rounded-full bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 shadow-md" />
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          {!isBlown ? (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={handleBlowCandles}
              disabled={isBlowing}
              className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-8 py-4 text-lg font-bold text-white shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all cursor-pointer"
            >
              <Wind className="h-5 w-5 animate-pulse" />
              <span>{siteConfig.cake.blowButtonText}</span>
            </motion.button>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReplayFireworks}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-7 py-3.5 text-base font-bold text-white shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 transition-all cursor-pointer"
              >
                <Sparkles className="h-4 w-4" />
                <span>{siteConfig.cake.replayButtonText}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRelight}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-semibold text-slate-300 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
              >
                <Flame className="h-4 w-4 text-amber-400" />
                <span>Relight Candles</span>
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
