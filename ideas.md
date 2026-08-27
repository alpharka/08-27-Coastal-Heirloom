# Arah Desain Undangan Digital

## Tiga Pendekatan

### Theme Name: Coastal Heirloom
**Very Brief Intro:** Editorial coastal modern dengan nuansa kertas arsip, biru laut pudar, dan aksen terracotta. Terasa tenang, intim, dan dikurasi seperti surat cinta yang diwariskan.
**Probability:** 0.03

### Theme Name: Midnight Garden
**Very Brief Intro:** Dark romantic dengan botanical silhouette, tinta malam, dan aksen tembaga. Dramatis tetapi tetap hangat, cocok untuk pasangan yang ingin undangan berkarakter.
**Probability:** 0.07

### Theme Name: Sunlit Ceramic
**Very Brief Intro:** Mediterranean modern dengan putih kapur, cobalt, dan kuning saffron. Ceria, artistik, dan terasa seperti perayaan musim panas yang personal.
**Probability:** 0.02

## Pendekatan Terpilih: Coastal Heirloom

### Design Movement
Editorial coastal modern yang memadukan minimalisme majalah, materialitas stationery letterpress, dan ketenangan palet pesisir. Layout mengutamakan komposisi asimetris, bidang kosong, dan detail tipografi yang terasa dikurasi.

### Core Principles
1. **Quiet luxury:** sedikit elemen, tetapi setiap elemen memiliki alasan visual.
2. **Tactile paper:** tekstur grain, garis cetak tipis, dan nuansa tinta pudar menggantikan dekorasi berlebihan.
3. **Editorial rhythm:** section bergerak seperti spread majalah, dengan kolom offset, nomor bagian, dan crop foto yang berani.
4. **Warm utility:** interaksi mudah dipahami, tetapi tetap terasa personal dan tidak seperti dashboard.

### Color Philosophy
Dasar warm bone (#F4F0E8) membuat halaman terasa seperti kertas undangan berkualitas. Deep ink navy (#18313A) memberi bobot dan keterbacaan, sementara faded ocean (#6E9293) membawa ketenangan. Aksen terracotta (#C8795A) dipakai hemat untuk momen emosional dan CTA, agar terasa seperti cap tinta merah bata.

### Layout Paradigm
Gunakan alur editorial vertikal dengan rail angka di sisi kiri desktop, konten utama yang bergeser dari sumbu tengah, dan section foto yang sesekali keluar dari container. Mobile menyederhanakan rail menjadi eyebrow kecil dan mempertahankan urutan visual melalui whitespace, bukan kartu seragam.

### Signature Elements
- Emblem abstrak berbentuk dua garis ombak yang bertemu menjadi simpul.
- Rule line tipis dengan nomor section bergaya katalog arsip.
- Tekstur grain lembut dan aksen terracotta seperti cap pos pada CTA atau detail penting.

### Interaction Philosophy
Interaksi terasa seperti membuka stationery: tombol memiliki press state, reveal section hadir pelan, dan lightbox terasa seperti lembar foto yang diangkat dari meja. Tidak ada efek berlebihan; gerak dipakai untuk memberi orientasi dan rasa.

### Animation
Cover bergerak slide-up 720ms dengan cubic-bezier yang lembut. Header dan nav muncul berurutan setelah cover selesai. Section reveal menggunakan opacity + translateY 18px, sementara foto memakai scale 0.985. Hover foto hanya memperbesar 1.02x. Semua motion non-esensial dimatikan pada prefers-reduced-motion.

### Typography System
Display menggunakan **Cormorant Garamond** dengan italic selektif untuk nama pasangan dan heading emosional. Body menggunakan **DM Sans** untuk keterbacaan, label, navigasi, dan form. Heading besar memiliki tracking -0.04em; metadata menggunakan uppercase, tracking 0.18em, dan ukuran kecil.

### Brand Essence
Undangan digital editorial untuk pasangan yang menghargai detail, keintiman, dan suasana pesisir yang tenang—berbeda karena terasa seperti arsip kisah mereka, bukan template acara.

**Personality:** tenang, intim, berkarakter.

### Brand Voice
Headline, CTA, dan microcopy harus hangat, spesifik, dan sedikit puitis tanpa menjadi generik.

- “Satu sore, dua nama, dan cerita yang ingin kami teruskan.”
- “Tinggalkan satu kalimat untuk hari yang akan kami ingat.”

### Wordmark & Logo
Emblem tanpa teks: dua sapuan garis ombak simetris yang bertemu di titik tengah, membentuk simpul abstrak seperti horizon dan janji. Logo digunakan dalam lingkaran tipis atau sendirian sebagai cap visual.

### Signature Brand Color
**Faded Ocean — #6E9293**, warna biru-hijau pudar yang terasa tenang, dewasa, dan mudah dikenali sebagai identitas visual utama.

## Data dan Asumsi Implementasi

Karena brief masih menggunakan placeholder, implementasi awal menggunakan pasangan contoh yang ditandai jelas agar mudah diganti dari satu objek konfigurasi. RSVP dan guestbook bersifat frontend-only menggunakan localStorage; tidak ada pesan atau testimonial awal yang dibuat-buat. Aset foto menggunakan gambar eksternal yang berbeda untuk setiap frame galeri, sedangkan emblem dibuat sebagai aset grafis transparan.

## Style Decisions

- **Faded Ocean #6E9293** menjadi identitas berulang untuk metadata, rail, garis arsip, state terpilih, dan momen emblem; terracotta tetap disimpan untuk aksen emosional serta CTA utama.
- Emblem wave-knot tampil sebagai archival stamp kecil pada label section dan closing moments, bukan sekadar logo header.
- Fotografi dipertahankan sebagai coastal archive: desaturated seaside light, tactile objects, candid distance, dan crop editorial yang tenang.
- RSVP dan tanda kasih mengikuti bahasa stationery: field bergaris seperti kertas reply card, label arsip, dan panel dengan material paper lembut.
