/**
 * Derived/Compound Metrics Calculator
 * Combines multiple indicators to create new signals
 */

/**
 * Calculate Yield Curve Spread (10Y - 2Y)
 * Negative = Inverted curve = Strong recession signal
 *
 * @param {Array} treasury10Y - 10-year yield data
 * @param {Array} treasury2Y - 2-year yield data
 * @returns {Array} Yield spread time series
 */
export function calculateYieldSpread(treasury10Y, treasury2Y) {
  if (!treasury10Y || !treasury2Y) return [];

  // Create date-indexed maps for efficient lookup
  const map2Y = new Map(treasury2Y.map(d => [d.date, d.value]));

  return treasury10Y
    .map(point10Y => {
      const value2Y = map2Y.get(point10Y.date);
      if (value2Y === undefined) return null;

      return {
        date: point10Y.date,
        value: point10Y.value - value2Y, // 10Y - 2Y
      };
    })
    .filter(p => p !== null);
}

/**
 * Calculate Real Interest Rate (Fed Funds - CPI)
 * Negative = Accommodative policy (loose)
 * Positive = Restrictive policy (tight)
 *
 * @param {Array} fedFunds - Federal funds rate data
 * @param {Array} cpi - CPI year-over-year data
 * @returns {Array} Real rate time series
 */
export function calculateRealRate(fedFunds, cpi) {
  if (!fedFunds || !cpi) return [];

  const mapCPI = new Map(cpi.map(d => [d.date, d.value]));

  return fedFunds
    .map(point => {
      const cpiValue = mapCPI.get(point.date);
      if (cpiValue === undefined) return null;

      return {
        date: point.date,
        value: point.value - cpiValue, // Nominal rate - Inflation
      };
    })
    .filter(p => p !== null);
}

/**
 * Detect yield curve inversions
 * @param {Array} yieldSpread - Yield spread data
 * @returns {Array} Inversion periods [{start, end, duration}]
 */
export function detectInversions(yieldSpread) {
  const inversions = [];
  let inversionStart = null;

  yieldSpread.forEach((point, idx) => {
    const isInverted = point.value < 0;

    if (isInverted && !inversionStart) {
      // Start of inversion
      inversionStart = point.date;
    } else if (!isInverted && inversionStart) {
      // End of inversion
      inversions.push({
        start: inversionStart,
        end: yieldSpread[idx - 1]?.date || inversionStart,
        maxInversion: Math.min(...yieldSpread.slice(
          yieldSpread.findIndex(p => p.date === inversionStart),
          idx
        ).map(p => p.value)),
      });
      inversionStart = null;
    }
  });

  // Handle ongoing inversion
  if (inversionStart) {
    inversions.push({
      start: inversionStart,
      end: yieldSpread[yieldSpread.length - 1].date,
      maxInversion: Math.min(...yieldSpread
        .slice(yieldSpread.findIndex(p => p.date === inversionStart))
        .map(p => p.value)),
      ongoing: true,
    });
  }

  return inversions;
}

/**
 * Calculate Misery Index (Unemployment + Inflation)
 * Higher = Worse economic conditions for consumers
 *
 * @param {Array} unemployment - Unemployment rate data
 * @param {Array} cpi - CPI data
 * @returns {Array} Misery index time series
 */
export function calculateMiseryIndex(unemployment, cpi) {
  if (!unemployment || !cpi) return [];

  const mapCPI = new Map(cpi.map(d => [d.date, d.value]));

  return unemployment
    .map(point => {
      const cpiValue = mapCPI.get(point.date);
      if (cpiValue === undefined) return null;

      return {
        date: point.date,
        value: point.value + cpiValue,
      };
    })
    .filter(p => p !== null);
}
