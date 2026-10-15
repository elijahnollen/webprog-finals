// Fictional town hosts provide wayfinding; portfolio facts live in portfolio.js.
(()=>{
 const labels={about:'ABOUT ELI',education:'BACKGROUND',skills:'SKILLS',hobbies:'INTERESTS',goals:'DIRECTION',gallery:'GALLERY',projects:'PROJECTS',contact:'CONTACT'};
 const props={about:[11,8,15],education:[9,14,15],skills:[10,9,15],hobbies:[12,9,8],goals:[14,8,15],gallery:[13,13,8],projects:[10,13,15],contact:[15,9,10]};
 const residents=[
 {id:'npc-poppy',npc:true,name:'Poppy',role:'Town guide',x:676,y:457,hair:'#88564d',skin:'#eac0a0',dress:'#c35d91',to:'about',line:'Welcome to Dreamtown! The open rooms are little previews of Eli’s portfolio. Click a room to walk to its entrance, then explore the full interior. Start at the Dreamhouse to meet Eli.'},
 {id:'npc-june',npc:true,name:'June',role:'Studio host',x:815,y:341,hair:'#413d56',skin:'#c28d74',dress:'#638f94',to:'projects',line:'Looking for Eli’s work? The Idea Atelier brings together election analytics, TechZone, JOSE, and her current quality assurance work with Wireless Access for Health. Each project explains her contribution.'},
 {id:'npc-bea',npc:true,name:'Bea',role:'Gallery keeper',x:360,y:405,hair:'#ad754f',skin:'#f2c8b0',dress:'#a884b8',to:'gallery',line:'The Memory House holds Eli’s photographs, campus moments, and little adventures. Inside, the framed boards lead to the gallery. Select a photograph to see its original detail.'},
 {id:'npc-lumi',npc:true,name:'Lumi',role:'Postmaster',x:1033,y:351,hair:'#684952',skin:'#d4a080',dress:'#d8839c',to:'contact',line:'The Post Office is your stop for getting in touch with Eli. You can find her contact details and professional profiles there. Every building has a sign showing the portfolio section it contains.'}
 ];
 function building(p){const{x,y,w,h,color,roof}=p,c=g;
  rect(x+6,y+10,w+9,h+12,'#56775d33',c);rect(x-5,y-37,w+10,h+45,'#9e6d80',c);
  rect(x,y-34,w,h+38,'#f1d5c5',c);
  // Exposed back wall, wallpaper, baseboard, and parquet flooring.
  rect(x,y-34,w,47,color,c);for(let xx=x+9;xx<x+w;xx+=16){rect(xx,y-30,1,39,'#fff2e65c',c);text('·',xx+6,y-17,9,'#ffffff99',c)}
  rect(x,y+10,w,4,'#fff1dc',c);
  for(let yy=y+17;yy<y+h;yy+=12)for(let xx=x;xx<x+w;xx+=27){rect(xx,yy,26,1,'#c497984d',c);rect(xx+(yy%24?10:0),yy,1,12,'#b88c8d44',c)}
  rect(x+28,y+39,w-56,43,roof,c);rect(x+32,y+43,w-64,35,'#fff0df55',c);rect(x+40,y+48,w-80,1,'#ffe8d6',c);
  // Windows, a framed print, shelves, and warm wall lamps.
  for(const xx of [x+15,x+w-38]){rect(xx,y-27,24,29,'#fff1dc',c);rect(xx+3,y-24,18,23,'#a5ccd1',c);rect(xx+11,y-24,2,23,'#fff1dc',c);rect(xx+3,y-13,18,2,'#fff1dc',c);rect(xx-3,y-27,4,30,roof,c);rect(xx+23,y-27,4,30,roof,c)}
  rect(x+w/2-10,y-28,20,24,'#ad7b8e',c);rect(x+w/2-7,y-25,14,18,'#fff1db',c);text(p.icon,x+w/2,y-12,12,roof,c);
  if(spriteReady){const list=props[p.id],positions=[[x+5,y+4,46,50],[x+w-54,y+7,48,49],[x+w/2-25,y+45,50,43]];layouts[p.id].objects.forEach((o,i)=>{const box=positions[i];if(!window.RoomArt.draw(c,o[1],...box))drawArt(c,list[i],...box)})}
  else{rect(x+10,y+18,32,23,roof,c);rect(x+w-44,y+18,32,23,roof,c)}
  // Cutaway side walls and a low front wall leave the doorway clearly open.
  rect(x-5,y-37,5,h+45,'#fff0dd',c);rect(x+w,y-37,5,h+45,'#c28fa2',c);
  rect(x-5,y+h-6,w/2-15,13,color,c);rect(x+w/2+20,y+h-6,w/2-15,13,color,c);
  rect(x-5,y+h-9,w/2-15,3,'#fff0dd',c);rect(x+w/2+20,y+h-9,w/2-15,3,'#fff0dd',c);
  rect(x+w/2-20,y+h+2,40,6,'#fff0db',c);rect(x+w/2-24,y+h+8,48,5,'#d3aaa9',c);
  text('↓',x+w/2,y+h+28,15,'#9b5076',c);
  if(decorReady){drawDecor(c,6,x-15,y+h-28,25,40);drawDecor(c,6,x+w-8,y+h-28,25,40)}
  return true;
 }
 function markers(){for(const p of places){const x=p.x+p.w/2,y=p.y-61,label=labels[p.id],w=Math.max(100,label.length*7+26),c=ctx;rect(x-w/2+5,y+6,3,15,'#a78383',c);rect(x+w/2-8,y+6,3,15,'#a78383',c);rect(x-w/2-2,y-13,w+4,25,'#86566e',c);rect(x-w/2,y-15,w,25,'#fff0d8',c);rect(x-w/2+2,y-13,w-4,1,'#fff9e8',c);rect(x-w/2+2,y+7,w-4,1,'#d6b7a7',c);for(const xx of [x-w/2+5,x+w/2-7])rect(xx,y-5,2,2,'#d3a776',c);c.fillStyle='#79506a';c.font='7px "Press Start 2P",monospace';c.textAlign='center';c.fillText(label,x,y+1);if(visited.has(p.id)){rect(x+w/2-6,y-18,7,7,'#709a81',c);rect(x+w/2-4,y-16,3,3,'#d3e8bf',c)}}}

 function character(n,t){window.NPCArt.draw(ctx,n.id,n.x,n.y,t);rect(n.x-13,n.y-72,26,16,'#9e7083',ctx);rect(n.x-14,n.y-74,26,16,'#fff8eb',ctx);rect(n.x-3,n.y-58,4,4,'#fff8eb',ctx);text('···',n.x-1,n.y-63,12,'#a35d80',ctx);text(n.name.toUpperCase(),n.x,n.y+18,8,'#70425e',ctx)}
 function talk(n){activeBuilding=null;body.className='npc-body';panel.classList.remove('portfolio-panel');show(n.role+' · '+n.name,`<div class="npc-intro"><canvas id="npcPortrait" class="npc-avatar" width="64" height="72" aria-label="${window.NPCArt.description(n.id)}"></canvas><div><small>DREAMTOWN RESIDENT</small><h2>${n.name} · ${n.role}</h2></div></div><p>${n.line}</p><div class="npc-actions"><button class="primary" id="npcVisit">Enter ${places.find(p=>p.id===n.to).name} ↗</button><button class="pill" id="npcRead">Read ${labels[n.to].toLowerCase()}</button><button class="pill" id="npcBye">Keep exploring</button></div><small class="npc-note">A fictional host to help you explore Eli’s portfolio.</small>`);window.NPCArt.portrait(document.querySelector('#npcPortrait'),n.id);document.querySelector('#npcVisit').onclick=()=>visit(n.to);document.querySelector('#npcRead').onclick=()=>showContent(n.to);document.querySelector('#npcBye').onclick=()=>panel.close()}
 function hosts(){body.className='npc-body';panel.classList.remove('portfolio-panel');show('Meet the residents',`<h2>Your Dreamtown hosts</h2><p>Walk up to a resident and press E, click their character, or choose a host here.</p><div class="resident-list">${residents.map(n=>`<button class="pill resident-card" data-host="${n.id}" aria-label="${n.name} · ${n.role} ↗"><canvas class="resident-portrait" width="64" height="72" data-portrait="${n.id}" aria-hidden="true"></canvas><span><strong>${n.name} · ${n.role} ↗</strong><small>${window.NPCArt.description(n.id)}</small></span></button>`).join('')}</div>`);body.querySelectorAll('[data-portrait]').forEach(c=>window.NPCArt.portrait(c,c.dataset.portrait));body.querySelectorAll('[data-host]').forEach(b=>b.onclick=()=>talk(residents.find(n=>n.id===b.dataset.host)))}
 window.TownLife={building,markers,talk,draw:t=>residents.forEach(n=>character(n,t)),hit:(x,y)=>residents.find(n=>Math.abs(n.x-x)<20&&y>n.y-78&&y<n.y+20),near:p=>residents.find(n=>Math.hypot(n.x-p.x,n.y+22-p.y)<43)};
 const button=document.createElement('button');button.className='pill residents-button';button.textContent='Meet residents';button.onclick=hosts;document.querySelector('.header-right').prepend(button);
 document.querySelector('#questHint').innerHTML='♡ Welcome to Dreamtown<br><strong>Click an open room to enter. Talk to residents with E.</strong>';
 document.querySelector('.map-note').textContent='✧ open rooms · friendly hosts';
 document.querySelector('.game-bottom span:last-child').textContent='Click an open room or resident to explore ↗';
 seed=47;paintWorld();enrichGround();
})();
