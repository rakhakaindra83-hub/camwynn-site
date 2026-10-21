(() => {
 const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
 const layer=document.createElement('div');
 layer.className='star-glitter-layer';
 layer.setAttribute('aria-hidden','true');
 document.body.appendChild(layer);
 const colors=['#ffffff','#fff2ac','#9fd9ff','#d2c6ff'];
 let last=0;
 window.addEventListener('pointermove',event=>{
  if(event.pointerType==='touch'||reducedMotion.matches||document.hidden)return;
  const now=performance.now();if(now-last<30)return;last=now;
  if(layer.childElementCount>=48)layer.firstElementChild.remove();
  const star=document.createElement('span');star.className='star-glitter';
  star.style.left=event.clientX+'px';star.style.top=event.clientY+'px';
  star.style.setProperty('--size',(7+Math.random()*10)+'px');
  star.style.setProperty('--color',colors[Math.floor(Math.random()*colors.length)]);
  star.style.setProperty('--dx',(-24+Math.random()*48)+'px');
  star.style.setProperty('--dy',(25+Math.random()*40)+'px');
  star.style.setProperty('--spin',(-130+Math.random()*260)+'deg');
  star.addEventListener('animationend',()=>star.remove(),{once:true});
  layer.appendChild(star);
 },{passive:true});
 reducedMotion.addEventListener('change',()=>layer.replaceChildren());
 document.addEventListener('visibilitychange',()=>{if(document.hidden)layer.replaceChildren();});
})();
