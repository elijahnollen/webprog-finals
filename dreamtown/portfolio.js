/* One canonical home for each part of the portfolio, shared by the guide and game rooms. */
(() => {
  const sections = [
    {id:'about', label:'About', title:'Hi, I’m Eli.', description:'The person behind the portfolio.'},
    {id:'projects', label:'Selected work', title:'Selected work', description:'What I worked on, and where I contributed.'},
    {id:'skills', label:'Skills', title:'My toolkit', description:'Technologies I have used and areas I am developing.'},
    {id:'education', label:'Background', title:'Education & leadership', description:'The experiences behind my work.'},
    {id:'contact', label:'Contact', title:'Let’s connect.', description:'For projects, collaboration, or a conversation.'},
    {id:'gallery', label:'Gallery', title:'Life in snapshots', description:'People, places, and moments outside the task list.'},
    {id:'hobbies', label:'Interests', title:'Off the clock', description:'A few stories I keep coming back to.'},
    {id:'goals', label:'Direction', title:'What I’m working toward', description:'The values that guide my next steps.'}
  ];
  const skillGroups = [
    {id:'analytics',name:'Data & analytics',description:'Preparing data, exploring patterns, and communicating what the data means.',names:['Power BI','SQL','Python','SAP']},
    {id:'web',name:'Web foundations',description:'Building interfaces and understanding how a web experience fits together.',names:['HTML','CSS']},
    {id:'systems',name:'Systems & networking',description:'Tools I have explored through computer science coursework.',names:['Linux','Packet Tracer']}
  ];
  const gallery = [
    {image:'img/minnie.jpg',title:'A little everyday magic',category:'personal',caption:'From my original personal photo collection.'},
    {image:'img/JPCS_general_assembly.JPG',title:'JPCS general assembly',category:'campus',caption:'A moment with the campus community.'},
    {image:'img/sea.jpg',title:'A change of scenery',category:'personal',caption:'Time by the sea.'},
    {image:'img/layag.jpg',title:'Layag Films',category:'campus',caption:'A memory from Layag Films Production.'},
    {image:'img/paragliding.jpg',title:'A different perspective',category:'personal',caption:'A paragliding adventure.'},
    {image:'img/rai.jpg',title:'A moment worth keeping',category:'personal',caption:'From my original personal photo collection.'}
  ];
  const imageCache = new Map();
  let activeSection = 'about';
  let activeProject = null;
  const professionalFlow=['about','projects','skills','education','contact'];
  const visitedSections = new Set();
  const localImage = src => src.startsWith('/') ? '.'+src : src;
  const tags = list => '<div class="tags">'+list.map(t=>'<span>'+esc(t)+'</span>').join('')+'</div>';
  const link = item => `<a class="text-link" href="${esc(item.url)}" target="_blank" rel="noopener">${esc(item.label)} ↗</a>`;
  function pixel(src,alt,kind='photo',extra='') {
    return `<span class="pixel-media ${kind} ${extra}"><img data-pixel="${kind}" src="${esc(localImage(src))}" alt="${esc(alt)}" loading="lazy" decoding="async"></span>`;
  }
  function paintPixelImage(img) {
    if (!img.complete || !img.naturalWidth || img.dataset.painted) return;
    img.dataset.painted='pending';
    // Decode a detached source so layout and lazy-loading cannot crop the bitmap.
    const source=new Image();
    source.onload=()=>{
      const kind=img.dataset.pixel, longest=kind==='logo'?40:kind==='portrait'?128:180;
      const ratio=source.naturalWidth/source.naturalHeight;
      const display=document.createElement('canvas');
      display.width=ratio>=1?longest:Math.max(1,Math.round(longest*ratio));
      display.height=ratio>=1?Math.max(1,Math.round(longest/ratio)):longest;
      display.setAttribute('aria-hidden','true');
      const c=display.getContext('2d');c.imageSmoothingEnabled=true;c.imageSmoothingQuality='high';
      c.drawImage(source,0,0,source.naturalWidth,source.naturalHeight,0,0,display.width,display.height);
      if(img.isConnected){img.after(display);img.dataset.painted='true';img.classList.add('pixel-original')}
    };
    source.onerror=()=>{img.dataset.painted='';};
    source.src=img.currentSrc||img.src;
  }
  function hydrate() {
    body.querySelectorAll('img[data-pixel]').forEach(img=>{
      img.addEventListener('load',()=>paintPixelImage(img),{once:true});
      img.addEventListener('error',()=>{img.parentElement.classList.add('media-error')},{once:true});
      paintPixelImage(img);
    });
    body.querySelectorAll('[data-section]').forEach(b=>b.onclick=()=>showSection(b.dataset.section));
    body.querySelectorAll('[data-project]').forEach(b=>b.onclick=()=>projectDetail(b.dataset.project));
    body.querySelectorAll('[data-gallery-filter]').forEach(b=>b.onclick=()=>showSection('gallery',{filter:b.dataset.galleryFilter}));
    body.querySelectorAll('[data-skill-filter]').forEach(b=>b.onclick=()=>showSection('skills',{group:b.dataset.skillFilter}));
    body.querySelectorAll('[data-interest]').forEach(b=>b.onclick=()=>showSection('hobbies',{type:b.dataset.interest}));
    body.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>openPhoto(b.dataset.photo,b.dataset.caption));
    body.querySelectorAll('[data-room]').forEach(b=>b.onclick=()=>visit(b.dataset.room));
    body.querySelectorAll('[data-close-portfolio]').forEach(b=>b.onclick=()=>panel.close());
    body.querySelectorAll('[data-guestbook]').forEach(b=>b.onclick=()=>window.Guestbook.open());
  }
  function chrome(id,content) {
    const n=sections.findIndex(s=>s.id===id),s=sections[n];const nextId=id==='goals'?'contact':professionalFlow.includes(id)?professionalFlow[professionalFlow.indexOf(id)+1]:sections[n+1]?.id;activeSection=id;visitedSections.add(id);
    show('ELIJAH NOLLEN / PORTFOLIO',`<div class="portfolio-layout"><nav class="portfolio-nav" aria-label="Portfolio sections"><span class="portfolio-wordmark">ELI NOLLEN<span>COMPUTER SCIENCE · ANALYTICS</span></span>${sections.map((v,i)=>`${v.id==='gallery'?'<span class="personal-nav-label">PERSONAL</span>':''}<button data-section="${v.id}" ${v.id===id?'aria-current="page"':''}><small>${String(i+1).padStart(2,'0')}</small>${v.label}<span>${v.id===id?'→':''}</span></button>`).join('')}<button class="return-town" data-close-portfolio>← Return to town</button></nav><article class="portfolio-article"><div class="section-heading"><p class="section-kicker">${String(n+1).padStart(2,'0')} / ${s.label.toUpperCase()}</p><h2 id="portfolioTitle" tabindex="-1">${esc(s.title)}</h2><p>${esc(s.description)}</p></div>${content}<footer class="portfolio-pagination"><button ${n?'data-section="'+sections[n-1].id+'"':'data-close-portfolio'}>← ${n?sections[n-1].label:'Return to town'}</button>${nextId?`<button data-section="${nextId}">Next: ${sections.find(s=>s.id===nextId).label} →</button>`:'<button data-section="gallery">Explore the personal gallery →</button>'}</footer></article></div>`);
    body.classList.remove('guide-body');body.classList.add('portfolio-body');body.parentElement.classList.add('portfolio-panel');panel.scrollTop=0;hydrate();body.querySelector('#portfolioTitle')?.focus({preventScroll:true});updateGuide();
  }
  function showSection(id,options={}) {
    if(!sections.some(s=>s.id===id))return;
    activeProject=null;
    let html='';
    if(id==='about') html=`<div class="about-profile"><button class="portrait-button" data-photo="img/me-nobg.png" data-caption="Elijah Crisehea M. Nollen" aria-label="View Eli’s portrait in full detail">${pixel('img/me-nobg.png','Elijah Crisehea M. Nollen','portrait')}</button><div><span class="profile-label">ELIJAH CRISEHEA M. NOLLEN</span><h3>Curiosity, with a purpose.</h3><p>I’m a Computer Science student who enjoys making data useful and checking that systems work as intended. My interests sit at the intersection of analytics, quality, and thoughtful digital experiences.</p><p>I work with teams on data preparation, application projects, and healthcare-system quality analysis.</p><button class="portfolio-action" data-section="projects">Explore my work ↗</button></div></div><div class="about-note"><h3>How I got here</h3><p>I originally wanted to study Industrial Engineering. An SM scholarship led me to Computer Science, where I found a growing interest in patterns, problem solving, and the details behind a reliable system.</p></div>`;
    if(id==='projects') html=`<div class="project-grid">${window.PROJECTS.map(p=>`<article class="project-card"><button class="project-cover ${p.tone}" data-project="${p.id}" aria-label="Read ${esc(p.title)} case study">${p.image?pixel(p.image,p.imageAlt):`<span class="project-monogram">${esc(p.initials)}</span>`}<span class="project-state">${esc(p.status)}</span></button><div class="project-copy"><p class="project-category">${esc(p.category)}</p><h3>${esc(p.title)}</h3><p class="project-role">${esc(p.role)}</p><p>${esc(p.summary)}</p><button class="text-button" data-project="${p.id}">My contribution →</button></div></article>`).join('')}</div>`;
    if(id==='skills') {const selected=options.group||'all';html=`<div class="filter-row" aria-label="Skill categories">${[{id:'all',name:'All skills'},...skillGroups].map(g=>`<button data-skill-filter="${g.id}" aria-pressed="${selected===g.id}">${g.name}</button>`).join('')}</div>${skillGroups.filter(g=>selected==='all'||selected===g.id).map(g=>`<section class="skill-group"><h3>${g.name}</h3><p>${g.description}</p><div class="skills-grid">${g.names.map(name=>{const sk=C.skillItems.find(s=>s.name===name);return `<div class="skill">${pixel(sk.image,name+' logo','logo')}<span>${esc(name)}</span></div>`}).join('')}</div></section>`).join('')}<p class="supporting-note">See Selected work for how these tools connect to my projects.</p>`;}
    if(id==='education') html=`<div class="education-timeline">${[...C.educationItems].reverse().map((e,i)=>`<article class="timeline-entry"><span class="timeline-dot"></span><small>${e.yearRange}</small><h3>${esc(e.school)}</h3><p>${esc(i===0?'BS Computer Science, with a focus on cybersecurity and forensics. Honor student.':i===1?'STEM strand; graduated with highest honors. Participated in Layag Films Production.':i===2?'Completed my final year of junior high school.':'Junior high school; developed my writing through the school publication.')}</p></article>`).join('')}</div><section class="leadership-note" id="leadership"><p class="section-kicker">LEADERSHIP · JUNIOR PHILIPPINE COMPUTER SOCIETY</p><h3>Secretariat Officer</h3><p>July 2026–present</p><h3>Director of Operations</h3><p>July 2025–July 2026</p></section>`;
    if(id==='gallery') {const filter=options.filter||'all';html=`<div class="filter-row" aria-label="Gallery categories">${[['all','All moments'],['campus','Campus'],['personal','Personal']].map(([v,l])=>`<button data-gallery-filter="${v}" aria-pressed="${v===filter}">${l}</button>`).join('')}</div><p class="section-note">Pixel previews keep the town’s visual style. Select a photo to see the original in full detail.</p><div class="photo-grid">${gallery.filter(v=>filter==='all'||v.category===filter).map((v,i)=>`<figure><button data-photo="${v.image}" data-caption="${esc(v.title+' — '+v.caption)}" aria-label="Open photo: ${esc(v.title)}">${pixel(v.image,v.title)}</button><figcaption><small>${v.category.toUpperCase()}</small><h3>${esc(v.title)}</h3></figcaption></figure>`).join('')}</div>`;}
    if(id==='hobbies') {const type=options.type||'movie';html=`<div class="filter-row"><button data-interest="movie" aria-pressed="${type==='movie'}">Films & series</button><button data-interest="book" aria-pressed="${type==='book'}">My bookshelf</button></div><div class="favorites-grid">${C.mediaItems.filter(m=>m.type===type).map(m=>`<figure>${pixel(m.image,m.title+' cover','cover')}<figcaption>${esc(m.title)}</figcaption></figure>`).join('')}</div>`;}
    if(id==='goals') html=`<div class="direction-list">${C.goals.map(g=>`<article><small>${g.id}</small><div><h3>${esc(g.title)}</h3><p>${esc(g.description)}</p></div></article>`).join('')}</div>`;
    if(id==='contact') html=`<div class="contact-intro"><h3>Let’s make something useful.</h3><p>I welcome conversations about student projects, analytics, quality analysis, and collaboration.</p><a class="contact-email" href="mailto:emnollen@student.apc.edu.ph">emnollen@student.apc.edu.ph ↗</a></div><div class="contact-links">${C.socialLinks.filter(s=>s.label!=='Email').map(s=>`<a href="${s.label==='LinkedIn'?'https://www.linkedin.com/in/elijahnollen/':esc(s.href)}" target="_blank" rel="noopener">${pixel(s.icon,s.label+' logo','logo')}<span>${s.label} ↗</span></a>`).join('')}</div><div class="guestbook-invite"><h3>Leave a note at the Post Office</h3><p>Read messages from visitors or sign Eli’s guestbook.</p><button class="portfolio-action" data-guestbook>Open guestbook ↗</button></div>`;
    chrome(id,html);
    if(options.anchor)requestAnimationFrame(()=>body.querySelector('#'+options.anchor)?.scrollIntoView({block:'center',behavior:'instant'}));
  }
  function projectDetail(id) {
    const p=window.PROJECTS.find(p=>p.id===id);if(!p)return;activeProject=id;
    chrome('projects',`<button class="text-button case-back" data-section="projects">← All selected work</button><article class="case-study"><p class="project-category">${esc(p.category)} <span>· ${esc(p.status)}</span></p><h3 class="case-title">${esc(p.title)}</h3><p class="case-role">${esc(p.role)}</p>${p.image?`<button class="case-image" data-photo="${p.image}" data-caption="${esc(p.imageAlt)}" aria-label="View project image in full detail">${pixel(p.image,p.imageAlt,p.id==='jose'?'cover':'photo')}</button>`:`<div class="case-visual ${p.tone}"><span>${esc(p.initials)}</span><p>${esc(p.category)}</p></div>`}<section><h4>The project</h4><p>${esc(p.context)}</p></section><section><h4>My contribution</h4><ul>${p.contributions.map(c=>`<li>${esc(c)}</li>`).join('')}</ul></section><section><h4>${p.status==='In progress'?'Current focus':'What I took from it'}</h4><p>${esc(p.takeaway)}</p></section>${tags(p.tools)}${p.links.length?'<div class="evidence-links">'+p.links.map(link).join('')+'</div>':''}</article>`);
  }
  function openPhoto(src,caption) {
    const back=activeSection,project=activeProject;
    chrome(back,`<button class="text-button" ${project?'data-project="'+project+'"':'data-section="'+back+'"'}>← Back to ${project?'project':sections.find(s=>s.id===back).label.toLowerCase()}</button><figure class="original-photo"><img src="${esc(localImage(src))}" alt="${esc(caption||'Portfolio photograph')}"><figcaption>${esc(caption||'')}</figcaption></figure>`);
  }
  function showGuide() {
    show('PORTFOLIO TOWN / PORTFOLIO ROUTE',`<div class="town-guide"><p class="section-kicker">A CLEAR PATH THROUGH THE TOWN</p><h2>Meet the person. Explore the work.</h2><p>Follow the suggested route or choose a place. You can read the portfolio directly, or walk through its rooms.</p><div class="guide-list">${sections.map((s,i)=>{const p=places.find(p=>p.id===s.id);return `<article><span>${String(i+1).padStart(2,'0')}</span><div><h3>${s.label}</h3><p>${p.name}</p></div><button data-section="${s.id}">Read ↗</button><button data-room="${s.id}">Visit →</button></article>`}).join('')}</div></div>`);
    body.classList.remove('portfolio-body');body.classList.add('guide-body');panel.classList.add('portfolio-panel');hydrate();
  }
  function updateGuide() {
    if(room)return;
    const next=professionalFlow.map(id=>sections.find(s=>s.id===id)).find(s=>!visitedSections.has(s.id))||sections.find(s=>s.id==='gallery');
    const p=places.find(p=>p.id===next.id);
    document.querySelector('#questHint').innerHTML=`${esc(next.label)} · ${esc(p.name)}<br><strong>${next.id==='about'?'Start here, then explore Selected work.':'Suggested next stop on your portfolio route.'}</strong>`;
  }
  function inspect(id,index) {
    if(id==='about')showSection(['about','hobbies','contact'][index]);
    else if(id==='education')showSection('education',index===2?{anchor:'leadership'}:{});
    else if(id==='skills')showSection('skills',{group:['all','analytics','systems'][index]});
    else if(id==='hobbies')showSection('hobbies',{type:index?'book':'movie'});
    else if(id==='goals')showSection(index===1?'education':'goals');
    else if(id==='gallery')showSection('gallery',{filter:['all','campus','personal'][index]});
    else if(id==='projects')index===0?showSection('projects'):projectDetail(index===1?'namfrel':'wah');
    else if(id==='contact'&&index===2)window.Guestbook.open();
    else showSection('contact');
  }
  function cached(src){if(!imageCache.has(src)){const im=new Image();im.src=src;imageCache.set(src,im)}return imageCache.get(src)}
  function drawRoomDetails(c,id) {
    c.imageSmoothingEnabled=false;
    if(id==='gallery')roomObjects.filter(o=>o.type==='photos').forEach((o,idx)=>{
      rect(o.x-2,o.y-15,o.w+4,o.h+17,'#b67e91',c);rect(o.x+2,o.y-11,o.w-4,o.h+9,'#f8e5d0',c);
      gallery.filter(photo=>photo.category===(idx?'campus':'personal')).slice(0,3).forEach((photo,i)=>{const im=cached(photo.image);if(!im.complete||!im.naturalWidth)return;rect(o.x+4+i*36,o.y,32,50,'#fff4e4',c);c.drawImage(im,o.x+7+i*36,o.y+3,26,38)});
    });
    if(id==='skills'){
      rect(428,335,264,68,'#fff0dc',c);rect(432,339,256,60,'#ebd8db',c);
      C.skillItems.forEach((s,i)=>{const im=cached(localImage(s.image));if(im.complete&&im.naturalWidth)c.drawImage(im,440+i*30,350,24,24)});
      text('TOOLS I WORK WITH',560,391,9,'#74546a',c);
    }
    if(id==='about'){
      const im=cached('img/me-nobg.png');if(im.complete&&im.naturalWidth){rect(585,215,30,40,'#c992a9',c);rect(588,218,24,34,'#fff0df',c);c.drawImage(im,589,219,22,32)}
    }
  }
  window.Portfolio={showSection,showGuide,inspect,drawRoomDetails,updateGuide};
  document.querySelector('#readPortfolioStart').onclick=()=>{begin();showSection('about')};
  document.querySelector('.brand').innerHTML='<span class="brand-star">✧</span> Eli Nollen';
  document.querySelector('#directoryButton').textContent='Portfolio ↗';
  document.querySelector('#directoryButton').onclick=()=>showSection('about');
  const guideButton=document.createElement('button');guideButton.id='townGuideButton';guideButton.className='pill town-guide-button';guideButton.textContent='Town guide';guideButton.onclick=showGuide;
  document.querySelector('.header-right').prepend(guideButton);
  const context={about:'About Eli',projects:'Selected work',skills:'Skills',education:'Background',gallery:'Gallery',hobbies:'Interests',goals:'Direction',contact:'Contact'};
  places.forEach(p=>p.sub=context[p.id]);
  layouts.projects.objects[1][0]='Election analytics';layouts.projects.objects[2][0]='Current QA work';
  layouts.goals.objects[1][0]='Education & leadership';
  layouts.contact.objects[2][0]='Guestbook';
  roomReadButton.textContent='Open portfolio section ↗';
  updateGuide();
})();
