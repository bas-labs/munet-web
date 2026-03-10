// =============================================================================
// MUNET Service Worker
// Basic caching strategy for static assets and offline fallback
// =============================================================================

const CACHE_NAME = 'munet-v1';
const OFFLINE_URL = '/offline.html';

// Static assets to cache on install
const STATIC_ASSETS = [
  '/',
  '/offline.html',
  '/favicon.svg',
];

// =============================================================================
// INSTALL EVENT - Cache static assets
// =============================================================================

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// =============================================================================
// ACTIVATE EVENT - Clean up old caches
// =============================================================================

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// =============================================================================
// FETCH EVENT - Caching strategies
// =============================================================================

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests
  if (url.origin !== location.origin) return;

  // Strategy based on request type
  if (isStaticAsset(url.pathname)) {
    // Cache-first for static assets (images, fonts, etc.)
    event.respondWith(cacheFirst(request));
  } else if (isAPIRequest(url.pathname)) {
    // Network-first for API calls
    event.respondWith(networkFirst(request));
  } else {
    // Stale-while-revalidate for navigation/pages
    event.respondWith(staleWhileRevalidate(request));
  }
});

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function isStaticAsset(pathname) {
  return /\.(js|css|png|jpg|jpeg|gif|webp|svg|woff|woff2|ttf|eot|ico)$/i.test(pathname);
}

function isAPIRequest(pathname) {
  return pathname.startsWith('/api/');
}

// Cache-first strategy (best for static assets)
async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }
  
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    console.log('[SW] Cache-first fetch failed:', error);
    return new Response('Offline', { status: 503 });
  }
}

// Network-first strategy (best for API calls)
async function networkFirst(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    return new Response(JSON.stringify({ error: 'Offline' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

// Stale-while-revalidate strategy (best for pages)
async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  
  const fetchPromise = fetch(request)
    .then((response) => {
      if (response.ok) {
        cache.put(request, response.clone());
      }
      return response;
    })
    .catch(async () => {
      // Return offline page for navigation requests
      if (request.mode === 'navigate') {
        return cache.match(OFFLINE_URL);
      }
      return new Response('Offline', { status: 503 });
    });

  return cached || fetchPromise;
}

// =============================================================================
// MESSAGE EVENT - Handle messages from main thread
// =============================================================================

self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'clearCache') {
    caches.delete(CACHE_NAME);
  }
});
