# DOMES V2

Proyek DOMES V2 dibangun dengan stack modern yang menggabungkan AstroJS, React, Vite, dan Material UI untuk pengembangan aplikasi yang cepat dan skalabel.

## 🛠️ Teknologi yang Digunakan

- **[AstroJS](https://astro.build/)** - Framework web all-in-one untuk membangun website cepat
- **[React](https://reactjs.org/)** - Library JavaScript untuk membangun antarmuka pengguna
- **[Vite](https://vitejs.dev/)** - Build tool yang cepat untuk pengembangan modern
- **[Material UI (MUI)](https://mui.com/)** - Library komponen UI React yang lengkap dan terintegrasi dengan baik

## 🚀 Cara Menjalankan Proyek

### Prasyarat
Pastikan kamu memiliki Node.js versi 18 atau lebih baru yang terinstal di sistem kamu.

### 1. Install Dependencies
Jika kamu baru meng-clone proyek ini, install semua dependencies terlebih dahulu:
```bash
npm install
```

### 2. Jalankan Server Development
Jalankan server development untuk mulai mengembangkan:
```bash
npm run dev
```

Server akan berjalan di `http://localhost:4321/` secara default. Buka URL tersebut di browser untuk melihat aplikasi.

### 3. Build untuk Produksi
Untuk membuat build produksi yang optimal:
```bash
npm run build
```

Hasil build akan berada di folder `dist/`.

### 4. Preview Build Produksi
Untuk mem-preview hasil build sebelum di-deploy:
```bash
npm run preview
```

## 📁 Struktur Proyek
```
DOMESV2/
├── src/
│   ├── components/     # Komponen React yang dapat digunakan kembali
│   ├── pages/         # Halaman-halaman aplikasi (routing otomatis oleh Astro)
│   └── layouts/       # (Opsional) Layout yang dapat digunakan kembali
├── astro.config.mjs   # Konfigurasi utama Astro
├── package.json       # Dependencies dan scripts
└── .gitignore         # File yang diabaikan oleh Git
```

## 📝 Catatan Tambahan
- **Astro Islands**: Aplikasi menggunakan arsitektur Islands dari Astro yang memungkinkan hidrasi parsial untuk performa yang optimal
- **Material UI Theme**: Tema Material UI dapat dikustomisasi di `src/components/MUIProvider.jsx`
- **Hot Module Replacement**: Vite menyediakan HMR yang membuat development menjadi lebih cepat dengan perubahan yang langsung terlihat

## 🤝 Kontribusi
Silakan buat issue atau pull request jika ingin berkontribusi pada proyek ini.