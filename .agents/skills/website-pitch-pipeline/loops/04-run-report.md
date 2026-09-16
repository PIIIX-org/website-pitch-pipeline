# Loop 4 — Upload full run report (mandatory)

> When the pipeline run is finished (or the human closes the batch), write a **full report** and **push it to this repo**:  
> **`<ORG>/website-pitch-pipeline`** under `runs/`.  
> **The pipeline is not done until the report is on GitHub.**

---

## Completion condition (hard rule)

```text
DONE = (batch work finished OR human said "close the run")
      AND report folder exists under runs/
      AND commit pushed to <ORG>/website-pitch-pipeline
      AND report URL shown to the human

If the report is not on GitHub → status remains INCOMPLETE.
Do not say "pipeline complete" without the report URL.
```

Upload even for **partial** or **aborted** runs (status field must say so).

---

## Campaign variables

```text
CAMPAIGN_NAME:
GEO_SLUG:
GEOGRAPHY:
LOCALE:
RUN_DATE:          # YYYY-MM-DD (UTC preferred)
```

---

## Paste into Claude Code

```text
/loop [auto]
/goal
# Loop 4 — Full run report → push to <ORG>/website-pitch-pipeline

## Hard completion condition
The pipeline run is NOT complete until a full report is committed and pushed to:
  https://github.com/<ORG>/website-pitch-pipeline
under:
  runs/<YYYY-MM-DD>/<GEO_SLUG>-<campaign-slug>/
Show the human the GitHub URL to REPORT.md when finished.

## Prerequisite
- Loops 1–3 for this campaign finished, stopped at a gate, or human said "close the run" / "write the report"
- gh authenticated as an account with write access to <ORG>/website-pitch-pipeline
- Campaign variables known (GEO_SLUG, CAMPAIGN_NAME, dates)

## Objective
Produce a complete, honest run report (successes, failures, skips, links) and upload it to the pipeline repo so every run is auditable.

## Steps

### 1. Clone or update pipeline repo
  WORKDIR: a clean clone or existing local clone of <ORG>/website-pitch-pipeline
  git fetch && git checkout main   # or dev if that is the integration branch
  git pull

### 2. Create report folder
  PATH: runs/<YYYY-MM-DD>/<GEO_SLUG>-<campaign-slug>/
  campaign-slug: lowercase, hyphenated CAMPAIGN_NAME
  Example: runs/2026-07-23/istanbul-tailors-batch-1/

### 3. Write required files
  Use structure from runs/_template/ (copy and fill):

  REQUIRED:
  - REPORT.md   — full report (all sections from template)
  - SUMMARY.md  — executive one-pager

  RECOMMENDED:
  - checklist.md — Gate A/B/C + per-business status table
  - leads-snapshot.csv — export of leads (public data only; no secrets)
  - artifacts/ — screenshots, lighthouse JSON, QA notes (optional)

  REPORT.md MUST include:
  - Campaign variables as executed
  - Loop 0–3 outcomes + gate results
  - Research counts and top leads
  - Plan repos + scores + design lanes
  - Build repos + demo URLs + PR links + tags + EMAIL_DRAFT status
  - Skills/tools actually used this run
  - Failures, skips, redactions
  - Legal/contact compliance checklist
  - Remaining human actions
  - Status: complete | partial | aborted

### 4. Privacy
  - No API keys, tokens, or .env contents
  - No invented data; mark unknowns as unknown
  - Redact anything the human asked to keep private

### 5. Commit and push
  git add runs/<YYYY-MM-DD>/<GEO_SLUG>-<campaign-slug>/
  git commit -m "docs(runs): add <GEO_SLUG> <campaign> run report <YYYY-MM-DD>"
  git push origin <branch>

  If direct push to main is blocked:
  - open a PR titled: "Run report: <GEO_SLUG> <campaign> <date>"
  - wait for CI if any; request human merge
  - still treat "PR opened with full report" as upload success only after files are on the remote
  - preferred: get report onto default branch

### 6. Verify
  gh api repos/<ORG>/website-pitch-pipeline/contents/runs/<path>/REPORT.md
  OR open the blob URL in browser
  Print for the human:
  - Report URL
  - Commit SHA
  - Status (complete/partial/aborted)

## Done when
- [ ] REPORT.md + SUMMARY.md exist under runs/...
- [ ] Pushed to <ORG>/website-pitch-pipeline (remote)
- [ ] Human given clickable GitHub URL to REPORT.md
- [ ] Only then may you say the pipeline run is closed

## Failure mode
If push fails (auth, network, permissions):
- Keep local report files
- Show exact error
- Status = incomplete until upload succeeds
- Do not delete the local report
```

---

## Acceptance checklist

- [ ] Path follows `runs/<date>/<geo-campaign>/`  
- [ ] REPORT.md + SUMMARY.md filled (not empty template)  
- [ ] Pushed to **<ORG>/website-pitch-pipeline**  
- [ ] No secrets in the commit  
- [ ] Human has the report URL  

---

## Related

- Template: [`runs/_template/`](../runs/_template/)  
- Folder rules: [`runs/README.md`](../runs/README.md)  
- System: [`PIPELINE.md`](../PIPELINE.md)  
