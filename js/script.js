const $=id=>document.getElementById(id),R=(a,b)=>a+Math.random()*(b-a),pk=a=>a[Math.floor(Math.random()*a.length)];
const HC=['#c75b7a','#e58aa5','#d9b77e','#f3dcae','#b83a62'],CC=['#d9b77e','#f3dcae','#fff','#e58aa5','#c75b7a'];
const cv=$('fx'),cx=cv.getContext('2d');let W,H,ps=[],rain=false,hc={x:0,y:0},amb=0,last=0;
function rs(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;cx.setTransform(d,0,0,d,0,0)}rs();addEventListener('resize',rs);
function dH(x,y,s){cx.beginPath();cx.moveTo(x,y+s*.3);cx.bezierCurveTo(x,y,x-s*.5,y,x-s*.5,y+s*.3);cx.bezierCurveTo(x-s*.5,y+s*.6,x,y+s*.8,x,y+s);cx.bezierCurveTo(x,y+s*.8,x+s*.5,y+s*.6,x+s*.5,y+s*.3);cx.bezierCurveTo(x+s*.5,y,x,y,x,y+s*.3);cx.fill()}
function dS(x,y,s){cx.beginPath();cx.moveTo(x,y-s);cx.quadraticCurveTo(x,y,x+s,y);cx.quadraticCurveTo(x,y,x,y+s);cx.quadraticCurveTo(x,y,x-s,y);cx.quadraticCurveTo(x,y,x,y-s);cx.fill()}
function hp(x,y,n,v=200){for(let k=0;k<n&&ps.length<400;k++){const a=R(0,6.28),s=R(40,v);ps.push({k:'h',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-60,g:70,s:R(8,16),life:R(1.5,2.4),age:0,al:1,sw:3,sy:0,col:pk(HC)})}}
function cf(x,y,n){for(let k=0;k<n&&ps.length<400;k++){const a=R(-2.7,-.45),s=R(260,620);ps.push({k:'c',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:520,s:R(6,10),rot:R(0,6),vr:R(-9,9),life:R(2.2,3.2),age:0,al:1,col:pk(CC)})}}
function sp(x,y,n,r){for(let k=0;k<n&&ps.length<400;k++)ps.push({k:'s',x:x+R(-r,r),y:y+R(-r,r),vx:R(-5,5),vy:R(-7,3),s:R(3,8),life:R(2,4),age:0,al:1,ph:R(0,6),col:pk(['#fff','#f3dcae','#e58aa5'])})}
function formHeart(){const r=$('hs').getBoundingClientRect(),sc=Math.min(r.height/30,W/72);hc={x:r.x+r.width/2,y:r.y+r.height/2};for(let k=0;k<150;k++){const t=R(0,6.283),m=1-Math.pow(Math.random(),2.2)*.85;ps.push({k:'p',tx:16*Math.pow(Math.sin(t),3)*sc*m,ty:-(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))*sc*m,x0:R(0,W)-hc.x,y0:R(H*.4,H+60)-hc.y,s:R(5,9),dur:R(1.6,3.2),delay:R(0,1.2),ph:R(0,6),life:1e9,age:0,al:1,col:pk(HC)})}}
function loop(t){const dt=Math.min(.05,(t-last)/1000||.016);last=t;cx.clearRect(0,0,W,H);
amb-=dt;if(amb<0){amb=rain?.12:.7;ps.push({k:'h',x:R(0,W),y:H+20,vx:0,vy:-R(35,75),g:0,s:R(8,rain?22:18),life:H/35,age:0,al:R(.15,.4),sw:R(1,2.5),sy:R(8,20),col:pk(HC)})}
for(let i=ps.length-1;i>=0;i--){const p=ps[i];p.age+=dt;if(p.age>p.life){ps.splice(i,1);continue}
const f=p.age/p.life;let a=p.al*Math.min(1,p.age*4)*(1-f*f*f);cx.fillStyle=p.col;
if(p.k==='c'){p.vx*=Math.pow(.25,dt);p.vy+=p.g*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;p.rot+=p.vr*dt;cx.globalAlpha=Math.max(0,a);cx.save();cx.translate(p.x,p.y);cx.rotate(p.rot);cx.scale(1,Math.cos(p.age*9+p.rot));cx.fillRect(-p.s/2,-p.s/3,p.s,p.s*.6);cx.restore()}
else if(p.k==='h'){p.vy+=p.g*dt;if(p.g)p.vx*=Math.pow(.4,dt);p.x+=(p.vx+Math.sin(p.age*p.sw)*p.sy)*dt;p.y+=p.vy*dt;cx.globalAlpha=Math.max(0,a);dH(p.x,p.y,p.s)}
else if(p.k==='s'){p.x+=p.vx*dt;p.y+=p.vy*dt;cx.globalAlpha=Math.max(0,a*(.5+.5*Math.sin(p.age*4+p.ph)));dS(p.x,p.y,p.s*(.6+.4*Math.sin(p.age*3+p.ph)))}
else{const ag=Math.max(0,p.age-p.delay),e=Math.min(1,ag/p.dur),q=1-Math.pow(1-e,3),bt=e<1?1:1+.06*Math.sin(ag*3.6);cx.globalAlpha=Math.min(1,ag*2)*(.7+.3*Math.sin(p.age*2.4+p.ph));dH(hc.x+(p.x0*(1-q)+p.tx*q)*bt-p.s/2,hc.y+(p.y0*(1-q)+p.ty*q)*bt-p.s/2,p.s*bt)}}
cx.globalAlpha=1;requestAnimationFrame(loop)}requestAnimationFrame(loop);
function fly(ch,x,y,n,w){for(let k=0;k<n;k++){const e=document.createElement('span');e.className='fl';e.textContent=ch;e.style.cssText=`left:${x}px;top:${y}px;font-size:${R(20,34)}px;--dx:${R(-w,w)}px;--dy:${-R(80,240)}px;--r:${R(-40,40)}deg;animation-delay:${R(0,.5)}s`;document.body.appendChild(e);setTimeout(()=>e.remove(),2600)}}
const ctr=el=>{const r=el.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]};
$('bls').innerHTML=[['#b83a62',2],['#d9b77e',14],['#e58aa5',78],['#8e2149',89],['#c9a06a',5],['#c75b7a',84]].map((b,k)=>`<div class="bl" style="left:${b[1]}%;--c:${b[0]};--t:${9+k%3*2}s;--d:${-k*1.8}s"></div>`).join('');
const M=['Your smile is my favourite place','You make ordinary days magical','With you, I am home','Every moment with you is a gift','I fall for you more each day','You are my forever, Mahek Darling'];
$('cards').innerHTML=M.map((m,k)=>`<div class="cd a" style="--d:${.5+k*.15}s"><div class="in"><div class="fr">♥</div><div class="bk">${m}</div></div></div>`).join('');
$('wd').innerHTML=['Safe','Happy','Loved','Peaceful','Complete','Home','Blessed','Alive','Beautiful','Lucky'].map((w,k)=>`<span class="a" style="--d:${.6+k*.3}s"><b style="--b:${k*.35}s">${w}</b></span>`).join('');
const LT=`My dearest Mahek Darling,
Happy Birthday, my love.
Today the world celebrates the day
it was given its most beautiful girl.
And I celebrate the day
my whole life found its meaning.

I do not know how to begin,
because my heart has so much to say
and words are always too small for you.
So please read this slowly,
the way I love you, slowly and completely.

Before you, my days were just days.
Now every morning has your name in it.
Every evening ends with your smile.
You turned my ordinary life
into something I never want to leave.

I love the way you laugh
when you think no one is watching.
I love the way your eyes look at me
when you say nothing at all.
I love your glasses, your hair, your smile,
and the little things only I get to see.

You are my peace after a heavy day.
You are my home when I am far away.
You are my favourite person to talk to,
and my favourite silence to sit in.
With you, even doing nothing feels like everything.

Thank you for every sunset we shared.
Thank you for every hug that healed me.
Thank you for staying on the days
when I was not at my best.
Your patience is a gift I will never take lightly.

I remember your head on my shoulder,
the warmth of your hand in mine,
and the way the whole world went quiet.
Those little moments are my biggest treasures.
I keep them safe in my heart, always.

I am not a perfect man, Mahek Darling,
but I promise to love you honestly.
I promise to respect you, protect you,
and stand beside you in every season.
When you fall, I will hold you up.
When you win, I will clap the loudest.

On your birthday I wish you
more laughter than tears,
more peace than worry,
more love than you can count,
and every dream you carry in your heart.

May this new year of your life
be gentle with you.
May it open every door you knock on.
And may I be lucky enough
to walk through all of them beside you.

You are strong, you are kind,
you are beautiful inside and out.
Never forget how special you are,
especially on the days you forget it yourself.
I will always remind you.

Madam Ji, no matter where life takes us,
no matter how far the road goes,
I am always with you.
In every smile, in every step,
in every quiet prayer you whisper.

You are my today and my tomorrow,
my first thought and my last,
my forever kind of love.
Thank you for being you,
and thank you for being mine.

Happy Birthday, Mahek Darling.
I love you more than words can ever say.
Forever yours,`;
$('lt').innerHTML=LT.split('\n\n').map(s=>'<p>'+s.split('\n').join('<br>')+'</p>').join('');
const P=[...document.querySelectorAll('.pg')],hint=$('hint');let i=-1,locked=false,busy=true,kd=false;
function unlock(){locked=false;hint.textContent='Tap anywhere to continue';hint.classList.add('on')}
const E={dt(){setTimeout(()=>sp(W/2,H/2,40,Math.min(W,320)/1.6),600)},star(){sp(W/2,H/2,50,Math.min(W,400)/1.2)},
fin(){rain=true;setTimeout(()=>{formHeart();cf(W/2,H*.5,100)},500)},
let(){const p=$('paper');p.scrollTop=0;if(p.scrollHeight<=p.clientHeight+8)setTimeout(unlock,1500)}};
function go(n){busy=true;hint.classList.remove('on');if(i>=0)P[i].classList.remove('on');i=n;const p=P[i];
setTimeout(()=>{p.classList.add('on');locked=!!p.dataset.lock;E[p.id]&&E[p.id]();hint.textContent=locked?p.dataset.lock:(p.dataset.hint||'Tap anywhere to continue');
setTimeout(()=>{busy=false;if(i<P.length-1)hint.classList.add('on')},1000)},400)}
const H_={
gift(){busy=true;hint.classList.remove('on');$('gb').classList.add('open');const[x,y]=ctr($('gb'));cf(x,y,110);hp(x,y,12);$('gs').classList.add('in');setTimeout(()=>{busy=false;unlock()},1000)},
cake(){busy=true;hint.classList.remove('on');$('ck').classList.add('out');const[x,y]=ctr($('ck'));sp(x,y-40,36,90);cf(x,y,90);$('cm').classList.add('in');setTimeout(()=>{busy=false;unlock()},1000)},
kiss(){if(kd)return;kd=true;hint.classList.remove('on');$('lips').classList.add('go');const[x,y]=ctr($('face'));setTimeout(()=>{fly('💋',x,y,14,150);fly('❤️',x,y,10,170);hp(x,y,24,260);$('km').classList.add('in');setTimeout(unlock,900)},800)},
flip(e){const c=e.target.closest&&e.target.closest('.cd');if(!c||c.classList.contains('fl2'))return;c.classList.add('fl2');const[x,y]=ctr(c);hp(x,y,6);
if(document.querySelectorAll('.fl2').length===6)setTimeout(()=>{cf(W/2,H*.6,100);$('fm').classList.add('in');unlock()},900)}};
$('paper').addEventListener('scroll',e=>{const p=e.target;if(p.scrollTop+p.clientHeight>=p.scrollHeight-10&&locked&&P[i].id==='let')unlock()});
document.addEventListener('click',e=>{if(busy||i<0)return;const p=P[i];
if(locked){H_[p.id]&&H_[p.id](e);return}
if(i===P.length-1){hp(e.clientX,e.clientY,8);return}go(i+1)});
Promise.race([document.fonts?document.fonts.ready:0,new Promise(r=>setTimeout(r,1500))]).then(()=>go(0));

/* crazy layer: tap bursts, touch trail, fireworks */
document.addEventListener('click',e=>{sp(e.clientX,e.clientY,14,26);hp(e.clientX,e.clientY,6,170)});
let _lt=0;addEventListener('pointermove',e=>{const n=performance.now();if(n-_lt<45)return;_lt=n;sp(e.clientX,e.clientY,1,6)});
function fw(){const x=R(W*.15,W*.85),y=R(H*.12,H*.45),c=pk(HC);for(let k=0;k<46;k++){const a=k/46*6.283,s=R(90,230);ps.push({k:'h',x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,g:90,s:R(5,10),life:R(1.2,2),age:0,al:1,sw:1,sy:0,col:c})}sp(x,y,10,10)}
setInterval(()=>{const id=P[i]&&P[i].id;if(['dt','bal','star','fin','col'].includes(id))fw()},1000);

/* premium layer: frame, grain, progress */
(()=>{const mk=(id,h)=>{const e=document.createElement('div');e.id=id;if(h)e.innerHTML=h;document.body.appendChild(e);return e};
mk('grain');mk('frm','<i></i><i></i><i></i><i></i>');const pb=mk('pb'),pc=mk('pc'),n=P.length,_g=go;
go=function(k){_g(k);setTimeout(()=>{pb.style.width=((k+1)/n*100)+'%';pc.textContent=String(k+1).padStart(2,'0')+' / '+n},300)}})();

/* game 1: catch the hearts */
let hn=0,ht=0;
E.hunt=()=>{hn=0;$('hf').innerHTML='';$('hs').textContent='Hearts caught: 0 / 10';clearInterval(ht);
ht=setInterval(()=>{if(!P[i]||P[i].id!=='hunt'){clearInterval(ht);return}const e=document.createElement('div');e.className='fh';e.textContent=pk(['❤️','💖','💗','💕']);
e.style.cssText=`--x:${R(4,82)}%;--s:${R(46,62)}px;--t:${R(4.2,6.2)}s;--r:${R(-40,40)}deg`;e.onanimationend=()=>e.remove();$('hf').appendChild(e)},620)};
H_.hunt=e=>{const f=e.target.closest&&e.target.closest('.fh');if(!f||f.dataset.x)return;f.dataset.x=1;const[x,y]=ctr(f);f.remove();fly('💖',x,y,4,70);hp(x,y,8,200);
$('hs').textContent='Hearts caught: '+(++hn)+' / 10';
if(hn>=10){clearInterval(ht);$('hf').innerHTML='';cf(W/2,H*.55,140);$('hm').classList.add('in');unlock()}};
/* game 2: memory match with her photos */
let mo=[],mb=false,mf=0;
E.memo=()=>{mo=[];mb=false;mf=0;$('ms').textContent='Pairs found: 0 / 4';const s=[...document.querySelectorAll('#col img')].slice(0,4).map(q=>q.src);
const a=[0,1,2,3,0,1,2,3].sort(()=>Math.random()-.5);
$('mg').innerHTML=a.map((id,k)=>`<div class="cd a" data-id="${id}" style="--d:${.4+k*.1}s"><div class="in"><div class="fr">♥</div><div class="bk"><img src="${s[id]}" alt=""></div></div></div>`).join('')};
H_.memo=e=>{const c=e.target.closest&&e.target.closest('.cd');if(!c||mb||c.classList.contains('up')||c.dataset.m)return;c.classList.add('up');mo.push(c);if(mo.length<2)return;mb=true;const[a,b]=mo;mo=[];
if(a.dataset.id===b.dataset.id){a.dataset.m=b.dataset.m=1;mb=false;$('ms').textContent='Pairs found: '+(++mf)+' / 4';const[x,y]=ctr(a);hp(x,y,10);
if(mf===4)setTimeout(()=>{cf(W/2,H*.6,130);$('mm').classList.add('in');unlock()},700)}
else setTimeout(()=>{a.classList.remove('up');b.classList.remove('up');mb=false},900)};

/* balloon messages */
$('bls').innerHTML=[['You are my sunshine','#c9506f',3],['I love you','#b8862f',30],['Forever yours','#7b3fb0',55],['My cutie pie','#d6587a',71],['My queen','#2d8fb5',17],['Mine forever','#a8472f',63],['Smile always','#c0394f',42],['My whole world','#8e4aa8',1]].map((b,k)=>`<div class="bl" style="left:${b[2]}%;--c:${b[1]};--t:${9+k%3*2}s;--d:${-k*1.9}s">${b[0]}</div>`).join('');
/* game 3: scratch card */
E.scr=()=>{const c=$('scv'),d=Math.min(devicePixelRatio||1,2),w=c.parentNode.clientWidth,h=200;c.width=w*d;c.height=h*d;c.classList.remove('gone');const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);x.globalCompositeOperation='source-over';
const g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,'#b98a3e');g.addColorStop(.5,'#f6e2ae');g.addColorStop(1,'#b98a3e');x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle='#7a5518';x.font='italic 600 24px "Cormorant Garamond",Georgia,serif';x.textAlign='center';x.fillText('Scratch here',w/2,h/2+6);
let dn=false,mv=0,done=false;const chk=()=>{const a=x.getImageData(0,0,c.width,c.height).data;let t=0,n=0;for(let k=3;k<a.length;k+=64){n++;if(a[k]<40)t++}if(t/n>.42){done=true;c.classList.add('gone');cf(W/2,H*.5,140);unlock()}};
const sc=e=>{const r=c.getBoundingClientRect();x.globalCompositeOperation='destination-out';x.beginPath();x.arc(e.clientX-r.left,e.clientY-r.top,24,0,6.283);x.fill();if(++mv%8===0&&!done)chk()};
c.onpointerdown=e=>{dn=true;c.setPointerCapture(e.pointerId);sc(e)};c.onpointermove=e=>{if(dn)sc(e)};c.onpointerup=c.onpointercancel=()=>{dn=false}};
H_.scr=()=>{};
/* game 4: love quiz */
const QZ=[['Who is the love of Raja’s life?',['Mahek Darling','Only Mahek Darling','Mahek Darling, always']],['Where does Raja want to be?',['Right beside you','In your arms','Wherever you are']],['How long will Raja love you?',['Forever','A little longer than forever','Until the stars stop shining']]];
let qi=0,qb=false;const qs=()=>{$('qq').textContent=QZ[qi][0];$('qo').innerHTML=QZ[qi][1].map(t=>`<div class="qb">${t}</div>`).join('')};
E.quiz=()=>{qi=0;qb=false;$('qf').style.width='0';$('qr').classList.remove('in');qs()};
H_.quiz=e=>{const b=e.target.closest&&e.target.closest('.qb');if(!b||qb)return;qb=true;b.classList.add('ok');const[x,y]=ctr(b);hp(x,y,10);qi++;$('qf').style.width=(qi/3*100)+'%';
setTimeout(()=>{if(qi<3){qs();qb=false}else{cf(W/2,H*.55,140);$('qr').classList.add('in');unlock()}},800)};
