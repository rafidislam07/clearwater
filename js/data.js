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
 * 2026-08-23) - see webpage/assets/3br/SOURCE.md for the file-by-file mapping. Nothing
 * here is invented. Where a canonical/supplied source does not yet have an answer
 * (5BR entirely; Alexandria links for both developed boxes; Zillow candidates;
 * CapEx/underwriting), the field is explicitly null/pending/omitted - never filled
 * with placeholder prose or numbers.
 *
 * To add 5BR content later: fill in its object in BUY_BOXES below using the same shape
 * as the 3BR/4BR entries, then flip `status` to 'developed'. No component code needs to
 * change. Two image reference shapes are supported (see render.js `renderImage`):
 * a bare property-ID string (renders a "photo pending, link to Airbnb" placeholder,
 * used by 4BR) or a `photo(...)` object with a real file path (used by 3BR).
 */

// ---------------------------------------------------------------------------
// Photo-evidence helper. Used by buy boxes with real supplied photography
// (currently 3BR) as an alternative to the `imagePlaceholder` path used by
// buy boxes with no stored photos yet (currently 4BR). Every file lives under
// webpage/assets/<buy-box>/<category>/ - see webpage/assets/3br/SOURCE.md for
// provenance back to the original Walid/Clearwater_Buy_Box_3BR package.
// ---------------------------------------------------------------------------
function photo(relPath, alt, caption) {
  return { file: "assets/" + relPath, alt: alt, caption: caption };
}

// ---------------------------------------------------------------------------
// Buy-box declarations (Section 1) + full deep-dive data (Section 8)
// ---------------------------------------------------------------------------

const BUY_BOXES = [
  {
    id: "3br",
    label: "3BR Buy Box",
    status: "developed",
    name: "Clearwater 3BR",
    thesis:
      "Acquire an attainable 3BR pool home within a reasonable drive of Clearwater Beach and build a fully enclosed, " +
      "canopy-shaded backyard experience - pool, fire pit, and shaded outdoor dining - sized for large families with kids.",
    whyItWorks:
      "The traveler base for this buy box is predominantly large families with kids, with small groups as the next priority. " +
      "A private, fully enclosed backyard with a shaded pool, fire pit, and dining area directly serves that demographic without " +
      "requiring a waterfront lot or a specific architectural style - both are explicitly not required. Proximity to Clearwater " +
      "Beach and Pier 60 (within roughly 7-8 miles) supplies the location demand; the tropical interior theming (aqua, green, " +
      "and white accents) supplies the merchandising identity.",
    atAGlance: {
      bedBath: "3 bedrooms / 2+ bathrooms",
      sleeps: "8-12 (ideal sleep count)",
      heroMechanism: "Canopy-shaded pool + fire pit backyard built for large families with kids",
      revenue: "Low $85K · Mid $100K · High $110K+ (preliminary; not underwritten)",
      targetAcquisitionPrice: "~$500,000 (no specific listing supplied)",
      primaryRequirement: "A fully enclosed, private backyard large enough for a canopy-shaded pool, fire pit, and shaded group dining",
    },
    coreCharacteristics: [
      "3 real bedrooms, 2+ bathrooms",
      "Comfortable capacity for 8-12 guests",
      "Existing pool with a shade canopy",
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
        "The source material states no required architectural style - reference photos span a turquoise-trimmed single-story ranch, a mid-century-modern home with a stone accent wall, and a white coastal bungalow.",
      ],
      why:
        "Because no single style is mandated, the deciding factor is whether the property can support the backyard/pool program and a tropical interior theme, not its exterior architecture.",
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
        "Big enough for a pool with canopy, a fire pit, mini-golf, and large outdoor dining - the backyard is the primary program for this buy box.",
      amenityZoneRequirements:
        "Pool with canopy + fire pit + shaded outdoor dining sized for the full group; mini-golf or a comparable yard activity as space allows.",
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
        name: "Pool with canopy / shade structure",
        why: "Stated as a must-have; shade over and around the pool supports comfortable use by families with young kids.",
        strongExecution: "A pergola, screen enclosure, or canopy that shades a meaningful portion of the pool deck, not just a single umbrella.",
        images: [
          photo("3br/must-have/must-have-01-lagoon-pool-waterfall.jpg", "Lagoon-style pool with a rock waterfall feature under palm canopy", "Reference example: a heavily shaded, lagoon-style pool."),
          photo("3br/must-have/must-have-03-pool-pergola-canopy.jpg", "Pool with a wooden pergola shade structure and lounge seating", "Reference example: a built pergola shading the pool deck."),
        ],
      },
      {
        name: "Pool heater",
        why: "Listed explicitly as a must-have in the source material.",
        strongExecution: "Not independently illustrated by a supplied photo; treat as a mechanical/equipment requirement rather than a visual one.",
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
        why: "Listed explicitly as a must-have for the backyard program.",
        strongExecution: "See the Backyard section above for fire-pit examples within a fully zoned yard.",
        images: [],
      },
      {
        name: "Screened pool enclosure (functional/climate consideration)",
        why: "A screened enclosure keeps the pool usable and bug-free for family stays; shown repeatedly across the supplied photo set.",
        strongExecution: "A full screen enclosure over the pool and adjacent deck.",
        images: [
          photo("3br/must-have/must-have-02-screened-pool-enclosure.jpg", "Screened pool enclosure with pool toys and sliding doors to the house", "Reference example: a full screened pool enclosure."),
        ],
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
      { name: "Pool table", evidence: "Listed as a nice-to-have amenity in the source material.", images: [] },
      { name: "Hot tub", evidence: "Listed as a nice-to-have amenity in the source material; see the third backyard reference photo above.", images: [] },
    ],
    geographicConsiderations: {
      views: "Not applicable (stated explicitly in the source material).",
      waterfront: "Not required - properties work without a waterfront.",
      privacySeclusion: "Privacy is a must, via a closed (fully enclosed) backyard.",
    },
    idealLocations: {
      recommended: "Close to the beach - at most 7 to 8 miles.",
      demandDrivers: "Clearwater Beach and Pier 60 are named as the popular nearby demand drivers.",
      whatEvidenceEstablishes: "The source material references a supplied map image showing where the market's top 25% revenue generators lie, as the basis for the mileage guidance.",
      whatEvidenceDoesNotEstablish: "That underlying map image was not included among the folder assets provided for this integration; use the existing Location Analysis map (Section 4) as the current interactive equivalent - it is market-wide, not 3BR-specific, so treat it as supporting context rather than a like-for-like replacement.",
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
        "The source material states a target acquisition price of $500,000. No specific listing was supplied (the source's \"Listing 1\" field was left blank), so there is no property address, Zillow link, CapEx estimate, or underwriting model behind this figure yet.",
      neededFields: [
        "A specific screened candidate listing with address and direct Zillow link",
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
        heading: "Interior theme: tropical, with a specific accent palette",
        body:
          "Most properties in this buy box use a tropical interior theme. Accent colors of aqua blue, green, and white are called out as working well. " +
          "The supplied reference photos show this via a surf-mural living room, a tropical palm-leaf mural living room, and jewel-tone tropical furnishings.",
      },
      {
        heading: "STR regulation fields were not completed in the source material",
        body:
          "The source document's STR Regulations category (regulation tier, permit/residency requirements, operating limits, investor notes) was left as an unfilled template - it describes what such an entry should contain but does not state an actual determination for Clearwater. This is consistent with this webpage's existing Section 3 note that regulatory diligence is deferred to the acquisition-screening phase; no regulation finding is claimed here.",
      },
      {
        heading: "No specific comp identities or links were supplied",
        body:
          "The design and revenue comp sets are supplied as representative photographs only - no Airbnb listing names, URLs, or per-property metrics were included in the source package (the document's own \"ABNB URL\" and revenue-comp-set placeholders were left blank). Treat every image in this buy box as anonymized visual pattern evidence, not as an identified, linkable comp.",
      },
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
      images: [
        photo("4br/core-comp-set/lost-in-paradise/lost-in-paradise-real-bed-capacity.jpg", "Jungle-themed bunk and twin bedroom with real beds at Lost in Paradise", "Dedicated real beds, not padded advertised capacity — Lost in Paradise."),
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
      views: "No required view has been established — no reviewed comp cites a view as part of its mechanism.",
      waterfront: "Not required. A confirmed-waterfront listing elsewhere in this project had the lowest revenue of its comparison set.",
      privacySeclusion: "Privacy and neighbor compatibility require property-level verification — the dataset does not quantify privacy, which is not the same as privacy being irrelevant.",
    },

    // 9. Ideal Locations.
    idealLocations: {
      recommended: "Seminole is the primary geography; Clearwater ZIP 33764 is secondary evidence; Largo remains eligible but is less tested for the core strategy.",
      demandDrivers: "Beach access by a reasonable drive is consistent across core comps.",
      whatEvidenceDoesNotEstablish: "Exact attraction/access guidance beyond reasonable-drive beach proximity remains pending — not yet separately established for this buy box.",
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
          property: "Pink Paradise",
          url: "https://www.airbnb.com/rooms/568002792449614181",
          image: photo("4br/core-comp-set/pink-paradise/pink-paradise-aerial-pool-backyard.jpg", "Aerial view of a pink-decked pool with a covered lounge area", "A branded pool deck as the property's social center."),
        },
        {
          title: "Real sleeping capacity",
          property: "Lost in Paradise",
          url: "https://www.airbnb.com/rooms/1503669407717600557",
          image: photo("4br/core-comp-set/lost-in-paradise/lost-in-paradise-real-bed-capacity.jpg", "Jungle-themed bunk and twin bedroom with real beds", "Dedicated real beds, not padded advertised capacity."),
        },
        {
          title: "Zoned backyard entertainment",
          property: "Tropical Family Villa",
          url: "https://www.airbnb.com/rooms/892437841513061414",
          image: photo("4br/supporting-comp-set/tropical-family-villa/tropical-family-villa-pool-backyard-ecosystem.jpg", "Twilight backyard with a mini-putting green and pool", "A small putting green paired with the pool in one coordinated zone."),
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
      validatedCount: 7, provisionalCount: 4,
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
      low: {
        tier: "Low Tier",
        propertyId: "abnb_1323179023346269133",
        nickname: "Seminole Pool House",
        title: "Heated Pool | Game Room | Fire Pit | 8 Min to IRB",
        url: "https://www.airbnb.com/rooms/1323179023346269133",
        revenue: 77057,
        reviewStatus: "validated",
        takeaway: "This functional but comparatively basic pool area shows less complete merchandising and experience design than the higher-tier examples.",
        image: photo("4br/revenue-tier-previews/low-seminole-pool-house.webp", "Plain rectangular pool and paver deck with a garden hose and simple patio furniture, no thematic branding", "Seminole Pool House — Low Tier revenue comp."),
      },
    },
    // Full 11-comp evidence set (unchanged data) — rendered only inside the expandable "View all 11 revenue comps" panel, as a compact table (no repeated images).
    revenueComps11: [
      { tier: "high", propertyId: "abnb_568002792449614181", nickname: "Pink Paradise", title: "Pretty-n-PINK Mid Century Modern *A Pink Paradise*", url: "https://www.airbnb.com/rooms/568002792449614181", city: "Seminole", zip: "33772", sleeps: 13, baths: 2.5, revenue: 163383, reviewStatus: "validated" },
      { tier: "high", propertyId: "abnb_1245706281749944819", nickname: "Movie Oasis", title: "Movie Oasis | Heated Pool - Hot tub - Game Room", url: "https://www.airbnb.com/rooms/1245706281749944819", city: "Clearwater", zip: "33764", sleeps: 12, baths: 2, revenue: 149881, reviewStatus: "validated" },
      { tier: "high", propertyId: "abnb_1503669407717600557", nickname: "Lost in Paradise", title: "Lost In Paradise - Heated Pool, Spa, MiniGolf", url: "https://www.airbnb.com/rooms/1503669407717600557", city: "Seminole", zip: "33776", sleeps: 10, baths: 2.5, revenue: 138322, reviewStatus: "validated" },
      { tier: "high", propertyId: "abnb_748850360966059896", nickname: "Clearwater GLAM", title: "Clearwater GLAM | Pool, Games, Hot Pink Oasis!", url: "https://www.airbnb.com/rooms/748850360966059896", city: "Clearwater", zip: "33756", sleeps: 10, baths: 3, revenue: 136285, reviewStatus: "validated" },
      { tier: "mid", propertyId: "abnb_1024311140202045123", nickname: "Golf Sim / Clearwater Dream", title: "Golf Sim, Heated Pool, Games | Clearwater Dream!", url: "https://www.airbnb.com/rooms/1024311140202045123", city: "Clearwater", zip: "33764", sleeps: 10, baths: 2, revenue: 124378, reviewStatus: "provisional" },
      { tier: "mid", propertyId: "abnb_1067471228665034482", nickname: "Gameroom / King Beds", title: "Heated pool 12 min to beach w/ Gameroom, king beds", url: "https://www.airbnb.com/rooms/1067471228665034482", city: "Clearwater", zip: "33756", sleeps: 10, baths: 2, revenue: 120212, reviewStatus: "provisional" },
      { tier: "mid", propertyId: "abnb_937434515864957441", nickname: "Flamingo Oasis", title: "The Flamingo Oasis | Bowling, Heated Pool, Hot Tub", url: "https://www.airbnb.com/rooms/937434515864957441", city: "Seminole", zip: "33776", sleeps: 10, baths: 2, revenue: 118328, reviewStatus: "validated" },
      { tier: "mid", propertyId: "abnb_892437841513061414", nickname: "Tropical Family Villa", title: "Clearwater LUXE! Tropical Family Beach Villa", url: "https://www.airbnb.com/rooms/892437841513061414", city: "Seminole", zip: "33776", sleeps: 10, baths: 2, revenue: 118202, reviewStatus: "validated" },
      { tier: "low", propertyId: "abnb_1129680913684900317", nickname: "Mermaid Cove", title: "Heated Pool, Game Room, MiniGolf @ Mermaid Cove", url: "https://www.airbnb.com/rooms/1129680913684900317", city: "Largo", zip: "33774", sleeps: 10, baths: 2, revenue: 85122, reviewStatus: "provisional" },
      { tier: "low", propertyId: "abnb_1134378693882688252", nickname: "Clearwater Heated Pool Family-Friendly", title: "Clearwater Heated Pool Family-Friendly. Near Beach", url: "https://www.airbnb.com/rooms/1134378693882688252", city: "Clearwater", zip: "33764", sleeps: 10, baths: 2, revenue: 83837, reviewStatus: "provisional" },
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
    status: "pending",
    pendingNote:
      "The 5BR workstream has not yet reached provisional buy-box synthesis in the canonical project files. " +
      "5BR is currently a research workstream (see LLM_CONTEXT.md > Team Ownership), not a locked buy box. " +
      "Market-level 5BR benchmarks exist (see Section 6) and can inform this buy box once it is developed, " +
      "but no comp set, hero mechanism, or revenue range has been established yet.",
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
    { segment: "3BR", kids: 0.39, groupTrip: 0.222, other: 0.292 },
    { segment: "4BR", kids: 0.401, groupTrip: 0.382, other: 0.144 },
    { segment: "5BR", kids: 0.433, groupTrip: 0.406, other: 0.078 },
  ],
  interpretation:
    "The single largest jump in group-trip share across the entire market occurs at the 3BR-to-4BR transition (+16.0 percentage points) — 4BR's group-trip composition is already close to 5BR levels, even though its family (kids) composition sits between 3BR and 5BR. This directly supports a 4BR product built around both family and celebration/friend-group demand simultaneously, while 3BR reads as more purely family-oriented and 5BR serves the largest, most group-dominant travel parties. City-level guest composition is broadly similar across Clearwater, Largo, and Seminole (kids 30-33%, group trip 19-26%), which weighs against a guest-composition explanation for Seminole's revenue premium and toward a product/amenity/geography explanation — without proving causation.",
};

// ---------------------------------------------------------------------------
// Property-size analysis (Section 6)
// ---------------------------------------------------------------------------

const PROPERTY_SIZE = {
  marketDistribution: [
    { segment: "3BR", share: 0.381, n: 261 },
    { segment: "4BR", share: 0.255, n: 175 },
    { segment: "2BR", share: 0.161, n: 110 },
    { segment: "1BR", share: 0.092, n: 63 },
    { segment: "5BR", share: 0.085, n: 58 },
    { segment: "6BR+", share: 0.026, n: 18 },
  ],
  topQuartileDistribution: [
    { segment: "3BR", n: 42, share: 0.353 },
    { segment: "4BR", n: 32, share: 0.269 },
    { segment: "2BR", n: 18, share: 0.151 },
    { segment: "1BR", n: 12, share: 0.101 },
    { segment: "5BR", n: 12, share: 0.101 },
    { segment: "6BR+", n: 3, share: 0.025 },
  ],
  revenueBySize: [
    { segment: "3BR", medianRevenue: 69663, medianAdr: 278, medianOcc: 0.708 },
    { segment: "4BR", medianRevenue: 101065, medianAdr: 405, medianOcc: 0.662 },
    { segment: "5BR", medianRevenue: 160603, medianAdr: 672, medianOcc: 0.711 },
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
