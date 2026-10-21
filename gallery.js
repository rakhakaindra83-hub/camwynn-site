(() => {
 const videoDialog=document.querySelector('#video-popup');
 const player=document.querySelector('#popup-player');
 const popupTitle=document.querySelector('#popup-title');
 const original=document.querySelector('#popup-original');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 let manuallyPaused=false;
 const updatePage=()=>{
  document.body.classList.toggle('wide-view',['#mywork','#pricelist'].includes(location.hash));
  document.querySelectorAll('dialog[open]').forEach(dialog=>dialog.close());
 };
 updatePage();window.addEventListener('hashchange',updatePage);
 function openVideo(card){
  const {provider,video,user,label}=card.dataset;
  if(!/^[\w-]+$/.test(video))return;
  const short=provider==='tiktok';
  videoDialog.classList.toggle('portrait',short);
  popupTitle.textContent=label;
  const frame=document.createElement('iframe');
  frame.title=label;
  frame.allow='autoplay; fullscreen; encrypted-media; picture-in-picture; accelerometer; gyroscope';
  frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';
  frame.src=short?`https://www.tiktok.com/player/v1/${video}?autoplay=1&loop=0`:`https://www.youtube-nocookie.com/embed/${video}?autoplay=1&rel=0`;
  original.href=short?`https://www.tiktok.com/@${user}/video/${video}`:`https://www.youtube.com/watch?v=${video}`;
  original.textContent=document.documentElement.lang==='id'?'Buka video asli ↗':'Open original video ↗';
  player.replaceChildren(frame);videoDialog.showModal();
 }
 videoDialog.addEventListener('close',()=>player.replaceChildren());
 document.querySelectorAll('dialog').forEach(dialog=>{
  document.body.appendChild(dialog);
  dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
 });
 document.querySelectorAll('[data-price]').forEach(button=>button.addEventListener('click',()=>document.getElementById(button.dataset.price).showModal()));
 document.querySelectorAll('.media-card img,.price-thumb img').forEach(img=>{const hide=()=>{img.hidden=true;};img.addEventListener('error',hide);if(img.complete&&!img.naturalWidth)hide();});
 const rails=[];
 document.querySelectorAll('.media-rail').forEach(rail=>{
  const inner=rail.querySelector('.rail-inner'),group=rail.querySelector('.rail-group');
  const clone=group.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('button').forEach(button=>button.tabIndex=-1);inner.appendChild(clone);
  const vertical=rail.classList.contains('short-rail');
  const state={rail,inner,group,vertical,hover:false,dragging:false,until:0,positioned:false,position:0,suppress:false};rails.push(state);
  const pause=()=>state.until=performance.now()+2800;
  rail.addEventListener('mouseenter',()=>state.hover=true);rail.addEventListener('mouseleave',()=>state.hover=false);
  rail.addEventListener('wheel',event=>{
   pause();
   if(!vertical&&Math.abs(event.deltaY)>Math.abs(event.deltaX)){event.preventDefault();rail.scrollLeft+=event.deltaY;}
  },{passive:false});
  rail.addEventListener('keydown',pause);
  let start=null;
  rail.addEventListener('pointerdown',event=>{
   pause();if(event.pointerType!=='mouse'||event.button!==0)return;
   start={x:event.clientX,y:event.clientY,scroll:vertical?rail.scrollTop:rail.scrollLeft};
  });
  window.addEventListener('pointermove',event=>{
   if(!start)return;
   const distance=vertical?event.clientY-start.y:event.clientX-start.x;
   if(Math.abs(distance)>5)state.dragging=true;
   if(state.dragging){rail.classList.add('dragging');if(vertical)rail.scrollTop=start.scroll-distance;else rail.scrollLeft=start.scroll-distance;pause();}
  });
  const end=()=>{if(!start)return;state.suppress=state.dragging;start=null;state.dragging=false;rail.classList.remove('dragging');setTimeout(()=>state.suppress=false,0);};
  window.addEventListener('pointerup',end);window.addEventListener('pointercancel',end);
  rail.addEventListener('click',event=>{if(state.suppress){event.preventDefault();event.stopPropagation();}},true);
 });
 document.querySelectorAll('[data-rail]').forEach(button=>button.addEventListener('click',()=>{
  const state=rails.find(x=>!x.vertical);state.until=performance.now()+3000;state.rail.scrollBy({left:Number(button.dataset.step)*260,behavior:reduced.matches?'instant':'smooth'});
 }));
 document.querySelectorAll('.media-card').forEach(card=>card.addEventListener('click',()=>openVideo(card)));
 const toggle=document.querySelector('#motion-toggle');
 const updateToggle=()=>{
  const id=document.documentElement.lang==='id';
  toggle.textContent=manuallyPaused?(id?'Lanjutkan gerakan':'Resume motion'):(id?'Jeda gerakan':'Pause motion');
  toggle.setAttribute('aria-pressed',String(manuallyPaused));
 };
 toggle.addEventListener('click',()=>{manuallyPaused=!manuallyPaused;updateToggle();});
 new MutationObserver(updateToggle).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});updateToggle();
 const previewFrames=new Map();
 function sendPreview(frame,play){
  const muteAll = () => {
    try {
      if(frame.dataset.provider==='tiktok'){
        frame.contentWindow?.postMessage({'x-tiktok-player':true,type:'mute'},'*');
        frame.contentWindow?.postMessage({'x-tiktok-player':true,type:'change-volume',value:0},'*');
        frame.contentWindow?.postMessage({type:'mute'},'*');
        frame.contentWindow?.postMessage({method:'mute'},'*');
        frame.contentWindow?.postMessage({'x-tiktok-player':true,type:play?'play':'pause'},'*');
      }else{
        frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:'mute',args:[]}),'*');
        frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:'setVolume',args:[0]}),'*');
        frame.contentWindow?.postMessage(JSON.stringify({event:'command',func:play?'playVideo':'pauseVideo',args:[]}),'*');
      }
    } catch(e) {}
  };
  muteAll();
  setTimeout(muteAll, 100);
  setTimeout(muteAll, 300);
  setTimeout(muteAll, 600);
  setTimeout(muteAll, 1200);
  setTimeout(muteAll, 2000);
 }
 const previewObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{
  const holder=entry.target;
  let item=previewFrames.get(holder);
  if(!item&&entry.isIntersecting){
   const frame=document.createElement('iframe');
   const provider=holder.dataset.previewProvider,id=holder.dataset.previewId;
   frame.dataset.provider=provider;frame.title='Video preview';frame.tabIndex=-1;frame.setAttribute('aria-hidden','true');
   frame.allow='autoplay; encrypted-media; picture-in-picture';frame.referrerPolicy='strict-origin-when-cross-origin';
   frame.src=provider==='tiktok'
    ?`https://www.tiktok.com/player/v1/${id}?autoplay=1&muted=1&loop=1&controls=0&play_button=0&progress_bar=0&volume_control=0&fullscreen_button=0&timestamp=0&music_info=0&description=0&closed_caption=0`
    :`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&controls=0&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;
   item={frame,visible:true};previewFrames.set(holder,item);holder.appendChild(frame);
   frame.addEventListener('load',()=>sendPreview(frame,item.visible&&!document.hidden));
  }
  if(item){item.visible=entry.isIntersecting;sendPreview(item.frame,item.visible&&!document.hidden);}
 }),{threshold:.05});
 document.querySelectorAll('.preview-video').forEach(holder=>previewObserver.observe(holder));
 document.addEventListener('visibilitychange',()=>previewFrames.forEach(item=>sendPreview(item.frame,item.visible&&!document.hidden)));
 let last=performance.now();
 function tick(now){
  const dt=Math.min((now-last)/1000,.05);last=now;
  if(!document.hidden){
   for(const state of rails){
    const {rail,group,inner,vertical}=state;
    if(!rail.getClientRects().length)continue;
    const style=getComputedStyle(inner);const gap=parseFloat(vertical?style.rowGap:style.columnGap)||0;
    const span=(vertical?group.getBoundingClientRect().height:group.getBoundingClientRect().width)+gap;
    if(span<=0)continue;
    if(!state.positioned){if(vertical)rail.scrollTop=span;else rail.scrollLeft=span;state.position=span;state.positioned=true;}
    const actual=vertical?rail.scrollTop:rail.scrollLeft;
    if(manuallyPaused||reduced.matches||state.hover||state.dragging||now<state.until||rail.contains(document.activeElement)||document.querySelector('dialog[open]')){state.position=actual;continue;}
    if(Math.abs(actual-state.position)>2)state.position=actual;
    let position=state.position-dt*(vertical?18:28);
    if(position<=0)position+=span;
    if(position>span)position-=span;
    state.position=position;
    if(vertical)rail.scrollTop=position;else rail.scrollLeft=position;
   }
  }
  requestAnimationFrame(tick);
 }
 requestAnimationFrame(tick);
})();
