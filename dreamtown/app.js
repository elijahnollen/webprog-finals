const C=window.CONTENT, canvas=document.querySelector('#world'),ctx=canvas.getContext('2d');
var spriteReady=false;var spriteAtlas=new Image();var decorReady=false;var decorAtlas=new Image();
const bg=document.createElement('canvas');bg.width=1200;bg.height=760;const g=bg.getContext('2d');
const places=[
 {id:'about',name:'The Dreamhouse',sub:'A little about Eli',x:155,y:185,w:155,h:100,color:'#f7a7c6',roof:'#db568d',sign:'ELI’S DREAMHOUSE',icon:'♡'},
 {id:'education',name:'The Academy',sub:'Learning & leadership',x:390,y:170,w:140,h:100,color:'#edb7d8',roof:'#9b78b0',sign:'THE ACADEMY',icon:'✧'},
 {id:'skills',name:'The Data Studio',sub:'Tools of my trade',x:715,y:180,w:150,h:100,color:'#b6d5d2',roof:'#5f9d9d',sign:'DATA STUDIO',icon:'⌘'},
 {id:'hobbies',name:'The Pink Cinema',sub:'Movies & my bookshelf',x:950,y:190,w:150,h:95,color:'#f9bad1',roof:'#d05083',sign:'PINK CINEMA',icon:'★'},
 {id:'goals',name:'The Wishing Garden',sub:'Goals & big dreams',x:155,y:490,w:145,h:105,color:'#d4b5e2',roof:'#aa7bb8',sign:'WISHING GARDEN',icon:'✿'},
 {id:'gallery',name:'The Memory House',sub:'Snapshots of my world',x:390,y:510,w:145,h:100,color:'#f8d09d',roof:'#d78e81',sign:'MEMORY HOUSE',icon:'▧'},
 {id:'projects',name:'The Idea Atelier',sub:'A work in progress',x:715,y:515,w:150,h:100,color:'#efb2cd',roof:'#b96992',sign:'IDEA ATELIER',icon:'✎'},
 {id:'contact',name:'The Post Office',sub:'Let’s stay in touch',x:965,y:500,w:140,h:100,color:'#f3afbe',roof:'#d75d7d',sign:'POST OFFICE',icon:'✉'}
];
const visited=new Set(),player={x:600,y:470},keys=new Set();let path=[],last=0,near=null,time=0,activeBuilding=null;
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
function rect(x,y,w,h,c,target=g){target.fillStyle=c;target.fillRect(Math.round(x),Math.round(y),w,h)}
function text(s,x,y,size=10,color='#704453',target=g){target.fillStyle=color;target.font=`${size}px monospace`;target.textAlign='center';target.fillText(s,x,y)}
let seed=47;function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
function flower(x,y,c){rect(x,y,2,7,'#6e9a70');rect(x-3,y-3,8,3,c);rect(x-1,y-5,4,7,c);rect(x,y-2,2,2,'#ffeaa8')}
function tree(x,y,pink=false){if(decorReady){drawDecor(g,pink?0:1,x-29,y-38,76,83);return;}
 const pal=pink?['#a65c83','#bf749b','#d98daf','#e9a6c2','#f8c8d9','#ffe0e5']:['#487d69','#588e73','#6ca381','#82b28d','#9ec49d','#b9d6aa'];
 rect(x-15,y+27,46,7,'#55765825');rect(x+3,y+15,9,23,'#856862');rect(x+5,y+18,3,20,'#aa8570');rect(x+10,y+21,2,9,'#694f55');rect(x-3,y+14,8,4,'#856862');
 const clusters=[[-13,5,17],[-8,-10,18],[9,-9,19],[21,6,17],[6,12,22],[-16,13,13],[5,-21,15]];
 for(let j=0;j<clusters.length;j++){const[cx,cy,r]=clusters[j];for(let yy=-r;yy<r;yy+=2)for(let xx=-r;xx<r;xx+=2){if(xx*xx+yy*yy>r*r)continue;const h=((Math.sin((x+xx)*127.1+(y+yy)*311.7+j*74.7)*43758.5453)%1+1)%1;const tone=Math.max(0,Math.min(5,Math.floor(3-yy/r+((h>.78)?1:0)-(h<.12?2:0))));rect(x+cx+xx,y+cy+yy,2,2,pal[tone])}}
 if(pink)for(let i=0;i<10;i++){const xx=x-17+(i*13)%49,yy=y-14+(i*17)%39;rect(xx,yy,2,2,'#ffe1eb');rect(xx+1,yy+2,2,1,'#f0b4d2')}
}
function bench(x,y){if(decorReady){drawDecor(g,3,x-4,y-14,51,44);return;}rect(x,y,38,5,'#a76e73');rect(x,y+8,38,5,'#b78081');rect(x+4,y+13,4,9,'#8b6f6f');rect(x+30,y+13,4,9,'#8b6f6f')}
function lamp(x,y){if(decorReady){drawDecor(g,4,x-13,y-23,30,66);return;}rect(x,y,3,32,'#866c79');rect(x-4,y-9,11,12,'#aa8393');rect(x-2,y-7,7,8,'#fff4c7');rect(x-2,y+32,7,3,'#866c79')}
function building(p){const{x,y,w,h,color,roof}=p;if(spriteReady){const i=places.indexOf(p);drawArt(g,i,x-18,y-78,w+36,h+90);rect(x+w/2-65,y+h+13,130,15,'#fff3dc');text(p.sign,x+w/2,y+h+23,8,'#89526a');return;}rect(x+8,y+17,w+12,h+4,'#52665630');rect(x-1,y,w+2,h,'#a67a8b');rect(x+2,y+2,w-4,h-4,color);
 // Fine brickwork, foundation courses, and raised corner stones.
 for(let yy=8;yy<h-8;yy+=8){rect(x+3,y+yy,w-6,1,'#ffffff26');for(let xx=(yy%16?9:0);xx<w;xx+=18)rect(x+xx,y+yy,1,8,'#ab728c22')}
 rect(x,y+h-8,w,8,'#c09599');for(let xx=0;xx<w;xx+=12)rect(x+xx,y+h-6,1,5,'#976e7e55');
 for(let yy=5;yy<h-10;yy+=12){rect(x+3,y+yy,8,7,'#fff0dc77');rect(x+w-11,y+yy,8,7,'#fff0dc77')}
 // Individually tiled, stepped pitched roof. Every shingle has a lit edge.
 for(let row=0;row<13;row++){const yy=y-53+row*4,inset=(12-row)*5;const left=x-12+inset,right=x+w+12-inset;rect(left,yy,right-left,4,roof);rect(left,yy,right-left,1,'#ffffff2b');for(let xx=left+(row%2?6:0);xx<right;xx+=12){rect(xx,yy,1,4,'#7b3b6b55');rect(xx+2,yy+2,7,1,'#fff0d31b')}}
 rect(x-14,y-1,w+28,4,'#8d567b');rect(x-12,y+3,w+24,3,'#fce7d2');rect(x+2,y+7,w-4,4,'#85586c33');
 rect(x+w-31,y-51,17,23,'#b7798c');for(let yy=0;yy<22;yy+=6){rect(x+w-31,y-51+yy,17,1,'#e4a3ad');rect(x+w-25+(yy%12?4:0),y-50+yy,1,5,'#d893a4')}rect(x+w-33,y-54,21,5,'#e8b1b8');
 // Dormer with miniature panes and a scalloped valance.
 rect(x+w/2-16,y-35,32,28,'#f9e3d3');rect(x+w/2-11,y-30,22,19,'#97bfc9');rect(x+w/2-1,y-30,2,19,'#fff3e0');rect(x+w/2-11,y-21,22,2,'#fff3e0');for(let i=0;i<4;i++)rect(x+w/2-21+i*5,y-35-i*3,42-i*10,4,'#9d6485');
 for(const dx of [20,w-45]){rect(x+dx-4,y+21,31,36,'#ac748f');rect(x+dx-2,y+18,27,35,'#ffefda');rect(x+dx+1,y+21,21,28,'#88b6c8');rect(x+dx+3,y+22,5,18,'#b9dce1');rect(x+dx+1,y+38,21,11,'#9bc4ce');rect(x+dx+10,y+20,2,30,'#fff7ea');rect(x+dx,y+33,24,2,'#fff7ea');rect(x+dx-8,y+21,5,30,roof);rect(x+dx+27,y+21,5,30,roof);for(let yy=24;yy<49;yy+=5){rect(x+dx-7,y+yy,3,1,'#fff2dc66');rect(x+dx+28,y+yy,3,1,'#fff2dc66')}
 rect(x+dx-5,y+54,33,5,'#ac6f86');rect(x+dx-3,y+54,29,2,'#d092a8');for(let f=0;f<5;f++){const xx=x+dx+f*5;rect(xx,y+48,3,7,'#6e9d7c');rect(xx-1,y+46,5,3,['#f27ca9','#f6bad0','#fff1c8'][f%3]);rect(xx+1,y+46,1,2,'#ffeaa5')}}
 const door=x+w/2;rect(door-16,y+h-37,32,37,'#aa7286');rect(door-14,y+h-38,28,38,'#fff0d8');rect(door-11,y+h-35,22,35,roof);rect(door-8,y+h-31,16,12,'#a7cad0');rect(door-1,y+h-31,2,12,'#fff1d9');rect(door-8,y+h-25,16,1,'#fff1d9');rect(door-7,y+h-14,14,10,'#ffffff22');rect(door+6,y+h-17,2,3,'#ffe1a1');rect(door-20,y+h,40,4,'#e2b4bd');rect(door-24,y+h+4,48,4,'#efccce');rect(door-20,y+h+8,40,2,'#c29c9e');
 rect(door-63,y+63,126,18,'#a57588');rect(door-61,y+62,122,16,'#fff3d8');rect(door-59,y+64,118,1,'#ead0bf');text(p.sign,door,y+73,8,'#89526a');rect(door-57,y+68,2,2,'#c99a88');rect(door+55,y+68,2,2,'#c99a88');
 if(p.id==='hobbies'){for(let i=0;i<15;i++){rect(x-5+i*11,y+8,3,3,i%2?'#fff0a9':'#fff8dd')}for(let i=0;i<7;i++)rect(x+10+i*20,y+82,14,3,i%2?'#f9dfb6':'#d780a5')}
 if(p.id==='skills'){rect(x+5,y+h+7,14,19,'#a17b86');rect(x+3,y+h+4,18,6,'#dfb1b8');for(let i=0;i<5;i++)flower(x+4+i*3,y+h+3,'#e5a0cd')}
 if(p.id==='goals'){for(let i=0;i<5;i++)flower(x-8+i*39,y+h+19,'#da84b2')}
 // Door sconces and a small doorstep planter.
 for(const dx of [-23,21]){rect(door+dx,y+h-27,3,10,'#8a657a');rect(door+dx-2,y+h-29,7,7,'#ead3a0');rect(door+dx-1,y+h-28,5,4,'#fff2c6')}
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
 if(decorReady){drawDecor(g,2,537,335,125,104);drawDecor(g,5,72,470,65,90);drawDecor(g,7,899,545,48,45)}
 text('CURIOSITY LANE',400,404,9,'#b28e91');text('POSSIBILITY AVENUE',810,404,9,'#b28e91');
 rect(640,470,5,36,'#ad7e7f');rect(630,469,63,21,'#fff0d8');text('YOU ARE HERE',661,483,7,'#9a637d');
}
paintWorld();
const panel=document.querySelector('#panel'),body=document.querySelector('#panelBody');let returnFocus=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function show(title,html){keys.clear();path=[];returnFocus=document.activeElement;document.querySelector('#placeTag').textContent=title;body.innerHTML=html;if(!panel.open)panel.showModal();document.querySelector('#closePanel').focus()}
function showContent(id,options={}){window.Portfolio.showSection(id,options)}
function directory(){window.Portfolio.showGuide()}
document.querySelector('#directoryButton').onclick=directory;document.querySelector('#quickAbout').onclick=()=>showContent('about');document.querySelector('#closePanel').onclick=()=>panel.close();panel.addEventListener('click',e=>{if(e.target===panel){const r=panel.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)panel.close()}});panel.addEventListener('close',()=>{if(started)canvas.focus({preventScroll:true});else if(returnFocus?.isConnected)returnFocus.focus({preventScroll:true})});
document.querySelector('#explore').onclick=()=>{document.querySelector('.game-frame').scrollIntoView({behavior:reduced?'instant':'smooth',block:'center'});canvas.focus({preventScroll:true})};
function blocked(x,y){if(room)return x<190||x>1010||y<225||y>685||roomObjects.some(o=>x>o.x-12&&x<o.x+o.w+12&&y>o.y-15&&y<o.y+o.h+10);return x<65||x>1135||y<120||y>690||places.some(p=>x>p.x-9&&x<p.x+p.w+9&&y>p.y-15&&y<p.y+p.h+5)||(x>540&&x<660&&y>350&&y<437)||(x>849&&x<941&&y>459&&y<540)}
function route(tx,ty){const size=10,start=[Math.round(player.x/size),Math.round(player.y/size)],goal=[Math.round(tx/size),Math.round(ty/size)],queue=[start],came=new Map([[start.join(),null]]);if(blocked(goal[0]*size,goal[1]*size))return;for(let i=0;i<queue.length;i++){const q=queue[i];if(q[0]===goal[0]&&q[1]===goal[1]){const result=[];let k=q.join();while(came.get(k)!==null){result.push(k.split(',').map(Number).map(v=>v*size));k=came.get(k)}path=result.reverse();return}for(const [dx,dy]of[[1,0],[-1,0],[0,1],[0,-1]]){const n=[q[0]+dx,q[1]+dy],k=n.join();if(!came.has(k)&&!blocked(n[0]*size,n[1]*size)){came.set(k,q.join());queue.push(n)}}}}
canvas.addEventListener('pointerdown',e=>{const r=canvas.getBoundingClientRect(),x=(e.clientX-r.left)*1200/r.width,y=(e.clientY-r.top)*760/r.height;const p=places.find(p=>x>=p.x-10&&x<=p.x+p.w+10&&y>=p.y-65&&y<=p.y+p.h+15);if(room){const o=roomObjects.find(o=>x>o.x-15&&x<o.x+o.w+15&&y>o.y-35&&y<o.y+o.h+25);if(o){activeBuilding=o;route(o.x+o.w/2,o.y+o.h+30)}else{activeBuilding=null;route(x,y)}canvas.focus({preventScroll:true});return}if(p){activeBuilding=p;route(p.x+p.w/2,p.y+p.h+30);canvas.focus({preventScroll:true});return}activeBuilding=null;route(x,y);canvas.focus({preventScroll:true})});
document.addEventListener('keydown',e=>{if(panel.open||!started)return;const k=e.key.toLowerCase();if(['w','a','s','d','arrowup','arrowleft','arrowdown','arrowright'].includes(k)&&document.activeElement===canvas){e.preventDefault();keys.add(k);path=[]}if(k==='e'&&near&&document.activeElement===canvas){e.preventDefault();activateNear()}});document.addEventListener('keyup',e=>keys.delete(e.key.toLowerCase()));window.addEventListener('blur',()=>keys.clear());
document.querySelectorAll('[data-dir]').forEach(b=>{const key={up:'w',down:'s',left:'a',right:'d'}[b.dataset.dir];b.onpointerdown=e=>{e.preventDefault();b.setPointerCapture(e.pointerId);keys.add(key);path=[]};b.onpointerup=b.onpointercancel=()=>keys.delete(key)});
document.querySelector('#interact').onclick=activateNear;
function avatar(x,y,moving){const c=ctx;const bob=moving&&!reduced?Math.sin(time*14)*2:0;y+=bob;c.fillStyle='#71586844';c.beginPath();c.ellipse(x,y+4,12,4,0,0,Math.PI*2);c.fill();rect(x-7,y-33,14,18,'#754b46',c);rect(x-5,y-30,10,12,'#f0c2a3',c);rect(x-8,y-35,16,6,'#764d49',c);rect(x-6,y-24,3,2,'#704350',c);rect(x+3,y-24,2,2,'#704350',c);rect(x-6,y-17,12,13,'#ef70ab',c);rect(x-9,y-8,18,5,'#ed8db7',c);rect(x-9,y-16,3,9,'#f0c2a3',c);rect(x+6,y-16,3,9,'#f0c2a3',c);const step=moving&&!reduced?Math.sin(time*14)*2:0;rect(x-5,y-3+step,4,7,'#f1c6af',c);rect(x+2,y-3-step,4,7,'#f1c6af',c);rect(x-6,y+3+step,6,3,'#fff0e5',c);rect(x+2,y+3-step,6,3,'#fff0e5',c);rect(x+4,y-34,7,4,'#f593bd',c);rect(x+7,y-37,3,10,'#f593bd',c)}
function frame(now){const dt=Math.min((now-last)/1000,.04);last=now;time=now/1000;let dx=0,dy=0;if(!panel.open&&started){dx=(keys.has('d')||keys.has('arrowright')?1:0)-(keys.has('a')||keys.has('arrowleft')?1:0);dy=(keys.has('s')||keys.has('arrowdown')?1:0)-(keys.has('w')||keys.has('arrowup')?1:0);if(!dx&&!dy&&path.length){const t=path[0],dist=Math.hypot(t[0]-player.x,t[1]-player.y);if(dist<4)path.shift();else{dx=(t[0]-player.x)/dist;dy=(t[1]-player.y)/dist}}const len=Math.hypot(dx,dy);if(len>1){dx/=len;dy/=len}const nx=player.x+dx*125*dt,ny=player.y+dy*125*dt;if(!blocked(nx,player.y))player.x=nx;if(!blocked(player.x,ny))player.y=ny}
 ctx.imageSmoothingEnabled=false;if(room){drawInterior();interiorDetails();window.Portfolio?.drawRoomDetails(ctx,room)}else ctx.drawImage(bg,0,0);if(path.length){const t=path[path.length-1];text('✧',t[0],t[1],18,'#c26093',ctx)}
 avatar(player.x,player.y,!!(dx||dy));text('ELI',player.x,player.y-45,9,'#8d4367',ctx);
 for(const p of (room?[]:places)){const x=p.x+p.w/2,y=p.y-91+(reduced?0:Math.sin(time*2+p.x)*3);rect(x-10,y-11,20,20,visited.has(p.id)?'#fdf6de':'#fff5f7',ctx);text(visited.has(p.id)?'✓':p.icon,x,y+3,14,'#cb558a',ctx)}
 near=room?roomObjects.find(o=>Math.hypot(player.x-(o.x+o.w/2),player.y-(o.y+o.h+30))<80)||null:places.find(p=>Math.hypot(player.x-(p.x+p.w/2),player.y-(p.y+p.h+30))<65)||null;
 if(room&&player.y>655&&Math.abs(player.x-600)<50)near={id:'exit',name:'Step outside'};
 const interaction=document.querySelector('#interact');interaction.hidden=!near||panel.open||!started;if(near)interaction.textContent='E · '+(room?(near.id==='exit'?'Step outside':'Explore '+near.name):'Enter '+near.name);
 if(activeBuilding&&!path.length&&near&&!panel.open){const target=activeBuilding;activeBuilding=null;if(room&&near===target)inspectObject(target);else if(!room&&near.id===target.id)visit(target.id)}
 const wrap=document.querySelector('.world-wrap'),scale=room?Math.max(wrap.clientWidth/1200,wrap.clientHeight/850,1):Math.max(wrap.clientWidth/1200,wrap.clientHeight/760,1.65);
 canvas.style.width=1200*scale+'px';canvas.style.height=760*scale+'px';canvas.style.transform='none';
 canvas.style.left=Math.max(wrap.clientWidth-1200*scale,Math.min(0,wrap.clientWidth/2-player.x*scale))+'px';canvas.style.top=Math.max(wrap.clientHeight-760*scale,Math.min(0,wrap.clientHeight/2-player.y*scale))+'px';
 const mm=document.querySelector('#minimap'),mc=mm.getContext('2d');mc.imageSmoothingEnabled=false;mc.drawImage(bg,0,0,200,127);mc.fillStyle='#dd3c81';mc.fillRect((room?600:player.x)/6-3,(room?400:player.y)/6-3,6,6);mm.style.display=room?'none':'';
 if(!started){const t=document.querySelector('#titleScene'),tc=t.getContext('2d');tc.imageSmoothingEnabled=false;tc.drawImage(bg,0,0);for(let i=0;i<10;i++){const px=100+(i*137)%1030,py=130+(i*89)%520+(reduced?0:Math.sin(time*.6+i)*7);rect(px,py,2,2,'#ffe9eb88',tc)}}requestAnimationFrame(frame)}requestAnimationFrame(frame);
let started=false,room=null,roomObjects=[];
const roomReadButton=document.createElement('button');roomReadButton.className='room-exit room-read';roomReadButton.textContent='Read this room’s story ↗';roomReadButton.hidden=true;document.body.append(roomReadButton);roomReadButton.onclick=()=>showContent(room);
const exitButton=document.createElement('button');exitButton.className='room-exit';exitButton.textContent='↙ Back to town';exitButton.hidden=true;document.body.append(exitButton);exitButton.onclick=leaveRoom;
const layouts={
 about:{title:'Eli’s Dreamhouse',wall:'#f5b9d1',floor:'#f1d5cb',rug:'#e58db3',objects:[['My story','vanity',290,300],['Little joys','sofa',720,360],['Say hello','desk',490,230]]},
 education:{title:'The Academy',wall:'#d7bfe5',floor:'#e5d5c9',rug:'#b896ce',objects:[['My education','books',270,270],['Proud moments','trophy',790,270],['Leadership','desk',520,390]]},
 skills:{title:'The Data Studio',wall:'#badbd7',floor:'#e7dace',rug:'#93c2c2',objects:[['My toolkit','computer',290,280],['Analytics corner','chart',770,270],['Learning lab','desk',530,420]]},
 hobbies:{title:'The Pink Cinema & Bookshop',wall:'#dd9dc1',floor:'#dcc1c5',rug:'#c66b9f',objects:[['Movie night','screen',500,225],['My bookshelf','books',245,290],['The reading nook','sofa',790,380]]},
 goals:{title:'The Wishing Conservatory',wall:'#d4c4e3',floor:'#e9d9cf',rug:'#bd9acd',objects:[['Goals & dreams','flowers',285,310],['Milestones','trophy',780,280],['A purpose-driven life','desk',530,410]]},
 gallery:{title:'The Memory House',wall:'#f5cfae',floor:'#efd4be',rug:'#e3a7a9',objects:[['My photo album','photos',260,270],['Campus memories','photos',780,300],['Little adventures','sofa',510,420]]},
 projects:{title:'The Idea Atelier',wall:'#e8b7d0',floor:'#e4cfd1',rug:'#c88cae',objects:[['Things I’ve made','computer',280,280],['The inspiration board','chart',790,260],['What’s next','desk',530,420]]},
 contact:{title:'The Post Office',wall:'#f2b9c8',floor:'#eed7c4',rug:'#e294b2',objects:[['Send a little hello','desk',500,270],['Find me online','computer',265,390],['Letters & kindness','letters',800,350]]}
};
function begin(){started=true;document.body.classList.remove('intro');document.querySelector('#bootScreen').hidden=true;document.querySelector('#startScreen').hidden=true;window.Portfolio?.updateGuide();canvas.focus({preventScroll:true})}
function visit(id){if(!started)begin();keys.clear();path=[];activeBuilding=null;room=id;const l=layouts[id];roomObjects=l.objects.map(([name,type,x,y],i)=>({id:id+'-'+i,name,type,x,y,w:type==='screen'?210:type==='sofa'?160:115,h:type==='books'?120:type==='screen'?110:75,index:i}));player.x=600;player.y=610;exitButton.hidden=false;roomReadButton.hidden=false;document.querySelector('#questHint').innerHTML='✧ '+esc(l.title)+'<br><strong>Walk to an object. Press E to discover its story.</strong>';visited.add(id);document.querySelector('#progress').textContent=`${visited.size} / 8 PLACES DISCOVERED`;if(panel.open)panel.close();canvas.focus({preventScroll:true})}
function leaveRoom(){const p=places.find(p=>p.id===room);room=null;roomObjects=[];path=[];keys.clear();activeBuilding=null;player.x=p?p.x+p.w/2:600;player.y=p?p.y+p.h+35:470;exitButton.hidden=true;roomReadButton.hidden=true;document.querySelector('#questHint').innerHTML='♡ Follow your curiosity<br><strong>Click a building or walk to its door and press E.</strong>';window.Portfolio?.updateGuide();canvas.focus({preventScroll:true})}
function activateNear(){if(!near)return;if(room){if(near.id==='exit')leaveRoom();else inspectObject(near)}else visit(near.id)}
function inspectObject(o){window.Portfolio.inspect(room,o.index)}
function drawInterior(){const l=layouts[room],c=ctx;rect(0,0,1200,760,'#855672',c);rect(150,135,900,570,'#75475f',c);rect(168,150,864,535,l.floor,c);
 // Inlaid parquet floor and rose-colored walls.
 for(let y=320;y<680;y+=28)for(let x=170;x<1030;x+=80){rect(x+((y/28)%2)*25,y,78,1,'#b88c8e44',c);rect(x,y,1,28,'#b88c8e44',c)}
 rect(168,150,864,180,l.wall,c);rect(168,310,864,20,'#fff2e0',c);rect(170,160,8,515,'#fff0df',c);rect(1020,160,10,515,'#e7b7c8',c);rect(168,675,864,12,'#fff0df',c);
 for(let x=190;x<1020;x+=40){rect(x,165,1,140,'#ffffff30',c);text('✧',x+18,190,12,'#ffffff99',c);text('♡',x+18,265,10,'#ffffff66',c)}
 // Arched windows, curtains, a deep rug and an open exit.
 for(const x of [330,820]){rect(x,195,72,95,'#fff4e4',c);rect(x+7,202,58,80,'#b8dde2',c);rect(x+34,202,5,82,'#fff3e6',c);rect(x+7,238,58,5,'#fff3e6',c);rect(x-10,188,20,102,'#e18eb7',c);rect(x+65,188,20,102,'#e18eb7',c);rect(x-12,184,100,6,'#c27998',c);rect(x+13,210,9,45,'#ffffff55',c)}
 rect(390,460,420,150,l.rug,c);rect(399,470,402,130,'#ffffff22',c);for(let x=400;x<805;x+=14){rect(x,456,5,6,'#fff0df',c);rect(x,610,5,6,'#fff0df',c)}rect(460,485,280,100,'#ffffff20',c);text('♡',600,550,45,'#fff3e099',c);
 rect(565,675,70,20,'#d38aa6',c);rect(568,677,64,6,'#fce4cb',c);text('↓ TOWN',600,718,12,'#fff3e0',c);text(l.title.toUpperCase(),600,126,17,'#fff2e8',c);
 // Corner plants and scattered personal details.
 for(const x of [205,970]){if(decorReady){drawDecor(c,6,x-9,499,58,102);continue;}rect(x,560,34,32,'#cf8f9f',c);rect(x+4,555,26,9,'#f3b8c6',c);rect(x+14,520,5,38,'#739b74',c);rect(x-4,525,20,12,'#8ab693',c);rect(x+17,510,22,13,'#75a78a',c);rect(x+7,501,18,17,'#9cc39c',c)}
 for(const o of roomObjects){let{x,y,w,h,type}=o;if(spriteReady&&furnitureIndex[type]!==undefined){drawArt(c,furnitureIndex[type],x-13,y-45,w+26,h+55);text(o.name,x+w/2,y+h+24,11,'#7b4d67',c);text(near===o?'[ E ]':'✧',x+w/2,y-52,12,'#a65b85',c);continue;}rect(x+7,y+h-2,w+10,12,'#7d526d2b',c);
 if(type==='books'){rect(x,y,w,h,'#c28b91',c);rect(x+6,y+5,w-12,h-10,'#fff0df',c);for(let row=0;row<3;row++){for(let i=0;i<9;i++)rect(x+10+i*11,y+12+row*35,8,24-(i%3)*3,['#bca3d1','#e5a0b8','#e8c393','#8fb5ac'][i%4],c);rect(x+4,y+39+row*35,w-8,5,'#bd8a91',c)}}
 else if(type==='computer'||type==='desk'){rect(x,y+40,w,12,'#fff0de',c);rect(x+6,y+51,8,24,'#bb8295',c);rect(x+w-14,y+51,8,24,'#bb8295',c);if(type==='computer'){rect(x+17,y,78,43,'#856481',c);rect(x+22,y+5,68,32,'#b9dbd6',c);text(room==='skills'?'{ data ♡ }':'hello, world',x+56,y+25,8,'#678b8c',c);rect(x+48,y+42,15,5,'#8f6c8c',c);rect(x+25,y+49,55,5,'#d7acbd',c)}else{rect(x+15,y+18,43,26,'#fff9ed',c);for(let k=0;k<3;k++)rect(x+21,y+25+k*5,30,1,'#c99bad',c);rect(x+80,y+20,15,23,'#e590b1',c);rect(x+94,y+24,5,11,'#d6779b',c)}rect(x+45,y+80,35,22,'#d898b4',c)}
 else if(type==='sofa'){rect(x,y+15,w,45,'#dc88ab',c);rect(x+10,y,w-20,55,'#eda7c4',c);rect(x+15,y+35,w-30,24,'#f8bfd5',c);rect(x,y+14,16,51,'#d785a9',c);rect(x+w-16,y+14,16,51,'#d785a9',c);rect(x+25,y+10,26,22,'#fff1d5',c);rect(x+w-53,y+11,24,22,'#c3abc9',c);rect(x+9,y+65,6,10,'#a17083',c);rect(x+w-16,y+65,6,10,'#a17083',c)}
 else if(type==='screen'){rect(x-6,y-6,w+12,h+12,'#fff0da',c);rect(x,y,w,h,'#805f7c',c);rect(x+6,y+6,w-12,h-12,'#bb99b9',c);text('ELI’S PICTURE HOUSE',x+w/2,y+42,12,'#fff2e5',c);text('▶',x+w/2,y+80,28,'#fff2e5',c);for(let i=0;i<3;i++){rect(x+i*70,y+h+45,50,30,'#bc6b97',c);rect(x+4+i*70,y+h+40,42,20,'#dd94b5',c)}}
 else if(type==='vanity'){rect(x+18,y-45,80,87,'#fff0da',c);rect(x+24,y-39,68,72,'#b9d8de',c);rect(x+33,y-30,10,45,'#e2eef0',c);rect(x,y+40,w,15,'#f6c2d5',c);rect(x+9,y+55,8,20,'#b17b97',c);rect(x+w-18,y+55,8,20,'#b17b97',c);rect(x+12,y+21,10,17,'#df779e',c);rect(x+90,y+27,13,12,'#c5a3cb',c)}
 else if(type==='photos'){rect(x,y,w,h,'#bd8695',c);rect(x+5,y+5,w-10,h-10,'#ead2bf',c);for(let i=0;i<3;i++){rect(x+10+i*32,y+13+(i%2)*14,27,40,'#fff9e8',c);rect(x+13+i*32,y+16+(i%2)*14,21,27,['#aac8c3','#d7a8c7','#bda5d3'][i],c);text('♡',x+23+i*32,y+36+(i%2)*14,12,'#fff5e7',c)}}
 else if(type==='chart'){rect(x,y,w,h,'#fff2df',c);rect(x+5,y+5,w-10,h-10,'#f6e1df',c);for(let i=0;i<4;i++)rect(x+15+i*23,y+55-i*10,14,12+i*10,['#df94b3','#b59dca','#92bfb7','#dfb48e'][i],c);rect(x+7,y+h-8,w-14,2,'#c398a4',c)}
 else if(type==='trophy'){rect(x,y+55,w,20,'#e5bfac',c);for(let i=0;i<3;i++){rect(x+12+i*33,y+12+(i%2)*10,24,17,'#e7c781',c);rect(x+19+i*33,y+29+(i%2)*10,10,18,'#d2ad69',c);rect(x+14+i*33,y+45+(i%2)*8,22,5,'#f7d88e',c);text('★',x+24+i*33,y+25+(i%2)*10,13,'#fff1ba',c)}}
 else if(type==='flowers'){rect(x,y+40,w,35,'#e7a6ba',c);for(let i=0;i<6;i++){rect(x+10+i*18,y+10,4,40,'#7ba78b',c);rect(x+4+i*18,y+8,15,12,['#db8bba','#ffeac2','#c7a1d2'][i%3],c);rect(x+9+i*18,y+12,4,4,'#fce8ab',c)}}
 else{rect(x,y+15,w,h-15,'#f4dfd4',c);for(let i=0;i<4;i++){rect(x+8+i*24,y+25,20,28,'#fff9e9',c);text('♡',x+18+i*24,y+42,12,'#d982a6',c)}}
 text(o.name,x+w/2,y+h+24,11,'#7b4d67',c);const close=near===o;text(close?'[ E ]':'✧',x+w/2,y-17,close?12:15,'#a65b85',c)}
}
const preload=['img/dreamtown-decor.png','img/dreamtown-sprites.png','img/me-nobg.png',...C.mediaItems.map(m=>'.'+m.image),...C.galleryItems.map(m=>'.'+m.image)];let loaded=0;
const assetLoads=preload.map(src=>new Promise(resolve=>{const image=new Image();image.onload=image.onerror=()=>{loaded++;const n=Math.round(loaded/preload.length*100);document.querySelector('#loadingFill').style.width=n+'%';document.querySelector('#loadingLabel').textContent=n+'%';document.querySelector('.loading-track').setAttribute('aria-valuenow',n);resolve()};image.src=src}));
Promise.all([...assetLoads,document.fonts.ready]).then(()=>{const title=document.querySelector('#startScreen');title.classList.add('is-ready');const finish=()=>{document.querySelector('#startGame').disabled=false;document.querySelector('#readPortfolioStart').disabled=false;document.querySelector('#bootScreen').hidden=true;if(!started)document.querySelector('#startGame').focus({preventScroll:true})};if(reduced)finish();else title.addEventListener('animationend',finish,{once:true})});
document.querySelector('#startGame').onclick=begin;
function enrichGround(){
 const data=g.getImageData(0,0,1200,760).data;let n=97;const random=()=>{n=(n*16807)%2147483647;return n/2147483647};
 for(let y=0;y<760;y+=3)for(let x=0;x<1200;x+=3){const i=(y*1200+x)*4,r=data[i],green=data[i+1],b=data[i+2];
 if(green>r+12&&green>b+20&&random()<.18){const p=random();rect(x,y,1,p>.8?3:1,p>.5?'#9fbf9444':'#e1eac344');if(p>.94){rect(x-1,y+2,1,1,'#729b7944');rect(x+1,y+2,1,1,'#729b7944')}}
 if(r===245&&green===225&&b===204){if(y%12===0)rect(x,y,3,1,'#ddc6b5');if((x+(Math.floor(y/12)%2)*12)%24===0)rect(x,y,1,3,'#dfc8b7');if(random()<.03)rect(x,y,2,1,'#fff1dd')}
 }
 // Stepping stones, scattered petals, and neatly tended flower borders.
 for(const p of places){const cx=p.x+p.w/2;if(p.y<360)for(let y=p.y+p.h+17;y<350;y+=13){rect(cx-12,y,25,6,'#d6bdb0');rect(cx-11,y,23,4,'#f4ddcc');rect(cx-8,y+1,7,1,'#fff0dc')}
 for(let i=0;i<6;i++){const xx=p.x-9+i*30;rect(xx,p.y+p.h+14,3,2,'#edb3cb');rect(xx+5,p.y+p.h+19,2,1,'#f6c8d8')}}
 for(const [x,y]of[[120,427],[1080,348],[870,550],[360,643]]){rect(x,y,25,3,'#7a786e33');rect(x+7,y-9,10,10,'#e4c1bc');rect(x+9,y-14,7,7,'#f2d4cd');rect(x+15,y-13,4,3,'#b3897c');rect(x+4,y-5,7,4,'#cfaaa6');rect(x+10,y,1,4,'#99766c');rect(x+16,y,1,4,'#99766c')}
}
function interiorDetails(){const c=ctx,l=layouts[room];
 // Fine-grain parquet joints, rug stitching, wallpaper rosettes.
 for(let y=350;y<665;y+=28)for(let x=186;x<1010;x+=80){if(x>380&&x<820&&y>450&&y<620)continue;rect(x+8,y+5,18,1,'#ac7e8330',c);rect(x+40,y+19,27,1,'#fff4e644',c);rect(x+3,y+24,50,1,'#a982821a',c)}
 for(let x=415;x<790;x+=18){rect(x,477,3,3,'#fbe4d488',c);rect(x,593,3,3,'#fbe4d488',c)}for(let y=490;y<595;y+=18){rect(406,y,3,3,'#fbe4d488',c);rect(791,y,3,3,'#fbe4d488',c)}
 // Framed personal wall art, crown molding and a room clock.
 rect(169,151,861,4,'#fff0dc',c);rect(169,157,861,2,'#a8768a44',c);rect(169,303,861,2,'#a8768a44',c);
 for(const x of [220,950]){rect(x,212,40,52,'#b17b90',c);rect(x+3,215,34,46,'#fcebd6',c);rect(x+7,219,26,32,l.rug,c);text('✿',x+20,241,20,'#ffead7',c);rect(x+12,255,16,1,'#bf9b95',c)}
 rect(586,178,28,28,'#b98a98',c);rect(589,181,22,22,'#fff0df',c);rect(599,185,1,9,'#9c7087',c);rect(599,194,7,1,'#9c7087',c);rect(596,177,8,2,'#d7b485',c);
 for(const o of roomObjects){const{x,y,w,h,type}=o;if(spriteReady&&furnitureIndex[type]!==undefined)continue;
 if(['desk','computer','vanity'].includes(type)){rect(x+4,y+48,w-8,1,'#ae7b9144',c);for(let i=0;i<3;i++){rect(x+9+i*13,y+55,10,13,'#f2c3d14d',c);rect(x+13+i*13,y+60,2,2,'#aa728b',c)}rect(x+w-10,y+45,3,22,'#b78d9a66',c);rect(x+60,y+38,10,3,'#97af9f',c);rect(x+63,y+27,2,11,'#78a28b',c);rect(x+60,y+23,8,5,'#e68fb4',c)}
 if(type==='computer'){for(let i=0;i<4;i++){rect(x+27,y+11+i*5,13+(i%2)*22,1,i%2?'#6e9ca1':'#8e8cab',c)}for(let j=0;j<3;j++)for(let i=0;i<10;i++)rect(x+27+i*5,y+49+j*2,3,1,'#ab7e9644',c)}
 if(type==='sofa'){for(let i=1;i<4;i++)rect(x+14+i*32,y+36,1,20,'#c1739c55',c);for(let xx=0;xx<3;xx++){rect(x+28+xx*6,y+15,2,2,'#d793b1',c);rect(x+w-45+xx*5,y+19,2,2,'#fff2db',c)}rect(x+22,y+79,w-44,17,'#f0d5bd',c);rect(x+27,y+95,4,9,'#9f7783',c);rect(x+w-31,y+95,4,9,'#9f7783',c);rect(x+35,y+80,23,12,'#b998b8',c);rect(x+37,y+80,2,12,'#eac9d3',c);rect(x+89,y+78,12,10,'#fff0dd',c)}
 if(type==='books'){for(let row=0;row<3;row++)for(let i=0;i<9;i++){rect(x+12+i*11,y+15+row*35,3,1,'#fff5df99',c);rect(x+12+i*11,y+29+row*35,3,1,'#fff5df66',c)}rect(x+3,y+4,2,h-7,'#f0ccb9',c)}
 if(type==='letters'){for(let i=0;i<4;i++){rect(x+11+i*24,y+28,12,1,'#e5c9c4',c);rect(x+11+i*24,y+31,9,1,'#e5c9c4',c);rect(x+22+i*24,y+26,3,4,'#dd8ba9',c)}}
 }
 // Tiny trailing vines and an umbrella stand beside the entrance.
 for(let i=0;i<7;i++){rect(180+i*4,333+i*7,2,7,'#719b84',c);rect(177+i*4,338+i*7,8,4,i%2?'#94b299':'#82a98a',c)}rect(930,620,25,33,'#cc93a9',c);rect(934,614,3,27,'#b494ad',c);rect(945,610,3,31,'#ead2b7',c);rect(934,610,10,3,'#b494ad',c);
}
// Build the detailed static scenery once; animated characters render above it.
seed=47;paintWorld();enrichGround();

const furnitureIndex={sofa:8,books:9,computer:10,vanity:11,screen:12,photos:13,trophy:14,desk:15,letters:15};
function drawArt(target,index,x,y,w,h){const crops=[[0,0,317,350],[322,0,297,350],[623,40,313,310],[944,0,310,350],[0,350,319,325],[320,350,305,320],[638,350,294,320],[945,350,309,320],[0,695,341,250],[350,670,262,275],[636,680,307,267],[970,670,284,284],[10,946,320,288],[338,958,292,279],[638,945,306,291],[948,953,306,284]];const a=crops[index];target.imageSmoothingEnabled=false;target.drawImage(spriteAtlas,...a,Math.round(x),Math.round(y),Math.round(w),Math.round(h))}

spriteAtlas.onload=()=>{spriteReady=true;seed=47;paintWorld();enrichGround()};spriteAtlas.src='img/dreamtown-sprites.png';

function drawDecor(target,index,x,y,w,h){const cols=4,rows=2,sw=decorAtlas.naturalWidth/cols,sh=decorAtlas.naturalHeight/rows;target.imageSmoothingEnabled=false;target.drawImage(decorAtlas,index%4*sw,Math.floor(index/4)*sh,sw,sh,Math.round(x),Math.round(y),Math.round(w),Math.round(h))}
decorAtlas.onload=()=>{decorReady=true;seed=47;paintWorld();enrichGround()};decorAtlas.src='img/dreamtown-decor.png';
