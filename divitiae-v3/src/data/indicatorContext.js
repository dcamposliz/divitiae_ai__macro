/**
 * Indicator Context and Explanations
 * What each metric means, why it matters, how it's calculated
 */

export const INDICATOR_CONTEXT = {
  yieldSpread: {
    what: 'The difference between 10-year and 2-year U.S. Treasury yields.',
    why: 'One of the most reliable recession predictors. When the curve inverts (2Y > 10Y), a recession typically follows within 6-18 months. Inversions have preceded every recession since 1955.',
    calculation: '10-Year Treasury Yield - 2-Year Treasury Yield. Calculated daily by matching dates from both series.',
    interpretation: {
      positive: 'Normal upward-sloping curve - healthy economy',
      zero: 'Flat curve - potential slowdown ahead',
      negative: 'INVERTED - Strong recession signal',
    },
  },
  unemployment: {
    what: 'The percentage of the labor force that is jobless and actively seeking employment.',
    why: 'Lagging indicator that confirms economic downturns. Rising unemployment reduces consumer spending and signals economic weakness.',
    calculation: 'From BLS household survey. Unemployed persons divided by civilian labor force. Published monthly, sourced from FRED series UNRATE.',
    interpretation: {
      low: 'Under 4% - Strong labor market',
      normal: '4-6% - Healthy range',
      high: 'Above 6% - Weak labor market',
    },
  },
  cpi: {
    what: 'Consumer Price Index measures the average change in prices paid by urban consumers.',
    why: 'Lagging indicator of inflation. Fed targets 2% annual inflation. High inflation erodes purchasing power; deflation signals weak demand.',
    calculation: 'Year-over-year percentage change in CPI-U (All Urban Consumers). FRED series CPIAUCSL, calculated as: ((CPI_current - CPI_12mo_ago) / CPI_12mo_ago) * 100',
    interpretation: {
      low: 'Below 2% - Below Fed target',
      target: '2% - Fed\'s inflation target',
      high: 'Above 3% - Elevated inflation',
    },
  },
  gdp: {
    what: 'Gross Domestic Product - the total value of goods and services produced in the U.S.',
    why: 'Coincident indicator of economic health. Measures actual output and growth.',
    calculation: 'Quarter-over-quarter annualized growth rate. FRED series GDP. Formula: ((GDP_current - GDP_previous) / GDP_previous) * 100 * 4 (annualized).',
    interpretation: {
      negative: 'Below 0% - Economic contraction',
      slow: '0-2% - Slow growth',
      healthy: '2-3% - Trend growth',
      strong: 'Above 3% - Strong expansion',
    },
  },
  fedFunds: {
    what: 'The interest rate at which banks lend reserves to each other overnight.',
    why: 'Set by the Federal Reserve to control inflation and employment. Higher rates cool the economy; lower rates stimulate growth.',
    calculation: 'Effective Federal Funds Rate - weighted average of overnight lending rates. FRED series FEDFUNDS. Published monthly by the Fed.',
    interpretation: {
      low: '0-2% - Accommodative policy',
      neutral: '2-4% - Neutral policy',
      high: 'Above 5% - Restrictive policy',
    },
  },
  sp500: {
    what: 'The S&P 500 stock market index tracking 500 large U.S. companies.',
    why: 'Leading indicator - reflects investor expectations about future economic conditions. Market peaks often precede recessions.',
    calculation: 'Market-cap weighted index. FRED series SP500. Raw index value (no transformation).',
    interpretation: {
      falling: 'Bear market - pessimistic outlook',
      flat: 'Sideways - uncertain outlook',
      rising: 'Bull market - optimistic outlook',
    },
  },
  housing: {
    what: 'The number of new residential construction projects started (in thousands).',
    why: 'Leading indicator - housing is sensitive to interest rates and consumer confidence. Precedes economic turning points.',
    calculation: 'Seasonally adjusted annual rate. FRED series HOUST. Published monthly by Census Bureau.',
    interpretation: {
      low: 'Below 1,000K - Weak housing market',
      normal: '1,200-1,600K - Healthy activity',
      high: 'Above 1,600K - Strong demand',
    },
  },
  oil: {
    what: 'West Texas Intermediate crude oil price per barrel.',
    why: 'Market indicator - affects inflation, transportation costs, and corporate profits. Rising oil can signal inflation risk.',
    calculation: 'Daily spot price in USD. FRED series DCOILWTICO.',
    interpretation: {
      low: 'Below $50 - Deflationary pressure',
      normal: '$50-$80 - Stable range',
      high: 'Above $100 - Inflationary risk',
    },
  },
  retail: {
    what: 'Total receipts of retail stores, measuring consumer spending on goods.',
    why: 'Coincident indicator - consumer spending drives 70% of GDP. Reflects current economic momentum.',
    calculation: 'Year-over-year percentage change. FRED series RSXFS. Formula: ((Sales_current - Sales_12mo_ago) / Sales_12mo_ago) * 100',
    interpretation: {
      negative: 'Below 0% - Consumer pullback',
      slow: '0-3% - Weak spending',
      healthy: '3-6% - Solid growth',
    },
  },
  industrial: {
    what: 'Index of real output in manufacturing, mining, and utilities.',
    why: 'Coincident indicator - tracks actual production activity. Sensitive to recessions.',
    calculation: 'Year-over-year percentage change in Industrial Production Index. FRED series INDPRO.',
    interpretation: {
      negative: 'Below 0% - Industrial recession',
      slow: '0-2% - Sluggish production',
      healthy: 'Above 2% - Expanding output',
    },
  },
  bond10y: {
    what: '10-year U.S. Treasury bond yield - the interest rate on government debt maturing in 10 years.',
    why: 'Leading indicator - reflects long-term economic expectations and inflation outlook. Used as benchmark for mortgages.',
    calculation: 'Daily yield to maturity. FRED series DGS10. Published by U.S. Treasury.',
    interpretation: {
      low: 'Below 2% - Low inflation expectations',
      normal: '2-4% - Stable outlook',
      high: 'Above 5% - High inflation risk',
    },
  },
  bond2y: {
    what: '2-year U.S. Treasury bond yield - the interest rate on government debt maturing in 2 years.',
    why: 'Leading indicator - closely tracks Fed policy expectations. More volatile than 10Y.',
    calculation: 'Daily yield to maturity. FRED series DGS2. Published by U.S. Treasury.',
    interpretation: {
      low: 'Below 2% - Expected rate cuts',
      normal: '2-4% - Stable policy',
      high: 'Above 5% - Expected tight policy',
    },
  },
};

export const getIndicatorContext = (chartKey) => INDICATOR_CONTEXT[chartKey] || null;
