import React from 'react';
import { formatPercent, formatNumber } from '../../utils/formatters';
import { getDeltaColor } from '../../utils/regimeClassifier';
import './MetricCard.css';

/**
 * Enhanced MetricCard with rich historical context visualization
 * Inspired by Patterncraft - showing WHERE you are, not just WHAT the number is
 *
 * @param {string} title - Metric name
 * @param {number} value - Current value
 * @param {string} unit - Unit (%, bps, etc.)
 * @param {string} color - Border/accent color
 * @param {Array} sparklineData - Array of {date, value} for historical context
 * @param {number} delta - Change from previous period
 * @param {boolean} inverseColor - If true, negative delta is good
 * @param {string} subtitle - Additional context
 * @param {Object} contextRange - { min, max, target, danger } for visual context
 */
export default function MetricCard({
  title,
  value,
  unit = '',
  color = '#00FFFF',
  sparklineData = null,
  delta = null,
  inverseColor = false,
  subtitle = null,
  contextRange = null,
}) {
  const formatValue = (val) => {
    if (val === null || val === undefined) return '—';
    return formatNumber(val, 1);
  };

  // Calculate historical context
  const getHistoricalContext = () => {
    if (!sparklineData || sparklineData.length < 2) return null;

    const values = sparklineData.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;

    return { min, max, avg, range: max - min };
  };

  const context = getHistoricalContext();

  // Render enhanced sparkline with glow and gradient fill
  const renderSparkline = () => {
    if (!sparklineData || sparklineData.length < 2) return null;

    const values = sparklineData.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;

    const width = 100;
    const height = 35;
    const points = values.map((val, idx) => {
      const x = (idx / (values.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return { x, y };
    });

    // Create path
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ');

    // Create filled area path
    const areaPath = `${linePath} L ${width},${height} L 0,${height} Z`;

    return (
      <svg className="sparkline-enhanced" width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <defs>
          <linearGradient id={`gradient-${title}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* Filled area */}
        <path d={areaPath} fill={`url(#gradient-${title})`} opacity="0.6" />

        {/* Main line */}
        <path d={linePath} fill="none" stroke={color} strokeWidth="2" opacity="0.9" />

        {/* Latest point indicator */}
        <circle
          cx={points[points.length - 1].x}
          cy={points[points.length - 1].y}
          r="3"
          fill={color}
          stroke="#0b0c10"
          strokeWidth="1.5"
        />
      </svg>
    );
  };

  // Render range bar showing current position in historical range
  const renderRangeBar = () => {
    if (!context || value === null || value === undefined) return null;

    const { min, max } = context;
    const range = max - min || 1;
    const position = ((value - min) / range) * 100;

    // Add target zones if provided
    let targetZone = null;
    if (contextRange?.target) {
      const targetPos = ((contextRange.target - min) / range) * 100;
      targetZone = (
        <div className="target-indicator" style={{ left: `${Math.max(0, Math.min(100, targetPos))}%` }}>
          <div className="target-line"></div>
        </div>
      );
    }

    return (
      <div className="range-bar-container">
        <div className="range-bar">
          <div className="range-fill" style={{ width: `${Math.max(0, Math.min(100, position))}%` }}>
            <div className="range-glow" style={{ backgroundColor: color }}></div>
          </div>
          {targetZone}
          <div className="current-position" style={{ left: `${Math.max(0, Math.min(100, position))}%` }}>
            <div className="position-marker" style={{ backgroundColor: color }}></div>
          </div>
        </div>
        <div className="range-labels">
          <span className="range-min">{formatValue(min)}</span>
          <span className="range-max">{formatValue(max)}</span>
        </div>
      </div>
    );
  };

  const deltaColor = delta !== null ? getDeltaColor(delta, inverseColor) : null;

  return (
    <div className="metric-card-enhanced" style={{ borderColor: color }}>
      <div className="metric-header">
        <div className="metric-title">{title}</div>
        {subtitle && <div className="metric-subtitle">{subtitle}</div>}
      </div>

      <div className="metric-main">
        <div className="metric-value-section">
          <div className="metric-value-row">
            <span className="metric-value" style={{ color }}>
              {formatValue(value)}
              {unit && <span className="metric-unit">{unit}</span>}
            </span>

            {delta !== null && (
              <span className="metric-delta-badge" style={{ backgroundColor: deltaColor, color: '#0b0c10' }}>
                {delta > 0 ? '+' : ''}
                {formatNumber(delta, 1)}
              </span>
            )}
          </div>

          {context && (
            <div className="metric-context-text">
              <span className="context-label">Range:</span>
              <span className="context-value">
                {formatValue(context.min)}—{formatValue(context.max)} {unit}
              </span>
            </div>
          )}
        </div>

        <div className="metric-viz-section">{renderSparkline()}</div>
      </div>

      {renderRangeBar()}
    </div>
  );
}
