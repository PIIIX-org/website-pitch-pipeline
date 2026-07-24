<!-- forged-with: git-a-profile -->
<div align="center">

<img src="./assets/hero-banner.svg" width="100%" alt="Overhead view of a planning table. A cyanotype blueprint titled WEBSITE-PITCH-PIPELINE shows a storefront homepage drawn as an elevation, flagged NO CTA, MENU IS A JPG and MOBILE BROKEN. Beside the sheet: a city map pinned istanbul, berlin and nyc, a torn takeoff slip reading $0.06 to $32.25 same job, a GATE A carbon slip, and a red stamp reading CHECKED: HUMAN. The title block reads FIRM: PIIIX.org, DRAWN BY: AGENTS, CHECKED BY: HUMAN, SHEET 1 OF 7." />

<img src="./assets/tag-metabar.svg" width="100%" alt="Drafting title-block strip with six cells: LICENSE MIT, RUNTIME ANY AGENT, GEOGRAPHY VARIABLE, BATCH CAP 5, GATES A·B·C checked by HUMAN, REV blank." />

</div>

Agents case a market, draw one bespoke demo site per business, build it, and draft the outreach. A human signs every gate before anything scales. The demo exists to start a conversation with the owner of a weak website, in any city you point the pipeline at.

> **AGENTS HOLD NO KEYS. THE HUMAN SIGNS EVERY GATE.**

---

## Why this exists

Point agents at a whole city without structure and you get template sites with invented contact data and emails no owner would answer. This pipeline forces research quality, one unique design per business, honest demo positioning, and a written report at the end. Geography stays a campaign variable, so the same drawing set works in Istanbul, Berlin, or a US HVAC corridor.

---

## The drawing set

<img src="./assets/sheet-register.svg" width="100%" alt="Sheet register table listing six sheets: 00a The Takeoff (price the job), 00 Site Prep (bootstrap), 01 The Casing (research 15 leads per geo), 02 The Drawings (one bespoke plan per business), 03 The Build (demo sites plus outreach drafts), 04 The File (push full report to runs/). Red slips reading GATE A, GATE B and GATE C, each checked by a human, sit between sheets 01 through 04. A dashed return arrow notes: scale the batch only after the sample passes." />

| Sheet | Loop file | Issued output | Stops for |
|---|---|---|---|
| **00a · The Takeoff** | [`loops/00a-cost-estimate.md`](./loops/00a-cost-estimate.md) | Model choice + cost estimate | Price accepted |
| **00 · Site Prep** | [`loops/00-bootstrap.md`](./loops/00-bootstrap.md) | `BOOTSTRAP_REPORT.md` | Machine ready |
| **01 · The Casing** | [`loops/01-research.md`](./loops/01-research.md) | Excel lead workbook | **Gate A** |
| **02 · The Drawings** | [`loops/02-plan.md`](./loops/02-plan.md) | One plan repo per business | **Gate B** |
| **03 · The Build** | [`loops/03-build.md`](./loops/03-build.md) | Demo PR + `EMAIL_DRAFT.md` | **Gate C** |
| **04 · The File** | [`loops/04-run-report.md`](./loops/04-run-report.md) | Report in [`runs/`](./runs) | Report live on GitHub |

Run one loop per agent session. Paste the fenced prompt from the matching `loops/*.md` into Claude Code with your campaign variables filled, using `/loop [auto]`.

---

## Sheet 00a — price the job before you take it

<img src="./assets/takeoff-chart.svg" width="100%" alt="Takeoff sheet: a scatter chart plotting 12 AI models by total campaign cost on a log scale against quality score. The same 5-lead, 5-plan, 5-site campaign costs $0.06 on mistral-small and $32.25 on claude-opus-4-1, with gemini, gpt and claude models between. Headline: the same job, $0.06 to $32.25, price it before you take it." />

The estimator reads a campaign size and prices it across 12 models from 4 providers, with quality and speed alongside cost. It runs on Node with zero dependencies:

```bash
node utils/cost-estimator.js estimate 5 3 2   # leads, businesses, sites
```

Details and model switching: [`utils/README.md`](./utils/README.md).

---

## The gates

<img src="./assets/gate-slips.svg" width="100%" alt="Three carbon triplicate gate slips. Gate A, after the casing: right geography, real businesses, public contacts only; shown signed with a red GO stamp. Gate B, after the first drawing: unique direction, local tone, executable plan; unsigned. Gate C, after the first build: mobile polish, correct locale, email sounds human; unsigned." />

| Gate | After | The human checks |
|---|---|---|
| **A** | Sheet 01, the casing | Right geography · real businesses · public contacts with source URLs |
| **B** | The first drawing | Unique direction · local tone · an executable `implementation.md` |
| **C** | The first build | Mobile polish · correct locale · an email that sounds human |

Batching past an unsigned gate is how quality collapses. One excellent sample beats ten weak clones; scale Sheets 02 and 03 across the batch after the sample passes.

---

## Campaign variables

Nothing is locked to one place. NYC is a valid choice, never a default. Before Sheet 01, set:

| Variable | Example |
|---|---|
| `ORG` | your GitHub org or username |
| `GEOGRAPHY` | Istanbul · Berlin · Lisbon metro · US Southwest HVAC |
| `GEO_SLUG` | `istanbul` · `berlin` · `lisbon` · `us-sw-hvac` |
| `LOCALE` | `tr` · `de` · `en` |
| `VERTICALS` | tailors, auto repair, plumbing |
| `BATCH_SIZE` | 5 plans/builds (research defaults to 15 leads) |

`GEO_SLUG` goes into file paths, repo names, and tags. Full rules: [`PIPELINE.md`](./PIPELINE.md).

---

## Tags on every business repo

<img src="./assets/tag-lifecycle.svg" width="100%" alt="Four manila evidence tags on strings along a dashed route: pending-beta, in-progress, ready-for-review with a red HUMAN stamp, ready-for-outreach. Below them, three flat companion tags: web-lead, geo slug, batch-1." />

Each business gets its own repo under your `ORG`, named `<GEO_SLUG>-<category>-<business>`, and moves through the four lifecycle tags above. The human stamp at `ready-for-review` is Gate C. Plans must score at least 90/100 on the written rubric in [`PIPELINE.md`](./PIPELINE.md) before a build starts.

---

## Quick start

```bash
gh repo fork PIIIX-org/website-pitch-pipeline --clone
cd website-pitch-pipeline
```

1. **Price it** · run Sheet 00a and pick a model for the budget.
2. **Prep the site** · run Sheet 00 once per machine; verify `BOOTSTRAP_REPORT.md`.
3. **Set the variables** · geography, slug, locale, verticals.
4. **Run the sheets in order** · sign each gate before the next sheet starts.
5. **File the report** · Sheet 04 pushes it to `runs/` on this repo.

Step-by-step version with prerequisites: [`HOW_TO_RUN.md`](./HOW_TO_RUN.md). Install commands for the full stack: [`INSTALL.md`](./INSTALL.md).

---

## Stack defaults

| Layer | Pitch demo default |
|---|---|
| App | Next.js App Router + TypeScript |
| Style | Tailwind + shadcn/ui |
| Motion | GSAP / anime.js when the concept calls for it |
| Data | Skip backends on v0 unless the brief requires one |

---

## The arsenal

| Layer | Tools |
|---|---|
| Design (Tier S) | [frontend-design](https://github.com/anthropics/skills) · [impeccable](https://github.com/pbakaus/impeccable) · [web-design-guidelines](https://github.com/vercel-labs/agent-skills) · [taste-skill](https://github.com/leonxlnx/taste-skill) · [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) · [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| Ideation / architecture | [ADHD](https://github.com/UditAkhourii/adhd) · [Branerail](https://github.com/UditAkhourii/branerail) |
| Copy (Tier S) | [marketingskills](https://github.com/coreyhaines31/marketingskills) · [stop-slop](https://github.com/hardikpandya/stop-slop) · [no-ai-slop](https://github.com/petergyang/no-ai-slop) · ogilvy · [ux-writing](https://github.com/content-designer/ux-writing-skill) |
| Marketing packs | [ai-marketing-claude](https://github.com/zubair-trabzada/ai-marketing-claude) · [digital-marketing-pro](https://github.com/indranilbanerjee/digital-marketing-pro) |
| Research | Apify · [Firecrawl](https://github.com/firecrawl/firecrawl) · [Crawl4AI](https://github.com/unclecode/crawl4ai) · [Scrapling](https://github.com/D4Vinci/Scrapling) · [Webclaw](https://github.com/0xMassi/webclaw) · [Browser Use](https://github.com/browser-use/browser-use) |
| Free images | Pollinations MCP (no key) · Unsplash/Pexels MCP (free keys) · see [`FREE_IMAGE_TOOLS.md`](./FREE_IMAGE_TOOLS.md) |

Full catalog with install commands: [`TOOLS.md`](./TOOLS.md). Ranked design and copy research: [`DESIGN_AND_COPY_SKILLS.md`](./DESIGN_AND_COPY_SKILLS.md). MCP template: [`mcp.example.json`](./mcp.example.json).

---

## The crew works clean

The rules in [`PIPELINE.md`](./PIPELINE.md) are load-bearing, and they are the identity of this pipeline:

- Contact data comes from public sources with a source URL, or it stays out of the workbook.
- Demos carry honest positioning: sales concepts, labeled as such, never passed off as the client's live site.
- No invented identities, no invented activity, no scraping past a site's terms.

---

## The file

<img src="./assets/section-tab.svg" width="220" alt="Manila folder tab labeled DOC NO." />

A campaign ends when its report exists on this repo:

```text
runs/<YYYY-MM-DD>/<GEO_SLUG>-<campaign-slug>/REPORT.md
```

Closed and aborted campaigns file reports too. Template: [`runs/_template/`](./runs/_template). No report on GitHub means the run is incomplete.

---

<div align="center">

<img src="./assets/footer-strip.svg" width="100%" alt="Closing title block: END OF SET, SHEET 7 OF 7. FIRM: PIIIX.org, open-source AI-native tools for the gaps in mature markets. DRAWN BY: AGENTS, CHECKED BY: HUMAN. FORGED WITH: GIT-A-PROFILE. FILED: runs/, with a red stamp reading RUN NOT DONE UNTIL FILED." />

MIT licensed. See [`LICENSE`](./LICENSE).

<sub>Forged with <a href="https://github.com/PIIIX-org/git-a-profile">git-a-profile</a> · <a href="https://github.com/PIIIX-org">PIIIX</a></sub>

</div>
