// Original scene dressing: detailed props, small architectural details and atmosphere.
(()=>{
 const atlas=new Image(),order=['journal','podium','server','workbench','bookcart','readingchair','timeline','telescope','camera','album','blueprint','kanban','testbench','mailcounter','pigeonholes','parcels'];let ready=false;
 window.DetailedProps={draw(c,type,x,y,w,h){const i=order.indexOf(type);if(!ready||i<0)return false;const crops=[[0,0,318,312],[345,0,270,311],[637,12,294,296],[949,15,300,297],[15,320,282,288],[320,313,307,298],[635,326,304,278],[949,315,295,302],[25,620,273,295],[299,652,329,272],[632,610,306,308],[972,624,278,300],[2,930,313,319],[324,940,300,309],[637,925,300,326],[949,926,305,325]];c.imageSmoothingEnabled=false;c.drawImage(atlas,...crops[i],Math.round(x-6),Math.round(y-8),Math.round(w+12),Math.round(h+14));return true}};
 atlas.onload=()=>{ready=true;seed=47;paintWorld();enrichGround()};atlas.src='img/dreamtown-props-v2.png';
 function world(c){
  // Curated borders around each open room, painted masonry, vines and doorstep mosaics.
  for(const p of places){const{x,y,w,h,roof}=p;
   for(let xx=x-4;xx<x+w+3;xx+=9){rect(xx,y-39,7,2,'#fff4de',c);rect(xx,y-36,7,1,'#ba8b9a',c)}
   for(const xx of [x-6,x+w+1]){rect(xx,y-34,2,h+36,'#76556733',c);for(let yy=y-27;yy<y+h-8;yy+=13){rect(xx-2,yy,6,1,'#fff4df',c);rect(xx,yy+1,2,3,'#c39d9a',c)}}
   for(const xx of [x+8,x+w-13]){rect(xx,y+h-10,5,7,'#a27d89',c);rect(xx-2,y+h-16,9,7,'#dec993',c);rect(xx,y+h-15,5,4,'#fff3be',c)}
   rect(x+w/2-18,y+h+14,36,11,roof+'99',c);for(let xx=x+w/2-15;xx<x+w/2+16;xx+=6)rect(xx,y+h+17,3,1,'#fff0d2',c);
   for(let i=0;i<7;i++){const xx=x+w+7+(i%2)*3,yy=y-23+i*6;rect(xx,yy,2,6,'#719878',c);rect(xx-3,yy+2,7,3,i%2?'#94b092':'#80a282',c);if(i%3===0)rect(xx-2,yy+1,3,2,'#efb0cb',c)}
   // Different little details reflect the purpose of each building.
   if(p.id==='contact'){rect(x-21,y+h-13,13,17,'#c883a4',c);rect(x-23,y+h-16,17,6,'#dca5be',c);rect(x-18,y+h-12,8,2,'#78556c',c);rect(x-17,y+h+4,3,11,'#a2837b',c)}
   if(p.id==='hobbies'){for(let i=0;i<9;i++){rect(x+8+i*16,y-38,3,3,i%2?'#fff3c1':'#e6bc79',c)}rect(x+w-22,y+h+17,30,14,'#fff0d8',c);text('★',x+w-7,y+h+28,10,roof,c)}
   if(p.id==='skills'){rect(x-20,y+h-13,13,22,'#88aaa2',c);rect(x-17,y+h-9,7,5,'#cbe0d1',c);rect(x-17,y+h+1,7,2,'#fff0ce',c)}
   if(p.id==='goals'){for(let i=0;i<6;i++){rect(x+12+i*21,y+h+25,6,3,'#d49cb9',c);rect(x+14+i*21,y+h+22,2,9,'#a2b98d',c)}}
  }
  // Tiny garden paths and flowering patches keep the open lawn from feeling empty.
  for(const[x,y]of[[78,280],[1110,275],[300,625],[650,620],[910,290]]){for(let i=0;i<5;i++){const xx=x+(i*13)%31,yy=y+Math.floor(i/3)*9;rect(xx,yy,3,5,'#84a77d',c);rect(xx-2,yy-1,7,2,'#f0bdd0',c);rect(xx+1,yy-3,2,6,'#f0bdd0',c);rect(xx+1,yy-1,2,2,'#fff2be',c)}}
 }
 function roomDetails(c,id){const p=places.find(p=>p.id===id),r=(x,y,w,h,col)=>rect(x,y,w,h,col,c);
  // Sunlight is painted in stepped bands so it belongs to the pixel scene.
  for(const xx of [330,820])for(let i=0;i<8;i++)r(xx+13+i*8,333+i*12,48,12,'#fff3ce0b');
  // Decorative corner props sit outside the navigation and interactive object footprints.
  if(decorReady){drawDecor(c,7,845,570,100,78);drawDecor(c,6,235,570,45,70)}
  r(190,344,22,7,'#b7879e');r(194,349,14,17,'#dca7bb');r(198,351,6,10,'#fff0dc');
  // Each room gets a distinct wall feature, rather than repeated framed hearts.
  if(id==='education'){r(463,211,150,63,'#b9928d');r(468,216,140,52,'#75988c');text('LEARN & GROW',538,237,11,'#eff0d5',c);for(let i=0;i<3;i++)r(482,246+i*6,80-i*12,1,'#cfdecb');r(475,271,130,4,'#dfbf9f')}
  if(id==='skills'){r(447,215,140,54,'#a3b6b4');r(451,219,132,45,'#d2dfd5');for(let i=0;i<5;i++){r(465+i*21,250-i*5,11,10+i*5,['#a6b4c7','#c59fb8','#9dbfb0'][i%3])}}
  if(id==='hobbies'){r(180,162,20,142,'#b96590');r(1000,162,20,142,'#b96590');for(let yy=167;yy<302;yy+=11){r(183,yy,3,8,'#d394b4');r(1006,yy,3,8,'#8d4772')}for(let xx=200;xx<1000;xx+=29)r(xx,158,4,4,'#ffe6a1')}
  if(id==='goals'){for(let i=0;i<15;i++){r(457+i*8,248-Math.floor(Math.sin(i/14*Math.PI)*50),9,4,'#88aa92');if(i%3===0)r(457+i*8,245-Math.floor(Math.sin(i/14*Math.PI)*50),6,4,'#e6a7ca')}r(451,252,5,48,'#88aa92');r(574,252,5,48,'#88aa92')}
  if(id==='gallery'){for(let i=0;i<3;i++){const xx=465+i*48;r(xx,216,35,43,'#b99180');r(xx+3,219,29,37,'#fff0da');r(xx+6,222,23,25,['#c5b0cc','#b8d2c4','#dbb3bb'][i]);text('✧',xx+17,240,12,'#fff1dc',c)}}
  if(id==='projects'){r(459,211,145,61,'#c79b8e');r(463,215,137,53,'#e6cdb6');for(let i=0;i<8;i++){const xx=471+(i%4)*31,yy=221+Math.floor(i/4)*24;r(xx,yy,23,17,[p.color,'#bfd4c2','#c8b8d8'][i%3]);r(xx+4,yy+5,15,1,'#fff5e0');r(xx+4,yy+9,11,1,'#fff5e0')}}
  if(id==='contact'){r(456,215,145,53,'#bd9588');r(460,219,137,45,'#f0d9c5');text('POST & PARCEL',528,237,10,'#9c607b',c);for(let i=0;i<5;i++){r(473+i*24,246,15,10,'#fff4de');r(477+i*24,249,7,1,'#cb9ba6')}}
 }
 function atmosphere(c,t){if(reduced)return;for(let i=0;i<12;i++){const x=90+(i*173)%1030+Math.sin(t*.24+i)*9,y=120+((i*83+t*7)%535);c.globalAlpha=.35+Math.sin(t+i)*.15;rect(x,y,3,1,'#fff2dd',c);rect(x+1,y-1,1,3,'#f8d5df',c)}c.globalAlpha=1}
 window.ScenePolish={world,roomDetails,atmosphere};
})();
