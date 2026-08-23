/**
 * Page bootstrap: wires data.js content into render.js/charts.js/map.js and
 * handles nav interactions. Load order (see index.html): data.js -> render.js ->
 * charts.js -> map.js -> main.js.
 */

document.addEventListener("DOMContentLoaded", () => {
  renderDeclarations();
  renderMarketIntro();
  renderRegulationNote();
  renderDemographicsInterpretation();
  renderPropertySizeInterpretation();
  renderJustification();
  renderDeepDiveTabs();
  renderDeepDive(BUY_BOXES.find((b) => b.status === "developed") || BUY_BOXES[0]);
  renderDemographicsCharts();
  renderPropertySizeCharts();
  initMap();
  initNav();
  initLightbox();
});

function initLightbox() {
  const overlay = document.getElementById("lightbox");
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("lightbox--open")) closeLightbox();
  });
}

function initNav() {
  const links = document.querySelectorAll(".site-nav a");
  const sections = Array.from(links)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.remove("site-nav__link--active"));
        const match = document.querySelector('.site-nav a[href="#' + entry.target.id + '"]');
        if (match) match.classList.add("site-nav__link--active");
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => observer.observe(s));
}
