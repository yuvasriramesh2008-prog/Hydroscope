import React, { useState, useMemo } from 'react';
import { CalendarClock, Info } from 'lucide-react';
import { WaterBody, ForecastHorizon, getForecastData } from '../data/hydroData';

interface ForecastChartProps {
  waterBody: WaterBody;
  defaultHorizon?: ForecastHorizon;
}

const HORIZON_OPTIONS: { id: ForecastHorizon; label: string }[] = [
  { id: '30d', label: '30 days' },
  { id: '60d', label: '60 days' },
  { id: '90d', label: '90 days' },
];

export const ForecastChart: React.FC<ForecastChartProps> = ({
  waterBody,
  defaultHorizon = '90d',
}) => {
  const [horizon, setHorizon] = useState<ForecastHorizon>(defaultHorizon);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const forecast = useMemo(
    () => getForecastData(waterBody.id, horizon),
    [waterBody.id, horizon]
  );

  const points = forecast.points;
  const todayIndex = points.findIndex((p) => p.observed !== undefined && p.projected !== undefined);

  // SVG dimensions
  const width = 760;
  const height = 270;
  const padLeft = 58;
  const padRight = 28;
  const padTop = 26;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const { yMin, yMax } = useMemo(() => {
    const vals: number[] = [];
    for (const p of points) {
      if (p.observed !== undefined) vals.push(p.observed);
      if (p.projected !== undefined) vals.push(p.projected);
      if (p.lowerConfidence !== undefined) vals.push(p.lowerConfidence);
      if (p.upperConfidence !== undefined) vals.push(p.upperConfidence);
    }
    const minV = Math.min(...vals, waterBody.surfaceArea * 0.8);
    const maxV = Math.max(...vals, waterBody.surfaceArea * 1.18);
    return {
      yMin: Math.max(0, Number((minV * 0.9).toFixed(1))),
      yMax: Number((maxV * 1.08).toFixed(1)),
    };
  }, [points, waterBody.surfaceArea]);

  const getX = (idx: number) => {
    if (points.length <= 1) return padLeft + plotW / 2;
    return padLeft + (idx / (points.length - 1)) * plotW;
  };

  const getY = (val: number) => {
    if (yMax === yMin) return padTop + plotH / 2;
    return padTop + plotH - ((val - yMin) / (yMax - yMin)) * plotH;
  };

  // Observed path
  const observedPath = useMemo(() => {
    const obs = points
      .map((p, idx) => ({ p, idx }))
      .filter((item) => item.p.observed !== undefined);
    return obs
      .map(
        (item, i) =>
          `${i === 0 ? 'M' : 'L'} ${getX(item.idx).toFixed(1)} ${getY(item.p.observed!).toFixed(1)}`
      )
      .join(' ');
  }, [points, yMin, yMax]);

  // Projected path
  const projectedPath = useMemo(() => {
    const proj = points
      .map((p, idx) => ({ p, idx }))
      .filter((item) => item.p.projected !== undefined);
    return proj
      .map(
        (item, i) =>
          `${i === 0 ? 'M' : 'L'} ${getX(item.idx).toFixed(1)} ${getY(item.p.projected!).toFixed(1)}`
      )
      .join(' ');
  }, [points, yMin, yMax]);

  // Confidence band polygon
  const confidencePolygon = useMemo(() => {
    const proj = points
      .map((p, idx) => ({ p, idx }))
      .filter(
        (item) =>
          item.p.lowerConfidence !== undefined && item.p.upperConfidence !== undefined
      );
    if (proj.length < 2) return '';
    const upper = proj
      .map((item, i) => `${i === 0 ? 'M' : 'L'} ${getX(item.idx).toFixed(1)} ${getY(item.p.upperConfidence!).toFixed(1)}`)
      .join(' ');
    const lower = [...proj]
      .reverse()
      .map((item) => `L ${getX(item.idx).toFixed(1)} ${getY(item.p.lowerConfidence!).toFixed(1)}`)
      .join(' ');
    return `${upper} ${lower} Z`;
  }, [points, yMin, yMax]);

  const yTicks = useMemo(() => {
    const step = (yMax - yMin) / 4;
    return [0, 1, 2, 3, 4].map((i) => Number((yMin + step * i).toFixed(1)));
  }, [yMin, yMax]);

  const plainSummary = useMemo(() => {
    if (forecast.deltaPct <= -4) {
      return `Forecast indicates a continued decline in surface-water area. Based on historical patterns, surface water is projected to reach an estimated ${forecast.endProjected.toFixed(1)} km² (${forecast.deltaPct}% from current) over the next ${horizon.replace('d', ' days')}.`;
    }
    if (forecast.deltaPct >= 4) {
      return `Forecast indicates a projected recovery in surface-water area based on historical seasonal patterns, reaching an estimated ${forecast.endProjected.toFixed(1)} km² (+${forecast.deltaPct}%).`;
    }
    return `Forecast indicates relatively stable water conditions over the next ${horizon.replace('d', ' days')}, with surface area estimated near ${forecast.endProjected.toFixed(1)} km² (${forecast.deltaPct > 0 ? '+' : ''}${forecast.deltaPct}% based on historical patterns).`;
  }, [forecast, horizon]);

  const activePoint = hoverIdx !== null && points[hoverIdx] ? points[hoverIdx] : points[points.length - 1];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      {/* Header & Horizon Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">What’s Next?</h3>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">Expected Water Trend</span>
          </div>
          <p className="text-sm text-slate-600 mt-0.5">
            Estimated future water-surface trend based on historical observations
          </p>
        </div>

        {/* Horizon buttons */}
        <div
          className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80 self-start lg:self-auto"
          role="group"
          aria-label="Select forecast horizon"
        >
          {HORIZON_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setHorizon(opt.id);
                setHoverIdx(null);
              }}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                horizon === opt.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 block">Current Observed Area</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-mono font-semibold tabular-nums text-slate-900">
              {forecast.currentArea.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-500">km²</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Measured on {waterBody.lastObservationDate}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 block">
            Projected Area ({horizon.replace('d', ' Days')})
          </span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-mono font-semibold tabular-nums text-sky-800">
              {forecast.endProjected.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-500">km²</span>
            <span
              className={`text-xs font-mono font-semibold ml-1 ${
                forecast.deltaPct < 0 ? 'text-amber-800' : 'text-emerald-700'
              }`}
            >
              ({forecast.deltaPct > 0 ? '+' : ''}
              {forecast.deltaPct}%)
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Estimated from historical trajectory
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 block">Estimated Range (95% Confidence)</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-mono font-semibold tabular-nums text-slate-800">
              {forecast.confidenceInterval95[0].toFixed(1)} –{' '}
              {forecast.confidenceInterval95[1].toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-500">km²</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Lower to upper seasonal bound
          </span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[540px]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-slate-600">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 rounded-full bg-slate-800 inline-block" />
                <span>Historical Data (Observed)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-0.5 border-t-2 border-dashed border-sky-600 inline-block" />
                <span>Projected Forecast</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-2.5 rounded-xs bg-sky-500/20 border border-sky-300 inline-block" />
                <span>Estimated Confidence Corridor</span>
              </div>
            </div>

            {activePoint && (
              <div className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                <span>{activePoint.formattedDate}: </span>
                <strong className="text-sky-900">
                  {(activePoint.projected ?? activePoint.observed ?? 0).toFixed(1)} km²
                </strong>
                {activePoint.isForecast ? ' (Projected)' : ' (Observed)'}
              </div>
            )}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible select-none"
            role="img"
            aria-label={`Historical and projected surface-water trend over ${horizon}`}
          >
            {/* Horizontal Grid Lines */}
            {yTicks.map((tick) => {
              const y = getY(tick);
              return (
                <g key={tick}>
                  <line
                    x1={padLeft}
                    y1={y}
                    x2={width - padRight}
                    y2={y}
                    stroke="#E2E8F0"
                    strokeWidth="1"
                  />
                  <text
                    x={padLeft - 10}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-slate-500 text-[11px] font-mono"
                  >
                    {tick.toFixed(0)} km²
                  </text>
                </g>
              );
            })}

            {/* Shaded Forecast Zone Background */}
            {todayIndex >= 0 && (
              <rect
                x={getX(todayIndex)}
                y={padTop}
                width={width - padRight - getX(todayIndex)}
                height={plotH}
                fill="#F0F9FF"
                fillOpacity="0.65"
              />
            )}

            {/* 95% Confidence Corridor */}
            {confidencePolygon && (
              <path
                d={confidencePolygon}
                fill="#0284C7"
                fillOpacity="0.15"
                stroke="#7DD3FC"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
            )}

            {/* Vertical "Today" Divider */}
            {todayIndex >= 0 && (
              <g>
                <line
                  x1={getX(todayIndex)}
                  y1={padTop}
                  x2={getX(todayIndex)}
                  y2={padTop + plotH}
                  stroke="#64748B"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <text
                  x={getX(todayIndex)}
                  y={padTop - 8}
                  textAnchor="middle"
                  className="fill-slate-700 text-[10px] font-mono font-semibold"
                >
                  Latest Observation → Forecast
                </text>
              </g>
            )}

            {/* Observed Solid Line */}
            <path
              d={observedPath}
              fill="none"
              stroke="#0F172A"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Projected Dashed Line */}
            <path
              d={projectedPath}
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeDasharray="6 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Points & X-Axis Labels */}
            {points.map((pt, i) => {
              const x = getX(i);
              const val = pt.isForecast ? pt.projected! : pt.observed!;
              const y = getY(val);
              return (
                <g
                  key={pt.date}
                  className="cursor-pointer"
                  onMouseEnter={() => setHoverIdx(i)}
                  onClick={() => setHoverIdx(i)}
                >
                  <circle
                    cx={x}
                    cy={y}
                    r={hoverIdx === i ? 6 : 4.5}
                    fill={pt.isForecast ? '#0284C7' : '#0F172A'}
                    stroke="#FFFFFF"
                    strokeWidth="2"
                  />
                  <text
                    x={x}
                    y={height - 10}
                    textAnchor="middle"
                    className="fill-slate-500 text-[11px] font-mono"
                  >
                    {pt.formattedDate}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Plain-Language Summary & Scientific Uncertainty Note */}
      <div className="p-4 rounded-lg bg-sky-50/70 border border-sky-200/80 space-y-2">
        <div className="flex items-start gap-2.5">
          <CalendarClock className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
          <p className="text-sm font-medium text-slate-900 leading-relaxed">{plainSummary}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 pl-7">
          <Info className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span>
            Note: Values are <strong>estimated projections</strong> based on historical satellite
            patterns and seasonal climate trends, not deterministic guarantees.
          </span>
        </div>
      </div>
    </div>
  );
};
