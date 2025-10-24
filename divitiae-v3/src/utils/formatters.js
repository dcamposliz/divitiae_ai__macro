/**
 * Formatting utilities for numbers, dates, and indicators
 */

/**
 * Format number with specified decimal places
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export const formatNumber = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) return '—';
  return value.toFixed(decimals);
};

/**
 * Format percentage
 * @param {number} value
 * @param {number} decimals
 * @param {boolean} showSign - Show + for positive values
 * @returns {string}
 */
export const formatPercent = (value, decimals = 1, showSign = false) => {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const sign = showSign && value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}%`;
};

/**
 * Format delta (change value)
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export const formatDelta = (value, decimals = 1) => {
  if (value === null || value === undefined || isNaN(value)) return '—';
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(decimals)}`;
};

/**
 * Format large numbers with K/M/B suffixes
 * @param {number} value
 * @returns {string}
 */
export const formatLargeNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—';

  const absValue = Math.abs(value);
  const sign = value < 0 ? '-' : '';

  if (absValue >= 1e9) {
    return `${sign}${(absValue / 1e9).toFixed(1)}B`;
  }
  if (absValue >= 1e6) {
    return `${sign}${(absValue / 1e6).toFixed(1)}M`;
  }
  if (absValue >= 1e3) {
    return `${sign}${(absValue / 1e3).toFixed(1)}K`;
  }
  return `${sign}${absValue.toFixed(0)}`;
};

/**
 * Format date string (YYYY-MM or YYYY-QX)
 * @param {string} dateStr
 * @returns {string}
 */
export const formatDate = (dateStr) => {
  if (!dateStr) return '—';

  // Handle quarterly format (2024-Q1)
  if (dateStr.includes('Q')) {
    return dateStr; // Keep as is
  }

  // Handle monthly format (2024-06)
  const [year, month] = dateStr.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

/**
 * Format date for tooltip (more verbose)
 * @param {string} dateStr
 * @returns {string}
 */
export const formatDateLong = (dateStr) => {
  if (!dateStr) return 'Unknown';

  if (dateStr.includes('Q')) {
    return dateStr.replace('-', ' '); // "2024 Q1"
  }

  const [year, month] = dateStr.split('-');
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

/**
 * Get unit symbol for indicator
 * @param {string} indicator - Indicator ID
 * @returns {string}
 */
export const getIndicatorUnit = (indicator) => {
  const units = {
    gdpGrowth: '%',
    cpi: '%',
    coreCPI: '%',
    ppi: '%',
    unemployment: '%',
    employmentGrowth: '%',
    policyRate: '%',
    bondYield10Y: '%',
    bondYield2Y: '%',
    yieldCurve: 'bps',
    pmi: '',
    consumerConfidence: '',
    retailSales: '%',
    stockIndex: '%',
    industrialProduction: '',
  };

  return units[indicator] || '';
};
