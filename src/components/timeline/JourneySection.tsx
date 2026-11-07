import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { siteConfig } from '../../config';
import { Sparkles, Milestone } from 'lucide-react';

export const JourneySection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative min-h-screen w-full py-24 px-4 overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#0d1322] text-white"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-10 h-80 w-80 rounded-full bg-blue-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-1/4 right-10 h-80 w-80 rounded-full bg-amber-500/10 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-sky-400/30 bg-sky-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-sky-300 backdrop-blur-md"
          >
            <Milestone className="h-3.5 w-3.5 text-sky-400" />
            <span>THE ADVENTURE SO FAR</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            {siteConfig.timeline.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-3 text-base sm:text-lg text-slate-400 max-w-lg mx-auto"
          >
            {siteConfig.timeline.subtitle}
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Static background track */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-slate-800/80 rounded-full" />

          {/* Dynamic drawing line */}
          <motion.div
            style={{ scaleY, transformOrigin: 'top' }}
            className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-gradient-to-b from-amber-400 via-sky-400 to-indigo-500 rounded-full shadow-[0_0_15px_rgba(251,191,36,0.6)]"
          />

          {/* Timeline Nodes */}
          <div className="space-y-12 md:space-y-16">
            {siteConfig.timeline.milestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={milestone.age}
                  className={`relative flex items-center ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                >
                  {/* Timeline Center Node Pin */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex h-12 w-12 items-center justify-center rounded-full border-2 border-amber-400/80 bg-slate-900 shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                    <span className="text-xl select-none">{milestone.icon}</span>
                  </div>

                  {/* Empty side for desktop spacing */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content Card */}
                  <div
                    className={`w-full md:w-1/2 pl-16 md:pl-0 ${
                      isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                    }`}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? -40 : 40,
                        scale: 0.95,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="glass-panel group relative p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all duration-300 shadow-xl hover:shadow-amber-500/10"
                    >
                      {/* Age tag & Chapter */}
                      <div
                        className={`flex items-center gap-2 mb-2 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1 rounded-md bg-amber-400/10 px-2.5 py-0.5 text-xs font-bold text-amber-300 border border-amber-400/30">
                          <Sparkles className="h-3 w-3" />
                          AGE {milestone.age}
                        </span>
                        <span className="text-xs font-semibold tracking-wider text-slate-400">
                          {milestone.badge}
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                        {milestone.title}
                      </h3>

                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                        {milestone.description}
                      </p>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
