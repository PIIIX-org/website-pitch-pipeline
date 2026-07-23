<div align="center">

# Local Business Website Pitch Pipeline

**Find local businesses with weak websites → plan unique demos → build → outreach.**

An agent-ready operating system for local business sales demos — **any city, region, or country, any org.**  
Geography is a campaign variable. Aesthetics first. Human gates. No generic templates.

<br />

[![Org](https://img.shields.io/badge/org-your__org-0B0B0F?style=for-the-badge&labelColor=111827)](#campaign-variables)
[![Geo](https://img.shields.io/badge/geography-any_market-A78BFA?style=for-the-badge&labelColor=111827)](#campaign-variables)
[![Loops](https://img.shields.io/badge/loops-0→1→2→3-F59E0B?style=for-the-badge&labelColor=111827)](#the-four-loops)
[![Stack](https://img.shields.io/badge/demos-Next.js_+_shadcn-38BDF8?style=for-the-badge&labelColor=111827)](#stack-defaults)
[![Gates](https://img.shields.io/badge/quality-human_gates_A·B·C-22C55E?style=for-the-badge&labelColor=111827)](#human-gates)

<br />

```text
  SET GEO ──► RESEARCH ──► PLAN ──► BUILD ──► EMAIL ──► REPORT
  campaign      Excel       repos    demos     outreach   runs/ on this repo
                 ▲           ▲        ▲                      ▲
              Gate A      Gate B   Gate C              must push to GitHub
```

</div>

---

## Why this exists

Cold-building “a website for every shop in town” without structure produces:

- samey AI templates  
- invented contact data  
- unfinished repos  
- emails nobody would send  
- work stuck to one city when the process should travel  

This pipeline forces **research quality**, **unique design per business**, **human approval**, and **honest demo positioning** — for **whatever geography you choose**.

The first site is not the product. **The conversation is.**

---

## Campaign variables

**Nothing is locked to New York or any other single place.** Before Loop 1, set:

| Variable | Example |
|----------|---------|
| `ORG` | your GitHub org or username (e.g. `PIIIX-org`, `my-company`) |
| `GEOGRAPHY` | Istanbul · Berlin · NYC · Lisbon metro · US Southwest HVAC |
| `GEO_SLUG` | `istanbul` · `berlin` · `nyc` · `lisbon` · `us-sw-hvac` |
| `LOCALE` | `tr` · `de` · `en` · … |
| `VERTICALS` | tailors, auto repair, plumbing, … |
| `BATCH_SIZE` | 5 plans/builds (research often 15 leads) |

Use `GEO_SLUG` in file paths, repo names, and tags (`geo:<GEO_SLUG>`).  
NYC is a valid *choice* when you want it — never a default.

Full rules: [`PIPELINE.md`](./PIPELINE.md).

---

## The four loops

| # | Loop | File | Output | Stops for |
|---|------|------|--------|-----------|
| **0** | Bootstrap | [`loops/00-bootstrap.md`](./loops/00-bootstrap.md) | Skills, MCP, CLIs, bootstrap report | Machine ready |
| **1** | Research | [`loops/01-research.md`](./loops/01-research.md) | Excel + CSV of leads for **that geo** | **Gate A** |
| **2** | Plan | [`loops/02-plan.md`](./loops/02-plan.md) | One GitHub repo + plan pack per business | **Gate B** |
| **3** | Build | [`loops/03-build.md`](./loops/03-build.md) | Demo site PR + `EMAIL_DRAFT.md` | **Gate C** |
| **4** | Run report | [`loops/04-run-report.md`](./loops/04-run-report.md) | Full report under `runs/` **on this repo** | Report live on GitHub |

Full system write-up: **[`PIPELINE.md`](./PIPELINE.md)**  
Install sources: **[`INSTALL.md`](./INSTALL.md)**  
Tools catalog (Firecrawl, Crawl4AI, Browser Use, Scrapling, Webclaw, marketing & design skills…): **[`TOOLS.md`](./TOOLS.md)**  
Best design & copy skills (deep research + install ranks): **[`DESIGN_AND_COPY_SKILLS.md`](./DESIGN_AND_COPY_SKILLS.md)**  
Free image gen + scrape (Pollinations, Unsplash, Pexels…): **[`FREE_IMAGE_TOOLS.md`](./FREE_IMAGE_TOOLS.md)**  
MCP template: **[`mcp.example.json`](./mcp.example.json)**

---

## Quick start

### 1. Clone this repo

```bash
gh repo clone <ORG>/website-pitch-pipeline
cd nyc-website-pitch-pipeline
```

> Repo folder name may still say `nyc-…` historically; the **process is multi-geo**.

### 2. Bootstrap the machine (new PC)

Open Claude Code and paste the full prompt from:

```text
loops/00-bootstrap.md
```

### 3. Set geography, then run in order

```text
Fill Campaign variables (GEOGRAPHY, GEO_SLUG, LOCALE, VERTICALS)
Loop 0  →  verify BOOTSTRAP_REPORT.md
Loop 1  →  review Excel          (Gate A)
Loop 2  →  review first plan     (Gate B)
Loop 3  →  review first build    (Gate C)
Then scale Loops 2–3 across the batch
Loop 4  →  upload full report to runs/ on this repo  (REQUIRED before "done")
```

### 4. How to invoke a loop

In Claude Code:

```text
/loop [auto]
```

Paste the fenced prompt from the matching `loops/*.md` file **with campaign fields filled**.

**One loop per session** keeps context clean.

---

## Human gates

| Gate | When | You check |
|------|------|-----------|
| **A** | After research | Right geography, real businesses, public contacts, fit scores |
| **B** | After first plan | Unique direction, local tone, executable `implementation.md` |
| **C** | After first build | Mobile polish, locale correct, distinct look, email sounds human |

> Do not batch-plan or batch-build past a gate. One excellent sample beats ten weak clones.

## Mandatory run report (Loop 4)

When a campaign finishes (or is closed/aborted), the agent **must** push a full report to **this** repo:

```text
runs/<YYYY-MM-DD>/<GEO_SLUG>-<campaign-slug>/REPORT.md
```

See [`loops/04-run-report.md`](./loops/04-run-report.md) and [`runs/README.md`](./runs/README.md).  
**No report on GitHub → pipeline run is incomplete.**

---

## What “good” looks like

### Research (Loop 1)

- Scoped to **campaign geography only**  
- Flexible location columns (country / region / city / area — not only “borough”)  
- **15** qualified rows by default  
- Email only when public + **source URL**  
- Strengths / weaknesses from evidence  

### Plans (Loop 2)

- Different design **lane** per business  
- Score **≥ 90 / 100** on the written rubric  
- Repos under your **`ORG`**: `<GEO_SLUG>-<category>-<business>`  
- Tags: `pending-beta`, `web-lead`, `geo:<GEO_SLUG>`, `batch-1`  

### Builds (Loop 3)

- Follow that repo’s plan exactly  
- Local phone/maps/language details  
- CI green → **human** reviews PR  
- `EMAIL_DRAFT.md` in the right language, with `stop-slop` discipline  

---

## Stack defaults

| Layer | Pitch demo default |
|-------|--------------------|
| App | Next.js App Router + TypeScript |
| Style | Tailwind + shadcn/ui |
| Motion | GSAP / anime.js when the concept needs it |
| Data | Skip Nest/PHP/Postgres on v0 unless the brief requires it |

---

## Skills & tools (high level)

| Layer | Examples |
|-------|----------|
| Design (Tier S) | [frontend-design](https://github.com/anthropics/skills) · [impeccable](https://github.com/pbakaus/impeccable) · [web-design-guidelines](https://github.com/vercel-labs/agent-skills) · [taste-skill](https://github.com/leonxlnx/taste-skill) · [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) · [emilkowalski/skills](https://github.com/emilkowalski/skills) |
| Ideation / architecture | [ADHD](https://github.com/UditAkhourii/adhd), [Branerail](https://github.com/UditAkhourii/branerail) |
| Copy (Tier S) | [marketingskills](https://github.com/coreyhaines31/marketingskills) (copywriting, cold-email, page-cro…) · [stop-slop](https://github.com/hardikpandya/stop-slop) · [no-ai-slop](https://github.com/petergyang/no-ai-slop) · ogilvy · [ux-writing](https://github.com/content-designer/ux-writing-skill) |
| Marketing packs | [ai-marketing-claude](https://github.com/zubair-trabzada/ai-marketing-claude), [digital-marketing-pro](https://github.com/indranilbanerjee/digital-marketing-pro) |
| Research | Apify, [Firecrawl](https://github.com/firecrawl/firecrawl), [Crawl4AI](https://github.com/unclecode/crawl4ai), [Scrapling](https://github.com/D4Vinci/Scrapling), [Webclaw](https://github.com/0xMassi/webclaw), [Browser Use](https://github.com/browser-use/browser-use) |
| Free images | **Pollinations MCP** (no key) · Unsplash/Pexels MCP (free keys) · site scrape via Firecrawl/browse — see [FREE_IMAGE_TOOLS.md](./FREE_IMAGE_TOOLS.md) |
| MCP | shadcn, magic, pollinations, unsplash, pexels, webclaw, scrapling |
| Motion | `gsap-skills`, Emil animation skills |
| Meta / ops | [SkillOpt](https://github.com/microsoft/SkillOpt), [kepano-obsidian](https://github.com/kepano/kepano-obsidian) |

See [`TOOLS.md`](./TOOLS.md) for install commands and which loop uses what.

---

## Repo layout

```text
website-pitch-pipeline/
├── README.md
├── PIPELINE.md                      # full system
├── INSTALL.md                       # short install table
├── TOOLS.md                         # required external tools + skills
├── DESIGN_AND_COPY_SKILLS.md        # deep research: best design + writing skills
├── FREE_IMAGE_TOOLS.md              # free image gen + scrape MCPs/skills
├── mcp.example.json
├── runs/
│   ├── README.md                    # report upload rules
│   └── _template/                   # REPORT.md + SUMMARY.md
└── loops/
    ├── 00-bootstrap.md
    ├── 01-research.md
    ├── 02-plan.md
    ├── 03-build.md
    └── 04-run-report.md             # mandatory end-of-run upload
```

Per-business demo repos (Loop 2):

```text
<ORG>/istanbul-tailor-example-shop
<ORG>/berlin-auto-example-garage
<ORG>/nyc-plumber-example-flow     # only when campaign geo is NYC
```

Lead files:

```text
./leads/<GEO_SLUG>-business-leads-batch-1.xlsx
./leads/<GEO_SLUG>-summary.md
```

---

## Legal & ethics (non-negotiable)

- Public business contacts only  
- Record source URLs for emails  
- No invented identities  
- Respect local marketing / data norms when known  
- Demos are sales tools — say so in README when relevant  
- Outreach only after a human has read the email  

---

## Operating rhythm

```text
Day 0   Loop 0 + set Campaign variables
Day 1   Loop 1 → Gate A (Excel for that geo)
Day 1–2 Loop 2 sample → Gate B
Day 2–3 Loop 3 sample → Gate C
Day 3+  Scale remaining batch
```

Keep batches small (**≤ 5** plans/builds at a time unless expanded on purpose).

---

## Maintainers

- **Org:** Set via `ORG` campaign variable
- **Operator account:** Taha Mahmoodi (`Taha-Mahmoodi`)

---

<div align="center">

**Pick a market · run one loop · pass the gate · then scale.**

[`PIPELINE.md`](./PIPELINE.md) · [`loops/`](./loops/) · [`INSTALL.md`](./INSTALL.md)

</div>
