import satelliteBaselineImg from '../assets/images/satellite_baseline_earlier_1791115486606.jpg';
import satelliteCurrentImg from '../assets/images/satellite_current_latest_1791115499633.jpg';
import satelliteNdwiImg from '../assets/images/satellite_ndwi_map_1791115514619.jpg';

export const SATELLITE_ASSETS = {
  baseline: satelliteBaselineImg,
  current: satelliteCurrentImg,
  ndwi: satelliteNdwiImg,
};

export type RiskTier = 'LOW' | 'MODERATE' | 'HIGH';

export interface RiskBreakdown {
  baselineDeficit: number;
  trajectoryDecline: number;
  percentileRank: number;
  hydrologicalPersistence: number;
}

export interface WaterBody {
  id: string;
  name: string;
  shortName: string;
  basinCode: string;
  district: string;
  state: string;
  type: string;
  lat: number;
  lng: number;
  coordinatesFormatted: string;
  elevation: string;
  maxCapacity: string;
  surfaceArea: number;
  historicalAvg: number;
  maxHistorical: number;
  minHistorical: number;
  netAnomaly: number;
  lastObservationDate: string;
  lastUpdatedDisplay: string;
  hydroIndex: string;
  ndwiValue: number;
  cloudCoveragePct: number;
  riskScore: number;
  riskTier: RiskTier;
  deficitKm2: number;
  storagePct: number;
  gaugeDepth: number;
  perimeterLength: number;
  description: string;
  riskSummary: string;
  sensorFleet: string;
  sparkline: number[];
  monthlyPrecipDeficit: number;
  temperatureAnomaly: number;
  forecast30d: number;
  forecast60d: number;
  forecast90d: number;
  confidenceInterval: [number, number];
  change7d: number;
  change30d: number;
  change90d: number;
  changeYoY: number;
  percentile: number;
  riskBreakdown: RiskBreakdown;
  // Normalized SVG polygon paths (0-1000 coordinate space) for baseline & current water extent
  baselinePolygon: string;
  currentPolygon: string;
  earlierComparisonDate: string;
  earlierSurfaceArea: number;
}

export interface TrendPoint {
  date: string;
  formattedDate: string;
  observedExtent: number;
  historicalMean: number;
  minEnvelope: number;
  maxEnvelope: number;
  precipitationMm: number;
  surfaceTempC: number;
}

export interface ForecastPoint {
  date: string;
  formattedDate: string;
  observed?: number;
  projected?: number;
  lowerConfidence?: number;
  upperConfidence?: number;
  isForecast: boolean;
}

export interface SensorReading {
  date: string;
  waterLevel: number;
  temperature: number;
  turbidity: number;
  batteryPct?: number;
  status: string;
}

export interface SensorStation {
  stationId: string;
  waterBodyId: string;
  name: string;
  gaugeDepth: number;
  waterTemp: number;
  turbidity: number;
  batteryPct: number;
  status: string;
  samplingInterval: string;
  hydraulicVolEstKm3: number;
  readings: SensorReading[];
}

export interface HydroAlert {
  id: string;
  waterBodyId: string;
  waterBodyName: string;
  category: 'water-decline' | 'risk' | 'forecast' | 'sensor-anomaly';
  title: string;
  description: string;
  severity: 'HIGH' | 'MODERATE' | 'NOTICE';
  riskScore: number;
  timestamp: string;
  passSource: string;
}

export const WATER_BODIES: Record<string, WaterBody> = {
  mettur: {
    id: 'mettur',
    name: 'Mettur Reservoir (Salem, Tamil Nadu)',
    shortName: 'Mettur Reservoir',
    basinCode: 'BASIN #TN-334',
    district: 'Salem',
    state: 'Tamil Nadu',
    type: 'Reservoir / Dam',
    lat: 11.8028,
    lng: 77.8014,
    coordinatesFormatted: '11.8028° N, 77.8014° E',
    elevation: '241m ASL · GSD 10m/px',
    maxCapacity: '2,647 MCM (93.47 TMC)',
    surfaceArea: 96.4,
    historicalAvg: 117.5,
    maxHistorical: 148.2,
    minHistorical: 52.6,
    netAnomaly: -18.0,
    lastObservationDate: '12 Sep 2026',
    lastUpdatedDisplay: '04 Oct 2026',
    hydroIndex: 'NDWI +0.42',
    ndwiValue: 0.42,
    cloudCoveragePct: 3.8,
    riskScore: 62,
    riskTier: 'MODERATE',
    deficitKm2: -21.1,
    storagePct: 41,
    gaugeDepth: 7.8,
    perimeterLength: 142.6,
    description:
      'Inflow deficit from Upper Cauvery Basin; 90-day rate indicates accelerating surface-water recession into the lower historical quartile.',
    riskSummary:
      'Elevated Seasonal Stress: The reservoir holds within the 22nd historical percentile, driven by delayed monsoon inflow and heightened irrigation discharge.',
    sensorFleet: 'Sentinel-2 MSI + Landsat-9 OLI',
    sparkline: [130.0, 122.0, 115.0, 128.0, 108.0, 119.0, 104.0, 99.1, 96.4],
    monthlyPrecipDeficit: -31,
    temperatureAnomaly: 1.8,
    forecast30d: 92.1,
    forecast60d: 90.2,
    forecast90d: 88.2,
    confidenceInterval: [82.5, 93.8],
    change7d: -1.4,
    change30d: -7.8,
    change90d: -15.4,
    changeYoY: -18.1,
    percentile: 22,
    riskBreakdown: {
      baselineDeficit: 72,
      trajectoryDecline: 65,
      percentileRank: 22,
      hydrologicalPersistence: 45,
    },
    baselinePolygon:
      'M 210,160 C 290,115 410,105 530,130 C 660,155 770,220 810,320 C 835,385 785,465 710,510 C 625,560 480,585 350,555 C 240,530 165,455 150,350 C 140,265 160,190 210,160 Z',
    currentPolygon:
      'M 255,205 C 325,165 425,155 515,175 C 615,195 705,250 735,330 C 755,380 715,440 650,475 C 580,515 465,535 365,510 C 280,490 220,430 210,345 C 200,280 215,230 255,205 Z',
    earlierComparisonDate: 'Sep 2018 (Full Baseline)',
    earlierSurfaceArea: 128.4,
  },
  chembarambakkam: {
    id: 'chembarambakkam',
    name: 'Chembarambakkam Lake (Chennai, Tamil Nadu)',
    shortName: 'Chembarambakkam Lake',
    basinCode: 'BASIN #TN-108',
    district: 'Kanchipuram / Chengalpattu',
    state: 'Tamil Nadu',
    type: 'Freshwater Lake / Reservoir',
    lat: 13.0112,
    lng: 80.0577,
    coordinatesFormatted: '13.0112° N, 80.0577° E',
    elevation: '28m ASL · GSD 10m/px',
    maxCapacity: '103 MCM (3.65 TMC)',
    surfaceArea: 14.8,
    historicalAvg: 19.5,
    maxHistorical: 24.2,
    minHistorical: 6.8,
    netAnomaly: -24.1,
    lastObservationDate: '11 Sep 2026',
    lastUpdatedDisplay: '04 Oct 2026',
    hydroIndex: 'NDWI +0.31',
    ndwiValue: 0.31,
    cloudCoveragePct: 5.1,
    riskScore: 78,
    riskTier: 'HIGH',
    deficitKm2: -4.7,
    storagePct: 22,
    gaugeDepth: 3.4,
    perimeterLength: 32.8,
    description:
      'Water surface contracted by -24.1% compared with baseline. Approaching municipal potable distribution watch threshold.',
    riskSummary:
      'Critical Contraction: Severe shoreline withdrawal across western shallows; 68 consecutive days under seasonal baseline.',
    sensorFleet: 'Landsat-9 OLI-2 + Sentinel-2',
    sparkline: [21.0, 19.8, 18.2, 17.5, 16.4, 15.1, 14.8],
    monthlyPrecipDeficit: -38,
    temperatureAnomaly: 2.1,
    forecast30d: 13.5,
    forecast60d: 12.8,
    forecast90d: 12.1,
    confidenceInterval: [10.8, 14.5],
    change7d: -2.0,
    change30d: -9.2,
    change90d: -24.1,
    changeYoY: -26.5,
    percentile: 12,
    riskBreakdown: {
      baselineDeficit: 88,
      trajectoryDecline: 84,
      percentileRank: 12,
      hydrologicalPersistence: 76,
    },
    baselinePolygon:
      'M 190,210 C 280,140 450,120 600,155 C 730,185 820,270 805,375 C 790,470 675,545 535,565 C 390,585 240,535 175,435 C 130,360 135,255 190,210 Z',
    currentPolygon:
      'M 265,255 C 340,200 465,185 575,215 C 670,240 730,300 720,370 C 710,435 625,490 520,505 C 410,520 300,480 255,410 C 220,355 225,285 265,255 Z',
    earlierComparisonDate: 'Nov 2021 (High Capacity)',
    earlierSurfaceArea: 21.6,
  },
  poondi: {
    id: 'poondi',
    name: 'Poondi Reservoir (Tiruvallur, Tamil Nadu)',
    shortName: 'Poondi Reservoir',
    basinCode: 'BASIN #TN-114',
    district: 'Tiruvallur',
    state: 'Tamil Nadu',
    type: 'Reservoir',
    lat: 13.1895,
    lng: 79.8596,
    coordinatesFormatted: '13.1895° N, 79.8596° E',
    elevation: '42m ASL · GSD 10m/px',
    maxCapacity: '91 MCM (3.23 TMC)',
    surfaceArea: 5.3,
    historicalAvg: 6.0,
    maxHistorical: 7.8,
    minHistorical: 2.1,
    netAnomaly: -11.7,
    lastObservationDate: '10 Sep 2026',
    lastUpdatedDisplay: '04 Oct 2026',
    hydroIndex: 'NDWI +0.38',
    ndwiValue: 0.38,
    cloudCoveragePct: 2.4,
    riskScore: 48,
    riskTier: 'MODERATE',
    deficitKm2: -0.7,
    storagePct: 49,
    gaugeDepth: 4.8,
    perimeterLength: 21.4,
    description:
      'Poondi Reservoir sits near the 31st percentile of typical pre-monsoon retention levels, buffered by inter-basin canal transfers.',
    riskSummary:
      'Moderate Watch: Sustained by inter-basin Krishna water transfers with a gradual spatial recession rate.',
    sensorFleet: 'Sentinel-2 MSI',
    sparkline: [6.4, 6.1, 5.9, 5.7, 5.5, 5.3],
    monthlyPrecipDeficit: -22,
    temperatureAnomaly: 1.4,
    forecast30d: 5.0,
    forecast60d: 4.85,
    forecast90d: 4.7,
    confidenceInterval: [4.1, 5.5],
    change7d: -0.8,
    change30d: -4.5,
    change90d: -11.7,
    changeYoY: -13.2,
    percentile: 31,
    riskBreakdown: {
      baselineDeficit: 54,
      trajectoryDecline: 50,
      percentileRank: 31,
      hydrologicalPersistence: 38,
    },
    baselinePolygon:
      'M 230,180 C 340,130 490,130 620,175 C 740,215 795,310 770,405 C 745,495 620,550 480,555 C 340,560 215,495 185,390 C 160,305 175,210 230,180 Z',
    currentPolygon:
      'M 265,210 C 360,165 490,165 600,205 C 700,240 745,315 725,395 C 705,470 600,515 480,520 C 360,525 255,470 230,380 C 210,310 220,235 265,210 Z',
    earlierComparisonDate: 'Oct 2022 (Baseline)',
    earlierSurfaceArea: 6.4,
  },
  pulicat: {
    id: 'pulicat',
    name: 'Pulicat Lake (Coromandel Coast, Tamil Nadu)',
    shortName: 'Pulicat Lagoon',
    basinCode: 'BASIN #TN-092',
    district: 'Tiruvallur / Coastal Coromandel',
    state: 'Tamil Nadu / Andhra Pradesh',
    type: 'Coastal Lagoon',
    lat: 13.4167,
    lng: 80.2,
    coordinatesFormatted: '13.4167° N, 80.2000° E',
    elevation: '1m ASL · GSD 10m/px',
    maxCapacity: 'Tidal Lagoon System',
    surfaceArea: 412.0,
    historicalAvg: 448.0,
    maxHistorical: 485.0,
    minHistorical: 340.0,
    netAnomaly: -8.0,
    lastObservationDate: '12 Sep 2026',
    lastUpdatedDisplay: '04 Oct 2026',
    hydroIndex: 'NDWI +0.56',
    ndwiValue: 0.56,
    cloudCoveragePct: 4.2,
    riskScore: 27,
    riskTier: 'LOW',
    deficitKm2: -36.0,
    storagePct: 76,
    gaugeDepth: 2.1,
    perimeterLength: 285.0,
    description:
      'Estuarine surface-water area remains consistent with seasonal maritime baseline. Tidal exchange maintains healthy water spread.',
    riskSummary:
      'Healthy / Low Risk: Estuarine water levels remain consistent with seasonal maritime baseline.',
    sensorFleet: 'Sentinel-2 MSI + Landsat-9',
    sparkline: [450.0, 442.0, 435.0, 420.0, 412.0],
    monthlyPrecipDeficit: -12,
    temperatureAnomaly: 0.8,
    forecast30d: 405.0,
    forecast60d: 401.5,
    forecast90d: 398.0,
    confidenceInterval: [385.0, 422.0],
    change7d: -0.4,
    change30d: -2.1,
    change90d: -8.0,
    changeYoY: -7.5,
    percentile: 48,
    riskBreakdown: {
      baselineDeficit: 32,
      trajectoryDecline: 25,
      percentileRank: 48,
      hydrologicalPersistence: 18,
    },
    baselinePolygon:
      'M 175,155 C 295,110 475,110 645,150 C 780,185 845,285 825,395 C 805,500 675,565 505,575 C 335,585 185,515 145,400 C 115,305 120,180 175,155 Z',
    currentPolygon:
      'M 195,175 C 305,130 475,130 630,168 C 755,200 815,290 795,390 C 775,485 655,545 500,555 C 345,565 210,500 170,395 C 145,305 150,198 195,175 Z',
    earlierComparisonDate: 'Sep 2023 (Baseline)',
    earlierSurfaceArea: 448.0,
  },
};

export const SENSOR_STATIONS: Record<string, SensorStation> = {
  mettur: {
    stationId: 'STN #04-CW',
    waterBodyId: 'mettur',
    name: 'Mettur Dam Centroid CWC Pillar',
    gaugeDepth: 7.8,
    waterTemp: 26.4,
    turbidity: 14.2,
    batteryPct: 94,
    status: 'Operational',
    samplingInterval: '15-min intervals',
    hydraulicVolEstKm3: 0.75,
    readings: [
      { date: '2026-09-12 06:00', waterLevel: 7.82, temperature: 26.4, turbidity: 14.2, batteryPct: 94, status: 'Matched' },
      { date: '2026-09-12 00:00', waterLevel: 7.84, temperature: 25.8, turbidity: 13.8, batteryPct: 95, status: 'Matched' },
      { date: '2026-09-11 18:00', waterLevel: 7.89, temperature: 26.1, turbidity: 14.0, batteryPct: 95, status: 'Matched' },
      { date: '2026-09-11 12:00', waterLevel: 7.92, temperature: 27.0, turbidity: 14.5, batteryPct: 96, status: 'Matched' },
      { date: '2026-09-11 06:00', waterLevel: 7.95, temperature: 26.2, turbidity: 14.1, batteryPct: 96, status: 'Matched' },
    ],
  },
  chembarambakkam: {
    stationId: 'STN #11-CH',
    waterBodyId: 'chembarambakkam',
    name: 'Chembarambakkam Potable Intake Sluice',
    gaugeDepth: 3.4,
    waterTemp: 28.1,
    turbidity: 19.8,
    batteryPct: 88,
    status: 'Operational',
    samplingInterval: '15-min intervals',
    hydraulicVolEstKm3: 0.04,
    readings: [
      { date: '2026-09-11 18:00', waterLevel: 3.42, temperature: 28.1, turbidity: 19.8, batteryPct: 88, status: 'Matched' },
      { date: '2026-09-11 06:00', waterLevel: 3.48, temperature: 27.8, turbidity: 19.2, batteryPct: 89, status: 'Matched' },
      { date: '2026-09-10 18:00', waterLevel: 3.54, temperature: 28.0, turbidity: 19.5, batteryPct: 89, status: 'Matched' },
    ],
  },
  poondi: {
    stationId: 'STN #08-PD',
    waterBodyId: 'poondi',
    name: 'Poondi Headworks Krishna Conduit',
    gaugeDepth: 4.8,
    waterTemp: 27.2,
    turbidity: 16.4,
    batteryPct: 91,
    status: 'Operational',
    samplingInterval: '15-min intervals',
    hydraulicVolEstKm3: 0.05,
    readings: [
      { date: '2026-09-10 18:00', waterLevel: 4.81, temperature: 27.2, turbidity: 16.4, batteryPct: 91, status: 'Matched' },
      { date: '2026-09-10 06:00', waterLevel: 4.85, temperature: 26.9, turbidity: 16.1, batteryPct: 92, status: 'Matched' },
    ],
  },
  pulicat: {
    stationId: 'STN #02-PL',
    waterBodyId: 'pulicat',
    name: 'Pulicat Bar Mouth Maritime Probe',
    gaugeDepth: 2.1,
    waterTemp: 29.3,
    turbidity: 22.5,
    batteryPct: 96,
    status: 'Operational',
    samplingInterval: '30-min intervals',
    hydraulicVolEstKm3: 0.42,
    readings: [
      { date: '2026-09-12 06:00', waterLevel: 2.11, temperature: 29.3, turbidity: 22.5, batteryPct: 96, status: 'Matched' },
      { date: '2026-09-11 18:00', waterLevel: 2.14, temperature: 29.0, turbidity: 22.1, batteryPct: 96, status: 'Matched' },
    ],
  },
};

export const HYDRO_ALERTS: HydroAlert[] = [
  {
    id: 'alt-01',
    waterBodyId: 'chembarambakkam',
    waterBodyName: 'Chembarambakkam Lake',
    category: 'water-decline',
    title: 'Chembarambakkam Lake Surface Area Depleted',
    description: 'Water surface contracted by -24.1% compared with baseline over the past 60 days.',
    severity: 'HIGH',
    riskScore: 78,
    timestamp: '11 Sep 2026',
    passSource: 'Landsat-9 OLI-2',
  },
  {
    id: 'alt-02',
    waterBodyId: 'mettur',
    waterBodyName: 'Mettur Reservoir',
    category: 'risk',
    title: 'Mettur Reservoir Baseline Deviation',
    description: 'Surface extent is -18.0% below historical baseline. 90-day trend shows continuous drop of -15.4%.',
    severity: 'MODERATE',
    riskScore: 62,
    timestamp: '12 Sep 2026',
    passSource: 'Sentinel-2 MSI',
  },
  {
    id: 'alt-03',
    waterBodyId: 'poondi',
    waterBodyName: 'Poondi Reservoir',
    category: 'forecast',
    title: 'Poondi Reservoir Watch Threshold',
    description: 'Poondi Reservoir sits near the 31st percentile of typical pre-monsoon surface retention.',
    severity: 'MODERATE',
    riskScore: 48,
    timestamp: '10 Sep 2026',
    passSource: 'Sentinel-2 MSI',
  },
  {
    id: 'alt-04',
    waterBodyId: 'pulicat',
    waterBodyName: 'Pulicat Lake',
    category: 'risk',
    title: 'Pulicat Tidal Inlet Nominal',
    description: 'Tidal flushing and littoral exchange maintain estuarine surface extent within normal bounds.',
    severity: 'NOTICE',
    riskScore: 27,
    timestamp: '12 Sep 2026',
    passSource: 'Sentinel-2 MSI',
  },
];

export type TrendRange = '7d' | '30d' | '3m' | '1y' | '5y' | 'All';

function buildFullHistoricalSeries(
  id: string,
  currentArea: number,
  historicalMean: number,
  maxArea: number,
  minArea: number
): TrendPoint[] {
  const points: TrendPoint[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  for (let idx = 0; idx < 105; idx++) {
    const year = 2018 + Math.floor(idx / 12);
    const month = (idx % 12) + 1;
    const seasonalWave = Math.sin(((month - 3) / 12) * 2 * Math.PI);
    let trendDrift = 0;
    if (year <= 2020) {
      trendDrift = 0.08 + Math.sin(year) * 0.05;
    } else if (year <= 2023) {
      trendDrift = 0.02 - (year - 2021) * 0.03;
    } else {
      trendDrift = -0.05 - (((year - 2024) * 12 + month) / 33) * 0.18;
    }

    const minEnvelope = Number((minArea + (historicalMean - minArea) * 0.25 + seasonalWave * (historicalMean * 0.05)).toFixed(1));
    const maxEnvelope = Number((maxArea - (maxArea - historicalMean) * 0.15 + seasonalWave * (historicalMean * 0.07)).toFixed(1));
    let simulated = historicalMean * (1 + trendDrift + seasonalWave * 0.16);
    simulated = Math.max(minArea * 1.05, Math.min(maxArea * 0.96, simulated));

    const dateStr = `${year}-${String(month).padStart(2, '0')}`;
    const formattedDate = `${months[month - 1]} ${year}`;
    const precipitationMm = Math.max(12, Math.round(110 + seasonalWave * 85 + trendDrift * 40));
    const surfaceTempC = Number((28.5 - seasonalWave * 3.5 - trendDrift * 2).toFixed(1));

    points.push({
      date: dateStr,
      formattedDate,
      observedExtent: Number(simulated.toFixed(1)),
      historicalMean,
      minEnvelope,
      maxEnvelope,
      precipitationMm,
      surfaceTempC,
    });
  }

  const last = points.length - 1;
  points[last].observedExtent = currentArea;
  if (id === 'mettur') {
    points[last - 1].observedExtent = 99.1;
    points[last - 2].observedExtent = 104.0;
    points[last - 3].observedExtent = 113.9;
    points[last - 12].observedExtent = 117.7;
  } else if (id === 'chembarambakkam') {
    points[last - 1].observedExtent = 15.6;
    points[last - 2].observedExtent = 17.1;
    points[last - 3].observedExtent = 19.5;
  } else if (id === 'poondi') {
    points[last - 1].observedExtent = 5.5;
    points[last - 2].observedExtent = 5.8;
    points[last - 3].observedExtent = 6.0;
  } else if (id === 'pulicat') {
    points[last - 1].observedExtent = 418.0;
    points[last - 2].observedExtent = 431.0;
    points[last - 3].observedExtent = 445.0;
  }

  return points;
}

const HISTORICAL_CACHE: Record<string, TrendPoint[]> = {
  mettur: buildFullHistoricalSeries('mettur', 96.4, 117.5, 148.2, 52.6),
  chembarambakkam: buildFullHistoricalSeries('chembarambakkam', 14.8, 19.5, 24.2, 6.8),
  poondi: buildFullHistoricalSeries('poondi', 5.3, 6.0, 7.8, 2.1),
  pulicat: buildFullHistoricalSeries('pulicat', 412.0, 448.0, 485.0, 340.0),
};

export function getTrendSeries(waterBodyId: string, range: TrendRange): TrendPoint[] {
  const wb = WATER_BODIES[waterBodyId] || WATER_BODIES.mettur;
  const full = HISTORICAL_CACHE[wb.id] || HISTORICAL_CACHE.mettur;

  if (range === '7d') {
    // High-frequency Sentinel-2 / Landsat composite observations over the past 7 days
    const cur = wb.surfaceArea;
    const step = ( cur * Math.abs(wb.change7d) / 100 ) / 3;
    return [
      {
        date: '2026-09-28',
        formattedDate: '28 Sep',
        observedExtent: Number((cur + step * 3).toFixed(2)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 14,
        surfaceTempC: 29.1,
      },
      {
        date: '2026-09-30',
        formattedDate: '30 Sep',
        observedExtent: Number((cur + step * 2).toFixed(2)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 11,
        surfaceTempC: 29.4,
      },
      {
        date: '2026-10-02',
        formattedDate: '02 Oct',
        observedExtent: Number((cur + step).toFixed(2)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 9,
        surfaceTempC: 29.6,
      },
      {
        date: '2026-10-04',
        formattedDate: '04 Oct',
        observedExtent: Number(cur.toFixed(2)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 8,
        surfaceTempC: 29.8,
      },
    ];
  }

  if (range === '30d') {
    const cur = wb.surfaceArea;
    const start30 = Number((cur / (1 + wb.change30d / 100)).toFixed(1));
    const diff = start30 - cur;
    return [
      {
        date: '2026-09-04',
        formattedDate: '04 Sep',
        observedExtent: Number(start30.toFixed(1)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 28,
        surfaceTempC: 28.6,
      },
      {
        date: '2026-09-12',
        formattedDate: '12 Sep',
        observedExtent: Number((cur + diff * 0.72).toFixed(1)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 22,
        surfaceTempC: 28.9,
      },
      {
        date: '2026-09-20',
        formattedDate: '20 Sep',
        observedExtent: Number((cur + diff * 0.45).toFixed(1)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 18,
        surfaceTempC: 29.2,
      },
      {
        date: '2026-09-27',
        formattedDate: '27 Sep',
        observedExtent: Number((cur + diff * 0.21).toFixed(1)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 14,
        surfaceTempC: 29.5,
      },
      {
        date: '2026-10-04',
        formattedDate: '04 Oct',
        observedExtent: Number(cur.toFixed(1)),
        historicalMean: wb.historicalAvg,
        minEnvelope: wb.minHistorical,
        maxEnvelope: wb.maxHistorical,
        precipitationMm: 10,
        surfaceTempC: 29.8,
      },
    ];
  }

  if (range === '3m') {
    return full.slice(-4);
  }
  if (range === '1y') {
    return full.slice(-13);
  }
  if (range === '5y') {
    return full.slice(-61);
  }
  return full;
}

export type ForecastHorizon = '30d' | '60d' | '90d';

export function getForecastData(waterBodyId: string, horizon: ForecastHorizon) {
  const wb = WATER_BODIES[waterBodyId] || WATER_BODIES.mettur;
  const cur = wb.surfaceArea;
  const p30 = wb.forecast30d;
  const p60 = wb.forecast60d;
  const p90 = wb.forecast90d;
  const ci = wb.confidenceInterval;

  const basePoints: ForecastPoint[] = [
    {
      date: '2026-07-01',
      formattedDate: 'Jul 2026',
      observed: Number((cur * 1.14).toFixed(1)),
      isForecast: false,
    },
    {
      date: '2026-08-01',
      formattedDate: 'Aug 2026',
      observed: Number((cur * 1.09).toFixed(1)),
      isForecast: false,
    },
    {
      date: '2026-09-01',
      formattedDate: 'Sep 2026',
      observed: Number((cur * 1.04).toFixed(1)),
      isForecast: false,
    },
    {
      date: '2026-10-04',
      formattedDate: 'Today (04 Oct)',
      observed: cur,
      projected: cur,
      lowerConfidence: cur,
      upperConfidence: cur,
      isForecast: false,
    },
    {
      date: '2026-11-03',
      formattedDate: '+30 Days (Nov)',
      projected: p30,
      lowerConfidence: Number((p30 * 0.96).toFixed(1)),
      upperConfidence: Number((p30 * 1.03).toFixed(1)),
      isForecast: true,
    },
  ];

  if (horizon === '60d' || horizon === '90d') {
    basePoints.push({
      date: '2026-12-03',
      formattedDate: '+60 Days (Dec)',
      projected: p60,
      lowerConfidence: Number((ci[0] * 1.03).toFixed(1)),
      upperConfidence: Number((ci[1] * 0.98).toFixed(1)),
      isForecast: true,
    });
  }

  if (horizon === '90d') {
    basePoints.push({
      date: '2027-01-02',
      formattedDate: '+90 Days (Jan)',
      projected: p90,
      lowerConfidence: ci[0],
      upperConfidence: ci[1],
      isForecast: true,
    });
  }

  const endProjected = horizon === '30d' ? p30 : horizon === '60d' ? p60 : p90;
  const deltaPct = Number((((endProjected - cur) / cur) * 100).toFixed(1));

  return {
    waterBodyId: wb.id,
    horizon,
    modelName: 'LSTM-Prophet-Hybrid v3.2',
    currentArea: cur,
    endProjected,
    deltaPct,
    confidenceInterval95: ci,
    points: basePoints,
    methodologyNotes:
      'Prophet + LSTM hybrid time-series ensemble trained on Sentinel-2 & Landsat optical records (2018–2026) with ERA5 evaporative demand corroboration.',
  };
}

export function parseSensorCsv(csvText: string): {
  readings: SensorReading[];
  errors: string[];
} {
  const readings: SensorReading[] = [];
  const errors: string[] = [];
  const lines = csvText.trim().split(/\r?\n/);

  if (lines.length === 0 || !lines[0].trim()) {
    errors.push('CSV input is empty.');
    return { readings, errors };
  }

  const header = lines[0].toLowerCase();
  if (
    !header.includes('date') ||
    !header.includes('waterlevel') ||
    !header.includes('temperature') ||
    !header.includes('turbidity')
  ) {
    errors.push('Missing required CSV columns: date, waterLevel, temperature, turbidity');
    return { readings, errors };
  }

  const cols = header.split(',').map((c) => c.trim());
  const dIdx = cols.indexOf('date');
  const wIdx = cols.indexOf('waterlevel');
  const tIdx = cols.indexOf('temperature');
  const tuIdx = cols.indexOf('turbidity');

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const parts = lines[i].split(',').map((p) => p.trim());
    const wl = parseFloat(parts[wIdx]);
    const temp = parseFloat(parts[tIdx]);
    const turb = parseFloat(parts[tuIdx]);
    if (isNaN(wl) || isNaN(temp) || isNaN(turb)) {
      errors.push(`Row ${i + 1}: Non-numeric telemetry value encountered.`);
    } else {
      readings.push({
        date: parts[dIdx] || '2026-10-04 06:00',
        waterLevel: wl,
        temperature: temp,
        turbidity: turb,
        batteryPct: 95,
        status: 'Calibrated',
      });
    }
  }

  return { readings, errors };
}

export interface GuidedTourStep {
  step: number;
  title: string;
  navTab: 'overview' | 'analysis' | 'trends' | 'forecast' | 'risk' | 'about';
  description: string;
}

export const GUIDED_TOUR_STEPS: GuidedTourStep[] = [
  {
    step: 1,
    title: 'Choose a Water Body & See Current Status',
    navTab: 'overview',
    description:
      'Start on the Overview screen. Immediately see current surface-water area (km²), percentage change from historical baseline, and current drought-risk status.',
  },
  {
    step: 2,
    title: 'Inspect Satellite Water Extent & Compare Dates',
    navTab: 'analysis',
    description:
      'Explore the interactive Water Extent satellite map and drag the "See the Change" Before/After slider to visually inspect where shoreline water has receded.',
  },
  {
    step: 3,
    title: 'Analyze Historical Water Surface Trends',
    navTab: 'trends',
    description:
      'Review how surface-water area has changed from 2018 to 2026 across 7-day, 30-day, 3-month, 1-year, and 5-year windows.',
  },
  {
    step: 4,
    title: 'Project Future Availability (What’s Next?)',
    navTab: 'forecast',
    description:
      'Examine estimated 30-day, 60-day, and 90-day future surface-water projections alongside the 95% confidence range.',
  },
  {
    step: 5,
    title: 'Evaluate Drought Risk & Plain-Language Guidance',
    navTab: 'risk',
    description:
      'Understand the 0–100 Drought Risk score, plain-language reasons driving the risk level, and recommended monitoring frequency.',
  },
  {
    step: 6,
    title: 'Explore Methodology & Technical Details',
    navTab: 'about',
    description:
      'Review the 4-step satellite-to-insight pipeline, NDWI spectral formulas, CWC ground sensor fusion, and verified data sources.',
  },
];
