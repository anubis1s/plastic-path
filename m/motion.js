/* MOTION: animated movement + video link */
const MV=(()=>{
const F='style="stroke:var(--muted);stroke-width:10;stroke-linecap:round"',A='style="stroke:var(--acc);stroke-width:9;stroke-linecap:round"',G='style="stroke:var(--acc);stroke-width:3;stroke-dasharray:4 4;opacity:.45"',T='style="fill:var(--muted);font-size:10px;font-family:inherit"';
const P=(x,y,a,l)=>[x+l*Math.cos(a*Math.PI/180),y+l*Math.sin(a*Math.PI/180)].map(v=>v.toFixed(1));
const an=(d,cx,cy,dur)=>`<animateTransform attributeName="transform" type="rotate" values="0 ${cx} ${cy};${d} ${cx} ${cy};${d} ${cx} ${cy};0 ${cx} ${cy}" keyTimes="0;.45;.6;1" dur="${dur||3}s" repeatCount="indefinite"/>`;
const svg=b=>`<svg viewBox="0 0 200 140" width="100%" role="img" aria-hidden="true">${b}</svg>`;
function hinge(o){const [x2,y2]=P(o.j[0],o.j[1],o.a0,o.l),[gx,gy]=P(o.j[0],o.j[1],o.a0+o.d,o.l);
 return svg((o.head?`<circle cx="${o.head[0]}" cy="${o.head[1]}" r="9" style="fill:none;stroke:var(--muted);stroke-width:3"/>`:"")+(o.fix||[]).map(s=>`<line x1="${s[0]}" y1="${s[1]}" x2="${s[2]}" y2="${s[3]}" ${F}/>`).join("")+
 `<line x1="${o.j[0]}" y1="${o.j[1]}" x2="${gx}" y2="${gy}" ${G}/><g><line x1="${o.j[0]}" y1="${o.j[1]}" x2="${x2}" y2="${y2}" ${A}/>${an(o.d,o.j[0],o.j[1])}</g><circle cx="${o.j[0]}" cy="${o.j[1]}" r="6" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/>`+
 (o.t||[]).map(t=>`<text x="${t[0]}" y="${t[1]}" ${T} text-anchor="${t[3]||"middle"}">${t[2]}</text>`).join(""));}
function rot(o){const [x,y]=P(100,70,o.a0,34);
 return svg(`<circle cx="100" cy="70" r="34" style="fill:var(--card);stroke:var(--muted);stroke-width:4"/><g><line x1="100" y1="70" x2="${x}" y2="${y}" ${A}/><circle cx="${x}" cy="${y}" r="7" style="fill:var(--acc)"/>${an(o.d,100,70)}</g><circle cx="100" cy="70" r="4" style="fill:var(--ink)"/>`+
 `<text x="100" y="22" ${T} text-anchor="middle">${o.top}</text><text x="10" y="74" ${T}>${o.l}</text><text x="190" y="74" ${T} text-anchor="end">${o.r}</text><text x="100" y="128" ${T} text-anchor="middle">${o.cap}</text>`);}
function slide(o){return svg(`<line x1="100" y1="10" x2="100" y2="130" style="stroke:var(--muted);stroke-width:4;stroke-dasharray:6 5"/><text x="96" y="134" ${T} text-anchor="end">позвоночник</text><polygon points="125,40 175,40 140,105" style="fill:none;stroke:var(--acc);stroke-width:3;stroke-dasharray:4 4;opacity:.4" transform="translate(${o.dx} ${o.dy})"/><g><polygon points="125,40 175,40 140,105" style="fill:var(--acc-soft);stroke:var(--acc);stroke-width:4"/><animateTransform attributeName="transform" type="translate" values="0 0;${o.dx} ${o.dy};${o.dx} ${o.dy};0 0" keyTimes="0;.45;.6;1" dur="3s" repeatCount="indefinite"/></g><text x="150" y="125" ${T} text-anchor="middle">лопатка (вид сзади)</text>`);}
function hand(o){const B=[[62,98,-140],[84,70,-100],[100,66,-90],[116,68,-80],[132,76,-65]],L=[34,40,44,40,32];
 let s=`<rect x="76" y="70" width="64" height="58" rx="12" style="fill:var(--card);stroke:var(--muted);stroke-width:3"/>`;
 B.forEach((b,i)=>{const d=o.m[i]||0,[x,y]=P(b[0],b[1],b[2],L[i]);const line=`<line x1="${b[0]}" y1="${b[1]}" x2="${x}" y2="${y}" style="stroke:var(${d?"--acc":"--muted"});stroke-width:${i?9:10};stroke-linecap:round"/>`;
  s+=d?`<g>${line}${an(d,b[0],b[1])}</g>`:line;});
 return svg(s+`<text x="100" y="138" ${T} text-anchor="middle">${o.cap||"кисть (схема)"}</text>`);}
function tilt(o){return svg(`<line x1="100" y1="8" x2="100" y2="80" ${F}/><line x1="66" y1="96" x2="134" y2="96" ${G} transform="rotate(${o.d} 100 86)"/><g><line x1="66" y1="96" x2="134" y2="96" ${A}/>${an(o.d,100,86)}</g><circle cx="100" cy="86" r="6" style="fill:var(--card);stroke:var(--ink);stroke-width:2"/><text x="8" y="122" ${T}>медиально</text><text x="192" y="122" ${T} text-anchor="end">латерально</text><text x="100" y="136" ${T} text-anchor="middle">правая стопа, вид сзади</text>`);}
const side=["правая рука, вид сбоку","лицом вправо"];
const D={
 scElev:["Поднимание лопатки",()=>slide({dx:0,dy:-18})],
 scRetr:["Приведение лопатки к позвоночнику",()=>slide({dx:-20,dy:0})],
 shFlex:["Сгибание плеча (рука вперёд)",()=>hinge({head:[100,16],fix:[[100,30,100,128]],j:[100,40],a0:90,l:62,d:-150,t:[[150,134,"вид сбоку, лицом →"]]})],
 shExt:["Разгибание плеча (рука назад)",()=>hinge({head:[100,16],fix:[[100,30,100,128]],j:[100,40],a0:90,l:62,d:55,t:[[150,134,"вид сбоку, лицом →"]]})],
 shAbd:["Отведение плеча (в сторону)",()=>hinge({head:[100,16],fix:[[86,40,114,40],[100,30,100,128]],j:[114,40],a0:90,l:60,d:-90,t:[[100,138,"вид спереди"]]})],
 shAdd:["Приведение плеча (к туловищу)",()=>hinge({head:[100,16],fix:[[86,40,114,40],[100,30,100,128]],j:[114,40],a0:0,l:60,d:85,t:[[100,138,"вид спереди"]]})],
 shRotIn:["Внутренняя ротация плеча",()=>rot({a0:-90,d:-60,top:"спереди",l:"медиально",r:"латерально",cap:"плечевая кость, вид сверху"})],
 shRotEx:["Наружная ротация плеча",()=>rot({a0:-90,d:55,top:"спереди",l:"медиально",r:"латерально",cap:"плечевая кость, вид сверху"})],
 elFlex:["Сгибание в локте",()=>hinge({fix:[[100,12,100,62]],j:[100,62],a0:90,l:56,d:-135,t:[[150,134,"вид сбоку, лицом →"]]})],
 pron:["Пронация (ладонь вниз)",()=>rot({a0:-90,d:160,top:"ладонь вверх",l:"",r:"",cap:"предплечье с торца, точка = ладонь"})],
 sup:["Супинация (ладонь вверх)",()=>rot({a0:70,d:-160,top:"ладонь вверх",l:"",r:"",cap:"предплечье с торца, точка = ладонь"})],
 wrFlex:["Сгибание запястья",()=>hinge({fix:[[25,60,110,60]],j:[110,60],a0:0,l:50,d:70,t:[[60,48,"предплечье"],[100,128,"ладонь смотрит вниз"]]})],
 wrExt:["Разгибание запястья",()=>hinge({fix:[[25,60,110,60]],j:[110,60],a0:0,l:50,d:-60,t:[[60,48,"предплечье"],[100,128,"ладонь смотрит вниз"]]})],
 wrAbd:["Отведение кисти (к большому пальцу)",()=>hinge({fix:[[100,132,100,78]],j:[100,78],a0:-90,l:50,d:-25,t:[[45,40,"большой палец"],[100,138,"правая кисть, тыл к вам"]]})],
 wrAdd:["Приведение кисти (к мизинцу)",()=>hinge({fix:[[100,132,100,78]],j:[100,78],a0:-90,l:50,d:30,t:[[160,40,"мизинец"],[100,138,"правая кисть, тыл к вам"]]})],
 fgFlex:["Сгибание пальцев",()=>hinge({fix:[[30,70,105,70]],j:[105,70],a0:0,l:46,d:90,t:[[65,58,"ладонь"],[100,134,"вид сбоку"]]})],
 fgExt:["Разгибание пальцев",()=>hinge({fix:[[30,70,105,70]],j:[105,70],a0:80,l:46,d:-90,t:[[65,58,"кисть"],[100,134,"вид сбоку"]]})],
 mcp:["Сгибает MCP, пальцы прямые («официант»)",()=>hinge({fix:[[30,70,105,70]],j:[105,70],a0:0,l:50,d:65,t:[[65,58,"ладонь"],[100,134,"вид сбоку"]]})],
 thFlex:["Сгибание большого пальца",()=>hinge({fix:[[40,70,105,70]],j:[105,70],a0:0,l:36,d:80,t:[[72,58,"1-я пястная"],[100,134,"большой палец, сбоку"]]})],
 thExt:["Разгибание большого пальца",()=>hinge({fix:[[40,70,105,70]],j:[105,70],a0:70,l:36,d:-85,t:[[72,58,"1-я пястная"],[100,134,"большой палец, сбоку"]]})],
 thAbd:["Отведение большого пальца",()=>hand({m:[-35]})],
 thAdd:["Приведение большого пальца",()=>hand({m:[35]})],
 thOpp:["Противопоставление большого пальца",()=>hand({m:[80]})],
 dmAbd:["Отведение мизинца",()=>hand({m:[0,0,0,0,25]})],
 dmFlex:["Сгибание / противопоставление мизинца",()=>hand({m:[0,0,0,0,-45]})],
 fgAbd:["Отведение пальцев (DAB)",()=>hand({m:[0,-14,0,14,22]})],
 fgAdd:["Приведение пальцев (PAD)",()=>hand({m:[0,14,0,-14,-22]})],
 hpFlex:["Сгибание бедра",()=>hinge({head:[100,10],fix:[[100,22,100,66]],j:[100,66],a0:90,l:62,d:-95,t:[[150,134,"вид сбоку, лицом →"]]})],
 hpExt:["Разгибание бедра (нога назад)",()=>hinge({head:[100,10],fix:[[100,22,100,66]],j:[100,66],a0:90,l:62,d:35,t:[[150,134,"вид сбоку, лицом →"]]})],
 hpAbd:["Отведение бедра",()=>hinge({fix:[[78,60,112,60],[95,20,95,60]],j:[112,60],a0:90,l:66,d:-40,t:[[100,138,"вид спереди, правая нога"]]})],
 hpAdd:["Приведение бедра",()=>hinge({fix:[[78,60,112,60],[95,20,95,60]],j:[112,60],a0:55,l:66,d:45,t:[[100,138,"вид спереди, правая нога"]]})],
 hpRotEx:["Наружная ротация бедра",()=>rot({a0:-90,d:55,top:"спереди",l:"медиально",r:"латерально",cap:"бедренная кость, вид сверху"})],
 hpRotIn:["Внутренняя ротация бедра",()=>rot({a0:-90,d:-55,top:"спереди",l:"медиально",r:"латерально",cap:"бедренная кость, вид сверху"})],
 knExt:["Разгибание колена",()=>hinge({fix:[[25,55,110,55]],j:[110,55],a0:90,l:62,d:-85,t:[[65,44,"бедро (сидя)"],[150,134,"лицом →"]]})],
 knFlex:["Сгибание колена",()=>hinge({fix:[[100,8,100,62]],j:[100,62],a0:90,l:60,d:100,t:[[150,134,"вид сбоку, лицом →"]]})],
 knRot:["Отпирание колена (ротация голени внутрь)",()=>rot({a0:-90,d:-40,top:"спереди",l:"медиально",r:"латерально",cap:"большеберцовая кость, вид сверху"})],
 anDors:["Тыльное сгибание стопы",()=>hinge({fix:[[80,8,80,92]],j:[80,92],a0:0,l:58,d:-22,t:[[100,134,"голеностоп, сбоку"]]})],
 anPlant:["Подошвенное сгибание стопы",()=>hinge({fix:[[80,8,80,92]],j:[80,92],a0:0,l:58,d:38,t:[[100,134,"голеностоп, сбоку"]]})],
 ftInv:["Инверсия (подошва внутрь)",()=>tilt({d:-25})],
 ftEv:["Эверсия (подошва наружу)",()=>tilt({d:20})],
 toFlex:["Сгибание пальцев стопы",()=>hinge({fix:[[20,85,130,85]],j:[130,85],a0:0,l:30,d:45,t:[[75,73,"стопа"],[100,134,"сбоку"]]})],
 toExt:["Разгибание пальцев стопы",()=>hinge({fix:[[20,85,130,85]],j:[130,85],a0:0,l:30,d:-45,t:[[75,73,"стопа"],[100,134,"сбоку"]]})],
 htAbd:["Отведение большого пальца стопы",()=>hand({m:[-30],cap:"схема: пальцы стопы"})],
 ltAbd:["Отведение мизинца стопы",()=>hand({m:[0,0,0,0,25],cap:"схема: пальцы стопы"})]
};
const MAP={
 "m. trapezius":["scElev","scRetr"],"m. latissimus dorsi":["shExt","shRotIn"],"m. levator scapulae":["scElev"],"m. rhomboideus minor":["scRetr"],"m. rhomboideus major":["scRetr"],
 "m. supraspinatus":["shAbd"],"m. infraspinatus":["shRotEx"],"m. teres minor":["shRotEx","shAdd"],"m. subscapularis":["shRotIn","shAdd"],"m. teres major":["shAdd","shRotIn"],
 "m. biceps brachii":["elFlex","sup"],"m. brachialis":["elFlex"],"m. coracobrachialis":["shFlex","shAdd"],"m. pronator teres":["pron"],"m. pronator quadratus":["pron"],
 "m. flexor carpi radialis":["wrFlex","wrAbd"],"m. palmaris longus":["wrFlex"],"m. flexor carpi ulnaris":["wrFlex","wrAdd"],"m. flexor digitorum superficialis":["fgFlex","wrFlex"],
 "m. flexor digitorum profundus":["fgFlex"],"m. flexor pollicis longus":["thFlex"],"m. brachioradialis":["elFlex"],"m. extensor carpi radialis longus":["wrExt","wrAbd"],
 "m. extensor carpi radialis brevis":["wrExt","wrAbd"],"m. extensor digitorum":["fgExt"],"m. extensor carpi ulnaris":["wrExt","wrAdd"],"m. abductor pollicis longus":["thAbd"],
 "m. extensor pollicis brevis":["thExt"],"m. extensor pollicis longus":["thExt"],"m. supinator":["sup"],"m. extensor digiti minimi":["fgExt"],"m. extensor indicis":["fgExt"],
 "m. abductor pollicis brevis":["thAbd"],"m. flexor pollicis brevis":["thFlex"],"m. opponens pollicis":["thOpp"],"m. adductor pollicis":["thAdd"],
 "ul|m. abductor digiti minimi":["dmAbd"],"m. flexor digiti minimi brevis":["dmFlex"],"m. opponens digiti minimi":["dmFlex"],"m. palmaris brevis":["fgFlex"],
 "mm. lumbricales":["mcp"],"mm. interossei palmares":["fgAdd"],"mm. interossei dorsales":["fgAbd"],
 "m. gluteus maximus":["hpExt","hpRotEx"],"m. gluteus medius":["hpAbd","hpRotIn"],"m. gluteus minimus":["hpAbd","hpRotIn"],"m. tensor fasciae latae":["hpRotIn"],
 "m. piriformis":["hpRotEx"],"m. obturator internus":["hpRotEx"],"m. gemellus superior":["hpRotEx"],"m. gemellus inferior":["hpRotEx"],"m. quadratus femoris":["hpRotEx"],"m. obturator externus":["hpRotEx"],
 "m. rectus femoris":["knExt","hpFlex"],"m. vastus lateralis":["knExt"],"m. vastus medialis":["knExt"],"m. vastus intermedius":["knExt"],"m. iliacus":["hpFlex"],"m. psoas major":["hpFlex"],
 "m. sartorius":["hpFlex","knFlex"],"m. pectineus":["hpAdd","hpFlex"],"m. adductor longus":["hpAdd"],"m. adductor brevis":["hpAdd"],"m. adductor magnus":["hpAdd","hpExt"],"m. gracilis":["hpAdd","knFlex"],
 "m. biceps femoris":["knFlex","hpExt"],"m. semitendinosus":["knFlex","hpExt"],"m. semimembranosus":["knFlex","hpExt"],
 "m. tibialis anterior":["anDors","ftInv"],"m. extensor hallucis longus":["toExt","anDors"],"m. extensor digitorum longus":["toExt","anDors"],"m. fibularis longus":["ftEv","anPlant"],"m. fibularis brevis":["ftEv"],
 "m. gastrocnemius":["anPlant","knFlex"],"m. soleus":["anPlant"],"m. plantaris":["anPlant"],"m. popliteus":["knRot"],"m. tibialis posterior":["anPlant","ftInv"],
 "m. flexor hallucis longus":["toFlex"],"m. flexor digitorum longus":["toFlex"],"m. extensor hallucis brevis":["toExt"],"m. extensor digitorum brevis":["toExt"],
 "m. abductor hallucis":["htAbd"],"m. flexor digitorum brevis":["toFlex"],"le|m. abductor digiti minimi":["ltAbd"]
};
const keys=m=>MAP[m.r+"|"+m.n]||MAP[m.n]||[];
const q=m=>encodeURIComponent(m.n.replace(/^mm?\.\s*/,"")+" muscle action animation");
return {keys,D,html(m){const k=keys(m);
 return `<div class="mov">${k.map(x=>`<figure>${D[x][1]()}<figcaption>${D[x][0]}</figcaption></figure>`).join("")}</div><a class="vid" href="https://www.youtube.com/results?search_query=${q(m)}" target="_blank" rel="noopener">▶ Видео: ${esc(m.n)} в движении</a>`;}};
})();
