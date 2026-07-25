(() => {
  "use strict";
  const D = WEDDING_DATA;

  /* ---------------------------------------------------------
     0. UTIL
  --------------------------------------------------------- */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  function showToast(msg, ms = 3000) {
    const toast = $("#toast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove("show"), ms);
  }

  function vibrate(pattern) {
    if (navigator.vibrate) navigator.vibrate(pattern);
  }

  function attachRipple(btn) {
    btn.classList.add("ripple-btn");
    btn.addEventListener("click", (e) => {
      const rect = btn.getBoundingClientRect();
      const dot = document.createElement("span");
      const size = Math.max(rect.width, rect.height);
      dot.className = "ripple-dot";
      dot.style.width = dot.style.height = size + "px";
      dot.style.left = (e.clientX - rect.left - size / 2) + "px";
      dot.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(dot);
      setTimeout(() => dot.remove(), 650);
    });
  }
  $$(".ripple-btn, .btn-open, .btn-primary, .btn-outline").forEach(attachRipple);

  /* ---------------------------------------------------------
     1. LOADING SCREEN
  --------------------------------------------------------- */
  window.addEventListener("load", () => {
    requestAnimationFrame(() => { $("#loading-bar-fill").style.width = "100%"; });
    setTimeout(() => {
      $("#loading-screen").classList.add("hidden");
    }, 2400);
  });

  /* ---------------------------------------------------------
     2. AMBIENT FALLING PETALS (requestAnimationFrame, lightweight)
  --------------------------------------------------------- */
  const petalLayer = $("#petal-layer");
  const PETAL_EMOJI = ["🌸", "🌺", "🥀"];
  function spawnPetal() {
    const el = document.createElement("div");
    el.className = "petal";
    el.textContent = PETAL_EMOJI[Math.floor(Math.random() * PETAL_EMOJI.length)];
    const size = 14 + Math.random() * 16;
    const startX = Math.random() * 100;
    const duration = 8 + Math.random() * 10;
    const drift = (Math.random() - 0.5) * 160;
    el.style.left = startX + "vw";
    el.style.fontSize = size + "px";
    petalLayer.appendChild(el);

    const anim = el.animate(
      [
        { transform: `translate(0, -10vh) rotate(0deg)`, opacity: 0 },
        { transform: `translate(${drift * 0.3}px, 40vh) rotate(180deg)`, opacity: 0.85, offset: 0.15 },
        { transform: `translate(${drift}px, 110vh) rotate(360deg)`, opacity: 0 },
      ],
      { duration: duration * 1000, easing: "linear" }
    );
    anim.onfinish = () => el.remove();
  }
  let petalInterval = setInterval(spawnPetal, 900);
  // keep it light: pause spawning when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) { clearInterval(petalInterval); }
    else { petalInterval = setInterval(spawnPetal, 900); }
  });

  /* ---------------------------------------------------------
     3. HEADER: glass on scroll + mobile menu
  --------------------------------------------------------- */
  const header = $("#site-header");
  window.addEventListener("scroll", () => {
    header.classList.toggle("scrolled", window.scrollY > 100);
    $("#back-to-top").classList.toggle("visible", window.scrollY > 500);
  }, { passive: true });

  const hamburgerBtn = $("#hamburger-btn");
  const mobileMenu = $("#mobile-menu");
  hamburgerBtn.addEventListener("click", () => mobileMenu.classList.toggle("open"));

  $$("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = document.querySelector(btn.dataset.scroll);
      mobileMenu.classList.remove("open");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });

  /* ---------------------------------------------------------
     4. DATA BINDING — cover, greeting, quran, profile, gift,
        location, footer (single source of truth = data.js)
  --------------------------------------------------------- */
  $("#cover-names").innerHTML = `${D.groom.name} <span class="amp">&amp;</span> ${D.bride.name}`;
  $("#cover-date").textContent = D.weddingDateLabel;

  const params = new URLSearchParams(window.location.search);
  const guestName = params.get("to") ? decodeURIComponent(params.get("to")) : D.greetingDefault;
  $("#cover-guest").textContent = `Kepada Yth. ${guestName}`;
  $("#greeting-name").textContent = guestName;

  $("#quran-arabic").textContent = D.quote.arabic;
  $("#quran-translation").textContent = D.quote.translation;
  $("#quran-source").textContent = D.quote.source;

  $("#groom-name").textContent = D.groom.name;
  $("#groom-order").textContent = D.groom.child;
  $("#groom-parents").textContent = D.groom.parents;
  $("#bride-name").textContent = D.bride.name;
  $("#bride-order").textContent = D.bride.child;
  $("#bride-parents").textContent = D.bride.parents;

  $("#location-name").textContent = D.location.name;
  $("#location-address").textContent = D.location.address;
  $("#location-btn").href = D.location.mapsUrl;

  $("#gift-bank").textContent = D.gift.bank;
  $("#gift-number").textContent = D.gift.accountNumber;
  $("#gift-name").textContent = "a.n. " + D.gift.accountName;
  $("#qris-img").src = D.gift.qrisImage;

  $("#footer-tagline").textContent = `${D.footer.tagline} • ${D.footer.subtitle}`;
  $("#footer-year").textContent = `© ${new Date().getFullYear()} ${D.coupleShort}`;

  /* ---- Event detail cards ---- */
  const eventGrid = $("#event-grid");
  Object.values(D.events).forEach((ev, i) => {
    const card = document.createElement("div");
    card.className = "event-card reveal";
    card.innerHTML = `
      <div class="event-icon">${i === 0 ? "💍" : "🎉"}</div>
      <div class="event-title">${ev.title}</div>
      <div class="event-line">${ev.date}<br/>${ev.time}<br/>${ev.place}<br/>${ev.address}</div>
    `;
    eventGrid.appendChild(card);
  });

  /* ---- Timeline ---- */
  const timelineWrap = $("#timeline-wrap");
  D.timeline.forEach((t, i) => {
    const item = document.createElement("div");
    item.className = "timeline-item reveal";
    item.dataset.dir = i % 2 === 0 ? "left" : "right";
    item.innerHTML = `
      <div class="timeline-dot"></div>
      <div class="timeline-year">${t.year}</div>
      <div class="timeline-title">${t.title}</div>
      <div class="timeline-desc">${t.desc}</div>
    `;
    timelineWrap.appendChild(item);
  });

  /* ---- Gallery slides ---- */
  const galleryWrapper = $("#gallery-wrapper");
  D.gallery.forEach((src, i) => {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";
    slide.innerHTML = `<img src="${src}" alt="Galeri ${i + 1}" loading="lazy" data-index="${i}" />`;
    galleryWrapper.appendChild(slide);
  });

  /* ---------------------------------------------------------
     5. COVER "BUKA UNDANGAN" -> curtain open + music + autoscroll
  --------------------------------------------------------- */
  $("#open-invitation-btn").addEventListener("click", () => {
    document.body.classList.add("curtains-open");
    playMusic();
    setTimeout(() => {
      $("#greeting").scrollIntoView({ behavior: "smooth" });
    }, 650);
  });

  /* ---------------------------------------------------------
     6. MUSIC PLAYER (starts on user gesture only)
  --------------------------------------------------------- */
  const audio = $("#bg-audio");
  audio.src = D.music.src;
  const musicBtn = $("#music-toggle");
  let musicPlaying = false;

  function playMusic() {
    audio.play().then(() => {
      musicPlaying = true;
      musicBtn.classList.add("playing");
    }).catch(() => { /* autoplay blocked or file missing — user can tap the button */ });
  }
  function toggleMusic() {
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
      musicBtn.classList.remove("playing");
    } else {
      playMusic();
    }
  }
  musicBtn.addEventListener("click", toggleMusic);

  /* ---------------------------------------------------------
     7. COUNTDOWN (with flip animation on change)
  --------------------------------------------------------- */
  const targetDate = new Date(D.weddingDateISO).getTime();
  const cdEls = {
    days: $("#cd-days"), hours: $("#cd-hours"),
    minutes: $("#cd-minutes"), seconds: $("#cd-seconds"),
  };
  let lastValues = { days: null, hours: null, minutes: null, seconds: null };

  function updateCountdown() {
    const now = Date.now();
    let diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    const values = { days, hours, minutes, seconds };

    Object.entries(values).forEach(([key, val]) => {
      const str = String(val).padStart(2, "0");
      if (lastValues[key] !== val) {
        cdEls[key].textContent = str;
        cdEls[key].classList.remove("flip");
        void cdEls[key].offsetWidth; // reflow to restart animation
        cdEls[key].classList.add("flip");
        lastValues[key] = val;
      }
    });
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------------------------------------------------------
     8. SCROLL REVEAL (IntersectionObserver) + timeline line growth
  --------------------------------------------------------- */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
  $$(".reveal").forEach((el) => revealObserver.observe(el));

  const timelineItemObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in-view");
    });
  }, { threshold: 0.5 });
  $$(".timeline-item").forEach((el) => timelineItemObserver.observe(el));

  function updateTimelineLine() {
    const wrap = $("#timeline-wrap");
    const line = $("#timeline-line");
    const rect = wrap.getBoundingClientRect();
    const vh = window.innerHeight;
    const total = rect.height;
    const visible = Math.min(Math.max(vh * 0.75 - rect.top, 0), total);
    line.style.height = (total ? (visible / total) * 100 : 0) + "%";
  }
  window.addEventListener("scroll", updateTimelineLine, { passive: true });
  window.addEventListener("resize", updateTimelineLine);
  updateTimelineLine();

  /* ---------------------------------------------------------
     9. GALLERY — Swiper + fullscreen lightbox
  --------------------------------------------------------- */
  const gallerySwiper = new Swiper(".swiper", {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 1.15,
    centeredSlides: true,
    breakpoints: {
      640: { slidesPerView: 2.2, centeredSlides: false },
      1024: { slidesPerView: 3.1, centeredSlides: false },
    },
    pagination: { el: ".swiper-pagination", clickable: true },
    navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  });

  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightbox-img");
  let lightboxIndex = 0;

  function openLightbox(index) {
    lightboxIndex = index;
    lightboxImg.src = D.gallery[lightboxIndex];
    lightbox.classList.add("open");
  }
  function stepLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + D.gallery.length) % D.gallery.length;
    lightboxImg.src = D.gallery[lightboxIndex];
  }
  galleryWrapper.addEventListener("click", (e) => {
    const img = e.target.closest("img");
    if (img) openLightbox(Number(img.dataset.index));
  });
  $("#lightbox-close").addEventListener("click", () => lightbox.classList.remove("open"));
  $("#lightbox-next").addEventListener("click", () => stepLightbox(1));
  $("#lightbox-prev").addEventListener("click", () => stepLightbox(-1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) lightbox.classList.remove("open"); });

  /* ---------------------------------------------------------
     10. E-ANGPAO — copy account number + QRIS modal
  --------------------------------------------------------- */
  $("#copy-account-btn").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(D.gift.accountNumber);
      showToast("Nomor rekening berhasil disalin.");
      vibrate(20);
    } catch {
      showToast("Gagal menyalin. Salin manual: " + D.gift.accountNumber);
    }
  });

  const qrisModal = $("#qris-modal");
  $("#qris-btn").addEventListener("click", () => qrisModal.classList.add("open"));
  $("#qris-close").addEventListener("click", () => qrisModal.classList.remove("open"));
  qrisModal.addEventListener("click", (e) => { if (e.target === qrisModal) qrisModal.classList.remove("open"); });

  /* ---------------------------------------------------------
     11. RSVP — open WhatsApp with prefilled message
  --------------------------------------------------------- */
  $("#rsvp-btn").addEventListener("click", () => {
    const text =
`Halo.
Saya ingin mengonfirmasi kehadiran pada acara pernikahan.
Nama:
Jumlah Tamu:
Status Kehadiran:
Terima kasih.`;
    const url = `https://wa.me/${D.rsvp.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  });

  /* ---------------------------------------------------------
     12. BACK TO TOP
  --------------------------------------------------------- */
  $("#back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------------------------------------------------------
     13. SHARE
  --------------------------------------------------------- */
  $("#share-btn").addEventListener("click", async () => {
    const shareData = {
      title: `Undangan Pernikahan ${D.coupleShort}`,
      text: `Anda diundang ke pernikahan ${D.coupleShort}`,
      url: window.location.href,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch { /* user cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast("Link berhasil disalin.");
      } catch {
        showToast("Tidak dapat membagikan otomatis di perangkat ini.");
      }
    }
  });

  /* ---------------------------------------------------------
     14. GSAP: profile chibi slide-in (progressive enhancement)
  --------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    $$("[data-dir]").forEach((el) => {
      const fromX = el.dataset.dir === "left" ? -60 : 60;
      gsap.fromTo(el, { x: fromX, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%" },
      });
    });
  }
})();
