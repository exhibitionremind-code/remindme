# ReMind

Aplikasi pendamping kesehatan mental berbasis React, Vite, Tailwind CSS, Font Awesome, dan Supabase. Desain diadaptasi dari `Desain Aplikasi ReMind.pdf`. Ekspor PNG asli seluruh 99 halaman Canva tersedia di `reference/canva-pages` untuk audit visual.

## Menjalankan lokal

```bash
npm install
copy .env.example .env.local
npm run dev
```

Tanpa variabel Supabase, aplikasi berjalan dalam mode demo menggunakan localStorage.

## Menyiapkan Supabase

1. Buat proyek Supabase.
2. Jalankan `supabase/schema.sql` melalui SQL Editor.
3. Aktifkan Email provider di Authentication.
4. Salin Project URL dan anon key ke `.env.local`.
5. Tambahkan URL lokal dan domain Vercel ke Authentication → URL Configuration.
6. Untuk tombol sosial, aktifkan provider Google/Facebook dan gunakan callback `https://<project-ref>.supabase.co/auth/v1/callback` pada konfigurasi provider.

Data yang tersinkronisasi meliputi profil, tugas, mood tracker, hasil PHQ-4, dan kontak darurat. Row Level Security membatasi seluruh data kepada pemiliknya.

## Deploy ke Vercel

Import repository ke Vercel, gunakan Build Command `npm run build` dan Output Directory `dist`. Tambahkan `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` pada Project Settings > Environment Variables.

> Fitur SOS pada versi ini adalah simulasi antarmuka. Integrasi ambulans, konselor, geolokasi, dan panggilan darurat memerlukan mitra layanan resmi serta prosedur keamanan tambahan.
