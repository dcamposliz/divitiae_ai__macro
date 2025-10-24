import React from 'react';
import Plot from 'react-plotly.js';
import { DARK_THEME_LAYOUT, PLOTLY_CONFIG, getColorPalette } from './plotlyConfig';

/**
 * LineChart component for time series visualization with context
 * Supports multiple series + reference lines + annotations
 *
 * @param {Array} data - Array of series objects: [{ name, x, y, color }]
 * @param {string} title - Chart title (optional)
 * @param {string} yAxisTitle - Y-axis label
 * @param {Array} referenceLines - Array of { value, label, color } for horizontal lines
 * @param {Object} layoutOverrides - Custom layout properties
 */
export default function LineChart({ data, title = '', yAxisTitle = '', referenceLines = [], layoutOverrides = {} }) {
  const colors = getColorPalette(data.length);

  const traces = data.map((series, idx) => ({
    x: series.x,
    y: series.y,
    type: 'scatter',
    mode: 'lines+markers',
    name: series.name,
    line: {
      color: series.color || colors[idx],
      width: 3,
    },
    marker: {
      size: 7,
      color: series.color || colors[idx],
    },
    hovertemplate: `<b>${series.name}</b><br>%{x}<br><b>%{y:.2f}%</b><extra></extra>`,
  }));

  // Add reference lines as traces
  const referenceTraces = referenceLines.map((line) => ({
    x: data[0]?.x || [],
    y: Array(data[0]?.x?.length || 0).fill(line.value),
    type: 'scatter',
    mode: 'lines',
    name: line.label,
    line: {
      color: line.color || '#ffd95e',
      width: 2,
      dash: 'dash',
    },
    hovertemplate: `<b>${line.label}</b><br>%{y:.1f}%<extra></extra>`,
  }));

  const allTraces = [...traces, ...referenceTraces];

  const layout = {
    ...DARK_THEME_LAYOUT,
    title: title
      ? {
          text: title,
          font: { size: 16, color: '#eaeaea' },
        }
      : undefined,
    yaxis: {
      ...DARK_THEME_LAYOUT.yaxis,
      title: yAxisTitle,
      ticksuffix: '%',
    },
    showlegend: true,
    legend: {
      ...DARK_THEME_LAYOUT.legend,
      x: 0,
      y: 1.1,
      orientation: 'h',
    },
    ...layoutOverrides,
  };

  return <Plot data={allTraces} layout={layout} config={PLOTLY_CONFIG} style={{ width: '100%', height: '450px' }} />;
}
