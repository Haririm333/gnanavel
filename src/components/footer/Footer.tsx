import React from 'react';
import { siteConfig } from '../../config';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full py-12 px-4 border-t border-white/10 bg-[#03050b] text-center select-none">
      <div className="mx-auto max-w-4xl flex flex-col items-center gap-4">
        <button
          onClick={scrollToTop}
          className="group flex items-center gap-2 cursor-pointer transition-transform hover:scale-105"
        >
          <span className="text-3xl">🎂</span>
          <span className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
            {siteConfig.name} • 18
          </span>
        </button>

        <p className="text-sm sm:text-base text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
          <span>Made with</span>
          <Heart className="h-4 w-4 text-rose-500 fill-rose-500 animate-pulse" />
          <span>by Hari &amp; friends. Happy 18th, Gnanavel!</span>
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Sparkles className="h-3 w-3 text-amber-400" />
          <span>Official 18th Birthday Celebration Website</span>
          <Sparkles className="h-3 w-3 text-amber-400" />
        </div>
      </div>
    </footer>
  );
};
