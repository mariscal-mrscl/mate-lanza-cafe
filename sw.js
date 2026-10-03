// LANZA Lab: guarda la app en la compu para que abra y funcione sin internet.
// Las páginas se piden primero a la red (así llegan las actualizaciones) y, si no hay conexión, salen de lo guardado.
// Librerías, tipografías, íconos y el video de muestra salen de lo guardado (no cambian).
// Al publicar archivos nuevos que no son páginas, subí VERSION para que se vuelvan a bajar.
const VERSION = "lanza-lab-v2";
const PRECARGA = [
  "./", "index.html", "LANZA_TD_LAB.html", "LANZA_ASCII_LAB.html", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "icons/favicon-32.png",
  "vendor/tf.min.js", "vendor/mp4-muxer.js",
  "vendor/fonts/host-grotesk-latin-400-normal.woff2", "vendor/fonts/host-grotesk-latin-500-normal.woff2",
  "vendor/fonts/host-grotesk-latin-600-normal.woff2", "vendor/fonts/jetbrains-mono-latin-wght-normal.woff2",
  "muestras/paraASCII-001.mp4"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => Promise.all(PRECARGA.map(u => c.add(new Request(u, {cache: "reload"})).catch(() => {}))))
    .then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener("message", e => { if (e.data === "estado") caches.open(VERSION).then(c => c.keys()).then(ks => e.source.postMessage({guardados: ks.length, total: PRECARGA.length})); });

const esPagina = req => req.mode === "navigate" || req.destination === "document" || /\.html?$|\/$/.test(new URL(req.url).pathname);

self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET" || req.headers.has("range")) return;
  const url = new URL(req.url); if (!/^https?:$/.test(url.protocol)) return;
  if (url.origin === location.origin && esPagina(req)){   // páginas: red primero, guardado si no hay conexión
    e.respondWith(fetch(req).then(r => { if (r.ok){ const c = r.clone(); caches.open(VERSION).then(k => k.put(req, c)); } return r; })
      .catch(() => caches.match(req, {ignoreSearch: true}).then(r => r || caches.match("index.html"))));
    return; }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {   // el resto: lo guardado primero; lo nuevo se guarda al pasar
    if (r.ok || r.type === "opaque"){ const c = r.clone(); caches.open(VERSION).then(k => k.put(req, c)); } return r; })));
});
