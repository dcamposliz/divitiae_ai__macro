/**
 * DMI (Divitiae Macro Index) Calculator
 * Per PRD Section 6 - Computation logic
 *
 * DMI = 0.25·GSI + 0.25·IMI + 0.20·LMI + 0.20·CCI + 0.10·PMI
 *
 * Subindices:
 * - LMI (Labor Market Index): Unemployment, Employment Growth
 * - IMI (Inflation Management Index): CPI, Core CPI, PPI
 * - GSI (Growth Strength Index): GDP, PMI, Industrial Production
 * - CCI (Consumer Confidence Index): Confidence, Retail Sales
 * - PMI (Policy/Market Index): Policy rate, yield curve, bond spreads
 */

/**
 * Normalize indicator to 0-100 scale
 * Higher values = better conditions (inversions handled per indicator)
 *
 * @param {number} value - Raw indicator value
 * @param {string} indicator - Indicator ID
 * @returns {number} Normalized score (0-100)
 */
const normalizeIndicator = (value, indicator) => {
  if (value === null || value === undefined) return null;

  // Normalization logic per indicator type
  // These ranges are based on historical data and PRD expectations

  switch (indicator) {
    // Lower is better (inverse)
    case 'unemployment':
      // 2% = 100, 10% = 0
      return Math.max(0, Math.min(100, 100 - (value - 2) * 12.5));

    case 'cpi':
    case 'coreCPI':
      // Target 2%, penalty for deviation (both high and low)
      const inflationTarget = 2;
      const deviation = Math.abs(value - inflationTarget);
      // 2% = 100, 0% or 5% = 50, 10% = 0
      return Math.max(0, 100 - deviation * 20);

    case 'ppi':
      // Similar to CPI, target ~2%
      const ppiDeviation = Math.abs(value - 2);
      return Math.max(0, 100 - ppiDeviation * 20);

    // Higher is better
    case 'gdpGrowth':
      // 0% = 0, 3% = 75, 5%+ = 100, negative = 0
      if (value < 0) return Math.max(0, 50 + value * 5); // Penalize negative growth heavily
      return Math.min(100, value * 20);

    case 'pmi':
      // 50 = expansion threshold
      // <45 = 0, 45-50 = 25-50, 50-55 = 50-75, 55+ = 75-100
      if (value < 45) return value * 1.1;
      if (value < 50) return 25 + (value - 45) * 5;
      return Math.min(100, 50 + (value - 50) * 5);

    case 'consumerConfidence':
      // Normalize around typical range (80-130)
      // 80 = 0, 100 = 50, 120 = 100
      return Math.max(0, Math.min(100, (value - 80) * 2.5));

    case 'retailSales':
      // YoY growth: 0% = 25, 3% = 75, 5%+ = 100
      if (value < 0) return Math.max(0, 25 + value * 5);
      return Math.min(100, 25 + value * 15);

    case 'employmentGrowth':
      // 0% = 25, 2% = 75, 3%+ = 100
      if (value < 0) return Math.max(0, 25 + value * 10);
      return Math.min(100, 25 + value * 25);

    case 'yieldCurve':
      // Positive curve = healthy (0-200 bps ideal)
      // Inverted curve = recession signal
      if (value < -50) return 0; // Deep inversion
      if (value < 0) return 25 + value * 0.5; // Mild inversion
      return Math.min(100, 50 + value * 0.25); // Positive curve

    case 'policyRate':
      // Context-dependent, but generally 2-4% is "normal"
      // This is simplified; real scoring would compare to neutral rate
      if (value < 1) return 40; // Too loose
      if (value > 6) return 40; // Too tight
      return 70 + (3 - Math.abs(value - 3)) * 10;

    default:
      return 50; // Neutral if unknown
  }
};

/**
 * Calculate Labor Market Index (LMI)
 * Inputs: Unemployment, Employment Growth
 */
export const calculateLMI = (data) => {
  const unemploymentScore = normalizeIndicator(data.unemployment, 'unemployment');
  const employmentGrowthScore = normalizeIndicator(data.employmentGrowth, 'employmentGrowth');

  const scores = [unemploymentScore, employmentGrowthScore].filter((s) => s !== null);
  if (scores.length === 0) return null;

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
};

/**
 * Calculate Inflation Management Index (IMI)
 * Inputs: CPI, Core CPI, PPI
 */
export const calculateIMI = (data) => {
  const cpiScore = normalizeIndicator(data.cpi, 'cpi');
  const coreCPIScore = normalizeIndicator(data.coreCPI, 'coreCPI');
  const ppiScore = normalizeIndicator(data.ppi, 'ppi');

  const scores = [cpiScore, coreCPIScore, ppiScore].filter((s) => s !== null);
  if (scores.length === 0) return null;

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
};

/**
 * Calculate Growth Strength Index (GSI)
 * Inputs: GDP Growth, PMI, Industrial Production
 */
export const calculateGSI = (data) => {
  const gdpScore = normalizeIndicator(data.gdpGrowth, 'gdpGrowth');
  const pmiScore = normalizeIndicator(data.pmi, 'pmi');
  const ipScore = normalizeIndicator(data.industrialProduction, 'industrialProduction');

  const scores = [gdpScore, pmiScore, ipScore].filter((s) => s !== null);
  if (scores.length === 0) return null;

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
};

/**
 * Calculate Consumer Confidence Index (CCI)
 * Inputs: Consumer Confidence, Retail Sales
 */
export const calculateCCI = (data) => {
  const confidenceScore = normalizeIndicator(data.consumerConfidence, 'consumerConfidence');
  const retailScore = normalizeIndicator(data.retailSales, 'retailSales');

  const scores = [confidenceScore, retailScore].filter((s) => s !== null);
  if (scores.length === 0) return null;

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
};

/**
 * Calculate Policy/Market Index (PMI_SUB - using PMI_SUB to avoid confusion with PMI indicator)
 * Inputs: Policy rate, Yield curve, Bond yield
 */
export const calculatePolicyMarketIndex = (data) => {
  const yieldCurveScore = normalizeIndicator(data.yieldCurve, 'yieldCurve');
  const policyRateScore = normalizeIndicator(data.policyRate, 'policyRate');

  const scores = [yieldCurveScore, policyRateScore].filter((s) => s !== null);
  if (scores.length === 0) return null;

  return scores.reduce((sum, s) => sum + s, 0) / scores.length;
};

/**
 * Calculate overall DMI
 * DMI = 0.25·GSI + 0.25·IMI + 0.20·LMI + 0.20·CCI + 0.10·PMI
 *
 * @param {Object} latestData - Object with latest indicator values
 * @returns {Object} { dmi, subindices: { LMI, IMI, GSI, CCI, PMI_SUB } }
 */
export const calculateDMI = (latestData) => {
  // Calculate derived indicators
  const yieldCurve =
    latestData.bondYield10Y && latestData.bondYield2Y
      ? (latestData.bondYield10Y - latestData.bondYield2Y) * 100 // Convert to bps
      : null;

  const data = {
    ...latestData,
    yieldCurve,
  };

  // Calculate subindices
  const LMI = calculateLMI(data);
  const IMI = calculateIMI(data);
  const GSI = calculateGSI(data);
  const CCI = calculateCCI(data);
  const PMI_SUB = calculatePolicyMarketIndex(data);

  // Calculate weighted DMI
  const weights = {
    GSI: 0.25,
    IMI: 0.25,
    LMI: 0.2,
    CCI: 0.2,
    PMI_SUB: 0.1,
  };

  const subindices = { LMI, IMI, GSI, CCI, PMI_SUB };
  const availableIndices = Object.entries(subindices).filter(([_, value]) => value !== null);

  if (availableIndices.length === 0) {
    return {
      dmi: null,
      subindices,
    };
  }

  // Weighted average (normalize weights if some indices are missing)
  let totalWeight = 0;
  let weightedSum = 0;

  availableIndices.forEach(([key, value]) => {
    const weight = weights[key];
    weightedSum += value * weight;
    totalWeight += weight;
  });

  const dmi = weightedSum / totalWeight;

  return {
    dmi: Math.round(dmi * 10) / 10, // Round to 1 decimal
    subindices: {
      LMI: LMI ? Math.round(LMI * 10) / 10 : null,
      IMI: IMI ? Math.round(IMI * 10) / 10 : null,
      GSI: GSI ? Math.round(GSI * 10) / 10 : null,
      CCI: CCI ? Math.round(CCI * 10) / 10 : null,
      PMI_SUB: PMI_SUB ? Math.round(PMI_SUB * 10) / 10 : null,
    },
  };
};

/**
 * Get latest indicator values from time series data
 * @param {Object} countryData - Time series data for all indicators
 * @returns {Object} Latest values for each indicator
 */
export const getLatestIndicators = (countryData) => {
  const latest = {};

  Object.entries(countryData).forEach(([indicator, series]) => {
    if (Array.isArray(series) && series.length > 0) {
      latest[indicator] = series[series.length - 1].value;
    }
  });

  return latest;
};
