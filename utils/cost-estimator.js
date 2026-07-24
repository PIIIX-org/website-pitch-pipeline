#!/usr/bin/env node

/**
 * Universal AI Cost & Time Estimator for Website Pitch Pipeline
 * Detects running model, estimates costs across all providers, suggests optimal models
 */

const https = require('https');

// Pricing data (as of 2024) - per 1M tokens
const PRICING = {
  anthropic: {
    'claude-opus-4-1': { in: 15, out: 75, speed: 0.8, quality: 10 },
    'claude-sonnet-4': { in: 3, out: 15, speed: 1.0, quality: 8.5 },
    'claude-sonnet-5': { in: 3, out: 15, speed: 1.2, quality: 9.2 },
    'claude-haiku-4-5': { in: 0.8, out: 4, speed: 1.5, quality: 7 },
  },
  openai: {
    'gpt-4-turbo': { in: 10, out: 30, speed: 0.9, quality: 9.5 },
    'gpt-4o': { in: 2.5, out: 10, speed: 1.1, quality: 9.3 },
    'gpt-4o-mini': { in: 0.15, out: 0.6, speed: 1.3, quality: 7.5 },
  },
  google: {
    'gemini-2.0-flash': { in: 0.075, out: 0.3, speed: 1.4, quality: 8.5 },
    'gemini-1.5-pro': { in: 1.25, out: 5, speed: 0.7, quality: 9.0 },
  },
  mistral: {
    'mistral-large': { in: 2, out: 6, speed: 1.0, quality: 8.8 },
    'mistral-medium': { in: 0.27, out: 0.81, speed: 1.2, quality: 8.0 },
    'mistral-small': { in: 0.04, out: 0.12, speed: 1.3, quality: 7.2 },
  },
};

// Pipeline token estimates
const PIPELINE_ESTIMATES = {
  research: {
    perLead: { in: 5000, out: 8000 },
    fixed: { in: 2000, out: 1000 },
  },
  plan: {
    perBusiness: { in: 15000, out: 20000 },
    fixed: { in: 3000, out: 2000 },
  },
  build: {
    perSite: { in: 30000, out: 45000 },
    fixed: { in: 5000, out: 3000 },
  },
  report: {
    fixed: { in: 10000, out: 5000 },
  },
};

function detectModel() {
  // Priority: env vars, then Claude Code defaults
  const env = process.env;

  if (env.ANTHROPIC_MODEL) return env.ANTHROPIC_MODEL;
  if (env.OPENAI_MODEL_NAME) return env.OPENAI_MODEL_NAME;
  if (env.GOOGLE_GENERATIVE_AI_MODEL) return env.GOOGLE_GENERATIVE_AI_MODEL;

  // Check Claude Code config hints
  if (env.CLAUDE_MODEL) return env.CLAUDE_MODEL;
  if (env.AI_MODEL) return env.AI_MODEL;

  // Fallback
  return 'claude-sonnet-5'; // Sensible default
}

function findProviderAndModel(modelName) {
  for (const [provider, models] of Object.entries(PRICING)) {
    if (models[modelName]) {
      return { provider, model: modelName, ...models[modelName] };
    }
  }

  // Fuzzy match
  for (const [provider, models] of Object.entries(PRICING)) {
    const match = Object.keys(models).find(m => modelName.includes(m.split('-')[0]));
    if (match) {
      return { provider, model: match, ...models[match] };
    }
  }

  return null;
}

function calculateCosts(numLeads, numBusinesses, numSites) {
  const results = {};

  // Calculate total tokens for this campaign
  const totalIn =
    PIPELINE_ESTIMATES.research.fixed.in +
    numLeads * PIPELINE_ESTIMATES.research.perLead.in +
    PIPELINE_ESTIMATES.plan.fixed.in +
    numBusinesses * PIPELINE_ESTIMATES.plan.perBusiness.in +
    PIPELINE_ESTIMATES.build.fixed.in +
    numSites * PIPELINE_ESTIMATES.build.perSite.in +
    PIPELINE_ESTIMATES.report.fixed.in;

  const totalOut =
    PIPELINE_ESTIMATES.research.fixed.out +
    numLeads * PIPELINE_ESTIMATES.research.perLead.out +
    PIPELINE_ESTIMATES.plan.fixed.out +
    numBusinesses * PIPELINE_ESTIMATES.plan.perBusiness.out +
    PIPELINE_ESTIMATES.build.fixed.out +
    numSites * PIPELINE_ESTIMATES.build.perSite.out +
    PIPELINE_ESTIMATES.report.fixed.out;

  // Calculate for each provider/model
  for (const [provider, models] of Object.entries(PRICING)) {
    results[provider] = {};
    for (const [model, pricing] of Object.entries(models)) {
      const inCost = (totalIn / 1_000_000) * pricing.in;
      const outCost = (totalOut / 1_000_000) * pricing.out;
      const totalCost = inCost + outCost;

      // Time estimate: base 2 hours + speed multiplier
      const baseHours = 2.5;
      const estimatedHours = baseHours / pricing.speed;

      results[provider][model] = {
        in_tokens: totalIn,
        out_tokens: totalOut,
        in_cost: inCost.toFixed(2),
        out_cost: outCost.toFixed(2),
        total_cost: totalCost.toFixed(2),
        estimated_hours: estimatedHours.toFixed(1),
        quality_score: pricing.quality,
        speed_multiplier: pricing.speed,
      };
    }
  }

  return { totalIn, totalOut, results };
}

function suggestModels(budget, priorityQuality = false, prioritySpeed = false) {
  const suggestions = [];

  for (const [provider, models] of Object.entries(PRICING)) {
    for (const [model, pricing] of Object.entries(models)) {
      suggestions.push({
        provider,
        model,
        quality: pricing.quality,
        speed: pricing.speed,
        value: (pricing.quality / ((pricing.in + pricing.out) / 2)).toFixed(2),
      });
    }
  }

  // Sort by priority
  if (priorityQuality) {
    suggestions.sort((a, b) => b.quality - a.quality);
  } else if (prioritySpeed) {
    suggestions.sort((a, b) => b.speed - a.speed);
  } else {
    // Best value: quality per dollar
    suggestions.sort((a, b) => b.value - a.value);
  }

  return suggestions.slice(0, 3);
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const command = args[0] || 'estimate';

  if (command === 'estimate') {
    const leads = parseInt(args[1]) || 5;
    const businesses = parseInt(args[2]) || 5;
    const sites = parseInt(args[3]) || 5;

    console.log('\n🎯 WEBSITE PITCH PIPELINE — COST & TIME ESTIMATOR\n');

    const currentModel = detectModel();
    const modelInfo = findProviderAndModel(currentModel);

    if (modelInfo) {
      console.log(`📊 Detected Model: ${modelInfo.provider.toUpperCase()} / ${modelInfo.model}`);
      console.log(`   Quality: ${modelInfo.quality}/10 | Speed: ${modelInfo.speed}x\n`);
    } else {
      console.log(`⚠️  Could not detect model. Using defaults.\n`);
    }

    const campaign = calculateCosts(leads, businesses, sites);

    console.log(`📈 Campaign Estimate (${leads} leads → ${businesses} businesses → ${sites} sites):`);
    console.log(`   Input tokens:  ${campaign.totalIn.toLocaleString()}`);
    console.log(`   Output tokens: ${campaign.totalOut.toLocaleString()}\n`);

    // Show current model's cost
    if (modelInfo) {
      const current = campaign.results[modelInfo.provider][modelInfo.model];
      console.log(`💰 YOUR CURRENT MODEL COST:`);
      console.log(`   Input:  $${current.in_cost}`);
      console.log(`   Output: $${current.out_cost}`);
      console.log(`   Total:  $${current.total_cost}`);
      console.log(`   Time:   ~${current.estimated_hours} hours\n`);
    }

    // Show all options sorted by cost
    const allOptions = [];
    for (const [provider, models] of Object.entries(campaign.results)) {
      for (const [model, costs] of Object.entries(models)) {
        allOptions.push({ provider, model, ...costs });
      }
    }
    allOptions.sort((a, b) => parseFloat(a.total_cost) - parseFloat(b.total_cost));

    console.log(`💳 TOP 3 BY COST (cheapest first):`);
    allOptions.slice(0, 3).forEach((opt, i) => {
      console.log(`   ${i + 1}. ${opt.provider}/${opt.model}: $${opt.total_cost} (~${opt.estimated_hours}h)`);
    });

    console.log(`\n⭐ TOP 3 BY QUALITY:`);
    allOptions.sort((a, b) => b.quality_score - a.quality_score);
    allOptions.slice(0, 3).forEach((opt, i) => {
      console.log(`   ${i + 1}. ${opt.provider}/${opt.model}: Quality ${opt.quality_score}/10, $${opt.total_cost}`);
    });

    console.log(`\n⚡ TOP 3 BY SPEED:`);
    allOptions.sort((a, b) => parseFloat(a.estimated_hours) - parseFloat(b.estimated_hours));
    allOptions.slice(0, 3).forEach((opt, i) => {
      console.log(`   ${i + 1}. ${opt.provider}/${opt.model}: ~${opt.estimated_hours}h, $${opt.total_cost}`);
    });
  }
}

main().catch(console.error);
