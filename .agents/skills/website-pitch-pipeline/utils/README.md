# Cost Estimator Utility

Universal AI cost calculator and model selector for the Website Pitch Pipeline.

## Usage

```bash
node cost-estimator.js estimate <leads> <businesses> <sites>
```

### Arguments
- `<leads>` — estimated number of business leads to research (default: 5)
- `<businesses>` — estimated number of businesses to create plans for (default: 5)
- `<sites>` — estimated number of demo sites to build (default: 5)

### Example

```bash
# Estimate costs for a campaign with 10 leads, 4 businesses, 3 sites
node cost-estimator.js estimate 10 4 3
```

## Output

The estimator shows:

1. **Your currently detected model** — the AI model running in your Claude Code session
2. **Input/output token estimates** — total tokens your campaign will use
3. **Your model's cost** — how much this pipeline run will cost on your current model
4. **Top 3 by cost** — cheapest models across all providers
5. **Top 3 by quality** — highest-quality models (regardless of cost)
6. **Top 3 by speed** — fastest models (estimated runtime hours)

## Model Switching

To use a different model than your current default, set environment variables before running the pipeline:

### Claude (Anthropic)
```bash
export ANTHROPIC_MODEL="claude-opus-4-1"      # best quality
export ANTHROPIC_MODEL="claude-sonnet-5"      # balanced (recommended)
export ANTHROPIC_MODEL="claude-haiku-4-5"     # budget
```

### GPT (OpenAI)
```bash
export OPENAI_API_KEY="sk-..."
export OPENAI_MODEL_NAME="gpt-4-turbo"        # best quality
export OPENAI_MODEL_NAME="gpt-4o"             # balanced
export OPENAI_MODEL_NAME="gpt-4o-mini"        # budget
```

### Gemini (Google)
```bash
export GOOGLE_API_KEY="AIza..."
export GOOGLE_GENERATIVE_AI_MODEL="gemini-2.0-flash"    # balanced
export GOOGLE_GENERATIVE_AI_MODEL="gemini-1.5-pro"      # best quality
```

### Mistral
```bash
export MISTRAL_API_KEY="..."
export MISTRAL_MODEL="mistral-large"          # balanced
export MISTRAL_MODEL="mistral-small"          # budget
```

## Pricing

Pricing data is built into the script (as of Jan 2025):

| Provider | Model | Input/1M | Output/1M | Quality | Speed |
|----------|-------|----------|-----------|---------|-------|
| Anthropic | Claude Opus 4.1 | $15 | $75 | 10/10 | 0.8x |
| | Claude Sonnet 5 | $3 | $15 | 9.2/10 | 1.2x |
| | Claude Haiku 4.5 | $0.80 | $4 | 7/10 | 1.5x |
| OpenAI | GPT-4 Turbo | $10 | $30 | 9.5/10 | 0.9x |
| | GPT-4o | $2.50 | $10 | 9.3/10 | 1.1x |
| | GPT-4o-mini | $0.15 | $0.60 | 7.5/10 | 1.3x |
| Google | Gemini 2.0 Flash | $0.075 | $0.30 | 8.5/10 | 1.4x |
| | Gemini 1.5 Pro | $1.25 | $5 | 9/10 | 0.7x |
| Mistral | Large | $2 | $6 | 8.8/10 | 1.0x |
| | Medium | $0.27 | $0.81 | 8/10 | 1.2x |
| | Small | $0.04 | $0.12 | 7.2/10 | 1.3x |

Check provider websites for the latest rates.

## Token Estimates

The estimator uses typical token counts per operation:

### Research Loop (per lead)
- Input: 5,000 tokens (research prompt + context)
- Output: 8,000 tokens (findings, scoring)

### Plan Loop (per business)
- Input: 15,000 tokens (lead data + design context)
- Output: 20,000 tokens (plan document)

### Build Loop (per site)
- Input: 30,000 tokens (full plan + component specs)
- Output: 45,000 tokens (code + configuration)

### Report Loop (fixed)
- Input: 10,000 tokens
- Output: 5,000 tokens

Actual costs may vary based on:
- Site complexity (simpler sites = fewer tokens)
- Research depth (more scraping = more tokens)
- Number of revisions
- Locale and language (some languages tokenize differently)

## Strategies

### Best Quality
- **Models:** Claude Opus, GPT-4 Turbo, Gemini Pro
- **Cost:** ~$50–200 (small campaign)
- **Best for:** First campaigns, high-stakes pitches, new markets
- **Benefit:** Better design directions, fewer revision cycles

### Balanced (Recommended)
- **Models:** Claude Sonnet, GPT-4o, Gemini Flash
- **Cost:** ~$10–50 (small campaign)
- **Best for:** Ongoing campaigns, predictable quality
- **Benefit:** Good quality, reasonable cost, fast

### Budget
- **Models:** Claude Haiku, GPT-4o-mini, Mistral Small
- **Cost:** ~$1–10 (small campaign)
- **Best for:** Bulk testing, idea validation, many iterations
- **Benefit:** Lowest cost, fastest, good enough for MVP
- **Note:** Consider polishing final results with a quality model

## Requirements

- Node.js 18+ (no npm packages required; uses only stdlib)

## Updating Pricing

To update pricing data, edit the `PRICING` object in `cost-estimator.js`:

```javascript
const PRICING = {
  provider_name: {
    'model-id': { in: input_cost_per_1m, out: output_cost_per_1m, speed: multiplier, quality: score_1_to_10 }
  }
}
```

Rebuild `cost-estimator.js estimate` to see updated costs.
