import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import CountryDetail from "./pages/CountryDetail";
import MetricDetail from "./pages/MetricDetail";
import ThemeToggle from "./components/ThemeToggle";
import "./styles/tokens.css";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [gridCols, setGridCols] = useState(4);
  const [timeRange, setTimeRange] = useState('5y');
  const [sortOrder, setSortOrder] = useState('manual');

  useEffect(() => {
    // Check localStorage for saved preferences
    const savedTheme = localStorage.getItem('theme');
    const savedGridCols = localStorage.getItem('gridCols');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    }
    if (savedGridCols) {
      setGridCols(parseInt(savedGridCols));
    } else {
      // Set default to 4 if not saved
      setGridCols(4);
    }
  }, []);

  useEffect(() => {
    // Apply theme class to document
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('gridCols', gridCols.toString());
  }, [gridCols]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="app-container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <header className="app-header">
                <h1 className="app-title">DIVITIAE.AI - MACRO INTEL</h1>
                <div className="header-controls">
                  <select
                    className="time-range-selector"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="manual">Manual Order</option>
                    <option value="type">Sort by Type</option>
                    <option value="freshness">Sort by Last Updated</option>
                  </select>
                  <select
                    className="time-range-selector"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="5y">Last 5 Years</option>
                    <option value="1y">Last 1 Year</option>
                    <option value="1m">Last Month</option>
                    <option value="1d">Last Day</option>
                  </select>
                  <div className="grid-selector">
                    {[1, 2, 4, 6].map((cols) => (
                      <button
                        key={cols}
                        className={`grid-btn ${gridCols === cols ? 'active' : ''}`}
                        onClick={() => setGridCols(cols)}
                        title={`${cols} column${cols > 1 ? 's' : ''}`}
                      >
                        {cols}
                      </button>
                    ))}
                  </div>
                  <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
                </div>
              </header>
              <CountryDetail isDark={isDark} gridCols={gridCols} timeRange={timeRange} sortOrder={sortOrder} />
            </>
          }
        />
        <Route
          path="/metric/:metricId"
          element={
            <>
              <header className="app-header">
                <h1 className="app-title">DIVITIAE.AI - MACRO INTEL</h1>
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              </header>
              <MetricDetail isDark={isDark} />
            </>
          }
        />
      </Routes>
    </div>
  );
}
