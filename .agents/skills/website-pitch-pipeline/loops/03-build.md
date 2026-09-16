# Loop 3 — Build + outreach email

> Find `<ORG>` repos tagged `pending-beta` (optionally filter `geo:<GEO_SLUG>`), implement their plans, open PRs for human review, draft a human-sounding outreach email in the campaign language.  
> **Build one site fully → Gate C** before the rest of the batch.  
> Geography is whatever the plan/campaign specifies.

---

## Campaign variables

```text
GEO_SLUG:           # optional filter; if set, only implement that geo's pending-beta repos
LOCALE / LANGUAGE:
```

---

## Paste into Claude Code

```text
/loop [auto]
/goal
# Loop 3 — Implement pending-beta plans + outreach email (any geography)

## Prerequisite
Only implement repos in <ORG> with topic/tag: pending-beta
If GEO_SLUG is set, also require tag geo:<GEO_SLUG>
Skip any repo not approved at Gate B.
Build max 1 full site, then pause for human Gate C before continuing.
Use locale/language from that repo's brief.md — do not force English or any single city aesthetic.

## Objective
Implement each plan faithfully. When implementation matches plan acceptance criteria, add a human-sounding outreach email draft (in the business locale) and retag repo ready-for-outreach (after human merge + demo URL when available).

## Skills — MUST use
Implement:
  - implementation.md of that repo is law
  - impeccable + design-taste-frontend + chosen style skill while coding
  - ui-ux-pro-max when needed (palette/type/product patterns); skip if DESIGN.md already locks tokens
  - ADHD (https://github.com/UditAkhourii/adhd) when stuck on structure/UX alternatives
  - Branerail (https://github.com/UditAkhourii/branerail) for architectural audits if build exceeds pure static marketing
  - image-to-code if design refs exist
  - gsap-skills when implementing motion
  - shadcn MCP to add components correctly
  - magic MCP only for gaps, not to homogenize batch
  - FREE images (FREE_IMAGE_TOOLS.md):
      1) use scraped brand assets from plan/assets.md first
      2) Unsplash/Pexels MCP for attributed stock when needed
      3) Pollinations MCP for free AI heroes/icons (no API key)
  - install anime.js if the plan calls for it
  - use custom global skills installed on the machine

QA:
  - gstack /browse + /qa or /qa-only
  - /design-review after visual complete
  - Browser Use (https://github.com/browser-use/browser-use) for interactive multi-step QA when needed
  - emilkowalski review-animations / improve-animations skills on motion
  - redesign-existing-projects audit pass if porting from old site patterns

Copy polish (Tier S writing stack):
  - copy-editing + stop-slop + no-ai-slop + ogilvy on headlines/CTAs
  - cold-email skill (coreyhaines31/marketingskills) for EMAIL_DRAFT structure
  - ux-writing-skill for buttons, forms, empty/error microcopy
  - edit-article for any long-form on-page sections
  - AI Marketing Claude email/outreach skills when helpful
  - Final pass: stop-slop + no-ai-slop on EMAIL_DRAFT.md (must sound human in target language)

## Build rules
- Follow that repo's implementation.md and page-plans exactly
- Unique result per business; no copying components wholesale across repos
- Mobile-first, fast, polished UI
- Local correctness: phone formats, maps, address style, language for that GEOGRAPHY
- Demo CTAs allowed (Call / Get quote) using public business phone/email from brief
- Mark concept clearly in README (sales demo concept site)
- Do not stop until each approved repo meets its plan criteria (with evidence)

## QA before "done" (must evidence)
- [ ] Matches plan pages/sections
- [ ] Mobile layout checked in browser
- [ ] No broken links/images
- [ ] Locale/language correct for the campaign
- [ ] Lighthouse performance sensible for a marketing page
- [ ] Distinct from other batch sites
- [ ] CI green; PR opened for human review (do not self-merge if policy forbids)
- [ ] skills-used.md updated with what was actually used

## GitHub workflow (per plan's github-workflow.md)
- Work on feature branches → PR into dev
- GitHub Actions must pass before requesting review
- Human reviews and merges
- Promote dev → prod only after verified
- If problems: open issue, fix on PR, mark issue solved, then merge

## Email draft (EMAIL_DRAFT.md in repo)
Must include:
- Subject line options (3) in LOCALE language
- Short human email (not salesy AI tone) — run stop-slop
- What we noticed about their business (specific, local)
- Link placeholder for demo
- Soft CTA to chat
- No fake urgency, no fake "we already built your site live on your domain" claims unless true

## Tagging
- while building: in-progress
- after PR ready: ready-for-review
- after human merge + demo URL: ready-for-outreach
- keep geo:<GEO_SLUG>
- remove pending-beta when implementation complete

## Done when (Loop 3 only — not full pipeline)
- All approved pending-beta repos in this batch (and geo filter if set) are ready-for-review or ready-for-outreach
- Each has EMAIL_DRAFT.md
- Summary table: business | geography | repo | demo URL | status
- First site paused at Gate C before batch continues
- After the batch is closed: proceed to Loop 4 (run report). Loop 3 alone is NOT "pipeline complete."
```

---

## Acceptance checklist

- [ ] Plan criteria met with QA evidence  
- [ ] Unique vs other batch sites  
- [ ] Locale / local details correct  
- [ ] PR open; CI green; human review path respected  
- [ ] `EMAIL_DRAFT.md` human-sounding  
- [ ] Tags updated (incl. geo)  
- [ ] Batch summary table written  
- [ ] First of batch stopped for **Gate C**  

---

## After Loop 3 → Loop 4 (required)

When the batch is finished (or the human closes the run), **you must** run  
[`04-run-report.md`](./04-run-report.md): write `REPORT.md` + `SUMMARY.md` and **push** them to:

`<ORG>/website-pitch-pipeline` → `runs/<YYYY-MM-DD>/<GEO_SLUG>-<campaign>/`

**The pipeline is not done until that report is on GitHub.**

---

## End of pipeline

1. Gate C + remaining builds  
2. **Loop 4 run report uploaded**  
3. Send emails only with human approval  

Demos support negotiation — they are not a substitute for a signed engagement. Same process works for **any** geography you set in the campaign block.
