import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { fetchAllUSIndicators } from '../services/fredApi';
import { DARK_THEME_LAYOUT, PLOTLY_CONFIG } from '../components/charts/plotlyConfig';
import { calculateYieldSpread } from '../utils/derivedMetrics';
import { getIndicatorContext } from '../data/indicatorContext';
import './MetricDetail.css';

export default function MetricDetail({ isDark = true }) {
  const { metricId } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContext, setShowContext] = useState(true);

  const metricConfig = {
    yieldSpread: { title: 'Yield Curve Spread (10Y-2Y)', color: '#ef4444', unit: '%', dataKey: 'yieldSpread', isDerived: true, type: 'leading' },
    unemployment: { title: 'Unemployment Rate', color: '#FFD700', unit: '%', dataKey: 'unemployment', type: 'lagging' },
    cpi: { title: 'Inflation (CPI YoY)', color: '#FF7F50', unit: '%', dataKey: 'cpi', type: 'lagging' },
    gdp: { title: 'GDP Growth', color: '#00FFFF', unit: '%', dataKey: 'gdp', type: 'coincident' },
    fedFunds: { title: 'Federal Funds Rate', color: '#ADFF2F', unit: '%', dataKey: 'fedFunds', type: 'policy' },
    sp500: { title: 'S&P 500 Index', color: '#3de07a', unit: 'index', dataKey: 'sp500', type: 'leading' },
    housing: { title: 'Housing Starts', color: '#da70d6', unit: 'K', dataKey: 'housingStarts', type: 'leading' },
    oil: { title: 'Oil Price (WTI)', color: '#ef4444', unit: '$', dataKey: 'oil', type: 'market' },
    retail: { title: 'Retail Sales (YoY)', color: '#00FFFF', unit: '%', dataKey: 'retailSales', type: 'coincident' },
    industrial: { title: 'Industrial Production (YoY)', color: '#ADFF2F', unit: '%', dataKey: 'industrialProduction', type: 'coincident' },
    bond10y: { title: '10-Year Treasury Yield', color: '#da70d6', unit: '%', dataKey: 'bondYield10Y', type: 'leading' },
    bond2y: { title: '2-Year Treasury Yield', color: '#FF7F50', unit: '%', dataKey: 'bondYield2Y', type: 'leading' },
  };

  const config = metricConfig[metricId];

  useEffect(() => {
    async function loadData() {
      if (!config) {
        setError('Invalid metric');
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const allData = await fetchAllUSIndicators();

        // Calculate derived metrics if needed
        if (config.isDerived && metricId === 'yieldSpread') {
          const yieldSpread = calculateYieldSpread(allData.bondYield10Y, allData.bondYield2Y);
          setData(yieldSpread);
        } else {
          setData(allData[config.dataKey] || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [metricId]);

  if (!config) {
    return (
      <div className="metric-detail">
        <div className="error-state">Metric not found</div>
      </div>
    );
  }

  const stats = data.length > 0 ? (() => {
    const values = data.map(d => d.value);
    const avg = values.reduce((sum, v) => sum + v, 0) / values.length;
    const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
    const stdDev = Math.sqrt(variance);
    const coefficientOfVariation = Math.abs(avg) > 0.01 ? (stdDev / Math.abs(avg)) * 100 : 0;

    // Classify variability based on coefficient of variation
    let variability = 'LOW';
    if (coefficientOfVariation > 50) variability = 'HIGH';
    else if (coefficientOfVariation > 20) variability = 'MEDIUM';

    return {
      latest: data[data.length - 1]?.value,
      min: Math.min(...values),
      max: Math.max(...values),
      avg,
      stdDev,
      variability,
    };
  })() : null;

  const context = getIndicatorContext(metricId);

  return (
    <div className="metric-detail">
      <button className="back-btn" onClick={() => navigate('/')}>
        ← Back to Dashboard
      </button>

      <div className="metric-detail-header">
        <div className="title-row">
          <h1>{config.title}</h1>
          <span className={`indicator-type-badge ${config.type}`}>{config.type}</span>
        </div>
        <p className="metric-subtitle">United States | Data source: FRED{config.isDerived ? ' (Derived Metric)' : ''}</p>
      </div>

      {loading && <div className="loading-state">Loading data...</div>}
      {error && <div className="error-state">Error: {error}</div>}

      {!loading && !error && data.length > 0 && (
        <>
          {/* Stats Grid - FRONT AND CENTER */}
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-label">Current</div>
              <div className="stat-value" style={{ color: config.color }}>
                {config.unit === 'K' ? (stats.latest * 1000).toLocaleString() :
                 config.unit === '$' ? `$${stats.latest.toFixed(2)}` :
                 config.unit === 'index' ? stats.latest.toFixed(2) :
                 `${stats.latest.toFixed(1)}%`}
              </div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Min</div>
              <div className="stat-value">{stats.min.toFixed(1)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Max</div>
              <div className="stat-value">{stats.max.toFixed(1)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Average</div>
              <div className="stat-value">{stats.avg.toFixed(2)}</div>
            </div>
            <div className="stat-box">
              <div className="stat-label">Std Dev</div>
              <div className="stat-value">{stats.stdDev.toFixed(2)}</div>
              <div className="stat-note">{stats.variability} VARIABILITY</div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="full-chart">
            <Plot
              data={[
                {
                  x: data.map((d) => d.date), // Full data, no sampling
                  y: data.map((d) => d.value),
                  type: 'scatter',
                  mode: 'lines+markers',
                  name: config.title,
                  line: { color: config.color, width: 2 },
                  marker: { size: 4, color: config.color },
                  fill: 'tozeroy',
                  fillcolor: `${config.color}19`,
                },
              ]}
              layout={{
                ...(isDark ? DARK_THEME_LAYOUT : {
                  paper_bgcolor: 'white',
                  plot_bgcolor: 'white',
                  font: { color: '#1a1a1a', family: 'Inter, sans-serif' },
                }),
                height: 600,
                margin: { t: 40, l: 80, r: 40, b: 80 },
                xaxis: {
                  ...(isDark ? DARK_THEME_LAYOUT.xaxis : { gridcolor: '#e2e8f0', linecolor: '#cbd5e0', color: '#4a5568' }),
                  title: 'Time',
                },
                yaxis: {
                  ...(isDark ? DARK_THEME_LAYOUT.yaxis : { gridcolor: '#e2e8f0', linecolor: '#cbd5e0', color: '#4a5568' }),
                  title: config.title,
                  ticksuffix: config.unit === '%' ? '%' : '',
                },
                showlegend: false,
              }}
              config={PLOTLY_CONFIG}
              style={{ width: '100%', height: '600px' }}
            />
          </div>

          {/* Collapsible Context Section */}
          {context && (
            <div className="context-toggle-section">
              <button className="context-toggle-btn" onClick={() => setShowContext(!showContext)}>
                {showContext ? '▼' : '▶'} {showContext ? 'Hide' : 'Show'} Context & Methodology
              </button>

              {showContext && (
                <div className="context-article">
                  <div className="context-block">
                    <h4>What is it?</h4>
                    <p>{context.what}</p>
                  </div>

                  <div className="context-block">
                    <h4>Why does it matter?</h4>
                    <p>{context.why}</p>
                  </div>

                  <div className="context-block">
                    <h4>Calculation Method</h4>
                    <p>{context.calculation}</p>
                  </div>

                  {/* Code Examples */}
                  {metricId === 'yieldSpread' && (
                    <div className="code-example">
                      <h4>Python Implementation</h4>
                      <pre><code>{`import pandas as pd

def calculate_yield_spread(df_10y, df_2y):
    """Calculate 10Y - 2Y Treasury spread"""
    merged = pd.merge(df_10y, df_2y, on='date')
    merged['spread'] = merged['yield_10y'] - merged['yield_2y']
    return merged[['date', 'spread']]

# Negative spread = INVERSION = Recession signal`}</code></pre>
                    </div>
                  )}

                  {metricId === 'cpi' && (
                    <div className="code-example">
                      <h4>Formula</h4>
                      <pre><code>{`YoY Inflation = ((CPI_t - CPI_t-12) / CPI_t-12) × 100

Example: CPI Oct 2024 = 314.54, Oct 2023 = 307.67
         Inflation = (314.54 - 307.67) / 307.67 × 100 = 2.2%`}</code></pre>
                    </div>
                  )}

                  {metricId === 'gdp' && (
                    <div className="code-example">
                      <h4>Annualized Growth Formula</h4>
                      <pre><code>{`Growth = ((GDP_t - GDP_t-1) / GDP_t-1) × 100 × 4

Annualization factor (×4) converts quarterly to annual rate.`}</code></pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div className="data-table-full">
            <h3>Full Data ({data.length} observations)</h3>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice().reverse().map((point, idx) => (
                    <tr key={idx}>
                      <td>{point.date}</td>
                      <td>{point.value.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
