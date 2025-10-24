import React from 'react';
import './ThemeToggle.css';

export default function ThemeToggle({ isDark, onToggle }) {
  return (
    <button
      className="theme-toggle-switch"
      onClick={onToggle}
      aria-label="Toggle theme"
      data-theme={isDark ? 'dark' : 'light'}
    >
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
    </button>
  );
}
