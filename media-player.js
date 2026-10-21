/* =====================================================================
   MEDIA PLAYER & SOUND CONTROLLER (Camwynn Portfolio)
   ===================================================================== */

(() => {
  'use strict';

  // Audio elements
  const bgm = new Audio('assets/audio/bgm.mp3');
  bgm.loop = true;
  bgm.volume = 0.5; // 50% volume

  // SFX pools for rapid playback
  const clickSfx = new Audio('assets/audio/click.mp3');
  clickSfx.volume = 0.55;

  const hoverSfx = new Audio('assets/audio/hover.mp3');
  hoverSfx.volume = 0.35;

  function playSfx(audio) {
    try {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    } catch (e) {}
  }

  // ---------- BGM CONTROL (Bottom-Right Button) ----------
  let isMuted = false;
  try {
    isMuted = localStorage.getItem('camwynn-bgm-muted') === 'true';
  } catch (e) {}
  bgm.muted = isMuted;

  const bgmBtn = document.getElementById('bgm-button');
  const bgmStatusText = document.getElementById('bgm-status-text');

  function updateBgmButton() {
    if (!bgmBtn) return;
    const lang = document.documentElement.lang || 'en';
    const isIndo = lang === 'id';
    
    if (bgm.muted || bgm.paused) {
      bgmBtn.classList.add('is-muted');
      bgmBtn.setAttribute('aria-label', isIndo ? 'Bunyikan musik latar' : 'Unmute background music');
      if (bgmStatusText) bgmStatusText.textContent = isIndo ? 'Muted' : 'Muted';
    } else {
      bgmBtn.classList.remove('is-muted');
      bgmBtn.setAttribute('aria-label', isIndo ? 'Bisukan musik latar' : 'Mute background music');
      if (bgmStatusText) bgmStatusText.textContent = isIndo ? 'Musik' : 'Music';
    }
  }

  function toggleBgm() {
    playSfx(clickSfx);
    if (bgm.paused) {
      bgm.muted = false;
      isMuted = false;
      bgm.play().then(updateBgmButton).catch(() => {});
    } else if (bgm.muted) {
      bgm.muted = false;
      isMuted = false;
    } else {
      bgm.muted = true;
      isMuted = true;
    }
    try {
      localStorage.setItem('camwynn-bgm-muted', String(isMuted));
    } catch (e) {}
    updateBgmButton();
  }

  if (bgmBtn) {
    bgmBtn.addEventListener('click', toggleBgm);
  }

  // Update button text when language changes
  new MutationObserver(updateBgmButton).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  // ---------- SPLASH SCREEN INTERACTION ----------
  const splash = document.getElementById('splash-screen');
  const chibiImg = document.getElementById('splash-chibi');
  const chibiWrap = document.querySelector('.splash-chibi-wrap');
  let splashEntered = false;

  function dismissSplash() {
    if (splashEntered) return;
    splashEntered = true;

    // Trigger click SFX
    playSfx(clickSfx);

    // Switch chibi to explosion animation
    if (chibiImg) {
      chibiImg.src = 'assets/images/chibi-explosion.gif?t=' + Date.now();
    }
    if (chibiWrap) {
      chibiWrap.classList.add('exploding');
    }

    const prompt = document.querySelector('.splash-prompt');
    if (prompt) prompt.style.opacity = '0';

    // Start background music at 50% volume
    bgm.volume = 0.5;
    if (!isMuted) {
      bgm.play().then(updateBgmButton).catch(() => {});
    }

    // Explosion runs ~2s; fade out splash smoothly and remove
    setTimeout(() => {
      if (splash) splash.classList.add('fade-out');
    }, 1700);

    setTimeout(() => {
      if (splash) splash.style.display = 'none';
      updateBgmButton();
    }, 2300);
  }

  if (splash) {
    splash.addEventListener('click', dismissSplash);
    splash.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Tab') {
        e.preventDefault();
        dismissSplash();
      }
    });
  }

  // ---------- BUTTON SOUND EFFECTS (HOVER & CLICK) ----------
  let lastHoverTime = 0;
  const buttonSelector = 'button, [role="button"], a.n01, a.n02, a.n03, a.n04, a.return-home, .dialog-close, .media-card, .price-category';

  document.addEventListener('pointerenter', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;
    const btn = target.closest(buttonSelector);
    if (!btn || btn.closest('#splash-screen')) return;

    const now = performance.now();
    if (now - lastHoverTime < 70) return; // Debounce rapid hovering
    lastHoverTime = now;
    playSfx(hoverSfx);
  }, true);

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;
    const btn = target.closest(buttonSelector);
    if (!btn || btn.closest('#splash-screen') || btn === bgmBtn) return;
    playSfx(clickSfx);
  }, true);

  // Expose global controller for debug if needed
  window.__camwynnMedia = { bgm, playSfx, clickSfx, hoverSfx, dismissSplash };
})();
