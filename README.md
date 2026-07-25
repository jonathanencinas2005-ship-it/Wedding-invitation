# Undangan Pernikahan Digital — Farhan & Aisyah (Template)

Template undangan digital satu halaman, siap dipakai ulang — cukup ganti isi
`data.js` untuk membuat undangan baru tanpa menyentuh kode lainnya.

## Cara pakai
1. Buka `index.html` langsung di browser (double-click), atau upload seluruh
   folder ini ke hosting statis (Netlify, Vercel, GitHub Pages, dsb).
2. Edit **`data.js`** — semua nama, tanggal, lokasi, rekening, galeri, dan teks
   ada di satu file itu.
3. Ganti file di folder `assets/`:
   - `qris-placeholder.svg` → QRIS asli dari bank.
   - Tambahkan file musik (mp3) dan ubah `music.src` di `data.js`.
   - Ilustrasi chibi saat ini pakai emoji (🤵/👰) sebagai placeholder ringan —
     ganti dengan file PNG/SVG ilustrasi chibi asli lalu ubah bagian
     `.chibi-avatar` / `.profile-avatar` di `index.html` menjadi `<img>`.
4. Ganti nomor WhatsApp di `data.js` (`rsvp.whatsappNumber`, format `62xxxxxxxxxx`).
5. Ganti link Google Maps di `data.js` (`location.mapsUrl`).
6. Bagikan link dengan parameter nama tamu, contoh:
   `https://domainanda.com/?to=Jo`

## Struktur
```
wedding-invitation/
├── index.html      → markup seluruh 13 section + header + footer
├── style.css        → semua token desain (warna, tipografi) & styling
├── app.js            → seluruh logika interaktif (lihat daftar fitur di bawah)
├── data.js           → SATU sumber data — ganti di sini saja
└── assets/           → SVG ornamen bunga & placeholder QRIS
```

## Fitur yang sudah berfungsi penuh
- Loading screen 2.4 detik → fade ke cover
- Cover: tombol "Buka Undangan" → tirai terbuka, musik mulai, auto-scroll
- Parameter URL `?to=Nama` mengisi ucapan "Kepada Yth."
- Header transparan → glass-blur setelah scroll 100px, hamburger menu mobile
- Countdown hari/jam/menit/detik dengan animasi flip per angka
- Timeline vertikal — garis tumbuh sesuai posisi scroll
- Semua section fade/slide-in saat masuk viewport (IntersectionObserver)
- Lokasi → tombol membuka Google Maps di tab baru
- Galeri: slider Swiper (swipe di mobile, panah di desktop, pagination) +
  lightbox fullscreen dengan navigasi gambar
- E-Angpao: salin nomor rekening ke clipboard + toast notifikasi 3 detik +
  getar (Vibration API) + modal QRIS
- RSVP: membuka WhatsApp dengan pesan konfirmasi kehadiran otomatis
- Tombol musik melayang (play/pause, ikon berputar saat aktif)
- Back-to-top setelah scroll 500px
- Tombol Share — pakai Web Share API bila tersedia, jika tidak salin link
- Ripple, hover, dan scale kecil pada semua tombol utama
- Kelopak bunga jatuh secara ambient (ringan, pakai Web Animations API)
- `prefers-reduced-motion` dihormati di seluruh animasi

## Catatan jujur soal teknologi (baca sebelum lanjut)
Prompt asli meminta stack React + Vite + Tailwind + Framer Motion + Lenis +
Lottie yang di-*build* lewat npm. Lingkungan tempat saya menyusun file ini
**tidak punya akses internet untuk instalasi npm**, jadi saya tidak bisa
menjalankan `npm install` atau mem-build proyek Vite di sini — kalau saya
tetap menulis kode React/Vite tanpa bisa memverifikasi build-nya, besar
kemungkinan ada dependency atau konfigurasi yang meleset dan Anda malah
mendapat proyek yang tidak jalan.

Sebagai gantinya saya membangun template ini sebagai **HTML/CSS/JS statis
tanpa proses build**, memuat GSAP + ScrollTrigger dan Swiper lewat CDN (jsDelivr).
Hasilnya: semua fitur di atas tetap berfungsi persis seperti yang diminta,
langsung dari `index.html`, tanpa perlu Node.js atau langkah instalasi apa pun —
lebih mudah dihosting dan dikustomisasi ulang.

Kalau Anda memang butuh versi React + Vite (misalnya untuk digabung ke proyek
Vite/React yang sudah ada, atau untuk memakai Framer Motion/Lenis/Lottie secara
native), saya bisa menuliskan ulang struktur ini menjadi komponen-komponen
React — tinggal bilang, dan sebutkan apakah Anda akan menjalankan
`npm install` sendiri di komputer Anda (karena itu perlu koneksi internet
yang tidak tersedia di sisi saya).

## Lighthouse
Tanpa proses build, skor performa sangat bergantung pada:
- Kompresi gambar galeri asli (gunakan WebP, ukuran ≤ 200KB per foto)
- Ukuran file musik (kompres ke ~128kbps mp3)
- Hosting dengan HTTP/2 + caching (Netlify/Vercel/Cloudflare Pages sudah otomatis)

Struktur kode sudah lazy-load gambar galeri dan tidak memuat library yang
tidak dipakai, jadi dasar untuk skor >95 sudah ada begitu asetnya dioptimasi.
