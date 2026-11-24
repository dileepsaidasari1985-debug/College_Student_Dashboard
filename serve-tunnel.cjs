const http = require('http');
const fs = require('fs');
const path = require('path');
const localtunnel = require('localtunnel');

const PORT = 4173;
const DIST_DIR = path.resolve(__dirname, 'dist');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('bypass-tunnel-reminder', 'true');

  let sanitizedUrl = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, sanitizedUrl === '/' ? 'index.html' : sanitizedUrl);

  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(DIST_DIR, 'index.html');
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Server Error: ' + err.message);
      return;
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, async () => {
  console.log(`[SERVER_LOCAL]: http://localhost:${PORT}`);
  try {
    const subdomain = 'nexora-ai-' + Math.floor(10000 + Math.random() * 90000);
    const tunnel = await localtunnel({ port: PORT, subdomain });
    console.log(`[PUBLIC_WORLDWIDE_URL]: ${tunnel.url}`);

    tunnel.on('close', () => {
      console.log('Tunnel closed');
    });
    tunnel.on('error', (err) => {
      console.error('Tunnel error:', err);
    });
  } catch (err) {
    console.error('Failed to create tunnel:', err);
  }
});

