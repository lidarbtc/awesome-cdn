import { providers, getProvider } from './data/providers.js';
import { renderPage, renderProviderRows, filteredProviders, renderTray, renderEstimates } from './views.js';

const storageKey='cachebox:comparison';
let selected=[];
try { selected=JSON.parse(localStorage.getItem(storageKey)||'[]'); } catch { /* Storage can be disabled. */ }
selected=Array.isArray(selected)?[...new Set(selected.filter(slug=>getProvider(slug)))].slice(0,3):[];
const params=new URLSearchParams(location.search);
const isComparison=location.pathname.replace(/\/$/,'')==='/compare';
if(isComparison){
  const fromUrl=(params.get('providers')||'').split(',').filter(slug=>getProvider(slug));
  selected=[...new Set(fromUrl.length?fromUrl:selected.length?selected:['cloudflare','bunny','gcore'])].slice(0,3);
  document.body.innerHTML=renderPage(location.pathname,{selected}).body;
}
let search=params.get('q')||'';
let filter=['all','free','usage','video'].includes(params.get('filter'))?params.get('filter'):'all';
let toastTimer;
function toast(message){const box=document.getElementById('toast');box.textContent=message;box.hidden=false;clearTimeout(toastTimer);toastTimer=setTimeout(()=>box.hidden=true,3200);}
function persist(){try{localStorage.setItem(storageKey,JSON.stringify(selected));}catch{/* Keep the current session usable. */}}
function syncCompare(){
  persist();
  const tray=document.getElementById('compare-tray');
  if(tray){tray.innerHTML=renderTray(selected);tray.hidden=!selected.length||isComparison;}
  document.querySelectorAll('[data-compare]').forEach(input=>{input.checked=selected.includes(input.dataset.compare);});
  document.querySelectorAll('[data-toggle-compare]').forEach(button=>{button.classList.toggle('is-selected',selected.includes(button.dataset.toggleCompare));button.setAttribute('aria-pressed',String(selected.includes(button.dataset.toggleCompare)));button.lastChild.textContent=selected.includes(button.dataset.toggleCompare)?' Added to comparison':' Add to comparison';});
  document.body.classList.toggle('has-tray',selected.length>0&&!isComparison);
}
function toggleCompare(slug){
  if(selected.includes(slug))selected=selected.filter(item=>item!==slug);
  else if(selected.length<3)selected.push(slug);
  else toast('Compare up to 3 providers. Remove one to add another.');
  syncCompare();
}
function updateDirectory(){
  const rows=document.getElementById('provider-rows');
  if(!rows)return;
  rows.innerHTML=renderProviderRows(search,filter,selected);
  const count=document.getElementById('provider-count');
  count.textContent=filteredProviders(search,filter).length;
  document.querySelectorAll('[data-filter]').forEach(button=>{const active=button.dataset.filter===filter;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active));});
  const url=new URL(location.href);
  search?url.searchParams.set('q',search):url.searchParams.delete('q');
  filter!=='all'?url.searchParams.set('filter',filter):url.searchParams.delete('filter');
  history.replaceState(null,'',url);
  document.querySelector('meta[name="robots"]')?.setAttribute('content',search||filter!=='all'?'noindex,follow':'index,follow');
}
function updateCalculator(){
  const form=document.getElementById('calculator-form');
  if(!form)return;
  const traffic=form.elements.trafficTB,asia=form.elements.asiaPercent,requests=form.elements.requestsMillions;
  document.getElementById('asia-output').textContent=asia.value+'%';
  asia.style.setProperty('--range-progress',asia.value+'%');
  document.querySelectorAll('[data-traffic]').forEach(button=>button.classList.toggle('active',button.dataset.traffic===traffic.value));
  const error=document.getElementById('calculator-error'),results=document.getElementById('calculator-estimates');
  if(!form.checkValidity()){error.textContent='Enter a valid, non-negative amount for traffic and requests.';results.hidden=true;return;}
  try{results.innerHTML=renderEstimates({trafficTB:Number(traffic.value),asiaPercent:Number(asia.value),requestsMillions:Number(requests.value)});results.hidden=false;error.textContent='';}
  catch{error.textContent='Please enter valid usage values.';results.hidden=true;}
}
document.addEventListener('click', async event=>{
  const filterButton=event.target.closest('[data-filter]');
  if(filterButton){filter=filterButton.dataset.filter;updateDirectory();}
  if(event.target.closest('[data-clear-filters]')){search='';filter='all';const input=document.getElementById('provider-search');input.value='';updateDirectory();input.focus();}
  const toggle=event.target.closest('[data-toggle-compare]');if(toggle)toggleCompare(toggle.dataset.toggleCompare);
  const remove=event.target.closest('[data-remove-compare]');if(remove){selected=selected.filter(slug=>slug!==remove.dataset.removeCompare);syncCompare();}
  if(event.target.closest('[data-clear-compare]')){selected=[];syncCompare();}
  if(event.target.closest('a[aria-disabled="true"]'))event.preventDefault();
  const preset=event.target.closest('[data-traffic]');if(preset){document.getElementById('traffic').value=preset.dataset.traffic;updateCalculator();}
  if(event.target.closest('[data-copy-comparison]')){
    const url=new URL('/compare/',location.origin);url.searchParams.set('providers',selected.join(','));
    try{await navigator.clipboard.writeText(url.href);toast('Comparison link copied.');}catch{toast('Copy the comparison URL from your address bar.');history.replaceState(null,'',url);}
  }
  const menu=event.target.closest('.mobile-menu');
  if(menu){const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');document.querySelector('.site-header').classList.toggle('menu-open',open);}
});
document.addEventListener('change',event=>{
  if(event.target.matches('[data-compare]'))toggleCompare(event.target.dataset.compare);
  if(event.target.matches('[data-compare-slot]')){
    const slot=Number(event.target.dataset.compareSlot);
    selected[slot]=event.target.value;
    selected=[...new Set(selected)];persist();
    const url=new URL(location.href);url.searchParams.set('providers',selected.join(','));history.replaceState(null,'',url);
    document.body.innerHTML=renderPage('/compare/',{selected}).body;syncCompare();
    document.getElementById('provider-slot-'+slot)?.focus({preventScroll:true});
  }
});
document.addEventListener('input',event=>{
  if(event.target.id==='provider-search'){search=event.target.value;updateDirectory();}
  if(event.target.closest('#calculator-form'))updateCalculator();
});
document.addEventListener('submit',event=>{if(event.target.id==='calculator-form'){event.preventDefault();updateCalculator();}});
document.addEventListener('keydown',event=>{
  if(event.key==='/'&&!['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName)&&document.getElementById('provider-search')){event.preventDefault();document.getElementById('provider-search').focus();}
  if(event.key==='Escape'){
    const header=document.querySelector('.site-header');
    const navHadFocus=Boolean(document.activeElement.closest('.main-nav'));
    header?.classList.remove('menu-open');
    const menu=document.querySelector('.mobile-menu');
    menu?.setAttribute('aria-expanded','false');
    menu?.setAttribute('aria-label','Open navigation');
    if(navHadFocus)menu?.focus();
  }
});
if(document.getElementById('provider-search')){document.getElementById('provider-search').value=search;updateDirectory();}
syncCompare();
updateCalculator();
