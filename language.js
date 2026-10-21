const translations = {"Video Editing": "Penyuntingan Video", "HI, My name is Camwynn. I'm a Indonesian Video Editor, especially Motion Graphics. I can make Video Editing and VTuber's stuff": "HAI, nama saya Camwynn. Saya editor video asal Indonesia, terutama di bidang motion graphics. Saya mengerjakan penyuntingan video dan konten VTuber.", "price list": "daftar harga", "term of service": "syarat layanan", "PRICE": "HARGA", "SIMPLE MV (Simple Movement, Effect, and Text Animation)": "MV SEDERHANA (Gerakan, Efek, dan Animasi Teks Sederhana)", "SEMI COMPLEX MV (Additional Effect and Text Animation)": "MV SEMI KOMPLEKS (Efek dan Animasi Teks Tambahan)", "COMPLEX MV (Complex Movement, Effect, and Text Animation)": "MV KOMPLEKS (Gerakan, Efek, dan Animasi Teks Kompleks)", "LOADING STREAM": "LAYAR PEMBUKA STREAM", "Loading stream (opening & ending)": "Layar stream (pembuka & penutup)", "HOME": "BERANDA", "Terms of Service": "Syarat dan Ketentuan", "General": "Umum", "-By commissioning me, you agree to these terms.": "- Dengan memesan jasa saya, kamu menyetujui ketentuan ini.", "-I reserve the right to decline any commission.": "- Saya berhak menolak pesanan.", "-Please credit me properly.": "- Mohon cantumkan kredit kepada saya dengan benar.", "-Do not claim my work as your own.": "- Jangan mengakui karya saya sebagai karya milikmu.", "-Prices may vary depending on the project's complexity.": "- Harga dapat berubah sesuai tingkat kerumitan proyek.", "Payment": "Pembayaran", "- Full payment is required before I start.": "- Pembayaran penuh diperlukan sebelum pengerjaan dimulai.", "- No refunds once I have started working.": "- Tidak ada pengembalian dana setelah pengerjaan dimulai.", "- I may showcase your commission in my portfolio and on social media.": "- Saya dapat menampilkan pesananmu di portofolio dan media sosial saya.", "Revisions": "Revisi", "- Minor revisions (typos, small fixes): Free & unlimited.": "- Revisi kecil (salah ketik, perbaikan kecil): Gratis tanpa batas.", "- Major revisions (remade scenes, significant changes): Up to 3 free revisions, then additional fees apply.": "- Revisi besar (pembuatan ulang adegan, perubahan besar): Maksimal 3 kali gratis, lalu dikenakan biaya tambahan.", "Delivery": "Penyelesaian", "- Estimated completion: 1-2 weeks for Video Editing.": "- Perkiraan pengerjaan: 1–2 minggu untuk penyuntingan video.", "- Rush orders are available for an additional fee.": "- Pesanan prioritas tersedia dengan biaya tambahan.", "Contact": "Kontak"};
(() => {
 const nodes=[];
 const walker=document.createTreeWalker(document.querySelector('.site-wrapper'),NodeFilter.SHOW_TEXT);
 while(walker.nextNode()){
  const node=walker.currentNode;
  if(node.parentElement.closest('script,style,svg'))continue;
  const key=node.textContent.trim();
  if(Object.prototype.hasOwnProperty.call(translations,key))nodes.push({node,en:node.textContent,id:node.textContent.replace(key,translations[key])});
 }
 function setLanguage(language){
  const selected=language==='id'?'id':'en';
  nodes.forEach(item=>{item.node.textContent=item[selected];});
  document.documentElement.lang=selected;
  document.querySelectorAll('[data-language]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.language===selected)));
  document.title=selected==='id'?'Portofolio — Penyuntingan Video':'Portofolio — Video Editing';
  try{localStorage.setItem('camwynn-language',selected);}catch{}
 }
 document.querySelectorAll('[data-language]').forEach(button=>button.addEventListener('click',()=>setLanguage(button.dataset.language)));
 let saved='en';try{saved=localStorage.getItem('camwynn-language')||'en';}catch{}
 setLanguage(saved);
})();
