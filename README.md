<h1 align="center">
    <img width="380" src="/cdn.love.png" />
    <br> Awesome CDN
</h1>

## 📝 Outline

This is a list of CDN with a detailed description of each one.

> Pull requests are welcome.

## 📖 Table of Contents

- [Cloudflare](#cloudflare)
- [Gcore](#gcore)
- [BunnyCDN](#bunnycdn)
- [Akamai](#akamai)
- [CDN77](#cdn77)
- [CloudFront(AWS)](#cloudfrontaws)
- [StackPath](#stackpath)
- [Fastly](#fastly)
- [CacheFly](#cachefly)
- [Imperva](#imperva)
- [Edgio](#edgio)
- [LumenCDN](#lumencdn)
- [CDNetworks](#cdnetworks)
- [KeyCDN](#keycdn)
- [BelugaCDN](#belugacdn)
- [DDOS-Guard](#ddos-guard)
- [BlazingCDN](#blazingcdn)
- [FDCservers](#fdcservers)

## 📦 CDN List

### FAQ

- Why is this list indicate whether the cdn has an POP in korea?
  - Because bandwidth price in korea are among the highest in the world.
  - For example, cloudflare provide korea POP for only enterprise plan.(=<$5000)

### Rules

- CDN must have POPs in at least two countries to qualify for this list.

### [Cloudflare](https://www.cloudflare.com/)

- Description
  - They provide a cdn, dns with a free plan.
  - Most recommended cdn for free plan.
- Network edge capacity
  - 209 Tbps(2023.08)
- Have a free plan?
  - Yes
- Have a POP in korea?
  - Yes, but only for enterprise plan.(=<$5000)
- Pricing
  - Free plan: Free
  - Pro plan: $25/month
  - Business plan: $250/month
  - Enterprise plan: $5000+/month
- Additional bandwidth price
  - unmetered for all plan
  - But it's inconsistent and subjective, if you use too much bandwidth, they will ask you to upgrade your plan.
  - And video streaming is allowed only for enterprise plan.
  - Picture and static file is allowed for all plan. BUT, if you use too much bandwidth, they can suspend your account. you can find this in their terms of service.
  - [And they throttled customers web traffic without notice](https://blog.cloudflare.com/how-cloudflare-erroneously-throttled-a-customers-web-traffic/)
  - However if you use bandwidth normally, you don't have to worry about it.
- Video streaming allowed?
  - Only for enterprise plan.

### [Gcore](https://gcore.com/)

- Description
  - They provide a cdn, dns with a free plan.
  - 1TB/month bandwidth for free plan.
  - L7 ddos protection is available for enterprise plan.
- Network edge capacity
  - 110 Tbps(2023.08)
- Have a free plan?
  - Yes
- Have a POP in korea?
  - Yes
- Pricing
  - Free plan: Free
  - Start plan: $37/month
  - Pro plan: $105/month
  - Enterprise plan: Contact sales
- Additional bandwidth price
  - Free plan: 1TB free, $0.0315/GB for overage
  - Start plan: 1TB free, $0.24/GB for overage
  - Pro plan: 5TB free, $0.21/GB for overage
  - Enterprise plan: If you have any information about this, please pull request.
- Video streaming allowed?
  - Yes, for all plan.

### [BunnyCDN](https://bunnycdn.com/)

- Description
  - They provide a cdn, dns with a free trial.
  - 14 days free trial, no cc required.
- Network edge capacity
  - 80 Tbps(2023.08)
- Have a free plan?
  - Yes, but only 14 days.
- Have a POP in korea?
  - Yes
- Pricing
  - Standard Network 114 PoPs
    - Europe & North America: $0.01/GB
    - Asia & Oceania: $0.03/GB
    - South America: $0.045/GB
    - Middle East & Africa: $0.06/GB
    - If you serving more than 100TB/m, contact sales team for enterprise plan.
  - Volume Network 10 PoP
    - First 500TB: $0.005/GB
    - From 500TB-1PB: $0.004/GB
    - From 1PB-2PB: $0.002/GB
    - From 2PB+: Contact sales team.
- Video streaming allowed?
  - Yes

### [Akamai](https://www.akamai.com/)

- Description
  - Most biggest CDN provider.
  - Focus on enterprise
- Network edge capacity
  - 300 Tbps(2023.08)
- Have a free plan?
  - No
- Have a POP in korea?
  - Yes
- Pricing
  - Enterprise: Contact sales team.
  - I reached out to them and they have a similar pricing policy to other CDNs.
- Video streaming allowed?
  - Yes

### [CDN77](https://www.cdn77.com/)

- Description
  - Parent company of datapacket.com
  - Recommended for large bandwidth users.
- Network edge capacity
  - 120 Tbps(2023.08)
- Have a free plan?
  - Yes, 1TB traffic include.
- Have a POP in korea?
  - No
- Pricing
  - 6TB: $0.033/GB
  - 25TB: $0.015/GB
  - 50TB: $0.012/GB
  - 100TB: $0.010/GB
  - 150TB: $0.009/GB
  - Over 150TB: Contact sales team.
- Video streaming allowed?
  - Yes

### [CloudFront(AWS)](https://aws.amazon.com/cloudfront/)

- Description
  - AWS, Expensive
- Network edge capacity
  - ? Tbps(2023.08)
- Have a free plan?
  - Yes, 1TB/month always free
- Have a POP in korea?
  - Yes
- Pricing
  - It's complicated, visit pricing page for more.
  - [Pricing page](https://aws.amazon.com/cloudfront/pricing/)
- Video streaming allowed?
  - Yes

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

### [Fastly](https://www.fastly.com/)

- Description
  - Pricing is insanely expensive.
  - But no one pays full price for that, so reach out to sales and ask for enterprise pricing.
- Network edge capacity
  - 277 Tbps(2023.08)
- Have a free plan?
  - Yes, always free for small website
- Have a POP in korea?
  - Yes
- Pricing
  - Visit pricing page for more.
  - [Pricing page](https://www.fastly.com/pricing)
  - $0.08/GB~$0.28/GB
- Video streaming allowed?
  - Yes

### [CacheFly](https://www.cachefly.com/)

- Description
  - 5TB/m traffic with always free plan!
  - But free user can use only EU/USA POP.
- Network edge capacity
  - ? Tbps(2023.08)
- Have a free plan?
  - Yes, but only EU/USA POP
- Have a POP in korea?
  - Yes
- Pricing
  - Free:
    - $0/m
    - 5TB/m
    - 0.05$/GB Overage
    - 19 PoPs, North America and Europe
  - Business:
    - $295/m
    - 12TB/m
    - 0.03$/GB Overage
    - 64 PoPs
  - Enterprise:
    - $2495/m
    - 64TB/m
    - 0.015$/GB Overage
    - 109 PoPs
- Video streaming allowed?
  - Yes

### [Imperva](https://www.imperva.com/)

- Description
  - Focus on ddos protection.
  - also WAF
- Network edge capacity
  - 10 Tbps(2023.08)
- Have a free plan?
  - Yes, contact sales team.
- Have a POP in korea?
  - Yes
- Pricing
  - Start >=$200
  - Contact sales team.
  - Very expensive, not suitable for large websites.
- Video streaming allowed?
  - If you know, please send a pull request.

### [Edgio](https://edg.io/)

- Description
  - Formerly Limelight Networks
- Network edge capacity
  - 250 Tbps(2023.08)
- Have a free plan?
  - Yes, I don't have more information, but it appears to be a trial.
- Have a POP in korea?
  - Yes
- Pricing
  - Contact sales team.
  - I've heard it's relatively inexpensive.
- Video streaming allowed?
  - Yes

### [LumenCDN](https://www.lumen.com/en-us/edge-cloud/cdn.html)

- Description
  - As the name suggests, it is a CDN provided by tier 1 ISP Lumen.
- Network edge capacity
  - 170 Tbps(2023.08)
- Have a free plan?
  - No
- Have a POP in korea?
  - Yes
- Pricing
  - Contact sales team.
  - Not much information.
- Video streaming allowed?
  - Yes

### [CDNetworks](https://www.cdnetworks.com/)

- Description
  - CDN focused on Asia (specifically China).
- Network edge capacity
  - 15 Tbps(2023.08)
- Have a free plan?
  - Yes, contact sales team.
- Have a POP in korea?
  - Yes
- Pricing
  - Not an attractive price.
  - [Pricing page](https://www.cdnetworks.com/cdnpro-pricing/)
- Video streaming allowed?
  - Yes

### [KeyCDN](https://www.keycdn.com/)

- Description
  - Made in Switzerland(?)
- Network edge capacity
  - ? Tbps(2023.08)
- Have a free plan?
  - No
- Have a POP in korea?
  - Yes
- Pricing
  - Also Not an attractive price.
  - ['Pricing page'](https://www.keycdn.com/pricing)
- Video streaming allowed?
  - Yes

### [BelugaCDN](https://www.belugacdn.com/)

- Description
  - Cheap
- Network edge capacity
  - ? Tbps(2023.08)
- Have a free plan?
  - No
- Have a POP in korea?
  - Yes
- Pricing
  - Global same price, $0.01/GB
  - There are additional discounts for bulk contracts.
- Video streaming allowed?
  - Yes

### [DDOS-Guard](https://ddos-guard.net/en)

- Description
  - Aka "bulletproof CDN"
  - Company located in russia, they don't care about dmca and other many abuse.
- Network edge capacity
  - 3.2 Tbps(2023.08)
- Have a free plan?
  - No
- Have POP in korea?
  - No
- Pricing
  - Start $100/m
  - All plan have unmeterd traffic
- Video streaming allowed?
  - If you know, please send a pull request.

### [BlazingCDN](https://blazingcdn.com/)

- Description
  - Cheapest player
  - advancedhosting.com reseller
  - Upstream is only Ntt
- Network edge capacity
  - 2 Tbps(2023.08)
- Have a free plan?
  - Yes, 10GB/m
- Have POP in korea?
  - No
- Pricing
  - $0.005/GB == $5/TB
  - There are additional discounts for bulk contracts.
- Video streaming allowed?
  - Yes

### [FDCservers](https://www.fdcservers.net/cdn)

- Description
  - Also cheapest player
  - Upstream is only Cogent
  - All traffic is first routed to the LA before being processed.
  - In Asia, you will experience latency of over 300ms.
- Network edge capacity
  - 100 Tbps(2023.08)
- Have a free plan?
  - No
- Have POP in korea?
  - No
- Pricing
  - $4/TB
  - There are discounts for using more than 100 TB.
- Video streaming allowed?
  - Yes
