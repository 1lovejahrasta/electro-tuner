// Electro Tuner offline worker: keeps the app on the phone so it opens in airplane mode.
const CACHE='electro-tuner-v60';
const FILES=['./','./index.html','./app.js','./essi-tts.js','./intro-voice.m4a','./intro-wake.m4a','./manifest.webmanifest','./icon-192.png','./icon-512.png','./icon-m-192.png','./icon-m-512.png','./aura.gif','./aura.png','./avatar.png','./mudra-1.jpg','./mudra-2.jpg','./mudra-3.jpg','./mudra-4.jpg','./mudra-5.jpg','./mudra-6.jpg','./mudra-7.jpg','./galaxy.jpg','./intro.jpg','./intro-bg.jpg','./intro-fig.webp','./intro-glow.png','./ankh.svg','./badge.jpg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE&&!k.startsWith('essi-voice')).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
// ESSI's voice parts (voice engine files from the CDN and the voice itself): keep a copy so she speaks offline
const u=new URL(req.url);if(u.hostname==='cdn.jsdelivr.net'||u.hostname==='huggingface.co'||u.hostname.endsWith('.hf.co')){e.respondWith(caches.open('essi-voice-v1').then(c=>c.match(req.url).then(hit=>hit||fetch(req).then(res=>{if(res.ok)c.put(req.url,res.clone());return res}))));return}
  // online: get the newest version and save it; offline: use the saved copy
  e.respondWith(fetch(req).then(res=>{if(res.ok&&new URL(req.url).origin===location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(req,copy))}return res})
    .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('./index.html','./app.js'))));
});
