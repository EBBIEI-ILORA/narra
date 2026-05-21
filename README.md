# NarraScribe

> From shorthand to submission — in seconds.

AI-powered clinical documentation platform for mental health practices.

## What it does

NarraScribe transforms therapist shorthand notes into complete, insurance-ready clinical documentation using AI. It also generates CMS-1500 claim forms ready for submission to any payer portal or clearinghouse.

## Files

| File | Description |
|------|-------------|
| `index.html` | Main app — dashboard, note builder, therapist management, CMS-1500, settings |
| `landing.html` | Marketing landing page |
| `about.html` | About NarraScribe |
| `contact.html` | Contact form |
| `hipaa.html` | HIPAA & BAA information |
| `privacy.html` | Privacy policy |
| `terms.html` | Terms of service |

## Tech stack

- Vanilla HTML / CSS / JavaScript
- Anthropic Claude API (claude-sonnet-4-20250514) for note generation
- No framework dependencies
- Google Fonts (Cormorant Garamond, DM Sans)
- Tabler Icons

## Setup

1. Clone this repository
2. Open `index.html` in a browser to run the app locally
3. Open `landing.html` for the marketing site
4. For production: deploy to Lovable, Netlify, or Vercel

## Environment

The Anthropic API key is currently called directly from the frontend.
Before deploying to production:
- Move API calls to a backend function (Supabase Edge Function recommended)
- Store API key as an environment variable — never in frontend code
- Sign BAA with Anthropic before any real PHI is processed

## Compliance notes

- Requires signed BAA with Anthropic before processing real PHI
- HIPAA-compliant storage requires Supabase HIPAA plan
- CMS-1500 forms are for documentation only — must be submitted by licensed billing staff
- Maryland COMAR compliant documentation formats included

## Roadmap

- [ ] Supabase database integration (note saving)
- [ ] User authentication (per-clinic login)
- [ ] Stripe billing integration
- [ ] EHR integrations (SimplePractice, TherapyNotes)
- [ ] Mobile app

## Contact

hello@narrascribe.com  
narrascribe.com
