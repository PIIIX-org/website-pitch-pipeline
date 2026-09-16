#!/usr/bin/env bash
# install.sh — Website Pitch Pipeline installer
# Automatically selects the gemini-native branch if running under Gemini / Google Antigravity,
# or defaults to the main branch for Claude Code / generic environments.

set -e

REPO="PIIIX-org/website-pitch-pipeline"
BRANCH="main"

# Auto-detect if running on Gemini / Antigravity / Google model
if [[ "$AGENT" =~ (antigravity|gemini) ]] || \
   [[ "$MODEL" =~ gemini ]] || \
   [[ -n "$GEMINI_API_KEY" ]] || \
   [[ -n "$GOOGLE_API_KEY" ]] || \
   [[ "$1" == "--gemini" ]]; then
    BRANCH="gemini-native"
    echo "⚡ Gemini model / Google environment detected."
    echo "📦 Installing skill from '${BRANCH}' (Native Google Maps, Search & URL Context — No Firecrawl required)"
else
    echo "ℹ️ Standard runtime detected."
    echo "📦 Installing skill from '${BRANCH}'"
fi

# Filter out --gemini flag if explicitly passed
ARGS=()
for arg in "$@"; do
    if [[ "$arg" != "--gemini" ]]; then
        ARGS+=("$arg")
    fi
done

if command -v npx >/dev/null 2>&1; then
    npx skills add "${REPO}#${BRANCH}" "${ARGS[@]}"
else
    echo "❌ npx is required to install skills. Please install Node.js / npm."
    exit 1
fi
