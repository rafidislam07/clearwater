/**
 * Central content/config layer for the Clearwater-Largo-Seminole market-evaluation
 * presentation webpage.
 *
 * This is the ONLY place buy-box specs, featured comps, revenue tiers, Alexandria
 * links, Zillow candidates, and analyst notes should live. Rendering code
 * (render.js, map.js, charts.js) reads from this file; it never hardcodes content.
 *
 * SOURCE OF TRUTH: every 4BR figure traces to a canonical project file as of 2026-08-23
 * (LLM_CONTEXT.md, MANUAL_LISTING_REVIEW_LOG.md, PHASE_09_PROVISIONAL_4BR_BUY_BOXES.md,
 * PHASE_09_COMP_ROLE_SELECTION.md, the Phase 1-4/6 tables). Every 3BR figure traces to
 * Walid's supplied package (~/repos/clearwater/walid/Clearwater_Buy_Box_3BR/, integrated
 * 2026-08-23) - see webpage/assets/3br/SOURCE.md for the file-by-file mapping. Every 5BR
 * amenity/design figure traces to Ifraham's supplied package
 * (~/repos/clearwater/ifraham/BuyBox_5BR/, specifically BuyBoxDetailsText.pdf's Must
 * Haves/Automatically Add/Nice to Have-Ranked/Design Direction text, integrated
 * 2026-08-24) - see webpage/assets/5br/SOURCE.md for the file-by-file mapping. 5BR's
 * revenue/purchase-price/geography/regulations fields have no buy-box-specific source yet
 * (Ifraham's package only supplied amenity/design evidence, not a comp set) and are marked
 * pending rather than filled with invented figures; the market-wide 5BR benchmark shown in
 * its Revenue Potential section is this project's own existing Phase 2 figure, explicitly
 * labeled as market-wide, not a validated buy-box comp. Nothing here is invented. Where a
 * canonical/supplied source does not yet have an answer (Alexandria links for every
 * developed box; Zillow candidates; CapEx/underwriting), the field is explicitly
 * null/pending/omitted - never filled with placeholder prose or numbers.
 *
 * Two image reference shapes are supported (see render.js `renderImage`): a bare
 * property-ID string (renders a "photo pending, link to Airbnb" placeholder, used by
 * 4BR) or a `photo(...)` object with a real file path (used by 3BR and 5BR).
 */

// ---------------------------------------------------------------------------
// Photo-evidence helper. Used by buy boxes with real supplied photography
// (currently 3BR) as an alternative to the `imagePlaceholder` path used by
// buy boxes with no stored photos yet (currently 4BR). Every file lives under
// webpage/assets/<buy-box>/<category>/ - see webpage/assets/3br/SOURCE.md for
// provenance back to the original Walid/Clearwater_Buy_Box_3BR package.
// ---------------------------------------------------------------------------
function photo(relPath, alt, caption, focus) {
  // `focus` is optional (CSS object-position, e.g. "62% 45%") and purely additive -
  // only the 3BR hero image sets it, to keep the pool/mini-golf visible under a
  // hero-card crop that's taller/narrower than this aerial photo's native aspect
  // ratio. Every other call site omits it and gets the default (centered) crop.
  return { file: "assets/" + relPath, alt: alt, caption: caption, focus: focus };
}

// ---------------------------------------------------------------------------
// Buy-box declarations (Section 1) + full deep-dive data (Section 8)
// ---------------------------------------------------------------------------

const BUY_BOXES = [
  {
    id: "3br",
    label: "3BR Buy Box",
    status: "developed",
    name: "3BR Large Family/Small Group House",
    thesis:
      "Acquire an attainable 3BR pool home within a reasonable drive of Clearwater Beach and build a fully enclosed " +
      "backyard experience - pool, fire pit, and shaded outdoor dining - sized for large families with kids.",
    whyItWorks:
      "The traveler base for this buy box is predominantly large families with kids, with small groups as the next priority. " +
      "A private, fully enclosed backyard with a pool, fire pit, and dining area directly serves that demographic without " +
      "requiring a waterfront lot or a specific architectural style - both are explicitly not required. Proximity to Clearwater " +
      "Beach and Pier 60 (within roughly 7-8 miles) supplies the location demand; the tropical interior theming (aqua, green, " +
      "and white accents) supplies the merchandising identity.",
    // Buy-box summary hero image (see identityBlock in render.js) - same supplied
    // photo used in the Backyard section below (backyard/backyard-02-pool-minigolf-aerial.jpg),
    // under a hero-specific filename. `focus` keeps the pool and mini-golf green
    // centered under the hero card's crop; see webpage/assets/3br/SOURCE.md.
    overview: {
      heroImage: photo(
        "3br/backyard/3br-buy-box-hero-pool-backyard.jpg",
        "Aerial view of a backyard with a pool, shaded dining/fire pit deck, and a mini-golf green",
        "The 3BR program: a fully enclosed backyard built around a pool, fire pit, and mini-golf green.",
        "72% 42%"
      ),
    },
    atAGlance: {
      bedBath: "3 bedrooms / 2+ bathrooms",
      sleeps: "8-12 (ideal sleep count)",
      heroMechanism: "Lagoon/free-form pool + fire pit backyard built for large families with kids",
      revenue: "Low $85K · Mid $100K · High $110K+ (preliminary; not underwritten)",
      targetAcquisitionPrice: "~$500,000 screen; one Zillow candidate supplied",
      primaryRequirement: "A fully enclosed, private backyard large enough for a lagoon/free-form pool, fire pit, and shaded group dining",
    },
    coreCharacteristics: [
      "3 real bedrooms, 2+ bathrooms",
      "Comfortable capacity for 8-12 guests",
      "Lagoon/free-form pool",
      "Pool heater",
      "Fire pit",
      "Shaded outdoor dining, sized for the full group",
      "Fully enclosed, private (\"closed\") backyard",
      "Room for a yard activity such as mini-golf",
      "No architectural style requirement",
      "No waterfront requirement",
      "Within roughly 7-8 miles of Clearwater Beach",
      "Tropical interior theme (aqua blue / green / white accents)",
    ],
    architecturalStyle: {
      recommended: [
        "New-looking Florida ranch-style homes are the most common style for this buy box, with a few modified Florida-ranch/coastal variations also acceptable.",
      ],
      why:
        "The deciding factor is whether the property can support the backyard/pool program and a tropical interior theme, not its exterior architecture.",
      avoid: [],
      images: [
        photo("3br/architectural/architectural-01-turquoise-ranch.jpg", "Single-story ranch home with turquoise shutters and front door", "Reference example: turquoise-accented Florida ranch."),
        photo("3br/architectural/architectural-02-midcentury-dusk.jpg", "Mid-century-modern home at dusk with a stone accent wall and wood carport", "Reference example: mid-century-modern styling with a stone feature wall."),
        photo("3br/architectural/architectural-03-coastal-bungalow.jpg", "White single-story coastal bungalow with palm landscaping", "Reference example: white coastal bungalow."),
      ],
    },
    bedroomsBathrooms: {
      targetRange: "3 bedrooms; 2+ bathrooms",
      functionalNote: "2+ bathrooms is stated as a floor, not a fixed count, to support the 8-12 guest capacity.",
    },
    sleepCount: {
      comfortableCapacity: "8-12",
    },
    backyard: {
      usableSpace:
        "Big enough for a pool, a fire pit, mini-golf, and large outdoor dining - the backyard is the primary program for this buy box.",
      amenityZoneRequirements:
        "Pool + fire pit + shaded outdoor dining sized for the full group; mini-golf or a comparable yard activity as space allows.",
      privacyNote:
        "Privacy is a stated requirement: a closed (fully enclosed) backyard.",
      images: [
        photo("3br/backyard/backyard-01-pool-pickleball-aerial.jpg", "Aerial view of a backyard with a screened pool, fire-pit lounge, and a full pickleball court", "Reference example: a fully zoned backyard (screened pool, fire-pit lounge, sport court) illustrating the scale this buy box targets."),
        photo("3br/backyard/backyard-02-pool-minigolf-aerial.jpg", "Aerial view of a backyard with a pool, shaded dining, and a mini-golf green", "Reference example: pool, shaded dining, and a mini-golf green sharing one enclosed yard."),
        photo("3br/backyard/backyard-03-pool-hottub-aerial.jpg", "Aerial view of a backyard with a pool, hot tub, and lounge seating among mature landscaping", "Reference example: pool and hot tub with heavy landscaping for privacy."),
      ],
    },
    mustHaveAmenities: [
      {
        name: "Pool (Lagoon-shaped)",
        why: "A lagoon/free-form pool is the central visual and functional backyard feature for the 3BR product.",
        strongExecution: "Shade or screened protection around the pool is worth considering for UV protection and family comfort, but the must-have is the pool itself.",
        images: [
          photo("3br/must-have/must-have-01-lagoon-pool-waterfall.jpg", "Lagoon-style pool with a rock waterfall feature under palm canopy", "Reference example: a heavily shaded, lagoon-style pool."),
          photo("3br/must-have/must-have-02-screened-pool-enclosure.jpg", "Screened pool enclosure with pool toys and sliding doors to the house", "Reference example: a full screened pool enclosure."),
          photo("3br/must-have/must-have-03-pool-pergola-canopy.jpg", "Pool with a wooden pergola shade structure and lounge seating", "Reference example: a built pergola shading the pool deck."),
        ],
      },
      {
        name: "Pool heater",
        why: "A pool heater is part of the finished-product expectation for family usability.",
        strongExecution: "Confirm the heater is functional and sized for extended-season use - this is a mechanical/equipment requirement rather than a visual one.",
        images: [],
      },
      {
        name: "Shaded outdoor dining",
        why: "Must accommodate the full group comfortably, not just a small table - families need to relax by the pool as a group.",
        strongExecution: "A dedicated shaded dining or lounge structure adjacent to the pool, sized for the group, not an afterthought corner.",
        images: [
          photo("3br/must-have/must-have-04-shaded-cabana-dusk.jpg", "Shaded cabana lounge with curtains beside a pool at dusk", "Reference example: a dedicated shaded cabana lounge beside the pool."),
          photo("3br/must-have/must-have-05-screened-lanai-lounge.jpg", "Screened lanai with sectional seating overlooking the pool", "Reference example: a screened lanai lounge sized for a group."),
        ],
      },
      {
        name: "Fire pit",
        why: "The fire pit is the evening social anchor for the backyard program.",
        strongExecution: "See the Backyard section above for fire-pit examples within a fully zoned yard.",
        images: [],
      },
    ],
    niceToHaveAmenities: [
      {
        name: "Game room",
        evidence: "Illustrated by a converted-garage game room (foosball, shuffleboard) in the supplied reference photo.",
        images: [
          photo("3br/nice-to-have/nice-to-have-01-garage-game-room.jpeg", "Converted garage game room with a foosball table, shuffleboard table, and neon sign", "Reference example: a converted-garage game room."),
        ],
      },
      { name: "Mini-golf", evidence: "Listed alongside the must-have backyard program as a nice-to-have activity; see Backyard section for examples.", images: [] },
      { name: "Pool table", evidence: "Useful when it fits a real entertainment area rather than an isolated object.", images: [] },
      { name: "Hot tub", evidence: "A useful add-on where the site and economics support it; see the third backyard reference photo above.", images: [] },
    ],
    geographicConsiderations: {
      views: "Not applicable for this buy box.",
      waterfront: "Not required - properties work without a waterfront.",
      privacySeclusion: "Privacy is a must, via a closed (fully enclosed) backyard.",
    },
    idealLocations: {
      recommended: "Close to the beach - at most 7 to 8 miles.",
      demandDrivers: "Clearwater Beach and Pier 60 are named as the popular nearby demand drivers.",
      whatEvidenceEstablishes: "The buy-box evidence references a map image showing where the market's top 25% revenue generators lie, as the basis for the mileage guidance.",
      additionalGuidance: "Use the interactive Location Analysis map (Section 4) to cross-check candidate locations against where the market's top performers already sit - it is market-wide rather than 3BR-specific, so treat it as supporting context alongside the mileage guidance above.",
    },
    travelerICP: {
      primary: "Mostly large families with kids.",
      secondary: "Small groups, as the next priority after families.",
    },
    designPhotos: [
      photo("3br/design/design-comp-01-aerial-pool-minigolf.jpg", "Aerial view of a themed backyard with pool, fire pit lounge, mini-golf, and games", "Design pattern: a fully programmed backyard combining pool, fire-pit lounge, and a mini-golf green."),
      photo("3br/design/design-comp-02-family-dining-yard.jpg", "Outdoor dining table and kids' play equipment in a shaded backyard", "Design pattern: shaded group dining directly beside kid-oriented play equipment."),
      photo("3br/design/design-comp-03-tiki-lounge-dusk.jpg", "Tiki-style thatched-roof lounge and cabana bed beside a pool at sunset", "Design pattern: tiki-themed lounge and cabana seating as a photographable identity."),
      photo("3br/design/design-comp-04-firepit-lounge-dusk.jpg", "Adirondack chairs around a fire pit beside a pool at dusk with an oversized lawn game", "Design pattern: a fire-pit lounge with an oversized yard game beside the pool."),
      photo("3br/design/design-comp-05-tropical-dining-interior.jpg", "Interior dining area with tropical palm-leaf wallpaper and a neon palm sign", "Design pattern: tropical interior theming carried into the dining area via wallpaper and signage."),
      photo("3br/design/design-comp-06-cornhole-poolside.jpg", "Cornhole boards set up on the lawn beside a pool", "Design pattern: a simple, low-cost yard game staged directly beside the pool."),
      photo("3br/design/design-comp-07-scalloped-umbrellas-sunset.jpg", "Poolside lounge chairs under red-and-white scalloped umbrellas at sunset", "Design pattern: a distinctive, photographable poolside merchandising moment (scalloped umbrellas) for hero/marketing imagery."),
    ],
    alexandria: {
      designCompSetUrl: "https://alexandria.strsearch.com/compsets?market=9&type=design&tag=b51769d6-1dee-4fcb-81ff-604aa09c2e82&tab=view",
      revenueCompSetUrl: "https://alexandria.strsearch.com/compsets?market=9&tag=d2d09697-c4bb-4c0a-a331-9100a42fb33d&tab=view",
    },
    revenueTiers: [
      {
        label: "High tier",
        range: "$110,000+",
        roleDescription: "Demonstrates upside and stronger execution.",
        photos: [
          photo("3br/revenue-high/revenue-high-01-rustic-tropical-suite.jpg", "Rustic tropical bedroom and kitchenette with a stone accent wall and wood-beam ceiling", "High-tier reference: a distinctive rustic-tropical interior suite."),
          photo("3br/revenue-high/revenue-high-02-aerial-pool-minigolf-firepit.jpg", "Aerial view of a backyard with pool, fire pit, and mini-golf", "High-tier reference: the fully programmed pool/fire-pit/mini-golf backyard."),
          photo("3br/revenue-high/revenue-high-03-puttinggreen-lanai.jpg", "Putting green beside a screened pool lanai", "High-tier reference: a dedicated putting green beside a screened pool lanai."),
          photo("3br/revenue-high/revenue-high-04-lanai-eggchairs-pool.jpg", "Screened lanai with hanging egg chairs and a dining table beside a pool with inflatable floats", "High-tier reference: a screened lanai lounge with statement seating beside the pool."),
        ],
      },
      {
        label: "Mid tier",
        range: "$100,000",
        roleDescription: "Supports the realistic target range.",
        photos: [
          photo("3br/revenue-mid/revenue-mid-01-aerial-pool-hottub.jpg", "Aerial view of a pool and hot tub with lounge seating and a putting green nearby", "Mid-tier reference: pool and hot tub with a nearby putting green."),
          photo("3br/revenue-mid/revenue-mid-02-scalloped-umbrella-cabana-dusk.jpg", "Poolside cabana seating under red scalloped umbrellas at dusk", "Mid-tier reference: a themed poolside cabana lounge."),
          photo("3br/revenue-mid/revenue-mid-03-tropical-jeweltone-interior.jpg", "Living room with dark teal walls, a stone accent wall, and tropical leaf wallpaper", "Mid-tier reference: a jewel-tone tropical interior treatment."),
        ],
      },
      {
        label: "Low tier",
        range: "$85,000",
        roleDescription: "Establishes the downside / minimum-performance baseline.",
        photos: [
          photo("3br/revenue-low/revenue-low-01-basic-paver-pool.jpg", "Rectangular pool on a paver patio with basic lounge chairs, no visible shade structure", "Low-tier reference: a functional pool without a canopy or shade structure over the deck."),
          photo("3br/revenue-low/revenue-low-02-firepit-no-canopy.jpg", "Backyard patio with a small fire pit, plastic chairs, and a pool with no shade canopy", "Low-tier reference: a fire pit is present, but there is no shaded dining/canopy zone."),
          photo("3br/revenue-low/revenue-low-03-small-pool-dusk-led.jpeg", "Small pool with color-changing LED lighting at dusk, minimal deck furniture", "Low-tier reference: a compact pool with lighting as the main differentiator, no canopy or fire-pit zone."),
          photo("3br/revenue-low/revenue-low-04-small-pool-hammock-dusk.jpg", "Small pool at dusk with a hammock and a single dining table, no shade structure", "Low-tier reference: a compact pool and hammock with no canopy, fire pit, or mini-golf zone."),
        ],
      },
    ],
    purchasePrice: {
      status: "partial",
      targetPrice: "~$500,000",
      note:
        "The target acquisition screen is approximately $500,000. One Zillow candidate was supplied, but CapEx, underwriting, and final fit still need separate review.",
      zillowListing: {
        name: "14480 120TH AVENUE, LARGO, FL 33774",
        url: "https://www.zillow.com/homedetails/14480-120th-Ave-Largo-FL-33774/47010417_zpid/?",
        note: "Candidate supplied with the 3BR buy-box notes; not yet underwritten.",
      },
      neededFields: [
        "Property images for the candidate",
        "Required transformation scope",
        "Estimated CapEx",
        "Matching revenue tier assignment",
        "Underwriting assumptions (financing, operating expense ratio, management fee, etc.)",
        "Cash-on-cash return calculation",
        "Investment verdict",
      ],
    },
    analystNotes: [
      {
        heading: "Kid-friendly targeting is the central directive",
        body:
          "Properties in this buy box must be targeted toward kid-friendly demographics, and this should be expressed directly in the photography - " +
          "pack 'n play pictures and kids' activities are called out specifically. The supplied reference photos include a child on a backyard putting " +
          "green and kids on inflatable loungers at an outdoor movie night, both illustrating this direction.",
      },
      {
        heading: "Outdoor dining must be shaded and sized for the group",
        body:
          "Outdoor dining needs to be shaded and large enough for guests to relax by the pool as a group - not a small, exposed table. See the Backyard and Must-Have Amenities sections for reference execution.",
      },
      {
        heading: "Shaded or screened pools are worth considering",
        body:
          "Shade or screening may improve family comfort and UV protection around the pool. Treat this as a useful execution choice around the required pool, not as a separate pool-enclosure requirement.",
      },
      {
        heading: "Lagoon/free-form pool reminder",
        body:
          "The lagoon or free-form pool shape is part of the 3BR product direction and should stay visible in acquisition screening and design planning.",
      },
      {
        heading: "Photography must compete with the market's top quartile",
        body:
          "Any property receiving meaningful STR investment needs excellent photography, with the design-comp imagery setting the quality bar for market-top-25% competition.",
      },
      {
        heading: "Interior theme: tropical, with a specific accent palette",
        body:
          "Most properties in this buy box use a tropical interior theme. Accent colors of aqua blue, green, and white are called out as working well. " +
          "The supplied reference photos show this via a surf-mural living room, a tropical palm-leaf mural living room, and jewel-tone tropical furnishings.",
      },
    ],
    analystImages: [
      photo("3br/analyst-notes/analyst-01-surf-mural-livingroom.jpg", "Living room with surf mural and tropical blue accents", "Analyst-note reference: surf mural and tropical blue accents."),
      photo("3br/analyst-notes/analyst-02-palmleaf-mural-livingroom.jpg", "Living room with palm-leaf mural and tropical furnishings", "Analyst-note reference: palm-leaf mural and tropical furnishings."),
      photo("3br/analyst-notes/analyst-03-firepit-adirondack-dusk.jpg", "Firepit seating with Adirondack chairs at dusk", "Analyst-note reference: evening firepit setup."),
      photo("3br/analyst-notes/analyst-04-outdoor-movie-kids.jpg", "Children watching an outdoor movie beside a pool", "Analyst-note reference: kid-friendly outdoor movie setup."),
      photo("3br/analyst-notes/analyst-05-child-puttinggreen.jpg", "Child playing on a backyard putting green", "Analyst-note reference: kid-friendly putting green."),
      photo("3br/analyst-notes/analyst-06-iguana-minigolf-feature.jpg", "Mini-golf feature with iguana sculpture", "Analyst-note reference: playful mini-golf feature."),
    ],
  },
  {
    id: "4br",
    label: "4BR Buy Box",
    status: "developed",
    name: "Branded Family & Group Experience House",
    narrative: true, // buybox2: renders via BuyBox Template V.2 (see buyBoxSections / NARRATIVE_BLOCKS in render.js), not the legacy A-N structure
    buyBoxVersion: "BuyBox Template V.2",
    // `thesis` and `atAGlance` are read by the shared, generic Section-1 summary-card
    // renderer (`renderDeclarations` in render.js, used identically by every buy box,
    // including 3BR) - kept here so that component needs no changes. The full,
    // richer "first screen" recommendation lives in `overview` below, used by the
    // BuyBox Template V.2 deep dive.
    thesis:
      "Acquire an attainable 4BR pool home and use coherent branding, gathering space, and entertainment design to create pricing power — without resort-scale construction.",
    atAGlance: {
      bedBath: "4 bedrooms / 2-2.5 bathrooms",
      sleeps: "Sleeps 10-13, with credible real-bed capacity",
      heroMechanism: "Existing pool/backyard gathering zone + one coherent, photographable identity",
      revenue: "Base $118K-$125K · Strong execution $135K-$140K · Upside $150K-$165K (preliminary; not underwritten)",
      primaryRequirement: "Existing pool or a genuinely poolable backyard, plus a coherent brandable identity, on ordinary-to-moderately-upgraded bones",
    },

    // 1. Buy-Box Summary — the entire "first screen" recommendation. Structural
    // counterpart to 3BR's opening summary, kept more visually engaging (hero
    // image + chips) per instruction.
    overview: {
      statusBadge: "Evidence-backed recommendation — acquisition underwriting pending",
      thesis:
        "Acquire an attainable 4BR pool home and use coherent branding, gathering space, and entertainment design to create pricing power — without resort-scale construction.",
      whyItWorks:
        "Coherent branding and a pool-centered gathering space consistently convert ordinary property bones into premium-tier revenue across the comp set — without requiring resort-scale construction, a waterfront lot, or a specific architectural style.",
      heroImage: photo("4br/core-comp-set/clearwater-glam/clearwater-glam-pool-gathering.jpg", "Twilight pool with floats and a neon sign under a covered lanai at Clearwater GLAM", "Clearwater GLAM — an ordinary ranch-style property turned into a branded pool-centered experience."),
      chips: [
        { label: "4 bedrooms" },
        { label: "Sleeps 10-13" },
        { label: "2 bathrooms minimum; 2.5-3 preferred" },
        { label: "Seminole primary" },
        { label: "Clearwater 33764 secondary" },
        { label: "Existing pool preferred" },
        { label: "Heated-pool path" },
        { label: "Game/entertainment space" },
        { label: "Branded / coordinated guest experience" },
      ],
      revenueChips: [
        { label: "Base", value: "$118K-$125K" },
        { label: "Strong execution", value: "$135K-$140K" },
        { label: "Upside", value: "$150K-$165K" },
      ],
    },

    // 2. Architectural Style — moved out of the old combined Property Profile.
    architecturalStyle: {
      recommended: [
        "Ordinary Florida ranch or moderately upgraded house is acceptable.",
        "Luxury architecture is not required.",
      ],
      why: "The deciding factor is whether the property can support the intended capacity, branding, and pool/backyard program — not its exterior architecture.",
      avoid: ["Properties that would require major structural renovation to reach baseline pool/backyard bones."],
      images: [
        photo("4br/core-comp-set/pink-paradise/pink-paradise-exterior-ranch.jpg", "Ordinary mid-century ranch exterior at dusk", "Ordinary exterior bones — Pink Paradise, before styling."),
        photo("4br/core-comp-set/pink-paradise/pink-paradise-branded-living-room.jpg", "Branded pink and tropical living room with banana-leaf wallpaper", "The same house, made distinctive through coherent branding — differentiation through execution, not architectural luxury."),
        photo("4br/supporting-comp-set/tropical-family-villa/tropical-family-villa-exterior.jpg", "Ordinary yellow Florida ranch exterior with a teal front door", "A second example of ordinary, attainable bones — Tropical Family Villa."),
      ],
    },

    // 3. Bedrooms & Bathrooms.
    bedroomsBathrooms: {
      targetRange: "True 4 bedrooms; 2 bathrooms minimum, 2.5-3 preferred.",
      functionalNote: "Bathroom distribution must function for group use — do not rely on an unverified den/office conversion to reach the core bedroom count.",
    },

    // 4. Ideal Sleep Count.
    sleepCount: {
      comfortableCapacity: "Sleeps 10-13",
      preferredConfiguration: "Underwrite to credible real-bed capacity — do not pad capacity using living-room sofa beds.",
      coherenceRequirement: "Indoor gathering and dining capacity must remain coherent with sleep capacity.",
      imagesSmall: true,
      images: [
        photo("4br/core-comp-set/lost-in-paradise/lost-in-paradise-real-bed-capacity.jpg", "Jungle-themed bunk and twin bedroom with real beds at Lost in Paradise", "Dedicated real beds, not padded advertised capacity — Lost in Paradise."),
        photo("4br/sleep-count/pink-twin-bedroom.avif", "Twin bedroom with matching pink upholstered headboards, teal linens, and floral wallpaper", "Two real, matching beds in a coordinated room - credible capacity, not a sofa-bed substitute."),
        photo("4br/sleep-count/wooden-bunk-beds.avif", "Room with two wooden twin bunk beds and coordinated bedding", "Real, solid bunk beds - built-in capacity for kids or groups without padding the sleep count."),
      ],
    },

    // 5. Backyard Size & Usability.
    backyard: {
      usableSpace: "Lot square footage alone does not establish usable backyard space — the yard must support a real, coordinated program.",
      amenityZoneRequirements:
        "Existing pool; group dining/seating; a firepit or comparable gathering anchor; at least one defined activity zone; safe circulation between zones; privacy/screening appropriate for group use. Covered or shaded gathering is strongly preferred.",
      images: [
        photo("4br/core-comp-set/lost-in-paradise/lost-in-paradise-backyard-zoning.jpg", "Aerial view of pool, spa, and putting green zones at Lost in Paradise", "Coordinated backyard zoning — Lost in Paradise."),
        photo("4br/core-comp-set/pink-paradise/pink-paradise-aerial-pool-backyard.jpg", "Aerial view of a pink-decked pool with a covered lounge area", "A branded pool deck as the social center — Pink Paradise."),
        photo("4br/supporting-comp-set/tropical-family-villa/tropical-family-villa-pool-backyard-ecosystem.jpg", "Twilight backyard with a mini-putting green and pool", "A pool paired with a defined activity zone — Tropical Family Villa."),
      ],
    },

    // 6. Must-Have Amenities. Evidence source for the prevalence figures: a direct
    // analysis of the 175 4BR listings in the cleaned dataset, top-20-by-revenue
    // subset (2026-08-24) - descriptive prevalence, not a causal claim.
    mustHaveAmenities: {
      items: [
        "Heated pool",
        "Functional outdoor dining and group seating",
        "Firepit or comparable gathering anchor",
        "Dedicated game/entertainment area",
        "Pool table or an equally substantial indoor group activity",
        "Credible real-bed capacity for 10-13",
        "Pack 'n Play or crib",
        "Coherent, photographable design identity",
        "Zoned backyard experience rather than disconnected amenities",
      ],
      images: [
        photo("4br/must-have/pool-aerial-lounge.avif", "Screened pool with lounge chairs and a small playhouse beside the deck", "A screened, heated pool with full lounge seating and a shaded play structure just steps away."),
        photo("4br/must-have/pool-night-accent-lighting.avif", "Pool deck at night lit with purple accent lighting", "Color-changing accent lighting extends the pool's usability and photographability into the evening."),
        photo("4br/must-have/game-room-arcade-lounge.avif", "Game room with a stone media wall, racing-style gaming recliners, board games, and a standalone arcade cabinet", "A dedicated game room anchored by a big screen, gaming recliners, an arcade cabinet, and board games."),
        photo("4br/must-have/pool-branded-sunset-lounge.avif", "Pool at dusk in front of a sunburst-branded exterior wall, with a tiki-thatched pergola, string lighting, and wooden lounge chairs", "A branded dusk pool scene - sunburst mural, tiki pergola, string lighting, and full lounge seating create one coherent, photographable identity."),
        photo("4br/must-have/playground-slide-cornhole.avif", "Backyard playhouse with a covered roof and a slide, alongside cornhole boards and a ring-toss game on turf", "A dedicated kids' play structure with a slide, alongside cornhole and ring-toss - built-in family entertainment beyond the pool."),
      ],
      evidenceNote: {
        label: "Top-20 4BR pattern",
        stats: "Pools: 100% · Game rooms: 95% · Family amenities: 95% · Heated pools: 90% · Firepits: 90% · Outdoor dining: 90%",
        caveat: "Descriptive prevalence among the highest-revenue listings; not proof of independent causality.",
      },
    },

    // 7. Nice-to-Have Amenities.
    niceToHaveAmenities: {
      stronglyPreferred: [
        "Mini golf or another photographable outdoor activity",
        "Covered or shaded outdoor gathering",
        "Hot tub, when the acquisition economics and site support it",
      ],
      optional: [
        "Pickleball",
        "Outdoor movie setup",
        "Karaoke",
        "Playground",
        "Gym",
        "Another distinctive hero mechanism",
      ],
      optionalNote: "Differentiators, not requirements — no property needs all of these to qualify.",
    },

    // 8. Geographic Considerations.
    geographicConsiderations: {
      views: "Views are not a priority for this buy box — no reviewed comp cites a view as part of its mechanism.",
      waterfront: "Not required. A confirmed-waterfront listing elsewhere in this project had the lowest revenue of its comparison set.",
      privacySeclusion: "Prioritize privacy and neighbor compatibility — a well-buffered, private lot supports the pool/backyard gathering experience this buy box depends on.",
    },

    // 9. Ideal Locations.
    idealLocations: {
      recommended: "Seminole is the primary geography; Clearwater ZIP 33764 is secondary evidence; Largo remains eligible but is less tested for the core strategy.",
      demandDrivers: "Beach access by a reasonable drive is consistent across core comps.",
    },

    // 10. Traveler ICP.
    travelerICP: {
      primary: "Families and friend/celebration groups.",
      secondary: "Guests who value shared gathering space, pool and backyard time, credible sleeping capacity, photographable group experiences, and family-legible convenience.",
    },

    // 11. Design — Top Designs — organized by mechanism, not by property gallery.
    designPlaybook: {
      mechanisms: [
        {
          title: "Ordinary bones, memorable identity",
          property: "Clearwater GLAM",
          url: "https://www.airbnb.com/rooms/748850360966059896",
          image: photo("4br/core-comp-set/clearwater-glam/clearwater-glam-branded-interior.jpg", "Citrus-slice mural living space with orange velvet sofas", "A citrus-mural living space transforming plain ranch-style bones."),
        },
        {
          title: "Pool-centered gathering",
          property: "Clearwater GLAM",
          url: "https://www.airbnb.com/rooms/748850360966059896",
          image: photo("4br/core-comp-set/clearwater-glam/clearwater-glam-pool-centered-gathering.webp", "Twilight pool with tiger and ring floats beside a covered, curtained lanai with dining and lounge seating", "The pool functions as the property's social center, surrounded by covered lounging, dining, additional seating, cohesive branding, and photographable pool styling."),
        },
        // Source property is genuinely unknown for this image (2026-08-24) - no
        // Airbnb link, property ID, revenue, or revenue tier is attached, and it
        // is not part of the 11-comp revenue set. Demonstrates backyard zoning /
        // the finished-product concept only - not proof of revenue, ROI, market
        // location, or amenity causality. See webpage/assets/4br/SOURCE.md.
        {
          title: "Multi-zone backyard experience",
          image: photo("4br/design-playbook/multi-zone-backyard-experience.webp", "Nighttime aerial view of a backyard with a screened pool, a multi-sport court, a mini-golf green, firepit seating, and a covered dining pavilion connected by lit pathways", "A coordinated backyard layout combines a screened pool, multi-use sport court, mini-golf area, firepit seating, covered dining, lighting, privacy fencing, and clear circulation between activity zones."),
        },
        {
          title: "Bold branded exterior",
          image: photo("4br/design-playbook/branded-exterior-sunburst-mural.avif", "Ranch house at dusk with a full sunburst mural across the exterior wall, a pool, striped lounge chairs, and an outdoor movie screen", "A full-facade sunburst mural turns an ordinary ranch exterior into the property's identity, carried through to the pool deck, lounge seating, and an outdoor movie screen."),
        },
        {
          title: "One photographable hero moment",
          property: "Movie Oasis",
          url: "https://www.airbnb.com/rooms/1245706281749944819",
          image: photo("4br/supporting-comp-set/movie-oasis/movie-oasis-outdoor-movie-firepit.jpg", "Covered outdoor movie screen, firepit, and lounge seating at dusk", "Movie screen, firepit, and pool sharing one backyard zone."),
        },
        {
          title: "Affordable novelty features",
          property: "Flamingo Oasis",
          url: "https://www.airbnb.com/rooms/937434515864957441",
          image: photo("4br/supporting-comp-set/flamingo-oasis/flamingo-oasis-diy-lawn-bowling.jpg", "DIY mat-based backyard lawn-bowling lane beside a mini-putting green", "A DIY, mat-based lawn-bowling lane — inexpensive, not structural."),
        },
        // User-selected product-stack images (2026-08-24) - no source-listing documentation
        // was supplied with these files. Per instruction, the unverified property-attribution
        // status is NOT shown on the client-facing card (no `property` field below); it is
        // preserved instead in webpage/assets/4br/SOURCE.md and asset_manifest.csv. No
        // property-specific revenue claim is attached to any of the three.
        {
          title: "Dedicated group entertainment",
          image: photo("4br/product-stack/dedicated-game-room.webp", "Dedicated game room with arcade cabinets, a foosball table, and a basketball arcade game", "A purpose-built game room combines multiple activities and seating in one defined entertainment zone."),
        },
        {
          title: "Outdoor dining built for the group",
          image: photo("4br/product-stack/covered-outdoor-dining.webp", "Covered thatched-roof dining pavilion with a long table, seating, and a grill", "Covered dining for eight, lighting, grilling and adjacent seating create a functional outdoor gathering zone."),
        },
        {
          title: "Photographable outdoor activity",
          image: photo("4br/product-stack/mini-golf.webp", "Landscaped multi-hole mini-golf course with turf, flags, and decorative figures beside a fenced yard", "A landscaped multi-hole mini-golf course becomes a visible backyard attraction rather than a token putting feature."),
        },
      ],
      weakExecution: {
        title: "Having the Amenity Is Not the Same as Merchandising the Experience",
        property: "4 Bedroom and Private Pool Near Clearwater",
        propertyId: "abnb_43358269",
        url: "https://www.airbnb.com/rooms/43358269",
        explanation: "A real pool and a converted game room, but a basic backyard and a generic interior — the amenities exist, but the experience isn't merchandised.",
        images: [
          photo("4br/low-tier-counterexamples/low-tier-underprogrammed-pool.jpg", "Basic residential pool with a plain concrete deck", "A functional pool, plainly presented."),
          photo("4br/low-tier-counterexamples/low-tier-nominal-game-room.jpg", "Foosball table and cornhole boards in a wood-paneled multipurpose room", "A game area with no dedicated identity."),
          photo("4br/low-tier-counterexamples/low-tier-generic-living-room.jpg", "Generic living room with a brown leather sectional and a wall-mounted TV", "A functional, unbranded living room."),
        ],
      },
      premium: {
        title: "Premium Ideas for Exceptional Sites",
        name: "High-Capacity Group Resort House",
        framing: "Transferable ideas only when a site already has the land, privacy, parking, and development potential to support them — not a baseline requirement, and not an equal second buy box.",
        images: [
          photo("4br/premium-references/palm-palms/palm-palms-resort-backyard-zoning.jpg", "Aerial view of a multi-sport court, pool, and mini-golf area behind a muraled fence", "Palm Palms — a multi-sport court, pool, and mini-golf sharing one resort-scale lot."),
          photo("4br/premium-references/tiki/tiki-full-site-aerial-zoning.jpg", "Full-site aerial view showing a pool, sport courts, and a thatched gathering structure", "Tiki — a full private-resort site plan on a single lot."),
          photo("4br/premium-references/tiki/tiki-karaoke-entertainment-stage.jpg", "Dedicated karaoke stage with disco-ball lighting and a neon sign", "Tiki — a purpose-built karaoke stage, not a converted space."),
        ],
      },
    },

    // 13. Revenue Potential — compact summary up front; full 11-comp evidence lives in the expandable panel.
    revenueSummary: {
      conservative: "$77K-$85K", base: "$118K-$125K", strong: "$135K-$140K", upside: "$150K-$165K",
      min: 77057, median: 120212, max: 163383,
      count: 11, high: 4, mid: 4, low: 3,
      validatedCount: 11, provisionalCount: 0,
      source: "ALEXANDRIA_CORE_4BR_REVENUE_COMP_SET.md",
      note: "Do not automatically underwrite every candidate to the upside range.",
    },
    // Revenue Tiers at a Glance (2026-08-24) — one representative, verified-photo comp
    // per tier, refined for honest visual hierarchy (High > Mid > Low). High uses the
    // user-supplied, user-confirmed Pink Paradise pool/backyard photo (revenue-page.png:
    // pink pool deck, pink house, tiki-thatched cabana bar, flamingo/donut floats, lounge
    // seating) — coordinated whole-property execution, not an ordinary secondary room.
    // Mid keeps Flamingo Oasis's branded-interior image with a takeaway that scopes the
    // branding as attractive-but-partial. Low now uses the user-supplied, user-confirmed
    // Seminole Pool House photo (low-revenue.png: a plain rectangular pool and paver deck
    // with no thematic branding) — functional but basic, completing the 3-tier progression.
    // This low-revenue.png source is distinct from, and does not change the attribution
    // of, the three abnb_43358269 low-tier counterexample photos used elsewhere on the page.
    revenueTierPreview: {
      high: {
        tier: "High Tier",
        propertyId: "abnb_568002792449614181",
        nickname: "Pink Paradise",
        title: "Pretty-n-PINK Mid Century Modern *A Pink Paradise*",
        url: "https://www.airbnb.com/rooms/568002792449614181",
        revenue: 163383,
        reviewStatus: "validated",
        takeaway: "A coordinated pool deck, branded identity, and layered gathering areas show the stronger whole-property execution associated with this high-tier comp.",
        image: photo("4br/revenue-tier-previews/high-pink-paradise.webp", "Pink-decked pool with flamingo and donut floats, a thatched-roof cabana bar, and lounge seating in front of a pink house", "Pink Paradise — High Tier revenue comp."),
      },
      mid: {
        tier: "Mid Tier",
        propertyId: "abnb_937434515864957441",
        nickname: "Flamingo Oasis",
        title: "The Flamingo Oasis | Bowling, Heated Pool, Hot Tub",
        url: "https://www.airbnb.com/rooms/937434515864957441",
        revenue: 118328,
        reviewStatus: "validated",
        takeaway: "A consistent branded identity is present, but the overall product does not reach the same complete-property execution as the selected high-tier example.",
        image: photo("4br/supporting-comp-set/flamingo-oasis/flamingo-oasis-branded-interior.jpg", "Flamingo and palm mural living room with a neon sign", "Flamingo Oasis — Mid Tier revenue comp."),
      },
      // Illustrated with a supplemental property OUTSIDE the authoritative 11-comp
      // set (2026-08-24) - Seminole Pool House (the actual low-tier core comp,
      // $77,057) has no verified photo, so a different, explicitly-labeled
      // property supplies the visual only. This does NOT change the core 11,
      // its 4/4/3 tier counts, median, or observed range - see revenueSummary/
      // revenueComps11 above, both untouched.
      low: {
        tier: "Low Tier",
        supplementalLabel: "Supplemental low-tier visual reference — outside core 11-comp set",
        propertyId: "abnb_661492128891671081",
        nickname: "Heated Pool, Putting Green, Pac-Man Near Beach",
        title: "4BR · Sleeps 9 · Largo 33778",
        url: "https://www.airbnb.com/rooms/661492128891671081",
        revenue: 76880,
        takeaway: "A functional firepit photographed unlit during the day, with basic gravel placement and limited atmospheric staging — an amenity that exists but is not presented as a compelling gathering experience.",
        image: photo("4br/revenue-tier-previews/low-pacman-firepit.webp", "Unlit stone firepit with teal Adirondack chairs in a daytime backyard with a small pool and putting green", "Heated Pool, Putting Green, Pac-Man Near Beach — supplemental low-tier visual reference, outside the core 11-comp set."),
      },
    },
    // Full 11-comp evidence set (unchanged data) — rendered only inside the expandable "View all 11 revenue comps" panel, as a compact table (no repeated images).
    revenueComps11: [
      { tier: "high", propertyId: "abnb_568002792449614181", nickname: "Pink Paradise", title: "Pretty-n-PINK Mid Century Modern *A Pink Paradise*", url: "https://www.airbnb.com/rooms/568002792449614181", city: "Seminole", zip: "33772", sleeps: 13, baths: 2.5, revenue: 163383, reviewStatus: "validated" },
      { tier: "high", propertyId: "abnb_1245706281749944819", nickname: "Movie Oasis", title: "Movie Oasis | Heated Pool - Hot tub - Game Room", url: "https://www.airbnb.com/rooms/1245706281749944819", city: "Clearwater", zip: "33764", sleeps: 12, baths: 2, revenue: 149881, reviewStatus: "validated" },
      { tier: "high", propertyId: "abnb_1503669407717600557", nickname: "Lost in Paradise", title: "Lost In Paradise - Heated Pool, Spa, MiniGolf", url: "https://www.airbnb.com/rooms/1503669407717600557", city: "Seminole", zip: "33776", sleeps: 10, baths: 2.5, revenue: 138322, reviewStatus: "validated" },
      { tier: "high", propertyId: "abnb_748850360966059896", nickname: "Clearwater GLAM", title: "Clearwater GLAM | Pool, Games, Hot Pink Oasis!", url: "https://www.airbnb.com/rooms/748850360966059896", city: "Clearwater", zip: "33756", sleeps: 10, baths: 3, revenue: 136285, reviewStatus: "validated" },
      { tier: "mid", propertyId: "abnb_1024311140202045123", nickname: "Golf Sim / Clearwater Dream", title: "Golf Sim, Heated Pool, Games | Clearwater Dream!", url: "https://www.airbnb.com/rooms/1024311140202045123", city: "Clearwater", zip: "33764", sleeps: 10, baths: 2, revenue: 124378, reviewStatus: "validated" },
      { tier: "mid", propertyId: "abnb_1067471228665034482", nickname: "Gameroom / King Beds", title: "Heated pool 12 min to beach w/ Gameroom, king beds", url: "https://www.airbnb.com/rooms/1067471228665034482", city: "Clearwater", zip: "33756", sleeps: 10, baths: 2, revenue: 120212, reviewStatus: "validated" },
      { tier: "mid", propertyId: "abnb_937434515864957441", nickname: "Flamingo Oasis", title: "The Flamingo Oasis | Bowling, Heated Pool, Hot Tub", url: "https://www.airbnb.com/rooms/937434515864957441", city: "Seminole", zip: "33776", sleeps: 10, baths: 2, revenue: 118328, reviewStatus: "validated" },
      { tier: "mid", propertyId: "abnb_892437841513061414", nickname: "Tropical Family Villa", title: "Clearwater LUXE! Tropical Family Beach Villa", url: "https://www.airbnb.com/rooms/892437841513061414", city: "Seminole", zip: "33776", sleeps: 10, baths: 2, revenue: 118202, reviewStatus: "validated" },
      { tier: "low", propertyId: "abnb_1129680913684900317", nickname: "Mermaid Cove", title: "Heated Pool, Game Room, MiniGolf @ Mermaid Cove", url: "https://www.airbnb.com/rooms/1129680913684900317", city: "Largo", zip: "33774", sleeps: 10, baths: 2, revenue: 85122, reviewStatus: "validated" },
      { tier: "low", propertyId: "abnb_1134378693882688252", nickname: "Clearwater Heated Pool Family-Friendly", title: "Clearwater Heated Pool Family-Friendly. Near Beach", url: "https://www.airbnb.com/rooms/1134378693882688252", city: "Clearwater", zip: "33764", sleeps: 10, baths: 2, revenue: 83837, reviewStatus: "validated" },
      { tier: "low", propertyId: "abnb_1323179023346269133", nickname: "Seminole Pool House", title: "Heated Pool | Game Room | Fire Pit | 8 Min to IRB", url: "https://www.airbnb.com/rooms/1323179023346269133", city: "Seminole", zip: "33776", sleeps: 10, baths: 2, revenue: 77057, reviewStatus: "validated" },
    ],

    // 12. Analyst Notes — concise, decision-relevant cautions only.
    analystNotes: [
      "Execution quality matters more than raw amenity count — a coordinated identity outperforms a longer feature list on its own.",
      "Underwrite to comfortable capacity, not advertised sleeps or the upside revenue range.",
      "Weak visual execution is a contrast, not proof of revenue causality — the weak-execution comparison does not show that any single visible feature caused a property's revenue.",
      "Flamingo Oasis carries above-average relayed operational/maintenance friction — a caution, not a design or revenue failure.",
      "Palm Palms and Tiki are premium inspiration, not baseline requirements — not an equal second buy box.",
      "The poolable-yard Path B (no existing pool) carries survey, setback, drainage, construction, and permitting risk beyond a pool-in-place acquisition.",
      "Price premiums must purchase meaningful physical advantages — not be paid merely to match another candidate's asking price.",
    ],

    // STR Regulations — compact, template-aligned; unverified fields say so plainly.
    // Rendered as a collapsed accordion near Purchase Price rather than a large
    // leading block, to preserve the BuyBox Template field without breaking the
    // page's structural cohesion with 3BR.
    regulations: {
      tier: "Verification pending",
      permit: "Verification pending",
      residency: "Verification pending",
      operatingLimits: "Verification pending",
      investorNotes: "Regulatory diligence deferred to the acquisition-screening phase (market-wide policy for this project — see Section 3).",
    },

    // 14. Purchase Price.
    acquisition: {
      status: "Pending property-level underwriting",
      zillowSummary: "First-pass Zillow screening (2026-08-23) retained 15 listings and flagged 5 priority candidates for deeper review — screening decisions only, not purchase recommendations.",
      nextStep: "Full underwriting (purchase price, CapEx, cash-on-cash return) begins once a specific candidate is selected.",
    },

    alexandria: {
      designCompSetUrl: "https://alexandria.strsearch.com/compsets?market=9&type=design&tag=d2c379e6-1d7c-4a13-97e8-9b5d82cedab8&tab=view",
      revenueCompSetUrl: "https://alexandria.strsearch.com/compsets?market=9&tag=193f1605-4a65-430e-9da8-5f622af041f4&tab=view",
    },

    // 15. Top Acquisition Candidates — Manual Review (2026-08-25). Three specific
    // Zillow listings that went through a manual capex/backyard/geography review,
    // shown in the same card pattern as the Revenue Tiers at a Glance row above
    // (label, bold title, subtitle, bold stat line, description, pros/cons, link).
    // These are manually reviewed acquisition candidates, not underwritten offers.
    acquisitionCandidates: [
      {
        label: "TOP PICK — BEST CAPEX",
        title: "2034 58th Lane N",
        subtitle: "Clearwater 33760 · 4BR/3BA",
        price: "$587,500",
        description:
          "Strongest capex story in the entire review — new roof, new AC, impact windows, insulation, plus a heated saltwater pool with a built shade-sail lounge already in place.",
        pros: [
          "Newest systems of any candidate reviewed",
          "Heated saltwater pool (4 yrs old)",
          "Built lounge zone",
          "3 full baths",
        ],
        cons: [
          "Highest price of the three",
          "Smallest lot (7,501 sqft)",
          "Capex claims unverified against permits",
          "Outside 33764",
        ],
        url: "https://www.zillow.com/homedetails/2034-58th-Ln-N-Clearwater-FL-33760/47249163_zpid/",
      },
      {
        label: "STRONG ALTERNATE — BEST BACKYARD",
        title: "309 Gatewood Drive",
        subtitle: "Largo · 3BR/3BA + Bonus Room",
        price: "$535,000",
        description:
          "The only backyard in the whole project with both a real dining zone and a separate lounge zone already built under one screened lanai.",
        pros: [
          "Lowest price of the three",
          "True 3BR/3BA + easy bedroom-conversion room",
          "Best-built backyard reviewed",
          "No price cuts",
        ],
        cons: [
          "Largo is untested geography",
          "One dated bathroom",
          "No disclosed system ages",
          "Conversion work still needed",
        ],
        url: "https://www.zillow.com/homedetails/309-Gatewood-Dr-Largo-FL-33770/47255506_zpid/",
      },
      {
        label: "PRIMARY GEOGRAPHY PICK",
        title: "8532 Kumquat Avenue",
        subtitle: "Seminole 33777 · 4BR/3BA",
        price: "$589,000",
        description:
          "Two private primary suites and a two-zone backyard, in Seminole — the buy box's named primary market.",
        pros: [
          "Primary geography",
          "Two primary suites (differentiator)",
          "Two-zone backyard",
          "Move-in-ready interior",
        ],
        cons: [
          "Highest $/sqft of the three",
          "1-car garage",
          "Unexplained 2025 fallen-through sale",
          "Smallest lot",
        ],
        url: "https://www.zillow.com/homedetails/8532-Kumquat-Ave-Seminole-FL-33777/47167743_zpid/",
      },
    ],

    // Ordered section flow, structurally aligned with 3BR's legacy A-N sequence
    // (Summary, Architectural Style, Bedrooms & Bathrooms, Ideal Sleep Count,
    // Backyard Size & Usability, Must-Have Amenities, Nice-to-Have Amenities,
    // Geographic Considerations, Ideal Locations, Traveler ICP, Design — Top
    // Designs, Analyst Notes, Revenue Potential, Purchase Price), with STR
    // Regulations as a compact accordion near the end. See
    // renderDeepDive/NARRATIVE_BLOCKS in render.js.
    buyBoxSections: [
      "overview",
      "architecturalStyle",
      "bedroomsBathrooms",
      "sleepCount",
      "backyard",
      "mustHaveAmenities",
      "niceToHaveAmenities",
      "geographicConsiderations",
      "idealLocations",
      "travelerICP",
      "designPlaybook",
      "analystNotesV2",
      "projections",
      "regulations",
      "acquisitionV2",
    ],
  },
  {
    id: "5br",
    label: "5BR Buy Box",
    status: "developed",
    name: "5BR Premium Private-Resort House",
    narrative: true, // renders via BuyBox Template V.2 (see buyBoxSections / NARRATIVE_BLOCKS in render.js), same as 4BR
    buyBoxVersion: "BuyBox Template V.2",
    // Source: Ifraham's supplied BuyBox_5BR package (BuyBoxDetailsText.pdf: Must Haves /
    // Automatically Add / Nice to Have - Ranked / Design Direction), integrated 2026-08-24.
    // No revenue comp set, design-comp property roster, purchase-price candidate, or
    // geography/ICP guidance was supplied with this package - those sections say so
    // explicitly (see `revenueMarketBenchmark`, `acquisition`, `geographicConsiderations`,
    // `idealLocations` below) rather than inventing figures. See webpage/assets/5br/SOURCE.md.
    thesis:
      "Acquire a 5-bedroom property with a large, zoneable lot and turn the backyard into a private resort - " +
      "a pool-centered social hub, a dedicated game room, and a high-capacity sleeping mix that works for both " +
      "large groups and families with kids.",
    atAGlance: {
      bedBath: "5 bedrooms / 2+ bathrooms",
      sleeps: "14+ minimum, 16 preferred",
      heroMechanism: "Pool-centered private-resort backyard + dedicated game room + high-capacity bunk/adult sleeping mix",
      revenue: "Market-wide 5BR benchmark: median $160,603/yr (Phase 2 figure; buy-box-specific comp set pending)",
      primaryRequirement: "A large, zoneable backyard capable of hosting 5+ major amenity zones around an existing pool, plus a dedicated or convertible game room",
    },

    // 1. Buy-Box Summary.
    overview: {
      statusBadge: "Evidence-backed amenity & design guidance - revenue comp set and acquisition underwriting pending",
      thesis:
        "Acquire a 5-bedroom property with a large, zoneable lot and turn the backyard into a private resort - " +
        "a pool-centered social hub, a dedicated game room, and a high-capacity sleeping mix that works for both " +
        "large groups and families with kids.",
      whyItWorks:
        "Pool prevalence is 100% across the supplied Premium cohort, and the strongest examples treat the backyard " +
        "as a multi-zone resort (sport court, mini golf, dining, lounge, fire pit) rather than a single feature. A " +
        "dedicated game room and a real, high-capacity sleeping mix (bunk rooms plus polished adult suites) round out " +
        "the product - execution and zoning density matter more than any single amenity.",
      heroImage: photo("5br/must-have/backyard/backyard-02-aerial-zoning.jpg", "Aerial dusk view of a pool, full sport court, mini golf, string lighting, and a dining patio inside one privacy-fenced backyard", "A private-resort backyard: pool, sport court, mini golf, and dining sharing one zoned, fenced lot."),
      chips: [
        { label: "5 bedrooms" },
        { label: "Sleeps 14+ (16 preferred)" },
        { label: "2+ bathrooms" },
        { label: "Existing pool required" },
        { label: "Dedicated game room" },
        { label: "5+ backyard amenity zones" },
        { label: "Pool table AUTO-add" },
        { label: "Mini golf: top-ranked Nice-to-Have" },
      ],
      revenueChips: [
        { label: "Market-wide 5BR median", value: "$160,603/yr (not buy-box-specific)" },
      ],
    },

    // 2. Architectural Style.
    architecturalStyle: {
      recommended: [
        "No single required architectural style - the supplied design examples range from an ordinary ranch to a large waterfront house.",
        "What matters is whether the house and lot can support the pool/backyard-zoning and game-room transformation, not the exterior style.",
      ],
      why: "The property does not need one architectural style; the deciding factor is whether the lot can support the resort-style transformation.",
      avoid: ["Lots too small to support 5+ distinct backyard amenity zones around the pool."],
      images: [
        photo("5br/must-have/pool/pool-03.jpg", "Branded teal house and pool deck with a flamingo float and matched lounge furniture", "An ordinary single-story house made distinctive through pool/deck styling, not architecture."),
        photo("5br/design/design-05-large-scale-resort.jpg", "Large waterfront house with a resort-style pool deck", "The same private-resort idea at a larger, more upscale scale - style varies, the amenity program doesn't."),
      ],
    },

    // 3. Bedrooms & Bathrooms.
    bedroomsBathrooms: {
      targetRange: "5 bedrooms; 2+ bathrooms minimum.",
      bathrooms: "2+ bathrooms is the floor. The source data does not support requiring 3+ - 2-bath Premium comps can still perform strongly when the rest of the product is well executed.",
      functionalNote: "The requirement is enough functional capacity for a 14-16 guest group, not maximizing bathroom count for its own sake.",
    },

    // 4. Ideal Sleep Count.
    sleepCount: {
      comfortableCapacity: "14+ minimum, 16 preferred",
      preferredConfiguration: "Combine polished king/queen adult rooms with at least one high-capacity bunk room; the bunk room should work for both large groups and families with kids.",
      coherenceRequirement: "Capacity should come from real, dedicated beds (bunk/twin rooms), not from padding advertised sleeps - themed slides and playful layouts make the bunk room an amenity itself, not just overflow beds. Adult bedrooms should still feel polished and vacation-oriented.",
      images: [
        photo("5br/must-have/beds/beds-01-kids-bunk-room.jpg", "Adults and kids using a built-in slide from a bunk room", "A built-in slide turns the bunk room itself into an amenity, for kids and adults alike."),
        photo("5br/must-have/beds/beds-02-kids-group-room.jpg", "Jungle-themed quad-bunk room with a slide", "A jungle-themed quad-bunk room with its own slide - high-capacity sleeping built for a group of kids."),
        photo("5br/must-have/beds/beds-03-king-adult-suite.jpg", "Orange and teal tropical king bedroom suite", "A polished, vacation-themed king suite - adult rooms stay premium even as capacity scales up."),
        photo("5br/must-have/beds/beds-04-queen-room.jpg", "Teal and pink tropical queen bedroom", "A themed queen room with a coordinated tropical palette."),
        photo("5br/must-have/beds/beds-05-queen-room.jpg", "Purple queen bedroom with a neon wave sign", "A themed queen room using color and lighting rather than square footage to feel premium."),
        photo("5br/must-have/beds/beds-06-queen-room.jpg", "Canopy queen bed with a tropical mural and alligator-print rug", "A canopy queen room with a tropical mural and playful accents - themed but still guest-ready."),
      ],
    },

    // Pool - Must-Have (5BR-specific; pool is a hard requirement with its own image set).
    mustHavePool: {
      requirement: "Existing pool is a hard requirement - pool appears across 100% of the supplied Premium cohort.",
      strongExecution: "Strong execution goes beyond simply having a pool: visually interesting shapes, colorful loungers/umbrellas, bright deck treatments, turf, lighting, tropical landscaping, and adjacent covered seating, so the pool photographs as the resort's centerpiece rather than a plain backyard feature.",
      images: [
        photo("5br/must-have/pool/pool-01-with-seating.jpg", "Dusk-lit pool with string lighting, purple umbrellas, and a full row of teal lounge chairs", "A dusk-lit pool with string lighting, umbrellas, and a full lounge-chair row along the deck."),
        photo("5br/must-have/pool/pool-02-shape-colour.jpg", "Curved pool with a painted, colorful deck and shaped blue loungers", "A painted, curved pool deck with bold color and shaped loungers - the pool as a designed, photographable centerpiece."),
        photo("5br/must-have/pool/pool-03.jpg", "Teal house with a shaped pool and a flamingo float", "A branded teal house and pool deck with a flamingo float and matched lounge furniture."),
        photo("5br/must-have/pool/pool-04.jpg", "Tiki-thatched cabana beside a rectangular pool with floats", "A tiki-thatched cabana and covered lounge seating directly beside the pool, connecting the pool to a shaded social zone."),
      ],
    },

    // 5. Backyard Size & Usability (combined Backyard + Amenity Capacity + Privacy story).
    backyard: {
      usableSpace: "A large, usable, private backyard capable of becoming a genuine resort environment - the acquisition requirement is enough physical space for 5+ major amenity zones, even if those amenities are added after closing.",
      amenityZoneRequirements: "Multiple clearly defined zones around the pool (sport court, mini golf/play, outdoor dining, lounge seating, social/fire-pit areas) while retaining circulation and open space. Fencing and landscaping should make the backyard feel self-contained.",
      images: [
        photo("5br/must-have/backyard/backyard-01-aerial-zoning.jpg", "Aerial view of a pool, sport court, mini golf, and a fire-pit lounge in one fenced backyard", "An aerial view showing pool, sport court, mini golf, and a fire-pit lounge as distinct zones inside one fenced, private lot."),
        photo("5br/must-have/backyard/backyard-02-aerial-zoning.jpg", "Aerial dusk view of a pool, full sport court, mini golf, string lighting, and a dining patio", "Pool, full sport court, mini golf, string lighting, and a dining patio sharing one privacy-fenced backyard at dusk."),
        photo("5br/must-have/backyard/backyard-03-aerial-zoning.jpg", "Aerial night view of a screened pool enclosure, mini-golf run, and fire-pit circle", "A screened pool enclosure plus a separate mini-golf run and fire-pit circle - amenity zoning still works with a screened pool."),
      ],
    },

    // Game Room / Indoor Entertainment Space - Must-Have (5BR-specific).
    mustHaveGameRoom: {
      requirement: "A dedicated game room or clearly convertible indoor space (garage, bonus room, secondary living area, flex room, or bunk/game hybrid) is a Must-Have.",
      strongExecution: "Strongest execution is a complete activity room - arcade machines, foosball, air hockey, pool-table space, bold graphics, and seating - rather than a single game placed in an ordinary room. The room itself is the acquisition requirement; individual equipment can be added after closing.",
      images: [
        photo("5br/must-have/game-room/game-room-01.jpg", "Game room with a pool table, pinball machines, and a row of arcade cabinets", "A complete activity room: pool table, pinball, and a full row of arcade cabinets under a mural."),
        photo("5br/must-have/game-room/game-room-02.jpg", "Superhero-themed room combining bunk beds with a slide, foosball, and air hockey", "A bunk/game hybrid - themed bunk beds with a slide sharing one room with foosball and air hockey."),
        photo("5br/must-have/game-room/game-room-03.jpg", "Captain America-themed room with foosball, air hockey, and a TV", "A themed game room combining foosball, air hockey, and a TV - a dedicated room, not a single piece of equipment."),
        photo("5br/must-have/game-room/game-room-04-arcade.jpg", "Illustrated graphic of game-room equipment: poker table, air hockey, pool table, arcade, shuffleboard, foosball, skeeball, pop-a-shot", "Illustrative graphic of common game-room equipment types - not a photo of an actual property."),
      ],
    },

    // Automatically Add - features to add after acquisition when missing/feasible; their
    // absence should not eliminate an otherwise strong property.
    autoAdd: {
      note: "These features should be added after acquisition when missing/feasible. Their absence should not eliminate an otherwise strong property.",
      overviewImages: [
        photo("5br/auto-add/auto-add-01-amenity-collage.jpg", "Aerial view combining a pool, a basketball/pickleball court, mini golf, a fire-pit lounge, and a volleyball court", "An aerial view combining a pool, a basketball/pickleball court, mini golf, a fire-pit lounge, and a volleyball court in one backyard - the AUTO items work together, not in isolation."),
        photo("5br/auto-add/auto-add-02-amenity-group.jpg", "Illustrated icon graphic of games, a pool float, and a mini putter", "Illustrative icon graphic of the AUTO amenity category - not a photograph of an actual property."),
      ],
      items: [
        { name: "Pool Heater", note: "Add to the existing pool where mechanically feasible. Extends seasonal pool usability, but its absence should not cause rejection of an otherwise strong property.", images: [] },
        { name: "Pool Table", note: "Produced the highest Premium amenity-importance score in the analysis, but the equipment itself is easy to install compared with creating the room - so the room is Must-Have and the table is AUTO.", images: [
          photo("5br/auto-add/auto-add-03-pool-table-game-room.jpg", "Pool table in front of a full arcade and pinball room", "A pool table anchors a full arcade/pinball room - the room is the acquisition requirement; the table itself is easy to add after closing."),
        ] },
        { name: "Fire Pit", note: "Create a dedicated evening social zone away from the primary pool circulation, surrounded by intentional seating and color.", images: [
          photo("5br/auto-add/auto-add-07-firepit-outdoor-seating.jpg", "Fire pit surrounded by red and teal Adirondack chairs and scalloped umbrellas", "A fire pit surrounded by intentional color and seating - a distinct evening zone, not a standalone object."),
        ] },
        { name: "Outdoor Dining", note: "Provide group-sized dining near the pool and outdoor entertainment areas, sized for a meaningful portion of a 14-16 guest group.", images: [] },
        { name: "Outdoor Bar / Tiki Bar", note: "Add a simple bar or tiki-style gathering area where the backyard allows it, reinforcing the tropical private-resort positioning without full outdoor-kitchen capex.", images: [] },
        { name: "BBQ Grill", note: "Provide a quality grill adjacent to outdoor dining to complete the outdoor social program at relatively low cost.", images: [] },
        { name: "Outdoor Lounge Seating", note: "Add a separate lounge area for guests who are not swimming or dining; covered or shaded seating is preferred.", images: [
          photo("5br/auto-add/auto-add-09-outdoor-lounge-seating.jpg", "Covered green lounge seating beside a plunge pool with a pool table visible under the patio", "Covered outdoor lounge seating beside a plunge pool, with a pool table visible under the adjoining patio."),
        ] },
        { name: "Sun Loungers / Poolside Seating", note: "Provide sufficient poolside seating for a large group; coordinated bright colors can also strengthen listing photography.", images: [
          photo("5br/auto-add/auto-add-04-beach-seats-hot-tub.jpg", "Screened pool with an in-deck spa and a row of lounge chairs at dusk", "A screened pool with an in-deck spa and a full row of lounge chairs at dusk."),
        ] },
        { name: "Simple Lawn / Party Games", note: "Add low-capex movable entertainment such as cornhole, giant Jenga, giant checkers, or board games to increase perceived amenity density without permanent construction.", images: [
          photo("5br/auto-add/auto-add-05-board-games.jpg", "Stack of board games on a cabinet", "A stack of board games - a low-cost way to broaden indoor entertainment for mixed-age groups."),
        ] },
        { name: "Karaoke / Simple Indoor Entertainment", note: "Add within the game-room environment as another inexpensive activity, broadening the indoor entertainment mix for adults, kids, and mixed-age groups.", images: [
          photo("5br/auto-add/auto-add-08-karaoke.jpg", "Karaoke stage with a neon sign and disco-ball lighting", "A dedicated karaoke stage with neon signage and disco-ball lighting."),
        ] },
        { name: "Pack-n-Play / Travel Crib", note: "Automatically provide for families traveling with infants - very low cost and directly aligned with the family traveler profile.", images: [] },
        { name: "Crib", note: "Provide a safe infant-sleeping option where practical - a low-cost operational addition, not an acquisition requirement.", images: [] },
      ],
    },

    // Nice to Have - Ranked, directly from BuyBoxDetailsText.pdf's scored ranking.
    niceToHaveRanked: {
      note: "Ranked by importance score. Amenities with insufficient sample size are still shown, flagged as thin-data/exploratory rather than removed.",
      items: [
        { name: "Mini Golf", score: 0.77, revenueUplift: "+11.2%", p90Uplift: "+36.1%", n: 18, note: "The strongest supplied examples use mini golf as a designed backyard attraction - curved greens, multiple holes, landscaping, lighting, and obstacles integrated with the pool/sports zones.", images: [
          photo("5br/nice-to-have/mini-golf/mini-golf-01.jpg", "Curved mini-golf green with a disc-golf basket and bowling pins nearby", "A curved, landscaped mini-golf green with a disc-golf basket and bowling pins nearby - multiple activities sharing one zone."),
          photo("5br/nice-to-have/mini-golf/mini-golf-02.jpg", "Mini-golf course with rock obstacles beside a giant checkers set", "A rock-obstacle mini-golf course beside a giant checkers set and a branded mural backdrop."),
          photo("5br/nice-to-have/mini-golf/mini-golf-03-twilight.jpg", "Twilight mini-golf course integrated with cornhole and disc golf", "A twilight mini-golf course integrated with cornhole and disc golf in one landscaped strip."),
        ] },
        { name: "Pickleball", score: 0.72, revenueUplift: "+22.2%", p90Uplift: "+19.4%", n: 12, note: "A particularly valuable Nice-to-Have because it requires sufficient lot size and site suitability; combining it with basketball on one hardscape footprint increases amenity density.", images: [
          photo("5br/nice-to-have/pickleball/pickleball-01-basketball-combo.jpg", "One court lined for both pickleball and basketball, with a sand volleyball court alongside", "One hardscape court lined for both pickleball and basketball, with a sand volleyball court alongside - one footprint, multiple sports."),
        ] },
        { name: "Playground", score: 0.57, revenueUplift: "+16.4%", p90Uplift: "+17.2%", n: 11, note: "Best suited to the large-family positioning; works particularly well when integrated with turf, mini golf, bowling/lawn games, and the pool rather than isolated in a corner of the yard.", images: [
          photo("5br/nice-to-have/playground/playground-01.jpg", "Wooden playset with a slide and climbing wall beside a themed play street", "A wooden playset with a slide and climbing wall beside a themed play street, next to the pool."),
          photo("5br/nice-to-have/playground/playground-02.jpg", "Kids on ride-on cars along a painted play street", "Kids on ride-on cars along a painted play street - a low-cost, highly photogenic kids' zone."),
          photo("5br/nice-to-have/playground/playground-03.jpg", "Climbing and monkey-bar playset", "A climbing/monkey-bar playset integrated with a play structure and slide."),
          photo("5br/nice-to-have/playground/playground-04-lawn-bowling.jpg", "Backyard bowling lane beside a playset and pool", "A backyard bowling lane beside a playset and pool - playground-adjacent activities layered together."),
          photo("5br/nice-to-have/playground/playground-05-mini-golf.jpg", "Mini golf lit for evening use beside a wooden playset", "Mini golf lit for evening use, directly beside a wooden playset - playground and mini golf sharing one zone."),
          photo("5br/nice-to-have/playground/playground-06-pool-large.jpg", "Giant lawn-sized yard-pool game with oversized billiard balls", "A giant lawn-sized 'yard pool' game with oversized billiard balls - a low-cost, high-novelty backyard activity (not a swimming pool)."),
        ] },
        { name: "Hot Tub", score: 0.29, revenueUplift: "-3.6%", p90Uplift: "-11.2%", n: 7, note: "Visually attractive, but the Premium data does not show positive incremental performance after controlling for stronger structural configurations. Treat as additional luxury rather than a core acquisition target.", images: [
          photo("5br/nice-to-have/hot-tub/hot-tub-01.jpg", "Indoor spa with neon signage and a living-wall backdrop", "An indoor/screened spa with neon signage and a living-wall backdrop."),
        ] },
        { name: "Gym", score: 0.26, revenueUplift: "-7.7%", p90Uplift: "0.0%", n: 5, note: "Potentially useful in larger or more luxury-oriented homes, but current sample support is limited with no clear independent performance premium. Lower priority than outdoor recreation.", images: [] },
        { name: "Movie Theater", thinData: true, n: null, note: "The poolside movie example is visually compelling and can create a memorable nighttime experience, but the dataset is too thin (N<4) to assign a reliable importance score.", images: [
          photo("5br/nice-to-have/movie-sauna-golf/movie-sauna-golf-02-movie-on-pool.jpg", "Inflatable movie screen set up over the pool at dusk", "An inflatable movie screen set up directly over the pool at dusk, with floats and popcorn styling."),
        ] },
        { name: "Sauna", thinData: true, n: null, note: "A potential luxury differentiator, but too sparsely represented in the Premium dataset (N<4) to support a strong acquisition conclusion.", images: [
          photo("5br/nice-to-have/movie-sauna-golf/movie-sauna-golf-01.jpg", "Barrel sauna positioned outside the house", "A barrel sauna positioned just outside the house, with the interior visible through the open door."),
        ] },
        { name: "Golf Simulator", thinData: true, n: null, note: "Potentially attractive for a high-end indoor entertainment program, but there is not enough Premium-market evidence in the current dataset to rank it reliably.", images: [] },
      ],
    },

    // Design Direction (source: BuyBoxDetailsText.pdf's Design Direction section).
    designDirection: {
      bullets: [
        "Bright sport courts, artificial turf, and shaped mini-golf greens recur across the supplied design comps.",
        "Colorful, coordinated furniture and umbrellas create a consistent visual identity readable from a single aerial photograph.",
        "Tropical landscaping, strong nighttime lighting, and clearly separated amenity zones support the private-resort presentation.",
        "No single architectural style is required - the same amenity-zoning idea appears on an ordinary ranch and on a larger, more upscale house.",
        "Adult bedrooms stay polished and vacation-oriented even as kids'/group spaces become more playful and themed.",
      ],
      images: [
        photo("5br/design/design-01-classic-design.jpg", "Screened pool, mini-golf run, and fire-pit circle lit for evening use", "A screened pool, mini-golf run, and fire-pit circle lit for evening use - a classic, less-saturated take on the same amenity-zoning idea."),
        photo("5br/design/design-02-colour-palette.jpg", "Free-form pool, painted sport court, mini golf, and a circular fire-pit lounge", "A free-form pool, painted sport court, mini golf, and a circular fire-pit lounge, each rendered in a distinct bold color."),
        photo("5br/design/design-03-colour-backyard.jpg", "Yellow-and-blue sport court, mini golf, sand volleyball court, and a pool-table lawn game", "A yellow-and-blue sport court, mini golf, sand volleyball court, and pool-table game sharing one saturated color scheme."),
        photo("5br/design/design-04-colour-design.jpg", "Yellow half-court, mini golf, pool, and a themed ride-on-car track", "A yellow half-court, mini golf, pool, and themed ride-on-car track color-coordinated across the whole lot."),
        photo("5br/design/design-05-large-scale-resort.jpg", "Large waterfront house with a resort-style pool deck", "A large waterfront house with a resort-style pool deck - the same private-resort idea at a larger, more upscale scale."),
        photo("5br/design/design-06-evening-lighting.jpg", "Sport court, pool, mini golf, and a fire-pit lounge lit for evening use with an outdoor movie screen", "Sport court, pool, mini golf, and a fire-pit lounge lit for evening use, with an outdoor movie screen set up beside the patio."),
      ],
    },

    // Comp-Set Visual Comparison (new, from the CompTiers workstream) - a Top/Mid/Low
    // qualitative photo comparison, additive to (and separate from) the Design Direction
    // section above. Every image is anonymized pattern/reference evidence (see
    // webpage/assets/5br/SOURCE.md) - none of these photos are claimed to be one of the
    // 10 lettered comps (C01-C10) used in the Revenue Potential section. These are
    // qualitative image observations, not causal conclusions.
    compSetVisualComparison: {
      intro: "A Top (High tier) / Mid / Low photo comparison across four categories, using the supplied comp-tier photography. These are qualitative image observations, not causal conclusions.",
      categories: [
        {
          key: "aerial",
          title: "Aerial View",
          interpretation: "Higher-performing properties generally present the full resort package more effectively from above. Professional aerial photography is especially important for heavily amenitized 5BR properties because it shows the backyard scale and amenity layout in one image.",
          tiers: {
            high: [
              { images: [photo("5br/comp-tiers/aerial/high-1.avif", "Aerial view of a high-performing-tier property's backyard resort layout", "Top-tier example: the full amenity layout reads clearly in one aerial frame.")] },
              { images: [photo("5br/comp-tiers/aerial/high-2.avif", "Aerial view of a second high-performing-tier property's backyard resort layout", "A second Top-tier aerial example.")] },
            ],
            mid: [
              { images: [photo("5br/comp-tiers/aerial/mid-1.avif", "Aerial view of a mid-tier property's backyard layout", "Mid-tier example: a strong but somewhat less complete aerial presentation.")] },
              { images: [photo("5br/comp-tiers/aerial/mid-2.avif", "Aerial view of a second mid-tier property's backyard layout", "A second Mid-tier aerial example.")] },
            ],
            low: [
              { images: [photo("5br/comp-tiers/aerial/low-1.jpeg", "Ground-level or weaker aerial view of a low-tier property's backyard", "Low-tier example: a weaker or lower aerial presentation of the amenity package.")] },
            ],
          },
        },
        {
          key: "bunk",
          title: "Bunk Rooms",
          interpretation: "Higher-performing examples generally show stronger theming, color, finish, and presentation. A slide itself is not the differentiator because slides appear across tiers.",
          tiers: {
            high: [
              { images: [
                photo("5br/comp-tiers/bunk-rooms/high-1-a.jpeg", "Themed bunk room in a high-performing-tier property", "Top-tier example: strongly themed, polished bunk-room presentation."),
                photo("5br/comp-tiers/bunk-rooms/high-1-b-queen-theme.avif", "A second, coordinated queen-bed-themed room in the same high-performing-tier property", "The same Top-tier property's coordinated queen-themed room."),
              ] },
              { images: [photo("5br/comp-tiers/bunk-rooms/high-2.avif", "Themed bunk room in a second high-performing-tier property", "A second Top-tier bunk-room example.")] },
            ],
            mid: [
              { images: [photo("5br/comp-tiers/bunk-rooms/mid-1.avif", "Bunk room in a mid-tier property", "Mid-tier example: solid theming, less elaborate than the Top tier.")] },
              { images: [photo("5br/comp-tiers/bunk-rooms/mid-2.avif", "Bunk room in a second mid-tier property", "A second Mid-tier bunk-room example.")] },
            ],
            low: [
              { images: [photo("5br/comp-tiers/bunk-rooms/low-1.avif", "Bunk room in a low-tier property", "Low-tier example: functional but visually simpler bunk-room presentation.")] },
              { images: [photo("5br/comp-tiers/bunk-rooms/low-2.avif", "Bunk room in a second low-tier property", "A second Low-tier bunk-room example.")] },
            ],
          },
        },
        {
          key: "games",
          title: "Games & Activities",
          interpretation: "Stronger properties generally present a fuller indoor/outdoor activity experience. Focus on the overall activity package rather than one individual game.",
          tiers: {
            high: [
              { images: [
                photo("5br/comp-tiers/games/high-1-pickleball-basketball.avif", "Pickleball/basketball multi-use court at a high-performing-tier property", "Top-tier example: a multi-use pickleball/basketball court."),
                photo("5br/comp-tiers/games/high-1-volleyball.avif", "Volleyball court at the same high-performing-tier property", "Sand volleyball court, same Top-tier property."),
                photo("5br/comp-tiers/games/high-1-bowling-playground.avif", "Backyard bowling lane and playground at the same property", "Backyard bowling lane plus playground, same Top-tier property."),
                photo("5br/comp-tiers/games/high-1-pool-arcade.webp", "Arcade room with a pool table at the same property", "Full arcade/pool-table room, same Top-tier property."),
                photo("5br/comp-tiers/games/high-1-airhockey-fussball-bunkbed.avif", "Air hockey and foosball combined with a bunk bed at the same property", "Air hockey and foosball sharing a room with a bunk bed."),
                photo("5br/comp-tiers/games/high-1-fussball-bunkbed.avif", "Foosball table beside a bunk bed at the same property", "Foosball table beside a themed bunk bed."),
                photo("5br/comp-tiers/games/high-1-firepit-live.avif", "Fire pit and evening social area at the same property", "Fire pit and evening social zone, same Top-tier property."),
                photo("5br/comp-tiers/games/high-1-outdoor-lounge.avif", "Outdoor lounge seating at the same property", "Outdoor lounge seating, same Top-tier property."),
                photo("5br/comp-tiers/games/high-1-outdoor-dining-sitting-shade.avif", "Shaded outdoor dining and seating at the same property", "Shaded group dining and seating, same Top-tier property."),
                photo("5br/comp-tiers/games/high-1-poolside-chairs-firepit-sitting.webp", "Poolside chairs and fire-pit seating at the same property", "Poolside chairs plus fire-pit seating, same Top-tier property."),
                photo("5br/comp-tiers/games/high-1-indoor-sitting.avif", "Indoor social seating area at the same property", "Indoor social seating area, same Top-tier property."),
              ] },
            ],
            mid: [
              { images: [
                photo("5br/comp-tiers/games/mid-1-aerial-golf-bowling-basketball.avif", "Aerial view of mini golf, bowling, and basketball at a mid-tier property", "Mid-tier example: mini golf, bowling, and basketball zones from above."),
                photo("5br/comp-tiers/games/mid-1-golf.avif", "Mini-golf green at the same mid-tier property", "Mini-golf green, same Mid-tier property."),
                photo("5br/comp-tiers/games/mid-1-bowling.webp", "Backyard bowling lane at the same mid-tier property", "Backyard bowling lane, same Mid-tier property."),
                photo("5br/comp-tiers/games/mid-1-basketball.webp", "Basketball court at the same mid-tier property", "Basketball court, same Mid-tier property."),
              ] },
            ],
            low: [
              { images: [
                photo("5br/comp-tiers/games/low-1-golf-bowling.avif", "Mini golf and bowling lane at a low-tier property", "Low-tier example: mini golf and a bowling lane, presented more simply."),
                photo("5br/comp-tiers/games/low-1-pool-table.avif", "Pool table at the same low-tier property", "Pool table, same Low-tier property."),
                photo("5br/comp-tiers/games/low-1-arcade.avif", "Arcade machines at the same low-tier property", "Arcade machines, same Low-tier property."),
                photo("5br/comp-tiers/games/low-1-airhockey-bunk.avif", "Air hockey table beside a bunk room at the same property", "Air hockey beside a bunk room, same Low-tier property."),
                photo("5br/comp-tiers/games/low-1-playground-firepit.avif", "Playground and fire pit at the same low-tier property", "Playground and fire pit, same Low-tier property."),
              ] },
            ],
          },
        },
        {
          key: "dining",
          title: "Dining / Seating / Social Spaces",
          interpretation: "Stronger properties generally present group-sized dining, poolside seating, lounge, and social areas more intentionally.",
          tiers: {
            high: [
              { images: [photo("5br/comp-tiers/dining-social/high-2-dining.avif", "Outdoor group dining area at a high-performing-tier property", "Top-tier example: covered, group-sized outdoor dining.")] },
            ],
            mid: [
              { images: [photo("5br/comp-tiers/dining-social/mid-1-firepit.avif", "Fire-pit social area at a mid-tier property", "Mid-tier example: a fire-pit social zone."), photo("5br/comp-tiers/dining-social/mid-1-outdoor-lounge-beach-chair.avif", "Outdoor lounge and beach-chair seating at the same mid-tier property", "Outdoor lounge and beach-chair seating, same Mid-tier property.")] },
            ],
            low: [
              { images: [
                photo("5br/comp-tiers/dining-social/low-1-poolside-sitting-outdoor-sitting.jpeg", "Poolside and outdoor sitting area at a low-tier property", "Low-tier example: functional poolside and outdoor seating."),
                photo("5br/comp-tiers/dining-social/low-1-dining.avif", "Dining area at the same low-tier property", "Dining area, same Low-tier property."),
                photo("5br/comp-tiers/dining-social/low-1-firepit.avif", "Fire pit at the same low-tier property", "Fire pit, same Low-tier property."),
                photo("5br/comp-tiers/dining-social/low-1-indoor-living-room.webp", "Indoor living room at the same low-tier property", "Indoor living room, same Low-tier property."),
              ] },
              { images: [
                photo("5br/comp-tiers/dining-social/low-2-dining.avif", "Dining area at a second low-tier property", "A second Low-tier property's dining area."),
                photo("5br/comp-tiers/dining-social/low-2-outdoor-pool.avif", "Pool area at the same second low-tier property", "The same property's pool area."),
                photo("5br/comp-tiers/dining-social/low-2-outdoor-sitting.avif", "Outdoor sitting area at the same second low-tier property", "The same property's outdoor sitting area."),
              ] },
            ],
          },
        },
      ],
    },

    // 8. Geographic Considerations.
    geographicConsiderations: {
      views: "Views are not a priority for this buy box; group capacity and the amenity package matter more.",
      waterfront: "Waterfront is not required. Prioritize the property's pool, outdoor space, and entertainment offering instead.",
      privacySeclusion: "Prioritize a private, fully enclosed backyard that creates a comfortable, self-contained setting for groups.",
    },

    // 9. Ideal Locations.
    idealLocations: {
      locationPriority: "Prioritize properties with convenient access to Clearwater–Largo–Seminole demand drivers, along with sufficient space, privacy, and parking. Premium views and waterfront positioning are not required.",
    },

    // 10. Traveler ICP - grounded directly in the Must-Haves text (bunk room framing).
    travelerICP: {
      primary: "Large groups and celebration parties - the buy box targets sleeps 14-16.",
      secondary: "Families with kids: the required bunk room is explicitly designed to work for both large groups and families with children simultaneously.",
    },

    // 5BR Comp-Set Geography (new, from the CompTiers workstream) - scoped to the 10-comp
    // Premium comp set only; does NOT change the market-wide Location Analysis (Section 4)
    // or the geographicConsiderations/idealLocations guidance above.
    compSetGeography: {
      intro: "Geography does not clearly separate performance within these 10 selected comps - multiple tiers occur inside the same cities and ZIP codes.",
      byCity: [
        { city: "Clearwater", n: 3, range: "$154K-$207K", tiers: "Low, Mid" },
        { city: "Largo", n: 2, range: "$209K-$231K", tiers: "Mid, High" },
        { city: "Seminole", n: 5, range: "$169K-$227K", tiers: "Low, Mid, High" },
      ],
      chart: photo("5br/compset-analysis/07-geography-scatter.png", "Scatter map of the 10 comps' latitude/longitude, colored by tier, bubble size by revenue", "A tight geographic cluster with tiers interleaved - Low, Mid, and High comps sit near each other rather than in separate areas."),
      mapUrl: "assets/5br/compset-analysis/clearwater-5br-compset-map.html",
      mapLegend: "Interactive map color key: Low = red, Mid = yellow, High = green; a darker shade means stronger revenue within that tier.",
    },

    // 12. Analyst Notes. Updated 2026-08-25 with the CompTiers 10-comp Premium comp set -
    // the two notes that previously said the revenue comp set was pending are replaced;
    // every other note (Pool Table/AUTO, Hot Tub, thin-data amenities, architectural style)
    // is unchanged from the original Ifraham workstream.
    analystNotes: [
      "Pricing power (ADR), not occupancy, is the clearest separator between Low/Mid/High performers in the 10-comp Premium set - occupancy sits in a comparatively narrow 75.6%-81.8% band across tiers.",
      "Buy the physical platform first: 5BR, Sleeps 14-16, Pool, 2+ Baths, Game Room capacity, and a large private backyard capable of 5+ major amenity/activity zones.",
      "Pickleball is the clearest variable amenity signal (25% -> 75% -> 100% prevalence Low to High) and works well as a multi-use sports court - the same footprint can also host basketball, volleyball, and other games.",
      "Once the core resort package is already in place, amenity density stops explaining performance (9.0-10.0 of 10 across all three tiers, only a one-point spread) - design, execution, staging, and listing presentation become the more likely differentiators.",
      "Professional aerial photography is particularly important for highly amenitized 5BR properties - it is the single clearest visual differentiator between the Top and Low tiers in the supplied comp photos.",
      "Geography does not clearly separate performance within the 10 selected comps - multiple tiers occur inside the same cities and ZIP codes, so geography is descriptive here, not a standalone acquisition thesis.",
      "Pool Table has the highest Premium amenity-importance score, but it is AUTO, not Must-Have - the room is the hard-to-add acquisition requirement, the table is easy to add after closing.",
      "Hot Tub shows a negative revenue/P90+ association in this Premium sample (-3.6% / -11.2%, N=7) - treat it as an additional luxury, not a core acquisition target, once stronger structural configurations are already in place.",
      "Movie Theater, Sauna, and Golf Simulator all have insufficient sample size (N<4) for a reliable importance score - shown as thin-data/exploratory rather than removed.",
      "The property does not need one specific architectural style; what matters is whether the house and lot can support the pool/backyard-zoning and game-room transformation.",
    ],

    // 13. Revenue Potential - COMPLETED 2026-08-25 with a 10-comp Premium revenue comp set
    // supplied via the Ifraham CompTiers workstream (Compset Analysis.ipynb / tier_summary.csv
    // / BuyBoxSupportingDocx.pdf - see webpage/assets/5br/SOURCE.md). Replaces the earlier
    // market-wide-benchmark-only, comp-set-pending version of this section.
    revenueMarketBenchmark: {
      scopeNote:
        "Low / Mid / High describe performance only within this selected 10-comp Premium comp set (C01-C10), not market-wide 5BR tiers. Findings are directional because N=10 - treat them as directional evidence, not causal conclusions.",
      tiers: [
        { tier: "Low", n: 4, range: "$154K-$175K", median: 169857, adr: 603, occ: 75.6 },
        { tier: "Mid", n: 4, range: "$203K-$209K", median: 206001, adr: 716, occ: 79.2 },
        { tier: "High", n: 2, range: "$227K-$231K", median: 228972, adr: 773, occ: 81.8 },
      ],
      keyRead:
        "Revenue increases are driven mainly by ADR/pricing power, not occupancy - occupancy sits in a comparatively narrow 75.6%-81.8% band across all three tiers, and sleeps/bed count do not explain the tier split. Keep the existing 2+ bathroom Buy Box requirement; the data does not support making 3 bathrooms a requirement.",
      charts: [
        photo("5br/compset-analysis/01-revenue-by-property.png", "Bar chart of revenue by property, sorted and colored by tier", "Revenue by property across the 10-comp Premium set - a clean Low/Mid/High separation, darker shade = stronger within its tier."),
        photo("5br/compset-analysis/02-adr-occ-decomposition.png", "Two charts: ADR and occupancy index by tier, and the share of the Low-to-High revenue gap explained by each", "ADR climbs much faster than occupancy across tiers - ADR explains 78% of the Low-to-High revenue gap, occupancy only 22%."),
      ],
      marketWide: {
        median: 160603,
        p75: 191158,
        p90: 216961,
        source: "Phase 2 reliable-core 5BR benchmark (n=45), market-wide across all 5BR listings - shown for context only; the Premium comp-set tiers above are this buy box's own evidence, not this market-wide figure.",
      },
      note: "This 10-comp Premium comp set (C01-C10) has no supplied property nicknames or Airbnb URLs - every figure above is anonymized comp-tier evidence, not a linkable identified listing. No Alexandria revenue-comp-set link has been supplied yet either.",
    },

    // Amenity Combination Evidence (new, from the CompTiers workstream) - does NOT change
    // the existing Must-Have / AUTO / Nice-to-Have classifications above; purely additive
    // supporting evidence for the completed Revenue Potential section.
    amenityEvidence: {
      intro:
        "Eight amenities are already table stakes across all 10 Premium comps (Pool, Pool Heater, Mini Golf, Game Room, Pool Table, Fire Pit, Outdoor Dining Area, Pack-n-Play), so they don't separate performance. Within what's left, pickleball is the clearest variable signal; playground shows no separation once amenity density is already this saturated.",
      tableStakes: ["Pool", "Pool Heater", "Mini Golf", "Game Room", "Pool Table", "Fire Pit", "Outdoor Dining Area", "Pack-n-Play"],
      combinations: [
        { combo: "Pickleball + Playground", n: 4, revenue: 210659, adr: 735 },
        { combo: "Pickleball only", n: 2, revenue: 204911, adr: 706 },
        { combo: "Playground only", n: 3, revenue: 176068, adr: 618 },
        { combo: "Neither", n: 1, revenue: 171172, adr: 616 },
      ],
      combinationRead: "The pattern points more strongly toward pickleball than playground as a directional revenue signal.",
      pickleballPrevalence: { low: 25, mid: 75, high: 100 },
      amenityDensity: { low: 9.0, mid: 9.25, high: 10.0 },
      densityRead: "Amenity density is already close to saturated (a one-point spread from Low to High) - once the core resort package exists, simply adding another amenity does not fully explain higher performance.",
      multiUseNote: "A pickleball court is also valuable as a multi-use sports court: the same hardscape footprint can support pickleball, basketball, volleyball, and other compatible games - an efficient use of a large backyard, not a single-purpose amenity.",
      charts: [
        photo("5br/compset-analysis/04-single-amenity-evidence.png", "Two bar charts comparing mean revenue with vs. without pickleball, and with vs. without a playground", "Pickleball separates mean revenue ($209K vs. $175K); playground does not ($196K vs. $194K)."),
        photo("5br/compset-analysis/05-amenity-prevalence-heatmap.png", "Heatmap of amenity presence across the 10 comps, sorted High to Low tier", "17 of 19 tracked amenities never vary across the set - pickleball and playground are the only two that do."),
        photo("5br/compset-analysis/06-amenity-density.png", "Bar chart of mean amenity density by tier, and a scatter of density vs. revenue", "Density climbs only from 9.0 to 10.0 across tiers - most of the High tier's revenue separation is not explained by adding more amenities."),
      ],
    },

    // STR Regulations - same market-wide deferred pattern as 3BR/4BR.
    regulations: {
      tier: "Verification pending",
      permit: "Verification pending",
      residency: "Verification pending",
      operatingLimits: "Verification pending",
      investorNotes: "Regulatory diligence deferred to the acquisition-screening phase (market-wide policy for this project - see Section 3).",
    },

    // 14. Purchase Price. Updated 2026-08-25 with two Zillow candidates supplied via the
    // CompTiers workstream (BuyBoxSupportingDocx.pdf's "Zillow Acquisition Candidates").
    // No purchase price, CapEx, or underwriting was supplied alongside them - these are
    // acquisition-screening candidates only, not underwritten recommendations.
    acquisition: {
      status: "Candidates supplied - property-level underwriting not yet started",
      zillowSummary: "Two Zillow candidates have been supplied for 5BR acquisition screening against the Premium Buy Box.",
      zillowCandidates: [
        { address: "2995 Exeter Dr, Clearwater, FL 33761", url: "https://www.zillow.com/homedetails/2995-Exeter-Dr-Clearwater-FL-33761/47096163_zpid/" },
        { address: "7519 Harbor View Way, Seminole, FL 33776", url: "https://www.zillow.com/homedetails/7519-Harbor-View-Way-Seminole-FL-33776/47223653_zpid/" },
      ],
      nextStep: "Screen both candidates against the Premium Buy Box (5BR, sleeps 14-16, pool, 2+ baths, game-room capacity, large private backyard), then begin full underwriting (purchase price, CapEx, cash-on-cash return) on whichever advances.",
    },

    alexandria: {
      designCompSetUrl: null,
      revenueCompSetUrl: "https://alexandria.strsearch.com/compsets?market=9&tag=7d3ca951-7112-460e-a987-1c66db836210&tab=view",
    },

    // Ordered section flow - mirrors the 4BR narrative flow's structure, with 5BR-specific
    // sections (mustHavePool, mustHaveGameRoom, autoAdd, niceToHaveRanked, designDirection,
    // revenueMarketBenchmark) replacing the 4BR sections that require an identified comp
    // roster this package does not supply (designPlaybook, projections). compSetVisualComparison,
    // compSetGeography, and amenityEvidence were added 2026-08-25 from the Ifraham CompTiers
    // workstream (see webpage/assets/5br/SOURCE.md); revenueMarketBenchmark and acquisition's
    // zillowCandidates were completed from pending using the same workstream. See
    // renderDeepDive/NARRATIVE_BLOCKS in render.js.
    buyBoxSections: [
      "overview",
      "architecturalStyle",
      "bedroomsBathrooms",
      "sleepCount",
      "mustHavePool",
      "backyard",
      "mustHaveGameRoom",
      "autoAdd",
      "niceToHaveRanked",
      "designDirection",
      "compSetVisualComparison",
      "geographicConsiderations",
      "idealLocations",
      "travelerICP",
      "compSetGeography",
      "analystNotesV2",
      "revenueMarketBenchmark",
      "amenityEvidence",
      "regulations",
      "acquisitionV2",
    ],
  },
];

// ---------------------------------------------------------------------------
// Market introduction (Section 2)
// ---------------------------------------------------------------------------

const MARKET_INTRO = {
  boundaries:
    "Three adjacent Pinellas County, Florida cities: Clearwater, Largo, and Seminole. Geography here is described by city/ZIP/coordinate cluster, never by loose Airbnb marketing labels.",
  composition:
    "685 actual STR listings in the cleaned dataset (465 reliable-core listings used for primary analysis). Bedroom mix skews toward 3BR (38.1% of the market) and 4BR (25.5%), with 2BR, 1BR, 5BR, and 6BR+ making up the remainder.",
  revenueOpportunity:
    "Reliable-core median annual revenue potential: 4BR $101,065, 5BR $160,603, 3BR $69,663 (Phase 2 benchmarks). 4BR P90 reaches $137,300; 5BR P90 reaches $216,961.",
  demandDrivers:
    "Pool-centered outdoor experience, family and celebration/group travel, and beach proximity by a reasonable drive are the recurring demand signals across manually reviewed listings and structured guest-tag data.",
  characteristics:
    "Seminole shows the highest reliable-core median revenue of the three cities ($95,446 vs. Largo $66,097 and Clearwater $62,961), but this is descriptive only — it may reflect bedroom mix, capacity, amenity infrastructure, or product quality rather than a causal city premium (see Section 7).",
};

const REGULATION_NOTE =
  "Regulatory diligence deferred to the acquisition-screening phase.";

// ---------------------------------------------------------------------------
// Traveler demographics (Section 5) — review-weighted structured guest-tag data
// ---------------------------------------------------------------------------

const DEMOGRAPHICS = {
  marketWide: { kids: 0.322, groupTrip: 0.214, pet: 0.092, other: 0.373 },
  byBedroom: [
    { segment: "3BR", kids: 0.39, groupTrip: 0.222, pet: 0.096, other: 0.292 },
    { segment: "4BR", kids: 0.401, groupTrip: 0.382, pet: 0.073, other: 0.144 },
    { segment: "5BR", kids: 0.433, groupTrip: 0.406, pet: 0.083, other: 0.078 },
  ],
  interpretation:
    "The single largest jump in group-trip share across the entire market occurs at the 3BR-to-4BR transition (+16.0 percentage points) — 4BR's group-trip composition is already close to 5BR levels, even though its family (kids) composition sits between 3BR and 5BR. This directly supports a 4BR product built around both family and celebration/friend-group demand simultaneously, while 3BR reads as more purely family-oriented and 5BR serves the largest, most group-dominant travel parties. City-level guest composition is broadly similar across Clearwater, Largo, and Seminole (kids 30-33%, group trip 19-26%), which weighs against a guest-composition explanation for Seminole's revenue premium and toward a product/amenity/geography explanation — without proving causation.",
};

// ---------------------------------------------------------------------------
// Property-size analysis (Section 6)
// ---------------------------------------------------------------------------

const PROPERTY_SIZE = {
  marketDistribution: [
    { segment: "1BR", share: 0.092, n: 63 },
    { segment: "2BR", share: 0.161, n: 110 },
    { segment: "3BR", share: 0.381, n: 261 },
    { segment: "4BR", share: 0.255, n: 175 },
    { segment: "5BR", share: 0.085, n: 58 },
    { segment: "6BR+", share: 0.026, n: 18 },
  ],
  topQuartileDistribution: [
    { segment: "1BR", n: 12, share: 0.101 },
    { segment: "2BR", n: 18, share: 0.151 },
    { segment: "3BR", n: 42, share: 0.353 },
    { segment: "4BR", n: 32, share: 0.269 },
    { segment: "5BR", n: 12, share: 0.101 },
    { segment: "6BR+", n: 3, share: 0.025 },
  ],
  revenueBySize: [
    { segment: "1BR", medianRevenue: 23763, medianAdr: 106, medianOcc: 0.633 },
    { segment: "2BR", medianRevenue: 39218, medianAdr: 164, medianOcc: 0.686 },
    { segment: "3BR", medianRevenue: 69663, medianAdr: 278, medianOcc: 0.708 },
    { segment: "4BR", medianRevenue: 101065, medianAdr: 405, medianOcc: 0.662 },
    { segment: "5BR", medianRevenue: 160603, medianAdr: 672, medianOcc: 0.711 },
    { segment: "6BR+", medianRevenue: 201314, medianAdr: 769, medianOcc: 0.587 },
  ],
  interpretation:
    "4BR (26.9% of top-quartile listings vs. 25.5% of market inventory) and 5BR (10.1% of top-quartile vs. 8.5% of market inventory) are each modestly overrepresented among top performers relative to their market share; 3BR and smaller segments track close to or below their market share. Revenue climbs by bedroom count (3BR → 4BR → 5BR), driven mainly by ADR rather than occupancy, which sits in a narrow 66-71% band across all three segments — consistent with meaningfully different guest products at each size rather than the same product at different scales.",
};

// ---------------------------------------------------------------------------
// Justification for the buy-box split (Section 7)
// ---------------------------------------------------------------------------

const SPLIT_JUSTIFICATION = [
  "Property-size evidence (Section 6) shows revenue increasing by bedroom count primarily through ADR, not occupancy — occupancy stays in a narrow band across sizes, so 3BR/4BR/5BR are pricing-power products, not simply “more rooms, more nights booked.”",
  "Traveler-demographic evidence (Section 5) shows a materially different guest mix at each size — 3BR skews family-only, 4BR is the sharpest family+group-trip hybrid in the market, and 5BR serves the most group-dominant parties — supporting distinct guest theses per size rather than one universal buy box.",
  "1BR / 2BR are excluded on revenue ceiling alone: $42,216 and $84,567 maximum revenue respectively, versus a $99,709 market Top-25% floor. Neither has produced a Top-25% listing in this dataset, let alone a Top-10% one. This is a revenue-ceiling conclusion, not a judgment about the format in general.",
  "5-6BR Premium is the smallest pursued segment by count (N=69) but the strongest performer on the rate metrics, with 62.3% reaching the Top 10% among listings in that grouped segment.",
  "7BR+ stays exploratory, not a fourth buy box. It is strongest on paper, but N=7 market-wide is too thin to underwrite acquisition criteria from; it is tracked, not ignored.",
  "Amenity and manual-review evidence for the 4BR workstream specifically shows that pricing power comes from branding and pool-centered experience design on ordinary property bones, not raw amenity count or expensive architecture — a thesis that is size-specific (a coherent identity works at 4BR's comfortable 8-10 capacity) and should not be assumed to transfer unmodified to 3BR or 5BR products.",
  "Location evidence (Section 4) shows revenue concentration is uneven across the three cities and is confounded with bedroom/capacity mix — reinforcing that geography alone does not explain performance, and that buy-box-specific product requirements (not a single market-wide formula) are doing the work.",
  "The Playbook's own guidance (Section 20) is explicit: avoid one universal buy box when materially different products compete under different economics or guest intents. The evidence above shows exactly that divergence by bedroom count.",
];

// ---------------------------------------------------------------------------
// Map configuration (Section 4)
// ---------------------------------------------------------------------------

const MAP_CONFIG = {
  dataUrl: "data/listings.json",
  center: [27.895, -82.79],
  zoom: 12,
  tierColors: { top10: "#c9962b", top25: "#1f7a6c", bottom75: "#8b94a3" },
  tierLabels: {
    top10: "Top 10% revenue (reliable-core, market-wide)",
    top25: "Next 15% (top 25%, excl. top 10%)",
    bottom75: "Bottom 75%",
  },
  methodologyNote:
    "Tiers are computed market-wide across all bedroom sizes in the reliable-core population (Good Data + Existing + complete core fields, n=465), " +
    "using this market's own P75 ($106,604) and P90 ($149,598) revenue thresholds. These are presentation-specific, whole-market thresholds — " +
    "NOT the bedroom-segment-relative Low/Middle/High/Exceptional tiers used elsewhere in the project's phase analysis. " +
    "Geography is descriptive; no causal geographic conclusion is implied by clustering on this map.",
};

// ---------------------------------------------------------------------------
// Alexandria (Section 9 / global config)
// ---------------------------------------------------------------------------

const ALEXANDRIA = {
  baseUrlKnown: false,
  pendingLabel: "Pending — Alexandria link not yet available",
};
