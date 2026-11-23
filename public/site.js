const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
function closeMenu(){ nav.classList.remove('open'); menu.setAttribute('aria-expanded','false'); }
menu.addEventListener('click',()=>menu.setAttribute('aria-expanded',String(nav.classList.toggle('open'))));
nav.addEventListener('click',closeMenu);
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
const items = [...document.querySelectorAll('[data-nav]')];
const sections = items.map(a=>document.getElementById(a.dataset.nav)).filter(Boolean);
if(sections.length){
 let scheduled=false;
 function update(){scheduled=false;let current=sections[0];for(const s of sections){if(s.getBoundingClientRect().top<=110)current=s;}if(window.innerHeight+window.scrollY>=document.documentElement.scrollHeight-2)current=sections.at(-1);for(const a of items){if(a.dataset.nav===current.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');}}
 addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(update);}}, {passive:true});update();
}
const buttons=[...document.querySelectorAll('[data-filter]')];
for(const b of buttons)b.addEventListener('click',()=>{
 const filter=b.dataset.filter;
 for(const other of buttons)other.setAttribute('aria-pressed',String(other===b));
 let count=0;for(const card of document.querySelectorAll('[data-areas]')){card.hidden=filter!=='전체'&&!card.dataset.areas.split('|').includes(filter);if(!card.hidden)count++;}
 document.querySelector('#count').textContent=filter+' 프로젝트 '+count+'개';
});
function fallback(img){const node=document.createElement('span');node.className='badimage';node.textContent=img.alt||'프로젝트 이미지';img.replaceWith(node);}
for(const img of document.images){img.addEventListener('error',()=>fallback(img),{once:true});if(img.complete&&!img.naturalWidth)fallback(img);}
