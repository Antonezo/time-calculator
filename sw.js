const CACHE_NAME = 'time-calc-v1';
const ASSETS = [
  'index.html',
  'manifest.json',
  'sw.js',
  'icon.png'
];

// Установка и кэширование ресурсов
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Активация и очистка старого кэша
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if (key !== CACHE_NAME) return caches.delete(key); })
    ))
  );
});

// Перехват запросов (работа офлайн)
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cachedResponse => cachedResponse || fetch(e.request))
  );
});