import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Plot from 'react-plotly.js';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableChart } from '../components/SortableChart';
import { fetchAllUSIndicators } from '../services/fredApi';
import { DARK_THEME_LAYOUT, PLOTLY_CONFIG } from '../components/charts/plotlyConfig';
import { sampleData } from '../utils/dataSampler';
import { calculateYieldSpread } from '../utils/derivedMetrics';
import { getIndicatorContext } from '../data/indicatorContext';
import './CountryDetail.css';

/**
 * US Economic Dashboard
 * Real-time data from FRED API
 */
export default function CountryDetail({ isDark = true, gridCols = 1, timeRange = 'all', sortOrder = 'manual' }) {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDataToggles, setShowDataToggles] = useState({});
  const [showContextToggles, setShowContextToggles] = useState({});

  // Chart order state
  const [chartOrder, setChartOrder] = useState([
    'yieldSpread',
    'unemployment',
    'cpi',
    'gdp',
    'fedFunds',
    'sp500',
    'housing',
    'oil',
    'retail',
    'industrial',
    'bond10y',
    'bond2y',
  ]);

  const [isDragging, setIsDragging] = useState(false);

  // Drag and drop sensors with delay to allow double-click
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = (event) => {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over.id) {
      setChartOrder((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // Filter data based on time range
  const filterByTimeRange = (series) => {
    if (!series || series.length === 0) return series;
    if (timeRange === 'all') return series;

    const now = new Date();
    let cutoffDate;

    switch (timeRange) {
      case '5y':
        cutoffDate = new Date(now.getFullYear() - 5, now.getMonth(), now.getDate());
        break;
      case '1y':
        cutoffDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      case '1m':
        cutoffDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case '1d':
        cutoffDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
        break;
      default:
        return series;
    }

    return series.filter(point => new Date(point.date) >= cutoffDate);
  };

  // Fetch all real data from FRED on mount
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const allData = await fetchAllUSIndicators();

        // Calculate derived metrics
        const yieldSpread = calculateYieldSpread(allData.bondYield10Y, allData.bondYield2Y);

        setData({
          ...allData,
          yieldSpread,
        });
      } catch (err) {
        setError(err.message);
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const ChartItem = ({ indicator, title, color, targetLine = null, chartKey, unit = '%', type = 'other', dragAttributes, dragListeners }) => {
    if (!data[indicator] || data[indicator].length === 0) return null;

    const fullSeries = data[indicator];
    const filtered = filterByTimeRange(fullSeries);
    if (filtered.length === 0) return null;

    // Sample data for performance (max 500 points for chart)
    const series = sampleData(filtered, 500);
    const latest = fullSeries[fullSeries.length - 1];

    // Scale chart elements based on grid columns
    const isCompact = gridCols > 1;
    const titleSize = isCompact ? (gridCols >= 4 ? '0.9rem' : '1.1rem') : '1.75rem';
    const valueSize = isCompact ? (gridCols >= 4 ? '1.5rem' : '1.8rem') : '2.5rem';
    const fontSize = isCompact ? (gridCols >= 4 ? 10 : 11) : 13;
    const marginLeft = isCompact ? (gridCols >= 4 ? 45 : 50) : 60;

    // Format value based on unit
    const formatValue = (val) => {
      if (unit === 'K') return (val * 1000).toLocaleString('en-US', { maximumFractionDigits: 0 });
      if (unit === '$') return `$${val.toFixed(2)}`;
      if (unit === 'index') return val.toFixed(2);
      return `${val.toFixed(1)}%`;
    };

    // Scale line width based on grid density
    const lineWidth = gridCols >= 4 ? 1.5 : gridCols >= 2 ? 2 : 3;
    const markerSize = gridCols >= 4 ? 3 : gridCols >= 2 ? 4 : 6;

    const traces = [
      {
        x: series.map((d) => d.date),
        y: series.map((d) => d.value),
        type: 'scatter',
        mode: 'lines+markers',
        name: title,
        line: { color, width: lineWidth },
        marker: { size: markerSize, color },
        fill: 'tozeroy',
        fillcolor: `${color}19`,
      },
    ];

    if (targetLine) {
      traces.push({
        x: series.map((d) => d.date),
        y: Array(series.length).fill(targetLine.value),
        type: 'scatter',
        mode: 'lines',
        name: targetLine.label,
        line: { color: targetLine.color || '#ffd95e', width: 2, dash: 'dash' },
      });
    }

    return (
      <div className="chart-item">
        <div
          className="chart-item-header"
          style={{ position: 'relative' }}
          {...(dragAttributes || {})}
          {...(dragListeners || {})}
          onDoubleClick={() => navigate(`/metric/${chartKey}`)}
          title="Drag to reorder | Double-click to view details"
        >
          <div className="metric-row">
            <h2 className="metric-title" style={{ fontSize: titleSize }}>
              {title}
            </h2>
            <div className="current-value" style={{ fontSize: valueSize }}>{formatValue(latest.value)}</div>
          </div>
          <span className={`indicator-type-badge ${type}`}>{type}</span>
          <p className="data-valid-as-of">Last updated {getRelativeTime(latest.date)}</p>
        </div>

        <div className="chart-item-container">
          <Plot
            key={`${chartKey}-${gridCols}`}
            data={traces}
            layout={{
              ...(isDark
                ? DARK_THEME_LAYOUT
                : {
                    paper_bgcolor: 'white',
                    plot_bgcolor: 'white',
                    font: { color: '#1a1a1a', family: 'Inter, sans-serif', size: fontSize },
                    xaxis: { gridcolor: '#e2e8f0', linecolor: '#cbd5e0' },
                    yaxis: { gridcolor: '#e2e8f0', linecolor: '#cbd5e0' },
                  }),
              autosize: true,
              font: { size: fontSize },
              margin: { t: 20, l: marginLeft, r: 20, b: 40 },
              xaxis: {
                ...(isDark ? DARK_THEME_LAYOUT.xaxis : { gridcolor: '#e2e8f0', linecolor: '#cbd5e0', color: '#4a5568' }),
                title: isCompact ? undefined : { text: 'Time', font: { size: fontSize } },
                tickfont: { size: fontSize - 1 },
              },
              yaxis: {
                ...(isDark ? DARK_THEME_LAYOUT.yaxis : { gridcolor: '#e2e8f0', linecolor: '#cbd5e0', color: '#4a5568' }),
                title: isCompact ? undefined : { text: title, font: { size: fontSize } },
                ticksuffix: unit === '%' ? '%' : '',
                tickfont: { size: fontSize - 1 },
              },
              showlegend: !!targetLine && !isCompact,
              legend: { x: 0, y: 1.15, orientation: 'h', font: { size: fontSize - 1 } },
            }}
            config={{ ...PLOTLY_CONFIG, responsive: true }}
            useResizeHandler={true}
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Action Buttons */}
        <div className="chart-actions">
          <button
            className="data-toggle-btn"
            onClick={() => setShowContextToggles({ ...showContextToggles, [chartKey]: !showContextToggles[chartKey] })}
          >
            {showContextToggles[chartKey] ? 'Hide' : 'Show'} Context
          </button>
          <button
            className="data-toggle-btn"
            onClick={() => setShowDataToggles({ ...showDataToggles, [chartKey]: !showDataToggles[chartKey] })}
          >
            {showDataToggles[chartKey] ? 'Hide' : 'Show'} Raw Data
          </button>
        </div>

        {showContextToggles[chartKey] && (() => {
          const context = getIndicatorContext(chartKey);
          if (!context) return null;

          return (
            <div className="context-panel">
              <div className="context-section">
                <h4>What is it?</h4>
                <p>{context.what}</p>
              </div>
              <div className="context-section">
                <h4>Why does it matter?</h4>
                <p>{context.why}</p>
              </div>
              <div className="context-section">
                <h4>How is it calculated?</h4>
                <p>{context.calculation}</p>
              </div>
            </div>
          );
        })()}

        {showDataToggles[chartKey] && (
          <div className="raw-data-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Raw Value</th>
                  <th>Formatted</th>
                </tr>
              </thead>
              <tbody>
                {series.slice(-5).reverse().map((point, idx) => (
                  <tr key={idx}>
                    <td>{point.date}</td>
                    <td>{point.value}</td>
                    <td>{formatValue(point.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const getRelativeTime = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return '1 day ago';
    return `${diffDays} days ago`;
  };

  const sortByType = () => {
    const chartConfigs = {
      yieldSpread: { type: 'leading' },
      unemployment: { type: 'lagging' },
      cpi: { type: 'lagging' },
      gdp: { type: 'coincident' },
      fedFunds: { type: 'policy' },
      sp500: { type: 'leading' },
      housing: { type: 'leading' },
      oil: { type: 'market' },
      retail: { type: 'coincident' },
      industrial: { type: 'coincident' },
      bond10y: { type: 'leading' },
      bond2y: { type: 'leading' },
    };

    const typeOrder = { leading: 1, coincident: 2, lagging: 3, policy: 4, market: 5 };

    const sorted = [...chartOrder].sort((a, b) => {
      const typeA = chartConfigs[a]?.type || 'other';
      const typeB = chartConfigs[b]?.type || 'other';
      return (typeOrder[typeA] || 99) - (typeOrder[typeB] || 99);
    });

    setChartOrder(sorted);
  };

  const sortByFreshness = () => {
    const dataKeys = {
      yieldSpread: 'yieldSpread',
      unemployment: 'unemployment',
      cpi: 'cpi',
      gdp: 'gdp',
      fedFunds: 'fedFunds',
      sp500: 'sp500',
      housing: 'housingStarts',
      oil: 'oil',
      retail: 'retailSales',
      industrial: 'industrialProduction',
      bond10y: 'bondYield10Y',
      bond2y: 'bondYield2Y',
    };

    const sorted = [...chartOrder].sort((a, b) => {
      const dataA = data[dataKeys[a]];
      const dataB = data[dataKeys[b]];
      if (!dataA || !dataB) return 0;

      const dateA = new Date(dataA[dataA.length - 1]?.date);
      const dateB = new Date(dataB[dataB.length - 1]?.date);

      return dateB - dateA; // Most recent first
    });

    setChartOrder(sorted);
  };

  // Apply sorting when sortOrder changes
  useEffect(() => {
    if (sortOrder === 'type') {
      sortByType();
    } else if (sortOrder === 'freshness') {
      sortByFreshness();
    }
  }, [sortOrder, data]);

  return (
    <div className="us-dashboard">
      {/* Header bar with country and today's date */}
      <div className="page-header-bar">
        <div className="page-country-label">United States</div>
        <div className="page-date-label">{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</div>
      </div>
      <hr className="page-divider" />

      {loading && (
        <div className="loading-state">
          <p>Loading real-time data from FRED API...</p>
        </div>
      )}

      {error && (
        <div className="error-state">
          <p>Error loading data: {error}</p>
          <p className="error-hint">Check browser console for details.</p>
        </div>
      )}

      {!loading && !error && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext items={chartOrder} strategy={rectSortingStrategy}>
            <div className="charts-grid" style={{ gridTemplateColumns: `repeat(${gridCols}, 1fr)`, gap: '3rem' }}>
              {chartOrder.map((chartKey) => {
                const chartConfig = {
                  yieldSpread: { title: 'Yield Curve Spread (10Y-2Y)', color: '#ef4444', unit: '%', type: 'leading', target: { value: 0, label: 'Inversion Threshold' } },
                  unemployment: { title: 'Unemployment Rate', color: '#FFD700', unit: '%', type: 'lagging' },
                  cpi: { title: 'Inflation (CPI YoY)', color: '#FF7F50', unit: '%', target: { value: 2.0, label: 'Fed Target (2%)' }, type: 'lagging' },
                  gdp: { title: 'GDP Growth (QoQ)', color: '#00FFFF', unit: '%', type: 'coincident' },
                  fedFunds: { title: 'Federal Funds Rate', color: '#ADFF2F', unit: '%', type: 'policy' },
                  sp500: { title: 'S&P 500 Index', color: '#3de07a', unit: 'index', type: 'leading' },
                  housing: { title: 'Housing Starts', color: '#da70d6', unit: 'K', type: 'leading' },
                  oil: { title: 'Oil Price (WTI)', color: '#ef4444', unit: '$', type: 'market' },
                  retail: { title: 'Retail Sales (YoY)', color: '#00FFFF', unit: '%', type: 'coincident' },
                  industrial: { title: 'Industrial Production (YoY)', color: '#ADFF2F', unit: '%', type: 'coincident' },
                  bond10y: { title: '10-Year Treasury', color: '#da70d6', unit: '%', type: 'leading' },
                  bond2y: { title: '2-Year Treasury', color: '#FF7F50', unit: '%', type: 'leading' },
                };

                const config = chartConfig[chartKey];
                if (!config) return null;

                const dataKey = {
                  yieldSpread: 'yieldSpread',
                  unemployment: 'unemployment',
                  cpi: 'cpi',
                  gdp: 'gdp',
                  fedFunds: 'fedFunds',
                  sp500: 'sp500',
                  housing: 'housingStarts',
                  oil: 'oil',
                  retail: 'retailSales',
                  industrial: 'industrialProduction',
                  bond10y: 'bondYield10Y',
                  bond2y: 'bondYield2Y',
                }[chartKey];

                return (
                  <SortableChart key={chartKey} id={chartKey}>
                    <ChartItem
                      indicator={dataKey}
                      title={config.title}
                      color={config.color}
                      targetLine={config.target}
                      chartKey={chartKey}
                      unit={config.unit}
                      type={config.type}
                    />
                  </SortableChart>
                );
              })}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
