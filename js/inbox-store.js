export const INBOX_KEY='bb-private-inbox-v1';
export const statuses={draft:'Concept',incomplete:'Nog aanvullen',review:'Te bevestigen',later:'Voor later',confirmed:'Bevestigd'};
export function loadInbox(storage){try{const rows=JSON.parse(storage.getItem(INBOX_KEY)||'[]');return Array.isArray(rows)?rows.filter(x=>x&&typeof x.id==='string'&&typeof x.text==='string'&&Object.hasOwn(statuses,x.status)).map(x=>({...x,title:typeof x.title==='string'?x.title:x.text.slice(0,90),description:typeof x.description==='string'?x.description:'',category:typeof x.category==='string'?x.category:'',link:typeof x.link==='string'?x.link:'',photos:Array.isArray(x.photos)?x.photos.filter(p=>typeof p==='string'&&p.startsWith('data:image/')):[]})):[]}catch{return []}}
export function saveInbox(storage,rows){try{storage.setItem(INBOX_KEY,JSON.stringify(rows));return true}catch{return false}}
export function makeTip(text,source='website'){return {id:crypto.randomUUID(),text:text.trim(),title:text.trim().slice(0,90),description:'',category:'',link:'',photos:[],source,status:'draft',createdAt:new Date().toISOString()}}
export function reviewTip(tip){return {...tip,status:tip.title.trim()&&tip.category?'review':'incomplete'}}
export function confirmTip(tip){if(!tip.title.trim()||!tip.category)throw new Error('Vul eerst een titel en categorie aan.');return {...tip,status:'confirmed'}}
