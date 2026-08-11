/* ─────────────────────────────────────────────────────────────
   SHELL 2026 — Service Worker
   Guarda o máximo possível no dispositivo da Shelcia:
   · a aplicação inteira (single-file) → abre mesmo sem internet
   · todas as fotos/vídeos/cartazes já vistos → carregam instantaneamente
   · as fontes → o visual mantém-se offline
───────────────────────────────────────────────────────────── */
const SHELL = "shell2026-shell-v6";
const MEDIA = "shell2026-media-v6";
const MAX_MEDIA = 400; // limite de mídias guardadas (as mais antigas saem)

const SHELL_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/icon-512.png",
  "/neural-puzzle.html",
  "/images/portal-bg.jpg",
  "/images/crystal-texture.jpg",
  "/images/sky-emotional.jpg",
  "/images/architect-blueprint.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL)
      .then((cache) => cache.addAll(SHELL_ASSETS).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((k) => k !== SHELL && k !== MEDIA).map((k) => caches.delete(k)))
      )
      .then(() => self.clients.claim())
  );
});

async function trimMedia() {
  const cache = await caches.open(MEDIA);
  const keys = await cache.keys();
  if (keys.length > MAX_MEDIA) {
    await Promise.all(keys.slice(0, keys.length - MAX_MEDIA).map((k) => cache.delete(k)));
  }
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  let url;
  try {
    url = new URL(req.url);
  } catch {
    return;
  }

  // Mídias do Cloudinary — cache-first: o que ela já viu carrega num instante.
  if (url.hostname.endsWith("res.cloudinary.com")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req)
            .then((res) => {
              if (res.ok || res.type === "opaque") {
                const copy = res.clone();
                caches.open(MEDIA).then((cache) => {
                  cache.put(req, copy);
                  trimMedia();
                });
              }
              return res;
            })
            .catch(() => hit)
      )
    );
    return;
  }

  // Fontes — guardadas para o visual sobreviver offline.
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(SHELL).then((cache) => cache.put(req, copy));
            }
            return res;
          })
      )
    );
    return;
  }

  // Navegação — rede primeiro, mas a app instalada abre sempre (cache).
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((cache) => cache.put("/", copy));
          return res;
        })
        .catch(() => caches.match("/"))
    );
    return;
  }

  // Restantes ficheiros locais — cache-first.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(SHELL).then((cache) => cache.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});
