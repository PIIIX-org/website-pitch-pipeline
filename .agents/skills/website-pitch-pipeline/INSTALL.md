# Install sources cheat sheet

Quick reference for Loop 0 and new machines. Prefer official docs if URLs move.

**Full catalog with loop mapping:** [`TOOLS.md`](./TOOLS.md)

## Core agent stack

| Piece | Where | Install idea |
|-------|--------|--------------|
| Skills ecosystem | [skills.sh](https://skills.sh/) | `npx skills find …` / `npx skills add …` |
| gstack | [garrytan/gstack](https://github.com/garrytan/gstack) | `git clone … ~/.claude/skills/gstack && ./setup` |
| Claude plugins official | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | Claude plugin marketplace |
| frontend-design plugin | same official marketplace | enable `frontend-design` |
| superpowers | same official marketplace | enable `superpowers` |
| GSAP skills | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | plugin marketplace |
| diagram-design | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | plugin marketplace |
| ponytail | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | plugin marketplace |
| stop-slop | [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | skills add / clone |
| Higgsfield skills | [higgsfield-ai/skills](https://github.com/higgsfield-ai/skills) | `npx skills add higgsfield-ai/skills` |
| Higgsfield CLI | npm `@higgsfield/cli` | `npm i -g @higgsfield/cli` |
| shadcn MCP | [ui.shadcn.com/docs/mcp](https://ui.shadcn.com/docs/mcp) | `npx shadcn@latest mcp` |
| 21st magic MCP | [21st.dev](https://21st.dev) | `npx @21st-dev/magic@latest` |
| **Pollinations MCP (FREE gen)** | [pollinations/pollinations](https://github.com/pollinations/pollinations) · [pollinations.ai](https://pollinations.ai) | `npx -y @pollinations/mcp` **or** `@pollinations/model-context-protocol` — **no API key** |
| **Unsplash MCP (FREE stock)** | [hellokaton/unsplash-mcp-server](https://github.com/hellokaton/unsplash-mcp-server) | free key: unsplash.com/developers |
| **Pexels MCP (FREE stock)** | [garylab/pexels-mcp-server](https://github.com/garylab/pexels-mcp-server) | free key: pexels.com/api |
| **Nectar MCP (Pollinations)** | [pinkpixel-dev/nectar-mcp](https://github.com/pinkpixel-dev/nectar-mcp) | free Pollinations tier (optional) |
| Apify | [apify.com](https://apify.com) · [integrations](https://console.apify.com/settings/integrations) | `npm i -g apify-cli` |
| Bun (gstack) | [bun.sh](https://bun.sh) | install script |
| Claude Code | [Anthropic docs](https://docs.anthropic.com/en/docs/claude-code) | official installer |
| GitHub CLI | [cli.github.com](https://cli.github.com) | brew / official |

## Research / crawl / browser (required additions)

| Piece | Where | Install idea |
|-------|--------|--------------|
| **Firecrawl** | [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) · [firecrawl.dev](https://firecrawl.dev) | `npm i -g firecrawl-cli` + `FIRECRAWL_API_KEY`; or self-host from repo |
| **Crawl4AI** | [unclecode/crawl4ai](https://github.com/unclecode/crawl4ai) | `pip install -U crawl4ai` + browser setup |
| **Browser Use** | [browser-use/browser-use](https://github.com/browser-use/browser-use) | `uv pip install browser-use` · `browser-use skill install` |
| **Scrapling** | [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | `pip install "scrapling[all]"` · `scrapling install` |
| **Webclaw** | [0xMassi/webclaw](https://github.com/0xMassi/webclaw) | `brew install webclaw` or Cargo; MCP + `npx skills add 0xMassi/webclaw-skill` |

## Best design skills (research Tier S)

Full ranking: [`DESIGN_AND_COPY_SKILLS.md`](./DESIGN_AND_COPY_SKILLS.md)

| Piece | Where | Install idea |
|-------|--------|--------------|
| **frontend-design** | [anthropics/skills](https://github.com/anthropics/skills) · ~695K installs | `npx skills add anthropics/skills --skill frontend-design` |
| **impeccable** | [pbakaus/impeccable](https://github.com/pbakaus/impeccable) · [impeccable.style](https://impeccable.style/) | `npx impeccable install` |
| **web-design-guidelines** | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | `npx skills add vercel-labs/agent-skills --skill web-design-guidelines` |
| **taste-skill pack** | [leonxlnx/taste-skill](https://github.com/leonxlnx/taste-skill) | `npx skills add leonxlnx/taste-skill` |
| **ui-ux-pro-max** | [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | `npx skills add nextlevelbuilder/ui-ux-pro-max-skill` — install; agents use **when needed** (palettes/type/patterns) |
| **Emil design skills** | [emilkowalski/skills](https://github.com/emilkowalski/skills) | `npx skills@latest add emilkowalski/skills` |
| **design-an-interface** | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add mattpocock/skills --skill design-an-interface` |
| **extract-design-system** | [arvindrk/extract-design-system](https://github.com/arvindrk/extract-design-system) | `npx skills add arvindrk/extract-design-system` |
| **GSAP skills** | [greensock/gsap-skills](https://github.com/greensock/gsap-skills) | Claude plugin marketplace |

## Best copy / writing skills (research Tier S)

| Piece | Where | Install idea |
|-------|--------|--------------|
| **Marketing Skills pack** | [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) · ~41k★ | `npx skills add coreyhaines31/marketingskills` |
| → includes | copywriting, copy-editing, cold-email, page-cro, marketing-psychology, seo-audit, content-strategy, emails, ad-creative | (one pack) |
| **stop-slop** | [hardikpandya/stop-slop](https://github.com/hardikpandya/stop-slop) | `npx skills add hardikpandya/stop-slop` |
| **no-ai-slop** | [petergyang/no-ai-slop](https://github.com/petergyang/no-ai-slop) | `npx skills add petergyang/no-ai-slop` |
| **ogilvy** | [boraoztunc/skills](https://github.com/boraoztunc/skills) | `npx skills add boraoztunc/skills --skill ogilvy` |
| **ux-writing** | [content-designer/ux-writing-skill](https://github.com/content-designer/ux-writing-skill) | `npx skills add content-designer/ux-writing-skill` |
| **edit-article** | [mattpocock/skills](https://github.com/mattpocock/skills) | `npx skills add mattpocock/skills --skill edit-article` |

## Other writing / marketing / ideation

| Piece | Where | Install idea |
|-------|--------|--------------|
| **AI Marketing Claude** | [zubair-trabzada/ai-marketing-claude](https://github.com/zubair-trabzada/ai-marketing-claude) | `curl …/install.sh \| bash` or clone + `./install.sh` |
| **Digital Marketing Pro** | [indranilbanerjee/digital-marketing-pro](https://github.com/indranilbanerjee/digital-marketing-pro) | `/plugin install digital-marketing-pro@neels-plugins` |
| **ADHD (ideation)** | [UditAkhourii/adhd](https://github.com/UditAkhourii/adhd) | `npx skills add UditAkhourii/adhd` |
| **Branerail** | [UditAkhourii/branerail](https://github.com/UditAkhourii/branerail) | `npm i -g @uditakhouri/branerail` |
| **SkillOpt** | [microsoft/SkillOpt](https://github.com/microsoft/SkillOpt) | `pip install skillopt` (optional) |
| **Kepano Obsidian** | [kepano/kepano-obsidian](https://github.com/kepano/kepano-obsidian) | `git clone` vault template (optional) |

## Environment variables (never commit)

```bash
export MAGIC_API_KEY="..."
export N8N_MCP_URL="..."
export N8N_MCP_TOKEN="..."
export APIFY_TOKEN="..."
export FIRECRAWL_API_KEY="..."
# Free stock image APIs (optional)
export UNSPLASH_ACCESS_KEY="..."
export PEXELS_API_KEY="..."
# Pollinations: no key required for basic free image gen
# Browser Use / LLM providers as required by that tool's docs
```

## MCP template

Copy [`mcp.example.json`](./mcp.example.json) into your Claude MCP config and replace placeholders with env-backed values.  
Also wire **Webclaw** and/or **Scrapling** MCP when installed (see [`TOOLS.md`](./TOOLS.md)).  
Free image stack details: [`FREE_IMAGE_TOOLS.md`](./FREE_IMAGE_TOOLS.md).
