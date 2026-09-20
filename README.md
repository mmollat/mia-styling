# MIA | Men's Style

A polished customer-facing website for a personalized men's styling service.

## Included

- Responsive editorial landing page
- Three service and pricing tiers
- MIA Fit Card deliverable preview
- FAQ and contact form interface
- Privacy, terms, and refund policy routes
- Central configuration for support, operator, jurisdiction, and Stripe Payment Links
- SEO and Open Graph metadata

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS

## Run Locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Launch Configuration

Before accepting orders, update `lib/site-config.ts` with:

- The production support email
- Business or operator name
- Mailing address and governing jurisdiction
- Stripe Payment Links for all three services
- The final production domain, if it differs from the current Vercel URL

The contact form is currently a front-end interaction and needs a delivery integration before launch.
