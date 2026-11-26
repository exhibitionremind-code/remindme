# Final asset mapping

Semua file di folder ini sudah disalin ke `public/assets/pic/` dan di-rename jadi `pic-N.png`
supaya URL bebas spasi (lebih aman untuk bundler & deploy). File asli di folder ini tidak diubah.

Mapping (dari sample inspeksi):

| pic-N | Konten                                             |
|-------|----------------------------------------------------|
| pic-0 | Facebook logo (bulat biru)                         |
| pic-1 | Google "G" logo (warna-warni)                      |
| pic-2 | ReMind full logo + tagline                         |
| pic-3 | ReMind mark (R dengan daun, kecil)                 |
| pic-4 | ReMind wordmark (teks saja)                        |
| pic-5 | Mushroom mascot ("?" pose)                         |
| pic-6 | SOS badge bulat hijau                              |
| pic-7 | Leaf sprig watercolor                              |
| pic-8 | Cluster daun hijau                                 |
| pic-9 | Caterpillar lucu                                   |
| pic-10| Pink flower kecil                                  |
| pic-20| Green leaf tunggal                                 |

Untuk mapping lengkap 71 file, buka folder ini langsung dan lihat preview di
Explorer, atau jalankan quick-scan di browser:
`http://localhost:5173/assets/pic/pic-0.png` dst.

Perubahan code yang sudah dibuat:
- Login/Signup social icons: FontAwesome Facebook/Google diganti `pic-0.png` dan `pic-1.png`
  untuk warna brand asli.

Aset lain bisa di-swap manual di `src/App.jsx` sesuai kebutuhan dengan path
`/assets/pic/pic-N.png`.
