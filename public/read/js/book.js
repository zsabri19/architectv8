/* ============================================================
   From Exile to Transformation — shared reading motion.
   Two jobs only:
   1. Scale the gold reading-progress bar in the sticky book-head.
   2. Reveal section moments (spotlight / pullquote / h2 / part-card)
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
  function paintProgress() {
    if (!bar) return;
    var max = docEl.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
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
