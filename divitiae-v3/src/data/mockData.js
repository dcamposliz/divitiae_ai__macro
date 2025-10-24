/**
 * Complete mock macroeconomic data with DENSE time series
 * Monthly/Quarterly data from 2019-2024 with NO GAPS
 */

// Helper to generate all months from 2019-2024
const generateAllMonths = () => {
  const months = [];
  for (let year = 2019; year <= 2024; year++) {
    const maxMonth = year === 2024 ? 10 : 12; // Up to Oct 2024
    for (let m = 1; m <= maxMonth; m++) {
      months.push(`${year}-${String(m).padStart(2, '0')}`);
    }
  }
  return months;
};

// Helper to generate all quarters from 2019-2024
const generateAllQuarters = () => {
  const quarters = [];
  for (let year = 2019; year <= 2024; year++) {
    const maxQ = year === 2024 ? 3 : 4; // Up to Q3 2024
    for (let q = 1; q <= maxQ; q++) {
      quarters.push(`${year}-Q${q}`);
    }
  }
  return quarters;
};

// US Data - COMPLETE monthly/quarterly series
const US_CPI_DATA = [
  1.6, 1.5, 1.9, 2.0, 1.8, 1.6, 1.8, 1.7, 1.7, 1.8, 2.1, 2.3, // 2019
  2.5, 2.3, 1.5, 0.3, 0.1, 0.6, 1.0, 1.0, 1.4, 1.2, 1.2, 1.4, // 2020
  1.4, 1.7, 2.6, 4.2, 5.0, 5.4, 5.4, 5.3, 5.4, 6.2, 6.8, 7.0, // 2021
  7.5, 7.9, 8.5, 8.3, 8.6, 9.1, 8.5, 8.3, 8.2, 7.7, 7.1, 6.5, // 2022
  6.4, 6.0, 5.0, 4.9, 4.0, 3.0, 3.2, 3.7, 3.7, 3.2, 3.1, 3.4, // 2023
  3.1, 3.2, 3.5, 3.4, 3.3, 3.0, 2.9, 2.5, 2.4, 2.6, // 2024 (Jan-Oct)
];

const US_CORE_CPI_DATA = [
  2.2, 2.1, 2.0, 2.1, 2.0, 2.1, 2.2, 2.4, 2.3, 2.3, 2.3, 2.3, // 2019
  2.3, 2.4, 2.1, 1.4, 1.2, 1.2, 1.6, 1.6, 1.7, 1.6, 1.6, 1.6, // 2020
  1.4, 1.3, 1.6, 3.0, 3.8, 4.5, 4.3, 4.0, 4.0, 4.6, 5.1, 5.5, // 2021
  6.0, 6.4, 6.5, 6.2, 6.0, 5.9, 5.9, 6.3, 6.6, 6.3, 6.0, 5.7, // 2022
  5.6, 5.5, 5.6, 5.5, 5.3, 4.8, 4.7, 4.3, 4.1, 4.0, 4.0, 3.9, // 2023
  3.9, 3.8, 3.8, 3.6, 3.4, 3.3, 3.2, 3.2, 3.3, 3.3, // 2024 (Jan-Oct)
];

const US_UNEMPLOYMENT_DATA = [
  4.0, 3.8, 3.8, 3.6, 3.6, 3.7, 3.7, 3.7, 3.5, 3.6, 3.5, 3.6, // 2019
  3.5, 3.5, 4.4, 14.7, 13.3, 11.1, 10.2, 8.4, 7.9, 6.9, 6.7, 6.7, // 2020
  6.3, 6.2, 6.0, 6.1, 5.8, 5.9, 5.4, 5.2, 4.7, 4.6, 4.2, 3.9, // 2021
  4.0, 3.8, 3.6, 3.6, 3.6, 3.6, 3.5, 3.7, 3.5, 3.7, 3.7, 3.5, // 2022
  3.4, 3.6, 3.5, 3.4, 3.7, 3.6, 3.5, 3.8, 3.8, 3.8, 3.7, 3.7, // 2023
  3.7, 3.9, 3.8, 3.9, 4.0, 4.0, 4.3, 4.2, 4.1, 4.1, // 2024 (Jan-Oct)
];

const US_GDP_GROWTH_DATA = [
  3.1, 1.9, 2.0, 2.3, // 2019
  -5.0, -31.4, 33.4, 4.1, // 2020
  6.3, 6.7, 2.3, 6.9, // 2021
  -1.6, -0.6, 3.2, 2.6, // 2022
  2.2, 2.1, 4.9, 3.4, // 2023
  1.4, 3.0, 2.8, // 2024 Q1-Q3
];

const US_POLICY_RATE_DATA = [
  2.50, 2.50, 2.50, 2.50, 2.50, 2.50, 2.25, 2.25, 2.00, 1.75, 1.75, 1.75, // 2019
  1.75, 1.75, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, // 2020
  0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, // 2021
  0.25, 0.25, 0.50, 1.00, 1.00, 1.75, 2.50, 2.50, 3.25, 4.00, 4.50, 4.50, // 2022
  4.75, 4.75, 5.00, 5.25, 5.25, 5.25, 5.50, 5.50, 5.50, 5.50, 5.50, 5.50, // 2023
  5.50, 5.50, 5.50, 5.50, 5.50, 5.50, 5.50, 5.50, 5.00, 4.75, // 2024
];

const US_10Y_YIELD_DATA = [
  2.7, 2.7, 2.4, 2.5, 2.1, 2.0, 2.0, 1.5, 1.7, 1.7, 1.8, 1.9, // 2019
  1.5, 1.1, 0.7, 0.6, 0.7, 0.9, 0.5, 0.5, 0.7, 0.9, 0.8, 0.9, // 2020
  1.1, 1.4, 1.7, 1.6, 1.6, 1.5, 1.2, 1.3, 1.5, 1.6, 1.4, 1.5, // 2021
  1.8, 2.0, 2.3, 2.9, 2.8, 3.0, 2.7, 2.6, 3.2, 4.2, 4.2, 3.9, // 2022
  3.5, 3.9, 3.5, 3.4, 3.7, 3.8, 4.0, 4.2, 4.6, 4.9, 4.5, 4.2, // 2023
  4.0, 4.3, 4.3, 4.7, 4.5, 4.3, 4.2, 3.8, 3.7, 4.2, // 2024
];

const US_2Y_YIELD_DATA = [
  2.5, 2.5, 2.3, 2.3, 1.8, 1.6, 1.9, 1.5, 1.6, 1.6, 1.6, 1.6, // 2019
  1.3, 0.9, 0.2, 0.2, 0.2, 0.2, 0.1, 0.1, 0.2, 0.2, 0.2, 0.2, // 2020
  0.1, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.2, 0.3, 0.5, 0.6, 0.7, // 2021
  1.2, 1.5, 2.3, 2.7, 2.5, 3.1, 3.2, 3.2, 4.2, 4.5, 4.7, 4.4, // 2022
  4.2, 4.9, 4.0, 4.0, 4.4, 4.7, 5.0, 4.9, 5.1, 5.1, 4.9, 4.3, // 2023
  4.3, 4.6, 4.6, 5.0, 4.9, 4.7, 4.4, 3.9, 3.6, 4.2, // 2024
];

const US_PMI_DATA = [
  54.9, 53.0, 52.4, 52.6, 50.5, 51.7, 50.4, 49.1, 47.8, 48.3, 48.1, 52.4, // 2019
  50.9, 50.7, 49.1, 41.5, 43.1, 52.6, 54.2, 54.2, 53.2, 59.3, 57.1, 57.1, // 2020
  58.7, 60.8, 64.7, 60.7, 61.2, 62.1, 59.9, 59.1, 61.1, 60.8, 59.1, 58.7, // 2021
  57.6, 57.3, 58.8, 55.4, 56.1, 53.0, 52.8, 51.5, 50.9, 50.4, 49.0, 48.4, // 2022
  47.4, 47.7, 46.3, 48.4, 48.7, 46.3, 49.0, 47.6, 49.0, 46.7, 47.7, 47.4, // 2023
  49.1, 49.5, 50.3, 49.2, 48.7, 51.6, 49.6, 47.9, 47.2, 48.5, // 2024
];

// Convert arrays to date objects
const allMonths = generateAllMonths();
const allQuarters = generateAllQuarters();

export const MOCK_DATA = {
  US: {
    cpi: allMonths.map((date, i) => ({ date, value: US_CPI_DATA[i] })),
    coreCPI: allMonths.map((date, i) => ({ date, value: US_CORE_CPI_DATA[i] })),
    unemployment: allMonths.map((date, i) => ({ date, value: US_UNEMPLOYMENT_DATA[i] })),
    policyRate: allMonths.map((date, i) => ({ date, value: US_POLICY_RATE_DATA[i] })),
    bondYield10Y: allMonths.map((date, i) => ({ date, value: US_10Y_YIELD_DATA[i] })),
    bondYield2Y: allMonths.map((date, i) => ({ date, value: US_2Y_YIELD_DATA[i] })),
    pmi: allMonths.map((date, i) => ({ date, value: US_PMI_DATA[i] })),
    gdpGrowth: allQuarters.map((date, i) => ({ date, value: US_GDP_GROWTH_DATA[i] })),
  },

  // Simplified data for other countries (can expand later)
  DE: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 1.5 + Math.sin(i / 3) * 3 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 3.2 + Math.sin(i / 4) * 0.5 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 0.5 + Math.sin(i / 2) * 2 })),
  },

  CN: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 2.0 + Math.sin(i / 5) * 2 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 5.0 + Math.sin(i / 6) * 0.3 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 5.5 + Math.sin(i / 3) * 1.5 })),
  },

  IN: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 5.5 + Math.sin(i / 4) * 1.5 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 7.0 - i * 0.05 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 6.5 + Math.sin(i / 2) * 2 })),
  },

  JP: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 0.5 + Math.sin(i / 5) * 1.5 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 2.5 + Math.sin(i / 8) * 0.3 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 1.0 + Math.sin(i / 3) * 2 })),
  },

  GB: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 2.0 + Math.sin(i / 3) * 4 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 4.0 + Math.sin(i / 5) * 0.5 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 1.5 + Math.sin(i / 2) * 2 })),
  },

  CA: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 2.5 + Math.sin(i / 3) * 2.5 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 5.5 + Math.sin(i / 4) * 1 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 2.0 + Math.sin(i / 2) * 2 })),
  },

  FR: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 1.8 + Math.sin(i / 3) * 2.5 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 7.5 - i * 0.02 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 1.2 + Math.sin(i / 2) * 1.5 })),
  },

  IT: {
    cpi: allMonths.slice(0, 20).map((date, i) => ({ date, value: 1.5 + Math.sin(i / 3) * 3 })),
    unemployment: allMonths.slice(0, 20).map((date, i) => ({ date, value: 7.0 - i * 0.03 })),
    gdpGrowth: allQuarters.slice(0, 10).map((date, i) => ({ date, value: 1.0 + Math.sin(i / 2) * 2 })),
  },
};

/**
 * Get all data for a specific country
 */
export const getCountryData = (countryCode) => MOCK_DATA[countryCode] || {};

/**
 * Get latest value for a specific indicator
 */
export const getLatestValue = (countryCode, indicator) => {
  const countryData = MOCK_DATA[countryCode];
  if (!countryData || !countryData[indicator]) return null;

  const series = countryData[indicator];
  return series[series.length - 1];
};

/**
 * Get historical values for sparklines (last N data points)
 */
export const getSparklineData = (countryCode, indicator, points = 6) => {
  const countryData = MOCK_DATA[countryCode];
  if (!countryData || !countryData[indicator]) return [];

  const series = countryData[indicator];
  return series.slice(-points);
};
