# openrent.me — clickable mock-up

A mobile-first HTML/CSS mock-up of a start-to-finish renting platform for Dubai.
Everything is static: open `public/index.html` in a browser, or serve the `public/` folder with any static server.
To put it on a domain with Laravel Forge, see [DEPLOY.md](DEPLOY.md).

## Where to start

All paths below are inside `public/`.

| Open this | What it is |
|---|---|
| `index.html` | Marketing site (home, landlords, tenants, pros, pricing, rulebook, search, a listing, help, sign-in) |
| `app/index.html` | Hub linking to every dashboard |
| `app/tenant/` | Tenant — Maya Fernandes, one home in Dubai Marina |
| `app/landlord/` | Landlord — Fatima Al Hashimi, seven properties at seven lifecycle stages |
| `app/contractor/` | Contractor — Imran Sheikh, Falcon Technical Services |
| `app/manager/` | OpenRent Manager — Layla Haddad, RERA-licensed tenancy manager |
| `app/admin/` | Super Admin — rulesets, fees, roles, finance, audit |
| `app/rep/`, `app/field/`, `app/compliance/` | Supporting roles: owner's representative (PoA), field agent, compliance officer |
| `signup.html`, `signin.html` | Create an account (role picker → details → mobile code → email link), sign in with UAE Pass, password or one-time code, and reset a password |
| `app/start/` | First-run setup for renters, landlords, contractors, owner's representatives and invited OpenRent staff, ending in each role's dashboard |
| `app/rulebook.html` | The 25 legal guardrails with sources; every rule chip in the dashboards links here |
| `app/states.html` | Empty, error, loading and offline states: the building blocks, and a link to every page that has them |
| `404.html`, `500.html`, `offline.html`, `no-access.html` | Full-page states for a static host (not found, server error, offline fallback, wrong account) |

Switch role at any time from the avatar (top right) or the sidebar on desktop.
On a phone, add the page to the home screen for a full-screen, app-like view.
The demo date is Tuesday 24 November 2026.

## How it is built

- `public/` holds the built site and is the web root in production. Don't edit it by hand; it is regenerated from `source/`.
- `assets/css/app.css` — the design system (tokens, components, app shell). `assets/css/site.css` — marketing site.
- `assets/js/states.js` — the preview switch for page states (add `?state=empty|loading|error|offline|partial` to a page URL) and the live offline banner (`?net=offline` previews it).
- `assets/js/app.js` — about 90 lines of dependency-free JavaScript for sheets, tabs, chips and toasts.
- Fonts (Bricolage Grotesque, Figtree, IBM Plex Sans Arabic — all SIL Open Font Licence) and icons (Lucide, ISC) are bundled; nothing loads from the network.
- Property images are original procedural SVG illustrations.
- `source/` holds the small Node generator used to produce the pages (run `npm ci` once inside `source/`, then `npm run build` to build into `source/dist/` and check links, or `npm run publish-site` to also replace `public/`),
  the page sources per role, their empty/error/loading states (`src/states/<role>.js`, helpers in `src/lib/states.js`), the shared mock data (`src/lib/data.js`) and the screenshot script for the marketing site (`node src/shots.js`).

## Legal content

The guardrails are based on research into Dubai tenancy rules as of November 2026: Law 26/2007 as amended by Law 33/2008,
Decree 43/2013 and the Smart Rental Index, Decree 26/2013 (Rental Disputes Center), Ejari and Trakheesi procedures,
co-occupant registration, the Flexi Rent initiative (June 2026) and Law 4/2026 on shared housing.
Summaries are simplified for a product concept and are **not legal advice**; several details were only available from
secondary sources and should be confirmed with counsel before anything is built on them.
All people, properties, licence numbers, fees and figures are invented.
