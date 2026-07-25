// ============================================================
// SEMUA ISI UNDANGAN — ganti nilai di sini saja untuk membuat
// undangan baru. Jangan mengubah kode di index.html / app.js.
// ============================================================
const WEDDING_DATA = {
  groom: {
    name: "Farhan",
    fullName: "Muhammad Farhan Ardiansyah",
    parents: "Putra dari Bapak Sutrisno & Ibu Wulandari",
    child: "Putra Pertama",
  },
  bride: {
    name: "Aisyah",
    fullName: "Aisyah Putri Ramadhani",
    parents: "Putri dari Bapak Hendrawan & Ibu Kartika",
    child: "Putri Kedua",
  },
  coupleShort: "Farhan & Aisyah",

  // Tanggal pernikahan (ISO, dipakai untuk countdown)
  weddingDateISO: "2026-11-14T08:00:00+07:00",
  weddingDateLabel: "Sabtu, 14 November 2026",

  quote: {
    arabic: "وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوٓا۟ إِلَيْهَا",
    translation:
      "\u201cDan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya.\u201d",
    source: "QS. Ar-Rum: 21",
  },

  greetingDefault: "Tamu Undangan",

  events: {
    akad: {
      title: "Akad Nikah",
      date: "Sabtu, 14 November 2026",
      time: "08.00 WIB \u2013 selesai",
      place: "Kediaman Mempelai Wanita",
      address: "Jl. Melati No. 12, Indramayu, Jawa Barat",
    },
    resepsi: {
      title: "Resepsi",
      date: "Sabtu, 14 November 2026",
      time: "11.00 WIB \u2013 14.00 WIB",
      place: "Gedung Serbaguna Kenanga",
      address: "Jl. Anggrek Raya No. 8, Indramayu, Jawa Barat",
    },
  },

  timeline: [
    { year: "2021", title: "Pertama Bertemu", desc: "Dipertemukan pada sebuah acara keluarga yang sederhana." },
    { year: "2022", title: "Menjalin Kasih", desc: "Memutuskan untuk saling mengenal lebih dekat." },
    { year: "2024", title: "Lamaran", desc: "Direstui kedua keluarga untuk melangkah lebih serius." },
    { year: "2026", title: "Hari Bahagia", desc: "Mengikat janji suci dalam pernikahan." },
  ],

  location: {
    name: "Gedung Serbaguna Kenanga",
    address: "Jl. Anggrek Raya No. 8, Indramayu, Jawa Barat 45211",
    mapsUrl: "https://maps.app.goo.gl/ALWcBcoFBMzWNN6QA",
  },

  gallery: [
    "https://picsum.photos/seed/wedding1/800/1000",
    "https://picsum.photos/seed/wedding2/800/1000",
    "https://picsum.photos/seed/wedding3/800/1000",
    "https://picsum.photos/seed/wedding4/800/1000",
    "https://picsum.photos/seed/wedding5/800/1000",
    "https://picsum.photos/seed/wedding6/800/1000",
  ],

  gift: {
    bank: "BCA",
    accountNumber: "3021152909",
    accountName: "Rizki",
    qrisImage: "assets/qris-placeholder.svg",
  },

  rsvp: {
    whatsappNumber: "6281234567890", // ganti dengan nomor asli, format 62xxxxxxxxxx
  },

  music: {
    src: "assets/music-placeholder.mp3",
    title: "Perfect \u2013 Ed Sheeran (Instrumental)",
  },

  footer: {
    tagline: "Made with Love",
    subtitle: "Wedding Invitation Template Premium",
  },
};
