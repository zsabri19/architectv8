/* ============================================================
   Memoir GA4 custom events on the stream already configured
   in the page. Sends gtag('event', ...) when gtag exists,
   otherwise queues a dataLayer entry. Does not load a tag
   or call gtag('config') — pageviews stay on the existing ID.
   ============================================================ */
(function (w) {
  'use strict';
  if (typeof w.memoirTrack === 'function') return;

  w.memoirTrack = function (name, params) {
    var payload = params || {};
    if (typeof w.gtag === 'function') {
      w.gtag('event', name, payload);
      return;
    }
    w.dataLayer = w.dataLayer || [];
    var entry = { event: name };
    var key;
    for (key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) entry[key] = payload[key];
    }
    w.dataLayer.push(entry);
  };
})(window);
