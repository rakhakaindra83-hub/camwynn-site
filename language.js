const translations = {"Video Editing": "Penyuntingan Video", "HI, My name is Camwynn. I'm a Indonesian Video Editor, especially Motion Graphics. I can make Video Editing and VTuber's stuff": "HAI, nama saya Camwynn. Saya editor video asal Indonesia, terutama di bidang motion graphics. Saya mengerjakan penyuntingan video dan konten VTuber.", "price list": "daftar harga", "term of service": "syarat layanan", "PRICE": "HARGA", "SIMPLE MV (Simple Movement, Effect, and Text Animation)": "MV SEDERHANA (Gerakan, Efek, dan Animasi Teks Sederhana)", "SEMI COMPLEX MV (Additional Effect and Text Animation)": "MV SEMI KOMPLEKS (Efek dan Animasi Teks Tambahan)", "COMPLEX MV (Complex Movement, Effect, and Text Animation)": "MV KOMPLEKS (Gerakan, Efek, dan Animasi Teks Kompleks)", "LOADING STREAM": "LAYAR PEMBUKA STREAM", "Loading stream (opening & ending)": "Layar stream (pembuka & penutup)", "HOME": "BERANDA", "Terms of Service": "Syarat dan Ketentuan Layanan", "General": "General", "By commissioning me, you agree to these terms.": "Dengan memesan karya saya, Anda menyetujui syarat dan ketentuan ini.", "I reserve the right to decline any commission.": "Saya berhak menolak pesanan apa pun.", "Please credit me properly.": "Mohon cantumkan kredit kepada saya dengan semestinya.", "Do not claim my work as your own.": "Dilarang mengklaim karya saya sebagai milik Anda.", "Prices may vary depending on the project's complexity.": "Harga dapat bervariasi tergantung tingkat kerumitan proyek.", "Payment": "Pembayaran", "Full payment is required before I start.": "Pembayaran penuh wajib dilakukan sebelum saya mulai mengerjakan.", "No refunds once I have started working.": "Tidak ada pengembalian dana (refund) setelah pengerjaan dimulai.", "I may showcase your commission in my portfolio and on social media.": "Saya dapat menampilkan hasil pesanan Anda di portofolio dan media sosial saya.", "Revisions": "Revisi", "Minor revisions (typos, small fixes): Free & unlimited.": "Revisi minor (salah ketik, perbaikan kecil): gratis dan tanpa batas.", "Major revisions (remade scenes, significant changes): Up to 3 free revisions, then additional fees apply.": "Revisi mayor (pembuatan ulang adegan, perubahan signifikan): gratis hingga 3 kali, setelah itu dikenakan biaya tambahan.", "Delivery": "Pengiriman", "Estimated completion long video : 1-7 day for the long video depending on the difficulty.": "Estimasi pengerjaan video panjang: 1-7 hari, tergantung tingkat kesulitan.", "Estimated completion long video : 1-3 day for the short video depending on the difficulty.": "Estimasi pengerjaan video pendek: 1-3 hari, tergantung tingkat kesulitan.", "Rush orders are available for an additional fee.": "Pesanan kilat (rush order) tersedia dengan biaya tambahan.", "Contact": "Kontak", "Discord: ggsyamandi": "Discord: ggsyamandi", "Youtube: @Yazea_.": "YouTube: @Yazea_."};
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