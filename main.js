(function(){
const $=id=>document.getElementById(id),R=document.documentElement;
try{const t=localStorage.getItem('iv-theme');if(t)R.dataset.theme=t}catch(e){}
$('theme').onclick=()=>{const t=R.dataset.theme==='dark'?'light':'dark';R.dataset.theme=t;try{localStorage.setItem('iv-theme',t)}catch(e){}};
addEventListener('scroll',()=>{$('prog').style.width=(scrollY/(R.scrollHeight-innerHeight)*100)+'%'},{passive:true});
const calm=matchMedia('(prefers-reduced-motion:reduce)').matches;
const css=v=>getComputedStyle(R).getPropertyValue(v).trim();
function fit(c){const d=devicePixelRatio||1,w=c.clientWidth,h=+(c.dataset.h||(c.dataset.h=c.getAttribute('height')));if(c.width!==Math.round(w*d)||c.height!==Math.round(h*d)){c.width=Math.round(w*d);c.height=Math.round(h*d)}const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);return[x,w,h]}

/* Void field: orbiting particles, pointer gravity, shockwaves */
const vc=$('void');let on=false,load=42,P=[],pt=null,ring=null,T=0;
function spawnP(w,h){const a=Math.random()*6.28,r=30+Math.random()*Math.min(w,520)*.38,v=5.4*(.55+Math.random()*.3)*(Math.random()<.12?-1:1);return{x:w/2+Math.cos(a)*r,y:h/2+Math.sin(a)*r*.8,vx:-Math.sin(a)*v,vy:Math.cos(a)*v,z:Math.random()*1.6+.8}}
function mk(){P=Array.from({length:220},()=>spawnP(vc.clientWidth,320))}
function drawVoid(){const[x,w,h]=fit(vc),cx=w/2,cy=h/2,lt=R.dataset.theme==='light';T++;
 x.globalAlpha=calm?1:.2;x.fillStyle=css('--bg');x.fillRect(0,0,w,h);x.globalAlpha=1;
 const n=Math.floor(220*(.2+load/125)),G=on?95:30,far=Math.hypot(w,h);
 for(let i=0;i<n;i++){const p=P[i];let dx=cx-p.x,dy=cy-p.y,d=Math.hypot(dx,dy)||1,a=G/Math.max(d,28);
  p.vx+=dx/d*a;p.vy+=dy/d*a;
  if(pt){const ex=pt.x-p.x,ey=pt.y-p.y,e=Math.hypot(ex,ey)||1,f=60/Math.max(e,40);p.vx+=ex/e*f;p.vy+=ey/e*f}
  p.vx*=.998;p.vy*=.998;p.x+=p.vx;p.y+=p.vy;
  if(d>far*.7||isNaN(p.x)){P[i]=spawnP(w,h);continue}
  const sp=Math.hypot(p.vx,p.vy);x.fillStyle='hsl('+(185+Math.min(sp*16,110))+' 90% '+(lt?40:68)+'%)';x.fillRect(p.x,p.y,p.z*1.7,p.z*1.7)}
 if(ring){ring.r+=7;ring.a*=.95;x.globalAlpha=ring.a;x.strokeStyle=css('--cy');x.lineWidth=2;x.beginPath();x.arc(ring.x,ring.y,ring.r,0,6.28);x.stroke();x.globalAlpha=1;if(ring.a<.03)ring=null}
 if(on){x.strokeStyle=css('--vi');x.lineWidth=1.5;x.globalAlpha=.7;x.beginPath();x.arc(cx,cy,34+Math.sin(T/10)*5,0,6.28);x.stroke();x.globalAlpha=1}
 x.fillStyle=css('--cy');x.font='700 '+(on?58:44)+'px Inter';x.textAlign='center';x.textBaseline='middle';x.shadowColor=css('--cy');x.shadowBlur=on?32:12;x.fillText('∞',cx,cy);x.shadowBlur=0;
 if(T%20===1)$('hud').textContent=n+' particles · field '+(on?'ACTIVE: gravity ×3':'idle')+' · load '+load+'%';
 if(!calm)requestAnimationFrame(drawVoid)}
mk();drawVoid();
const rel=e=>{const r=vc.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
vc.addEventListener('pointermove',e=>{pt=rel(e)});
['pointerleave','pointerup','pointercancel'].forEach(n=>vc.addEventListener(n,()=>{pt=null}));
vc.addEventListener('pointerdown',e=>{const q=rel(e);ring={x:q.x,y:q.y,r:6,a:.9};P.forEach(p=>{const dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy)||1;if(d<220){p.vx+=dx/d*7;p.vy+=dy/d*7}})});
$('field').onclick=function(){on=!on;this.setAttribute('aria-pressed',on);this.textContent=on?'Deactivate field':'Activate field';if(calm)drawVoid()};
$('load').oninput=function(){load=+this.value;$('lv').innerHTML=load+'<small>%</small>';$('u').textContent=load;$('mf').style.width=load+'%';$('cat').textContent=load<25?'Low':load<60?'Moderate':load<85?'High':'Extreme';if(calm)drawVoid()};

/* Sierpinski recursion */
const fc=$('fr');
function tri(x,A,B,C,d,col){if(!d){x.fillStyle=col;x.beginPath();x.moveTo(A[0],A[1]);x.lineTo(B[0],B[1]);x.lineTo(C[0],C[1]);x.fill();return}
 const m=(p,q)=>[(p[0]+q[0])/2,(p[1]+q[1])/2],ab=m(A,B),bc=m(B,C),ca=m(C,A);tri(x,A,ab,ca,d-1,col);tri(x,ab,B,bc,d-1,col);tri(x,ca,bc,C,d-1,col)}
function frac(){const dep=+$('fd').value,[x,w,h]=fit(fc),s=Math.min(w-30,(h-20)*1.15),X=(w-s)/2;x.clearRect(0,0,w,h);
 const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,css('--cy'));g.addColorStop(1,css('--vi'));
 tri(x,[X+s/2,10],[X,h-10],[X+s,h-10],dep,g);$('fn').textContent=dep;$('ft').textContent=Math.pow(3,dep).toLocaleString()}
$('fd').oninput=frac;frac();

/* Graph */
function graph(){const n=+$('it').value,[x,w,h]=fit($('graph')),L=44,B=h-30,T=14,Rr=w-16;
 x.clearRect(0,0,w,h);x.font='12px JetBrains Mono';x.fillStyle=css('--mute');x.strokeStyle=css('--line');
 for(let v=0;v<=100;v+=20){const y=B-(B-T)*v/100;x.beginPath();x.moveTo(L,y);x.lineTo(Rr,y);x.stroke();x.fillText(v,6,y+4)}
 for(let i=0;i<=10;i+=2)x.fillText(i,L+(Rr-L)*i/10-4,h-8);
 const X=i=>L+(Rr-L)*i/10,Y=i=>B-(B-T)*(100*Math.pow(.5,i))/100;
 x.strokeStyle=css('--cy');x.lineWidth=3;x.beginPath();for(let i=0;i<=10;i++)i?x.lineTo(X(i),Y(i)):x.moveTo(X(i),Y(i));x.stroke();
 x.fillStyle=css('--vi');x.beginPath();x.arc(X(n),Y(n),7,0,6.28);x.fill();
 $('itn').textContent=n;$('sn').textContent=n;$('gv').textContent='d('+n+') = 100 × (1/2)^'+n+' = '+(100*Math.pow(.5,n)).toFixed(3)}
$('it').oninput=graph;graph();addEventListener('resize',()=>{graph();frac();if(calm)drawVoid()});
R.addEventListener('click',e=>{if(e.target.id==='theme'){graph();frac();if(calm)drawVoid()}});

/* Hilbert's Hotel */
function rooms(f){const h=$('hotel');h.innerHTML='';for(let i=1;i<=12;i++){const d=document.createElement('div');d.className='room';d.textContent=i;h.appendChild(d)}
 if(f)setTimeout(()=>[...h.children].forEach((d,i)=>{d.classList.add('m');d.textContent=f(i+1)}),60)}
rooms();
$('g1').onclick=()=>{rooms(n=>n+1);$('hn').textContent='Guest in room n moves to room n+1. Room 1 is free for the newcomer.'};
$('g2').onclick=()=>{rooms(n=>2*n);$('hn').textContent='Guest in room n moves to room 2n. Every odd room is free for infinitely many new guests.'};

/* Timeline simulator */
const SETS=[[['Explore science','⬡','You follow curiosity into physics and computing, building models that test ideas against evidence.'],['Explore wisdom','✦','You study philosophy and tradition, learning how earlier thinkers handled choice and uncertainty.'],['Create a world','✳','You design your own simulation, deciding the rules and watching what emerges.']],
[['Build a tool','⌘','You turn the idea into software that other people can use and improve.'],['Teach others','◈','You explain what you learned, and the questions you get shape what you build next.'],['Take a pause','↻','You step back and return later with a clearer view of what matters.']],
[['Chase a proof','∞','You pursue a rigorous answer and find that each result opens new questions.'],['Join a team','✦','You collaborate, and the group reaches places none of you would reach alone.'],['Start small','⬡','You ship a tiny version today and let real feedback guide the next step.']]];
let si=0;
function paths(){const b=$('paths');b.innerHTML='';SETS[si].forEach((p,i)=>{const e=document.createElement('button');e.className='path';e.innerHTML='<b class="big" style="font-size:1.6rem">'+p[1]+'</b><span><small>Path '+'ABC'[i]+'</small>'+p[0]+'</span><i>↗</i>';
 e.onclick=()=>{[...b.children].forEach(c=>c.classList.remove('on'));e.classList.add('on');$('out').textContent=p[2]};b.appendChild(e)});$('out').textContent='Select a branch above to reveal its hypothetical outcome.'}
paths();$('regen').onclick=()=>{si=(si+1)%SETS.length;paths()};$('reset').onclick=paths;

/* Universe generator */
const A1=['Aether','Brahma','Cinder','Drift','Echo','Flux','Gleam','Halo','Ion','Jade'],B1=['Prime','Reach','Veil','Tide','Spire','Bloom'],pk=a=>a[Math.floor(Math.random()*a.length)];let bn=0;
function spawn(){const u={n:pk(A1)+' '+pk(B1),dim:3+Math.floor(Math.random()*8),g:(Math.random()*3+.2).toFixed(2),c:Math.floor(Math.random()*500+50),life:Math.random()<.5},b=document.createElement('button');
 b.className='bub';b.style.setProperty('--c','hsl('+Math.floor(Math.random()*360)+' 80% 52%)');b.textContent=u.n;b.setAttribute('aria-label','Inspect universe '+u.n);
 b.onclick=()=>{$('uni').innerHTML='<h3>'+u.n+'</h3><ul><li>Spatial dimensions: <b>'+u.dim+'</b></li><li>Gravity compared with ours: <b>'+u.g+'×</b></li><li>Speed of light: <b>'+u.c+'%</b> of ours</li><li>Could life arise here? <b>'+(u.life?'Possibly':'Very unlikely')+'</b></li></ul>'};
 $('bubbles').appendChild(b);if(++bn>12)$('bubbles').firstChild.remove()}
$('spawn').onclick=spawn;for(let i=0;i<4;i++)spawn();

/* Arjuna's choice */
const S={start:{t:'The conch shells sound. Arjuna lowers his bow. Across the field stand people he loves. What do you do?',o:[['Refuse to fight and walk away','walk'],['Fight, but only for victory and fame','fame'],['Ask Krishna what duty truly requires','ask']]},
walk:{t:'You keep your peace today, but the kingdom falls to people who care nothing for justice, and many suffer. The Gita suggests that avoiding action is also an action, with consequences of its own.',o:[['Return to the chariot','start']]},
fame:{t:'You win, yet the victory feels hollow because your mind was fixed on reward. The Gita warns that clinging to the fruit of action brings anxiety whether you win or lose.',o:[['Try a different path','start']]},
ask:{t:'Krishna answers: do what is right for your role, give it your full effort, and loosen your hold on the outcome. This is the heart of karma yoga, a steadier way to face hard choices.',o:[['Begin again','start']]}};
function show(k){const s=S[k],b=$('arjuna');b.innerHTML='<p class="tag s">'+(k==='start'?'Kurukshetra':'Consequence')+'</p><p>'+s.t+'</p>';s.o.forEach(([l,to])=>{const e=document.createElement('button');e.textContent=l;e.onclick=()=>show(to);b.appendChild(e)})}
show('start');
})();
