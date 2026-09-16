# Campaign Run Report: Wyoming Commercial HVAC & Heating

- **Campaign Name:** `wyoming-hvac-q4`
- **Geography:** Wyoming (Casper, Cheyenne, Gillette, Laramie, Sheridan)
- **Vertical:** Commercial HVAC, Heating, and Facility Maintenance
- **Execution Architecture:** Gemini Native (Zero Firecrawl / Zero 3rd-Party Scrapers)
- **Run Date:** 2026-09-16
- **Status:** **All Gates Passed (A, B, C Completed)**

---

## 1. Pipeline Summary

| Sheet | Output Delivered | Status |
|---|---|:---:|
| **Sheet 00 (Prep)** | Gemini Native toolchain & headless Chrome verified | **PASS** |
| **Sheet 01 (Casing)** | 15 verified Wyoming leads in [`wyoming-hvac-business-leads-batch-1.csv`](../../leads/wyoming-hvac/wyoming-hvac-business-leads-batch-1.csv) | **Gate A Passed** |
| **Sheet 02 (Drawings)** | Bespoke pitch plan in [`plans/wyoming-hvac-arrowhead/`](../../plans/wyoming-hvac-arrowhead/) | **Gate B Passed** |
| **Sheet 03 (Build & Outreach)** | Working demo site in [`demos/wyoming-hvac-arrowhead/index.html`](../../demos/wyoming-hvac-arrowhead/index.html) + [`EMAIL_DRAFT.md`](../../demos/wyoming-hvac-arrowhead/EMAIL_DRAFT.md) | **Gate C Passed** |
| **Sheet 04 (The File)** | Final campaign documentation filed | **Filed** |

---

## 2. Lead Discovery & Casing Highlights
15 real, geographically verified businesses were discovered and audited across Wyoming. Top candidates:
1. **Arrowhead Heating & Air Conditioning (Casper/Douglas):** HTTP insecure, 2019 dead Google+ link, baby pink/neon green palette with teapot stock imagery.
2. **Air-Tech Heating & Air Conditioning (Gillette):** Live website contact footer contains unconfigured `user@domain.com` placeholder.
3. **Laramie Mechanical & Heating Systems (Laramie):** Founded in 1947, web server throws raw HTTP 403 Forbidden.
4. **Cole Custom Air (Casper):** B2B contractor operating with free consumer `@yahoo.com` email.
5. **Sheet Metal Specialties (Casper):** HTML title tag misspells city as *"Caspar HVAC Company"*.

---

## 3. Demo Built: Arrowhead Heating & Air Conditioning
- **Current Live Site:** `http://arrowheadhvacr.com` (Insecure HTTP, baby pink header, steaming teapot hero)
- **Bespoke Demo Site:** [`demos/wyoming-hvac-arrowhead/index.html`](../../demos/wyoming-hvac-arrowhead/index.html)
  - Sub-zero 24/7 emergency dispatch beacon.
  - Commercial facility winter maintenance calculator.
  - Heavyweight industrial Space Grotesk / Inter typography.
  - Carbon slate `#0B0F19` with high-visibility safety heat amber `#F97316`.
- **Cold Outreach Draft:** [`demos/wyoming-hvac-arrowhead/EMAIL_DRAFT.md`](../../demos/wyoming-hvac-arrowhead/EMAIL_DRAFT.md) (consultative, cites real observable weaknesses, zero fluff).

---

## 4. Operational Metrics
- **Firecrawl API Calls:** **0**
- **Apify / Proxy Requests:** **0**
- **External Web Scraping Cost:** **$0.00**
- **Native Screenshots Taken:** 2 full-page screenshots via macOS Headless Chrome
- **Turnaround Time:** Completed in a single session.
