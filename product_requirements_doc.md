# divitiae.AI — Macro Intelligence MVP PRD

Economic Intelligence Engine

## 0) Purpose
Divitiae.ai’s first release will visualize macroeconomic health for the United States and key global economies through clear, dynamic, and information-dense dashboards.  
The goal is to **help users understand where growth, inflation, and financial risk are emerging** — visually and interactively.

This release focuses entirely on **data, structure, and interface clarity**, producing the kind of visual and conceptual coherence achieved in *Patterncraft*. Future iterations will include LLM summarization and interpretation and script generation (for faster and multi-modal consumption, audio app, youtube, other social media, etc).

---

## 1) Objectives (MVP)
1. Aggregate and visualize **macro indicators for the U.S. and major economies** (initially G7 + China + India).  
2. Compute **composite scores** per country: growth, inflation, labor, policy, and financial market conditions.  
3. Generate **a global dashboard** showing cross-country comparisons and trend synchronization.  
4. Provide **deep-dive views** for each country with indicator-level detail and correlations.  
5. Design a **front-end layout** that feels like a macro terminal: clean, data-rich, intuitive, and styled consistently with Inertia7 and Patterncraft.  

---

## 2) Scope
**Included**
- U.S. and major global economies (G7 + China + India).
- Data fetched via FRED, OECD, IMF, World Bank, and country-level central bank APIs.
- On-demand fetching (no scheduler).
- Interactive dashboard with modular visualizations.
- DMI computation per country and global summary.
- Comparative visualizations (e.g., bond yields, inflation spreads, unemployment levels).

**Excluded (future phases)**
- Automated summaries, LLM narration, and voice generation.
- Predictive modeling and economic forecasts.
- User accounts, alerts, or email digests.

---

## 3) Users & Use Cases

### 3.1 Retail / General Users
- Understand which economies are accelerating, decelerating, or entering recession.
- Visualize inflation and bond yields globally.
- Track relationships between interest rates, inflation, and employment.

### 3.2 Investors / Analysts
- Quickly assess macro divergence between regions (e.g., U.S. vs Eurozone).
- Identify potential policy misalignments or contagion risks.
- Use visual outputs for presentation, modeling, or macro commentary.

---

## 4) Data Model
- `Country` — ISO country code, name, region, flag asset.  
- `Indicator` — metadata (name, source, units, frequency, category).  
- `IndicatorValue` — time series data with timestamps.  
- `MacroIndex` — composite DMI (0–100) per country with sub-scores (Labor, Inflation, Growth, Policy, Market).  

---

## 5) Indicators (V1 Scope)

### 5.1 Global Coverage — Core Economies
United States, Canada, Euro Area, United Kingdom, Japan, China, India, Australia.

### 5.2 Domains and Metrics

| Domain | Indicator | Source | Frequency | Description |
|---------|------------|---------|------------|--------------|
| **Monetary Policy** | Policy Rate / Central Bank Rate | FRED / OECD / CB APIs | Monthly | Current benchmark interest rate |
| | 10-Year Government Bond Yield | IMF / Investing.com / FRED | Daily | Long-term sovereign yield |
| | 2-Year Bond Yield | FRED / OECD | Daily | Short-term sovereign yield |
| | Yield Curve (10Y–2Y) | Derived | Daily | Recession / policy risk proxy |
| **Inflation** | CPI YoY | OECD / National Stat Offices | Monthly | Headline inflation |
| | Core CPI YoY | OECD / FRED | Monthly | Excluding food/energy |
| | PPI YoY | OECD / World Bank | Monthly | Producer inflation |
| **Labor Market** | Unemployment Rate | FRED / OECD / World Bank | Monthly | Headline labor indicator |
| | Employment Growth YoY | OECD | Quarterly | Labor market expansion/contraction |
| **Growth & Output** | Real GDP Growth (Q/Q ann.) | BEA / OECD / IMF | Quarterly | Output momentum |
| | Industrial Production Index | OECD / IMF | Monthly | Real activity proxy |
| | PMI (Manufacturing) | S&P Global | Monthly | Forward-looking growth sentiment |
| **Consumer & Demand** | Consumer Confidence Index | OECD / Conference Board | Monthly | Household sentiment |
| | Retail Sales YoY | OECD / FRED | Monthly | Demand indicator |
| **Trade & External** | Current Account (% of GDP) | IMF | Quarterly | Trade balance proxy |
| | FX Reserves (USD) | IMF | Monthly | Currency defense capacity |
| **Financial Markets** | Stock Index Return (YoY) | Yahoo Finance / FRED | Daily | Market sentiment proxy |
| | Currency Strength (vs USD) | FRED / FX APIs | Daily | Exchange rate impact |

---

## 6) Computation

### 6.1 Subindices (per country)
| Subindex | Inputs | Description |
|-----------|---------|-------------|
| **LMI (Labor)** | Unemployment, Employment Growth | Employment health |
| **IMI (Inflation)** | CPI, Core CPI, PPI | Inflation pressure |
| **GSI (Growth)** | GDP, PMI, Industrial Production | Growth momentum |
| **PMI (Policy/Market)** | Policy rate, yield curve, bond spreads | Monetary stance |
| **CCI (Consumer)** | Confidence, Retail Sales | Consumer strength |

### 6.2 Divitiae Macro Index (DMI)
```
DMI = 0.25·GSI + 0.25·IMI + 0.20·LMI + 0.20·CCI + 0.10·PMI
```

Regime labels (same globally):
- 80–100: Expansion
- 60–79: Late-Cycle
- 40–59: Slowdown
- 20–39: Recession Risk
- <20: Recession

---

## 7) Visual Design & Layout (Core Deliverable)

The Divitiae dashboard should feel like a **living macroeconomic control room** — minimalist, data-rich, and visually consistent with *Inertia7* and *Patterncraft*.

### 7.1 Page Hierarchy

#### **1. Global Overview Page**
**Goal:** understand the relative economic health of major economies at a glance.

**Layout**
- **Top Row (Global Snapshot Bar):**  
  - World DMI average (global macro temperature).  
  - Map visualization (choropleth) shading countries by regime.  
  - Small numeric callouts: % of global GDP in slowdown / expansion / recession.

- **Second Row (Country Grid):**  
  - 3x3 or 4x2 responsive grid.  
  - Each tile = country summary card:
    - Flag + name  
    - DMI + delta  
    - Sparkline (6-month DMI trend)  
    - Key metric chips: CPI, Unemployment, 10Y Yield  
    - Click → open country detail view.

- **Third Row (Comparative Charts):**
  - Global yield curve heatmap (countries on Y-axis, maturities on X-axis).  
  - Inflation comparison chart (bar or scatter: CPI vs Core CPI).  
  - Growth scatter: GDP vs PMI (size = policy rate).

---

#### **2. Country Detail Page**
**Goal:** deep dive into one country’s macro conditions and internal dynamics.

**Layout Sections**
1. **Header Section**
   - Country flag, name, DMI, regime color.
   - Trend indicator (arrow ↑ ↓ →).
   - Date of latest data pull.
   - “Regime Summary” chip: *Expansion / Slowdown / etc.*

2. **Indicator Panels (Five Columns)**
   - **Growth Panel**  
     - GDP trend line  
     - PMI over time  
     - Industrial production chart  
     - Hover tooltip: YoY rate + last update  
   - **Inflation Panel**  
     - CPI, Core CPI, PPI stacked lines  
     - Annotated policy targets if available  
   - **Labor Panel**  
     - Unemployment rate + Employment growth  
     - Option for “distribution by age/race” side chart (optional toggle)
   - **Consumer Panel**  
     - Confidence index + Retail sales trend  
     - Correlation widget (confidence vs spending)
   - **Policy & Market Panel**  
     - Policy rate vs CPI (dual-axis)  
     - Yield curve slope chart (2Y–10Y, 3M–10Y)  
     - Bond yield chart (curve shape)
     - Stock index trend (overlay)

3. **Correlation Explorer (Expandable Widget)**
   - Scatter matrix showing correlations between key variables (e.g., inflation vs unemployment, yield curve vs GDP).  
   - Interactive brushing + hover value.

4. **Time Navigator (Bottom)**
   - Shared time slider for the entire dashboard (drag to update all charts).
   - Date markers for major policy events (rate cuts, fiscal shocks, etc.).

---

#### **3. Comparative Dashboard**
**Goal:** compare trends across multiple countries simultaneously.

**Layout**
- **Top Control Bar:** dropdown to select up to 3 countries.  
- **Multi-Country Chart:** CPI, GDP, and 10Y Yield displayed side-by-side.  
- **Heatmap Mode:** rows = countries, columns = subindices (LMI, IMI, etc.), colors = relative strength.  
- **Yield Spread Tracker:** small multiple charts for each country’s yield curve evolution.

---

#### **4. Aesthetic & Styling**
- **Base Palette:**  
  - Dark mode first (Inertia7 style).  
  - Background: `#0b0c10` to `#121417` gradient.  
  - Text: off-white `#eaeaea` and muted `#9da3af`.  
  - Accent colors by macro regime:
    - Expansion — `#3de07a`  
    - Late-Cycle — `#ffd95e`  
    - Slowdown — `#f97316`  
    - Recession Risk — `#ef4444`  
    - Recession — `#991b1b`
- **Charts:**  
  - Line charts with neon-glow hover lines.  
  - Smooth motion transitions on regime changes (Framer Motion).  
  - Consistent grid and spacing rhythm from Patterncraft (8/16/24px spacing).  
  - Rounded corners (xl–2xl radius) and soft shadows.  
  - Tooltips styled like Inertia7’s code previews (dark translucent w/ sharp typography).
- **Typography:**  
  - Title: `Inter`, semibold, 18–20px.  
  - Label text: `IBM Plex Sans`, small caps, gray-400.  
  - Numeric data: monospaced (`Space Mono` or `IBM Plex Mono`).  
- **Interactivity:**  
  - Smooth hover reveals.  
  - Unified zoom/pan controls on time-series charts.  
  - Animated color transitions when DMI/regime updates.  

---

### 7.2 Dashboard Behavior
- All charts react to shared time slider.
- Country cards animate DMI delta (up = green, down = red).
- Each panel updates independently on fetch (parallel loads).
- Hovering on global map highlights linked country tile.
- Responsive design (grid condenses on mobile to vertical stack).
- “Compare” mode pins selected countries for simultaneous DMI visualization.

---

### 7.3 Design Philosophy
- Avoid clutter; every chart must answer a specific question.  
- Use consistent axis labeling, timestamp display, and data freshness indicators.  
- Focus on *macro structure over noise*: emphasize directionality and relationships (e.g., inflation easing while growth decelerates).  
- Integrate contextual hover tooltips: “Last updated,” “Source,” “YoY change.”

---

## 8) Implementation Notes
- **Backend:** Django app providing REST endpoints for indicator data and DMI computation.  
- **Frontend:** React (Vite) + Tailwind + Recharts/Plotly + Framer Motion.  
- **Data Sources:** FRED, BEA, OECD, IMF, World Bank, S&P Global, U.S. Treasury APIs.  
- **Storage:** Postgres, tables for indicators, values, countries, computed indices.  
- **Deployment:** Single Docker container on EC2.  
- **Caching:** Store most recent run; subsequent fetch merges new values only.  
- **Versioning:** Snapshot dataset daily to preserve DMI history.  

---

## 9) Example Flow (October 2025 Scenario)
1. User lands on **Global Dashboard** — sees world map showing U.S., Eurozone, China in “Slowdown”; India in “Expansion.”  
2. U.S. tile: DMI 43 (Slowdown), CPI 2.9%, Unemployment 4.3%, 10Y Yield 3.8%.  
3. Clicking opens **U.S. detail page** showing labor softening, inflation easing, curve re-steepening, and government shutdown note.  
4. Hovering over **Germany** tile: DMI 55 (Late-Cycle), CPI 2.5%, Unemployment 3.8%, 10Y 2.2%.  
5. User switches to **Compare Mode**, selects U.S., Japan, and India → sees GDP growth divergence, policy rate differentials, and inverted yield curve only in U.S.  
6. Dashboard communicates the core story visually: “Global disinflation, but uneven momentum — U.S. easing while Asia expands.”

---

## 10) Deliverables
1. Functional Django + React prototype.
2. Complete data ingestion for listed indicators and countries.
3. Computation layer for subindices and DMI.
4. Global and country dashboards with all visual components described above.
5. Unified styling consistent with Inertia7 + Patterncraft.

---