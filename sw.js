// Service worker: la app abre sin conexión. Los datos los sincroniza Firestore por su cuenta.
const CACHE = "tuestes-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./firebase-config.js",
  "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Firebase (datos y login) va siempre directo a la red
  if (/googleapis\.com$|firebaseapp\.com$|identitytoolkit|securetoken/.test(url.hostname)) return;
  if (url.origin === location.origin) {
    // archivos propios: primero la red (para recibir actualizaciones), si no hay, la copia guardada
    e.respondWith(fetch(req).then(res => {
      const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res;
    }).catch(() => caches.match(req).then(r => r || caches.match("./index.html"))));
    return;
  }
  // librerías y fuentes externas: la copia guardada primero
  if (/gstatic\.com$|cdnjs\.cloudflare\.com$|fonts\.googleapis\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
      if (res.ok || res.type === "opaque") { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
      return res;
    })));
  }
});
