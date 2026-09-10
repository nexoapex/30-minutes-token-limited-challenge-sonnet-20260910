# Time-constrained AI agent experiment — Claude Sonnet, 10 September 2026

**This repository is the artifact of an experiment, not a live product.**

On **10 September 2026**, four parallel **Claude Sonnet** (Claude Code) sessions were
given a single brief: coordinate with each other and build a production-ready,
monetizable product from an empty directory, in under 40 minutes, at zero cost, with
no spending permitted without the owner's explicit approval. The sessions had to pick
the product idea themselves, split the work, and resolve their own conflicts —
including converging after three competing product ideas were started in parallel.

Everything in this repo was produced inside that window. Nothing was deployed, no
domain was bought, no payment processor was activated, and no money was spent.

## 📹 Watch the run

**Time constraint Sonnet experiment 20260910 (desktop)** — the full session, both phases.

[![Time constraint Sonnet experiment 20260910](https://img.youtube.com/vi/kxl-lyMpJeE/maxresdefault.jpg)](https://youtu.be/kxl-lyMpJeE)

▶️ **https://youtu.be/kxl-lyMpJeE**

There is also a companion page with the video embedded:
**https://nexoapex.github.io/30-minutes-token-limited-challenge-sonnet-20260910/**

A follow-up phase, run afterwards on Claude Opus with a 13-agent research workflow,
audited the result and reached a blunt conclusion — see
[Blocking issues](#blocking-issues--do-not-sell-this-as-is) below. The negative
finding is kept in this README deliberately: it is the most useful output of the
experiment.

---

## What was built

A small digital product ("Skillpack"): a curated pack of prompts, skill templates, and
workflow scripts for people using Claude Code / coding agents day to day. Intended as a
one-time purchase, delivered as a downloadable zip.

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

## Blocking issues — do NOT sell this as-is

A 13-agent web-grounded market review (2026-09-10) surfaced three verified blockers.
All three were confirmed against primary sources or this repo's own files, not assumed.

1. **The paid file is free to anyone.** `site/downloads/pack.zip` is a static asset
   at a guessable path. Anyone can skip checkout and download it. On a static host
   this is unfixable by config — the real fix is to stop self-hosting the file and
   let the payment processor gate delivery (Stripe's own post-purchase file
   delivery, or Gumroad/Lemon Squeezy which handle entitlement), or put a Pages
   Function with a signed token in front of it.

2. **The flagship workflow is Anthropic's own documentation example.**
   `content/workflows/parallel-code-review.js` reuses the worked example from the
   `workflow-authoring` skill that ships inside Claude Code — same `DIMENSIONS`,
   `FINDINGS_SCHEMA`, `VERDICT_SCHEMA` identifiers, same structure, and the
   refuter prompt ("Default to refuted=true if uncertain") near-verbatim. Every
   target buyer has this file on their own machine for free. Selling it is both a
   credibility risk and a licensing question, and the NexoApex name is reused
   across David's other projects.

3. **Most of the pack duplicates free, already-installed first-party tooling.**
   `/code-review`, `/security-review` and `/simplify` are built-in Claude Code
   commands; Anthropic auto-adds its official plugin marketplace (commit-commands,
   pr-review-toolkit, security-guidance) on first launch. A competitor gives away
   50+ overlapping Claude Code prompts for €0. `anthropics/skills` has ~175k stars.

Also unresolved: the Stripe link is still `test_PLACEHOLDER` and `terms.html`
still contains `[Your Jurisdiction]`.

**Recommendation on record:** do not launch this at $19. Either publish it free as
a public repo / community-marketplace plugin to build the audience that does not
yet exist, or rewrite the contents around the parts with no free equivalent. See
the session synthesis for the alternative product that scored far higher.

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
