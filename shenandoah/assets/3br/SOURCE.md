# 3BR asset provenance

Every file below was copied as-is (no re-encoding) from `ifraham/3BR_BuyBox/<folder>/`
at the repo root — Ifraham's supplied package for the Shenandoah Valley 3BR buy box
(`ifraham/3BR_BuyBox/3BR_Details_Docx.docx` + the `3br_deep_dive/` analysis notebook
outputs). `interactive-map.html` is a standalone copy of
`3br_deep_dive/shen_3br_interactive_map.html` — linked from the Location Guidance
section, not embedded in the site's own Leaflet map (same pattern as the reference
project's `5br/compset-analysis/*.html`).

## Verified vs. unverified captions

Several source `.avif` files could not be rendered by the available image-viewing
tooling (they returned raw container bytes instead of a decoded image). Captions for
those files are marked unverified below and are deliberately conservative — derived from
the filename and the docx's own "IMAGE REFERENCES" context, not from actually viewing
the image. Captions marked verified were confirmed by viewing the actual file.

## Source-material inconsistencies flagged

- The docx's Architectural Style text (§1/§2) names three styles: "Modern cabins, Older
  cabins with modern interior, A Frames." The actual supplied `Design/` folder only has
  `ModernCabin/` and `Yurt/` subfolders — no "older cabin" or "A-frame"-labeled folder
  exists. Shown on the page as supplied, with this mismatch noted rather than silently
  resolved.
- The docx's §11 Design Direction section states "The Design folder is currently empty"
  — this is incorrect; the folder has 6 images across `ModernCabin/` and `Yurt/`. Those
  photos are shown under Acquisition Spec as architectural-style evidence, decoupled from
  the Design Direction thesis itself, which stays pending per the docx's own instruction.
- The docx's §9 Geo Considerations text claims "Mountain View drive[s] revenue up
  massive," but the package's own `04_amenity_prevalence.png` chart shows Mountain View
  prevalence *declining* — 44% (all 3BR) → 38% (Top 25%) → 27% (Top 10%) — with an
  approximately -3% matched-revenue relationship. The real chart numbers are shown on
  the page; this text/chart contradiction is noted rather than picked one way silently.

| Webpage file | Source file | Caption | Verified |
|---|---|---|---|
| `assets/3br/overview/hero-modern-cabin.avif` | `ifraham/3BR_BuyBox/Design/ModernCabin/BigCabin1.avif` | The 3BR program: ordinary bones, a real deck program, and a coherent architectural identity. | Yes |
| `assets/3br/architectural/modern-cabin-1.avif` | `ifraham/3BR_BuyBox/Design/ModernCabin/BigCabin1.avif` | Modern cabin example. | Yes |
| `assets/3br/architectural/yurt-1.webp` | `ifraham/3BR_BuyBox/Design/Yurt/Yurt1.webp` | The source package's photo folders are only "ModernCabin" and "Yurt" — the docx text instead names "Modern cabins, Older cabins with modern interior, A Frames" as the three styles. Shown here as supplied; see SOURCE.md for this naming mismatch. | Yes |
| `assets/3br/beds/bunk-bed-room.avif` | `ifraham/3BR_BuyBox/Beds/Bunk1.avif` | A bunk-bed bedroom, referenced in the source docx's bedroom-execution guidance. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/beds/king-bed-room.avif` | `ifraham/3BR_BuyBox/Beds/King1.avif` | A king-bed bedroom, referenced in the source docx's bedroom-execution guidance. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/auto-add/campfire-stump-seating.jpeg` | `ifraham/3BR_BuyBox/AutoAdd/Campfire.jpeg` | Fire pit — an Auto Add item, cheap to add post-acquisition. | Yes |
| `assets/3br/auto-add/outdoor-dining.avif` | `ifraham/3BR_BuyBox/AutoAdd/OutdoorDiningBigCabin.avif` | Outdoor Dining Area — an Auto Add item. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/auto-add/outdoor-sitting-firepit-hottub.avif` | `ifraham/3BR_BuyBox/AutoAdd/OutdoorSit+Firepit+HotTub.avif` | Combined outdoor seating/firepit/hot tub area. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/auto-add/firepit-2.avif` | `ifraham/3BR_BuyBox/AutoAdd/OutDoorFirepit1.avif` | Fire pit — an Auto Add item. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/must-have/hot-tub-1.avif` | `ifraham/3BR_BuyBox/MustHaves/HotTub/HotTub1.avif` | Hot Tub — the clearest Must-Have (100% prevalence in Top 10% 3BR listings). (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/must-have/hot-tub-with-view.avif` | `ifraham/3BR_BuyBox/MustHaves/HotTub/HotTubWithView.avif` | Hot Tub paired with a view. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/must-have/game-room-yurt-pool-table.webp` | `ifraham/3BR_BuyBox/MustHaves/GameRoom/YurtGame2.webp` | Game Room — the second Must-Have. A realistic 3BR-scale game room: one pool table in a loft space, not a large dedicated arcade. | Yes |
| `assets/3br/must-have/game-room-2.avif` | `ifraham/3BR_BuyBox/MustHaves/GameRoom/GameRoomBigCabin3.avif` | Game Room example. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/nice-to-have/pool-table.avif` | `ifraham/3BR_BuyBox/NiceToHaves/PoolTable/PoolTableYurt1.avif` | Pool Table — Nice-to-Have, Stronger Evidence tier (N=18, +36% revenue uplift, 31% Top-10% recurrence). (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/nice-to-have/sauna.avif` | `ifraham/3BR_BuyBox/NiceToHaves/Sauna/Sauna1.avif` | Sauna — Nice-to-Have, Directional evidence tier (N=11, +53% revenue uplift, 23% Top-10% recurrence). (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/nice-to-have/mini-golf.avif` | `ifraham/3BR_BuyBox/NiceToHaves/MiniGolf1.avif` | Mini Golf — Nice-to-Have, Exploratory evidence tier (N=6, thin sample). (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/geo/mountain-view-1.avif` | `ifraham/3BR_BuyBox/Geographic/MountainView/View2.avif` | Mountain View example. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/geo/mountain-view-2.avif` | `ifraham/3BR_BuyBox/Geographic/MountainView/View3.avif` | Mountain View example. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/geo/seclusion-1.jpeg` | `ifraham/3BR_BuyBox/Geographic/Seclusion/Seclusion1.jpeg` | Privacy/Seclusion — the docx defers detailed guidance to the still-pending comp-set review, but names this as most important for the target guest. | Yes |
| `assets/3br/geo/seclusion-2.avif` | `ifraham/3BR_BuyBox/Geographic/Seclusion/Seclusion2.avif` | Seclusion example. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/geo/lake-1.avif` | `ifraham/3BR_BuyBox/Geographic/Lake2.avif` | Waterfront/Lake example. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
| `assets/3br/geo/lakefront-modern-cabin.avif` | `ifraham/3BR_BuyBox/Geographic/LakeFrontModernCabin1.avif` | Waterfront/Lake example — a modern cabin on the water. (Not visually verified beyond the source filename — see SOURCE.md.) | No — filename-derived |
