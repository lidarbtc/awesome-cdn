/**
 * Public CDN delivery estimates. All input traffic uses decimal TB (1,000 GB).
 * Prices were checked against the linked vendor pages on 2026-10-10.
 * These estimates exclude tax, origin egress, storage, and optional products.
 */

const VERIFIED_AT = '2026-10-10';
const bunnySource = { label: 'bunny.net CDN pricing', url: 'https://bunny.net/pricing/cdn/' };
const cdn77Source = { label: 'CDN77 pricing', url: 'https://www.cdn77.com/pricing' };

export const calculatorPlans = [
  {
    id: 'bunny-standard',
    providerId: 'bunny',
    provider: 'bunny.net',
    name: 'Standard Network',
    description: 'Regional delivery rates · $1 monthly minimum',
    pricingModel: 'Regional pay as you go',
    source: bunnySource,
    verifiedAt: VERIFIED_AT,
  },
  {
    id: 'bunny-volume',
    providerId: 'bunny',
    provider: 'bunny.net',
    name: 'Volume Network',
    description: 'Smaller network · $0.005/GB for the first 500 TB',
    pricingModel: 'Global pay as you go',
    source: bunnySource,
    verifiedAt: VERIFIED_AT,
  },
  {
    id: 'cdn77-growth',
    providerId: 'cdn77',
    provider: 'CDN77',
    name: 'Growth',
    description: '$990/month includes 250 TB · $3.96/TB overage',
    pricingModel: 'Monthly commitment',
    source: cdn77Source,
    verifiedAt: VERIFIED_AT,
  },
];

const money = (value) => Math.round((value + Number.EPSILON) * 100) / 100;

function validateNumber(name, value, maximum = Number.MAX_SAFE_INTEGER) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > maximum) {
    throw new RangeError(`${name} must be a finite number between 0 and ${maximum}.`);
  }
}

/**
 * @param {string} planId A calculatorPlans id.
 * @param {{trafficTB:number, asiaPercent?:number, requestsMillions?:number}} input
 * @returns {{monthlyCost:number|null,currency:string,breakdown:Array<{label:string,amount:number}>,notes:string[],excluded:string[],source:{label:string,url:string},verifiedAt:string,eligible:boolean}}
 * eligible means this scenario can be estimated, not that a vendor approved it.
 * Requests are validated, but only Bunny explicitly publishes zero CDN request
 * fees. CDN77 request charges are unmodeled and identified in excluded.
 */
export function estimatePlan(planId, input = {}) {
  const plan = calculatorPlans.find((candidate) => candidate.id === planId);
  if (!plan) throw new RangeError(`Unknown calculator plan: ${planId}`);

  const { trafficTB, asiaPercent = 0, requestsMillions = 0 } = input;
  validateNumber('trafficTB', trafficTB, Number.MAX_SAFE_INTEGER / 1000);
  validateNumber('asiaPercent', asiaPercent, 100);
  validateNumber('requestsMillions', requestsMillions);

  const result = {
    monthlyCost: null,
    currency: 'USD',
    breakdown: [],
    notes: ['Delivery estimate in USD; 1 TB = 1,000 GB.'],
    excluded: ['Taxes', 'Origin egress', 'Storage', 'Optional products and paid support'],
    source: { ...plan.source },
    verifiedAt: plan.verifiedAt,
    eligible: true,
  };

  if (planId === 'cdn77-growth') {
    result.breakdown.push({ label: 'Growth commitment · includes 250 TB', amount: 990 });
    const overageTB = Math.max(0, trafficTB - 250);
    if (overageTB > 0) {
      result.breakdown.push({ label: 'Traffic above 250 TB · $3.96/TB', amount: money(overageTB * 3.96) });
    }
    result.notes.push('Global coverage; the regional mix does not change the published delivery rate.');
    result.notes.push('This is a monthly commitment, including months below 250 TB. Sales confirmation is required.');
    result.excluded.push('CDN request charges: no separate public rate modeled; confirm with CDN77.');
  } else {
    result.notes.push('No CDN request fees; the request count does not change this estimate.');
    result.notes.push('The $1 account minimum assumes this is your only bunny.net usage.');
    const trafficGB = trafficTB * 1000;

    if (planId === 'bunny-standard') {
      const asiaGB = trafficGB * (asiaPercent / 100);
      const europeNorthAmericaGB = trafficGB - asiaGB;
      result.breakdown.push(
        { label: 'Europe & North America · $0.01/GB', amount: money(europeNorthAmericaGB * 0.01) },
        { label: 'Asia & Oceania · $0.03/GB', amount: money(asiaGB * 0.03) },
      );
      result.notes.push('Asia input uses the Asia & Oceania rate. Remaining traffic is assigned to Europe & North America.');
      result.excluded.push('Traffic served from South America, the Middle East, or Africa');
      if (trafficTB > 100) result.notes.push('Above 100 TB/month, bunny.net invites a custom sales quote; these are public list rates.');
    } else {
      result.notes.push('Volume uses a smaller network; its coverage differs from Standard.');
      result.notes.push('The regional mix does not change the published Volume rate.');
      if (trafficTB > 500) {
        result.eligible = false;
        result.notes.push('Confirm billing above 500 TB: the public tables do not establish how discounts apply to usage across tiers.');
        if (trafficTB > 1000) {
          result.notes.push('The 1–2 PB rate also conflicts: the pricing page lists $0.002/GB and the documentation lists $0.003/GB.');
        }
        result.notes.push('Ask Bunny to confirm the applicable rate and billing method.');
        return result;
      }
      result.breakdown.push({ label: 'First 500 TB · $0.005/GB', amount: money(trafficGB * 0.005) });
    }

    const delivery = result.breakdown.reduce((total, line) => total + line.amount, 0);
    if (delivery < 1) result.breakdown.push({ label: 'Adjustment to $1 monthly minimum', amount: money(1 - delivery) });
  }

  result.monthlyCost = money(result.breakdown.reduce((total, line) => total + line.amount, 0));
  return result;
}
