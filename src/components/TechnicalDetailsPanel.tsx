import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Database,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sliders,
} from 'lucide-react';
import {
  WaterBody,
  WATER_BODIES,
  SENSOR_STATIONS,
  parseSensorCsv,
  SensorReading,
} from '../data/hydroData';

interface TechnicalDetailsPanelProps {
  waterBody: WaterBody;
  onSelectWaterBody?: (id: string) => void;
  defaultExpanded?: boolean;
}

export const TechnicalDetailsPanel: React.FC<TechnicalDetailsPanelProps> = ({
  waterBody,
  onSelectWaterBody,
  defaultExpanded = false,
}) => {
  const [isTechOpen, setIsTechOpen] = useState<boolean>(defaultExpanded);
  const [isSensorsOpen, setIsSensorsOpen] = useState<boolean>(false);
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false);
  const [csvText, setCsvText] = useState<string>(
    'date,waterLevel,temperature,turbidity\n2026-10-04 06:00,7.78,26.5,14.1\n2026-10-03 18:00,7.80,26.3,14.0'
  );
  const [customReadings, setCustomReadings] = useState<SensorReading[]>([]);
  const [csvErrors, setCsvErrors] = useState<string[]>([]);
  const [csvSuccessMsg, setCsvSuccessMsg] = useState<string>('');

  const station = SENSOR_STATIONS[waterBody.id] || SENSOR_STATIONS.mettur;
  const allReadings = [...customReadings, ...station.readings];
  const allWaterBodies = Object.values(WATER_BODIES);

  const handleParseCsv = () => {
    const result = parseSensorCsv(csvText);
    setCsvErrors(result.errors);
    if (result.readings.length > 0) {
      setCustomReadings(result.readings);
      setCsvSuccessMsg(
        `Ingested ${result.readings.length} calibrated ground-sensor readings for ${waterBody.shortName}.`
      );
    } else {
      setCsvSuccessMsg('');
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Expandable Technical Details Accordion */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsTechOpen((prev) => !prev)}
          aria-expanded={isTechOpen}
          className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Sliders className="w-4 h-4 text-sky-700 shrink-0" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Technical Details & Advanced Analysis
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                NDWI spectral index, satellite acquisition parameters, area calculation, and model
                specifications
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-sky-700 shrink-0">
            <span>{isTechOpen ? 'Hide details' : 'Show details'}</span>
            {isTechOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isTechOpen && (
          <div className="px-5 pb-5 pt-2 border-t border-slate-200 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">NDWI Spectral Index</span>
                <span className="text-base font-mono font-semibold text-slate-900 mt-1 block">
                  {waterBody.hydroIndex}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Formula: (Green B03 − NIR B08) / (Green B03 + NIR B08)
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">Satellite Source</span>
                <span className="text-base font-semibold text-slate-900 mt-1 block">
                  {waterBody.sensorFleet}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Level-2A BOA Reflectance · {waterBody.elevation}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">
                  Acquisition Date & Cloud Cover
                </span>
                <span className="text-base font-mono font-semibold text-slate-900 mt-1 block">
                  {waterBody.lastObservationDate} · {waterBody.cloudCoveragePct}% Cloud
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Cloud mask filtered via s2cloudless
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">Analysis Period</span>
                <span className="text-base font-mono font-semibold text-slate-900 mt-1 block">
                  Jan 2018 – Oct 2026
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  105 monthly composites · 5-day revisit cycle
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">Water-Area Calculation</span>
                <span className="text-base font-mono font-semibold text-slate-900 mt-1 block">
                  {waterBody.surfaceArea.toFixed(1)} km² ({waterBody.perimeterLength} km perimeter)
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Classified water pixels × 100 m² unit cell area
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">Forecasting Model Used</span>
                <span className="text-base font-semibold text-slate-900 mt-1 block">
                  Prophet + LSTM Hybrid v3.2
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Trained on 8-year optical series & ERA5 climate variables
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">Basin & Reference Capacity</span>
                <span className="text-base font-mono font-semibold text-slate-900 mt-1 block">
                  {waterBody.basinCode}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Design capacity: {waterBody.maxCapacity}
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
                <span className="text-xs text-slate-500 block">Confidence & Limitations</span>
                <span className="text-base font-mono font-semibold text-slate-900 mt-1 block">
                  95% CI: {waterBody.confidenceInterval[0]}–{waterBody.confidenceInterval[1]} km²
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Measures 2D surface area only, not direct water depth
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. Expandable In-Situ Ground Sensor Complement & CSV Ingestion */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsSensorsOpen((prev) => !prev)}
          aria-expanded={isSensorsOpen}
          className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Database className="w-4 h-4 text-teal-700 shrink-0" />
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                Complementary Ground Sensor Telemetry ({station.stationId})
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Optional point-gauge water level, temperature, turbidity, and CSV data ingestion
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-sky-700 shrink-0">
            <span>{isSensorsOpen ? 'Hide telemetry' : 'View telemetry'}</span>
            {isSensorsOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isSensorsOpen && (
          <div className="px-5 pb-5 pt-2 border-t border-slate-200 space-y-4">
            <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Why combine satellite + ground sensors?</strong>{' '}
              Satellite imagery measures the horizontal surface-water area ({waterBody.surfaceArea.toFixed(1)} km²) across the entire basin, while in-situ CWC gauge stations record point water level ({station.gaugeDepth} m), water temperature ({station.waterTemp} °C), and turbidity ({station.turbidity} NTU) at a single location.
            </div>

            {/* Readings Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="py-2.5 px-3.5">Timestamp</th>
                    <th className="py-2.5 px-3.5 text-right">Point Gauge Level (m)</th>
                    <th className="py-2.5 px-3.5 text-right">Water Temp (°C)</th>
                    <th className="py-2.5 px-3.5 text-right">Turbidity (NTU)</th>
                    <th className="py-2.5 px-3.5">Calibration Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allReadings.map((r, idx) => (
                    <tr key={r.date + idx} className="hover:bg-slate-50/80">
                      <td className="py-2.5 px-3.5 font-mono text-slate-800">{r.date}</td>
                      <td className="py-2.5 px-3.5 text-right font-mono tabular-nums text-slate-900 font-medium">
                        {r.waterLevel.toFixed(2)} m
                      </td>
                      <td className="py-2.5 px-3.5 text-right font-mono tabular-nums text-slate-700">
                        {r.temperature.toFixed(1)} °C
                      </td>
                      <td className="py-2.5 px-3.5 text-right font-mono tabular-nums text-slate-700">
                        {r.turbidity.toFixed(1)} NTU
                      </td>
                      <td className="py-2.5 px-3.5 text-emerald-700 font-medium">{r.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* CSV Telemetry Ingestion Tool */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="csv-telemetry-input"
                  className="text-xs font-semibold text-slate-800 flex items-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5 text-sky-700" />
                  <span>Validate & Import Ground Telemetry CSV</span>
                </label>
                <span className="text-[11px] font-mono text-slate-500">
                  Columns: date, waterLevel, temperature, turbidity
                </span>
              </div>
              <textarea
                id="csv-telemetry-input"
                rows={3}
                value={csvText}
                onChange={(e) => setCsvText(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-200 bg-white font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleParseCsv}
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Validate & Add Readings
                </button>
                {csvSuccessMsg && (
                  <span className="text-xs text-emerald-700 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    {csvSuccessMsg}
                  </span>
                )}
                {csvErrors.length > 0 && (
                  <span className="text-xs text-red-700 font-medium flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    {csvErrors[0]}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Expandable Regional Multi-Water-Body Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <button
          type="button"
          onClick={() => setIsCompareOpen((prev) => !prev)}
          aria-expanded={isCompareOpen}
          className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <div>
            <h3 className="text-base font-semibold text-slate-900">
              Compare All Monitored Water Bodies
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Side-by-side surface area, baseline change, and drought-risk status across monitored
              basins
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium text-sky-700 shrink-0">
            <span>{isCompareOpen ? 'Hide table' : 'Compare basins'}</span>
            {isCompareOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </button>

        {isCompareOpen && (
          <div className="px-5 pb-5 pt-2 border-t border-slate-200">
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold text-xs">
                    <th className="py-3 px-4">Water Body</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4 text-right">Current Area</th>
                    <th className="py-3 px-4 text-right">Baseline Avg</th>
                    <th className="py-3 px-4 text-right">Change</th>
                    <th className="py-3 px-4">Drought Risk</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {allWaterBodies.map((wb) => {
                    const isSelected = wb.id === waterBody.id;
                    return (
                      <tr
                        key={wb.id}
                        className={isSelected ? 'bg-sky-50/70' : 'hover:bg-slate-50'}
                      >
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {wb.shortName}
                          <span className="block text-xs font-normal text-slate-500">
                            {wb.district}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-600 text-xs">{wb.type}</td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums font-semibold text-slate-900">
                          {wb.surfaceArea.toFixed(1)} km²
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-slate-600">
                          {wb.historicalAvg.toFixed(1)} km²
                        </td>
                        <td
                          className={`py-3 px-4 text-right font-mono tabular-nums font-semibold ${
                            wb.netAnomaly <= -15
                              ? 'text-amber-800'
                              : wb.netAnomaly < 0
                              ? 'text-slate-700'
                              : 'text-emerald-700'
                          }`}
                        >
                          {wb.netAnomaly > 0 ? '+' : ''}
                          {wb.netAnomaly.toFixed(1)}%
                        </td>
                        <td className="py-3 px-4 text-xs font-medium">
                          {wb.riskTier === 'LOW' && (
                            <span className="text-emerald-800">● Healthy ({wb.riskScore}/100)</span>
                          )}
                          {wb.riskTier === 'MODERATE' && (
                            <span className="text-amber-800">● Moderate ({wb.riskScore}/100)</span>
                          )}
                          {wb.riskTier === 'HIGH' && (
                            <span className="text-red-800">● High ({wb.riskScore}/100)</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {onSelectWaterBody && (
                            <button
                              type="button"
                              onClick={() => onSelectWaterBody(wb.id)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                                isSelected
                                  ? 'bg-sky-700 text-white'
                                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                              }`}
                            >
                              {isSelected ? 'Selected' : 'Analyze'}
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 4. Trustworthy Data Sources Section (Section 12) */}
      <div className="bg-white border border-slate-200 rounded-xl p-5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Data Sources & Methodology Verification
        </h3>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="text-xs text-slate-500 block">Satellite Imagery</span>
            <p className="font-semibold text-slate-900 mt-0.5">Sentinel-2 MSI & Landsat-9 OLI</p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Optical Level-2A surface reflectance composites at 10m–30m spatial resolution.
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="text-xs text-slate-500 block">Surface-Water Analysis</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              NDWI Spectral Water Classification
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Normalized Difference Water Index delineating visible surface-water area in km².
            </p>
          </div>

          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70">
            <span className="text-xs text-slate-500 block">Forecasting & Risk Model</span>
            <p className="font-semibold text-slate-900 mt-0.5">
              Prophet-LSTM Hybrid & 4-Factor DRI
            </p>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Time-series trajectory projection and weighted drought-risk index (0–100 scale).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
