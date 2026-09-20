# MIA | Men's Style

A polished customer-facing website for a personalized men's styling service.

## Included

- Responsive editorial landing page
- Four service and pricing tiers
- MIA Fit Card deliverable preview
- FAQ and Instagram contact CTA
- Privacy, terms, and refund policy routes
- Central configuration for Instagram, operator, jurisdiction, and Stripe Payment Links
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

- The Instagram profile URL and handle
- Business or operator name
- Mailing address and governing jurisdiction
- Stripe Payment Links for all four services
- The final production domain, if it differs from the current Vercel URL
