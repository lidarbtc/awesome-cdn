<h1 align="center">
    <img width="380" src="/cdn.love.png" />
    <br> Awesome CDN
</h1>

## 📝 Outline

A personal shortlist of CDNs for individual developers and startups, with practical notes on pricing and tradeoffs.

> Pull requests are welcome.

## 📖 Table of Contents

- [Cloudflare](#cloudflare)
- [Gcore](#gcore)
- [BunnyCDN](#bunnycdn)
- [Akamai](#akamai)
- [CDN77](#cdn77)
- [CloudFront(AWS)](#cloudfrontaws)
- [Fastly](#fastly)
- [CacheFly](#cachefly)
- [Imperva](#imperva)
- [CDNetworks](#cdnetworks)
- [KeyCDN](#keycdn)
- [BelugaCDN](#belugacdn)
- [DDOS-Guard](#ddos-guard)
- [BlazingCDN](#blazingcdn)
- [FDCservers](#fdcservers)
- [BytePlus CDN](#byteplus-cdn)
- [Google Cloud CDN](#google-cloud-cdn)
- [Azure Front Door](#azure-front-door)
- [Sucuri](#sucuri)
- [Closed CDN Services](#closed-cdn-services)
  - [StackPath](#stackpath)
  - [Edgio](#edgio)
  - [LumenCDN](#lumencdn)

## 📦 CDN List

### Rules

- CDN must have POPs in at least two countries to qualify for this list.

### [Cloudflare](https://www.cloudflare.com/)

- Description
  - They provide a cdn, dns with a free plan.
  - Most recommended cdn for free plan.
  - In free plan, APAC route is conditionally provided.
- Network capacity
  - [534 Tbps global network capacity](https://www.cloudflare.com/network-services/products/magic-transit/) (checked 2026.10).
- Have a free plan?
  - Yes
- Pricing
  - Free plan: Free
  - Pro plan: $25/month, or $20/month billed annually.
  - Business plan: $250/month, or $200/month billed annually.
  - Enterprise: $5,000+/month from what I've seen; [contact sales](https://www.cloudflare.com/plans/) for a quote.
- Additional bandwidth price
  - unmetered for all plan
  - But it's inconsistent and subjective, if you use too much bandwidth, they will ask you to upgrade your plan.
  - For video, use paid Cloudflare Stream or Enterprise Stream Delivery.
  - Picture and static file is allowed for all plan. BUT, if you use too much bandwidth, they can suspend your account. you can find this in their terms of service.
  - [And they throttled customers web traffic without notice](https://blog.cloudflare.com/how-cloudflare-erroneously-throttled-a-customers-web-traffic/)
  - However if you use bandwidth normally, you don't have to worry about it.
- Video streaming allowed?
  - Yes, through paid Cloudflare Stream or Enterprise Stream Delivery. [Video policy](https://developers.cloudflare.com/fundamentals/reference/policies-compliances/delivering-videos-with-cloudflare/)

### [Gcore](https://gcore.com/)

- Description
  - They provide a cdn, dns with a free plan.
  - 1TB/month bandwidth for free plan.
  - L3/L4 DDoS protection is included; WAAP is available on request.
- Network capacity
  - [200+ Tbps global network capacity](https://gcore.com/edge-network) (checked 2026.10).
- Have a free plan?
  - Yes
- Pricing
  - Pay-as-you-go: €0/month, including 1TB/month. Prices exclude VAT.
  - Enterprise plan: Contact sales.
  - [Pricing page](https://gcore.com/pricing/edge-network).
- Additional bandwidth price
  - First 1TB/month is free, then €0.01/GB.
  - Requests above 1 billion/month cost €0.75 per million.
- Video streaming allowed?
  - Yes, for all plan.

### [BunnyCDN](https://bunnycdn.com/)

- Description
  - They provide a cdn, dns with a free trial.
  - 14 days free trial, no cc required.
- Network capacity
  - [250+ Tbps network capacity](https://bunny.net/network/) (checked 2026.10).
- Have a free plan?
  - No. Trial ends after 14 days or credit exhaustion: $20 without a card, $50 with a card. [Trial details](https://bunny.net/docs/faq).
- Pricing
  - $1/month minimum. [Pricing page](https://bunny.net/pricing)
  - Standard Network 119 PoPs
    - Europe & North America: $0.01/GB
    - Asia & Oceania: $0.03/GB
    - South America: $0.045/GB
    - Middle East & Africa: $0.06/GB
    - If you serving more than 100TB/m, contact sales team for enterprise plan.
  - Volume Network 10 PoP
    - First 500TB: $0.005/GB
    - From 500TB-1PB: $0.004/GB
    - From 1PB-2PB: Confirm pricing; the pricing page lists $0.002/GB, but the [docs](https://bunny.net/docs/cdn/pricing) list $0.003/GB.
    - From 2PB+: Contact sales team.
- Video streaming allowed?
  - Yes

### [Akamai](https://www.akamai.com/)

- Description
  - Most biggest CDN provider.
  - Focus on enterprise
- Network edge capacity
  - [1+ Pbps edge capacity](https://www.akamai.com/glossary/what-is-a-cdn) (checked 2026.10).
- Have a free plan?
  - No. [30-day Adaptive Media Delivery trial](https://www.akamai.com/products/adaptive-media-delivery).
- Pricing
  - Enterprise: Contact sales team.
  - I reached out to them and they have a similar pricing policy to other CDNs.
- Video streaming allowed?
  - Yes

### [CDN77](https://www.cdn77.com/)

- Description
  - Parent company of datapacket.com
  - Recommended for large bandwidth users.
- Network capacity
  - [330 Tbps global network capacity](https://www.cdn77.com/network) (checked 2026.10).
- Have a free plan?
  - No. [Free trial available through sales](https://www.cdn77.com/pricing).
- Pricing
  - 250TB: $990/M
    - $3.96/TB overages
  - Larger commitments: Contact sales team.
- Video streaming allowed?
  - Yes

### [CloudFront(AWS)](https://aws.amazon.com/cloudfront/)

- Description
  - AWS, Expensive
- Network capacity
  - [Hundreds of Tbps of deployed capacity](https://aws.amazon.com/cloudfront/features/) (checked 2026.10).
- Have a free plan?
  - Pay-as-you-go: 1TB and 10 million requests/month, always free.
  - Flat-rate Free plan: 100GB and 1 million requests/month.
- Pricing
  - It's complicated, visit pricing page for more.
  - Flat-rate Pro: $15/month, including 50TB and 10 million requests, with no overage charges.
  - Sustained excess usage can lead to delivery adjustments.
  - [Pricing page](https://aws.amazon.com/cloudfront/pricing/)
- Video streaming allowed?
  - Yes

### [Fastly](https://www.fastly.com/)

- Description
  - Pricing is insanely expensive.
  - But no one pays full price for that, so reach out to sales and ask for enterprise pricing.
- Network capacity
  - [622 Tbps connected global capacity](https://www.fastly.com/network-map) (2026.06).
- Have a free plan?
  - Yes, 100GB and 1 million requests/month.
- Pricing
  - Visit pricing page for more.
  - [Pricing page](https://www.fastly.com/pricing)
  - First paid 10TB/month: $0.12/GB~$0.28/GB by region.
  - Next 10TB: $0.08/GB~$0.24/GB. Requests above the free allowance start at $0.01 per 10,000.
- Video streaming allowed?
  - Yes

### [CacheFly](https://www.cachefly.com/)

- Description
  - 100GB traffic with a free developer account!
  - Free account supports one domain.
- Have a free plan?
  - Yes, 100GB for one domain; confirm the renewal period.
- Pricing
  - Developer: Free, 100GB, one domain.
  - Adoption: $299/month, 10TB/month.
  - Production: $1,499/month, 10TB/month.
  - Governance: $3,499/month, 10TB/month.
  - Contact sales for additional bandwidth.
  - [Pricing page](https://www.cachefly.com/cdn-pricing/)
- Video streaming allowed?
  - Yes

### [Imperva](https://www.imperva.com/)

- Description
  - Focus on ddos protection.
  - also WAF
- DDoS scrubbing capacity
  - [13 Tbps](https://www.imperva.com/products/ddos-protection-services/) (checked 2026.10).
- Have a free plan?
  - No. [30-day free trial](https://www.imperva.com/free-trial/). Trials may be capped at 100 Mbps, with excess traffic null-routed.
- Pricing
  - Contact sales team.
  - Very expensive, not suitable for large websites.
- Video streaming allowed?
  - If you know, please send a pull request.

### [CDNetworks](https://www.cdnetworks.com/)

- Description
  - CDN focused on Asia (specifically China).
- Network edge capacity
  - [200+ Tbps CDN capacity](https://documents.cdnetworks.com/document/media-live-vod/overviewvod) (2026.05).
- Have a free plan?
  - No. CDN Pro has a free trial.
- Pricing
  - Not an attractive price.
  - CDN Pro Professional: from $0.04/GB + $1.95/CPU-hour, with a $50/month minimum.
  - [Pricing page](https://www.cdnetworks.com/products/cdnpro-pricing/)
- Video streaming allowed?
  - Yes

### [KeyCDN](https://www.keycdn.com/)

- Description
  - Made in Switzerland.
- Edge server connectivity
  - [At least 40 Gbps of uplink connectivity per edge server](https://www.keycdn.com/network) (checked 2026.10).
- Have a free plan?
  - No. [14-day trial](https://www.keycdn.com/faq), no card required.
- Pricing
  - Also Not an attractive price.
  - First 10TB/month: North America & Europe $0.04/GB; Asia & Oceania $0.08/GB; Africa & Latin America $0.10/GB.
  - $4/month minimum usage; $49 minimum payment. Requests are included.
  - [Pricing page](https://www.keycdn.com/pricing)
- Video streaming allowed?
  - Yes

### [BelugaCDN](https://www.belugacdn.com/)

- Description
  - Cheap
  - Use vultr as a infra.
- Have a free plan?
  - No. A [30-day Pro trial](https://www.belugacdn.com/faq/) is advertised; confirm availability at signup.
- Pricing
  - Global same price, $0.01/GB
  - $1/month active account fee; starts with a $10 prepayment for 1,000GB.
  - Above 5,000 requests per GB: $0.0035 per 10,000 additional requests. [Request fees](https://www.belugacdn.com/legal/sla.html)
  - There are additional discounts for bulk contracts.
- Video streaming allowed?
  - Yes

### [DDOS-Guard](https://ddos-guard.net/)

- Description
  - Aka "bulletproof CDN"
  - Company located in russia, they don't care about dmca and other many abuse.
  - [CDN nodes](https://ddos-guard.net/technologies/cdn) in Russia, Europe, the US, South America and Asia.
- DDoS scrubbing capacity
  - [4+ Tbps](https://ddos-guard.net/about-us) (checked 2026.10).
- Have a free plan?
  - No. [3-day Basic trial](https://ddos-guard.net/web-protection).
- Pricing
  - Start $100/m
  - All plan have unmeterd traffic
- Video streaming allowed?
  - If you know, please send a pull request.

### [BlazingCDN](https://blazingcdn.com/)

- Description
  - Cheapest player
  - advancedhosting.com's brand
  - Uses NTT and other [network carriers](https://blazingcdn.com/about/).
- Network edge capacity
  - Current aggregate capacity unconfirmed.
- Have a free plan?
  - No. 14-day paid test at $5/TB, with the monthly minimum waived.
- Pricing
  - $0.005/GB == $5/TB for the first 5TB, with a $25/month minimum.
  - Progressive volume tiers drop to $2.50/TB; bulk contracts can be cheaper. [Pricing page](https://blazingcdn.com/pricing/)
  - Video CDN permanent cache: first 500GB included, then $0.02/GB/month.
- Video streaming allowed?
  - Yes

### [FDCservers](https://fdcservers.net/product/cdn)

- Description
  - Also cheapest player
  - Used to be Cogent-only, and the routing was terrible.
  - They revamped the service around 2025 and added more upstreams, including NTT. It's now pretty usable even in Asia.
- Provider network capacity
  - [100+ Tbps installed external capacity across FDC infrastructure](https://my.linkedin.com/jobs/view/network-engineer-l2-carrier-service-provider-operations-juniper-at-fdcservers-net-4435030075) (checked 2026.10).
- Have a free plan?
  - No
- Pricing
  - $20 to start, including 5TB.
  - 0-499TB: $4/TB; 500-1,999TB: $3/TB; 2,000TB+: $2/TB.
  - [Pricing page](https://global-cdn.fdcservers.net/)
- Video streaming allowed?
  - Yes

### [BytePlus CDN](https://www.byteplus.com/en/product/cdn)

- Description
  - ByteDance's CDN.
  - Used fairly often in Asia, especially CJK.
  - Supports private S3-compatible origins. [Origin settings](https://docs.byteplus.com/en/docs/byteplus-cdn/docs-origin-configurations).
- Network edge capacity
  - [120+ Tbps CDN bandwidth capacity](https://www.byteplus.com/en/product/cdn) (checked 2026.10).
- Have a free plan?
  - One-time introductory package: 1TB of traffic and 10 million requests, valid for 30 days. [Trial details](https://docs.byteplus.com/en/docs/byteplus-cdn/docs-pricing).
- Pricing
  - Pay-as-you-go, settled hourly.
  - First 10TB/month:
    - North America & Europe: $0.044/GB
    - South Korea: $0.088/GB
  - Requests: $0.012 per 10,000. Edge-to-origin transfer: $0.06/GB.
  - [Pricing page](https://docs.byteplus.com/en/docs/byteplus-cdn/docs-pricing)

### [Google Cloud CDN](https://cloud.google.com/cdn)

- Description
  - Requires an external Application Load Balancer. [Setup](https://docs.cloud.google.com/cdn/docs/overview).
- Have a free plan?
  - Eligible new Google Cloud customers can use a one-time $300 credit for 90 days. [Trial details](https://docs.cloud.google.com/free/docs/free-cloud-features).
- Pricing
  - First 10TiB/month:
    - North America & Europe: $0.08/GiB
    - Asia Pacific: $0.09/GiB
  - Cache lookups: $0.0075 per 10,000. Cache fill: $0.01~$0.04/GiB.
  - Load balancer forwarding rules start at $0.025/hour; other load balancer charges can apply.
  - [Pricing page](https://cloud.google.com/cdn/pricing)

### [Azure Front Door](https://azure.microsoft.com/en-us/products/frontdoor/)

- Description
  - Microsoft's CDN with global load balancing.
  - The base fee alone is steep for a small site.
- Have a free plan?
  - Eligible new Azure customers can use a one-time $200 credit for 30 days. [Trial details](https://azure.microsoft.com/en-us/pricing/purchase-options/azure-account).
- Pricing
  - Standard: from $35/month per profile.
  - Premium: from $330/month per profile, including managed WAF rules and Private Link support.
  - Requests and data transfer cost extra.
  - [Pricing page](https://azure.microsoft.com/en-us/pricing/details/frontdoor/)

### [Sucuri](https://sucuri.net/website-firewall/)

- Description
  - A website firewall with a CDN included.
  - They advertise unlimited bandwidth, but I don't know the FUP.
  - Malware cleanup requires a Website Security Platform plan. [Plan differences](https://sucuri.net/faq/).
- Have a free plan?
  - No. [30-day Website Firewall trial](https://sucuri.net/website-firewall-a/free-trial/).
- Pricing
  - Basic Firewall: from $9.99/month for one site, including the CDN.
  - [Pricing page](https://sucuri.net/website-firewall/)

## Closed CDN Services

These CDN services have shut down. The descriptions and pricing below are preserved for historical reference.

### [StackPath](https://www.stackpath.com/)

- Description
  - Focus on ddos protection.
  - Also expensive
- Network edge capacity
  - 100 Tbps(2023.08)
- Have a free plan?
  - No
- Have a POP in korea?
  - Yes
- Pricing
  - 1TB: $27.5/m
  - Adittional bandwidth
    - 1TB-100TB: $0.044/GB
    - 100TB-1PB: $0.033/GB
    - Above 1PB: Contact sales team.
- Video streaming allowed?
  - Yes

### [Edgio](https://edg.io/)

- Description
  - Formerly Limelight Networks
- Network edge capacity
  - 250 Tbps(2023.08)
- Have a free plan?
  - Yes, for unmetered traffic, but not for streaming video or audio, and large files.
- Pricing
  - Contact sales team.
  - I've heard it's relatively inexpensive.
- Video streaming allowed?
  - Yes(not in free plan)

### [LumenCDN](https://www.lumen.com/en-us/edge-cloud/cdn.html)

- Description
  - As the name suggests, it is a CDN provided by tier 1 ISP Lumen.
- Network edge capacity
  - 170 Tbps(2023.08)
- Have a free plan?
  - No
- Pricing
  - Contact sales team.
  - Not much information.
- Video streaming allowed?
  - Yes
