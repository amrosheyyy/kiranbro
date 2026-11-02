/**
 * ============================================================================
 * ELEGANT WEDDING ANNIVERSARY WEBSITE - INTERACTIVE JAVASCRIPT
 * ============================================================================
 * Easily customize couple names, anniversary date, music, and photos below!
 */

const CONFIG = {
    // Couple Details
    coupleNames: "Kiran Bro & Anjali Chechi",
    husbandName: "Kiran Bro",
    wifeName: "Anjali Chechi",
    weddingDate: "2019-11-02T00:00:00", // Format: YYYY-MM-DD
    anniversaryYearsTitle: "Years of Pure Love & Togetherness",

    // Background Music
    defaultAudio: "Saiyaara_reprise_female.mp3",
    audioVolume: 0.45,

    // Photos Gallery (Continuing the order from third to last)
    photos: [
        {
            url: "Third.jpeg",
            emoji: "🤍 ✨"
        },
        {
            url: "Fourth.jpeg",
            emoji: "✨ ✦"
        },
        {
            url: "Fifth.jpeg",
            emoji: "☕ 🌿"
        },
        {
            url: "Sixth.jpeg",
            emoji: "🌿 🤍"
        },
        {
            url: "Seventh.jpeg",
            emoji: "🕊️ ✨"
        },
        {
            url: "Last.jpeg",
            emoji: "🥂 🤍"
        }
    ]
};

// ============================================================================
// DOM ELEMENTS
// ============================================================================
const openingOverlay = document.getElementById("openingOverlay");
const openBtn = document.getElementById("openBtn");
const bgAudio = document.getElementById("bgAudio");
const musicWidget = document.getElementById("musicWidget");
const playPauseBtn = document.getElementById("playPauseBtn");
const volumeSlider = document.getElementById("volumeSlider");
const vinylDisc = document.getElementById("vinylDisc");
const polaroidGrid = document.getElementById("polaroidGrid");
const customPhotoInput = document.getElementById("customPhotoInput");
const uploadBtn = document.getElementById("uploadBtn");
const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseMessage = document.getElementById("surpriseMessage");
const surpriseQuoteText = document.getElementById("surpriseQuoteText");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentPhotoIndex = 0;
let activePhotosList = [...CONFIG.photos];
let surpriseQuoteIndex = 0;

// ============================================================================
// AUDIO CONTROLLER & AUTOPLAY UNLOCK
// ============================================================================
function initAudio() {
    bgAudio.volume = CONFIG.audioVolume;
    if (volumeSlider) {
        volumeSlider.value = CONFIG.audioVolume;
    }

    // Toggle Play / Pause
    if (playPauseBtn) playPauseBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMusic();
    });
    if (vinylDisc) vinylDisc.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMusic();
    });
    if (musicWidget) musicWidget.addEventListener("click", toggleMusic);

    // Volume Slider
    if (volumeSlider) {
        volumeSlider.addEventListener("input", (e) => {
            bgAudio.volume = parseFloat(e.target.value);
            if (bgAudio.volume === 0) {
                playPauseBtn.innerHTML = "🔇";
            } else {
                playPauseBtn.innerHTML = bgAudio.paused ? "▶" : "⏸";
            }
        });
    }

    // Audio State Event Listeners
    bgAudio.addEventListener("play", () => {
        musicWidget.classList.add("playing");
        playPauseBtn.innerHTML = "⏸";
    });

    bgAudio.addEventListener("pause", () => {
        musicWidget.classList.remove("playing");
        playPauseBtn.innerHTML = "▶";
    });

    // Custom song selection
    const songInput = document.getElementById("customSongInput");
    if (songInput) {
        songInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                bgAudio.src = url;
                bgAudio.play();
                document.getElementById("musicTrackTitle").textContent = file.name.replace(/\.[^/.]+$/, "");
            }
        });
    }
}

function toggleMusic() {
    if (bgAudio.paused) {
        bgAudio.play().catch(err => {
            console.log("Audio play blocked or waiting for user interaction:", err);
        });
    } else {
        bgAudio.pause();
    }
}

// ============================================================================
// OPENING CEREMONY TRIGGER
// ============================================================================
if (openBtn) {
    openBtn.addEventListener("click", () => {
        // Fade out overlay
        openingOverlay.classList.add("hidden");

        // Start audio
        bgAudio.volume = CONFIG.audioVolume;
        bgAudio.play().then(() => {
            musicWidget.classList.add("playing");
            playPauseBtn.innerHTML = "⏸";
        }).catch(() => {
            console.log("Autoplay blocked - user can tap play button anytime");
        });

        // Launch celebratory confetti burst
        burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 35);

        setTimeout(() => {
            openingOverlay.style.display = "none";
        }, 900);
    });
}

const skipAudioBtn = document.getElementById("skipAudioBtn");
if (skipAudioBtn) {
    skipAudioBtn.addEventListener("click", () => {
        openingOverlay.classList.add("hidden");
        burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 25);
        setTimeout(() => {
            openingOverlay.style.display = "none";
        }, 900);
    });
}

// ============================================================================
// LIVE ANNIVERSARY COUNTER
// ============================================================================
function updateAnniversaryCounter() {
    const startDate = new Date(CONFIG.weddingDate).getTime();
    const now = new Date().getTime();
    let diff = Math.max(0, now - startDate);

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const daysTotal = Math.floor(diff / (1000 * 60 * 60 * 24));

    // Approximate years & remaining days
    const years = Math.floor(daysTotal / 365.25);
    const remainingDays = Math.floor(daysTotal % 365.25);

    const elYears = document.getElementById("counterYears");
    const elDays = document.getElementById("counterDays");
    const elHours = document.getElementById("counterHours");
    const elMinutes = document.getElementById("counterMinutes");
    const elSeconds = document.getElementById("counterSeconds");

    if (elYears) elYears.textContent = years;
    if (elDays) elDays.textContent = remainingDays;
    if (elHours) elHours.textContent = hours.toString().padStart(2, '0');
    if (elMinutes) elMinutes.textContent = minutes.toString().padStart(2, '0');
    if (elSeconds) elSeconds.textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateAnniversaryCounter, 1000);
updateAnniversaryCounter();

// ============================================================================
// POLAROID GALLERY RENDERING & LIGHTBOX
// ============================================================================
function renderPolaroids() {
    if (!polaroidGrid) return;
    polaroidGrid.innerHTML = "";

    activePhotosList.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "polaroid";
        card.setAttribute("data-index", index);

        card.innerHTML = `
            <div class="polaroid-img-wrap">
                <img src="${item.url}" alt="Memory" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'">
            </div>
            <div class="polaroid-emoji">${item.emoji || "🤍 ✨"}</div>
        `;

        card.addEventListener("click", () => openLightbox(index));
        polaroidGrid.appendChild(card);
    });
}

function openLightbox(index) {
    if (!lightbox || !lightboxImg) return;
    currentPhotoIndex = index;
    const photo = activePhotosList[currentPhotoIndex];
    if (!photo) return;

    lightboxImg.src = photo.url;
    if (lightboxCaption) lightboxCaption.textContent = photo.emoji || "🤍 ✨";
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + activePhotosList.length) % activePhotosList.length;
    openLightbox(currentPhotoIndex);
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % activePhotosList.length;
    openLightbox(currentPhotoIndex);
}

// Lightbox Navigation Listeners
if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
if (lightboxPrev) lightboxPrev.addEventListener("click", prevPhoto);
if (lightboxNext) lightboxNext.addEventListener("click", nextPhoto);

if (lightbox) {
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) closeLightbox();
    });
}

document.addEventListener("keydown", (e) => {
    if (!lightbox || !lightbox.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") prevPhoto();
    if (e.key === "ArrowRight") nextPhoto();
});

// Custom Photo Upload via File Picker
if (uploadBtn && customPhotoInput) {
    uploadBtn.addEventListener("click", () => customPhotoInput.click());

    customPhotoInput.addEventListener("change", (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;

        files.forEach((file, i) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                activePhotosList.unshift({
                    url: event.target.result,
                    caption: `Cherished Moment ${activePhotosList.length + 1} 🤍`,
                    date: "Special Memory"
                });
                renderPolaroids();
                burstConfetti(window.innerWidth / 2, window.innerHeight / 2, 25);
            };
            reader.readAsDataURL(file);
        });
    });
}

// ============================================================================
// SEND LOVE FLOATING HEARTS & CONFETTI INTERACTION
// ============================================================================

// Send Love Floating Hearts
const sendLoveBtn = document.getElementById("sendLoveBtn");
if (sendLoveBtn) {
    sendLoveBtn.addEventListener("click", (e) => {
        const rect = sendLoveBtn.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top, 30);
    });
}

const heroLoveBtn = document.getElementById("heroLoveBtn");
if (heroLoveBtn) {
    heroLoveBtn.addEventListener("click", (e) => {
        const rect = heroLoveBtn.getBoundingClientRect();
        burstConfetti(rect.left + rect.width / 2, rect.top, 30);
    });
}

function burstConfetti(x, y, count = 25) {
    const emojis = ["🤍", "✨", "🌸", "💖", "🥂", "💍", "🌹"];

    for (let i = 0; i < count; i++) {
        const el = document.createElement("div");
        el.className = "floating-heart";
        el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

        const xOffset = (Math.random() - 0.5) * 450;
        const rot = (Math.random() - 0.5) * 400;

        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.setProperty("--tx", `${xOffset}px`);
        el.style.setProperty("--rot", `${rot}deg`);
        el.style.fontSize = `${Math.floor(Math.random() * 18 + 16)}px`;

        document.body.appendChild(el);

        setTimeout(() => {
            el.remove();
        }, 4000);
    }
}

// ============================================================================
// ============================================================================
// CANVAS FLOATING AESTHETIC EMOJIS (DRIFTING & FLYING AROUND)
// ============================================================================
const canvas = document.getElementById("particlesCanvas");
const ctx = canvas.getContext("2d");

let particles = [];
let tapParticles = [];
const isMobileDevice = window.innerWidth <= 768;
const particleCount = isMobileDevice ? 15 : 24;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const AESTHETIC_EMOJIS = ["🤍", "✨", "🌸", "🕊️", "🥂", "🌿", "💖", "🌷", "✦"];

class FloatingEmojiParticle {
    constructor(initial = false) {
        this.reset(initial);
    }

    reset(initial = false) {
        this.emoji = AESTHETIC_EMOJIS[Math.floor(Math.random() * AESTHETIC_EMOJIS.length)];
        this.baseX = Math.random() * canvas.width;
        this.x = this.baseX;
        this.y = initial ? Math.random() * canvas.height : canvas.height + 25 + Math.random() * 40;
        this.size = Math.random() * 8 + 18; // 18px to 26px
        this.speedY = Math.random() * 0.45 + 0.35; // gentle upward drift
        this.swayAngle = Math.random() * Math.PI * 2;
        this.swaySpeed = Math.random() * 0.015 + 0.008;
        this.swayDistance = Math.random() * 24 + 14;
        this.rotation = (Math.random() - 0.5) * 0.3;
        this.rotationSpeed = (Math.random() - 0.5) * 0.006;
        this.targetOpacity = Math.random() * 0.35 + 0.35; // 0.35 to 0.70
        this.opacity = initial ? this.targetOpacity : 0;
    }

    update() {
        this.y -= this.speedY;
        this.swayAngle += this.swaySpeed;
        this.rotation += this.rotationSpeed;
        this.x = this.baseX + Math.sin(this.swayAngle) * this.swayDistance;

        // Smooth fade-in from bottom
        if (this.y > canvas.height - 120) {
            this.opacity = Math.min(this.targetOpacity, this.opacity + 0.02);
        }
        // Smooth fade-out near top
        else if (this.y < 80) {
            this.opacity = Math.max(0, this.opacity - 0.015);
        }

        // Recycle when drifted off the top
        if (this.y < -40 || (this.opacity <= 0 && this.y < 50)) {
            this.reset(false);
        }
    }

    draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
    }
}

class TapFloatingEmoji {
    constructor(x, y) {
        const tapEmojis = ["🤍", "✨", "🌸", "💖", "🕊️", "🥂"];
        this.emoji = tapEmojis[Math.floor(Math.random() * tapEmojis.length)];
        this.x = x + (Math.random() - 0.5) * 16;
        this.y = y;
        this.size = Math.random() * 8 + 20;
        this.speedY = Math.random() * 1.6 + 1.2;
        this.speedX = (Math.random() - 0.5) * 1.2;
        this.opacity = 0.95;
        this.rotation = (Math.random() - 0.5) * 0.4;
    }

    update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.speedY *= 0.985;
        this.opacity -= 0.018;
    }

    draw() {
        if (this.opacity <= 0) return;
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.font = `${this.size}px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.emoji, 0, 0);
        ctx.restore();
    }
}

// Initial populate of floating ambient emojis
for (let i = 0; i < particleCount; i++) {
    particles.push(new FloatingEmojiParticle(true));
}

// Interactive tap/click spawning floating aesthetic emojis
window.addEventListener("pointerdown", (e) => {
    if (e.target.closest && e.target.closest("button, .open-celebration-btn, .music-widget, input, a, .lightbox-close, .lightbox-nav")) return;
    tapParticles.push(new TapFloatingEmoji(e.clientX, e.clientY));
    if (Math.random() > 0.4) {
        tapParticles.push(new TapFloatingEmoji(e.clientX + (Math.random() - 0.5) * 22, e.clientY + (Math.random() - 0.5) * 22));
    }
});

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Ambient floating emojis
    particles.forEach(p => {
        p.update();
        p.draw();
    });

    // Tap/touch burst emojis
    for (let i = tapParticles.length - 1; i >= 0; i--) {
        const tp = tapParticles[i];
        tp.update();
        tp.draw();
        if (tp.opacity <= 0) {
            tapParticles.splice(i, 1);
        }
    }

    requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================================================================
// INTERSECTION OBSERVER FOR SMOOTH SCROLL REVEALS
// ============================================================================
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(".polaroid, .letter-envelope-box, .hero-quote-box").forEach(el => {
    revealObserver.observe(el);
});

// Smooth Scroll for Scroll Down button
const scrollIndicator = document.getElementById("scrollIndicator");
if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
        window.scrollTo({
            top: window.innerHeight * 0.9,
            behavior: "smooth"
        });
    });
}

// ============================================================================
// INITIALIZATION
// ============================================================================
window.addEventListener("DOMContentLoaded", () => {
    initAudio();
    renderPolaroids();
});
