/*
	We only need to modify 2 places:
		1. cacheName
		2. filesToCache
*/

// register service worker
if ('serviceWorker' in navigator) { // if service worker API is available
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/levelgame/sw.js', {scope: '/levelgame/'}).then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
      });
  });
}

var cacheName = 'levelGame-v2'; /* Name your cache  */
var filesToCache = [				 /* Files you wan to store in cache */
  '/levelgame/',
  '/levelgame/index.html',
  '/levelgame/sw.js',
  '/levelgame/manifest.json',
  '/levelgame/audio/coin.mp3',
  '/levelgame/audio/coin.ogg',
  '/levelgame/audio/jump.mp3',
  '/levelgame/audio/jump.ogg',
  '/levelgame/audio/kill-enemy.mp3',
  '/levelgame/audio/kill-enemy.ogg',
  '/levelgame/data/level1.tmx',
  '/levelgame/data/sprites.json',
  '/levelgame/images/icons/icon-72x72.png',
  '/levelgame/images/icons/icon-96x96.png',
  '/levelgame/images/icons/icon-128x128.png',
  '/levelgame/images/icons/icon-144x144.png',
  '/levelgame/images/icons/icon-152x152.png',
  '/levelgame/images/icons/icon-192x192.png',
  '/levelgame/images/icons/icon-384x384.png',
  '/levelgame/images/icons/icon-512x512.png',
  '/levelgame/images/standalone images/bee.png',
  '/levelgame/images/standalone images/blue-alien.png',
  '/levelgame/images/standalone images/bullet.png',
  '/levelgame/images/standalone images/ghost.png',
  '/levelgame/images/standalone images/gray-alien.png',
  '/levelgame/images/standalone images/player.png',
  '/levelgame/images/standalone images/power.png',
  '/levelgame/images/standalone images/red-alien.png',
  '/levelgame/images/standalone images/yellow-alien.png',
  '/levelgame/images/sprites.png',
  '/levelgame/images/spritesheet.png',
  '/levelgame/lib/quintus_2d.js',
  '/levelgame/lib/quintus_anim.js',
  '/levelgame/lib/quintus_audio.js',
  '/levelgame/lib/quintus_input.js',
  '/levelgame/lib/quintus_scenes.js',
  '/levelgame/lib/quintus_sprites.js',
  '/levelgame/lib/quintus_tmx.js',
  '/levelgame/lib/quintus_touch.js',
  '/levelgame/lib/quintus_ui.js',
  '/levelgame/lib/quintus.js',
  '/levelgame/scripts/enemy.js',
  '/levelgame/scripts/game.js',
  '/levelgame/scripts/player.js',
];


// install service worker 
self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

// use cached assets: fetching service worker
self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

