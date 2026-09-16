# Tools & skills catalog (required stack)

External projects the Local Business Website Pitch Pipeline depends on or should install.  
**Geography-agnostic.** Install once on the machine (Loop 0); use per loop as listed below.

Sources are official GitHub repos. Prefer upstream README if install commands change.

---

## How to use this table

| Column | Meaning |
|--------|---------|
| **Role** | Why it is in the pipeline |
| **Loops** | Where agents must prefer it |
| **Install** | Bootstrap command(s) |
| **Required?** | Required = Loop 0 fails without it (or documents SKIP with reason) |

---

## A. Gemini Native Toolchain (Zero 3rd-party scrapers)

### 1. Gemini URL Context (`url_context`)

| | |
|--|--|
| **Role** | Directly fetch and ingest live web pages into Gemini as Markdown/content without any third-party scrapers |
| **Loops** | **1** weak site audits, **2** brand content and asset pull |
| **Required?** | Yes (Built-in to Gemini 3+ / Antigravity) |
| **Setup** | Enabled via `tools=[{"type": "url_context"}]` |

No Firecrawl API key, no headless browser overhead, and no scraping infrastructure.

---

### 2. Google Maps Grounding (`google_maps`)

| | |
|--|--|
| **Role** | Discover real local businesses in any campaign GEOGRAPHY with physical locations, verified phones, and official sites |
| **Loops** | **1** research & lead casing |
| **Required?** | Yes (Built-in to Gemini) |
| **Setup** | Enabled via `tools=[{"type": "google_maps"}]` |

Replaces Apify Google Maps scrapers and directory scraping with official Google Maps data.

---

### 3. Google Search Grounding (`google_search`)

| | |
|--|--|
| **Role** | Real-time web search and live citations for local directories and business presence |
| **Loops** | **1** research & contact discovery |
| **Required?** | Yes (Built-in to Gemini) |
| **Setup** | Enabled via `tools=[{"type": "google_search"}]` |

---

### 4. Native Headless Google Chrome

| | |
|--|--|
| **Role** | Full-page screenshots of existing weak websites using the local browser binary |
| **Loops** | **2** drawings & visual evidence, **3** demo review |
| **Required?** | Recommended (macOS / Linux native) |
| **Setup** | `"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --screenshot=site.png <url>` |

Zero npm install, zero Puppeteer/Playwright packages required. Uses the browser already on your machine.

---

### 3. Browser Use — [browser-use/browser-use](https://github.com/browser-use/browser-use)

| | |
|--|--|
| **Role** | AI browser agent: open pages, click, type, fill forms, extract, QA |
| **Loops** | **1** interactive verification, **3** visual/flow QA when `/browse` is not enough |
| **Required?** | Recommended (required for hard interactive sites) |
| **Docs** | https://docs.browser-use.com |

```bash
# Prefer uv + Python 3.12 per upstream
uv pip install browser-use
# or: pip install browser-use
browser-use skill install    # register skill with agent clients when available
```

Agent paste-setup (from upstream): install/upgrade with uv, run `browser-use skill install`, connect browser.  
Complements gstack `/browse` — use Browser Use for multi-step agentic navigation; use gstack for fast headless QA.

---

### 4. Scrapling — [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling)

| | |
|--|--|
| **Role** | Adaptive scraping framework + optional MCP server (stealth, spiders, selectors) |
| **Loops** | **1** stubborn / JS-heavy / anti-bot directories |
| **Required?** | Recommended |
| **Docs** | https://scrapling.readthedocs.io |

```bash
pip install "scrapling[all]"   # or: scrapling[fetchers] then extras
scrapling install              # browser dependencies
# MCP server:
pip install "scrapling[ai]"
```

Use when simple HTTP + Firecrawl/Crawl4AI fail. Respect site ToS and local law.

---

### 5. Webclaw — [0xMassi/webclaw](https://github.com/0xMassi/webclaw)

| | |
|--|--|
| **Role** | Fast local-first extraction (Rust): CLI, REST, MCP — Firecrawl-like without cloud lock-in |
| **Loops** | **1** bulk extract, **0** MCP alternative when cloud keys missing |
| **Required?** | Recommended (local MCP) |
| **Docs** | https://webclaw.io |

```bash
# macOS
brew install webclaw

# or Cargo
cargo install --git https://github.com/0xMassi/webclaw.git webclaw-cli
cargo install --git https://github.com/0xMassi/webclaw.git webclaw-mcp

# skill (skills.sh style)
npx skills add 0xMassi/webclaw-skill

# zero-install MCP: npx create-webclaw / point client at webclaw MCP per README
```

Add to Claude MCP config when installed (stdio → `webclaw-mcp` or documented npx launcher).

---

## B. Writing quality & anti-slop

### 6. No AI Slop — [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop)

| | |
|--|--|
| **Role** | Strip 20+ AI writing patterns from prose |
| **Loops** | **2** briefs/copy, **3** EMAIL_DRAFT.md + on-page copy |
| **Required?** | Yes (alongside `stop-slop` if both installed — run at least one) |

```bash
# Claude / agent skill install (global)
# Paste to agent: Install this skill globally: https://github.com/petergyang/no-ai-slop
# or:
npx skills add petergyang/no-ai-slop   # if published on skills CLI
git clone https://github.com/petergyang/no-ai-slop.git ~/.agents/skills/no-ai-slop
# ensure SKILL.md is discoverable by Claude Code
```

Article: https://creatoreconomy.so/p/use-my-no-ai-slop-skill-to-remove-20-ai-slop-patterns

---

## C. Skill systems & marketing packs

### 7. SkillOpt — [microsoft/SkillOpt](https://github.com/microsoft/SkillOpt)

| | |
|--|--|
| **Role** | Optimize reusable skill documents from agent trajectories (train `best_skill.md`) |
| **Loops** | **0** optional continuous improvement of pipeline skills; post-batch retros |
| **Required?** | Optional (power users / meta-improvement) |
| **Docs** | https://microsoft.github.io/SkillOpt/ · https://aka.ms/skillopt |

```bash
pip install skillopt
# Claude Code / Codex integration shells live in the upstream repo (not always in the wheel)
git clone https://github.com/microsoft/SkillOpt.git
# follow docs for skillopt-sleep / harness plugins
```

Use after several campaign runs to harden custom skills (research rubric, email tone, design critique).

---

### 8. AI Marketing for Claude — [zubair-trabzada/ai-marketing-claude](https://github.com/zubair-trabzada/ai-marketing-claude)

| | |
|--|--|
| **Role** | Marketing suite for Claude Code: audit, copy, email, ads, competitive intel, PDF reports |
| **Loops** | **1** competitive/site audit signals, **2** positioning/copy, **3** EMAIL_DRAFT + campaign assets |
| **Required?** | Yes (marketing depth) |

```bash
curl -fsSL https://raw.githubusercontent.com/zubair-trabzada/ai-marketing-claude/main/install.sh | bash
# or:
git clone https://github.com/zubair-trabzada/ai-marketing-claude.git
cd ai-marketing-claude && ./install.sh
pip install reportlab   # if PDF reports needed
```

---

### 9. Digital Marketing Pro — [indranilbanerjee/digital-marketing-pro](https://github.com/indranilbanerjee/digital-marketing-pro)

| | |
|--|--|
| **Role** | Large open-source marketing plugin (many skills/agents): strategy, SEO/AEO/GEO, agency workflows |
| **Loops** | **2** strategy/IA/copy systems, **3** SEO-aware demos + outreach positioning |
| **Required?** | Recommended |

```bash
# Claude Code (canonical)
# In Claude Code:
# /plugin marketplace add indranilbanerjee/neels-plugins   # if not already
# /plugin install digital-marketing-pro@neels-plugins

# Manual
git clone --depth=1 https://github.com/indranilbanerjee/digital-marketing-pro.git
# follow platform table in upstream README (Codex, Cursor, Copilot CLI, etc.)
```

Marketplace reference: `indranilbanerjee/neels-plugins`.

---

## D. Knowledge base & design-engineer skills

### 10. Kepano Obsidian vault — [kepano/kepano-obsidian](https://github.com/kepano/kepano-obsidian)

| | |
|--|--|
| **Role** | Personal Obsidian vault template — structure for notes, campaigns, research |
| **Loops** | Optional **ops**: store campaign notes, Excel decisions, Gate A/B/C logs outside git |
| **Required?** | Optional (recommended for multi-campaign memory) |
| **Docs** | https://stephango.com/vault |

```bash
git clone https://github.com/kepano/kepano-obsidian.git ~/Obsidian/kepano-template
# Open as vault in Obsidian; copy structure for campaign notes
# Suggested folders: Campaigns/<GEO_SLUG>/, Leads/, Plans/, Outreach/
```

Not an agent skill — a **human + agent note system**. Point agents at campaign vault paths when present.

---

### 11. Emil Kowalski skills — [emilkowalski/skills](https://github.com/emilkowalski/skills)

| | |
|--|--|
| **Role** | Design-engineer taste: animation, UI polish, anti-slop interfaces (Vercel/Linear-grade) |
| **Loops** | **2** motion/UI direction, **3** implement + review animations |
| **Required?** | Yes (demo quality bar) |
| **skills.sh** | https://skills.sh/emilkowalski/skills |

```bash
npx skills@latest add emilkowalski/skills
```

Included skills (upstream): `emil-design-eng`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`, `pick-ui-library`.

---

## E. Ideation & architecture (Udit Akhouri)

Author profile: [github.com/UditAkhourii](https://github.com/UditAkhourii) · site: [uditakhouri.com](https://uditakhouri.com)

### 12. ADHD (agent skill) — [UditAkhourii/adhd](https://github.com/UditAkhourii/adhd)

| | |
|--|--|
| **Role** | Parallel divergent ideation: isolated cognitive frames → score → prune traps → deepen survivors. Fixes premature convergence on design, naming, API surface, strategy, fuzzy problems |
| **Loops** | **2** unique site concepts / IA / positioning alternatives; **3** when stuck on UX or structure; any “give me several non-obvious options” step |
| **Required?** | Yes (creative differentiation bar for non-template sites) |
| **Docs** | https://adhdstack.github.io/ · Discord in upstream README |

```bash
npx skills add UditAkhourii/adhd
# auto-detects Claude Code, Cursor, Codex, and many other agents
```

**When to invoke:** design decisions, multiple homepage directions, naming, “what could go wrong,” strategy for a business pitch — **not** for routine file edits.

npm package (related): [`adhd-agent`](https://www.npmjs.com/package/adhd-agent)

---

### 13. Branerail — [UditAkhourii/branerail](https://github.com/UditAkhourii/branerail)

| | |
|--|--|
| **Role** | CTO-level architectural skill for Claude Code: design-first, resilience, state ownership, observability, blast radius, DESIGN.md / specs |
| **Loops** | **2** `implementation.md` + system shape; **3** before non-trivial build choices; audits of generated architecture |
| **Required?** | Recommended (especially when a demo grows past pure marketing pages) |

```bash
npm install -g @uditakhouri/branerail
# or project:
npm install --save-dev @uditakhouri/branerail
# CLI helpers after install: branerail-audit, branerail-chaos (see upstream)
```

Trigger topics: architecture, scale, resilience, state ownership, blast radius, observability, `DESIGN.md`, code review.

---

### 14. Brane Code (optional runtime) — [UditAkhourii/brane-code](https://github.com/UditAkhourii/brane-code)

| | |
|--|--|
| **Role** | Lightweight model-agnostic AI coding runtime (OpenRouter/OpenAI); alternative coding agent host |
| **Loops** | Optional host if not using Claude Code for a batch |
| **Required?** | Optional |

```bash
# follow upstream README for install / brane CLI usage
git clone https://github.com/UditAkhourii/brane-code.git
```

Pipeline default remains **Claude Code + gstack**. Brane Code is an escape hatch, not a requirement.

---

## F. Best design & writing skills (research-backed)

> Full ranking, evidence, and stack order: **[`DESIGN_AND_COPY_SKILLS.md`](./DESIGN_AND_COPY_SKILLS.md)**  
> Sources: [skills.sh](https://www.skills.sh/) install leaderboard (2026-07-23), GitHub reputation, pipeline fit.

### Design — Tier S (required)

| Skill | Install | Why |
|-------|---------|-----|
| **frontend-design** | `npx skills add anthropics/skills --skill frontend-design` | ~695K installs; official Anthropic anti-generic UI |
| **impeccable** | `npx impeccable install` · or `npx skills add pbakaus/impeccable` | Design language + PRODUCT/DESIGN.md; ~203K + command family |
| **web-design-guidelines** | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` | Vercel official web quality (~484K) |
| **design-taste-frontend** + taste pack | `npx skills add leonxlnx/taste-skill` | Anti-slop landings; high-end / minimal / brutalist lanes |
| **ui-ux-pro-max** | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill` | Install always. **Use when needed**: palettes, font pairings, product-type UI patterns (~280K). Optional per-page if a taste lane already defines the system. |
| **emilkowalski/skills** | `npx skills@latest add emilkowalski/skills` | Design-engineer motion/UI (~156K emil-design-eng) |

### Design — Tier A (recommended)

```bash
npx skills add mattpocock/skills --skill design-an-interface
npx skills add arvindrk/extract-design-system
# taste pack also provides: redesign-existing-projects, brandkit,
# imagegen-frontend-web, image-to-code, high-end-visual-design, etc.
```

### Writing / copy — Tier S (required)

| Skill | Install | Why |
|-------|---------|-----|
| **marketingskills pack** | `npx skills add coreyhaines31/marketingskills` | Best marketing suite (~41k★): copywriting, copy-editing, cold-email, page-cro, marketing-psychology, seo-audit, content-strategy, emails, ad-creative… |
| **stop-slop** | `npx skills add hardikpandya/stop-slop` | Strip AI writing tells (~14k★) |
| **no-ai-slop** | `npx skills add petergyang/no-ai-slop` | Second anti-slop pass (20+ patterns) |
| **ogilvy** | `npx skills add boraoztunc/skills --skill ogilvy` | Classic sell-first advertising principles |

### Writing — Tier A (recommended)

```bash
npx skills add content-designer/ux-writing-skill   # UI microcopy
npx skills add mattpocock/skills --skill edit-article
# From marketingskills (already in pack): cold-email, page-cro, seo-audit, emails
```

### Stack order (do not load everything at once)

**Plan:** ADHD → frontend-design + design-taste → **one** visual lane → impeccable DESIGN.md → copywriting + psychology + ogilvy → page-cro → stop-slop + no-ai-slop  

**Build:** implementation.md → impeccable + frontend-design → emil motion → copy-editing + anti-slop → cold-email for EMAIL_DRAFT → ux-writing for microcopy  

---

## G. Free image generation & image scraping

> Full research: **[`FREE_IMAGE_TOOLS.md`](./FREE_IMAGE_TOOLS.md)**

### Free image **generation** (no paid API required)

| Tool | Install / config | Free? | Use |
|------|------------------|-------|-----|
| **Pollinations MCP** (preferred) | `npx -y @pollinations/mcp` · [pollinations/pollinations](https://github.com/pollinations/pollinations) | **Yes — no key** | Heroes, mock product shots, icons |
| **Pollinations MCP (alt package)** | `npx -y @pollinations/model-context-protocol` | **Yes — no key** | Same; already common on this machine |
| **Nectar MCP** (Pollinations successor to MCPollinations) | [pinkpixel-dev/nectar-mcp](https://github.com/pinkpixel-dev/nectar-mcp) | Free Pollinations tier | Gen / edit / video if official package insufficient |
| **imagegen-frontend-web** (taste pack) | leonxlnx/taste-skill | Free skill | *What* to generate (composition), not the model |

### Free image **search / stock** (free API keys)

| Tool | Source | Free? | Use |
|------|--------|-------|-----|
| **Unsplash MCP** | [hellokaton/unsplash-mcp-server](https://github.com/hellokaton/unsplash-mcp-server) | Free Unsplash key | Real lifestyle photos + attribution |
| **Pexels MCP** | [garylab/pexels-mcp-server](https://github.com/garylab/pexels-mcp-server) | Free Pexels key | Photos/video stock |

```bash
export UNSPLASH_ACCESS_KEY="..."   # https://unsplash.com/developers
export PEXELS_API_KEY="..."        # https://www.pexels.com/api/
# Pollinations: no key for basic use
```

### Free image **scrape** from business sites (prefer before gen)

| Tool | Role |
|------|------|
| Firecrawl · Crawl4AI · Webclaw · Scrapling | Extract logos, og:image, gallery URLs |
| Browser Use · gstack `/browse` | Screenshots, download visible images |
| mcp-images style servers | Fetch/process image URLs |

**Order:** scrape business brand assets → stock (Unsplash/Pexels) if needed → Pollinations only for missing mock visuals.  
**Legal:** attribute stock; do not steal random Google Images for client demos.

### Paid optional (not default)

Higgsfield · inference.sh · Replicate Flux — only if human approves cost.

---

## H. Already in pipeline (keep)

| Project | Repo / site | Notes |
|---------|-------------|--------|
| gstack | [garrytan/gstack](https://github.com/garrytan/gstack) | `/browse`, design, QA, ship |
| stop-slop | [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | Pairs with no-ai-slop |
| GSAP skills | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | Motion implementation |
| shadcn MCP | [ui.shadcn.com](https://ui.shadcn.com/docs/mcp) | Components |
| Higgsfield skills | [higgsfield-ai/skills](https://github.com/higgsfield-ai/skills) | Optional **paid** assets |

Full bootstrap still lives in [`loops/00-bootstrap.md`](./loops/00-bootstrap.md).

---

## Loop → tool matrix

| Loop | Prefer these |
|------|----------------|
| **0 Bootstrap** | Install **all Required** + **Tier S design/copy** + MCP Scrapling/Webclaw + **ADHD** |
| **1 Research** | Firecrawl · Crawl4AI · Scrapling · Webclaw · Browser Use · Apify · marketing audit skills |
| **2 Plan** | ADHD · frontend-design · impeccable · taste lane · marketingskills copy · ogilvy · page-cro · anti-slop · Emil · Branerail · scrape brand images · Pollinations comps if needed |
| **3 Build** | impeccable · frontend-design · Emil · GSAP · shadcn · Pollinations heroes · Unsplash/Pexels stock · copy-editing · cold-email · ux-writing · anti-slop · Browser Use / gstack QA |

---

## Legal / ethics (scrapers)

- Public business data only for outreach fields.  
- Respect robots.txt, site terms, and local law.  
- Prefer rate limits; no credential stuffing or private data harvest.  
- Every email still needs a **source URL** (unchanged pipeline rule).

---

## Env vars (never commit)

```bash
export FIRECRAWL_API_KEY="..."
export APIFY_TOKEN="..."
export MAGIC_API_KEY="..."
export UNSPLASH_ACCESS_KEY="..."   # free stock
export PEXELS_API_KEY="..."        # free stock
# Pollinations: no key for basic free image gen
# Browser Use / LLM keys as required by that tool's docs
```

---

## Verify (add to BOOTSTRAP_REPORT.md)

```text
[ ] firecrawl CLI or API
[ ] crawl4ai import / CLI
[ ] browser-use installed (or SKIP + reason)
[ ] scrapling + scrapling install browsers
[ ] webclaw CLI and/or MCP
[ ] Pollinations MCP free gen (@pollinations/mcp or model-context-protocol) — no key
[ ] optional Unsplash MCP + free key
[ ] optional Pexels MCP + free key
[ ] FREE_IMAGE_TOOLS.md present
[ ] no-ai-slop skill present
[ ] emilkowalski/skills installed
[ ] anthropics frontend-design
[ ] pbakaus/impeccable (npx impeccable install)
[ ] vercel web-design-guidelines
[ ] leonxlnx/taste-skill (or individual taste skills)
[ ] nextlevelbuilder ui-ux-pro-max
[ ] coreyhaines31/marketingskills (copywriting + cold-email + page-cro + …)
[ ] hardikpandya/stop-slop + petergyang/no-ai-slop
[ ] ogilvy skill
[ ] content-designer/ux-writing-skill (or SKIP)
[ ] UditAkhourii/adhd installed (npx skills add UditAkhourii/adhd)
[ ] branerail installed (or SKIP + reason)
[ ] ai-marketing-claude installed
[ ] digital-marketing-pro plugin installed (or SKIP)
[ ] skillopt optional status
[ ] kepano vault template cloned optional status
[ ] brane-code optional status
```
