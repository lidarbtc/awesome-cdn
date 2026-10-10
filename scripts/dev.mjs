import http from 'node:http';
import { watch } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { build, outDir, root } from './build.mjs';

const port = Number(process.env.PORT || 4321);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

await build();

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

function errorPage(response, code, title, method) {
  const body = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${code} · cache.box</title><style>body{font:16px system-ui;background:#f6f7f9;color:#20252e;margin:15vh auto;padding:24px;max-width:560px}h1{font-size:40px}a{color:#175cff}</style></head><body><p>cache.box</p><h1>${title}</h1><p><a href="/">Back to the CDN directory →</a></p></body></html>`;
  response.writeHead(code, { 'Content-Type': 'text/html; charset=utf-8' });
  response.end(method === 'HEAD' ? undefined : body);
}

const server = http.createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    return errorPage(response, 405, 'Method not allowed', request.method);
  }
  let pathname;
  try {
    pathname = decodeURIComponent((request.url || '/').split('?')[0]);
  } catch {
    return errorPage(response, 400, 'Invalid URL', request.method);
  }
  if (!pathname.startsWith('/') || pathname.startsWith('//') || pathname.includes('\\') || pathname.includes('\0') || pathname.split('/').includes('..')) {
    return errorPage(response, 400, 'Invalid URL', request.method);
  }
  let file = path.resolve(outDir, `.${pathname}`);
  if (file !== outDir && !file.startsWith(`${outDir}${path.sep}`)) {
    return errorPage(response, 400, 'Invalid URL', request.method);
  }
  try {
    const entry = await stat(file);
    if (entry.isDirectory()) {
      if (!pathname.endsWith('/')) {
        const query = (request.url || '').includes('?') ? `?${request.url.split('?').slice(1).join('?')}` : '';
        response.writeHead(308, { Location: `${encodeURI(pathname)}/${query}` });
        return response.end();
      }
      file = path.join(file, 'index.html');
    }
    const data = await readFile(file);
    response.writeHead(200, {
      'Content-Type': mimeTypes[path.extname(file)] || 'application/octet-stream',
      'Content-Length': data.length,
    });
    response.end(request.method === 'HEAD' ? undefined : data);
  } catch (error) {
    if (error.code === 'ENOENT' || error.code === 'ENOTDIR' || error.code === 'EISDIR') {
      return errorPage(response, 404, 'Page not found', request.method);
    }
    console.error('Could not serve request:', error.message);
    errorPage(response, 500, 'Could not load this page', request.method);
  }
});

server.listen(port, '127.0.0.1', () => {
  console.log(`cache.box local preview: http://127.0.0.1:${port}`);
});

// Node --watch restarts for imported view/data modules. Rebuild CSS, browser
// scripts, and public files here, since the server does not import those.
let timer;
let rebuilding = false;
let queued = false;
async function rebuildAssets() {
  if (rebuilding) {
    queued = true;
    return;
  }
  rebuilding = true;
  try {
    await build();
  } catch (error) {
    console.error('Build failed:', error.message);
  } finally {
    rebuilding = false;
    if (queued) {
      queued = false;
      await rebuildAssets();
    }
  }
}
for (const directory of ['src', 'public']) {
  watch(path.join(root, directory), { recursive: true }, (_event, filename) => {
    if (directory === 'src' && filename && /^(views\.js|data\/)/.test(String(filename))) return;
    clearTimeout(timer);
    timer = setTimeout(rebuildAssets, 100);
  });
}
