/**
 * Regime classification based on DMI score
 * Per PRD Section 6.2 - DMI regimes and color coding
 */

export const REGIMES = {
  EXPANSION: {
    label: 'Expansion',
    min: 80,
    max: 100,
    color: '#3de07a',
    description: 'Strong growth, stable inflation, robust employment',
  },
  LATE_CYCLE: {
    label: 'Late-Cycle',
    min: 60,
    max: 79,
    color: '#ffd95e',
    description: 'Mature expansion, potential overheating signals',
  },
  SLOWDOWN: {
    label: 'Slowdown',
    min: 40,
    max: 59,
    color: '#f97316',
    description: 'Decelerating growth, mixed signals',
  },
  RECESSION_RISK: {
    label: 'Recession Risk',
    min: 20,
    max: 39,
    color: '#ef4444',
    description: 'Weak indicators, elevated recession probability',
  },
  RECESSION: {
    label: 'Recession',
    min: 0,
    max: 19,
    color: '#991b1b',
    description: 'Negative growth, rising unemployment',
  },
};

/**
 * Classify DMI score into regime
 * @param {number} dmi - DMI score (0-100)
 * @returns {Object} Regime object with label, color, description
 */
export const classifyRegime = (dmi) => {
  if (dmi === null || dmi === undefined || isNaN(dmi)) {
    return {
      label: 'Unknown',
      color: '#6b7280',
      description: 'Insufficient data',
    };
  }

  if (dmi >= REGIMES.EXPANSION.min) return REGIMES.EXPANSION;
  if (dmi >= REGIMES.LATE_CYCLE.min) return REGIMES.LATE_CYCLE;
  if (dmi >= REGIMES.SLOWDOWN.min) return REGIMES.SLOWDOWN;
  if (dmi >= REGIMES.RECESSION_RISK.min) return REGIMES.RECESSION_RISK;
  return REGIMES.RECESSION;
};

/**
 * Get trend direction from DMI history
 * @param {Array} dmiHistory - Array of DMI values (oldest to newest)
 * @returns {string} 'up' | 'down' | 'flat'
 */
export const getTrend = (dmiHistory) => {
  if (!dmiHistory || dmiHistory.length < 2) return 'flat';

  const latest = dmiHistory[dmiHistory.length - 1];
  const previous = dmiHistory[dmiHistory.length - 2];
  const diff = latest - previous;

  if (diff > 1) return 'up';
  if (diff < -1) return 'down';
  return 'flat';
};

/**
 * Get trend arrow symbol
 * @param {string} trend - 'up' | 'down' | 'flat'
 * @returns {string} Arrow symbol
 */
export const getTrendArrow = (trend) => {
  switch (trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    default:
      return '→';
  }
};

/**
 * Get color for numeric delta
 * @param {number} delta - Change value
 * @param {boolean} inverseColor - If true, negative is good (e.g., unemployment)
 * @returns {string} Color hex code
 */
export const getDeltaColor = (delta, inverseColor = false) => {
  if (delta === 0) return '#9da3af';

  const isPositive = delta > 0;
  const isGood = inverseColor ? !isPositive : isPositive;

  return isGood ? '#3de07a' : '#ef4444';
};
