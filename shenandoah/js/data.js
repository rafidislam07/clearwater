/**
 * Central content/config layer for the Shenandoah Valley STR buy-box presentation webpage.
 *
 * This is the ONLY place buy-box specs, comps, revenue tiers, and analyst notes should
 * live. Rendering code (render.js, map.js, charts.js) reads from this file; it never
 * hardcodes content.
 *
 * SOURCE OF TRUTH for the 4BR buy box: buy-box/shenandoah-buy-box-draft.md,
 * buy-box/4br-must-have-execution-tiers.md, buy-box/4br-comp-set.md,
 * buy-box/4BR-Tier-Diagnosis-High-Mid-Low.md, buy-box/4br-adjacent-comp-lessons.md,
 * analysis/LOCATION_ANALYSIS.md, analysis/DEMOGRAPHICS_ANALYSIS.md, and the raw market
 * CSV (data/raw/Copy of Shenandoah Valley - Market Eval - FINAL - Cleaned_Data.csv).
 * Every comp's Property ID, revenue, ADR, occupancy, city, and ZIP below was cross-checked
 * directly against that CSV. SOURCE OF TRUTH for the 1-2BR buy box: Walid's supplied
 * walid/Shenandoah/Shenandoah Buy Box.docx + readme.txt (see webpage/assets/1-2br/SOURCE.md).
 * SOURCE OF TRUTH for the 3BR buy box: Ifraham's supplied
 * ifraham/3BR_BuyBox/3BR_Details_Docx.docx + its 3br_deep_dive/ analysis charts (see
 * webpage/assets/3br/SOURCE.md). Nothing here is invented: fields the source material does
 * not answer (STR regulations/permits, acquisition candidates, Alexandria links, a validated
 * purchase price, a 3BR revenue comp set) are left null/omitted/marked pending rather than
 * guessed. All three buy boxes named in the original brief (4BR, 1-2BR, 3BR) are now
 * developed — see PENDING_BUY_BOXES below, which is intentionally empty.
 */

// ---------------------------------------------------------------------------
// Photo-evidence helper. Every file lives under webpage/assets/4br/<category>/ —
// see webpage/assets/4br/SOURCE.md for the file-by-file mapping back to the
// original listing folder in /4br/ it was copied from.
// ---------------------------------------------------------------------------
function photo(relPath, alt, caption) {
  return { file: "assets/" + relPath, alt: alt, caption: caption };
}

// A bare-Airbnb-link reference for comps with no stored photo yet.
function pendingPhoto(url, label) {
  return { pending: true, url: url, label: label };
}

// ---------------------------------------------------------------------------
// Section 2 — Market context
// ---------------------------------------------------------------------------
const MARKET_OVERVIEW = {
  heading: "What the Shenandoah Valley is",
  paragraphs: [
    "The Shenandoah Valley is the broad valley west of Virginia's Blue Ridge Mountains, carved by the North and South Forks of the Shenandoah River. Shenandoah National Park runs along the crest of the Blue Ridge for roughly 80 miles, encompassing more than 197,000 acres, with the valley and river to its west and the Piedmont hills to its east.",
    "Skyline Drive, a 105-mile National Scenic Byway, runs the length of the park from Front Royal to Waynesboro, linking 75 scenic overlooks, campgrounds, and trailheads — including 101 miles of the Appalachian Trail among the park's roughly 500 miles of hiking trails. The park sits about 75-90 miles from Washington, D.C., putting the whole valley within an easy weekend drive of a major metro population.",
    "This is a recognizable, repeat-visited leisure market: national-park hiking and scenic driving, river tubing and fishing on the Shenandoah, Luray Caverns, Bryce Resort and Massanutten-style ski/golf access, and wine-country day trips all draw overlapping group-travel demand, with fall foliage (late September-mid-November) as the single strongest seasonal driver.",
  ],
  sources: [
    { label: "NPS — Shenandoah National Park", url: "https://www.nps.gov/shen/planyourvisit/driving-skyline-drive.htm" },
    { label: "Virginia Tourism — Scenic Skyline Drive", url: "https://www.virginia.org/places-to-visit/scenic-drives-and-byways/byways/scenic-skyline-drive/" },
  ],
};

const MARKET_INTRO = {
  boundaries:
    "787 short-term-rental listings across 29 ZIP codes on the valley (western) side of the Blue Ridge, spanning Page, Warren, Shenandoah, and Rockingham Counties — Luray, Front Royal, Stanley, Shenandoah, Mount Jackson, Basye, Rileyville, Bentonville, Elkton, and smaller towns.",
  composition:
    "By bedroom count: 1BR 125 listings, 2BR 217, 3BR 261, 4BR 144, 5BR 30, 6BR+ 10 (787 total). 4BR is the fourth-largest segment by count but already the second-highest-revenue segment after 5BR/6BR+.",
  revenueOpportunity:
    "Market-wide Revenue Potential: median $51,009; top-25% threshold (P75) $71,766; top-10% threshold (P90) $93,222. The 4BR segment alone (144 listings) runs meaningfully hotter: median $66,546, P75 $87,595, P90 $111,717. The 3BR segment (261 listings) sits close to the market-wide baseline (median $54,393), with its own buy-box evidence pointing to bathroom count (3+) and three specific ZIPs — not the median — as what actually separates its Top 10% (P90 $85,095, N=26 of 259 usable listings). The 1-2BR segment (342 listings) sits below the market-wide baseline on a per-listing basis (median $42,476, P75 $58,075, P90 $75,796) — expected for a smaller-capacity product, and consistent with why its buy-box revenue tiers ($75K/$90K/$100K+) target a specific secluded, well-photographed profile rather than the segment median.",
  demandDrivers:
    "Shenandoah National Park and Skyline Drive recreation, river access (tubing, fishing, riverfront cabins), Luray Caverns, Bryce Resort/Massanutten-style ski and golf access, wine-country day trips, and DC-metro drive-market proximity recur across the highest-performing listings in the dataset.",
  characteristics:
    "Descriptive, not causal: the market's highest-revenue inventory is disproportionately mountain/log-cabin product with a hot tub, fire pit, and dedicated game or entertainment space — the pattern this buy box is built to reproduce, not a proof that any single amenity independently drives revenue.",
};

const REGULATION_NOTE =
  "STR regulatory, permitting, and HOA diligence is address-level and deferred to acquisition screening for any specific candidate property. No jurisdiction-wide regulatory determination has been made for this market.";

// ---------------------------------------------------------------------------
// Market-wide revenue distribution (Section 2 plot) — computed directly from
// the raw CSV's Revenue Potential field. See scripts/analyze_revenue_distribution.py
// for the exact computation. Do not hand-edit; regenerate from the CSV if the
// underlying data changes.
// ---------------------------------------------------------------------------
const REVENUE_DISTRIBUTION = {
  totalCount: 787,
  medianRevenue: 51009,
  p75: 71765.5,
  p90: 93222.0,
  bedroom4: { count: 144, median: 66546, p75: 87594.5, p90: 111716.7 },
  histogram: [
    { binStart: 6582, binEnd: 20515.5, count: 45 },
    { binStart: 20515.5, binEnd: 34449, count: 166 },
    { binStart: 34449, binEnd: 48382.5, count: 156 },
    { binStart: 48382.5, binEnd: 62316, count: 147 },
    { binStart: 62316, binEnd: 76249.5, count: 110 },
    { binStart: 76249.5, binEnd: 90183, count: 73 },
    { binStart: 90183, binEnd: 104116.5, count: 39 },
    { binStart: 104116.5, binEnd: 118050, count: 15 },
    { binStart: 118050, binEnd: 131983.5, count: 11 },
    { binStart: 131983.5, binEnd: 145917, count: 11 },
    { binStart: 145917, binEnd: 159850.5, count: 6 },
    { binStart: 159850.5, binEnd: 173784, count: 2 },
    { binStart: 173784, binEnd: 187717.5, count: 2 },
    { binStart: 187717.5, binEnd: 201651, count: 1 },
    { binStart: 201651, binEnd: 215584.5, count: 0 },
    { binStart: 215584.5, binEnd: 229518, count: 1 },
    { binStart: 229518, binEnd: 243451.5, count: 0 },
    { binStart: 243451.5, binEnd: 257385, count: 1 },
    { binStart: 257385, binEnd: 271318.5, count: 0 },
    { binStart: 271318.5, binEnd: 285252, count: 1 },
  ],
};

// ---------------------------------------------------------------------------
// Section 3 — Location analysis (map)
// ---------------------------------------------------------------------------
const MAP_CONFIG = {
  dataUrl: "data/listings.json",
  center: [38.72, -78.45],
  zoom: 10,
  tierColors: { top10: "#b9752b", top25: "#1e3d32", bottom75: "#8b94a3" },
  tierLabels: {
    top10: "Top 10% revenue (market-wide, P90 = $93,222)",
    top25: "Next 15% (top 25% excl. top 10%, P75 = $71,766)",
    bottom75: "Bottom 75%",
  },
  compSetColors: { core: "#1e3d32", ceiling: "#345b78", counterexample: "#b5482e", designComp1_2br: "#6b3fa0" },
  compSetLabels: {
    core: "4BR core comps (underwriting evidence)",
    ceiling: "4BR ceiling / reference comps (not underwritten)",
    counterexample: "4BR counterexamples / excluded comps",
    designComp1_2br: "1-2BR design comps",
  },
  cityGuidance: [
    { city: "Stanley (22851)", tier: "Priority", note: "Best combination of market-wide median revenue, top-decile count, and strong-amenity-stack share." },
    { city: "Rileyville (22650)", tier: "Priority — 4BR-specific", note: "Thin overall sample, but the 4BR cut is the strongest in the market: 5 listings, $134,946 median, 100% strong-stack share, up to $164,209." },
    { city: "Shenandoah (22849)", tier: "Priority", note: "Fits the Page/Shenandoah mountain-cabin pool; strong 4BR-specific median ($77,224)." },
    { city: "Front Royal (22630)", tier: "Priority", note: "A distinct submarket — DC-access/wine-country-adjacent rather than pure mountain-cabin." },
    { city: "Mount Jackson (22842) / Basye (22810)", tier: "Strong secondary", note: "Valid resort/lake/cabin markets; the investment case must come from full amenity-stack execution, not resort proximity alone." },
    { city: "Luray (22835)", tier: "Strong secondary", note: "Deepest inventory pool (182 listings) but only 7.7% top-decile share — pay up only for a clear product advantage, not for the ZIP." },
  ],
};

// BUY_BOXES — ordered ascending by bedroom count (1-2BR, 3BR, 4BR). This order
// drives tab order, declaration-card order, and the default-active deep-dive
// tab (the first entry) throughout the page.
const BUY_BOXES = [
  // ---------------------------------------------------------------------------
  // The 1-2BR "Couples' Getaway" buy box — fully developed. Source of truth:
  // walid/Shenandoah/Shenandoah Buy Box.docx (a single sparse table; every
  // field below traces directly to a cell in that table — see
  // webpage/assets/1-2br/SOURCE.md) and walid/Shenandoah/readme.txt. The docx
  // supplies far less detail than the 4BR source material: no named high/mid/
  // low comps (those three photo folders are anonymous evidence only, filenames
  // confirmed to have zero overlap with the market CSV), only three named
  // comps total, under "Design / Top Designs" — cross-checked against the raw
  // CSV by Property ID (see revenueTiers.designComps below for the real
  // revenue/ADR/occupancy figures). Nothing here is invented: fields the docx
  // left blank (STR regulation tier, ZIP codes, lot size, a validated purchase
  // price) stay omitted/pending, never guessed.
  // ---------------------------------------------------------------------------
  {
    id: "1-2br",
    label: "1-2BR Buy Box",
    status: "developed",
    name: "Couples' Getaway Cabin",
    thesis:
      "Acquire a secluded 1-2 bedroom cabin — modern, older-with-modernized-interior, or an A-frame/dome-style build — and let seclusion, not view quality or amenity count, do the work of driving revenue.",
    atAGlance: {
      bedBath: "1-2 bedrooms / 1+ bathroom",
      sleeps: "4 (ideal sleep count)",
      heroMechanism: "Seclusion first, then view — paired with a hot tub, fire pit, outdoor dining, and string lights on a deck",
      revenue: "Low $75,000 · Mid $90,000 · High $100,000+ (annual; source material gives no ADR/occupancy breakdown)",
      primaryRequirement: "A genuinely secluded lot — the source material's single strongest normative point is that seclusion outranks view quality, photography, and amenities combined",
    },

    buyBoxSections: [
      "overview", "acquisitionSpec", "finishedSpec", "viewsSeclusion", "locationGuidance",
      "travelerICP", "mustHaveAmenities", "executionStandards", "revenueTiers",
      "analystNotes", "acquisition",
    ],

    overview: {
      statusBadge: "Evidence-backed recommendation — acquisition underwriting pending",
      thesis:
        "Acquire a secluded 1-2 bedroom cabin — modern, older-with-modernized-interior, or an A-frame/dome-style build — and let seclusion, not view quality or amenity count, do the work of driving revenue.",
      whyItWorks:
        "The source material's own analyst notes state that the properties competing in the top 25% of this segment's revenue do so \"through seclusion and photography style,\" not through a longer amenity list. A well-photographed, secluded cabin with the four core must-haves already outperforms a less-secluded property with better views.",
      heroImage: photo("1-2br/overview/hero-modern-cabin-dusk.jpg", "Dark modern cabin lit up at dusk in the woods", "The 1-2BR program: a secluded, well-photographed couples' cabin."),
      chips: [
        { label: "1-2 bedrooms" },
        { label: "Sleeps 4" },
        { label: "1+ bathroom" },
        { label: "Seclusion required" },
        { label: "Hot tub required" },
        { label: "Fire pit required" },
        { label: "Outdoor dining required" },
        { label: "String lights required" },
        { label: "Modern, older-modernized, or A-frame/dome architecture" },
      ],
      revenueChips: [
        { label: "Low", value: "$75,000" },
        { label: "Mid", value: "$90,000" },
        { label: "High", value: "$100,000+" },
      ],
    },

    acquisitionSpec: {
      required: [
        "1-2 true bedrooms, 1+ bathroom",
        "Ideal sleep count of 4 — this is explicitly a couples/small-family product, not a group house",
        "A deck large enough to fit a hot tub, a sauna, an outdoor dining space, and a fire pit if there's no room for one on the ground — backyards are uncommon on this segment's typical lots",
        "A genuinely secluded lot, evaluated before view quality",
      ],
      preferred: [
        "Modern cabin, an older cabin with a modernized interior, or an A-frame/dome-style build (the source material's own text names \"A Frames\" as the third style; its supplied photo folder is instead labeled \"dome\" — both terms are shown here since the source itself is inconsistent on this point, not resolved by guessing)",
        "\"Modern fixtures and interior\" regardless of exterior architecture, per the source material",
      ],
      images: [
        photo("1-2br/architectural/modern-cabin-1.jpg", "Night shot of an A-frame and wood-slat modern cabin complex with string lights and a firepit", "Modern cabin example."),
        photo("1-2br/architectural/older-cabin-2.jpg", "Two-story log cabin at dusk with a wraparound deck, string lights, and a private hot tub", "Older cabin with a modernized deck."),
        photo("1-2br/architectural/dome-cabin-1.jpg", "Geodesic dome cabin exterior with a deck and hot tub in the forest", "Dome cabin example."),
        photo("1-2br/architectural/modern-cabin-2.jpg", "Wood-slat modern cabin on stilts with floor-to-ceiling windows and a deck with dining table and grill", "Modern cabin example."),
        photo("1-2br/architectural/older-cabin-1.jpg", "Traditional dark-green board-and-batten cabin with a stone chimney in the woods", "Older cabin example."),
        photo("1-2br/architectural/dome-cabin-2.jpg", "Geodesic dome cabin glowing at dusk beside a forest pond", "Dome cabin example."),
      ],
    },

    finishedSpec: {
      sleepCount: "Ideal sleep count is 4 — no guidance is given toward padding capacity beyond this; the product is explicitly sized for couples and small families, not groups.",
      backyard: "\"Backyards are not common here. Instead, look for a deck large enough to fit a hot tub, a Sauna, an outdoor dining space, and a fire pit if there is no space for it on the ground.\" (verbatim, source docx)",
      images: [
        photo("1-2br/photography/aerial-deck-full-amenity.jpg", "Aerial view of a deck with a hot tub, dining table under an umbrella, string lights, and firepit chairs below on rocky forest terrain", "Every must-have amenity staged on one deck — hot tub, dining, string lights, and firepit."),
      ],
    },

    // Unique to this buy box: seclusion is explicitly ranked above view quality
    // in the source material — the single strongest normative statement in the
    // whole docx.
    viewsSeclusion: {
      privacySeclusion: "\"Seclusion is the top priority before looking at views. A property with A+ views, top photography and all must have amenities will not drive expected revenue if property is not secluded.\" (verbatim, source docx)",
      views: "\"Mountain view within a secluded forest area works very well. If not, forest views in a secluded area works, but expect lower revenue. Lake view drives revenue as well, but sample size is low.\" (verbatim, source docx)",
      waterfront: "\"Revenue lift does not outweigh the investment.\" (verbatim, source docx) — do not pay a premium for waterfront on this segment.",
      seclusionImages: [
        photo("1-2br/seclusion/seclusion-1.jpg", "Aerial drone shot of a single black A-frame cabin roof nearly swallowed by dense forest canopy", "Seclusion is the top priority, ahead of view quality, photography, or amenities."),
        photo("1-2br/seclusion/seclusion-2.jpg", "Aerial view of a small cabin nearly hidden within dense forest, reached by a single gravel driveway", "A secluded cabin reachable only by a single forest driveway."),
      ],
      viewGroups: [
        {
          label: "Mountain views (highest-priority view type)",
          images: [
            photo("1-2br/views/mountain-view-1.jpg", "Adirondack chairs and a firepit facing a Blue Ridge mountain vista at golden hour", "Mountain view example."),
            photo("1-2br/views/mountain-view-2.jpg", "Sunrise panorama over a mountain valley seen from a deck with lounge chairs", "Mountain view example."),
          ],
        },
        {
          label: "Lake views (drives revenue, but the source material notes the sample size behind this is small)",
          images: [
            photo("1-2br/views/lake-view-1.jpg", "A river valley at sunset framed by an open porch doorway", "Lake/river view example."),
            photo("1-2br/views/lake-view-2.jpg", "Firepit and sofa seating on a deck overlooking a lake with fall foliage", "Lake view example."),
          ],
        },
        {
          label: "Forest views (acceptable when secluded; expect lower revenue than mountain/lake)",
          images: [
            photo("1-2br/views/forest-view-1.jpg", "Sunset-lit deck opening framing a river and forest valley", "Forest view example."),
            photo("1-2br/views/forest-view-2.jpg", "Deck-edge plunge pool reflecting the surrounding forest, with a drink resting on the ledge", "Forest view example."),
          ],
        },
      ],
    },

    locationGuidance: {
      recommended: "\"Proximity to Shenandoah National park and Shenandoah River seems to drive high revenue.\" (verbatim, source docx). Popular Places: \"Shenandoah National Park.\"",
      caution: "No specific ZIP codes, counties, or towns are named in the source material for this segment — unlike the 4BR buy box, no city-level guidance is available yet.",
      diligence: "As with 4BR, waterfront/river-adjacent claims and access should be diligenced at the property level; the source material's own waterfront note above already discourages paying a location premium for it.",
    },

    travelerICP: {
      primary: "\"Couples and small families.\" (verbatim, source docx)",
      secondary: "No further demographic detail (age, income, occasion) is given in the source material.",
      stats: [],
      note: "Ideal sleep count of 4 reinforces the couples/small-family framing — this is not a group-trip product like the 4BR buy box.",
    },

    mustHaveAmenities: {
      items: [
        "Hot tub",
        "Fire pit",
        "Outdoor dining",
        "String lights",
      ],
      images: [
        photo("1-2br/must-have/firepit-wine-string-lights.jpg", "Outdoor firepit table with two wine glasses and string lights on a wooded deck at dusk", "Firepit, outdoor seating, and string lights sharing one deck — three of the four must-have items in one scene."),
        photo("1-2br/must-have/hot-tub-deck-forest.jpg", "Private hot tub on a deck overlooking forest", "A private hot tub sited to face the woods, not the parking pad."),
        photo("1-2br/must-have/hot-tub-in-use-deck.jpg", "Private hot tub in use on a deck at the edge of a wooded hillside", "A hot tub in active use on a private deck."),
        photo("1-2br/must-have/firepit-bench-seating.jpg", "Circular firepit surrounded by four modern wood-and-black benches on a gravel patio in the woods", "A dedicated firepit gathering area with built seating."),
      ],
      evidenceNote: {
        label: "Source docx",
        stats: "Must-have list given as a flat 4-item list (\"Hot Tub, Fire pit, Outdoor Dining, String lights\") — no prevalence percentages or evidence citations are attached in the source material, unlike 4BR's dataset-derived stats.",
        caveat: "Presented as-is from the source; not independently re-derived from the raw CSV for this segment.",
      },
    },
    niceToHaveAmenities: {
      stronglyPreferred: ["Barrel sauna — the only nice-to-have item named in the source material"],
      optional: [],
      optionalNote: "The source docx names exactly one nice-to-have item; no stack-rank or scoring is given (unlike 4BR's ranked list).",
      images: [
        photo("1-2br/nice-to-have/barrel-sauna-lake-view.jpg", "Cedar barrel sauna interior with a round window framing a lake and forest view", "The one nice-to-have item named in the source material: a barrel sauna."),
        photo("1-2br/nice-to-have/barrel-sauna-interior.jpg", "Cedar barrel sauna interior with a semicircular window overlooking a lake", "A second barrel sauna example."),
      ],
    },

    executionStandards: {
      summary: "The source material's analyst notes are explicit that seclusion and photography style — not amenity count — are how properties in this segment compete for top-25% revenue.",
      required: [
        "An aerial shot capturing the property's seclusion, used as one of the hero images",
        "Photography during twilight hours as well as other times of day",
        "A POV shot from the hot tub toward the view",
        "String lights used to elevate picture quality",
        "Consistent shot quality across every picture in the listing",
      ],
      photoStandards: [],
      cheapMoves: ["Twilight/dusk photography", "String lights", "An aerial seclusion hero shot", "A POV hot-tub-to-view shot"],
      images: [
        photo("1-2br/photography/aerial-seclusion-hero.jpg", "Dramatic aerial drone shot of a lone cabin surrounded by dense woods", "The analyst notes call for exactly this: an aerial seclusion shot used as a hero image."),
        photo("1-2br/photography/twilight-firepit-river.jpg", "Firepit and Adirondack chairs strung with lights at dusk overlooking a river", "Twilight photography with string lights."),
        photo("1-2br/photography/night-cabin-string-lights.jpg", "Night photo of a cabin wrapped in string lights on two levels, with firepit chairs in the foreground", "Night photography with string lights carried across multiple levels."),
        photo("1-2br/photography/night-cabin-firepit-chairs.jpg", "Cabin at night lit by string lights with Adirondack firepit chairs in front", "A second night/string-light example, for consistency of shot quality across times of day."),
      ],
      designComps: {
        intro: "Design/Top-Designs evidence from the source material: three identified, CSV-verified comps plus supporting anonymous photography of high-design properties.",
        namedComps: [
          { name: "Lakeside | Hot/Cold Tub, Fireplaces, EV Charger", url: "https://www.airbnb.com/rooms/1295583158275567554", city: "Luray", zip: "22835", revenue: 111932, adr: 433.30, occupancy: 0.7122, sleeps: 4, rating: 4.85, reviews: 80, image: pendingPhoto("https://www.airbnb.com/rooms/1295583158275567554", "Lakeside") },
          { name: "25% Off ~ Hygge mountain retreat w/ stunning views", url: "https://www.airbnb.com/rooms/1312596219288823158", city: "New Market", zip: "22844", revenue: 98289, adr: 307.34, occupancy: 0.8785, sleeps: 4, rating: 4.95, reviews: 147, image: pendingPhoto("https://www.airbnb.com/rooms/1312596219288823158", "Hygge mountain retreat") },
          { name: "The Sparrow Luxury A-Frame w/Hot Tub in Shenandoah", url: "https://www.airbnb.com/rooms/935800937088550875", city: "Luray", zip: "22835", revenue: 93630, adr: 294.93, occupancy: 0.8724, sleeps: 4, rating: 4.95, reviews: 325, image: pendingPhoto("https://www.airbnb.com/rooms/935800937088550875", "The Sparrow Luxury A-Frame") },
        ],
        images: [
          photo("1-2br/design-comps/twilight-cabin-hottub-deck.jpg", "Dark board-and-batten cabin at twilight with a wraparound deck, string lights, hot tub, and dining table", "Design comp: a fully staged deck on a traditional cabin."),
          photo("1-2br/design-comps/aframe-dusk-swing-firepit.jpg", "White A-frame cabin at dusk with an illuminated interior and an outdoor swing bench and Adirondack chairs around a firepit under a wood pergola", "Design comp: an A-frame with a purpose-built firepit lounge."),
          photo("1-2br/design-comps/modern-cabin-cantilever-dusk.jpg", "Low-slung black modern cabin glowing at dusk, cantilevered over a rocky wooded hillside", "Design comp: a high-design modern cabin example."),
        ],
        alexandriaDesignUrl: "https://alexandria.strsearch.com/compsets?market=36&type=design&tag=de8367d9-e0ed-41be-89d5-11f4a9df464f",
      },
    },

    // Revenue tiers — photo-evidence mode (no named/metric comps per tier in
    // the source material; the high/mid/low comp folders are anonymous
    // evidence only, confirmed to have zero filename overlap with the CSV).
    revenueTiers: {
      mode: "photoEvidence",
      bands: [
        { key: "low", label: "Low", range: "$75,000", note: "Source docx gives no ADR/occupancy breakdown for this figure." },
        { key: "mid", label: "Mid", range: "$90,000", note: "Source docx gives no ADR/occupancy breakdown for this figure." },
        { key: "high", label: "High", range: "$100,000+", note: "Source docx gives no ADR/occupancy breakdown for this figure." },
      ],
      caution:
        "No named properties are attached to any of the three tiers in the source material — the high/mid/low comp photo folders are anonymous visual evidence only (filenames are meaningless UUIDs with zero overlap against the market CSV, confirmed by direct check). Do not read the photos below as revenue-verified comps the way the 4BR buy box's named comps are.",
      photoTiers: {
        high: [
          photo("1-2br/revenue-high/high-1-valley-panorama-firepit.jpg", "Golden-hour valley and mountain panorama with a firepit and Adirondack chairs", "High-tier revenue comp evidence (anonymous)."),
          photo("1-2br/revenue-high/high-2-modern-barn-sunset.jpg", "Dramatic black modern barn-style cabin at golden-hour sunset in an open valley with a hot tub visible", "High-tier revenue comp evidence (anonymous)."),
          photo("1-2br/revenue-high/high-3-hottub-valley-dusk.jpg", "Hot tub on a deck at dusk with a sweeping valley and mountain view, strung with lights", "High-tier revenue comp evidence (anonymous)."),
        ],
        mid: [
          photo("1-2br/revenue-mid/mid-1-aerial-aframe-forest.jpg", "Aerial shot of an A-frame cabin tucked into dense forest", "Mid-tier revenue comp evidence (anonymous)."),
          photo("1-2br/revenue-mid/mid-2-aframe-interior-view.jpg", "A-frame living room interior with an orange leather sofa and a mountain view through the gable window", "Mid-tier revenue comp evidence (anonymous)."),
          photo("1-2br/revenue-mid/mid-3-pov-mountain-view.jpg", "POV shot from a blanket-wrapped guest looking out at a mountain view", "Mid-tier revenue comp evidence (anonymous) — a POV shot toward the view, the exact photo style called for in the analyst notes."),
        ],
        low: [
          photo("1-2br/revenue-low/low-1-dark-hottub-shot.jpg", "Dark, low-quality indoor hot tub photo with purplish lighting", "Low-tier revenue comp evidence (anonymous) — a murky, poorly lit shot illustrating weak photography execution."),
          photo("1-2br/revenue-low/low-2-basic-cabin-gazebo-hottub.jpg", "Small orange cabin with a hot tub under a plain gazebo tent on cheap patio pavers", "Low-tier revenue comp evidence (anonymous) — functional but plainly presented."),
          photo("1-2br/revenue-low/low-3-aerial-rustcabin-valley.jpg", "Aerial view of a rust-roofed cabin in a mountain valley with stone terracing and a firepit with red plastic chairs", "Low-tier revenue comp evidence (anonymous) — a decent natural setting undercut by basic presentation."),
        ],
      },
      alexandriaRevenueUrl: "https://alexandria.strsearch.com/compsets?market=36&tag=3a9f27e1-35c1-4ea1-8656-d5a9f3a46b71",
    },

    analystNotes: [
      "The major ways these properties compete in the top 25% revenue tier are through seclusion and photography style, not through a longer amenity list. (verbatim intent, source docx)",
      "An aerial shot that captures the seclusion of the property, used as one of the hero pictures, will draw attention to the listing.",
      "Photograph the property during twilight hours along with other times of day.",
      "Include a POV shot from the hot tub toward the view.",
      "Use string lights to elevate picture quality.",
      "Keep the quality of shots consistent throughout all pictures.",
      "Seclusion is the top priority, evaluated before view quality — a property with excellent views, photography, and all must-have amenities will still underperform if it is not secluded.",
      "Waterfront's revenue lift does not outweigh the investment required to acquire it — do not pay a location premium for it on this segment.",
      "Do not use the 1-2BR market-wide median ($42,476, 342 listings) as the underwriting target — this buy box targets the seclusion-and-execution profile described above, the same convention used for the 4BR buy box.",
    ],

    acquisition: {
      status: "Acquisition underwriting pending",
      note: "Source docx lists a purchase-price field of \"400000k\" — almost certainly a typo for $400,000 given the segment's $75K-$100K+ revenue bands, but shown here with that caveat rather than silently corrected. No CapEx estimate, financing assumptions, or specific acquisition candidate is given in the source material.",
    },
  },


  // ---------------------------------------------------------------------------
  // The 3BR buy box — fully developed. Source of truth:
  // ifraham/3BR_BuyBox/3BR_Details_Docx.docx (12 numbered sections, each with
  // inline "IMAGE REFERENCES") plus the analysis notebook's own chart outputs
  // under ifraham/3BR_BuyBox/3br_deep_dive/ (04_amenity_prevalence.png and
  // 05_amenity_ranking.png were read directly for exact figures — see
  // webpage/assets/3br/SOURCE.md for the full file-by-file mapping and two
  // flagged inconsistencies within Ifraham's own source material). Two
  // sections of the docx are explicitly marked pending by Ifraham himself and
  // stay that way here: §11 Design Direction ("PENDING COMP-SET REVIEW... Do
  // not establish a final design thesis from the structured dataset alone")
  // and §12 Revenue/Design Comp Set ("PENDING... Do not: invent comps, infer
  // comp tiers, reuse the 4BR comp set, fabricate Airbnb links, establish
  // revenue targets from unrelated bedroom segments"). No dollar revenue
  // tiers/bands are shown for 3BR (unlike 4BR/1-2BR) because the source
  // explicitly forbids inventing them — only market-wide performance context,
  // clearly labeled as such.
  // ---------------------------------------------------------------------------
  {
    id: "3br",
    label: "3BR Buy Box",
    status: "developed",
    name: "Shenandoah 3BR",
    thesis:
      "Acquire a 3-bedroom property with 3+ bathrooms and credible sleeps 6-8 capacity, built around a hot tub and a real (if modest) game room, in one of three ZIPs shown to materially outperform the rest of the 3BR market.",
    atAGlance: {
      bedBath: "3 bedrooms / 3+ bathrooms preferred",
      sleeps: "6 minimum, target 6-8",
      heroMechanism: "Hot tub + game room, in a ZIP that matters (Bentonville 22610 / Stanley 22851 / Front Royal 22630)",
      revenue: "Market context only — top 25% threshold $69,585, top 10% threshold $85,095 (no buy-box dollar tiers; comp set pending)",
      primaryRequirement: "3+ bathrooms and one of the three identified priority ZIPs — both show the strongest measured link to Top 10% performance",
    },

    buyBoxSections: [
      "overview", "acquisitionSpec", "locationGuidance", "performanceContext",
      "mustHaveAmenities", "autoAdd", "niceToHaveAmenities", "geoConsiderations",
      "travelerICP", "designDirection", "revenueCompSet", "acquisition",
    ],

    overview: {
      statusBadge: "Evidence-backed recommendation — acquisition underwriting pending",
      thesis:
        "Acquire a 3-bedroom property with 3+ bathrooms and credible sleeps 6-8 capacity, built around a hot tub and a real (if modest) game room, in one of three ZIPs shown to materially outperform the rest of the 3BR market.",
      whyItWorks:
        "Bathroom count and location are the two strongest measured levers in this segment: 3+ bathrooms lifts the Top-25% hit rate to ≈49% (vs. ≈50.9K median revenue at 2 baths or fewer), and the three identified ZIPs combined reach a ≈29% Top-10% hit rate versus ≈6% for the rest of the market. Hot Tub and Game Room are the two amenities with the clearest revenue signal, but the source material is explicit that completeness of the amenity ecosystem is not yet proven here the way it is for 4BR — this segment's comp-set review has not happened yet.",
      heroImage: photo("3br/overview/hero-modern-cabin.avif", "Wood-slat modern cabin on stilts with floor-to-ceiling windows and a deck with dining table and grill", "The 3BR program: ordinary bones, a real deck program, and a coherent architectural identity."),
      chips: [
        { label: "3 bedrooms" },
        { label: "Sleeps 6-8" },
        { label: "3+ bathrooms preferred" },
        { label: "Hot tub required" },
        { label: "Game room required" },
        { label: "Bentonville / Stanley / Front Royal priority ZIPs" },
      ],
      revenueChips: [
        { label: "Top 25% threshold", value: "$69,585" },
        { label: "Top 10% threshold", value: "$85,095" },
      ],
    },

    acquisitionSpec: {
      required: [
        "3 bedrooms, sufficient to comfortably support a sleeps 6-8 target",
        "3+ bathrooms preferred — median revenue climbs from ≈$50.9K (≤2 baths) to ≈$69.3K (3+ baths), and Top-25% hit rate reaches ≈49% at 3+ baths",
        "Sleeps 6 is the practical minimum (11% Top-10% hit rate vs. 5% at sleeps 4-5); sleeps 7-8 (10%) and sleeps 9+ (8%) don't clearly improve on sleeps 6 — the objective is sufficient capacity, not maximizing guest count",
      ],
      preferred: [
        "Modern cabin or older cabin with a modernized interior, or an A-frame (per the docx's own text — see the caveat below)",
        "Polished, adult-quality bedrooms, using bedroom imagery to show both king/queen rooms and flexible higher-capacity sleeping where appropriate",
      ],
      images: [
        photo("3br/architectural/modern-cabin-1.avif", "Wood-slat modern cabin on stilts with floor-to-ceiling windows and a deck with dining table and grill", "Modern cabin example."),
        photo("3br/architectural/yurt-1.webp", "Round yurt-style cabin glowing at night, wrapped in string lights, with a raised walkway deck", "The source package's photo folders are only \"ModernCabin\" and \"Yurt\" — the docx text instead names \"Modern cabins, Older cabins with modern interior, A Frames\" as the three styles. Shown here as supplied; see assets/3br/SOURCE.md for this naming mismatch."),
        photo("3br/beds/king-bed-room.avif", "King bed room", "A king-bed bedroom, referenced in the source docx's bedroom-execution guidance."),
        photo("3br/beds/bunk-bed-room.avif", "Bunk bed room", "A bunk-bed bedroom, referenced in the source docx's bedroom-execution guidance."),
      ],
    },

    locationGuidance: {
      recommended: "Three ZIPs show a materially stronger link to Top 10% performance than the rest of the 3BR market: Bentonville 22610 (median ≈$74.4K, N=8, Top-25% hit rate 62%, Top-10% hit rate 38%), Stanley 22851 (≈$68.1K, N=16, 44%, 31%), and Front Royal 22630 (≈$62.3K, N=25, 36%, 24%). Combined, these three ZIPs reach a ≈29% Top-10% hit rate versus ≈6% for the rest of the market.",
      caution: "High inventory should not be confused with high performance — Luray, Shenandoah, and Basye remain important inventory concentrations for this segment, but they do not show the same Top-10% concentration as the three priority ZIPs above.",
      diligence: "An interactive per-ZIP map is available (see the link below) for further geographic cross-referencing.",
      interactiveMapUrl: "assets/3br/interactive-map.html",
    },

    // Section 4 of the docx — market-wide performance context, NOT a
    // buy-box-specific revenue target (the docx explicitly forbids setting
    // one until the comp-set review is done).
    performanceContext: {
      stats: [
        { label: "Usable 3BR listings", value: "259" },
        { label: "Top 25% threshold", value: "$69,585" },
        { label: "Top 10% threshold", value: "$85,095 (N=26)" },
        { label: "Top 10% Revenue index", value: "175", compare: "vs. market median = 100" },
        { label: "Top 10% ADR index", value: "128" },
        { label: "Top 10% Occupancy index", value: "142" },
      ],
      note: "The Top 10% wins through a combination of stronger ADR and stronger occupancy — not one alone. This is market-wide 3BR context (all 261 3BR listings market-wide have a median of $54,393), not a validated buy-box revenue target; see Revenue / Design Comp Set below for why no dollar tiers are shown.",
    },

    mustHaveAmenities: {
      items: [
        "Hot Tub",
        "Game Room / dedicated entertainment space",
      ],
      images: [
        photo("3br/must-have/hot-tub-1.avif", "Hot tub", "Hot Tub — the clearest Must-Have (100% prevalence in Top 10% 3BR listings)."),
        photo("3br/must-have/hot-tub-with-view.avif", "Hot tub with a view", "Hot Tub paired with a view."),
        photo("3br/must-have/game-room-yurt-pool-table.webp", "Yurt loft with a pool table beneath a domed skylight, overlooking a living area with a wood stove below", "Game Room — the second Must-Have. A realistic 3BR-scale game room: one pool table in a loft space, not a large dedicated arcade."),
        photo("3br/must-have/game-room-2.avif", "Game room", "Game Room example."),
      ],
      evidenceNote: {
        label: "Amenity-ranking chart (05_amenity_ranking.png)",
        stats: "Hot Tub: +77% matched revenue uplift, 100% Top-10% prevalence · Game Room: +57% matched revenue uplift, 62% Top-10% prevalence (up from 55% at Top 25%, 28% market-wide)",
        caveat: "\"Matched\" comparisons control for bathroom count (≤2 baths) per the source notebook; descriptive evidence, not proof of independent causality.",
      },
    },

    // Auto Add — a third amenity category distinct from must-have/nice-to-have,
    // per the docx's own framing: cheap to add post-acquisition, shouldn't
    // drive the purchase decision.
    autoAdd: {
      intro: "Framed explicitly in the source material as items that should generally not determine whether a property is purchased, because they are inexpensive or relatively easy to add after acquisition. Fire Pit and Outdoor Dining in particular are common across the whole market and should be treated as expected supporting features, not premium differentiators.",
      items: [
        "Fire Pit (86% market-wide prevalence — near-universal)",
        "Outdoor Dining Area (76% market-wide prevalence)",
        "Pack 'N Play / Travel Crib (51% market-wide prevalence)",
        "Crib (17% market-wide prevalence)",
      ],
      images: [
        photo("3br/auto-add/campfire-stump-seating.jpeg", "Firepit surrounded by a circle of tree-stump seats in a wooded clearing", "Fire pit — an Auto Add item, cheap to add post-acquisition."),
        photo("3br/auto-add/outdoor-dining.avif", "Outdoor dining area", "Outdoor Dining Area — an Auto Add item."),
        photo("3br/auto-add/outdoor-sitting-firepit-hottub.avif", "Outdoor seating, firepit, and hot tub", "Combined outdoor seating/firepit/hot tub area."),
        photo("3br/auto-add/firepit-2.avif", "Outdoor firepit", "Fire pit — an Auto Add item."),
      ],
    },

    // Nice-to-have, ranked directly from 05_amenity_ranking.png's own "sorted
    // by combined evidence" row order, each tagged with its evidence tier per
    // the docx's explicit instruction not to treat all candidates equally.
    niceToHaveAmenities: {
      stronglyPreferred: [
        "1. Sauna — Directional evidence (N=11, +53% revenue uplift, +22pt Top-10% uplift, 23% Top-10% recurrence)",
        "2. Movie Theater — Directional evidence (N=12, +38% revenue uplift, +24pt Top-10% uplift, 15% Top-10% recurrence)",
        "3. Pool Table — Stronger evidence (N=18, +36% revenue uplift, +11pt Top-10% uplift, 31% Top-10% recurrence)",
        "4. Gym — Stronger evidence (N=15, +46% revenue uplift, +15pt Top-10% uplift, 12% Top-10% recurrence)",
        "5. Mini Golf — Exploratory (N=6, -2% revenue but +24pt Top-10% uplift, 8% Top-10% recurrence — thin sample)",
      ],
      optional: [],
      optionalNote: "Ranked by the analysis notebook's own combined-evidence sort, per the docx's explicit instruction not to override it without a clear analytical reason. \"Stronger evidence\" / \"Directional\" / \"Exploratory\" are the source notebook's own confidence tiers, not this page's judgment.",
      images: [
        photo("3br/nice-to-have/sauna.avif", "Sauna", "Sauna — Nice-to-Have, Directional evidence tier."),
        photo("3br/nice-to-have/pool-table.avif", "Pool table", "Pool Table — Nice-to-Have, Stronger evidence tier."),
        photo("3br/nice-to-have/mini-golf.avif", "Mini golf", "Mini Golf — Nice-to-Have, Exploratory evidence tier (thin sample)."),
      ],
    },

    // Geo Considerations (docx §9) — includes one flagged text-vs-chart
    // inconsistency on Mountain View (see the note field).
    geoConsiderations: {
      intro: "Privacy/Seclusion is flagged in the source material as the most important geographic consideration for this traveler type, though the docx defers detailed evidence to the still-pending comp-set review.",
      factors: [
        {
          label: "Mountain View",
          stat: "44% prevalence market-wide → 38% at Top 25% → 27% at Top 10% (declining), ≈-3% matched-revenue relationship",
          note: "The source docx's own text claims \"Mountain View drive[s] revenue up massive\" — this contradicts its own chart data, which shows prevalence declining at higher revenue tiers. Shown here transparently rather than silently picking one; the docx also says a full answer is deferred to the (pending) comp-set analysis.",
          images: [
            photo("3br/geo/mountain-view-1.avif", "Mountain view", "Mountain View example."),
            photo("3br/geo/mountain-view-2.avif", "Mountain view", "Mountain View example."),
          ],
        },
        {
          label: "Waterfront / Lake",
          stat: "≈16% prevalence market-wide, ≈19% at Top 10% — a mild positive signal",
          note: "\"Not strong enough for the core Buy Box\" per the source material — not required.",
          images: [
            photo("3br/geo/lake-1.avif", "Lake view", "Waterfront/Lake example."),
            photo("3br/geo/lakefront-modern-cabin.avif", "Lakefront modern cabin", "Waterfront/Lake example — a modern cabin on the water."),
          ],
        },
        {
          label: "Privacy / Seclusion",
          stat: "Qualitative only in the source material — no prevalence chart supplied for this factor",
          note: "\"Most important for couple gateways [sic]... Rest of the details in Compset analysis.\" Kept qualitative here pending that still-unfinished comp-set review, per the source material's own instruction.",
          images: [
            photo("3br/geo/seclusion-1.jpeg", "Aerial view of a cabin roof barely visible within dense green forest canopy, reached by a gravel driveway", "Privacy/Seclusion — the docx defers detailed guidance to the still-pending comp-set review, but names this as most important for the target guest."),
            photo("3br/geo/seclusion-2.avif", "Secluded property", "Seclusion example."),
          ],
        },
      ],
    },

    travelerICP: {
      primary: "Couples and small families.",
      secondary: "Small groups, and pet travelers where appropriate.",
      stats: [
        { label: "3BR stayed-with-kids share", value: "23%", compare: "market-wide" },
        { label: "3BR group-trip share", value: "16%", compare: "market-wide" },
        { label: "3BR stayed-with-pet share", value: "21%", compare: "market-wide" },
        { label: "3BR market-wide median revenue", value: "$54,393", compare: "261 listings" },
      ],
      note: "The Top 10% traveler mix does not change dramatically from the market-wide mix above — the product should stay flexible rather than targeting only one traveler type. These are review-derived guest-composition signals, not verified traveler demographics.",
    },

    // Design Direction — explicitly pending in the source docx. Shown as a
    // pending badge only; the architectural photos that exist are presented
    // under Acquisition Spec instead, not here, so this section makes no
    // design-thesis claim.
    designDirection: {
      status: "Design Direction — pending comp-set review",
      note: "\"Do not establish a final design thesis from the structured dataset alone. This section should be completed after reviewing the actual 3BR revenue/design comps.\" (verbatim, source docx §11). Architectural-style reference photos that do exist in the source package are shown under Acquisition Spec above, not here, since a design thesis itself has not been written.",
    },

    // Revenue / Design Comp Set — explicitly pending in the source docx.
    revenueCompSet: {
      status: "Revenue / Design Comp Set — pending",
      note: "The dedicated 3BR comp set has not yet been added. Per the source docx §12, this page does not: invent comps, infer comp tiers, reuse the 4BR comp set, fabricate Airbnb links, or establish revenue targets from unrelated bedroom segments. See Performance Context above for market-wide 3BR statistics in the meantime — that is descriptive market context, not a validated buy-box comp set.",
    },

    acquisition: {
      status: "Acquisition underwriting pending",
      note: "No purchase-price figure is given anywhere in the source material for this buy box (unlike 1-2BR). No specific property has been screened, priced, or underwritten yet.",
    },
  },

  // ---------------------------------------------------------------------------
  // The 4BR buy box — fully developed.
  // ---------------------------------------------------------------------------
  {
    id: "4br",
    label: "4BR Buy Box",
    status: "developed",
    name: "Luxury Mountain / Log Cabin, 8-12 Guests",
    thesis:
      "Acquire a 4-bedroom luxury mountain or log-cabin property for roughly 8-12 guests and build it around a hot tub, fire pit, dedicated game/entertainment space, a real outdoor setting, and polished design and photography — a coherent group-retreat product, not a house with a hot tub added.",
    atAGlance: {
      bedBath: "4 true bedrooms / 3+ bathrooms preferred",
      sleeps: "8-12 guests (real-bed capacity, not padded)",
      heroMechanism: "Hot tub + fire pit + dedicated game/entertainment space in a real mountain setting",
      revenue: "Low acceptable $95K-$110K · Target $115K-$135K · Strong execution/upside $150K-$165K",
      primaryRequirement: "Wooded privacy, elevation, or river/mountain views, plus a coherent luxury-cabin identity and photo execution",
    },

    // Ordered dispatch list consumed by renderDeepDive/NARRATIVE_BLOCKS in render.js.
    buyBoxSections: [
      "overview", "acquisitionSpec", "finishedSpec", "locationGuidance", "travelerICP",
      "mustHaveAmenities", "executionStandards", "revenueTiers", "executionComparison",
      "counterexamples", "analystNotes", "acquisition",
    ],

    overview: {
      statusBadge: "Evidence-backed recommendation — acquisition underwriting pending",
      thesis:
        "Acquire a 4-bedroom luxury mountain or log-cabin property for roughly 8-12 guests and build it around a hot tub, fire pit, dedicated game/entertainment space, a real outdoor setting, and polished design and photography.",
      whyItWorks:
        "Across the reviewed 4BR comp set, the properties that reach the strong-execution/upside band all pair the same three amenities — hot tub, fire pit, game/entertainment space — with a real outdoor setting and design/photo execution that turns the setting into a bookable experience. What separates High from Mid execution is not which amenities are present (27 of 30 reviewed comps carry all three as table stakes); it is completeness and staging of the amenity ecosystem, plus a distinctive, repeatable photo identity.",
      heroImage: photo("4br/overview/hero-hottub-mountain-view.avif", "Hot tub on a deck overlooking a wooded mountain view", "The 4BR program: a hot tub anchored to a real mountain view, a fire pit, and a dedicated game room — not a house with a hot tub added."),
      chips: [
        { label: "4 true bedrooms" },
        { label: "Sleeps 8-12" },
        { label: "3+ bathrooms preferred" },
        { label: "Hot tub required" },
        { label: "Fire pit required" },
        { label: "Game/entertainment space required" },
        { label: "Wooded / elevated / river-adjacent setting" },
        { label: "Log, cabin, A-frame, or modern-mountain architecture" },
      ],
      revenueChips: [
        { label: "Low acceptable", value: "$95K-$110K" },
        { label: "Target", value: "$115K-$135K" },
        { label: "Strong execution / upside", value: "$150K-$165K" },
      ],
    },

    // Acquisition spec
    acquisitionSpec: {
      required: [
        "4 true bedrooms, with layout quality sufficient to avoid padded sleeping capacity",
        "Bathroom count/layout supporting group stays; 3+ baths preferred",
        "A coherent sleeping plan — adult-quality bedrooms plus practical overflow/kid-friendly bedding, without becoming a bunkhouse",
        "A strong outdoor setting: wooded privacy, mountain/valley views, elevation, or river proximity",
        "Outdoor gathering potential for a hot tub, fire pit, seating, dining, lighting, and nighttime photography",
        "Buildable deck/patio geometry to place the hot tub and seating at a view corner, tree-line edge, or photo-ready focal point",
        "Interior space for a dedicated game/entertainment area, existing or convertible",
        "Parking/access suitable for group travel — mountain- or gravel-road access evaluated pre-acquisition",
        "Address-level confirmation of STR legality, HOA status, septic/well capacity, occupancy limits, and permitting",
      ],
      preferred: [
        "Log, cabin, A-frame, chalet, or modern-mountain architecture that already photographs as a destination product",
        "Vaulted ceilings, exposed timber, large windows, decks, or screened porches as built-in photo hooks",
        "Proximity to Shenandoah National Park, Luray Caverns, Bryce/Massanutten-style resort demand, river outfitters, or wine country, where comps support it",
        "Cheaply upgradable exterior surfaces (stone/masonry accents, a coordinated front-door color, a cohesive dark/wood palette)",
        "Evidence of a repeat operator running the same amenity formula nearby — same-host sibling comps strengthen reproducibility confidence",
      ],
      images: [
        photo("4br/architectural/bearloga-exterior.avif", "Log-and-stone mountain cabin exterior", "Bearloga — log-and-stone cabin architecture, the core visual identity of this buy box."),
        photo("4br/architectural/alpine-aframe-exterior.avif", "A-frame cabin exterior with large glass gable", "Alpine A-Frame — a reproducible A-frame silhouette, a valid architectural variant."),
      ],
    },

    // Finished STR spec
    finishedSpec: {
      sleepCount: "Underwrite to credible real-bed capacity within the 8-12 guest range — do not pad capacity with living-room sofa beds. Indoor gathering and dining capacity must stay coherent with sleep capacity.",
      backyard: "Lot size alone does not establish usable outdoor space. The yard must support hot tub + fire pit + seating + dining as one coordinated, staged experience, with safe circulation between zones and privacy/screening appropriate for group use.",
      images: [
        photo("4br/sleep-count/riverside-rose-beds.avif", "Bedroom with real beds in a log cabin", "Riverside Rose — credible, real-bed sleeping capacity."),
        photo("4br/sleep-count/midnight-mist-bunk-beds.avif", "Bunk beds in a mountain cabin bedroom", "Midnight Mist Vista — built-in bunk capacity without padding the sleep count with sofa beds."),
        photo("4br/backyard/midnight-mist-vista-zoning.avif", "Backyard with firepit seating and a mini-golf green against a mountain view", "Midnight Mist Vista — firepit seating and mini-golf sharing one zoned backyard."),
        photo("4br/backyard/bearloga-secluded-setting.avif", "Wooded, secluded mountain property", "Bearloga — a private, wooded setting on 75 acres."),
        photo("4br/backyard/wait-free-golf-backyard.avif", "Backyard gathering space with mountain backdrop", "A coordinated backyard gathering zone with a mountain backdrop."),
      ],
    },

    // Location guidance
    locationGuidance: {
      recommended: "Rileyville (22650) carries the strongest 4BR-specific signal in the market — thin overall sample, but 100% strong-amenity-stack share among its 4BR listings and a $164,209 max. Stanley (22851) is the strongest market-wide priority ZIP. Shenandoah (22849) and Front Royal (22630) are both valid but analytically different: Shenandoah fits the mountain-cabin pool directly, while Front Royal is more of a DC-access/wine-country-adjacent submarket.",
      caution: "Mount Jackson (22842) and Basye (22810) are valid resort/lake/cabin markets, but the investment case there must come from full amenity-stack execution, not resort proximity alone. Luray (22835) has the deepest inventory (182 listings) but only a 7.7% top-decile share — depth, not automatic premium.",
      diligence: "Waterfront is a premium only when paired with strong design, amenity depth, and guest satisfaction — not a substitute for execution. Bundled resort passes are an operating-model choice, not a property feature, and should not be read as location advantage. Gravel/mountain-road access, internet connectivity, flood-prone bridges, and noise disclosures require address-level diligence.",
    },

    // Guest profile and capacity
    travelerICP: {
      primary: "Mixed family and friend groups on a multi-day mountain retreat — not a narrow single-demographic buyer.",
      secondary: "Multi-couple trips and selectively pet-including mountain weekends; the group-trip share is the single clearest demographic signal that distinguishes 4BR from smaller segments.",
      stats: [
        { label: "4BR group-trip share", value: "34.3%", compare: "vs. 15.8% for 3BR and 2.1% for 2BR" },
        { label: "4BR stayed-with-kids share", value: "26.8%", compare: "vs. 22.8% for 3BR" },
        { label: "4BR stayed-with-a-pet share", value: "19.6%" },
        { label: "4BR median revenue", value: "$66,546", compare: "N=144 listings" },
      ],
      note: "These are review-derived guest-composition signals (share of reviews mentioning kids/group trips/pets), not verified traveler demographics. Guidance: don't chase sleep count beyond the 8-12 range — sleeps 11+ 4BR listings reach a higher median ($79,645) but real-bed layout quality, not maximum advertised capacity, is what should drive the decision.",
    },

    // Amenity stack (must-have / nice-to-have)
    mustHaveAmenities: {
      items: [
        "Hot tub — the strongest, most stable signal; central to the mountain-cabin guest promise (present in 27 of 30 reviewed comps)",
        "Fire pit — near-universal among top performers; omission drops the product below the demonstrated market standard",
        "Dedicated game/entertainment space — arcade, pool table, foosball, theater, poker, or a broader game room; the core rainy-day/group-trip feature",
        "A strong outdoor setting — views, privacy, woods, or river/resort access repeatedly show up in the winners",
        "Polished design and a photographable identity — execution quality is what separates true comps from thin listings with decent land",
      ],
      images: [
        photo("4br/must-have/mattis-hottub.avif", "Hot tub on a mountain cabin deck", "A hot tub placed to face the view, not the parking pad."),
        photo("4br/must-have/bearloga-firepit.avif", "Firepit with matched Adirondack chairs", "Bearloga — matched firepit seating as the evening gathering anchor."),
        photo("4br/must-have/willow-ridge-game-room.webp", "Game room with pool table and arcade games", "Willow Ridge — a real, dedicated game/entertainment room."),
        photo("4br/must-have/fox-hound-poker-room.avif", "Poker table game room", "Fox & Hound Cabin — a purpose-built poker/game room."),
        photo("4br/must-have/midnight-mist-movie-theater.avif", "Home theater room with reclining seats", "Midnight Mist Vista — a dedicated home-theater room as part of a dense entertainment stack."),
        photo("4br/must-have/riverfront-lux-hottub.avif", "Hot tub on a riverfront property deck", "Hot tub sited on a river-facing deck."),
      ],
      evidenceNote: {
        label: "30-comp manual review",
        stats: "Hot tub, fire pit, and game/entertainment space present together in 27 of 30 reviewed 4BR comps.",
        caveat: "Table-stakes prevalence among reviewed comps, not proof of independent causality — see Execution Comparison below for what actually separates tiers.",
      },
    },
    niceToHaveAmenities: {
      stronglyPreferred: [
        "Sauna — the strongest premium add-on, especially as part of a wellness pairing with the hot tub",
        "Additional game-room density (pool table, arcade, shuffleboard) layered on top of the base entertainment space",
        "Mini golf or another photographable outdoor activity, when the lot supports it",
      ],
      optional: [
        "Cold plunge, paired with sauna + hot tub as a wellness trio",
        "Lake, resort, or true river-outfitter access",
        "EV charger — a low-cost convenience differentiator, not a primary revenue thesis",
        "A-frame silhouette or another distinctive architectural hook",
        "Seasonal pool or pickleball court — opportunistic, not a requirement",
      ],
      optionalNote: "Differentiators, not requirements — outdoor dining is part of the finished product but is table-stakes rather than a winner-separator in this comp set.",
      images: [
        photo("4br/nice-to-have/fox-hound-cold-plunge.avif", "Outdoor cold plunge tub", "Fox & Hound Cabin — cold plunge paired with hot tub and sauna (the wellness trio)."),
        photo("4br/nice-to-have/fox-hound-sauna.avif", "Barrel-style sauna on a deck", "Fox & Hound Cabin — a photogenic barrel sauna."),
        photo("4br/nice-to-have/midnight-mist-minigolf.avif", "Backyard mini-golf green", "Midnight Mist Vista — mini-golf as a photographable outdoor activity."),
        photo("4br/nice-to-have/blue-ridge-minigolf.jpeg", "Backyard putting green with mountain view", "Blue Ridge Mountain Lodge — a private mini-golf green with a mountain backdrop."),
        photo("4br/nice-to-have/bearloga-sauna-wellness.avif", "Hot tub deck beside a wooded view", "Bearloga — hot tub and sauna paired as a wellness moment."),
        photo("4br/nice-to-have/mountainview-ev-hottub-view.webp", "Hot tub on an elevated deck facing a mountain view", "4BR Mountainview — elevated deck hot tub placement turning the view into a bookable amenity."),
      ],
    },

    // Execution and photo standards
    executionStandards: {
      summary: "What separates High from Mid execution in this comp set is not which amenities are present — it is completeness and staging of the amenity ecosystem, plus a real indoor entertainment room and a distinctive, repeatable photo identity.",
      required: [
        "Hot tub placement that connects to the setting — a view, privacy, a deck edge, or a tree line — not a tub on a generic slab",
        "Fire pit seating as a matched set coordinated with the design language, not mismatched patio leftovers",
        "Deck/fire-pit lighting built into the plan, especially railing string lights",
        "Game rooms programmed as real group spaces, not a converted afterthought — light branding/naming is a cheap differentiator",
        "A default toward a photogenic barrel sauna unless layout, permitting, or durability dictates otherwise",
      ],
      photoStandards: [
        "A dusk/twilight hero photo with interior lights on and at least one outdoor amenity visibly active",
        "Hot tub, fire pit, game room, bedrooms, dining, and the outdoor setting shot as bookable experiences, not inventory documentation",
        "Winter/shoulder-season photos where possible, to frame the property as a year-round retreat",
        "For A-frame/vaulted-ceiling properties: a wide, low, upward-angle 'money shot' toward the ridge beam or skylight",
        "Titles and captions substantiated by the actual photos and description — do not claim suites, riverfront, or resort access the listing can't back up",
      ],
      cheapMoves: [
        "Dusk/twilight photo shoot",
        "Matched Adirondack/firepit chair seating",
        "Deck-railing string lights",
        "Visible firewood staging",
        "Simple game-room signage or naming",
        "An exterior accent upgrade — a red door, a stone base, or a coordinated palette",
      ],
      images: [
        photo("4br/design-playbook/alpine-aframe-vaulted-interior.jpeg", "A-frame interior with vaulted ceiling and exposed beams", "Alpine A-Frame — the vaulted-ceiling 'money shot' works at both the $107K and $285K ends of the market."),
        photo("4br/design-playbook/hygge-river-house-twilight.avif", "Cabin exterior lit up at twilight", "Hygge River House — a twilight/dusk hero photo, a cheap, repeatable execution move. (Design-pattern reference only; not in the underwriting comp set.)"),
        photo("4br/design-playbook/mountainview-aerial-seclusion.jpeg", "Aerial view of a secluded mountain property", "4BR Mountainview — wooded seclusion and elevation as the setting hook."),
        photo("4br/design-playbook/island-in-the-sky-pool-hottub.avif", "Pool and hot tub sharing a deck with a mountain view", "Shenandoah Oasis / Island in the Sky — pool and hot tub sharing one view-facing deck."),
      ],
    },

    // Revenue tiers and core comps (underwriting bands)
    revenueTiers: {
      mode: "namedComps",
      bands: [
        { key: "low", label: "Low acceptable", range: "$95,000-$110,000", note: "Minimum investable version, if the core stack and execution standard are present." },
        { key: "target", label: "Target", range: "$115,000-$135,000", note: "Base case for a well-executed, reproducible 4BR cabin." },
        { key: "strong", label: "Strong execution / upside", range: "$150,000-$165,000", note: "Credible upside when setting, design, amenity density, and listing execution all work together." },
      ],
      caution:
        "Non-4BR listings must never be used to set 4BR revenue tiers or underwriting ranges. The market-wide 4BR median ($66,546) is descriptive market context, not the underwriting target — this buy box is built around the investable-winner profile below, not the median.",
      comps: [
        { name: "Midnight Mist Vista", tier: "strong", propertyId: "abnb_1296751406113933721", url: "https://www.airbnb.com/rooms/1296751406113933721", revenue: 164209, adr: 599.37, occupancy: 0.7493, city: "Rileyville", zip: "22650", sleeps: 14, baths: 3, rating: 5.0, reviews: 107, why: "Full-stack cabin — hot tub, fire pit, sauna, mini-golf, home theater, and dense game-room execution.", image: photo("4br/core-comp-set/midnight-mist-vista-card.avif", "Cabin exterior with backyard mountain view", "Midnight Mist Vista.") },
        { name: "Bearloga", tier: "strong", propertyId: "abnb_52334746", url: "https://www.airbnb.com/rooms/52334746", revenue: 156104, adr: 647.12, occupancy: 0.6593, city: "Stanley", zip: "22851", sleeps: 10, baths: 3.5, rating: 4.95, reviews: 308, why: "Proven luxury log-home formula — hot tub, sauna, game amenities, 75 acres, long review history (308 reviews).", image: photo("4br/core-comp-set/bearloga-card.avif", "Mountain view from a cabin deck", "Bearloga.") },
        { name: "Willow Ridge", tier: "strong", propertyId: "abnb_1424773512778667049", url: "https://www.airbnb.com/rooms/1424773512778667049", revenue: 156746, adr: 526.55, occupancy: 0.8171, city: "Mount Jackson", zip: "22842", sleeps: 8, baths: 2, rating: 5.0, reviews: 103, why: "Reproducible modern cabin near Bryce Resort — hot tub, sauna, bocce, game room, strong new-build execution.", image: photo("4br/core-comp-set/willow-ridge-card.avif", "Modern mountain cabin exterior", "Willow Ridge.") },
        { name: "Riverfront Lux", tier: "target", propertyId: "abnb_1439425354163690143", url: "https://www.airbnb.com/rooms/1439425354163690143", revenue: 136268, adr: 482.27, occupancy: 0.7756, city: "Rileyville", zip: "22650", sleeps: 8, baths: 4, rating: 4.9, reviews: 60, why: "Riverfront cabin with hot tub, game room, and grill — occupancy-led execution.", image: photo("4br/core-comp-set/riverfront-lux-card.avif", "Riverfront cabin exterior", "Riverfront Lux.") },
        { name: "Riverside Rose", tier: "target", propertyId: "abnb_796440212030201837", url: "https://www.airbnb.com/rooms/796440212030201837", revenue: 134946, adr: 608.06, occupancy: 0.6065, city: "Rileyville", zip: "22650", sleeps: 12, baths: 3.5, rating: 4.95, reviews: 180, why: "Log cabin, hot tub, fire pit, foosball, arcade, ping pong, seclusion, established review base.", flag: "Carries an Exclude_Comp flag in the underlying market CSV (reason not documented in the source data) — shown here transparently for its documented product narrative, not silently dropped.", image: photo("4br/core-comp-set/riverside-rose-card.avif", "Aerial view of a secluded log cabin", "Riverside Rose.") },
        { name: "Shenandoah Oasis / Island in the Sky", tier: "target", propertyId: "abnb_1217651188906565322", url: "https://www.airbnb.com/rooms/1217651188906565322", revenue: 133933, adr: 742.42, occupancy: 0.474, city: "Fort Valley", zip: "22652", sleeps: 12, baths: 3.5, rating: 5.0, reviews: 76, why: "Pool and hot tub sharing one view-facing deck; the ADR-led path to strong-tier revenue.", image: photo("4br/core-comp-set/island-in-the-sky-card.avif", "Firepit seating facing a mountain view", "Shenandoah Oasis / Island in the Sky.") },
        { name: "Wildflower Lodge", tier: "target", propertyId: "abnb_54035358", url: "https://www.airbnb.com/rooms/54035358", revenue: 127576, adr: 463.39, occupancy: 0.7535, city: "Front Royal", zip: "22630", sleeps: 8, baths: 3.5, rating: 4.95, reviews: 192, why: "Large, reproducible cabin — hot tub, fire pit, sauna, pool table, arcade, fenced dog yard.", image: photo("4br/core-comp-set/wildflower-lodge-card.avif", "Aerial view of a mountain lodge", "Wildflower Lodge.") },
        { name: "4BR Mountainview EV Charger", tier: "target", propertyId: "abnb_1147922366147203973", url: "https://www.airbnb.com/rooms/1147922366147203973", revenue: 126128, adr: 513.90, occupancy: 0.676, city: "Luray", zip: "22835", sleeps: 10, baths: 3, rating: 4.95, reviews: 75, why: "Elevated-deck hot tub placement turning the view into a bookable amenity, plus EV charger.", image: photo("4br/core-comp-set/mountainview-ev-card.avif", "Mountain cabin exterior with EV charger", "4BR Mountainview EV Charger.") },
        { name: "Blue Ridge Mountain Lodge", tier: "target", propertyId: "abnb_1020402077181386371", url: "https://www.airbnb.com/rooms/1020402077181386371", revenue: 119973, adr: 415.30, occupancy: 0.792, city: "Shenandoah", zip: "22849", sleeps: 8, baths: 2, rating: 4.85, reviews: 145, why: "Full winning formula — hot tub, fire pit, sauna, private mini-golf, arcade, bumper pool, darts, a strong visual hook.", image: photo("4br/core-comp-set/blue-ridge-mountain-lodge-card.avif", "Aerial view of a mountain cabin property", "Blue Ridge Mountain Lodge.") },
        { name: "Fox & Hound Cabin", tier: "low", propertyId: "abnb_1450060606313924524", url: "https://www.airbnb.com/rooms/1450060606313924524", revenue: 112839, adr: 387.03, occupancy: 0.8006, city: "Mount Jackson", zip: "22842", sleeps: 10, baths: 2, rating: 4.95, reviews: 99, why: "Hot tub, sauna, cold plunge, fire pit, poker table, outdoor movie corner, EV charger, dog-friendly.", image: photo("4br/core-comp-set/fox-hound-card.avif", "Aerial view of a mountain cabin property", "Fox & Hound Cabin.") },
        { name: "Alpine A-Frame", tier: "low", propertyId: "abnb_844353438862794066", url: "https://www.airbnb.com/rooms/844353438862794066", revenue: 107472, adr: 440.41, occupancy: 0.6714, city: "Mount Jackson", zip: "22842", sleeps: 10, baths: 3, rating: 4.95, reviews: 176, why: "Reproducible A-frame silhouette, hot tub, fire pit, entertainment loft, deck, normal renovation complexity.", image: photo("4br/core-comp-set/alpine-aframe-card.avif", "Hot tub beside an A-frame cabin", "Alpine A-Frame.") },
        { name: "Mattis Mtn Getaway", tier: "low", propertyId: "abnb_960301081071705541", url: "https://www.airbnb.com/rooms/960301081071705541", revenue: 94900, adr: 330.20, occupancy: 0.7867, city: "Stanley", zip: "22851", sleeps: 8, baths: 2.5, rating: 4.9, reviews: 206, why: "Hot tub, fire pit, arcade — reaches the low-acceptable band through strong occupancy rather than ADR.", image: photo("4br/must-have/mattis-hottub.avif", "Hot tub on a mountain cabin deck", "Mattis Mtn Getaway.") },
        { name: "Basye Wellness Retreat", tier: "low", propertyId: "abnb_1520524185536261027", url: "https://www.airbnb.com/rooms/1520524185536261027", revenue: 104202, adr: 525.89, occupancy: 0.6957, city: "Basye", zip: "22810", sleeps: 10, baths: 3, rating: 4.95, reviews: 51, why: "Hot tub, fire pit, sauna, cold plunge, shuffleboard, foosball, arcade, Lake Laura proximity. No stored photo yet.", image: pendingPhoto("https://www.airbnb.com/rooms/1520524185536261027", "Basye Wellness Retreat") },
        { name: "Cascade Falls", tier: "low", propertyId: "abnb_1061776089508455982", url: "https://www.airbnb.com/rooms/1061776089508455982", revenue: 94305, adr: 444.46, occupancy: 0.5765, city: "Rileyville", zip: "22650", sleeps: 12, baths: 3, rating: 4.95, reviews: 105, why: "New-build cabin, views, hot tub, fire pit, foosball, ping pong, creek sounds, reproducible execution. No stored photo yet.", image: pendingPhoto("https://www.airbnb.com/rooms/1061776089508455982", "Cascade Falls") },
      ],
      ceilingComps: [
        { name: "Ava A-Frame", propertyId: "abnb_1049831925260563667", url: "https://www.airbnb.com/rooms/1049831925260563667", revenue: 285252, adr: 811.53, occupancy: 0.9638, city: "Stanley", zip: "22851", why: "A viral architectural statement — hidden doors, spiral stair, home theater, sunken stargazing bed, archery, custom-build complexity. Only 2 baths/8 guests. A genuine outlier, not a template." },
        { name: "Hemlock Haven Luxe Log Home", propertyId: "abnb_1084818605950360575", url: "https://www.airbnb.com/rooms/1084818605950360575", revenue: 173607, adr: 560.74, occupancy: 0.84, city: "Bentonville", zip: "22610", why: "5,000+ sq ft estate-scale log home — 4.5 baths, private gym, sauna, saloon bar, acreage. Notably has no hot tub.", image: photo("4br/premium-references/hemlock-haven-exterior.avif", "Large log home estate exterior", "Hemlock Haven — a ceiling reference, not underwritten.") },
        { name: "Riverfront Retreat on 14 Acres", propertyId: "abnb_41934636", url: "https://www.airbnb.com/rooms/41934636", revenue: 108903, adr: 621.69, occupancy: 0.4729, city: "Woodstock", zip: "22664", why: "5,000+ sq ft group lodge on 14 acres with a private beach, but access crosses a flood-prone low-water bridge and occupancy is only 47%." },
      ],
      note: "Ceiling/reference comps demonstrate upside and design inspiration but should not set the normal 4BR underwriting target — their economics (viral architecture, estate scale, or access constraints) are not reproducible at the target acquisition price.",
    },

    // High/mid/low execution comparison (separate lens from the underwriting bands
    // above — this groups the same comp set by relative execution quality per
    // buy-box/4BR-Tier-Diagnosis-High-Mid-Low.md's ranked-comp bands).
    executionComparison: {
      intro: "A separate lens on the same comp set: relative execution quality (High/Mid/Low), not the dollar underwriting bands above. What separates High from Mid is completeness and staging of the amenity ecosystem — not which amenities are present.",
      high: {
        label: "High execution",
        description: "Complete amenity ecosystems staged as one experience (a hot tub + sauna 'wellness tableau', a deck-as-view-corridor), a real indoor entertainment room, and a distinctive, repeatable photo identity — dusk/twilight hero shots, cross-seasonal photo sets.",
        examples: "Midnight Mist Vista, Bearloga, Willow Ridge, Riverfront Lux, Riverside Rose, Shenandoah Oasis / Island in the Sky, Wildflower Lodge",
        images: [
          photo("4br/core-comp-set/bearloga-card.avif", "Mountain view from a cabin deck", "Bearloga — High execution."),
          photo("4br/core-comp-set/willow-ridge-card.avif", "Modern mountain cabin exterior", "Willow Ridge — High execution."),
        ],
      },
      mid: {
        label: "Mid execution",
        description: "The same core amenity stack, competently but less distinctively presented — a functional-but-disconnected outdoor layout instead of one staged zone, cleaner but less bold design choices.",
        examples: "4BR Mountainview EV Charger, Blue Ridge Mountain Lodge, Fox & Hound Cabin, Alpine A-Frame",
        images: [
          photo("4br/core-comp-set/blue-ridge-mountain-lodge-card.avif", "Aerial view of a mountain cabin property", "Blue Ridge Mountain Lodge — Mid execution."),
          photo("4br/core-comp-set/alpine-aframe-card.avif", "Hot tub beside an A-frame cabin", "Alpine A-Frame — Mid execution."),
        ],
      },
      low: {
        label: "Low execution",
        description: "Not one failure mode — the minimum viable amenity stack is often still intact; low tier is mostly lower-ADR, not lower-quality. A minority of Low-tier comps show real weak-execution or operating-model warnings — see Counterexample Boundaries below for the two that do.",
        examples: "Mattis Mtn Getaway, Basye Wellness Retreat, Cascade Falls",
        images: [
          photo("4br/core-comp-set/mattis-card.avif", "Game room with arcade cabinet", "Mattis Mtn Getaway — Low execution."),
        ],
      },
    },

    // Counterexample boundaries
    counterexamples: [
      {
        name: "Mountain Retreat \"4BR Suites\"",
        propertyId: "abnb_630430453991011777",
        url: "https://www.airbnb.com/rooms/630430453991011777",
        revenue: 94036,
        city: "Elkton",
        zip: "22827",
        role: "Weak-execution counterexample",
        explanation: "The title claims \"Suites,\" but the sleep plan is bunk-heavy (only 2 of 4 rooms have a king) and one advertised sleep space is a sofa pull-out, not a true bedroom. No hot tub is confirmed anywhere on the listing. Cleanliness is the weakest sub-score in the comp set (4.5) with recent complaints. The property's 62 acres and 360° views likely carry its revenue, not its amenity stack or execution — do not use it to set any part of the amenity floor.",
        images: [
          photo("4br/counterexamples/mountain-retreat-padded-capacity.avif", "Sofa pull-out bed in a living room", "A sofa pull-out counted toward advertised sleep capacity, not a true bedroom."),
          photo("4br/counterexamples/mountain-retreat-living-room.avif", "Generic living room", "Functional but generic — no hot tub confirmed anywhere on the listing."),
          photo("4br/counterexamples/mountain-retreat-aerial.avif", "Aerial view of a mountain property", "62 acres and 360° views likely carry revenue here, not the amenity stack."),
        ],
      },
      {
        name: "Shenandoah Riverfront \"Brand New\"",
        propertyId: "abnb_1430005259466803471",
        url: "https://www.airbnb.com/rooms/1430005259466803471",
        revenue: 103148,
        city: "Shenandoah",
        zip: "22849",
        role: "Early-tenure caution — explicitly NOT a weak-execution example",
        explanation: "A real, well-reviewed riverfront product with a confirmed hot tub and fire pit, a Superhost badge, and a 4.96 rating — but it discloses Shenandoah Speedway noise, one soft sleep space (a pull-out/twin rather than a true 4th bedroom), and only one year of hosting history (44 reviews). Its comparatively low revenue reflects tenure and disclosed noise, not poor execution — do not read this as a design failure.",
        images: [
          photo("4br/counterexamples/shenandoah-riverfront-brand-new-aerial.avif", "Aerial view of a new riverfront cabin", "A real, well-reviewed riverfront product still building tenure."),
        ],
      },
      {
        name: "Bryce Resort Home (\"Wait...FREE Golf, Lake & MTB\")",
        propertyId: "abnb_1271557975363420817",
        url: "https://www.airbnb.com/rooms/1271557975363420817",
        revenue: 126112,
        city: "Basye",
        zip: "22810",
        role: "Non-transferable revenue — operating-model caution",
        explanation: "Revenue here is substantially tied to six free daily resort passes (roughly $600/day in bundled value) — an operating-model choice tied to a specific resort relationship, not a reproducible property feature. Do not use this listing's revenue to set the amenity floor for a property without that same resort arrangement.",
        images: [
          photo("4br/core-comp-set/wait-free-golf-card.avif", "Aerial view of a mountain property near a golf course", "Bundled resort-pass revenue is an operating-model choice, not a property feature."),
        ],
      },
    ],

    analystNotes: [
      "Underwrite from the reviewed 4BR comp set only — non-4BR listings (3BR, 5BR, 6BR+ yurts, cabins, and estates) can confirm product logic (a wellness pairing, an A-frame silhouette, an outdoor-game pattern) but must never set 4BR revenue tiers or underwriting ranges.",
      "Do not underwrite to the 4BR market-wide median ($66,546) — target the investable-winner profile described above instead.",
      "Do not use weakly executed or missing-amenity listings as an underwriting floor; they are more useful as counterexamples (see Counterexample Boundaries).",
      "Do not let Ava A-Frame, Hemlock Haven, or the 14-acre riverfront lodge's economics define the normal 4BR target — all three are ceiling/reference comps, not templates.",
      "Do not treat waterfront, resort access, acreage, or views as substitutes for execution — they are premiums only when paired with design, amenity depth, and guest satisfaction.",
      "Revenue figures throughout this deep dive are gross Revenue Potential benchmarks from the market dataset, not a full underwriting model — no net income, acquisition price, improvement budget, or cash-on-cash return has been established for any candidate property.",
    ],

    acquisition: {
      status: "Acquisition underwriting pending",
      note: "No specific property has been screened, priced, or underwritten against this buy box yet. Purchase-price guidance, CapEx estimates, and a specific acquisition candidate are not yet available and are not shown here rather than estimated.",
    },
  },
];

// ---------------------------------------------------------------------------
// Section 5 — Additional buy boxes pending. Empty: both analysts named in the
// original brief (Ifraham, Walid) have delivered, alongside the original 4BR
// work — all three are now developed buy boxes above. No further segment has
// been named, so nothing is shown as pending; this is a completion state, not
// a placeholder.
// ---------------------------------------------------------------------------
const PENDING_BUY_BOXES = [];
const PENDING_BUY_BOXES_NOTE =
  "All planned buy boxes are complete: 1-2BR, 3BR, and 4BR are each fully developed above, ordered ascending by bedroom count.";
