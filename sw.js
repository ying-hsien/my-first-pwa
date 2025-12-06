const CACHE_NAME = 'pwa-hello-world-v1';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon.png'
];

// 1. 安裝 Service Worker 並快取檔案
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('正在快取檔案...');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// 2. 攔截網路請求：有快取就用快取，沒快取才上網抓
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
