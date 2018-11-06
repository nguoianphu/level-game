/*
	We only need to modify 2 places:
		1. cacheName
		2. filesToCache
*/

// register service worker
if ('serviceWorker' in navigator) { // if service worker API is available
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
      });
  });
}

var cacheName = 'levelGame-v2'; /* Name your cache  */
var filesToCache = [				 /* Files you wan to store in cache */
  '/',
  '/index.html',
  '/audio/coin.mp3',
  '/audio/coin.ogg',
  '/audio/jump.mp3',
  '/audio/jump.ogg',
  '/audio/kill-enemy.mp3',
  '/audio/kill-enemy.ogg',
  '/data/level1.tmx',
  '/data/sprites.json',
  '/images/icons/icon-72x72.png',
  '/images/icons/icon-96x96.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-384x384.png',
  '/images/icons/icon-512x512.png',
  '/images/standalone images/bee.png',
  '/images/standalone images/blue-alien.png',
  '/images/standalone images/bullet.png',
  '/images/standalone images/ghost.png',
  '/images/standalone images/gray-alien.png',
  '/images/standalone images/player.png',
  '/images/standalone images/power.png',
  '/images/standalone images/red-alien.png',
  '/images/standalone images/yellow-alien.png',
  '/images/sprites.png',
  '/images/spritesheet.png',
  '/lib/quintus_2d.js',
  '/lib/quintus_anim.js',
  '/lib/quintus_audio.js',
  '/lib/quintus_input.js',
  '/lib/quintus_scenes.js',
  '/lib/quintus_sprites.js',
  '/lib/quintus_tmx.js',
  '/lib/quintus_touch.js',
  '/lib/quintus_ui.js',
  '/lib/quintus.js',
  '/scripts/enemy.js',
  '/scripts/game.js',
  '/scripts/player.js',
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

