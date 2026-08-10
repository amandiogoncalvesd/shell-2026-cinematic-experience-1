const CACHE_NAME = "shell-the-line-cache-v2";
const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/src/main.tsx",
  "/src/App.tsx",
  "/src/index.css",
  "/manifest.json",
  "/icon.svg"
];

// Installation phase
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] caching shell assets");
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activation phase
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((allKeys) => {
      return Promise.all(
        allKeys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("[Service Worker] clearing stale cache", key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptor strategy
self.addEventListener("fetch", (event) => {
  const reqUrl = new URL(event.request.url);

  // Leave API endpoints to bypass offline cache completely (always fetch current DB info)
  if (reqUrl.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Handle media files from Cloudinary or external networks (Images / Audio track cached once requested)
  if (
    reqUrl.hostname.includes("cloudinary.com") ||
    event.request.destination === "image" ||
    event.request.destination === "font"
  ) {
    event.respondWith(
      caches.open("shell-media-assets").then((mediaCache) => {
        return mediaCache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          return fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              mediaCache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          }).catch(() => caches.match("/icon.svg"));
        });
      })
    );
    return;
  }

  // Default SPA handler with local cache-first fallbacks
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).catch(() => {
        // Return index.html in place of SPA fallback if unreachable
        if (event.request.mode === "navigate") {
          return caches.match("/");
        }
      });
    })
  );
});
