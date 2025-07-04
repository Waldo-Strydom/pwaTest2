// self.addEventListener("install", e =>{
//      console.log("Hioijj")
//     e.waitUntil(
//         caches.open("static").then(cache =>{
//             console.log("Hi")
//             return cache.addAll(["./index.html", "./style.css", "./index.js", "./icons/apple-icon-180.png"])
//         })
//     );
// })

// self.addEventListener("fetch", e=>{
//     console.log(`Intercepting for: ${e.request.url}`)

//     e.respondWith(
//         caches.match(e.request).then(response=>{
//             return response || fetch(e.request);
//         })
//     )

// })



const CACHE_NAME = 'static-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.css',
  '/index.js',
  '/icons/apple-icon-180.png'
];

self.addEventListener("install", e => {
  console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", e => {
  console.log("[ServiceWorker] Activate");
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener("fetch", e => {
  console.log(`[ServiceWorker] Fetch: ${e.request.url}`);
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    }).catch(() => {
      // Optional: return fallback if offline
      if (e.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});