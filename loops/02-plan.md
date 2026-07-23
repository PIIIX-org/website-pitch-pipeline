# Loop 2 — Plan sites + create repos

> For each approved lead: unique website plan, design system, page plans, and a GitHub repo under your **ORG**.  
> Tag repos `pending-beta` + `geo:<GEO_SLUG>`.  
> **Stop after the first full plan** for Gate B before planning the rest of the batch.  
> Geography comes from the campaign / Excel — not hardcoded.

---

## Campaign variables (must match Gate A Excel)

```text
GEOGRAPHY:
GEO_SLUG:
LOCALE / LANGUAGE:
```

---

## Paste into Claude Code

```text
/loop [auto]
/goal
# Loop 2 — Unique website plans + pending-beta repos (any geography)

## Prerequisite
Gate A approved Excel at:
./leads/<GEO_SLUG>-business-leads-batch-1.xlsx
Process only Fit Score ≥ 7, max 5 businesses in batch 1.
Stop after first completed plan repo and wait for human approval of that sample before continuing the rest.
GEO_SLUG and GEOGRAPHY must match the Excel campaign columns — never switch markets mid-batch without a human.

## Objective
For each selected business, create a unique website plan package that would get the owner to the negotiation table in **their** market and language. Aesthetics and clarity > deep functionality.

## Skills — MUST load and follow (not optional name-drops)
Ideation (required for uniqueness):
  - ADHD skill (https://github.com/UditAkhourii/adhd) — run diverge→score→prune→deepen for
    positioning, homepage concepts, IA options, and "what traps look good but aren't"
    before locking a single template. Install: npx skills add UditAkhourii/adhd
  - Branerail (https://github.com/UditAkhourii/branerail) when defining system shape,
    implementation.md architecture, resilience, or DESIGN.md discipline

Design direction (Tier S stack — see DESIGN_AND_COPY_SKILLS.md):
  - anthropics frontend-design — intentional anti-generic direction before any layout lock
  - design-taste-frontend (brief inference + anti-slop)
  - impeccable (init PRODUCT.md/DESIGN.md; craft commands)
  - vercel web-design-guidelines for quality bar
  - high-end-visual-design OR minimalist-ui OR industrial-brutalist-ui
    (pick ONE lane per business; never reuse the same lane for two businesses in the batch)
  - ui-ux-pro-max (https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) — available; use when needed for palette/type/product-type suggestions (do not fight a locked taste lane)
  - brandkit when identity is weak
  - redesign-existing-projects when they have an old site
  - extract-design-system when pulling tokens from an existing site
  - imagegen-frontend-web for section concept images when helpful
  - design-an-interface (mattpocock) for interaction/IA judgment when needed
  - gstack /design-consultation → produce DESIGN.md
  - gstack /design-shotgun when two directions compete
  - diagram-design for user-flow diagram (unique per business)

Copy / writing (Tier S stack):
  - coreyhaines31 copywriting + copy-editing + marketing-psychology
  - page-cro / cro for persuasion structure on pitch pages
  - ogilvy for sell-first headlines/promises
  - content-strategy / site-architecture for multi-page narrative
  - stop-slop AND no-ai-slop on all long prose in briefs
  - AI Marketing Claude for audits/positioning when installed
  - Digital Marketing Pro for strategy/SEO depth when installed

Motion / components research:
  - emilkowalski/skills — emil-design-eng, review-animations, animation-vocabulary, apple-design
  - gsap-skills plugin docs for motion plan (only if motion helps)
  - shadcn MCP for component inventory candidates
  - magic MCP for distinctive UI component ideas (do not clone same set every time)

Assets / site evidence (see FREE_IMAGE_TOOLS.md):
  - FIRST: Firecrawl, Crawl4AI, Webclaw, Scrapling, or /browse to pull logo/photos/og:image from their site
  - gstack /browse for screenshots of current site
  - FREE stock: Unsplash MCP / Pexels MCP (with free API keys + attribution) for lifestyle fillers
  - FREE gen: Pollinations MCP (@pollinations/mcp or @pollinations/model-context-protocol) — no key — for mock heroes when brand has no usable images
  - paid higgsfield only if human approves; never invent fake real staff faces

## Non-negotiables
- No shared visual template across businesses
- Plan must exploit their strengths and counter their weaknesses from the Excel
- Reflect local geography: place names, trust signals, phone formats, maps embeds, cultural tone for GEOGRAPHY + LOCALE
- Prefer marketing/demo site architecture unless research proves a real app is needed
- Pull brand cues from existing site/social/maps (logo, colors, photos if usable for mock)
- If no site: derive brand from name + niche + local area + public assets only
- Requirements: each website must have a unique workflow, user flow, structure, and pipeline tailored to that exact business

## Scoring rubric (max 100; need ≥90)
Self-review checklist, each item 0–10:
1. Positioning clarity
2. Unique visual direction (not generic AI SaaS look)
3. Strengths reflected on homepage
4. Weaknesses addressed (trust, CTA, clarity, mobile)
5. Page-by-page IA makes sense for that business
6. Component inventory complete
7. Copy direction specific (not lorem); correct LOCALE
8. Asset list complete (what exists / what to generate)
9. Implementation.md is executable by an agent without questions
10. Repo hygiene (README, tags including geo:<GEO_SLUG>, structure)

Second pass: improve weakest 3 scores; target ≥95. Do not invent a fake "120" scale.

## Per-business repo
- Org: <ORG> (from Campaign variables)
- Name: <GEO_SLUG>-<category-slug>-<business-slug>
- Topics/tags: web-lead, pending-beta, batch-1, geo:<GEO_SLUG>
- Branches: dev (default), prod
- Human merge required; CI must pass before review requested
- All code reviewed by a human before PR merge; GitHub Actions verify before review is requested

## Required files per repo
1. brief.md — business, audience, geography, locale, offer, strengths, weaknesses, conversion goal
2. implementation.md — agent build prompt, stack choice, structure, hard performance rules
3. design-system.md / DESIGN.md — color, type, spacing, motion, tone (unique)
4. page-plans/ — one md per page: sections top→bottom, components, copy notes
5. assets.md — logos/colors/photos sources + generation needs
6. user-flow.md — unique user flow for this business
7. handling-protocols.md — file/folder naming, context loss, resume after power outage, multi-agent, sandbox test, visual test (/browse), token optimization
8. github-workflow.md — dev/prod, PR, CI, human review, issues → fix → merge → promote
9. README.md — what this repo is, status, campaign geo, how to run later
10. skills-used.md — which skills/MCP applied + why

Structural requirements: structure the way that best fits the uniqueness of each project.

## Stack guidance (defaults for pitch sites)
Default: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui
Motion: GSAP and/or anime.js only if it helps the concept
Backend/DB: omit for v0 demo unless brief truly needs forms storage
If forms needed: simple API route or form placeholder — no full Nest/PHP/Postgres unless justified in brief
User prefs for later full builds: HTML/CSS/JS/Next.js; backend PHP/Node/Nest; DB PostgreSQL

## Skills / tools
Use installed design + copywriting skills, shadcn MCP, magic MCP, browser tools for research.
Prefer distinctive design; avoid same layout for every business.
Use gstack design skills and custom global skills already installed.

## Done when (per business)
- Checklist ≥90
- Repo exists under <ORG> with tags pending-beta + batch-1 + geo:<GEO_SLUG>
- All required files present on dev
- Sample first repo paused for human Gate B
```

---

## Acceptance checklist (per business)

- [ ] Score ≥ 90 (documented)  
- [ ] Unique design lane vs other batch sites  
- [ ] Local geo + language reflected  
- [ ] All required files present  
- [ ] Repo under `<ORG>` named with `GEO_SLUG`  
- [ ] Tags include `geo:<GEO_SLUG>`  
- [ ] First of batch stopped for **Gate B**  

---

## Next

→ [03-build.md](./03-build.md) after Gate B on the sample plan.
