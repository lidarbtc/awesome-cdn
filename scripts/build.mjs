import { cp, mkdir, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderPage } from '../src/views.js';
import { providers } from '../src/data/providers.js';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const outDir = path.join(root, 'dist');

const fixedRoutes = [
  '/',
  '/compare/',
  '/calculator/',
  '/locations/',
  '/locations/south-korea/',
  '/lab/',
  '/about/',
  '/methodology/',
  '/archive/',
];
const privateRoutes = new Set(['/compare/', '/calculator/', '/lab/']);

function escapeAttribute(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function documentFor(route, page) {
  const title = escapeAttribute(page.title);
  const description = escapeAttribute(page.description || 'Independent CDN comparisons, pricing, and practical notes.');
  const canonical = `https://cache.box${route}`;
  const noindex = page.noindex || privateRoutes.has(route);
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f7f9">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="robots" content="${noindex ? 'noindex, follow' : 'index, follow'}">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="cache.box">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${canonical}">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  <script defer src="https://m.lidar.blog/script.js" data-website-id="72d867af-35ec-4538-9e33-aa9154e71a61"></script>
  <script type="module" src="/assets/app.js"></script>
</head>
<body>
${page.body}
</body>
</html>
`;
}

export async function build() {
  const routes = [...new Set([
    ...fixedRoutes,
    ...providers.map(provider => `/providers/${provider.slug}/`),
  ])];
  // Generate every page before replacing the last working build.
  const pages = routes.map(route => {
    const page = renderPage(route, { selected: [], search: '', filter: 'all' });
    return {
      route,
      noindex: page.noindex || privateRoutes.has(route),
      html: documentFor(route, page),
    };
  });
  const notFoundHtml = documentFor('/404.html', renderPage('/404.html'));
  await mkdir(outDir, { recursive: true });
  // Keep the directory itself so Wrangler's asset watcher survives rebuilds.
  await Promise.all((await readdir(outDir)).map(entry =>
    rm(path.join(outDir, entry), { recursive: true, force: true }),
  ));
  await cp(path.join(root, 'src'), path.join(outDir, 'assets'), { recursive: true });
  await cp(path.join(root, 'public'), outDir, { recursive: true });
  for (const { route, html } of pages) {
    const directory = path.join(outDir, route);
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), html);
  }
  // Workers Static Assets uses this fallback while retaining HTTP 404.
  await writeFile(path.join(outDir, '404.html'), notFoundHtml);
  const indexedRoutes = pages.filter(({ noindex }) => !noindex);
  await writeFile(path.join(outDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexedRoutes.map(({ route }) => `  <url><loc>https://cache.box${route}</loc></url>`).join('\n')}\n</urlset>\n`);
  await writeFile(path.join(outDir, 'robots.txt'), 'User-agent: *\nAllow: /\n\nSitemap: https://cache.box/sitemap.xml\n');
  console.log(`Built ${pages.length} pages and a 404 page in dist/`);
  return { routes, outDir };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await build();
}
