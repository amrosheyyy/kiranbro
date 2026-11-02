# 💍 Aesthetic Wedding Anniversary Celebration Website

A romantic, luxury, editorial-style wedding anniversary website designed to celebrate love with photos, background music, smooth animations, and interactive elements.

---

## 🌟 Key Features

1. **Luxury Opening Ceremony (Envelope Unseal)**:
   - Starts with an elegant sealed envelope card and wax seal button.
   - Smoothly reveals the website and auto-starts the background music without browser autoplay restrictions.

2. **Aesthetic Background Music Player**:
   - Floating glassmorphism player with a rotating vinyl record.
   - Animated sound equalizer bars.
   - Play/Pause toggle, volume slider, and track title.
   - Built-in button (`🎵`) to pick and play any MP3 song directly from your device on the fly!
   - Default music is set to `Saiyaara.mp3` (already included in this folder).

3. **Live Anniversary Time Counter**:
   - Real-time ticker calculating exact **Years, Days, Hours, Minutes, and Seconds** spent together.

4. **Interactive Polaroid Memory Gallery**:
   - Scrapbook-style polaroid cards with subtle tilts, washi tape aesthetics, and handwritten cursive captions.
   - **Full-screen Lightbox**: Click any photo to expand with Next/Previous and keyboard arrow navigation.
   - **Live Photo Uploader**: Click `📷 Add Your Photos` to select your real couple/family photos from your computer or phone and preview them immediately!

5. **Romantic Journey Timeline**:
   - 5 illustrated chapters celebrating the journey from the first spark to sacred vows and forever.

6. **Wax-Sealed Love Letter & Surprise Wishes**:
   - Heartfelt, touching letter of gratitude and blessings.
   - Interactive `Tap for a Sweet Blessing ✨` button that shoots floating hearts and reveals romantic blessings.
   - `💖 Send Love Reaction` button that triggers bursts of floating hearts across the screen.

7. **Aesthetic Canvas Visual Effects**:
   - Gentle floating gold stardust and rose petal particles drifting in the background.

---

## 🚀 How to Run the Website

### Option 1: Double-click to open
Simply double-click `index.html` to open it in any web browser (Google Chrome, Firefox, Edge, Safari).

### Option 2: Run a quick local server (Recommended for best audio performance)
In the terminal, run:
```bash
cd /home/amrosh/Desktop/anniversary-site
python3 -m http.server 8000
```
Then open `http://localhost:8000` in your web browser.

---

## 🎨 How to Customize

All customization settings are located right at the top of [`script.js`](file:///home/amrosh/Desktop/anniversary-site/script.js#L7-L38):

### 1. Change Couple Names & Wedding Date
Open [`script.js`](file:///home/amrosh/Desktop/anniversary-site/script.js) and edit lines 8-10:
```javascript
coupleNames: "Together Forever", // Change to e.g. "Rahul & Priya"
weddingDate: "2018-11-02T00:00:00", // Your wedding date (YYYY-MM-DD)
```

### 2. Change or Add Your Own Photos
You can add your own photos in two ways:
- **Instant Preview**: Click the **"📷 Add Your Photos"** button on the website to select photos from your device.
- **Permanent Setup**:
  1. Place your photos in this folder (e.g. `photo1.jpg`, `photo2.jpg`).
  2. In [`script.js`](file:///home/amrosh/Desktop/anniversary-site/script.js), update the `photos` array:
  ```javascript
  photos: [
      {
          url: "photo1.jpg",
          caption: "Our Wedding Day 🤍",
          date: "The happiest day"
      },
      {
          url: "photo2.jpg",
          caption: "Sweet Memories ✨",
          date: "Vacation"
      }
  ]
  ```

### 3. Change Background Music
- Place any MP3 file in this folder and name it `Saiyaara.mp3`, OR
- In [`script.js`](file:///home/amrosh/Desktop/anniversary-site/script.js), change:
  ```javascript
  defaultAudio: "your-song-name.mp3",
  ```
- Or use the `🎵` button in the music player to pick any audio file live!

### 4. Edit the Anniversary Wish Message
Open [`index.html`](file:///home/amrosh/Desktop/anniversary-site/index.html) and look for `<section class="letter-section" id="wish">`. You can edit the text to express your personal wishes and memories.
