# Loop 0a — Cost Estimate & Model Selection

> Run this **first**, before bootstrap, to estimate costs and select the best AI model for your campaign.  
> Supports all major AI providers: Claude (Anthropic), GPT (OpenAI), Gemini (Google), Mistral.  
> Produces cost breakdown and model recommendations. Does not start research yet.

---

## Paste into Claude Code

```text
/loop [auto]
/goal
# Loop 0a — Website Pitch Pipeline: AI Cost Estimator & Model Selector

## Objective
Detect the AI model you're currently using, estimate token costs and runtime for the full website pitch pipeline, show model recommendations across all providers, and let you choose the best model for your budget and quality needs. This runs ONCE before Loop 0 (Bootstrap).

## Prerequisites
- Claude Code installed and logged in
- Node.js 18+ with npm
- This repo cloned locally
- Basic understanding of your campaign size (estimated leads, businesses, sites)

## Phase A — Detect & Setup

### A1. Verify cost estimator script
From the website-pitch-pipeline repo root:
\`\`\`bash
node utils/cost-estimator.js --help 2>&1 | head || echo "Script ready"
ls -la utils/cost-estimator.js
chmod +x utils/cost-estimator.js
\`\`\`

### A2. Gather campaign size estimates
These are ESTIMATES to calculate token spend (actual numbers set later in Loop 1–3):

- **How many total leads** will you research in this batch? (5–50 typical)
  Example: If you target a city, assume 20–30 local businesses per vertical.

- **How many unique businesses** will you create detailed plans for? (2–10 typical)
  Example: 1 per vertical, or 1–2 of the strongest leads.

- **How many working demo sites** will you build? (1–5 typical)
  Example: Usually same as businesses, or fewer if budget/time constrained.

*Note: Costs scale linearly with these numbers. Typical small campaign: 5 leads → 3 businesses → 2 sites.*

### A3. Run cost estimator
Replace LEADS, BUSINESSES, SITES with your estimates:

\`\`\`bash
cd /path/to/website-pitch-pipeline
node utils/cost-estimator.js estimate LEADS BUSINESSES SITES
# Example:
# node utils/cost-estimator.js estimate 5 3 2
\`\`\`

This will output:
- Your **currently detected model** and its cost/time
- **Top 3 cheapest models** (by total cost)
- **Top 3 best quality models** (by score)
- **Top 3 fastest models** (by estimated runtime)

### A4. Analyze output and choose strategy

**Three strategies:**

#### Strategy 1: **BEST QUALITY** (Recommended for first campaigns)
- Use highest-quality model
- Risk: Higher cost (~$50–200 depending on size)
- Benefit: Better design directions, fewer revision cycles
- Models: Claude Opus, GPT-4 Turbo, Gemini Pro

#### Strategy 2: **BALANCED** (Recommended for ongoing campaigns)
- Use mid-tier model with best cost/quality ratio
- Cost: ~$10–50 depending on size
- Good enough quality, fast enough speed
- Models: Claude Sonnet, GPT-4o, Gemini Flash

#### Strategy 3: **BUDGET** (For bulk testing, many variations)
- Use cheapest model for idea validation
- Cost: ~$1–10 depending on size
- Speed: Fastest iterations
- Build once with cheap model, polish with expensive model
- Models: Haiku, GPT-4o-mini, Mistral Small

## Phase B — Set Model (Optional)

### B1. Keep default (your current session's model)
If your detected model matches your preferred strategy above:
- No action needed
- The pipeline will use it automatically
- Proceed to Phase C

### B2. Override model (set different provider)
If you want to use a different model than what's currently detected:

**Option 1: Claude model** (recommended default)
\`\`\`bash
export ANTHROPIC_MODEL="claude-opus-4-1"        # best quality
export ANTHROPIC_MODEL="claude-sonnet-5"        # balanced (default)
export ANTHROPIC_MODEL="claude-haiku-4-5"       # budget
\`\`\`

**Option 2: OpenAI (GPT)**
Requires OPENAI_API_KEY in env:
\`\`\`bash
export OPENAI_API_KEY="sk-..."
export OPENAI_MODEL_NAME="gpt-4-turbo"          # best quality
export OPENAI_MODEL_NAME="gpt-4o"               # balanced
export OPENAI_MODEL_NAME="gpt-4o-mini"          # budget
\`\`\`

**Option 3: Google Gemini**
Requires GOOGLE_API_KEY in env:
\`\`\`bash
export GOOGLE_API_KEY="AIza..."
export GOOGLE_GENERATIVE_AI_MODEL="gemini-2.0-flash"    # balanced
export GOOGLE_GENERATIVE_AI_MODEL="gemini-1.5-pro"      # best quality
\`\`\`

**Option 4: Mistral**
Requires MISTRAL_API_KEY in env:
\`\`\`bash
export MISTRAL_API_KEY="..."
export MISTRAL_MODEL="mistral-large"            # balanced
export MISTRAL_MODEL="mistral-small"            # budget
\`\`\`

### B3. Verify override (optional)
\`\`\`bash
# Re-run estimator to confirm your choice shows first
node utils/cost-estimator.js estimate 5 3 2
# Should show your chosen model as "Detected Model"
\`\`\`

## Phase C — Model decision memo

Write a brief text file with your choice:

**Create `campaign-model-choice.txt`:**
\`\`\`
Campaign Cost Estimate
======================
Leads: [your estimate]
Businesses: [your estimate]
Sites: [your estimate]

Selected Model: [provider/model]
Reason: [cost/quality/speed]
Estimated Cost: [from estimator output]
Estimated Time: [from estimator output]

Date: [today]
\`\`\`

Example:
\`\`\`
Campaign Cost Estimate
======================
Leads: 10
Businesses: 4
Sites: 3

Selected Model: claude-sonnet-5 (Anthropic)
Reason: Balanced cost ($45) and quality (9.2/10), familiar default
Estimated Cost: $45.23
Estimated Time: ~2.1 hours

Date: 2025-01-15
\`\`\`

## Phase D — Final check & next loop

Before proceeding to Loop 0 (Bootstrap):

- [ ] Cost estimator ran successfully
- [ ] Chose a model strategy (Quality/Balanced/Budget)
- [ ] Set env vars if overriding (optional)
- [ ] Wrote `campaign-model-choice.txt` memo
- [ ] Understand estimated cost and time

## Done when
- Estimator output reviewed
- Model selected (or default confirmed)
- `campaign-model-choice.txt` created
- Stop and show model choice memo

**Next steps:**
→ Confirm this choice
→ [00-bootstrap.md](./00-bootstrap.md) to install tools
→ [01-research.md](./01-research.md) to start business research
```

---

## Troubleshooting

### "Script not found" or permission error
\`\`\`bash
cd /path/to/website-pitch-pipeline
chmod +x utils/cost-estimator.js
node utils/cost-estimator.js estimate 5 3 2
\`\`\`

### "Cannot find module" error
\`\`\`bash
# Estimator uses only Node.js stdlib (no npm install needed)
# Make sure Node.js 18+ is installed:
node --version    # should be v18+
\`\`\`

### Model not detected
If `ANTHROPIC_MODEL` / `OPENAI_API_KEY` not set, estimator defaults to `claude-sonnet-5`.  
Explicitly set env vars to override (see Phase B).

### Cost estimates seem high/low
Token estimates assume typical operations per loop. Actual costs may vary based on:
- Site complexity (simpler → fewer tokens)
- Research depth (deeper scraping → more tokens)
- Number of revisions (approved first try → lower cost)

Adjust LEADS/BUSINESSES/SITES estimates in the command to see scaled costs.

---

## Pricing reference

| Provider | Model | In/1M | Out/1M | Quality | Speed |
|----------|-------|-------|--------|---------|-------|
| **Anthropic** | Opus 4.1 | $15 | $75 | 10/10 | 0.8x |
| | **Sonnet 5** | **$3** | **$15** | **9.2/10** | **1.2x** |
| | Haiku 4.5 | $0.80 | $4 | 7/10 | 1.5x |
| **OpenAI** | GPT-4 Turbo | $10 | $30 | 9.5/10 | 0.9x |
| | **GPT-4o** | **$2.50** | **$10** | **9.3/10** | **1.1x** |
| | GPT-4o-mini | $0.15 | $0.60 | 7.5/10 | 1.3x |
| **Google** | Gemini 2.0 Flash | $0.075 | $0.30 | 8.5/10 | 1.4x |
| | Gemini 1.5 Pro | $1.25 | $5 | 9/10 | 0.7x |
| **Mistral** | Large | $2 | $6 | 8.8/10 | 1.0x |
| | Medium | $0.27 | $0.81 | 8/10 | 1.2x |
| | Small | $0.04 | $0.12 | 7.2/10 | 1.3x |

*Prices as of Jan 2025. Check provider docs for latest rates.*

---

## Next

→ [00-bootstrap.md](./00-bootstrap.md) after model selected
