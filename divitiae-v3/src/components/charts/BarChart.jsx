import React from 'react';
import Plot from 'react-plotly.js';
import { DARK_THEME_LAYOUT, PLOTLY_CONFIG, getColorPalette } from './plotlyConfig';

/**
 * BarChart component for categorical or comparative data
 * Supports grouped or stacked bars
 *
 * @param {Array} data - Array of series objects: [{ name, x, y, color }]
 * @param {string} title - Chart title (optional)
 * @param {string} yAxisTitle - Y-axis label
 * @param {string} barmode - 'group' | 'stack' | 'overlay'
 * @param {Object} layoutOverrides - Custom layout properties
 */
export default function BarChart({ data, title = '', yAxisTitle = '', barmode = 'group', layoutOverrides = {} }) {
  const colors = getColorPalette(data.length);

  const traces = data.map((series, idx) => ({
    x: series.x,
    y: series.y,
    type: 'bar',
    name: series.name,
    marker: {
      color: series.color || colors[idx],
    },
    hovertemplate: `<b>${series.name}</b><br>%{x}<br>%{y:.2f}<extra></extra>`,
  }));

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
    },
    barmode,
    ...layoutOverrides,
  };

  return <Plot data={traces} layout={layout} config={PLOTLY_CONFIG} style={{ width: '100%', height: '400px' }} />;
}
