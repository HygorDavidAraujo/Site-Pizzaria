// Service Worker - Pizzaria Paulista
// Versão: 1.0.0

const CACHE_NAME = 'pizzaria-paulista-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/pizzaria.html',
  '/cardapio.html',
  '/parceiros.html',
  '/contato.html',
  '/css/unified.css',
  '/css/inline-styles.css',
  '/css/fontello.css',
  '/js/jquery.js',
  '/js/optimized.js',
  '/js/inline-scripts.js',
  '/img/logo.png',
  '/img/logoModoClaro.png',
  '/img/logoModoEscuro.png'
];

// Instalação - cacheia os arquivos essenciais
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache aberto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativação - limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch - estratégia Network First com fallback para cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a requisição foi bem-sucedida, clona e guarda no cache
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }
        return response;
      })
      .catch(() => {
        // Se falhar (offline), tenta buscar do cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // Se não estiver no cache, retorna página offline genérica
            if (event.request.destination === 'document') {
              return caches.match('/index.html');
            }
          });
      })
  );
});
