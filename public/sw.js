// API replay Service Worker — auto-generated. Do not edit manually.
const MANIFEST = {"POST https://officialtinaaldea.com/api/track/pageview":"/api-data/9fbd058988aecdba.json","GET https://officialtinaaldea.com/api/squeeze-variant":"/api-data/661269baa615ac2e.json","GET https://officialtinaaldea.com/api/flow-weights":"/api-data/989c62466e55a811.json","GET https://officialtinaaldea.com/api/geo-city":"/api-data/c131ce7a1c032d90.json","POST https://officialtinaaldea.com/api/flow-arm-view":"/api-data/5856fc992eaf716a.json","GET https://officialtinaaldea.com/api/affiliate-stats":"/api-data/d945d69f0e8dcc26.json","GET https://officialtinaaldea.com/api/quiz-email-capture":"/api-data/592cdf3f33a7f800.json"};
const PATH_INDEX = {"POST /api/track/pageview":"/api-data/9fbd058988aecdba.json","GET /api/squeeze-variant":"/api-data/661269baa615ac2e.json","GET /api/flow-weights":"/api-data/989c62466e55a811.json","GET /api/geo-city":"/api-data/c131ce7a1c032d90.json","POST /api/flow-arm-view":"/api-data/5856fc992eaf716a.json","GET /api/affiliate-stats":"/api-data/d945d69f0e8dcc26.json","GET /api/quiz-email-capture":"/api-data/592cdf3f33a7f800.json"};
const PATH_NO_QUERY_INDEX = {"POST /api/track/pageview":"/api-data/9fbd058988aecdba.json","GET /api/squeeze-variant":"/api-data/661269baa615ac2e.json","GET /api/flow-weights":"/api-data/989c62466e55a811.json","GET /api/geo-city":"/api-data/c131ce7a1c032d90.json","POST /api/flow-arm-view":"/api-data/5856fc992eaf716a.json","GET /api/affiliate-stats":"/api-data/d945d69f0e8dcc26.json","GET /api/quiz-email-capture":"/api-data/592cdf3f33a7f800.json"};
const ORIGIN_HOSTS = ["officialtinaaldea.com","www.officialtinaaldea.com"];

self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });

self.addEventListener('fetch', function(event) {
  var req = event.request;
  var localPath = MANIFEST[req.method + ' ' + req.url];
  if (!localPath) {
    try {
      var u = new URL(req.url);
      // Try by origin+pathname (ignore query)
      localPath = MANIFEST[req.method + ' ' + u.origin + u.pathname];
      // Try by pathname+search (ignore host — main fix for proxy hosting)
      if (!localPath) localPath = PATH_INDEX[req.method + ' ' + u.pathname + u.search];
      // Try by pathname only (ignore query too)
      if (!localPath) localPath = PATH_NO_QUERY_INDEX[req.method + ' ' + u.pathname];
    } catch (e) {}
  }
  if (!localPath) {
    try {
      var mu = new URL(req.url);
      // RE-HOMING de asset (paridade com o proxy): o location-spoof faz o runtime
      // resolver chunks/dados contra a origem ORIGINAL (host-lock defeat), então
      // requests GET vão pro host capturado em vez do host do ZIP. O ZIP tem o
      // arquivo no MESMO pathname → busca local primeiro; miss → cai pra rede.
      // É o que o serve-offer faz servindo por pathname independente do host.
      if (req.method === 'GET' && ORIGIN_HOSTS.indexOf(mu.host) !== -1 && mu.origin !== self.location.origin) {
        var localUrl = self.location.origin + mu.pathname + mu.search;
        event.respondWith(
          fetch(localUrl, { cache: 'no-cache' })
            .then(function(r) { return (r && r.ok) ? r : fetch(req); })
            .catch(function() { return fetch(req); })
        );
        return;
      }
      // Mutação same-origin (POST/PUT/PATCH/DELETE) num host estático bateria num
      // backend inexistente = CORS/404 e o funil TRAVA. Sucesso sintético mantém o
      // funil andando (o cliente reaponta a captura pro próprio gateway/CRM). GET e
      // mutação CROSS-origin (gateway/pixel real do cliente) passam pra rede.
      var isMutation = req.method !== 'GET' && req.method !== 'HEAD' && req.method !== 'OPTIONS';
      if (isMutation && mu.origin === self.location.origin) {
        event.respondWith(new Response('{"ok":true}', {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
        return;
      }
    } catch (e) {}
    return; // fall-through to network
  }
  event.respondWith(
    fetch(localPath, { cache: 'no-cache' })
      .then(function(r) {
        return r.arrayBuffer().then(function(buf) {
          return new Response(buf, {
            status: 200,
            headers: { 'Content-Type': 'application/json', 'X-Replay': '1' }
          });
        });
      })
      .catch(function() { return fetch(req); })
  );
});
