# Pipeline run report

| Field | Value |
|-------|--------|
| **Campaign name** | |
| **GEOGRAPHY** | |
| **GEO_SLUG** | |
| **Locale** | |
| **Verticals** | |
| **Batch size** | |
| **Run start (UTC)** | |
| **Run end (UTC)** | |
| **Operator / agent** | |
| **Pipeline repo commit** | |
| **Status** | complete / partial / aborted |

---

## 1. Executive summary

2–5 sentences: what was run, what shipped, main risks, next human action.

---

## 2. Campaign variables (as executed)

```text
CAMPAIGN_NAME:
GEOGRAPHY:
GEO_SLUG:
LOCALE:
VERTICALS:
BATCH_SIZE:
ORG: <ORG>
```

---

## 3. Loop outcomes

| Loop | Status | Evidence / path | Gate | Gate result |
|------|--------|-----------------|------|-------------|
| 0 Bootstrap | | | Machine ready | pass / skip |
| 1 Research | | leads file path | **A** | pass / fail / pending |
| 2 Plan | | plan repos | **B** | pass / fail / pending |
| 3 Build | | demo repos + PRs | **C** | pass / fail / pending |
| 4 Run report | | this folder | push to pipeline repo | |

---

## 4. Research (Loop 1)

- Lead file: `...`
- Qualified count: N
- Vertical mix:
- Top opportunities (5):

| # | Business | City/Area | Fit | Website status |
|---|----------|-----------|-----|----------------|
| 1 | | | | |

---

## 5. Plans (Loop 2)

| Business | Repo | Score /100 | Design lane | Tags | Notes |
|----------|------|------------|-------------|------|-------|
| | <ORG>/... | | | pending-beta → … | |

---

## 6. Builds (Loop 3)

| Business | Repo | Demo URL | PR | Status tag | EMAIL_DRAFT | QA notes |
|----------|------|----------|-----|------------|-------------|----------|
| | | | | ready-for-review / ready-for-outreach | yes/no | |

---

## 7. Skills & tools actually used

List what was invoked (not the full install list):

**Design:**  
**Copy/writing:**  
**Research/crawl:**  
**MCP:**  
**Other:**  

---

## 8. Issues, skips, failures

| Item | Severity | Resolution / follow-up |
|------|----------|------------------------|
| | | |

---

## 9. Legal / contact compliance

- [ ] Only public business contacts used  
- [ ] Email source URLs recorded where emails present  
- [ ] No invented emails  
- [ ] Demos labeled as concepts where applicable  

---

## 10. Human actions remaining

1.  
2.  
3.  

---

## 11. Artifacts index

| File | Description |
|------|-------------|
| SUMMARY.md | One-screen summary |
| leads-snapshot.csv | Lead export (if included) |
| checklist.md | Gate/business checklist |
| artifacts/… | Screenshots, etc. |
