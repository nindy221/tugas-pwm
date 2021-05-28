var CACHE_NAME = 'my-site-cache-v4';
var urlsToCache = [
  '/',
  '/css/style.css',
  '/js/main.js',
  '/index.html',
  '/halaman2.html',
  '/listproduk.html',
  '/img/background1.jpg',
  '/img/background2.jpg',
  '/img/bodyscrub.jpg',
  '/img/maskerorganik.jpg',
  '/img/maskerrambut.jpg',
  '/img/oatmask.jpg',
  '/img/refill.jpg',
  '/fallback.json',
  '/img/tonerwajah.jpg'

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('In install service worker. Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});


self.addEventListener('fetch', function(event) {
    
  var request = event.request
  var url = new URL(request.url)

  //pisahkan request API dan Internal
  if(url.origin === location.origin) {
  event.respondWith(
      caches.match(request).then(function(response){
          return response || fetch(request)
      })
  )

  }else{
      event.respondWith(
          caches.open('producty-cache').then(function(cache){
              return fetch(request).then(function(LiveResponse){
                  cache.put(request, LiveResponse.clone())
                  return LiveResponse
              }).catch(function(){
                  return caches.match(request).then(function(response){
                      if(response) return response
                      return caches.match('/fallback.json')
                  })
              })
          })
      )

  }

});


self.addEventListener('activate', function(event) {

    var cacheAllowlist = ['pages-cache-v1', 'blog-posts-cache-v1'];
  
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.filter(function(cacheName){
              return cacheName != CACHE_NAME
          }).map(function(cacheName){
              return caches.delete(cacheName)
          })
        );
      })
    );
  });