import React, { useState, useMemo } from 'react';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { WaterBody, TrendRange, getTrendSeries } from '../data/hydroData';

interface TrendChartProps {
  waterBody: WaterBody;
  defaultRange?: TrendRange;
}

const RANGE_OPTIONS: { id: TrendRange; label: string }[] = [
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: '3m', label: '3 months' },
  { id: '1y', label: '1 year' },
  { id: '5y', label: '5 years' },
  { id: 'All', label: 'All' },
];

export const TrendChart: React.FC<TrendChartProps> = ({
  waterBody,
  defaultRange = '1y',
}) => {
  const [range, setRange] = useState<TrendRange>(defaultRange);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const series = useMemo(() => getTrendSeries(waterBody.id, range), [waterBody.id, range]);

  const stats = useMemo(() => {
    if (series.length === 0) {
      return {
        current: waterBody.surfaceArea,
        highest: waterBody.maxHistorical,
        highestDate: '—',
        lowest: waterBody.minHistorical,
        lowestDate: '—',
        changeKm2: 0,
        changePct: 0,
      };
    }
    const first = series[0].observedExtent;
    const current = series[series.length - 1].observedExtent;
    let highest = series[0].observedExtent;
    let highestDate = series[0].formattedDate;
    let lowest = series[0].observedExtent;
    let lowestDate = series[0].formattedDate;

    for (const pt of series) {
      if (pt.observedExtent > highest) {
        highest = pt.observedExtent;
        highestDate = pt.formattedDate;
      }
      if (pt.observedExtent < lowest) {
        lowest = pt.observedExtent;
        lowestDate = pt.formattedDate;
      }
    }

    const changeKm2 = Number((current - first).toFixed(1));
    const changePct = Number((((current - first) / first) * 100).toFixed(1));

    return {
      current,
      highest,
      highestDate,
      lowest,
      lowestDate,
      changeKm2,
      changePct,
    };
  }, [series, waterBody]);

  // SVG Chart dimensions
  const width = 760;
  const height = 270;
  const padLeft = 58;
  const padRight = 24;
  const padTop = 24;
  const padBottom = 38;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const yMin = useMemo(() => {
    const minVal = Math.min(stats.lowest, waterBody.historicalAvg);
    return Math.max(0, Number((minVal * 0.86).toFixed(1)));
  }, [stats.lowest, waterBody.historicalAvg]);

  const yMax = useMemo(() => {
    const maxVal = Math.max(stats.highest, waterBody.historicalAvg);
    return Number((maxVal * 1.1).toFixed(1));
  }, [stats.highest, waterBody.historicalAvg]);

  const getX = (idx: number) => {
    if (series.length <= 1) return padLeft + plotW / 2;
    return padLeft + (idx / (series.length - 1)) * plotW;
  };

  const getY = (val: number) => {
    if (yMax === yMin) return padTop + plotH / 2;
    return padTop + plotH - ((val - yMin) / (yMax - yMin)) * plotH;
  };

  const linePath = useMemo(() => {
    return series
      .map((pt, i) => `${i === 0 ? 'M' : 'L'} ${getX(i).toFixed(1)} ${getY(pt.observedExtent).toFixed(1)}`)
      .join(' ');
  }, [series, yMin, yMax]);

  const areaPath = useMemo(() => {
    if (series.length === 0) return '';
    return `${linePath} L ${getX(series.length - 1).toFixed(1)} ${(padTop + plotH).toFixed(1)} L ${getX(0).toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`;
  }, [linePath, series.length]);

  const baselineY = getY(waterBody.historicalAvg);

  const yTicks = useMemo(() => {
    const step = (yMax - yMin) / 4;
    return [0, 1, 2, 3, 4].map((i) => Number((yMin + step * i).toFixed(1)));
  }, [yMin, yMax]);

  const xLabelIndices = useMemo(() => {
    if (series.length <= 6) return series.map((_, i) => i);
    const count = 6;
    const indices: number[] = [];
    for (let i = 0; i < count; i++) {
      indices.push(Math.round((i / (count - 1)) * (series.length - 1)));
    }
    return Array.from(new Set(indices));
  }, [series]);

  const activePoint = hoverIndex !== null && series[hoverIndex] ? series[hoverIndex] : series[series.length - 1];
  const activePointIndex = hoverIndex !== null && series[hoverIndex] ? hoverIndex : series.length - 1;

  // Automatic plain-language explanation
  const explanationText = useMemo(() => {
    if (stats.changePct <= -3) {
      return `Water area has generally decreased over the selected period (${stats.changePct}% change, or ${stats.changeKm2} km²), remaining below the historical baseline of ${waterBody.historicalAvg.toFixed(1)} km².`;
    }
    if (stats.changePct >= 3) {
      return `Water area has generally increased over the selected period (+${stats.changePct}% change, or +${stats.changeKm2} km²).`;
    }
    return `Water area has remained relatively stable over the selected period (${stats.changePct > 0 ? '+' : ''}${stats.changePct}% change), tracking near ${stats.current.toFixed(1)} km².`;
  }, [stats, waterBody.historicalAvg]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-5">
      {/* Header & Range Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">
              Water Surface Trend
            </h3>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs font-medium text-slate-500">Water Area Over Time</span>
          </div>
          <p className="text-sm text-slate-600 mt-0.5">
            How the water area has changed over time ({waterBody.shortName})
          </p>
        </div>

        {/* Time range selector */}
        <div
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80 self-start lg:self-auto"
          role="group"
          aria-label="Select historical time period"
        >
          {RANGE_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                setRange(opt.id);
                setHoverIndex(null);
              }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                range === opt.id
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Key Highlight Metrics: Current, Highest, Lowest, Period Change */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 block">Current Value</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-mono font-semibold tabular-nums text-slate-900">
              {stats.current.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-500">km²</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Latest satellite observation
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 block">Highest Value</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-mono font-semibold tabular-nums text-sky-800">
              {stats.highest.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-500">km²</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Recorded {stats.highestDate}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 block">Lowest Value</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span className="text-xl font-mono font-semibold tabular-nums text-slate-800">
              {stats.lowest.toFixed(1)}
            </span>
            <span className="text-xs font-mono text-slate-500">km²</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Recorded {stats.lowestDate}
          </span>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/80">
          <span className="text-xs text-slate-500 block">Period Change</span>
          <div className="mt-1 flex items-baseline gap-1.5">
            <span
              className={`text-xl font-mono font-semibold tabular-nums ${
                stats.changePct < 0 ? 'text-amber-800' : 'text-emerald-700'
              }`}
            >
              {stats.changePct > 0 ? '+' : ''}
              {stats.changePct.toFixed(1)}%
            </span>
            <span className="text-xs font-mono text-slate-500">
              ({stats.changeKm2 > 0 ? '+' : ''}
              {stats.changeKm2.toFixed(1)} km²)
            </span>
          </div>
          <span className="text-[11px] text-slate-500 mt-0.5 block">
            Baseline avg: {waterBody.historicalAvg.toFixed(1)} km²
          </span>
        </div>
      </div>

      {/* Line Chart Area (Horizontally scrollable on small screens if needed) */}
      <div className="w-full overflow-x-auto">
        <div className="min-w-[540px]">
          {/* Legend & Hovered Point Readout */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2 text-xs text-slate-600">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-1 rounded-full bg-sky-600 inline-block" />
                <span>Surface Water Area (km²)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-0.5 border-t-2 border-dashed border-amber-600 inline-block" />
                <span>Historical Baseline ({waterBody.historicalAvg.toFixed(1)} km²)</span>
              </div>
            </div>
            {activePoint && (
              <div className="font-mono text-xs bg-slate-100 px-2.5 py-1 rounded border border-slate-200 text-slate-800">
                <span>{activePoint.formattedDate}: </span>
                <strong className="text-sky-900">{activePoint.observedExtent.toFixed(1)} km²</strong>
              </div>
            )}
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto overflow-visible select-none"
            role="img"
            aria-label={`Line chart of surface water area over ${range} for ${waterBody.name}`}
          >
            <defs>
              <linearGradient id="trendAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0284C7" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#0284C7" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid Lines & Y-Axis Labels */}
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

            {/* Historical Baseline Reference Line */}
            {baselineY >= padTop && baselineY <= padTop + plotH && (
              <g>
                <line
                  x1={padLeft}
                  y1={baselineY}
                  x2={width - padRight}
                  y2={baselineY}
                  stroke="#D97706"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                />
                <text
                  x={width - padRight - 4}
                  y={baselineY - 6}
                  textAnchor="end"
                  className="fill-amber-800 text-[10px] font-mono font-medium"
                >
                  Baseline {waterBody.historicalAvg.toFixed(1)} km²
                </text>
              </g>
            )}

            {/* Area Fill & Observed Line */}
            <path d={areaPath} fill="url(#trendAreaFill)" />
            <path
              d={linePath}
              fill="none"
              stroke="#0284C7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* X-Axis Labels */}
            {xLabelIndices.map((idx) => {
              const pt = series[idx];
              if (!pt) return null;
              const x = getX(idx);
              return (
                <text
                  key={idx}
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  className="fill-slate-500 text-[11px] font-mono"
                >
                  {pt.formattedDate}
                </text>
              );
            })}

            {/* Active / Hovered Point Crosshair & Marker */}
            {activePoint && (
              <g>
                <line
                  x1={getX(activePointIndex)}
                  y1={padTop}
                  x2={getX(activePointIndex)}
                  y2={padTop + plotH}
                  stroke="#94A3B8"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={getX(activePointIndex)}
                  cy={getY(activePoint.observedExtent)}
                  r="5.5"
                  fill="#0284C7"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                />
              </g>
            )}

            {/* Invisible Interactive Hover Columns */}
            {series.map((pt, i) => {
              const colWidth = plotW / Math.max(1, series.length);
              const xStart = getX(i) - colWidth / 2;
              return (
                <rect
                  key={pt.date + i}
                  x={Math.max(padLeft, xStart)}
                  y={padTop}
                  width={colWidth}
                  height={plotH}
                  fill="transparent"
                  className="cursor-crosshair"
                  onMouseEnter={() => setHoverIndex(i)}
                  onClick={() => setHoverIndex(i)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Plain-Language Automatically Generated Explanation */}
      <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-3">
        {stats.changePct <= -3 ? (
          <TrendingDown className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        ) : stats.changePct >= 3 ? (
          <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
        ) : (
          <Minus className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        )}
        <p className="text-sm text-slate-700 leading-relaxed">{explanationText}</p>
      </div>
    </div>
  );
};
