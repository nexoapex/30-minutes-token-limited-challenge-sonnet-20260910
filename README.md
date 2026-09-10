# Template/Prompt Pack for Claude Code Users (working name)

A small digital product: a curated pack of prompts, skill templates, and workflow
scripts for people using Claude Code / coding agents day to day. Sold as a one-time
purchase, delivered as a downloadable zip.

Built collaboratively across 4 parallel Claude Code sessions (this one as git
integrator) on 2026-09-10, per owner instructions: minimum cost, no spend without
explicit approval.

## Status: staged, NOT live

Per explicit confirmation from the owner (relayed independently by multiple sessions):

- **No domain purchase** — ships on Cloudflare Pages' free `*.pages.dev` subdomain.
  A custom domain is the owner's call, later.
- **Stripe stays in TEST MODE** — the buy button points at a placeholder Payment
  Link (`https://buy.stripe.com/test_PLACEHOLDER` or similar, marked inline). No
  live keys, no real charges, until the owner explicitly flips it on.
- **Not deployed to a public URL yet** — this repo is a complete, ready-to-deploy
  MVP staged locally. Deploying (even to the free subdomain) is a visible,
  hard-to-fully-reverse action, so it waits for an explicit go-ahead.

## Layout

- `site/` — the static site (deploy root). `index.html`, `styles.css`, landing/sales
  page, pricing, buy CTA, `thanks.html` post-purchase page.
- `site/legal/` — `terms.html`, `privacy.html`, `refund.html` (required before any
  real Stripe checkout, even test mode, per Stripe's own requirements).
- `content/` — the actual product: template/prompt/skill files, zipped as
  `content/pack.zip` for delivery.

## Deploy (when the owner says go)

Requires Cloudflare auth. The machine's stored `wrangler` OAuth token had expired
and could not silently refresh in this non-interactive session — run one of:

```
# Interactive login (opens a browser):
npx wrangler login

# Or non-interactively, with a scoped API token (Pages:Edit permission only):
export CLOUDFLARE_API_TOKEN=...
```

Then, from the repo root:

```
npx wrangler pages deploy site --project-name=<pick-a-slug>
```

This publishes to `<slug>.pages.dev` at zero cost (Cloudflare Pages free tier).
No domain, no DNS changes, nothing billed.

## Before flipping Stripe live

1. Replace the placeholder Payment Link in `site/index.html` with a real one
   created in the Stripe dashboard (test mode first, then live when ready).
2. Confirm `site/legal/terms.html`, `privacy.html`, `refund.html` are accurate —
   Stripe requires a refund/return policy be reachable from checkout.
3. Explicit owner go-ahead before switching from test to live keys/links.
