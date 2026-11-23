import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const pages=fs.readdirSync('dist',{recursive:true}).filter(f=>f.endsWith('.html'));
let count=0;
const slugs=new Set();
for(const file of fs.readdirSync('content/projects')){
 const p=JSON.parse(fs.readFileSync('content/projects/'+file));
 assert(!slugs.has(p.slug),'duplicate slug');slugs.add(p.slug);
 assert(fs.existsSync('dist/projects/'+p.slug+'/index.html'));
 assert(fs.existsSync('public/'+p.art));
}
for(const page of pages){
 const source=fs.readFileSync('dist/'+page,'utf8');
 assert.match(source,/<title>[^<]+<\/title>/);
 for(const [,attr] of source.matchAll(/(?:href|src)="([^"]*)"/g)){
  if(/^(?:https?:|mailto:)/.test(attr))continue;
  const [file,id]=attr.split('#');
  const target=file?path.resolve('dist',path.dirname(page),file):path.resolve('dist',page);
  assert(fs.existsSync(target),page+' missing '+attr);
  if(id)assert(fs.readFileSync(target,'utf8').includes('id="'+id+'"'),page+' invalid fragment '+attr);
  count++;
 }
}
console.log(pages.length+' HTML pages; '+count+' local paths/anchors checked.');
