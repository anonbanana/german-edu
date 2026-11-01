# Konteks Proyek German Plus

Folder ini berisi situs landing page statis untuk **German Plus Consultant**, penyedia kursus bahasa Jerman dan konsultasi pendidikan, studi, Ausbildung, serta karier di Jerman.

## Tujuan

Situs dipakai customer untuk menampilkan layanan German Plus kepada calon peserta internasional. Konten utama bersumber dari `_Website German Plus.pdf`.

## Teknologi

- HTML, CSS, dan JavaScript murni.
- Tidak ada framework, backend, atau proses build.
- Tidak ada dark mode.
- Tidak ada caption (`figcaption`) di bawah gambar; konteks gambar tetap tersedia melalui atribut `alt`.

## Halaman bahasa

| File | Bahasa | Keterangan |
|---|---|---|
| `index.html` | Inggris | Halaman default / utama domain. |
| `de.html` | Jerman | Versi bahasa Jerman. |
| `id.html` | Indonesia | Versi bahasa Indonesia. |

Ketiga halaman harus mempertahankan struktur section, ID, class, link navigasi, form, dan daftar mitra yang sama. Jika mengubah konten atau struktur pada satu bahasa, periksa dan sesuaikan dua bahasa lainnya.

## File penting

| File/folder | Fungsi |
|---|---|
| `styles.css` | Desain dan responsive layout untuk seluruh halaman. |
| `script.js` | Menu mobile, scrollspy, animasi, penyimpanan section saat pindah bahasa, validasi form, serta pengiriman pertanyaan melalui WhatsApp atau email. |
| `assets/` | Gambar konten dan logo mitra. Jangan mengubah aset tanpa permintaan. |
| `_Website German Plus.pdf` | Permintaan/konten sumber dari customer. Tidak diunggah ke hosting. |
| `.htaccess` | Charset, kompresi, cache aset, dan header keamanan untuk hosting Apache/Strato. |
| `deploy.sh` | Upload situs ke Webspace Strato melalui `lftp`. |
| `CARA-COBA-CUSTOMER.md` | Panduan membuat situs dapat diakses customer melalui domain/subdomain HTTPS. |

## Bagian mitra

Bagian **Our Partners / Unsere Partner / Mitra Kami** menampilkan empat logo:

1. Internationales Studienkolleg an der Universität Paderborn.
2. Rheinisches Studienkolleg NRW Bonn.
3. Colón Language Center Hamburg.
4. Sprachschule AKTIV.

Kolom kelima hanya berisi teks “and many other partners” dan terjemahannya. Jangan mengubahnya menjadi daftar teks partner di bawah logo.

## Aturan perubahan

- Pastikan halaman utama tetap `index.html` berbahasa Inggris.
- Gunakan label, urutan, dan fakta yang terbukti dari PDF atau aset yang tersedia.
- Jangan membuat elemen UI atau informasi layanan yang tidak didukung sumber customer.
- Pertahankan atribut `alt` setiap gambar untuk aksesibilitas dan SEO.
- Setelah perubahan, validasi HTML ketiga halaman dan jalankan `node --check script.js`.
- Uji navigasi desktop/mobile, switch DE/EN/ID, gambar, dan form melalui browser sebelum menyatakan pekerjaan selesai.

## Menjalankan secara lokal

```bash
python3 -m http.server 4173
```

Buka `http://127.0.0.1:4173/` di browser.
