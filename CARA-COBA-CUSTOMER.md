# Cara Customer Mencoba Situs German Plus

Situs perlu diunggah ke hosting publik agar customer di luar negeri dapat membukanya melalui tautan HTTPS.

## Pilihan yang disarankan: hosting domain German Plus di Strato

1. Siapkan akses Webspace Strato: host FTP, username, password, dan folder document root domain.
2. Pastikan domain sudah mengarah ke Webspace Strato dan HTTPS/SSL aktif.
3. Dari folder situs, jalankan upload berikut di terminal:

```bash
export STRATO_HOST=ftp.strato.de
export STRATO_USER="username_ftp"
export STRATO_PASS="password_webspace"
export STRATO_DIR=html
./deploy.sh
```

4. Setelah upload selesai, buka domain melalui browser, misalnya `https://www.german-plus.com/`.
5. Kirim tautan HTTPS tersebut kepada customer untuk review.

`deploy.sh` hanya mengunggah file situs. Folder `node_modules`, file PDF permintaan customer, file README, dan script deploy tidak ikut terunggah.

## Checklist sebelum tautan dikirim

- Halaman utama bahasa Inggris: `/`
- Halaman bahasa Jerman: `/de.html`
- Halaman bahasa Indonesia: `/id.html`
- Ganti bahasa DE, EN, dan ID berfungsi.
- Semua logo mitra dan gambar tampil.
- Tombol WhatsApp dan formulir kontak mengarah ke kontak German Plus.
- Situs dibuka dengan HTTPS tanpa peringatan sertifikat.

## Jika domain belum siap

Gunakan subdomain staging dari hosting, misalnya `preview.nama-domain.com`, lalu kirim tautan HTTPS tersebut kepada customer. Setelah customer menyetujui tampilan dan isi situs, unggah file yang sama ke domain utama.

Jangan mengirim file HTML langsung melalui email atau membuka server lokal; customer di luar jaringan tidak dapat mengaksesnya.
