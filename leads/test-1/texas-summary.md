# Texas Bars — Batch 1 Lead Research Summary

**Campaign:** texas-bars-batch-1
**Geography:** Texas, US (statewide — 13 cities/towns)
**Locale:** en (US English)
**Vertical:** bars (dive bars, honky-tonks, ice houses, neighborhood bars)
**Research date:** 2026-07-25
**Rows found:** 15 / 15 target

## Geographic spread

Corpus Christi, Houston, Lubbock, Amarillo, Fort Worth, Wichita Falls, Waco, San Angelo,
San Antonio, Austin, Dallas, Midland, San Marcos, Galveston, Abilene — mix of major
metros and smaller Texas towns, no single city over-represented.

## Weak-web breakdown

- **No website at all:** 10 of 15 — verified via directory/review-site listings showing no website field
- **Broken/unreachable site:** 4 of 15 — domain doesn't resolve, or returns 503/connection errors on direct fetch (The Grackle, It'll Do Bar, The Old Crow, Hour Glass Club/microsite)
- **Live but outdated site:** 1 of 15 — Island Pier Club, footer copyright 2018, dated Wix template

Every row's website status was confirmed by directly fetching the site (or the domain failing to resolve) rather than assumed from search snippets.

## Contact data

- 12 of 15 have a public phone (sourced from BBB, tourism-board, or aggregator listings)
- 3 of 15 have no confirmable phone — left blank rather than using an unverified number that only appeared on secondary aggregators
- Only 1 of 15 has a public email (Island Pier Club, sourced from its own site + Visit Galveston directory) — every other business had no publicly listed email, so those fields are blank per the no-invented-contact-data rule
- Every row has a Maps/Directory URL as its core verification source

## Top 5 opportunities (by estimated fit score)

1. **The Texan Drive-In** (Corpus Christi) — 8/10. 4.3★/510 reviews, domain doesn't resolve at all.
2. **Sheffield's Ice House** (Houston) — 8/10. 82-year-old institution, zero website, one directory even lists it as closed.
3. **Robbins Nest** (Lubbock) — 7/10. Oldest bar in Lubbock (47 yrs), no site.
4. **Sheffield's-tier group of 7s** — House Bar (Amarillo), Sarah's Place (Fort Worth), It'll Do Bar (Wichita Falls), Melody Ranch (Waco), My Bar (San Angelo), Texas T Pub (San Antonio), The Grackle (Austin), The Old Crow (Dallas), Hot Shots (Midland) — all strong underlying businesses (good reviews / long history) with no working website.
5. **Island Pier Club** (Galveston) — 6/10, but the only lead with a live site + public email already on file, useful as an easier first-contact test case.

## Notes for Gate A review

- All 15 rows meet the ≥2-criteria weak-web bar.
- No duplicates, no invented businesses/phones/emails — every row traces to a real source URL in the Maps/Directory URL column (and Email Source URL where an email exists).
- Sanitized detail (no contact fields): [`texas-bars-test-1.md`](./texas-bars-test-1.md). The full sheet with phone/email was reviewed locally for Gate A and is not committed to this repo (leads/ + *.xlsx are gitignored by design).

---

**Status:** test batch — filed under `leads/test-1/` rather than the standard `leads/` root while validating the pipeline end-to-end.
