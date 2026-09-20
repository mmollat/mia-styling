export const siteConfig = {
  name: "MIA | Men's Style",
  shortName: "MIA",
  tagline: "Personal styling, made simple.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://mia-mens-style.vercel.app",
  instagramUrl: "https://www.instagram.com/meetmiaafterhours/",
  instagramHandle: "@meetmiaafterhours",
  operatorName: "[LEGAL BUSINESS OR OPERATOR NAME]",
  mailingAddress: "[MAILING ADDRESS]",
  governingJurisdiction: "[GOVERNING JURISDICTION]",
  paymentLinks: {
    dressMe: "https://buy.stripe.com/eVq28k95f5si2xee0z7wA00",
    buildMyLook: "https://buy.stripe.com/00w9AM81b2g6b3K8Gf7wA01",
    buildMyFits: "https://buy.stripe.com/bJe14g81bg6Wfk0f4D7wA02",
    closetReset: "https://buy.stripe.com/7sYaEQdlv2g61ta6y77wA03",
  },
} as const;

export type ServiceKey = keyof typeof siteConfig.paymentLinks;

export function serviceHref(service: ServiceKey) {
  return siteConfig.paymentLinks[service] || "/#contact";
}
