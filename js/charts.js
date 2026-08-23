/**
 * Chart rendering (Chart.js, loaded via CDN in index.html). Reads only from
 * data.js globals — no numbers are hardcoded here.
 */

const CHART_PALETTE = ["#1f7a6c", "#c9962b", "#8b94a3", "#3d5a80"];

Chart.defaults.font.family = "'Inter', 'Segoe UI', system-ui, sans-serif";
Chart.defaults.font.size = 13;
Chart.defaults.color = "#3a3f47";

function renderDemographicsCharts() {
  const marketCtx = document.getElementById("chart-demographics-market");
  new Chart(marketCtx, {
    type: "bar",
    data: {
      labels: ["Stayed with kids", "Group trip", "Stayed with a pet", "Other"],
      datasets: [
        {
          label: "Market-wide (review-weighted)",
          data: [
            DEMOGRAPHICS.marketWide.kids,
            DEMOGRAPHICS.marketWide.groupTrip,
            DEMOGRAPHICS.marketWide.pet,
            DEMOGRAPHICS.marketWide.other,
          ],
          backgroundColor: CHART_PALETTE[0],
        },
      ],
    },
    options: chartOptions("Market-wide traveler composition", true),
  });

  const bedroomCtx = document.getElementById("chart-demographics-bedroom");
  new Chart(bedroomCtx, {
    type: "bar",
    data: {
      labels: DEMOGRAPHICS.byBedroom.map((d) => d.segment),
      datasets: [
        { label: "Stayed with kids", data: DEMOGRAPHICS.byBedroom.map((d) => d.kids), backgroundColor: CHART_PALETTE[0] },
        { label: "Group trip", data: DEMOGRAPHICS.byBedroom.map((d) => d.groupTrip), backgroundColor: CHART_PALETTE[1] },
      ],
    },
    options: chartOptions("Family vs. group-trip share by bedroom count", true),
  });
}

function renderPropertySizeCharts() {
  const distCtx = document.getElementById("chart-size-distribution");
  new Chart(distCtx, {
    type: "bar",
    data: {
      labels: PROPERTY_SIZE.marketDistribution.map((d) => d.segment),
      datasets: [
        {
          label: "Share of market inventory",
          data: PROPERTY_SIZE.marketDistribution.map((d) => d.share),
          backgroundColor: CHART_PALETTE[2],
        },
        {
          label: "Share of top-quartile performers",
          data: PROPERTY_SIZE.marketDistribution.map((d) => {
            const match = PROPERTY_SIZE.topQuartileDistribution.find((t) => t.segment === d.segment);
            return match ? match.share : 0;
          }),
          backgroundColor: CHART_PALETTE[1],
        },
      ],
    },
    options: chartOptions("Bedroom-count share: market vs. top-quartile performers", true),
  });

  const revCtx = document.getElementById("chart-size-revenue");
  new Chart(revCtx, {
    type: "bar",
    data: {
      labels: PROPERTY_SIZE.revenueBySize.map((d) => d.segment),
      datasets: [
        {
          label: "Median revenue ($)",
          data: PROPERTY_SIZE.revenueBySize.map((d) => d.medianRevenue),
          backgroundColor: CHART_PALETTE[0],
          yAxisID: "y",
        },
      ],
    },
    options: {
      ...chartOptions("Median reliable-core revenue by bedroom count", false),
      scales: {
        y: { beginAtZero: true, ticks: { callback: (v) => "$" + v / 1000 + "k" } },
      },
    },
  });
}

function chartOptions(title, isPercent) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: true, text: title, font: { size: 14, weight: "600" } },
      legend: { display: true, position: "bottom" },
    },
    scales: isPercent
      ? { y: { beginAtZero: true, max: 1, ticks: { callback: (v) => Math.round(v * 100) + "%" } } }
      : undefined,
  };
}
