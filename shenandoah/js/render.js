/**
 * Presentation logic. Builds every DOM component from data.js; never hardcodes
 * buy-box content. Mirrors the reference site's ddBlock/photoFigure pattern.
 */

// ---------------------------------------------------------------------------
// Formatting / DOM helpers
// ---------------------------------------------------------------------------
function fmtCurrency(n) {
  if (n == null || isNaN(n)) return "—";
  return "$" + Math.round(n).toLocaleString("en-US");
}
function fmtPct(n) {
  if (n == null || isNaN(n)) return "—";
  return (n * 100).toFixed(1) + "%";
}
function el(tag, className, html) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (html != null) node.innerHTML = html;
  return node;
}
function listHtml(items) {
  return "<ul>" + items.map((i) => "<li>" + i + "</li>").join("") + "</ul>";
}

// ---------------------------------------------------------------------------
// Image system: photo(...) objects render a real <img>; pendingPhoto(...)
// objects render a "photo pending — view on Airbnb" link card.
// ---------------------------------------------------------------------------
function pendingImageCard(ref, opts) {
  opts = opts || {};
  const a = el("a", "img-placeholder" + (opts.small ? " img-placeholder--small" : ""));
  a.href = ref.url || "#";
  a.target = "_blank";
  a.rel = "noopener";
  a.innerHTML =
    '<span class="img-placeholder__label">' + (ref.label || "Photo pending") + "</span>" +
    '<span class="img-placeholder__cta">Photo pending — view on Airbnb ↗</span>';
  return a;
}

function photoFigure(p, opts) {
  opts = opts || {};
  const figure = el("figure", "photo-figure" + (opts.small ? " photo-figure--small" : ""));
  const button = el("button", "photo-figure__trigger");
  button.type = "button";
  const img = el("img");
  img.src = p.file;
  img.alt = p.alt || "";
  img.loading = "lazy";
  img.decoding = "async";
  button.appendChild(img);
  button.addEventListener("click", () => openLightbox(p.file, p.alt, p.caption));
  figure.appendChild(button);
  if (p.caption && !opts.noCaption) {
    figure.appendChild(el("figcaption", null, p.caption));
  }
  return figure;
}

function renderImage(ref, opts) {
  if (!ref) return el("div", null, "");
  if (ref.pending) return pendingImageCard(ref, opts);
  return photoFigure(ref, opts);
}

function renderImageGrid(images, opts) {
  const grid = el("div", "dd-block__images");
  (images || []).forEach((img) => grid.appendChild(renderImage(img, opts)));
  return grid;
}

// ---------------------------------------------------------------------------
// Lightbox
// ---------------------------------------------------------------------------
function openLightbox(src, alt, caption) {
  const lightbox = document.getElementById("lightbox");
  document.getElementById("lightbox-image").src = src;
  document.getElementById("lightbox-image").alt = alt || "";
  document.getElementById("lightbox-caption").textContent = caption || "";
  lightbox.classList.add("lightbox--open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("lightbox--open");
  lightbox.setAttribute("aria-hidden", "true");
  document.getElementById("lightbox-image").src = "";
}

// ---------------------------------------------------------------------------
// Small UI atoms
// ---------------------------------------------------------------------------
function pendingBadge(text) {
  return '<span class="badge badge--pending">' + (text || "Pending verification") + "</span>";
}

/**
 * Styled link button for the two real Alexandria compset links (currently
 * only supplied for the 1-2BR buy box). Renders a disabled "(pending)" state
 * if `url` is falsy, matching the reference site's convention.
 */
function alexandriaButton(label, url) {
  const a = el("a", "btn btn--alexandria" + (url ? "" : " btn--pending"));
  a.textContent = url ? label : label + " (pending)";
  a.href = url || "#";
  if (url) {
    a.target = "_blank";
    a.rel = "noopener";
  } else {
    a.setAttribute("aria-disabled", "true");
  }
  return a;
}

/**
 * Generic labeled-row + image-grid block builder used everywhere. `rows` is an
 * array of [label, value] pairs; rows with a null/empty value are silently
 * skipped so a partial source field renders as absent, not broken.
 */
function ddBlock(title, rows, images, variant) {
  const wrap = el("div", "dd-block" + (variant ? " dd-block--" + variant : ""));
  if (title) wrap.appendChild(el("h3", "dd-block__title", title));
  const rowsWrap = el("div", "dd-rows");
  (rows || []).forEach(([label, value]) => {
    if (value == null || value === "") return;
    const row = el("div", "dd-row");
    row.appendChild(el("div", "dd-row__label", label));
    row.appendChild(el("div", "dd-row__value", value));
    rowsWrap.appendChild(row);
  });
  if (rowsWrap.children.length) wrap.appendChild(rowsWrap);
  if (images && images.length) wrap.appendChild(renderImageGrid(images));
  return wrap;
}

// ---------------------------------------------------------------------------
// Section 1 — Buy-box declarations
// ---------------------------------------------------------------------------
function renderDeclarations() {
  const host = document.getElementById("buybox-declarations");
  if (!host) return;
  host.innerHTML = "";
  BUY_BOXES.forEach((box) => {
    const card = el("div", "declaration-card declaration-card--lead");
    card.appendChild(el("p", "declaration-card__eyebrow", box.label + " — Developed"));
    card.appendChild(el("h2", null, box.name));
    card.appendChild(el("p", "declaration-card__thesis", box.thesis));
    const dl = el("dl", "declaration-card__specs");
    const rows = [
      ["Bed / bath", box.atAGlance.bedBath],
      ["Sleeps", box.atAGlance.sleeps],
      ["Hero mechanism", box.atAGlance.heroMechanism],
      ["Revenue bands", box.atAGlance.revenue],
    ];
    rows.forEach(([k, v]) => {
      dl.appendChild(el("dt", null, k));
      dl.appendChild(el("dd", null, v));
    });
    card.appendChild(dl);
    const cta = el("a", "btn btn--primary", "See the full deep dive ↓");
    cta.href = "#deep-dive";
    card.appendChild(cta);
    host.appendChild(card);
  });

  const pendingNote = el(
    "div",
    "declaration-card declaration-card--pending",
    "<p class=\"declaration-card__eyebrow\">Additional buy boxes</p>" +
      "<p>" + PENDING_BUY_BOXES_NOTE + " See the <a href=\"#pending\">Additional Buy Boxes Pending</a> section below.</p>"
  );
  host.appendChild(pendingNote);
}

// ---------------------------------------------------------------------------
// Section 2 — Market context
// ---------------------------------------------------------------------------
function renderMarketOverview() {
  const host = document.getElementById("market-overview-body");
  if (!host) return;
  host.innerHTML = "";
  MARKET_OVERVIEW.paragraphs.forEach((p) => host.appendChild(el("p", null, p)));
  const sources = el("p", "market-sources");
  sources.innerHTML =
    "Sources: " +
    MARKET_OVERVIEW.sources.map((s) => '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.label + "</a>").join(" · ");
  host.appendChild(sources);
}

function renderMarketIntro() {
  const host = document.getElementById("market-intro-body");
  if (!host) return;
  const dl = el("dl", "intro-grid");
  const rows = [
    ["Market boundaries", MARKET_INTRO.boundaries],
    ["STR composition", MARKET_INTRO.composition],
    ["Revenue opportunity", MARKET_INTRO.revenueOpportunity],
    ["Demand drivers", MARKET_INTRO.demandDrivers],
    ["Market characteristics", MARKET_INTRO.characteristics],
  ];
  rows.forEach(([k, v]) => {
    dl.appendChild(el("dt", null, k));
    dl.appendChild(el("dd", null, v));
  });
  host.innerHTML = "";
  host.appendChild(dl);
}

// ---------------------------------------------------------------------------
// Section 3 — Location guidance prose (map itself lives in map.js)
// ---------------------------------------------------------------------------
function renderLocationGuidance() {
  const host = document.getElementById("location-guidance-body");
  if (!host) return;
  host.innerHTML = "";
  BUY_BOXES.forEach((box) => {
    const g = box.locationGuidance;
    if (!g) return;
    host.appendChild(ddBlock(box.label + " Location Guidance", [
      ["Recommended geography", g.recommended],
      ["Use with caution", g.caution],
      ["Diligence reminders", g.diligence],
    ]));
  });
  const table = el("div", "city-guidance-table-wrap");
  const t = el("table", "bb2-comp-table");
  t.innerHTML =
    "<thead><tr><th>City / ZIP</th><th>Tier</th><th>Note</th></tr></thead><tbody>" +
    MAP_CONFIG.cityGuidance
      .map((r) => "<tr><td>" + r.city + "</td><td>" + r.tier + "</td><td>" + r.note + "</td></tr>")
      .join("") +
    "</tbody>";
  table.appendChild(t);
  host.appendChild(table);
}

// ---------------------------------------------------------------------------
// Section 5 — Pending buy boxes
// ---------------------------------------------------------------------------
function renderPendingBuyBoxes() {
  const host = document.getElementById("pending-buyboxes");
  if (!host) return;
  host.innerHTML = "";
  if (!PENDING_BUY_BOXES.length) {
    host.appendChild(
      el(
        "div",
        "declaration-card",
        '<p class="declaration-card__eyebrow">Coverage complete</p><p>' + PENDING_BUY_BOXES_NOTE + "</p>"
      )
    );
    return;
  }
  host.appendChild(el("p", "section-interpretation", PENDING_BUY_BOXES_NOTE));
  const grid = el("div", "declarations-grid");
  PENDING_BUY_BOXES.forEach((p) => {
    grid.appendChild(
      el(
        "div",
        "declaration-card declaration-card--pending",
        '<p class="declaration-card__eyebrow">Pending</p><h3>' + p.label + "</h3><p>" + p.note + "</p>"
      )
    );
  });
  host.appendChild(grid);
}

// ---------------------------------------------------------------------------
// Section 4 — Deep dive tabs + content
// ---------------------------------------------------------------------------
function renderDeepDiveTabs() {
  const host = document.getElementById("deep-dive-tabs");
  if (!host) return;
  host.innerHTML = "";
  BUY_BOXES.forEach((box, i) => {
    const btn = el("button", "tab" + (i === 0 ? " tab--active" : ""), box.label);
    btn.type = "button";
    btn.addEventListener("click", () => {
      host.querySelectorAll(".tab").forEach((t) => t.classList.remove("tab--active"));
      btn.classList.add("tab--active");
      renderDeepDive(box);
    });
    host.appendChild(btn);
  });
}

// --- Block builders, one per deep-dive subsection ---

function overviewBlock(box) {
  const o = box.overview;
  const hero = el("div", "bb2-hero");
  const media = el("div", "bb2-hero__media");
  media.appendChild(renderImage(o.heroImage));
  hero.appendChild(media);
  const body = el("div", "bb2-hero__body");
  body.appendChild(el("p", "bb2-hero__status", o.statusBadge));
  body.appendChild(el("h3", "bb2-hero__title", box.name));
  body.appendChild(el("p", "bb2-hero__thesis", o.thesis));
  body.appendChild(el("p", "bb2-hero__why", o.whyItWorks));
  const chipRow = el("div", "bb2-chip-row");
  o.chips.forEach((c) => chipRow.appendChild(el("span", "bb2-chip", c.label)));
  body.appendChild(chipRow);
  const revRow = el("div", "bb2-chip-row");
  o.revenueChips.forEach((c) =>
    revRow.appendChild(el("span", "bb2-chip bb2-chip--revenue", c.label + ": " + c.value))
  );
  body.appendChild(revRow);
  hero.appendChild(body);
  return hero;
}

function acquisitionSpecBlock(box) {
  const a = box.acquisitionSpec;
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "Acquisition Spec"));
  const grid = el("div", "bb2-grid-2");
  grid.appendChild(el("div", null, "<h4>Required</h4>" + listHtml(a.required)));
  grid.appendChild(el("div", null, "<h4>Preferred</h4>" + listHtml(a.preferred)));
  wrap.appendChild(grid);
  if (a.images && a.images.length) wrap.appendChild(renderImageGrid(a.images));
  return wrap;
}

function finishedSpecBlock(box) {
  const f = box.finishedSpec;
  return ddBlock(
    "Finished STR Spec",
    [
      ["Sleep count", f.sleepCount],
      ["Backyard / outdoor program", f.backyard],
    ],
    f.images
  );
}

function locationGuidanceDeepDiveBlock(box) {
  const g = box.locationGuidance;
  const wrap = ddBlock("Location Guidance", [
    ["Recommended", g.recommended],
    ["Use with caution", g.caution],
    ["Diligence", g.diligence],
  ]);
  if (g.interactiveMapUrl) {
    const link = el("a", "btn btn--alexandria", "View interactive ZIP map ↗");
    link.href = g.interactiveMapUrl;
    link.target = "_blank";
    link.rel = "noopener";
    wrap.appendChild(link);
  }
  return wrap;
}

function travelerICPBlock(box) {
  const t = box.travelerICP;
  const wrap = ddBlock("Guest Profile & Capacity", [
    ["Primary", t.primary],
    ["Secondary", t.secondary],
  ]);
  if (t.stats && t.stats.length) {
    const statRow = el("div", "bb2-stat-row bb2-stat-row--3");
    t.stats.forEach((s) => {
      const stat = el("div", "bb2-stat");
      stat.appendChild(el("div", "bb2-stat__value", s.value));
      stat.appendChild(el("div", "bb2-stat__label", s.label + (s.compare ? " (" + s.compare + ")" : "")));
      statRow.appendChild(stat);
    });
    wrap.appendChild(statRow);
  }
  if (t.note) wrap.appendChild(el("p", "dd-note", t.note));
  return wrap;
}

// ---------------------------------------------------------------------------
// Market-wide performance context (3BR) — descriptive stats, explicitly NOT a
// validated buy-box revenue target (the source material forbids inventing one
// until its comp-set review is done).
// ---------------------------------------------------------------------------
function performanceContextBlock(box) {
  const p = box.performanceContext;
  const wrap = el("div", "dd-block dd-block--compact");
  wrap.appendChild(el("h3", "dd-block__title", "Performance Context"));
  const statRow = el("div", "bb2-stat-row bb2-stat-row--3");
  p.stats.forEach((s) => {
    const stat = el("div", "bb2-stat");
    stat.appendChild(el("div", "bb2-stat__value", s.value));
    stat.appendChild(el("div", "bb2-stat__label", s.label + (s.compare ? " (" + s.compare + ")" : "")));
    statRow.appendChild(stat);
  });
  wrap.appendChild(statRow);
  if (p.note) wrap.appendChild(el("p", "dd-note", p.note));
  return wrap;
}

// ---------------------------------------------------------------------------
// Auto Add (3BR) — a third amenity category distinct from must-have/nice-to-
// have: cheap to add post-acquisition, shouldn't drive the purchase decision.
// ---------------------------------------------------------------------------
function autoAddBlock(box) {
  const a = box.autoAdd;
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "Auto Add"));
  if (a.intro) wrap.appendChild(el("p", null, a.intro));
  wrap.appendChild(el("ul", "bb2-checklist bb2-checklist--check", a.items.map((i) => "<li>" + i + "</li>").join("")));
  wrap.appendChild(renderImageGrid(a.images));
  return wrap;
}

// ---------------------------------------------------------------------------
// Geo Considerations (3BR) — one row per geographic factor, each with its own
// prevalence stat, note, and image group (generalized version of 1-2BR's
// fixed "seclusion first" viewsSeclusionBlock).
// ---------------------------------------------------------------------------
function geoConsiderationsBlock(box) {
  const g = box.geoConsiderations;
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "Geo Considerations"));
  if (g.intro) wrap.appendChild(el("p", null, g.intro));
  g.factors.forEach((f) => {
    wrap.appendChild(el("h4", "comp-tier-label", f.label));
    if (f.stat) wrap.appendChild(el("p", null, "<strong>" + f.stat + "</strong>"));
    if (f.note) wrap.appendChild(el("p", "dd-note", f.note));
    if (f.images) wrap.appendChild(renderImageGrid(f.images));
  });
  return wrap;
}

// ---------------------------------------------------------------------------
// Design Direction (3BR) — explicitly pending in the source material; shown
// as a pending badge + the source's own note, no invented thesis.
// ---------------------------------------------------------------------------
function designDirectionBlock(box) {
  const d = box.designDirection;
  const wrap = el("div", "dd-block dd-block--compact");
  wrap.appendChild(el("h3", "dd-block__title", "Design Direction"));
  wrap.appendChild(el("p", null, pendingBadge(d.status)));
  wrap.appendChild(el("p", null, d.note));
  return wrap;
}

// ---------------------------------------------------------------------------
// Revenue / Design Comp Set (3BR) — explicitly pending in the source
// material; shown as a pending badge + the source's own constraint list, so
// the page itself documents why this section has no comps.
// ---------------------------------------------------------------------------
function revenueCompSetPendingBlock(box) {
  const r = box.revenueCompSet;
  const wrap = el("div", "dd-block dd-block--compact");
  wrap.appendChild(el("h3", "dd-block__title", "Revenue / Design Comp Set"));
  wrap.appendChild(el("p", null, pendingBadge(r.status)));
  wrap.appendChild(el("p", null, r.note));
  return wrap;
}

function amenityStackBlock(box) {
  const must = box.mustHaveAmenities;
  const nice = box.niceToHaveAmenities;
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "Amenity Stack"));
  const panels = el("div", "bb2-amenity-panels");

  const mustPanel = el("div", "bb2-amenity-panel");
  mustPanel.appendChild(el("h4", "bb2-amenity-panel__title", "Must-Have"));
  mustPanel.appendChild(el("ul", "bb2-checklist bb2-checklist--check", must.items.map((i) => "<li>" + i + "</li>").join("")));
  panels.appendChild(mustPanel);

  const nicePanel = el("div", "bb2-amenity-panel");
  nicePanel.appendChild(el("h4", "bb2-amenity-panel__title", "Nice-to-Have"));
  nicePanel.appendChild(el("p", null, "<strong>Strongly preferred</strong>"));
  nicePanel.appendChild(el("ul", "bb2-checklist bb2-checklist--star", nice.stronglyPreferred.map((i) => "<li>" + i + "</li>").join("")));
  nicePanel.appendChild(el("p", null, "<strong>Optional differentiators</strong>"));
  const chipRow = el("div", "bb2-chip-row");
  nice.optional.forEach((o) => chipRow.appendChild(el("span", "bb2-chip bb2-chip--optional", o)));
  nicePanel.appendChild(chipRow);
  nicePanel.appendChild(el("p", "dd-note", nice.optionalNote));
  panels.appendChild(nicePanel);

  wrap.appendChild(panels);

  const strip = el("div", "bb2-evidence-strip");
  strip.innerHTML =
    '<span class="bb2-chip bb2-chip--metric">' + must.evidenceNote.label + "</span> " +
    "<span>" + must.evidenceNote.stats + "</span>" +
    '<span class="dd-note"> ' + must.evidenceNote.caveat + "</span>";
  wrap.appendChild(strip);

  wrap.appendChild(renderImageGrid(must.images));
  wrap.appendChild(renderImageGrid(nice.images));
  return wrap;
}

function executionStandardsBlock(box) {
  const e = box.executionStandards;
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "Execution & Photo Standards"));
  wrap.appendChild(el("p", null, e.summary));
  if (e.photoStandards && e.photoStandards.length) {
    const grid = el("div", "bb2-grid-2");
    grid.appendChild(el("div", null, "<h4>Required execution</h4>" + listHtml(e.required)));
    grid.appendChild(el("div", null, "<h4>Photo standards</h4>" + listHtml(e.photoStandards)));
    wrap.appendChild(grid);
  } else {
    wrap.appendChild(el("div", null, "<h4>Required execution</h4>" + listHtml(e.required)));
  }
  if (e.cheapMoves && e.cheapMoves.length) {
    const chipRow = el("div", "bb2-chip-row");
    chipRow.appendChild(el("span", null, "<strong>Cheap, copyable moves:</strong>"));
    e.cheapMoves.forEach((m) => chipRow.appendChild(el("span", "bb2-chip", m)));
    wrap.appendChild(chipRow);
  }
  wrap.appendChild(renderImageGrid(e.images));

  if (e.designComps) {
    const d = e.designComps;
    wrap.appendChild(el("h4", "comp-tier-label", "Design / Top Designs"));
    if (d.intro) wrap.appendChild(el("p", null, d.intro));
    if (d.namedComps && d.namedComps.length) {
      const grid2 = el("div", "comp-grid");
      d.namedComps.forEach((c) => grid2.appendChild(compCard(c)));
      wrap.appendChild(grid2);
    }
    if (d.images && d.images.length) wrap.appendChild(renderImageGrid(d.images));
    if (d.alexandriaDesignUrl !== undefined) {
      wrap.appendChild(alexandriaButton("Open Design Comp Set in Alexandria", d.alexandriaDesignUrl));
    }
  }
  return wrap;
}

// ---------------------------------------------------------------------------
// Views & Seclusion (1-2BR only) — surfaces the source material's single
// strongest normative point: seclusion ranks above view quality.
// ---------------------------------------------------------------------------
function viewsSeclusionBlock(box) {
  const v = box.viewsSeclusion;
  const wrap = el("div", "dd-block dd-block--priority");
  wrap.appendChild(el("h3", "dd-block__title", "Views & Seclusion"));
  wrap.appendChild(el("p", null, "<strong>Seclusion, first:</strong> " + v.privacySeclusion));
  wrap.appendChild(renderImageGrid(v.seclusionImages));
  const rows = el("div", "dd-rows");
  [["Views", v.views], ["Waterfront", v.waterfront]].forEach(([label, value]) => {
    if (!value) return;
    const row = el("div", "dd-row");
    row.appendChild(el("div", "dd-row__label", label));
    row.appendChild(el("div", "dd-row__value", value));
    rows.appendChild(row);
  });
  wrap.appendChild(rows);
  (v.viewGroups || []).forEach((g) => {
    wrap.appendChild(el("h4", "comp-tier-label", g.label));
    wrap.appendChild(renderImageGrid(g.images));
  });
  return wrap;
}

function compCard(c) {
  const card = el("div", "comp-card");
  card.appendChild(renderImage(c.image));
  const body = el("div", "comp-card__body");
  body.appendChild(el("div", "comp-card__title", c.name));
  body.appendChild(el("div", "comp-card__location", c.city + ", VA " + c.zip));
  const link = el("a", "comp-card__link", "View on Airbnb ↗");
  link.href = c.url;
  link.target = "_blank";
  link.rel = "noopener";
  body.appendChild(link);
  const metrics = el(
    "div",
    "comp-card__metrics",
    "<span>Revenue: " + fmtCurrency(c.revenue) + "</span>" +
      "<span>ADR: " + fmtCurrency(c.adr) + "</span>" +
      "<span>Occupancy: " + fmtPct(c.occupancy) + "</span>" +
      (c.sleeps ? "<span>Sleeps " + c.sleeps + "</span>" : "")
  );
  body.appendChild(metrics);
  if (c.why) body.appendChild(el("p", "comp-card__why", c.why));
  if (c.flag) body.appendChild(el("p", "comp-card__limitation", c.flag));
  card.appendChild(body);
  return card;
}

function revenueTiersBlock(box) {
  const r = box.revenueTiers;
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "Revenue Tiers" + (r.mode === "namedComps" ? " & Core Comps" : "")));
  const bandRow = el("div", "bb2-stat-row bb2-stat-row--3");
  r.bands.forEach((b) => {
    const stat = el("div", "bb2-stat");
    stat.appendChild(el("div", "bb2-stat__value", b.range));
    stat.appendChild(el("div", "bb2-stat__label", b.label));
    stat.appendChild(el("div", "dd-note", b.note));
    bandRow.appendChild(stat);
  });
  wrap.appendChild(bandRow);
  if (r.caution) wrap.appendChild(el("p", "dd-block--contrast dd-note-block", r.caution));

  if (r.mode === "photoEvidence") {
    const tierLabels = { high: "High", mid: "Mid", low: "Low" };
    ["high", "mid", "low"].forEach((tierKey) => {
      const images = r.photoTiers[tierKey];
      if (!images || !images.length) return;
      wrap.appendChild(el("h4", "comp-tier-label", tierLabels[tierKey]));
      wrap.appendChild(renderImageGrid(images));
    });
    if (r.alexandriaRevenueUrl !== undefined) {
      wrap.appendChild(alexandriaButton("Open Revenue Comp Set in Alexandria", r.alexandriaRevenueUrl));
    }
    return wrap;
  }

  // mode === "namedComps" (4BR's original behavior)
  const byTier = { strong: [], target: [], low: [] };
  r.comps.forEach((c) => byTier[c.tier].push(c));
  const tierLabels = { strong: "Strong execution / upside", target: "Target", low: "Low acceptable" };
  ["strong", "target", "low"].forEach((tierKey) => {
    if (!byTier[tierKey].length) return;
    wrap.appendChild(el("h4", "comp-tier-label", tierLabels[tierKey]));
    const grid = el("div", "comp-grid");
    byTier[tierKey].forEach((c) => grid.appendChild(compCard(c)));
    wrap.appendChild(grid);
  });

  if (r.ceilingComps && r.ceilingComps.length) {
    wrap.appendChild(el("h4", "comp-tier-label", "Ceiling / Reference Comps (not underwritten)"));
    const ceilGrid = el("div", "comp-grid");
    r.ceilingComps.forEach((c) => {
      const card = el("div", "comp-card comp-card--pending");
      if (c.image) card.appendChild(renderImage(c.image));
      const body = el("div", "comp-card__body");
      body.appendChild(el("div", "comp-card__title", c.name));
      body.appendChild(el("div", "comp-card__location", c.city + ", VA " + c.zip));
      const link = el("a", "comp-card__link", "View on Airbnb ↗");
      link.href = c.url;
      link.target = "_blank";
      link.rel = "noopener";
      body.appendChild(link);
      body.appendChild(
        el(
          "div",
          "comp-card__metrics",
          "<span>Revenue: " + fmtCurrency(c.revenue) + "</span><span>ADR: " + fmtCurrency(c.adr) + "</span><span>Occupancy: " + fmtPct(c.occupancy) + "</span>"
        )
      );
      body.appendChild(el("p", "comp-card__limitation", c.why));
      card.appendChild(body);
      ceilGrid.appendChild(card);
    });
    wrap.appendChild(ceilGrid);
  }
  if (r.note) wrap.appendChild(el("p", "dd-note", r.note));
  return wrap;
}

function executionComparisonBlock(box) {
  const e = box.executionComparison;
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "High / Mid / Low Execution Comparison"));
  wrap.appendChild(el("p", null, e.intro));
  const grid = el("div", "bb2-tier-compare__grid");
  [e.high, e.mid, e.low].forEach((tier) => {
    const col = el("div", "bb2-tier-compare__col");
    col.appendChild(el("div", "bb2-tier-compare__col-label", tier.label));
    col.appendChild(el("p", null, tier.description));
    if (tier.images) col.appendChild(renderImageGrid(tier.images, { small: true }));
    col.appendChild(el("p", "bb2-tier-compare__property", tier.examples));
    grid.appendChild(col);
  });
  wrap.appendChild(grid);
  return wrap;
}

function counterexamplesBlock(box) {
  const wrap = el("div", "dd-block dd-block--contrast");
  wrap.appendChild(el("h3", "dd-block__title", "Counterexample Boundaries"));
  box.counterexamples.forEach((c) => {
    const card = el("div", "counterexample-card");
    card.appendChild(el("h4", null, c.name + " — " + c.role));
    const link = el("a", "comp-card__link", "View on Airbnb ↗");
    link.href = c.url;
    link.target = "_blank";
    link.rel = "noopener";
    const meta = el(
      "p",
      "comp-card__metrics",
      "<span>Revenue: " + fmtCurrency(c.revenue) + "</span><span>" + c.city + ", VA " + c.zip + "</span>"
    );
    card.appendChild(meta);
    card.appendChild(link);
    card.appendChild(el("p", null, c.explanation));
    if (c.images) card.appendChild(renderImageGrid(c.images));
    wrap.appendChild(card);
  });
  return wrap;
}

function analystNotesBlock(box) {
  const wrap = el("div", "dd-block");
  wrap.appendChild(el("h3", "dd-block__title", "Analyst Notes"));
  wrap.appendChild(el("ul", "bb2-notes-list", box.analystNotes.map((n) => "<li>" + n + "</li>").join("")));
  return wrap;
}

function acquisitionStatusBlock(box) {
  const wrap = el("div", "dd-block dd-block--compact");
  wrap.appendChild(el("h3", "dd-block__title", "Purchase Price"));
  wrap.appendChild(el("p", null, pendingBadge(box.acquisition.status)));
  wrap.appendChild(el("p", null, box.acquisition.note));
  wrap.appendChild(el("p", "dd-note", REGULATION_NOTE));
  return wrap;
}

// Dispatch table: section key -> builder function. Each BUY_BOXES entry
// declares its own ordered `buyBoxSections` array of these keys (see
// data.js) — renderDeepDive walks that array, so two structurally different
// buy boxes (e.g. 4BR's named-comp revenue tiers + execution comparison vs.
// 1-2BR's photo-evidence revenue tiers + views/seclusion section) can share
// this one dispatch table without any box-specific conditionals here.
const NARRATIVE_BLOCKS = {
  overview: overviewBlock,
  acquisitionSpec: acquisitionSpecBlock,
  finishedSpec: finishedSpecBlock,
  viewsSeclusion: viewsSeclusionBlock,
  locationGuidance: locationGuidanceDeepDiveBlock,
  travelerICP: travelerICPBlock,
  mustHaveAmenities: amenityStackBlock,
  executionStandards: executionStandardsBlock,
  revenueTiers: revenueTiersBlock,
  executionComparison: executionComparisonBlock,
  counterexamples: counterexamplesBlock,
  analystNotes: analystNotesBlock,
  acquisition: acquisitionStatusBlock,
  performanceContext: performanceContextBlock,
  autoAdd: autoAddBlock,
  geoConsiderations: geoConsiderationsBlock,
  designDirection: designDirectionBlock,
  revenueCompSet: revenueCompSetPendingBlock,
};

function renderDeepDive(box) {
  const host = document.getElementById("deep-dive-content");
  if (!host) return;
  host.innerHTML = "";
  if (box.status !== "developed") {
    host.appendChild(
      el(
        "div",
        "deep-dive deep-dive--pending",
        "<p>" + (box.pendingNote || "This buy box has not been developed yet.") + "</p>"
      )
    );
    return;
  }
  const wrap = el("div", "deep-dive bb2");
  (box.buyBoxSections || []).forEach((key) => {
    const build = NARRATIVE_BLOCKS[key];
    if (!build) return; // unknown key: skip silently, same tolerance as ddBlock's null-row skipping
    wrap.appendChild(build(box));
  });
  host.appendChild(wrap);
}
