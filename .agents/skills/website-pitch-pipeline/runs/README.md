# Pipeline run reports

Every completed campaign run **must** upload a full report here.

## Rule (non-negotiable)

The pipeline is **not done** until:

1. The report folder exists under `runs/`
2. It is committed and **pushed** to  
   **`<ORG>/website-pitch-pipeline`** (this repo)
3. The PR is opened **or** the commit is on `main` / `dev` per team practice

Agents must not claim “pipeline complete” without a live GitHub URL to the report.

## Path convention

```text
runs/
  <YYYY-MM-DD>/
    <GEO_SLUG>-<CAMPAIGN_SLUG>/
      REPORT.md              # required — full narrative + tables
      SUMMARY.md             # required — one-screen executive summary
      leads-snapshot.csv     # recommended — copy of lead sheet (no secrets)
      checklist.md           # recommended — gates A/B/C + per-business status
      artifacts/             # optional screenshots, lighthouse JSON, etc.
```

Examples:

```text
runs/2026-07-23/istanbul-tailors-batch-1/
runs/2026-08-01/berlin-auto-repair-q3/
```

## Who writes the report

- **Primary:** agent finishing Loop 3 (or dedicated Loop 4 paste)
- **Trigger:** batch build complete (or human says “close the run”)
- **Auth:** `gh` as an account with push access to `<ORG>/website-pitch-pipeline`

## Template

Copy from [`_template/`](./_template/) or follow the structure in [`loops/04-run-report.md`](../loops/04-run-report.md).

## Privacy

- Do **not** commit API keys, tokens, or private personal emails that were never public.
- Prefer public business contacts only (same legal rules as research).
- If a field is sensitive, redact and note “redacted” in the report.
