import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../config';
import { soundFx } from '../../utils/audio';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

interface NavbarProps {
  showNav: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showNav }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const handleToggleMusic = () => {
    const nextState = soundFx.toggleBgm(siteConfig.audioSrc);
    setIsPlaying(nextState);
  };

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (!showNav) return null;

  return (
    <>
      {/* Sticky Mini Navigation Bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-4 inset-x-0 z-40 mx-auto max-w-4xl px-4 select-none"
      >
        <div className="flex items-center justify-between rounded-full border border-white/20 bg-slate-950/70 px-4 sm:px-6 py-2.5 backdrop-blur-xl shadow-2xl shadow-black/40">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="text-2xl group-hover:scale-125 transition-transform">🎂</span>
            <span className="font-display font-extrabold text-sm sm:text-base tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
              {siteConfig.name}
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 sm:gap-2">
            {siteConfig.nav.items.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="rounded-full px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Action: Music Toggle + Mobile Hamburger */}
          <div className="flex items-center gap-2">
            {/* Music Toggle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleToggleMusic}
              className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30'
                  : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/10'
              }`}
              title="Toggle Music"
            >
              {isPlaying ? (
                <>
                  <Volume2 className="h-3.5 w-3.5 animate-pulse" />
                  <span>🎵 Music ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5" />
                  <span>🎵 Music</span>
                </>
              )}
            </motion.button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-all cursor-pointer"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 inset-x-4 z-40 mx-auto max-w-sm rounded-3xl border border-white/20 bg-slate-950/95 p-6 backdrop-blur-2xl shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-2">
              {siteConfig.nav.items.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="w-full text-left rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-amber-300 transition-all cursor-pointer"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
