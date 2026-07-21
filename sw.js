// sw.js
// Ini adalah Service Worker sederhana agar Chrome mendeteksi web ini sebagai Aplikasi Asli.

//self.addEventListener('install', (e) => {console.log('[Service Worker] Terinstal');self.skipWaiting();});

//self.addEventListener('activate', (e) => {console.log('[Service Worker] Aktif');});

//self.addEventListener('fetch', (e) => {// Membiarkan aplikasi mengambil data dari internet secara normal});


//KODE BARU MODE OFFLINE
// Nama cache untuk Maryn POS
// Ganti nama/versi cache agar browser mengambil file terbaru
const CACHE_NAME = 'Maryn-cache-v2';

const urlsToCache = [
    '/',
    '/index.html',
    '/login.html',      // Tambahkan halaman login
    '/login.png',       // Tambahkan gambar logo yang ada di halaman login
    // '/app.js',       // Masukkan file JS eksternal jika ada
];

// Event Install: Menyimpan file ke Cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Event Activate: Menghapus cache versi lama
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Event Fetch: Mengambil dari cache atau jaringan
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});