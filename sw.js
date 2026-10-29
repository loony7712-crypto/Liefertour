// Liefertour: Programmdateien zwischenspeichern, damit die App schnell startet. Immer zuerst aus dem Internet laden,
// damit neue Fassungen sofort ankommen; nur ohne Netz den gespeicherten Stand nehmen. Karten und Adresssuche bleiben online.
const C="liefertour-1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(["./","./index.html","./anleitung.html","./manifest.webmanifest","./icon-192.png","./icon-512.png","./icon.svg"])).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener("fetch",e=>{const u=new URL(e.request.url);if(e.request.method!=="GET"||u.origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const k=r.clone();caches.open(C).then(c=>c.put(e.request,k))}return r})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match("./index.html"))))});