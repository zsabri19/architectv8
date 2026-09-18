/* ============================================================
   reader-settings.js — Font size, line spacing, themes, font toggle
   All preferences saved to localStorage and restored on load.
   ============================================================ */
(function () {
  'use strict';

  var SIZES = [16, 18, 20, 22, 24];
  var SPACINGS = [1.5, 1.7, 1.9];
  var THEMES = ['cream', 'sepia', 'dark'];
  var FONTS = ['serif', 'sans'];
  var STORAGE_KEY = 'ebook-reader-settings';

  // Default settings
  var defaults = {
    sizeIndex: 2,   // 20px
    spacingIndex: 1, // 1.7
    theme: 'cream',
    font: 'serif'
  };

  // Load saved settings
  function load() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (saved) return sanitize(Object.assign({}, defaults, saved));
    } catch (e) { /* ignore */ }
    return Object.assign({}, defaults);
  }

  function clampIndex(n, len, fallback) {
    n = parseInt(n, 10);
    if (!isFinite(n) || n < 0 || n >= len) return fallback;
    return n;
  }

  function sanitize(next) {
    next.sizeIndex = clampIndex(next.sizeIndex, SIZES.length, defaults.sizeIndex);
    next.spacingIndex = clampIndex(next.spacingIndex, SPACINGS.length, defaults.spacingIndex);
    if (THEMES.indexOf(next.theme) === -1) next.theme = defaults.theme;
    if (FONTS.indexOf(next.font) === -1) next.font = defaults.font;
    return next;
  }

  // Save settings
  function save(settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) { /* ignore */ }
  }

  var settings = load();

  // Apply font size
  function applySize() {
    var size = SIZES[settings.sizeIndex];
    document.documentElement.style.setProperty('--reader-font-size', size + 'px');
    var el = document.getElementById('size-value');
    if (el) el.textContent = size + 'px';
  }

  // Apply line spacing
  function applySpacing() {
    var spacing = SPACINGS[settings.spacingIndex];
    document.documentElement.style.setProperty('--reader-line-height', spacing);
    // Update active button
    var btns = document.querySelectorAll('.spacing-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', parseFloat(btns[i].getAttribute('data-spacing')) === spacing);
    }
  }

  // Apply theme
  function applyTheme() {
    document.body.classList.remove('theme-cream', 'theme-sepia', 'theme-dark');
    if (settings.theme !== 'cream') {
      document.body.classList.add('theme-' + settings.theme);
    }
    // Update active button
    var btns = document.querySelectorAll('.theme-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-theme') === settings.theme);
    }
  }

  // Apply font family
  function applyFont() {
    document.body.classList.remove('font-serif', 'font-sans');
    if (settings.font !== 'serif') {
      document.body.classList.add('font-' + settings.font);
    }
    var btns = document.querySelectorAll('.font-btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('active', btns[i].getAttribute('data-font') === settings.font);
    }
  }

  function applyAll() {
    applySize();
    applySpacing();
    applyTheme();
    applyFont();
  }

  // Toggle settings panel
  var panel = document.getElementById('settings-panel');
  var btnSettings = document.getElementById('btn-settings');
  var btnClose = document.getElementById('settings-close');
  var overlay = document.getElementById('drawer-overlay');

  function openSettings() {
    if (!panel) return;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    if (btnSettings) btnSettings.classList.add('active');
    if (overlay) overlay.classList.add('visible');
  }

  function closeSettings() {
    if (!panel) return;
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
    if (btnSettings) btnSettings.classList.remove('active');
    var toc = document.getElementById('toc-drawer');
    if (overlay && (!toc || !toc.classList.contains('open'))) {
      overlay.classList.remove('visible');
    }
  }

  if (btnSettings) {
    btnSettings.addEventListener('click', function () {
      if (panel && panel.classList.contains('open')) {
        closeSettings();
      } else {
        var toc = document.getElementById('toc-drawer');
        if (toc && toc.classList.contains('open')) {
          toc.classList.remove('open');
          var btnToc = document.getElementById('btn-toc');
          if (btnToc) btnToc.classList.remove('active');
        }
        openSettings();
      }
    });
  }

  if (btnClose) btnClose.addEventListener('click', closeSettings);

  // Font size buttons
  var sizeDown = document.getElementById('size-down');
  var sizeUp = document.getElementById('size-up');

  if (sizeDown) {
    sizeDown.addEventListener('click', function () {
      if (settings.sizeIndex > 0) {
        settings.sizeIndex--;
        applySize();
        save(settings);
      }
    });
  }
  if (sizeUp) {
    sizeUp.addEventListener('click', function () {
      if (settings.sizeIndex < SIZES.length - 1) {
        settings.sizeIndex++;
        applySize();
        save(settings);
      }
    });
  }

  // Spacing buttons
  var spacingBtns = document.querySelectorAll('.spacing-btn');
  for (var s = 0; s < spacingBtns.length; s++) {
    spacingBtns[s].addEventListener('click', function () {
      var val = parseFloat(this.getAttribute('data-spacing'));
      var idx = SPACINGS.indexOf(val);
      if (idx !== -1) {
        settings.spacingIndex = idx;
        applySpacing();
        save(settings);
      }
    });
  }

  // Theme buttons
  var themeBtns = document.querySelectorAll('.theme-btn');
  for (var t = 0; t < themeBtns.length; t++) {
    themeBtns[t].addEventListener('click', function () {
      var theme = this.getAttribute('data-theme');
      if (THEMES.indexOf(theme) === -1) return;
      settings.theme = theme;
      applyTheme();
      save(settings);
    });
  }

  // Font buttons
  var fontBtns = document.querySelectorAll('.font-btn');
  for (var f = 0; f < fontBtns.length; f++) {
    fontBtns[f].addEventListener('click', function () {
      var font = this.getAttribute('data-font');
      if (FONTS.indexOf(font) === -1) return;
      settings.font = font;
      applyFont();
      save(settings);
    });
  }

  // Initialize
  applyAll();

  // Expose close for nav.js
  window.closeSettings = closeSettings;
})();
