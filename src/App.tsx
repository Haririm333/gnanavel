import { useState, useEffect } from 'react';
import { IntroExperience } from './components/intro/IntroExperience';
import { HeroSection } from './components/hero/HeroSection';
import { AgeRevealSection } from './components/age/AgeRevealSection';
import { JourneySection } from './components/timeline/JourneySection';
import { WishesSection } from './components/wishes/WishesSection';
import { GiftBoxSection } from './components/gift/GiftBoxSection';
import { CakeFinaleSection } from './components/cake/CakeFinaleSection';
import { PhotosSection } from './components/photos/PhotosSection';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/footer/Footer';
import { SparkleTrail } from './components/effects/SparkleTrail';

export default function App() {
  const [introDone, setIntroDone] = useState<boolean>(false);

  // Lock scroll during intro, unlock after intro blast and hero reveal
  useEffect(() => {
    if (!introDone) {
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [introDone]);

  const handleIntroComplete = () => {
    setIntroDone(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030612] text-white selection:bg-amber-400 selection:text-slate-900">
      {/* Global Cursor / Touch Sparkle Trail */}
      <SparkleTrail />

      {/* 0 & 0.5. Intro Countdown & Sky Shot Cracker Blast */}
      {!introDone && <IntroExperience onIntroComplete={handleIntroComplete} />}

      {/* Sticky Mini Nav & Music Toggle (Appears after blast) */}
      <Navbar showNav={introDone} />

      {/* 1. Hero: Happy Birthday Reveal */}
      <HeroSection introDone={introDone} />

      {/* 2. Age Reveal (0 -> 18 Counter) */}
      <AgeRevealSection />

      {/* 3. Journey to 18 (Vertical Animated Timeline) */}
      <JourneySection />

      {/* 4. Wishes (Floating Glass Cards) */}
      <WishesSection />

      {/* 5. Surprise Gift Box (Wiggle, Open, Card Rise) */}
      <GiftBoxSection />

      {/* 6. Cake Finale (18 Flickering Candles, Blow, Fireworks Show) */}
      <CakeFinaleSection />

      {/* 7. Photos (Clothesline, Featured Frames, Lightbox) */}
      <PhotosSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
