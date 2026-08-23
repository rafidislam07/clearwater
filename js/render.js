/**
 * Presentation/rendering logic. Reads content exclusively from data.js globals
 * (BUY_BOXES, MARKET_INTRO, DEMOGRAPHICS, PROPERTY_SIZE, SPLIT_JUSTIFICATION,
 * REGULATION_NOTE, ALEXANDRIA) — no content strings are authored in this file.
 */

// --- small formatting helpers -------------------------------------------------

function fmtCurrency(n) {
  if (n == null) return "—";
  return "$" + Math.round(n).toLocaleString("en-US");
}

function fmtPct(n) {
  if (n == null) return "—";
  return (n * 100).toFixed(1) + "%";
}

function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}

// Looks a comp up by property ID across every buy box's designComps list.
function findComp(propertyId) {
  for (const box of BUY_BOXES) {
    if (!box.designComps) continue;
    const hit = box.designComps.find((c) => c.propertyId === propertyId);
    if (hit) return hit;
  }
  return null;
}

// No property photography is stored in this project yet. Rather than invent or
// hotlink an image we cannot verify, render a labeled placeholder that links
// straight to the real Airbnb listing. Swap this for a real <img> once photos
// are added to webpage/assets/ and referenced from data.js.
function imagePlaceholder(propertyId, opts) {
  opts = opts || {};
  const comp = findComp(propertyId);
  const label = comp ? comp.nickname : propertyId;
  const wrap = el("a", "img-placeholder", "");
  wrap.href = comp ? comp.url : "#";
  wrap.target = "_blank";
  wrap.rel = "noopener";
  wrap.innerHTML =
    '<span class="img-placeholder__label">' + label + "</span>" +
    '<span class="img-placeholder__cta">Photo pending — view on Airbnb ↗</span>';
  if (opts.small) wrap.classList.add("img-placeholder--small");
  return wrap;
}

// Renders one real supplied photo (data.js `photo(...)` objects) as a clickable
// figure with caption; opens the shared lightbox on click. This is the image path
// used by buy boxes with real stored photography (currently 3BR).
function photoFigure(p, opts) {
  opts = opts || {};
  const fig = el("figure", "photo-figure" + (opts.small ? " photo-figure--small" : ""));
  const btn = el("button", "photo-figure__trigger");
  btn.type = "button";
  btn.setAttribute("aria-label", "Expand image: " + p.alt);
  const img = document.createElement("img");
  img.src = p.file;
  img.alt = p.alt;
  img.loading = "lazy";
  img.decoding = "async";
  btn.appendChild(img);
  btn.addEventListener("click", () => openLightbox(p.file, p.alt, p.caption));
  fig.appendChild(btn);
  if (p.caption) fig.appendChild(el("figcaption", null, p.caption));
  return fig;
}

// Dispatches between the two supported image-reference shapes:
//  - a bare property-ID string -> imagePlaceholder (4BR path, no stored photo yet)
//  - a `photo(...)` object with a real `file` path -> photoFigure (3BR path)
function renderImage(ref, opts) {
  if (typeof ref === "string") return imagePlaceholder(ref, opts);
  return photoFigure(ref, opts);
}

function renderImageGrid(images, opts) {
  const wrap = el("div", "dd-block__images");
  images.forEach((ref) => wrap.appendChild(renderImage(ref, opts)));
  return wrap;
}

// --- Lightbox (shared by every real-photo gallery on the page) ---------------

function openLightbox(src, alt, caption) {
  const overlay = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-image");
  const cap = document.getElementById("lightbox-caption");
  img.src = src;
  img.alt = alt || "";
  cap.textContent = caption || "";
  overlay.classList.add("lightbox--open");
  overlay.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  const overlay = document.getElementById("lightbox");
  overlay.classList.remove("lightbox--open");
  overlay.setAttribute("aria-hidden", "true");
  document.getElementById("lightbox-image").src = "";
}

function alexandriaButton(label, url) {
  const btn = el("a", "btn btn--alexandria");
  if (url) {
    btn.href = url;
    btn.target = "_blank";
    btn.rel = "noopener";
    btn.textContent = label;
  } else {
    btn.href = "#";
    btn.classList.add("btn--pending");
    btn.setAttribute("aria-disabled", "true");
    btn.textContent = label + " (pending)";
  }
  return btn;
}

function pendingBadge(text) {
  return el("span", "badge badge--pending", text || "Pending verification");
}

// --- Section 1: buy-box declarations ------------------------------------------

function renderDeclarations() {
  const host = document.getElementById("buybox-declarations");
  host.innerHTML = "";
  BUY_BOXES.forEach((box) => {
    const card = el("div", "declaration-card");
    if (box.status !== "developed") {
      card.classList.add("declaration-card--pending");
      card.appendChild(el("h3", null, box.label));
      card.appendChild(pendingBadge("Pending"));
      card.appendChild(el("p", "declaration-card__pending-note", box.pendingNote));
      host.appendChild(card);
      return;
    }
    const priceRow = box.atAGlance.targetAcquisitionPrice
      ? "<dt>Target acquisition price</dt><dd>" + box.atAGlance.targetAcquisitionPrice + "</dd>"
      : "";
    card.innerHTML =
      '<div class="declaration-card__eyebrow">' + box.label + "</div>" +
      "<h3>" + box.name + "</h3>" +
      '<p class="declaration-card__thesis">' + box.thesis + "</p>" +
      '<dl class="declaration-card__specs">' +
      "<dt>Bed / Bath</dt><dd>" + box.atAGlance.bedBath + "</dd>" +
      "<dt>Comfortable sleeps</dt><dd>" + box.atAGlance.sleeps + "</dd>" +
      "<dt>Hero mechanism</dt><dd>" + box.atAGlance.heroMechanism + "</dd>" +
      "<dt>Preliminary revenue</dt><dd>" + box.atAGlance.revenue + "</dd>" +
      priceRow +
      "<dt>Primary acquisition requirement</dt><dd>" + box.atAGlance.primaryRequirement + "</dd>" +
      "</dl>";
    host.appendChild(card);
  });
}

// --- Section 2 / 3: market intro + regulation note ----------------------------

function renderMarketIntro() {
  const host = document.getElementById("market-intro-body");
  host.innerHTML =
    "<dl class='intro-grid'>" +
    "<dt>Market boundaries</dt><dd>" + MARKET_INTRO.boundaries + "</dd>" +
    "<dt>STR composition</dt><dd>" + MARKET_INTRO.composition + "</dd>" +
    "<dt>Revenue opportunity</dt><dd>" + MARKET_INTRO.revenueOpportunity + "</dd>" +
    "<dt>Demand drivers</dt><dd>" + MARKET_INTRO.demandDrivers + "</dd>" +
    "<dt>Market characteristics</dt><dd>" + MARKET_INTRO.characteristics + "</dd>" +
    "</dl>";
}

function renderRegulationNote() {
  document.getElementById("regulations-note").textContent = REGULATION_NOTE;
}

// --- Section 5 / 6 interpretation strips --------------------------------------

function renderDemographicsInterpretation() {
  document.getElementById("demographics-interpretation").textContent = DEMOGRAPHICS.interpretation;
}

function renderPropertySizeInterpretation() {
  document.getElementById("property-size-interpretation").textContent = PROPERTY_SIZE.interpretation;
}

// --- Section 7: justification --------------------------------------------------

function renderJustification() {
  const host = document.getElementById("justification-list");
  host.innerHTML = "";
  SPLIT_JUSTIFICATION.forEach((point) => {
    host.appendChild(el("li", null, point));
  });
}

// --- Section 8: deep dive (reusable component) --------------------------------

function renderDeepDiveTabs() {
  const host = document.getElementById("deep-dive-tabs");
  host.innerHTML = "";
  const defaultBox = BUY_BOXES.find((b) => b.status === "developed") || BUY_BOXES[0];
  BUY_BOXES.forEach((box) => {
    const btn = el("button", "tab" + (box.id === defaultBox.id ? " tab--active" : ""), box.label);
    btn.type = "button";
    btn.dataset.boxId = box.id;
    btn.addEventListener("click", () => {
      document.querySelectorAll("#deep-dive-tabs .tab").forEach((t) => t.classList.remove("tab--active"));
      btn.classList.add("tab--active");
      renderDeepDive(box);
    });
    host.appendChild(btn);
  });
}

function pendingSection(box) {
  const wrap = el("div", "deep-dive deep-dive--pending");
  wrap.appendChild(el("h3", null, box.label));
  wrap.appendChild(pendingBadge("Not yet developed"));
  wrap.appendChild(el("p", null, box.pendingNote));
  wrap.appendChild(
    el(
      "p",
      "deep-dive__structure-note",
      "This buy box will use the exact same A–N structure as the 4BR deep dive once its buy-box definition, comp set, and revenue tiers are locked in the canonical project files."
    )
  );
  return wrap;
}

function specRow(label, value) {
  const row = el("div", "spec-row");
  row.appendChild(el("span", "spec-row__label", label));
  row.appendChild(el("span", "spec-row__value", value));
  return row;
}

// Builds the metrics <li> list for a comp card, skipping any field the comp
// doesn't have data for. Accepts either the legacy nested shape
// (`comp.metrics.revenue`, used by the original 3-core-comp write-ups) or the
// flatter shape used by the 11-comp revenue-proof set (`comp.revenue` directly)
// — normalized to `m` below — since several of those 11 rows only have
// revenue/sleeps/baths, not the full ADR/occupancy/beds set.
function compMetricsList(comp) {
  const m = comp.metrics || comp;
  const items = [];
  if (m.revenue != null) items.push("<strong>" + fmtCurrency(m.revenue) + "</strong> revenue");
  if (m.adr != null) items.push(fmtCurrency(m.adr) + " ADR");
  if (m.occupancy != null) items.push(fmtPct(m.occupancy) + " occupancy");
  const capacity = [];
  if (m.bedrooms != null) capacity.push(m.bedrooms + " BR");
  if (m.beds != null) capacity.push(m.beds + " beds");
  if (m.baths != null) capacity.push(m.baths + " BA");
  if (m.sleeps != null) capacity.push("sleeps " + m.sleeps);
  if (capacity.length) items.push(capacity.join(" / "));
  return items;
}

// Renders one identified Airbnb comp as a card. Image comes from `comp.image`
// (a real `photo(...)` object) when present, otherwise falls back to the
// pending-photo Airbnb-link placeholder via `comp.propertyId` — both paths go
// through the shared `renderImage` dispatcher. The analytical paragraphs
// (role/proves/replicate/limitation) and the location/review-status line are
// each optional and are skipped when the comp doesn't carry that field, so the
// same function serves both a rich comp write-up and a lean revenue-table row.
function compCard(comp) {
  const card = el("div", "comp-card");
  card.appendChild(renderImage(comp.image || comp.propertyId));
  const body = el("div", "comp-card__body");
  let html = "<h4>" + comp.nickname + "</h4>" + '<p class="comp-card__title">' + comp.title + "</p>";
  if (comp.city) html += '<p class="comp-card__location">' + comp.city + (comp.zip ? " " + comp.zip : "") + "</p>";
  html += '<a class="comp-card__link" href="' + comp.url + '" target="_blank" rel="noopener">View on Airbnb ↗</a>';
  html += '<ul class="comp-card__metrics">' + compMetricsList(comp).map((i) => "<li>" + i + "</li>").join("") + "</ul>";
  if (comp.role) html += '<p class="comp-card__role"><strong>Role:</strong> ' + comp.role + "</p>";
  if (comp.proves) html += '<p class="comp-card__proves"><strong>What it proves:</strong> ' + comp.proves + "</p>";
  if (comp.replicate) html += '<p class="comp-card__replicate"><strong>Replicate:</strong> ' + comp.replicate + "</p>";
  if (comp.limitation) html += '<p class="comp-card__limitation"><strong>Limitation:</strong> ' + comp.limitation + "</p>";
  body.innerHTML = html;
  if (comp.reviewStatus === "provisional") {
    body.appendChild(pendingBadge("Dataset-only — provisional"));
  }
  card.appendChild(body);
  return card;
}

function revenueTierCard(box, tier) {
  const card = el("div", "tier-card");
  card.innerHTML =
    "<h4>" + tier.label + " — " + tier.range + "</h4>" +
    "<p class='tier-card__quality'>" + (tier.qualityRequired || tier.roleDescription || "") + "</p>";
  if (tier.comps) {
    // Identified Airbnb comps with URLs/metrics (4BR path).
    const compsRow = el("div", "tier-card__comps");
    tier.comps.forEach((pid) => {
      const comp = findComp(pid);
      if (comp) compsRow.appendChild(compCard(comp));
    });
    if (tier.secondCompPending) {
      const pendingCard = el("div", "comp-card comp-card--pending");
      pendingCard.appendChild(pendingBadge("Second comp pending"));
      pendingCard.appendChild(el("p", null, tier.secondCompPending));
      compsRow.appendChild(pendingCard);
    }
    card.appendChild(compsRow);
  } else if (tier.photos) {
    // Anonymous supplied photography, no identified listing (3BR path).
    card.appendChild(renderImageGrid(tier.photos));
  }
  return card;
}

// A. Identity (buy-box answer). Extracted into its own function so both the
// legacy A-N flow and the narrative flow (see NARRATIVE_BLOCKS below) render it
// identically. `box.provisionalNote` and `box.atAGlance.geography` are optional
// and purely additive - 3BR has neither, so its output is byte-for-byte unchanged.
function identityBlock(box) {
  const idSec = el("section", "dd-block dd-block--identity");
  idSec.innerHTML =
    '<div class="dd-block__eyebrow">' + box.label + "</div>" +
    "<h3>" + box.name + "</h3>" +
    "<p class='deep-dive__thesis'>" + box.thesis + "</p>" +
    (box.whyItWorks ? "<p class='deep-dive__why-it-works'><strong>Why this buy box works:</strong> " + box.whyItWorks + "</p>" : "");
  if (box.provisionalNote) idSec.appendChild(pendingBadge(box.provisionalNote));
  const specs = el("div", "spec-grid");
  specs.appendChild(specRow("Bed / Bath", box.atAGlance.bedBath));
  specs.appendChild(specRow("Comfortable sleeps", box.atAGlance.sleeps));
  specs.appendChild(specRow("Hero mechanism", box.atAGlance.heroMechanism));
  specs.appendChild(specRow("Preliminary revenue", box.atAGlance.revenue));
  if (box.atAGlance.geography) specs.appendChild(specRow("Geography", box.atAGlance.geography));
  idSec.appendChild(specs);
  const coreList = el("ul", "core-characteristics");
  box.coreCharacteristics.forEach((c) => coreList.appendChild(el("li", null, c)));
  idSec.appendChild(el("h4", null, "Core characteristics"));
  idSec.appendChild(coreList);
  return idSec;
}

// N. Purchase price / acquisition status. Extracted the same way as identityBlock.
// `box.purchasePrice.zillowStatus` (an array of short status lines) is optional and
// purely additive - 3BR's purchasePrice object has no such field, so unaffected.
function purchasePriceBlock(box) {
  const priceSec = el("section", "dd-block dd-block--pending-price");
  priceSec.appendChild(el("h4", "dd-block__title", "Purchase Price"));
  if (box.purchasePrice.status === "pending") {
    priceSec.appendChild(pendingBadge("Pending Zillow screening and underwriting"));
  } else if (box.purchasePrice.status === "partial") {
    priceSec.appendChild(el("p", "purchase-price__target", "<strong>Target acquisition price: " + box.purchasePrice.targetPrice + "</strong>"));
    priceSec.appendChild(pendingBadge("Candidate, CapEx, and underwriting pending"));
  }
  priceSec.appendChild(el("p", null, box.purchasePrice.note));
  if (box.purchasePrice.zillowStatus && box.purchasePrice.zillowStatus.length) {
    priceSec.appendChild(el("p", "needed-fields-list__label", "Acquisition / Zillow status:"));
    const zillowList = el("ul", "needed-fields-list");
    box.purchasePrice.zillowStatus.forEach((s) => zillowList.appendChild(el("li", null, s)));
    priceSec.appendChild(zillowList);
  }
  const needed = el("ul", "needed-fields-list");
  box.purchasePrice.neededFields.forEach((f) => needed.appendChild(el("li", null, f)));
  priceSec.appendChild(el("p", "needed-fields-list__label", "Required inputs to complete this section:"));
  priceSec.appendChild(needed);
  return priceSec;
}

// L. Analyst notes. Extracted the same way as identityBlock/purchasePriceBlock.
function analystNotesBlock(box) {
  const notesSec = el("section", "dd-block dd-block--notes");
  notesSec.appendChild(el("h4", "dd-block__title", "Analyst Notes"));
  box.analystNotes.forEach((n) => {
    const note = el("div", "analyst-note");
    note.innerHTML = "<h5>" + n.heading + "</h5><p>" + n.body + "</p>";
    notesSec.appendChild(note);
  });
  return notesSec;
}

// --- BuyBox Template V.2 blocks — used only by buy boxes that set
// `box.narrative = true` and provide `box.buyBoxSections` (currently 4BR).
// Each function is a small, generic renderer built from shared helpers
// (el, renderImage, alexandriaButton, pendingBadge) plus a handful of new
// "bb2-*" presentation classes scoped under the `.bb2` wrapper — so none of
// this touches 3BR's legacy A-N styling or markup.

// 1. Buy-Box Summary.
function bb2OverviewBlock(box) {
  const ov = box.overview;
  const sec = el("section", "bb2-hero");
  const media = el("div", "bb2-hero__media");
  media.appendChild(renderImage(ov.heroImage));
  const body = el("div", "bb2-hero__body");
  body.appendChild(el("span", "badge badge--pending bb2-hero__status", ov.statusBadge));
  body.appendChild(el("h3", "bb2-hero__title", box.name));
  body.appendChild(el("p", "bb2-hero__thesis", ov.thesis));
  if (ov.whyItWorks) body.appendChild(el("p", "bb2-hero__why", "<strong>Why this buy box works:</strong> " + ov.whyItWorks));
  const chips = el("div", "bb2-chip-row");
  ov.chips.forEach((c) => chips.appendChild(el("span", "bb2-chip", c.label)));
  body.appendChild(chips);
  const revChips = el("div", "bb2-chip-row bb2-chip-row--revenue");
  ov.revenueChips.forEach((c) => {
    const chip = el("span", "bb2-chip bb2-chip--revenue");
    chip.innerHTML = "<strong>" + c.label + "</strong> " + c.value;
    revChips.appendChild(chip);
  });
  body.appendChild(revChips);
  sec.appendChild(media);
  sec.appendChild(body);
  return sec;
}

// 2. Architectural Style.
function bb2ArchitecturalStyleBlock(box) {
  const a = box.architecturalStyle;
  return ddBlock("Architectural Style", [
    ["Recommended", listHtml(a.recommended)],
    ["Why this works", a.why],
    ["Avoid", a.avoid && a.avoid.length ? listHtml(a.avoid) : null],
  ], a.images);
}

// 3. Bedrooms & Bathrooms.
function bb2BedroomsBathroomsBlock(box) {
  const b = box.bedroomsBathrooms;
  return ddBlock("Bedrooms & Bathrooms", [
    ["Target range", b.targetRange],
    ["Functional requirement", b.functionalNote],
  ], null, "compact");
}

// 4. Ideal Sleep Count.
function bb2SleepCountBlock(box) {
  const s = box.sleepCount;
  return ddBlock("Ideal Sleep Count", [
    ["Comfortable capacity", "<strong>" + s.comfortableCapacity + "</strong>"],
    ["Preferred configuration", s.preferredConfiguration],
    ["Capacity-coherence requirement", s.coherenceRequirement],
  ], s.images);
}

// 5. Backyard Size & Usability.
function bb2BackyardBlock(box) {
  const b = box.backyard;
  return ddBlock("Backyard Size & Usability", [
    ["Required usable space", b.usableSpace],
    ["Amenity-zone requirement", b.amenityZoneRequirements],
  ], b.images);
}

// 6. Must-Have Amenities — compact checklist cards, not long prose per item.
function bb2MustHaveAmenitiesBlock(box) {
  const m = box.mustHaveAmenities;
  const sec = el("section", "dd-block");
  sec.appendChild(el("h4", "dd-block__title", "Must-Have Amenities"));
  const list = el("ul", "bb2-checklist bb2-checklist--grid bb2-checklist--check");
  m.items.forEach((item) => list.appendChild(el("li", null, item)));
  sec.appendChild(list);
  const strip = el("div", "bb2-evidence-strip");
  strip.appendChild(el("span", "bb2-evidence-strip__label", m.evidenceNote.label));
  strip.appendChild(el("span", "bb2-evidence-strip__stats", m.evidenceNote.stats));
  strip.appendChild(el("span", "bb2-evidence-strip__caveat", m.evidenceNote.caveat));
  sec.appendChild(strip);
  return sec;
}

// 7. Nice-to-Have Amenities — strongly preferred (starred list) vs. optional (chips),
// kept visually distinct so neither reads as a requirement.
function bb2NiceToHaveAmenitiesBlock(box) {
  const n = box.niceToHaveAmenities;
  const sec = el("section", "dd-block");
  sec.appendChild(el("h4", "dd-block__title", "Nice-to-Have Amenities"));
  const prefTier = el("div", "bb2-tier bb2-tier--preferred");
  prefTier.appendChild(el("h6", "bb2-tier__title", "Strongly Preferred"));
  const prefList = el("ul", "bb2-checklist bb2-checklist--star");
  n.stronglyPreferred.forEach((item) => prefList.appendChild(el("li", null, item)));
  prefTier.appendChild(prefList);
  sec.appendChild(prefTier);
  const optTier = el("div", "bb2-tier bb2-tier--optional");
  optTier.appendChild(el("h6", "bb2-tier__title", "Optional Differentiators"));
  const optChips = el("div", "bb2-chip-row");
  n.optional.forEach((item) => optChips.appendChild(el("span", "bb2-chip bb2-chip--optional", item)));
  optTier.appendChild(optChips);
  if (n.optionalNote) optTier.appendChild(el("p", "dd-block__note", n.optionalNote));
  sec.appendChild(optTier);
  return sec;
}

// 8. Geographic Considerations.
function bb2GeographicConsiderationsBlock(box) {
  const g = box.geographicConsiderations;
  return ddBlock("Geographic Considerations", [
    ["Views", g.views],
    ["Waterfront", g.waterfront],
    ["Privacy / seclusion", g.privacySeclusion],
  ], null, "compact");
}

// 9. Ideal Locations.
function bb2IdealLocationsBlock(box) {
  const i = box.idealLocations;
  return ddBlock("Ideal Locations", [
    ["Recommended", i.recommended],
    ["Demand drivers nearby", i.demandDrivers],
    ["What the evidence does not yet establish", i.whatEvidenceDoesNotEstablish],
  ], null, "compact");
}

// 10. Traveler ICP.
function bb2TravelerICPBlock(box) {
  const t = box.travelerICP;
  return ddBlock("Traveler ICP", [
    ["Primary profile", t.primary],
    ["Secondary profile", t.secondary],
  ], null, "compact");
}

// 11. Design — Top Designs — organized by mechanism, not by property gallery.
function bb2DesignPlaybookBlock(box) {
  const dp = box.designPlaybook;
  const sec = el("section", "dd-block");
  sec.appendChild(el("h4", "dd-block__title", "Design — Top Designs"));
  const grid = el("div", "bb2-playbook-grid");
  dp.mechanisms.forEach((m) => {
    const card = el("figure", "bb2-mechanism-card");
    const btn = el("button", "photo-figure__trigger");
    btn.type = "button";
    btn.setAttribute("aria-label", "Expand image: " + m.image.alt);
    const img = document.createElement("img");
    img.src = m.image.file;
    img.alt = m.image.alt;
    img.loading = "lazy";
    img.decoding = "async";
    btn.appendChild(img);
    btn.addEventListener("click", () => openLightbox(m.image.file, m.image.alt, m.image.caption));
    card.appendChild(btn);
    const cap = el("figcaption", "bb2-mechanism-card__caption");
    // `m.property` is omitted entirely (not just left blank) when a source property
    // has not been verified - no "attribution pending" text is ever shown to the client.
    cap.innerHTML =
      "<strong>" + m.title + "</strong>" +
      (m.property ? '<span class="bb2-mechanism-card__property">' + m.property + (m.url ? ' · <a href="' + m.url + '" target="_blank" rel="noopener">View on Airbnb ↗</a>' : "") + "</span>" : "") +
      "<span class='bb2-mechanism-card__note'>" + m.image.caption + "</span>";
    card.appendChild(cap);
    grid.appendChild(card);
  });
  sec.appendChild(grid);

  // Weak execution contrast row.
  const we = dp.weakExecution;
  const contrastSec = ddBlock(we.title, [
    ["Property", '<a href="' + we.url + '" target="_blank" rel="noopener">' + we.property + " ↗</a>"],
    ["What this shows", we.explanation],
  ], we.images, "contrast");
  sec.appendChild(contrastSec);

  // Premium ideas callout.
  const pv = dp.premium;
  const premiumSec = ddBlock(pv.title, [["Framing", pv.framing]], pv.images, "premium");
  premiumSec.appendChild(pendingBadge("Premium inspiration — not a core requirement"));
  sec.appendChild(premiumSec);

  sec.appendChild(alexandriaButton("Open Design Comp Set in Alexandria", box.alexandria.designCompSetUrl));
  return sec;
}

// "Revenue Tiers at a Glance" — one representative, verified-photo card per tier.
// A tier with no verified image (currently Low Tier - see data.js comment) renders
// a clearly labeled pending placeholder instead of a substituted or fabricated image.
function bb2RevenueTierPreviewBlock(box) {
  const tp = box.revenueTierPreview;
  const wrap = el("div", "bb2-tier-preview");
  wrap.appendChild(el("h5", "bb2-amenity-heading", "Revenue Tiers at a Glance"));
  const grid = el("div", "bb2-tier-preview-grid");
  ["high", "mid", "low"].forEach((key) => grid.appendChild(bb2TierPreviewCard(tp[key])));
  wrap.appendChild(grid);
  return wrap;
}
function bb2TierPreviewCard(t) {
  const card = el("div", "bb2-tier-preview-card");
  if (t.pending || !t.image) {
    const ph = el("div", "img-placeholder bb2-tier-preview-card__placeholder", "");
    ph.innerHTML = '<span class="img-placeholder__label">Photo pending</span><span class="img-placeholder__cta">No verified image available</span>';
    card.appendChild(ph);
  } else {
    card.appendChild(renderImage(t.image));
  }
  const body = el("div", "bb2-tier-preview-card__body");
  let html =
    "<span class='bb2-tier-preview-card__tier'>" + t.tier + "</span>" +
    "<h6>" + t.nickname + "</h6>" +
    "<p class='bb2-tier-preview-card__title'>" + t.title + "</p>" +
    "<p class='bb2-tier-preview-card__revenue'>" + fmtCurrency(t.revenue) + " revenue potential</p>";
  if (t.takeaway) html += "<p class='bb2-tier-preview-card__takeaway'>" + t.takeaway + "</p>";
  if (t.missingRequirement) html += "<p class='dd-block__note'>" + t.missingRequirement + "</p>";
  html += '<a class="comp-card__link" href="' + t.url + '" target="_blank" rel="noopener">View on Airbnb ↗</a>';
  body.innerHTML = html;
  if (t.reviewStatus === "provisional") {
    body.appendChild(pendingBadge("Dataset-only — provisional"));
  } else {
    body.appendChild(el("span", "badge bb2-badge--validated", "Manually reviewed"));
  }
  card.appendChild(body);
  return card;
}

// 13. Revenue Potential — compact summary + expandable full evidence.
function bb2ProjectionsBlock(box) {
  const s = box.revenueSummary;
  const sec = el("section", "dd-block");
  sec.appendChild(el("h4", "dd-block__title", "Revenue Potential"));
  const stats = el("div", "bb2-stat-row");
  [
    ["Conservative floor", s.conservative],
    ["Realistic base", s.base],
    ["Strong execution", s.strong],
    ["Upside", s.upside],
  ].forEach(([label, value]) => {
    const stat = el("div", "bb2-stat");
    stat.innerHTML = "<span class='bb2-stat__value'>" + value + "</span><span class='bb2-stat__label'>" + label + "</span>";
    stats.appendChild(stat);
  });
  sec.appendChild(stats);
  sec.appendChild(
    el(
      "p",
      "dd-block__note",
      "Observed comp range " + fmtCurrency(s.min) + "–" + fmtCurrency(s.max) + " · median " + fmtCurrency(s.median) +
        " · " + s.count + " comps (" + s.high + " high / " + s.mid + " mid / " + s.low + " low). " + s.note
    )
  );

  sec.appendChild(bb2RevenueTierPreviewBlock(box));

  const details = el("details", "bb2-details");
  const summary = el("summary", "bb2-details__summary", "View all " + s.count + " revenue comps");
  details.appendChild(summary);
  details.appendChild(el("p", "dd-block__note", s.validatedCount + " manually reviewed/validated · " + s.provisionalCount + " dataset-only/provisional."));
  details.appendChild(bb2CompTable(box.revenueComps11));
  sec.appendChild(details);

  sec.appendChild(alexandriaButton("Open Revenue Comp Set in Alexandria", box.alexandria.revenueCompSetUrl));
  return sec;
}
function bb2CompTable(comps) {
  const wrap = el("div", "bb2-comp-table-wrap");
  const table = el("table", "bb2-comp-table");
  table.innerHTML =
    "<thead><tr><th>Tier</th><th>Property</th><th>City / ZIP</th><th>Sleeps</th><th>Revenue</th><th>Status</th><th>Listing</th></tr></thead>";
  const tbody = document.createElement("tbody");
  ["high", "mid", "low"].forEach((tierKey) => {
    comps.filter((c) => c.tier === tierKey).forEach((c) => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>" + tierKey[0].toUpperCase() + tierKey.slice(1) + "</td>" +
        "<td>" + c.nickname + "</td>" +
        "<td>" + c.city + " " + c.zip + "</td>" +
        "<td>" + c.sleeps + "</td>" +
        "<td>" + fmtCurrency(c.revenue) + "</td>" +
        "<td>" + (c.reviewStatus === "provisional" ? "<span class='badge badge--pending'>Dataset-only — provisional</span>" : "Validated") + "</td>" +
        '<td><a href="' + c.url + '" target="_blank" rel="noopener">Airbnb ↗</a></td>';
      tbody.appendChild(tr);
    });
  });
  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}

// 12. Analyst Notes (concise bullet list, not paragraph-per-heading).
function analystNotesV2Block(box) {
  const sec = el("section", "dd-block dd-block--notes");
  sec.appendChild(el("h4", "dd-block__title", "Analyst Notes"));
  const list = el("ul", "bb2-notes-list");
  box.analystNotes.forEach((n) => list.appendChild(el("li", null, n)));
  sec.appendChild(list);
  return sec;
}

// STR Regulations — a compact, collapsed-by-default accordion (not a large leading
// block of repetitive "Verification pending" rows) placed near Purchase Price.
function bb2RegulationsBlock(box) {
  const r = box.regulations;
  const details = el("details", "bb2-details");
  details.appendChild(el("summary", "bb2-details__summary", "STR Regulations — Address-Level Verification Pending"));
  const rows = el("div", "dd-rows");
  [
    ["Regulation tier", r.tier],
    ["Permit / license", r.permit],
    ["Residency requirement", r.residency],
    ["Operating limits", r.operatingLimits],
    ["Investor notes", r.investorNotes],
  ].forEach(([label, value]) => {
    const row = el("div", "dd-row");
    row.innerHTML = "<span class='dd-row__label'>" + label + "</span><div class='dd-row__value'>" + value + "</div>";
    rows.appendChild(row);
  });
  details.appendChild(rows);
  return details;
}

// 14. Acquisition / Purchase-Price Guidance (concise, no long checklist).
function acquisitionV2Block(box) {
  const acq = box.acquisition;
  const sec = el("section", "dd-block dd-block--pending-price");
  sec.appendChild(el("h4", "dd-block__title", "Purchase Price"));
  sec.appendChild(pendingBadge(acq.status));
  sec.appendChild(el("p", null, acq.zillowSummary));
  sec.appendChild(el("p", "bb2-next-step", "<strong>Next step:</strong> " + acq.nextStep));
  return sec;
}

const NARRATIVE_BLOCKS = {
  overview: bb2OverviewBlock,
  architecturalStyle: bb2ArchitecturalStyleBlock,
  bedroomsBathrooms: bb2BedroomsBathroomsBlock,
  sleepCount: bb2SleepCountBlock,
  backyard: bb2BackyardBlock,
  mustHaveAmenities: bb2MustHaveAmenitiesBlock,
  niceToHaveAmenities: bb2NiceToHaveAmenitiesBlock,
  geographicConsiderations: bb2GeographicConsiderationsBlock,
  idealLocations: bb2IdealLocationsBlock,
  travelerICP: bb2TravelerICPBlock,
  designPlaybook: bb2DesignPlaybookBlock,
  analystNotesV2: analystNotesV2Block,
  projections: bb2ProjectionsBlock,
  regulations: bb2RegulationsBlock,
  acquisitionV2: acquisitionV2Block,
};

function renderDeepDive(box) {
  const host = document.getElementById("deep-dive-content");
  host.innerHTML = "";
  if (box.status !== "developed") {
    host.appendChild(pendingSection(box));
    return;
  }

  if (box.narrative && box.buyBoxSections) {
    const root = el("div", "deep-dive bb2");
    box.buyBoxSections.forEach((key) => {
      const builder = NARRATIVE_BLOCKS[key];
      if (builder) root.appendChild(builder(box));
    });
    host.appendChild(root);
    return;
  }

  const root = el("div", "deep-dive");

  // --- Legacy A-N structure (currently 3BR; used automatically by any future
  // buy box that doesn't set `narrative`/`deepDiveSections`) ---

  // A. Identity
  root.appendChild(identityBlock(box));

  // B. Architectural style
  root.appendChild(
    ddBlock("Architectural Style", [
      ["Recommended styles", listHtml(box.architecturalStyle.recommended)],
      ["Why these work", box.architecturalStyle.why],
      ["Avoid", box.architecturalStyle.avoid && box.architecturalStyle.avoid.length ? listHtml(box.architecturalStyle.avoid) : null],
    ], box.architecturalStyle.images)
  );

  // C. Bedrooms and bathrooms
  root.appendChild(
    ddBlock("Bedrooms & Bathrooms", [
      ["Target range", box.bedroomsBathrooms.targetRange],
      ["Preferred distribution", box.bedroomsBathrooms.preferredDistribution],
      ["Supporting evidence", box.bedroomsBathrooms.evidence],
      ["Functional requirement", box.bedroomsBathrooms.functionalNote],
    ])
  );

  // D. Sleep count
  root.appendChild(
    ddBlock("Ideal Sleep Count", [
      ["Advertised capacity (across comps)", box.sleepCount.advertisedRange],
      ["Comfortable underwriting capacity", "<strong>" + box.sleepCount.comfortableCapacity + "</strong>"],
      ["Minimum legitimate bed count", box.sleepCount.minimumBedCount],
      ["Preferred configuration", box.sleepCount.preferredConfiguration],
      ["Capacity-coherence requirement", box.sleepCount.coherenceRequirement],
    ])
  );

  // E. Backyard
  root.appendChild(
    ddBlock("Backyard Size & Usability", [
      ["Required usable space", box.backyard.usableSpace],
      ["Amenity-zone requirement", box.backyard.amenityZoneRequirements],
      ["Privacy / lot-size note", box.backyard.privacyNote],
      ["Indoor-outdoor flow", box.backyard.indoorOutdoorFlow],
    ], box.backyard.images)
  );

  // F. Must-have amenities
  const mustSec = el("section", "dd-block");
  mustSec.appendChild(el("h4", "dd-block__title", "Must-Have Amenities"));
  box.mustHaveAmenities.forEach((a) => {
    const row = el("div", "amenity-row");
    row.innerHTML =
      "<h5>" + a.name + "</h5>" +
      "<p><strong>Why required:</strong> " + a.why + "</p>" +
      "<p><strong>Strong execution looks like:</strong> " + a.strongExecution + "</p>";
    if (a.images && a.images.length) {
      row.appendChild(renderImageGrid(a.images, { small: true }));
    }
    mustSec.appendChild(row);
  });
  root.appendChild(mustSec);

  // G. Nice-to-have amenities
  const niceSec = el("section", "dd-block");
  niceSec.appendChild(el("h4", "dd-block__title", "Nice-to-Have Amenities"));
  const niceList = el("ul", "nice-to-have-list");
  box.niceToHaveAmenities.forEach((a) => {
    const item = el("li", null, "<strong>" + a.name + ":</strong> " + a.evidence);
    if (a.images && a.images.length) item.appendChild(renderImageGrid(a.images, { small: true }));
    niceList.appendChild(item);
  });
  niceSec.appendChild(niceList);
  root.appendChild(niceSec);

  // H. Geographic considerations
  root.appendChild(
    ddBlock("Geographic Considerations", [
      ["Views", box.geographicConsiderations.views],
      ["Waterfront", box.geographicConsiderations.waterfront],
      ["Privacy / seclusion", box.geographicConsiderations.privacySeclusion],
      ["Neighbor exposure", box.geographicConsiderations.neighborExposure],
      ["Market-specific", box.geographicConsiderations.marketSpecific],
    ])
  );

  // I. Ideal locations
  root.appendChild(
    ddBlock("Ideal Locations", [
      ["Recommended", box.idealLocations.recommended],
      ["Demand drivers nearby", box.idealLocations.demandDrivers],
      ["What the evidence establishes", box.idealLocations.whatEvidenceEstablishes],
      ["What it does not establish", box.idealLocations.whatEvidenceDoesNotEstablish],
    ])
  );

  // J. Traveler ICP
  root.appendChild(
    ddBlock("Traveler ICP", [
      ["Primary profile", box.travelerICP.primary],
      ["Secondary profile", box.travelerICP.secondary],
      ["Layout fit", box.travelerICP.layoutFit],
      ["Occasion demand", box.travelerICP.occasionDemand],
    ])
  );

  // K. Design / top designs
  const designSec = el("section", "dd-block");
  designSec.appendChild(el("h4", "dd-block__title", "Design — Top Designs"));
  if (box.designComps) {
    // Identified Airbnb comps with URLs/metrics (4BR path).
    const compGrid = el("div", "comp-grid");
    box.designComps.forEach((c) => compGrid.appendChild(compCard(c)));
    designSec.appendChild(compGrid);
  } else if (box.designPhotos) {
    // Anonymous supplied photography illustrating the design pattern, no identified
    // listing (3BR path) — captions describe only what the photo itself shows.
    designSec.appendChild(
      el("p", "dd-block__note", "No specific comp identities or Airbnb links were supplied for this design set — every photo below is representative visual pattern evidence only.")
    );
    designSec.appendChild(renderImageGrid(box.designPhotos));
  }
  designSec.appendChild(alexandriaButton("Open Design Comp Set in Alexandria", box.alexandria.designCompSetUrl));
  root.appendChild(designSec);

  // L. Analyst notes
  root.appendChild(analystNotesBlock(box));

  // M. Revenue potential
  const revSec = el("section", "dd-block");
  revSec.appendChild(el("h4", "dd-block__title", "Revenue Potential"));
  revSec.appendChild(
    el("p", "dd-block__note", "Revenue comps are kept conceptually separate from the design comps above — these images and figures speak only to expected performance, not to the recommended look or amenity execution.")
  );
  box.revenueTiers.forEach((tier) => revSec.appendChild(revenueTierCard(box, tier)));
  revSec.appendChild(alexandriaButton("Open Revenue Comp Set in Alexandria", box.alexandria.revenueCompSetUrl));
  root.appendChild(revSec);

  // N. Purchase price
  root.appendChild(purchasePriceBlock(box));

  host.appendChild(root);
}

// Builds a standard "N labeled rows, optional image strip" deep-dive block.
// Rows whose value is null/undefined are skipped rather than rendered as "undefined" -
// this is how a buy box with a partial source (e.g. 3BR's DOCX not answering every
// template field) omits an unanswered field instead of guessing at it.
// `variant`, when given, adds a `dd-block--<variant>` class for visual differentiation
// (used by the 4BR low-tier-contrast and premium-variant callouts) - purely additive,
// every existing call site (3BR, legacy 4BR sections) omits it and is unaffected.
function ddBlock(title, rows, images, variant) {
  const sec = el("section", "dd-block" + (variant ? " dd-block--" + variant : ""));
  sec.appendChild(el("h4", "dd-block__title", title));
  const grid = el("div", "dd-rows");
  rows
    .filter(([, value]) => value != null && value !== "")
    .forEach(([label, value]) => {
      const row = el("div", "dd-row");
      row.innerHTML = "<span class='dd-row__label'>" + label + "</span><div class='dd-row__value'>" + value + "</div>";
      grid.appendChild(row);
    });
  sec.appendChild(grid);
  if (images && images.length) {
    sec.appendChild(renderImageGrid(images));
  }
  return sec;
}

function listHtml(items) {
  return "<ul>" + items.map((i) => "<li>" + i + "</li>").join("") + "</ul>";
}
