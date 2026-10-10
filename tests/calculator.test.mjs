import test from 'node:test';
import assert from 'node:assert/strict';
import { calculatorPlans, estimatePlan } from '../src/data/calculator.js';

const estimate = (plan, trafficTB, asiaPercent = 0, requestsMillions = 0) =>
  estimatePlan(plan, { trafficTB, asiaPercent, requestsMillions });

test('zero traffic and small usage respect the Bunny account minimum', () => {
  for (const id of ['bunny-standard', 'bunny-volume']) {
    assert.equal(estimate(id, 0).monthlyCost, 1);
    assert.equal(estimate(id, 0.001).monthlyCost, 1);
  }
  assert.equal(estimate('bunny-standard', 0.1).monthlyCost, 1);
  assert.equal(estimate('bunny-standard', 0.11).monthlyCost, 1.1);
  assert.equal(estimate('bunny-volume', 0.2).monthlyCost, 1);
});

test('Standard allocates a decimal TB across the two supported billing regions', () => {
  assert.equal(estimate('bunny-standard', 1, 0).monthlyCost, 10);
  assert.equal(estimate('bunny-standard', 1, 100).monthlyCost, 30);
  const mixed = estimate('bunny-standard', 10, 30);
  assert.equal(mixed.monthlyCost, 160);
  assert.deepEqual(mixed.breakdown.map((line) => line.amount), [70, 90]);
});

test('published Bunny request fees are zero, even at high request counts', () => {
  for (const id of ['bunny-standard', 'bunny-volume']) {
    assert.equal(estimate(id, 10, 50, 0).monthlyCost, estimate(id, 10, 50, 100000).monthlyCost);
    assert.ok(estimate(id, 10).notes.some((note) => note.includes('No CDN request fees')));
  }
});

test('Volume calculates the verified first tier and withholds unconfirmed discounts', () => {
  assert.equal(estimate('bunny-volume', 499).monthlyCost, 2495);
  assert.equal(estimate('bunny-volume', 500).monthlyCost, 2500);
  for (const trafficTB of [500.001, 501, 600, 1000]) {
    const result = estimate('bunny-volume', trafficTB);
    assert.equal(result.monthlyCost, null);
    assert.equal(result.eligible, false);
    assert.deepEqual(result.breakdown, []);
    assert.ok(result.notes.some(note => note.includes('500 TB')));
  }
});

test('conflicting Volume rates remain unresolved instead of being extrapolated', () => {
  for (const trafficTB of [1000.001, 1500, 2001]) {
    const result = estimate('bunny-volume', trafficTB);
    assert.equal(result.monthlyCost, null);
    assert.equal(result.eligible, false);
    assert.deepEqual(result.breakdown, []);
    assert.ok(result.notes.some((note) => note.includes('conflicts')));
  }
});

test('CDN77 charges the full commitment below and at its included traffic', () => {
  for (const trafficTB of [0, 1, 100, 250]) {
    assert.equal(estimate('cdn77-growth', trafficTB).monthlyCost, 990);
  }
});

test('CDN77 adds the published overage instead of replacing its commitment', () => {
  assert.equal(estimate('cdn77-growth', 251).monthlyCost, 993.96);
  assert.equal(estimate('cdn77-growth', 300).monthlyCost, 1188);
  assert.equal(estimate('cdn77-growth', 300, 100).monthlyCost, 1188);
  const withRequests = estimate('cdn77-growth', 300, 50, 100);
  assert.equal(withRequests.monthlyCost, 1188);
  assert.ok(withRequests.excluded.some((item) => item.includes('CDN request charges')));
});

test('rejects invalid numbers and percentages rather than returning NaN or coercing strings', () => {
  for (const value of [NaN, Infinity, -Infinity, -1, '10', null]) {
    for (const field of ['trafficTB', 'asiaPercent', 'requestsMillions']) {
      assert.throws(() => estimatePlan('bunny-standard', { trafficTB: 1, [field]: value }), RangeError);
    }
  }
  assert.throws(() => estimate('bunny-standard', 1, 101), RangeError);
  assert.throws(() => estimatePlan('bunny-standard'), RangeError);
  assert.throws(() => estimatePlan('unknown-plan', { trafficTB: 1 }), RangeError);
});

test('results include source provenance, exclusions, and a reconcilable monetary breakdown', () => {
  for (const plan of calculatorPlans) {
    const result = estimate(plan.id, 25.731, 43);
    assert.equal(result.currency, 'USD');
    assert.equal(result.verifiedAt, '2026-10-10');
    assert.match(result.source.url, /^https:\/\//);
    assert.equal(result.eligible, true);
    assert.equal(result.monthlyCost, Math.round(result.breakdown.reduce((sum, line) => sum + line.amount, 0) * 100) / 100);
    assert.ok(result.excluded.includes('Origin egress'));
    assert.ok(result.notes.some((note) => note.includes('1 TB = 1,000 GB')));
  }
});
