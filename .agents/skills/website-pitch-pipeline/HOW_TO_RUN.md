# How to Run This Pipeline

A step-by-step guide to fork, set up, and run the Local Business Website Pitch Pipeline.

**Universal AI Support:** This pipeline works with any major AI model — Claude (Anthropic), GPT (OpenAI), Gemini (Google), Mistral, and more. Before you start, run the Cost Estimator (Loop 0a) to detect your current model, estimate costs, and get recommendations.

---

## 1. Fork this repo

Click **Fork** on GitHub or run:

```bash
gh repo fork PIIIX-org/website-pitch-pipeline --clone
cd website-pitch-pipeline
```

---

## 2. Prerequisites

Before running the pipeline, make sure you have:

| Tool | Check | Install |
|------|-------|---------|
| **Node.js 20+** | `node --version` | https://nodejs.org |
| **npm** | `npm --version` | comes with Node |
| **git** | `git --version` | https://git-scm.com |
| **gh CLI** | `gh --version` | https://cli.github.com |
| **Bun** | `bun --version` | https://bun.sh |
| **Python 3.12+** | `python3 --version` | https://python.org |
| **Claude Code** | `claude --version` | https://claude.ai/code |

**Note:** Before running any loops, you'll run the Cost Estimator (Loop 0a) which uses Node.js to calculate costs and suggest models. This requires Node.js 18+ but no additional npm packages.

---

## 3. Set Campaign Variables

Before running any loop, fill in your campaign details:

```text
ORG:               your-github-username-or-org
CAMPAIGN_NAME:     e.g. istanbul-tailors-batch-1
GEOGRAPHY:         e.g. Istanbul, Turkey
GEO_SLUG:          e.g. istanbul
LOCALE / LANGUAGE: e.g. tr (Turkish), en (English)
VERTICALS:         e.g. tailors, auto repair
BATCH_SIZE:        5 (default)
```

---

## 4. Run Loops in Order

Open **Claude Code** and run each loop sequentially:

### Loop 0a — Cost Estimate & Model Selection (first time, before anything)

Estimate AI costs and select the best model for your campaign budget and quality needs.

```text
/loop [auto]
# paste the contents of loops/00a-cost-estimate.md
```

This loop will:
- Detect which AI model you're currently using
- Calculate estimated costs for your campaign size
- Recommend models for **Best Quality**, **Balanced**, or **Budget** strategies
- Generate a `campaign-model-choice.txt` memo

**Stop here** and decide on a model before proceeding.

### Loop 0 — Bootstrap (first time only)

Install all required tools, skills, and MCP servers on your machine.

```text
/loop [auto]
# paste the contents of loops/00-bootstrap.md with your campaign variables filled
```

Wait for `BOOTSTRAP_REPORT.md` to be generated and verified before proceeding.

### Loop 1 — Research

Find local businesses with weak or missing websites.

```text
/loop [auto]
# paste the contents of loops/01-research.md with your campaign variables filled
```

Output: Excel file with leads. **Stop for Gate A** — review and approve the leads before continuing.

### Loop 2 — Plan

Create unique website plans and GitHub repos for each business.

```text
/loop [auto]
# paste the contents of loops/02-plan.md with your campaign variables filled
```

Output: One repo per business with full plan docs. **Stop for Gate B** — review the first plan before continuing.

### Loop 3 — Build

Implement the demo sites and draft outreach emails.

```text
/loop [auto]
# paste the contents of loops/03-build.md with your campaign variables filled
```

Output: Working demo sites + email drafts. **Stop for Gate C** — review the first build before continuing.

### Loop 4 — Run Report

Upload a full report to this repo when the campaign finishes.

```text
/loop [auto]
# paste the contents of loops/04-run-report.md with your campaign variables filled
```

Output: Report pushed to `runs/` folder on this repo.

---

## 5. Human Gates (Required)

| Gate | After | What to Check |
|------|-------|---------------|
| **A** | Loop 1 | Leads are real, contacts are public, geography matches |
| **B** | Loop 2 | First plan is unique, not generic, locally relevant |
| **C** | Loop 3 | First build is polished, mobile works, email sounds human |

**Do not skip gates.** Quality collapses when you batch without review.

---

## 6. Install Required Tools (Loop 0 Details)

Run these commands to install the core stack:

```bash
# Design skills
npx skills add anthropics/skills --skill frontend-design
npx impeccable install
npx skills add vercel-labs/agent-skills --skill web-design-guidelines
npx skills add leonxlnx/taste-skill
npx skills add nextlevelbuilder/ui-ux-pro-max-skill
npx skills@latest add emilkowalski/skills

# Copy/writing skills
npx skills add coreyhaines31/marketingskills
npx skills add hardikpandya/stop-slop
npx skills add petergyang/no-ai-slop
npx skills add boraoztunc/skills --skill ogilvy

# Ideation
npx skills add UditAkhourii/adhd

# Research tools
npm install -g firecrawl-cli
pip install -U crawl4ai
pip install "scrapling[all]"

# MCP servers (add to Claude config)
npx -y shadcn@latest mcp
npx -y @21st-dev/magic@latest
npx -y @pollinations/mcp
```

---

## 7. Environment Variables

Set these before running (never commit them):

```bash
export FIRECRAWL_API_KEY="..."     # https://firecrawl.dev
export MAGIC_API_KEY="..."         # https://21st.dev
export UNSPLASH_ACCESS_KEY="..."   # https://unsplash.com/developers (optional)
export PEXELS_API_KEY="..."        # https://www.pexels.com/api/ (optional)
```

Pollinations MCP is **free and requires no API key**.

---

## 8. Quick Reference

| What | Where |
|------|-------|
| Cost estimator | `node utils/cost-estimator.js estimate <leads> <businesses> <sites>` |
| Cost estimator loop | `loops/00a-cost-estimate.md` (run first!) |
| Campaign variables | Set at start of each loop prompt |
| Model choice memo | `campaign-model-choice.txt` (created by Loop 0a) |
| Lead files | `./leads/<GEO_SLUG>-business-leads-batch-1.xlsx` |
| Demo repos | `<ORG>/<GEO_SLUG>-<category>-<business>/` |
| Run reports | `runs/<YYYY-MM-DD>/<GEO_SLUG>-<campaign>/` |
| Full system docs | `PIPELINE.md` |
| Tools catalog | `TOOLS.md` |

---

## Common Issues

**MCP server not connecting?**  
Restart Claude Code after adding MCP config. Check with `claude mcp list`.

**Skills not found?**  
Run `npx skills list` to verify installations. Reinstall if needed.

**GitHub push fails?**  
Run `gh auth status` to verify authentication. Ensure your account has push access to your org.

**Excel looks wrong?**  
Review at Gate A. The pipeline uses Fit Scores ≥ 7. Reject bad leads early.

---

## Need Help?

- Read [`PIPELINE.md`](./PIPELINE.md) for the full system
- Check [`TOOLS.md`](./TOOLS.md) for tool-specific setup
- See [`loops/00-bootstrap.md`](./loops/00-bootstrap.md) for detailed bootstrap instructions
