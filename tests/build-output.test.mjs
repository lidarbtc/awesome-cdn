import { before, test } from 'node:test';
import assert from 'node:assert/strict';
import { opendir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { build, outDir } from '../scripts/build.mjs';

before(async () => {
  await build();
});

const readOutput = file => readFile(path.join(outDir, file), 'utf8');

test('static hosting has a styled, noindex 404 fallback outside the sitemap', async () => {
  const [html, sitemap] = await Promise.all([
    readOutput('404.html'),
    readOutput('sitemap.xml'),
  ]);
  assert.match(html, /<title>Page not found — cache\.box<\/title>/);
  assert.match(html, /<h1>A cache miss\.<\/h1>/);
  assert.match(html, /<meta name="robots" content="noindex, follow">/);
  assert.match(html, /href="\/assets\/styles\.css"/);
  assert.doesNotMatch(sitemap, /404/);
});

test('nested pages retain their trailing-slash canonicals and indexing rules', async () => {
  const [provider, compare, sitemap] = await Promise.all([
    readOutput('providers/cloudflare/index.html'),
    readOutput('compare/index.html'),
    readOutput('sitemap.xml'),
  ]);
  assert.match(provider, /<link rel="canonical" href="https:\/\/cache\.box\/providers\/cloudflare\/">/);
  assert.match(provider, /<meta name="robots" content="index, follow">/);
  assert.match(compare, /<meta name="robots" content="noindex, follow">/);
  assert.match(sitemap, /<loc>https:\/\/cache\.box\/providers\/cloudflare\/<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/cache\.box\/compare\/<\/loc>/);
});

test('rebuilds preserve the watched output directory while removing stale files', async () => {
  // Hold the directory open so a deleted inode cannot be immediately reused.
  const directory = await opendir(outDir);
  try {
    const original = await stat(outDir);
    await writeFile(path.join(outDir, 'obsolete-page.html'), 'stale');
    await build();
    const rebuilt = await stat(outDir);
    assert.equal(rebuilt.dev, original.dev);
    assert.equal(rebuilt.ino, original.ino);
    await assert.rejects(readOutput('obsolete-page.html'), { code: 'ENOENT' });
    assert.match(await readOutput('404.html'), /<h1>A cache miss\.<\/h1>/);
  } finally {
    await directory.close();
  }
});
