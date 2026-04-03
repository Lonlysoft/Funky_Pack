const CACHE_NAME = "v1";
const ASSETS = [
	"/",
	"/index.html",
	"/UI.css",
	"/UI__scheduleTable.css",
	"/style.css",
	"/gameTools.js",
	"/music.js",
	"/drawingTools.js",
	"/dialogs.js",
	"/maps_assets.js",
	"/controls__touch.js",
	"/controls.js",
	"/controls__gamepad.js",
	"/controls__keyBoard.js",
	"/char.js",
	"/char_assets.js",
	"/NPC__assets.js",
	"/items.js",
	"/items_assets.js",
	"/NPCs.js",
	"/maps.js",
	"/background.js",
	"/cenery.js",
	"/collisions.js",
	"/Waiter.js",
	"/inGameClock.js",
	"/jobs.js",
	"/main.js"
];

self.addEventListener("install", event=>{
	event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});