import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '../../config';
import { fireMiniPop } from '../../utils/confetti';
import { soundFx } from '../../utils/audio';
import { Camera, X, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';

export const PhotosSection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (id: number) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const openLightbox = (index: number, e?: React.MouseEvent) => {
    soundFx.playSparkle();
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;
    fireMiniPop(x, y);
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const prevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? siteConfig.photos.items.length - 1 : (prev as number) - 1
    );
  };

  const nextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) =>
      prev === siteConfig.photos.items.length - 1 ? 0 : (prev as number) + 1
    );
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex]);

  // Touch swipe support for lightbox
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextPhoto();
    if (diff < -50) prevPhoto();
    setTouchStart(null);
  };

  const topPhotos = siteConfig.photos.items.slice(0, 3);
  const featuredPhotos = siteConfig.photos.items.slice(3, 5);

  return (
    <section
      id="photos"
      className="relative min-h-screen w-full py-24 px-4 overflow-hidden bg-gradient-to-b from-[#04060f] via-[#090e1f] to-[#03050c] text-white select-none"
    >
      {/* Background radial ambiance */}
      <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-amber-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-3 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-amber-300 backdrop-blur-md"
          >
            <Camera className="h-3.5 w-3.5 text-amber-400" />
            <span>SNAPSHOTS OF 18 YEARS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-md"
          >
            {siteConfig.photos.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-2 text-sm sm:text-base text-slate-400 max-w-md mx-auto"
          >
            {siteConfig.photos.subtitle}
          </motion.p>
        </div>

        {/* TOP ROW: Clothesline with Photo 1, 2, 3 */}
        <div className="relative mb-20">
          {/* Clothesline String */}
          <div className="hidden md:block absolute top-6 inset-x-0 h-1 z-0">
            <svg viewBox="0 0 1000 60" className="w-full h-12" preserveAspectRatio="none">
              <path
                d="M 0,20 Q 500,48 1000,20"
                fill="none"
                stroke="rgba(245, 158, 11, 0.4)"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />
            </svg>
          </div>

          {/* Cards container: Clothesline row on desktop, swipeable carousel on mobile */}
          <div className="flex md:grid md:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto no-scrollbar py-6 px-2 snap-x snap-mandatory">
            {topPhotos.map((photo, index) => {
              const hasError = imageErrors[photo.id];
              const swayDelays = [0, 0.5, 1];

              return (
                <div
                  key={photo.id}
                  className="flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center flex flex-col items-center"
                >
                  {/* Wooden Clothespin Peg */}
                  <div className="relative z-20 flex flex-col items-center -mb-3">
                    <div className="h-6 w-3 rounded-sm bg-gradient-to-b from-amber-600 to-amber-800 shadow-md border-t border-amber-400" />
                    <div className="h-1.5 w-3.5 bg-slate-400/80 rounded-full -mt-2.5 z-10" />
                  </div>

                  {/* Swaying Polaroid Card */}
                  <motion.div
                    animate={{ rotate: index % 2 === 0 ? [-2.5, 2.5, -2.5] : [2.5, -2.5, 2.5] }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: swayDelays[index],
                    }}
                    whileHover={{ scale: 1.05, rotate: 0 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={(e) => openLightbox(index, e)}
                    className="relative cursor-pointer w-full bg-slate-100 text-slate-900 p-4 sm:p-5 rounded-2xl polaroid-shadow transition-all duration-300 border-2 border-white/80 hover:border-amber-400 hover:shadow-amber-500/20"
                  >
                    {/* Photo Container */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-900 flex items-center justify-center">
                      {!hasError ? (
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          loading="lazy"
                          onError={() => handleImageError(photo.id)}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      ) : (
                        /* Elegant illustrated placeholder if photo is missing */
                        <div className="h-full w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-800 via-indigo-950 to-slate-900 text-center">
                          <div className="h-12 w-12 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-2">
                            <Camera className="h-6 w-6 text-amber-300" />
                          </div>
                          <span className="font-display font-bold text-amber-300 text-sm">
                            {photo.tag}
                          </span>
                          <span className="text-slate-400 text-xs mt-1">
                            Add photo at {photo.src}
                          </span>
                        </div>
                      )}

                      {/* Tap to view pill */}
                      <div className="absolute bottom-2 right-2 rounded-full bg-slate-950/70 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-white/90">
                        Tap to expand
                      </div>
                    </div>

                    {/* Handwritten Caption */}
                    <div className="mt-4 text-center">
                      <p className="font-handwriting text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
                        {photo.caption}
                      </p>
                      <span className="text-[11px] font-sans text-slate-500 font-semibold uppercase tracking-wider mt-1 block">
                        Gnanavel at 18
                      </span>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM ROW: Larger Featured Frames (Photo 4 & 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
          {featuredPhotos.map((photo, idx) => {
            const photoIndex = 3 + idx;
            const hasError = imageErrors[photo.id];
            const slideFrom = idx === 0 ? -60 : 60;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, x: slideFrom }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                whileHover={{ scale: 1.03, rotate: idx === 0 ? -1 : 1 }}
                whileTap={{ scale: 0.97 }}
                onClick={(e) => openLightbox(photoIndex, e)}
                className="group relative cursor-pointer bg-slate-100 text-slate-900 p-5 sm:p-6 rounded-3xl polaroid-shadow transition-all duration-300 border-2 border-white/90 hover:border-amber-400 shadow-2xl hover:shadow-[0_0_35px_rgba(251,191,36,0.3)]"
              >
                {/* Golden tape on top corner */}
                <div
                  className={`absolute -top-3 ${
                    idx === 0 ? '-left-3 rotate-[-15deg]' : '-right-3 rotate-[15deg]'
                  } z-10 h-7 w-20 bg-amber-200/80 backdrop-blur-sm border border-amber-300 shadow-sm`}
                />

                {/* Photo frame */}
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-slate-900 flex items-center justify-center">
                  {!hasError ? (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      onError={() => handleImageError(photo.id)}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    /* Elegant placeholder */
                    <div className="h-full w-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 text-center">
                      <div className="h-14 w-14 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center mb-2">
                        <Sparkles className="h-7 w-7 text-amber-300" />
                      </div>
                      <span className="font-display font-bold text-amber-300 text-base">
                        {photo.tag}
                      </span>
                      <span className="text-slate-400 text-xs mt-1">
                        Add photo at {photo.src}
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 right-3 rounded-full bg-slate-950/70 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/90">
                    Featured Moment
                  </div>
                </div>

                {/* Handwritten Caption */}
                <div className="mt-5 text-center">
                  <p className="font-handwriting text-2xl sm:text-3xl font-bold text-slate-800 leading-snug">
                    {photo.caption}
                  </p>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-sans text-amber-600 font-bold uppercase tracking-wider mt-1.5">
                    <Heart className="h-3 w-3 fill-amber-500 text-amber-500" />
                    <span>Unforgettable Memory</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Final Celebration Line under Photos */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-8 pb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <h3 className="font-display text-2xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-sky-300 to-amber-300 drop-shadow-[0_0_25px_rgba(56,189,248,0.5)]">
              {siteConfig.photos.finalMessage}
            </h3>
            <Sparkles className="h-5 w-5 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <p className="text-slate-400 text-sm max-w-sm">
            Here's to the brightest future and countless more milestones ahead.
          </p>
        </motion.div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4 select-none"
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Close photo"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Left Nav Arrow */}
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-110"
              aria-label="Next photo"
            >
              <ChevronRight className="h-7 w-7" />
            </button>

            {/* Modal Card */}
            <motion.div
              key={selectedPhotoIndex}
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white text-slate-900 rounded-3xl p-4 sm:p-6 polaroid-shadow overflow-hidden flex flex-col items-center"
            >
              {/* Photo */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-950 flex items-center justify-center max-h-[65vh]">
                {!imageErrors[siteConfig.photos.items[selectedPhotoIndex].id] ? (
                  <img
                    src={siteConfig.photos.items[selectedPhotoIndex].src}
                    alt={siteConfig.photos.items[selectedPhotoIndex].alt}
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-center text-white">
                    <Camera className="h-12 w-12 text-amber-300 mb-3" />
                    <span className="font-display font-bold text-amber-300 text-lg">
                      {siteConfig.photos.items[selectedPhotoIndex].tag}
                    </span>
                    <span className="text-slate-400 text-sm mt-1">
                      {siteConfig.photos.items[selectedPhotoIndex].src}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption & Counter */}
              <div className="mt-4 text-center">
                <p className="font-handwriting text-2xl sm:text-3xl font-bold text-slate-900">
                  {siteConfig.photos.items[selectedPhotoIndex].caption}
                </p>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    Photo {selectedPhotoIndex + 1} of {siteConfig.photos.items.length}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
