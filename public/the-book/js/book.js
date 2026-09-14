/* ============================================================
   From Exile to Transformation — Interactive eBook Engine
   Fish Audio voice clone + chapter recordings
   Reading prefs, resume, focus mode, keyboard, lightbox
   ============================================================ */

(function () {
  'use strict';

  var docEl = document.documentElement;
  docEl.classList.add('js-enabled');

  var STORAGE_PREFS = 'clarity_reader_prefs_v2';
  var STORAGE_VOICE = 'clarity_voice_config_v2';
  var STORAGE_PROGRESS = 'clarity_reader_progress_v1';
  var STORAGE_LAST = 'clarity_reader_last_v1';

  var FISH_VOICE_ID = '94eb0720cec44dfba59263869ed9a8c0';

  var CHAPTER_DATA = [
    { file: 'index.html', title: 'Cover & Overview', part: 'Overview', desc: 'A Memoir Beyond Techniques' },
    { file: 'prologue.html', title: 'Prologue: The Night Everything Changed', part: 'Prologue', desc: 'August 1, 1990 · Kuwait' },
    { file: 'ch-01-born-between-worlds.html', title: 'Chapter 1: Born Between Worlds', part: 'Part I · The Human OS', desc: 'Kuwait · 1980s · The Duality of Belonging' },
    { file: 'ch-02-the-gulf-war.html', title: 'Chapter 2: The Gulf War', part: 'Part I · The Human OS', desc: '1990 · When Systems Collapse' },
    { file: 'ch-03-return-and-reinvention.html', title: 'Chapter 3: Return & Reinvention', part: 'Part I · The Human OS', desc: 'Rebuilding after exile' },
    { file: 'ch-04-breaking-into-the-room.html', title: 'Chapter 4: Breaking into the Room', part: 'Part I · The Human OS', desc: 'Early corporate trials & grit' },
    { file: 'ch-05-governance-as-runway.html', title: 'Chapter 5: Governance as Runway', part: 'Part II · The Enterprise OS', desc: 'Motorola & systemic clarity' },
    { file: 'ch-06-the-constraint-advantage.html', title: 'Chapter 6: The Constraint Advantage', part: 'Part II · The Enterprise OS', desc: 'Turning scarcity into momentum' },
    { file: 'ch-07-the-pyramid.html', title: 'Chapter 7: The Pyramid Operating System', part: 'Part II · The Enterprise OS', desc: 'The three tiers of organization' },
    { file: 'ch-08-reframing-the-people.html', title: 'Chapter 8: Reframing the People', part: 'Part II · The Enterprise OS', desc: 'Culture & talent transformation' },
    { file: 'ch-09-reading-cultures.html', title: 'Chapter 9: Reading Cultures', part: 'Part III · The Nation OS', desc: 'Cross-border leadership dynamics' },
    { file: 'ch-10-building-authority.html', title: 'Chapter 10: Building Authority', part: 'Part III · The Nation OS', desc: 'Huawei & regional scale' },
    { file: 'ch-11-super-labor.html', title: 'Chapter 11: Super-Labor', part: 'Part III · The Nation OS', desc: 'Dignity & platform transformation' },
    { file: 'ch-12-digital-nation-building.html', title: 'Chapter 12: Digital Nation Building', part: 'Part III · The Nation OS', desc: 'Oman digital banking milestone' },
    { file: 'ch-13-ai-as-interpreter.html', title: 'Chapter 13: AI as Interpreter', part: 'Part IV · The Legacy OS', desc: 'Technology with human depth' },
    { file: 'ch-14-the-character-compass.html', title: 'Chapter 14: The Character Compass', part: 'Part IV · The Legacy OS', desc: 'Integrity under pressure' },
    { file: 'ch-15-letters-to-my-daughters.html', title: 'Chapter 15: Letters to My Daughters', part: 'Part IV · The Legacy OS', desc: 'Personal heritage & wisdom' },
    { file: 'ch-16-the-mirror.html', title: 'Chapter 16: The Mirror', part: 'Part IV · The Legacy OS', desc: 'Reflections & legacy' },
    { file: 'epilogue.html', title: 'Epilogue: The Mirror at Forty', part: 'Epilogue', desc: 'Looking back and forward' },
    { file: 'appendix.html', title: 'Appendix: The Six Playbooks', part: 'Appendix', desc: 'The Pyramid Operating System Playbooks' },
    { file: 'assets-library.html', title: 'Images & Archival Assets Library', part: 'Archive', desc: '53 Historical Photos, Artifacts & Documents' }
  ];

  var currentPath = (window.location.pathname.split('/').pop() || 'index.html');
  if (currentPath === '') currentPath = 'index.html';

  var currentChapter = CHAPTER_DATA.find(function (ch) { return ch.file === currentPath; }) || CHAPTER_DATA[0];
  var currentIndex = CHAPTER_DATA.indexOf(currentChapter);

  /* ============================================================
     1. Preference Management
     ============================================================ */
  var defaultPrefs = {
    theme: 'paper',
    fontSize: 'md',
    fontFamily: 'serif',
    spacing: 'normal',
    measure: 'normal',
    align: 'justify',
    focus: false,
    speed: 1
  };

  function loadJson(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function saveJson(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  var userPrefs = Object.assign({}, defaultPrefs, loadJson(STORAGE_PREFS, {}));

  function applyPrefs(prefs) {
    docEl.setAttribute('data-theme', prefs.theme);
    docEl.setAttribute('data-font-size', prefs.fontSize);
    docEl.setAttribute('data-font-family', prefs.fontFamily);
    docEl.setAttribute('data-spacing', prefs.spacing);
    docEl.setAttribute('data-measure', prefs.measure);
    docEl.setAttribute('data-align', prefs.align);
    docEl.setAttribute('data-focus', (prefs.focus && currentPath !== 'index.html') ? 'on' : 'off');
    saveJson(STORAGE_PREFS, prefs);
    if (prefs.fontFamily === 'dyslexic') ensureDyslexicFont();
  }

  function ensureDyslexicFont() {
    if (document.getElementById('lexend-font')) return;
    var link = document.createElement('link');
    link.id = 'lexend-font';
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Lexend:wght@400;500&display=swap';
    document.head.appendChild(link);
  }

  applyPrefs(userPrefs);

  /* ============================================================
     2. Motion & Progress Bar
     ============================================================ */
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bar = document.getElementById('reading-progress');

  function pageProgress() {
    var max = docEl.scrollHeight - window.innerHeight;
    return max > 0 ? Math.min(1, window.scrollY / max) : 0;
  }

  function paintProgress() {
    if (!bar) return;
    bar.style.transform = 'scaleX(' + pageProgress().toFixed(4) + ')';
  }

  if (bar) {
    window.addEventListener('scroll', paintProgress, { passive: true });
    window.addEventListener('resize', paintProgress);
    window.addEventListener('load', paintProgress);
    paintProgress();
  }

  var SELECTOR = '.spotlight, .pullquote, .prose h2, .part-card, .plate, .library-card';
  if (reduce || !('IntersectionObserver' in window)) {
    var fallback = document.querySelectorAll(SELECTOR);
    for (var f = 0; f < fallback.length; f++) fallback[f].classList.add('is-visible');
  } else {
    var io = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('is-visible');
          io.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });
    var targets = document.querySelectorAll(SELECTOR);
    for (var k = 0; k < targets.length; k++) io.observe(targets[k]);
  }

  /* ============================================================
     3. Progress persistence
     ============================================================ */
  function loadProgressMap() {
    var map = loadJson(STORAGE_PROGRESS, {});
    return map && typeof map === 'object' ? map : {};
  }

  function storePageProgress() {
    var map = loadProgressMap();
    map[currentPath] = {
      scroll: pageProgress(),
      updated: Date.now()
    };
    saveJson(STORAGE_PROGRESS, map);
    if (currentPath !== 'index.html') {
      saveJson(STORAGE_LAST, {
        file: currentPath,
        title: currentChapter.title,
        part: currentChapter.part,
        scroll: pageProgress(),
        updated: Date.now()
      });
    }
  }

  var persistTimer = null;
  window.addEventListener('scroll', function () {
    if (persistTimer) return;
    persistTimer = setTimeout(function () {
      persistTimer = null;
      storePageProgress();
    }, 400);
  }, { passive: true });
  window.addEventListener('pagehide', storePageProgress);

  /* ============================================================
     4. DOM injection
     ============================================================ */
  document.addEventListener('DOMContentLoaded', function () {
    var bookHead = document.querySelector('.book-head');
    if (bookHead && !document.querySelector('.book-head-actions')) {
      var actionsWrap = document.createElement('div');
      actionsWrap.className = 'book-head-actions';
      actionsWrap.innerHTML = [
        '<button class="tool-btn" id="btn-open-toc" type="button" title="Table of contents (T)" aria-label="Table of contents">',
        '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16v1.5H4V7zm0 4.25h16v1.5H4v-1.5zM4 15.5h11V17H4v-1.5z"/></svg>',
        '  <span>Contents</span>',
        '</button>',
        '<a class="tool-btn" href="assets-library.html" title="Images and archival assets" aria-label="Archival library">',
        '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c0-1.1.9-2 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>',
        '  <span>Library</span>',
        '</a>',
        '<button class="tool-btn" id="btn-toggle-audio" type="button" title="Listen in the author\'s voice (L)" aria-label="Audio narration">',
        '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v9.28c-.47-.17-.97-.28-1.5-.28C8.01 12 6 14.01 6 16.5S8.01 21 10.5 21c2.31 0 4.2-1.75 4.45-4H15V6h4V3h-7z"/></svg>',
        '  <span>Listen</span>',
        '</button>',
        '<button class="tool-btn tool-btn-icon-only" id="btn-toggle-focus" type="button" title="Focus mode (F)" aria-label="Focus mode">',
        '  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zM4 14h2v4h4v2H4v-6zm14 0h2v6h-6v-2h4v-4z"/></svg>',
        '</button>',
        '<button class="tool-btn tool-btn-icon-only" id="btn-open-reader-settings" type="button" title="Reading appearance (A)" aria-label="Reading settings">',
        '  <span class="aa-mark">Aa</span>',
        '</button>'
      ].join('');
      bookHead.appendChild(actionsWrap);
    }

    injectResumeBar();

    var backdrop = document.createElement('div');
    backdrop.className = 'drawer-backdrop';
    backdrop.id = 'drawer-backdrop';
    document.body.appendChild(backdrop);

    var readerDrawer = document.createElement('aside');
    readerDrawer.className = 'reader-drawer reader-drawer--right';
    readerDrawer.id = 'reader-drawer';
    readerDrawer.setAttribute('aria-label', 'Reading adjustments');
    readerDrawer.innerHTML = [
      '<div class="drawer-header">',
      '  <h2 class="drawer-title">Reading</h2>',
      '  <button class="drawer-close" id="btn-close-reader-drawer" type="button" aria-label="Close">✕</button>',
      '</div>',
      '<div class="drawer-body">',
      '  <div class="drawer-section">',
      '    <span class="drawer-section-title">Theme</span>',
      '    <div class="theme-grid">',
      '      <button class="theme-swatch theme-swatch--paper" type="button" data-set-theme="paper" title="Cream paper">Paper</button>',
      '      <button class="theme-swatch theme-swatch--navy" type="button" data-set-theme="navy" title="Midnight navy">Navy</button>',
      '      <button class="theme-swatch theme-swatch--white" type="button" data-set-theme="white" title="Daylight white">White</button>',
      '      <button class="theme-swatch theme-swatch--sepia" type="button" data-set-theme="sepia" title="Warm sepia">Sepia</button>',
      '      <button class="theme-swatch theme-swatch--oled" type="button" data-set-theme="oled" title="OLED black">OLED</button>',
      '    </div>',
      '  </div>',
      '  <div class="drawer-section">',
      '    <span class="drawer-section-title">Type size</span>',
      '    <div class="size-stepper">',
      '      <button class="stepper-btn" id="btn-font-dec" type="button" aria-label="Decrease type size">A−</button>',
      '      <span class="stepper-value" id="font-size-label">100%</span>',
      '      <button class="stepper-btn" id="btn-font-inc" type="button" aria-label="Increase type size">A+</button>',
      '    </div>',
      '  </div>',
      '  <div class="drawer-section">',
      '    <span class="drawer-section-title">Typeface</span>',
      '    <div class="segmented-control">',
      '      <button class="segment-btn" type="button" data-set-font="serif">Serif</button>',
      '      <button class="segment-btn" type="button" data-set-font="display">Literary</button>',
      '      <button class="segment-btn" type="button" data-set-font="sans">Sans</button>',
      '      <button class="segment-btn" type="button" data-set-font="dyslexic">Dyslexic</button>',
      '    </div>',
      '  </div>',
      '  <div class="drawer-section">',
      '    <span class="drawer-section-title">Line spacing</span>',
      '    <div class="segmented-control">',
      '      <button class="segment-btn" type="button" data-set-spacing="compact">Compact</button>',
      '      <button class="segment-btn" type="button" data-set-spacing="normal">Balanced</button>',
      '      <button class="segment-btn" type="button" data-set-spacing="relaxed">Relaxed</button>',
      '    </div>',
      '  </div>',
      '  <div class="drawer-section">',
      '    <span class="drawer-section-title">Measure</span>',
      '    <div class="segmented-control">',
      '      <button class="segment-btn" type="button" data-set-measure="narrow">Focused</button>',
      '      <button class="segment-btn" type="button" data-set-measure="normal">Standard</button>',
      '      <button class="segment-btn" type="button" data-set-measure="wide">Wide</button>',
      '    </div>',
      '  </div>',
      '  <div class="drawer-section">',
      '    <span class="drawer-section-title">Alignment</span>',
      '    <div class="segmented-control">',
      '      <button class="segment-btn" type="button" data-set-align="justify">Justified</button>',
      '      <button class="segment-btn" type="button" data-set-align="left">Ragged</button>',
      '    </div>',
      '  </div>',
      '  <div class="drawer-section">',
      '    <span class="drawer-section-title">This page</span>',
      '    <div class="reading-stats-card">',
      '      <div class="stat-item"><div class="stat-num" id="stat-word-count">--</div><div class="stat-lbl">Words</div></div>',
      '      <div class="stat-item"><div class="stat-num" id="stat-read-time">--</div><div class="stat-lbl">Read</div></div>',
      '      <div class="stat-item"><div class="stat-num" id="stat-listen-time">--</div><div class="stat-lbl">Listen</div></div>',
      '    </div>',
      '  </div>',
      '  <p class="drawer-hint">Shortcuts: T contents · A appearance · L listen · F focus · ? help</p>',
      '  <button class="tool-btn" id="btn-reset-prefs" type="button">Reset appearance</button>',
      '</div>'
    ].join('');
    document.body.appendChild(readerDrawer);

    var tocDrawer = document.createElement('aside');
    tocDrawer.className = 'reader-drawer reader-drawer--left';
    tocDrawer.id = 'toc-drawer';
    tocDrawer.setAttribute('aria-label', 'Table of contents');

    var progressMap = loadProgressMap();
    var tocHtml = [
      '<div class="drawer-header">',
      '  <h2 class="drawer-title">Contents</h2>',
      '  <button class="drawer-close" id="btn-close-toc-drawer" type="button" aria-label="Close">✕</button>',
      '</div>',
      '<div class="drawer-body">',
      '  <ul class="toc-list">'
    ];
    var currentPart = '';
    CHAPTER_DATA.forEach(function (ch, idx) {
      if (ch.part !== currentPart) {
        currentPart = ch.part;
        tocHtml.push('<li class="toc-part-header">' + escapeHtml(currentPart) + '</li>');
      }
      var isActive = currentPath === ch.file ? ' active' : '';
      var saved = progressMap[ch.file];
      var pct = saved && saved.scroll ? Math.round(saved.scroll * 100) : 0;
      var mark = idx === 0 ? '✦' : (idx === 1 ? 'P' : (idx >= 2 && idx <= 17 ? String(idx - 1) : (idx === 18 ? 'E' : (idx === 19 ? 'A' : '◻'))));
      tocHtml.push(
        '<li class="toc-item' + isActive + '">' +
          '<a href="' + ch.file + '">' +
            '<span class="ch-num">' + mark + '</span>' +
            '<div class="toc-copy">' +
              '<div class="toc-title">' + escapeHtml(ch.title) + '</div>' +
              '<div class="toc-desc">' + escapeHtml(ch.desc) + '</div>' +
              (pct > 0 ? '<span class="toc-progress" style="--p:' + pct + '%" aria-hidden="true"></span>' : '') +
            '</div>' +
          '</a>' +
        '</li>'
      );
    });
    tocHtml.push('  </ul></div>');
    tocDrawer.innerHTML = tocHtml.join('');
    document.body.appendChild(tocDrawer);

    var audioDock = document.createElement('div');
    audioDock.className = 'audio-dock';
    audioDock.id = 'audio-dock';
    audioDock.setAttribute('role', 'region');
    audioDock.setAttribute('aria-label', 'Author narration');
    audioDock.innerHTML = [
      '<button class="audio-dock-btn" id="audio-prev-btn" type="button" title="Previous passage">',
      '  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>',
      '</button>',
      '<button class="audio-dock-btn audio-play-main" id="audio-play-btn" type="button" title="Play or pause">',
      '  <svg id="audio-play-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',
      '</button>',
      '<button class="audio-dock-btn" id="audio-next-btn" type="button" title="Next passage">',
      '  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>',
      '</button>',
      '<div class="audio-info">',
      '  <span class="audio-label" id="audio-track-title">Zeeshan Sabri</span>',
      '  <span class="audio-sub" id="audio-track-sub">Fish Audio voice clone</span>',
      '</div>',
      '<div class="audio-scrubber-wrap">',
      '  <span class="audio-time" id="audio-time-elapsed">0:00</span>',
      '  <div class="audio-scrubber" id="audio-scrubber" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0">',
      '    <div class="audio-scrubber-fill" id="audio-scrubber-fill"></div>',
      '  </div>',
      '  <span class="audio-time" id="audio-time-remain">0:00</span>',
      '</div>',
      '<button class="audio-speed-btn" id="audio-speed-btn" type="button" title="Playback speed">1.0×</button>',
      '<button class="audio-speed-btn" id="audio-sleep-btn" type="button" title="Sleep timer">Sleep</button>',
      '<button class="audio-dock-btn" id="btn-open-voice-modal" type="button" title="Voice settings">',
      '  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3zm-7 9a7 7 0 0014 0h-2a5 5 0 01-10 0H5zm6 8.9V22h2v-1.1A8.01 8.01 0 0020 13h-2a6 6 0 01-12 0H4a8.01 8.01 0 007 7.9z"/></svg>',
      '</button>',
      '<button class="audio-dock-btn" id="audio-close-btn" type="button" title="Close player">✕</button>'
    ].join('');
    document.body.appendChild(audioDock);

    var voiceModal = document.createElement('div');
    voiceModal.className = 'voice-modal';
    voiceModal.id = 'voice-modal';
    voiceModal.innerHTML = [
      '<div class="voice-modal-card" role="dialog" aria-labelledby="voice-modal-title">',
      '  <h2 class="drawer-title" id="voice-modal-title">Author voice</h2>',
      '  <p class="voice-lead">Narration uses Zeeshan Sabri’s Fish Audio clone. Chapter recordings play first. Live synthesis is used only for the voice test, or if a recording is missing.</p>',
      '  <div class="voice-status" id="voice-status">Checking Fish Audio…</div>',
      '  <div class="voice-input-group">',
      '    <label for="input-voice-id">Fish voice model ID</label>',
      '    <input class="voice-input" id="input-voice-id" type="text" autocomplete="off" spellcheck="false" />',
      '  </div>',
      '  <p class="voice-note">The API key stays on the local server. It is never stored in the browser.</p>',
      '  <div class="voice-btn-row">',
      '    <button class="tool-btn" id="btn-test-voice" type="button">Test voice</button>',
      '    <button class="tool-btn active" id="btn-save-voice" type="button">Save</button>',
      '    <button class="tool-btn" id="btn-close-voice-modal" type="button">Close</button>',
      '  </div>',
      '</div>'
    ].join('');
    document.body.appendChild(voiceModal);

    var lightbox = document.createElement('div');
    lightbox.className = 'image-lightbox';
    lightbox.id = 'image-lightbox';
    lightbox.innerHTML = [
      '<div class="lightbox-topbar">',
      '  <div class="lightbox-title-area">',
      '    <h3 class="lightbox-title" id="lightbox-title">Archival image</h3>',
      '    <span class="lightbox-meta" id="lightbox-meta">From Exile to Transformation Archive</span>',
      '  </div>',
      '  <div class="lightbox-actions">',
      '    <button class="tool-btn" id="lightbox-toggle-duotone" type="button">Duotone on</button>',
      '    <button class="drawer-close" id="lightbox-close-btn" type="button" aria-label="Close image">✕</button>',
      '  </div>',
      '</div>',
      '<div class="lightbox-content">',
      '  <div class="lightbox-img-wrap">',
      '    <img class="lightbox-img duotone-active" id="lightbox-img" src="" alt="" />',
      '  </div>',
      '</div>',
      '<div class="lightbox-caption-bar" id="lightbox-caption"></div>'
    ].join('');
    document.body.appendChild(lightbox);

    var keysHelp = document.createElement('div');
    keysHelp.className = 'keys-modal';
    keysHelp.id = 'keys-modal';
    keysHelp.innerHTML = [
      '<div class="keys-card" role="dialog" aria-labelledby="keys-title">',
      '  <h2 class="drawer-title" id="keys-title">Reader keys</h2>',
      '  <ul class="keys-list">',
      '    <li><kbd>T</kbd> Contents</li>',
      '    <li><kbd>A</kbd> Appearance</li>',
      '    <li><kbd>L</kbd> Listen</li>',
      '    <li><kbd>F</kbd> Focus</li>',
      '    <li><kbd>Space</kbd> Play / pause</li>',
      '    <li><kbd>[</kbd> Previous chapter</li>',
      '    <li><kbd>]</kbd> Next chapter</li>',
      '    <li><kbd>?</kbd> This list</li>',
      '    <li><kbd>Esc</kbd> Close</li>',
      '  </ul>',
      '  <button class="tool-btn" id="btn-close-keys" type="button">Close</button>',
      '</div>'
    ].join('');
    document.body.appendChild(keysHelp);

    var toastEl = document.createElement('div');
    toastEl.className = 'reader-toast';
    toastEl.id = 'reader-toast';
    toastEl.setAttribute('role', 'status');
    document.body.appendChild(toastEl);

    var focusChip = document.createElement('button');
    focusChip.className = 'focus-exit';
    focusChip.id = 'focus-exit';
    focusChip.type = 'button';
    focusChip.textContent = 'Exit focus';
    document.body.appendChild(focusChip);

    /* ============================================================
       5. Reading stats
       ============================================================ */
    var proseEl = document.querySelector('.prose') || document.querySelector('.blurb') || document.querySelector('main');
    var pageWordCount = 0;
    if (proseEl) {
      var text = proseEl.innerText || '';
      pageWordCount = text.trim().split(/\s+/).filter(Boolean).length;
      var mins = Math.max(1, Math.ceil(pageWordCount / 220));
      var listenMins = Math.max(1, Math.ceil(pageWordCount / 155));
      var wordCountEl = document.getElementById('stat-word-count');
      var readTimeEl = document.getElementById('stat-read-time');
      var listenTimeEl = document.getElementById('stat-listen-time');
      if (wordCountEl) wordCountEl.textContent = pageWordCount.toLocaleString();
      if (readTimeEl) readTimeEl.textContent = mins + ' min';
      if (listenTimeEl) listenTimeEl.textContent = listenMins + ' min';

      var headMeta = document.querySelector('.book-head-meta');
      if (headMeta && currentPath !== 'index.html' && !headMeta.textContent.includes('min')) {
        headMeta.textContent = headMeta.textContent + ' · ' + mins + ' min';
      }
    }

    /* ============================================================
       6. Drawer + prefs
       ============================================================ */
    var openReaderBtn = document.getElementById('btn-open-reader-settings');
    var closeReaderBtn = document.getElementById('btn-close-reader-drawer');
    var openTocBtn = document.getElementById('btn-open-toc');
    var closeTocBtn = document.getElementById('btn-close-toc-drawer');
    var focusBtn = document.getElementById('btn-toggle-focus');

    function closeAllDrawers() {
      readerDrawer.classList.remove('is-open');
      tocDrawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      voiceModal.classList.remove('is-open');
      keysHelp.classList.remove('is-open');
    }

    function openDrawer(which) {
      readerDrawer.classList.toggle('is-open', which === 'reader');
      tocDrawer.classList.toggle('is-open', which === 'toc');
      backdrop.classList.toggle('is-open', which === 'reader' || which === 'toc');
      if (which !== 'voice') voiceModal.classList.remove('is-open');
      if (which !== 'keys') keysHelp.classList.remove('is-open');
    }

    if (openReaderBtn) openReaderBtn.addEventListener('click', function () { openDrawer('reader'); });
    if (closeReaderBtn) closeReaderBtn.addEventListener('click', closeAllDrawers);
    if (openTocBtn) openTocBtn.addEventListener('click', function () { openDrawer('toc'); });
    if (closeTocBtn) closeTocBtn.addEventListener('click', closeAllDrawers);
    backdrop.addEventListener('click', closeAllDrawers);
    document.getElementById('btn-close-keys').addEventListener('click', closeAllDrawers);

    function setFocusMode(on) {
      userPrefs.focus = !!on;
      applyPrefs(userPrefs);
      if (focusBtn) focusBtn.classList.toggle('active', userPrefs.focus);
    }
    if (focusBtn) {
      focusBtn.classList.toggle('active', !!userPrefs.focus);
      focusBtn.addEventListener('click', function () { setFocusMode(!userPrefs.focus); });
    }
    focusChip.addEventListener('click', function () { setFocusMode(false); });

    function markActive(selector, attr, value) {
      readerDrawer.querySelectorAll(selector).forEach(function (btn) {
        btn.classList.toggle('active', btn.getAttribute(attr) === value);
      });
    }

    function syncPrefUi() {
      markActive('[data-set-theme]', 'data-set-theme', userPrefs.theme);
      markActive('[data-set-font]', 'data-set-font', userPrefs.fontFamily);
      markActive('[data-set-spacing]', 'data-set-spacing', userPrefs.spacing);
      markActive('[data-set-measure]', 'data-set-measure', userPrefs.measure);
      markActive('[data-set-align]', 'data-set-align', userPrefs.align);
      var fontLabels = { xs: '85%', sm: '92%', md: '100%', lg: '115%', xl: '130%' };
      var fontSizeLabel = document.getElementById('font-size-label');
      if (fontSizeLabel) fontSizeLabel.textContent = fontLabels[userPrefs.fontSize] || '100%';
    }
    syncPrefUi();

    readerDrawer.querySelectorAll('[data-set-theme]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        userPrefs.theme = btn.getAttribute('data-set-theme');
        applyPrefs(userPrefs);
        syncPrefUi();
      });
    });

    var fontSizes = ['xs', 'sm', 'md', 'lg', 'xl'];
    var fontDecBtn = document.getElementById('btn-font-dec');
    var fontIncBtn = document.getElementById('btn-font-inc');
    if (fontDecBtn) {
      fontDecBtn.addEventListener('click', function () {
        var idx = fontSizes.indexOf(userPrefs.fontSize);
        if (idx > 0) {
          userPrefs.fontSize = fontSizes[idx - 1];
          applyPrefs(userPrefs);
          syncPrefUi();
        }
      });
    }
    if (fontIncBtn) {
      fontIncBtn.addEventListener('click', function () {
        var idx = fontSizes.indexOf(userPrefs.fontSize);
        if (idx < fontSizes.length - 1) {
          userPrefs.fontSize = fontSizes[idx + 1];
          applyPrefs(userPrefs);
          syncPrefUi();
        }
      });
    }

    bindPrefGroup('[data-set-font]', 'data-set-font', 'fontFamily');
    bindPrefGroup('[data-set-spacing]', 'data-set-spacing', 'spacing');
    bindPrefGroup('[data-set-measure]', 'data-set-measure', 'measure');
    bindPrefGroup('[data-set-align]', 'data-set-align', 'align');

    function bindPrefGroup(selector, attr, key) {
      readerDrawer.querySelectorAll(selector).forEach(function (btn) {
        btn.addEventListener('click', function () {
          userPrefs[key] = btn.getAttribute(attr);
          applyPrefs(userPrefs);
          syncPrefUi();
        });
      });
    }

    var resetBtn = document.getElementById('btn-reset-prefs');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        var keepSpeed = userPrefs.speed;
        userPrefs = Object.assign({}, defaultPrefs, { speed: keepSpeed });
        applyPrefs(userPrefs);
        syncPrefUi();
        closeAllDrawers();
        toast('Appearance reset');
      });
    }

    /* ============================================================
       7. Lightbox
       ============================================================ */
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxTitle = document.getElementById('lightbox-title');
    var lightboxMeta = document.getElementById('lightbox-meta');
    var lightboxCaption = document.getElementById('lightbox-caption');
    var lightboxCloseBtn = document.getElementById('lightbox-close-btn');
    var lightboxDuotoneBtn = document.getElementById('lightbox-toggle-duotone');
    var duotoneActive = true;

    function openLightbox(imgSrc, title, meta, caption) {
      lightboxImg.src = imgSrc;
      lightboxTitle.textContent = title || 'Archival photograph';
      lightboxMeta.textContent = meta || 'From Exile to Transformation Archive';
      lightboxCaption.textContent = caption || '';
      lightbox.classList.add('is-open');
    }

    if (lightboxCloseBtn) lightboxCloseBtn.addEventListener('click', function () { lightbox.classList.remove('is-open'); });
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox || e.target.classList.contains('lightbox-content')) {
        lightbox.classList.remove('is-open');
      }
    });
    if (lightboxDuotoneBtn) {
      lightboxDuotoneBtn.addEventListener('click', function () {
        duotoneActive = !duotoneActive;
        lightboxImg.classList.toggle('duotone-active', duotoneActive);
        lightboxDuotoneBtn.textContent = duotoneActive ? 'Duotone on' : 'Natural color';
      });
    }

    document.querySelectorAll('figure.plate, figure.plate-inset, figure.hero-plate, .library-card-img-wrap').forEach(function (fig) {
      var img = fig.querySelector('img');
      if (!img) return;
      fig.style.cursor = 'zoom-in';
      fig.addEventListener('click', function (e) {
        if (e.target.closest('a')) return;
        var alt = img.getAttribute('alt') || '';
        var figcap = fig.querySelector('figcaption');
        var captionText = figcap ? figcap.innerText : alt;
        var locEl = fig.querySelector('.loc');
        var creditEl = fig.querySelector('.credit');
        var metaText = (locEl ? locEl.textContent : '') + (creditEl ? ' · ' + creditEl.textContent : '');
        openLightbox(img.src, alt || 'Historical plate', metaText, captionText);
      });
    });

    /* ============================================================
       8. Fish Audio narration
       ============================================================ */
    var audioToggleBtn = document.getElementById('btn-toggle-audio');
    var audioPlayBtn = document.getElementById('audio-play-btn');
    var audioPlayIcon = document.getElementById('audio-play-icon');
    var audioPrevBtn = document.getElementById('audio-prev-btn');
    var audioNextBtn = document.getElementById('audio-next-btn');
    var audioSpeedBtn = document.getElementById('audio-speed-btn');
    var audioSleepBtn = document.getElementById('audio-sleep-btn');
    var audioCloseBtn = document.getElementById('audio-close-btn');
    var audioScrubber = document.getElementById('audio-scrubber');
    var audioScrubberFill = document.getElementById('audio-scrubber-fill');
    var audioTrackSub = document.getElementById('audio-track-sub');
    var audioTrackTitle = document.getElementById('audio-track-title');
    var timeElapsed = document.getElementById('audio-time-elapsed');
    var timeRemain = document.getElementById('audio-time-remain');
    var voiceStatus = document.getElementById('voice-status');

    var savedVoice = loadJson(STORAGE_VOICE, {});
    var voiceConfig = {
      provider: 'fish',
      voiceId: savedVoice.voiceId || FISH_VOICE_ID
    };

    var inputVoiceId = document.getElementById('input-voice-id');
    if (inputVoiceId) inputVoiceId.value = voiceConfig.voiceId;

    fetch('/api/voice').then(function (res) { return res.ok ? res.json() : null; }).then(function (info) {
      if (!info || !voiceStatus) return;
      voiceStatus.textContent = info.ready
        ? 'Fish Audio is ready · model ' + (info.model || 's2.1-pro')
        : 'Fish Audio is not configured on the server';
      voiceStatus.className = 'voice-status ' + (info.ready ? 'is-ready' : 'is-down');
      if (!savedVoice.voiceId && info.voice_id && inputVoiceId) {
        voiceConfig.voiceId = info.voice_id;
        inputVoiceId.value = info.voice_id;
      }
    }).catch(function () {
      if (voiceStatus) {
        voiceStatus.textContent = 'Open this book through the local server to test live Fish Audio. Chapter recordings still play from disk.';
        voiceStatus.className = 'voice-status is-warn';
      }
    });

    document.getElementById('btn-open-voice-modal').addEventListener('click', function () {
      voiceModal.classList.add('is-open');
    });
    document.getElementById('btn-close-voice-modal').addEventListener('click', function () {
      voiceModal.classList.remove('is-open');
    });
    document.getElementById('btn-save-voice').addEventListener('click', function () {
      voiceConfig.voiceId = (inputVoiceId.value || '').trim() || FISH_VOICE_ID;
      saveJson(STORAGE_VOICE, { provider: 'fish', voiceId: voiceConfig.voiceId });
      voiceModal.classList.remove('is-open');
      toast('Fish voice saved');
    });

    var paragraphs = Array.from(document.querySelectorAll('.chapter-head h1, .epigraph, .prose p, .spotlight h3, .spotlight p, .blurb p, .blurb .lead'));
    paragraphs = paragraphs.filter(function (p) {
      return p.innerText && p.innerText.trim().length > 0 && !p.closest('.foot-nav') && !p.closest('.book-foot');
    });
    paragraphs.forEach(function (p, idx) {
      p.classList.add('narratable');
      p.setAttribute('data-narration-index', String(idx));
    });

    var weights = paragraphs.map(function (p) {
      return Math.max(1, (p.innerText || '').trim().split(/\s+/).filter(Boolean).length);
    });
    var weightTotal = weights.reduce(function (a, b) { return a + b; }, 0) || 1;

    var speeds = [0.75, 1.0, 1.25, 1.5, 1.75];
    var sleepOptions = [0, 15, 30, 45];
    var audioState = {
      isPlaying: false,
      currentIndex: 0,
      speed: speeds.indexOf(userPrefs.speed) >= 0 ? userPrefs.speed : 1,
      mode: 'chapter',
      chapterUrl: null,
      audioElement: null,
      cache: {},
      sleepUntil: 0,
      sleepMinutes: 0
    };

    if (audioSpeedBtn) audioSpeedBtn.textContent = formatSpeed(audioState.speed);

    function formatSpeed(n) {
      return (n % 1 === 0 ? n.toFixed(1) : String(n)) + '×';
    }

    function formatTime(sec) {
      if (!isFinite(sec) || sec < 0) return '0:00';
      var s = Math.floor(sec);
      var m = Math.floor(s / 60);
      var r = s % 60;
      return m + ':' + (r < 10 ? '0' : '') + r;
    }

    function toast(msg) {
      toastEl.textContent = msg;
      toastEl.classList.add('is-on');
      clearTimeout(toast.timer);
      toast.timer = setTimeout(function () { toastEl.classList.remove('is-on'); }, 2400);
    }

    function updatePlayIcon(playing) {
      if (!audioPlayIcon) return;
      audioPlayIcon.innerHTML = playing
        ? '<path d="M6 5h4v14H6V5zm8 0h4v14h-4V5z"/>'
        : '<path d="M8 5v14l11-7z"/>';
    }

    function removeHighlight() {
      document.querySelectorAll('.speaking-para').forEach(function (el) {
        el.classList.remove('speaking-para');
      });
    }

    function highlightParagraph(idx) {
      removeHighlight();
      if (!paragraphs[idx]) return;
      paragraphs[idx].classList.add('speaking-para');
      if (!reduce) {
        paragraphs[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      audioState.currentIndex = idx;
    }

    function setScrub(ratio) {
      var pct = Math.max(0, Math.min(1, ratio)) * 100;
      if (audioScrubberFill) audioScrubberFill.style.width = pct + '%';
      if (audioScrubber) audioScrubber.setAttribute('aria-valuenow', String(Math.round(pct)));
    }

    function indexFromRatio(ratio) {
      var target = Math.max(0, Math.min(1, ratio)) * weightTotal;
      var acc = 0;
      for (var i = 0; i < weights.length; i++) {
        acc += weights[i];
        if (target <= acc) return i;
      }
      return Math.max(0, paragraphs.length - 1);
    }

    function ratioFromIndex(idx) {
      var acc = 0;
      for (var i = 0; i < idx; i++) acc += weights[i];
      return acc / weightTotal;
    }

    function chapterAudioPath() {
      return 'assets/audio/' + currentPath.replace(/\.html$/, '.mp3');
    }

    function bindMedia(el) {
      if (audioState.audioElement && audioState.audioElement !== el) {
        audioState.audioElement.pause();
      }
      audioState.audioElement = el;
      el.playbackRate = audioState.speed;
      el.ontimeupdate = function () {
        if (!el.duration) return;
        setScrub(el.currentTime / el.duration);
        if (timeElapsed) timeElapsed.textContent = formatTime(el.currentTime);
        if (timeRemain) timeRemain.textContent = formatTime(el.duration - el.currentTime);
        if (audioState.mode === 'chapter') {
          highlightParagraph(indexFromRatio(el.currentTime / el.duration));
        }
        if (audioState.sleepUntil && Date.now() >= audioState.sleepUntil) {
          pauseAudio();
          audioState.sleepUntil = 0;
          audioState.sleepMinutes = 0;
          if (audioSleepBtn) audioSleepBtn.textContent = 'Sleep';
          toast('Sleep timer ended');
        }
      };
    }

    function getLiveTtsUrl(text) {
      var key = voiceConfig.voiceId + ':' + text;
      if (audioState.cache[key]) return Promise.resolve(audioState.cache[key]);
      return fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text, voice_id: voiceConfig.voiceId })
      }).then(function (res) {
        if (!res.ok) throw new Error('tts');
        return res.blob();
      }).then(function (blob) {
        var url = URL.createObjectURL(blob);
        audioState.cache[key] = url;
        return url;
      });
    }

    function playLiveParagraph(idx) {
      if (idx < 0 || idx >= paragraphs.length) {
        stopAudio();
        return;
      }
      audioState.mode = 'live';
      audioState.isPlaying = true;
      audioState.currentIndex = idx;
      updatePlayIcon(true);
      highlightParagraph(idx);
      if (audioTrackSub) audioTrackSub.textContent = 'Live Fish Audio';
      var raw = paragraphs[idx].innerText.trim().replace(/Framework Spotlight\s*·\s*\d+/gi, 'Framework Spotlight: ');
      getLiveTtsUrl(raw).then(function (url) {
        var aud = new Audio(url);
        bindMedia(aud);
        aud.onended = function () {
          if (audioState.isPlaying) playLiveParagraph(idx + 1);
        };
        aud.onerror = function () {
          toast('Fish Audio could not play this passage');
          pauseAudio();
        };
        return aud.play();
      }).catch(function () {
        toast('Fish Audio is unavailable. Use the local server, or play a recorded chapter.');
        pauseAudio();
      });
    }

    function playChapter(startRatio) {
      var start = typeof startRatio === 'number' ? startRatio : 0;
      var url = audioState.chapterUrl || chapterAudioPath();
      audioState.mode = 'chapter';
      audioState.isPlaying = true;
      updatePlayIcon(true);
      if (audioTrackSub) audioTrackSub.textContent = 'Fish Audio recording';
      if (audioTrackTitle) audioTrackTitle.textContent = currentChapter.title.replace(/^Chapter \d+:\s*/, '');

      var aud = new Audio(url);
      bindMedia(aud);
      aud.onended = function () { stopAudio(); };
      aud.onerror = function () {
        audioState.chapterUrl = null;
        if (audioTrackSub) audioTrackSub.textContent = 'Live Fish Audio';
        playLiveParagraph(indexFromRatio(start));
      };
      var applyStart = function () {
        if (aud.duration && start > 0) {
          try { aud.currentTime = start * aud.duration; } catch (e) {}
        }
      };
      if (aud.readyState >= 1) applyStart();
      else aud.onloadedmetadata = applyStart;

      aud.play().then(function () {
        audioState.chapterUrl = url;
        audioState.isPlaying = true;
        updatePlayIcon(true);
      }).catch(function () {
        updatePlayIcon(false);
        audioState.isPlaying = false;
        toast('Press play to start narration');
      });
    }

    function pauseAudio() {
      audioState.isPlaying = false;
      if (audioState.audioElement) audioState.audioElement.pause();
      updatePlayIcon(false);
    }

    function stopAudio() {
      pauseAudio();
      removeHighlight();
      audioState.currentIndex = 0;
      setScrub(0);
      if (timeElapsed) timeElapsed.textContent = '0:00';
    }

    function openDock(andPlay) {
      audioDock.classList.add('is-active');
      document.body.classList.add('audio-open');
      if (audioToggleBtn) audioToggleBtn.classList.add('active');
      if (andPlay && !audioState.isPlaying) {
        if (audioState.mode === 'live') playLiveParagraph(audioState.currentIndex);
        else playChapter(ratioFromIndex(audioState.currentIndex));
      }
    }

    function closeDock() {
      pauseAudio();
      removeHighlight();
      audioDock.classList.remove('is-active');
      document.body.classList.remove('audio-open');
      if (audioToggleBtn) audioToggleBtn.classList.remove('active');
    }

    if (audioToggleBtn) {
      audioToggleBtn.addEventListener('click', function () {
        if (audioDock.classList.contains('is-active')) closeDock();
        else openDock(true);
      });
    }
    if (audioPlayBtn) {
      audioPlayBtn.addEventListener('click', function () {
        if (audioState.isPlaying) pauseAudio();
        else if (audioState.audioElement && audioState.mode === 'chapter') {
          audioState.audioElement.play();
          audioState.isPlaying = true;
          updatePlayIcon(true);
        } else {
          playChapter(ratioFromIndex(audioState.currentIndex));
        }
      });
    }
    if (audioPrevBtn) {
      audioPrevBtn.addEventListener('click', function () {
        var prev = Math.max(0, audioState.currentIndex - 1);
        if (audioState.mode === 'live') playLiveParagraph(prev);
        else {
          audioState.currentIndex = prev;
          playChapter(ratioFromIndex(prev));
        }
      });
    }
    if (audioNextBtn) {
      audioNextBtn.addEventListener('click', function () {
        var next = Math.min(paragraphs.length - 1, audioState.currentIndex + 1);
        if (audioState.mode === 'live') playLiveParagraph(next);
        else {
          audioState.currentIndex = next;
          playChapter(ratioFromIndex(next));
        }
      });
    }
    if (audioCloseBtn) audioCloseBtn.addEventListener('click', closeDock);

    if (audioSpeedBtn) {
      audioSpeedBtn.addEventListener('click', function () {
        var idx = speeds.indexOf(audioState.speed);
        audioState.speed = speeds[(idx + 1) % speeds.length];
        userPrefs.speed = audioState.speed;
        applyPrefs(userPrefs);
        audioSpeedBtn.textContent = formatSpeed(audioState.speed);
        if (audioState.audioElement) audioState.audioElement.playbackRate = audioState.speed;
      });
    }

    if (audioSleepBtn) {
      audioSleepBtn.addEventListener('click', function () {
        var idx = sleepOptions.indexOf(audioState.sleepMinutes);
        audioState.sleepMinutes = sleepOptions[(idx + 1) % sleepOptions.length];
        audioState.sleepUntil = audioState.sleepMinutes ? Date.now() + audioState.sleepMinutes * 60000 : 0;
        audioSleepBtn.textContent = audioState.sleepMinutes ? audioState.sleepMinutes + 'm' : 'Sleep';
        if (audioState.sleepMinutes) toast('Sleep in ' + audioState.sleepMinutes + ' minutes');
      });
    }

    if (audioScrubber) {
      audioScrubber.addEventListener('click', function (e) {
        var rect = audioScrubber.getBoundingClientRect();
        var ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        if (audioState.mode === 'chapter' && audioState.audioElement && audioState.audioElement.duration) {
          audioState.audioElement.currentTime = ratio * audioState.audioElement.duration;
          if (!audioState.isPlaying) {
            audioState.audioElement.play();
            audioState.isPlaying = true;
            updatePlayIcon(true);
          }
        } else {
          playLiveParagraph(indexFromRatio(ratio));
        }
      });
    }

    paragraphs.forEach(function (p, idx) {
      p.addEventListener('click', function (e) {
        if (!audioDock.classList.contains('is-active')) return;
        if (e.target.closest('a, figure, button')) return;
        audioState.currentIndex = idx;
        if (audioState.mode === 'live') playLiveParagraph(idx);
        else playChapter(ratioFromIndex(idx));
      });
    });

    document.getElementById('btn-test-voice').addEventListener('click', function () {
      var sample = 'Clarity is born in exile, not in comfort. Transformation begins where trust is restored and dignity honored.';
      if (audioTrackSub) audioTrackSub.textContent = 'Testing Fish Audio…';
      getLiveTtsUrl(sample).then(function (url) {
        openDock(false);
        var aud = new Audio(url);
        bindMedia(aud);
        audioState.mode = 'live';
        audioState.isPlaying = true;
        updatePlayIcon(true);
        if (audioTrackSub) audioTrackSub.textContent = 'Fish Audio test';
        aud.onended = function () { pauseAudio(); };
        return aud.play();
      }).catch(function () {
        toast('Live Fish Audio failed. Confirm the local server is running.');
      });
    });

    /* ============================================================
       9. Keyboard + resume
       ============================================================ */
    document.addEventListener('keydown', function (e) {
      var tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target.isContentEditable) return;

      if (e.key === 'Escape') {
        if (lightbox.classList.contains('is-open')) lightbox.classList.remove('is-open');
        else if (audioDock.classList.contains('is-active') && !readerDrawer.classList.contains('is-open') && !tocDrawer.classList.contains('is-open')) closeDock();
        else closeAllDrawers();
        return;
      }
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        keysHelp.classList.toggle('is-open');
        return;
      }
      if (e.code === 'Space' && audioDock.classList.contains('is-active')) {
        e.preventDefault();
        audioPlayBtn.click();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var key = e.key.toLowerCase();
      if (key === 't') { e.preventDefault(); openDrawer(tocDrawer.classList.contains('is-open') ? '' : 'toc'); }
      else if (key === 'a') { e.preventDefault(); openDrawer(readerDrawer.classList.contains('is-open') ? '' : 'reader'); }
      else if (key === 'l') { e.preventDefault(); audioToggleBtn && audioToggleBtn.click(); }
      else if (key === 'f') { e.preventDefault(); setFocusMode(!userPrefs.focus); }
      else if (key === '[') {
        if (currentIndex > 0) window.location.href = CHAPTER_DATA[currentIndex - 1].file;
      } else if (key === ']') {
        if (currentIndex < CHAPTER_DATA.length - 1) window.location.href = CHAPTER_DATA[currentIndex + 1].file;
      }
    });

    restoreScroll();
  });

  function restoreScroll() {
    var map = loadProgressMap();
    var saved = map[currentPath];
    if (!saved || !saved.scroll || saved.scroll < 0.04) return;
    if (currentPath === 'index.html') return;
    requestAnimationFrame(function () {
      var max = docEl.scrollHeight - window.innerHeight;
      if (max > 0) window.scrollTo(0, saved.scroll * max);
    });
  }

  function injectResumeBar() {
    if (currentPath !== 'index.html') return;
    var last = loadJson(STORAGE_LAST, null);
    if (!last || !last.file || last.file === 'index.html') return;
    var host = document.querySelector('.book-head');
    if (!host) return;
    var barEl = document.createElement('div');
    barEl.className = 'resume-bar';
    var pct = last.scroll ? Math.round(last.scroll * 100) : 0;
    barEl.innerHTML =
      '<a class="resume-link" href="' + last.file + '">' +
        '<span class="resume-kicker">Continue reading</span>' +
        '<span class="resume-title">' + escapeHtml(last.title) + '</span>' +
        (pct ? '<span class="resume-meta">' + pct + '% through</span>' : '') +
      '</a>';
    host.insertAdjacentElement('afterend', barEl);
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
})();
