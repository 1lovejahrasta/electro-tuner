
(()=>{
const $=id=>document.getElementById(id);
const DPR=()=>window.devicePixelRatio||1;
function fit(c){const r=c.getBoundingClientRect();const w=Math.max(1,Math.round(r.width*DPR())),h=Math.max(1,Math.round(r.height*DPR()));if(c.width!==w||c.height!==h){c.width=w;c.height=h}return c.getContext('2d')}
function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}

/* ---------- tabs ---------- */
document.querySelectorAll('nav button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('nav button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.id==='v-'+b.dataset.v));
  if(b.dataset.v==='journal')renderLog();
}));

/* ---------- station data (summarised from Jah's charts) ---------- */
const ST=[
 {pc:0,n:'C',so:'DO',name:'Root',sk:'Muladhara',col:'#e2382b',seed:'LAM',el:'Earth',aff:'I am',loc:'Base of the spine',gl:'Adrenals',sp:'L5–S5 (lower spine)',theme:'Safety, grounding, belonging, physical strength',sense:'Smell',cry:'Garnet, onyx, hematite',pose:'Warrior I',act:'Walking, hiking, gardening',nm:'≈ 635–700 nm (red)'},
 {pc:2,n:'D',so:'RE',name:'Sacral',sk:'Svadhisthana',col:'#f07a1f',seed:'VAM',el:'Water',aff:'I feel',loc:'Lower belly, below the navel',gl:'Reproductive glands',sp:'T9–L4',theme:'Creativity, feelings, pleasure, relationships',sense:'Taste',cry:'Moonstone, carnelian',pose:'Camel',act:'Dance, warm baths, creative play',nm:'≈ 590–635 nm (orange)'},
 {pc:4,n:'E',so:'MI',name:'Solar Plexus',sk:'Manipura',col:'#f4c430',seed:'RAM',el:'Fire',aff:'I do',loc:'Upper belly',gl:'Pancreas, adrenals',sp:'T5–T9',theme:'Confidence, personal power, self-worth, gut instinct',sense:'Sight',cry:'Citrine, yellow calcite',pose:'Bow',act:'Power walking, sunlight, taking action',nm:'≈ 560–590 nm (yellow)'},
 {pc:5,n:'F',so:'FA',name:'Heart',sk:'Anahata',col:'#22a25a',seed:'YAM',el:'Air',aff:'I love',loc:'Center of the chest',gl:'Thymus',sp:'T1–T5',theme:'Love, compassion, forgiveness, giving and receiving',sense:'Touch',cry:'Rose quartz, malachite',pose:'Cobra',act:'Time in nature, kindness, gratitude',nm:'≈ 520–560 nm (green)'},
 {pc:7,n:'G',so:'SO',name:'Throat',sk:'Vishuddha',col:'#2f8fe0',seed:'HAM',el:'Sound / ether',aff:'I speak',loc:'Throat and neck',gl:'Thyroid',sp:'C3–C7 (neck)',theme:'Expression, truth, communication, listening',sense:'Hearing',cry:'Turquoise, aquamarine',pose:'Fish',act:'Singing, chanting, writing',nm:'≈ 450–490 nm (blue)'},
 {pc:9,n:'A',so:'LA',name:'Third Eye',sk:'Ajna',col:'#5b4fd6',seed:'SHAM (some charts: OM)',el:'Light',aff:'I see',loc:'Forehead, between the eyes',gl:'Pineal / pituitary (charts differ)',sp:'C1–C2 (top of neck)',theme:'Intuition, insight, wisdom, the bigger picture',sense:'Inner vision',cry:'Lapis, kyanite, sapphire',pose:'Bridge',act:'Dream journal, meditation',nm:'≈ 420–450 nm (indigo)'},
 {pc:11,n:'B',so:'TI',name:'Crown',sk:'Sahasrara',col:'#b05fd6',seed:'OM (or silence)',el:'Thought / consciousness',aff:'I understand',loc:'Top of the head',gl:'Pituitary / pineal (charts differ)',sp:'Above C1',theme:'Spiritual connection, awareness, oneness, letting go',sense:'Oneness',cry:'Clear quartz, amethyst',pose:'Downward dog',act:'Silent meditation, prayer',nm:'≈ 400–420 nm (violet / white)'}
];
const Y=[202,170,143,113,79,42,14]; // point heights on figure (root..crown)
const EXTRA=[
 {chill:'Bring your attention to the base of your body. Feel grounded, supported and safe.',near:'Sacral and coccygeal nerve plexus at the base of the spine; pelvic floor',note:'Your charts list the adrenal glands here. In the body, the adrenals sit on top of the kidneys, beside the Solar Plexus station.'},
 {chill:'Notice your lower belly. Make space for creativity, movement and feeling.',near:'Reproductive organs; sacral and lumbar nerve plexus',note:''},
 {chill:'Bring awareness to your upper belly. Feel your confidence, intention and inner strength.',near:'Celiac ("solar") nerve plexus; pancreas; adrenal glands on top of the kidneys',note:'The nerve center here is literally named the solar plexus.'},
 {chill:'Rest your awareness in your chest. Welcome compassion, gratitude and love.',near:'Heart and cardiac nerve plexus; thymus gland behind the breastbone',note:''},
 {chill:'Notice your throat and breath. Reflect on speaking and living your truth.',near:'Thyroid gland; voice box; pharyngeal nerve plexus',note:''},
 {chill:'Gently bring your attention to your forehead. Allow clarity and inner vision.',near:'Pituitary gland and hypothalamus, deep behind the forehead and eyes',note:'Charts differ: some place the pineal here and the pituitary at the crown.'},
 {chill:'Rest in stillness. Feel your connection to life, peace and the Most High.',near:'Cerebral cortex at the top of the brain; pineal gland deep in the center of the brain',note:'Charts differ on pineal vs pituitary for the top two stations.'}
];
ST.forEach((s,i)=>Object.assign(s,EXTRA[i]));
const SKT=[
 {dev:'मूलाधार',iast:'Mūlādhāra',say:'MOO-lah-DHAA-rah',mean:'root support',bija:'लं'},
 {dev:'स्वाधिष्ठान',iast:'Svādhiṣṭhāna',say:'swah-dhish-TAH-nah',mean:'one’s own seat',bija:'वं'},
 {dev:'मणिपूर',iast:'Maṇipūra',say:'mah-nee-POO-rah',mean:'city of jewels',bija:'रं'},
 {dev:'अनाहत',iast:'Anāhata',say:'ah-NAH-hah-tah',mean:'unstruck (sound)',bija:'यं'},
 {dev:'विशुद्ध',iast:'Viśuddha',say:'vee-SHOOD-dhah',mean:'especially pure',bija:'हं'},
 {dev:'आज्ञा',iast:'Ājñā',say:'AAG-nyah',mean:'command, perception',bija:'ॐ'},
 {dev:'सहस्रार',iast:'Sahasrāra',say:'sah-HAHS-rah-rah',mean:'thousand-petaled',bija:'ॐ / silence'}
];
ST.forEach((s,i)=>Object.assign(s,SKT[i]));
const ANAT=[
 {st:6,x:180,y:25,t:'Cerebral cortex'},
 {st:6,x:180,y:39,t:'Pineal gland (deep)'},
 {st:5,x:180,y:51,t:'Pituitary · hypothalamus'},
 {st:4,x:180,y:76,t:'Thyroid'},
 {st:3,x:180,y:98,t:'Thymus'},
 {st:3,x:187,y:114,t:'Heart · cardiac plexus'},
 {st:2,x:181,y:141,t:'Solar (celiac) plexus · pancreas'},
 {st:2,x:192,y:153,t:'Adrenals (on kidneys)',x2:168},
 {st:1,x:180,y:176,t:'Reproductive organs'},
 {st:0,x:180,y:199,t:'Sacral & coccygeal plexus'}
];
let layer=store('rl_layer')||'both';
const NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

/* ---------- figure (builder used by Live + Session) ---------- */
const SVGNS='http://www.w3.org/2000/svg';
function buildFigure(svg,pre,onTap){
  const LY=[];let last=-99;ANAT.forEach(a=>{let y=Math.max(a.y,last+19);LY.push(y);last=y});
  svg.innerHTML=`<defs><filter id="${pre}glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<linearGradient id="${pre}skin" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f3a2a" stop-opacity=".9"/><stop offset="1" stop-color="#0c1a12" stop-opacity=".9"/></linearGradient>
<linearGradient id="${pre}rasta" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#e2382b"/><stop offset=".5" stop-color="#f4c430"/><stop offset="1" stop-color="#22a25a"/></linearGradient>
<radialGradient id="${pre}aura" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#f4c430" stop-opacity=".16"/><stop offset="1" stop-color="#f4c430" stop-opacity="0"/></radialGradient></defs>
<circle cx="180" cy="118" r="118" fill="url(#${pre}aura)"/>
<g class="ring"><circle cx="180" cy="118" r="112" fill="none" stroke="url(#${pre}rasta)" stroke-width="1.4" stroke-opacity=".55" stroke-dasharray="2 5"/><circle cx="180" cy="118" r="102" fill="none" stroke="url(#${pre}rasta)" stroke-width=".8" stroke-opacity=".35"/></g>
<g transform="translate(80,0)" fill="url(#${pre}skin)" stroke="#c9a94a" stroke-opacity=".7" stroke-width="1.2" stroke-linejoin="round">
<path d="M18,222 Q100,186 182,222 Q100,248 18,222 Z"/>
<path d="M60,92 Q100,80 140,92 L134,190 Q100,202 66,190 Z"/>
<path d="M62,94 Q36,130 44,178 Q50,203 80,206" fill="none" stroke-width="13" stroke-linecap="round"/>
<path d="M62,94 Q36,130 44,178 Q50,203 80,206" fill="none" stroke="#12271a" stroke-opacity="1" stroke-width="10.5" stroke-linecap="round"/>
<path d="M138,94 Q164,130 156,178 Q150,203 120,206" fill="none" stroke-width="13" stroke-linecap="round"/>
<path d="M138,94 Q164,130 156,178 Q150,203 120,206" fill="none" stroke="#12271a" stroke-opacity="1" stroke-width="10.5" stroke-linecap="round"/>
<rect x="91" y="60" width="18" height="24" rx="6"/><circle cx="100" cy="42" r="22"/></g>
<line x1="180" y1="14" x2="180" y2="205" stroke="url(#${pre}rasta)" stroke-opacity=".5" stroke-width="2"/>
<g class="anat">${ANAT.map((a,i)=>`<g data-st="${a.st}"><line x1="94" y1="${LY[i]}" x2="${a.x2||a.x}" y2="${a.y}" stroke="${ST[a.st].col}" stroke-opacity=".55" stroke-width=".8" stroke-dasharray="2 2"/><circle cx="${a.x}" cy="${a.y}" r="3.2" fill="#fff" fill-opacity=".9" stroke="${ST[a.st].col}" stroke-width="1.6"/>${a.x2?`<circle cx="${a.x2}" cy="${a.y}" r="3.2" fill="#fff" fill-opacity=".9" stroke="${ST[a.st].col}" stroke-width="1.6"/><line x1="${a.x2}" y1="${a.y}" x2="${a.x}" y2="${a.y}" stroke="${ST[a.st].col}" stroke-opacity=".35"/>`:''}<text x="92" y="${LY[i]+3}" text-anchor="end" font-size="8.6" fill="${ST[a.st].col}" font-weight="700">${a.t}</text></g>`).join('')}</g>
<g class="stl">${ST.map((s2,i)=>`<g><line x1="192" y1="${Y[i]}" x2="266" y2="${Y[i]}" stroke="${s2.col}" stroke-opacity=".45" stroke-width=".8"/><text x="270" y="${Y[i]+3}" font-size="10" font-weight="800" fill="${s2.col}">${s2.name}</text><text x="270" y="${Y[i]+13}" font-size="7.5" fill="#c3bfa8">${s2.n} · ${s2.so} · ${s2.seed.split(' ')[0]}</text></g>`).join('')}</g>`;
  const pts=ST.map((s2,i)=>{const c=document.createElementNS(SVGNS,'circle');c.setAttribute('cx',180);c.setAttribute('cy',Y[i]);c.setAttribute('r',7);c.setAttribute('fill',s2.col);c.setAttribute('class','pt');c.style.opacity=.45;c.addEventListener('click',()=>onTap(i));svg.appendChild(c);return c});
  svg.querySelectorAll('.anat > g').forEach(g=>{g.style.cursor='pointer';g.addEventListener('click',()=>onTap(+g.dataset.st))});
  return {pts,ring:svg.querySelector('.ring'),anat:svg.querySelector('.anat'),stl:svg.querySelector('.stl')};
}
function applyLayer(F){F.anat.style.display=layer==='st'?'none':'';F.stl.style.display=layer==='body'?'none':'';F.pts.forEach(p=>p.style.display=layer==='body'?'none':'')}
function glowPts(F,on){F.pts.forEach((c,k)=>{const a=on.includes(k);c.setAttribute('r',a?13:7);c.style.opacity=a?1:.45;c.setAttribute('filter',a?`url(#${F===LF?'l':'s'}glow)`:'')});
  F.anat.querySelectorAll(':scope > g').forEach(g=>{g.style.opacity=on.length&&!on.includes(+g.dataset.st)?.35:1})}
const LF=buildFigure($('fig'),'l',i=>{selected=i;showCard(i)});
let lit=-1,selected=-1;
function lightStation(i){const many=inst==='midi'?midiNotes().map(n=>ST.findIndex(s2=>s2.pc===n%12)).filter(x=>x>=0):[];const on=[...new Set([...(i>=0?[i]:[]),...many])];const key=on.join(',');if(key===lit)return;lit=key;glowPts(LF,on);if(i>=0){selected=i;showCard(i)}}
function setLayer(l){layer=l;store('rl_layer',l);document.querySelectorAll('#layers button,#sLayers button').forEach(b=>b.classList.toggle('on',b.dataset.l===l));applyLayer(LF);if(typeof SF!=='undefined'&&SF)applyLayer(SF)}
document.querySelectorAll('#layers button,#sLayers button').forEach(b=>b.addEventListener('click',()=>setLayer(b.dataset.l)));

/* ---------- station card ---------- */
function showCard(i){const s=ST[i];$('cardBox').innerHTML=`<div class="card">
<div class="top" style="background:linear-gradient(90deg,${s.col},${s.col}cc)">${s.name} · ${s.dev}<small>${s.iast} (${s.say}) · “${s.mean}”</small><small>Station ${i+1} · note ${s.n} · ${s.so} · seed sound ${s.seed}</small></div>
<div class="body">
<div class="chill-line">${s.chill}</div>
<div class="aff" style="color:${s.col}">“${s.aff}”</div>
<div class="controls" style="margin-top:10px"><button class="s" id="tone">🔊 Hear ${s.n}4</button><button class="s" id="tone5">🔊 Hear ${s.n}5</button></div>
<div class="viber">
<span class="tag t-l">🫀 BODY MATCH</span>
<div class="kv"><div>In the body here</div><div>${s.near}</div><div>Your charts say</div><div>${s.gl}</div>${s.note?`<div>Note</div><div>${s.note}</div>`:''}<div>Spine level</div><div>${s.sp}</div></div>
<div class="note" style="margin-top:6px">The glands and nerve centers are real anatomy at these places. The energy meaning of each station comes from the chakra tradition.</div>
<span class="tag t-t">🕉 TRADITION · from your charts</span>
<div class="kv"><div>Seed sound</div><div>${s.seed}</div><div>Element</div><div>${s.el}</div><div>Themes</div><div>${s.theme}</div></div>
</div>
<div class="saiyan">
<span class="tag t-m">🎙 MEASURED (live)</span>
<div class="kv"><div>Now playing</div><div id="cardLive">—</div><div>Station pitch</div><div>${s.n}4 = ${noteHz(60+s.pc).toFixed(1)} Hz · ${s.n}5 = ${noteHz(72+s.pc).toFixed(1)} Hz</div></div>
<span class="tag t-r">🎼 MUSIC</span>
<div class="kv"><div>Solfège</div><div>${s.so} (fixed-Do: C = DO)</div><div>Steps above C</div><div>${s.pc} half-steps</div></div>
<span class="tag t-t">🕉 MORE FROM YOUR CHARTS</span>
<div class="kv"><div>Body area</div><div>${s.loc}</div><div>Sense</div><div>${s.sense}</div><div>Crystals</div><div>${s.cry}</div><div>Yoga pose</div><div>${s.pose}</div><div>Activities</div><div>${s.act}</div></div>
<span class="tag t-l">🌈 LIGHT</span>
<div class="kv"><div>Color wavelength</div><div>${s.nm}</div></div>
<span class="tag t-f">❤️ FEELING</span>
<div class="note">After playing ${s.n}, open 📓 Journal and log what you felt.</div>
</div></div></div>`;
$('tone').onclick=()=>sound(noteHz(60+s.pc));$('tone5').onclick=()=>sound(noteHz(72+s.pc));}

/* ---------- tuning ---------- */
let A4=440;$('tuning').addEventListener('change',e=>{A4=+e.target.value;if(typeof JT!=='undefined')JT.habits=null;if(selected>=0)showCard(selected)});
const noteHz=m=>A4*Math.pow(2,(m-69)/12);
function loLimit(){let lo=INST[inst].lo;try{const S=tmStrings();if(S&&S.length)lo=Math.min(lo,noteHz(Math.min(...S))*.8);if(TM.mode==='freq'&&TM.target)lo=Math.min(lo,Math.max(25,TM.target.hz*.45))}catch(e){}return lo}
const midiOf=f=>69+12*Math.log2(f/A4);
let toneCtx=null;
let toneUntil=0,droneNode=null;
function actx(){toneCtx=toneCtx||new (window.AudioContext||window.webkitAudioContext)();if(toneCtx.state==='suspended')toneCtx.resume();return toneCtx}
let voiceSel=store('rl_voice')||'bowl';
function bowl(f,dur,vol){dur=Math.max(dur||6,4);vol=(vol||.22)*1.1;try{const c=actx(),t0=c.currentTime,out=c.createGain();out.gain.value=vol;out.connect(c.destination);
  [[1,1,1],[2.76,.45,.6],[5.4,.22,.38],[8.93,.1,.25]].forEach(([r,a,decay])=>{[0,1.6].forEach(det=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f*r+det*r*.6;g.gain.setValueAtTime(0,t0);g.gain.linearRampToValueAtTime(a*.5,t0+.015);g.gain.exponentialRampToValueAtTime(.0004,t0+dur*decay);o.connect(g).connect(out);o.start(t0);o.stop(t0+dur*decay+.05)})});
  toneUntil=performance.now()+Math.min(dur,3.2)*1000+350}catch(e){}}
function sound(f,dur,vol){if(voiceSel==='bowl')bowl(f,(dur||2)*2.2,vol);else tone(f,dur,vol)}
function tone(f,dur,vol){dur=dur||1.8;vol=vol||.22;try{const c=actx(),t0=c.currentTime,out=c.createGain();out.gain.setValueAtTime(0,t0);out.gain.linearRampToValueAtTime(vol,t0+.12);out.gain.setValueAtTime(vol,t0+dur-.35);out.gain.linearRampToValueAtTime(0,t0+dur);out.connect(c.destination);
  const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=5;lg.gain.value=f*.0035;lfo.connect(lg);
  [[1,1],[2,.14],[3,.05]].forEach(([h,a])=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f*h;lg.connect(o.frequency);g.gain.value=a;o.connect(g).connect(out);o.start(t0);o.stop(t0+dur+.05)});
  lfo.start(t0);lfo.stop(t0+dur+.05);toneUntil=performance.now()+dur*1000+350}catch(e){}}
function chime(){try{const c=actx(),t0=c.currentTime;[[1,0],[1.5,.12]].forEach(([r,d])=>{const o=c.createOscillator(),g=c.createGain();o.frequency.value=880*r;g.gain.setValueAtTime(0,t0+d);g.gain.linearRampToValueAtTime(.08,t0+d+.02);g.gain.exponentialRampToValueAtTime(.0005,t0+d+.9);o.connect(g).connect(c.destination);o.start(t0+d);o.stop(t0+d+1)})}catch(e){}}
function drone(f){try{droneOff();const c=actx(),o=c.createOscillator(),g=c.createGain();o.frequency.value=f;g.gain.value=0;g.gain.linearRampToValueAtTime(.06,c.currentTime+.6);o.connect(g).connect(c.destination);o.start();droneNode={o,g}}catch(e){}}
function droneOff(){if(droneNode){try{droneNode.g.gain.linearRampToValueAtTime(0,toneCtx.currentTime+.3);droneNode.o.stop(toneCtx.currentTime+.35)}catch(e){}droneNode=null}}

/* ---------- instruments ---------- */
const INST={
 flute:{lo:180,label:'Native flute',sharp:'Try a small, gentle change in your airflow or fingering and listen to how the pitch responds. Keep your breathing comfortable.',flat:'Try a small, gentle change in your airflow and listen to how the pitch responds. Keep your breathing comfortable.'},
 voice:{lo:70,label:'Voice',sharp:'Relax and aim a touch lower.',flat:'Lift the note a touch; more breath support helps.'},
 guitar:{lo:70,label:'Guitar',sharp:'Loosen the string slightly (tuning peg).',flat:'Tighten the string slightly (tuning peg).'},
 bowl:{lo:55,label:'Tibetan bowl',sharp:'A bowl’s pitch is set by its size and shape. This bowl sits a little sharp of the note; pair it with the station it is closest to.',flat:'A bowl’s pitch is set by its size and shape. This bowl sits a little flat of the note; pair it with the station it is closest to.'},
 keys:{lo:40,label:'Keyboard',sharp:'Keyboard notes are fixed; this shows the instrument or sound is tuned sharp.',flat:'Keyboard notes are fixed; this shows the instrument or sound is tuned flat.'},
 midi:{lo:40,label:'MIDI instrument',sharp:'',flat:''}
};
let inst=store('rl_inst')||'flute';
/* ---------- MIDI ---------- */
const held=new Map();let midiOn=false;
function onMidi(e){const [st,n,v]=e.data;const cmd=st&0xf0;if(cmd===0x90&&v>0)held.set(n,{v,t:performance.now()});else if(cmd===0x80||(cmd===0x90&&v===0))held.delete(n)}
async function connectMidi(){
  if(!navigator.requestMIDIAccess){$('midiState').textContent='This browser has no MIDI support. Use Chrome on Android.';return}
  try{const acc=await navigator.requestMIDIAccess();const hook=()=>{let names=[];acc.inputs.forEach(i=>{i.onmidimessage=onMidi;names.push(i.name)});midiOn=names.length>0;$('midiState').textContent=names.length?'✅ Connected: '+names.join(', ')+'. Play a note.':'No MIDI device found. Plug it in (USB-C OTG) and tap Connect again.'};hook();acc.onstatechange=hook}
  catch(e){$('midiState').textContent='MIDI permission was blocked: '+(e.message||e.name)}
}
function midiNotes(){return [...held.keys()].sort((a,b)=>a-b)}

/* ---------- pitch detection (YIN) ---------- */
let yinBuf=null;
function yin(buf,sr){
  const W=Math.min(2048,buf.length>>1),tMin=Math.floor(sr/2400),tMax=Math.min(W-1,Math.floor(sr/loLimit()));
  if(!yinBuf||yinBuf.length!==tMax+1)yinBuf=new Float32Array(tMax+1);const d=yinBuf;d[0]=1;let run=0;
  for(let t=1;t<=tMax;t++){let s=0;for(let i=0;i<W;i++){const x=buf[i]-buf[i+t];s+=x*x}run+=s;d[t]=run?s*t/run:1}
  let tau=-1;for(let t=tMin;t<=tMax;t++){if(d[t]<0.15){while(t+1<=tMax&&d[t+1]<d[t])t++;tau=t;break}}
  if(tau<0){let m=1e9;for(let t=tMin;t<=tMax;t++)if(d[t]<m){m=d[t];tau=t}if(m>0.35)return null}
  let bt=tau;if(tau>0&&tau<tMax){const a=d[tau-1],b=d[tau],c=d[tau+1],den=a-2*b+c;if(den)bt=tau+0.5*(a-c)/den}
  return {f:sr/bt,conf:Math.max(0,Math.min(1,1-d[tau]))};
}

/* ---------- live state ---------- */
let ctx=null,stream=null,src=null,an=null,td=null,fd=null,running=false,frame=0;
const trail=[];let cur={f:null,midi:null,conf:0,rms:0,db:null,cents:null,name:null,pc:null,vib:null};
let susStart=0,susNote=null,sustain=0,best=0;
function updateSustain(now){
  if(cur.f&&cur.conf>.75){const n=Math.round(cur.midi);if(n===susNote&&Math.abs(cur.cents)<45){sustain=(now-susStart)/1000}else{susNote=n;susStart=now;sustain=0}}
  else{susNote=null;sustain=0}
  if(sustain>best)best=sustain;
}
function vibratoRate(now){
  const win=trail.filter(p=>now-p.t<1600&&p.m!==null);if(win.length<30)return null;
  const span=(win[win.length-1].t-win[0].t)/1000;if(span<1)return null;
  const base=Math.round(win[win.length-1].m);if(win.some(p=>Math.abs(p.m-base)>0.9))return null;
  const n=win.length,mx=win.reduce((a,p)=>a+p.t,0)/n,my=win.reduce((a,p)=>a+p.m,0)/n;let sxy=0,sxx=0;for(const p of win){sxy+=(p.t-mx)*(p.m-my);sxx+=(p.t-mx)*(p.t-mx)}const k=sxx?sxy/sxx:0;
  const r=win.map(p=>(p.m-my-k*(p.t-mx))*100);const amp=Math.sqrt(r.reduce((a,v)=>a+v*v,0)/n);if(amp<8)return null;
  let z=0;for(let i=1;i<r.length;i++)if((r[i-1]<0)!==(r[i]<0))z++;const hz=z/2/span;return hz>=1.5&&hz<=14?{hz,amp}:null;
}
function bandOf(hz){return hz<4?0:hz<8?1:hz<13?2:hz<30?3:4}
const BANDS=['Delta','Theta','Alpha','Beta','Gamma'];
const BMEAN=['deep sleep','deep relaxation and dreaming','calm, relaxed awareness','alert thinking','high focus'];

function fromMidi(now){
  const ns=midiNotes();if(!ns.length){cur.f=null;cur.midi=null;cur.cents=null;cur.pc=null;cur.name=null;cur.conf=0;cur.rms=0;cur.db=null}
  else{const last=[...held.entries()].sort((a,b)=>b[1].t-a[1].t)[0];const n=last[0];cur.midi=n;cur.f=noteHz(n);cur.conf=1;cur.cents=0;cur.pc=n%12;cur.name=NAMES[cur.pc]+(Math.floor(n/12)-1);cur.rms=last[1].v/127*0.2;cur.db=20*Math.log10(last[1].v/127)}
  trail.push({t:now,m:cur.midi});while(trail.length&&now-trail[0].t>6000)trail.shift();updateSustain(now);cur.vib=null;
}

/* Singing bowls ring several un-evenly spaced tones (partials), which fools the flute/voice pitch reader.
   Bowl mode looks at the spectrum instead: it finds every strong ringing tone and reports the lowest
   strong one (the bowl's main tone), refined to a fraction of a bin. Other partials are kept for the coach. */
function bowlPitch(fd,sr,N){
  const bw=sr/N,b0=Math.max(2,Math.floor(55/bw)),b1=Math.min(fd.length-2,Math.floor(3000/bw));let mx=-200;
  for(let b=b0;b<=b1;b++)if(fd[b]>mx)mx=fd[b];if(mx<-80)return null;
  const peaks=[];for(let b=b0;b<=b1;b++){const v=fd[b];if(v>mx-18&&v>=fd[b-1]&&v>fd[b+1]&&v>=fd[b-2]&&v>fd[b+2]){
    const a=fd[b-1],c=fd[b+1],den=a-2*v+c,dx=den?.5*(a-c)/den:0;peaks.push({f:(b+dx)*bw,db:v-.25*(a-c)*dx})}}
  if(!peaks.length)return null;peaks.sort((x,y)=>x.f-y.f);
  const main=peaks.find(q=>q.db>mx-12)||peaks[0];
  cur.partials=peaks.filter(q=>q!==main).slice(0,4).map(q=>({f:q.f,ratio:q.f/main.f,db:q.db-mx}));
  // floor of other peaks below the strongest: clearer bowl = higher confidence
  return {f:main.f,conf:Math.min(.99,.8+Math.max(0,(main.db-(mx-30)))/150)};
}

/* Safety check against "ghost" notes: if the pitch reader picks a frequency that is barely present
   in the actual sound (a sub-octave from breath noise, or the shared root of two notes played together),
   switch to the strongest real tone. Flute is checked more strictly because its lowest tone is normally its loudest. */
function checkSub(p,fd,sr,N){
  const bw=sr/N,lvAt=f=>{const b=Math.round(f/bw);let m=-200;for(let q=b-2;q<=b+2;q++)if(fd[q]>m)m=fd[q];return m};
  const b0=Math.max(2,Math.floor(50/bw)),b1=Math.min(fd.length-2,Math.floor(4000/bw));let mx=-200,mb=b0;for(let b=b0;b<=b1;b++)if(fd[b]>mx){mx=fd[b];mb=b}
  if(mx<-85)return p;const a=fd[mb-1],c=fd[mb+1],den=a-2*mx+c,fp=(mb+(den?.5*(a-c)/den:0))*bw;
  const gap=mx-lvAt(p.f),ratio=fp/p.f,k=Math.round(ratio),isMult=k>=2&&Math.abs(ratio-k)<.03*k;
  const lim=inst==='flute'?15:35;
  const gap2=mx-lvAt(2*p.f);
  if(ratio>1.5&&gap>lim&&gap2>lim){cur.poly=true;return {f:fp,conf:Math.min(p.conf,.85)}}        // neither the note nor its octave is really there: ghost from two notes at once
  if(ratio>1.5&&gap>lim){if(!isMult)cur.poly=true;if(!isMult||inst==='flute'){return {f:fp,conf:Math.min(p.conf,.85)}}}
  return p;
}
function analyse(now){
  an.getFloatTimeDomainData(td);an.getFloatFrequencyData(fd);
  if(essiBusy()){cur.f=null;cur.midi=null;cur.cents=null;cur.pc=null;cur.name=null;cur.conf=0;cur.vib=null;trail.push({t:now,m:null});while(trail.length&&now-trail[0].t>6000)trail.shift();if(SM.on)smFrame(now);return}
  let sq=0;for(let i=0;i<td.length;i++)sq+=td[i]*td[i];const rms=Math.sqrt(sq/td.length);
  cur.rms=rms;cur.db=rms>0?20*Math.log10(rms):null;
  let p=null;if(rms>0.004&&performance.now()>toneUntil)p=inst==='bowl'?bowlPitch(fd,ctx.sampleRate,an.fftSize):yin(td,ctx.sampleRate);
  cur.poly=false;if(p&&inst!=='bowl')p=checkSub(p,fd,ctx.sampleRate,an.fftSize);
  if(p&&p.f>loLimit()&&p.f<2400&&p.conf>.6){cur.f=p.f;cur.conf=p.conf;cur.midi=midiOf(p.f);const r=Math.round(cur.midi);cur.cents=Math.round((cur.midi-r)*100);cur.pc=((r%12)+12)%12;cur.name=NAMES[cur.pc]+(Math.floor(r/12)-1)}
  else{cur.f=null;cur.conf=p?p.conf:0;cur.midi=null;cur.cents=null;cur.pc=null;cur.name=null}
  trail.push({t:now,m:cur.midi});while(trail.length&&now-trail[0].t>6000)trail.shift();
  updateSustain(now);cur.vib=vibratoRate(now);
  if(SM.on)smFrame(now);
}

/* ---------- readouts ---------- */
function stationOfPc(pc){return ST.findIndex(s=>s.pc===pc)}
function caption(){
  if(depth==='chill'&&cur.f&&running||depth==='chill'&&inst==='midi'&&cur.f){const k=stationOfPc(cur.pc);return (Math.abs(cur.cents)<=15?'✅ ':'🎯 ')+`<b>${cur.name}</b> · `+(k>=0?`<span style="color:${ST[k].col}">${ST[k].name}</span> · “${ST[k].aff}”`:'between stations')}
  if(inst==='midi'&&!cur.f)return midiOn?'🎛 MIDI connected. Play a note or a chord; every station in the chord lights up.':'🎛 Tap <b>Connect MIDI</b> above, then play.';
  if(inst!=='midi'&&!running)return '🎶 Press <b>Start microphone</b>, then play or sing one steady note.';
  if(cur.poly&&cur.f)return '🎶 <b>Several notes at once.</b> I show the strongest one ('+cur.name+'). For the clearest reading, play one note at a time.';
  if(!cur.f)return cur.rms>0.004?'👂 <b>Pitch unclear.</b> Try one clean, steady note; noise or two sounds at once confuse the meter.':'🎶 Listening… play or hum one steady note.';
  const s=stationOfPc(cur.pc),st=s>=0?ST[s]:null;let t='';
  if(inst==='midi'&&held.size>1){const ns=midiNotes();const sts=[...new Set(ns.map(n=>stationOfPc(n%12)).filter(x=>x>=0))].map(i=>ST[i].name);return `🎛 <b>Chord: ${ns.map(n=>NAMES[n%12]).join(' ')}</b> lights ${sts.join(', ')||'no single station'}. Newest note: ${cur.name}.`}
  if(Math.abs(cur.cents)<=10)t=`✅ <b>${cur.name} is in tune.</b> `;else if(cur.cents>10)t=`⬆ <b>${cur.name} is ${cur.cents}¢ sharp.</b> ${INST[inst].sharp} `;else t=`⬇ <b>${cur.name} is ${-cur.cents}¢ flat.</b> ${INST[inst].flat} `;
  if(cur.vib)t+=`Your note wobbles about <b>${cur.vib.hz.toFixed(1)} times a second</b> (vibrato). `;else if(sustain>2)t+=`${inst==='bowl'?'Steady ring':inst==='keys'||inst==='midi'?'Held':inst==='guitar'?'Sustain':'Steady breath'}: <b>${sustain.toFixed(1)} s</b>. `;
  t+=st?`This note lights <b>${st.name}</b> (${st.so}, seed sound ${st.seed.split(' ')[0]}).`:`${NAMES[cur.pc]} sits between two stations, so no single point lights up.`;
  return t;
}
let capT=0;
function readouts(now){
  
  
  const s=cur.pc!==null?stationOfPc(cur.pc):-1;$('solf').textContent=s>=0?'solfège '+ST[s].so:(cur.pc!==null?'between stations':'solfège —');
  $('conf').textContent=cur.f?(cur.conf>=.9?'strong pitch reading':cur.conf>=.8?'clear pitch reading':'weak pitch reading'):'pitch reading —';
  const c=cur.cents;$('needle').style.left=(c===null?50:50+Math.max(-50,Math.min(50,c)))+'%';
  
  $('sustain').textContent=sustain.toFixed(1)+'s';$('best').textContent=best.toFixed(1);
  $('vib').textContent=cur.vib?cur.vib.hz.toFixed(1):'—';
  $('lvl').textContent=cur.db!==null?cur.db.toFixed(0):'—';
  if(now-capT>400){capT=now;$('caption').innerHTML=caption()}
  if(sysShow('bands')){const bi=cur.vib?bandOf(cur.vib.hz):-1;[...$('bands').children].forEach((d,k)=>d.classList.toggle('on',k===bi));
  $('bandText').textContent=cur.vib?`Your sound's wobble rhythm is ${cur.vib.hz.toFixed(1)} Hz. That number falls in the ${BANDS[bi]} range (${BMEAN[bi]} in EEG research). The phone measured your sound's rhythm, not your brainwaves.`:'When your note wobbles (vibrato), the app counts the wobbles per second and shows which brainwave range that number falls in. It compares numbers only: the phone hears your sound, not your brain.';
  }
  if(sysShow('body'))lightStation(cur.f&&cur.conf>.75&&s>=0?s:-1);
  const cl=$('cardLive');if(cl)cl.textContent=cur.f?`${cur.name} · ${cur.f.toFixed(1)} Hz · ${c>=0?'+':''}${c}¢`:'—';
  journeyStep();
}



/* ---------- LIVE COACH: measures each held note and explains the data ---------- */
const CO={note:null,notes:[],stations:new Set()};
function coStd(a){if(a.length<2)return 0;const m=a.reduce((x,y)=>x+y,0)/a.length;return Math.sqrt(a.reduce((x,y)=>x+(y-m)*(y-m),0)/a.length)}
function coMean(a){return a.length?a.reduce((x,y)=>x+y,0)/a.length:0}
function coSign(c){c=Math.round(c);return (c>0?'+':'')+c+'¢ ('+centsWord(c).toLowerCase()+')'}
function coachTick(now){
  const live=running&&cur&&cur.f&&cur.midi!==null;
  if(live){const name=cur.name;
    if(!CO.note||CO.note.name!==name){if(CO.note)coachFinish(now);CO.note={name,pc:cur.pc,midi:Math.round(cur.midi),t0:now,s:[],db:[],vib:null,gap:0}}
    const n=CO.note;n.gap=0;n.s.push({t:now-n.t0,c:(cur.midi-Math.round(cur.midi))*100});if(cur.db!==null)n.db.push(cur.db);
    if(cur.vib&&(!n.vib||cur.vib.amp>n.vib.amp))n.vib={hz:cur.vib.hz,amp:cur.vib.amp};
    if(inst==='bowl'&&cur.partials)n.partials=cur.partials;
    const dur=(now-n.t0)/1000;if(dur<.5){if(CO.stage!=='an'){CO.stage='an';$('coachNow').innerHTML=`<span class="cj-live" style="color:#FFC928">● ANALYZING</span> <b>${n.name}</b>…`}}
      else if(now-(CO.lastNow||0)>1500){CO.lastNow=now;CO.stage='co';const st=n.s.filter(p=>p.t>150).map(p=>p.c),m=coMean(st),sd=coStd(st);let msg;
        const si2=stationOfPc(n.pc),S2=si2>=0?ST[si2]:null;
        const body=S2?`<span style="color:${S2.col}">${S2.name}</span> · ${S2.theme.split(',').slice(0,2).join(' &').toLowerCase()} · “${S2.aff}”. `:'Between two stations. ';
        const meas=`Held ${dur.toFixed(1)} s${cur.vib?`, vibrato ${cur.vib.hz.toFixed(1)} Hz`:''}. `;
        const tune=Math.abs(m)<=5?(sd<=6?'Centered and steady.':'Centered; steady the air to calm the wobble.'):`Pitch ${centsWord(m).toLowerCase()} (${Math.round(m)>0?'+':''}${Math.round(m)}¢): ${m>0?'ease it down':'lift it slightly'}.`;
        msg=body+meas+(S2?`Breath cue: ${(BODY[si2]&&BODY[si2].breath||'slow, even breathing').toLowerCase()}. `:'')+tune;
        const hb=JT.habits&&JT.habits[n.name];if(hb&&Math.abs(m)<Math.abs(hb.med)-5&&dur>1)msg+=` Better than your usual ${n.name} (${coSign(hb.med)}).`;
        $('coachNow').innerHTML=`<span class="cj-live">● COACHING</span> <b>${n.name}</b> · ${msg}`}
  }else if(CO.note){CO.note.gap=CO.note.gap||now;if(now-CO.note.gap>350)coachFinish(now)}
}
function coachFinish(now){
  const n=CO.note;CO.note=null;if(!n)return;
  const end=n.gap||now,dur=(end-n.t0)/1000;if(dur<.35||n.s.length<8){CO.frag={name:n.name,midi:n.midi,end};return}
  const fr=CO.frag&&n.t0-CO.frag.end<120&&Math.abs(CO.frag.midi-n.midi)===1?CO.frag:null;CO.frag=null;
  const st=n.s.filter(p=>p.t>150).map(p=>p.c);if(st.length<5)return;
  const avg=coMean(st),spread=coStd(st),inPct=Math.round(100*st.filter(c=>Math.abs(c)<=10).length/st.length);
  const att=n.s.filter(p=>p.t<=120).map(p=>p.c),attack=att.length?coMean(att)-avg:0;
  const k=Math.max(2,Math.floor(st.length*.3)),drift=dur>1?coMean(st.slice(-k))-coMean(st.slice(0,k)):0;
  const mid=n.db.filter((x,i)=>isFinite(x)&&n.s[i]&&n.s[i].t>150&&n.s[i].t<dur*1000-150);const dyn=mid.length>5?Math.max(...mid)-Math.min(...mid):0;
  const rec={name:n.name,pc:n.pc,dur,avg,spread,inPct,attack,drift,vib:n.vib,dyn,t:Date.now(),slide:fr?fr.name:null};CO.notes.push(rec);try{cjFromNote(rec)}catch(e){}
  const si=stationOfPc(n.pc);if(si>=0)CO.stations.add(si);
  // headline
  const a=Math.abs(avg);let head,col;
  if(a<=5){head=`Pitch: centered (${Math.round(avg)>0?'+':''}${Math.round(avg)}¢)`;col='#00FF85'}
  else if(a<=10){head=`Pitch: ${centsWord(avg).toLowerCase()} (${Math.round(avg)>0?'+':''}${Math.round(avg)}¢)`;col='#FFC928'}
  else{head=`Pitch: ${centsWord(avg).toLowerCase()} (${Math.round(avg)>0?'+':''}${Math.round(avg)}¢)`;col='#FF3434'}
  const pts=[];
  pts.push(`Held <b>${dur.toFixed(1)} s</b>; <b>${inPct}%</b> of that time was within ±10¢.`);
  if(n.vib)pts.push(`Vibrato measured: <b>${n.vib.hz.toFixed(1)} Hz</b>, about <b>±${Math.round(n.vib.amp*1.41)}¢</b> wide. (Classical singers usually sit around 5–7 Hz.)`);
  else pts.push(spread<1?`Very steady: pitch spread <b>under ±1¢</b> (standard deviation).`:spread<=4?`Very steady: pitch varied only <b>±${spread.toFixed(0)}¢</b>.`:spread<=10?`Fairly steady: pitch varied <b>±${spread.toFixed(0)}¢</b>.`:`Unsteady: pitch moved <b>±${spread.toFixed(0)}¢</b> with no regular vibrato. Steadier air or support will tighten it.`);
  if(fr)pts.push(`Slid in from <b>${fr.name}</b> ${fr.midi<n.midi?'below':'above'}: the note started a half step ${fr.midi<n.midi?'low':'high'} before it settled.`);
  else if(attack<-15)pts.push(`Started <b>${Math.round(-attack)}¢ low</b> and slid up (a scoop) in the first 0.1 s.`);
  else if(attack>15)pts.push(`Started <b>${Math.round(attack)}¢ high</b> and settled down in the first 0.1 s.`);
  if(Math.abs(drift)>=8)pts.push(`Drifted <b>${coSign(drift)}</b> from the start to the end of the note${drift<0?' (often from air or support fading)':' (often from pushing more air or tension)'}.`);
  if(dyn>12)pts.push(`Loudness changed by <b>${Math.round(dyn)} dB</b> during the note; pitch can follow loudness on wind instruments and voice.`);
  let tip='';if(a>10&&INST[inst]&&INST[inst][avg>0?'sharp':'flat'])tip=`<div style="margin-top:6px">→ ${INST[inst][avg>0?'sharp':'flat']}</div>`;
  const stn='';
  const P=n.partials||[];const bowlLine=inst==='bowl'?`<div class="hm-noteline" style="border-top:0;padding-top:0"><b>Resonance layers:</b> your bowl is producing several frequencies at once. The lowest strong sound is near <b>${n.name}</b>${si>=0?`, which represents ${ST[si].name} in our chakra framework`:''}.${P.length?` Higher layers: ${P.slice(0,3).map(q=>Math.round(q.f)+' Hz ('+q.ratio.toFixed(2)+'×)').join(', ')}.`:''} These layers give the bowl its rich character; listen to how they change as the sound fades.</div>`:'';
  $('coachLast').innerHTML=`<div class="coach-card" style="--c:${col}">${si>=0?`<div style="font-size:16px;font-weight:900;color:${ST[si].col}">${n.name} · ${ST[si].name} · ${ST[si].sk}</div><div class="note" style="margin:2px 0 6px">${ST[si].theme} · “${ST[si].aff}”</div>`:''}${hmNoteLine(si)}${bowlLine}<div class="hm-k" style="margin-top:10px">MUSICAL DETAILS</div><b class="h">${head}</b>${stn}<ul>${pts.slice(0,4).map(p=>'<li>'+p+'</li>').join('')}</ul>${tip}<button class="essi-play mini" onclick="essiSpeak(this.parentNode.innerHTML,this)">▶ ESSI</button></div>`;
  if(si>=0)try{cjAdd(n.name,n.pc,'station',`Lit ${ST[si].name} · ${ST[si].sk}`,dur,' s held','#FFC928')}catch(e){}
  $('coachNow').innerHTML='<span class="cj-live">● LISTENING</span> Play the next note, or hold one longer for a deeper read.';
  coachStats();
}
function coachStats(){
  const N=CO.notes;if(!N.length){$('coachStats').innerHTML='';return}
  const bias=coMean(N.map(x=>x.avg)),cent=Math.round(100*N.filter(x=>Math.abs(x.avg)<=10).length/N.length);
  const steady=N.reduce((b,x)=>x.spread<b.spread?x:b),off=N.reduce((b,x)=>Math.abs(x.avg)>Math.abs(b.avg)?x:b),long=N.reduce((b,x)=>x.dur>b.dur?x:b);
  const tend=Math.abs(bias)<=5?'centered':bias>0?'leans sharp':'leans flat';
  $('coachStats').innerHTML=[[N.length,'notes studied'],[cent+'%','notes within ±10¢'],[coSign(bias),'overall tendency · '+tend],[steady.spread<1?'<±1¢':'±'+steady.spread.toFixed(0)+'¢','steadiest · '+steady.name],[coSign(off.avg),'furthest off · '+off.name],[long.dur.toFixed(1)+' s','longest hold · '+long.name],[CO.stations.size+'/7','stations reached']].map(([v,l])=>`<div><strong>${v}</strong><span>${l}</span></div>`).join('');
}
function coachReport(){const N=CO.notes;if(!N.length)return 'No notes studied yet.';
  return 'Electro Tuner · Live Coach report · '+new Date().toLocaleString()+'\n'+'Instrument: '+(INST[inst]?INST[inst].label:inst)+' · A='+A4+'\n'+N.map((x,i)=>`${i+1}. ${x.name} ${x.dur.toFixed(1)}s · avg ${coSign(x.avg)} · ±${x.spread.toFixed(0)}¢ · ${x.inPct}% within ±10¢${x.vib?` · vibrato ${x.vib.hz.toFixed(1)}Hz`:''}${Math.abs(x.drift)>=8?` · drift ${coSign(x.drift)}`:''}`).join('\n')+'\nSummary: '+[...document.querySelectorAll('#coachStats div')].map(d=>d.innerText.replace('\n',' ')).join(' | ')}
$('coachReset').onclick=()=>{CO.notes=[];CO.stations.clear();CO.note=null;$('coachLast').innerHTML='';$('coachStats').innerHTML='';$('coachNow').textContent='New session. Play a note.'};
$('coachCopy').onclick=async()=>{const t=coachReport();try{await navigator.clipboard.writeText(t);$('coachCopy').textContent='✅ Copied'}catch(e){prompt('Copy your report:',t)}setTimeout(()=>$('coachCopy').textContent='📋 Copy report',1500)};

/* ================= STUDY MY PLAY: whole-performance analysis (offline) ================= */
const SM={on:false,t0:0,dur:60,frames:[],timer:null,intent:'free'};
const SMV='study-v1';
function smFrame(now){
  if(!SM.on)return;const t=now-SM.t0;
  SM.frames.push({t,m:cur.f?cur.midi:null,db:cur.db,conf:cur.conf||0,vib:cur.vib?cur.vib.hz:null,va:cur.vib?cur.vib.amp:null});
  if(t>=SM.dur*1000)smFinish();
}
function smStart(sec){
  SM.dur=sec;SM.frames=[];SM.intent=$('smIntent').value;
  const go=()=>{SM.on=true;SM.t0=performance.now();$('smRun').style.display='block';$('smPick').style.display='none';$('smReport').innerHTML='';smTick()};
  if(!running){start().then(()=>{if(running)go();else $('smMsg').textContent='The microphone has to be on to study your play.'})}else go();
}
function smTick(){if(!SM.on)return;const el=(performance.now()-SM.t0)/1000,left=Math.max(0,SM.dur-el);
  $('smTime').textContent=`${Math.floor(left/60)}:${String(Math.floor(left%60)).padStart(2,'0')}`;$('smBar').style.width=(100*el/SM.dur)+'%';
  const n=SM.frames.filter(f=>f.m!==null).length;$('smLive').textContent=`Listening… ${n} pitched moments captured`;setTimeout(smTick,250)}
function smFinish(){if(!SM.on)return;SM.on=false;$('smRun').style.display='none';$('smPick').style.display='block';
  const R=smAnalyse(SM.frames,(performance.now()-SM.t0)/1000);smRender(R);smSave(R)}
/* ---- helpers ---- */
const smMean=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
const smMed=a=>{if(!a.length)return 0;const b=[...a].sort((x,y)=>x-y),k=b.length>>1;return b.length%2?b[k]:(b[k-1]+b[k])/2};
const smStd=a=>{if(a.length<2)return 0;const m=smMean(a);return Math.sqrt(smMean(a.map(x=>(x-m)*(x-m))))};
const smPct=(a,p)=>{if(!a.length)return 0;const b=[...a].sort((x,y)=>x-y);return b[Math.min(b.length-1,Math.floor(p*(b.length-1)))]};
const sgn=c=>(c>0?'+':'')+Math.round(c)+'¢';
const nm=m=>NAMES[((m%12)+12)%12]+(Math.floor(m/12)-1);
const SCALES={'major':[0,2,4,5,7,9,11],'natural minor':[0,2,3,5,7,8,10],'major pentatonic':[0,2,4,7,9],'minor pentatonic':[0,3,5,7,10],'Dorian':[0,2,3,5,7,9,10],'Mixolydian':[0,2,4,5,7,9,10]};
function smAnalyse(F,elapsed){
  const R={v:SMV,date:Date.now(),inst,instLabel:INST[inst]?INST[inst].label:inst,A4,dur:Math.round(elapsed),intent:SM.intent};
  const valid=F.filter(f=>f.m!==null&&f.conf>=.75);
  const dt=F.length>1?(F[F.length-1].t-F[0].t)/(F.length-1):16;
  R.pitchedSec=valid.length*dt/1000;
  /* note events: same rounded note, merge dropouts <100 ms */
  const ev=[];let curE=null,gapT=null;
  for(const f of F){
    const ok=f.m!==null&&f.conf>=.75;
    if(ok){const n=Math.round(f.m);
      if(curE&&n===curE.n&&(gapT===null||f.t-gapT<100)){curE.fr.push(f);curE.t1=f.t;gapT=null}
      else{if(curE)ev.push(curE);curE={n,t0:f.t,t1:f.t,fr:[f]};gapT=null}}
    else if(curE){if(gapT===null)gapT=f.t;if(f.t-gapT>=100){ev.push(curE);curE=null;gapT=null}}
  }
  if(curE)ev.push(curE);
  const events=ev.filter(e=>e.t1-e.t0>=150).map(e=>{
    const d=e.t1-e.t0,c=e.fr.map(f=>(f.m-e.n)*100);
    const st=e.fr.filter(f=>f.t-e.t0>=100&&e.t1-f.t>=80).map(f=>(f.m-e.n)*100);
    const steady=st.length&&(d-180)>=200;
    let settle=null;for(let i=0;i<e.fr.length;i++){const t=e.fr[i].t;let j=i,okk=true;while(j<e.fr.length&&e.fr[j].t-t<100){if(Math.abs((e.fr[j].m-e.n)*100)>10){okk=false;break}j++}if(okk&&j<e.fr.length){settle=t-e.t0;break}}
    const q=Math.max(1,Math.floor(st.length/4));const drift=st.length>=8?smMed(st.slice(-q))-smMed(st.slice(0,q)):0;
    const vibs=e.fr.filter(f=>f.vib);return {fr:e.fr,n:e.n,name:nm(e.n),t0:e.t0,t1:e.t1,d,bias:steady?smMed(st):smMed(c),std:steady?smStd(st):null,steady,st,settle,drift,
      vib:vibs.length>=3?{hz:smMed(vibs.map(f=>f.vib)),w:smMed(vibs.map(f=>f.va))*2.83,frac:vibs.length/e.fr.length}:null,db:smMed(e.fr.map(f=>f.db).filter(isFinite))}});
  R.events=events.length;
  R.limited=R.pitchedSec<5||events.length<5;
  const stF=events.filter(e=>e.steady).flatMap(e=>e.st);
  R.bias=smMean(stF);R.absErr=smMean(stF.map(Math.abs));
  R.p5=stF.length?100*stF.filter(c=>Math.abs(c)<=5).length/stF.length:0;
  R.p10=stF.length?100*stF.filter(c=>Math.abs(c)<=10).length/stF.length:0;
  R.p20=stF.length?100*stF.filter(c=>Math.abs(c)<=20).length/stF.length:0;
  const sEv=events.filter(e=>e.steady);
  R.stability=smMed(sEv.map(e=>e.std));
  R.steadyNotes=sEv.length;
  /* melodic vocabulary + key */
  const hist=new Array(12).fill(0);for(const e of sEv)hist[((e.n%12)+12)%12]+=e.d;
  if(!sEv.length)for(const e of events)hist[((e.n%12)+12)%12]+=e.d;
  R.hist=hist;const tot=hist.reduce((a,b)=>a+b,0)||1;const pcs=hist.filter(h=>h/tot>.02).length;
  const ends=[];
  /* phrases: <500 ms silence joins */
  const ph=[];let p=null;for(const e of events){if(p&&e.t0-p.t1<500){p.t1=e.t1;p.ev.push(e);p.snd+=e.d}else{if(p)ph.push(p);p={t0:e.t0,t1:e.t1,ev:[e],snd:e.d}}}if(p)ph.push(p);
  for(const q of ph)ends.push(((q.ev[q.ev.length-1].n%12)+12)%12);
  const cands=[];for(let r=0;r<12;r++)for(const [sn,iv] of Object.entries(SCALES)){
    const set=iv.map(x=>(x+r)%12),tpl=new Array(12).fill(0);set.forEach(x=>tpl[x]=1);
    const dot=hist.reduce((a,h,i)=>a+h*tpl[i],0),nh=Math.sqrt(hist.reduce((a,h)=>a+h*h,0))||1,nt=Math.sqrt(set.length);
    const sim=dot/(nh*nt),cov=dot/tot,end=ends.length?ends.filter(x=>x===r).length/ends.length:0;
    cands.push({name:NAMES[r]+' '+sn,score:.6*sim+.3*cov+.1*end,cov})}
  cands.sort((a,b)=>b.score-a.score);
  R.keyCands=cands.slice(0,3).map(c=>({name:c.name,score:+c.score.toFixed(2),cov:Math.round(c.cov*100)}));
  R.key=(pcs>=4&&R.pitchedSec>=10&&cands[0].cov>=.85&&cands[0].score-cands[1].score>=.08)?cands[0].name:null;
  R.pcs=pcs;
  const ns=events.map(e=>e.n);R.low=ns.length?nm(Math.min(...ns)):'—';R.high=ns.length?nm(Math.max(...ns)):'—';R.range=ns.length?Math.max(...ns)-Math.min(...ns):0;
  const used={};for(const e of events)used[e.name]=(used[e.name]||0)+e.d;R.top=Object.entries(used).sort((a,b)=>b[1]-a[1]).slice(0,3).map(x=>x[0]);
  /* habitual flat / sharp (each occurrence counts once) */
  const by={};for(const e of sEv)(by[e.name]=by[e.name]||[]).push(e);
  R.notes=Object.entries(by).map(([name,arr])=>{const b=arr.map(e=>e.bias),med=smMed(b);let tag='';
    if(arr.length>=3){if(med<-10&&b.filter(x=>x<-5).length/b.length>=.7)tag='flat';else if(med>10&&b.filter(x=>x>5).length/b.length>=.7)tag='sharp';else if(smStd(b)>15)tag='inconsistent'}
    return {name,n:arr[0].n,count:arr.length,med,sd:smStd(b),tag,strong:arr.length>=5}}).sort((a,b)=>a.n-b.n);
  /* phrasing */
  R.phrases=ph.length;R.phraseAvg=ph.length?smMean(ph.map(q=>(q.t1-q.t0)/1000)):0;R.phraseMax=ph.length?Math.max(...ph.map(q=>(q.t1-q.t0)/1000)):0;
  R.sustainMed=smMed(events.map(e=>e.d/1000));
  const rests=[];for(let i=1;i<ph.length;i++)rests.push((ph[i].t0-ph[i-1].t1)/1000);R.restAvg=smMean(rests);
  /* expression */
  const act=valid.map(f=>f.db).filter(isFinite);R.dyn=act.length?smPct(act,.95)-smPct(act,.10):0;
  const se=events.filter(e=>e.settle!==null);R.settle=smMed(se.map(e=>e.settle));R.slowEntry=se.length?se.filter(e=>e.settle>150).length/se.length:0;
  const dr=sEv.filter(e=>e.st.length>=8);R.drift=smMed(dr.map(e=>e.drift));R.driftFrac=dr.length?dr.filter(e=>Math.abs(e.drift)>10).length/dr.length:0;
  const vEv=events.filter(e=>e.vib);R.vibRate=vEv.length?smMed(vEv.map(e=>e.vib.hz)):null;R.vibWidth=vEv.length?smMed(vEv.map(e=>e.vib.w)):null;
  R.vibUse=sEv.length?sEv.reduce((a,e)=>a+(e.vib?e.vib.frac*e.d:0),0)/sEv.reduce((a,e)=>a+e.d,0):0;
  /* consistency over time (thirds) */
  const T=Math.max(1,elapsed*1000);R.thirds=[0,1,2].map(k=>{const lo=k*T/3,hi=(k+1)*T/3,es=sEv.filter(e=>e.t0>=lo&&e.t0<hi),c=es.flatMap(e=>e.st),ps=ph.filter(q=>q.t0>=lo&&q.t0<hi);
    return {n:es.length,absErr:c.length?smMean(c.map(Math.abs)):null,p10:c.length?100*c.filter(x=>Math.abs(x)<=10).length/c.length:null,stab:es.length?smMed(es.map(e=>e.std)):null,db:es.length?smMed(es.map(e=>e.db)):null,phr:ps.length?smMed(ps.map(q=>(q.t1-q.t0)/1000)):null}});
  const a=R.thirds[0],z=R.thirds[2];let dec=0;
  if(a.n>=3&&z.n>=3){if(z.absErr-a.absErr>=5)dec++;if(a.p10-z.p10>=10)dec++;if(z.stab>a.stab*1.25&&z.stab-a.stab>=3)dec++;if(a.phr&&z.phr&&z.phr<=a.phr*.8)dec++}
  R.decline=dec>=2;
  /* rhythm & flow */
  const on=[];for(const e of events){if(!on.length||e.t0-on[on.length-1]>=80)on.push(e.t0)}
  const ioi=[];for(let i=1;i<on.length;i++)ioi.push(on[i]-on[i-1]);
  R.npm=R.pitchedSec>0?events.length/(R.pitchedSec/60):0;R.ioi=smMed(ioi);R.ioiCV=ioi.length>2?smStd(ioi)/smMean(ioi):null;
  let rep=0,step=0,leap=0;for(let i=1;i<events.length;i++){const d=Math.abs(events[i].n-events[i-1].n);if(d===0)rep++;else if(d<=2)step++;else leap++}
  const mv=Math.max(1,rep+step+leap);R.rep=100*rep/mv;R.step=100*step/mv;R.leap=100*leap/mv;
  R.bpm=null;if(on.length>=12){let best=null;for(let bpm=40;bpm<=200;bpm++){for(const sub of [1,2]){const P=60000/bpm/sub;if(P<400)continue;let hit=0;for(const o of on){const ph2=((o-on[0])%P+P)%P;if(Math.min(ph2,P-ph2)<=70)hit++}const fr=hit/on.length,ch=140/P;if(fr>=.7&&fr-ch>=.35&&(!best||fr-ch>best.fr-best.ch))best={bpm,fr,ch}}}if(best)R.bpm=best.bpm}
  /* priorities: 100 × severity × √frequency × evidence */
  const iss=[];const evd=n=>Math.min(1,n/10);
  for(const nt of R.notes)if(nt.tag==='flat'||nt.tag==='sharp')iss.push({k:'note',score:100*Math.min(1,Math.abs(nt.med)/20)*Math.sqrt(nt.count/Math.max(1,R.steadyNotes))*evd(nt.count),
    title:`Center your ${nt.name}`,obs:`${nt.name} sat ${nt.tag} across ${nt.count} separate times (median ${sgn(nt.med)})${nt.strong?'':' · early pattern, needs more data'}.`,
    ex:`Five 4-second ${nt.name} notes against the reference tone on the station card.`,goal:`At least 80% within ±10¢ on ${nt.name}.`});
  if(Math.abs(R.bias)>5&&!iss.some(i=>i.k==='note'))iss.push({k:'bias',score:100*Math.min(1,Math.abs(R.bias)/20)*Math.sqrt(stF.length?stF.filter(c=>R.bias>0?c>5:c<-5).length/stF.length:0)*evd(R.steadyNotes),
    title:`Bring your overall pitch ${R.bias>0?'down':'up'} a touch`,obs:`Across the take you averaged ${sgn(R.bias)}.`,ex:INST[inst]&&INST[inst][R.bias>0?'sharp':'flat']||'Hold long notes against a reference tone.',goal:'Overall average within ±5¢.'});
  if(R.stability>8)iss.push({k:'stab',score:100*Math.min(1,R.stability/16)*Math.sqrt(sEv.filter(e=>e.std>8).length/Math.max(1,sEv.length))*evd(sEv.length),
    title:'Steady the middle of your notes',obs:`Typical note wavered ±${R.stability.toFixed(0)}¢ while held${R.vibUse>.3?' (part of this is vibrato)':''}.`,ex:inst==='flute'?'Long tones: 4 seconds each with relaxed, even air.':inst==='voice'?'Straight-tone holds on "oo", 4 seconds each, then add vibrato back.':'Hold single notes and listen for any wobble.',goal:'Typical steadiness under ±8¢.'});
  if(R.settle>150&&SM.intent!=='expression')iss.push({k:'entry',score:100*Math.min(1,R.settle/300)*Math.sqrt(R.slowEntry)*evd(se.length),
    title:'Land your note entrances',obs:`Notes took a median ${Math.round(R.settle)} ms to settle within ±10¢.`,ex:'Ten deliberate, straight entrances without sliding in.',goal:'Settle within 150 ms.'});
  if(Math.abs(R.drift)>10)iss.push({k:'drift',score:100*Math.min(1,Math.abs(R.drift)/20)*Math.sqrt(R.driftFrac)*evd(dr.length),
    title:'Hold pitch to the end of each note',obs:`Held notes typically drifted ${sgn(R.drift)} from start to finish.`,ex:inst==='flute'||inst==='voice'?'Keep the air steady as the note ends; practice 4-second holds with an even fade.':'Notice where the pitch moves as the note decays.',goal:'End-of-note drift under 10¢.'});
  if(R.decline)iss.push({k:'decline',score:100*Math.min(1,Math.max(0,(z.absErr-a.absErr))/10)*Math.sqrt(1/3)*evd(z.n),
    title:'Keep your accuracy through to the end',obs:`Within ±10¢ went from ${Math.round(a.p10)}% in the opening third to ${Math.round(z.p10)}% in the closing third.`,ex:'Short breaks between phrases; re-center on a reference note midway.',goal:'Closing third within 5 points of the opening.'});
  R.stTime=new Array(7).fill(0);R.between=0;for(const e of events){const si=stationOfPc(((e.n%12)+12)%12);if(si>=0)R.stTime[si]+=e.d/1000;else R.between+=e.d/1000}R.longHolds=events.filter(e=>e.d>=4000).length;
  R.priorities=iss.sort((x,y)=>y.score-x.score).slice(0,3).map(i=>({...i,score:Math.round(i.score)}));
  /* strengths (always at least one when data allows) */
  const str=[];const goodNote=R.notes.filter(n=>n.count>=3&&Math.abs(n.med)<=5).sort((a,b)=>b.count-a.count)[0];
  if(goodNote)str.push(`${goodNote.name} was centered every time it came back (${goodNote.count} times, median ${sgn(goodNote.med)}).`);
  if(R.p10>=75)str.push(`${Math.round(R.p10)}% of your held pitch was within ±10¢.`);
  if(R.stability&&R.stability<=5)str.push(`Very steady held notes (typical ${R.stability<1?'under ±1':'±'+R.stability.toFixed(0)}¢).`);
  if(R.vibRate&&R.vibRate>=4.5&&R.vibRate<=7)str.push(`Even vibrato around ${R.vibRate.toFixed(1)} Hz.`);
  if(R.phraseMax>=8)str.push(`Long phrasing: your longest phrase ran ${R.phraseMax.toFixed(1)} s.`);
  if(R.range>=12)str.push(`Wide range: ${R.low} to ${R.high} (${R.range} semitones).`);
  if(!str.length&&!R.limited)str.push(`You kept playing for ${Math.round(R.pitchedSec)} s of clear, measurable sound; that steady practice is what builds control.`);
  R.strengths=str.slice(0,2);
  R._ev=events;R._ph=ph;R._F=F;
  return R;
}
/* ---- report rendering ---- */
function smCanvas(id,h){return `<canvas id="${id}" style="width:100%;height:${h}px;display:block;border-radius:10px;background:#050907"></canvas>`}
function smRender(R){
  const el=$('smReport');
  if(R.limited){el.innerHTML=`<div class="coach-card" style="--c:#FFC928"><b class="h">Not enough to study yet</b><ul><li>I heard ${R.pitchedSec.toFixed(1)} s of clear pitch and ${R.events} notes.</li><li>A full study needs at least 5 s of clear pitch and 5 notes. Try a longer take, play a bit louder, or move closer to the phone.</li></ul></div>`;return}
  const pr=R.priorities.length?R.priorities.map((p,i)=>`<li><b>${i+1}. ${p.title}</b><br>${p.obs}<br><span style="color:#FFC928">Exercise</span> ${p.ex}<br><span style="color:#00FF85">Goal</span> ${p.goal}</li>`).join(''):'<li>No clear problem pattern stood out in this take. Keep going, or try a longer study for more evidence.</li>';
  const keyTxt=R.key?`Likely key: <b>${R.key}</b>`:(R.pcs>=4?`Key not certain. Closest fits: ${R.keyCands.map(c=>c.name).join(', ')}`:'Key undetermined (fewer than 4 different notes)');
  const habit=R.notes.filter(n=>n.tag).map(n=>`<b>${n.name}</b> ${n.tag==='inconsistent'?'was inconsistent':'tends '+n.tag} (${n.count}×, median ${sgn(n.med)})${n.strong?'':' · early pattern'}`);
  el.innerHTML=`
  <div class="coach-card" style="--c:#00FF85"><b class="h">SESSION INTELLIGENCE / ${String(smLoad().length+1).padStart(3,'0')} · ANALYZED</b><br><span class="note">${Math.floor(R.dur/60)?Math.floor(R.dur/60)+' min ':''}${R.dur%60?R.dur%60+' s ':''}take · ${R.instLabel} · ${R.events} note events</span>
  <div class="coach-stats" style="margin-top:8px">${[[Math.round(R.p10)+'%','held pitch within ±10¢'],[sgn(R.bias),'average tendency'],[R.absErr.toFixed(1)+'¢','average pitch error'],[R.stability<1?'<±1¢':'±'+R.stability.toFixed(0)+'¢','typical steadiness'],[R.events,'notes played'],[R.low+'–'+R.high,'range · '+R.range+' semitones']].map(([v,l])=>`<div><strong>${v}</strong><span>${l}</span></div>`).join('')}</div></div>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">My sound journey · body stations <button class="guide-i" onclick="guideOpen('healing')">?</button></h3><div class="coach" style="margin:0">${hmHTML(R.stTime,R.between,R.longHolds,false)}</div>
  <h3 class="smh">Musical analysis</h3>
  ${R.strengths.length?`<div class="coach-card" style="--c:#00FF85;margin-top:10px"><b class="h">DETECTED STRENGTH</b><ul>${R.strengths.map(s=>'<li>'+s+'</li>').join('')}</ul></div>`:''}
  <div class="coach-card" style="--c:#FFC928;margin-top:10px"><b class="h">NEXT PRACTICE FOCUS</b><ul style="list-style:none;padding-left:0">${pr}</ul></div>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">Pitch journey <button class="guide-i" onclick="guideOpen('pj')">?</button></h3>${smCanvas('smC1',150)}<p class="note">Every dot is a moment of held pitch. Green band = within ±10¢. Up = sharp, down = flat.</p>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">Melodic fingerprint <button class="guide-i" onclick="guideOpen('mf')">?</button></h3>${smCanvas('smC2',130)}<p class="note">${keyTxt}. Most used: ${R.top.join(', ')}. Bars are colored by station (a chosen spiritual convention, not a body measurement).</p>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">Note accuracy map <button class="guide-i" onclick="guideOpen('nam')">?</button></h3>${smCanvas('smC3',Math.max(80,R.notes.length*22+20))}<p class="note">${habit.length?habit.join(' · '):'No note showed a repeated flat or sharp habit (each note needs at least 3 appearances to judge).'}</p>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">Expression landscape <button class="guide-i" onclick="guideOpen('el')">?</button></h3>${smCanvas('smC4',120)}<p class="note">Loudness over time. Shaded = estimated phrases (${R.phrases}, average ${R.phraseAvg.toFixed(1)} s, longest ${R.phraseMax.toFixed(1)} s). These are sound-based phrase estimates, not a breath or lung measurement. Dynamic range ${Math.round(R.dyn)} dB${R.vibRate?` · vibrato ${R.vibRate.toFixed(1)} Hz, about ${Math.round(R.vibWidth)}¢ peak to peak, used ${Math.round(R.vibUse*100)}% of held time`:''}.</p>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">Consistency: opening · middle · closing <button class="guide-i" onclick="guideOpen('con')">?</button></h3>${smCanvas('smC5',110)}<p class="note">${R.decline?'Your consistency dropped toward the end (at least two measures got worse). This shows declining consistency, not confirmed tiredness.':'No meaningful drop from start to finish.'}</p>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">Flow <button class="guide-i" onclick="guideOpen('flow')">?</button></h3><p class="note">${Math.round(R.npm)} notes per minute of playing · ${Math.round(R.step)}% steps, ${Math.round(R.leap)}% leaps, ${Math.round(R.rep)}% repeats${R.bpm?` · a steady pulse near ${R.bpm} BPM`:' · no steady pulse detected (fine for free playing; timing is not graded without a metronome)'}.</p>
  <h3 class="smh" style="display:flex;align-items:center;gap:8px">My growth <button class="guide-i" onclick="guideOpen('growth')">?</button></h3>${smCanvas('smC6',110)}<p class="note" id="smGrowthTxt"></p>
  <div class="controls" style="margin-top:8px"><button class="s" id="smCopy">📋 Copy study</button><button class="s" id="smJson">⬇ Export data</button></div>
  <p class="note" style="margin-top:8px">How to read this: thresholds (±5¢, ±10¢, 3 appearances) are sensible starting defaults, not universal standards. Expressive slides, bends and vibrato are reported, not counted as mistakes. One pitch at a time is measured, so chords and overlapping bowl tones are not analyzed.</p>`;
  requestAnimationFrame(()=>{smDraw(R);smGrowth(R)});
  $('smCopy').onclick=async()=>{const t=smText(R);try{await navigator.clipboard.writeText(t);$('smCopy').textContent='✅ Copied'}catch(e){prompt('Copy:',t)}};
  $('smJson').onclick=()=>{const o={...R};delete o._ev;delete o._ph;delete o._F;const b=new Blob([JSON.stringify(o,null,1)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download='electro-tuner-study-'+new Date(R.date).toISOString().slice(0,16).replace(':','')+'.json';a.click()};
  el.scrollIntoView({behavior:'smooth',block:'start'});
}
function smDraw(R){
  const C=(id)=>{const c=$(id);const g=fit(c);return [g,c.width,c.height,Math.min(2,DPR())]};
  const T=Math.max(1,R.dur*1000);
  {const [g,W,H,d]=C('smC1');const y=c=>H/2-Math.max(-50,Math.min(50,c))/50*(H/2-6*d);g.fillStyle='rgba(0,255,133,.10)';g.fillRect(0,y(10),W,y(-10)-y(10));g.strokeStyle='#1f3a28';g.beginPath();g.moveTo(0,H/2);g.lineTo(W,H/2);g.stroke();
    for(const e of R._ev){g.fillStyle='rgba(244,245,233,.25)';g.fillRect(e.t0/T*W,0,1*d,4*d);const c0=smMed(e.fr.map(f=>(f.m-e.n)*100));g.strokeStyle=Math.abs(c0)<=5?'#00FF85':Math.abs(c0)<=15?'#FFC928':'#FF3434';g.lineWidth=2*d;g.beginPath();e.fr.forEach((f,k)=>{const x=f.t/T*W,yy=y((f.m-e.n)*100);k?g.lineTo(x,yy):g.moveTo(x,yy)});g.stroke()}
    g.fillStyle='#F4F5E9aa';g.font=`${10*d}px system-ui`;g.fillText('+50¢',3*d,11*d);g.fillText('−50¢',3*d,H-4*d)}
  {const [g,W,H,d]=C('smC2');const mx=Math.max(...R.hist)||1,bw=W/12;for(let i=0;i<12;i++){const h=R.hist[i]/mx*(H-22*d),s=stationOfPc(i);g.fillStyle=s>=0?ST[s].col:'#5a6b5f';g.globalAlpha=.9;g.fillRect(i*bw+3*d,H-16*d-h,bw-6*d,h);g.globalAlpha=1;g.fillStyle='#F4F5E9';g.font=`${10*d}px system-ui`;g.textAlign='center';g.fillText(NAMES[i],i*bw+bw/2,H-4*d)}}
  {const [g,W,H,d]=C('smC3');const cx=W*.55,sc=(W*.4)/40,rh=22*d;g.strokeStyle='#00FF8566';g.beginPath();g.moveTo(cx,0);g.lineTo(cx,H);g.stroke();g.fillStyle='rgba(0,255,133,.08)';g.fillRect(cx-10*sc,0,20*sc,H);
    R.notes.forEach((n,i)=>{const yy=10*d+i*rh,v=Math.max(-40,Math.min(40,n.med));g.fillStyle=Math.abs(v)<=5?'#00FF85':Math.abs(v)<=15?'#FFC928':'#FF3434';g.fillRect(Math.min(cx,cx+v*sc),yy,Math.abs(v*sc)||2*d,rh*.6);
      g.fillStyle='#F4F5E9';g.font=`${11*d}px system-ui`;g.textAlign='left';g.fillText(`${n.name}  ${sgn(n.med)}  ${n.count}×`,4*d,yy+rh*.5)})}
  {const [g,W,H,d]=C('smC4');for(const q of R._ph){g.fillStyle='rgba(255,201,40,.10)';g.fillRect(q.t0/T*W,0,(q.t1-q.t0)/T*W,H)}
    const fr=R._F.filter(f=>isFinite(f.db));if(fr.length){const lo=Math.min(...fr.map(f=>f.db)),hi=Math.max(...fr.map(f=>f.db));g.strokeStyle='#00FF85';g.lineWidth=1.5*d;g.beginPath();fr.forEach((f,i)=>{const x=f.t/T*W,y=H-((f.db-lo)/(hi-lo||1))*(H-8*d)-4*d;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();
      g.fillStyle='#FF3434';for(const f of R._F)if(f.vib)g.fillRect(f.t/T*W,H-3*d,1*d,3*d)}}
  {const [g,W,H,d]=C('smC5');const lab=['Opening','Middle','Closing'],bw=W/3;R.thirds.forEach((t,i)=>{const v=t.p10===null?0:t.p10,h=v/100*(H-26*d);g.fillStyle=v>=75?'#00FF85':v>=50?'#FFC928':'#FF3434';g.globalAlpha=.85;g.fillRect(i*bw+bw*.2,H-16*d-h,bw*.6,h);g.globalAlpha=1;g.fillStyle='#F4F5E9';g.font=`${11*d}px system-ui`;g.textAlign='center';g.fillText(t.p10===null?'—':Math.round(v)+'%',i*bw+bw/2,H-20*d-h);g.fillText(lab[i],i*bw+bw/2,H-4*d)})}
}
function smHabits(){try{const all=JSON.parse(localStorage.getItem('rl_habits')||'{}');return all[inst+'|'+A4]||{}}catch(e){return {}}}
function smSaveHabits(R){try{const all=JSON.parse(localStorage.getItem('rl_habits')||'{}'),k=R.inst+'|'+R.A4,h=all[k]||{};
  for(const n of R.notes){if(n.count<3)continue;if(n.tag==='flat'||n.tag==='sharp')h[n.name]={med:n.med,count:(h[n.name]?h[n.name].count:0)+n.count,tag:n.tag};else if(Math.abs(n.med)<=5)delete h[n.name]}
  all[k]=h;localStorage.setItem('rl_habits',JSON.stringify(all));JT.habits=null}catch(e){}}
function smLoad(){try{return JSON.parse(localStorage.getItem('rl_study')||'[]')}catch(e){return []}}
function smSave(R){if(R.limited)return;smSaveHabits(R);const keep=['v','date','inst','A4','dur','intent','p5','p10','p20','bias','absErr','stability','events','range','key','phraseAvg','vibRate'];const o={};keep.forEach(k=>o[k]=R[k]);const a=smLoad();a.push(o);try{localStorage.setItem('rl_study',JSON.stringify(a.slice(-120)))}catch(e){}}
function smGrowth(R){
  const all=smLoad().filter(s=>s.inst===R.inst&&s.A4===R.A4).slice(-14);const c=$('smC6');if(!c)return;const g=fit(c),W=c.width,H=c.height,d=Math.min(2,DPR());
  if(all.length<2){$('smGrowthTxt').textContent='This is your first saved study on this instrument. Each new study adds a point, so you can watch your accuracy grow over days.';g.fillStyle='#F4F5E9aa';g.font=`${12*d}px system-ui`;g.fillText('Your growth line starts after the next study.',10*d,H/2);return}
  g.strokeStyle='#1f3a28';for(const v of [50,75,100]){const y=H-v/100*(H-12*d)-6*d;g.beginPath();g.moveTo(0,y);g.lineTo(W,y);g.stroke()}
  g.strokeStyle='#00FF85';g.lineWidth=2*d;g.beginPath();all.forEach((s,i)=>{const x=10*d+i/(all.length-1)*(W-20*d),y=H-s.p10/100*(H-12*d)-6*d;i?g.lineTo(x,y):g.moveTo(x,y)});g.stroke();
  all.forEach((s,i)=>{const x=10*d+i/(all.length-1)*(W-20*d),y=H-s.p10/100*(H-12*d)-6*d;g.fillStyle='#FFC928';g.beginPath();g.arc(x,y,3*d,0,Math.PI*2);g.fill()});
  const last5=all.slice(-5),prev5=all.slice(-10,-5);let t=`${all.length} studies on ${R.instLabel} at A=${R.A4}. Line = % of held pitch within ±10¢.`;
  if(prev5.length>=3){const a=smMed(prev5.map(s=>s.p10)),b=smMed(last5.map(s=>s.p10));t+=` Your last ${last5.length} studies (median ${Math.round(b)}%) vs the ${prev5.length} before (median ${Math.round(a)}%): ${b-a>=3?'improving ↑':a-b>=3?'down a bit ↓':'holding steady'}.`}
  $('smGrowthTxt').textContent=t;
}
function smText(R){return `Electro Tuner · Study My Play · ${new Date(R.date).toLocaleString()}\n${R.instLabel} · A=${R.A4} · ${R.dur}s · ${R.events} notes · range ${R.low}-${R.high}\nWithin ±10¢: ${Math.round(R.p10)}% · ±5¢: ${Math.round(R.p5)}% · avg ${sgn(R.bias)} · avg error ${R.absErr.toFixed(1)}¢ · steadiness ±${R.stability.toFixed(0)}¢\n${R.key?'Likely key: '+R.key:'Key undetermined'}\nWent well: ${R.strengths.join(' ')}\nWork on:\n${R.priorities.map((p,i)=>`${i+1}. ${p.title}: ${p.obs} Exercise: ${p.ex} Goal: ${p.goal}`).join('\n')}`}
document.querySelectorAll('[data-sm]').forEach(b=>b.onclick=()=>smStart(+b.dataset.sm));
$('smStop').onclick=()=>smFinish();


/* ================= COACH JOURNAL: every finding kept, merged, saved, exportable ================= */
const CJ={sid:Date.now(),t0:null,rows:[],showAll:false};
(function(){try{const o=JSON.parse(localStorage.getItem('rl_coachlog')||'null');if(o&&o.sid&&Date.now()-o.sid<6*3600e3){CJ.sid=o.sid;CJ.rows=o.rows||[];CJ.t0=o.t0||null}}catch(e){}})();
function cjSave(){try{localStorage.setItem('rl_coachlog',JSON.stringify({sid:CJ.sid,t0:CJ.t0,rows:CJ.rows.slice(0,300)}))}catch(e){}}
function cjMed(a){const b=[...a].sort((x,y)=>x-y),k=b.length>>1;return b.length?(b.length%2?b[k]:(b[k-1]+b[k])/2):0}
function cjAdd(note,pc,type,title,val,unit,col){
  const now=Date.now();if(!CJ.t0)CJ.t0=now;const t=(now-CJ.t0)/1000;
  let r=CJ.rows.find(x=>x.note===note&&x.type===type);
  if(r&&val!==null&&r.vals.length&&Math.abs(val-cjMed(r.vals))>=5&&unit==='¢'){r=null}
  if(r){if(val!==null)r.vals.push(val);r.count++;r.last=t;r.title=title;CJ.rows.splice(CJ.rows.indexOf(r),1);CJ.rows.unshift(r)}
  else{CJ.rows.unshift({note,pc,type,title,vals:val===null?[]:[val],unit,col,count:1,first:t,last:t,fresh:now})}
  cjSave();cjRender();
}
function cjFromNote(rec){
  const a=Math.abs(rec.avg),k=rec.name;
  const prev=CJ.rows.find(x=>x.note===k&&(x.type==='flat'||x.type==='sharp'));
  if(a<=5){cjAdd(k,rec.pc,'centered','Centered pitch',rec.avg,'¢','#00FF85');if(prev)cjAdd(k,rec.pc,'improved',`Improved: centered after being ${prev.type}`,rec.avg,'¢','#00FF85')}
  else if(a<=10)cjAdd(k,rec.pc,'close','Close to center',rec.avg,'¢','#FFC928');
  else cjAdd(k,rec.pc,rec.avg>0?'sharp':'flat',rec.avg>0?'Sits sharp':'Sits flat',rec.avg,'¢','#FF3434');
  if(rec.vib)cjAdd(k,rec.pc,'vibrato',`Vibrato ${rec.vib.hz.toFixed(1)} Hz`,rec.vib.amp*1.41,'¢ wide','#FFC928');
  else if(rec.spread>10)cjAdd(k,rec.pc,'unsteady','Unsteady hold',rec.spread,'¢ spread','#FF3434');
  else if(rec.spread<=4&&rec.dur>=1)cjAdd(k,rec.pc,'steady','Very steady hold',rec.spread,'¢ spread','#00FF85');
  if(Math.abs(rec.drift)>=8)cjAdd(k,rec.pc,rec.drift>0?'driftup':'driftdown',rec.drift>0?'Drifts up while held':'Drifts down while held',rec.drift,'¢','#FFC928');
  if(rec.slide)cjAdd(k,rec.pc,'slide',`Slides in from ${rec.slide}`,null,'','#FFC928');
}
function cjRender(){
  const box=$('cjList');if(!box)return;const rows=CJ.showAll?CJ.rows:CJ.rows.slice(0,4);
  const pats=CJ.rows.filter(r=>r.count>=3).length;
  $('cjHead').innerHTML=`<span class="cj-live">● LIVE</span> ${CJ.rows.reduce((a,r)=>a+r.count,0)} observations · ${pats} pattern${pats===1?'':'s'}`;
  const fmt=s=>`${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`;
  box.innerHTML=rows.length?rows.map(r=>{const si=stationOfPc(r.pc),nc=si>=0?ST[si].col:'#F4F5E9',v=r.vals.length?cjMed(r.vals):null;
    const meas=v===null?'':(r.unit==='¢'?`${centsWord(v)} · ${v>0?'+':''}${Math.round(v)}¢`:`${Math.round(v)}${r.unit}`);
    return `<div class="cj-row${Date.now()-r.fresh<400?' cj-new':''}"><span class="cj-note" style="color:${nc};border-color:${nc}55">${r.note}</span><span class="cj-mid"><b style="color:${r.col}">${r.title}</b><small>${meas}${meas?' · ':''}${r.count} time${r.count>1?'s':''}</small></span><span class="cj-t">${fmt(r.last)}</span></div>`}).join(''):'<div class="note">Findings will collect here as you play. Nothing gets lost.</div>';
  $('cjMore').style.display=CJ.rows.length>4?'inline-block':'none';$('cjMore').textContent=CJ.showAll?'Show less':`View all ${CJ.rows.length}`;
}
/* ---------- PNG report (1080 wide, grows taller for long journals) ---------- */
function cjImage(){
  const W=1080,rowsH=Math.max(1,CJ.rows.length)*92,H=Math.max(1920,240+380+340+120+rowsH+300+440);
  const c=document.createElement('canvas');c.width=W;c.height=H;const g=c.getContext('2d');
  g.fillStyle='#050907';g.fillRect(0,0,W,H);
  // faint holographic geometry
  g.globalAlpha=.05;for(let k=0;k<6;k++){g.strokeStyle=['#FF3434','#FFC928','#00FF85'][k%3];g.lineWidth=3;g.beginPath();for(let p=0;p<=240;p++){const t=p/240*Math.PI*2,r=300+k*40+18*Math.sin(t*6+k);const x=W/2+Math.cos(t)*r,y=H*.45+Math.sin(t)*r;p?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}g.globalAlpha=1;
  // rasta bar + header
  ['#FF3434','#FFC928','#00FF85'].forEach((cc,i)=>{g.fillStyle=cc;g.fillRect(i*W/3,0,W/3,12)});
  g.textBaseline='alphabetic';g.fillStyle='#F4F5E9';g.font='900 64px system-ui';g.fillText('ELECTRO TUNER',64,120);
  g.fillStyle='#FFC928';g.font='800 30px system-ui';g.fillText('CREATED BY JAH RASTA  ☥',64,166);
  g.fillStyle='#9fb3a6';g.font='500 30px system-ui';g.fillText(`Coach Report · ${new Date().toLocaleString()} · ${INST[inst]?INST[inst].label:inst} · A=${A4}`,64,214);
  // summary stats + alignment ring
  const N=CO.notes,y0=260;g.fillStyle='#101C15';rr(g,40,y0,W-80,350,24);g.fill();
  const within=N.length?Math.round(100*N.filter(x=>Math.abs(x.avg)<=10).length/N.length):0;
  const cx=200,cy=y0+175,R=120;g.lineWidth=26;g.strokeStyle='#1f3a28';g.beginPath();g.arc(cx,cy,R,0,Math.PI*2);g.stroke();
  g.strokeStyle=within>=75?'#00FF85':within>=50?'#FFC928':'#FF3434';g.beginPath();g.arc(cx,cy,R,-Math.PI/2,-Math.PI/2+Math.PI*2*within/100);g.stroke();
  g.fillStyle='#F4F5E9';g.font='900 58px system-ui';g.textAlign='center';g.fillText(within+'%',cx,cy+12);g.font='600 22px system-ui';g.fillStyle='#9fb3a6';g.fillText('notes within ±10¢',cx,cy+46);g.textAlign='left';
  const bias=N.length?N.reduce((a,x)=>a+x.avg,0)/N.length:0,st=N.length?N.reduce((b,x)=>x.spread<b.spread?x:b):null,off=N.length?N.reduce((b,x)=>Math.abs(x.avg)>Math.abs(b.avg)?x:b):null;
  const stats=[[N.length,'notes studied'],[(bias>0?'+':'')+Math.round(bias)+'¢',Math.abs(bias)<=5?'overall · centered':bias>0?'overall · leans sharp':'overall · leans flat'],[st?st.name:'—','steadiest note'],[off?`${off.name} ${off.avg>0?'+':''}${Math.round(off.avg)}¢`:'—','furthest off']];
  stats.forEach(([v,l],i)=>{const x=400+(i%2)*320,y=y0+120+Math.floor(i/2)*140;g.fillStyle='#F4F5E9';g.font='900 46px system-ui';g.fillText(String(v),x,y);g.fillStyle='#9fb3a6';g.font='500 26px system-ui';g.fillText(l,x,y+38)});
  // pitch journey (each studied note)
  const y1=y0+380;g.fillStyle='#FFC928';g.font='800 34px system-ui';g.fillText('PITCH JOURNEY',64,y1+10);
  g.fillStyle='#101C15';rr(g,40,y1+30,W-80,280,20);g.fill();const py=v=>y1+170-Math.max(-50,Math.min(50,v))/50*120;
  g.fillStyle='rgba(0,255,133,.12)';g.fillRect(60,py(10),W-120,py(-10)-py(10));g.strokeStyle='#294535';g.lineWidth=2;g.beginPath();g.moveTo(60,py(0));g.lineTo(W-60,py(0));g.stroke();
  g.fillStyle='#9fb3a6';g.font='500 22px system-ui';g.fillText('+50¢',64,y1+64);g.fillText('−50¢',64,y1+300);
  N.forEach((x,i)=>{const px=140+(N.length>1?i/(N.length-1):0.5)*(W-240),yy=py(x.avg),cc=Math.abs(x.avg)<=5?'#00FF85':Math.abs(x.avg)<=15?'#FFC928':'#FF3434';g.fillStyle=cc;g.beginPath();g.arc(px,yy,10,0,Math.PI*2);g.fill();if(N.length<=24){g.fillStyle='#F4F5E9';g.font='600 18px system-ui';g.textAlign='center';g.fillText(x.name,px,yy-16);g.textAlign='left'}});
  // healing map
  let yh=y1+360;g.fillStyle='#FFC928';g.font='800 34px system-ui';g.fillText('SOUND & BODY · STATION COVERAGE',64,yh+10);yh+=36;
  const ht=HM.t.reduce((a,b)=>a+b,0)||1,hm=Math.max(...HM.t)||1;ST.forEach((s2,i)=>{const yy=yh+i*40;g.fillStyle=s2.col;g.font='900 26px system-ui';g.fillText(s2.n,64,yy+28);g.fillStyle='#F4F5E9';g.font='600 24px system-ui';g.fillText(s2.name,110,yy+28);
    g.fillStyle='#16221a';rr(g,330,yy+12,560,18,9);g.fill();g.fillStyle=s2.col;rr(g,330,yy+12,Math.max(2,560*HM.t[i]/hm),18,9);g.fill();g.fillStyle='#9fb3a6';g.font='500 22px system-ui';g.fillText(Math.round(100*HM.t[i]/ht)+'%',910,yy+30)});
  yh+=7*40+20;const topi=HM.t.indexOf(Math.max(...HM.t));if(HM.t[topi]>=1){const s2=ST[topi];g.fillStyle='#F4F5E9';g.font='600 26px system-ui';g.fillText(`Most explored: ${s2.name} (${s2.sk}) · “${s2.aff}”`,64,yh+10);
    g.fillStyle='#9fb3a6';g.font='500 22px system-ui';g.fillText('Tradition: '+s2.theme.slice(0,70),64,yh+44);g.fillText('Station links are a spiritual map, not a medical test.',64,yh+76);yh+=96}
  // journal
  let y2=yh+20;g.fillStyle='#FFC928';g.font='800 34px system-ui';g.fillText(`COACH JOURNAL · ${CJ.rows.reduce((a,r)=>a+r.count,0)} observations`,64,y2+10);y2+=36;
  CJ.rows.forEach(r=>{g.fillStyle='#101C15';rr(g,40,y2,W-80,80,16);g.fill();const si=stationOfPc(r.pc),nc=si>=0?ST[si].col:'#F4F5E9';
    g.fillStyle=nc;g.font='900 36px system-ui';g.fillText(r.note,64,y2+52);g.fillStyle=r.col;g.font='800 32px system-ui';g.fillText(r.title,200,y2+40);
    const v=r.vals.length?cjMed(r.vals):null;g.fillStyle='#9fb3a6';g.font='500 24px system-ui';g.fillText(`${v===null?'':(r.unit==='¢'?(v>0?'+':'')+Math.round(v)+'¢ median':Math.round(v)+r.unit)+' · '}${r.count} time${r.count>1?'s':''}`,200,y2+70);y2+=92});
  if(!CJ.rows.length){g.fillStyle='#9fb3a6';g.font='500 30px system-ui';g.fillText('No findings yet: play a few held notes first.',64,y2+40);y2+=80}
  // practice focus + footer
  y2+=30;const pat=CJ.rows.filter(r=>(r.type==='flat'||r.type==='sharp')).sort((a,b)=>b.count-a.count)[0];
  g.fillStyle='#101C15';rr(g,40,y2,W-80,190,20);g.fill();g.fillStyle='#FFC928';g.font='800 32px system-ui';g.fillText('NEXT PRACTICE FOCUS',64,y2+54);
  g.fillStyle='#F4F5E9';g.font='600 34px system-ui';g.fillText(pat?`${pat.note} ${pat.type} (${pat.count}×, median ${Math.round(cjMed(pat.vals))}¢)`:'Keep it up: no repeated flat or sharp habit found.',64,y2+108);
  g.fillStyle='#9fb3a6';g.font='500 26px system-ui';g.fillText(pat?'Hold 4-second notes against the reference tone until 80% sit within ±10¢.':'Try Study My Play for a deeper look.',64,y2+152);
  g.fillStyle='#294535';g.fillRect(0,H-70,W,1);g.fillStyle='#9fb3a6';g.font='600 24px system-ui';g.fillText('Electro Tuner · Created by Jah Rasta · measured from your sound, nothing guessed',64,H-28);
  return c;
}
function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function cjName(){const d=new Date(),p=n=>String(n).padStart(2,'0');return `ElectroTuner_${(INST[inst]?INST[inst].label:inst).replace(/\s+/g,'')}_${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}.png`}
async function cjExport(share){
  const c=cjImage();const blob=await new Promise(r=>c.toBlob(r,'image/png'));const name=cjName();
  if(share&&navigator.canShare){const f=new File([blob],name,{type:'image/png'});if(navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:'Electro Tuner Coach Report'});return}catch(e){if(e&&e.name==='AbortError')return}}}
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
}
$('cjMore').onclick=()=>{CJ.showAll=!CJ.showAll;cjRender()};
$('cjSave').onclick=()=>cjExport(false);$('cjShare').onclick=()=>cjExport(true);
$('cjClear').onclick=()=>{CJ.rows=[];CJ.sid=Date.now();CJ.t0=null;cjSave();cjRender()};
cjRender();


/* ================= HEALING MAP: where the sound is highlighting the body ================= */
const HM={t:new Array(7).fill(0),between:0,last:0,longHolds:0,holdStart:0,holdNote:null,lowT:0,highT:0};
function hmTick(now){
  const dt=HM.last?Math.min(.1,(now-HM.last)/1000):0;HM.last=now;
  const live=running&&cur&&cur.f&&cur.pc!==null&&cur.conf>.75;if(!live){HM.holdNote=null;return}
  const si=stationOfPc(cur.pc);if(si>=0)HM.t[si]+=dt;else HM.between+=dt;
  if(cur.midi<60)HM.lowT+=dt;else if(cur.midi>=72)HM.highT+=dt;
  if(HM.holdNote!==cur.name){HM.holdNote=cur.name;HM.holdStart=now;HM.counted=false}else if(!HM.counted&&now-HM.holdStart>=4000){HM.longHolds++;HM.counted=true}
  const nk=JT.has?JT.name:'';if(now-(HM.drawn||0)>1000||(nk!==HM.lastNk&&now-(HM.drawn||0)>250)){HM.drawn=now;HM.lastNk=nk;hmRender()}
}
window.HMOPEN={v:false};const HMOPEN=window.HMOPEN;
const RESEARCH={
  breath:'Slow breathing can shift heart-rate variability toward a calmer, more relaxed state.',
  music:'Listening to music can lower felt stress and some body stress responses.',
  hum:'Humming has been shown in small studies to raise nitric oxide in the nose for a short time; wider healing benefits are not proven.',
  bowl:'Early studies suggest singing bowls may help relaxation and mood; study quality varies.',
  flute:'Flute playing involves controlled breathing out and offers a chance for breath awareness.',
  note:'No study shows that a single musical note heals a specific gland, organ or chakra.'};
function hmBody(si){const s=ST[si],b=BODY[si]||{},k=SKT[si]||{};return {s,b,k}}
function hmLine(si){const {s,b}=hmBody(si);return `<span style="color:${s.col}">${s.name}</span> (${s.sk}) · ${s.loc.toLowerCase()} · ${s.gl.toLowerCase()}${b.organs?' · '+b.organs.split(',').slice(0,2).join(',').toLowerCase():''}`}
function hmEffects(){
  const out=[],tot=HM.t.reduce((a,b)=>a+b,0);
  if(HM.longHolds>=2)out.push(`Measured: ${HM.longHolds} notes held 4 s or longer. Research: long, steady tones slow the out-breath, and ${RESEARCH.breath.toLowerCase()}`);
  if(inst==='voice')out.push('Notice where you feel the buzz: face, throat or chest. Research: '+RESEARCH.hum.toLowerCase()+(HM.lowT>HM.highT?' Your lower notes resonate more in the chest.':HM.highT>HM.lowT?' Your higher notes resonate more in the head and face.':''));
  if(inst==='bowl')out.push('Research: '+RESEARCH.bowl.toLowerCase()+' Bowls make several tones at once, so I report the strongest one.');
  if(inst==='flute')out.push('Research: '+RESEARCH.flute.toLowerCase());
  if(cur&&cur.vib)out.push(`Your vibrato pulses about ${cur.vib.hz.toFixed(1)} times a second. That is your sound's rhythm, not a reading of your brainwaves.`);
  if(tot>0&&HM.t.filter(x=>x>=1).length===7)out.push('You touched all seven stations: a full journey from Root to Crown.');
  return out;
}
function hmRender(){const box=$('hmBox');if(!box)return;box.innerHTML=hmHTML(HM.t,HM.between,HM.longHolds,true)}
function hmHTML(T,between,longHolds,live){
  const HM={t:T,between,longHolds,lowT:0,highT:0};const tot=T.reduce((a,b)=>a+b,0);
  if(tot<1){return '<div class="note">As you play, I map which stations your notes highlight (musical station coverage) and what that means in the tradition, in research, and in your measured sound.</div>'}
  const mx=Math.max(...HM.t);const top=HM.t.map((v,i)=>[v,i]).sort((a,b)=>b[0]-a[0]).filter(x=>x[0]>=1);
  const bars=ST.map((s,i)=>`<div class="hm-row"><span class="hm-n" style="color:${s.col}">${s.n}</span><span class="hm-lbl">${s.name}</span><span class="hm-bar"><i style="width:${mx?100*HM.t[i]/mx:0}%;background:${s.col}"></i></span><span class="hm-v">${Math.round(HM.t[i])}s</span></div>`).join('');
  let now='';if(live&&JT.has&&JT.pc!==null&&stationOfPc(JT.pc)>=0){const si=stationOfPc(JT.pc),q=ST[si],kk=SKT[si]||{};
    now=`<div class="hm-now" style="--c:${q.col}"><span class="hm-k">NOW · LIVE STATION</span><div class="hm-now-n"><b style="color:${q.col}">${q.name}</b> <span>${q.sk}${kk.dev?' · '+kk.dev:''}</span><em>${JT.name}</em></div><div>${q.theme.split(',').slice(0,2).join(' ·')} · “${q.aff}”</div><div class="note">Notice where you personally feel this sound. ${q.loc}.</div></div>`}
  const t1=top[0]?top[0][1]:-1;let focus='';
  if(t1>=0){const {s,b,k}=hmBody(t1);const pct=Math.round(100*HM.t[t1]/(tot+HM.between));
    focus=`<div class="hm-focus" style="--c:${s.col}"><span class="hm-k">SESSION · MOST EXPLORED</span><b>${s.name} · ${s.sk}${k.dev?' · '+k.dev:''} · ${s.n}</b><div style="margin-top:4px">${s.theme.split(',').slice(0,2).join(' and ')} · “${s.aff}” · ${Math.round(HM.t[t1])} s (${pct}% of your playing).</div><details class="hm-more"${HMOPEN.v?' open':''} ontoggle="HMOPEN.v=this.open"><summary>Learn more: tradition · research · measured</summary>
    <div class="hm-layer"><span class="hm-k">TRADITIONAL WISDOM</span>${s.name} sits at the ${(b.pt||s.loc).split('(')[0].trim().toLowerCase()} and is linked with ${s.theme.toLowerCase()}. Element ${s.el.toLowerCase()} · affirmation “${s.aff}”. Some modern chakra systems link it symbolically with the ${s.gl.toLowerCase()}${b.organs?' and '+b.organs.split(',').slice(0,2).join(',').toLowerCase():''}.<br><small>Traditional themes of balance: ${(b.bal||[]).join(' · ')}. Breath cue: ${b.breath||'slow, even breathing'}. Symbolic companions: ${b.stones||s.cry}; ${b.herbs||''}.</small></div>
    <div class="hm-layer"><span class="hm-k">RESEARCH INSIGHT</span>${HM.longHolds>=2?RESEARCH.breath:RESEARCH.music} ${RESEARCH.note}</div>
    <div class="hm-layer"><span class="hm-k">YOUR MEASURED SOUND</span>${Math.round(HM.t[t1])} s on ${s.n} notes (${pct}% of your playing) · ${HM.longHolds} hold${HM.longHolds===1?'':'s'} of 4 s+${live&&cur&&cur.vib?` · vibrato ${cur.vib.hz.toFixed(1)} Hz`:''}.</div></details></div>`}
  const missing=ST.map((s,i)=>HM.t[i]<1?s:null).filter(Boolean);
  const eff=live?hmEffects():[];
  return `${now}${live?'<span class="hm-k" style="margin-top:10px">SESSION COVERAGE</span>':''}${bars}${HM.between>=1?`<div class="note" style="margin-top:4px">${Math.round(HM.between)} s on notes between stations (sharps and flats).</div>`:''}${focus}
  ${eff.length?`<div class="hm-eff"><b>Sound characteristics &amp; possible connections</b> <small class="note">measured + research</small><ul>${eff.map(x=>'<li>'+x+'</li>').join('')}</ul></div>`:''}
  ${missing.length&&missing.length<7?`<div class="hm-next">Not reached yet: ${missing.map(s=>`<span style="color:${s.col}">${s.name} (${s.n})</span>`).join(', ')}.<br><b>Optional next exploration:</b> <span style="color:${missing[0].col}">${missing[0].n} · ${missing[0].name}</span>, “${missing[0].aff}”. A session focused on one station can also be on purpose.</div>`:missing.length===0?`<div class="hm-next"><b>Full journey complete.</b> Closing idea: return to <span style="color:${ST[0].col}">C · Root</span> with a long, soft tone and let the sound fade into silence.</div>`:''}
  <div class="note" style="margin-top:8px;font-size:11.5px">Station links come from yogic chakra tradition (a spiritual map, not a medical scan). Research notes are general findings; this app does not diagnose or treat anything.</div>`;
}
function hmReset(){HM.t.fill(0);HM.between=0;HM.longHolds=0;HM.lowT=0;HM.highT=0;hmRender()}

function hmNoteLine(si){if(si<0)return '';const {s,b}=hmBody(si);return `<div class="hm-noteline" style="border-top:0;padding-top:0;margin-top:4px"><span style="color:${s.col}">●</span> <b>Body connection:</b> ${s.n} lights <span style="color:${s.col}">${s.name}</span> (${s.sk}), ${s.loc.toLowerCase()}. Tradition links it to ${s.theme.toLowerCase().split(',').slice(0,2).join(' and')} · “${s.aff}”.</div>`}

function centsWord(c){const a=Math.abs(c);if(a<=5)return 'Centered';const lv=a<=15?'A little':a<=30?'Noticeably':'Quite';return lv+(c>0?' high':' low')}
/* ---------- JAH RASTA TUNER · ZION 3000 (one pitch source for every visual) ---------- */
const JT={hist:[],c:0,has:0,lastT:0,lastSeen:-1e9,name:null,pc:null,f:null,midi:null,
  lock:false,lockSince:0,offSince:0,lockAt:-1e9,bars:new Float32Array(80),parts:[],prevRms:0,strobe:0,scan:-1e9,lastName:null,last:0};
const JTC={red:'#FF3434',gold:'#FFC928',green:'#00FF85',ivory:'#F4F5E9',obs:'#050907',emer:'#0C1C14'};
function jtCol(c){const a=Math.abs(c);return a<=3?JTC.green:a<=15?JTC.gold:JTC.red}

/* ---- IN TUNE confirmation: chime + vibration + flash ---- */
const CONF={on:store('rl_confirm')!=='0',last:0,key:''};
function inTuneConfirm(now){
  const key=(JT.tkey||'')+'|'+TM.mode;if(key===CONF.key&&!CONF.armed)return;CONF.last=now;CONF.key=key;CONF.armed=false;
  const f=$('inTuneFlash');if(f){f.textContent=TM.mode==='preset'&&JT.disp?`${JT.disp} IN TUNE ✓`:TM.mode==='freq'?'ATTUNED ✓':'IN TUNE ✓';f.classList.remove('go');void f.offsetWidth;f.classList.add('go')}
  if(!CONF.on)return;
  try{navigator.vibrate&&navigator.vibrate([35,50,70])}catch(e){}
  try{const c=actx(),t=c.currentTime,g=c.createGain();g.connect(c.destination);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.09,t+.01);g.gain.exponentialRampToValueAtTime(.0005,t+1.1);
    [[1046.5,1],[1318.5,.6],[2093,.25]].forEach(([fq,a],i)=>{const o=c.createOscillator(),gg=c.createGain();o.type='sine';o.frequency.value=fq;gg.gain.value=a;o.connect(gg).connect(g);o.start(t+i*.06);o.stop(t+1.2)});
    ESSI.quietUntil=performance.now()+(TM.mode==='chromatic'?450:650);}catch(e){}
}
function jtState(now){
  if(typeof essiBusy==='function'&&essiBusy()){JT.lastSeen=now;JT.lastT=now;return}
  const live=cur&&cur.f&&cur.cents!==null&&cur.cents!==undefined;
  if(live){
    const T=tmTarget();const exact=T.c;JT.hist.push(exact);if(JT.hist.length>3)JT.hist.shift();JT.tgtHz=T.tgtHz;JT.mode=T.mode;JT.str=T.str;JT.disp=T.name;
    const m=[...JT.hist].sort((x,y)=>x-y)[JT.hist.length>>1];
    const dt=Math.min(.1,(now-(JT.lastT||now))/1000),k=1-Math.exp(-dt/.08);
    if(!JT.has||T.key!==JT.tkey){JT.c=m;JT.hist=[exact];JT.tkey=T.key;if(cur.name!==JT.lastName){JT.scan=now;JT.lastName=cur.name}}else JT.c+=(m-JT.c)*k;
    JT.has=1;JT.lastSeen=now;JT.name=cur.name;JT.pc=cur.pc;JT.f=cur.f;JT.midi=Math.round(cur.midi);
  }else if(now-JT.lastSeen>350){if(typeof CONF!=='undefined')CONF.armed=true;JT.has=0;JT.hist.length=0;JT.name=null;JT.pc=null;JT.f=null;JT.lock=false}
  JT.lastT=now;
  if(JT.has){const a=Math.abs(JT.c);
    const lockLim=TM.mode==='preset'?4:3;
    if(!JT.lock){if(a<=lockLim){if(!JT.lockSince)JT.lockSince=now;if(now-JT.lockSince>=250){JT.lock=true;JT.lockAt=now;JT.offSince=0;JT.confirmed=false}}else JT.lockSince=0}
    else{if(a>5){if(!JT.offSince)JT.offSince=now;if(now-JT.offSince>=100){JT.lock=false;JT.lockSince=0}}else JT.offSince=0}
  }else{JT.lockSince=0}
  if(JT.lock&&!JT.confirmed&&now-JT.lockAt>=(TM.mode==='chromatic'?700:0)){JT.confirmed=true;inTuneConfirm(now)}
}
function jtSet(el,prop,v){if(el['_'+prop]!==v){el['_'+prop]=v;el[prop]=v}}
function jtText(){
  const note=$('bigNote'),tag=$('dialTag'),ce=$('cents'),hz=$('hz');
  const s=JT.pc!==null?stationOfPc(JT.pc):-1;
  note.textContent=JT.has?JT.name:'♪';note.style.color=JT.has&&s>=0?ST[s].col:JTC.ivory;
  jtSet($('dialMode'),'textContent',TM.mode==='freq'&&TM.target?'ATTUNE · '+TM.target.label:TM.mode==='preset'?PRESETS[TM.preset].name.toUpperCase():'');if(!JT.has){tag.className='dial-tag';tag.textContent=running?'LISTENING':'TUNER OFF';ce.textContent='tuning: —';hz.textContent='— Hz';return}
  const c=Math.round(JT.c),tgt=JT.tgtHz||noteHz(JT.midi);jtSet($('dialMode'),'textContent',JT.mode||'');if(JT.disp&&TM.mode!=='chromatic')note.textContent=JT.disp;
  hz.textContent=(tgt*Math.pow(2,JT.c/1200)).toFixed(1)+' Hz';
  if(JT.lock){tag.className='dial-tag ok';tag.textContent=JT.better===JT.name&&JT.habits&&JT.habits[JT.name]?'BETTER THAN YOUR USUAL '+JT.name:'ALIGNED ✦'}
  else{tag.className='dial-tag '+(Math.abs(c)<=5?'ok':Math.abs(c)<=15?'near':'off');tag.textContent=Math.abs(c)<=5?'CENTERED':(c>0?'HIGH ▲':'LOW ▼')}
  jtSet(ce,'innerHTML',`<b style="font-size:16px;color:${jtCol(c)}">${centsWord(c)}</b> · ${c>0?'+':''}${c}¢<br><small>target ${tgt.toFixed(2)} Hz · A=${A4}</small>`);
}
function drawDial(now){
  const cv=$('dial');if(!cv||!cv.offsetParent){requestAnimationFrame(drawDial);return}
  jtState(now);jtText();if(sysRun('coach'))coachTick(now);if(sysRun('healing'))hmTick(now);try{if(sysShow('tuner'))tgTick(now)}catch(e){}
  if(!sysShow('tuner')){requestAnimationFrame(drawDial);return}
  const g=fit(cv),W=cv.width,H=cv.height,d=Math.min(2,DPR());const dt=Math.min(.05,(now-(JT.last||now))/1000);JT.last=now;
  const cx=W/2,cy=H*.53,R=Math.min(W*.43,H*.47);
  const A0=Math.PI*(5/6),SPAN=Math.PI*(4/3);const ang=c=>A0+(c+50)/100*SPAN;
  const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  g.clearRect(0,0,W,H);
  const c=JT.has?Math.max(-50,Math.min(50,JT.c)):0,col=JT.has?jtCol(JT.c):JTC.gold;
  const s=JT.pc!==null?stationOfPc(JT.pc):-1,chak=s>=0?ST[s].col:JTC.gold;
  const lt=now-JT.lockAt,breath=.5+.5*Math.sin(now/2000*Math.PI*2);
  // audio level (real mic data)
  let rms=running&&cur?cur.rms||0:0;const lvl=Math.min(1,rms*9);
  // core: chakra glow, lights up on alignment
  const coreOn=JT.lock?Math.min(1,Math.max(0,(lt-350)/300))*(.75+.25*breath):0;
  let cg=g.createRadialGradient(cx,cy,0,cx,cy,R*.46);cg.addColorStop(0,chak+(JT.has?Math.round(40+120*coreOn).toString(16).padStart(2,'0'):'18'));cg.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=cg;g.beginPath();g.arc(cx,cy,R*.46,0,Math.PI*2);g.fill();
  // harmonic / clarity ring 48-55% (driven by measured pitch confidence)
  const clar=JT.has?(cur.conf||0):0;g.lineWidth=R*.07;g.strokeStyle=`rgba(244,245,233,${.05+.25*clar})`;g.beginPath();g.arc(cx,cy,R*.515,0,Math.PI*2);g.stroke();
  g.lineWidth=R*.02;g.strokeStyle=chak+'aa';g.beginPath();g.arc(cx,cy,R*.515,-Math.PI/2,-Math.PI/2+Math.PI*2*clar);g.stroke();
  // trippy core: slow liquid Rasta swirl (speed follows your loudness)
  JT.sw=(JT.sw||0)+dt*(.15+lvl*1.2);
  if(!reduce){g.save();g.beginPath();g.arc(cx,cy,R*.44,0,Math.PI*2);g.clip();
    for(let k=0;k<3;k++){const ph=JT.sw*(1+k*.35)+k*2.1,cc=[JTC.red,JTC.gold,JTC.green][k];
      g.beginPath();for(let q=0;q<=64;q++){const t=q/64*Math.PI*2,rr=R*(.18+.1*Math.sin(t*3+ph)+.05*Math.sin(t*5-ph*1.3));const x=cx+Math.cos(t+ph*.2)*rr,y=cy+Math.sin(t+ph*.2)*rr;q?g.lineTo(x,y):g.moveTo(x,y)}
      g.closePath();g.fillStyle=cc+(JT.lock?'2e':'1a');g.fill()}
    g.restore()}
  // ---- acoustic features (measured every frame from the live mic) ----
  const F=JT.feat=JT.feat||{env:0,bright:0,rich:1,onsetAt:-1e9,lastDb:-120,silentAt:0};
  let loud=0;if(running&&cur&&isFinite(cur.db))loud=Math.max(0,Math.min(1,(cur.db+60)/48));
  F.env+=(loud-F.env)*(1-Math.exp(-dt/(loud>F.env?.02:.15)));
  if(running&&fd&&ctx&&an){const bw=ctx.sampleRate/an.fftSize;let sw=0,sp=0;const b0=Math.floor(80/bw),b1=Math.min(fd.length-1,Math.floor(8000/bw));
    for(let b=b0;b<=b1;b+=2){const p=Math.pow(10,fd[b]/10);sw+=p*b*bw;sp+=p}
    const cent=sp>0?sw/sp:300,br=Math.max(0,Math.min(1,Math.log(cent/300)/Math.log(4000/300)));F.bright+=(br-F.bright)*Math.min(1,dt*6);
    if(JT.has&&JT.f){const fb=JT.f/bw,pk=k=>{let m=-200;const c0=Math.round(fb*k);for(let q=c0-2;q<=c0+2;q++)if(fd[q]>m)m=fd[q];return m};const f0=pk(1);let n=1;for(const k of [2,3,4])if(pk(k)>f0-30)n++;F.rich+=(n-F.rich)*Math.min(1,dt*5)}}
  if(running&&cur&&isFinite(cur.db)){if(cur.db-F.lastDb>6&&cur.db>-50&&now-F.onsetAt>180)F.onsetAt=now;F.lastDb+=(cur.db-F.lastDb)*Math.min(1,dt*12)}
  if(JT.name!==F.lastName){if(JT.name)F.onsetAt=now;F.lastName=JT.name}
  // ---- live sound flower 56-74%: real mic waveform, 6 cycles around the circle. Never freezes: it IS your sound ----
  const P=224,base=R*.62;let shape=null;
  if(running&&td&&ctx&&JT.has&&JT.f){const spc=ctx.sampleRate/JT.f,win=Math.min(td.length-2,Math.floor(spc*6));let tr=1;
    for(let q=1;q<td.length-win-1;q++){if(td[q-1]<0&&td[q]>=0){tr=q;break}}
    let pk=1e-6;for(let q=0;q<win;q++)pk=Math.max(pk,Math.abs(td[tr+q]));
    shape=new Float32Array(P);for(let p=0;p<P;p++){const x=tr+p/P*win,i0=Math.floor(x),f=x-i0;shape[p]=((td[i0]||0)*(1-f)+(td[i0+1]||0)*f)/pk}}
  JT.hist2=JT.hist2||[];if(shape){JT.hist2.unshift(shape);if(JT.hist2.length>6)JT.hist2.pop()}
  if(!JT.has){F.fade=Math.max(0,(F.fade??1)-dt/.45)}else F.fade=1;
  if(!JT.hist2.length||F.fade<=0)JT.hist2.length=0;
  JT.fl=(JT.fl||0)+dt*(.05+F.env*.5);   // slow drift driven by loudness, not by tuning
  const disp=R*(.02+.16*F.env),contours=Math.max(1,Math.min(4,Math.round(F.rich))),lw=(2.8-1.2*F.bright)*d;
  const att=Math.max(0,1-(now-F.onsetAt)/280);
  JT.hist2.slice(0,3).forEach((sh,h)=>{const cc=h===0?col:[JTC.gold,JTC.green][h-1];
    for(let k=0;k<(h===0?contours:1);k++){const off=k*R*.035,al=(h===0?(k===0?.95:.45/k):.22/h)*F.fade;
      g.beginPath();for(let p=0;p<=P;p++){const t=p/P*Math.PI*2-Math.PI/2+JT.fl+h*.04-k*.06,rr=base+off+sh[p%P]*disp*(1+att*.5)/(1+k*.6);
        const x=cx+Math.cos(t)*rr,y=cy+Math.sin(t)*rr;p?g.lineTo(x,y):g.moveTo(x,y)}
      g.closePath();g.strokeStyle=cc;g.globalAlpha=al;g.lineWidth=h===0&&k===0?lw:1.1*d;if(h===0&&k===0){g.shadowColor=cc;g.shadowBlur=(8+14*F.bright)*d}g.stroke();g.shadowBlur=0}});
  g.globalAlpha=1;
  // attack ring: expanding energy for 280 ms on every new note / attack
  if(att>0&&running){g.strokeStyle=col;g.globalAlpha=att*.7;g.lineWidth=2*d;g.beginPath();g.arc(cx,cy,base+R*(1-att)*.3,0,Math.PI*2);g.stroke();g.globalAlpha=1}
  if(!JT.hist2.length&&!reduce){for(let k=0;k<2;k++){g.beginPath();for(let p=0;p<=120;p++){const t=p/120*Math.PI*2,rr=base+R*.02*Math.sin(t*6+now/1100+k*2);const x=cx+Math.cos(t)*rr,y=cy+Math.sin(t)*rr;p?g.lineTo(x,y):g.moveTo(x,y)}
    g.strokeStyle=[JTC.gold,JTC.green][k];g.globalAlpha=.12+.08*breath;g.lineWidth=1.2*d;g.stroke()}g.globalAlpha=1}
  // ---- musical memory: habitual flat/sharp ghost marker from your saved studies ----
  const HB=JT.habits||(JT.habits=smHabits());const hb=JT.has?HB[JT.name]:null;
  if(hb){const ha=ang(Math.max(-50,Math.min(50,hb.med)));g.strokeStyle=JTC.gold;g.globalAlpha=.85;g.lineWidth=3*d;g.beginPath();g.moveTo(cx+Math.cos(ha)*R*.76,cy+Math.sin(ha)*R*.76);g.lineTo(cx+Math.cos(ha)*R*.93,cy+Math.sin(ha)*R*.93);g.stroke();
    g.globalAlpha=.12;g.lineWidth=R*.1;g.beginPath();g.arc(cx,cy,R*.85,Math.min(ang(0),ha),Math.max(ang(0),ha));g.stroke();g.globalAlpha=1;
    if(JT.lock&&now-JT.lockAt>500){JT.better=JT.name}}
  // pitch segments 80-90%: 101 segments, glowing energy packet + trail
  const vb=JT.has&&cur&&cur.vib?cur.vib:null,vAmp=vb?Math.min(1,vb.amp/40)*R*.025:0,vPh=vb?now/1000*vb.hz*Math.PI*2:0;
  const r1=R*.8,r2=R*.9,seg=SPAN/101;
  for(let i=0;i<=100;i++){const sc=i-50,a=ang(sc),dist=Math.abs(sc-c);
    let on=JT.has?Math.max(0,1-dist/4):0;if(JT.lock)on=Math.max(on,Math.max(0,1-Math.abs(sc)/3)*(.7+.3*breath));
    const conv=JT.lock&&lt<150?(1-lt/150):0;
    const zone=Math.abs(sc)<=3?JTC.green:Math.abs(sc)<=15?JTC.gold:JTC.red;
    g.strokeStyle=on>0?zone:(Math.abs(sc)<=3?'#0f3a24':'#16221a');g.lineWidth=(sc%10===0?2.6:1.6)*d*(R/300+.6);
    g.globalAlpha=on>0?.35+.65*on:(sc%10===0?.9:.6);
    if(on>0){g.shadowColor=zone;g.shadowBlur=14*d*on}
    const rr2=sc%10===0?r2+R*.025:r2;
    const wv=vAmp*Math.sin(a*8+vPh);g.beginPath();g.moveTo(cx+Math.cos(a)*(r1+wv),cy+Math.sin(a)*(r1+wv));g.lineTo(cx+Math.cos(a)*(rr2+wv),cy+Math.sin(a)*(rr2+wv));g.stroke();g.shadowBlur=0}
  g.globalAlpha=1;
  // center marker + flat/sharp marks
  g.fillStyle=JTC.green;const am=ang(0);g.beginPath();g.arc(cx+Math.cos(am)*R*.76,cy+Math.sin(am)*R*.76,3*d,0,Math.PI*2);g.fill();
  g.font=`800 ${Math.max(12*d,R*.07)}px system-ui`;g.textAlign='center';g.textBaseline='middle';
  g.fillStyle=JTC.red+'cc';g.fillText('♭',cx+Math.cos(ang(-50))*R*.98,cy+Math.sin(ang(-50))*R*.98+R*.1);g.fillText('♯',cx+Math.cos(ang(50))*R*.98,cy+Math.sin(ang(50))*R*.98+R*.1);
  // holographic strobe 94-98%: 48 dashes, CCW flat / CW sharp, frozen when aligned
  if(JT.has&&!JT.lock&&!reduce){JT.strobe+=Math.sign(JT.c)*Math.min(120,Math.abs(JT.c)*6)*Math.PI/180*dt}
  for(let i=0;i<48;i++){const a=JT.strobe+i/48*Math.PI*2;const lit=JT.has?(JT.lock?.75:.32+.25*F.env):.16;
    g.strokeStyle=JT.lock?JTC.green:(i%3===0?JTC.red:i%3===1?JTC.gold:JTC.green);g.globalAlpha=lit*(i%2?1:.6);g.lineWidth=R*.035;
    g.beginPath();g.arc(cx,cy,R*.96,a,a+Math.PI*2/48*.45);g.stroke()}
  g.globalAlpha=1;
  // digital scan on note acquisition (120 ms)
  const sc=now-JT.scan;if(sc<120&&JT.has){g.fillStyle=`rgba(0,255,133,${.18*(1-sc/120)})`;const y=cy-R*.4+R*.8*(sc/120);g.fillRect(cx-R*.4,y,R*.8,2*d)}
  // alignment pulse 150-350 ms
  if(JT.lock&&lt>150&&lt<650){const p=(lt-150)/500;g.strokeStyle=`rgba(0,255,133,${(1-p)*.8})`;g.lineWidth=4*d;g.beginPath();g.arc(cx,cy,R*(.45+p*.65),0,Math.PI*2);g.stroke()}
  // energy particles 102-106% (max 24, spawned by real onsets/volume)
  if(!reduce&&running&&rms-JT.prevRms>.01&&JT.parts.length<24)for(let k=0;k<4&&JT.parts.length<24;k++)JT.parts.push({a:Math.random()*Math.PI*2,r:R*1.03,v:R*(.15+Math.random()*.25),life:1});
  if(!reduce&&running&&lvl>.15&&Math.random()<lvl*.3&&JT.parts.length<24)JT.parts.push({a:Math.random()*Math.PI*2,r:R*1.02,v:R*.1,life:1});
  JT.prevRms=rms;
  JT.parts=JT.parts.filter(p=>(p.life-=dt*1.4)>0);
  for(const p of JT.parts){p.r+=p.v*dt;g.fillStyle=JT.has?col:JTC.gold;g.globalAlpha=p.life*(.45+.5*F.bright);g.beginPath();g.arc(cx+Math.cos(p.a)*p.r,cy+Math.sin(p.a)*p.r,1.8*d,0,Math.PI*2);g.fill()}
  g.globalAlpha=1;
  // idle breathing
  if(!JT.has&&!reduce){g.strokeStyle=`rgba(255,201,40,${.08+.08*breath})`;g.lineWidth=2*d;g.beginPath();g.arc(cx,cy,R*.72,0,Math.PI*2);g.stroke()}
  if(SM.on){const p=Math.min(1,(performance.now()-SM.t0)/(SM.dur*1000));g.lineWidth=3*d;g.strokeStyle='#294535';g.beginPath();g.arc(cx,cy,R*1.08,0,Math.PI*2);g.stroke();
    const gr=g.createLinearGradient(cx-R,cy,cx+R,cy);gr.addColorStop(0,JTC.red);gr.addColorStop(.5,JTC.gold);gr.addColorStop(1,JTC.green);g.strokeStyle=gr;g.lineWidth=4*d;g.beginPath();g.arc(cx,cy,R*1.08,-Math.PI/2,-Math.PI/2+Math.PI*2*p);g.stroke()}
  const mm=$('miniMon');if(mm&&mm.classList.contains('on')){const s2=JT.pc!==null?stationOfPc(JT.pc):-1;$('mmNote').textContent=JT.has?JT.name:'♪';$('mmNote').style.color=JT.has&&s2>=0?ST[s2].col:JTC.ivory;
    $('mmBar').style.left=(50+(JT.has?Math.max(-50,Math.min(50,JT.c)):0))+'%';$('mmBar').style.background=JT.has?jtCol(JT.c):JTC.ivory;const tg=$('dialTag');$('mmTag').textContent=SM.on?'STUDY '+$('smTime').textContent:tg.textContent;$('mmTag').style.color=getComputedStyle(tg).color}
  requestAnimationFrame(drawDial);
}
requestAnimationFrame(drawDial);
try{new IntersectionObserver(es=>{for(const e of es){const live=$('v-live')&&$('v-live').classList.contains('on');$('miniMon').classList.toggle('on',live&&!e.isIntersecting&&e.boundingClientRect.top<0)}},{threshold:0}).observe($('dialwrap'))}catch(e){}
/* ---------- drawings ---------- */
function drawTrail(now){
  const g=fit($('trail')),W=$('trail').width,H=$('trail').height;g.fillStyle='#0d120b';g.fillRect(0,0,W,H);
  const ms=trail.filter(p=>p.m!==null).map(p=>p.m);const center=ms.length?Math.round(ms[ms.length-1]):60;const lo=center-6,hi=center+6;
  const y=m=>H-(m-lo)/(hi-lo)*H;g.font=`${10*DPR()}px system-ui`;
  for(let m=lo;m<=hi;m++){const pc=((m%12)+12)%12,s=stationOfPc(pc);g.strokeStyle=s>=0?ST[s].col+'66':'#1f2a1b';g.lineWidth=DPR();g.beginPath();g.moveTo(0,y(m));g.lineTo(W,y(m));g.stroke();if(s>=0){g.fillStyle=ST[s].col;g.fillText(NAMES[pc]+(Math.floor(m/12)-1),4,y(m)-2)}}
  g.strokeStyle='#f6f1de';g.lineWidth=2.2*DPR();g.beginPath();let pen=false;
  for(const p of trail){const x=W-(now-p.t)/6000*W;if(p.m===null||p.m<lo-1||p.m>hi+1){pen=false;continue}const yy=y(p.m);if(!pen){g.moveTo(x,yy);pen=true}else g.lineTo(x,yy)}g.stroke();
}
function drawLadder(){
  const g=fit($('ladder')),W=$('ladder').width,H=$('ladder').height;g.fillStyle='#0d120b';g.fillRect(0,0,W,H);
  const cols=['#e2382b','#f07a1f','#f4c430','#22a25a','#2f8fe0','#b05fd6'];g.font=`${11*DPR()}px system-ui`;g.textAlign='center';
  if(!cur.f||!fd||!an||!ctx){g.fillStyle='#c3bfa8';g.fillText(inst==='midi'?'MIDI sends exact notes, no sound: overtones need the mic':'Play a note to see its overtones',W/2,H/2);return}
  const bin=ctx.sampleRate/an.fftSize;const lv=[];for(let k=1;k<=6;k++){const b=Math.round(k*cur.f/bin);let v=-140;for(let j=b-2;j<=b+2;j++)if(j>0&&j<fd.length)v=Math.max(v,fd[j]);lv.push(v)}
  const ref=lv[0];const bw=W/6;
  lv.forEach((v,i)=>{const rel=Math.max(-60,Math.min(10,v-ref));const h=(rel+60)/70*(H-34*DPR());g.fillStyle=cols[i];g.fillRect(i*bw+bw*.18,H-20*DPR()-h,bw*.64,h);g.fillStyle='#f6f1de';g.fillText(`${i+1}×`,i*bw+bw/2,H-6*DPR());g.fillStyle='#c3bfa8';g.fillText(Math.round(cur.f*(i+1))+'Hz',i*bw+bw/2,H-24*DPR()-h)});
  g.textAlign='left';
}
function drawWave(){const g=fit($('wave')),w=$('wave').width,h=$('wave').height;g.fillStyle='#0d120b';g.fillRect(0,0,w,h);if(!td)return;const lg=g.createLinearGradient(0,0,w,0);lg.addColorStop(0,'#e2382b');lg.addColorStop(.5,'#f4c430');lg.addColorStop(1,'#22a25a');g.strokeStyle=lg;g.lineWidth=2*DPR();g.beginPath();const n=Math.min(td.length,2048);for(let i=0;i<n;i++){const x=i*w/(n-1),yy=h/2-td[i]*h*.44;i?g.lineTo(x,yy):g.moveTo(x,yy)}g.stroke()}
function drawSpec(){const g=fit($('spectrum')),w=$('spectrum').width,h=$('spectrum').height;g.fillStyle='#0d120b';g.fillRect(0,0,w,h);if(!fd)return;const bin=ctx.sampleRate/an.fftSize,bars=80,L=Math.log(50),R=Math.log(4000);for(let j=0;j<bars;j++){const a=Math.max(1,Math.floor(Math.exp(L+j/bars*(R-L))/bin)),b=Math.min(fd.length-1,Math.max(a,Math.ceil(Math.exp(L+(j+1)/bars*(R-L))/bin)));let v=-120;for(let k=a;k<=b;k++)v=Math.max(v,fd[k]);const bh=Math.max(0,Math.min(1,(v+100)/85))*h*.92;g.fillStyle=j<27?'#e2382b':j<54?'#f4c430':'#22a25a';g.fillRect(j*w/bars,h-bh,Math.max(1,w/bars-1),bh)}}

/* ---------- sand plate (grid physics) ---------- */
const G=160;
function besselJ(n,x){let s=0;const K=96;for(let k=0;k<K;k++){const t=(k+.5)*Math.PI/K;s+=Math.cos(n*t-x*Math.sin(t))}return s/K}
function besselZeros(n,count){const z=[];let prev=besselJ(n,0.3),x=0.3;while(z.length<count&&x<40){const nx=x+0.05,v=besselJ(n,nx);if((prev<0)!==(v<0)){let lo=x,hi=nx;for(let i=0;i<30;i++){const mid=(lo+hi)/2;if((besselJ(n,lo)<0)!==(besselJ(n,mid)<0))hi=mid;else lo=mid}z.push((lo+hi)/2)}prev=v;x=nx}return z}
const CIRC=[];for(let n=0;n<=6;n++){const zs=besselZeros(n,4);zs.forEach((a,i)=>{if(n===0&&i===0)return;CIRC.push({type:'c',n,m:i+1,a,k:a*a})})}CIRC.sort((p,q)=>p.k-q.k);
const SQ=[];for(let n=1;n<=8;n++)for(let m=n+1;m<=9;m++)for(const sg of [1,-1])SQ.push({type:'s',n,m,sg,k:n*n+m*m+(sg<0?.1:0)});SQ.sort((p,q)=>p.k-q.k);
let shape=store('rl_shape')||'c';
const fieldCache=new Map();
function fieldFor(md){const key=md.type+md.n+'_'+md.m+'_'+(md.sg||0);if(fieldCache.has(key))return fieldCache.get(key);
  const f=new Float32Array(G*G);let mx=1e-9;
  for(let j=0;j<G;j++)for(let i=0;i<G;i++){const x=(i+.5)/G,y=(j+.5)/G;let v;
    if(md.type==='s'){v=Math.cos(md.n*Math.PI*x)*Math.cos(md.m*Math.PI*y)+md.sg*Math.cos(md.m*Math.PI*x)*Math.cos(md.n*Math.PI*y)}
    else{const u=2*x-1,w=2*y-1,r=Math.hypot(u,w);v=r>1?0:besselJ(md.n,md.a*r)*Math.cos(md.n*Math.atan2(w,u))}
    f[j*G+i]=v;mx=Math.max(mx,Math.abs(v))}
  for(let k=0;k<f.length;k++)f[k]/=mx;
  const gx=new Float32Array(G*G),gy=new Float32Array(G*G);
  for(let j=0;j<G;j++)for(let i=0;i<G;i++){const k=j*G+i,l=f[j*G+Math.max(0,i-1)],r=f[j*G+Math.min(G-1,i+1)],u=f[Math.max(0,j-1)*G+i],d=f[Math.min(G-1,j+1)*G+i];gx[k]=(r-l)*G/2;gy[k]=(d-u)*G/2}
  const o={f,gx,gy};fieldCache.set(key,o);return o}
const modes=()=>shape==='c'?CIRC:SQ;
let mIdx=3,cand=-1,votes=0,hold=false,energy=0,fld=fieldFor(modes()[mIdx]);
const N=5000,px=new Float32Array(N),py=new Float32Array(N);
function inside(x,y){return shape!=='c'||Math.hypot(2*x-1,2*y-1)<=0.985}
function scatter(){for(let i=0;i<N;i++){do{px[i]=Math.random();py[i]=Math.random()}while(!inside(px[i],py[i]))}}
scatter();
function setShape(sh){shape=sh;store('rl_shape',sh);mIdx=Math.min(mIdx,modes().length-1);fld=fieldFor(modes()[mIdx]);scatter();$('shapeC').classList.toggle('on',sh==='c');$('shapeS').classList.toggle('on',sh==='s');$('shapeC').style.borderColor=sh==='c'?'var(--gold)':'';$('shapeS').style.borderColor=sh==='s'?'var(--gold)':''}
function idxForHz(f){const L=modes().length,midi=midiOf(f);return Math.max(0,Math.min(L-1,Math.round((midi-40)/(88-40)*(L-1))))}
let demo=null;
function plateHz(){
  if(demo)return demo.f;
  if(cur.f)return cur.f;
  if(running&&fd&&cur.rms>0.01){const bin=ctx.sampleRate/an.fftSize;let b=-1,v=-1e9;for(let i=Math.ceil(80/bin);i<Math.floor(1500/bin);i++)if(fd[i]>v){v=fd[i];b=i}if(v>-70)return b*bin}
  return null}
function stepPlate(){
  const f=plateHz();
  if(!hold&&f){const want=idxForHz(f);if(want===cand)votes++;else{cand=want;votes=0}if(votes>=5&&want!==mIdx){mIdx=want;fld=fieldFor(modes()[mIdx])}}
  const loud=demo?0.8:(inst==='midi'?(cur.f?0.8:0):(running?Math.min(1,Math.max(0,(cur.rms-.004)*20)):0));
  energy=energy*.85+(f?loud:0)*.15;
  if(energy>0.02){const eta=0.0009*energy,sig=0.010*energy;const F=fld.f,GX=fld.gx,GY=fld.gy;
    for(let i=0;i<N;i++){const gi=Math.min(G-1,Math.max(0,px[i]*G|0)),gj=Math.min(G-1,Math.max(0,py[i]*G|0)),k=gj*G+gi,v=F[k];
      let nx=px[i]-eta*v*GX[k]+(Math.random()-.5)*2*sig*Math.abs(v),ny=py[i]-eta*v*GY[k]+(Math.random()-.5)*2*sig*Math.abs(v);
      if(nx<0)nx=-nx;if(nx>1)nx=2-nx;if(ny<0)ny=-ny;if(ny>1)ny=2-ny;
      if(!inside(nx,ny)){const u=2*nx-1,w=2*ny-1,r=Math.hypot(u,w);nx=(u/r*0.97+1)/2;ny=(w/r*0.97+1)/2}
      px[i]=nx;py[i]=ny}}
  const c=$('plate');if(!c.offsetParent)return;const g=fit(c),W=c.width,H=c.height;
  g.fillStyle='#120e06';g.fillRect(0,0,W,H);
  const grd=g.createRadialGradient(W*.4,H*.35,W*.05,W/2,H/2,W*.7);grd.addColorStop(0,'#3a3a3e');grd.addColorStop(1,'#16161a');
  g.fillStyle=grd;if(shape==='c'){g.beginPath();g.arc(W/2,H/2,W/2*0.99,0,Math.PI*2);g.fill();g.strokeStyle='#8a7a4a';g.lineWidth=2*DPR();g.stroke()}else{g.fillRect(0,0,W,H)}
  g.fillStyle='rgba(244,214,140,.9)';const r=Math.max(1,1.15*DPR());
  for(let i=0;i<N;i++)g.fillRect(px[i]*W-r/2,py[i]*H-r/2,r,r);
  const md=modes()[mIdx];
  $('mode').textContent=(shape==='c'?`${md.n} lines × ${md.m} rings`:`${md.n}×${md.m}${md.sg>0?'+':'−'}`)+` · #${mIdx+1} of ${modes().length}`+(hold?' (held)':'');
  if(demo){$('plateCap').innerHTML=`▶ Demo: <b>${demo.label}</b> → pattern #${mIdx+1}`}
  else if(f){const m=Math.round(midiOf(f)),nm=NAMES[((m%12)+12)%12]+(Math.floor(m/12)-1);$('plateCap').innerHTML=`🎵 Hearing <b>${nm}</b> (${f.toFixed(0)} Hz) → pattern <b>#${mIdx+1}</b>. Hold it steady and the sand settles on the still lines.`}
  else if(running)$('plateCap').innerHTML='🤫 Quiet: the sand rests. Hold one steady tone, like a long “Ommm”, to shape it.';
}
$('scatter').onclick=scatter;$('hold').onclick=()=>{hold=!hold;$('hold').textContent=hold?'▶ Follow':'📌 Hold'};
$('shapeC').onclick=()=>setShape('c');$('shapeS').onclick=()=>setShape('s');setShape(shape);
$('demo').onclick=()=>{if(demo){clearInterval(demo.timer);demo=null;$('demo').textContent='▶ Demo C → B';return}
  let i=0;const step=()=>{if(i>=ST.length){clearInterval(demo.timer);demo=null;$('demo').textContent='▶ Demo C → B';return}const s=ST[i],f=noteHz(60+s.pc);demo.f=f;demo.label=`${s.n}4 · ${s.name}`;tone(f,3.2);i++};
  demo={f:null,label:'',timer:null};$('demo').textContent='■ Stop demo';step();demo.timer=setInterval(step,3500)};

/* ---------- teacher: listen, then match ---------- */
let T={on:false,i:0,phase:'idle',hold:0,last:0,t0:0};
function renderJourney(){$('journey').innerHTML=ST.map((s2,i)=>`<button type="button" onclick="teachGo(${i})" title="Play ${s2.n} · ${s2.name}" style="background:${s2.col}" class="${T.on&&i<T.i||(!T.on&&T.done&&i<=6)?'done':''} ${T.on&&i===T.i?'cur':''}"><b>${s2.n}</b><small>${s2.name}</small></button>`).join('')}
renderJourney();
function tMidi(){return 12*(+$('jOct').value+1)+ST[T.i].pc}
function teachPlay(){const st=ST[T.i];T.phase='listen';T.hold=0;$('jText').innerHTML=`👂 <b>Listen:</b> ${st.n}${$('jOct').value} · ${st.so} · <span style="color:${st.col}">${st.name}</span>`;$('jSub').textContent=st.chill;setRing(0,'🔊');selected=T.i;showCard(T.i);glowPts(LF,[T.i]);lit='t';
  sound(noteHz(tMidi()),2.5);setTimeout(()=>{if(!T.on)return;T.phase='turn';T.t0=performance.now();$('jText').innerHTML=`🎤 <b>Your turn:</b> sing or play <b style="color:${st.col}">${st.n}</b> (${st.so}, “${st.seed.split(' ')[0]}”) and hold it.`;if($('jDrone').checked)drone(noteHz(tMidi()-12))},2750)}
function setRing(p,txt,col){const L=2*Math.PI*32;$('mRing').setAttribute('stroke-dasharray',`${(p*L).toFixed(1)} ${L.toFixed(1)}`);$('mRing').setAttribute('stroke',col||'#f4c430');$('mTxt').textContent=txt}
async function teachStart(at){if(inst!=='midi'&&!running)await start();T={on:true,i:(typeof at==='number'?at:0),phase:'idle',hold:0,last:0,done:false};['jAgain','jSkip','jStop'].forEach(id=>$(id).disabled=false);$('jStart').disabled=true;renderJourney();teachPlay()}
function teachNext(){droneOff();T.i++;if(T.i>=ST.length){T.on=false;T.done=true;T.phase='idle';renderJourney();setRing(1,'🌟','#22a25a');$('jText').innerHTML='🌟 <b>Lesson complete:</b> Root to Crown! Log how you feel in 📓 Journal.';$('jSub').textContent='';['jAgain','jSkip','jStop'].forEach(id=>$(id).disabled=true);$('jStart').disabled=false;$('jStart').textContent='▶ Again';lit=-1;return}renderJourney();teachPlay()}
function teachStop(){droneOff();T.on=false;T.phase='idle';renderJourney();setRing(0,'—');$('jText').innerHTML='Lesson stopped. Tap <b>Start lesson</b> to begin again.';$('jSub').textContent='';['jAgain','jSkip','jStop'].forEach(id=>$(id).disabled=true);$('jStart').disabled=false;lit=-1}
$('jStart').onclick=()=>teachStart(0);
/* tap any note: jump there, hear it, and the lesson carries on to the next note from there */
function teachGo(i){droneOff();if(!T.on){teachStart(i);return}T.i=i;T.done=false;renderJourney();teachPlay()}
window.teachGo=teachGo;$('jAgain').onclick=()=>{droneOff();teachPlay()};$('jSkip').onclick=teachNext;$('jStop').onclick=teachStop;
function journeyStep(){
  if(!T.on||T.phase!=='turn')return;const now=performance.now(),dt=T.last?Math.min(.1,(now-T.last)/1000):0;T.last=now;const tol=+$('jTol').value,st=ST[T.i];
  if(!cur.f||cur.conf<.7){T.hold=Math.max(0,T.hold-dt);setRing(T.hold/0.8,'…');$('jSub').textContent='Listening… hold one steady tone.';return}
  let d=(cur.midi-tMidi())%12;if(d>6)d-=12;if(d<-6)d+=12;const cents=Math.round(d*100);
  const close=Math.max(0,1-Math.abs(cents)/200);
  if(Math.abs(cents)<=tol){T.hold+=dt;setRing(Math.min(1,T.hold/0.8),'✓','#22a25a');$('jSub').textContent=`Yes! ${cur.name} matches ${st.n}. Hold it…`}
  else{T.hold=Math.max(0,T.hold-dt*2);setRing(close,(cents>0?'+':'')+cents,cents>0?'#e2382b':'#2f8fe0');$('jSub').textContent=cents>0?`You're ${cents}¢ high: bring it down a little.`:`You're ${-cents}¢ low: lift it up a little.`}
  if(T.hold>=0.8){T.phase='done';droneOff();chime();$('jText').innerHTML=`✅ <b>Matched ${st.n} · ${st.name}!</b> “${st.aff}”`;setTimeout(()=>{if(T.on)teachNext()},1400)}
}

/* ---------- hand mudras ---------- */
const MUDRA=[
 {name:'Chin (Gyan) mudra',dev:'चिन् मुद्रा',el:'Earth',how:'Touch the thumb and index finger together. Keep the arms straight and rest the hands on the knees, palms up.',why:'Security, grounding, feeling safe.',chant:'L-A-A-A-M-M',spec:{touch:[0]}},
 {name:'Dhyana mudra',dev:'ध्यान मुद्रा',el:'Water',how:'Place the hands in the lap, palms facing up, right palm resting on top of the left. Let the thumb tips touch.',why:'Creativity, calm flow of feeling.',chant:'V-A-A-A-M-M',spec:{type:'dhyana'}},
 {name:'Manipura mudra',dev:'मणिपूर मुद्रा',el:'Fire',how:'Bring the hands into prayer between the heart and the stomach, fingers pointing forward, thumbs crossed and tucked.',why:'Willpower, confidence, inner fire.',chant:'R-A-A-A-M-M',spec:{type:'prayer'}},
 {name:'Gyan mudra at the heart',dev:'ज्ञान मुद्रा',el:'Air',how:'Touch the index finger and thumb on both hands. Hold the right hand in front of the heart center and rest the left hand on the knee.',why:'Love, compassion, an open heart.',chant:'Y-A-A-A-M-M',spec:{touch:[0]}},
 {name:'Granthita mudra',dev:'ग्रन्थित मुद्रा',el:'Space / ether',how:'Hold the hands by the stomach. Interlace the fingers on the inside and let the thumb tips touch.',why:'Expression, speaking your truth.',chant:'H-A-A-A-M-M',spec:{type:'interlace'}},
 {name:'Ajna mudra',dev:'आज्ञा मुद्रा',el:'Light',how:'Hold the hands in front of the chest. Stand the middle fingers up with their tips touching; bend the other fingers so they touch at the top knuckles. Thumbs point toward you and touch at the tips.',why:'Intuition, insight, inner vision.',chant:'S-H-A-A-A-M-M',spec:{type:'hakini'}},
 {name:'Sahasrara mudra',dev:'सहस्रार मुद्रा',el:'Thought / consciousness',how:'Hold the hands in front of the stomach. Interlace the fingers, with the little fingers pointing upward and touching. Thumbs cross.',why:'Divine guidance, connection, peace.',chant:'O-O-M-M-M-M',spec:{type:'sahasrara'}}
];
const SKIN='#7a4a2a',SKIN2='#5a3420',EDGE='#c9a94a';
function cap(x1,y1,x2,y2,w){return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${EDGE}" stroke-width="${w+2.4}" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${SKIN}" stroke-width="${w}" stroke-linecap="round"/>`}
function curve(d,w){return `<path d="${d}" fill="none" stroke="${EDGE}" stroke-width="${w+2.4}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${SKIN}" stroke-width="${w}" stroke-linecap="round"/>`}
function glow(x,y,col){return `<circle cx="${x}" cy="${y}" r="9" fill="${col}" opacity=".35"/><circle cx="${x}" cy="${y}" r="4.2" fill="${col}" stroke="#fff" stroke-width="1"/>`}
function oneHand(spec,col){
  const B=[[44,64],[56,61],[68,63],[79,68]],L=[36,40,36,28],W=[10,10,9.5,8.5];let g='';
  g+=`<rect x="34" y="60" width="52" height="54" rx="20" fill="${SKIN}" stroke="${EDGE}" stroke-width="1.2"/>`;
  const touch=spec.touch||[],fold=spec.fold||[];let thumbTip=[16,70];
  B.forEach(([bx,by],i)=>{
    if(touch.includes(i)){const M=[30+i*7,50+i*3];g+=curve(`M${bx},${by} Q${bx+2},${by-L[i]*.75} ${M[0]},${M[1]}`,W[i]);thumbTip=M}
    else if(fold.includes(i)){g+=curve(`M${bx},${by} Q${bx+2},${by-8} ${bx-3},${by+16}`,W[i]-1);thumbTip=[bx-3,by+18]}
    else g+=cap(bx,by,bx+(i-1.5)*3,by-L[i],W[i]);
  });
  g+=curve(`M40,100 Q22,92 ${thumbTip[0]},${thumbTip[1]}`,11);
  if(touch.length)g+=glow(thumbTip[0],thumbTip[1],col);
  if(fold.length)g+=glow(thumbTip[0]+1,thumbTip[1]-2,col);
  return `<svg viewBox="0 0 120 130" class="mudra">${g}</svg>`;
}
function twoHands(type,col){
  let g='';
  const palm=(x)=>`<rect x="${x}" y="64" width="40" height="50" rx="16" fill="${SKIN}" stroke="${EDGE}" stroke-width="1.2"/>`;
  g+=palm(14)+palm(106);
  if(type==='hakini'){
    [[40,46],[30,56],[24,66],[22,76]].forEach(([dy,w],i)=>{});
    const pts=[44,56,68,80];
    pts.forEach((y,i)=>{g+=curve(`M${48},${70+i*8} Q62,${y-10} 78,${y}`,8-i*.6);g+=curve(`M${112},${70+i*8} Q98,${y-10} 82,${y}`,8-i*.6);g+=glow(80,y,col)});
    g+=curve('M30,104 Q55,100 78,94',9)+curve('M130,104 Q105,100 82,94',9)+glow(80,94,col);
  }else{
    g+=curve('M46,68 Q60,44 78,34',9)+curve('M114,68 Q100,44 82,34',9)+glow(80,34,col);
    g+=curve('M30,104 Q54,96 78,90',10)+curve('M130,104 Q106,96 82,90',10)+glow(80,90,col);
    [[36,64,24,26],[28,68,14,34],[20,74,6,44]].forEach(([x,y,x2,y2])=>{g+=cap(x,y,x2,y2,8);g+=cap(160-x,y,160-x2,y2,8)});
    g+=`<path d="M80,34 L80,90" stroke="${col}" stroke-opacity=".35" stroke-dasharray="2 3"/>`;
  }
  return `<svg viewBox="0 0 160 130" class="mudra">${g}</svg>`;
}
function mudraDraw(i){const m=MUDRA[i];const t=m.spec.type;if(!t)return oneHand(m.spec,ST[i].col);if(t==='hakini'||t==='sahasrara')return twoHands(t,ST[i].col);return twoHands('hakini',ST[i].col)}
function mudraSVG(i){return `<img src="mudra-${i+1}.jpg" alt="${MUDRA[i].name}" class="mudra" style="border-radius:14px;box-shadow:0 0 18px ${ST[i].col}55" onerror="this.outerHTML=mudraDraw(${i})">`}
function mudraBlock(i){const m=MUDRA[i],s=ST[i];return `<span class="tag t-r">🙏 HAND MUDRA</span>
<div style="display:flex;gap:12px;align-items:center;background:#0f140d;border:1px solid var(--line);border-radius:12px;padding:10px">
<div style="width:110px;flex:none">${mudraSVG(i)}</div>
<div><div style="font-weight:900;color:${s.col}">${m.name}</div><div style="font-size:14px">${m.dev} · ${m.el}</div><div class="note" style="margin-top:4px">${m.how}</div><div class="note"><b>For:</b> ${m.why}</div><div class="note"><b>Chant:</b> ${m.chant}</div></div></div>`}

/* ---------- body map ---------- */
const BODY=[
 {pt:'Base of the spine and perineum (between the legs, at the pelvic floor)',organs:'Pelvic floor, sacral and coccygeal nerves, legs, feet, bones',zone:'Legs, feet, lower back, bones',stones:'Red jasper, garnet, hematite, black onyx',herbs:'Ginger, dandelion root, burdock root, ashwagandha',bal:['Safe and grounded','Present in the body','Steady, patient, secure'],imb:['Anxious or fearful','Scattered, restless, hard to settle','Insecure about home, money or belonging'],breath:'Slow belly breath, feel your feet and seat'},
 {pt:'Lower belly, about two finger-widths below the navel',organs:'Reproductive organs, bladder, kidneys region, hips',zone:'Hips, lower belly, lower back',stones:'Carnelian, orange calcite, moonstone',herbs:'Calendula, hibiscus, cinnamon, orange peel',bal:['Creative and playful','Feelings flow freely','Healthy pleasure and connection'],imb:['Feeling stuck or uninspired','Guilt or emotional swings','Weak boundaries in relationships'],breath:'Circle the hips gently while breathing'},
 {pt:'Upper belly, between the navel and the bottom of the breastbone',organs:'Solar (celiac) nerve plexus, stomach, pancreas, liver, adrenals on the kidneys',zone:'Stomach, digestion, mid-back',stones:"Citrine, tiger's eye, yellow calcite",herbs:'Chamomile, lemongrass, peppermint, turmeric',bal:['Confident and motivated','Clear will, follows through','Healthy self-worth'],imb:['Low confidence or feeling powerless','Controlling or quick to anger','Nervous stomach under stress'],breath:'Strong exhale, like blowing out a candle'},
 {pt:'Center of the chest, at the level of the heart',organs:'Heart, lungs, cardiac nerve plexus, thymus',zone:'Chest, upper back, shoulders, arms, hands',stones:'Rose quartz, green aventurine, malachite',herbs:'Hawthorn, rose, holy basil (tulsi)',bal:['Loving and compassionate','Forgives and receives love','Feels connected to others'],imb:['Holding grief or resentment','Closed off or lonely','Jealousy, giving without receiving'],breath:'Breathe into the chest, open the arms'},
 {pt:'The hollow of the throat, above the collarbones',organs:'Thyroid, voice box, pharyngeal nerves, jaw, ears',zone:'Throat, neck, jaw, ears, shoulders',stones:'Turquoise, blue lace agate, aquamarine',herbs:'Peppermint, sage, slippery elm, licorice root',bal:['Speaks clearly and honestly','Listens well','Expresses creativity'],imb:['Fear of speaking up','Talking over others or holding words in','Tight jaw, neck or shoulders'],breath:'Hum on the exhale, feel the throat buzz'},
 {pt:'Forehead, between the eyebrows',organs:'Pituitary gland and hypothalamus (deep behind the eyes), eyes, sinuses',zone:'Eyes, forehead, sinuses, head',stones:'Lapis lazuli, amethyst, sodalite',herbs:'Lavender, passionflower, gotu kola, mugwort',bal:['Intuitive and clear-minded','Sees the bigger picture','Good imagination and dreams'],imb:['Confused or without direction','Overthinking, mental fog','Tension around eyes and forehead'],breath:'Eyes soft and closed, focus between the brows'},
 {pt:'Top (crown) of the head',organs:'Cerebral cortex; pineal gland deep in the center of the brain; nervous system',zone:'Top of the head, brain, whole nervous system',stones:'Clear quartz, amethyst, selenite',herbs:'Lotus, gotu kola, lavender, frankincense (resin)',bal:['Peaceful and connected','Open to spirit and wisdom','Sense of purpose'],imb:['Disconnected or aimless','Cynical or closed to spirit','Lost sense of meaning'],breath:'Silent breath, feel space above the head'}
];
const HERB_CAUTION={'licorice root':'avoid with high blood pressure','mugwort':'avoid in pregnancy','ashwagandha':'avoid in pregnancy; check with thyroid or sedative medicines','passionflower':'can cause drowsiness'};
let focus=store('rl_focus')||[];let bodySel=0;
const BY=[250,215,168,118,74,38,12];
function buildBody(svg,pre,tap){
  const z=(i,o)=>`fill="${ST[i].col}" fill-opacity="${o}"`;
  svg.innerHTML=`<defs><filter id="${pre}bg" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
<g stroke="#c9a94a" stroke-opacity=".55" stroke-width="1">
<g data-z="0" class="zn"><path d="M72,240 L68,330 L66,396 Q66,410 84,410 L94,410 L96,332 L100,262 L104,332 L106,410 L116,410 Q134,410 134,396 L132,330 L128,240 Z" ${z(0,.28)}/></g>
<g data-z="1" class="zn"><path d="M70,200 L130,200 L132,242 L68,242 Z" ${z(1,.3)}/></g>
<g data-z="2" class="zn"><path d="M66,145 L134,145 L131,201 L69,201 Z" ${z(2,.3)}/></g>
<g data-z="3" class="zn"><path d="M60,88 Q100,80 140,88 L136,146 L64,146 Z" ${z(3,.3)}/><path d="M60,90 Q40,140 44,200 L40,236 L50,238 L56,202 Q58,150 68,118 Z" ${z(3,.22)}/><path d="M140,90 Q160,140 156,200 L160,236 L150,238 L144,202 Q142,150 132,118 Z" ${z(3,.22)}/></g>
<g data-z="4" class="zn"><path d="M90,64 L110,64 L112,86 Q100,90 88,86 Z" ${z(4,.35)}/></g>
<g data-z="5" class="zn"><circle cx="100" cy="38" r="25" ${z(5,.28)}/></g>
<g data-z="6" class="zn"><path d="M76,30 Q100,2 124,30 Q100,20 76,30 Z" ${z(6,.45)}/></g>
</g>
<line x1="100" y1="10" x2="100" y2="250" stroke="#f4c430" stroke-opacity=".35" stroke-width="1.5" stroke-dasharray="3 3"/>
${ST.map((s,i)=>`<g data-z="${i}" class="pp"><circle cx="100" cy="${BY[i]}" r="7" fill="${s.col}" stroke="#fff" stroke-width="1.2"/><text x="100" y="${BY[i]+3}" text-anchor="middle" font-size="8" font-weight="900" fill="#111">${i+1}</text>
<line x1="${i%2?92:108}" y1="${BY[i]}" x2="${i%2?-2:202}" y2="${BY[i]}" stroke="${s.col}" stroke-opacity=".5" stroke-width=".8"/>
<text x="${i%2?-4:204}" y="${BY[i]-2}" text-anchor="${i%2?'end':'start'}" font-size="10.5" font-weight="900" fill="${s.col}">${s.name}</text>
<text x="${i%2?-4:204}" y="${BY[i]+9}" text-anchor="${i%2?'end':'start'}" font-size="7.5" fill="#c3bfa8">${s.n} · ${s.seed.split(' ')[0]} · ${BODY[i].stones.split(',')[0]}</text></g>`).join('')}`;
  svg.querySelectorAll('[data-z]').forEach(g=>{g.style.cursor='pointer';g.addEventListener('click',e=>{e.stopPropagation();tap(+g.dataset.z)})});
}
function markBody(svg,pre,on){svg.querySelectorAll('.zn').forEach(g=>{const a=on.includes(+g.dataset.z);g.querySelectorAll('path,circle').forEach(p=>{p.setAttribute('fill-opacity',a?.75:(on.length?.12:.3))});g.setAttribute('filter',a?`url(#${pre}bg)`:'')});
  svg.querySelectorAll('.pp circle').forEach((c,i)=>{const a=on.includes(i);c.setAttribute('r',a?10:7);c.setAttribute('filter',a?`url(#${pre}bg)`:'')})}
function herbList(h){return h.split(', ').map(x=>{const k=x.toLowerCase();return HERB_CAUTION[k]?`${x}<sup style="color:#f4c430">*</sup>`:x}).join(', ')}
function herbNotes(h){return h.split(', ').map(x=>HERB_CAUTION[x.toLowerCase()]?`* ${x}: ${HERB_CAUTION[x.toLowerCase()]}`:'').filter(Boolean).join(' · ')}
function showBody(i){bodySel=i;const s=ST[i],b=BODY[i],inF=focus.includes(i);
  $('bodyCard').innerHTML=`<div class="card"><div class="top" style="background:linear-gradient(90deg,${s.col},${s.col}cc)">${i+1} · ${s.name} · ${s.dev}<small>${s.iast} (${s.say}) · “${s.mean}”</small><small>Note ${s.n} · ${s.so} · seed sound ${s.seed} · ${s.el}</small></div><div class="body">
<span class="tag t-l">📍 PINPOINT</span><div class="chill-line" style="margin-top:2px">${b.pt}</div>
<div class="kv"><div>Body area</div><div>${b.zone}</div><div>Organs & glands</div><div>${b.organs}</div><div>Color</div><div><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${s.col};vertical-align:-1px"></span> ${s.nm}</div><div>Stones</div><div>${b.stones}</div><div>Herbs</div><div>${herbList(b.herbs)}</div><div>Affirmation</div><div style="color:${s.col};font-weight:800">“${s.aff}”</div></div>
${herbNotes(b.herbs)?`<div class="note" style="margin-top:4px">${herbNotes(b.herbs)}</div>`:''}
<div class="grid2" style="gap:10px;margin-top:10px"><div style="background:#0f2416;border:1px solid #22a25a55;border-radius:12px;padding:10px"><b style="color:#8fe0b2">✅ Balanced</b><ul style="margin:6px 0 0 18px;padding:0;line-height:1.55">${b.bal.map(x=>`<li>${x}</li>`).join('')}</ul></div>
<div style="background:#2a1512;border:1px solid #e2382b55;border-radius:12px;padding:10px"><b style="color:#f4a79e">⚠ Out of balance</b><ul style="margin:6px 0 0 18px;padding:0;line-height:1.55">${b.imb.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
${mudraBlock(i)}
<span class="tag t-m">🎶 WORK THIS AREA</span><div class="kv"><div>Sound</div><div>${s.n} note · bowl or flute · chant ${s.seed.split(' ')[0]} (${s.bija})</div><div>Breath</div><div>${b.breath}</div></div>
<div class="controls" style="margin-top:10px"><button class="b" id="bcTone">🔊 Play ${s.n}</button><button class="s" id="bcFocus">${inF?'✓ In today’s focus':'＋ Add to today’s focus'}</button></div>
</div></div>`;
  $('bcTone').onclick=()=>sound(noteHz(60+s.pc),4,.2);$('bcFocus').onclick=()=>{focus=inF?focus.filter(x=>x!==i):[...focus,i].sort();store('rl_focus',focus);renderFocus();showBody(i)};
  markBody($('bodyfig'),'b',[...new Set([i,...focus])]);}
function renderFocus(){$('focusList').innerHTML=focus.length?'Today\'s focus: '+focus.map(i=>`<b style="color:${ST[i].col}">${ST[i].name}</b>`).join(' · '):'Today\'s focus: none yet. Open an area and tap “＋ Add to today\'s focus”.'}
buildBody($('bodyfig'),'b',showBody);
/* chakra picker: tap a station to open it and hear its note (no need to hunt on the body) */
function ckStrip(host,onPick,id){if(!host)return;const d=document.createElement('div');d.className='ck-strip';d.id=id;
  d.innerHTML=ST.map((s,i)=>`<button type="button" data-i="${i}" style="--c:${s.col}" title="${s.name} · ${s.n}"><i></i><b>${s.n}</b><small>${s.name}</small></button>`).join('');
  d.addEventListener('click',e=>{const b=e.target.closest('button[data-i]');if(!b)return;const i=+b.dataset.i;onPick(i);ckMark(id,i);sound(noteHz(60+ST[i].pc),3,.2)});host.before(d)}
function ckMark(id,i){const d=$(id);if(d)d.querySelectorAll('button').forEach(b=>b.classList.toggle('on',+b.dataset.i===i))}
ckStrip($('bodyfig')&&$('bodyfig').closest('.figwrap'),i=>showBody(i),'ckBody');
ckStrip($('fig')&&$('fig').closest('.figwrap'),i=>{selected=i;showCard(i);try{glowPts(LF,[i])}catch(e){}},'ckLive');
{const _sb=showBody;showBody=function(i){_sb(i);ckMark('ckBody',i)};}
{const _sc=showCard;showCard=function(i){_sc(i);ckMark('ckLive',i)};}

$('chart').innerHTML='<tr><th>#</th><th>Chakra</th><th>Pinpoint</th><th>Color</th><th>Note · seed</th><th>Organs & glands</th><th>Stones</th><th>Herbs</th><th>Mudra</th></tr>'+ST.map((s,i)=>`<tr><td style="color:${s.col};font-weight:900">${i+1}</td><td><b style="color:${s.col}">${s.name}</b><br><span style="font-size:15px">${s.dev}</span><br><span class="note"><i>${s.iast}</i><br>“${s.mean}”</span></td><td>${BODY[i].pt}</td><td><span style="display:inline-block;width:12px;height:12px;border-radius:50%;background:${s.col}"></span> ${s.nm.replace('≈ ','')}</td><td>${s.n} · ${s.seed.split(' ')[0]}</td><td>${BODY[i].organs}</td><td>${BODY[i].stones}</td><td>${herbList(BODY[i].herbs)}</td><td><div style="width:70px">${mudraSVG(i)}</div>${MUDRA[i].name}</td></tr>`).join('');
let cmBuilt=false;
$('cmOpen').onclick=()=>{const list=focus.length?focus:[bodySel];if(!cmBuilt){buildBody($('cmfig'),'c',i=>{});cmBuilt=true}markBody($('cmfig'),'c',list);
  $('cmList').innerHTML=list.map(i=>{const s=ST[i],b=BODY[i];return `<div class="card" style="margin:10px 0"><div class="top" style="background:${s.col}">${s.name} · ${s.dev} · ${s.iast}<small>${b.zone} · ${b.pt}</small></div><div class="body"><div class="chill-line">${s.chill}</div><div class="note">Working toward: ${b.bal.join(' · ')}</div><div style="display:flex;gap:10px;align-items:center;margin-top:8px"><div style="width:90px;flex:none">${mudraSVG(i)}</div><div class="note"><b style="color:${s.col}">${MUDRA[i].name}</b><br>${MUDRA[i].how}</div></div><div class="kv" style="margin-top:6px"><div>Sound</div><div>${s.n} · ${s.seed.split(' ')[0]}</div><div>Stones</div><div>${b.stones}</div><div>Affirmation</div><div style="color:${s.col};font-weight:900">“${s.aff}”</div></div></div></div>`}).join('');
  $('clientMap').style.display='flex'};
$('cmClose').onclick=()=>$('clientMap').style.display='none';
$('focusClear').onclick=()=>{focus=[];store('rl_focus',focus);renderFocus();showBody(bodySel)};
renderFocus();showBody(0);

/* ---------- session mode ---------- */
function showMudraPop(){const st=ST[sI],m=MUDRA[sI];const p=$('sMudraPop');p.innerHTML=`<div style="width:min(60vw,260px)">${mudraSVG(sI)}</div><div class="sname" style="font-size:clamp(26px,7vw,40px);color:${st.col}">${m.name}</div><div style="font-size:18px">${m.dev} · ${st.dev} ${st.iast}</div><div class="sline" style="font-size:17px">${m.how}</div><div class="note">For: ${m.why}</div><button class="b" id="sMudraClose">Done</button>`;p.style.display='flex';$('sMudraClose').onclick=()=>p.style.display='none'}
let SF=null,sI=0,sGuide=null;
function sShow(i){sI=(i+7)%7;const st=ST[sI];$('sName').textContent=st.name;$('sName').style.color=st.col;$('sMeta').textContent=`${st.sk} · ${st.n} · ${st.so} · seed sound ${st.seed.split(' ')[0]} · ${st.el}`;$('sLine').textContent=st.chill;$('sAff').textContent='“'+st.aff+'”';$('sAff').style.color=st.col;$('sBody').textContent='In the body here: '+st.near;if($('sMudraPop').style.display==='flex')showMudraPop();$('sessCount').textContent=`Station ${sI+1} of 7`+(sGuide?' · auto':' · tap ▶ for the next sound');glowPts(SF,[sI])}
$('sessOpen').onclick=()=>{if(!SF){SF=buildFigure($('sfig'),'s',i=>sShow(i));}applyLayer(SF);$('session').classList.add('on');sShow(selected>=0?selected:0);try{document.documentElement.requestFullscreen&&document.documentElement.requestFullscreen()}catch(e){}};
function sStopGuide(){if(sGuide){clearInterval(sGuide.timer);sGuide=null}$('sGuide').textContent='▶ Guided journey';$('sProg').style.width='0'}
$('sMudraBtn').onclick=showMudraPop;
$('sessClose').onclick=()=>{$('sMudraPop').style.display='none';sStopGuide();$('session').classList.remove('on');try{document.fullscreenElement&&document.exitFullscreen()}catch(e){}};
$('sPrev').onclick=()=>{sStopGuide();sShow(sI-1);sound(noteHz(60+ST[sI].pc),4,.2)};$('sNext').onclick=()=>{sStopGuide();sShow(sI+1);sound(noteHz(60+ST[sI].pc),4,.2)};
$('sTone').onclick=()=>sound(noteHz(60+ST[sI].pc),4,.2);
$('sGuide').onclick=()=>{if(sGuide){sStopGuide();return}const dur=+$('sDur').value;sGuide={i:0,t0:performance.now(),lastT:0};$('sGuide').textContent='⏸ Stop guide';sShow(0);sound(noteHz(60),4,.2);
  sGuide.timer=setInterval(()=>{const el=(performance.now()-sGuide.t0)/1000;const k=Math.floor(el/dur);$('sProg').style.width=Math.min(100,el/(dur*7)*100)+'%';
    if(k>=7){sStopGuide();$('sLine').textContent='Rest here in silence. Notice how your whole body feels now.';glowPts(SF,[0,1,2,3,4,5,6]);return}
    if(k!==sGuide.i){sGuide.i=k;sShow(k);sound(noteHz(60+ST[k].pc),4,.2);sGuide.lastT=el}else if(el-sGuide.lastT>=20&&dur-(el-k*dur)>8){sGuide.lastT=el;sound(noteHz(60+ST[k].pc),4,.13)}},250)};
function ringPulse(){const lvl=demo?0.6:(cur.f?Math.min(1,cur.rms*14):0)+(performance.now()<toneUntil?0.5:0);const sc=1+Math.min(.12,lvl*.12);[LF,SF].forEach(F=>{if(F&&F.ring){F.ring.setAttribute('transform',`translate(180 118) scale(${sc.toFixed(3)}) translate(-180 -118)`);F.ring.style.opacity=.55+Math.min(.45,lvl)}});
  if(SF&&$('session').classList.contains('on')&&!sGuide&&cur.f&&cur.conf>.8){const k=stationOfPc(cur.pc);if(k>=0&&k!==sI)sShow(k)}}

/* ---------- loop ---------- */
function loop(now){
  frame++;
  if(inst==="midi"){fromMidi(now)}else if(running&&an){analyse(now)}
  readouts(now);
  if($('v-live').classList.contains('on')){if(sysShow('trail'))drawTrail(now);if(frame%3===0&&sysShow('ladder'))drawLadder()}
  if($('v-sound').classList.contains('on')&&sysShow('scope')){drawWave();drawSpec()}
  if(sysShow('plate'))stepPlate();ringPulse();
  requestAnimationFrame(loop);
}

async function start(){
  if(!running)wakeVoice();
  if(typeof medStop==="function"&&med){medStop();$("status").textContent="Meditation sound paused so the mic can listen clearly.";}
  if(running)return;
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){$('status').textContent='Microphone unavailable here. Open this page in Chrome.';return}
  try{
    $('status').textContent='Asking for microphone permission…';
    stream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:false,noiseSuppression:false,autoGainControl:false}});
    ctx=new (window.AudioContext||window.webkitAudioContext)();await ctx.resume();
    src=ctx.createMediaStreamSource(stream);an=ctx.createAnalyser();an.fftSize=8192;an.smoothingTimeConstant=.5;src.connect(an);
    td=new Float32Array(an.fftSize);fd=new Float32Array(an.frequencyBinCount);running=true;
    $('start').disabled=true;$('stop').disabled=false;$('status').textContent='Live · audio is not saved or uploaded; analysis stays on this device.';
  }catch(e){$('status').textContent='Could not start microphone: '+(e.message||e.name)+'. Check Chrome permissions.'}
}
function stop(){running=false;if(stream)stream.getTracks().forEach(t=>t.stop());stream=null;if(src)src.disconnect();src=null;if(ctx)ctx.close().catch(()=>{});ctx=null;an=null;cur={f:null,midi:null,conf:0,rms:0,db:null,cents:null,name:null,pc:null,vib:null};$('start').disabled=false;$('stop').disabled=true;$('status').textContent='Microphone off. Nothing is being recorded.'}
$('start').onclick=start;$('stop').onclick=stop;
window.addEventListener('pagehide',()=>{if(running)stop()});

/* ---------- journal ---------- */
const EMO=['Joy','Trust','Fear','Surprise','Sadness','Disgust','Anger','Anticipation','Serenity','Love','Awe','Optimism'];
let emo='';$('emo').innerHTML=EMO.map(e=>`<button>${e}</button>`).join('');
$('emo').querySelectorAll('button').forEach(b=>b.onclick=()=>{emo=emo===b.textContent?'':b.textContent;$('emo').querySelectorAll('button').forEach(x=>x.classList.toggle('on',x.textContent===emo))});
const EGS=['Joy / knowledge / empowerment / freedom / love / appreciation','Passion','Enthusiasm / eagerness / happiness','Positive expectation / belief','Optimism','Hopefulness','Contentment','Boredom','Pessimism','Frustration / irritation / impatience','Overwhelm','Disappointment','Doubt','Worry','Blame','Discouragement','Anger','Revenge','Hatred / rage','Jealousy','Insecurity / guilt / unworthiness','Fear / grief / depression / powerlessness'];
$('egs').innerHTML='<option value="">— choose —</option>'+EGS.map((e,i)=>`<option value="${i+1}">${i+1}. ${e}</option>`).join('');
let lastHeard=null;setInterval(()=>{if(cur.f&&cur.conf>.75)lastHeard={...cur,sustain:best}},250);
function getLog(){return store('rl_log')||[]}
$('save').onclick=()=>{
  const h=lastHeard;const si=h?stationOfPc(h.pc):-1;
  const row={time:new Date().toISOString(),source:$('source').value,note:h?h.name:'',hz:h?h.f.toFixed(1):'',cents:h?h.cents:'',tuning:'A'+A4,station:si>=0?ST[si].name:'',best_sustain_s:best.toFixed(1),wobble_hz:h&&h.vib?h.vib.hz.toFixed(1):'',wobble_band:h&&h.vib?BANDS[bandOf(h.vib.hz)]:'',feeling:emo,scale:$('egs').value,body:$('body').value,notes:$('notes').value};
  const log=getLog();log.push(row);store('rl_log',log);$('saveMsg').textContent='Saved ✓ ('+log.length+' moments)';$('body').value='';$('notes').value='';renderLog();
};
function esc(s){return String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}
function renderLog(){
  const log=getLog();if(!log.length){$('summary').textContent='No saved moments yet.';$('logTable').innerHTML='';return}
  const by={};for(const r of log){if(!r.station)continue;(by[r.station]=by[r.station]||[]).push(r)}
  $('summary').innerHTML='<b>By station</b> (what you felt most, average scale):<br>'+ST.filter(s=>by[s.name]).map(s=>{const rs=by[s.name],f={};rs.forEach(r=>{if(r.feeling)f[r.feeling]=(f[r.feeling]||0)+1});const top=Object.entries(f).sort((a,b)=>b[1]-a[1])[0];const sc=rs.filter(r=>r.scale).map(r=>+r.scale);return `<span style="color:${s.col}">●</span> ${s.name}: ${rs.length}× · ${top?top[0]:'—'} · scale ${sc.length?(sc.reduce((a,b)=>a+b,0)/sc.length).toFixed(1):'—'}`}).join('<br>');
  $('logTable').innerHTML='<tr><th>When</th><th>Note</th><th>Station</th><th>Feeling</th><th>Scale</th><th>Body</th></tr>'+log.slice(-25).reverse().map(r=>`<tr><td>${esc(new Date(r.time).toLocaleString([], {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}))}</td><td>${esc(r.note)}</td><td>${esc(r.station)}</td><td>${esc(r.feeling)}</td><td>${esc(r.scale)}</td><td>${esc(r.body)}</td></tr>`).join('');
}
$('export').onclick=()=>{const log=getLog();if(!log.length)return;const keys=Object.keys(log[0]);const q=v=>'"'+String(v??'').replace(/"/g,'""')+'"';const csv=keys.join(',')+'\n'+log.map(r=>keys.map(k=>q(r[k])).join(',')).join('\n')+'\n';const url=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));const a=document.createElement('a');a.href=url;a.download='electro-tuner-log-'+new Date().toISOString().slice(0,10)+'.csv';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2500)};
let clearArm=0;$('clear').onclick=()=>{if(Date.now()-clearArm<3000){store('rl_log',[]);renderLog();$('clear').textContent='🗑 Clear log';clearArm=0}else{clearArm=Date.now();$('clear').textContent='Tap again to erase';setTimeout(()=>$('clear').textContent='🗑 Clear log',3000)}};

function setInst(v){inst=v;store('rl_inst',v);$('inst').value=v;$('midiBox').style.display=v==='midi'?'block':'none';const map={bowl:'Singing bowl',flute:'Native flute',voice:'Voice / humming',guitar:'Guitar',keys:'Keyboard',midi:'MIDI instrument'};$('source').value=map[v];held.clear();capT=0}
$('inst').addEventListener('change',e=>setInst(e.target.value))
/* picking Guitar from chromatic sets standard guitar tuning, so the string guide (E A D G B E) shows right away */
$('inst').addEventListener('change',e=>{try{if(e.target.value==='guitar'&&TM.mode==='chromatic')tmMode('preset','g_std')}catch(err){}});$('midiBtn').onclick=connectMidi;setInst(inst);
let depth=store('rl_depth')||'viber';
function setDepth(d){depth=d;store('rl_depth',d);document.body.classList.remove('d-chill','d-viber','d-saiyan');document.body.classList.add('d-'+d);document.querySelectorAll('#depth button').forEach(b=>b.classList.toggle('on',b.dataset.d===d));capT=0}
document.querySelectorAll('#depth button').forEach(b=>b.onclick=()=>setDepth(b.dataset.d));setDepth(depth);setLayer(layer);
document.querySelectorAll('.voiceSel').forEach(el=>{el.value=voiceSel;el.addEventListener('change',e=>{voiceSel=e.target.value;store('rl_voice',voiceSel);document.querySelectorAll('.voiceSel').forEach(x=>x.value=voiceSel)})});
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){navigator.serviceWorker.register('sw.js').catch(()=>{})}
/* ---------- soft UI sounds + welcome chime ---------- */
let uiOn=store('rl_ui');if(uiOn===null)uiOn=1;
function uiOK(){return uiOn&&!running}
const PENTA=[523.25,587.33,659.25,783.99,880];let lastP=-1;
function softTap(){if(!uiOK())return;try{const c=actx(),t=c.currentTime;let k;do{k=Math.random()*PENTA.length|0}while(k===lastP);lastP=k;const f=PENTA[k];
  const out=c.createGain();out.gain.value=1;out.connect(c.destination);
  [[1,.009,1.4],[2.76,.0025,.8],[5.4,.001,.45]].forEach(([r,a,dec])=>{[0,1.2].forEach(det=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f*r+det;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(a/2,t+.012);g.gain.exponentialRampToValueAtTime(.00015,t+dec);o.connect(g).connect(out);o.start(t);o.stop(t+dec+.05)})})}catch(e){}}
function welcome(){if(!uiOn)return;try{const c=actx(),t=c.currentTime;const out=c.createGain();out.gain.value=.9;out.connect(c.destination);
  const d=c.createDelay(1.2),fb=c.createGain(),wet=c.createGain();d.delayTime.value=.32;fb.gain.value=.38;wet.gain.value=.35;out.connect(d);d.connect(fb).connect(d);d.connect(wet).connect(c.destination);
  [[261.63,0],[392,.18],[523.25,.36],[659.25,.54]].forEach(([f,dt])=>{[[1,.06],[2.76,.018],[5.4,.008]].forEach(([r,a])=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f*r;g.gain.setValueAtTime(0,t+dt);g.gain.linearRampToValueAtTime(a,t+dt+.02);g.gain.exponentialRampToValueAtTime(.0002,t+dt+2.6/r);o.connect(g).connect(out);o.start(t+dt);o.stop(t+dt+2.7)})});
  const sw=c.createOscillator(),sg=c.createGain();sw.type='sine';sw.frequency.setValueAtTime(130.8,t);sg.gain.setValueAtTime(0,t);sg.gain.linearRampToValueAtTime(.05,t+.6);sg.gain.exponentialRampToValueAtTime(.0002,t+3.2);sw.connect(sg).connect(out);sw.start(t);sw.stop(t+3.3)}catch(e){}}
let welcomed=false;function doWelcome(){if(welcomed)return;welcomed=true;welcome()}
/* Jah's voice welcome: bells + reverb, plays on Tap to enter */
/* wake voice: first time a system is turned on, or after 2+ minutes of rest, Jah's voice wakes the system */
const WAKE={last:0,idle:120000};
const WAKEV={buf:null,loading:null};
function wakeLoad(){if(WAKEV.loading)return WAKEV.loading;WAKEV.loading=fetch('intro-wake.m4a').then(r=>r.arrayBuffer()).then(a=>new Promise((res,rej)=>actx().decodeAudioData(a,res,rej))).then(b=>(WAKEV.buf=b)).catch(()=>{WAKEV.loading=null;return null});return WAKEV.loading}
function wakeVoice(){const now=Date.now(),sleepy=!WAKE.last||now-WAKE.last>WAKE.idle;WAKE.last=now;if(!sleepy||!uiOn)return;
  wakeLoad().then(b=>{if(!b)return;const c=actx(),s=c.createBufferSource();s.buffer=b;s.connect(c.destination);s.start(c.currentTime+.03);if(typeof ESSI!=='undefined')ESSI.quietUntil=performance.now()+3700}).catch(()=>{})}
setInterval(()=>{if(typeof running!=='undefined'&&running)WAKE.last=Date.now()},5000);
/* Jah's voice plays through the same Web Audio engine as the meditation sound, so it can sound the moment the app opens */
const VOX={buf:null,loading:null};
function voxLoad(){if(VOX.loading)return VOX.loading;VOX.loading=fetch('intro-voice.m4a').then(r=>r.arrayBuffer()).then(a=>new Promise((res,rej)=>actx().decodeAudioData(a,res,rej))).then(b=>(VOX.buf=b)).catch(()=>{VOX.loading=null;return null});return VOX.loading}
function voxStart(b){const c=actx(),s=c.createBufferSource(),g=c.createGain();s.buffer=b;g.gain.value=1;s.connect(g).connect(c.destination);s.start(c.currentTime+.05);if(typeof ESSI!=='undefined')ESSI.quietUntil=performance.now()+5800}
function voxPlay(){return voxLoad().then(b=>{if(!b)throw new Error('no voice');voxStart(b);return true})}
const INTRO_VOX=true;
/* voice on open: plays the moment the sound engine is running (like the meditation sound); if the phone holds sound until a touch, it plays on that first touch. Once per app launch. */
let introDone=false;
function tryIntro(){if(introDone||!uiOn||!VOX.buf||!toneCtx||toneCtx.state!=='running'||document.visibilityState!=='visible')return;introDone=true;voxStart(VOX.buf)}
if(uiOn){try{const c=actx();c.addEventListener('statechange',tryIntro);document.addEventListener('visibilitychange',tryIntro);voxLoad().then(tryIntro);c.resume().then(tryIntro).catch(()=>{});
  ['pointerdown','click','keydown'].forEach(ev=>document.addEventListener(ev,()=>{try{actx().resume().then(tryIntro).catch(()=>{})}catch(e){}},{capture:true,passive:true}))}catch(e){}}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#splash'))return;const b=e.target.closest('button,select,.pp,.pt,[data-z]');if(!welcomed){doWelcome();return}if(b)softTap()},true);
function uiUI(){$('uiBtn').classList.toggle('on',!!uiOn);$('uiBtn').textContent='🔔 Tap sounds: '+(uiOn?'on':'off')}
$('uiBtn').addEventListener('click',()=>{uiOn=uiOn?0:1;store('rl_ui',uiOn);uiUI()});uiUI();

/* ---------- meditation sound (generated live, works offline) ---------- */
let med=null;
function medStart(){
  try{const c=actx();const t=c.currentTime;const master=c.createGain();master.gain.setValueAtTime(0,t);master.gain.linearRampToValueAtTime(.075,t+3);master.connect(c.destination);
    const breath=c.createGain();breath.gain.value=.85;breath.connect(master);
    const lfo=c.createOscillator(),lg=c.createGain();lfo.frequency.value=.07;lg.gain.value=.15;lfo.connect(lg).connect(breath.gain);lfo.start();
    const nodes=[lfo];const base=136.1;
    [[1,.55],[1.5,.22],[2,.28],[3,.06],[4,.04]].forEach(([r,a])=>{[-0.25,0.25].forEach(d=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=base*r+d*r;g.gain.value=a/2;o.connect(g).connect(breath);o.start();nodes.push(o)})});
    const len=c.sampleRate*4,buf=c.createBuffer(1,len,c.sampleRate),ch=buf.getChannelData(0);let last=0;for(let i=0;i<len;i++){last=(last+.02*(Math.random()*2-1))/1.02;ch[i]=last*3.2}
    const n=c.createBufferSource();n.buffer=buf;n.loop=true;const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=420;const ng=c.createGain();ng.gain.value=.12;
    const wl=c.createOscillator(),wg=c.createGain();wl.frequency.value=.09;wg.gain.value=.08;wl.connect(wg).connect(ng.gain);wl.start();
    n.connect(lp).connect(ng).connect(master);n.start();nodes.push(n,wl);
    med={master,nodes};}catch(e){med=null}
  medUI();
}
function medStop(){if(!med)return;const c=toneCtx,m=med;med=null;try{m.master.gain.cancelScheduledValues(c.currentTime);m.master.gain.setValueAtTime(m.master.gain.value,c.currentTime);m.master.gain.linearRampToValueAtTime(0,c.currentTime+1.5);setTimeout(()=>m.nodes.forEach(x=>{try{x.stop()}catch(e){}}),1700)}catch(e){}medUI()}
function medToggle(){if(med){medStop();store('rl_med',0)}else{if(running)stop();medStart();store('rl_med',1)}}
function medUI(){const on=!!med;[$('medBtn'),$('sMedBtn')].forEach(b=>{if(!b)return;b.classList.toggle('on',on)});$('medBtn').textContent='🎵 Meditation sound: '+(on?'on':'off');$('sMedBtn').textContent=on?'🎵 Sound on':'🎵 Sound'}
$('medBtn').onclick=medToggle;$('sMedBtn').onclick=medToggle;
/* meditation sound opens with the app; if the phone blocks sound until a tap, it starts on the first tap */
if(!med)medStart();{const once=()=>{document.removeEventListener('pointerdown',once,true);if(toneCtx&&toneCtx.state==='suspended')toneCtx.resume();if(!med&&!running)medStart()};document.addEventListener('pointerdown',once,true)}

/* ---------- floating wavelengths background ---------- */
(function(){const cv=$('bgWaves'),g=cv.getContext('2d');const R=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const W=[{c:'226,56,43',f:1.3,s:.18,y:.28,a:.16},{c:'244,196,48',f:.9,s:-.12,y:.5,a:.14},{c:'34,162,90',f:1.7,s:.09,y:.72,a:.16},{c:'176,95,214',f:2.3,s:-.22,y:.88,a:.08}];
  function size(){cv.width=Math.round(innerWidth*Math.min(DPR(),1.5));cv.height=Math.round(innerHeight*Math.min(DPR(),1.5))}
  size();addEventListener('resize',size);let last=0,lvl=0;
  function draw(now){requestAnimationFrame(draw);if(document.hidden||now-last<33)return;last=now;const t=now/1000;
    const live=(running&&cur.f)?Math.min(1,cur.rms*12):(med?.25:0);lvl+=(live-lvl)*.05;
    const w=cv.width,h=cv.height;g.clearRect(0,0,w,h);g.lineWidth=1.6*Math.min(DPR(),1.5);
    for(const L of W){const amp=h*(.03+.05*lvl)*(1+.3*Math.sin(t*.3+L.f));g.strokeStyle=`rgba(${L.c},${L.a+.12*lvl})`;g.shadowColor=`rgba(${L.c},.6)`;g.shadowBlur=8;g.beginPath();
      for(let x=0;x<=w;x+=6){const k=x/w;const y=h*L.y+Math.sin(k*Math.PI*2*L.f+t*L.s*6)*amp+Math.sin(k*Math.PI*2*L.f*2.3-t*.7)*amp*.35;x?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}
    g.shadowBlur=0}
  if(!R)requestAnimationFrame(draw);else draw(1000)})();

/* ---------- splash starfield + galaxy ---------- */
(function(){const sp=$('splash');if(!sp)return;
  const cv=$('splashStars'),g=cv.getContext('2d');const R=matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cols=['#ffffff','#f4c430','#22a25a','#e2382b','#cfa6f4'];let S=[];
  function size(){cv.width=innerWidth*DPR();cv.height=innerHeight*DPR();S=Array.from({length:170},()=>({x:Math.random()*cv.width,y:Math.random()*cv.height,r:(Math.random()*1.3+.3)*DPR(),p:Math.random()*6.28,v:.2+Math.random()*.5,c:cols[Math.random()<.75?0:1+(Math.random()*4|0)]}));for(let k=0;k<46;k++)S.push({spark:1,x:cv.width*(.5+(Math.random()-.5)*.22),y:cv.height*(.78+Math.random()*.06),r:(Math.random()*1.6+.6)*DPR(),p:Math.random()*6.28,v:.5+Math.random()*1.2,c:['#f4c430','#ffe27a','#22a25a','#e2382b'][Math.random()*4|0]})}
  size();addEventListener('resize',size);let t0=performance.now();
  (function tick(now){if(!document.body.contains(cv))return;const dt=(now-t0)/1000;g.clearRect(0,0,cv.width,cv.height);
    for(const s of S){if(s.spark){const yy=s.y-((dt*s.v*60*DPR())%(cv.height*.75));const life=1-(s.y-yy)/(cv.height*.75);g.globalAlpha=Math.max(0,life)*.9;g.fillStyle=s.c;g.beginPath();g.arc(s.x+Math.sin(dt*2+s.p)*6*DPR(),yy,s.r,0,6.283);g.fill();continue}const a=.35+.65*Math.abs(Math.sin(s.p+dt*s.v*1.6));g.globalAlpha=a;g.fillStyle=s.c;g.beginPath();g.arc(s.x,(s.y-dt*6*s.v*DPR()+cv.height)%cv.height,s.r,0,6.283);g.fill()}
    g.globalAlpha=1;if(!R)requestAnimationFrame(tick)})(t0);})();

/* ---------- splash + practitioner intro ---------- */
if(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches)document.querySelectorAll('img.aura-anim').forEach(i=>i.src=i.dataset.still);
(function(){const sp=$('splash');let done=false;const close=()=>{if(done)return;done=true;sp.classList.add('is-exiting');setTimeout(()=>sp.remove(),400)};
  let seen=false;try{seen=sessionStorage.getItem('et_splash')==='1';sessionStorage.setItem('et_splash','1')}catch(e){}
  if(seen){sp.remove();return}
  const enter=(withSound)=>{welcomed=true;try{actx()}catch(e){}
    if(withSound&&!med){medStart();store('rl_med',1)}
    tryIntro();if(uiOn&&!introDone&&!VOX.buf)welcome();
    close()};
  $('enterBtn').addEventListener('click',e=>{e.stopPropagation();enter(true)});
  sp.addEventListener('click',()=>enter(true));})();
$('introOpen').onclick=()=>{sStopGuide();$('intro').classList.add('on')};$('introGo').onclick=()=>$('intro').classList.remove('on');
showCard(0);selected=0;
requestAnimationFrame(loop);

/* ================= ESSI · the frequency voice inside the instrument ================= */
const ESSI={speaking:false,quietUntil:0,voice:null,rate:.88,pitch:.95,vol:.8};
function essiBusy(){return ESSI.speaking||performance.now()<ESSI.quietUntil}
function essiPickVoice(){
  const vs=(window.speechSynthesis&&speechSynthesis.getVoices())||[];if(!vs.length)return null;
    const en=vs.filter(v=>/^en/i.test(v.lang));
  const pref=[/female/i,/samantha/i,/zira/i,/aria/i,/jenny/i,/libby/i,/google us english/i,/en-us.*x-.*f/i,/serena/i,/karen/i,/moira/i,/tessa/i];
  for(const p of pref){const v=en.find(x=>p.test(x.name)||p.test(x.voiceURI||''));if(v)return v}
  return en.find(v=>v.localService)||en[0]||vs[0];
}
if(window.speechSynthesis){speechSynthesis.onvoiceschanged=()=>{ESSI.voice=essiPickVoice()}}
function essiClean(t){const d=document.createElement('div');d.innerHTML=t;d.querySelectorAll('button').forEach(b=>b.remove());return d.textContent.replace(/[●→▲▼✦☥▶]/g,'').replace(/(\d+)¢/g,'$1 cents').replace(/±/g,'plus or minus ').replace(/−/g,'minus ').replace(/\bHz\b/g,'hertz').replace(/\s+/g,' ').trim()}
/* ===== ESSI's own voice with reverb (in-app neural voice, one-time download, then offline) ===== */
const NV={state:'none',mod:null,cur:null,stop:false,ir:null};
function nvMod(){return NV.mod||(NV.mod=import('./essi-tts.js'))}
function nvIR(c){if(NV.ir)return NV.ir;const len=Math.floor(c.sampleRate*2.2),b=c.createBuffer(2,len,c.sampleRate);
  for(let ch=0;ch<2;ch++){const d=b.getChannelData(ch);let lp=0;for(let i=0;i<len;i++){const t=i/c.sampleRate;const pre=t<.035?0:1;lp=lp*.55+(Math.random()*2-1)*.45;d[i]=lp*pre*Math.exp(-3.2*t)}}
  return NV.ir=b}
function nvChain(){const c=actx();if(NV.bus)return NV.bus;const inp=c.createGain(),dry=c.createGain(),wet=c.createGain(),conv=c.createConvolver(),hp=c.createBiquadFilter(),pres=c.createBiquadFilter();
  hp.type='highpass';hp.frequency.value=90;pres.type='peaking';pres.frequency.value=3200;pres.gain.value=2.5;pres.Q.value=.9;
  conv.buffer=nvIR(c);dry.gain.value=.85;wet.gain.value=.38;inp.connect(hp).connect(pres);pres.connect(dry).connect(c.destination);pres.connect(conv).connect(wet).connect(c.destination);
  return NV.bus=inp}
async function nvCheck(){try{const m=await nvMod();if(await m.isReady()){NV.state='ready';nvUI()}}catch(e){}}
async function nvDownload(){if(NV.state==='loading'||NV.state==='ready')return;NV.state='loading';nvUI();
  try{const m=await nvMod();await m.load((got,total)=>{NV.pct=total?Math.round(got/total*100):0;NV.mb=Math.round(got/1048576);nvUI()});NV.state='ready';nvUI()}
  catch(e){NV.state='error';NV.err=String(e&&e.message||e);nvUI()}}
window.nvDownload=nvDownload;
function nvUI(){document.querySelectorAll('.nv-bar').forEach(el=>{
  el.innerHTML=NV.state==='ready'?'✨ <span>ESSI\'s voice with reverb is on. Works offline.</span>'
   :NV.state==='loading'?`⏳ <span>Getting ESSI's voice… ${NV.pct?NV.pct+'%':(NV.mb||0)+' MB'}</span>`
   :NV.state==='error'?`⚠ <span>Couldn't get the voice (${NV.err||'no connection'}). Check your internet and try again.</span><button class="b" onclick="nvDownload()">Try again</button>`
   :'🎙 <span>Turn on ESSI\'s voice with reverb: one-time download (about 63 MB, best on Wi-Fi), then it works offline.</span><button class="b" onclick="nvDownload()">Get the voice</button>';
  el.dataset.state=NV.state})}
async function nvSpeak(parts,btn,done){
  NV.stop=false;const c=actx();try{await c.resume()}catch(e){}const m=await nvMod();const bus=nvChain();
  let next=m.synth(parts[0]);
  for(let i=0;i<parts.length;i++){
    let r;try{r=await next}catch(e){break}
    if(NV.stop)break;
    if(i+1<parts.length)next=m.synth(parts[i+1]);
    const buf=c.createBuffer(1,r.samples.length,r.rate);buf.copyToChannel(r.samples,0);
    const src=c.createBufferSource();src.buffer=buf;src.connect(bus);NV.cur=src;
    const pul=setInterval(()=>{ESSI.pulse=performance.now()},180);
    await new Promise(res=>{src.onended=res;src.start()});clearInterval(pul);
    if(NV.stop)break;await new Promise(res=>setTimeout(res,220));
  }
  NV.cur=null;done();
}
function essiSpeak(text,btn){
  if(ESSI.speaking&&ESSI.nvOn){NV.stop=true;try{NV.cur&&NV.cur.stop()}catch(e){}return}
  if(NV.state==='ready'){
    const parts=essiClean(text).split(/(?<=[.!?])\s+/).filter(Boolean);if(!parts.length)return;
    const done=()=>{ESSI.speaking=false;ESSI.nvOn=false;ESSI.quietUntil=performance.now()+450;document.querySelectorAll('.essi-play').forEach(b=>b.classList.remove('on'));essiState()};
    try{speechSynthesis&&speechSynthesis.cancel()}catch(e){}
    ESSI.speaking=true;ESSI.nvOn=true;if(btn)btn.classList.add('on');essiState();nvSpeak(parts,btn,done).catch(()=>done());return}
  if(!window.speechSynthesis){alert('This phone browser has no built-in voice.');return}
  if(ESSI.speaking){speechSynthesis.cancel();return}
  const parts=essiClean(text).split(/(?<=[.!?])\s+/).filter(Boolean);if(!parts.length)return;
  ESSI.voice=ESSI.voice||essiPickVoice();let i=0;
  const say=()=>{if(i>=parts.length){done();return}const u=new SpeechSynthesisUtterance(parts[i++]);if(ESSI.voice)u.voice=ESSI.voice;u.rate=ESSI.rate;u.pitch=ESSI.pitch;u.volume=ESSI.vol;
    u.onboundary=()=>{ESSI.pulse=performance.now()};u.onend=()=>setTimeout(say,300);u.onerror=()=>done();speechSynthesis.speak(u)};
  const done=()=>{ESSI.speaking=false;ESSI.quietUntil=performance.now()+450;document.querySelectorAll('.essi-play').forEach(b=>b.classList.remove('on'));essiState()};
  speechSynthesis.cancel();ESSI.speaking=true;if(btn)btn.classList.add('on');essiState();say();
}
function essiBubble(html,opts={}){return `<div class="essi-bubble${opts.cls?' '+opts.cls:''}"><canvas class="essi-orb" width="72" height="72"></canvas><div class="essi-txt"><div class="essi-who">ESSI${opts.tag?` · <span>${opts.tag}</span>`:''}</div><div class="essi-say">${html}</div></div><button class="essi-play" aria-label="Play ESSI voice" onclick="essiSpeak(this.parentNode.querySelector('.essi-say').innerHTML,this)">▶</button></div>`}
function essiState(){document.documentElement.dataset.essi=ESSI.speaking?'speaking':(running?'listening':'resting')}
/* the orb: heartbeat when resting, listening wave from the mic, equalizer while speaking */
function essiOrbs(now){
  const orbs=document.querySelectorAll('.essi-orb');
  orbs.forEach(c=>{if(!c.offsetParent)return;const g=c.getContext('2d'),W=c.width,H=c.height,cx=W/2,cy=H/2;g.clearRect(0,0,W,H);
    const st=ESSI.speaking?'s':running?'l':'r';
    const beat=Math.pow(Math.max(0,Math.sin(now/1400*Math.PI*2)),8);
    const gr=g.createRadialGradient(cx,cy,2,cx,cy,W/2);gr.addColorStop(0,st==='s'?'#FFC928':st==='l'?'#00FF85':'#FFC928');gr.addColorStop(1,'rgba(0,0,0,0)');
    g.globalAlpha=st==='r'?.35+.45*beat:.55;g.fillStyle=gr;g.beginPath();g.arc(cx,cy,W/2,0,Math.PI*2);g.fill();g.globalAlpha=1;
    if(st==='s'){const N=24;for(let i=0;i<N;i++){const a=i/N*Math.PI*2,h=6+12*Math.abs(Math.sin(now/140+i*1.7))*(.6+.4*Math.max(0,1-(now-(ESSI.pulse||0))/400));
      g.strokeStyle=['#FF3434','#FFC928','#00FF85'][i%3];g.lineWidth=2.4;g.beginPath();g.moveTo(cx+Math.cos(a)*14,cy+Math.sin(a)*14);g.lineTo(cx+Math.cos(a)*(14+h),cy+Math.sin(a)*(14+h));g.stroke()}}
    else if(st==='l'&&typeof td!=='undefined'&&td){g.strokeStyle='#00FF85';g.lineWidth=2;g.beginPath();for(let p=0;p<=60;p++){const a=p/60*Math.PI*2,v=td[Math.floor(p/60*1024)]||0,r=18+Math.max(-8,Math.min(8,v*40));const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;p?g.lineTo(x,y):g.moveTo(x,y)}g.closePath();g.stroke()}
    else{g.strokeStyle='#FFC928';g.globalAlpha=.6+.4*beat;g.lineWidth=2;g.beginPath();g.arc(cx,cy,14+4*beat,0,Math.PI*2);g.stroke();g.globalAlpha=1}
  });
  requestAnimationFrame(essiOrbs);
}
requestAnimationFrame(essiOrbs);
/* ================= "How to read it" guides ================= */
const G3=(w,r,u)=>({w,r,u});
const GUIDE={
 cents:{t:'Cents (¢)',w:'Cents measure how close your sound is to the exact center of a note. There are 100 cents between two neighboring piano keys, so 1 or 2 cents is a tiny difference.',r:'Think of tuning a radio: 0¢ is right on the station. A plus number means your sound is a little higher than the note, a minus number a little lower. Centered = 0 to 5¢, a little high/low = 5 to 15¢, noticeably = 15 to 30¢, quite = 30 to 50¢.',u:'You do not have to be perfect: expressive music moves around. Use cents to notice a note you always play high or low.'},
 tuner:{t:'Zion Tuner',w:'Shows the note you are making and how your sound is vibrating right now.',r:'The big letter is the note (its color is its body station). Under it: Centered, a little high or a little low. The glowing flower is your real sound; the light on the arc slides left when low and right when high, green in the middle.',u:'Hold one comfortable note for 3 to 4 seconds and watch the whole instrument respond.'},
 trail:{t:'Pitch trail',w:'Draws the path your notes travel over the last few seconds.',r:'Rising lines mean higher sounds, falling lines lower sounds, flat lines steady notes, waves vibrato. Colored lines are the 7 station notes.',u:'Play slowly between notes to see how your sound moves from one to the next.'},
 ladder:{t:'Harmonic ladder',w:'Shows the extra tones hiding inside your note that give it its unique character.',r:'Each bar is one of those tones; taller bars are stronger. Many tall bars = a rich, full sound; one tall bar = a pure, simple sound.',u:'Play the same note on flute, voice and bowl and compare their ladders.'},
 bands:{t:'Rhythm and brainwave bands',w:'Compares how fast your note wobbles (vibrato) with the speed ranges named for brainwaves.',r:'The lit band is where your wobble speed falls. It is a number comparison only: the phone measures your sound, not your brain.',u:'Try a slow, even vibrato and watch which range it lands in.'},
 stations:{t:'Seven stations · body match',w:'The meditating figure shows the 7 stations and where each sits in the body.',r:'The station your note matches lights up. Right side: the stations; left side: the glands and nerve centers in that area.',u:'Tap any point to read its body area, theme, affirmation and breath cue.'},
 teacher:{t:'Teacher · listen, then match',w:'A call-and-response lesson: the app plays a note, then you match it.',r:'The tuner shows how close your answer is; centered means you matched it.',u:'Listen fully first, hum it quietly, then play or sing it back.'},
 sound:{t:'Sand plate',w:'A digital picture inspired by cymatics, the patterns sand makes on a vibrating plate.',r:'Different notes and tones change the pattern. It is a simulation of your sound, not a real sand experiment.',u:'Hold different notes and compare their shapes for fun and focus.'},
 wave:{t:'Waveform',w:'The movement of the sound your microphone hears.',r:'Bigger waves mean stronger sound, smaller waves quieter sound; smooth waves are pure tones, jagged waves are rich tones.',u:'Play softly, then strongly, from the same distance to the phone.'},
 spectrum:{t:'Spectrum',w:'Splits your sound into all the tones inside it.',r:'Low tones on the left, high tones on the right; taller peaks are stronger tones.',u:'Compare flute, voice and bowl to see what makes each one sound different.'},
 healing:{t:'Healing Map',w:'Shows where your music has traveled through the 7 body stations, and what that means.',r:'Longer bars = more time spent on that station’s notes. The card explains the station most explored in 3 layers: tradition, research, and what was measured.',u:'Visit stations you have not reached, or stay on one on purpose; close with a long, soft Root tone.'},
 coach:{t:'ESSI live coach',w:'ESSI listens to each note you hold and tells you what it connects to in the body and what she measured.',r:'She speaks in this order: body station, what she measured, a breath cue, then tuning (last).',u:'Hold each note at least one second; tap ▶ to hear her read it.'},
 journal:{t:'Coach Journal',w:'Keeps every finding so nothing is lost.',r:'Repeats are grouped and counted, so habits show up. Green is going well, gold is close, red needs attention.',u:'Play the same note several times; tap Save PNG to keep a picture report.'},
 study:{t:'Study My Play',w:'Records your whole playing for a set time, then studies all of it at once.',r:'It starts with your sound journey through the body, then your musical details.',u:'Pick 1 to 3 minutes and play the way you normally do.'},
 pj:{t:'Pitch journey',w:'Your pitch over the whole session.',r:'Above the middle line = higher than the note, below = lower; the green band is centered.',u:'Look for the same note going off again and again, not one wobble.'},
 mf:{t:'Melodic fingerprint',w:'Which notes you played the most.',r:'Taller bars = more time on that note; colors are the body stations.',u:'Play full phrases so the app can find your key.'},
 nam:{t:'Note accuracy map',w:'Which notes you tend to play high or low.',r:'Bars to the left = low, to the right = high, small bars in the green = centered.',u:'Practice a repeated note gently if you want it more centered.'},
 el:{t:'Expression landscape',w:'How your loudness changes and where your phrases and rests are.',r:'The line goes up when louder; shaded areas are phrases, gaps are rests.',u:'Explore the contrast between soft sounds, long tones and silence.'},
 con:{t:'Consistency',w:'Compares the beginning, middle and end of your session.',r:'Each bar is the share of time your notes were centered in that part.',u:'Repeat similar sounds through the session so the comparison is fair.'},
 flow:{t:'Flow',w:'The movement of your melody.',r:'Steps are small moves between neighboring notes, leaps are big jumps, repeats are the same note again.',u:'Free playing is welcome; timing is only judged against a beat if one is found.'},
 growth:{t:'My growth',w:'Your progress across days.',r:'Each dot is one saved study; the line rising means more of your notes are centered.',u:'Study at least a few times a week on the same instrument.'},
 body:{t:'Body Map',w:'An interactive body with the 7 stations and what each connects to.',r:'Tap an area to see its station, body point, theme, balanced and imbalanced signs, breath cue, stones and herbs.',u:'Use Show client to walk someone through where you will focus their session.'},
 chart:{t:'Chakra chart',w:'Everything for the 7 stations in one place: notes, colors, elements, body areas.',r:'Each color and note is one station in this spiritual framework (a tradition, not a medical test).',u:'Pick a station to explore its affirmation, breath cue and teaching.'},
 tuning:{t:'Frequency Lab',w:'Choose the reference pitch, an instrument tuning, or a healing frequency to attune to.',r:'A4 is the master reference (440 is the modern standard). Instrument tunings show each string or note as a button; ✓ means in tune and NEXT shows where to go. Attune mode measures you against an exact frequency like 528 Hz.',u:'Pick your instrument tuning, then tune the string marked NEXT until it turns green; tap a button to lock it and hear its tone.'},
 session:{t:'Session mode',w:'A guided journey through the 7 stations for you or a client.',r:'Each step shows the sound, the body point, the mudra and the affirmation.',u:'Ask your client how they feel before and after; their words are the best measure.'}
};
function guideOpen(k){const g=GUIDE[k];if(!g)return;let s=$('guideSheet');
  if(!s){s=document.createElement('div');s.id='guideSheet';s.className='guide-sheet';document.body.appendChild(s);s.addEventListener('click',e=>{if(e.target===s)guideClose()})}
  const L=g.L||['WHAT IT IS','HOW TO READ IT','HOW TO USE IT'];const body=`<div class="g3"><span class="hm-k">${L[0]}</span>${g.w}</div><div class="g3"><span class="hm-k">${L[1]}</span>${g.r}</div><div class="g3"><span class="hm-k">${L[2]}</span>${g.u}</div>`;
  s.innerHTML=`<div class="guide-card"><div class="guide-top"><b>ESSI · YOUR SOUND GUIDE · ${g.t.toUpperCase()}</b><button class="s" onclick="guideClose()">✕</button></div>${essiBubble(body,{tag:g.L?'frequency wisdom':'how to read it'})}</div>`;
  s.classList.add('on')}
function guideClose(){const s=$('guideSheet');if(s)s.classList.remove('on');if(ESSI.speaking)speechSynthesis.cancel()}
function essiVoiceList(){const sel=$('essiVoiceSel');if(!sel||!window.speechSynthesis)return;const vs=speechSynthesis.getVoices().filter(v=>/^en/i.test(v.lang));
  ESSI.voice=ESSI.voice||essiPickVoice();sel.innerHTML=vs.map(v=>`<option ${ESSI.voice&&v.name===ESSI.voice.name?'selected':''}>${v.name}</option>`).join('')||'<option>Phone default</option>';
  sel.onchange=()=>{ESSI.voice=vs.find(v=>v.name===sel.value)||null;store('rl_essi_voice',sel.value);essiSpeak('Hello. I am ESSI. I will read your sound to you.')}}
{const r=+store('rl_essi_rate');if(r)ESSI.rate=r}
function guideBtn(k){return `<button class="guide-i" onclick="guideOpen('${k}')" aria-label="How to read it">?</button>`}
/* place the guide buttons */
(function(){const put=(el,k)=>{if(!el)return;el.style.position=el.style.position||'relative';el.insertAdjacentHTML('beforeend',guideBtn(k))};
  put($('dialwrap'),'tuner');put($('coach')&&$('coach').querySelector('.coach-h'),'coach');put($('cjPanel')&&$('cjPanel').querySelector('.coach-h'),'journal');
  put($('study')&&$('study').querySelector('.coach-h'),'study');put($('hmPanel')&&$('hmPanel').querySelector('.coach-h'),'healing');
  document.querySelectorAll('h2').forEach(h=>{const t=h.textContent;const k=/Pitch trail/.test(t)?'trail':/brainwave/.test(t)?'bands':/sand plate/.test(t)?'sound':/Body map/.test(t)?'body':/Harmonic ladder/.test(t)?'ladder':/Seven stations/.test(t)?'stations':/^Teacher/.test(t)?'teacher':/^Waveform/.test(t)?'wave':/^Spectrum/.test(t)?'spectrum':/Chakra chart/.test(t)?'chart':null;if(k){h.style.display='flex';h.style.alignItems='center';h.style.gap='8px';h.insertAdjacentHTML('beforeend',guideBtn(k))}});
  const so=$('sessOpen');if(so)so.insertAdjacentHTML('afterend',guideBtn('session'));})();
essiState();

$('hmReset').onclick=hmReset;hmRender();
const ladT=()=>{const h=$('ladderTitle');if(h&&h.firstChild)h.firstChild.textContent=inst==='bowl'?'Resonance layers':'Harmonic ladder'};ladT();$('inst').addEventListener('change',()=>setTimeout(ladT,0));
(function(){try{
  const coach=$('coach'),bub=coach.querySelector('.essi-bubble'),hm=$('hmPanel');
  const figPanel=$('fig')&&$('fig').closest('.panel');
  if(bub&&figPanel){bub.after(figPanel);figPanel.style.margin='10px 0 0'}
  if(figPanel&&hm){figPanel.after(hm);hm.style.marginTop='10px'}
  const lvl=$('coachStats');if(lvl){const d=document.createElement('details');d.className='tech';d.innerHTML='<summary>Musical details (tuning numbers)</summary>';lvl.before(d);d.appendChild(lvl)}
}catch(e){console.warn(e)}})();

Object.assign(window,{essiSpeak,guideOpen,guideClose});

/* ================= FREQUENCY LAB: master reference · instrument tunings · attune to a frequency ================= */
const NN=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function noteToMidi(t){const m=String(t).trim().match(/^([A-Ga-g])([#b♯♭]?)(-?\d)$/);if(!m)return null;let pc={c:0,d:2,e:4,f:5,g:7,a:9,b:11}[m[1].toLowerCase()];if(m[2]==='#'||m[2]==='♯')pc++;if(m[2]==='b'||m[2]==='♭')pc--;return (+m[3]+1)*12+pc}
const PRESETS={
 chromatic:{g:'Any note',name:'Chromatic (any note)',notes:null},
 g_std:{g:'Guitar',name:'Guitar · Standard',notes:'E2 A2 D3 G3 B3 E4'},
 g_dropd:{g:'Guitar',name:'Guitar · Drop D',notes:'D2 A2 D3 G3 B3 E4'},
 g_half:{g:'Guitar',name:'Guitar · Half-step down',notes:'D#2 G#2 C#3 F#3 A#3 D#4'},
 g_opend:{g:'Guitar',name:'Guitar · Open D',notes:'D2 A2 D3 F#3 A3 D4'},
 g_openg:{g:'Guitar',name:'Guitar · Open G',notes:'D2 G2 D3 G3 B3 D4'},
 g_openc:{g:'Guitar',name:'Guitar · Open C',notes:'C2 G2 C3 G3 C4 E4'},
 g_opene:{g:'Guitar',name:'Guitar · Open E',notes:'E2 B2 E3 G#3 B3 E4'},
 g_dadgad:{g:'Guitar',name:'Guitar · DADGAD',notes:'D2 A2 D3 G3 A3 D4'},
 b4:{g:'Bass',name:'Bass · 4-string',notes:'E1 A1 D2 G2'},
 b5:{g:'Bass',name:'Bass · 5-string',notes:'B0 E1 A1 D2 G2'},
 v_std:{g:'Violin family',name:'Violin · Standard',notes:'G3 D4 A4 E5'},
 v_crossa:{g:'Violin family',name:'Violin · Cross A (AEAE)',notes:'A3 E4 A4 E5'},
 v_crossg:{g:'Violin family',name:'Violin · Cross G (GDGD)',notes:'G3 D4 G4 D5'},
 v_highbass:{g:'Violin family',name:'Violin · High bass (ADAE)',notes:'A3 D4 A4 E5'},
 viola:{g:'Violin family',name:'Viola · Standard',notes:'C3 G3 D4 A4'},
 cello:{g:'Violin family',name:'Cello · Standard',notes:'C2 G2 D3 A3'},
 uke:{g:'Ukulele',name:'Ukulele · Standard (GCEA)',notes:'G4 C4 E4 A4'},
 nf_c:{g:'Native flute (minor pentatonic)',name:'Native flute · C',notes:'C4 D#4 F4 G4 A#4 C5'},
 nf_d:{g:'Native flute (minor pentatonic)',name:'Native flute · D',notes:'D4 F4 G4 A4 C5 D5'},
 nf_e:{g:'Native flute (minor pentatonic)',name:'Native flute · E',notes:'E4 G4 A4 B4 D5 E5'},
 nf_f:{g:'Native flute (minor pentatonic)',name:'Native flute · F',notes:'F4 G#4 A#4 C5 D#5 F5'},
 nf_fs:{g:'Native flute (minor pentatonic)',name:'Native flute · F#',notes:'F#4 A4 B4 C#5 E5 F#5'},
 nf_g:{g:'Native flute (minor pentatonic)',name:'Native flute · G',notes:'G4 A#4 C5 D5 F5 G5'},
 nf_a:{g:'Native flute (minor pentatonic)',name:'Native flute · A',notes:'A4 C5 D5 E5 G5 A5'},
 nf_b:{g:'Native flute (minor pentatonic)',name:'Native flute · B',notes:'B4 D5 E5 F#5 A5 B5'},
 custom:{g:'Custom',name:'Custom notes',notes:''}
};
const FREQS=[
 {hz:432,label:'A = 432 Hz',kind:'ref',theme:'Natural / “Verdi” tuning',o:'A reference used by some musicians and sound healers; Verdi asked for A≈432 in 1884, and historical orchestras tuned anywhere from about 415 to 450 Hz.',c:'Promoters say music tuned to 432 feels warmer, calmer and more in harmony with nature.',e:'One small study (Calamassi & Pomponi, 2019) found slightly lower heart rate when listeners heard 432-tuned music, but it was small and not repeated widely. There is no proof that 432 is healthier than 440. It is a valid choice of sound.'},
 {hz:444,label:'A = 444 Hz',kind:'ref',theme:'Puts C5 near 528 Hz',o:'Raising A to 444 Hz places C5 at about 528.01 Hz, so “528” can be played inside normal music.',c:'Used by people who want music centered on the 528 Hz “love” tone.',e:'It is a convenient way to use 528 Hz in songs; it does not prove instruments tuned this way heal more.'},
 {hz:440,label:'A = 440 Hz',kind:'ref',theme:'Modern concert standard',o:'Adopted internationally in 1939 and confirmed by ISO in 1955/1975; most instruments, apps and recordings use it.',c:'Some online claims call 440 “disharmonious”; these claims have no scientific support.',e:'440 is a shared standard so musicians can play together; no study shows harm from it.'},
 {hz:174,label:'174 Hz',kind:'f',theme:'Security · comfort',o:'Part of the expanded modern Solfeggio set (popularized from the 1970s–1990s, not an ancient chant scale).',c:'Promoted for grounding, safety and relief of pain.',e:'Pain relief from this exact tone is not established. Use it as an optional low grounding tone.'},
 {hz:285,label:'285 Hz',kind:'f',theme:'Restoration',o:'Expanded modern Solfeggio set.',c:'Promoted for renewal and restoring the body’s energy field.',e:'Claims of tissue or organ repair have not been shown. A symbolic focus for rest.'},
 {hz:396,label:'396 Hz',kind:'f',theme:'Release · courage',o:'One of the six core modern Solfeggio tones (from Joseph Puleo’s 1970s numerology, popularized in the 1990s).',c:'Said to release fear and guilt.',e:'No evidence this frequency removes emotions; it can support a reflection on letting go.'},
 {hz:417,label:'417 Hz',kind:'f',theme:'Change · transformation',o:'Core modern Solfeggio tone.',c:'Said to clear negative patterns and help change.',e:'Not established by research; a symbolic theme for change.'},
 {hz:528,label:'528 Hz',kind:'f',theme:'Love · “miracle” tone',o:'The best known Solfeggio tone, popularized by Dr. Leonard Horowitz and others.',c:'Claimed to repair DNA and bring love and harmony.',e:'DNA repair claims are not supported. A few small lab and animal studies reported lower stress markers with 528 Hz music, but they are early and not proof for people. Enjoy it as a calming tone.'},
 {hz:639,label:'639 Hz',kind:'f',theme:'Connection · relationships',o:'Core modern Solfeggio tone.',c:'Said to improve relationships and connection.',e:'Not established; a symbolic theme for connection.'},
 {hz:741,label:'741 Hz',kind:'f',theme:'Expression · clarity',o:'Core modern Solfeggio tone.',c:'Said to clean the body and awaken intuition.',e:'Detox claims are not supported. A symbolic theme for clear expression.'},
 {hz:852,label:'852 Hz',kind:'f',theme:'Intuition · inner vision',o:'Core modern Solfeggio tone.',c:'Said to return the mind to spiritual order.',e:'Not established; a symbolic theme for intuition.'},
 {hz:963,label:'963 Hz',kind:'f',theme:'Unity · crown',o:'Expanded modern Solfeggio set.',c:'Said to connect with higher consciousness.',e:'Not established; a symbolic theme for unity.'},
 {hz:136.1,label:'136.1 Hz · OM',kind:'f',theme:'OM · Earth year tone',o:'From Hans Cousto’s Cosmic Octave: the Earth’s yearly orbit frequency doubled 32 times until it can be heard. Near C#3.',c:'Used in sound meditation for grounding and connection; many Tibetan and gong practitioners tune to it.',e:'Small studies on OM chanting report calm effects, but none show a special benefit from exactly 136.1 Hz. OM itself has no required pitch.'},
 {hz:7.83,label:'7.83 Hz · Schumann',kind:'info',theme:'Earth’s electromagnetic resonance',o:'Schumann resonances are electromagnetic waves between the ground and the upper atmosphere, mostly excited by lightning; the lowest is about 7.83 Hz.',c:'Often called the “Earth’s heartbeat” and linked to grounding.',e:'It is not a sound: 7.83 Hz is far below human hearing (about 20 Hz) and cannot be played or tuned to. Its octaves (e.g. ≈ 125 Hz) are only a mathematical link, not the resonance itself.'}
];
const TM={mode:'chromatic',preset:'chromatic',strings:null,lock:null,target:null,octave:true,custom:''};
try{Object.assign(TM,JSON.parse(store('rl_tm')||'{}'))}catch(e){}
{const a=+store('rl_a4');if(a>=300&&a<=600)A4=a}
function tmSave(){store('rl_tm',JSON.stringify({mode:TM.mode,preset:TM.preset,target:TM.target,octave:TM.octave,custom:TM.custom}));store('rl_a4',A4)}
function tmStrings(){const p=PRESETS[TM.preset];if(!p||TM.mode!=='preset')return null;const src=TM.preset==='custom'?TM.custom:p.notes;return (src||'').split(/[\s,]+/).map(noteToMidi).filter(x=>x!==null)}
function setA4(v,quiet){A4=Math.round(Math.max(300,Math.min(600,v))*100)/100;const sel=$('tuning');if(sel){let o=[...sel.options].find(x=>+x.value===A4);if(!o){o=new Option('A = '+A4,A4);sel.add(o)}sel.value=A4}
  if(typeof JT!=='undefined')JT.habits=null;try{if(selected>=0)showCard(selected)}catch(e){}tmSave();tmLabel();if(!quiet)tmSheetVals()}
/* what the dial measures against */
function tmTarget(){
  if(!cur||!cur.f)return null;
  if(TM.mode==='freq'&&TM.target&&TM.target.hz>=20){const r=1200*Math.log2(cur.f/TM.target.hz);let k=0;if(TM.octave)k=Math.round(r/1200);const c=r-1200*k,t=TM.target.hz*Math.pow(2,k);
    return {c,key:'F'+k,name:TM.target.label.split(' ·')[0].replace(' Hz','')+(k?` ×${Math.pow(2,k)}`:''),tgtHz:t,mode:'ATTUNE · '+(Math.round(t*100)/100)+' Hz'+(k?' (octave of '+TM.target.hz+')':'')}}
  const S=tmStrings();if(S&&S.length){let best=TM.lock!==null&&S[TM.lock]!==undefined?TM.lock:0;if(TM.lock===null){let bd=1e9;S.forEach((m,i)=>{const dd=Math.abs(cur.midi-m);if(dd<bd){bd=dd;best=i}})}
    const m=S[best],c=(cur.midi-m)*100;const nm=NN[((m%12)+12)%12]+(Math.floor(m/12)-1);
    return {c,key:'S'+best,name:nm,tgtHz:noteHz(m),str:best,mode:`${PRESETS[TM.preset].name.toUpperCase()} · ${TM.preset.startsWith('nf_')?'NOTE':'STRING'} ${TM.preset.startsWith('nf_')||TM.preset==='uke'||TM.preset.startsWith('v')||TM.preset==='viola'||TM.preset==='cello'?best+1:S.length-best}${TM.lock!==null?' · LOCKED':''}`}}
  const r=Math.round(cur.midi);return {c:(cur.midi-r)*100,key:cur.name,name:cur.name,tgtHz:noteHz(r),mode:''};
}
function tmLabel(){const b=$('tuneBtn');if(!b)return;const p=PRESETS[TM.preset];b.innerHTML=`🎚 A ${A4.toFixed(A4%1?2:1)} · ${TM.mode==='freq'&&TM.target?'Attune '+TM.target.label:p?p.name:'Chromatic'}`;tmChips()}
/* string / target chips under the dial */
function tmChips(){const box=$('tmChips');if(!box)return;
  if(TM.mode==='freq'&&TM.target){box.innerHTML=`<button class="tm-chip on" onclick="tmPlay(${TM.target.hz})"><b>${TM.target.label}</b><small>▶ hear target</small></button><button class="tm-chip" onclick="tmOct()"><b>${TM.octave?'Octave match':'Exact match'}</b><small>tap to switch</small></button><button class="tm-chip" onclick="tmMode('chromatic')"><b>✕</b><small>leave</small></button>`;return}
  const S=tmStrings();if(!S){box.innerHTML='';return}
  box.innerHTML=S.map((m,i)=>{const nm=NN[((m%12)+12)%12]+(Math.floor(m/12)-1),n=TM.preset.startsWith('nf_')||TM.preset==='uke'||/^(v_|viola|cello)/.test(TM.preset)?i+1:S.length-i;return `<button class="tm-chip" data-s="${i}" onclick="tmLock(${i})"><b>${nm}</b><small>${n} · ${noteHz(m).toFixed(1)}</small></button>`}).join('');
}
function tmLock(i){TM.lock=TM.lock===i?null:i;const S=tmStrings();if(S&&TM.lock!==null)tmPlay(noteHz(S[i]));tmChipsState()}
function tmChipsState(){document.querySelectorAll('#tmChips [data-s]').forEach(b=>{const i=+b.dataset.s;b.classList.toggle('lock',TM.lock===i);b.classList.toggle('on',JT.has&&JT.str===i);b.classList.toggle('ok',JT.has&&JT.str===i&&Math.abs(JT.c)<=5)})}
function tmPlay(hz){try{sound(hz)}catch(e){}}
function tmOct(){TM.octave=!TM.octave;tmSave();tmChips()}
function tmMode(m,arg){TM.mode=m;TM.lock=null;if(m==='preset'){TM.preset=arg;const want=/^(g_|b4|b5|v_|viola|cello|uke)/.test(arg)?'guitar':/^nf_/.test(arg)?'flute':null;const sel=$('inst');if(want&&sel&&sel.value!==want){sel.value=want;sel.dispatchEvent(new Event('change'))}}if(m==='chromatic')TM.preset='chromatic';if(m==='freq')TM.target=arg;tmSave();tmLabel();if(typeof JT!=='undefined'){JT.has=0;JT.hist.length=0}}
/* the Frequency Lab sheet */
function tmOpen(){let s=$('tmSheet');if(!s){s=document.createElement('div');s.id='tmSheet';s.className='guide-sheet';document.body.appendChild(s);s.addEventListener('click',e=>{if(e.target===s)s.classList.remove('on')})}
  const groups={};Object.entries(PRESETS).forEach(([k,p])=>{(groups[p.g]=groups[p.g]||[]).push(`<option value="${k}" ${TM.mode!=='freq'&&TM.preset===k?'selected':''}>${p.name}</option>`)});
  s.innerHTML=`<div class="guide-card tm-card"><div class="guide-top"><b>FREQUENCY LAB</b><button class="s" onclick="document.getElementById('tmSheet').classList.remove('on')">✕</button></div>
  <div class="hm-k">MASTER REFERENCE (A4)</div>
  <div class="tm-ref"><button class="s" onclick="setA4(A4-1)">−1</button><button class="s" onclick="setA4(A4-.1)">−0.1</button><input id="tmA4" type="number" step="0.01" min="300" max="600" value="${A4}"><button class="s" onclick="setA4(A4+.1)">+0.1</button><button class="s" onclick="setA4(A4+1)">+1</button></div>
  <input id="tmSlide" type="range" min="400" max="480" step="0.1" value="${Math.max(400,Math.min(480,A4))}" style="width:100%">
  <div class="tm-quick">${[415,432,435,440,442,443,444].map(v=>`<button class="s" onclick="setA4(${v})">${v}</button>`).join('')}</div>
  <div class="note" id="tmInfo"></div>
  <label style="display:flex;gap:8px;align-items:center;margin-top:10px;font-size:14px"><input type="checkbox" id="tmConf" ${CONF.on?'checked':''} onchange="CONF.on=this.checked;store('rl_confirm',this.checked?1:0)"> In-tune chime &amp; vibration</label>
  <div class="hm-k" style="margin-top:14px">INSTRUMENT TUNING</div>
  <select id="tmPreset" style="width:100%;padding:8px">${Object.entries(groups).map(([g,o])=>`<optgroup label="${g}">${o.join('')}</optgroup>`).join('')}</select>
  <input id="tmCustom" placeholder="Custom notes, e.g. D2 A2 D3 G3 A3 D4" value="${TM.custom||''}" style="width:100%;margin-top:6px;padding:8px;display:${TM.preset==='custom'?'block':'none'}">
  <div class="hm-k" style="margin-top:14px">ATTUNE TO A HEALING FREQUENCY</div>
  <div class="note" style="margin:-2px 0 6px">Exact frequencies stay fixed when you move the reference. Tap ? for where each comes from and what research shows.</div>
  <div class="tm-freqs">${FREQS.map((f,i)=>`<div class="tm-f"><div><b>${f.label}</b><small>${f.theme}</small></div>${f.kind==='info'?'<span class="note">not audible</span>':f.kind==='ref'?`<button class="s" onclick="setA4(${f.hz});tmMode('chromatic')">Set A</button>`:`<button class="s" onclick="tmPlay(${f.hz})">▶</button><button class="b" onclick="tmMode('freq',FREQS[${i}]);document.getElementById('tmSheet').classList.remove('on')">Attune</button>`}<button class="guide-i" onclick="tmWhy(${i})">?</button></div>`).join('')}
   <div class="tm-f"><div><b>Custom Hz</b><small>any target 20–5000 Hz</small></div><input id="tmHz" type="number" step="0.01" min="20" max="5000" placeholder="e.g. 528" style="width:90px;padding:6px"><button class="b" onclick="const v=+document.getElementById('tmHz').value;if(v>=20&&v<=5000){tmMode('freq',{hz:v,label:v+' Hz',theme:'custom'});document.getElementById('tmSheet').classList.remove('on')}">Attune</button></div></div>
  <p class="note" style="margin-top:10px">Stations stay note-based: each note keeps its body station at any reference. Healing frequencies are traditions and sound explorations, not medical treatment.</p></div>`;
  s.classList.add('on');tmSheetVals();
  $('tmSlide').oninput=e=>setA4(+e.target.value,true);$('tmSlide').onchange=()=>tmSheetVals();$('tmA4').onchange=e=>setA4(+e.target.value);
  $('tmPreset').onchange=e=>{const k=e.target.value;$('tmCustom').style.display=k==='custom'?'block':'none';tmMode(k==='chromatic'?'chromatic':'preset',k)};
  $('tmCustom').oninput=e=>{TM.custom=e.target.value;tmSave();tmChips()};
}
function tmSheetVals(){const i=$('tmA4');if(!i)return;i.value=A4;$('tmSlide').value=Math.max(400,Math.min(480,A4));const sh=1200*Math.log2(A4/440);
  $('tmInfo').innerHTML=`Shift from A440: <b>${sh>=0?'+':''}${sh.toFixed(2)}¢</b> · C5 = <b>${(A4*Math.pow(2,3/12)).toFixed(2)} Hz</b> · C4 = ${(A4*Math.pow(2,-9/12)).toFixed(2)} Hz`}
function tmWhy(i){const f=FREQS[i];GUIDE['freq'+i]={t:f.label,L:['ORIGIN','WHAT THE TRADITION CLAIMS','WHAT RESEARCH SHOWS'],w:f.o,r:f.c,u:f.e};guideOpen('freq'+i)}
Object.assign(window,{CONF,store,setA4,tmMode,tmOpen,tmLock,tmPlay,tmOct,tmWhy,FREQS});
/* ---- guided path: which note to go to next ---- */
const TG={done:{},since:{},key:''};
function tgKey(){return TM.mode+'|'+TM.preset+'|'+A4+'|'+(TM.custom||'')}
function tgTick(now){
  if(TG.key!==tgKey()){TG.key=tgKey();TG.done={};TG.since={}}
  const box=$('tmChips');if(!box)return;
  const S=tmStrings();
  if(S&&S.length){ if(JT.lock&&JT.str!==undefined)TG.done[JT.str]=true; if(JT.has&&JT.str!==undefined&&Math.abs(JT.c)<=5){const k=JT.str;TG.since[k]=TG.since[k]||now;if(now-TG.since[k]>900)TG.done[k]=true}else if(JT.has&&JT.str!==undefined)TG.since[JT.str]=0;
    let next=-1;for(let i=0;i<S.length;i++)if(!TG.done[i]){next=i;break}
    box.querySelectorAll('[data-s]').forEach(b=>{const i=+b.dataset.s;b.classList.toggle('done',!!TG.done[i]);b.classList.toggle('next',i===next&&!(JT.has&&JT.str===i))});
    const g=$('tmGuide');if(g){const all=S.length,n=Object.keys(TG.done).length;
      if(next<0)g.innerHTML=`<b style="color:#00FF85">✓ All ${all} in tune.</b> Play a chord to hear it ring.`;
      else{const m=S[next],nm=NN[((m%12)+12)%12]+(Math.floor(m/12)-1);const here=JT.has&&JT.str===next;
        g.innerHTML=`${n}/${all} in tune · <b>${here?'Tuning':'Next'}: ${nm}</b> (${noteHz(m).toFixed(1)} Hz)${here?(Math.abs(JT.c)<=5?' · hold it…':JT.c>0?' · a little high, ease down':' · a little low, bring up'):' · play this one'}`}}
    tmChipsState();return}
  if(TM.mode==='freq'&&TM.target){const g=$('tmGuide');if(g){const t=JT.tgtHz||TM.target.hz;g.innerHTML=JT.has?(Math.abs(JT.c)<=5?`<b style="color:#00FF85">✓ Attuned to ${t.toFixed(2)} Hz.</b> Hold it and notice where you feel it.`:`${JT.c>0?'A little high: ease down':'A little low: bring it up'} toward <b>${t.toFixed(2)} Hz</b> (${Math.round(Math.abs(JT.c))}¢ away)`):`Play or sing toward <b>${TM.target.label}</b>${TM.octave?' (any octave counts)':''}. Tap ▶ to hear it first.`}return}
  if(TM.mode==='chromatic'){ // station path for the healing journey
    const tot=typeof HM!=='undefined'?HM.t:null;if(!tot)return;
    if(box.dataset.k!=='st'){box.dataset.k='st';box.innerHTML=ST.map((s,i)=>`<button class="tm-chip" data-st="${i}" onclick="tmPlay(${'noteHz(60+'+s.pc+')'})"><b style="color:${s.col}">${s.n}</b><small>${s.name}</small></button>`).join('').replace(/tmPlay\(noteHz\(60\+(\d+)\)\)/g,(m,p)=>`tmPlayNote(${p})`)}
    let next=-1;for(let i=0;i<7;i++)if(tot[i]<1){next=i;break}
    const curSt=JT.has&&JT.pc!==null?stationOfPc(JT.pc):-1;
    box.querySelectorAll('[data-st]').forEach(b=>{const i=+b.dataset.st;b.classList.toggle('done',tot[i]>=1);b.classList.toggle('on',i===curSt);b.classList.toggle('next',i===next&&i!==curSt)});
    const g=$('tmGuide');if(g){const n=tot.filter(x=>x>=1).length;g.innerHTML=next<0?`<b style="color:#00FF85">✓ All 7 stations reached.</b> Close with a long, soft C (Root).`:`${n}/7 stations reached · <b>Next: ${ST[next].n} · ${ST[next].name}</b> (${noteHz(60+ST[next].pc).toFixed(1)} Hz) · “${ST[next].aff}” · tap a note to hear it`}
  }else if(box.dataset.k==='st'){box.dataset.k=''}
}
function tmPlayNote(pc){tmPlay(noteHz(60+pc))}
window.tmPlayNote=tmPlayNote;

tmLabel();setA4(A4,true);
$('tmPower').onclick=()=>{running?stop():start()};

/* ================= SYSTEM DOCK: every machine has its own power, minimize and ? ================= */
const SYSDEF=[
 {id:'tuner',label:'Zion Tuner',icon:'🎯',g:'Sound',help:'tuner',needsMic:true},
 {id:'coach',label:'ESSI Live Coach',icon:'🧠',g:'Teaching',help:'coach',dep:'tuner'},
 {id:'body',label:'Seven Stations Body',icon:'🧘',g:'Healing',help:'stations',dep:'tuner'},
 {id:'healing',label:'Healing Map',icon:'🌈',g:'Healing',help:'healing',dep:'tuner'},
 {id:'journal',label:'Coach Journal',icon:'📓',g:'Teaching',help:'journal'},
 {id:'study',label:'Study My Play',icon:'🔬',g:'Teaching',help:'study',dep:'tuner'},
 {id:'trail',label:'Pitch Trail',icon:'〰️',g:'Sound',help:'trail',dep:'tuner'},
 {id:'ladder',label:'Harmonic Ladder',icon:'📶',g:'Sound',help:'ladder',dep:'tuner'},
 {id:'bands',label:'Rhythm / Bands',icon:'🌀',g:'Sound',help:'bands',dep:'tuner'},
 {id:'teacher',label:'Teacher · Match',icon:'🎓',g:'Teaching',help:'teacher'},
 {id:'plate',label:'Sand Plate',icon:'🏖️',g:'Visual',help:'sound',tab:'v-sound'},
 {id:'scope',label:'Waveform & Spectrum',icon:'📈',g:'Visual',help:'wave',tab:'v-sound'},
 {id:'drone',label:'Meditation Sound',icon:'🎵',g:'Sound',help:null,audio:true}
];
const SYS={};const SYSEL={};
(function(){let saved={};try{saved=JSON.parse(store('rl_sys')||'{}')}catch(e){}
  SYSDEF.forEach(d=>{SYS[d.id]=saved[d.id]||{on:false,min:false}});
  SYS.tuner={on:true,min:false}; // the Zion Tuner is the heart of the app: always shown when the app opens (its mic stays off until you press power)
})();
function sysSave(){const o={};SYSDEF.forEach(d=>o[d.id]=SYS[d.id]);store('rl_sys',JSON.stringify(o))}
const sysRun=id=>SYS[id]&&SYS[id].on;              // processing allowed
const sysShow=id=>SYS[id]&&SYS[id].on&&!SYS[id].min; // drawing allowed
window.sysRun=sysRun;window.sysShow=sysShow;
function sysFind(){
  const P=h=>{const x=[...document.querySelectorAll('h2')].find(e=>h.test(e.textContent));return x?x.closest('.panel'):null};
  // gather the tuner's own pieces into one card so it can be hidden on its own
  let tw=$('sysTuner');if(!tw){const dial=$('dialwrap');tw=document.createElement('div');tw.id='sysTuner';dial.parentNode.insertBefore(tw,dial);
    let n=dial;const stop=$('coach');while(n&&n!==stop){const nx=n.nextSibling;tw.appendChild(n);n=nx}}
  // pull body figure + healing map out of the coach so each is its own machine
  const coach=$('coach'),fig=$('fig')&&$('fig').closest('.panel'),hm=$('hmPanel');
  if(coach&&fig&&coach.contains(fig))coach.after(fig);if(fig&&hm&&coach&&coach.contains(hm))fig.after(hm);
  Object.keys(SYSEL).forEach(k=>delete SYSEL[k]);Object.assign(SYSEL,{tuner:tw,coach,body:fig,healing:hm,journal:$('cjPanel'),study:$('study'),trail:$('trail')&&$('trail').closest('.panel'),ladder:P(/Harmonic ladder|Resonance layers/),bands:$('bands')&&$('bands').closest('.panel'),teacher:P(/^Teacher/),plate:P(/sand plate/i),scope:$('wave')&&$('wave').closest('.panel')});
  const sp=$('spectrum')&&$('spectrum').closest('.panel');if(sp)SYSEL.scope2=sp;
}
function sysNeedsMic(d){return d&&(d.needsMic||d.dep==='tuner'||['plate','scope','teacher'].includes(d.id))}
window.sysNeedsMic=sysNeedsMic;
function sysMicStrip(id){const d=SYSDEF.find(x=>x.id===id),el=SYSEL[id];if(!el||!sysNeedsMic(d)||id==='tuner'||el.querySelector(':scope>.sys-micoff'))return;
  const m=document.createElement('div');m.className='sys-micoff';m.innerHTML='🎙 <span>Mic is off, so this has nothing to show yet.</span><button class="b" onclick="start()">Start listening</button>';
  const bar=el.querySelector(':scope>.sys-bar');if(bar)bar.after(m);else el.prepend(m)}
function sysHeader(id){const d=SYSDEF.find(x=>x.id===id),el=SYSEL[id];if(!el||el.querySelector(':scope>.sys-bar'))return;
  const bar=document.createElement('div');bar.className='sys-bar';
  bar.innerHTML=`<span class="sys-name">${d.icon} ${d.label}</span><span class="sys-state" data-st="${id}"></span><span style="flex:1"></span>${d.help?`<button class="guide-i" onclick="guideOpen('${d.help}')" aria-label="How to read it">?</button>`:''}<button class="sys-btn lv-xbtn" data-x="${id}" onclick="lvExpand('${id}')" title="Expand to both sides">⤢</button><button class="sys-btn" onclick="sysMin('${id}')" title="Minimize">–</button><button class="sys-btn pw" onclick="sysPower('${id}')" title="Turn off">⏻</button>`;
  el.prepend(bar);
}
function sysApply(){
  SYSDEF.forEach(d=>{const s=SYS[d.id];const els=[SYSEL[d.id]];if(d.id==='scope')els.push(SYSEL.scope2);
    els.forEach(el=>{if(el)el.classList.toggle('sys-hidden',!(s.on&&!s.min))});
    const st=document.querySelector(`[data-st="${d.id}"]`);if(st)st.textContent=d.id==='tuner'?(running?'● LISTENING':'○ MIC OFF'):(s.on?'● ON':'')});
  // the drone follows its switch
  if(typeof med!=='undefined'){if(SYS.drone.on&&!med&&!running){try{medStart()}catch(e){}}else if(!SYS.drone.on&&med){try{medStop()}catch(e){}}}
  dockRender();sysSave();if(typeof LV!=='undefined')lvSoon();
}
function sysPower(id,force){const s=SYS[id],d=SYSDEF.find(x=>x.id===id);const on=force!==undefined?force:!s.on;s.on=on;if(on)s.min=false;if(on&&force===undefined)wakeVoice();
  if(on&&d.dep&&!SYS[d.dep].on){SYS[d.dep].on=true;SYS[d.dep].min=false}
  if(on&&force===undefined&&sysNeedsMic(d)&&!running&&inst!=='midi'){try{start()}catch(e){}}
  if(id==='tuner'&&!on){SYSDEF.filter(x=>x.dep==='tuner').forEach(x=>{if(x.id!=='study'||!SM.on)SYS[x.id].on=false});if(running)stop()}
  if(id==='study'&&!on&&SM.on)smFinish();
  if(on&&d.tab){const b=document.querySelector(`[data-v="${d.tab.replace('v-','')}"]`);if(b&&!$(d.tab).classList.contains('on'))b.click()}
  sysApply();if(on&&SYSEL[id]&&!d.audio)setTimeout(()=>sysFocus(id),260)}
function sysMin(id){SYS[id].min=!SYS[id].min;sysApply()}
const WORKSPACES={
 tune:{label:'🎯 Tune only',sys:['tuner']},
 heal:{label:'🌈 Healing session',sys:['tuner','coach','body','healing','journal']},
 study:{label:'🔬 Practice study',sys:['tuner','coach','journal','study','trail']},
 lab:{label:'📈 Frequency lab',sys:['tuner','ladder','scope','plate']},
 off:{label:'⏻ All off',sys:[]}
};
function sysWorkspace(k){const W=WORKSPACES[k];if(k!=='off')wakeVoice();SYSDEF.forEach(d=>{if(d.id==='drone')return;SYS[d.id]={on:W.sys.includes(d.id),min:false}});if(k==='off'){if(running)stop();if(SM.on)smFinish()}sysApply();dockClose();window.scrollTo({top:0,behavior:'smooth'})}
function dockRender(){let dk=$('sysDock');if(!dk){dk=document.createElement('div');dk.id='sysDock';dk.className='sys-dock';document.body.appendChild(dk)}
  const chips=SYSDEF.filter(d=>SYS[d.id].on).map(d=>`<button class="dock-chip${SYS[d.id].min?' min':''}" onclick="sysGo('${d.id}')" title="${d.label}${SYS[d.id].min?' · minimized, tap to open':' · tap to go, tap again to minimize'}">${d.icon}<i></i></button>`).join('');
  dk.innerHTML=`<button class="dock-main" onclick="dockOpen()">⚙ Systems <b>${SYSDEF.filter(d=>SYS[d.id].on).length}</b></button><div class="dock-chips">${chips||'<span class="note">Nothing on · tap Systems</span>'}</div><button class="dock-mic${running?' on':''}" onclick="running?stop():start()" title="Microphone">🎙</button>`;
}
function dockOpen(){let s=$('dockSheet');if(!s){s=document.createElement('div');s.id='dockSheet';s.className='guide-sheet';document.body.appendChild(s);s.addEventListener('click',e=>{if(e.target===s)dockClose()})}
  const groups={};SYSDEF.forEach(d=>{(groups[d.g]=groups[d.g]||[]).push(d)});
  s.innerHTML=`<div class="guide-card"><div class="guide-top"><b>SYSTEM DOCK</b><button class="s" onclick="dockClose()">✕</button></div>
  <div class="note" style="margin-bottom:8px">Turn on only what you are using. Off systems do no work, so the phone stays fast. Turning a system off never deletes your journal or studies.</div>
  <div class="hm-k">WORKSPACES</div><div class="tm-quick">${Object.entries(WORKSPACES).map(([k,w])=>`<button class="s" onclick="sysWorkspace('${k}')">${w.label}</button>`).join('')}</div>
  ${Object.entries(groups).map(([g,ds])=>`<div class="hm-k" style="margin-top:12px">${g.toUpperCase()}</div>${ds.map(d=>`<div class="tm-f"><div><b>${d.icon} ${d.label}</b><small>${d.dep?'uses the tuner’s microphone':d.audio?'plays a sound':d.tab?'on the Sound shapes tab':'ready when you are'}${SYS[d.id].min?' · minimized':''}</small></div>${SYS[d.id].on&&!d.audio?`<button class="s" onclick="sysMin('${d.id}');dockOpen()">${SYS[d.id].min?'Show':'Minimize'}</button>`:''}<button class="sw${SYS[d.id].on?' on':''}" onclick="sysPower('${d.id}');dockOpen()" aria-label="Turn ${d.label} ${SYS[d.id].on?'off':'on'}"><i></i></button></div>`).join('')}`).join('')}</div>`;
  s.classList.add('on')}
function dockClose(){const s=$('dockSheet');if(s)s.classList.remove('on')}
Object.assign(window,{sysPower,sysMin,sysWorkspace,dockOpen,dockClose,SYSEL});
sysFind();SYSDEF.forEach(d=>{if(d.id!=='drone'){sysHeader(d.id);sysMicStrip(d.id)}});
{const co=SYSEL.coach;if(co){const nb=document.createElement('div');nb.className='nv-bar';const bar=co.querySelector(':scope>.sys-bar');if(bar)bar.after(nb);else co.prepend(nb)}nvUI();nvCheck();}
/* ===== Live layout: two balanced columns on the open Fold, one column on the cover screen =====
   Shortest-column masonry in a fixed priority order; the tuner is pinned top-left.
   Reflows only on power / minimize / restore / rotate / fold, never on live sound updates. */
var LV={order:['tuner','body','teacher','study','coach','station','healing','trail','ladder','bands','journal'],el:{},wide:null,t:0,BP:680};
(function lvInit(){
  const g=document.querySelector('#v-live .grid2');if(!g)return;const cols=[...g.children];LV.cols=cols;LV.grid=g;cols.forEach(c=>c.classList.add('lv-park'));
  const wrap=(id,nodes)=>{const w=document.createElement('div');w.className='panel lv-card';w.dataset.sys=id;nodes.filter(Boolean).forEach(n=>w.appendChild(n));return w};
  // tuner card carries its stats and caption with it
  const big=SYSEL.tuner&&SYSEL.tuner.closest('.panel');
  const minis=big&&big.querySelector(':scope>.minis'),cap=big&&big.querySelector(':scope>#caption'),mm=$('miniMon');
  LV.el.tuner=wrap('tuner',[mm,SYSEL.tuner,minis,cap]);
  ['coach','healing','journal','study'].forEach(k=>{const e=SYSEL[k];if(!e)return;LV.el[k]=e.classList.contains('panel')?e:wrap(k,[e])});
  ['body','teacher','trail','ladder','bands'].forEach(k=>{if(SYSEL[k])LV.el[k]=SYSEL[k]});
  const cb=$('cardBox');if(cb){LV.el.station=cb;cb.classList.add('lv-card');cb.dataset.sys='station'}
  // tuner wrapper replaces the old shared panel
  Object.values(LV.el).forEach(e=>e.classList.add('lv-card'));
  if(big&&big.parentNode){big.parentNode.insertBefore(LV.el.tuner,big);if(!big.children.length)big.remove();else big.classList.add('lv-left')}
  // systems now point at their whole card, so power/minimize hide the whole card
  ['tuner','coach','healing','journal','study'].forEach(k=>{if(LV.el[k])SYSEL[k]=LV.el[k]});
})();
function lvVisible(id){const e=LV.el[id];return e&&!e.classList.contains('sys-hidden')&&e.offsetParent!==null||(e&&id==='station')}
function lvLayout(){
  if(!LV.cols)return;const wide=innerWidth>=LV.BP;LV.wide=wide;
  const live=$('v-live').classList.contains('on');if(!live){LV.dirty=true;return}LV.dirty=false;
  // keep the reader's place: remember the first card on screen
  let anchor=null,anchorTop=0;for(const id of LV.order){const e=LV.el[id];if(!e||e.classList.contains('sys-hidden'))continue;const r=e.getBoundingClientRect();if(r.bottom>70){anchor=e;anchorTop=r.top;break}}
  const g=LV.grid;const park=LV.cols[0];
  // segmented masonry: half cards fill the shorter side; an expanded card spans both sides and starts a new segment
  const segs=[];let seg=null,h=[0,0],n=0;
  const newSeg=()=>{const sg=document.createElement('div');sg.className='lv-seg';const a=document.createElement('div'),b=document.createElement('div');a.className='lv-col';b.className='lv-col';sg.append(a,b);segs.push(sg);seg=sg;h=[0,0];n=0;return sg};
  const out=[];
  for(const id of LV.order){const e=LV.el[id];if(!e)continue;
    if(e.classList.contains('sys-hidden')){park.appendChild(e);continue}
    if(wide&&lvIsFull(id)){out.push(e);seg=null;continue}
    if(!seg){out.push(newSeg())}
    let c;if(!wide)c=0;else if(n===0)c=0;else if(n===1&&h[1]===0)c=1;else c=h[0]<=h[1]?0:1;
    seg.children[c].appendChild(e);h[c]+=e.offsetHeight+12;n++}
  [...g.querySelectorAll(':scope>.lv-seg,:scope>.lv-card')].forEach(x=>{if(!out.includes(x))x.remove()});
  out.forEach(x=>g.appendChild(x));g.appendChild(park);
  g.classList.toggle('lv-two',wide);document.documentElement.classList.toggle('lv-wide',wide);
  document.querySelectorAll('.lv-xbtn').forEach(b=>{const on=lvIsFull(b.dataset.x);b.textContent=on?'⤡':'⤢';b.title=on?'Back to half width':'Expand to both sides'});
  if(anchor){const d=anchor.getBoundingClientRect().top-anchorTop;if(Math.abs(d)>2)scrollBy(0,d)}
}
/* expand state, saved per system or panel */
LV.full=(()=>{try{return JSON.parse(store('rl_full')||'{}')}catch(e){return {}}})();
function lvIsFull(id){return !!LV.full[id]}
function lvExpand(id){LV.full[id]=!LV.full[id];store('rl_full',JSON.stringify(LV.full));
  const el=SYSEL[id]||LV.el[id]||document.querySelector(`[data-px="${id}"]`);
  if(el&&!(LV.el[id]))el.classList.toggle('lv-full',LV.full[id]);
  lvLayout();if(el)setTimeout(()=>sysFocus2(el),60)}
function sysFocus2(el){const y=el.getBoundingClientRect().top+scrollY-62;scrollTo({top:Math.max(0,y),behavior:'smooth'})}
window.lvExpand=lvExpand;
function g2Mode(w){const g=document.querySelector('#v-live .grid2');if(g)g.classList.toggle('lv-two',w)}
function lvSoon(){clearTimeout(LV.t);LV.t=setTimeout(lvLayout,200)}
window.lvLayout=lvLayout;
addEventListener('resize',lvSoon);
document.querySelectorAll('nav button[data-v]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.v==='live')setTimeout(lvLayout,30)}));
/* dock chip: off → power on + go; minimized → restore + go; open but away → go; open and on screen → minimize */
function lvOnScreen(el){const r=el.getBoundingClientRect();const top=Math.max(r.top,60),bot=Math.min(r.bottom,innerHeight-70);return bot-top>=60}
function sysGo(id){const d=SYSDEF.find(x=>x.id===id);if(!d)return;const s=SYS[id];
  if(d.audio){sysPower(id);return}
  if(!s.on){sysPower(id);setTimeout(()=>sysFocus(id),260);return}
  if(s.min){s.min=false;sysApply();setTimeout(()=>sysFocus(id),260);return}
  const el=SYSEL[id];if(!el)return;
  if(d.tab&&!$(d.tab).classList.contains('on')){const b=document.querySelector(`[data-v="${d.tab.replace('v-','')}"]`);if(b)b.click();setTimeout(()=>sysFocus(id),120);return}
  if(!d.tab&&!$('v-live').classList.contains('on')){const b=document.querySelector('[data-v="live"]');if(b)b.click();setTimeout(()=>sysFocus(id),120);return}
  if(lvOnScreen(el)&&id!=='tuner'){sysMin(id)}else sysFocus(id)}
function sysFocus(id){const el=SYSEL[id];if(!el)return;const y=el.getBoundingClientRect().top+scrollY-62;
  scrollTo({top:Math.max(0,y),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});
  el.classList.remove('lv-pulse');void el.offsetWidth;el.classList.add('lv-pulse')}
window.sysGo=sysGo;window.sysFocus=sysFocus;

/* other tabs: each panel can expand to both sides */
(function pxInit(){let k=0;
  document.querySelectorAll('#v-sound .grid2>.panel,#v-journal .grid2>.panel,#v-body .grid2>.panel,#v-library>.panel').forEach(p=>{const id='px'+(k++)+'_'+(p.closest('.view').id);p.dataset.px=id;p.classList.add('px-card');
    const sysId=Object.keys(SYSEL).find(x=>SYSEL[x]===p);const bar=p.querySelector(':scope>.sys-bar');
    if(bar&&sysId){const xb=bar.querySelector('.lv-xbtn');if(xb){xb.dataset.x=id;xb.setAttribute('onclick',`lvExpand('${id}')`)}}
    else{const b=document.createElement('button');b.className='sys-btn lv-xbtn px-abs';b.dataset.x=id;b.textContent='⤢';b.title='Expand to both sides';b.setAttribute('onclick',`lvExpand('${id}')`);p.prepend(b)}
    if(LV.full[id])p.classList.add('lv-full')});
  const cb=LV.el.station;if(cb&&!cb.querySelector(':scope>.px-abs')){const b=document.createElement('button');b.className='sys-btn lv-xbtn px-abs';b.dataset.x='station';b.textContent='⤢';b.title='Expand to both sides';b.setAttribute('onclick',"lvExpand('station')");cb.prepend(b)}
})();

if(typeof med!=='undefined'&&med)SYS.drone.on=true;
sysApply();setInterval(()=>{const st=document.querySelector('[data-st="tuner"]');if(st)st.textContent=running?'● LISTENING':'○ MIC OFF';const m=document.querySelector('.dock-mic');if(m)m.classList.toggle('on',running);if(typeof med!=='undefined'&&SYS.drone.on!==!!med){SYS.drone.on=!!med;dockRender();sysSave()}},500);

setInterval(()=>{document.documentElement.classList.toggle('mic-live',!!running);const dm=document.querySelector('.dock-mic');if(dm)dm.classList.toggle('on',!!running);const b=$('tmPower');if(!b)return;b.classList.toggle('on',running);b.querySelector('span').textContent=running?'ON':'OFF'},300);
})();
