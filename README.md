# The Undisputed Method — Website

Next.js 15 (App Router, TypeScript) — landing page + multi-step booking form + custom calendar UI for Tyjani Beztati's elite coaching program. Migrated from a single static `index.html`.

## Setup

```bash
cd website
npm install
cp .env.example .env.local   # then fill in real values from Floris
npm run dev
```

Open http://localhost:3000.

## Environment variables

Set these in `.env.local` for local dev, and in **Vercel → Project Settings → Environment Variables** for preview/production:

| Variable | Where to find it |
|---|---|
| `GHL_API_KEY` | GHL → Settings → Private Integrations |
| `GHL_LOCATION_ID` | GHL Sub-Account / Location ID |
| `GHL_CALENDAR_ID` | The sales-intake calendar ID |

These are **server-only** — never prefixed with `NEXT_PUBLIC_`.

## Project structure

```
app/
├── layout.tsx              Root layout, fonts (next/font), metadata
├── page.tsx                Landing page (server component)
├── globals.css             All landing + modal + calendar styles
└── api/
    └── calendar/
        ├── slots/route.ts  GET — proxy to GHL free-slots, 2-min cache
        └── book/route.ts   POST — create contact + book appointment

components/
├── BookingModal.tsx        Wizard state, draft persistence, submit logic
├── ClientEffects.tsx       Scroll reveal, navbar, cred counter, FAQ toggle
├── Calendar.tsx            Custom 2-pane calendar (month grid + slots list)
└── steps/
    ├── Step1Contact.tsx
    ├── Step2Qualification.tsx
    ├── Step3Context.tsx
    └── Step4Calendar.tsx

lib/
├── ghl.ts                  Server-only GHL API client
├── slotCache.ts            In-memory cache (per-instance, 2-min TTL)
└── validation.ts           Field validators + step validators

public/                     logos, hero portrait
```

## Adding more landing pages

Drop a new route folder under `app/`:

```
app/
├── page.tsx                /
├── another-offer/
│   └── page.tsx            /another-offer
└── nl/
    └── page.tsx            /nl
```

Each can reuse `<BookingModal />` from `components/`.

## Deploy

```bash
npx vercel link
npx vercel env pull .env.local   # if env vars are already set in Vercel
npx vercel --prod
```

Make sure the three GHL env vars exist in the Vercel project before deploying.

## Notes

- The booking modal is bound globally to any element with the `open-booking` class — preserved from the original landing page so all existing CTAs work without changes.
- Form state is persisted to `localStorage` under `tum-booking-draft` so users don't lose data when going Back or accidentally closing.
- After successful booking the user is redirected to `/bedankt` — that page is built separately.
- The legacy `Landing page/index.html` (the previous static one-pager) lives next to this folder. Keep it for reference until you're satisfied with the migration.
