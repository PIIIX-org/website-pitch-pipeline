# Loop 0 — Bootstrap

> Run this on a **new PC** or empty Claude Code setup before research or builds.  
> Produces a verification report. Does **not** start business research.  
> Location-agnostic: only installs tools; campaigns set geography in Loop 1+.

---

## Paste into Claude Code

```text
/loop [auto]
/goal
# Loop 0 — Bootstrap skills, plugins, MCP, CLIs for local business website pitch pipeline

## Objective
On this machine, install and verify every skill, plugin, MCP server, and CLI needed to run Loops 1–3 for **any geography**. Produce a verification report. Do not start business research until verification passes. Do not lock the pipeline to a single city or country.

## Prerequisites to check first
- macOS or Linux with Node.js 20+, npm, git, gh CLI
- Claude Code installed and logged in
- Bun installed (required by gstack): https://bun.sh
- User can provide API keys via env vars (never hardcode secrets into git)

## Phase A — Core agent stack

### A1. Skills CLI + find-skills
Browse: https://skills.sh/
Install finder:
  npx skills add <find-skills-package-or-owner/repo>
  # Discovery: npx skills find <query>
Document installed path under ~/.agents/skills and/or ~/.claude/skills

### A2. gstack (browse, design, qa, ship)
Source: https://github.com/garrytan/gstack
Install:
  git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack
  cd ~/.claude/skills/gstack && ./setup
Ensure CLAUDE.md (user or project) says:
  - use /browse for web browsing
  - never use mcp__claude-in-chrome__* tools
  - list gstack skills including /design-consultation /design-shotgun /design-html /design-review /qa /qa-only /browse /ship /review

### A3. Claude Code plugins (marketplaces + enable)
Add marketplaces / install plugins:

1) Official marketplace
   repo: https://github.com/anthropics/claude-plugins-official
   enable:
     - superpowers@claude-plugins-official
     - frontend-design@claude-plugins-official

2) GSAP skills
   repo: https://github.com/greensock/gsap-skills
   enable: gsap-skills@gsap-skills

3) Diagram design
   repo: https://github.com/cathrynlavery/diagram-design
   enable: diagram-design@diagram-design

4) Ponytail (optional simplicity guardrails)
   repo: https://github.com/DietrichGebert/ponytail
   enable: ponytail@ponytail

Verify in Claude settings: enabledPlugins matches the list above.

## Phase B — Design + copy skills (pipeline-critical)

Install via `npx skills add <source>` when available on skills.sh, otherwise clone/copy SKILL.md into ~/.claude/skills/<name>/ or ~/.agents/skills/<name>/ and symlink into Claude skills if needed.

### B1. Best design skills (research Tier S — see DESIGN_AND_COPY_SKILLS.md)
  # Official + highest install volume on skills.sh
  npx skills add anthropics/skills --skill frontend-design
  npx impeccable install
  # or: npx skills add pbakaus/impeccable
  npx skills add vercel-labs/agent-skills --skill web-design-guidelines
  npx skills add leonxlnx/taste-skill
  # design-taste-frontend, high-end-visual-design, minimalist-ui,
  # industrial-brutalist-ui, redesign-existing-projects, brandkit,
  # imagegen-frontend-web, image-to-code, stitch-design-taste, gpt-taste, …
  npx skills add nextlevelbuilder/ui-ux-pro-max-skill
  # ui-ux-pro-max: install for availability; agents pull it when they need
  # palette/type/product-type libraries — not mandatory on every design step
  npx skills@latest add emilkowalski/skills
  npx skills add mattpocock/skills --skill design-an-interface
  npx skills add arvindrk/extract-design-system
  # Also enable Claude plugin: frontend-design@claude-plugins-official if available
  # GSAP: greensock/gsap-skills plugin

### B2. Best copy / writing skills (research Tier S)
  # Dominant marketing pack (copywriting, copy-editing, cold-email, page-cro,
  # marketing-psychology, seo-audit, content-strategy, emails, ad-creative, …)
  npx skills add coreyhaines31/marketingskills
  npx skills add hardikpandya/stop-slop
  npx skills add petergyang/no-ai-slop
  npx skills add boraoztunc/skills --skill ogilvy
  npx skills add content-designer/ux-writing-skill
  npx skills add mattpocock/skills --skill edit-article
  # Verify: npx skills list | grep -E 'copy|ogilvy|slop|frontend|impeccable|taste'

### B3. Research skills
- apify-ultimate-scraper (needs Apify CLI + token) — works for many countries/platforms
  Apify CLI: npm install -g apify-cli
  Auth: apify login  OR  export APIFY_TOKEN=...
  Console tokens: https://console.apify.com/settings/integrations
- find-skills (already via skills CLI)

### B4. Optional creative (Higgsfield)
Source skills: https://github.com/higgsfield-ai/skills
  npx skills add higgsfield-ai/skills
CLI: npm install -g @higgsfield/cli
Auth: follow higgsfield login docs

### B5. Gemini Native Toolchain (Zero 3rd-party scrapers)
  - Verify GEMINI_API_KEY is present:
    echo $GEMINI_API_KEY
  - Native tools enabled automatically on Gemini 3+ / Antigravity:
    - google_maps (Local business discovery)
    - google_search (Live citations & directory lookup)
    - url_context (Direct webpage scraping without Firecrawl)
    - code_execution (In-sandbox Python data processing)
  - Verify native Chrome for screenshots:
    ls "/Applications/Google Chrome.app" || which google-chrome || which chromium
  - Optional Python SDK:
    pip install -U google-genai

### B9. Webclaw — https://github.com/0xMassi/webclaw
  brew install webclaw || cargo install --git https://github.com/0xMassi/webclaw.git webclaw-cli
  npx skills add 0xMassi/webclaw-skill
  # also install webclaw-mcp for local MCP when possible

### B10. No AI Slop — https://github.com/petergyang/no-ai-slop
  # Install skill globally for Claude/agent:
  # "Install this skill globally: https://github.com/petergyang/no-ai-slop"
  git clone https://github.com/petergyang/no-ai-slop.git ~/.agents/skills/no-ai-slop 2>/dev/null || true
  # symlink/copy SKILL into ~/.claude/skills if needed

### B11. Emil Kowalski design skills — https://github.com/emilkowalski/skills
  npx skills@latest add emilkowalski/skills

### B12. AI Marketing Claude — https://github.com/zubair-trabzada/ai-marketing-claude
  curl -fsSL https://raw.githubusercontent.com/zubair-trabzada/ai-marketing-claude/main/install.sh | bash
  # or: git clone + ./install.sh
  pip install reportlab   # PDF reports if needed

### B13. Digital Marketing Pro — https://github.com/indranilbanerjee/digital-marketing-pro
  # In Claude Code:
  # /plugin marketplace add indranilbanerjee/neels-plugins   # if needed
  # /plugin install digital-marketing-pro@neels-plugins
  # Manual fallback: git clone --depth=1 https://github.com/indranilbanerjee/digital-marketing-pro.git

### B14. SkillOpt (optional meta) — https://github.com/microsoft/SkillOpt
  pip install skillopt
  # Optional: clone repo for Claude Code integration shells / skillopt-sleep

### B15. Kepano Obsidian vault template (optional ops) — https://github.com/kepano/kepano-obsidian
  git clone https://github.com/kepano/kepano-obsidian.git ~/Obsidian/kepano-template
  # Use as structure for campaign notes (not required for agent runs)

### B16. Udit Akhouri stack — https://github.com/UditAkhourii
  # ADHD — required divergent ideation skill
  npx skills add UditAkhourii/adhd
  # Branerail — CTO architecture skill (recommended)
  npm install -g @uditakhouri/branerail
  # Brane Code — optional alternate coding runtime
  # git clone https://github.com/UditAkhourii/brane-code.git
  # Docs: https://adhdstack.github.io/

Full catalog: TOOLS.md in this pipeline repo.

## Phase C — MCP servers

Write mcpServers into Claude user config using ENV placeholders only.
Template: this repo's mcp.example.json

### C1. shadcn (required for build)
  command: npx
  args: ["-y", "shadcn@latest", "mcp"]
  Docs: https://ui.shadcn.com/docs/mcp

### C2. magic / 21st.dev (UI components)
  command: npx
  args: ["-y", "@21st-dev/magic@latest"]
  env: API_KEY from env MAGIC_API_KEY
  Site: https://21st.dev

### C3. FREE image generation — Pollinations (required for demos without brand photos)
  # Preferred (no API key):
  command: npx
  args: ["-y", "@pollinations/mcp"]
  # Alternate package (also free, no key):
  # args: ["-y", "@pollinations/model-context-protocol"]
  Site: https://pollinations.ai · repo: https://github.com/pollinations/pollinations
  # Optional successor community server: pinkpixel-dev/nectar-mcp
  # Full research: FREE_IMAGE_TOOLS.md

### C3b. FREE stock image search (optional free keys)
  Unsplash MCP: hellokaton/unsplash-mcp-server + UNSPLASH_ACCESS_KEY
    https://unsplash.com/developers
  Pexels MCP: garylab/pexels-mcp-server + PEXELS_API_KEY
    https://www.pexels.com/api/
  Use for real photography with attribution when AI gen is wrong fit.

### C4. webclaw MCP (recommended local extract)
  command/path per https://github.com/0xMassi/webclaw (webclaw-mcp or brew install)

### C5. scrapling MCP (recommended hard scrapes)
  after: pip install "scrapling[ai]" — wire per Scrapling docs

### C6. n8n (optional — only if user wants automation)
  type: http
  url + Authorization bearer from env
  Do not block pipeline if n8n fails

After config: restart Claude Code and list MCP tools. Failures = report, not silent skip for shadcn/magic/pollinations/webclaw.

## Phase D — GitHub org readiness
- gh auth status (use account with org access)
- Confirm access to org: <ORG> (set in Campaign variables)
- gh repo list <ORG> --limit 5

## Phase E — Verification report
Write: ./pipeline-runs/BOOTSTRAP_REPORT.md

Checklist (pass/fail each):
[ ] node, npm, git, gh, bun
[ ] gstack installed + /browse works
[ ] plugins: frontend-design, gsap-skills, diagram-design, superpowers
[ ] design Tier S: frontend-design, impeccable, web-design-guidelines, taste-skill, ui-ux-pro-max, emilkowalski
[ ] copy Tier S: coreyhaines31/marketingskills, stop-slop, no-ai-slop, ogilvy
[ ] ux-writing-skill + edit-article (or SKIP)
[ ] DESIGN_AND_COPY_SKILLS.md present in pipeline repo
[ ] GEMINI_API_KEY (or Google Antigravity / Gemini CLI environment)
[ ] Gemini Native Tools (google_maps, google_search, url_context, code_execution)
[ ] Native Google Chrome (for headless screenshots)
[ ] python3 and/or node runtime
[ ] no-ai-slop skill
[ ] emilkowalski/skills
[ ] UditAkhourii/adhd (npx skills add UditAkhourii/adhd)
[ ] branerail (@uditakhouri/branerail) or SKIP + reason
[ ] ai-marketing-claude
[ ] digital-marketing-pro plugin (or SKIP + reason)
[ ] skillopt optional status
[ ] kepano vault template optional status
[ ] brane-code optional status
[ ] MCP: shadcn, magic, pollinations FREE gen (no key)
[ ] optional Unsplash + Pexels free keys for stock
[ ] FREE_IMAGE_TOOLS.md present
[ ] higgsfield optional paid status
[ ] GitHub org access (<ORG> from Campaign variables)
[ ] Confirmed: pipeline geography is campaign-variable (not hardcoded)
[ ] TOOLS.md catalog present in pipeline repo

## Done when
- All required items PASS (optional items may SKIP with reason)
- BOOTSTRAP_REPORT.md written
- Stop and show report; do NOT run Loop 1 until user says proceed and sets Campaign variables (GEOGRAPHY, GEO_SLUG, LOCALE, VERTICALS)
```

---

## Done definition

| Required | Optional |
|----------|----------|
| Node, git, gh, bun, pip/uv | Higgsfield |
| GEMINI_API_KEY / Antigravity | n8n MCP |
| Native Chrome (headless) | Ponytail |
| Design + copy skills | SkillOpt |
| shadcn + magic + pollinations MCP | Kepano vault |
| Gemini native tools (google_maps, url_context) | Webclaw |
| Scrapling + Webclaw (or documented SKIP) | |
| no-ai-slop + emilkowalski/skills | |
| UditAkhourii/adhd | branerail, brane-code |
| ai-marketing-claude | digital-marketing-pro (SKIP ok if install blocked) |
| browser-use (or SKIP + reason) | |
| `<ORG>` org access (set in Campaign variables) | |
| `BOOTSTRAP_REPORT.md` referencing TOOLS.md | |

---

## Next

→ [01-research.md](./01-research.md) after the human accepts the bootstrap report **and** fills Campaign variables (any geography).
