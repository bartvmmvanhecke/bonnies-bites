import test from 'node:test';
import assert from 'node:assert/strict';
import {makeTip,reviewTip,confirmTip,loadInbox,saveInbox,INBOX_KEY} from '../js/inbox-store.js';
test('a text-only contribution survives reload and remains private in a separate store',()=>{
 const map=new Map([['bb-community-drafts','[]'],['bb-favorites','["armalygal"]']]);
 const storage={getItem:k=>map.get(k),setItem:(k,v)=>map.set(k,v)};
 const tip=makeTip(' Camping Ardèche ','whatsapp-demo');
 assert.equal(tip.text,'Camping Ardèche');assert.equal(tip.status,'draft');assert.equal(tip.link,'');
 assert.ok(saveInbox(storage,[tip]));assert.deepEqual(loadInbox(storage),[tip]);
 assert.equal(map.get('bb-community-drafts'),'[]');assert.equal(map.get('bb-favorites'),'["armalygal"]');
});
test('incomplete tips cannot be confirmed; edit, review, later and confirm preserve original words',()=>{
 const tip=makeTip('Camping Ardèche');assert.equal(reviewTip(tip).status,'incomplete');assert.throws(()=>confirmTip(tip));
 const ready=reviewTip({...tip,title:'Camping bij de rivier',category:'Campings'});assert.equal(ready.status,'review');
 const confirmed=confirmTip({...ready,status:'later'});assert.equal(confirmed.status,'confirmed');assert.equal(confirmed.text,tip.text);
 assert.equal(reviewTip({...confirmed,title:''}).status,'incomplete');
});
test('unavailable storage reports failure; corrupt records do not crash the inbox',()=>{
 assert.equal(saveInbox({setItem(){throw Error('quota')}},[makeTip('Een tip')]),false);
 for(const value of ['{','null','{}','[null,{}, {"id":"x","text":"a","status":"unknown"}]'])assert.deepEqual(loadInbox({getItem:()=>value}),[]);
 assert.deepEqual(loadInbox({getItem(){throw Error('blocked')}}),[]);
 assert.equal(INBOX_KEY,'bb-private-inbox-v1');
});
