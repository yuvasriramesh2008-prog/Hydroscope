import React, { useState } from 'react';
import { MoveHorizontal, Calendar } from 'lucide-react';
import { WaterBody, SATELLITE_ASSETS } from '../data/hydroData';

interface BeforeAfterComparisonProps {
  waterBody: WaterBody;
}

export const BeforeAfterComparison: React.FC<BeforeAfterComparisonProps> = ({ waterBody }) => {
  const [sliderPosition, setSliderPosition] = useState<number>(52);
  const [earlierDateOption, setEarlierDateOption] = useState<'baseline' | '2yr' | '1yr'>('baseline');
  const [imgErrorEarlier, setImgErrorEarlier] = useState<boolean>(false);
  const [imgErrorLatest, setImgErrorLatest] = useState<boolean>(false);

  const datePresets = {
    baseline: {
      label: waterBody.earlierComparisonDate,
      area: waterBody.earlierSurfaceArea,
      scale: 1.0,
    },
    '2yr': {
      label: 'Sep 2024 (2 Years Ago)',
      area: Number((waterBody.historicalAvg * 0.94).toFixed(1)),
      scale: 0.94,
    },
    '1yr': {
      label: 'Sep 2025 (1 Year Ago)',
      area: Number((waterBody.historicalAvg * 0.89).toFixed(1)),
      scale: 0.9,
    },
  };

  const activeEarlier = datePresets[earlierDateOption];
  const areaDiff = Number((waterBody.surfaceArea - activeEarlier.area).toFixed(1));
  const areaDiffPct = Number((((waterBody.surfaceArea - activeEarlier.area) / activeEarlier.area) * 100).toFixed(1));

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">See the Change</h3>
          <p className="text-sm text-slate-600 mt-0.5">
            Where did the water disappear? Drag the slider to compare Earlier vs Latest satellite
            observations.
          </p>
        </div>

        {/* Selectable Earlier Date */}
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-slate-500 shrink-0" />
          <label htmlFor="earlier-date-select" className="text-xs font-medium text-slate-600 whitespace-nowrap">
            Compare against:
          </label>
          <select
            id="earlier-date-select"
            value={earlierDateOption}
            onChange={(e) => setEarlierDateOption(e.target.value as 'baseline' | '2yr' | '1yr')}
            className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-600 cursor-pointer"
          >
            <option value="baseline">{datePresets.baseline.label}</option>
            <option value="2yr">{datePresets['2yr'].label}</option>
            <option value="1yr">{datePresets['1yr'].label}</option>
          </select>
        </div>
      </div>

      {/* Comparison Summary Bar */}
      <div className="px-5 py-3 bg-slate-50 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="flex items-center justify-between sm:justify-start sm:gap-3">
          <span className="text-xs font-medium text-slate-500">Earlier ({activeEarlier.label})</span>
          <span className="font-mono font-semibold tabular-nums text-slate-900">
            {activeEarlier.area.toFixed(1)} km²
          </span>
        </div>
        <div className="flex items-center justify-between sm:justify-start sm:gap-3">
          <span className="text-xs font-medium text-slate-500">
            Latest ({waterBody.lastObservationDate})
          </span>
          <span className="font-mono font-semibold tabular-nums text-sky-800">
            {waterBody.surfaceArea.toFixed(1)} km²
          </span>
        </div>
        <div className="flex items-center justify-between sm:justify-end sm:gap-3">
          <span className="text-xs font-medium text-slate-500">Net Surface Change</span>
          <span
            className={`font-mono font-semibold tabular-nums ${
              areaDiff < 0 ? 'text-amber-800' : 'text-emerald-700'
            }`}
          >
            {areaDiff > 0 ? '+' : ''}
            {areaDiff.toFixed(1)} km² ({areaDiffPct > 0 ? '+' : ''}
            {areaDiffPct}%)
          </span>
        </div>
      </div>

      {/* Interactive Split Slider Viewport */}
      <div className="relative w-full h-[320px] sm:h-[380px] bg-slate-900 overflow-hidden select-none">
        {/* RIGHT / FULL LAYER: LATEST SATELLITE IMAGERY */}
        <div className="absolute inset-0 w-full h-full">
          {!imgErrorLatest ? (
            <img
              src={SATELLITE_ASSETS.current}
              alt={`Latest satellite view of ${waterBody.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImgErrorLatest(true)}
              className="w-full h-full object-cover opacity-85"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950" />
          )}
          <div className="absolute inset-0 bg-slate-950/20" />
          <svg
            viewBox="0 0 1000 650"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
          >
            {/* Dashed Earlier Shoreline to highlight exposed bed */}
            <path
              d={waterBody.baselinePolygon}
              fill="#F59E0B"
              fillOpacity="0.14"
              stroke="#FCD34D"
              strokeWidth="2.5"
              strokeDasharray="8 6"
            />
            {/* Current Receded Water Polygon */}
            <path
              d={waterBody.currentPolygon}
              fill="#0284C7"
              fillOpacity="0.76"
              stroke="#38BDF8"
              strokeWidth="3"
            />
          </svg>

          {/* Latest Badge */}
          <div className="absolute top-3.5 right-3.5 bg-slate-900/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg border border-white/15 text-xs font-medium">
            <span className="text-sky-300 font-semibold">Latest</span> · {waterBody.lastObservationDate} ·{' '}
            <span className="font-mono tabular-nums">{waterBody.surfaceArea.toFixed(1)} km²</span>
          </div>
        </div>

        {/* LEFT / CLIPPED LAYER: EARLIER SATELLITE IMAGERY */}
        <div
          className="absolute inset-0 w-full h-full overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {!imgErrorEarlier ? (
            <img
              src={SATELLITE_ASSETS.baseline}
              alt={`Earlier satellite view of ${waterBody.name}`}
              referrerPolicy="no-referrer"
              onError={() => setImgErrorEarlier(true)}
              className="w-full h-full object-cover opacity-90"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-sky-900 to-slate-900" />
          )}
          <div className="absolute inset-0 bg-slate-950/15" />
          <svg
            viewBox="0 0 1000 650"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
          >
            <g
              style={{
                transform: `translate(500px, 345px) scale(${activeEarlier.scale}) translate(-500px, -345px)`,
              }}
            >
              <path
                d={waterBody.baselinePolygon}
                fill="#0369A1"
                fillOpacity="0.82"
                stroke="#7DD3FC"
                strokeWidth="3"
              />
            </g>
          </svg>

          {/* Earlier Badge */}
          <div className="absolute top-3.5 left-3.5 bg-slate-900/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg border border-white/15 text-xs font-medium">
            <span className="text-emerald-300 font-semibold">Earlier</span> · {activeEarlier.label} ·{' '}
            <span className="font-mono tabular-nums">{activeEarlier.area.toFixed(1)} km²</span>
          </div>
        </div>

        {/* Vertical Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-md pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-900 shadow-lg border border-slate-200 flex items-center justify-center">
            <MoveHorizontal className="w-5 h-5 text-sky-700" />
          </div>
        </div>

        {/* Accessible Range Input Overlay */}
        <input
          type="range"
          min={5}
          max={95}
          value={sliderPosition}
          onChange={(e) => setSliderPosition(Number(e.target.value))}
          aria-label="Compare earlier and latest satellite water extent"
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />
      </div>

      {/* Bottom Visual Explanation */}
      <div className="px-5 py-3.5 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
        <p>
          The amber dashed ring on the <strong className="text-slate-800">Latest</strong> side shows
          where water has receded along the shallow perimeter since{' '}
          <strong className="text-slate-800">{activeEarlier.label}</strong>.
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setSliderPosition(15)}
            className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            Show Latest
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(50)}
            className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            50 / 50 Split
          </button>
          <button
            type="button"
            onClick={() => setSliderPosition(85)}
            className="px-2.5 py-1 rounded border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium cursor-pointer"
          >
            Show Earlier
          </button>
        </div>
      </div>
    </div>
  );
};
