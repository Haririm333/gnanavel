export interface TimelineMilestone {
  age: number;
  badge: string;
  title: string;
  description: string;
  icon: string;
}

export interface WishCard {
  id: number;
  message: string;
  author?: string;
  tag?: string;
  gradient: string;
}

export interface PhotoItem {
  id: number;
  src: string;
  caption: string;
  alt: string;
  tag: string;
  rotation?: string;
}

export interface SiteConfig {
  name: string;
  fullName: string;
  age: number;
  audioSrc: string;
  intro: {
    startButtonText: string;
    countdownHint: string;
    skipText: string;
  };
  hero: {
    greeting: string;
    name: string;
    subtitle: string;
    confettiButtonText: string;
    scrollButtonText: string;
  };
  ageReveal: {
    prefix: string;
    caption: string;
  };
  timeline: {
    title: string;
    subtitle: string;
    milestones: TimelineMilestone[];
  };
  wishes: {
    title: string;
    subtitle: string;
    items: WishCard[];
  };
  giftBox: {
    badge: string;
    prompt: string;
    tapHint: string;
    message: string;
    closing: string;
    resetButton: string;
  };
  cake: {
    title: string;
    subtitle: string;
    blowButtonText: string;
    wishText: string;
    replayButtonText: string;
  };
  photos: {
    title: string;
    subtitle: string;
    items: PhotoItem[];
    finalMessage: string;
  };
  nav: {
    items: { label: string; href: string }[];
  };
  footer: {
    credit: string;
  };
}

export const siteConfig: SiteConfig = {
  name: "GNANAVEL",
  fullName: "Gnanavel",
  age: 18,
  audioSrc: "/music.mp3",
  intro: {
    startButtonText: "Tap to start the celebration 🎉",
    countdownHint: "Something special is about to happen...",
    skipText: "Skip intro",
  },
  hero: {
    greeting: "HAPPY BIRTHDAY",
    name: "GNANAVEL!",
    subtitle: "Today, the legend officially becomes an adult. 🎂",
    confettiButtonText: "Tap for confetti 🎉",
    scrollButtonText: "Scroll to celebrate ↓",
  },
  ageReveal: {
    prefix: "LEVEL",
    caption: "18 years of being awesome. Level 18 unlocked. 🎮",
  },
  timeline: {
    title: "Journey to 18 🚀",
    subtitle: "Every year made the legend who he is today",
    milestones: [
      {
        age: 0,
        badge: "Chapter 01",
        title: "The Genesis",
        description: "The legend is born. The world gets a lot more fun.",
        icon: "👶",
      },
      {
        age: 5,
        badge: "Chapter 02",
        title: "The School Explorer",
        description: "First day of school. Zero homework, maximum energy.",
        icon: "🎒",
      },
      {
        age: 10,
        badge: "Chapter 03",
        title: "The MVP Friend",
        description: "Became the friend everyone wanted on their team.",
        icon: "🏆",
      },
      {
        age: 15,
        badge: "Chapter 04",
        title: "The Golden Era",
        description: "Teenage era: new goals, new memories, new jokes.",
        icon: "⚡",
      },
      {
        age: 17,
        badge: "Chapter 05",
        title: "The Final Lap",
        description: "Almost there. The countdown begins.",
        icon: "⏳",
      },
      {
        age: 18,
        badge: "Chapter 06",
        title: "Adulthood Unlocked",
        description: "Today: officially an adult. Responsibilities loading... 😄",
        icon: "👑",
      },
    ],
  },
  wishes: {
    title: "Wishes from the Heart 💌",
    subtitle: "Words from everyone celebrating your big milestone",
    items: [
      {
        id: 1,
        message: "Happy 18th, Gnanavel! You're the kind of friend everyone is lucky to have. Keep shining. 🌟",
        tag: "Best Friend",
        gradient: "from-amber-500/20 to-orange-500/20",
      },
      {
        id: 2,
        message: "From school bench to adult life, the journey with you has been epic. Happy birthday, bro! 🎉",
        tag: "Squad",
        gradient: "from-sky-500/20 to-blue-500/20",
      },
      {
        id: 3,
        message: "May this year bring you success, happiness and everything you've been dreaming of. 🚀",
        tag: "Future Goals",
        gradient: "from-purple-500/20 to-pink-500/20",
      },
      {
        id: 4,
        message: "18 looks good on you. Don't forget us when you're famous! 😂",
        tag: "Classic Humor",
        gradient: "from-emerald-500/20 to-teal-500/20",
      },
      {
        id: 5,
        message: "Wishing you endless laughs, great grades and zero stress. Enjoy your day to the fullest! 🎂",
        tag: "Good Vibes",
        gradient: "from-rose-500/20 to-pink-500/20",
      },
      {
        id: 6,
        message: "You make every plan more fun. Here's to many more adventures together! 🙌",
        tag: "Adventures",
        gradient: "from-indigo-500/20 to-cyan-500/20",
      },
      {
        id: 7,
        message: "Welcome to adulthood, now you can finally say 'I'm busy' with proof. 😄 Happy birthday!",
        tag: "Adult Mode",
        gradient: "from-amber-400/20 to-yellow-500/20",
      },
      {
        id: 8,
        message: "Stay the same awesome person you are. Many happy returns of the day! 💙",
        tag: "Forever Bros",
        gradient: "from-blue-600/20 to-indigo-600/20",
      },
    ],
  },
  giftBox: {
    badge: "SPECIAL SURPRISE",
    prompt: "A special delivery just for the birthday boy 🎁",
    tapHint: "Tap to unwrap your gift",
    message: "Gnanavel, you're stepping into a brand new chapter. May every page be filled with success, laughter and people who truly care about you. Never stop chasing your dreams. Happy 18th birthday! 🎁💙",
    closing: "With love & pride, your squad ✨",
    resetButton: "Wrap it again 🎀",
  },
  cake: {
    title: "Make a Birthday Wish 🎂",
    subtitle: "18 candles ready for you to make your wish come true",
    blowButtonText: "Blow the candles 🌬️",
    wishText: "Make a wish, Gnanavel! 🎂✨",
    replayButtonText: "Replay fireworks 🎆",
  },
  photos: {
    title: "Moments that made 18 years special 📸",
    subtitle: "Little snapshots of an unforgettable journey",
    items: [
      {
        id: 1,
        src: "/photos/photo1.jpg",
        caption: "Still can't stop smiling at this one.",
        alt: "Gnanavel milestone 1",
        tag: "Memory #1",
        rotation: "-rotate-2",
      },
      {
        id: 2,
        src: "/photos/photo2.jpg",
        caption: "Peak vibes, zero effort.",
        alt: "Gnanavel milestone 2",
        tag: "Memory #2",
        rotation: "rotate-1",
      },
      {
        id: 3,
        src: "/photos/photo3.jpg",
        caption: "The legend in his natural habitat.",
        alt: "Gnanavel milestone 3",
        tag: "Memory #3",
        rotation: "-rotate-3",
      },
      {
        id: 4,
        src: "/photos/photo4.jpg",
        caption: "Memories we'll never delete.",
        alt: "Gnanavel milestone 4",
        tag: "Featured #1",
        rotation: "rotate-1",
      },
      {
        id: 5,
        src: "/photos/photo5.jpg",
        caption: "Many more to come.",
        alt: "Gnanavel milestone 5",
        tag: "Featured #2",
        rotation: "-rotate-1",
      },
    ],
    finalMessage: "Happy 18th Birthday, Gnanavel! 💙",
  },
  nav: {
    items: [
      { label: "Intro", href: "#hero" },
      { label: "Level 18", href: "#age" },
      { label: "Journey", href: "#journey" },
      { label: "Wishes", href: "#wishes" },
      { label: "Gift", href: "#gift" },
      { label: "Cake", href: "#cake" },
      { label: "Photos", href: "#photos" },
    ],
  },
  footer: {
    credit: "Made with ❤️ by Hari & friends. Happy 18th, Gnanavel!",
  },
};
