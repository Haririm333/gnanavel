import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../config';
import { Gift, Sparkles, RotateCcw, Heart } from 'lucide-react';
import { fireDoubleCannons } from '../../utils/confetti';
import { soundFx } from '../../utils/audio';

export const GiftBoxSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenGift = () => {
    if (!isOpen) {
      soundFx.playSparkle();
      fireDoubleCannons();
      setIsOpen(true);
    }
  };

  const handleResetGift = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <section
      id="gift"
      className="relative min-h-[90vh] w-full py-24 px-4 overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b from-[#0c1222] via-[#14122b] to-[#0a0f1d] text-white select-none"
    >
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{
            scale: isOpen ? [1.2, 1.4, 1.2] : [1, 1.15, 1],
            opacity: isOpen ? [0.35, 0.5, 0.35] : [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="h-96 w-96 rounded-full bg-gradient-to-r from-pink-500/30 via-purple-500/30 to-amber-500/30 blur-[130px]"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl text-center flex flex-col items-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-purple-300 backdrop-blur-md"
        >
          <Gift className="h-3.5 w-3.5 text-purple-400" />
          <span>{siteConfig.giftBox.badge}</span>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2"
        >
          {siteConfig.giftBox.prompt}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base mb-12"
        >
          {isOpen ? "A personal wish for your next adventure" : siteConfig.giftBox.tapHint}
        </motion.p>

        {/* Interactive Gift Box Area */}
        <div className="relative flex flex-col items-center justify-center min-h-[360px] w-full max-w-lg">
          {/* Light Rays on Open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.4, rotate: 0 }}
                animate={{ opacity: 1, scale: 1.3, rotate: 180 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute inset-0 m-auto h-72 w-72 rounded-full bg-gradient-to-r from-amber-400/30 via-pink-500/20 to-purple-500/30 blur-2xl z-0"
              />
            )}
          </AnimatePresence>

          {/* Unwrapped Card Rising */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 80, scale: 0.7 }}
                animate={{ opacity: 1, y: -40, scale: 1 }}
                exit={{ opacity: 0, y: 60, scale: 0.8 }}
                transition={{ type: 'spring', damping: 18, stiffness: 120 }}
                className="relative z-30 w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-amber-300/40 bg-gradient-to-b from-slate-900/90 via-slate-900/95 to-slate-950/95 shadow-2xl shadow-amber-500/20 text-center"
              >
                {/* Golden sparkles corner decorations */}
                <div className="flex justify-center mb-3">
                  <div className="h-10 w-10 rounded-full bg-amber-400/20 flex items-center justify-center border border-amber-400/40">
                    <Sparkles className="h-5 w-5 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
                  </div>
                </div>

                <p className="font-handwriting text-2xl sm:text-3xl text-amber-200 leading-relaxed font-bold">
                  "{siteConfig.giftBox.message}"
                </p>

                <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-slate-400 font-medium tracking-wider">
                  <Heart className="h-3.5 w-3.5 text-rose-400 fill-rose-400" />
                  <span>{siteConfig.giftBox.closing}</span>
                </div>

                {/* Reset button */}
                <button
                  onClick={handleResetGift}
                  className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/20 hover:text-white transition-all"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>{siteConfig.giftBox.resetButton}</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3D Gift Box Component */}
          <motion.div
            onClick={handleOpenGift}
            animate={
              !isOpen
                ? {
                    rotate: [-1.5, 1.5, -1.5, 1.5, 0],
                    y: [0, -4, 0],
                  }
                : { y: 30 }
            }
            transition={
              !isOpen
                ? {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
                : { duration: 0.4 }
            }
            whileHover={!isOpen ? { scale: 1.05 } : {}}
            whileTap={!isOpen ? { scale: 0.95 } : {}}
            className={`relative cursor-pointer transition-all ${
              isOpen ? 'pointer-events-none opacity-80' : 'pointer-events-auto'
            }`}
          >
            {/* Box Lid */}
            <motion.div
              animate={
                isOpen
                  ? { y: -120, x: -30, rotate: -25, opacity: 0 }
                  : { y: 0, x: 0, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="relative z-20 flex flex-col items-center"
            >
              {/* Bow on top */}
              <div className="relative -mb-1 flex items-center justify-center z-10">
                <div className="h-6 w-8 rounded-full border-2 border-amber-200 bg-amber-400 shadow-md transform -rotate-12" />
                <div className="h-4 w-4 rounded-full bg-amber-300 shadow-sm mx-[-6px] z-10 border border-amber-100" />
                <div className="h-6 w-8 rounded-full border-2 border-amber-200 bg-amber-400 shadow-md transform rotate-12" />
              </div>

              {/* Lid rectangle */}
              <div className="h-10 w-44 sm:w-52 rounded-lg bg-gradient-to-r from-rose-600 via-rose-500 to-rose-600 shadow-lg border-t border-rose-300 flex items-center justify-center relative">
                {/* Gold ribbon on lid */}
                <div className="h-full w-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-sm" />
              </div>
            </motion.div>

            {/* Box Body */}
            <div className="relative z-10 h-36 w-40 sm:w-48 -mt-1 mx-auto rounded-b-2xl bg-gradient-to-b from-rose-700 via-rose-600 to-rose-800 shadow-2xl border-b-2 border-rose-900 flex items-center justify-center overflow-hidden">
              {/* Vertical Gold Ribbon */}
              <div className="h-full w-8 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 shadow-md" />
              {/* Horizontal Gold Ribbon */}
              <div className="absolute inset-x-0 h-8 bg-gradient-to-b from-amber-300 via-yellow-200 to-amber-400 shadow-md" />
            </div>

            {/* Tap indicator label if closed */}
            {!isOpen && (
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-4 text-center text-xs font-semibold uppercase tracking-widest text-amber-300/90"
              >
                ✨ Tap to open ✨
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
