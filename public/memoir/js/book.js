/* ============================================================
   From Exile to Transformation — shared reading motion.
   Three jobs only:
   1. Scale the gold reading-progress bar in the sticky book-head.
   2. Report memoir_scroll_depth at 25 / 50 / 75 / 100 on that bar.
   3. Reveal section moments (spotlight / pullquote / h2 / part-card)
      as they enter the viewport.
   Every reveal degrades gracefully: no-JS keeps content visible
   (reveals are gated behind the .js-enabled class), and
   prefers-reduced-motion skips the observers entirely.
   ============================================================ */
(function () {
  'use strict';

  var docEl = document.documentElement;
  docEl.classList.add('js-enabled');

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- reading progress ---- */
  var bar = document.getElementById('reading-progress');
  var scrollMarks = [25, 50, 75, 100];
  var scrollFired = {};
  var scrollChapterId = chapterIdForScroll();

  function chapterIdForScroll() {
    var btn = document.querySelector('.listen-btn[data-audio]');
    if (btn) {
      var fromAudio = String(btn.getAttribute('data-audio') || '').match(/([^/?#]+)\.mp3/i);
      if (fromAudio) return fromAudio[1];
    }
    var path = (window.location.pathname || '').split('/').pop() || '';
    path = path.replace(/\.html$/i, '');
    return path || 'memoir';
  }

  function sendMemoirEvent(name, params) {
    if (typeof window.memoirTrack === 'function') {
      window.memoirTrack(name, params);
      return;
    }
    var payload = params || {};
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, payload);
      return;
    }
    window.dataLayer = window.dataLayer || [];
    var entry = { event: name };
    var key;
    for (key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) entry[key] = payload[key];
    }
    window.dataLayer.push(entry);
  }

  function trackScrollDepth(p) {
    var pct = p >= 0.995 ? 100 : p * 100;
    for (var i = 0; i < scrollMarks.length; i++) {
      var mark = scrollMarks[i];
      if (!scrollFired[mark] && pct >= mark) {
        scrollFired[mark] = true;
        sendMemoirEvent('memoir_scroll_depth', {
          percent: mark,
          chapter_id: scrollChapterId
        });
      }
    }
  }

  function paintProgress() {
    if (!bar) return;
    var max = docEl.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
    trackScrollDepth(p);
  }
  if (bar) {
    window.addEventListener('scroll', paintProgress, { passive: true });
    window.addEventListener('resize', paintProgress);
    window.addEventListener('load', paintProgress);
    paintProgress();
  }

  var SELECTOR = '.spotlight, .pullquote, .prose h2, .part-card, .plate';

  /* ---- reduced motion or no observer: show everything ---- */
  if (reduce || !('IntersectionObserver' in window)) {
    var fallback = document.querySelectorAll(SELECTOR);
    for (var f = 0; f < fallback.length; f++) fallback[f].classList.add('is-visible');
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        entries[i].target.classList.add('is-visible');
        io.unobserve(entries[i].target);
      }
    }
  }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });

  var targets = document.querySelectorAll(SELECTOR);
  for (var k = 0; k < targets.length; k++) io.observe(targets[k]);
})();
