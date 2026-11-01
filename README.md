# German Plus — Situs Deutschkurse &amp; Bildungsberatung

Situs satu halaman (landing page) statis untuk **German Plus Consultant**.
Konten diambil dari `_Website German Plus.pdf`, gaya visual mengikuti desain
**“Clean & Academic”** dari [anonbanana/website-designs](https://github.com/anonbanana/website-designs)
(`designs/design2.html`).

**Bahasa:** Jerman (`index.html`, bahasa utama/default) dan Inggris (`en.html`).
Ganti lewat tombol `DE | EN` di navigasi atau tautan di footer — posisi section
Anda tetap terjaga saat berganti bahasa.

Tidak ada framework, tidak ada backend, tidak ada font eksternal — semua file
bisa langsung diunggah ke hosting statis (mis. **Strato**) dan dibuka lewat domain sendiri.

## Struktur file

```
german-edu-site/
├── index.html          # Bahasa Jerman (utama / default)
├── en.html             # Bahasa Inggris
├── styles.css          # sistem desain Clean & Academic (dipakai bersama)
├── script.js           # menu, scrollspy, animasi, formulir kontak (dipakai bersama)
├── assets/             # letakkan foto Anda di sini (lihat tabel di bawah)
├── .htaccess           # charset & caching untuk Apache (Strato)
├── deploy.sh           # script upload otomatis via lftp (opsional)
├── README.md
└── _Website German Plus.pdf   # sumber konten (tidak ikut diunggah)
```

### Cara mengubah teks

Teks ada di **dua file** — `index.html` (Jerman) dan `en.html` (Inggris).
Struktur, ID, dan class-nya identik, jadi saat mengubah satu bagian, ubah juga
bagian yang sama di file kedua. Pesan validasi formulir ada di `script.js`
(objek `M`, dipilih otomatis dari `<html lang="de|en">`).

### Slot gambar

| File (letakkan di `assets/`) | Bagian di situs | Saran ukuran |
|---|---|---|
| `assets/kursus.jpg` | Deutschkurse | 1600 × 700 px |
| `assets/studienkolleg.jpg` | Studienkolleg & studi S1/S2 | 1600 × 700 px |
| `assets/ausbildung.jpg` | Begleitung zur Ausbildung | 1600 × 700 px |
| `assets/karier.jpg` | Arbeit als Fachkraft | 1600 × 700 px |
| `assets/konsultasi.jpg` | Bildungsberatung | 1600 × 700 px |

Selama file belum ada, situs menampilkan bingkai placeholder yang rapi bertuliskan
nama file yang dibutuhkan — tampilan tetap utuh. **Cukup letakkan file dengan
nama persis di atas**, tanpa mengubah HTML. (Rasio bingkai 16:7, `object-fit: cover`,
sehingga foto dengan rasio berbeda pun aman.)

Bila memakai `.png`, ubah `src` pada `<img>` dari `.jpg` ke `.png` di **kedua** file.



---

## Pratinjau lokal

```bash
cd german-edu-site
python3 -m http.server 8123
# buka http://127.0.0.1:8123/
```

Bisa juga langsung membuka `index.html` dengan browser (semua fitur jalan tanpa server).

---

## Mengubah kontak & tombol WhatsApp

Nomor dan e-mail dipakai di 3 tempat:

1. **`script.js`** → konstanta `WHATSAPP_NUMBER` dan `EMAIL_ADDRESS` (dipakai formulir)
2. **`index.html`** → semua tautan `https://wa.me/6282229809378` dan `mailto:info@german-plus.com`
3. **`en.html`** → sama persis seperti di `index.html`

Cari-ganti `6282229809378` / `info@german-plus.com` di ketiga file bila nomor berubah.

### Cara kerja formulir “Ihre Frage senden / Kirim Pertanyaan Anda”

Hosting statis Strato tidak punya backend, jadi formulir disusun menjadi pesan
(lengkap dengan bahasa halaman) lalu dibuka di:

- **Per WhatsApp senden** → jendela baru `wa.me` dengan isi pesan sudah terisi, atau
- **Per E-Mail senden** → aplikasi e-mail dengan subjek & isi sudah terisi.

Tidak ada data yang disimpan di server. Bila kelak ingin mengirim ke endpoint
(Formspree, dsb.), ubah bagian `form.addEventListener('submit', …)` di `script.js`.

---

## Hosting ke Strato

Situs ini murni file statis, jadi tidak perlu database/PHP/Node.

### A. Lewat File Manager Strato (paling cepat, tanpa alat)

1. Login ke **strato.de** → panel pelanggan.
2. Buka **Produkte → Hosting / Webspace** (atau *Verwaltung der Webspace-Inhalte*).
3. Masuk ke folder web root domain Anda — pada paket Webhosting Strato umumnya folder
   **`html`** (jadi `index.html` harus ada di dalamnya: `…/html/index.html`).
   *Bila di panel Anda tertulis `htdocs` atau document root lain, ikuti itu.*
4. Unggah file berikut (folder `assets/` ikut, kosongkan dulu bila hanya berisi README):
   `index.html`, `en.html`, `styles.css`, `script.js`, `.htaccess`, `assets/`.
5. Buka domain Anda → situs sudah tayang (`/` = Jerman, `/en.html` = Inggris).

### B. Lewat FTP/SFTP (FileZilla / WinSCP / WinSCP+drag & drop)

Parameter dari email Strato / panel → *Zugangsdaten*:

| Isian | Nilai umum di Strato |
|---|---|
| Host | `ftp.strato.de` (SFTP: `sftp.strato.de`) |
| Port | `21` (FTP) / `22` (SFTP) |
| Protokol | FTPS / SFTP (jangan FTP polos bila dimungkinkan) |
| User | sesuai paket (sering `kundennummer_ftpuser`) |
| Password | password Webspace yang dibuat di panel |
| Folder tujuan | `html/` (document root domain) |

Setelah terhubung: drag & drop seluruh isi folder project ke `html/`.

### C. Script otomatis (`deploy.sh`)

```bash
export STRATO_HOST=ftp.strato.de
export STRATO_USER=USERNAME_ANDA
export STRATO_PASS=PASSWORD_WEBSPACE
export STRATO_DIR=html          # document root domain
./deploy.sh
```

Script memakai `lftp` (`sudo apt install lftp` / `brew install lftp`) dan menjalankan
`mirror --delete`, jadi file lama yang sudah tidak ada di lokal ikut terhapus.
`.htaccess` ikut diunggah (file tersembunyi); bila klien Anda menyembunyikan file
tersembunyi, nyalakan opsi *Show hidden files*.

### D. Setelah unggah

1. **Domain** → panel Strato: arahkan domain ke paket hosting (nameserver Strato,
   atau A-record bila domain di luar Strato).
2. **HTTPS** → aktifkan sertifikat gratis (Let’s Encrypt) di menu *SSL-Zertifikate*
   Strato, lalu paksa alihkan HTTP → HTTPS.
3. Cek: buka `https://domain-anda/`, isi formulir, klik “Kirim via WhatsApp”.

---

## Catatan teknis

- **SEO**: dua halaman terpisah dengan `hreflang` (`de` → `/`, `en` → `/en.html`)
  plus `title`, `meta description`, Open Graph, canonical, dan JSON-LD
  (`EducationalOrganization`) di masing-masing file. Ganti
  `https://www.german-plus.com/` dengan domain final di `index.html` dan `en.html`.
- **Ganti bahasa**: tombol `DE | EN` di nav dan tautan di footer. Saat berpindah,
  hash/section aktif ikut dibawa (`script.js` → `data-lang-link`).
- **Aksesibilitas**: skip-link, label formulir, fokus terlihat, kontras tinggi,
  dukungan `prefers-reduced-motion`, dan tetap terbaca bila JavaScript mati.
- **Tanpa dependensi eksternal**: font memakai Georgia/sistem → cepat, tanpa
  cookie/tracking, cocok untuk kewajiban privasi (GDPR/TTDSG) di Jerman.
- **Cetak**: `@media print` sudah dirapikan (navigasi & tombol disembunyikan).
- **Ukuran**: total situs < 60 KB (belum termasuk foto Anda).
