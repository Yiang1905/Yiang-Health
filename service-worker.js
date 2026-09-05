/**
 * YIANG HEALTH - Basic Service Worker (PWA shell)
 * Caches core static assets for offline shell. Not a full offline app.
 */
const CACHE = 'yiang-health-v1';
const ASSETS = [
  './',
  './index.html',
  './planner.html',
  './destinations.html',
  './pricing.html',
  './safety.html',
  './terms.html',
  './privacy.html',
  './style.css',
  './script.js',
  './modules/data.js',
  './modules/safety.js',
  './modules/i18n.js',
  './modules/destinations.js',
  './modules/planner.js',
  './data/cities.json',
  './data/services.json',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request).then((response) => {
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => cached);
      return cached || fetched;
    })
  );
});
