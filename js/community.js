import {enrichIdea} from './enrichment.js';
import { createClient } from '@supabase/supabase-js';
// Without these keys (see .env.example) the site keeps ideas on this device only.
const url=import.meta.env.VITE_SUPABASE_URL, key=import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabase=url&&key?createClient(url,key):null;
const bucket='idea-photos', photoUrl=path=>supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
// Quiet anonymous account on first share; can later be linked to an e-mail address.
async function user(){const {data}=await supabase.auth.getSession();if(data.session)return data.session.user;const {data:anon,error}=await supabase.auth.signInAnonymously();if(error)throw error;return anon.user}
export async function currentUserId(){const {data}=await supabase.auth.getSession();return data.session?.user.id}
export async function submitIdea(v,photos){const me=await user(),paths=[];
 for(const p of photos){const path=`${me.id}/${crypto.randomUUID()}.jpg`,{error}=await supabase.storage.from(bucket).upload(path,await (await fetch(p)).blob(),{contentType:'image/jpeg'});if(error)throw error;paths.push(path)}
 const {data,error}=await supabase.from('ideas').insert({author_name:v.author,category:v.category==='Cadeautips'?'Kleine gelukjes':v.category,region:v.region||null,title:v.title,description:v.description||null,link:v.link||null,photos:paths}).select().single();
 if(error){if(paths.length)await supabase.storage.from(bucket).remove(paths);throw error}return data}
export async function loadIdeas(){const {data,error}=await supabase.from('ideas').select('*').neq('status','rejected').order('created_at',{ascending:false}).limit(200);if(error)throw error;return data}
export async function deleteIdea(row){if(row.photos.length)await supabase.storage.from(bucket).remove(row.photos);const {error}=await supabase.from('ideas').delete().eq('id',row.id);if(error)throw error}
export function toIdea(row,me){const photos=row.photos.map(photoUrl),own=row.author_id===me,pending=row.status==='pending';return enrichIdea({slug:'idee-'+row.id,row,title:row.title,category:row.category==='Kleine gelukjes'?'Cadeautips':row.category,description:row.description||'',detail:row.enrichment?.detail||'',link:row.link||'',region:row.region||'',country:row.region||undefined,photos,photo:photos[0],photoAlt:row.title,time:pending?'Wacht op Bonnie':row.enrichment?.time||'Nieuw',quick:false,own,pending,enrich:!row.enrichment,author:row.author_name+(own?' · jij':''),tags:[row.region,row.link].filter(Boolean).join(' ')})}
