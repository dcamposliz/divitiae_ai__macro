/**
 * FRED API Service
 * Fetch real economic data from Federal Reserve Economic Data
 *
 * API Docs: https://fred.stlouisfed.org/docs/api/fred/
 * Get free API key: https://fredaccount.stlouisfed.org/apikeys
 */

const FRED_API_KEY = '6cd2e46358d4e253c52512277890f10c';
const FRED_BASE_URL = '/api/fred'; // Use Vite proxy to avoid CORS

// FRED Series IDs for key economic indicators
export const FRED_SERIES = {
  US_UNEMPLOYMENT: 'UNRATE',           // Unemployment Rate
  US_CPI: 'CPIAUCSL',                  // CPI for All Urban Consumers
  US_CORE_CPI: 'CPILFESL',             // CPI Less Food & Energy
  US_GDP: 'GDP',                       // Gross Domestic Product
  US_10Y_TREASURY: 'DGS10',            // 10-Year Treasury Constant Maturity Rate
  US_2Y_TREASURY: 'DGS2',              // 2-Year Treasury Constant Maturity Rate
  US_FED_FUNDS: 'FEDFUNDS',            // Federal Funds Effective Rate
  US_SP500: 'SP500',                   // S&P 500 Index
  US_HOUSING_STARTS: 'HOUST',          // Housing Starts
  US_OIL_PRICE: 'DCOILWTICO',          // Crude Oil WTI Price
  US_RETAIL_SALES: 'RSXFS',            // Retail Sales
  US_INDUSTRIAL_PRODUCTION: 'INDPRO', // Industrial Production Index
};

/**
 * Fetch series observations from FRED
 * @param {string} seriesId - FRED series ID
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 * @returns {Promise<Array>} Array of {date, value} objects
 */
export async function fetchFredSeries(seriesId, startDate = '1950-01-01', endDate = null) {
  const today = endDate || new Date().toISOString().split('T')[0];

  const url = `${FRED_BASE_URL}/series/observations?series_id=${seriesId}&api_key=${FRED_API_KEY}&file_type=json&observation_start=${startDate}&observation_end=${today}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`FRED API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform FRED format to our format
    return data.observations
      .filter(obs => obs.value !== '.')  // Filter out missing values
      .map(obs => ({
        date: obs.date,
        value: parseFloat(obs.value),
      }));
  } catch (error) {
    console.error(`Error fetching FRED series ${seriesId}:`, error);
    throw error;
  }
}

/**
 * Fetch unemployment rate from FRED
 * @returns {Promise<Array>} Unemployment data
 */
export async function fetchUnemploymentRate() {
  return fetchFredSeries(FRED_SERIES.US_UNEMPLOYMENT);
}

/**
 * Fetch CPI data from FRED
 * @returns {Promise<Array>} CPI data
 */
export async function fetchCPI() {
  const data = await fetchFredSeries(FRED_SERIES.US_CPI);

  // Convert to year-over-year percentage change
  return data.map((point, idx) => {
    if (idx < 12) return null; // Need 12 months for YoY

    const currentValue = point.value;
    const yearAgoValue = data[idx - 12].value;
    const yoyChange = ((currentValue - yearAgoValue) / yearAgoValue) * 100;

    return {
      date: point.date,
      value: yoyChange,
    };
  }).filter(p => p !== null);
}

/**
 * Fetch 10-Year Treasury yield from FRED
 * @returns {Promise<Array>} 10Y yield data
 */
export async function fetch10YTreasury() {
  return fetchFredSeries(FRED_SERIES.US_10Y_TREASURY);
}

/**
 * Fetch Federal Funds Rate from FRED
 * @returns {Promise<Array>} Fed Funds rate data
 */
export async function fetchFedFunds() {
  return fetchFredSeries(FRED_SERIES.US_FED_FUNDS);
}

/**
 * Fetch 2-Year Treasury yield from FRED
 * @returns {Promise<Array>} 2Y yield data
 */
export async function fetch2YTreasury() {
  return fetchFredSeries(FRED_SERIES.US_2Y_TREASURY);
}

/**
 * Fetch GDP from FRED
 * @returns {Promise<Array>} GDP data
 */
export async function fetchGDP() {
  const data = await fetchFredSeries(FRED_SERIES.US_GDP);

  // Convert to quarter-over-quarter annualized growth rate
  return data.map((point, idx) => {
    if (idx < 1) return null;

    const currentValue = point.value;
    const previousValue = data[idx - 1].value;
    const qoqGrowth = ((currentValue - previousValue) / previousValue) * 100 * 4; // Annualized

    return {
      date: point.date,
      value: qoqGrowth,
    };
  }).filter(p => p !== null);
}

/**
 * Fetch S&P 500 from FRED (raw index value)
 */
export async function fetchSP500() {
  return fetchFredSeries(FRED_SERIES.US_SP500);
}

/**
 * Fetch Housing Starts from FRED
 */
export async function fetchHousingStarts() {
  return fetchFredSeries(FRED_SERIES.US_HOUSING_STARTS);
}

/**
 * Fetch Industrial Production from FRED (convert to YoY % change)
 */
export async function fetchIndustrialProduction() {
  const data = await fetchFredSeries(FRED_SERIES.US_INDUSTRIAL_PRODUCTION);

  return data.map((point, idx) => {
    if (idx < 12) return null;

    const currentValue = point.value;
    const yearAgoValue = data[idx - 12]?.value;
    if (!yearAgoValue) return null;

    const yoyChange = ((currentValue - yearAgoValue) / yearAgoValue) * 100;

    return {
      date: point.date,
      value: yoyChange,
    };
  }).filter(p => p !== null);
}

/**
 * Fetch Oil Price from FRED (raw price per barrel)
 */
export async function fetchOilPrice() {
  return fetchFredSeries(FRED_SERIES.US_OIL_PRICE);
}

/**
 * Fetch Retail Sales from FRED (convert to YoY % change)
 */
export async function fetchRetailSales() {
  const data = await fetchFredSeries(FRED_SERIES.US_RETAIL_SALES);

  return data.map((point, idx) => {
    if (idx < 12) return null;

    const currentValue = point.value;
    const yearAgoValue = data[idx - 12]?.value;
    if (!yearAgoValue) return null;

    const yoyChange = ((currentValue - yearAgoValue) / yearAgoValue) * 100;

    return {
      date: point.date,
      value: yoyChange,
    };
  }).filter(p => p !== null);
}

/**
 * Fetch all US indicators in parallel
 * @returns {Promise<Object>} Object with all indicators
 */
export async function fetchAllUSIndicators() {
  try {
    const [unemployment, cpi, treasury10Y, treasury2Y, fedFunds, gdp, sp500, housingStarts, oil, retailSales, industrialProd] = await Promise.all([
      fetchUnemploymentRate(),
      fetchCPI(),
      fetch10YTreasury(),
      fetch2YTreasury(),
      fetchFedFunds(),
      fetchGDP(),
      fetchSP500(),
      fetchHousingStarts(),
      fetchOilPrice(),
      fetchRetailSales(),
      fetchIndustrialProduction(),
    ]);

    return {
      unemployment,
      cpi,
      bondYield10Y: treasury10Y,
      bondYield2Y: treasury2Y,
      fedFunds,
      gdp,
      sp500,
      housingStarts,
      oil,
      retailSales,
      industrialProduction: industrialProd,
    };
  } catch (error) {
    console.error('Error fetching US indicators:', error);
    throw error;
  }
}
