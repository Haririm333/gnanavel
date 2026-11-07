# 🎂 GNANAVEL - 18th Birthday Celebration Website 🎉

A cinematic, mobile-first, animated single-page birthday website built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion + canvas-confetti + HTML5 Canvas**.

---

## 🚀 Quick Start (How to Run)

1. **Install dependencies**:
   ```bash
   npm install
   ```
2. **Start the local development server**:
   ```bash
   npm run dev
   ```
3. Open your browser at [http://localhost:5173](http://localhost:5173).

---

## ✏️ How to Edit Content & Text (`src/config.ts`)

**All text, messages, milestones, and captions are centralized in one single file:**
👉 [`src/config.ts`](./src/config.ts)

You can easily customize:
- **`name` & `fullName`**: Change the display name.
- **`age`**: Milestone age (default `18`).
- **`intro`**: Start button text, hint message, and skip button.
- **`hero`**: Greeting, name reveal, subtitle, and button labels.
- **`ageReveal`**: Caption and level-up badge text.
- **`timeline`**: Milestone ages (0, 5, 10, 15, 17, 18), badges, titles, and descriptions.
- **`wishes`**: The 8 heartfelt wish cards and tags.
- **`giftBox`**: Special unboxing letter message and closing sign-off.
- **`cake`**: Cake title, blow button, wish text, and replay button.
- **`photos`**: Captions for all 5 photo frames and final celebration line.

---

## 📸 Adding Real Photos

Place your 5 photos in the `public/photos/` directory:
- `public/photos/photo1.jpg` (Clothesline polaroid 1)
- `public/photos/photo2.jpg` (Clothesline polaroid 2)
- `public/photos/photo3.jpg` (Clothesline polaroid 3)
- `public/photos/photo4.jpg` (Featured large polaroid 1)
- `public/photos/photo5.jpg` (Featured large polaroid 2)

> **Tips:**
> - Max recommended width: ~1600px (JPG/WebP compressed for web).
> - All photos are lazy-loaded and feature full-screen tap-to-open lightbox with swipe and keyboard controls.
> - If any photo is missing, elegant illustrated fallback cards will automatically render without broken image icons.

---

## 🎵 Custom Music

Place your celebration audio track at:
- `public/music.mp3`

> **Note:** The website includes a built-in Web Audio melodic synthesizer fallback. If `music.mp3` is empty or missing, tapping the **🎵 Music** button in the navigation bar will automatically play a gentle, celebratory lo-fi chime melody!

---

## 🌐 Deploy to Vercel or Netlify

### Option 1: Deploy to Vercel (Recommended)
1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Vercel automatically detects Vite:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Click **Deploy**!

Or via Vercel CLI:
```bash
npm i -g vercel
vercel
```

### Option 2: Deploy to Netlify
1. Push your code to GitHub.
2. Go to [netlify.com](https://netlify.com) and click **"Add new site" > "Import an existing project"**.
3. Connect your repository.
4. Settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Click **Deploy site**!

---

## 🎬 Site Flow

1. **Intro Countdown (0)**: Night sky with twinkling stars & lanterns. Tap to start countdown 10 → 1.
2. **Sky Shot Cracker Blast (0.5)**: Rocket launch trail, pause at apex, massive explosion, screen shake & flash, secondary bursts, gold glitter.
3. **Hero: Happy Birthday Reveal (1)**: Animated dawn sky, parallax drifting clouds, sun rays, looping paper plane, rising balloons (tap to pop), swinging bunting, dramatic letter drop-in.
4. **Age Reveal (2)**: 0 → 18 rolling counter, confetti blast, Level 18 unlocked badge.
5. **Journey to 18 (3)**: Vertical timeline with scroll-animated drawing line and milestones.
6. **Wishes (4)**: 8 floating glass cards with subtle drift and hover glow.
7. **Surprise Gift Box (5)**: Interactive wiggling 3D gift box with flying lid, light rays, and rising greeting card.
8. **Cake Finale (6)**: 3-tier animated cake with 18 flickering candles. Tap "Blow the candles" to blow them out one-by-one, screen dims, and grand canvas fireworks illuminate the sky.
9. **Photos (7)**: Clothesline string with 3 swaying polaroids (swipeable on mobile) + 2 large featured cards with 3D hover + full-screen interactive lightbox.
10. **Footer**: Warm credit & celebration badge.
