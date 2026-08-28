# Panduan Kustomisasi Website Undangan

Dokumen ini menjelaskan cara mengganti identitas pasangan, detail acara, aset visual, musik, dan perilaku utama pada website undangan **Alya & Raka — Coastal Heirloom**. Proyek ini adalah frontend-only; RSVP dan buku tamu disimpan secara lokal pada browser pengunjung, sehingga belum tersinkron antarperangkat.

## 1. Menyiapkan lingkungan pengembangan

Pastikan Node.js dan pnpm tersedia. Dari folder root repository, jalankan perintah berikut:

```bash
pnpm install
pnpm dev
```

Buka URL lokal yang ditampilkan oleh Vite. Untuk pemeriksaan sebelum publikasi, gunakan:

```bash
pnpm check
pnpm build
```

`pnpm check` menjalankan pemeriksaan TypeScript, sedangkan `pnpm build` menghasilkan build production.

## 2. Mengganti data pasangan dan acara

Semua data utama berada dalam satu objek `CONFIG` di file [`client/src/pages/Home.tsx`](client/src/pages/Home.tsx). Mengubah objek ini adalah cara utama untuk mempersonalisasi undangan. Jangan menyebarkan nilai baru ke banyak komponen karena seluruh halaman membaca data dari konfigurasi tersebut.

| Properti | Fungsi | Contoh penggantian |
|---|---|---|
| `couple` | Nama pasangan pada headline dan footer | `"Nadia & Fajar"` |
| `bride`, `groom` | Identitas terpisah untuk pengembangan lanjutan | `"Nadia Putri"`, `"Fajar Aditya"` |
| `parents` | Nama orang tua | Tulis nama lengkap kedua keluarga |
| `dateLabel` | Tanggal yang terlihat oleh pengunjung | `"21 Maret 2027"` |
| `dateShort` | Format pendek untuk cover/header | `"21.03.27"` |
| `weekday` | Nama hari acara | `"Minggu"` |
| `ceremonyTime` | Waktu akad | `"08.00 — 10.00 WIB"` |
| `receptionTime` | Waktu resepsi | `"11.00 — 14.00 WIB"` |
| `venue` | Nama venue | `"Gedung Serbaguna Arunika"` |
| `address` | Alamat lengkap | Tulis alamat yang siap dibaca tamu |
| `mapsUrl` | Link lokasi Google Maps | Gunakan link Google Maps final |
| `calendarStart` | Waktu mulai untuk Google Calendar | Format UTC `YYYYMMDDTHHMMSSZ` |
| `calendarEnd` | Waktu selesai untuk Google Calendar | Format UTC `YYYYMMDDTHHMMSSZ` |
| `timezone` | Zona waktu kalender | Contoh `Asia/Jakarta` atau `Asia/Makassar` |
| `audioUrl` | URL file musik instrumental | Gunakan URL file audio publik yang stabil |
| `ewalletProvider` | Provider pembayaran | `"DANA"`, `"OVO"`, atau `"GoPay"` |
| `ewalletNumber` | Nomor e-wallet | Nomor final tanpa data contoh |
| `bank` | Nama bank | `"BCA"` atau bank yang digunakan |
| `accountNumber` | Nomor rekening | Nomor rekening final |
| `accountHolder` | Nama penerima | Nama pemilik rekening |
| `paymentLink` | Link pembayaran opsional | URL pembayaran final jika tersedia |

Tanggal countdown saat ini ditulis langsung pada dua pemanggilan `new Date(...)` di `Home.tsx`. Setelah mengganti tanggal, ubah keduanya dengan format ISO dan offset zona waktu yang benar, misalnya `new Date("2027-03-21T08:00:00+07:00")`. Pastikan tanggal countdown dan tanggal Google Calendar menunjuk acara yang sama.

## 3. Mengganti nama tamu melalui URL

Nama tamu dibaca dari query parameter `to`. Contoh URL:

```text
https://domain-undangan.com/?to=Keluarga%20Budi%20Santoso
```

Jika parameter tidak tersedia, halaman menampilkan `Tamu undangan`. Nilai tersebut dirapikan, dibatasi panjangnya, dan ditampilkan sebagai teks biasa. Saat membuat link undangan, gunakan URL encoding untuk spasi dan karakter khusus. Jangan memasukkan HTML ke dalam parameter `to`.

## 4. Mengganti foto dan emblem

URL artwork disimpan pada `CONFIG.heroImage` dan `CONFIG.emblem`. Daftar enam foto galeri berada pada konstanta `GALLERY` di `Home.tsx`. Setiap item memiliki `src`, `alt`, `caption`, dan `ratio`.

Untuk setiap foto baru, pastikan:

1. `alt` menjelaskan isi foto secara singkat dan spesifik.
2. Foto tidak diduplikasi pada item lain.
3. Rasio `portrait`, `landscape`, atau `tall` sesuai crop yang diinginkan.
4. File besar tidak disimpan ke `client/public` atau `client/src/assets`.
5. Aset production diunggah melalui alur storage WebDev dan URL hasil upload digunakan apa adanya.

Emblem adalah simbol wave-knot tanpa teks. Jika ingin mengganti logo, pertahankan format PNG transparan agar tetap cocok digunakan pada cover, header, footer, dan favicon. Referensi favicon berada di [`client/index.html`](client/index.html).

## 5. Mengganti musik latar

Ganti `CONFIG.audioUrl` dengan URL file audio instrumental yang dapat diputar dari browser. Browser biasanya memblokir autoplay, sehingga playback dimulai setelah pengunjung menekan **Buka undangan**. Tombol floating tetap tersedia untuk memutar atau menjeda musik.

Sebaiknya gunakan file audio dengan ukuran wajar, loop yang halus, dan hak penggunaan yang jelas. Jika URL audio gagal diputar, kontrol tetap aman: halaman tidak rusak dan pengunjung dapat melanjutkan membaca undangan.

## 6. RSVP dan buku tamu

Form RSVP memvalidasi nama dan pesan. Setelah berhasil dikirim, entri ditambahkan ke state React dan disimpan pada `localStorage` dengan key `alya-raka-guestbook`. Untuk pasangan lain, ubah key tersebut agar data tidak bercampur dengan instalasi lama.

Karena penyimpanan lokal hanya berlaku pada browser/perangkat yang digunakan, data RSVP tidak dapat dilihat oleh pasangan dari perangkat lain. Jika membutuhkan RSVP bersama, autentikasi, moderasi, atau dashboard, proyek perlu ditingkatkan menjadi full-stack dan penyimpanan harus dipindahkan ke backend/database.

Tidak ada data tamu awal, testimonial, rating, atau review buatan. Empty state akan tampil sampai pengunjung benar-benar mengirim pesan.

## 7. Galeri dan lightbox

Lightbox dibuka ketika item galeri dipilih. Fitur yang sudah tersedia adalah foto besar, caption, tombol tutup, navigasi sebelumnya/berikutnya, klik overlay untuk menutup, serta keyboard `Escape`, `ArrowLeft`, dan `ArrowRight`. Scroll body dikunci ketika lightbox aktif.

Jika menambah foto, tambahkan item ke `GALLERY`; komponen akan membaca panjang array secara otomatis untuk navigasi. Untuk layout masonry, aturan posisi desktop dan mobile berada di `client/src/index.css` pada selector `gallery-item:nth-child(...)`. Jika jumlah foto diubah, periksa kembali aturan grid tersebut.

## 8. Mengubah tema visual

Sistem visual utama berada di [`client/src/index.css`](client/src/index.css). Variabel yang paling sering diganti adalah:

| Variabel | Peran | Nilai Coastal Heirloom |
|---|---|---|
| `--bone` | Latar kertas hangat | `#f4f0e8` |
| `--paper` | Permukaan panel terang | `#fbf9f4` |
| `--ink` | Teks dan blok gelap | `#18313a` |
| `--ocean` | Identitas Faded Ocean | `#6e9293` |
| `--terracotta` | Aksen emosional dan CTA | `#c8795a` |
| `--sand` | Permukaan netral sekunder | `#ded7c9` |

Font display menggunakan **Cormorant Garamond**, sedangkan body menggunakan **DM Sans**. Link Google Fonts berada di `client/index.html`. Jika mengganti font, perbarui import font sekaligus deklarasi `font-family` di CSS agar hierarki tetap konsisten.

Arah desain, prinsip, dan keputusan visual tercatat di [`ideas.md`](ideas.md). Baca file tersebut sebelum melakukan perubahan besar agar layout editorial, emblem, Faded Ocean, dan nuansa tactile paper tidak tercampur dengan gaya yang bertentangan.

## 9. Aksesibilitas dan motion

Semua gambar perlu memiliki `alt`, form field memiliki label, tombol memiliki label yang jelas, dan lightbox menggunakan dialog modal. Jangan menghapus `:focus-visible` karena fokus keyboard harus tetap terlihat.

Animasi reveal, cover, hover, dan lightbox menggunakan transform serta opacity. Aturan `prefers-reduced-motion: reduce` berada di bagian akhir CSS dan harus dipertahankan agar konten tampil langsung bagi pengguna yang meminta pengurangan gerak.

## 10. Checklist sebelum publikasi

| Pemeriksaan | Hasil yang diharapkan |
|---|---|
| `pnpm check` | Tidak ada error TypeScript |
| `pnpm build` | Build production berhasil |
| URL tanpa `to` | Fallback `Tamu undangan` tampil |
| URL dengan `?to=` | Nama tamu tampil sebagai teks aman |
| Cover | Tombol membuka halaman dan memulai percobaan musik |
| Countdown | Menunjuk tanggal dan zona waktu acara final |
| Calendar | Judul, tanggal, lokasi, detail, dan timezone benar |
| Maps | Membuka lokasi final di tab baru |
| Galeri | Enam foto unik, alt text, dan lightbox berfungsi |
| RSVP | Validasi kosong, success state, dan guestbook berjalan |
| Pembayaran | Nomor final, provider, penerima, serta tombol salin benar |
| Mobile | Sticky navigation tidak menutupi kontrol musik atau konten |
| Motion | Konten tetap terbaca ketika reduced motion aktif |

Setelah perubahan lolos checklist, simpan checkpoint repository. Pada proyek ini, checkpoint juga menjadi versi yang dapat dipublikasikan melalui hosting WebDev yang terhubung.
