import React from 'react';
import './ChartCard.css';

/**
 * Wrapper component for all Plotly charts
 * Provides consistent styling per PRD Section 7.4
 *
 * @param {string} title - Chart title
 * @param {ReactNode} children - Plotly chart component
 * @param {string} subtitle - Optional subtitle/description
 */
export default function ChartCard({ title, children, subtitle = null }) {
  return (
    <div className="chart-card">
      {title && (
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="chart-body">{children}</div>
    </div>
  );
}
