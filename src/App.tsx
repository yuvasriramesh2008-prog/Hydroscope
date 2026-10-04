/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Search,
  MapPin,
  ArrowRight,
  Compass,
  ChevronDown,
  ChevronUp,
  Satellite,
  Waves,
  TrendingDown,
  ShieldAlert,
  Menu,
  X,
  PlayCircle,
  CheckCircle2,
  AlertTriangle,
  Info,
  RefreshCw,
  User,
  LogOut,
} from 'lucide-react';
import {
  WATER_BODIES,
  WaterBody,
  GUIDED_TOUR_STEPS,
  HYDRO_ALERTS,
} from './data/hydroData';
import { WaterExtentMap } from './components/WaterExtentMap';
import { BeforeAfterComparison } from './components/BeforeAfterComparison';
import { TrendChart } from './components/TrendChart';
import { ForecastChart } from './components/ForecastChart';
import { TechnicalDetailsPanel } from './components/TechnicalDetailsPanel';
import { LoginPage, AuthenticatedUser } from './components/LoginPage';
import { LandingPage } from './components/LandingPage';
import { IntroPage } from './components/IntroPage';
import { LanguageSelector } from './components/LanguageSelector';
import { useLanguage } from './i18n/LanguageContext';

type NavTab = 'overview' | 'analysis' | 'trends' | 'forecast' | 'risk' | 'about';

const AUTH_STORAGE_KEY = 'hydroscope_prototype_session';
const INTRO_COMPLETED_KEY = 'hydroscope_intro_completed';

export default function App() {
  const { t } = useLanguage();

  const NAV_ITEMS: { id: NavTab; label: string }[] = [
    { id: 'overview', label: t.tabOverview },
    { id: 'analysis', label: t.tabAnalysis },
    { id: 'trends', label: t.tabTrends },
    { id: 'forecast', label: t.tabForecast },
    { id: 'risk', label: t.tabRisk },
    { id: 'about', label: t.tabAbout },
  ];

  const [authUser, setAuthUser] = useState<AuthenticatedUser | null>(() => {
    try {
      const saved = sessionStorage.getItem(AUTH_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as AuthenticatedUser) : null;
    } catch {
      return null;
    }
  });
  const [showLoginPage, setShowLoginPage] = useState<boolean>(false);
  const [showIntroPage, setShowIntroPage] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(INTRO_COMPLETED_KEY) !== 'true';
    } catch {
      return true;
    }
  });
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const [activeTab, setActiveTab] = useState<NavTab>('overview');
  const [selectedId, setSelectedId] = useState<string | null>('mettur');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState<boolean>(false);
  const [isLoadingAnalysis, setIsLoadingAnalysis] = useState<boolean>(false);
  const [isDataUnavailableSim, setIsDataUnavailableSim] = useState<boolean>(false);
  const [locationNotice, setLocationNotice] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Drought Risk "How is this calculated?" expandable state
  const [showRiskCalcDetails, setShowRiskCalcDetails] = useState<boolean>(false);

  // Interactive Demo Tour state
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [tourStep, setTourStep] = useState<number>(1);

  const handleLoginSuccess = (user: AuthenticatedUser, remember: boolean) => {
    setAuthUser(user);
    setShowLoginPage(false);
    // Always show the Introduction / How It Works onboarding page first after login
    setShowIntroPage(true);
    setIsUserMenuOpen(false);
    setActiveTab('overview');
    try {
      sessionStorage.removeItem(INTRO_COMPLETED_KEY);
      if (remember) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch {
      // Ignore storage errors in restricted iframes
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDashboardFromIntro = () => {
    setShowIntroPage(false);
    try {
      sessionStorage.setItem(INTRO_COMPLETED_KEY, 'true');
    } catch {
      // Ignore storage errors
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setAuthUser(null);
    setShowLoginPage(true);
    setShowIntroPage(true);
    setIsUserMenuOpen(false);
    setMobileMenuOpen(false);
    setIsTourActive(false);
    try {
      sessionStorage.removeItem(AUTH_STORAGE_KEY);
      sessionStorage.removeItem(INTRO_COMPLETED_KEY);
    } catch {
      // Ignore storage errors
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!authUser) {
    if (showLoginPage) {
      return (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onBackToHome={() => {
            setShowLoginPage(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      );
    }
    return (
      <LandingPage
        onOpenLogin={() => {
          setShowLoginPage(true);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // Step 3 of User Flow: Post-Login Introduction / How It Works Page
  if (showIntroPage) {
    return (
      <IntroPage
        user={authUser}
        onOpenDashboard={handleOpenDashboardFromIntro}
        onLogout={handleLogout}
      />
    );
  }

  const waterBodyList = Object.values(WATER_BODIES);
  const selectedWaterBody: WaterBody | null = selectedId ? WATER_BODIES[selectedId] || null : null;

  const filteredWaterBodies = waterBodyList.filter((wb) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      wb.name.toLowerCase().includes(q) ||
      wb.shortName.toLowerCase().includes(q) ||
      wb.district.toLowerCase().includes(q) ||
      wb.type.toLowerCase().includes(q) ||
      wb.state.toLowerCase().includes(q)
    );
  });

  const handleSelectWaterBody = (id: string) => {
    setIsLoadingAnalysis(true);
    setIsDataUnavailableSim(false);
    setSelectedId(id);
    setIsSearchDropdownOpen(false);
    setLocationNotice('');
    const wb = WATER_BODIES[id];
    if (wb) setSearchQuery(wb.name);
    setTimeout(() => {
      setIsLoadingAnalysis(false);
    }, 280);
  };

  const handleAnalyzeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredWaterBodies.length > 0) {
      handleSelectWaterBody(filteredWaterBodies[0].id);
    } else if (!selectedId) {
      handleSelectWaterBody('mettur');
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLoadingAnalysis(true);
    setLocationNotice('Locating nearest monitored hydrological basin...');
    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          setSelectedId('chembarambakkam');
          setSearchQuery(WATER_BODIES.chembarambakkam.name);
          setLocationNotice('Selected nearest monitored basin: Chembarambakkam Lake (13.01° N, 80.06° E).');
          setIsLoadingAnalysis(false);
        },
        () => {
          setSelectedId('mettur');
          setSearchQuery(WATER_BODIES.mettur.name);
          setLocationNotice('Location permission unavailable — showing Mettur Reservoir benchmark.');
          setIsLoadingAnalysis(false);
        },
        { timeout: 2500 }
      );
    } else {
      setTimeout(() => {
        setSelectedId('mettur');
        setSearchQuery(WATER_BODIES.mettur.name);
        setLocationNotice('Showing regional benchmark: Mettur Reservoir.');
        setIsLoadingAnalysis(false);
      }, 250);
    }
  };

  const handleNavigate = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartDemo = () => {
    if (!selectedId) setSelectedId('mettur');
    setIsTourActive(true);
    setTourStep(1);
    setActiveTab('overview');
  };

  const handleTourStepSelect = (stepNum: number) => {
    const found = GUIDED_TOUR_STEPS.find((s) => s.step === stepNum);
    if (found) {
      setTourStep(stepNum);
      setActiveTab(found.navTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Helper for Risk Status Indicator (Never relies on color alone)
  const renderRiskStatusLabel = (wb: WaterBody) => {
    if (wb.riskTier === 'LOW') {
      return (
        <span className="inline-flex items-center gap-2 text-emerald-800 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
          <span>Healthy (Low Risk)</span>
        </span>
      );
    }
    if (wb.riskTier === 'MODERATE') {
      return (
        <span className="inline-flex items-center gap-2 text-amber-800 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
          <span>Watch (Moderate)</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-2 text-red-800 font-semibold">
        <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block" />
        <span>At Risk (High)</span>
      </span>
    );
  };

  // Dynamically computed AI Insight text from real project data
  const getAiInsightContent = (wb: WaterBody) => {
    const absChange = Math.abs(wb.netAnomaly).toFixed(1);
    const direction = wb.netAnomaly < 0 ? 'decreased' : 'increased';

    if (wb.riskTier === 'HIGH') {
      return {
        summary: `Water surface area has ${direction} by ${absChange}% compared with the historical baseline (${wb.historicalAvg.toFixed(1)} km²). If this trend continues, the water body will remain in a high drought-risk category over the coming months.`,
        whatChanged: `↓ Water area (${wb.netAnomaly.toFixed(1)}% / ${wb.deficitKm2.toFixed(1)} km²)`,
        whyItMatters: 'Reduced available surface water and receding shallow shoreline',
        whatToWatch: 'Next 30–90 days (projected ~' + wb.forecast90d.toFixed(1) + ' km²)',
      };
    }

    if (wb.riskTier === 'MODERATE') {
      return {
        summary: `Water surface area has ${direction} by ${absChange}% compared with the selected baseline (${wb.historicalAvg.toFixed(1)} km²). If this trend continues, the water body may enter a higher drought-risk category in the coming months.`,
        whatChanged: `↓ Water area (${wb.netAnomaly.toFixed(1)}% / ${wb.deficitKm2.toFixed(1)} km²)`,
        whyItMatters: 'Reduced available surface water relative to seasonal norms',
        whatToWatch: 'Next 30–90 days (projected ~' + wb.forecast90d.toFixed(1) + ' km²)',
      };
    }

    return {
      summary: `Water surface area is within ${absChange}% of the historical baseline (${wb.historicalAvg.toFixed(1)} km²). Current satellite observations indicate relatively stable surface-water conditions.`,
      whatChanged: `Stable surface area (${wb.netAnomaly.toFixed(1)}% vs baseline)`,
      whyItMatters: 'Surface water availability remains aligned with seasonal baseline',
      whatToWatch: 'Next 30–90 days routine satellite passes',
    };
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] w-full overflow-x-hidden">
      {/* =====================================================================
          TOP NAVIGATION BAR (Strict 3-Zone Contract)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element Brand Wordmark */}
          <a
            href="#overview"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('overview');
            }}
            className="text-xl font-bold tracking-tight text-[#0F2942] whitespace-nowrap"
          >
            HydroScope
          </a>

          {/* Zone 2: 6 Clean Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
            aria-label="Primary navigation"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`py-1 transition-colors whitespace-nowrap cursor-pointer border-b-2 ${
                    isActive
                      ? 'border-sky-700 text-slate-900 font-semibold'
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:border-slate-300'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Language Selector, Primary Action & User Profile Menu */}
          <div className="flex items-center gap-2.5">
            <LanguageSelector />

            <button
              type="button"
              onClick={handleStartDemo}
              className="hidden sm:inline-flex px-3.5 py-2 text-xs font-semibold text-white bg-[#0F2942] hover:bg-[#163A5F] rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {t.btnExploreDemo}
            </button>

            {/* User Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsUserMenuOpen((prev) => !prev)}
                aria-expanded={isUserMenuOpen}
                aria-label="User profile menu"
                className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-medium text-slate-800 transition-colors cursor-pointer min-h-[38px]"
              >
                <span className="w-6 h-6 rounded-full bg-sky-700 text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
                  {authUser.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden lg:inline max-w-[120px] truncate font-semibold text-slate-800">
                  {authUser.name}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-sky-700 text-white flex items-center justify-center font-semibold text-xs shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-slate-900 truncate">
                          {authUser.name}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate">{authUser.email}</p>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-sky-800 mt-2">
                      {authUser.role}
                    </p>
                  </div>

                  <div className="p-1.5 space-y-0.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setShowIntroPage(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Info className="w-4 h-4 text-sky-700 shrink-0" />
                      <span>{t.navIntroGuide}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        handleStartDemo();
                      }}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4 text-sky-700 shrink-0" />
                      <span>{t.btnExploreDemo}</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full px-3 py-2 rounded-lg text-left text-xs font-semibold text-red-700 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-600 shrink-0" />
                      <span>{t.navLogout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center justify-between ${
                    isActive
                      ? 'bg-sky-50 text-sky-900 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && <span className="text-xs font-mono text-sky-700">Active</span>}
                </button>
              );
            })}

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowIntroPage(true);
              }}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium text-sky-800 hover:bg-slate-50 cursor-pointer"
            >
              {t.navIntroGuide}
            </button>

            <div className="pt-2 mt-2 border-t border-slate-200 flex items-center justify-between px-2 py-1.5">
              <div className="min-w-0 pr-2">
                <p className="text-xs font-semibold text-slate-900 truncate">{authUser.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{authUser.email}</p>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 text-xs font-semibold transition-colors cursor-pointer shrink-0"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{t.navLogout}</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          GUIDED DEMO TOUR BAR (When "Explore Demo" is active)
         ===================================================================== */}
      {isTourActive && (
        <div className="bg-[#0F2942] text-white border-b border-slate-800 px-4 sm:px-6 py-3">
          <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 text-xs text-sky-300 font-medium">
                <PlayCircle className="w-4 h-4 shrink-0" />
                <span>
                  Interactive Demo Walkthrough · Step {tourStep} of {GUIDED_TOUR_STEPS.length}
                </span>
                <span>·</span>
                <strong className="text-white">
                  {GUIDED_TOUR_STEPS[tourStep - 1]?.title}
                </strong>
              </div>
              <p className="text-xs sm:text-sm text-slate-200">
                {GUIDED_TOUR_STEPS[tourStep - 1]?.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <div className="flex items-center gap-1 mr-2">
                {GUIDED_TOUR_STEPS.map((s) => (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => handleTourStepSelect(s.step)}
                    className={`w-6 h-6 rounded text-xs font-mono font-semibold transition-colors cursor-pointer ${
                      tourStep === s.step
                        ? 'bg-sky-500 text-white'
                        : 'bg-white/10 text-slate-300 hover:bg-white/20'
                    }`}
                    title={s.title}
                  >
                    {s.step}
                  </button>
                ))}
              </div>
              <button
                type="button"
                disabled={tourStep <= 1}
                onClick={() => handleTourStepSelect(tourStep - 1)}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-40 text-xs font-medium cursor-pointer"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => {
                  if (tourStep < GUIDED_TOUR_STEPS.length) {
                    handleTourStepSelect(tourStep + 1);
                  } else {
                    setIsTourActive(false);
                  }
                }}
                className="px-3.5 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 text-xs font-semibold cursor-pointer"
              >
                {tourStep === GUIDED_TOUR_STEPS.length ? 'Finish Demo' : 'Next Step'}
              </button>
              <button
                type="button"
                onClick={() => setIsTourActive(false)}
                aria-label="Close demo walkthrough"
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MAIN WORKSPACE CONTENT
         ===================================================================== */}
      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
        {/* -------------------------------------------------------------------
            HERO & LOCATION SELECTOR (Shown on Overview or compactly on subpages)
           ------------------------------------------------------------------- */}
        {activeTab === 'overview' ? (
          <section className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-sky-800">
                  <span>{t.brandSubtitle}</span>
                  <span aria-hidden="true">·</span>
                  <span>{t.tagline}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                  {t.dashQuestionHeading}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {t.dashQuestionSubtitle}
                </p>
              </div>

              {/* 30-Second Judge / First-Time User Summary Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 shrink-0 lg:w-[360px]">
                <div>
                  <span className="text-slate-400 font-medium block">What</span>
                  <span className="font-semibold text-slate-800">Satellite water monitoring</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Why</span>
                  <span className="font-semibold text-slate-800">Track loss & drought risk</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">How</span>
                  <span className="font-semibold text-slate-800">Surface area + forecasting</span>
                </div>
                <div>
                  <span className="text-slate-400 font-medium block">Result</span>
                  <span className="font-semibold text-sky-800">Actionable intelligence</span>
                </div>
              </div>
            </div>

            {/* Prominent Location / Search Section */}
            <div className="pt-4 border-t border-slate-200 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="water-body-search"
                  className="block text-sm font-semibold text-slate-900"
                >
                  {t.labelSelectWaterBody}
                </label>
                <div className="flex items-center gap-3 text-xs">
                  <button
                    type="button"
                    onClick={handleUseCurrentLocation}
                    className="inline-flex items-center gap-1.5 text-sky-700 hover:text-sky-900 font-medium transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>{t.btnUseCurrentLocation}</span>
                  </button>
                  <span className="text-slate-300">·</span>
                  <button
                    type="button"
                    onClick={() => handleSelectWaterBody('chembarambakkam')}
                    className="text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer"
                  >
                    {t.btnTryExample}
                  </button>
                  {selectedWaterBody && (
                    <>
                      <span className="text-slate-300">·</span>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedId(null);
                          setSearchQuery('');
                        }}
                        className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
                      >
                        {t.btnClear}
                      </button>
                    </>
                  )}
                </div>
              </div>

              <form
                onSubmit={handleAnalyzeSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 relative"
              >
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="water-body-search"
                    type="text"
                    value={searchQuery}
                    onFocus={() => setIsSearchDropdownOpen(true)}
                    onBlur={() => setTimeout(() => setIsSearchDropdownOpen(false), 180)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setIsSearchDropdownOpen(true);
                    }}
                    placeholder={t.placeholderSearchWaterBody}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-sky-600"
                  />

                  {/* Search Dropdown Suggestions */}
                  {isSearchDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-slate-200 rounded-xl shadow-lg z-30 max-h-64 overflow-y-auto divide-y divide-slate-100">
                      {filteredWaterBodies.length > 0 ? (
                        filteredWaterBodies.map((wb) => (
                          <button
                            key={wb.id}
                            type="button"
                            onMouseDown={() => handleSelectWaterBody(wb.id)}
                            className="w-full px-4 py-3 text-left hover:bg-slate-50 flex items-center justify-between gap-4 cursor-pointer"
                          >
                            <div>
                              <div className="text-sm font-semibold text-slate-900">{wb.name}</div>
                              <div className="text-xs text-slate-500">
                                {wb.type} · {wb.district} · {wb.surfaceArea.toFixed(1)} km²
                              </div>
                            </div>
                            <span className="text-xs font-mono text-slate-600 shrink-0">
                              Risk {wb.riskScore}/100
                            </span>
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-xs text-slate-500">
                          No matching basin found. Try "Mettur", "Chembarambakkam", "Poondi", or
                          "Pulicat".
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer min-h-[46px]"
                >
                  {t.btnAnalyzeWaterBody}
                </button>
              </form>

              {/* Quick Water Body Selector Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs text-slate-500 mr-1">{t.labelMonitoredWaterBodies}</span>
                {waterBodyList.map((wb) => {
                  const isSelected = selectedWaterBody?.id === wb.id;
                  return (
                    <button
                      key={wb.id}
                      type="button"
                      onClick={() => handleSelectWaterBody(wb.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer border ${
                        isSelected
                          ? 'bg-[#0F2942] text-white border-[#0F2942]'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {wb.shortName}
                    </button>
                  );
                })}
              </div>

              {locationNotice && (
                <p className="text-xs text-sky-800 font-medium pt-1">{locationNotice}</p>
              )}
            </div>
          </section>
        ) : (
          /* Compact Water Body Switcher Bar on Subpages (Water Analysis, Trends, Forecast, Drought Risk, About) */
          <section className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0" />
              <div className="min-w-0">
                <span className="text-xs text-slate-500 block">{t.labelSelectWaterBody}</span>
                <strong className="text-sm sm:text-base font-semibold text-slate-900 truncate block">
                  {selectedWaterBody ? selectedWaterBody.name : 'None selected'}
                </strong>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {waterBodyList.map((wb) => {
                const isSelected = selectedWaterBody?.id === wb.id;
                return (
                  <button
                    key={wb.id}
                    type="button"
                    onClick={() => handleSelectWaterBody(wb.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap cursor-pointer border ${
                      isSelected
                        ? 'bg-[#0F2942] text-white border-[#0F2942]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {wb.shortName}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 13: EMPTY / LOADING / DATA UNAVAILABLE STATES
           ------------------------------------------------------------------- */}
        {isLoadingAnalysis ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-3">
            <RefreshCw className="w-7 h-7 text-sky-700 animate-spin mx-auto" />
            <h2 className="text-lg font-semibold text-slate-900">{t.loadingSatellite}</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Extracting surface-water boundaries, historical baseline comparison, and drought-risk
              indicators.
            </p>
          </div>
        ) : isDataUnavailableSim ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
            <AlertTriangle className="w-8 h-8 text-amber-600 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">
                {t.dataUnavailableTitle}
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {t.dataUnavailableDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsDataUnavailableSim(false);
                handleSelectWaterBody('mettur');
              }}
              className="px-5 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Restore Latest Observation
            </button>
          </div>
        ) : !selectedWaterBody && activeTab !== 'about' ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center space-y-4">
            <Waves className="w-8 h-8 text-sky-700 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-xl font-semibold text-slate-900">
                {t.emptyChooseTitle}
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {t.emptyChooseDesc}
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleSelectWaterBody('mettur')}
              className="px-6 py-2.5 rounded-lg bg-sky-700 hover:bg-sky-800 text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              {t.btnExplore}
            </button>
          </div>
        ) : null}

        {/* ===================================================================
            TAB 1: OVERVIEW (Full Story Flow: Status → Map → AI Insight → Trend → Forecast → Risk → Technical)
           =================================================================== */}
        {!isLoadingAnalysis && !isDataUnavailableSim && selectedWaterBody && activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 1. CURRENT STATUS SECTION (3 Focused Cards as specified in Section 4 & 20) */}
            <section aria-labelledby="current-status-heading" className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2
                  id="current-status-heading"
                  className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                >
                  {t.statusHeading} · {selectedWaterBody.shortName}
                </h2>
                <span className="text-xs text-slate-500">
                  {t.surfaceAreaNote}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card 1: Water Surface Area & Change */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                  <span className="text-sm font-medium text-slate-600">{t.labelWaterSurfaceArea}</span>
                  <div className="my-2 flex items-baseline gap-2">
                    <span className="text-3xl font-mono font-bold tabular-nums text-slate-900">
                      {selectedWaterBody.surfaceArea.toFixed(1)}
                    </span>
                    <span className="text-base font-mono text-slate-500">km²</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                    <span
                      className={`font-mono font-semibold ${
                        selectedWaterBody.netAnomaly < 0 ? 'text-amber-800' : 'text-emerald-700'
                      }`}
                    >
                      {selectedWaterBody.netAnomaly < 0 ? '↓' : '↑'}{' '}
                      {Math.abs(selectedWaterBody.netAnomaly).toFixed(1)}% {t.fromBaseline}
                    </span>
                    <span className="text-slate-500 font-mono">
                      Avg: {selectedWaterBody.historicalAvg.toFixed(1)} km²
                    </span>
                  </div>
                </div>

                {/* Card 2: Drought Risk & Visual Status Indicator */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">{t.labelDroughtRisk}</span>
                    <button
                      type="button"
                      onClick={() => handleNavigate('risk')}
                      className="text-xs font-medium text-sky-700 hover:text-sky-900 cursor-pointer"
                    >
                      Details →
                    </button>
                  </div>
                  <div className="my-2 flex items-baseline justify-between gap-2">
                    <div className="text-xl font-bold tracking-tight">
                      {renderRiskStatusLabel(selectedWaterBody)}
                    </div>
                    <span className="text-2xl font-mono font-bold tabular-nums text-slate-900">
                      {selectedWaterBody.riskScore}{' '}
                      <span className="text-sm font-normal text-slate-500">/ 100</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span className={selectedWaterBody.riskTier === 'LOW' ? 'font-semibold text-emerald-800' : ''}>
                      ● {t.statusHealthy}
                    </span>
                    <span className={selectedWaterBody.riskTier === 'MODERATE' ? 'font-semibold text-amber-800' : ''}>
                      ● {t.statusWatch}
                    </span>
                    <span className={selectedWaterBody.riskTier === 'HIGH' ? 'font-semibold text-red-800' : ''}>
                      ● {t.statusAtRisk}
                    </span>
                  </div>
                </div>

                {/* Card 3: Last Updated */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between">
                  <span className="text-sm font-medium text-slate-600">{t.labelLastUpdated}</span>
                  <div className="my-2">
                    <span className="text-2xl font-mono font-bold tabular-nums text-slate-900 block">
                      {selectedWaterBody.lastUpdatedDisplay}
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5 block">
                      Latest cloud-free pass: {selectedWaterBody.lastObservationDate}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                    <span>{selectedWaterBody.sensorFleet}</span>
                    <span className="font-mono">{selectedWaterBody.cloudCoveragePct}% cloud</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. MAIN MAP + AI INSIGHT SIDE-BY-SIDE ON DESKTOP */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-8">
                <WaterExtentMap
                  waterBody={selectedWaterBody}
                  onCompareClick={() => handleNavigate('analysis')}
                />
              </div>

              {/* Section 6: AI INSIGHT CARD */}
              <div className="lg:col-span-4 space-y-4">
                {(() => {
                  const insight = getAiInsightContent(selectedWaterBody);
                  return (
                    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <h3 className="text-base font-semibold text-slate-900 tracking-tight">
                          {t.aiInsightTitle}
                        </h3>
                        <span className="text-xs text-slate-500">Automated Summary</span>
                      </div>

                      <p className="text-sm text-slate-800 leading-relaxed font-medium">
                        “{insight.summary}”
                      </p>

                      <div className="space-y-3 pt-2 border-t border-slate-100 text-sm">
                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                          <span className="text-xs text-slate-500 block">{t.aiWhatChanged}</span>
                          <span className="font-semibold text-slate-900 mt-0.5 block">
                            {insight.whatChanged}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                          <span className="text-xs text-slate-500 block">{t.aiWhyItMatters}</span>
                          <span className="font-semibold text-slate-900 mt-0.5 block">
                            {insight.whyItMatters}
                          </span>
                        </div>

                        <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/70">
                          <span className="text-xs text-slate-500 block">{t.aiWhatToWatch}</span>
                          <span className="font-semibold text-sky-900 mt-0.5 block">
                            {insight.whatToWatch}
                          </span>
                        </div>
                      </div>

                      {/* Action-oriented Secondary Buttons (Section 17) */}
                      <div className="pt-2 grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleNavigate('analysis')}
                          className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer text-center"
                        >
                          {t.btnCompareDates}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavigate('trends')}
                          className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer text-center"
                        >
                          {t.btnViewTrends}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavigate('forecast')}
                          className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer text-center"
                        >
                          {t.btnViewForecast}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleNavigate('about')}
                          className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-800 transition-colors cursor-pointer text-center"
                        >
                          {t.btnHowItWorksShort}
                        </button>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </section>

            {/* 3. BEFORE / AFTER SATELLITE COMPARISON ("See the Change") */}
            <section>
              <BeforeAfterComparison waterBody={selectedWaterBody} />
            </section>

            {/* 4. HISTORICAL TREND & FORECAST OVERVIEW */}
            <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <TrendChart waterBody={selectedWaterBody} defaultRange="1y" />
              <ForecastChart waterBody={selectedWaterBody} defaultHorizon="90d" />
            </section>

            {/* 5. PROGRESSIVE TECHNICAL DETAILS & DATA SOURCES */}
            <section>
              <TechnicalDetailsPanel
                waterBody={selectedWaterBody}
                onSelectWaterBody={handleSelectWaterBody}
              />
            </section>
          </div>
        )}

        {/* ===================================================================
            TAB 2: WATER ANALYSIS (Map + Before/After Satellite Comparison + Technical Details)
           =================================================================== */}
        {!isLoadingAnalysis && !isDataUnavailableSim && selectedWaterBody && activeTab === 'analysis' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Water Extent & Satellite Comparison
              </h1>
              <p className="text-sm text-slate-600 mt-1">
                Inspect visible surface-water boundaries and compare satellite imagery across dates.
              </p>
            </div>

            <WaterExtentMap waterBody={selectedWaterBody} />

            <BeforeAfterComparison waterBody={selectedWaterBody} />

            <TechnicalDetailsPanel
              waterBody={selectedWaterBody}
              onSelectWaterBody={handleSelectWaterBody}
              defaultExpanded={true}
            />
          </div>
        )}

        {/* ===================================================================
            TAB 3: TRENDS (Historical Water Surface Trend Analysis)
           =================================================================== */}
        {!isLoadingAnalysis && !isDataUnavailableSim && selectedWaterBody && activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  Water Surface Trend
                </h1>
                <p className="text-sm text-slate-600 mt-1">
                  Historical surface-water area observations from 2018 to 2026
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavigate('forecast')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F2942] hover:bg-[#163A5F] text-white text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>View Forecast</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <TrendChart waterBody={selectedWaterBody} defaultRange="All" />

            <TechnicalDetailsPanel
              waterBody={selectedWaterBody}
              onSelectWaterBody={handleSelectWaterBody}
            />
          </div>
        )}

        {/* ===================================================================
            TAB 4: FORECAST (Section 9: "What's Next?")
           =================================================================== */}
        {!isLoadingAnalysis && !isDataUnavailableSim && selectedWaterBody && activeTab === 'forecast' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">What’s Next?</h1>
                <p className="text-sm text-slate-600 mt-1">
                  Estimated future water-surface trend based on historical observations
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleNavigate('risk')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#0F2942] hover:bg-[#163A5F] text-white text-xs font-semibold transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>Check Drought Risk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <ForecastChart waterBody={selectedWaterBody} defaultHorizon="90d" />

            <TechnicalDetailsPanel
              waterBody={selectedWaterBody}
              onSelectWaterBody={handleSelectWaterBody}
            />
          </div>
        )}

        {/* ===================================================================
            TAB 5: DROUGHT RISK (Section 10: Large Central Indicator, Why?, Recommended Attention, Expandable Calculation)
           =================================================================== */}
        {!isLoadingAnalysis && !isDataUnavailableSim && selectedWaterBody && activeTab === 'risk' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Drought Risk</h1>
              <p className="text-sm text-slate-600 mt-1">
                Easy-to-understand drought risk indication derived from surface-water extent and
                trajectory
              </p>
            </div>

            {/* Large Central Drought Risk Card */}
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="text-center max-w-xl mx-auto space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  Drought Risk · {selectedWaterBody.shortName}
                </span>

                <div
                  className={`text-3xl sm:text-4xl font-bold tracking-tight ${
                    selectedWaterBody.riskTier === 'HIGH'
                      ? 'text-red-700'
                      : selectedWaterBody.riskTier === 'MODERATE'
                      ? 'text-amber-700'
                      : 'text-emerald-700'
                  }`}
                >
                  {selectedWaterBody.riskTier}
                </div>

                <div className="text-base font-mono text-slate-700">
                  Risk score:{' '}
                  <strong className="text-slate-900 font-bold">
                    {selectedWaterBody.riskScore} / 100
                  </strong>
                </div>

                {/* Simple Visual Gauge / Progress Indicator */}
                <div className="pt-2 space-y-2">
                  <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        selectedWaterBody.riskTier === 'HIGH'
                          ? 'bg-red-600'
                          : selectedWaterBody.riskTier === 'MODERATE'
                          ? 'bg-amber-500'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${selectedWaterBody.riskScore}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-500">
                    <span>0 · Healthy (Low)</span>
                    <span>40 · Moderate (Watch)</span>
                    <span>70+ · High (At Risk)</span>
                  </div>
                </div>
              </div>

              {/* Why? & Recommended Attention */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4 border-t border-slate-200">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <h2 className="text-base font-semibold text-slate-900">Why?</h2>
                  <ul className="space-y-2.5 text-sm text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>
                        {selectedWaterBody.netAnomaly <= -10
                          ? `Surface-water area is declining (${selectedWaterBody.netAnomaly.toFixed(1)}% vs historical baseline of ${selectedWaterBody.historicalAvg.toFixed(1)} km²)`
                          : `Surface-water area is within ${Math.abs(selectedWaterBody.netAnomaly).toFixed(1)}% of seasonal baseline (${selectedWaterBody.historicalAvg.toFixed(1)} km²)`}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>
                        {selectedWaterBody.percentile < 35
                          ? `Recent trend is below baseline (${selectedWaterBody.percentile}nd historical percentile)`
                          : `Current water spread holds near the ${selectedWaterBody.percentile}th historical percentile`}
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-slate-400 font-bold">•</span>
                      <span>
                        {selectedWaterBody.forecast90d < selectedWaterBody.surfaceArea
                          ? `Forecast indicates continued pressure (projected ${selectedWaterBody.forecast90d.toFixed(1)} km² in 90 days)`
                          : `Forecast indicates relatively stable conditions over the next 90 days`}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-sky-50/70 border border-sky-200/80 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-base font-semibold text-slate-900">
                      Recommended attention
                    </h2>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">
                      {selectedWaterBody.riskTier === 'HIGH'
                        ? '“Monitor the water body weekly over the next 30 days and review updated satellite passes for continued shoreline contraction.”'
                        : selectedWaterBody.riskTier === 'MODERATE'
                        ? '“Monitor the water body more frequently over the next 30 days.”'
                        : '“Continue routine monthly satellite monitoring to track seasonal water extent.”'}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 border-t border-sky-200/80 pt-3">
                    Reminder: HydroScope evaluates surface-water area from satellite imagery and is
                    intended as an informational environmental monitoring indicator.
                  </p>
                </div>
              </div>

              {/* Expandable "How is this calculated?" Section */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setShowRiskCalcDetails((prev) => !prev)}
                  aria-expanded={showRiskCalcDetails}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-900 cursor-pointer"
                >
                  <span>How is this calculated?</span>
                  {showRiskCalcDetails ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>

                {showRiskCalcDetails && (
                  <div className="mt-4 p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-4">
                    <p className="text-sm text-slate-700 leading-relaxed">
                      The Drought Risk Score (0–100) combines four satellite-derived factors into a
                      single weighted index:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                      <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between font-semibold text-slate-900">
                          <span>1. Baseline Deficit</span>
                          <span className="font-mono text-sky-800">40% weight</span>
                        </div>
                        <p className="text-slate-600 mt-1">
                          Current surface-water area compared with the multi-year seasonal average.
                        </p>
                        <div className="mt-2 font-mono text-slate-800">
                          Component score: {selectedWaterBody.riskBreakdown.baselineDeficit}/100
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between font-semibold text-slate-900">
                          <span>2. 90-Day Trend Slope</span>
                          <span className="font-mono text-sky-800">30% weight</span>
                        </div>
                        <p className="text-slate-600 mt-1">
                          Rate of surface-area shrinkage over the most recent 90-day window.
                        </p>
                        <div className="mt-2 font-mono text-slate-800">
                          Component score: {selectedWaterBody.riskBreakdown.trajectoryDecline}/100
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between font-semibold text-slate-900">
                          <span>3. Historical Percentile</span>
                          <span className="font-mono text-sky-800">20% weight</span>
                        </div>
                        <p className="text-slate-600 mt-1">
                          Ranking of current water extent across all observations since 2018.
                        </p>
                        <div className="mt-2 font-mono text-slate-800">
                          Percentile rank: {selectedWaterBody.riskBreakdown.percentileRank}th
                        </div>
                      </div>

                      <div className="p-3.5 bg-white rounded-lg border border-slate-200">
                        <div className="flex justify-between font-semibold text-slate-900">
                          <span>4. Persistence</span>
                          <span className="font-mono text-sky-800">10% weight</span>
                        </div>
                        <p className="text-slate-600 mt-1">
                          Consecutive satellite passes remaining below the seasonal baseline.
                        </p>
                        <div className="mt-2 font-mono text-slate-800">
                          Component score: {selectedWaterBody.riskBreakdown.hydrologicalPersistence}
                          /100
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Active Regional Observations / Notifications */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
              <h3 className="text-base font-semibold text-slate-900">
                Recent Basin Observations & Risk Notices
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {HYDRO_ALERTS.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between gap-2"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-900">{alert.title}</span>
                        <span className="font-mono text-slate-500">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">{alert.description}</p>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 text-xs">
                      <span className="text-slate-500">
                        Source: {alert.passSource} · Score {alert.riskScore}/100
                      </span>
                      <button
                        type="button"
                        onClick={() => handleSelectWaterBody(alert.waterBodyId)}
                        className="text-sky-700 hover:text-sky-900 font-semibold cursor-pointer"
                      >
                        Inspect {alert.waterBodyName} →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            TAB 6: ABOUT / METHODOLOGY (Section 22: "How HydroScope Works" 4 Simple Steps + Data Sources)
           =================================================================== */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
              <div className="max-w-2xl space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-sky-800 block">
                  About / Methodology
                </span>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  How HydroScope Works
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  HydroScope transforms satellite earth-observation imagery into clear, accessible
                  water intelligence in four steps.
                </p>
              </div>

              {/* 4 Simple Steps (01 -> 02 -> 03 -> 04) */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-semibold text-sky-800">01</span>
                    <Satellite className="w-5 h-5 text-sky-700" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">Satellite Data</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Optical imagery is collected from Sentinel-2 and Landsat satellites passing over
                    lakes and reservoirs.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-semibold text-sky-800">02</span>
                    <Waves className="w-5 h-5 text-teal-700" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">Water Detection</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Spectral water analysis identifies the visible surface-water boundary and
                    calculates total area in square kilometers (km²).
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-semibold text-sky-800">03</span>
                    <TrendingDown className="w-5 h-5 text-sky-700" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">
                    Trend & Forecast Analysis
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Current water extent is compared against historical baselines to project
                    estimated 30-to-90-day trends.
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-mono font-semibold text-sky-800">04</span>
                    <ShieldAlert className="w-5 h-5 text-amber-600" />
                  </div>
                  <h2 className="text-base font-semibold text-slate-900">Drought Risk Insight</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Surface-area changes and projections are summarized into an easy-to-understand
                    0–100 drought risk indicator.
                  </p>
                </div>
              </div>

              {/* Important Product Clarification Box */}
              <div className="p-4 rounded-xl bg-sky-50/80 border border-sky-200 flex items-start gap-3">
                <Info className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
                <div className="text-sm text-slate-800 space-y-1">
                  <p className="font-semibold text-slate-900">
                    Surface-Water Area vs. Water Depth
                  </p>
                  <p className="text-slate-700 leading-relaxed">
                    HydroScope monitors <strong>surface-water area</strong> using optical satellite
                    imagery. It does not directly measure water depth or bathymetric volume unless
                    paired with optional local ground-gauge sensors.
                  </p>
                </div>
              </div>
            </div>

            {selectedWaterBody && (
              <TechnicalDetailsPanel
                waterBody={selectedWaterBody}
                onSelectWaterBody={handleSelectWaterBody}
                defaultExpanded={true}
              />
            )}
          </div>
        )}
      </main>

      {/* =====================================================================
          MINIMAL FOOTER (Section 23)
         ===================================================================== */}
      <footer className="bg-white border-t border-slate-200 mt-12">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#0F2942]">HydroScope</span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-medium text-slate-600">
                Satellite-AI Water Intelligence
              </span>
            </div>
            <p className="text-xs text-slate-500">
              “See Water. Predict Change. Act Before Drought.” · Built for sustainable water
              intelligence.
            </p>
          </div>

          <nav
            className="flex flex-wrap items-center gap-5 text-xs font-medium text-slate-600"
            aria-label="Footer navigation"
          >
            <button
              type="button"
              onClick={() => handleNavigate('overview')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Overview
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('analysis')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Analysis
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('trends')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Trends
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('forecast')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Forecast
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('risk')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Drought Risk
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('about')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              Methodology
            </button>
          </nav>
        </div>
      </footer>
    </div>
  );
}
