const CACHE_NAME = 'my-cache-v1';

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Кешування початкових ресурсів успішне');
            return cache.addAll([
                'index.html',
                'secondPage.html',
                'thirdPage.html',
                'style.css', 
                'index.js'
            ]);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.match(event.request).then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('Ресурс взято з кешу:', event.request.url);
                    // Оновлення кешу
                    fetch(event.request).then((networkResponse) => {
                        cache.put(event.request, networkResponse.clone());
                    }).catch(() => {
                        console.warn('Не вдалося оновити кеш для:', event.request.url);
                    });
                    return cachedResponse;
                }

                // Запит до мережі, якщо кешу немає
                return fetch(event.request).then((networkResponse) => {
                    console.log('Ресурс взято з мережі:', event.request.url);
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                }).catch(() => {
                    console.error('Мережа недоступна. Використання кешу неможливе для:', event.request.url);
                    return new Response('Network error: Unable to fetch resource.', {
                        status: 503,
                        statusText: 'Service Unavailable'
                    });
                });
            });
        })
    );
});