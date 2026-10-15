const C=window.CONTENT, canvas=document.querySelector('#world'),ctx=canvas.getContext('2d');
const bg=document.createElement('canvas');bg.width=1200;bg.height=760;const g=bg.getContext('2d');
const places=[
 {id:'about',name:'The Dreamhouse',sub:'A little about Eli',x:155,y:185,w:155,h:100,color:'#f7a7c6',roof:'#db568d',sign:'ELI’S DREAMHOUSE',icon:'♡'},
 {id:'education',name:'The Academy',sub:'Learning & leadership',x:390,y:170,w:140,h:100,color:'#edb7d8',roof:'#9b78b0',sign:'THE ACADEMY',icon:'✧'},
 {id:'skills',name:'The Data Studio',sub:'Tools of my trade',x:715,y:180,w:150,h:100,color:'#b6d5d2',roof:'#5f9d9d',sign:'DATA STUDIO',icon:'⌘'},
 {id:'hobbies',name:'The Pink Cinema',sub:'Movies & my bookshelf',x:950,y:190,w:150,h:95,color:'#f9bad1',roof:'#d05083',sign:'PINK CINEMA',icon:'★'},
 {id:'goals',name:'The Wishing Garden',sub:'Goals & big dreams',x:155,y:490,w:145,h:105,color:'#d4b5e2',roof:'#aa7bb8',sign:'WISHING GARDEN',icon:'✿'},
 {id:'gallery',name:'The Memory House',sub:'Snapshots of my world',x:390,y:510,w:145,h:100,color:'#f8d09d',roof:'#d78e81',sign:'MEMORY HOUSE',icon:'▧'},
 {id:'projects',name:'The Idea Atelier',sub:'A work in progress',x:715,y:515,w:150,h:100,color:'#efb2cd',roof:'#b96992',sign:'IDEA ATELIER',icon:'✎'},
 {id:'contact',name:'The Post Office',sub:'Let’s stay in touch',x:965,y:500,w:140,h:100,color:'#f3afbe',roof:'#d75d7d',sign:'LOVE LETTERS',icon:'✉'}
];
const visited=new Set(),player={x:600,y:470},keys=new Set();let path=[],last=0,near=null,time=0,activeBuilding=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function rect(x,y,w,h,c,target=g){target.fillStyle=c;target.fillRect(Math.round(x),Math.round(y),w,h)}
function text(s,x,y,size=10,color='#704453',target=g){target.fillStyle=color;target.font=`${size}px monospace`;target.textAlign='center';target.fillText(s,x,y)}
let seed=47;function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
function flower(x,y,c){rect(x,y,2,7,'#6e9a70');rect(x-3,y-3,8,3,c);rect(x-1,y-5,4,7,c);rect(x,y-2,2,2,'#ffeaa8')}
function tree(x,y,pink=false){rect(x+3,y+22,9,16,'#96736a');rect(x-13,y+29,45,9,'#759f7b44');const c=pink?['#df92b0','#eaa7c3','#f6bdd4']:['#659a80','#80b193','#9cc6a4'];rect(x-20,y-5,52,30,c[0]);rect(x-12,y-19,36,49,c[1]);rect(x-20,y+1,44,16,c[1]);rect(x-5,y-22,23,13,c[2]);rect(x-15,y-3,14,12,c[2]);rect(x+21,y+9,10,10,c[0])}
function bench(x,y){rect(x,y,38,5,'#a76e73');rect(x,y+8,38,5,'#b78081');rect(x+4,y+13,4,9,'#8b6f6f');rect(x+30,y+13,4,9,'#8b6f6f')}
function lamp(x,y){rect(x,y,3,32,'#866c79');rect(x-4,y-9,11,12,'#aa8393');rect(x-2,y-7,7,8,'#fff4c7');rect(x-2,y+32,7,3,'#866c79')}
function building(p){let{x,y,w,h,color,roof}=p;rect(x+12,y+16,w+10,h+14,'#7d6f8050');rect(x,y,w,h,color);rect(x,y+h-8,w,8,'#bd8496');rect(x+7,y+8,w-14,h-17,'#ffffff18');
 for(let i=0;i<5;i++)rect(x-10+i*10,y-35-i*7,w+20-i*20,10,roof);
 rect(x-10,y-4,w+20,9,roof);rect(x+12,y-30,15,21,'#be7191');rect(x+10,y-33,19,5,'#e6a4b7');
 for(const dx of [19,w-43]){rect(x+dx-3,y+17,29,34,'#fff2e6');rect(x+dx,y+20,23,26,'#99c5d3');rect(x+dx+10,y+20,3,27,'#fff7ef');rect(x+dx,y+32,24,3,'#fff7ef');rect(x+dx-5,y+50,33,5,'#d1829e');for(let f=0;f<4;f++)flower(x+dx+f*6,y+49,'#f0659a')}
 rect(x+w/2-14,y+h-44,28,44,'#fff3e8');rect(x+w/2-10,y+h-40,20,40,roof);rect(x+w/2+4,y+h-21,3,3,'#ffe4ac');rect(x+w/2-18,y+h,36,7,'#efcad3');
 rect(x+w/2-67,y+66,134,19,'#fff4df');text(p.sign,x+w/2,y+79,9);if(p.id==='hobbies'){for(let a=0;a<7;a++)rect(x+8+a*20,y+57,5,5,'#fff5b5')}
 if(p.id==='skills'){rect(x+w/2-16,y-34,32,23,'#faf3ed');text('</>',x+w/2,y-18,12,'#65918f')}
 if(p.id==='goals'){for(let i=0;i<4;i++)flower(x-10+i*50,y+h+20,'#e88ab7')}
}
function paintWorld(){rect(0,0,1200,760,'#b8d5a7');for(let i=0;i<6000;i++){const x=Math.floor(rand()*600)*2,y=Math.floor(rand()*380)*2;rect(x,y,rand()>.5?3:2,2,rand()>.5?'#c6dfb5':'#acd09f')}
 // A blush-paved promenade connects every stop.
 rect(563,105,74,655,'#ead4c0');rect(60,360,1080,76,'#ead4c0');rect(570,110,60,650,'#f5e1cc');rect(60,367,1080,62,'#f5e1cc');
 for(const p of places){let cx=p.x+p.w/2;let end=p.y<360?p.y+p.h:436;rect(cx-18,end,36,p.y<360?367-end:p.y-end,'#f0dcc6');}
 for(let x=60;x<1140;x+=22){rect(x,362,14,3,'#dbb9ae');rect(x,431,14,3,'#dbb9ae')}for(let y=125;y<760;y+=24){rect(565,y,3,14,'#dbb9ae');rect(633,y,3,14,'#dbb9ae')}
 for(let i=0;i<20;i++){tree(25+i*60,55,i%3===0);tree(20+i*62,718,i%4===0)}for(let i=0;i<8;i++){tree(35,125+i*72,i%3===0);tree(1165,125+i*72,i%3===0)}
 for(const [x,y]of [[108,140],[330,145],[675,135],[890,145],[115,530],[340,570],[675,585],[920,585]])tree(x,y,true);
 // Pocket gardens and a tiny lily pond.
 rect(65,470,65,90,'#9fc69e');for(let i=0;i<20;i++)flower(75+(i%4)*14,480+Math.floor(i/4)*16,i%2?'#f5a1c0':'#fff2cd');
 rect(865,460,62,16,'#8fbdad');rect(850,476,90,47,'#8fbdad');rect(864,523,62,14,'#8fbdad');rect(859,479,72,39,'#92cbd2');rect(871,466,48,61,'#92cbd2');rect(875,483,25,3,'#c6e7e0');rect(902,509,21,3,'#c6e7e0');rect(912,482,12,6,'#6eaa90');flower(917,482,'#f2afcb');
 places.forEach(building);
 // Central rose fountain.
 rect(554,374,92,12,'#bda6b1');rect(543,386,114,37,'#bda6b1');rect(554,423,92,12,'#bda6b1');rect(553,387,94,35,'#f7d0e0');rect(564,379,72,51,'#f7d0e0');rect(560,390,80,27,'#9bcdd0');rect(572,384,56,39,'#9bcdd0');rect(591,372,18,31,'#f5e6df');rect(582,368,36,10,'#f5e6df');rect(597,353,6,19,'#c0e5df');
 for(const [x,y]of [[330,332],[800,332],[325,457],[810,460]])bench(x,y);for(const x of [100,350,690,900,1120]){lamp(x,338);lamp(x,452)}
 // Picket fences, daisies, and pink boulevard flowers.
 for(const y of [312,654])for(let x=145;x<1105;x+=15){if((x>540&&x<665)||(x>860&&x<950))continue;rect(x,y,4,15,'#fff3e4');rect(x-2,y+4,18,3,'#fff3e4')}
 for(let i=0;i<80;i++){const x=80+rand()*1040,y=rand()>.5?333:460;if(x>530&&x<670)continue;flower(x,y,i%3?'#e996b7':'#fff3d1')}
 text('CURIOSITY LANE',400,404,9,'#b28e91');text('POSSIBILITY AVENUE',810,404,9,'#b28e91');
 rect(640,470,5,36,'#ad7e7f');rect(630,469,63,21,'#fff0d8');text('YOU ARE HERE',661,483,7,'#9a637d');
}
paintWorld();
const panel=document.querySelector('#panel'),body=document.querySelector('#panelBody');let returnFocus=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function show(title,html){keys.clear();path=[];returnFocus=document.activeElement;document.querySelector('#placeTag').textContent=title;body.innerHTML=html;if(!panel.open)panel.showModal();document.querySelector('#closePanel').focus()}
function visit(id){const p=places.find(p=>p.id===id);if(!p)return;visited.add(id);document.querySelector('#progress').textContent=`${visited.size} / 8 PLACES DISCOVERED`;let html=`<h2>${p.name}</h2>`;
 if(id==='about')html+=`<img class="profile" src="img/me-nobg.png" alt="Eli"><p class="section-intro">Hi, I’m Eli. Welcome to my corner of the world.</p><p>${esc(C.aboutText)}</p><div class="tags"><span>Computer Science</span><span>Analytics</span><span>SM Scholar</span></div><p>Outside of academics, you’ll find me reading a book, watching a movie, or making room for a new dream.</p>`;
 if(id==='education')html+='<p class="section-intro">Every chapter brought me a little closer to who I am.</p>'+[...C.educationItems].reverse().map(e=>`<article class="entry"><small>${esc(e.yearRange)}</small><h3>${esc(e.school)}</h3><p>${esc(e.description)}</p><div class="tags">${e.badges.map(b=>`<span>${esc(b)}</span>`).join('')}</div></article>`).join('');
 if(id==='skills')html+='<p class="section-intro">A curious mind, with a growing toolkit. These are the technologies I’ve explored.</p><div class="skills-grid">'+C.skillItems.map(s=>`<div class="skill"><img src=".${s.image}" alt=""><span>${esc(s.name)}</span></div>`).join('')+'</div>';
 if(id==='hobbies')html+='<p class="section-intro">For the stories that stay with me long after the credits.</p><div class="tabs"><button class="active" data-media="movie">Movie night</button><button data-media="book">My bookshelf</button></div><div id="mediaShelf"></div>';
 if(id==='goals')html+='<p class="section-intro">Growing into a life that feels as good as it looks.</p>'+C.goals.map(e=>`<article class="entry"><small>WISH ${e.id}</small><h3>${esc(e.title)}</h3><p>${esc(e.description)}</p></article>`).join('')+'<h3>A few things I’m proud of</h3><div class="tags">'+C.awards.map(a=>`<span title="${esc(a.description)}">${esc(a.title)}</span>`).join('')+'</div>';
 if(id==='gallery')html+='<p class="section-intro">Little moments, big feelings. A few snapshots from my original portfolio.</p><div class="gallery-grid">'+C.galleryItems.map(a=>`<img src=".${a.image}" alt="${esc(a.alt)}" loading="lazy">`).join('')+'</div>';
 if(id==='projects')html+='<p class="section-intro">Good things are taking shape.</p><article class="entry"><small>MY FIRST WEBSITE</small><h3>A personal portfolio & guestbook</h3><p>My Web Programming Finals project brings together my background, education, skills, hobbies, and a guestbook. Built with React, TypeScript, NestJS, and Supabase.</p><a href="https://github.com/elijahnollen/webprog-finals" target="_blank" rel="noopener">Explore the source on GitHub ↗</a></article><p>More projects will find a home here as I continue learning and building.</p>';
 if(id==='contact')html+='<p class="section-intro">A good conversation is always welcome. Say hello, share an idea, or just send a little kindness my way.</p><div class="socials">'+C.socialLinks.map(s=>`<a href="${esc(s.href)}" ${s.label==='Email'?'':'target="_blank" rel="noopener"'}>${esc(s.label)} ↗</a>`).join('')+'</div><p class="tiny-note">emnollen@student.apc.edu.ph</p>';
 show(p.name.toUpperCase()+' / '+p.sub.toUpperCase(),html);if(id==='hobbies'){shelf('movie');body.querySelectorAll('[data-media]').forEach(b=>b.onclick=()=>{body.querySelectorAll('[data-media]').forEach(t=>t.classList.remove('active'));b.classList.add('active');shelf(b.dataset.media)})}
}
function shelf(type){document.querySelector('#mediaShelf').innerHTML='<div class="media-grid">'+C.mediaItems.filter(m=>m.type===type).map(m=>`<article><img src=".${m.image}" alt="${esc(m.title)} cover" loading="lazy"><p>${esc(m.title)}</p></article>`).join('')+'</div>'}
function directory(){show('DREAMTOWN / YOUR LITTLE FIELD GUIDE','<h2>Where shall we go?</h2><p class="section-intro">Pick a place, or close this guide and follow your curiosity.</p><div class="directory">'+places.map(p=>`<button data-visit="${p.id}"><small>${p.icon} ${visited.has(p.id)?'DISCOVERED':'A PLACE TO EXPLORE'}</small><strong>${p.name}</strong><small>${p.sub} ↗</small></button>`).join('')+'</div>');body.querySelectorAll('[data-visit]').forEach(b=>b.onclick=()=>visit(b.dataset.visit))}
document.querySelector('#directoryButton').onclick=directory;document.querySelector('#quickAbout').onclick=()=>visit('about');document.querySelector('#closePanel').onclick=()=>panel.close();panel.addEventListener('click',e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)panel.close()}});panel.addEventListener('close',()=>returnFocus?.focus());
document.querySelector('#explore').onclick=()=>{document.querySelector('.game-frame').scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});canvas.focus({preventScroll:true})};
function blocked(x,y){return x<65||x>1135||y<120||y>690||places.some(p=>x>p.x-9&&x<p.x+p.w+9&&y>p.y-15&&y<p.y+p.h+5)||(x>540&&x<660&&y>350&&y<437)||(x>849&&x<941&&y>459&&y<540)}
function route(tx,ty){const size=10,start=[Math.round(player.x/size),Math.round(player.y/size)],goal=[Math.round(tx/size),Math.round(ty/size)],queue=[start],came=new Map([[start.join(),null]]);if(blocked(goal[0]*size,goal[1]*size))return;for(let i=0;i<queue.length;i++){const q=queue[i];if(q[0]===goal[0]&&q[1]===goal[1]){const result=[];let k=q.join();while(came.get(k)!==null){result.push(k.split(',').map(Number).map(v=>v*size));k=came.get(k)}path=result.reverse();return}for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const n=[q[0]+dx,q[1]+dy],k=n.join();if(!came.has(k)&&!blocked(n[0]*size,n[1]*size)){came.set(k,q.join());queue.push(n)}}}}
canvas.addEventListener('pointerdown',e=>{const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*1200/r.width,y=(e.clientY-r.top)*760/r.height;const p=places.find(p=>x>=p.x-10&&x<=p.x+p.w+10&&y>=p.y-65&&y<=p.y+p.h+15);if(p){visit(p.id);return}route(x,y);canvas.focus({preventScroll:true})});
document.addEventListener('keydown',e=>{if(panel.open)return;const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright'].includes(k)&&document.activeElement===canvas){e.preventDefault();keys.add(k);path=[]}if(k==='e'&&near&&document.activeElement===canvas){e.preventDefault();visit(near.id)}});document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>keys.clear());
document.querySelectorAll('[data-dir]').forEach(b=>{const key={up:'w',down:'s',left:'a',right:'d'}[b.dataset.dir];b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(key);path=[]};b.onpointerup=b.onpointercancel=()=>keys.delete(key)});
document.querySelector('#interact').onclick=()=>near&&visit(near.id);
function avatar(x,y,moving){const c=ctx;const bob=moving&&!reduced?Math.sin(time*14)*2:0;y+=bob;c.fillStyle='#71586844';c.beginPath();c.ellipse(x,y+4,12,4,0,0,Math.PI*2);c.fill();rect(x-7,y-33,14,18,'#754b46',c);rect(x-5,y-30,10,12,'#f0c2a3',c);rect(x-8,y-35,16,6,'#764d49',c);rect(x-6,y-24,3,2,'#704350',c);rect(x+3,y-24,2,2,'#704350',c);rect(x-6,y-17,12,13,'#ef70ab',c);rect(x-9,y-8,18,5,'#ed8db7',c);rect(x-9,y-16,3,9,'#f0c2a3',c);rect(x+6,y-16,3,9,'#f0c2a3',c);const step=moving&&!reduced?Math.sin(time*14)*2:0;rect(x-5,y-3+step,4,7,'#f1c6af',c);rect(x+2,y-3-step,4,7,'#f1c6af',c);rect(x-6,y+3+step,6,3,'#fff0e5',c);rect(x+2,y+3-step,6,3,'#fff0e5',c);rect(x+4,y-34,7,4,'#f593bd',c);rect(x+7,y-37,3,10,'#f593bd',c)}
function frame(now){const dt=Math.min((now-last)/1000,.04);last=now;time=now/1000;let dx=0,dy=0;if(!panel.open){dx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);dy=(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0);if(!dx&&!dy&&path.length){const t=path[0],dist=Math.hypot(t[0]-player.x,t[1]-player.y);if(dist<4)path.shift();else{dx=(t[0]-player.x)/dist;dy=(t[1]-player.y)/dist}}const len=Math.hypot(dx,dy);if(len>1){dx/=len;dy/=len}const nx=player.x+dx*125*dt,ny=player.y+dy*125*dt;if(!blocked(nx,player.y))player.x=nx;if(!blocked(player.x,ny))player.y=ny}
 ctx.imageSmoothingEnabled=false;ctx.drawImage(bg,0,0);if(path.length){const t=path[path.length-1];text('✧',t[0],t[1],18,'#c26093',ctx)}
 avatar(player.x,player.y,!!(dx||dy));text('ELI',player.x,player.y-45,9,'#8d4367',ctx);
 for(const p of places){const x=p.x+p.w/2,y=p.y-57+(reduced?0:Math.sin(time*2+p.x)*3);rect(x-10,y-11,20,20,visited.has(p.id)?'#fdf6de':'#fff5f7',ctx);text(visited.has(p.id)?'✓':p.icon,x,y+3,14,'#cb558a',ctx)}
 near=places.find(p=>Math.hypot(player.x-(p.x+p.w/2),player.y-(p.y+p.h+12))<65)||null;const interaction=document.querySelector('#interact');interaction.hidden=!near||panel.open;if(near)interaction.textContent='E · Visit '+near.name;
 if(innerWidth<800){const wrap=document.querySelector('.world-wrap'),scale=wrap.clientHeight/760,offset=Math.max(wrap.clientWidth-1200*scale,Math.min(0,wrap.clientWidth/2-player.x*scale));canvas.style.left=offset+'px';canvas.style.transform='none'}else{canvas.style.left='';canvas.style.transform=''}requestAnimationFrame(frame)}requestAnimationFrame(frame);
