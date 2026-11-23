import './build.mjs';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const args=process.argv.slice(2);
const option=(name,fallback)=>args.includes(name)?args[args.indexOf(name)+1]:fallback;
const host=option('--host','127.0.0.1'), port=Number(option('--port',5173));
const base=path.resolve('dist');
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png'};
http.createServer((req,res)=>{
 let file;
 try{const url=new URL(req.url,'http://localhost');file=path.resolve(base,'.'+decodeURIComponent(url.pathname));}
 catch{res.writeHead(400).end();return;}
 if(file!==base&&!file.startsWith(base+path.sep)){res.writeHead(403).end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 const found=fs.existsSync(file)&&fs.statSync(file).isFile();
 if(!found)file=path.join(base,'404.html');
 res.writeHead(found?200:404,{'Content-Type':mime[path.extname(file)]||'application/octet-stream'});
 fs.createReadStream(file).pipe(res);
}).listen(port,host,()=>console.log('Local: http://'+host+':'+port));
