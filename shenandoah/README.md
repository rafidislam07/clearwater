# Shenandoah Valley STR buy-box presentation webpage

Plain HTML/CSS/JS, no build step, no framework. Run locally with any static
server, e.g. `python3 -m http.server 8000` from this directory, then open
`index.html`. It will not work correctly from `file://` because of the JSON
`fetch()` calls in `map.js` and `charts.js`'s dependence on `data.js`.

This site was built using `reference-webpage/webpage/` (the Clearwater-Largo-
Seminole market evaluation) as the structural/design reference — same
architecture (`data.js` → `render.js`/`charts.js`/`map.js` → `main.js`), same
`ddBlock`/photo-figure/lightbox component patterns, same two responsive
breakpoints (960px/600px) — rebuilt for the Shenandoah Valley, VA market with
a Blue Ridge-appropriate but non-brown/tan palette (deep forest green + sunset
amber, on a cool off-white background; see the token block at the top of
`css/styles.css`).

## Status

- **4BR buy box: fully developed.** Source of truth:
  `buy-box/shenandoah-buy-box-draft.md`,
  `buy-box/4br-must-have-execution-tiers.md`, `buy-box/4br-comp-set.md`,
  `buy-box/4BR-Tier-Diagnosis-High-Mid-Low.md`,
  `buy-box/4br-adjacent-comp-lessons.md`, `analysis/LOCATION_ANALYSIS.md`,
  `analysis/DEMOGRAPHICS_ANALYSIS.md`, and the raw market CSV. Every comp's
  Property ID, revenue, ADR, occupancy, city, and ZIP was cross-checked
  directly against `data/raw/Copy of Shenandoah Valley - Market Eval - FINAL -
  Cleaned_Data.csv`.
- **1-2BR "Couples' Getaway" buy box: fully developed.** Source of truth:
  Walid's raw supplied package at `walid/Shenandoah/Shenandoah Buy Box.docx`
  (a single sparse table — see `webpage/assets/1-2br/SOURCE.md` for the
  file-by-file image mapping and two flagged inconsistencies within the
  source material itself) and `walid/Shenandoah/readme.txt`. This segment's
  source material is much thinner than 4BR's: no named high/mid/low comps
  (those photo folders are anonymous evidence only), just three named
  "Design / Top Designs" comps, cross-checked directly against the raw CSV.
- **3BR buy box: fully developed.** Source of truth: Ifraham's supplied
  `ifraham/3BR_BuyBox/3BR_Details_Docx.docx` (12 numbered sections, each with
  inline "IMAGE REFERENCES") plus its own `3br_deep_dive/` analysis-notebook
  chart outputs — see `webpage/assets/3br/SOURCE.md` for the file-by-file
  mapping and two flagged inconsistencies within the source material itself
  (a Design-folder-not-actually-empty note, and a Mountain View text-vs-chart
  contradiction). Two of the docx's own sections — Design Direction and
  Revenue/Design Comp Set — are explicitly marked pending by Ifraham and are
  shown that way on the page (no invented comps, tiers, or dollar targets).
- **All three buy boxes named in the original brief (4BR, 1-2BR, 3BR) are now
  developed** — `PENDING_BUY_BOXES` in `js/data.js` is intentionally empty.
  Section 5 on the page shows a completion note, not a placeholder grid.
- **Buy boxes are ordered ascending by bedroom count** throughout the page
  (1-2BR → 3BR → 4BR) — this is the literal order of the `BUY_BOXES` array in
  `js/data.js`, which drives tab order, declaration-card order, and the
  default-active deep-dive tab (the array's first entry). Keep this ordering
  convention when adding any future buy box.

## Architecture

- **`js/data.js`** — the only place content lives: both buy-box specs (4BR's
  named comp set — core / ceiling-reference / counterexample — and 1-2BR's
  photo-evidence comp set), the market-wide revenue distribution histogram,
  map config, and the one remaining pending-buy-box placeholder. Nothing else
  in the codebase hardcodes buy-box content. Each `BUY_BOXES` entry declares
  its own ordered `buyBoxSections` array (a list of section keys) — the two
  boxes' arrays differ (e.g. only 1-2BR has a `viewsSeclusion` section; only
  4BR has `executionComparison`/`counterexamples`).
- **`js/render.js`** — presentation logic; builds every DOM component from
  `data.js` via a generic `ddBlock` helper (shared by every deep-dive
  subsection) plus a small set of `*Block` builders, one per section key,
  dispatched through the `NARRATIVE_BLOCKS` lookup table in `renderDeepDive`
  according to each box's own `buyBoxSections` order (unknown/absent keys are
  skipped silently, same tolerance convention as `ddBlock`'s null-row
  skipping).
- **`js/charts.js`** — one Chart.js chart: the market-wide Revenue Potential
  histogram, colored by revenue-tier band (bottom 75% / top 25% / top 10%).
- **`js/map.js`** — Leaflet/OpenStreetMap map reading `data/listings.json`.
  Two independent filter dimensions: revenue tier (top10/top25/bottom75,
  same convention as the reference site) and the new **comp-set filter**
  (all listings / 4BR core comps / 4BR ceiling-reference comps / 4BR
  counterexamples / 1-2BR design comps), plus a ZIP-area overlay toggle (see
  below). The comp-set category list is driven entirely by
  `MAP_CONFIG.compSetLabels`/`compSetColors` in `data.js`, so a future buy
  box's comps can be added the same way without touching `map.js`.
- **`js/main.js`** — bootstraps everything on `DOMContentLoaded`; nav
  scroll-spy; lightbox open/close wiring.
- **`css/styles.css`** — the whole design system (tokens, layout, two
  responsive breakpoints at 960px/600px).
- **`data/listings.json`** — generated by `../scripts/generate_webpage_map_data.py`
  from the raw market CSV; safe to re-run, do not hand-edit. Includes a
  `zipApprox` array (see ZIP overlay note below).
- **`assets/4br/<category>/`** — real supplied photography for the 4BR buy
  box, curated from `/4br/<listing-folder>/` at the repo root. See
  `assets/4br/SOURCE.md` for the file-by-file mapping back to the original
  listing folder each image came from. Files are copied as-is (no
  re-encoding — the source AVIF/WebP/JPEG files are already efficient),
  unlike the reference site's JPEG re-encoding convention.

## ZIP overlay — documented integration point

Exact ZIP (ZCTA) boundary GeoJSON is not in this repo. `map.js`'s
`drawZipOverlay()` first tries to fetch `data/zip-boundaries.geojson`; if that
file doesn't exist (the current state), it falls back to drawing subtle
dashed circles at each ZIP's centroid (computed from that ZIP's own listing
coordinates in `scripts/generate_webpage_map_data.py`, stored as
`zipApprox` in `listings.json`), each labeled with its ZIP code. These
circles are explicitly **not** authoritative ZCTA boundaries — the legend and
in-code comments both say so. To upgrade to real boundary lines, drop a
standard ZCTA GeoJSON at `webpage/data/zip-boundaries.geojson` covering these
29 ZIPs; no other code changes are needed.

## Revenue distribution plot

`REVENUE_DISTRIBUTION` in `data.js` is a 20-bin histogram of the raw CSV's
`Revenue Potential` field across all 787 listings (all bedroom counts, per the
"full market" instruction), with P75 ($71,766, top-25% threshold) and P90
($93,222, top-10% threshold) computed directly from the data — see
`scripts/generate_webpage_map_data.py` for the percentile method (linear
interpolation on the sorted list). The chart in `js/charts.js` colors each bin
by whether its midpoint falls below P75, between P75-P90, or above P90. The
4BR-only subset (144 listings: median $66,546, P75 $87,595, P90 $111,717) is
shown alongside as supporting context, not overlaid on the same chart.

## How to extend

- **Add content to the 4BR buy box**: edit `BUY_BOXES[0]` in `js/data.js`
  only; `ddBlock` skips rows with no value, so a field left `null`/omitted
  renders as absent rather than guessed.
- **Add a new 4BR photo**: drop the file under `assets/4br/<category>/`, add
  a row to `assets/4br/SOURCE.md`, then reference it via
  `photo(relPath, alt, caption)` in `data.js`.
- **Develop a new buy box**: add an entry to `BUY_BOXES` in `js/data.js`
  following the 4BR object's shape (or a simpler subset — `ddBlock`
  tolerates missing fields), add its label to `DEEP_DIVE_SECTIONS`-compatible
  fields, and remove its placeholder from `PENDING_BUY_BOXES`. Also add its
  comp-set tags to `scripts/generate_webpage_map_data.py` if it has one.
- **Regenerate the map data**: `python3 scripts/generate_webpage_map_data.py`
  from the repo root whenever the underlying CSV changes.

## What NOT to assume

- No build/bundle/minify step, no package manager.
- `data/listings.json` is machine-generated; don't hand-edit it.
- The ZIP-area circles on the map are an approximation, not real ZCTA
  boundaries — see the ZIP overlay note above.
- No STR regulation, permit, HOA, or acquisition-candidate figures are shown
  for the 4BR buy box because none were supplied in the source material —
  this is deliberate (see `REGULATION_NOTE` and `BUY_BOXES[0].acquisition` in
  `data.js`), not an oversight.
- Non-4BR listings (3BR/5BR/6BR+) never set the 4BR revenue tiers or
  underwriting ranges on this page — see the caution note in the Revenue
  Tiers & Core Comps section.
