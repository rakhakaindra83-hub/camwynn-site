/* =====================================================================
   MEDIA PLAYER & SOUND CONTROLLER (Camwynn Portfolio)
   ===================================================================== */

(() => {
  'use strict';

  // Audio elements
  const bgm = new Audio('assets/audio/bgm.mp3');
  bgm.loop = true;

  // Volume setup: default 30% (0.3)
  let currentVolume = 0.3;
  try {
    const saved = localStorage.getItem('camwynn-bgm-volume');
    if (saved !== null) currentVolume = parseFloat(saved);
  } catch (e) {}
  bgm.volume = currentVolume;

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

  // ---------- BGM CONTROL & VOLUME ----------
  let isMuted = false;
  try {
    isMuted = localStorage.getItem('camwynn-bgm-muted') === 'true';
  } catch (e) {}
  bgm.muted = isMuted;

  const bgmPanel = document.getElementById('bgm-panel');
  const bgmBtn = document.getElementById('bgm-button');
  const bgmStatusText = document.getElementById('bgm-status-text');
  const volSlider = document.getElementById('bgm-vol-slider');
  const volDown = document.getElementById('bgm-vol-down');
  const volUp = document.getElementById('bgm-vol-up');
  const volText = document.getElementById('bgm-vol-text');

  function updateBgmUI() {
    const lang = document.documentElement.lang || 'en';
    const isIndo = lang === 'id';
    
    if (bgm.muted || bgm.paused || currentVolume <= 0) {
      if (bgmPanel) bgmPanel.classList.add('is-muted');
      if (bgmBtn) {
        bgmBtn.setAttribute('aria-label', isIndo ? 'Bunyikan musik latar' : 'Unmute background music');
        if (bgmStatusText) bgmStatusText.textContent = isIndo ? 'Muted' : 'Muted';
      }
    } else {
      if (bgmPanel) bgmPanel.classList.remove('is-muted');
      if (bgmBtn) {
        bgmBtn.setAttribute('aria-label', isIndo ? 'Bisukan musik latar' : 'Mute background music');
        if (bgmStatusText) bgmStatusText.textContent = isIndo ? 'Musik' : 'Music';
      }
    }

    const pct = Math.round(currentVolume * 100);
    if (volSlider) volSlider.value = pct;
    if (volText) volText.textContent = pct + '%';
  }

  function setVolume(v) {
    currentVolume = Math.max(0, Math.min(1, Math.round(v * 100) / 100));
    bgm.volume = currentVolume;
    if (currentVolume > 0 && bgm.muted) {
      bgm.muted = false;
      isMuted = false;
      try { localStorage.setItem('camwynn-bgm-muted', 'false'); } catch (e) {}
    }
    try {
      localStorage.setItem('camwynn-bgm-volume', String(currentVolume));
    } catch (e) {}
    updateBgmUI();
  }

  function toggleBgm() {
    playSfx(clickSfx);
    if (bgm.paused) {
      bgm.muted = false;
      isMuted = false;
      bgm.play().then(updateBgmUI).catch(() => {});
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
    updateBgmUI();
  }

  if (bgmBtn) bgmBtn.addEventListener('click', toggleBgm);

  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      setVolume(Number(e.target.value) / 100);
    });
  }

  if (volDown) {
    volDown.addEventListener('click', (e) => {
      e.stopPropagation();
      playSfx(clickSfx);
      setVolume(currentVolume - 0.1);
    });
  }

  if (volUp) {
    volUp.addEventListener('click', (e) => {
      e.stopPropagation();
      playSfx(clickSfx);
      setVolume(currentVolume + 0.1);
    });
  }

  // Update button text when language changes
  new MutationObserver(updateBgmUI).observe(document.documentElement, {
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

    // Start background music at default volume (30%)
    bgm.volume = currentVolume;
    if (!isMuted) {
      bgm.play().then(updateBgmUI).catch(() => {});
    }

    // Explosion runs ~2s; fade out splash smoothly and remove
    setTimeout(() => {
      if (splash) splash.classList.add('fade-out');
    }, 1700);

    setTimeout(() => {
      if (splash) splash.style.display = 'none';
      updateBgmUI();
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
    if (!btn || btn.closest('#splash-screen') || btn.closest('#bgm-panel')) return;

    const now = performance.now();
    if (now - lastHoverTime < 70) return;
    lastHoverTime = now;
    playSfx(hoverSfx);
  }, true);

  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!target || !target.closest) return;
    const btn = target.closest(buttonSelector);
    if (!btn || btn.closest('#splash-screen') || btn.closest('#bgm-panel')) return;
    playSfx(clickSfx);
  }, true);

  updateBgmUI();

  // Expose global controller
  window.__camwynnMedia = { bgm, setVolume, playSfx, clickSfx, hoverSfx, dismissSplash };
})();
