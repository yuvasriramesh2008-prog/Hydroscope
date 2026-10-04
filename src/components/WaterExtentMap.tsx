import React, { useState, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layers,
  Info,
  Play,
  Pause,
  MapPin,
  X,
  ArrowRight,
} from 'lucide-react';
import { WaterBody, SATELLITE_ASSETS } from '../data/hydroData';

interface WaterExtentMapProps {
  waterBody: WaterBody;
  onCompareClick?: () => void;
  compact?: boolean;
}

type MapLayerMode = 'satellite' | 'ndwi' | 'terrain';

export const WaterExtentMap: React.FC<WaterExtentMapProps> = ({
  waterBody,
  onCompareClick,
  compact = false,
}) => {
  const [layerMode, setLayerMode] = useState<MapLayerMode>('satellite');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showInfoPopover, setShowInfoPopover] = useState<boolean>(false);
  const [showBoundary, setShowBoundary] = useState<boolean>(true);
  const [timeStepIndex, setTimeStepIndex] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const timeSteps = [
    {
      label: '2018',
      area: Number((waterBody.historicalAvg * 1.11).toFixed(1)),
      scale: 1.04,
      delta: '+11.0%',
    },
    {
      label: '2020',
      area: Number((waterBody.historicalAvg * 1.05).toFixed(1)),
      scale: 1.01,
      delta: '+5.0%',
    },
    {
      label: '2022',
      area: Number((waterBody.historicalAvg * 0.98).toFixed(1)),
      scale: 0.96,
      delta: '-2.0%',
    },
    {
      label: '2024',
      area: Number((waterBody.historicalAvg * 0.9).toFixed(1)),
      scale: 0.91,
      delta: '-10.0%',
    },
    {
      label: 'Latest (2026)',
      area: waterBody.surfaceArea,
      scale: 0.85,
      delta: `${waterBody.netAnomaly > 0 ? '+' : ''}${waterBody.netAnomaly.toFixed(1)}%`,
    },
  ];

  useEffect(() => {
    setTimeStepIndex(4);
    setIsPlaying(false);
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [waterBody.id]);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setTimeStepIndex((prev) => (prev >= timeSteps.length - 1 ? 0 : prev + 1));
    }, 1600);
    return () => clearInterval(timer);
  }, [isPlaying, timeSteps.length]);

  const activeStep = timeSteps[timeStepIndex] || timeSteps[4];

  const handleZoomIn = () => setZoom((z) => Math.min(2.2, Number((z + 0.25).toFixed(2))));
  const handleZoomOut = () => {
    setZoom((z) => {
      const next = Math.max(1, Number((z - 0.25).toFixed(2)));
      if (next === 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setTimeStepIndex(4);
    setIsPlaying(false);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const maxOffset = (zoom - 1) * 180;
    const nx = Math.max(-maxOffset, Math.min(maxOffset, e.clientX - dragStart.x));
    const ny = Math.max(-maxOffset, Math.min(maxOffset, e.clientY - dragStart.y));
    setPan({ x: nx, y: ny });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const backgroundAsset =
    layerMode === 'ndwi'
      ? SATELLITE_ASSETS.ndwi
      : timeStepIndex <= 1
      ? SATELLITE_ASSETS.baseline
      : SATELLITE_ASSETS.current;

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
      {/* Header Bar */}
      <div className="px-5 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-lg font-semibold text-slate-900 tracking-tight">Water Extent</h2>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs font-mono text-slate-600">{waterBody.shortName}</span>
          </div>
          <p className="text-sm text-slate-600 mt-0.5">
            Current surface-water area detected from satellite imagery
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Layer selector */}
          <div
            className="inline-flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200/80"
            role="group"
            aria-label="Map layer view"
          >
            <button
              type="button"
              onClick={() => setLayerMode('satellite')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                layerMode === 'satellite'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Satellite
            </button>
            <button
              type="button"
              onClick={() => setLayerMode('ndwi')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                layerMode === 'ndwi'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Water Mask
            </button>
            <button
              type="button"
              onClick={() => setLayerMode('terrain')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap cursor-pointer ${
                layerMode === 'terrain'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Terrain
            </button>
          </div>

          {/* "What does this show?" info button */}
          <button
            type="button"
            onClick={() => setShowInfoPopover((prev) => !prev)}
            aria-expanded={showInfoPopover}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-700 transition-colors whitespace-nowrap cursor-pointer min-h-[38px]"
          >
            <Info className="w-3.5 h-3.5 text-sky-700 shrink-0" />
            <span>What does this show?</span>
          </button>
        </div>
      </div>

      {/* Expandable "What does this show?" banner */}
      {showInfoPopover && (
        <div
          role="region"
          aria-label="Explanation of surface-water detection"
          className="px-5 py-3.5 bg-sky-50/90 border-b border-sky-200 flex items-start justify-between gap-4 text-sm text-slate-800"
        >
          <div className="space-y-1 max-w-3xl">
            <p className="font-semibold text-sky-950">Surface-Water Area Detection</p>
            <p className="text-slate-700 leading-relaxed">
              HydroScope uses satellite imagery to identify the visible surface area of water. It
              does not directly measure water depth. Changes in surface area show where shorelines
              have expanded or receded compared with the historical baseline.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowInfoPopover(false)}
            aria-label="Close explanation"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-sky-100 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Interactive Map Stage */}
      <div
        className={`relative w-full ${
          compact ? 'h-[340px] sm:h-[400px]' : 'h-[380px] sm:h-[460px]'
        } bg-slate-900 overflow-hidden select-none ${
          zoom > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-crosshair'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Transformable Viewport Canvas */}
        <div
          className="w-full h-full transition-transform duration-150 ease-out relative"
          style={{
            transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
        >
          {/* Base Satellite / Terrain Layer with Resilient Fallback */}
          {layerMode !== 'terrain' && !imgError ? (
            <img
              src={backgroundAsset}
              alt={`${waterBody.name} satellite observation`}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover transition-opacity duration-200 ${
                layerMode === 'ndwi' ? 'opacity-90 contrast-110' : 'opacity-85'
              }`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-800 via-slate-900 to-sky-950" />
          )}

          {/* Subtle Cartographic Scrim & Coordinate Grid */}
          <div
            className={`absolute inset-0 ${
              layerMode === 'terrain'
                ? 'bg-gradient-to-br from-[#E2E8F0] via-[#F1F5F9] to-[#E0F2FE]'
                : 'bg-slate-950/25'
            }`}
          />

          {/* SVG Vector Overlay for Land, Baseline Boundary, Detected Water Area & Selected Location */}
          <svg
            viewBox="0 0 1000 650"
            preserveAspectRatio="xMidYMid slice"
            className="absolute inset-0 w-full h-full"
            aria-label={`Detected water boundary for ${waterBody.name}`}
          >
            <defs>
              <linearGradient id="waterFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  stopColor={layerMode === 'ndwi' ? '#06B6D4' : '#0284C7'}
                  stopOpacity={layerMode === 'terrain' ? '0.88' : '0.72'}
                />
                <stop
                  offset="100%"
                  stopColor={layerMode === 'ndwi' ? '#0284C7' : '#0D9488'}
                  stopOpacity={layerMode === 'terrain' ? '0.92' : '0.78'}
                />
              </linearGradient>
              <pattern
                id="baselineHatch"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="16"
                  stroke={layerMode === 'terrain' ? '#64748B' : '#FDE68A'}
                  strokeWidth="1.5"
                  strokeOpacity="0.35"
                />
              </pattern>
            </defs>

            {/* Subtle Topographic Grid Lines */}
            <g
              stroke={layerMode === 'terrain' ? '#CBD5E1' : '#FFFFFF'}
              strokeOpacity={layerMode === 'terrain' ? '0.6' : '0.1'}
              strokeWidth="1"
            >
              <line x1="0" y1="162" x2="1000" y2="162" />
              <line x1="0" y1="325" x2="1000" y2="325" />
              <line x1="0" y1="487" x2="1000" y2="487" />
              <line x1="250" y1="0" x2="250" y2="650" />
              <line x1="500" y1="0" x2="500" y2="650" />
              <line x1="750" y1="0" x2="750" y2="650" />
            </g>

            {/* Historical Baseline Boundary (Selected Area / Exposed Land Buffer) */}
            {showBoundary && (
              <path
                d={waterBody.baselinePolygon}
                fill="url(#baselineHatch)"
                stroke={layerMode === 'terrain' ? '#0F172A' : '#FCD34D'}
                strokeWidth="2.5"
                strokeDasharray="10 6"
              />
            )}

            {/* Detected Surface-Water Area (Scaled dynamically to time step) */}
            <g
              style={{
                transform: `translate(500px, 345px) scale(${activeStep.scale}) translate(-500px, -345px)`,
                transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <path
                d={waterBody.currentPolygon}
                fill="url(#waterFillGrad)"
                stroke={layerMode === 'ndwi' ? '#22D3EE' : '#38BDF8'}
                strokeWidth="3"
              />
            </g>

            {/* Selected Location Centroid Pin */}
            <g transform="translate(490, 335)">
              <circle
                r="18"
                fill="#0284C7"
                fillOpacity="0.25"
                stroke="#38BDF8"
                strokeWidth="1.5"
              />
              <circle r="6" fill="#FFFFFF" stroke="#0C4A6E" strokeWidth="2.5" />
            </g>
          </svg>
        </div>

        {/* Top-Left Overlay: Selected Water Body & Detected Area Readout */}
        <div className="absolute top-3.5 left-3.5 bg-slate-900/85 backdrop-blur-xs text-white px-3.5 py-2.5 rounded-lg border border-white/15 max-w-[280px] sm:max-w-xs pointer-events-none">
          <div className="flex items-center gap-1.5 text-xs text-sky-300 font-medium">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{waterBody.name}</span>
          </div>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-xl font-mono font-semibold tabular-nums text-white">
              {activeStep.area.toFixed(1)} km²
            </span>
            <span className="text-xs font-mono tabular-nums text-slate-300">
              ({activeStep.delta} vs baseline)
            </span>
          </div>
          <div className="mt-0.5 text-[11px] font-mono text-slate-300">
            {waterBody.coordinatesFormatted} · {activeStep.label}
          </div>
        </div>

        {/* Top-Right Overlay: Simple Zoom & Boundary Controls */}
        <div className="absolute top-3.5 right-3.5 flex flex-col gap-1.5">
          <div className="bg-white/95 backdrop-blur-xs rounded-lg border border-slate-200 shadow-sm flex flex-col overflow-hidden">
            <button
              type="button"
              onClick={handleZoomIn}
              aria-label="Zoom in"
              title="Zoom in"
              className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 border-b border-slate-200 transition-colors cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              aria-label="Zoom out"
              title="Zoom out"
              className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 border-b border-slate-200 transition-colors cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleReset}
              aria-label="Reset map view"
              title="Reset view"
              className="w-9 h-9 flex items-center justify-center text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowBoundary((b) => !b)}
            title="Toggle baseline boundary"
            className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium shadow-sm transition-colors cursor-pointer flex items-center gap-1.5 ${
              showBoundary
                ? 'bg-white/95 text-slate-800 border-slate-200'
                : 'bg-slate-800/80 text-slate-200 border-white/15'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-sky-700" />
            <span>Boundary</span>
          </button>
        </div>

        {/* Bottom Overlay Bar: Legend + Time-Lapse Scrubber */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 pointer-events-auto">
          {/* Map Legend */}
          <div
            className="bg-slate-900/85 backdrop-blur-xs text-white px-3.5 py-2 rounded-lg border border-white/15 flex flex-wrap items-center gap-4 text-xs"
            aria-label="Map legend"
          >
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-xs bg-sky-500 border border-sky-300 inline-block shrink-0" />
              <span>Water detected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-xs bg-amber-300/35 border border-dashed border-amber-300 inline-block shrink-0" />
              <span>Selected area (Baseline)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-xs bg-slate-600 border border-slate-400 inline-block shrink-0" />
              <span>Land</span>
            </div>
          </div>

          {/* Time-Lapse Quick Scrubber */}
          <div className="bg-slate-900/85 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg border border-white/15 flex items-center gap-2 overflow-x-auto">
            <button
              type="button"
              onClick={() => setIsPlaying((p) => !p)}
              aria-label={isPlaying ? 'Pause time-lapse' : 'Play time-lapse'}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs font-medium transition-colors cursor-pointer shrink-0"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Time-Lapse'}</span>
            </button>
            <div className="flex items-center gap-1">
              {timeSteps.map((step, idx) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setTimeStepIndex(idx);
                  }}
                  className={`px-2 py-1 rounded text-xs font-mono transition-colors whitespace-nowrap cursor-pointer ${
                    timeStepIndex === idx
                      ? 'bg-white text-slate-900 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {step.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Strip with Surface-Water Note & Quick Action */}
      <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-600">
        <p>
          Satellite source: <span className="font-medium text-slate-800">{waterBody.sensorFleet}</span>{' '}
          · Baseline area:{' '}
          <span className="font-mono font-medium text-slate-800">
            {waterBody.historicalAvg.toFixed(1)} km²
          </span>{' '}
          · Visible surface extent only (not direct water depth).
        </p>
        {onCompareClick && (
          <button
            type="button"
            onClick={onCompareClick}
            className="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-900 font-semibold transition-colors whitespace-nowrap cursor-pointer self-start sm:self-auto"
          >
            <span>Compare Dates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
