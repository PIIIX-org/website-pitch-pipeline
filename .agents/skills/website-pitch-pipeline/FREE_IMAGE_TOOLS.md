# Free image generation & image scraping — research brief

> For the Local Business Website Pitch Pipeline (hero images, mock photos, scraping logos/photos from existing sites).  
> Focus: **free tier / no paid API required** (or free key with generous limits).  
> Researched 2026-07-23.

---

## Quick picks for this pipeline

| Need | Best free option | Cost |
|------|------------------|------|
| **Generate** heroes / mock product shots | **Pollinations MCP** (`@pollinations/mcp` or `@pollinations/model-context-protocol`) | **No API key** (free tier) |
| **Generate** (alt / multi-provider free default) | Multi-provider image MCP with Pollinations default (e.g. community image-gen MCPs) | Free default |
| **Scrape / search stock** (legal, attributed) | **Unsplash MCP** + **Pexels MCP** | Free API keys (stock sites) |
| **Scrape site assets** (logo, photos from business site) | **Firecrawl** · **Crawl4AI** · **Webclaw** · **Browser Use** / gstack `/browse` | Free OSS / free keys as already documented |
| **Screenshots of pages** | gstack `/browse` · Browser Use · Firecrawl screenshot | Free tools |
| **Optional paid upgrade** | Higgsfield skills, inference.sh, Replicate Flux MCP | Needs keys / credits |

**Pipeline default:** use **Pollinations** for generation; use **Unsplash/Pexels** for real photography with attribution; use **Firecrawl/Crawl4AI/Webclaw** to pull a business’s own brand assets.

---

## A. Free / freemium image **generation** MCPs

### A1. Pollinations official MCP — **preferred free gen**

| | |
|--|--|
| **Repo** | [pollinations/pollinations](https://github.com/pollinations/pollinations) |
| **Packages** | `@pollinations/mcp` (v2.x) · `@pollinations/model-context-protocol` (v1.x, already used on this machine) |
| **Site** | https://pollinations.ai |
| **Cost** | Free open gen platform; **no key required** for basic image gen (rate limits apply) |
| **Models** | Flux family and others via Pollinations endpoints |
| **Loops** | 2 (asset needs), 3 (fill missing heroes) |

```json
"pollinations": {
  "command": "npx",
  "args": ["-y", "@pollinations/mcp"]
}
```

Alternate (stdio package already in pipeline):

```json
"pollinations-images": {
  "command": "npx",
  "args": ["-y", "@pollinations/model-context-protocol"]
}
```

CLI / skill path: Pollinations also ships agent-friendly CLI (`polli`) and SKILL.md in-repo — see upstream packages.

---

### A2. Pink Pixel Nectar / Pollinations community MCPs

| | |
|--|--|
| **MCPollinations (archived)** | [pinkpixel-dev/MCPollinations](https://github.com/pinkpixel-dev/MCPollinations) — archived; use successor |
| **Successor** | [pinkpixel-dev/nectar-mcp](https://github.com/pinkpixel-dev/nectar-mcp) — image gen/edit/video via Pollinations |
| **Cost** | Free Pollinations tier |
| **Note** | Prefer **official `@pollinations/mcp`** unless Nectar has features you need |

Other community Pollinations MCPs (no/low key):  
`atiaeno/pollinations-mcp`, `bendusy/pollinations-mcp`, `jpbester/pollinations-mcp-server` — verify before prod; official package is safer.

---

### A3. Multi-provider free-default MCPs

| Tool | Notes | Free? |
|------|--------|-------|
| LobeHub-style multi-provider image MCP | Pollinations default, optional Cloudflare Workers AI free tier | Yes (default) |
| marc-shade style multi-provider servers | Free Pollinations first; paid providers optional | Yes default |

**Rule:** Prefer servers that list **Pollinations as default with no key**.

---

### A4. Free but **need a free API key** (not zero-key)

| Tool | Key | Notes |
|------|-----|--------|
| Gemini image MCP (e.g. community “Nano Banana” servers) | Google AI free tier | Good quality; not “no key” |
| Cloudflare Workers AI image | CF free neurons/day | Requires account |
| Hugging Face inference | free tier | Rate limited |
| Replicate Flux MCP | paid credits | **Not free** for volume |

---

### A5. Skills (agent skills, not only MCP)

| Skill / pack | Install idea | Free? |
|--------------|--------------|-------|
| Pollinations / polli skills | Upstream Pollinations SKILL.md / community OpenClaw skill `isaacgounton/pollinations` | Yes |
| [inference-sh/skills](https://github.com/inference-sh/skills) `ai-image-generation` | `npx skills add inference-sh/skills@flux-image` | Freemium (very cheap, not zero-cost) |
| imagegen-frontend-web (leonxlnx taste pack) | Direction for **what** to generate, not the generator | Free skill |
| higgsfield-* | Paid product | Optional only |

---

## B. Free image **search / stock scrape** MCPs

Use for real photos when AI gen looks fake. Always keep **attribution**.

### B1. Unsplash MCP — **recommended stock search**

| | |
|--|--|
| **Repo** | [hellokaton/unsplash-mcp-server](https://github.com/hellokaton/unsplash-mcp-server) (~230★) |
| **Alts** | [cevatkerim/unsplash-mcp](https://github.com/cevatkerim/unsplash-mcp) (built-in attribution strings) |
| **Cost** | Free Unsplash API key: https://unsplash.com/developers |
| **Loops** | 2–3 lifestyle/hero when business has no usable photos |

```bash
# Example — follow upstream README for exact command
# export UNSPLASH_ACCESS_KEY=...
```

---

### B2. Pexels MCP — **recommended stock search**

| | |
|--|--|
| **Repos** | [garylab/pexels-mcp-server](https://github.com/garylab/pexels-mcp-server) · [CaullenOmdahl/pexels-mcp-server](https://github.com/CaullenOmdahl/pexels-mcp-server) |
| **Cost** | Free Pexels API key: https://www.pexels.com/api/ |
| **Loops** | Same as Unsplash; good video stock too on some servers |

---

### B3. Google Image Search skill

| | |
|--|--|
| **Example** | glebis/claude-skills `google-image-search` (needs Google Custom Search API — free quota) |
| **Cost** | Free quota; not unlimited |
| **Legal** | Prefer Unsplash/Pexels for demos; Google results need careful license checks |

---

## C. Free image **scraping from business websites** (already in pipeline)

These extract logos, photos, og:images from a lead’s existing site — **preferred over inventing brand assets**.

| Tool | Role | Free? |
|------|------|-------|
| [Firecrawl](https://github.com/firecrawl/firecrawl) | Scrape page + assets / screenshots | Free tier / OSS |
| [Crawl4AI](https://github.com/unclecode/crawl4ai) | Local crawl → markdown + media links | OSS free |
| [Webclaw](https://github.com/0xMassi/webclaw) | Local extract CLI/MCP | OSS free |
| [Scrapling](https://github.com/D4Vinci/Scrapling) | Adaptive fetch | OSS free |
| [Browser Use](https://github.com/browser-use/browser-use) | Interactive download of images | OSS free |
| gstack `/browse` · `/scrape` | Screenshots, DOM pulls | Free with gstack |
| IA-Programming/mcp-images | Fetch/process images from URL | OSS free |

**Workflow:** scrape business site first → if weak, Pollinations for mock hero → optional Unsplash/Pexels with attribution for lifestyle fillers.

---

## D. Recommended MCP config block (free-first)

Add to Claude `mcpServers` (see also [`mcp.example.json`](./mcp.example.json)):

```json
{
  "pollinations": {
    "command": "npx",
    "args": ["-y", "@pollinations/mcp"],
    "env": {}
  },
  "pollinations-images": {
    "command": "npx",
    "args": ["-y", "@pollinations/model-context-protocol"],
    "env": {}
  },
  "unsplash": {
    "command": "npx",
    "args": ["-y", "unsplash-mcp-server"],
    "env": {
      "UNSPLASH_ACCESS_KEY": "${UNSPLASH_ACCESS_KEY}"
    },
    "_comment": "Exact package name may differ — use hellokaton/unsplash-mcp-server README"
  },
  "pexels": {
    "command": "npx",
    "args": ["-y", "pexels-mcp-server"],
    "env": {
      "PEXELS_API_KEY": "${PEXELS_API_KEY}"
    },
    "_comment": "Use package from garylab/pexels-mcp-server or CaullenOmdahl README"
  }
}
```

**Env (free keys only where needed):**

```bash
# Optional free stock APIs
export UNSPLASH_ACCESS_KEY="..."
export PEXELS_API_KEY="..."
# Pollinations: no key required for basic use
```

---

## E. Legal / ethics (images)

| Source | Rule |
|--------|------|
| Business’s own site | Prefer for logos/photos; mock only if missing |
| Pollinations / AI gen | Label as concept mock if needed; avoid faking real staff faces |
| Unsplash / Pexels | Keep attribution per API guidelines |
| Random web scrape | Do **not** hotlink copyrighted photos into client demos without rights |
| Google Images | License risk — last resort |

---

## F. Loop usage

| Loop | Image tools |
|------|-------------|
| **0** | Install Pollinations MCP (required free gen); optional Unsplash/Pexels keys |
| **1** | Screenshot weak sites (browse/Firecrawl); note image quality of current brand |
| **2** | Scrape existing brand assets; list gen needs in `assets.md`; optional Pollinations comps |
| **3** | Generate missing heroes with Pollinations; stock from Unsplash/Pexels; never invent real people’s faces as “staff” |

---

## G. Install checklist (bootstrap)

```text
[ ] @pollinations/mcp OR @pollinations/model-context-protocol reachable (no key)
[ ] Optional: nectar-mcp if preferred over archived MCPollinations
[ ] Optional: UNSPLASH_ACCESS_KEY + unsplash MCP
[ ] Optional: PEXELS_API_KEY + pexels MCP
[ ] Firecrawl / Crawl4AI / Webclaw already installed for site image scrape
[ ] Browser Use or gstack /browse for screenshots
```

---

## H. What we deliberately deprioritize (not free enough)

| Tool | Why not default |
|------|-----------------|
| Replicate Flux MCP | Credits |
| Midjourney / commercial studios | Paid |
| Higgsfield full suite | Product account |
| inference.sh volume | Cheap but not zero |

Keep them as **optional paid upgrades** in TOOLS.md only.

---

## Sources

- Pollinations MCP docs: https://github.com/pollinations/pollinations  
- npm: `@pollinations/mcp`, `@pollinations/model-context-protocol`  
- Unsplash MCP: https://github.com/hellokaton/unsplash-mcp-server  
- Pexels MCP: https://github.com/garylab/pexels-mcp-server  
- Pink Pixel Nectar: https://github.com/pinkpixel-dev/nectar-mcp  
- Pipeline crawl stack: Firecrawl, Crawl4AI, Webclaw, Scrapling, Browser Use (see TOOLS.md)
