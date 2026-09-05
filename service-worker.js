const CACHE = 'yiang-health-v1.3';
const ASSETS = [
  './','./index.html','./planner.html','./dashboard.html','./destinations.html',
  './city.html','./pricing.html','./safety.html','./terms.html','./privacy.html',
  './style.css','./script.js','./manifest.json',
  './modules/config.js','./modules/data.js','./modules/safety.js','./modules/i18n.js',
  './modules/wellness.js','./modules/access.js','./modules/destinations.js','./modules/planner.js',
  './data/pilots.json','./data/cities.json','./data/services.json'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then(cached => {
    const fetched = fetch(e.request).then(res => {
      if (res && res.status === 200 && res.type === 'basic') {
        const clone = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
      }
      return res;
    }).catch(() => cached);
    return cached || fetched;
  }));
});
