# Camwynn — Website Portofolio

Website statis dengan background bintang, halaman portofolio video, daftar harga, syarat layanan, dan pilihan bahasa Inggris/Indonesia.

## Isi paket

- `src/index.html`: struktur halaman, CSS, ikon SVG, animasi, dan navigasi.
- `src/language.js`: kamus terjemahan, tombol EN/ID, dan penyimpanan pilihan bahasa.
- `src/assets/images/image01.jpg`: foto profil.
- `src/assets/images/background-stars.jpg`: background bintang.

## Menjalankan

Tidak memerlukan npm atau proses build. Buka `src/index.html` langsung di browser untuk melihat tampilan. Untuk pengujian yang lebih konsisten, buka terminal di folder paket dan jalankan:

```bash
python -m http.server 8080 --directory src
```

Lalu buka `http://localhost:8080` di browser. Pada Windows, gunakan `py` sebagai pengganti `python` bila diperlukan.

## Mengedit

1. Edit judul, perkenalan, harga, dan tautan di `src/index.html`.
2. Jika mengubah teks Inggris yang diterjemahkan, perbarui kunci yang sesuai dalam objek `translations` di `src/language.js`.
3. Ganti foto atau background dengan file bernama sama di `src/assets/images/`, atau ubah path gambarnya di HTML.
4. Ganti contoh video melalui URL YouTube pada atribut `data-src` iframe.
5. Atur ketebalan font di style `camwynn-custom-style` dalam HTML.

## Kontak yang terpasang

- YouTube: https://www.youtube.com/channel/UCwTAyl_Wk6CeW8n0i1M6FbQ
- Discord: https://discord.com/users/1043076281316683856

## Hosting

Upload **isi folder `src`**, termasuk `index.html`, `language.js`, dan folder `assets`, ke hosting statis. Untuk Netlify manual deploy, seret folder `src` ke halaman deploy. Folder yang dipublikasikan harus berisi `index.html` pada tingkat paling atas.

## Bahasa

Tombol EN/ID berada di pojok kanan atas. Pilihan disimpan pada browser menggunakan `localStorage` dengan kunci `camwynn-language`. Bahasa awal adalah Inggris. Teks antarmuka website diterjemahkan; judul dan kontrol pemutar YouTube berasal dari YouTube.

## Aset dan dependensi

Kedua gambar disertakan dalam paket. CSS dan ikon SVG berada di dalam `index.html`. Font Inter dimuat dari Google Fonts; browser menggunakan sans-serif cadangan jika font tidak tersedia. Pemutar video menggunakan embed YouTube dan memerlukan internet; file video tidak disertakan.

Foto profil, contoh karya, Instagram, TikTok, harga, dan sebagian isi ketentuan masih mengikuti website referensi https://d4nofc.carrd.co/. Sesuaikan dengan identitas, karya, dan ketentuan milikmu sebelum penggunaan publik. Paket tidak menyertakan kredensial atau konfigurasi akun hosting.
