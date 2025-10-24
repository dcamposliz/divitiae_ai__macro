# Divitiae.ai - Technical Specifications

**Title:** Core Macroeconomic Indicators — A Strategic Overview
**Subtitle:** The Essential Signals to Watch for U.S. and Global Market Health
**Vision:** Economic intelligence dashboard for visualizing macroeconomic health across major global economies through clear, dynamic, information-dense interfaces.

**Skill:** Quantitative Analysis
**Technology:** FRED API, Time-Series Analytics
**Tags:** Macro, Indicators, Forecasting, Yield Curve, Inflation, Debt, Equity, Delinquency, Recession

---

## Architecture

### Stack
- **Frontend:** React 19 + Vite 7
- **Charts:** Plotly.js for interactive time-series visualization
- **Data Sources:** FRED API (Federal Reserve Economic Data)
- **Styling:** CSS with CSS variables for theming
- **State:** React hooks (useState, useEffect)

### Backend (Future)
- **API:** Django REST Framework
- **Database:** PostgreSQL for time-series storage
- **Additional Sources:** OECD, IMF, World Bank, BLS APIs
- **Deployment:** Docker container on AWS EC2

---

## Design System

### Philosophy
- **Terminal-first aesthetic** - Sharp, data-focused, professional
- **No rounded corners** - Square borders, clean lines
- **No drop shadows** - Flat design, minimal chrome
- **Information density** - Maximize data visibility, minimize decoration
- **Responsive scaling** - Elements adapt to grid density

### Color Palette

#### Dark Theme (Default)
```css
--bg-primary: #0b0c10        /* Page background */
--bg-secondary: #14181f      /* Card/chart background */
--bg-header: #1f2833         /* Header background */
--text-primary: #eaeaea      /* Primary text */
--text-secondary: #9da3af    /* Secondary text */
--text-muted: #6b7280        /* Muted text */
--border-color: #2a3441      /* Borders and dividers */
--accent-color: #00FFFF      /* Interactive elements */
```

#### Light Theme
```css
--bg-primary: #ffffff
--bg-secondary: #ffffff
--bg-header: #ffffff
--text-primary: #1a1a1a
--text-secondary: #4a5568
--text-muted: #718096
--border-color: #e2e8f0
--accent-color: #0066cc
```

#### Chart Colors
```
Unemployment: #FFD700 (Gold)
Inflation:    #FF7F50 (Coral)
GDP:          #00FFFF (Cyan)
Fed Funds:    #ADFF2F (Yellow-Green)
S&P 500:      #3de07a (Green)
Housing:      #da70d6 (Orchid)
Oil:          #ef4444 (Red)
Treasuries:   #da70d6 (Orchid)
```

### Typography
- **Headings:** Inter, 600 weight
- **Body:** Inter, 400 weight
- **Data/Numbers:** Space Mono (monospace)
- **Labels:** Inter, uppercase, 0.05em letter-spacing

### Spacing Rhythm
- Base unit: 1rem (16px)
- Grid gaps: 2rem
- Card padding: 1rem - 1.5rem
- Margins: 0.5rem - 2rem increments

---

## Component Structure

### Page Components
```
pages/
└── CountryDetail.jsx    US economic dashboard (currently implemented)
```

### Reusable Components
```
components/
├── ThemeToggle.jsx      Light/dark mode switch
├── cards/
│   ├── MetricCard.jsx   Enhanced metric display with sparklines
│   └── ChartCard.jsx    Chart wrapper component
└── charts/
    ├── LineChart.jsx    Time-series line charts
    ├── BarChart.jsx     Bar charts
    └── plotlyConfig.js  Shared Plotly theme configuration
```

### Services
```
services/
└── fredApi.js          FRED API integration with CORS proxy
```

### Data Layer
```
data/
├── countries.js        Country metadata (G7 + China + India)
├── indicators.js       Indicator definitions
└── mockData.js         Mock time-series data (legacy)
```

### Utilities
```
utils/
├── dmiCalculator.js      DMI computation engine
├── regimeClassifier.js   Regime classification logic
└── formatters.js         Number/date formatting
```

---

## Data Standards

### Time Series Format
```javascript
[
  { date: 'YYYY-MM-DD', value: number },
  { date: 'YYYY-MM-DD', value: number },
  ...
]
```

### Indicator Units
- **Percentages:** Rates, growth, yields (displayed with % suffix)
- **Index Values:** S&P 500 (no suffix, 2 decimals)
- **Thousands:** Housing starts (displayed with commas, e.g., "1,307,000")
- **Dollars:** Oil price (displayed with $, 2 decimals)

### Data Transformations
- **CPI:** Convert to year-over-year % change
- **GDP:** Convert to quarter-over-quarter annualized growth rate
- **S&P 500:** Raw index value (no transformation)
- **Retail Sales:** Convert to year-over-year % change
- **Industrial Production:** Convert to year-over-year % change

---

## Chart Standards

### Plotly Configuration
- **Responsive:** Auto-resize with container
- **Mode:** `lines+markers` for all time series
- **Fill:** `tozeroy` with 10% opacity
- **Hover:** Show date and formatted value
- **Grid:** Subtle grid lines (10% opacity)

### Scaling by Grid Density
```javascript
Grid 1 column:  lineWidth=3px, markerSize=6px, fontSize=13px
Grid 2 columns: lineWidth=2px, markerSize=4px, fontSize=11px
Grid 4+ columns: lineWidth=1.5px, markerSize=3px, fontSize=10px
```

### Chart Heights
- Consistent 350px height for all charts
- Fixed 80px header height (prevents misalignment)

---

## Conventions

### File Naming
- **Components:** PascalCase (e.g., `CountryDetail.jsx`)
- **Utilities:** camelCase (e.g., `dmiCalculator.js`)
- **Styles:** Same name as component (e.g., `CountryDetail.css`)

### Code Style
- **ES6+ syntax:** Arrow functions, destructuring, template literals
- **Async/await:** For API calls (no .then() chains)
- **Functional components:** No class components
- **CSS variables:** Use theme variables, no hardcoded colors in components

### API Integration
- **Proxy through Vite** to avoid CORS issues (`/api/fred/*`)
- **Parallel fetching** with `Promise.all()`
- **Error handling** with try/catch and user-friendly messages
- **Loading states** for all async operations

### State Management
- **Local state:** useState for component-specific data
- **Props drilling:** For theme and grid preferences
- **localStorage:** Persist user preferences (theme, grid layout)

---

## Performance

### Optimization Strategies
- **Lazy loading:** Only fetch data on mount
- **Memoization:** Use `useMemo` for expensive calculations (DMI)
- **Debouncing:** Chart re-renders throttled by React key prop
- **Responsive handler:** Plotly `useResizeHandler` for grid changes

### Bundle Size
- Current dependencies: ~421 packages
- Main bundle: Plotly.js (largest dependency)
- No unnecessary imports

---

## Accessibility

### Standards
- Semantic HTML (header, main, section)
- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast ratios (WCAG AA compliant)

### Theme Toggle
- Accessible button with aria-label
- Visual indicator (☀️/🌙)
- Persists preference to localStorage

---

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ required (no IE11 support)
- CSS Grid and Flexbox required

---

## Development Workflow

### Commands
```bash
npm install        # Install dependencies
npm run dev        # Start dev server (localhost:5173+)
npm run build      # Production build
npm run preview    # Preview production build
npm run lint       # ESLint check
```

### Environment Setup
- Node.js 18+
- npm or yarn
- FRED API key (free from fredaccount.stlouisfed.org)

### Configuration
- **Vite config:** Proxy setup in `vite.config.js`
- **API key:** Set in `src/services/fredApi.js`

---

## Indicator Taxonomy

### Leading Indicators (Predict Future Activity)
**Top 10 per The Conference Board:**
1. Average Weekly Hours (Manufacturing) - Labor market & output expectations
2. Initial Jobless Claims - Early labor market weakening signal
3. New Orders (Consumer Goods) - Future production demand
4. ISM New Orders Index - Manufacturing expansion/contraction
5. Non-Defense Capital Goods Orders (ex-aircraft) - Business investment trends
6. Building Permits (New Housing) - Real estate & construction health
7. S&P 500 Stock Index - Investor expectations & sentiment
8. Leading Credit Index - Credit conditions & financial stress
9. Yield Spread (10Y Treasury - Fed Funds) - Inversion = recession signal
10. Consumer Expectations - Consumer confidence & spending plans

### Coincident Indicators (Current State)
- GDP - Total economic output
- Industrial Production - Manufacturing health
- Nonfarm Payrolls - Current employment activity
- Personal Income (ex-transfers) - Productive income generation

### Lagging Indicators (Confirmation)
- Unemployment Rate - Firms delay layoffs until downturn is clear
- Corporate Profits - Reflects past quarters of business activity
- CPI - Inflation confirms rising costs after the fact
- Commercial & Industrial Loans - Reflects past optimism/tightening

### Debt Delinquency Rates (Emerging Critical)
- Credit Cards (Leading) - Early consumer stress signal
- Auto Loans (Leading) - Linked to employment conditions
- Mortgages (Leading/Lagging) - Regional & subprime exposure dependent
- Student Loans (Leading) - Affects young adult spending & credit

### Fear & Sentiment Signals
- Gold Prices - Flight to safety indicator
- VIX (Volatility Index) - Expected market turbulence
- Bond Yield Movements - Risk-off sentiment
- Insider Selling Volume - Corporate executive confidence

### Bubble & Speculation Indicators
- IPO Volume & Valuation Spikes - Tech/AI boom signals
- 1st-Day IPO Returns - Speculative froth measure
- Venture Capital Deployment Rate - Risk appetite
- Price-to-Earnings (P/E) Extremes - Public equity overvaluation

### Yield Curve Analysis
- **Normal Curve:** 10Y yield > 2Y yield
- **Inverted Curve:** 2Y yield > 10Y yield → Strong recession predictor
- **Current Status (Oct 2024):** 10Y: 4.02%, 2Y: 3.46% → Upward sloping (healthy)

## Derived/Compound Metrics

### Implemented
**Yield Curve Spread (10Y - 2Y)**
```
Spread = Yield_10Y - Yield_2Y

Interpretation:
  > 0: Normal curve (healthy)
  = 0: Flat curve (caution)
  < 0: INVERTED (recession warning)
```

### Planned
**Real Interest Rate**
```
Real Rate = Fed Funds - CPI_YoY

Interpretation:
  > 0: Restrictive policy (cooling economy)
  ≈ 0: Neutral policy
  < 0: Accommodative policy (stimulative)
```

**Misery Index**
```
Misery = Unemployment + Inflation

Higher values = worse conditions for consumers
Historical peaks during stagflation (1970s-80s)
```

---

## Future Enhancements (See STATUS.md)
- Additional leading indicators (ISM, building permits, jobless claims)
- Debt delinquency tracking (credit cards, auto, mortgage, student)
- VIX and fear indicators
- IPO and bubble tracking
- DMI (Divitiae Macro Index) computation
- Multi-country support (International module)
- Global overview page with world map
- Comparative dashboard
- Backend API integration
- Real-time updates with WebSocket
- Export functionality (CSV, PNG, PDF)
- LLM summarization and interpretation
