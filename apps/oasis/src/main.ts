import { World } from "./world";
import { Simulator } from "./sim";

const canvas = document.getElementById('view') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const reticle = document.getElementById('reticle') as HTMLDivElement;

let w=0,h=0,dpr=Math.min(devicePixelRatio||1,2);
function resize(){ w=innerWidth; h=innerHeight; canvas.width=Math.floor(w*dpr); canvas.height=Math.floor(h*dpr); canvas.style.width=w+'px'; canvas.style.height=h+'px'; }
addEventListener('resize', resize); resize();

const world = new World();
let gx=0.5, gy=0.5;
function setReticle(nx:number,ny:number){ gx=Math.max(0,Math.min(1,nx)); gy=Math.max(0,Math.min(1,ny)); reticle.style.left=Math.round(gx*w-8)+'px'; reticle.style.top=Math.round(gy*h-8)+'px'; }

// Desktop sim
if (new URLSearchParams(location.search).has('sim')){
  new Simulator({
    onHead:(pos)=> setReticle(gx+pos.leftRight*0.05, gy-pos.upDown*0.05),
    onButton:(e)=>{ if(e.long) dwell=DWELL_MS; else toast('Btn kurz'); }
  });
}

let dwell=0, dwellTarget:string|null=null;
const DWELL_MS=700;
function len2(x:number,y:number){ return Math.hypot(x,y); }

function update(dt:number){
  const px = gx*world.width, py = gy*world.height;
  let hit: {id:string, portal?:boolean} | null = null;
  for(const p of world.pois){ const dx=px-p.x, dy=py-p.y; if(len2(dx,dy) <= p.r){ hit=p; break; } }
  if(hit){
    if(dwellTarget!==hit.id){ dwellTarget=hit.id; dwell=0; toast('Halte zum Auswählen'); }
    else { dwell+=dt; if(dwell>=DWELL_MS){ onSelect(hit.id, !!hit.portal); dwell=0; dwellTarget=null; } }
  } else { dwell=0; dwellTarget=null; }
}

function onSelect(id:string, isPortal:boolean){
  if(isPortal){ setQuest('Portal betreten!'); flash(); }
  else { toast('Gesammelt: '+id); }
}

function flash(){ canvas.style.filter='brightness(2)'; setTimeout(()=> canvas.style.filter='none', 120); }

function render(){
  ctx.setTransform(dpr,0,0,dpr,0,0);
  ctx.clearRect(0,0,w,h);
  // green stars
  for(let i=0;i<80;i++){ const sx=(i*73)%w, sy=(i*137)%h; ctx.fillStyle = i%3===0? '#b6ff9c' : (i%3===1? '#7fff6a' : '#2fb944'); ctx.fillRect(sx,sy,1,1); }
  const scale = Math.min(w/800, h/200);
  ctx.save(); ctx.translate((w-800*scale)/2, (h-200*scale)/2); ctx.scale(scale, scale);
  for(const p of world.pois){
    ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.strokeStyle = p.portal ? '#7fff6a' : '#b6ff9c';
    ctx.lineWidth = 2; ctx.stroke();
    ctx.font = '14px "Press Start 2P", ui-sans-serif'; ctx.fillStyle = '#b6ff9c';
    ctx.fillText(p.label, p.x - 24, p.y - (p.r + 8));
  }
  const px = gx*world.width, py = gy*world.height;
  ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI*2); ctx.strokeStyle = '#7fff6a'; ctx.lineWidth = 2; ctx.stroke();
  if(dwellTarget){ const t=Math.min(1,dwell/DWELL_MS); ctx.beginPath(); ctx.arc(px, py, 10, -Math.PI/2, -Math.PI/2 + t*2*Math.PI); ctx.strokeStyle = '#2fb944'; ctx.lineWidth = 2; ctx.stroke(); }
  ctx.restore();
}

let last=performance.now();
function tick(now:number){ const dt=now-last; last=now; update(dt); render(); requestAnimationFrame(tick); }
requestAnimationFrame(tick);

function setQuest(text:string){ const q=document.querySelector('#hud .quest') as HTMLSpanElement; if(q) q.textContent=text; }
function toast(text:string, ms=1000){ const el=document.getElementById('toast')!; el.textContent=text; el.style.opacity='1'; clearTimeout((el as any)._t); (el as any)._t=setTimeout(()=>{ el.style.opacity='0'; }, ms); }

addEventListener('mousemove',(e)=> setReticle(e.clientX/w, e.clientY/h));
