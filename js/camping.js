import {initTipChat} from './tip-chat.js';
import {mountDetailHero} from './detail-hero.js';
const $=s=>document.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function read(k,d){try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}}function save(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true}catch{return false}}
initTipChat();
const photos=['/assets/armalygal.jpg','/assets/armalygal-2.jpg','/assets/armalygal-3.jpg'];let current=0,opener;function photo(){ $('#large-photo').src=photos[current];$('#large-photo').alt=document.querySelectorAll('[data-photo] img')[current].alt;$('#photo-count').textContent=`${current+1} / ${photos.length}`}
document.querySelectorAll('[data-photo]').forEach(b=>b.onclick=()=>{opener=b;current=Number(b.dataset.photo);photo();$('#photo-dialog').showModal()});$('#photo-close').onclick=()=>$('#photo-dialog').close();$('#photo-dialog').addEventListener('close',()=>opener?.focus());$('#previous').onclick=()=>{current=(current+2)%3;photo()};$('#next').onclick=()=>{current=(current+1)%3;photo()};$('#photo-dialog').addEventListener('keydown',e=>{if(e.key==='ArrowRight')$('#next').click();if(e.key==='ArrowLeft')$('#previous').click()});

const heading=$('.camp-heading'),title=heading.querySelector('h1'),oldLike=$('#camp-like');
mountDetailHero({root:$('.camp-page'),title,eyebrow:'SPANJE · ARAGÓN · CAMPING',location:'Murillo de Gállego, Spanje',tags:[{label:'Anke & Bart',className:'detail-author-tag'},{label:'Vriendentip · preview',className:'detail-friend-tag'},{label:'Camping',className:'detail-type-tag'},{label:'Spanje',className:'detail-location-tag'}],media:$('.gallery'),aside:$('.camp-columns > aside'),slug:'armalygal',experienceTarget:$('#reacties'),like:oldLike});
heading.remove();$('.breadcrumb').hidden=true;

// Keep the existing photo buttons and lightbox, but place the gallery in the story column.
const gallery=$('.gallery'),oldGalleryWrap=gallery.parentElement;
const carousel=document.createElement('section');carousel.className='camp-photo-carousel';carousel.setAttribute('aria-label','Foto’s van de camping');
const story=$('.story');story.after(carousel);gallery.id='camping-photo-row';gallery.setAttribute('aria-label','Scroll door de campingfoto’s');gallery.tabIndex=0;
const credit=gallery.querySelector(':scope > span');carousel.append(gallery);if(credit){credit.className='source carousel-credit';carousel.append(credit)}
if(oldGalleryWrap.matches('details.detail-photo-strip'))oldGalleryWrap.remove();
const controls=document.createElement('div');controls.className='carousel-controls';controls.innerHTML='<button type="button" class="carousel-previous" aria-label="Vorige foto’s" aria-controls="camping-photo-row">←</button><button type="button" class="carousel-next" aria-label="Volgende foto’s" aria-controls="camping-photo-row">→</button>';carousel.append(controls);
const back=controls.querySelector('.carousel-previous'),forward=controls.querySelector('.carousel-next');
function updateCarousel(){back.disabled=gallery.scrollLeft<2;forward.disabled=gallery.scrollLeft+gallery.clientWidth>=gallery.scrollWidth-2}
function scrollPhotos(direction){gallery.scrollBy({left:direction*(gallery.querySelector('button').getBoundingClientRect().width+10),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
back.onclick=()=>scrollPhotos(-1);forward.onclick=()=>scrollPhotos(1);gallery.addEventListener('scroll',updateCarousel,{passive:true});new ResizeObserver(updateCarousel).observe(gallery);updateCarousel();
