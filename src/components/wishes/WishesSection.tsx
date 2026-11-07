import React from 'react';
import { motion } from 'framer-motion';
import { siteConfig } from '../../config';
import { Heart, MessageSquareQuote, Sparkles } from 'lucide-react';

export const WishesSection: React.FC = () => {
  return (
    <section
      id="wishes"
      className="relative min-h-screen w-full py-24 px-4 overflow-hidden bg-gradient-to-b from-[#0d1322] via-[#13192f] to-[#0c1222] text-white"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 right-1/4 h-96 w-96 rounded-full bg-pink-500/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-400/30 bg-pink-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-pink-300 backdrop-blur-md"
          >
            <Heart className="h-3.5 w-3.5 text-pink-400 fill-pink-400" />
            <span>MESSAGES & LOVE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            {siteConfig.wishes.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-slate-400 max-w-lg mx-auto"
          >
            {siteConfig.wishes.subtitle}
          </motion.p>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.wishes.items.map((wish, index) => {
            // Floating animation timing variation
            const floatDuration = 4 + (index % 3) * 0.8;
            const floatDelay = (index % 4) * 0.4;

            return (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: 'easeOut',
                }}
                className="h-full"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{
                    duration: floatDuration,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: floatDelay,
                  }}
                  className={`glass-panel h-full flex flex-col justify-between p-6 rounded-3xl border border-white/10 hover:border-amber-400/50 transition-all duration-300 shadow-xl group hover:shadow-2xl hover:shadow-amber-500/10 bg-gradient-to-br ${wish.gradient}`}
                >
                  <div>
                    {/* Top quote icon & tag */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-amber-300 group-hover:scale-110 transition-transform">
                        <MessageSquareQuote className="h-5 w-5" />
                      </span>
                      {wish.tag && (
                        <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-wider text-slate-200">
                          {wish.tag}
                        </span>
                      )}
                    </div>

                    {/* Message text */}
                    <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed">
                      "{wish.message}"
                    </p>
                  </div>

                  {/* Card bottom accent */}
                  <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                    <div className="flex items-center gap-1.5 text-xs text-amber-300/80 font-medium">
                      <Sparkles className="h-3 w-3" />
                      <span>For Gnanavel #18</span>
                    </div>
                    <span className="text-xs text-slate-400 font-mono">0{wish.id}</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
