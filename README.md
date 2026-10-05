HydroScope — Satellite-AI Water Intelligence

See Water. Predict Change. Act Before Drought.

Live demo: https://hydroscope26-six.vercel.app/

Demo Mode notice: This project currently runs on simulated demo data. It does not show live satellite measurements. The service layer is designed so real Sentinel-2 / Landsat / Google Earth Engine data can replace the demo data later.

Overview

Water scarcity and drought rarely happen suddenly. Water bodies usually show gradual changes in their surface area before conditions become critical. Many smaller lakes, ponds and remote reservoirs have no continuous monitoring.

HydroScope is a satellite-AI dashboard concept for monitoring the surface-water extent of lakes, reservoirs and other water bodies using freely available imagery (Sentinel-2 and Landsat). It complements existing ground sensors rather than replacing them.

Workflow

Satellite Imagery → Water Detection (NDWI) → Surface-Area Calculation
→ Historical Analysis → AI Forecast → Drought-Risk Indicator
Features
Dashboard: current surface area, historical average, change vs. baseline and risk level for the selected water body
Interactive map: satellite/base map toggle, water-body markers, date slider (2018–2026) and a time-series play button
Satellite analysis: before/after view with a water-mask overlay
Historical analytics: surface-water area over time with range filters (1M to All), historical mean and min–max envelope
Water change analysis: 30-day, 90-day and year-on-year change, plus historical percentile
Drought-risk monitor: transparent 0–100 risk score with Low / Moderate / High levels
AI forecast: 7, 30 and 90-day estimated surface extent with an uncertainty range
Sensor integration: CSV upload (date, waterLevel, temperature, turbidity) and a ground-sensor vs. satellite comparison
Compare water bodies: neutral side-by-side comparison
Alerts: filterable alerts for decline, risk, forecast and sensor anomalies
Launch Demo: guided walkthrough of the full workflow
Responsive design for desktop, tablet and mobile
Demo water bodies (simulated)
Water body	Current area	Historical average	Change	Risk
Mettur Reservoir	96.4 km²	117.5 km²	−18.0%	Moderate (62)
Chembarambakkam Lake	14.8 km²	19.5 km²	−24.1%	High (78)
Poondi Reservoir	5.3 km²	6.0 km²	−11.7%	Moderate (48)
Pulicat Lake	412 km²	448 km²	−8.0%	Low (27)

These values are illustrative demo data, not real measurements.

Methodology
Water detection (NDWI)

The Normalized Difference Water Index helps separate water from surrounding land using spectral information:

NDWI = (Green − NIR) / (Green + NIR)
Sentinel-2: Band 3 (Green) and Band 8 (NIR)
Landsat 8/9: Band 3 (Green) and Band 5 (NIR)

NDWI alone does not give perfect classification. Cloud cover, shadows, built-up areas and image quality can affect results.

Drought-risk score

The risk score (0–100) is a simple heuristic indicator:

Risk score = 40% baseline deficit
           + 30% 90-day decline
           + 20% low historical percentile
           + 10% persistence of decline

Levels: Low (below 35), Moderate (35–65), High (above 65).

Forecast

The forecast service is built as a pluggable interface (for example Prophet or LSTM models). In Demo Mode it returns simulated results with an uncertainty range. Forecasts are estimates, not guarantees.

Scientific limitations
Satellite imagery estimates surface-water extent. It does not directly measure water depth or volume.
Cloud cover and image quality can affect observations.
Forecasts are estimates and carry uncertainty.
The risk score is an analytical indicator, not an official drought declaration.
Ground water-level sensors can complement satellite observations.
Tech stack
React + TypeScript
Vite
Tailwind CSS
Recharts (charts)
Leaflet (maps)
Deployed on Vercel

Planned for real data: Google Earth Engine, Sentinel-2, Landsat, time-series ML (Prophet / LSTM).

Project structure
src/
  components/
    charts/      # area-over-time and forecast charts
    map/         # Leaflet basin map
    views/       # Dashboard, Sensor Data, Compare, Alerts, About, ...
  services/
    api.ts            # data access layer (demo implementation)
    dataSeed.ts       # simulated observations
    forecastService.ts
    riskService.ts
  types/
    hydrology.ts
Run locally

Requirements: Node.js (LTS).

bash
git clone https://github.com/yuvasriramesh2008-prog/HydroScope.git
cd HydroScope
npm install --legacy-peer-deps
npm run dev

Then open http://localhost:3000.

The demo runs without external API keys. Never commit real API keys or credentials; use environment variables instead.

Roadmap
Connect Google Earth Engine to compute NDWI from real Sentinel-2 / Landsat scenes for a pilot water body
Add cloud masking and MNDWI for more robust water detection
Add a backend API and database for observations, forecasts and sensor data
Train and validate real time-series forecasting models
Integrate rainfall and temperature data
Integrate real ground-sensor feeds
Built for

IEEE Aqua Challenge

Author:Yuvasri R
