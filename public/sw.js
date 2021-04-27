const cacheName = 'v1';

self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
  
    e.waitUntil(
      caches
        .open(cacheName)
        .then(cache => {
          console.log('Service Worker: Caching Files');
          cache.addAll([
              '/static/js/main.chunk.js',
              '/static/js/0.chunk.js',
              '/static/js/bundle.js',
              '/static/js/vendors~main.chunk.js',
              '/users',
              '/index.html','/'
          ]);
        })
        .then(() => self.skipWaiting())
    );
  });


// Call Fetch Event
self.addEventListener('fetch', e => {

  if(e.request.url === "http://localhost:3000/static/js/main.chunk.js"){
    e.waitUntil(
      self.registration.showNotification("hello",{
        body:"hello from noti"
      })
    )
  }

  if(!navigator.onLine){
    e.waitUntil(
      self.registration.showNotification("Internet",{
        body:"internet not working"
      })
    )
  }
    console.log('Service Worker: Fetching');
    e.respondWith(
        fetch(e.request)
          .then(res => {
            // Make copy/clone of response
            // if(!response || response.status !== 200 || response.type !== 'basic') {
            //   return response;
            // }
    
            const resClone = res.clone();
            // Open cahce
            caches.open(cacheName).then(cache => {
              // Add response to cache
              cache.put(e.request, resClone);
            });
            return res;
          })
          .catch(err => caches.match(e.request).then(res => res))
      );
    // if(!navigator.onLine){
        
    // } 
  });
  