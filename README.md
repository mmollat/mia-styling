# MIA | Men's Style

A polished customer-facing website for a personalized men's styling service.

## Included

- Responsive editorial landing page
- Four service and pricing tiers
- MIA Fit Card deliverable preview
- FAQ and Instagram contact CTA
- Privacy, terms, and refund policy routes
- Central configuration for Instagram and Stripe Payment Links
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

## Verify the Project

```bash
npm run typecheck
npm run build
```

## Site Configuration

The live site settings are centralized in `lib/site-config.ts`, including:

- The Instagram profile URL and handle
- Stripe Payment Links for all four services
- The production site URL

The current production URL is `https://mia-mens-style.vercel.app`.
