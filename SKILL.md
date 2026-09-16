---
name: website-pitch-pipeline
description: Autonomous agency pipeline to case any market, audit weak business websites, design bespoke pitch demo sites, and draft outreach. Supports Claude Code and native Google Gemini (no Firecrawl).
---

# Website Pitch Pipeline

Agents case a market, audit local businesses with weak websites, design one bespoke demo site per business, build it, and draft personalized outreach.

---

## ⚡ Active Model Routing (Read First)

This skill supports two execution modes based on your active LLM runtime:

1. **If you are running on a Google Gemini model (Gemini 2.5, Gemini 3+, Antigravity, or have `GEMINI_API_KEY`)**:
   > **Switch to the native Gemini pipeline (`gemini-native` branch)**:
   > ```bash
   > git checkout gemini-native
   > # Or install directly:
   > npx skills add PIIIX-org/website-pitch-pipeline#gemini-native
   > ```
   > In `gemini-native` mode, **Firecrawl, Apify, and 3rd-party scrapers are completely disabled**. The pipeline runs 100% natively using Gemini's built-in `google_maps`, `google_search`, and `url_context` tools.

2. **If you are running on Claude Code or generic LLM runtimes**:
   > Follow the default multi-agent loop stack in this branch (`loops/00-bootstrap.md` through `loops/04-run-report.md`).

---

## Campaign Variables

```text
CAMPAIGN_NAME: [e.g. austin-plumbing-q1]
GEOGRAPHY:     [e.g. Austin, Texas | Berlin | Istanbul]
GEO_SLUG:      [e.g. austin-tx | berlin | istanbul]
LOCALE:        [e.g. en | de | tr]
VERTICALS:     [e.g. plumbing, HVAC]
TARGET_COUNT:  15 (qualified leads for Gate A)
```

## The Gates

> **AGENTS HOLD NO KEYS. THE HUMAN SIGNS EVERY GATE.**

- **Gate A (After Sheet 01)**: The human verifies real businesses, right geography, and public contact sources.
- **Gate B (After Sheet 02)**: The human verifies unique visual direction and executable plan.
- **Gate C (After Sheet 03)**: The human checks mobile responsiveness and email outreach draft.
