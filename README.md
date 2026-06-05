# NarraScribe

> From shorthand to submission — in seconds.

## File structure

| File | URL | Description |
|------|-----|-------------|
| index.html | / | Landing page (homepage) |
| app.html | /app | Dashboard (protected) |
| login.html | /login | Sign in page |
| signup.html | /signup | Onboarding wizard |
| about.html | /about | About page |
| contact.html | /contact | Contact form |
| privacy.html | /privacy | Privacy policy |
| terms.html | /terms | Terms of service |
| hipaa.html | /hipaa | HIPAA & BAA info |
| vercel.json | — | Vercel config (cleanUrls) |

## Flow
narrascribe.com → Landing page
→ Get started → /signup
→ Sign in → /login → /app (dashboard)

## Notes
- Dashboard (/app) is protected — redirects to /login if no session
- Voice recording requires Deepgram API key (coming soon)
- Requires Anthropic API key for note generation
- Supabase integration coming for real auth and database
