# Anichin Web

Frontend streaming anime/donghua yang mengonsumsi [Anichin API](https://github.com/asmindev/anichin-api).

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (tema kustom: ink/paper/seal — lihat `tailwind.config.js`)
- TanStack Query untuk data fetching & caching
- Zustand (persisted) untuk favorit & riwayat tonton lokal
- React Router untuk routing

## Menjalankan

1. Pastikan Anichin API sudah berjalan di `http://localhost:5000`
   (lihat repo API, jalankan `python main.py` atau `gunicorn -w 4 -b 0.0.0.0:5000 main:app`).

2. Install dependency:
   ```bash
   npm install
   ```

3. Salin `.env.example` ke `.env.local` dan sesuaikan bila API tidak di localhost:
   ```bash
   cp .env.example .env.local
   ```

4. Jalankan dev server:
   ```bash
   npm run dev
   ```
   Buka `http://localhost:5173`.

## Struktur

```
src/
├── App.tsx                 # Routing utama
├── main.tsx                 # Entry point + provider (QueryClient, Router)
├── pages/
│   ├── Home.tsx              # Beranda: hero, genre, section konten
│   ├── SearchPage.tsx        # /search?q=
│   ├── AnimeDetail.tsx       # /anime/:slug
│   ├── Watch.tsx              # /watch/:slug/:episode
│   ├── GenrePage.tsx          # /genre, /genre/:slug
│   ├── Favorites.tsx          # /favorites (local only)
│   └── NotFound.tsx
├── components/
│   ├── AnimeCard.tsx
│   ├── VideoPlayer.tsx
│   ├── EpisodeList.tsx
│   ├── SearchBar.tsx
│   ├── GenreChip.tsx
│   ├── Skeleton.tsx
│   ├── ErrorState.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
├── lib/
│   ├── api.ts                 # Service layer + tipe data
│   └── hooks/useAnichin.ts    # React Query hooks
└── store/
    └── favoritesStore.ts      # Zustand: favorit & riwayat (localStorage)
```

## Catatan integrasi API

- `lib/api.ts` mengasumsikan bentuk response dasar Anichin API:
  `{ "result": ..., "error": null }`. Sesuaikan `request()` bila skema
  respons endpoint tertentu (mis. `/`, `/genres`) berbeda dari itu setelah
  kamu cek response aslinya.
- `GenrePage.tsx` menampilkan daftar genre dari `/genres`, tapi filter
  anime-per-genre butuh endpoint tambahan (mis. `/genre/{slug}`) yang belum
  terlihat di dokumentasi API — tambahkan fungsi `getByGenre` di `lib/api.ts`
  begitu endpoint-nya dikonfirmasi.
- `VideoPlayer.tsx` mendukung dua bentuk sumber: link video langsung
  (`.mp4`/`.m3u8`) lewat tag `<video>`, atau embed lewat `<iframe>` khusus
  yang di-sandbox. Sesuaikan field `servers`/`url` dengan skema asli respons
  `/video-source/{slug}`.

## Desain

Tema visual terinspirasi dari estetika segel tinta (ink seal) dan kertas
beras Asia Timur — bukan neon generik ala situs streaming kebanyakan:
- **ink** (`#0d0f0e`) sebagai latar utama, **paper** (`#ece5d3`) sebagai teks
- **seal** (merah vermilion, `#b8432f`) sebagai aksen utama — dipakai di
  badge episode berbentuk stempel bulat yang sedikit dimiringkan
- **gold** (`#c9a44c`) untuk rating & hover state sekunder
- **jade** (`#3f6659`) sebagai aksen tersier
- Font display `Noto Serif TC` (mendukung karakter CJK) dipadukan dengan
  `Inter` untuk UI dan `JetBrains Mono` untuk data/label
