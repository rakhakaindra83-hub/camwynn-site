# Camwynn — Website Portofolio (Versi Terbaru)

Source website terbaru: pricelist tiga kategori, popup video terpusat, preview senyap, carousel Long/Short, bahasa EN/ID, foto profil baru, background bergerak, dan glitter bintang pada mouse.

## Struktur

- `src/index.html`: halaman, CSS awal, data harga/video, dan ikon SVG.
- `src/language.js`: terjemahan dan penyimpanan bahasa.
- `src/gallery.css`: tata letak pricelist/portofolio, kartu, carousel, dan popup.
- `src/gallery.js`: popup, preview senyap, drag/scroll, loop, dan jeda carousel.
- `src/effects.css` dan `src/effects.js`: background bergerak dan glitter mouse.
- `src/assets/images/background-stars.jpg`: background bintang.
- `src/assets/images/profile-camwynn.webp`: foto profil aktif.
- `src/assets/images/image01.jpg`: foto profil lama yang masih disimpan.

## Menjalankan

Tidak memerlukan npm atau build. Ekstrak ZIP, buka terminal di folder `Camwynn-Website-Latest`, lalu jalankan:

```bash
python -m http.server 8080 --directory src
```

Di Windows dapat menggunakan `py` menggantikan `python`. Buka `http://localhost:8080`. Gunakan server HTTP agar origin pemutar sematan benar; membuka lewat `file://` dapat membatasi video.

## Hosting

Upload isi folder `src` ke hosting statis, dengan `index.html` di root hasil deploy. Untuk Netlify manual deploy, unggah folder `src`. Paket tidak memuat kredensial atau konfigurasi akun hosting.

## Harga

| Kategori | Layanan | Harga |
|---|---|---|
| Short Video | Just Cut Short Video | Rp5.000 |
| Short Video | Short Video Editing Simple | Rp20.000 |
| Short Video | Short Video Mograph | Rp50.000 |
| Long Video | Just Cut Long Video | Rp15.000 |
| Long Video | Long Video Editing Simple | Rp35.000 |
| Long Video | Long Video Mograph | Rp80.000 |
| Motion Graphic | Motion Graph Simple | Rp35.000 |
| Motion Graphic | 3D Motion | Rp50.000 |

Klik kartu kategori untuk membuka popup rincian harga di tengah layar.

## Portofolio dan preview

- 1 Peak Video, 9 Long Video unik, dan 6 Short Video. Tautan Long yang duplikat ditampilkan sekali.
- Long bergerak dari kiri ke kanan; mendukung drag, scroll, dan tombol panah.
- Short bergerak dari atas ke bawah; mendukung scroll/drag.
- Gerakan carousel dapat dijeda. Hover, fokus, interaksi manual, dan popup menghentikan gerakan sementara.
- Klik video untuk membuka popup. Pemutar dihapus saat popup ditutup.
- Ikon play buatan website dihapus; antarmuka dari penyedia video dapat tetap tampil sesuai kondisi pemutar.
- Preview Short memakai pemutar TikTok langsung karena respons oEmbed tidak menyediakan URL thumbnail.
- Preview pricelist: Short `7686651076950412564`, Long `-EM9w-uDdQA`, Motion Graphic `0GtL1lwX8qw`.
- Preview dimuat saat terlihat dan memakai suara senyap.

## Mengedit

1. Nama, perkenalan, kontak, harga, dan kartu video: `src/index.html`.
2. Terjemahan: perbarui objek `translations` di `src/language.js` ketika teks Inggris diganti.
3. Video portofolio: ubah `data-video`, `data-provider`, dan `data-user` untuk TikTok.
4. Preview: ubah `data-preview-id` dan `data-preview-provider`.
5. Foto/background: ganti gambar atau ubah path-nya pada HTML/CSS.
6. Tampilan kartu/popup: `src/gallery.css`; kecepatan carousel ada di fungsi `tick` pada `src/gallery.js`.
7. Efek bintang: `src/effects.css` dan `src/effects.js`.

## Bahasa dan efek

EN/ID ada di kanan atas; pilihan disimpan dengan kunci `camwynn-language`. Camwynn di kiri atas dapat ditekan untuk kembali ke beranda. Background bergerak perlahan, glitter mengikuti mouse. Efek bintang dan gerakan carousel mengikuti pengaturan reduced motion perangkat.

## Aset dan koneksi internet

Seluruh aset gambar lokal yang tersedia disertakan. Font Inter dimuat dari Google Fonts dengan sans-serif sebagai cadangan. CSS awal dan ikon SVG tertanam di HTML. Tidak ada paket JavaScript tambahan yang perlu diinstal.

File video tidak diunduh atau disertakan. Thumbnail YouTube dan pemutar YouTube/TikTok memerlukan internet serta akses ke penyedia. Pembatasan penyedia/browser dapat menghambat preview, autoplay, atau pemutaran. Popup menyediakan tautan video asli.

## Kontak

- YouTube: https://www.youtube.com/channel/UCwTAyl_Wk6CeW8n0i1M6FbQ
- Discord: https://discord.com/users/1043076281316683856
- Kontak pada ketentuan: Discord `ggsyamandi`, YouTube `@Yazea_.`.

Beberapa tautan sosial lain masih mengikuti referensi awal; sesuaikan di HTML bila diperlukan.
