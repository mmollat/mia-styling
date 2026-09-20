# MIA | Men's Style

The production website and beta styling operations workspace for MIA | Men's Style. The public site presents four fixed-price services and links to Stripe-hosted checkout. Gate 3 adds a mobile-first customer intake, private wardrobe uploads, and a secured internal order queue.

## Application routes

- `/` — approved public website and live Stripe Payment Links
- `/intake` — customer intake for all four styling services
- `/intake/success` — confirmation with MIA/FIT references
- `/admin/login` — private admin sign-in
- `/admin` — styling order queue
- `/admin/orders/[id]` — intake, photos, notes, revisions, and status
- `/privacy`, `/terms`, `/refunds` — public policies

## Stack

- Next.js 16, React 19, and TypeScript
- Tailwind CSS plus the existing editorial stylesheet
- Supabase PostgreSQL, Auth, and private Storage
- Stripe-hosted Payment Links configured in `lib/site-config.ts`

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Public pages work without Supabase; intake submission and admin features require the settings below.

## Supabase setup

1. Create or select a Supabase project.
2. For the temporary shared ReturnLab backend, apply only `supabase/migrations/20260920211759_shared_returnlab_namespaced_gate_3.sql`. It creates namespaced MIA resources without changing ReturnLab objects. The earlier generic Gate 3 migration is retained as historical work and must not be applied to ReturnLab.
3. In Authentication, create the one beta admin user with email and password. Disable public sign-ups unless needed elsewhere.
4. Set `MIA_ADMIN_EMAIL` to that user’s exact email. For role-based RLS access, set the user’s Auth `app_metadata.role` to `mia_admin`.
5. Confirm Storage contains the private `mia-wardrobe-images` bucket. The shared-backend migration creates it with an 8 MB per-file limit for JPG, PNG, and WebP.
6. Add the environment variables to Vercel for Production and Preview, then redeploy.

The shared-backend migration creates UUID-backed `mia_clients`, `mia_orders`, `mia_intakes`, and `mia_order_files`; race-safe `MIA-0001` and `FIT-0001` sequences; MIA-prefixed functions, triggers, policies, and indexes; RLS; isolated private Storage policies; and the atomic `mia_complete_intake` function.

## Required environment variables

| Variable | Exposure | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Browser + server | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser + server | Auth publishable key; legacy `NEXT_PUBLIC_SUPABASE_ANON_KEY` is also accepted |
| `SUPABASE_SECRET_KEY` | Server only | Database and private Storage operations; legacy `SUPABASE_SERVICE_ROLE_KEY` is also accepted |
| `MIA_ADMIN_EMAIL` | Server only | Limits beta admin access to the designated Auth user |

Never expose or commit the secret/service-role key.

## Intake and security model

- Inputs and service requirements are validated server-side with Zod.
- Existing-wardrobe services require uploads; Build My Look does not.
- Files are limited to 15 per order, 8 MB each, and JPG/PNG/WebP.
- Private upload paths use a unique submission folder and are stored in the database, never as public URLs.
- Complete database writes are atomic; an order becomes `READY_FOR_STYLING` only after required uploads succeed.
- Duplicate network retries reuse the submission key. Returning email addresses reuse one client and create new orders.
- Admin pages require a valid Supabase Auth session plus the configured email or `mia_admin` role.
- Wardrobe photos use signed links that expire after 10 minutes.

Stripe payment verification is intentionally not automated in Gate 3. The schema includes nullable `stripe_reference` for later webhook integration; intake does not claim payment was verified.

## Verification

```bash
npm run typecheck
npm run lint
npm run build
```

Production URL: `https://mia-mens-style.vercel.app`
