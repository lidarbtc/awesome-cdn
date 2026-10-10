import major from './verified/major.js';
import enterprise from './verified/enterprise.js';
import independent from './verified/independent.js';
import cloud from './verified/cloud.js';
import archive from './verified/archive.js';

const activeIdentities = [
  {"slug":"cloudflare","name":"Cloudflare","shortName":"Cloudflare","website":"https://www.cloudflare.com/","color":"#ed8733","mark":"cf"},
  {"slug":"bunny","name":"Bunny CDN","shortName":"Bunny","website":"https://bunny.net/","color":"#f07735","mark":"b"},
  {"slug":"gcore","name":"Gcore","shortName":"Gcore","website":"https://gcore.com/","color":"#ee633d","mark":"g"},
  {"slug":"fastly","name":"Fastly","shortName":"Fastly","website":"https://www.fastly.com/","color":"#df3b53","mark":"f"},
  {"slug":"cloudfront","name":"Amazon CloudFront","shortName":"CloudFront","website":"https://aws.amazon.com/cloudfront/","color":"#9a70cd","mark":"aws"},
  {"slug":"cdn77","name":"CDN77","shortName":"CDN77","website":"https://www.cdn77.com/","color":"#3098bf","mark":"77"},
  {"slug":"akamai","name":"Akamai","shortName":"Akamai","website":"https://www.akamai.com/","color":"#2775aa","mark":"a"},
  {"slug":"cachefly","name":"CacheFly","shortName":"CacheFly","website":"https://www.cachefly.com/","color":"#46a77b","mark":"c"},
  {"slug":"imperva","name":"Imperva","shortName":"Imperva","website":"https://www.imperva.com/","color":"#c75063","mark":"im"},
  {"slug":"cdnetworks","name":"CDNetworks","shortName":"CDNetworks","website":"https://www.cdnetworks.com/","color":"#2b76bb","mark":"cd"},
  {"slug":"keycdn","name":"KeyCDN","shortName":"KeyCDN","website":"https://www.keycdn.com/","color":"#467fba","mark":"k"},
  {"slug":"belugacdn","name":"BelugaCDN","shortName":"BelugaCDN","website":"https://www.belugacdn.com/","color":"#468eb8","mark":"be"},
  {"slug":"ddos-guard","name":"DDoS-Guard","shortName":"DDoS-Guard","website":"https://ddos-guard.net/","color":"#445aa4","mark":"dg"},
  {"slug":"blazingcdn","name":"BlazingCDN","shortName":"BlazingCDN","website":"https://blazingcdn.com/","color":"#d77730","mark":"bl"},
  {"slug":"fdcservers","name":"FDCservers","shortName":"FDCservers","website":"https://fdcservers.net/product/cdn","color":"#cc403d","mark":"fdc"},
  {"slug":"byteplus","name":"BytePlus CDN","shortName":"BytePlus","website":"https://www.byteplus.com/en/product/cdn","color":"#5769d7","mark":"bp"},
  {"slug":"google-cloud-cdn","name":"Google Cloud CDN","shortName":"Google Cloud","website":"https://cloud.google.com/cdn","color":"#4b7fd3","mark":"gcp"},
  {"slug":"azure-front-door","name":"Azure Front Door","shortName":"Azure","website":"https://azure.microsoft.com/en-us/products/frontdoor/","color":"#3486c9","mark":"az"},
  {"slug":"sucuri","name":"Sucuri","shortName":"Sucuri","website":"https://sucuri.net/website-firewall/","color":"#438873","mark":"su"}
];
const archivedIdentities = [
  {"slug":"stackpath","name":"StackPath","shortName":"StackPath","website":"https://www.stackpath.com/","color":"#657380","mark":"sp"},
  {"slug":"edgio","name":"Edgio","shortName":"Edgio","website":"https://edg.io/","color":"#7b7099","mark":"e"},
  {"slug":"lumen-cdn","name":"Lumen CDN","shortName":"Lumen","website":"https://www.lumen.com/en-us/edge-cloud/cdn.html","color":"#577d91","mark":"lu"}
];

function attachRecords(identities, records) {
  const bySlug = new Map(records.map(record => [record.slug, record]));
  if (bySlug.size !== records.length || identities.length !== records.length) {
    throw new Error('Provider verification records must match the directory exactly.');
  }
  return identities.map(identity => {
    const record = bySlug.get(identity.slug);
    if (!record) throw new Error('Missing verification record: ' + identity.slug);
    return { ...identity, ...record };
  });
}

export const providers = attachRecords(activeIdentities, [...major, ...enterprise, ...independent, ...cloud]);
export const archivedProviders = attachRecords(archivedIdentities, archive);
export const getProvider = slug => providers.find(provider => provider.slug === slug);
