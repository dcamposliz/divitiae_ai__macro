import React from "react";
import Plot from "react-plotly.js";

const macroData = {
  years: [2019, 2020, 2021, 2022, 2023, 2024],
  gdp: [2.3, -3.4, 5.7, 2.1, 1.9, 2.4],
  inflation: [1.8, 1.2, 4.7, 8.0, 3.4, 2.9],
  unemployment: [3.7, 8.1, 5.3, 3.6, 3.8, 4.1],
  bondYield: [1.9, 0.9, 1.5, 3.5, 4.2, 4.4],
};

function MetricCard({ title, value, unit, color }) {
  return (
    <div className="metric-card" style={{ borderColor: color }}>
      <div className="metric-title">{title}</div>
      <div className="metric-value" style={{ color }}>
        {value}
        {unit && <span className="metric-unit">{unit}</span>}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="metrics-row">
        <MetricCard title="GDP Growth" value="2.4" unit="%" color="#00FFFF" />
        <MetricCard title="Inflation Rate" value="2.9" unit="%" color="#FF7F50" />
        <MetricCard title="Unemployment" value="4.1" unit="%" color="#FFD700" />
        <MetricCard title="10Y Bond Yield" value="4.4" unit="%" color="#ADFF2F" />
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <Plot
            data={[
              {
                x: macroData.years,
                y: macroData.gdp,
                type: "scatter",
                mode: "lines+markers",
                name: "GDP Growth",
                line: { color: "#00FFFF", width: 3 },
              },
              {
                x: macroData.years,
                y: macroData.inflation,
                type: "scatter",
                mode: "lines+markers",
                name: "Inflation",
                line: { color: "#FF7F50", width: 3, dash: "dot" },
              },
            ]}
            layout={{
              title: "GDP vs Inflation Over Time",
              paper_bgcolor: "transparent",
              plot_bgcolor: "transparent",
              font: { color: "#ffffff", family: "Inter, sans-serif" },
              margin: { t: 40, l: 50, r: 30, b: 40 },
              legend: { orientation: "h", y: -0.2 },
            }}
            style={{ width: "100%", height: "400px" }}
          />
        </div>

        <div className="chart-card">
          <Plot
            data={[
              {
                x: macroData.years,
                y: macroData.unemployment,
                type: "bar",
                name: "Unemployment",
                marker: { color: "#FFD700" },
              },
              {
                x: macroData.years,
                y: macroData.bondYield,
                type: "bar",
                name: "10Y Bond Yield",
                marker: { color: "#ADFF2F" },
              },
            ]}
            layout={{
              barmode: "group",
              title: "Labor Market & Bonds",
              paper_bgcolor: "transparent",
              plot_bgcolor: "transparent",
              font: { color: "#ffffff", family: "Inter, sans-serif" },
              margin: { t: 40, l: 50, r: 30, b: 40 },
              legend: { orientation: "h", y: -0.2 },
            }}
            style={{ width: "100%", height: "400px" }}
          />
        </div>
      </div>
    </div>
  );
}
