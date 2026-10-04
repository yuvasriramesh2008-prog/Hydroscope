import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  LineChart,
  Compass,
  Satellite,
  TrendingUp,
  Cpu,
  AlertTriangle,
  Menu,
  X,
} from 'lucide-react';
import { SATELLITE_ASSETS } from '../data/hydroData';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

interface LandingPageProps {
  onOpenLogin: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenLogin }) => {
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] flex flex-col overflow-x-hidden">
      {/* =====================================================================
          1. CLEAN MINIMAL NAVIGATION BAR (Strict 3-Zone Contract)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200/80">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Zone 1: Brand Title */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="text-xl font-bold text-[#0F2942] whitespace-nowrap"
          >
            HydroScope
          </a>

          {/* Zone 2: Minimal Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-base font-medium text-slate-600"
            aria-label="Landing page navigation"
          >
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('home');
              }}
              className="hover:text-[#0F2942] transition-colors whitespace-nowrap"
            >
              {t.navHome}
            </a>
            <a
              href="#how-it-works"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('how-it-works');
              }}
              className="hover:text-[#0F2942] transition-colors whitespace-nowrap"
            >
              {t.navHowItWorks}
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('about');
              }}
              className="hover:text-[#0F2942] transition-colors whitespace-nowrap"
            >
              {t.navAbout}
            </a>
          </nav>

          {/* Zone 3: Language Selector + Login Button */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            <button
              type="button"
              onClick={onOpenLogin}
              className="px-5 py-2.5 rounded-xl bg-[#0F2942] hover:bg-[#163A5F] text-white text-[15px] font-semibold transition-colors whitespace-nowrap cursor-pointer min-h-[42px]"
            >
              {t.navLogin}
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-4 space-y-2 shadow-lg">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="w-full text-left px-3.5 py-2.5 rounded-lg text-base font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {t.navAbout}
            </button>
          </div>
        )}
      </header>

      {/* =====================================================================
          2. HERO SECTION (Two-Column Desktop, Vertical Stack on Mobile)
         ===================================================================== */}
      <main className="flex-1">
        <section
          id="home"
          className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24 lg:py-28"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-sm font-semibold text-sky-700">
                {t.heroBadge}
              </p>

              <h1 className="text-[34px] sm:text-[44px] lg:text-[52px] font-bold text-[#0F2942] leading-[1.15] text-balance">
                {t.heroHeadingLine1}
                <br />
                {t.heroHeadingLine2}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-lg">
                {t.heroDescription}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="px-6 py-3.5 rounded-xl bg-[#0F2942] hover:bg-[#163A5F] text-white text-[15px] sm:text-base font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px] shadow-xs"
                >
                  <span>{t.btnGetStarted}</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </button>

                <button
                  type="button"
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-[15px] sm:text-base font-semibold transition-colors inline-flex items-center justify-center cursor-pointer min-h-[48px]"
                >
                  {t.btnHowItWorks}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: ONE Clean Contained Satellite Visual + Two Small Indicators */}
            <div className="lg:col-span-6">
              <div className="relative bg-white p-3 sm:p-4 rounded-2xl border border-slate-200 shadow-xs">
                <div className="relative h-[280px] sm:h-[340px] lg:h-[360px] w-full rounded-xl overflow-hidden bg-[#0B2239]">
                  {!imgError ? (
                    <img
                      src={SATELLITE_ASSETS.baseline}
                      alt="Satellite view of reservoir water surface"
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#0F2942] via-[#0C4A6E] to-[#0D9488]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-950/15 to-transparent" />

                  <svg
                    viewBox="0 0 1000 650"
                    preserveAspectRatio="xMidYMid slice"
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    aria-hidden="true"
                  >
                    <path
                      d="M 255,205 C 325,165 425,155 515,175 C 615,195 705,250 735,330 C 755,380 715,440 650,475 C 580,515 465,535 365,510 C 280,490 220,430 210,345 C 200,280 215,230 255,205 Z"
                      fill="#0284C7"
                      fillOpacity="0.38"
                      stroke="#38BDF8"
                      strokeWidth="3"
                    />
                  </svg>

                  {/* Indicator Card 1: Water Area */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl px-4 py-2.5 shadow-sm">
                    <span className="block text-xs font-medium text-slate-500">
                      {t.cardWaterArea}
                    </span>
                    <span className="mt-0.5 block text-lg font-bold tabular-nums text-[#0F2942]">
                      ↓ 12%
                    </span>
                  </div>

                  {/* Indicator Card 2: Drought Risk */}
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-xs border border-slate-200/90 rounded-xl px-4 py-2.5 shadow-sm">
                    <span className="block text-xs font-medium text-slate-500">
                      {t.cardDroughtRisk}
                    </span>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block shrink-0" />
                      <span className="text-lg font-bold text-slate-900">{t.riskModerate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            3. SIMPLE "HOW IT WORKS" SECTION (3 Steps Connected Visually)
           ===================================================================== */}
        <section
          id="how-it-works"
          className="bg-white border-y border-slate-200/80 py-16 sm:py-24"
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-[30px] sm:text-[36px] font-bold text-[#0F2942]">
                {t.howTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                {t.howSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
              {/* Step 1 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-sky-700">01</span>
                    <Eye className="w-5 h-5 text-[#0F2942] shrink-0" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {t.step1Title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {t.step1LandingDesc}
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-end text-slate-400 pt-2">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-sky-700">02</span>
                    <LineChart className="w-5 h-5 text-[#0F2942] shrink-0" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {t.step2Title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {t.step2LandingDesc}
                  </p>
                </div>
                <div className="hidden md:flex items-center justify-end text-slate-400 pt-2">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>

              {/* Step 3 */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#F8FAFC] border border-slate-200/90 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-sky-700">03</span>
                    <Compass className="w-5 h-5 text-[#0F2942] shrink-0" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                    {t.step3Title}
                  </h3>
                  <p className="text-base text-slate-600 leading-relaxed">
                    {t.step3LandingDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            4. KEY BENEFITS SECTION ("Water Intelligence at a Glance")
           ===================================================================== */}
        <section id="about" className="py-16 sm:py-24">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            <div className="max-w-2xl space-y-2">
              <h2 className="text-[30px] sm:text-[36px] font-bold text-[#0F2942]">
                {t.glanceTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-600">
                {t.glanceSubtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <Satellite className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-semibold text-slate-900">{t.glance1Title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.glance1Desc}</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <TrendingUp className="w-5 h-5 text-sky-700" />
                <h3 className="text-lg font-semibold text-slate-900">{t.glance2Title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.glance2Desc}</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <Cpu className="w-5 h-5 text-teal-700" />
                <h3 className="text-lg font-semibold text-slate-900">{t.glance3Title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.glance3Desc}</p>
              </div>

              <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-xs space-y-3">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-semibold text-slate-900">{t.glance4Title}</h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.glance4Desc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================================
            5. FINAL CALL TO ACTION
           ===================================================================== */}
        <section className="pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[1200px] mx-auto rounded-2xl bg-[#0F2942] text-white px-6 py-12 sm:px-12 sm:py-16 text-center space-y-6">
            <div className="space-y-2 max-w-xl mx-auto">
              <h2 className="text-[28px] sm:text-[34px] font-bold text-white">
                {t.landingCtaTitle}
              </h2>
              <p className="text-base sm:text-lg text-slate-300">
                {t.landingCtaSubtitle}
              </p>
            </div>

            <div>
              <button
                type="button"
                onClick={onOpenLogin}
                className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F2942] text-[15px] sm:text-base font-semibold transition-colors inline-flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>{t.btnGetStarted}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
          MINIMAL FOOTER
         ===================================================================== */}
      <footer className="bg-white border-t border-slate-200/80">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            <span className="font-bold text-[#0F2942]">HydroScope</span>
            <span className="mx-2">·</span>
            <span>{t.brandSubtitle}</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.navHome}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              {t.navAbout}
            </button>
            <button
              type="button"
              onClick={onOpenLogin}
              className="font-semibold text-[#0F2942] hover:underline cursor-pointer"
            >
              {t.navLogin}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
