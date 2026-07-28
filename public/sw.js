const CACHE_NAME = "duts-receitas-v1";
const OFFLINE_URL = "/offline.html";

const PRECACHE_URLS = [
  "/dezreceitas",
  OFFLINE_URL,
  "/icon/icon-192.png",
  "/icon/icon-512.png",
  "/receitas/bolo_no_pote.webp",
  "/receitas/brigadeiro_gurmet.webp",
  "/receitas/brownie.webp",
  "/receitas/cookies.webp",
  "/receitas/geladinho.webp",
  "/receitas/palha_italiana.webp",
  "/receitas/pao_de_mel.webp",
  "/receitas/pudin.webp",
  "/receitas/torta_no_pote.webp",
  "/receitas/trufas.webp",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("duts-receitas-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const copy = response.clone();
            void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request, { ignoreSearch: true });
          return cachedPage || caches.match(OFFLINE_URL);
        }),
    );
    return;
  }

  if (["image", "style", "script", "font"].includes(request.destination)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const networkResponse = fetch(request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              void caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
            }
            return response;
          })
          .catch((error) => {
            if (cachedResponse) return cachedResponse;
            throw error;
          });

        return cachedResponse || networkResponse;
      }),
    );
  }
});
