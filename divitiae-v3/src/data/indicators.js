/**
 * Indicator metadata per PRD Section 5.2 - Domains and Metrics
 * Categories: Monetary Policy, Inflation, Labor, Growth, Consumer, Trade, Financial Markets
 */

export const INDICATOR_CATEGORIES = {
  MONETARY: 'Monetary Policy',
  INFLATION: 'Inflation',
  LABOR: 'Labor Market',
  GROWTH: 'Growth & Output',
  CONSUMER: 'Consumer & Demand',
  TRADE: 'Trade & External',
  FINANCIAL: 'Financial Markets',
};

export const INDICATORS = {
  // Monetary Policy
  policyRate: {
    id: 'policyRate',
    name: 'Policy Rate',
    category: INDICATOR_CATEGORIES.MONETARY,
    unit: '%',
    frequency: 'Monthly',
    source: 'Central Banks / FRED',
    description: 'Central bank benchmark interest rate',
  },
  bondYield10Y: {
    id: 'bondYield10Y',
    name: '10-Year Government Bond Yield',
    category: INDICATOR_CATEGORIES.MONETARY,
    unit: '%',
    frequency: 'Daily',
    source: 'FRED / IMF',
    description: 'Long-term sovereign yield',
  },
  bondYield2Y: {
    id: 'bondYield2Y',
    name: '2-Year Government Bond Yield',
    category: INDICATOR_CATEGORIES.MONETARY,
    unit: '%',
    frequency: 'Daily',
    source: 'FRED / OECD',
    description: 'Short-term sovereign yield',
  },
  yieldCurve: {
    id: 'yieldCurve',
    name: 'Yield Curve (10Y-2Y)',
    category: INDICATOR_CATEGORIES.MONETARY,
    unit: 'bps',
    frequency: 'Daily',
    source: 'Derived',
    description: 'Yield curve spread (recession indicator)',
  },

  // Inflation
  cpi: {
    id: 'cpi',
    name: 'CPI YoY',
    category: INDICATOR_CATEGORIES.INFLATION,
    unit: '%',
    frequency: 'Monthly',
    source: 'OECD / National Stat Offices',
    description: 'Headline inflation rate',
  },
  coreCPI: {
    id: 'coreCPI',
    name: 'Core CPI YoY',
    category: INDICATOR_CATEGORIES.INFLATION,
    unit: '%',
    frequency: 'Monthly',
    source: 'OECD / FRED',
    description: 'Inflation excluding food and energy',
  },
  ppi: {
    id: 'ppi',
    name: 'PPI YoY',
    category: INDICATOR_CATEGORIES.INFLATION,
    unit: '%',
    frequency: 'Monthly',
    source: 'OECD / World Bank',
    description: 'Producer price inflation',
  },

  // Labor Market
  unemployment: {
    id: 'unemployment',
    name: 'Unemployment Rate',
    category: INDICATOR_CATEGORIES.LABOR,
    unit: '%',
    frequency: 'Monthly',
    source: 'FRED / OECD / World Bank',
    description: 'Percentage of labor force unemployed',
  },
  employmentGrowth: {
    id: 'employmentGrowth',
    name: 'Employment Growth YoY',
    category: INDICATOR_CATEGORIES.LABOR,
    unit: '%',
    frequency: 'Quarterly',
    source: 'OECD',
    description: 'Year-over-year employment change',
  },

  // Growth & Output
  gdpGrowth: {
    id: 'gdpGrowth',
    name: 'Real GDP Growth (Q/Q Annualized)',
    category: INDICATOR_CATEGORIES.GROWTH,
    unit: '%',
    frequency: 'Quarterly',
    source: 'BEA / OECD / IMF',
    description: 'Real economic output growth',
  },
  industrialProduction: {
    id: 'industrialProduction',
    name: 'Industrial Production Index',
    category: INDICATOR_CATEGORIES.GROWTH,
    unit: 'Index',
    frequency: 'Monthly',
    source: 'OECD / IMF',
    description: 'Manufacturing and industrial output',
  },
  pmi: {
    id: 'pmi',
    name: 'PMI Manufacturing',
    category: INDICATOR_CATEGORIES.GROWTH,
    unit: 'Index',
    frequency: 'Monthly',
    source: 'S&P Global',
    description: 'Purchasing managers sentiment (>50 = expansion)',
  },

  // Consumer & Demand
  consumerConfidence: {
    id: 'consumerConfidence',
    name: 'Consumer Confidence Index',
    category: INDICATOR_CATEGORIES.CONSUMER,
    unit: 'Index',
    frequency: 'Monthly',
    source: 'OECD / Conference Board',
    description: 'Household economic sentiment',
  },
  retailSales: {
    id: 'retailSales',
    name: 'Retail Sales YoY',
    category: INDICATOR_CATEGORIES.CONSUMER,
    unit: '%',
    frequency: 'Monthly',
    source: 'OECD / FRED',
    description: 'Consumer spending growth',
  },

  // Trade & External
  currentAccount: {
    id: 'currentAccount',
    name: 'Current Account (% of GDP)',
    category: INDICATOR_CATEGORIES.TRADE,
    unit: '% GDP',
    frequency: 'Quarterly',
    source: 'IMF',
    description: 'Trade balance as percentage of GDP',
  },

  // Financial Markets
  stockIndex: {
    id: 'stockIndex',
    name: 'Stock Index Return YoY',
    category: INDICATOR_CATEGORIES.FINANCIAL,
    unit: '%',
    frequency: 'Daily',
    source: 'Yahoo Finance / FRED',
    description: 'Major stock market index return',
  },
};

export const INDICATOR_LIST = Object.values(INDICATORS);

export const getIndicatorsByCategory = (category) =>
  INDICATOR_LIST.filter((ind) => ind.category === category);
