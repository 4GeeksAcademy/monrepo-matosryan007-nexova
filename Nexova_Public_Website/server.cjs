// Optional preview when Python is unavailable: node server.cjs
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = __dirname;
const port = Number(process.env.PORT || 8000);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw Error('PORT must be between 1 and 65535');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.txt':'text/plain; charset=utf-8','.json':'application/json'};
http.createServer((req,res) => {
  let file;
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    file = path.resolve(root, '.' + pathname.replaceAll('\\','/'));
    if (file !== root && !file.startsWith(root + path.sep)) throw Error('Invalid path');
    if (fs.statSync(file).isDirectory()) file = path.join(file,'index.html');
    const body=fs.readFileSync(file);
    res.writeHead(200, {'Content-Type':types[path.extname(file)] || 'application/octet-stream'});
    res.end(body);
  } catch {
    res.writeHead(404, {'Content-Type':'text/plain'}); res.end('Not found');
  }
}).listen(port,'127.0.0.1',()=>console.log(`Nexova preview: http://localhost:${port}`));
