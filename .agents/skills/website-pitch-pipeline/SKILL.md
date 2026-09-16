---
name: website-pitch-pipeline
description: Autonomous agency pipeline to case any market, audit weak local business websites, design bespoke pitch demo sites, and draft outreach. Runs 100% natively on Gemini using Google Maps, Google Search, and URL Context without Firecrawl or 3rd-party scrapers.
---

# Website Pitch Pipeline (Gemini Native)

An autonomous agent pipeline that cases a local market, audits businesses with weak or missing websites, designs bespoke demo sites, and drafts cold outreach.

This version runs **100% natively on Google Gemini** without requiring Firecrawl, Apify, Crawl4AI, or any third-party web scraping subscriptions.

---

## The Gemini Native Engine

Instead of external scraping APIs and browser automation proxies, this pipeline leverages Gemini's native platform tools:

| Pipeline Need | Legacy Stack | Gemini Native Replacement |
|---|---|---|
| **Local Lead Discovery** | Apify Google Maps / directories | **Google Maps Grounding (`google_maps`)** & **Google Search Grounding (`google_search`)** |
| **Site Content & Audit** | Firecrawl cloud scraper | **Native URL Context (`url_context`)** — Gemini fetches and parses live URLs directly |
| **Outdated Design Critique**| Heuristics / text rules | **Gemini Multimodal Vision** — directly inspects screenshots for 2010s layouts, broken mobile viewports, and weak UX |
| **Lead Sheet Generation** | External export scripts | **Native Code Execution (`code_execution`)** — writes and runs Python in sandbox to generate CSV/Excel files |
| **Screenshots** | Firecrawl screenshot API | **Native Headless Chrome** (`/Applications/Google Chrome.app` or `google-chrome --headless=new`) |

---

## Campaign Variables

Every campaign requires these parameters (never assume a default city):

```text
CAMPAIGN_NAME: [e.g. austin-plumbing-q1]
GEOGRAPHY:     [e.g. Austin, Texas | Berlin | Istanbul | US Southwest HVAC]
GEO_SLUG:      [e.g. austin-tx | berlin | istanbul]
LOCALE:        [e.g. en | de | tr]
VERTICALS:     [e.g. plumbing, HVAC, roofing]
TARGET_COUNT:  15 (qualified leads for Gate A)
```

---

## Pipeline Gates (Human in the Loop)

> **AGENTS HOLD NO KEYS. THE HUMAN SIGNS EVERY GATE.**

1. **Gate A (After Sheet 01 - Research)**: Human verifies real local businesses inside GEOGRAPHY, confirmed weak/missing websites, and public email/phone sources.
2. **Gate B (After Sheet 02 - Plan)**: Human verifies bespoke visual direction, local tone, and an executable implementation plan (no generic clones).
3. **Gate C (After Sheet 03 - Build)**: Human verifies polished mobile demo site, correct locale, and human-sounding cold outreach email.

---

## Running the Loops

### Loop 0: Site Prep
Verify your environment:
- Node.js & Python 3 installed
- `GEMINI_API_KEY` set (or running inside Google Antigravity / Gemini CLI)
- Google Chrome available for headless screenshots

### Loop 1: Research → Excel
Prompt Gemini with `google_maps`, `google_search`, `url_context`, and `code_execution`:
1. Find businesses matching `VERTICALS` in `GEOGRAPHY`.
2. Inspect each website via `url_context`. Identify weak criteria ($\ge 2$):
   - No website or broken domain
   - No HTTPS
   - Outdated copyright year ($\le 2019$)
   - Missing call-to-action (CTA), phone, or service list
   - Abandoned template / broken mobile layout
3. Output `./leads/<GEO_SLUG>-business-leads-batch-1.csv` and `./leads/<GEO_SLUG>-summary.md`.
4. **STOP for Gate A approval.**

### Loop 2: The Drawings (Bespoke Plan)
For each approved business:
1. Fetch their current site content using `url_context`.
2. Capture screenshot via native headless Chrome:
   ```bash
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot="old-site.png" --window-size=1280,800 "https://target-business.com"
   ```
3. Use Gemini vision to audit the visual layout and brand colors.
4. Generate a unique, bespoke implementation plan in `./plans/<GEO_SLUG>-<business-name>/`.
5. **STOP for Gate B approval.**

### Loop 3: The Build & Outreach
1. Build the demo site (Next.js / Tailwind / shadcn or static HTML/CSS).
2. Draft a personalized, consultative cold email in `EMAIL_DRAFT.md` citing specific observable fixes from their current site.
3. **STOP for Gate C approval.**

### Loop 4: The Run Report
File the completed run report into `runs/<CAMPAIGN_NAME>/REPORT.md`.
