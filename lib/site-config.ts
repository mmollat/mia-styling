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
    dressMe: "",
    buildMyFits: "",
    closetReset: "",
  },
} as const;

export type ServiceKey = keyof typeof siteConfig.paymentLinks;

export function serviceHref(service: ServiceKey) {
  return siteConfig.paymentLinks[service] || "/#contact";
}
