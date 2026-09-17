/* ============================================================
   Memoir listen plate — pre-rendered Fish.audio (Zeeshan).
   Follows the Spoken Script. Does not scrape speak/skip rules
   from HTML. Scrolls the spoken line while playing.
   ============================================================ */
(function () {
  'use strict';

  var btn = document.querySelector('.listen-btn');
  if (!btn) return;

  var src = btn.getAttribute('data-audio');
  var title = btn.getAttribute('data-title') || 'This chapter';
  var nextHref = btn.getAttribute('data-next') || '';
  if (!src) return;

  var SPEEDS = [0.75, 1, 1.25, 1.5, 2];
  var SPEED_KEY = 'memoir-audio-speed';
  var VOL_KEY = 'memoir-audio-volume';
  var POS_PREFIX = 'memoir-audio-pos:';
  var FOLLOW_KEY = 'memoir-audio-follow';
  var speed = 1;
  var volume = 1;
  var follow = true;
  try {
    var savedSpeed = parseFloat(localStorage.getItem(SPEED_KEY));
    if (SPEEDS.indexOf(savedSpeed) !== -1) speed = savedSpeed;
    var savedVol = parseFloat(localStorage.getItem(VOL_KEY));
    if (isFinite(savedVol) && savedVol >= 0 && savedVol <= 1) volume = savedVol;
    if (localStorage.getItem(FOLLOW_KEY) === '0') follow = false;
  } catch (e) { /* ignore */ }

  var audio = new Audio(src);
  audio.preload = 'metadata';
  audio.playbackRate = speed;
  audio.volume = volume;

  var bar = document.createElement('div');
  bar.className = 'audio-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Chapter audio player');
  bar.innerHTML =
    '<div class="audio-bar-glow" aria-hidden="true"></div>' +
    '<div class="audio-bar-inner">' +
      '<button type="button" class="audio-play" aria-label="Play or pause">' +
        '<span class="audio-play-ring" aria-hidden="true"></span>' +
        '<span class="audio-play-icon" aria-hidden="true">▶</span>' +
      '</button>' +
      '<div class="audio-info">' +
        '<span class="audio-kicker">Now reading</span>' +
        '<span class="audio-chapter"></span>' +
        '<p class="audio-line" hidden></p>' +
        '<div class="audio-progress-wrap" role="slider" aria-label="Position" tabindex="0" aria-valuemin="0">' +
          '<div class="audio-progress"></div>' +
        '</div>' +
        '<span class="audio-time">0:00 / 0:00</span>' +
      '</div>' +
      '<div class="audio-speeds" role="group" aria-label="Playback speed">' +
        '<span class="audio-speeds-label">Speed</span>' +
        speedChipsHtml() +
      '</div>' +
      '<div class="audio-controls">' +
        '<button type="button" class="audio-skip" data-skip="-15" aria-label="Back 15 seconds">−15</button>' +
        '<button type="button" class="audio-skip" data-skip="15" aria-label="Forward 15 seconds">+15</button>' +
        '<button type="button" class="audio-mute" aria-label="Mute">🔊</button>' +
        '<input type="range" class="audio-volume" min="0" max="1" step="0.05" aria-label="Volume" />' +
        '<button type="button" class="audio-follow" aria-pressed="true">Scroll</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(bar);
  if (/^[A-Za-z0-9._/-]+\.html$/.test(nextHref)) {
    var nextLink = document.createElement('a');
    nextLink.className = 'audio-next';
    nextLink.href = nextHref;
    nextLink.textContent = 'Next';
    var controls = bar.querySelector('.audio-controls');
    var followSlot = bar.querySelector('.audio-follow');
    if (controls && followSlot) controls.insertBefore(nextLink, followSlot);
  }

  audio.addEventListener('error', function () {
    btn.hidden = true;
    bar.classList.remove('visible');
    document.body.classList.remove('audio-visible', 'audio-playing');
  });

  var playBtn = bar.querySelector('.audio-play');
  var playIcon = bar.querySelector('.audio-play-icon');
  var chapterEl = bar.querySelector('.audio-chapter');
  var wrap = bar.querySelector('.audio-progress-wrap');
  var fill = bar.querySelector('.audio-progress');
  var timeEl = bar.querySelector('.audio-time');
  var muteBtn = bar.querySelector('.audio-mute');
  var volInput = bar.querySelector('.audio-volume');
  var followBtn = bar.querySelector('.audio-follow');
  var lineEl = bar.querySelector('.audio-line');
  chapterEl.textContent = title;
  volInput.value = String(volume);

  var reduceMotion = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var lastUserScroll = 0;
  var lastPersist = 0;
  var activeSeg = null;
  var segments = [];

  paintMute();
  paintSpeed();
  paintFollow();
  loadSpoken();

  function speedChipsHtml() {
    var html = '';
    for (var i = 0; i < SPEEDS.length; i++) {
      html +=
        '<button type="button" class="audio-speed" data-speed="' +
        SPEEDS[i] +
        '" aria-label="Play at ' +
        formatSpeed(SPEEDS[i]) +
        '">' +
        formatSpeed(SPEEDS[i]) +
        '</button>';
    }
    return html;
  }

  function formatSpeed(v) {
    return (v === 1 ? '1' : String(v)) + '×';
  }

  function formatTime(sec) {
    if (!isFinite(sec) || sec < 0) return '0:00';
    var m = Math.floor(sec / 60);
    var s = Math.floor(sec % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  function posKey() {
    return POS_PREFIX + src;
  }

  function setPlaying(on) {
    playIcon.textContent = on ? '❚❚' : '▶';
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.textContent = on ? 'Pause' : 'Listen';
    document.body.classList.toggle('audio-playing', on);
    bar.classList.toggle('is-playing', on);
  }

  function showBar() {
    bar.classList.add('visible');
    document.body.classList.add('audio-visible');
  }

  function paintMute() {
    var muted = audio.muted || audio.volume === 0;
    muteBtn.textContent = muted ? '🔇' : '🔊';
    muteBtn.setAttribute('aria-pressed', muted ? 'true' : 'false');
    muteBtn.setAttribute('aria-label', muted ? 'Unmute' : 'Mute');
  }

  function paintSpeed() {
    var chips = bar.querySelectorAll('.audio-speed');
    for (var i = 0; i < chips.length; i++) {
      var v = parseFloat(chips[i].getAttribute('data-speed'));
      var on = v === speed;
      chips[i].setAttribute('aria-pressed', on ? 'true' : 'false');
      chips[i].classList.toggle('is-active', on);
    }
  }

  function paintFollow() {
    followBtn.setAttribute('aria-pressed', follow ? 'true' : 'false');
    followBtn.textContent = follow ? 'Scroll' : 'Manual';
    followBtn.setAttribute(
      'aria-label',
      follow ? 'Stop scrolling with the voice' : 'Scroll with the voice'
    );
  }

  function toggle() {
    showBar();
    if (audio.paused) {
      audio.play().then(function () {
        setPlaying(true);
        lastUserScroll = 0;
        syncFollow(true);
      }).catch(function () {});
    } else {
      audio.pause();
      setPlaying(false);
    }
  }

  function skip(delta) {
    if (!audio.duration) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
    syncFollow(true);
  }

  function applySpeed(next) {
    speed = next;
    audio.playbackRate = speed;
    paintSpeed();
    try { localStorage.setItem(SPEED_KEY, String(speed)); } catch (e) { /* ignore */ }
  }

  function cycleSpeed(dir) {
    var i = SPEEDS.indexOf(speed);
    if (i < 0) i = 2;
    applySpeed(SPEEDS[(i + dir + SPEEDS.length) % SPEEDS.length]);
  }

  function setVolume(v) {
    volume = Math.max(0, Math.min(1, v));
    audio.volume = volume;
    if (volume > 0) audio.muted = false;
    volInput.value = String(volume);
    paintMute();
    try { localStorage.setItem(VOL_KEY, String(volume)); } catch (e) { /* ignore */ }
  }

  function toggleMute() {
    if (audio.muted || audio.volume === 0) {
      audio.muted = false;
      if (audio.volume === 0) setVolume(volume > 0 ? volume : 0.8);
    } else {
      audio.muted = true;
    }
    paintMute();
  }

  function seekFromEvent(e) {
    if (!audio.duration) return;
    var r = wrap.getBoundingClientRect();
    var x = (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX) - r.left;
    audio.currentTime = Math.max(0, Math.min(1, x / r.width)) * audio.duration;
    syncFollow(true);
  }

  function restorePosition() {
    if (!audio.duration) return;
    try {
      var saved = parseFloat(localStorage.getItem(posKey()));
      if (isFinite(saved) && saved > 3 && saved < audio.duration - 4) {
        audio.currentTime = saved;
      }
    } catch (e) { /* ignore */ }
  }

  function persistPosition(force) {
    if (!audio.duration) return;
    var now = Date.now();
    if (!force && now - lastPersist < 1000) return;
    lastPersist = now;
    try {
      if (audio.currentTime < 3 || audio.currentTime > audio.duration - 4) {
        localStorage.removeItem(posKey());
      } else {
        localStorage.setItem(posKey(), String(audio.currentTime));
      }
    } catch (e) { /* ignore */ }
  }

  function paintAria() {
    if (!wrap) return;
    var max = audio.duration && isFinite(audio.duration) ? Math.floor(audio.duration) : 0;
    wrap.setAttribute('aria-valuemax', String(max));
    wrap.setAttribute('aria-valuenow', String(Math.floor(audio.currentTime || 0)));
  }

  function normalize(s) {
    return String(s || '')
      .replace(/[“”"‘’']/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function spokenJsSrc() {
    return src.replace(/\.mp3(\?.*)?$/i, '.spoken.js');
  }

  function spokenJsonSrc() {
    return src.replace(/\.mp3(\?.*)?$/i, '.spoken.json');
  }

  function applySpoken(data) {
    segments = data ? bindArtifact(data) : bindFromDom();
    if (!audio.paused) syncFollow(true);
  }

  function loadSpokenScript() {
    window.__MEMOIR_SPOKEN__ = null;
    var s = document.createElement('script');
    s.src = spokenJsSrc();
    s.onload = function () {
      var data = window.__MEMOIR_SPOKEN__;
      window.__MEMOIR_SPOKEN__ = null;
      if (s.parentNode) s.parentNode.removeChild(s);
      applySpoken(data);
    };
    s.onerror = function () {
      if (s.parentNode) s.parentNode.removeChild(s);
      applySpoken(null);
    };
    document.head.appendChild(s);
  }

  function loadSpoken() {
    if (window.fetch) {
      fetch(spokenJsonSrc()).then(function (r) {
        if (!r.ok) throw new Error('spoken json');
        return r.json();
      }).then(applySpoken).catch(loadSpokenScript);
      return;
    }
    loadSpokenScript();
  }

  function collectSpokenEls() {
    var out = [];
    var prose = document.querySelector('.prose');
    if (!prose) return out;
    var skip = '.endorsement, .pullquote, figure, aside, .scrapbook-wall, .scrapbook-note, .pyr-playbook, .pyr-playbooks, .plate, .en-quote, .en-eyebrow, .en-body, .en-attr';
    var nodes = prose.querySelectorAll('p, h2');
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest(skip)) continue;
      if (el.classList.contains('en-quote') || el.classList.contains('en-eyebrow')) continue;
      out.push(el);
    }
    return out;
  }

  function findHighlightEl(marks) {
    if (!marks || !marks.length) return null;
    for (var m = 0; m < marks.length; m++) {
      var role = marks[m].role;
      var sel = role === 'spotlight' ? '.spotlight .quote'
        : role === 'epigraph' ? '.epigraph'
        : '.pullquote';
      var els = document.querySelectorAll(sel);
      var want = normalize(marks[m].text);
      for (var i = 0; i < els.length; i++) {
        var hay = normalize(els[i].textContent);
        if (!want || hay.indexOf(want.slice(0, 40)) !== -1 || want.indexOf(hay.slice(0, 40)) !== -1) {
          return els[i];
        }
      }
    }
    return null;
  }

  function lineKey(s) {
    return normalize(s).replace(/\.+$/, '');
  }

  function elKind(el) {
    return el && el.tagName === 'H2' ? 'h2' : 'p';
  }

  function takeSpokenEl(spec, els, used) {
    if (spec.kind === 'title') return document.querySelector('.chapter-head h1');
    var want = spec.kind === 'h2' ? 'h2' : 'p';
    var needle = lineKey(spec.text);
    var pass, i, hay;
    for (pass = 0; pass < 3; pass++) {
      for (i = 0; i < els.length; i++) {
        if (used[i] || elKind(els[i]) !== want) continue;
        hay = lineKey(els[i].textContent);
        if (pass === 0 && needle && hay === needle) {
          used[i] = true;
          return els[i];
        }
        if (pass === 1 && needle && hay &&
            (hay.indexOf(needle.slice(0, 48)) !== -1 || needle.indexOf(hay.slice(0, 48)) !== -1)) {
          used[i] = true;
          return els[i];
        }
        if (pass === 2) {
          used[i] = true;
          return els[i];
        }
      }
    }
    return null;
  }

  function bindArtifact(data) {
    var els = collectSpokenEls();
    var heading = document.querySelector('.chapter-head h1');
    var list = data.segments || [];
    var used = [];
    var nodes = [];
    for (var i = 0; i < list.length; i++) {
      var spec = list[i];
      var el = spec.kind === 'title' ? heading : takeSpokenEl(spec, els, used);
      nodes.push({
        el: el || null,
        words: spec.words || 1,
        kind: spec.kind,
        quote: findHighlightEl(spec.highlights),
        line: spec.highlights && spec.highlights[0] ? spec.highlights[0].text : '',
        start: spec.start,
        end: spec.end
      });
    }
    return stampTimes(nodes);
  }

  function bindFromDom() {
    var heading = document.querySelector('.chapter-head h1');
    var els = collectSpokenEls();
    var nodes = [];
    if (heading) {
      nodes.push({ el: heading, words: 3, kind: 'title', quote: document.querySelector('.epigraph'), line: '' });
    }
    for (var i = 0; i < els.length; i++) {
      var words = (els[i].textContent || '').trim().split(/\s+/).length;
      nodes.push({ el: els[i], words: Math.max(1, words), kind: els[i].tagName === 'H2' ? 'h2' : 'p', quote: null, line: '' });
    }
    return stampTimes(nodes);
  }

  function stampTimes(nodes) {
    var ready = nodes.length > 0;
    var t;
    for (t = 0; t < nodes.length; t++) {
      if (!isFinite(nodes[t].start) || !isFinite(nodes[t].end)) {
        ready = false;
        break;
      }
    }
    if (!ready) {
      var total = 0;
      for (t = 0; t < nodes.length; t++) total += nodes[t].words;
      var acc = 0;
      for (var n = 0; n < nodes.length; n++) {
        nodes[n].start = total ? acc / total : 0;
        acc += nodes[n].words;
        nodes[n].end = total ? acc / total : 1;
      }
    }
    for (t = 0; t < nodes.length; t++) {
      if (nodes[t].quote && !nodes[t].quote._seekBound) {
        nodes[t].quote.classList.add('can-seek');
        nodes[t].quote.setAttribute('title', 'Play this line');
        nodes[t].quote.addEventListener('click', seekToSegment(nodes[t]));
        nodes[t].quote._seekBound = true;
      }
    }
    return nodes;
  }

  function seekToSegment(seg) {
    return function (e) {
      if (!audio.duration) return;
      if (e.target && e.target.closest && e.target.closest('a, button')) return;
      if (window.getSelection && String(window.getSelection())) return;
      showBar();
      audio.currentTime = Math.max(0, seg.start * audio.duration + 0.05);
      if (audio.paused) {
        audio.play().then(function () { setPlaying(true); }).catch(function () {});
      }
      lastUserScroll = 0;
      syncFollow(true);
    };
  }

  function segmentAt(time) {
    if (!audio.duration || !segments.length) return null;
    var frac = Math.max(0, Math.min(0.999, time / audio.duration));
    for (var i = 0; i < segments.length; i++) {
      if (frac >= segments[i].start && frac < segments[i].end) return segments[i];
    }
    return segments[segments.length - 1];
  }

  function toggleFollow() {
    follow = !follow;
    paintFollow();
    try { localStorage.setItem(FOLLOW_KEY, follow ? '1' : '0'); } catch (e) { /* ignore */ }
    if (follow) {
      lastUserScroll = 0;
      syncFollow(true);
    }
  }

  function scrollToLine(el) {
    if (!el || reduceMotion) return;
    var html = document.documentElement;
    var prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    var barH = bar.classList.contains('visible') ? (bar.offsetHeight || 132) : 0;
    var head = document.querySelector('.book-head');
    var headH = head ? head.offsetHeight : 0;
    var rect = el.getBoundingClientRect();
    var viewTop = headH + 24;
    var viewBottom = window.innerHeight - barH - 24;
    var viewMid = (viewTop + viewBottom) / 2;
    var elMid = rect.top + Math.min(rect.height * 0.35, 80);
    var top = window.pageYOffset + (elMid - viewMid);
    window.scrollTo(0, Math.max(0, top));
    html.style.scrollBehavior = prev;
  }

  function clearListening() {
    var lit = document.querySelectorAll('.is-listening');
    for (var i = 0; i < lit.length; i++) lit[i].classList.remove('is-listening');
    lineEl.hidden = true;
    lineEl.textContent = '';
    activeSeg = null;
  }

  function syncFollow(forceScroll) {
    var seg = segmentAt(audio.currentTime);
    if (!seg) return;
    var changed = seg !== activeSeg;
    if (!changed && !forceScroll) return;
    if (changed && activeSeg) {
      if (activeSeg.el) activeSeg.el.classList.remove('is-listening');
      if (activeSeg.quote) {
        activeSeg.quote.classList.remove('is-listening');
        var spot = activeSeg.quote.closest('.spotlight');
        if (spot) spot.classList.remove('is-listening');
      }
    }
    activeSeg = seg;
    if (seg.el) seg.el.classList.add('is-listening');
    if (seg.quote) {
      seg.quote.classList.add('is-listening');
      var box = seg.quote.closest('.spotlight');
      if (box) box.classList.add('is-listening');
      lineEl.textContent = (seg.line || seg.quote.textContent || '').replace(/\s+/g, ' ').trim();
      lineEl.hidden = false;
    } else if (seg.el && seg.kind !== 'title') {
      var preview = (seg.el.textContent || '').replace(/\s+/g, ' ').trim();
      if (preview.length > 110) preview = preview.slice(0, 108) + '…';
      lineEl.textContent = preview;
      lineEl.hidden = false;
    } else {
      lineEl.hidden = true;
      lineEl.textContent = '';
    }
    var userHeld = Date.now() - lastUserScroll < 4000;
    if (follow && !audio.paused && (forceScroll || !userHeld)) {
      scrollToLine(seg.el || seg.quote);
    }
  }

  function noteUserScroll() {
    lastUserScroll = Date.now();
  }

  btn.addEventListener('click', toggle);
  playBtn.addEventListener('click', toggle);
  var speedChips = bar.querySelectorAll('.audio-speed');
  for (var sc = 0; sc < speedChips.length; sc++) {
    speedChips[sc].addEventListener('click', function () {
      applySpeed(parseFloat(this.getAttribute('data-speed')));
    });
  }
  followBtn.addEventListener('click', toggleFollow);
  muteBtn.addEventListener('click', toggleMute);
  window.addEventListener('wheel', noteUserScroll, { passive: true });
  window.addEventListener('touchmove', noteUserScroll, { passive: true });
  document.addEventListener('keydown', function (e) {
    if (e.code === 'PageDown' || e.code === 'PageUp' || e.code === 'Home' || e.code === 'End') {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      noteUserScroll();
    }
  });
  volInput.addEventListener('input', function () {
    setVolume(parseFloat(volInput.value));
  });

  var skips = bar.querySelectorAll('.audio-skip');
  for (var i = 0; i < skips.length; i++) {
    skips[i].addEventListener('click', function () {
      showBar();
      skip(parseFloat(this.getAttribute('data-skip')));
    });
  }

  wrap.addEventListener('click', seekFromEvent);
  wrap.addEventListener('keydown', function (e) {
    if (e.code === 'ArrowLeft') { e.preventDefault(); skip(-15); }
    if (e.code === 'ArrowRight') { e.preventDefault(); skip(15); }
    if (e.code === 'Home') { e.preventDefault(); audio.currentTime = 0; syncFollow(true); }
    if (e.code === 'End' && audio.duration) { e.preventDefault(); audio.currentTime = audio.duration; }
  });

  audio.addEventListener('timeupdate', function () {
    if (!audio.duration) return;
    fill.style.width = ((audio.currentTime / audio.duration) * 100).toFixed(2) + '%';
    timeEl.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
    paintAria();
    persistPosition(false);
    syncFollow();
  });
  audio.addEventListener('loadedmetadata', function () {
    timeEl.textContent = '0:00 / ' + formatTime(audio.duration);
    restorePosition();
    paintAria();
    if (audio.currentTime > 0) {
      timeEl.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
      fill.style.width = ((audio.currentTime / audio.duration) * 100).toFixed(2) + '%';
    }
  });
  audio.addEventListener('playing', function () {
    setPlaying(true);
    syncFollow(true);
  });
  audio.addEventListener('pause', function () {
    persistPosition(true);
    if (!audio.ended) setPlaying(false);
  });
  audio.addEventListener('ended', function () {
    setPlaying(false);
    audio.currentTime = 0;
    fill.style.width = '0%';
    timeEl.textContent = '0:00 / ' + formatTime(audio.duration);
    paintAria();
    clearListening();
    try { localStorage.removeItem(posKey()); } catch (e) { /* ignore */ }
  });
  audio.addEventListener('volumechange', paintMute);

  document.addEventListener('keydown', function (e) {
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (!bar.classList.contains('visible')) return;
    if (e.code === 'Space') { e.preventDefault(); toggle(); }
    if (e.code === 'ArrowLeft') skip(-15);
    if (e.code === 'ArrowRight') skip(15);
    if (e.key === '[') cycleSpeed(-1);
    if (e.key === ']') cycleSpeed(1);
    if (e.key === 'm' || e.key === 'M') toggleMute();
  });
})();
