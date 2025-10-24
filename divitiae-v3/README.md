# Divitiae.ai - Macro Intelligence Dashboard (v3)

Economic Intelligence Engine for visualizing macroeconomic health across major global economies.

---

## Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern browser with JavaScript enabled

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

The dev server runs at `http://localhost:5173` by default.

---

## Project Overview

**Goal:** Visualize macroeconomic health for the U.S. and key global economies (G7 + China + India) through clear, dynamic, information-dense dashboards.

**Current Status:** Early prototype with basic charting and hardcoded sample data.

**Target State (per PRD):**
- Global Overview Page (world map, country grid, comparative charts)
- Country Detail Pages (5 indicator panels: Growth, Inflation, Labor, Consumer, Policy/Market)
- Comparative Dashboard (multi-country selection, heatmaps, yield spreads)
- DMI (Divitiae Macro Index) computation with 5 subindices
- Real-time data from FRED, OECD, IMF, World Bank APIs

---

## Tech Stack

### Frontend (Current)
- **React 19** - UI framework
- **Vite 7** - Build tool and dev server
- **Plotly.js** - Interactive charting library
- **CSS** - Custom dark theme styling

### Frontend (Planned)
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and transitions
- **React Router** - Navigation between views
- **Recharts/Plotly** - Multiple charting libraries for different viz types

### Backend (Not Yet Implemented)
- **Django** - REST API framework
- **PostgreSQL** - Time series data storage
- **FRED/OECD/IMF APIs** - External data sources
- **Docker** - Containerization for deployment

---

## Architecture Notes

### Data Model (Planned)
```
Country
  - ISO code, name, region, flag asset

Indicator
  - name, source, units, frequency, category

IndicatorValue
  - time series data with timestamps

MacroIndex (DMI)
  - Composite score (0-100) per country
  - Subindices: LMI (Labor), IMI (Inflation), GSI (Growth), PMI (Policy/Market), CCI (Consumer)
```

### DMI Calculation
```
DMI = 0.25·GSI + 0.25·IMI + 0.20·LMI + 0.20·CCI + 0.10·PMI

Regimes:
  80-100: Expansion      (#3de07a)
  60-79:  Late-Cycle     (#ffd95e)
  40-59:  Slowdown       (#f97316)
  20-39:  Recession Risk (#ef4444)
  <20:    Recession      (#991b1b)
```

---

## Current Implementation

**What Works:**
- Basic dashboard with 4 metric cards (GDP, Inflation, Unemployment, Bond Yield)
- Two Plotly charts (GDP vs Inflation line chart, Labor/Bonds bar chart)
- Dark theme foundation matching PRD color scheme
- Hardcoded 2019-2024 sample data

**What's Missing:**
- ❌ Backend API and database
- ❌ Real data fetching
- ❌ DMI computation engine
- ❌ Multiple page views (routing)
- ❌ Global overview map and country grid
- ❌ Country detail pages
- ❌ Comparative dashboard
- ❌ Time slider and interactive controls
- ❌ Regime color coding and animations
- ❌ Tailwind CSS integration
- ❌ Component modularity

---

## Design System (per PRD)

### Colors
- **Background:** `#0b0c10` to `#121417` gradient
- **Text Primary:** `#eaeaea`
- **Text Muted:** `#9da3af`
- **Card Background:** `#14181f`
- **Regime Colors:** See DMI calculation above

### Typography
- **Headings:** Inter, semibold, 18-20px
- **Labels:** IBM Plex Sans, small caps, gray-400
- **Numeric Data:** Space Mono or IBM Plex Mono (monospaced)

### Layout Principles
- 8/16/24px spacing rhythm (from Patterncraft)
- Rounded corners (xl-2xl radius)
- Soft shadows and neon-glow hover effects
- Dark mode first, terminal-style aesthetic

---

## Development Priorities

### Phase 1 - Foundation (Current)
- [x] React + Vite setup
- [x] Basic dashboard layout
- [x] Plotly integration
- [ ] Refactor Dashboard.jsx into modular components
- [ ] Add Tailwind CSS
- [ ] Implement proper file structure

### Phase 2 - Backend
- [ ] Django project setup
- [ ] Database schema implementation
- [ ] FRED API integration
- [ ] DMI computation logic
- [ ] REST endpoints for frontend

### Phase 3 - Frontend Core
- [ ] React Router setup (3 main views)
- [ ] State management (Context API)
- [ ] Data fetching layer
- [ ] Component library (MetricCard, CountryCard, ChartWrapper)

### Phase 4 - Features
- [ ] Global Overview page
- [ ] Country Detail pages
- [ ] Comparative Dashboard
- [ ] Time slider component
- [ ] Correlation explorer
- [ ] Responsive design

### Phase 5 - Polish
- [ ] Framer Motion animations
- [ ] Regime color transitions
- [ ] Error handling
- [ ] Loading states
- [ ] Performance optimization

---

## Key Files

```
divitiae-v3/
├── src/
│   ├── main.jsx              # App entry point
│   ├── App.jsx                # Root component with header
│   ├── pages/
│   │   └── Dashboard.jsx      # Main dashboard (needs refactoring)
│   ├── styles/
│   │   └── tokens.css         # Dark theme styles
│   └── assets/                # Static assets
├── public/                    # Public assets
├── package.json               # Dependencies
├── vite.config.js             # Vite configuration
└── index.html                 # HTML entry point
```

---

## Contributing Notes

- **Styling:** Follow PRD design system strictly (Inertia7/Patterncraft aesthetics)
- **Components:** Prefer composition over inheritance
- **Data:** Use TypeScript-style JSDoc comments until TS migration
- **Commits:** Descriptive messages following conventional commits

---

## Resources

- [Product Requirements Doc](../product_requirements_doc.md) - Full specification
- [Vite Documentation](https://vite.dev/)
- [Plotly React](https://plotly.com/javascript/react/)
- [FRED API](https://fred.stlouisfed.org/docs/api/)
- [OECD Data API](https://data.oecd.org/api/)

---

## License

Proprietary - Divitiae.ai
