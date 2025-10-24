/**
 * Shared Plotly configuration for consistent dark theme styling
 * Per PRD Section 7.4 - Chart aesthetics
 */

export const DARK_THEME_LAYOUT = {
  paper_bgcolor: 'transparent',
  plot_bgcolor: 'transparent',
  font: {
    color: '#eaeaea',
    family: 'Inter, sans-serif',
    size: 12,
  },
  margin: { t: 40, l: 60, r: 30, b: 50 },
  legend: {
    orientation: 'h',
    y: -0.2,
    x: 0,
    font: { size: 11 },
  },
  xaxis: {
    gridcolor: 'rgba(157, 163, 175, 0.1)',
    linecolor: 'rgba(157, 163, 175, 0.3)',
    color: '#9da3af',
  },
  yaxis: {
    gridcolor: 'rgba(157, 163, 175, 0.1)',
    linecolor: 'rgba(157, 163, 175, 0.3)',
    color: '#9da3af',
  },
  hovermode: 'closest',
  hoverlabel: {
    bgcolor: '#1f2833',
    bordercolor: '#00FFFF',
    font: { color: '#eaeaea', family: 'Space Mono, monospace' },
  },
};

export const PLOTLY_CONFIG = {
  displayModeBar: true,
  displaylogo: false,
  modeBarButtonsToRemove: ['lasso2d', 'select2d', 'autoScale2d'],
  responsive: true,
};

// PRD regime colors
export const CHART_COLORS = {
  expansion: '#3de07a',
  lateCycle: '#ffd95e',
  slowdown: '#f97316',
  recesssionRisk: '#ef4444',
  recession: '#991b1b',
  primary: '#00FFFF',
  secondary: '#FF7F50',
  tertiary: '#FFD700',
  quaternary: '#ADFF2F',
  quinary: '#da70d6',
};

/**
 * Get color palette for multi-line charts
 */
export const getColorPalette = (count = 5) => {
  const colors = [
    CHART_COLORS.primary,
    CHART_COLORS.secondary,
    CHART_COLORS.tertiary,
    CHART_COLORS.quaternary,
    CHART_COLORS.quinary,
  ];
  return colors.slice(0, count);
};
