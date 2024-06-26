self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open("pwa").then(function (cache) {
            return cache.addAll([
                "http://sijeko.animasikustudio.com/"
                // "http://sijeko.animasikustudio.com/assets/js/style.css",
                // "http://sijeko.animasikustudio.com/assets/js/script.js",
            ]);
        })
    );
});

self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.open("pwa").then(function (cache) {
            return cache.match(event.request).then(function (response) {
                cache.addAll([event.request.url]);

                if (response) {
                    return response;
                }

                return fetch(event.request);
            });
        })
    );
});