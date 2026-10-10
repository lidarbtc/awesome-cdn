# cache.box development

Use Node.js 22 or newer. The site builds with Node's standard library. Wrangler is a pinned development dependency for the Cloudflare commands.

```sh
npm ci
npm run dev
```

Open <http://127.0.0.1:4321>. Use `PORT=4322 npm run dev` to choose another port. The server listens only on the local machine. Source changes rebuild the site; refresh the browser to see them.

```sh
npm run build
npm test
```

The build writes complete static HTML pages, browser assets, a sitemap, and a custom `404.html` to `dist/`. Routes have independent titles, descriptions, and canonical URLs. Unknown routes return HTTP 404.

## Cloudflare Workers

`wrangler.jsonc` configures the `cache-box` Worker in the Cloudflare account that owns `cache.box`. It serves `dist/` through Workers Static Assets; no Worker script is required. The custom domain is `cache.box`, with `workers.dev` and version-preview URLs disabled.

```sh
npm run preview:workers
npm run check:deploy
```

The Workers preview runs at <http://127.0.0.1:8787>. The dry run validates the deployment without uploading it. Wrangler runs `npm run build` before either command. HTML routes use trailing slashes; missing paths serve the custom page with status 404.

Check your Cloudflare login with `npx wrangler whoami`. If needed, authenticate with `npx wrangler login`, then publish:

```sh
npm run deploy
```

Deployment uploads the generated assets and attaches `cache.box` as the Worker's custom domain. The account must have Workers deployment and custom-domain permissions for that zone. Credentials stay in Wrangler's local authentication storage; they are not part of this repository.

## Content and evidence

- `src/data/providers.js` combines provider identities with the reviewed records in `src/data/verified/`. Each record includes primary-source URLs, field coverage, review date, and verification status. Detailed evidence and unresolved conflicts are in `research/verification-2026-10-10/`.
- Provider views, navigation, and other pages are rendered by `src/views.js`. Browser interactions live in `src/app.js`, and visual styling in `src/styles.css`.
- Pricing estimates use the supported public rates and state exclusions in each breakdown. Bunny Volume estimates stop above 500 TB because its public tables do not establish how the discounted tiers apply, and its published 1–2 PB rates conflict.
- Korea coverage and Lab pages describe evidence and measurement requirements. A listed location is not evidence of a measured route or latency; this preview does not invent benchmark results.
- Compare, calculator, and unfinished Lab pages are excluded from the sitemap and marked `noindex`. Review evidence and metadata before a public launch.

The original `README.md` remains the concise, independently usable GitHub directory.
