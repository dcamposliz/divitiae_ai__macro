# Divitiae.ai - Status & Backlog

**Last Updated:** October 23, 2024
**Current Version:** v0.2.0-alpha
**Status:** US Module MVP - Feature Complete

---

## Current Status: US Module (MVP)

### ✅ Completed Features

#### Core Infrastructure
- [x] React 19 + Vite 7 project setup
- [x] FRED API integration with Vite proxy (CORS workaround)
- [x] Real-time data fetching for 11 US economic indicators
- [x] Full historical data (back to 1950s where available)
- [x] Data downsampling for performance (LTTB algorithm, 500 points max)
- [x] Error handling and loading states
- [x] Theme system (light/dark mode with localStorage persistence)
- [x] Grid layout system (1/2/4/6 columns with responsive scaling)
- [x] Time range filtering (All time, 5Y, 1Y, 1M, 1D)
- [x] React Router navigation
- [x] Drag-and-drop chart reordering (dnd-kit)
- [x] Drill-down navigation to metric detail pages

#### Current Indicators (12 total)

**Leading Indicators (5):**
- [x] **Yield Curve Spread (10Y-2Y)** - DERIVED - Daily, recession predictor
- [x] S&P 500 index (SP500) - Daily, back to 1927
- [x] Housing starts (HOUST) - Monthly, back to 1959
- [x] 10-Year Treasury yield (DGS10) - Daily, back to 1962
- [x] 2-Year Treasury yield (DGS2) - Daily, back to 1976

**Coincident Indicators (3):**
- [x] GDP growth quarter-over-quarter (GDP) - Quarterly, back to 1947
- [x] Industrial production year-over-year (INDPRO) - Monthly, back to 1919
- [x] Retail sales year-over-year (RSXFS) - Monthly, back to 1992

**Lagging Indicators (2):**
- [x] Unemployment rate (UNRATE) - Monthly, back to 1948
- [x] Inflation - CPI year-over-year (CPIAUCSL) - Monthly, back to 1947

**Policy Indicators (1):**
- [x] Federal Funds rate (FEDFUNDS) - Monthly, back to 1954

**Market Indicators (1):**
- [x] Oil price WTI (DCOILWTICO) - Daily, back to 1986

#### UX Features
- [x] Responsive grid layout (1/2/4/6 columns) - Defaults to 4
- [x] Minimalist theme toggle (clean switch, no emojis)
- [x] Indicator type badges (LEADING/COINCIDENT/LAGGING/POLICY/MARKET)
- [x] Sort controls (Manual/By Type/By Freshness) in navigation bar
- [x] Time range filtering (All time/5Y/1Y/1M/1D) - Defaults to 5 years
- [x] "Last updated X days ago" freshness indicators on all charts
- [x] Page header with country label and today's date
- [x] Raw data inspection table (show/hide toggle)
- [x] Context panels (what/why/how) with show/hide toggle
- [x] Latest value display with proper units (%, $, K, index)
- [x] Reference lines (2% Fed target on CPI, 0 line on yield spread)
- [x] Adaptive scaling (text size, line thickness, margins scale with grid density)
- [x] Consistent chart heights (350px fixed across all layouts)
- [x] Box-sizing fix (all elements same width, centered buttons)
- [x] Drag-and-drop reordering (hold 200ms, smooth animations)
- [x] Double-click drill-down to metric detail pages
- [x] Back navigation from detail pages
- [x] Full data table on detail pages (scrollable, all observations)
- [x] Statistical analysis (Current/Min/Max/Avg/StdDev with variability classification)
- [x] Python code examples on detail pages
- [x] Math formulas with worked examples
- [x] LTTB data downsampling for performance (500 points dashboard, full on detail)
- [x] Collapsible context articles (expanded by default)

#### Derived/Compound Metrics
- [x] Yield Curve Spread (10Y - 2Y) - Recession indicator with inversion detection
- [ ] Real Interest Rate (Fed Funds - CPI) - Policy stance indicator
- [ ] Misery Index (Unemployment + Inflation) - Consumer pain measure
- [ ] Yield spread vs Fed Funds correlation
- [ ] Automatic inversion period detection and highlighting

---

## Backlog

### High Priority (Near-term)

#### Missing Leading Indicators (Conference Board Top 10)
- [ ] Average Weekly Hours - Manufacturing (AWHMAN)
- [ ] Initial Jobless Claims (ICSA) - CRITICAL early warning signal
- [ ] New Orders - Consumer Goods (ACOGNO)
- [ ] ISM New Orders Index (NEWORDER)
- [ ] Non-Defense Capital Goods Orders ex-aircraft (NEWORDER)
- [ ] Building Permits (PERMIT)
- [ ] Leading Credit Index (DRTSCILM)
- [ ] Yield Spread (10Y - Fed Funds) - DERIVE from existing data
- [ ] Consumer Expectations (UMCSENT - U. Michigan sentiment)

#### Debt Delinquency Tracking (Critical for Recession Forecasting)
- [ ] Credit card delinquency rate (DRCCLACBS)
- [ ] Auto loan delinquency rate (DRSFRMACBS)
- [ ] Mortgage delinquency rate (DRSFRMACBS)
- [ ] Student loan delinquency rate (DRBLACBS)

#### Fear & Sentiment Indicators
- [ ] VIX Volatility Index (VIXCLS)
- [ ] Gold prices (GOLDPMGBD228NLBM)
- [ ] Corporate insider selling volume
- [ ] TED Spread (credit stress indicator)

#### Bubble Indicators
- [ ] IPO volume tracking (external API or manual)
- [ ] CAPE ratio (Shiller P/E) - cyclically adjusted P/E
- [ ] Margin debt levels (NYMTMDEBT)

#### US Module Enhancements
- [ ] Add Core CPI indicator (CPILFESL)
- [ ] Calculate yield spread automatically (10Y - Fed Funds)
- [ ] Add annotations for major events (Fed rate cuts, fiscal shocks)
- [ ] Implement number formatting with commas for S&P 500
- [ ] Add statistical analysis on detail pages (std dev, percentiles)

#### Data Quality
- [ ] Validate all unit transformations (YoY calculations)
- [ ] Handle missing/null values gracefully
- [ ] Add data freshness indicators ("Last updated: X days ago")
- [ ] Implement data caching to reduce API calls

#### UX Improvements
- [ ] Add keyboard shortcuts (grid: 1-4, theme: T)
- [ ] Improve mobile responsiveness
- [ ] Add chart export (PNG, CSV)
- [ ] Implement chart zoom/pan synchronization
- [ ] Add tooltips explaining each indicator
- [ ] Show data source + update frequency per chart

---

### Medium Priority (Next Quarter)

#### DMI Computation (Per PRD)
- [ ] Implement DMI calculation engine
- [ ] Create 5 sub-indices (LMI, IMI, GSI, CCI, PMI_SUB)
- [ ] Add regime classification (Expansion, Late-Cycle, Slowdown, Recession Risk, Recession)
- [ ] Display DMI score with color-coded regime chip
- [ ] DMI historical timeline chart

#### Multi-Indicator Views
- [ ] Correlation matrix explorer (scatter plot matrix)
- [ ] Dual-axis charts (e.g., CPI vs Fed Funds on same chart)
- [ ] Yield curve visualization (2Y, 5Y, 10Y, 30Y)
- [ ] Inflation components breakdown (food, energy, shelter)

#### Navigation & Routing
- [ ] Add React Router
- [ ] Global Overview page (country grid)
- [ ] Country Detail pages (current view)
- [ ] Comparative Dashboard (multi-country)

---

### Low Priority (Future Phases)

#### International Module
- [ ] OECD API integration for G7 countries
- [ ] IMF API for emerging markets
- [ ] Country selector with flag icons
- [ ] Multi-country comparative charts
- [ ] Currency-adjusted indicators

#### Advanced Features
- [ ] User accounts and saved views
- [ ] Custom dashboards (drag-and-drop charts)
- [ ] Email alerts for regime changes
- [ ] Historical regime periods (shaded areas on charts)
- [ ] Economic calendar integration
- [ ] News feed correlated with data

#### AI/LLM Integration (Per PRD Phase 2)
- [ ] LLM summarization of macro conditions
- [ ] Voice narration generation
- [ ] Script generation for social media
- [ ] Audio podcast generation
- [ ] Automated macro commentary

#### Performance & Scale
- [ ] Backend API to replace direct FRED calls
- [ ] Database caching layer
- [ ] WebSocket for real-time updates
- [ ] CDN for static assets
- [ ] Server-side rendering (SSR)

---

## Technical Debt

### Code Quality
- [ ] Add TypeScript (convert .jsx to .tsx)
- [ ] Add PropTypes validation
- [ ] Add unit tests (Jest + React Testing Library)
- [ ] Add E2E tests (Playwright)
- [ ] Improve error messages

### Refactoring Needs
- [ ] Extract chart creation logic to custom hook (`useChartData`)
- [ ] Create chart component library (instead of inline Plot components)
- [ ] Separate data fetching from UI (custom hooks: `useFredData`)
- [ ] Consolidate theme configuration
- [ ] Remove deprecated Dashboard.jsx

### Documentation
- [ ] Add JSDoc comments to all functions
- [ ] Create component usage examples
- [ ] Document API response formats
- [ ] Create developer onboarding guide

---

## Known Issues

### Current Bugs
- [ ] Time range filter doesn't work correctly for quarterly data (GDP)
- [ ] S&P 500 showing weird dates (2025-XX-XX instead of 2024)
- [ ] Chart resizing occasionally glitchy on rapid grid changes
- [ ] Raw data table doesn't show correct formatted units for all types

### Limitations
- Only US data available (FRED API only)
- No historical DMI data yet
- No backend caching (every refresh re-fetches)
- No offline mode
- Charts can be slow with large datasets

---

## API Rate Limits

### FRED API
- **Free tier:** 120 requests/minute
- **Current usage:** ~11 requests per page load
- **Mitigation:** Need backend caching layer for production

---

## Deployment Checklist

### Pre-Production
- [ ] Add .env file for API keys (remove hardcoded key)
- [ ] Implement rate limiting
- [ ] Add analytics (Plausible or similar)
- [ ] Add error tracking (Sentry)
- [ ] Optimize bundle size
- [ ] Add service worker for offline support
- [ ] Security audit
- [ ] Performance audit (Lighthouse)

### Production
- [ ] Backend API deployment
- [ ] Database setup and migration
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Domain and SSL setup
- [ ] Monitoring and alerting
- [ ] Backup strategy
- [ ] Load testing

---

## Feature Comparison: PRD vs Current

| Feature | PRD Requirement | Current Status |
|---------|----------------|----------------|
| US Economic Data | ✅ Required | ✅ Implemented (11 indicators) |
| Global Coverage (G7+CN+IN) | ✅ Required | ❌ Not started |
| DMI Computation | ✅ Required | ⚠️ Partial (logic exists, not integrated) |
| Global Dashboard | ✅ Required | ❌ Not started |
| Country Detail Pages | ✅ Required | ✅ Implemented (US only) |
| Comparative Dashboard | ✅ Required | ❌ Not started |
| Dark Theme | ✅ Required | ✅ Implemented |
| Interactive Charts | ✅ Required | ✅ Implemented (Plotly) |
| Data Freshness | ✅ Required | ⚠️ Partial (no indicators shown) |
| Backend API | ❌ Excluded (MVP) | ❌ Not implemented |
| LLM Summarization | ❌ Excluded (MVP) | ❌ Not implemented |

---

## Next Sprint (Recommendations)

### Week 1: Critical Leading Indicators
1. **Initial Jobless Claims** (ICSA) - Most important early warning
2. **Building Permits** (PERMIT) - Housing sector forward indicator
3. **ISM Manufacturing PMI** (NAPM)
4. **Consumer Sentiment** (UMCSENT - U. Michigan)
5. **Yield Spread** - Calculate 10Y - Fed Funds automatically

### Week 2: Debt Delinquency Dashboard
1. Credit card delinquency rates
2. Auto loan delinquency rates
3. Mortgage delinquency rates
4. Create "Consumer Stress" composite indicator
5. Alert system for rising delinquencies

### Week 3: Fear & Bubble Indicators
1. VIX volatility index
2. Gold prices (corrected FRED series)
3. CAPE Shiller P/E ratio
4. Margin debt levels
5. Create "Market Froth" dashboard section

### Week 4: Yield Curve Deep Dive
1. Multi-maturity yield curve (2Y, 5Y, 10Y, 30Y)
2. Yield curve slope chart
3. Inversion detection with alerts
4. Historical inversion periods overlay
5. Recession probability model based on curve

---

## Long-term Roadmap

### Q1 2025: Multi-Country Support
- International module with OECD/IMF data
- Global overview with choropleth map
- Comparative dashboard

### Q2 2025: Backend & Performance
- Django API deployment
- PostgreSQL time-series database
- WebSocket real-time updates
- Production deployment

### Q3 2025: AI Integration
- LLM macro commentary
- Automated insights
- Voice/audio generation
- Social media content generation

### Q4 2025: Advanced Features
- User accounts
- Custom dashboards
- Alert system
- Mobile app (React Native)

---

## Notes
- Focus on US module first - get it perfect before expanding
- Data quality > feature quantity
- Terminal aesthetic is core to brand identity
- Every chart must answer a specific question
