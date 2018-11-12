self.addEventListener('install', function(event) {
  event.waitUntil(//指示安装进度
    caches.open('v1').then(function(cache) {//当promise解析以后浏览器就知道安装完成了，如果失败，浏览器就废弃这个service worker
      return cache.addAll([
        './',
        './public/index.html',
        './public/favicon.ico',
        './src/App.js',
        './src/App.css',
        './src/data.js',
        './src/GoogleMap.js',
        './src/index.js',
        './src/index.css',
        './src/Info.js',
        './src/Location.js',
      ]);
    })
  );
});

//如何使用cache获取到的响应
self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        caches.open('v1').then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('./src/logo.svg');
      });
    }
  }));
});