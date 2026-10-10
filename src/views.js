import { providers, archivedProviders, getProvider } from './data/providers.js';
import { calculatorPlans, estimatePlan } from './data/calculator.js';
import { seoulProviders, seoulReviewDate } from './data/south-korea.js';

export const escapeHTML = (value = '') => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const e = escapeHTML;
export const icon = (name, size = 18) => {
  const paths = {
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>', external: '<path d="M14 4h6v6M20 4L10 14M10 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4"/>', check: '<path d="m5 12 4 4L19 6"/>', close: '<path d="m6 6 12 12M18 6 6 18"/>', plus: '<path d="M12 5v14M5 12h14"/>',
    chevron: '<path d="m8 5 7 7-7 7"/>', down: '<path d="m6 9 6 6 6-6"/>', globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
    compare: '<path d="M8 3v18M16 3v18M3 7h10M11 17h10"/><circle cx="8" cy="7" r="2" fill="currentColor"/><circle cx="16" cy="17" r="2" fill="currentColor"/>',
    layers: '<path d="m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5"/>', code: '<path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.01"/>', clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
    github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4a3.5 3.5 0 0 0-1-3c3-.3 6-1.5 6-5a4 4 0 0 0-1-3c.3-1 .3-2 0-3 0 0-1-.3-3 1a11 11 0 0 0-6 0C8 3.7 7 4 7 4c-.3 1-.3 2 0 3a4 4 0 0 0-1 3c0 3.5 3 4.7 6 5a3.5 3.5 0 0 0-1 3v4"/>',
    flask: '<path d="M9 3h6M10 3v7l-6 9a1.3 1.3 0 0 0 1 2h14a1.3 1.3 0 0 0 1-2l-6-9V3M7 15h10"/>', link:'<path d="m9 15 6-6M8 16l-1 1a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M16 8l1-1a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(0 -1)"/>'
  };
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.arrow}</svg>`;
};
const brand = `<span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i></span><span>cache<span class="brand-dot">.</span>box</span>`;
const external = (url, label, cls = '') => `<a class="${cls}" href="${e(url)}" target="_blank" rel="noopener noreferrer">${label}${icon('external', 14)}</a>`;
const logo = (p, large = false) => `<span class="provider-logo ${large ? 'large' : ''}" style="--provider-color:${e(p.color)}" aria-hidden="true">${e(p.mark)}</span>`;
const pill = (text, tone = '') => `<span class="pill ${tone}">${e(text)}</span>`;
const money = value => new Intl.NumberFormat('en-US', { style:'currency', currency:'USD', maximumFractionDigits:2 }).format(value);
const breadcrumb = (label, parent = {href:'/', text:'Providers'}) => `<div class="breadcrumb"><a href="${parent.href}">${parent.text}</a>${icon('chevron',12)}<span>${e(label)}</span></div>`;

function header(path) {
  const nav = [['/', 'Providers'], ['/compare/', 'Compare'], ['/locations/', 'Locations'], ['/lab/', 'Lab']];
  return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header"><div class="header-inner"><a class="brand" href="/" aria-label="cache.box home">${brand}</a><nav class="main-nav" aria-label="Main navigation">${nav.map(([url,label])=>`<a href="${url}" ${path === url || (url !== '/' && path.startsWith(url)) || (url === '/' && path.startsWith('/providers/')) ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav><div class="header-actions"><a class="calculator-link" href="/calculator/">Cost calculator ${icon('arrow',16)}</a>${external('https://github.com/lidarbtc/awesome-cdn', icon('github',20)+'<span class="sr-only">GitHub repository</span>','github-link')}</div><button class="mobile-menu" type="button" aria-label="Open navigation" aria-expanded="false">${icon('menu')}</button></div></header>`;
}
function footer() {
  return `<footer class="site-footer"><div class="footer-top"><a class="brand" href="/">${brand}</a><p>A field guide to the edge of the internet.</p><a href="https://github.com/lidarbtc/awesome-cdn" target="_blank" rel="noopener noreferrer">Made in the open ${icon('external',14)}</a></div><div class="footer-bottom"><span>Independent. Opinionated. Open source.</span><nav aria-label="Footer"><a href="/about/">About</a><a href="/methodology/">Our methodology</a><a href="/archive/">Archive</a></nav><span class="footer-signature">An awesome-cdn project <span>↗</span></span></div></footer>`;
}

const matches = (p, search, filter) => {
  const haystack = [p.name,p.summary,p.editorial,...p.tags].join(' ').toLowerCase();
  return haystack.includes(search.toLowerCase().trim()) && (filter === 'all' || filter === 'free' && p.freeTier === 'yes' || filter === 'usage' && p.pricingModel === 'usage' || filter === 'video' && p.video === 'yes');
};
export function filteredProviders(search = '', filter = 'all') {return providers.filter(p=>matches(p,search,filter));}
export function renderProviderRows(search = '', filter = 'all', selected = []) {
  const list = filteredProviders(search,filter);
  if (!list.length) return `<div class="empty-state">${icon('search',30)}<h3>No providers found</h3><p>Try another name, feature, or pricing model.</p><button type="button" class="text-button" data-clear-filters>Clear filters ${icon('arrow',15)}</button></div>`;
  return list.map(p=>`<article class="provider-row"><label class="compare-checkbox"><input type="checkbox" data-compare="${p.slug}" ${selected.includes(p.slug)?'checked':''} aria-label="Compare ${e(p.name)}"><span></span></label><a class="provider-identity" href="/providers/${p.slug}/">${logo(p)}<span><strong>${e(p.name)}</strong><span class="provider-mobile-summary">${e(p.tags[0] || p.pricingModel)}</span></span></a><div class="provider-description"><p>${e(p.summary)}</p><div class="row-tags">${p.tags.slice(0,2).map(t=>`<span>${e(t)}</span>`).join('')}</div></div><div class="provider-price"><strong>${e(p.pricingLabel)}</strong><span>${p.pricingModel === 'usage' ? 'Usage-based' : p.pricingModel === 'quote' ? 'Custom pricing' : 'Subscription'}</span></div><div class="provider-access">${pill(p.freeTier === 'yes'?'Free plan':p.freeTier === 'trial'?'Trial available':p.freeTier === 'no'?'Paid':'See details',p.freeTier === 'yes'?'green':'')}</div><a class="row-arrow" href="/providers/${p.slug}/" aria-label="View ${e(p.name)}">${icon('arrow',18)}</a></article>`).join('');
}
function directory(state) {
  const chips=[['all','All providers'],['free','Free tier'],['usage','Pay as you go'],['video','Video delivery']];
  return `<section class="hero"><div class="hero-copy"><h1>Find your<br>next edge<span class="accent">.</span></h1><p>Content delivery, with the details that matter.<br>Explore pricing, policies, and real-world tradeoffs.</p><div class="hero-note"><span class="small-avatar">cb</span><span>A personal shortlist, shared in the open.</span></div></div></section><section class="directory" aria-labelledby="directory-title"><div class="section-heading"><div class="section-title"><h2 id="directory-title">Explore providers</h2><span class="count-badge" id="provider-count" aria-live="polite" aria-label="Matching providers">${filteredProviders(state.search,state.filter).length}</span></div></div><div class="directory-toolbar"><div class="filter-tabs" role="group" aria-label="Filter providers">${chips.map(([value,label])=>`<button type="button" data-filter="${value}" class="${state.filter===value?'active':''}" aria-pressed="${state.filter===value}">${label}</button>`).join('')}</div><label class="search-field">${icon('search',17)}<input id="provider-search" name="search" type="search" placeholder="Find a provider or feature…" value="${e(state.search)}" aria-label="Search providers"><kbd>/</kbd></label></div><div class="provider-table"><div class="table-header"><span></span><span>PROVIDER</span><span>THE SHORT VERSION</span><span>PRICING</span><span>GETTING STARTED</span><span></span></div><div id="provider-rows">${renderProviderRows(state.search,state.filter,state.selected)}</div></div><div class="table-foot"><a href="/archive/">3 archived providers ${icon('arrow',14)}</a></div></section><section class="below-directory"><a class="field-note" href="/locations/south-korea/"><div class="eyebrow">FROM THE FIELD GUIDE <span>01</span></div><h3>Find a CDN<br>with a Seoul PoP.</h3><p>Check Seoul availability, plan restrictions,<br>and Korean delivery rates.</p><span class="text-link">Explore South Korea ${icon('arrow',17)}</span><span class="field-note-globe" aria-hidden="true">${icon('globe',110)}</span></a></section>`;
}

function renderReferences(record) {
  if (!record.sources?.length) return '';
  const reviewed = record.reviewedAt
    ? new Date(record.reviewedAt + 'T00:00:00Z').toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone:'UTC' })
    : '';
  return `<details class="provider-references"><summary>Sources ${icon('down',13)}</summary><div class="reference-content">${record.sources.map(source=>external(source.url,e(source.label),'reference-link')).join('')}${reviewed ? `<span class="review-date">Reviewed ${e(reviewed)}</span>` : ''}</div></details>`;
}

function providerDetail(p, state) {
  return `${breadcrumb(p.name)}<section class="detail-hero"><div class="provider-title">${logo(p,true)}<h1>${e(p.name)}</h1></div><p class="detail-summary">${e(p.summary)}</p><div class="detail-actions">${external(p.website,'Visit website','button primary')}<button class="button secondary" type="button" data-toggle-compare="${p.slug}">${icon('compare',16)} ${state.selected.includes(p.slug)?'Added to comparison':'Add to comparison'}</button></div></section><div class="detail-layout"><div><section class="editorial-note"><div class="note-label">Maintainer's note</div><p>${e(p.editorial)}</p></section><section class="detail-section"><h2>Pricing & conditions</h2><div class="pricing-lead">${e(p.pricingLabel)}<span>${p.pricingModel==='quote'?'Contact sales for a quote':p.pricingModel==='usage'?'Usage-based pricing':'Subscription pricing'}</span></div><ul class="plain-list">${p.pricingNotes.map(n=>`<li>${e(n)}</li>`).join('')}</ul></section><section class="detail-section"><h2>Network & delivery</h2><dl class="fact-list"><div><dt>Network</dt><dd>${e(p.networkNote)}</dd></div><div><dt>Video delivery</dt><dd>${e(p.videoLabel)}</dd></div><div><dt>Free tier / trial</dt><dd>${e(p.freeTierLabel)}</dd></div></dl></section>${renderReferences(p)}</div><aside class="detail-aside"><div class="aside-heading">AT A GLANCE</div><dl><dt>Pricing model</dt><dd>${e(p.pricingModel==='quote'?'Custom quote':p.pricingModel==='usage'?'Pay as you go':'Subscription')}</dd><dt>Getting started</dt><dd>${e(p.freeTierLabel)}</dd><dt>In the shortlist for</dt><dd><div class="tag-stack">${p.tags.map(t=>pill(t)).join('')}</div></dd></dl><div class="aside-divider"></div><h3>Used this CDN?</h3><p>Share your experience with its routing, support, or policies.</p>${external('https://github.com/lidarbtc/awesome-cdn/issues/new?title='+encodeURIComponent('Experience: '+p.name),'Share an experience','text-link')}</aside></div>`;
}

function comparison(state) {
  const selected = (state.selected.length ? state.selected : ['cloudflare','bunny','gcore']).map(getProvider).filter(Boolean).slice(0,3);
  const rows=[['Pricing', p=>e(p.pricingLabel)],['Pricing model',p=>e(p.pricingModel==='usage'?'Pay as you go':p.pricingModel==='quote'?'Custom quote':'Subscription')],['Free tier / trial',p=>e(p.freeTierLabel)],['Video delivery',p=>e(p.videoLabel)],['Network',p=>e(p.networkNote)],['Maintainer’s take',p=>e(p.editorial)]];
  return `<section class="page-intro"><h1>A closer comparison<span class="accent">.</span></h1><p>Put the conditions next to the price. Compare up to three providers.</p></section><div class="compare-controls"><span>${selected.length} providers selected</span><button type="button" class="text-button" data-copy-comparison>${icon('link',16)} Copy comparison link</button></div><div class="comparison-scroll" tabindex="0" role="region" aria-label="Provider comparison table"><table class="comparison-table"><thead><tr><th class="comparison-label">THE DETAILS</th>${selected.map((p,i)=>`<th><div class="comparison-provider">${logo(p)}<label class="sr-only" for="provider-slot-${i}">Provider ${i+1}</label><select id="provider-slot-${i}" data-compare-slot="${i}">${providers.map(option=>`<option value="${option.slug}" ${option.slug===p.slug?'selected':''} ${selected.some((other,j)=>j!==i&&other.slug===option.slug)?'disabled':''}>${e(option.name)}</option>`).join('')}</select></div><a class="quiet-link" href="/providers/${p.slug}/">View field notes ${icon('arrow',14)}</a></th>`).join('')}</tr></thead><tbody>${rows.map(([name,get])=>`<tr><th scope="row">${name}</th>${selected.map(p=>`<td>${get(p)}</td>`).join('')}</tr>`).join('')}</tbody></table></div><div class="compare-bottom"><a href="/" class="text-link">${icon('plus',16)} Choose providers from the directory</a></div><div class="inline-callout">${icon('info',20)}<div><strong>Need to compare an actual traffic bill?</strong><p>Use the calculator for the plans with verified public pricing.</p></div><a href="/calculator/" class="button secondary">Estimate costs ${icon('arrow',16)}</a></div>`;
}

export function renderEstimates(input = {trafficTB:10,asiaPercent:50,requestsMillions:10}) {
  return calculatorPlans.map(plan=>{
    const result=estimatePlan(plan.id,input);
    return `<article class="estimate-row"><div class="estimate-heading"><div><div class="eyebrow">${e(plan.provider)}</div><h3>${e(plan.name)}</h3></div><div class="estimate-total">${result.monthlyCost===null?'<strong class="quote-total">Confirm pricing</strong>':`<strong>${money(result.monthlyCost)}</strong><span>/ month</span>`}</div></div><p class="estimate-description">${e(plan.description)}</p><details><summary>Cost breakdown & assumptions ${icon('down',14)}</summary><div class="estimate-breakdown">${result.breakdown.map(b=>`<div><span>${e(b.label)}</span><strong>${money(b.amount)}</strong></div>`).join('')}${result.notes.map(n=>`<p>${e(n)}</p>`).join('')}${result.excluded.length?`<p><strong>Not included:</strong> ${e(result.excluded.join(' · '))}</p>`:''}<div class="calculator-reference">${external(result.source.url,'Pricing','text-link')}<span>Checked ${e(result.verifiedAt)}</span></div></div></details></article>`;
  }).join('');
}
function calculator() {
  return `<section class="page-intro"><div class="eyebrow">A LITTLE LESS MENTAL MATH</div><h1>Put a price on your traffic<span class="accent">.</span></h1><p>Public delivery pricing, with the minimums and regional rates included.</p></section><div class="calculator-layout"><form class="calculator-form" id="calculator-form"><div class="form-heading">Your monthly usage</div><label class="input-label" for="traffic">Data delivered</label><div class="unit-input"><input type="number" id="traffic" name="trafficTB" min="0" max="1000000" step="any" value="10" required><span>TB / month</span></div><div class="traffic-presets">${[1,10,100,250].map(n=>`<button type="button" data-traffic="${n}" class="${n===10?'active':''}">${n} TB</button>`).join('')}</div><div class="label-line"><label class="input-label" for="asia">Audience in Asia & Oceania</label><output id="asia-output" for="asia">50%</output></div><input type="range" id="asia" name="asiaPercent" min="0" max="100" step="1" value="50"><div class="range-labels"><span>0%</span><span>100%</span></div><p class="input-hint">The remaining traffic is delivered in Europe & North America.</p><label class="input-label" for="requests">Requests</label><div class="unit-input"><input type="number" id="requests" name="requestsMillions" min="0" max="1000000000" step="any" value="10" required><span>million / month</span></div><p class="input-hint">Bunny has no request fees. Confirm request charges with CDN77.</p><div class="calculator-note">${icon('info',16)}<span>1 TB = 1,000 GB. USD, before tax. Expand each estimate for its scope and exclusions.</span></div></form><section class="calculator-results" aria-label="Cost estimates"><div class="results-heading"><h2>Estimated delivery cost</h2><span>3 public plans</span></div><div id="calculator-error" role="alert"></div><div id="calculator-estimates" aria-live="polite">${renderEstimates()}</div><p class="subtle-note">These are delivery estimates, not a complete infrastructure bill. Origin, storage, add-ons, and negotiated discounts can change the total.</p></section></div>`;
}

function seoulTable() {
  const statusLabels = { listed: 'Listed', private: 'Private PoP', unconfirmed: 'Unconfirmed' };
  return `<div class="seoul-table-wrap"><table class="seoul-table">
    <caption class="sr-only">Seoul CDN locations, product access, and published Korean delivery pricing</caption>
    <thead><tr><th scope="col">Provider</th><th scope="col">Seoul PoP</th><th scope="col">Product & access</th><th scope="col">Korea pricing</th></tr></thead>
    <tbody>${seoulProviders.map(record => {
      const provider = getProvider(record.slug);
      return `<tr><th scope="row"><a class="provider-identity" href="/providers/${provider.slug}/">${logo(provider)}<strong>${e(provider.name)}</strong></a></th>
        <td data-label="Seoul PoP"><span class="seoul-status ${e(record.seoulStatus)}">${e(statusLabels[record.seoulStatus])}</span><p>${e(record.locationNote)}</p></td>
        <td data-label="Product & access"><strong>${e(record.product)}</strong><p>${e(record.planNote)}</p></td>
        <td data-label="Korea pricing"><strong class="seoul-price">${e(record.pricing)}</strong><p>${e(record.pricingNote)}</p></td></tr>`;
    }).join('')}</tbody>
  </table></div>`;
}

function seoulSources() {
  const reviewed = new Date(seoulReviewDate + 'T00:00:00Z').toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric', timeZone:'UTC' });
  return `<details class="provider-references seoul-references"><summary>Sources · checked ${e(reviewed)} ${icon('down',13)}</summary><div class="seoul-source-grid">${seoulProviders.map(record => `<section><h3>${e(getProvider(record.slug).name)}</h3>${record.sources.map(source => external(source.url,e(source.label),'reference-link')).join('')}</section>`).join('')}</div></details>`;
}

function locations(detail=false) {
  if(!detail) return `<section class="page-intro"><h1>Closer to your audience<span class="accent">.</span></h1><p>Regional field notes on the networks, pricing, and policies behind delivery.</p></section><a class="location-feature" href="/locations/south-korea/"><div class="location-art"><div class="korea-symbol" aria-hidden="true"><span></span><i></i><i></i><i></i><i></i></div><span class="map-coordinates">37.5665° N &nbsp; 126.9780° E</span></div><div class="location-copy"><div class="eyebrow">REGIONAL FIELD GUIDE · 01</div><h2>South Korea</h2><p>Seoul PoPs, product restrictions, and Korean delivery rates across the ${providers.length} providers in our directory.</p><span class="text-link">Explore Seoul availability ${icon('arrow',18)}</span></div></a><div class="location-bottom"><h3>Built one region at a time.</h3><p>Each guide brings together published locations, product terms, and regional pricing. Sources and review dates stay with the guide.</p><a class="text-link" href="/methodology/">How we review the data ${icon('arrow',16)}</a></div>`;
  return `${breadcrumb('South Korea',{href:'/locations/',text:'Locations'})}
    <section class="page-intro region-intro"><h1>CDNs with Seoul PoPs<span class="accent">.</span></h1><p>Seoul availability, plan restrictions, and pricing for delivery in South Korea.</p></section>
    <section class="seoul-directory" aria-labelledby="seoul-directory-title">
      <div class="section-heading"><h2 id="seoul-directory-title">Seoul availability</h2><span class="seoul-count">${seoulProviders.length} providers reviewed</span></div>
      <p class="seoul-intro">Listed locations come from provider documentation. Check the product and plan alongside the location; the edge serving your request can vary.</p>
      ${seoulTable()}
      <p class="seoul-table-note">Unconfirmed means current Seoul CDN availability could not be established. Prices retain published currencies and units: Gcore bills in euros; Google uses GiB / TiB. Other quoted prices are in USD.</p>
    </section>
    <section class="seoul-notes" aria-labelledby="seoul-notes-title"><h2 id="seoul-notes-title">A few conditions worth knowing</h2><div class="seoul-note-grid">
      <article><h3>A private Seoul PoP</h3><p>CacheFly marks Seoul as a private PoP. Confirm the access terms for your contract before treating it as part of a standard plan.</p><a class="text-link" href="/providers/cachefly/">CacheFly details ${icon('arrow',14)}</a></article>
      <article><h3>Korea has its own rate</h3><p>Fastly, BytePlus, and Azure Front Door publish separate Korean rates. Match the country, usage band, and request charges when comparing a bill.</p><a class="text-link" href="/providers/fastly/">Fastly details ${icon('arrow',14)}</a></article>
      <article><h3>Check the network tier</h3><p>Bunny lists Seoul on Standard, with Asia & Oceania enabled. Volume has a smaller footprint. CloudFront PAYG includes Korea in Price Class 200 and All; Class 100 excludes it.</p><a class="text-link" href="/providers/bunny/">Bunny CDN details ${icon('arrow',14)}</a></article>
    </div></section>
    <div class="seoul-measurement-link"><div><h2>Check delivery from your network</h2><p>Record the plan, ISP, responding edge, and cache status. The Lab outlines how we plan to collect comparable samples.</p></div><a class="text-link" href="/lab/#seoul-study">Seoul measurement plan ${icon('arrow',16)}</a></div>
    ${seoulSources()}`;
}

function lab() {
  const protocols=[['Edge selection','Where does this request actually land?',['Record the CDN product, plan, and test hostname.','Identify the access ASN, resolver, IP version, and vantage point.','Use documented edge identifiers where available; preserve uncertainty.','Retain a representative route and record meaningful changes.']],['Warm-cache delivery','What happens after the content is cached?',['Use the same object size and cache policy across products.','Confirm a cache hit before including a sample.','Keep connection reuse, protocol, and test timing consistent.','Publish the sample count, failures, and TTFB distribution.']],['Purge propagation','When does an update reach the edge?',['Publish a versioned object, then prime the test edges.','Timestamp the purge request and acknowledgment.','Observe when each edge serves the new version.','Describe the purge API, polling interval, and any uncertainty.']]];
  return `<section class="page-intro"><div class="eyebrow">NOTES FROM THE WORKBENCH</div><h1>Show your working<span class="accent">.</span></h1><p>Small, reproducible studies of how content delivery behaves.</p></section><div class="lab-status">${icon('flask',20)}<div><strong>The lab is taking shape.</strong><p>These are draft protocols. Measured results will be published when the test infrastructure is ready.</p></div></div><section class="seoul-study" id="seoul-study" aria-labelledby="seoul-study-title"><div class="section-heading"><h2 id="seoul-study-title">Seoul delivery study</h2>${pill('Planned')}</div><p>Start with one identified residential connection and a small set of CDN plans. Add KT, SK Broadband, and LG U+ connections as measurement points become available, keeping each connection’s results separate.</p><dl class="study-scope"><div><dt>Test content</dt><dd>Serve the same small static file from an origin we control through each CDN. Match the object size, cache policy, and client settings.</dd></div><div><dt>What to collect</dt><dd>Record the responding edge when identifiable, confirm cache HIT status, and collect TTFB samples at several times of day. Keep IPv4 and IPv6 samples separate.</dd></div><div><dt>What to publish</dt><dd>Include the provider and plan, ISP and ASN, connection type, test region, dates, sample count, failures, and median / p95 TTFB. Describe connection reuse and protocol settings with the results.</dd></div><div><dt>Scope of a result</dt><dd>A residential connection and a data-center server represent different access paths. Label each measurement point and preserve uncertainty when an edge cannot be identified.</dd></div></dl><a class="text-link" href="/locations/south-korea/">Seoul locations & plan terms ${icon('arrow',14)}</a></section><div class="protocol-list">${protocols.map(([title,question,steps],i)=>`<details class="protocol" ${i===0?'open':''}><summary><span class="protocol-number">0${i+1}</span><span><strong>${title}</strong><span>${question}</span></span>${pill('Protocol draft')}${icon('plus',20)}</summary><div class="protocol-body"><ol>${steps.map(s=>`<li>${s}</li>`).join('')}</ol><a class="quiet-link" href="/methodology/">How observations are reported ${icon('arrow',14)}</a></div></details>`).join('')}</div>`;
}

function methodology() {
  return `<section class="page-intro"><h1>About the data<span class="accent">.</span></h1></section><div class="prose"><h2>Provider information</h2><p>We check prices, product terms, and network information against vendor documentation. Each provider page has a short Sources section with the references and review date. Unavailable or conflicting terms stay unresolved.</p><p>Prices retain their original currency and billing units. A one-time credit or trial is listed separately from an ongoing free allowance.</p><h2>Experience & measurements</h2><p>Maintainer notes contain personal opinions and operating experience. Community reports need the product, plan, region, and date to be useful.</p><p>Published measurements will include the test conditions and collection period. No measurement results have been published yet.</p><h2>Cost estimates</h2><p>The calculator uses public rates for the supported plans. Expand a result for its charges, assumptions, and exclusions. Sales quotes and negotiated discounts may differ.</p></div>`;
}

function about() {
  return `<section class="page-intro"><div class="eyebrow">A SMALL, INDEPENDENT PROJECT</div><h1>A field guide<br>for a better internet<span class="accent">.</span></h1><p>cache.box grows out of awesome-cdn, a personal shortlist of content delivery networks.</p></section><div class="prose"><h2>The things between the bullet points</h2><p>A low bandwidth price is useful. So is knowing which network it buys, where requests end up, and which policy applies to your content. This guide keeps those details close together.</p><p>It is maintained by ${external('https://github.com/lidarbtc','lidarbtc')} and built in the open. There are no paid placements in the directory.</p><h2>Experience belongs here</h2><p>The original shortlist includes direct opinions and operational experience. Those notes are part of the guide. They appear alongside source documents, with a clear distinction between what is published, observed, and interpreted.</p><h2>Make it a little more useful</h2><p>Corrections, better sources, and detailed first-hand reports are welcome. Include the product and plan, when you used it, and the context that shaped your experience.</p>${external('https://github.com/lidarbtc/awesome-cdn','Contribute on GitHub','button primary')}</div>`;
}
function archive() {
  return `<section class="page-intro"><div class="eyebrow">THE ARCHIVE</div><h1>Part of the history<span class="accent">.</span></h1><p>Former CDN services and what happened to them.</p></section><div class="archive-list">${archivedProviders.map(p=>`<details class="archive-item" id="${p.slug}"><summary>${logo(p)}<span><strong>${e(p.name)}</strong><span>Discontinued CDN service</span></span>${icon('plus',20)}</summary><div class="archive-body"><p>${e(p.summary)}</p>${p.statusNote ? `<p>${e(p.statusNote)}</p>` : ''}${p.editorial ? `<p>${e(p.editorial)}</p>` : ''}${p.pricingNotes.length ? `<ul class="plain-list">${p.pricingNotes.map(n=>`<li>${e(n)}</li>`).join('')}</ul>` : ''}${renderReferences(p)}</div></details>`).join('')}</div>`;
}

export function renderTray(selected = []) {
  const list=selected.map(getProvider).filter(Boolean);
  return `<div class="tray-inner"><div class="tray-label">${icon('compare',18)}<strong>Compare</strong><span>${list.length}/3</span></div><div class="tray-providers">${list.map(p=>`<button type="button" data-remove-compare="${p.slug}" aria-label="Remove ${e(p.name)} from comparison">${e(p.shortName || p.name)}${icon('close',12)}</button>`).join('')}</div><div class="tray-actions"><button type="button" data-clear-compare class="tray-clear">Clear</button><a class="button primary ${list.length<2?'disabled':''}" ${list.length<2?'aria-disabled="true" tabindex="-1"':''} href="/compare/?providers=${list.map(p=>p.slug).join(',')}">Compare ${icon('arrow',16)}</a></div></div>`;
}

export function renderPage(pathname, input = {}) {
  const path=pathname.endsWith('/')?pathname:pathname+'/';
  const state={selected:[], search:'',filter:'all',...input};
  let content,title,description,noindex=false;
  if(path==='/'){
    title='CDN Comparison: Pricing & Networks';
    description='Compare CDN pricing, free tiers, network capacity, and delivery policies, with practical notes for developers.';
    content=directory(state);
  }
  else if(path.startsWith('/providers/')){const p=getProvider(path.split('/')[2]);if(p){title=p.name+': Pricing & Network';description=p.summary;content=providerDetail(p,state);}}
  else if(path==='/compare/'){
    title='Compare CDN Providers';
    description='Compare up to three CDNs side by side across prices, free plans, video delivery terms, and network details.';
    content=comparison(state);noindex=true;
  }
  else if(path==='/calculator/'){
    title='CDN Cost Calculator';
    description='Estimate monthly Bunny CDN and CDN77 delivery costs from your traffic volume and audience location, with plan minimums and calculation limits.';
    content=calculator();noindex=true;
  }
  else if(path==='/locations/'){
    title='Regional CDN Guides';
    description='Regional CDN guides, starting with South Korea. Learn what to check in access networks, pricing, and edge locations.';
    content=locations();
  }
  else if(path==='/locations/south-korea/'){
    title='CDNs with Seoul PoPs: Plans & Pricing';
    description='Compare Seoul PoP availability, product restrictions, and Korean delivery rates across 19 CDN providers, with links to the underlying sources.';
    content=locations(true);
  }
  else if(path==='/lab/'){
    title='CDN Testing Protocols';
    description='Draft test protocols for CDN edge selection, warm-cache delivery, and purge propagation. Measurement results are not published yet.';
    content=lab();noindex=true;
  }
  else if(path==='/methodology/'){
    title='How We Review CDN Information';
    description='How cache.box checks CDN pricing and policies, handles maintainer notes, and calculates delivery estimates.';
    content=methodology();
  }
  else if(path==='/about/'){
    title='About the CDN Directory';
    description='cache.box is an independent CDN directory maintained by lidarbtc, with practical provider notes and no paid placements.';
    content=about();
  }
  else if(path==='/archive/'){
    title='Discontinued CDN Services';
    description='Announcements and closure details for StackPath, Edgio, and Lumen CDN, including transfers of customer contracts to Akamai.';
    content=archive();
  }
  if(!content){title='Page not found';description='The requested page could not be found. Browse the cache.box directory to explore CDN providers.';noindex=true;content='<section class="page-intro"><div class="eyebrow">404</div><h1>A cache miss.</h1><p>That page is not in the guide.</p><a class="button primary" href="/">Back to providers</a></section>';}
  return {title:title+' | cache.box',description,noindex,body:header(path)+`<main id="main" class="site-main ${path==='/'?'home-main':''}">${content}</main>`+footer()+`<aside class="compare-tray" id="compare-tray" aria-label="Selected providers" ${state.selected.length && path!=='/compare/'?'':'hidden'}>${renderTray(state.selected)}</aside><div class="toast" id="toast" role="status" aria-live="polite" hidden></div>`};
}
