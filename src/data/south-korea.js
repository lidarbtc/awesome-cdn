// Public copy is distilled from research/seoul-2026-10-10/.
// Location listings, product access, and observed routing are separate claims.
export const seoulReviewDate = '2026-10-10';
export const seoulProviders = [
  {
    "slug": "cloudflare",
    "seoulStatus": "listed",
    "locationNote": "Seoul is on the network map.",
    "product": "Website CDN",
    "planNote": "Free, Pro, Business and Contract. Contract adds Network Prioritization; no public plan promises a Seoul route.",
    "pricing": "Free / Pro $25/mo",
    "pricingNote": "Monthly billing; Pro is $20/mo billed annually. No separate Korea tariff is published. Business and Contract plans also available.",
    "sources": [
      {
        "label": "Network map",
        "url": "https://www.cloudflare.com/network/"
      },
      {
        "label": "Plans",
        "url": "https://www.cloudflare.com/plans/"
      },
      {
        "label": "Geographic traffic routing",
        "url": "https://developers.cloudflare.com/support/troubleshooting/general-troubleshooting/geographic-traffic-routing/"
      }
    ]
  },
  {
    "slug": "bunny",
    "seoulStatus": "listed",
    "locationNote": "Standard network; Seoul is not listed on Volume.",
    "product": "Bunny CDN Standard",
    "planNote": "Use Standard with Asia & Oceania enabled. Volume has a smaller set of locations.",
    "pricing": "$0.03/GB · Standard",
    "pricingNote": "Asia & Oceania rate. $1 monthly minimum; no CDN request fees.",
    "sources": [
      {
        "label": "Network map",
        "url": "https://bunny.net/network/"
      },
      {
        "label": "CDN tier documentation",
        "url": "https://bunny.net/docs/cdn/pricing"
      },
      {
        "label": "Pricing",
        "url": "https://bunny.net/pricing/"
      }
    ]
  },
  {
    "slug": "gcore",
    "seoulStatus": "listed",
    "locationNote": "Seoul is listed in the CDN status inventory.",
    "product": "CDN PAYG / Enterprise",
    "planNote": "PAYG includes the full network. Existing Free, Start and Pro accounts must opt into the new plan during its initial rollout.",
    "pricing": "1 TB free, then €0.01/GB",
    "pricingNote": "First paid band: over 1 TB through 500 TB/month. Above 1B requests: €0.75/million. VAT excluded; no Korea surcharge listed.",
    "sources": [
      {
        "label": "CDN status components",
        "url": "https://status.gcore.com/subscribe/email"
      },
      {
        "label": "PAYG launch and migration",
        "url": "https://gcore.com/developers/pay-as-you-go-cdn"
      },
      {
        "label": "CDN pricing",
        "url": "https://gcore.com/pricing/edge-network"
      }
    ]
  },
  {
    "slug": "fastly",
    "seoulStatus": "listed",
    "locationNote": "Seoul is on the network map.",
    "product": "Full Site Delivery",
    "planNote": "Recurring free allowance, then regional usage pricing. Korean traffic has a separate rate from general Asia.",
    "pricing": "$0.28/GB + requests",
    "pricingNote": "After 100 GB free, Korea is $0.28/GB through 10 TB/month. After 1M free requests: $0.01/10,000 in the first paid band.",
    "sources": [
      {
        "label": "Network map",
        "url": "https://www.fastly.com/network-map"
      },
      {
        "label": "Full Site Delivery pricing",
        "url": "https://www.fastly.com/pricing"
      }
    ]
  },
  {
    "slug": "cloudfront",
    "seoulStatus": "listed",
    "locationNote": "Seoul is on the CloudFront location list.",
    "product": "CloudFront PAYG / flat-rate plans",
    "planNote": "PAYG includes Korea in Price Class 200 and All, but not 100. Flat-rate plans include global delivery; sustained excess usage can lead to more distant edges.",
    "pricing": "PAYG $0.120/GB",
    "pricingNote": "After 1 TB free: next 9 TB/month. After 10M free requests: HTTPS $0.012/10,000. Flat-rate plans have separate pricing and allowances.",
    "sources": [
      {
        "label": "CloudFront locations",
        "url": "https://aws.amazon.com/cloudfront/features/"
      },
      {
        "label": "PAYG pricing and price classes",
        "url": "https://aws.amazon.com/cloudfront/pricing/pay-as-you-go/"
      },
      {
        "label": "Flat-rate pricing",
        "url": "https://aws.amazon.com/cloudfront/pricing/"
      },
      {
        "label": "Flat-rate usage allowances",
        "url": "https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/flat-rate-pricing-plan.html"
      }
    ]
  },
  {
    "slug": "cdn77",
    "seoulStatus": "listed",
    "locationNote": "Seoul is on the network map.",
    "product": "CDN77 Growth / Enterprise",
    "planNote": "Growth includes every PoP. Enterprise infrastructure and terms are agreed with sales.",
    "pricing": "$990/mo for 250 TB",
    "pricingNote": "Growth includes global delivery; overage is $3.96/TB. No separate Korea rate is listed.",
    "sources": [
      {
        "label": "Network map",
        "url": "https://www.cdn77.com/network"
      },
      {
        "label": "Growth plan pricing",
        "url": "https://www.cdn77.com/pricing"
      }
    ]
  },
  {
    "slug": "akamai",
    "seoulStatus": "unconfirmed",
    "locationNote": "City-level CDN delivery evidence not established.",
    "product": "Akamai delivery products",
    "planNote": "Confirm the delivery product and Korean edge access with sales. Seoul ingest locations alone do not establish delivery coverage.",
    "pricing": "Request a quote",
    "pricingNote": "Adaptive Media Delivery directs pricing enquiries to sales; no public Korea tariff was found.",
    "sources": [
      {
        "label": "Media Services Live locations",
        "url": "https://techdocs.akamai.com/msl/docs/geographical-locations-supported-by-msl4"
      },
      {
        "label": "Adaptive Media Delivery",
        "url": "https://www.akamai.com/products/adaptive-media-delivery"
      }
    ]
  },
  {
    "slug": "cachefly",
    "seoulStatus": "private",
    "locationNote": "Private location on the network map.",
    "product": "CacheFly CDN / private nodes",
    "planNote": "Confirm Seoul access with sales. Private nodes are separately priced add-ons.",
    "pricing": "Seoul: custom quote",
    "pricingNote": "Base plans start at $299/mo with 10 TB. The public page does not publish a Seoul bandwidth rate.",
    "sources": [
      {
        "label": "Network map",
        "url": "https://www.cachefly.com/network-map/"
      },
      {
        "label": "Plans and private node add-ons",
        "url": "https://www.cachefly.com/cdn-pricing/"
      }
    ]
  },
  {
    "slug": "imperva",
    "seoulStatus": "listed",
    "locationNote": "Seoul is marked operational on the network map.",
    "product": "Imperva Secure CDN / WAAP",
    "planNote": "Secure CDN is integrated with WAAP. Confirm Seoul access and delivery allowances for the proposed package.",
    "pricing": "Request a quote",
    "pricingNote": "No Korea bandwidth or request tariff was found on the reviewed product and contact pages.",
    "sources": [
      {
        "label": "Global network map",
        "url": "https://www.imperva.com/products/global-network-map/"
      },
      {
        "label": "Secure CDN",
        "url": "https://www.imperva.com/products/content-delivery-network-cdn/"
      },
      {
        "label": "Contact Imperva",
        "url": "https://www.imperva.com/contact-us/"
      }
    ]
  },
  {
    "slug": "cdnetworks",
    "seoulStatus": "listed",
    "locationNote": "Seoul appears in CDN Pro's coverage list.",
    "product": "CDNetworks CDN Pro",
    "planNote": "Server groups are selected by country and ISP. Seoul’s group is not identified in the public list.",
    "pricing": "Group rates: $0.04–0.237/GB",
    "pricingNote": "Korea’s applicable group needs confirmation. Add $1.95/CPU-hour; Professional has a $50 monthly minimum.",
    "sources": [
      {
        "label": "CDN Pro pricing and coverage",
        "url": "https://www.cdnetworks.com/products/cdnpro-pricing/"
      }
    ]
  },
  {
    "slug": "keycdn",
    "seoulStatus": "listed",
    "locationNote": "Seoul (krse) is listed as operational.",
    "product": "Pay-as-you-go CDN",
    "planNote": "The public plan includes the entire network.",
    "pricing": "$0.08/GB · first 10 TB/mo",
    "pricingNote": "Asia & Oceania rate. Requests included; $4 monthly minimum and $49 minimum payment.",
    "sources": [
      {
        "label": "Network",
        "url": "https://www.keycdn.com/network"
      },
      {
        "label": "Network status",
        "url": "https://status.keycdn.com/"
      },
      {
        "label": "Pricing",
        "url": "https://www.keycdn.com/pricing"
      }
    ]
  },
  {
    "slug": "belugacdn",
    "seoulStatus": "unconfirmed",
    "locationNote": "Seoul appears on the official 2016 map; current availability is unconfirmed.",
    "product": "Pay-as-you-go CDN",
    "planNote": "Ask for current Seoul availability and plan access before relying on the old map.",
    "pricing": "Seoul terms unconfirmed",
    "pricingNote": "General offer: $0.01/GB globally plus a $1 monthly account fee. Current Seoul access is not established.",
    "sources": [
      {
        "label": "Network FAQ",
        "url": "https://www.belugacdn.com/faq/"
      },
      {
        "label": "Network map (2016)",
        "url": "https://www.belugacdn.com/map.pdf"
      },
      {
        "label": "CDN pricing",
        "url": "https://www.belugacdn.com/cdn/"
      }
    ]
  },
  {
    "slug": "ddos-guard",
    "seoulStatus": "unconfirmed",
    "locationNote": "Asian coverage is described, but a Seoul CDN node is not confirmed.",
    "product": "Website Protection with CDN",
    "planNote": "Caching is included on every website-protection plan; confirm the delivery location with support.",
    "pricing": "Seoul terms unconfirmed",
    "pricingNote": "Website Protection starts at $100/month for one domain, including CDN. No Seoul-specific bandwidth rate is published on the checked pages.",
    "sources": [
      {
        "label": "CDN technology",
        "url": "https://ddos-guard.net/technologies/cdn"
      },
      {
        "label": "Website Protection plans",
        "url": "https://ddos-guard.net/web-protection"
      },
      {
        "label": "Global and Asia connections",
        "url": "https://ddos-guard.net/technologies/global-and-asia"
      }
    ]
  },
  {
    "slug": "blazingcdn",
    "seoulStatus": "unconfirmed",
    "locationNote": "The current network page does not confirm a Seoul edge location.",
    "product": "FLEX Anycast CDN",
    "planNote": "Confirm Seoul availability for FLEX; dedicated infrastructure is separately quoted.",
    "pricing": "Seoul terms unconfirmed",
    "pricingNote": "Public FLEX starts at $5/TB with a $25 monthly minimum and the same advertised rate across US, Europe and Asia. Seoul access is unverified.",
    "sources": [
      {
        "label": "Network and company",
        "url": "https://blazingcdn.com/about/"
      },
      {
        "label": "FLEX pricing",
        "url": "https://blazingcdn.com/pricing/"
      }
    ]
  },
  {
    "slug": "fdcservers",
    "seoulStatus": "unconfirmed",
    "locationNote": "The company lists Seoul, but its CDN inventory does not mark it deployed.",
    "product": "FDC CDN",
    "planNote": "All deployed CDN nodes are included; confirm Seoul separately from colocation and IP transit.",
    "pricing": "Seoul terms unconfirmed",
    "pricingNote": "General offer: $4/TB for 0–499 TB, with lower rates at higher volumes. $20 setup includes 5 TB. Seoul access is unverified.",
    "sources": [
      {
        "label": "CDN network and pricing",
        "url": "https://fdcservers.net/product/cdn"
      },
      {
        "label": "CDN billing FAQ",
        "url": "https://global-cdn.fdcservers.net/"
      }
    ]
  },
  {
    "slug": "byteplus",
    "seoulStatus": "unconfirmed",
    "locationNote": "Korea pricing is published; a Seoul PoP is not confirmed.",
    "product": "BytePlus CDN",
    "planNote": "Pay as you go or prepaid savings plans; confirm Seoul access before buying.",
    "pricing": "$0.088/GB · first 10 TB/month",
    "pricingNote": "Korea rate, based on CDN node region. Add $0.012/10,000 requests and $0.06/GB edge-to-origin; logs cost extra.",
    "sources": [
      {
        "label": "CDN network",
        "url": "https://www.byteplus.com/en/product/cdn"
      },
      {
        "label": "Pricing",
        "url": "https://docs.byteplus.com/en/docs/byteplus-cdn/docs-pricing"
      }
    ]
  },
  {
    "slug": "google-cloud-cdn",
    "seoulStatus": "listed",
    "locationNote": "Seoul is on the Cloud CDN cache-location list.",
    "product": "Cloud CDN",
    "planNote": "Requires a global external or classic Application Load Balancer. Media CDN is separate.",
    "pricing": "$0.09/GiB · first 10 TiB/month",
    "pricingNote": "Asia Pacific standalone delivery rate. Add $0.0075/10,000 lookups, $0.01–0.04/GiB cache fill, and load-balancer charges.",
    "sources": [
      {
        "label": "Cache locations",
        "url": "https://docs.cloud.google.com/cdn/docs/locations"
      },
      {
        "label": "Cloud CDN setup",
        "url": "https://docs.cloud.google.com/cdn/docs/overview"
      },
      {
        "label": "Pricing",
        "url": "https://cloud.google.com/cdn/pricing"
      }
    ]
  },
  {
    "slug": "azure-front-door",
    "seoulStatus": "listed",
    "locationNote": "Seoul is listed for Standard and Premium.",
    "product": "Front Door Standard / Premium",
    "planNote": "Standard $35/month per profile; Premium $330/month, plus usage.",
    "pricing": "$0.14/GB · first 10 TB/month",
    "pricingNote": "Korea has a separate zone. First 250M requests: $0.0181/10,000 Standard or $0.0241 Premium. Edge-to-origin: $0.16/GB.",
    "sources": [
      {
        "label": "Front Door locations",
        "url": "https://learn.microsoft.com/en-us/azure/frontdoor/edge-locations-by-region"
      },
      {
        "label": "Pricing",
        "url": "https://azure.microsoft.com/en-us/pricing/details/frontdoor/"
      }
    ]
  },
  {
    "slug": "sucuri",
    "seoulStatus": "unconfirmed",
    "locationNote": "The published PoP guide is from 2019 and does not list Seoul.",
    "product": "Website Firewall with CDN",
    "planNote": "CDN is included with Basic and Pro Firewall. Confirm current Seoul availability.",
    "pricing": "Basic $9.99/month · one site",
    "pricingNote": "Pro is $19.98/month. No Korea-specific delivery rate was found in the published plan information.",
    "sources": [
      {
        "label": "CDN locations and routing",
        "url": "https://docs.sucuri.net/website-firewall/sucuri-cdn/"
      },
      {
        "label": "Firewall plans",
        "url": "https://sucuri.net/website-firewall/"
      }
    ]
  }
];
