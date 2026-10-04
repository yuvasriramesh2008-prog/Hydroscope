import React, { useState } from 'react';
import {
  Eye,
  LineChart,
  Compass,
  Waves,
  History,
  Cpu,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { AuthenticatedUser } from './LoginPage';

interface IntroPageProps {
  user: AuthenticatedUser;
  onOpenDashboard: () => void;
  onLogout: () => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({
  user,
  onOpenDashboard,
  onLogout,
}) => {
  const { t } = useLanguage();
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
          HEADER (3-Zone Navigation Bar)
         ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#welcome"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('welcome');
            }}
            className="text-xl font-bold tracking-tight text-[#0F2942] whitespace-nowrap"
          >
            HydroScope
          </a>

          {/* Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600"
            aria-label="Introduction navigation"
          >
            <button
              type="button"
              onClick={() => scrollToSection('intro-how')}
              className="hover:text-[#0F2942] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('intro-uses')}
              className="hover:text-[#0F2942] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.navUses}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('intro-why')}
              className="hover:text-[#0F2942] transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.navAbout}
            </button>
          </nav>

          {/* Language Selector + Profile */}
          <div className="flex items-center gap-3">
            <LanguageSelector />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen((prev) => !prev)}
                aria-expanded={profileOpen}
                aria-label={t.navProfile}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-sm font-medium text-slate-800 transition-colors cursor-pointer min-h-[40px]"
              >
                <span className="w-6 h-6 rounded-full bg-[#0F2942] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline max-w-[120px] truncate">{t.navProfile}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#0F2942] text-white flex items-center justify-center shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-1.5 space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        onOpenDashboard();
                      }}
                      className="w-full px-3 py-2 rounded-lg text-left text-sm font-medium text-slate-700 hover:bg-slate-100 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span>{t.navDashboard}</span>
                      <ArrowRight className="w-4 h-4 text-sky-700" />
                    </button>
                    <button
                      type="button"
                      onClick={onLogout}
                      className="w-full px-3 py-2 rounded-lg text-left text-sm font-semibold text-red-700 hover:bg-red-50 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4 text-red-600" />
                      <span>{t.navLogout}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="md:hidden p-2 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-200 px-4 py-3 space-y-1 shadow-lg">
            <button
              type="button"
              onClick={() => scrollToSection('intro-how')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {t.navHowItWorks}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('intro-uses')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {t.navUses}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection('intro-why')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {t.navAbout}
            </button>
          </div>
        )}
      </header>

      {/* =====================================================================
          MAIN INTRODUCTION CONTENT
         ===================================================================== */}
      <main className="flex-1 max-w-[1200px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* 1. WELCOME SECTION */}
        <section
          id="welcome"
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 lg:p-12 shadow-xs"
        >
          <div className="max-w-3xl space-y-5">
            <p className="text-sm font-semibold text-sky-700">{t.brandSubtitle}</p>
            <h1 className="text-[32px] sm:text-[42px] lg:text-[48px] font-bold text-[#0F2942] leading-[1.15]">
              {t.introWelcomeTitle}
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-slate-800">
              {t.introWelcomeSubtitle}
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              {t.introWelcomeDesc}
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onOpenDashboard}
                className="px-6 py-3.5 rounded-xl bg-[#0F2942] hover:bg-[#163A5F] text-white text-base font-semibold transition-colors inline-flex items-center gap-2 cursor-pointer min-h-[48px]"
              >
                <span>{t.btnOpenDashboard}</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. HOW HYDROSCOPE WORKS (01 Observe -> 02 Analyze -> 03 Predict) */}
        <section id="intro-how" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#0F2942]">
              {t.howTitle}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{t.howSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* 01 Observe */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-sky-700">01 — {t.step1Title}</span>
                  <Eye className="w-5 h-5 text-[#0F2942] shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {t.step1Title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.step1IntroDesc}</p>
              </div>
              <div className="hidden md:flex items-center justify-end text-slate-400 pt-2">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* 02 Analyze */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-sky-700">02 — {t.step2Title}</span>
                  <LineChart className="w-5 h-5 text-[#0F2942] shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {t.step2Title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.step2IntroDesc}</p>
              </div>
              <div className="hidden md:flex items-center justify-end text-slate-400 pt-2">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* 03 Predict */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-sky-700">03 — {t.step3Title}</span>
                  <Compass className="w-5 h-5 text-[#0F2942] shrink-0" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">
                  {t.step3Title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed">{t.step3IntroDesc}</p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. WHAT CAN HYDROSCOPE HELP YOU WITH? (5 Clean Cards) */}
        <section id="intro-uses" className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#0F2942]">
              {t.introUsesHeading}
            </h2>
            <p className="text-base sm:text-lg text-slate-600">{t.introUsesSubtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <Waves className="w-5 h-5 text-sky-700" />
              <h3 className="text-lg font-semibold text-slate-900">1. {t.use1Title}</h3>
              <p className="text-base text-slate-600 leading-relaxed">{t.use1Desc}</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <History className="w-5 h-5 text-sky-700" />
              <h3 className="text-lg font-semibold text-slate-900">2. {t.use2Title}</h3>
              <p className="text-base text-slate-600 leading-relaxed">{t.use2Desc}</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <Cpu className="w-5 h-5 text-teal-700" />
              <h3 className="text-lg font-semibold text-slate-900">3. {t.use3Title}</h3>
              <p className="text-base text-slate-600 leading-relaxed">{t.use3Desc}</p>
            </div>

            {/* Card 4 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
              <TrendingUp className="w-5 h-5 text-sky-700" />
              <h3 className="text-lg font-semibold text-slate-900">4. {t.use4Title}</h3>
              <p className="text-base text-slate-600 leading-relaxed">{t.use4Desc}</p>
            </div>

            {/* Card 5 */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3 sm:col-span-2 lg:col-span-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="text-lg font-semibold text-slate-900">5. {t.use5Title}</h3>
              <p className="text-base text-slate-600 leading-relaxed">{t.use5Desc}</p>
            </div>
          </div>
        </section>

        {/* 4. WHY IT MATTERS */}
        <section
          id="intro-why"
          className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs space-y-6"
        >
          <div className="max-w-3xl space-y-3">
            <h2 className="text-[28px] sm:text-[34px] font-bold text-[#0F2942]">
              {t.whyHeading}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{t.whyDesc}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
              <span className="text-base font-semibold text-slate-900">{t.whyBenefit1}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
              <span className="text-base font-semibold text-slate-900">{t.whyBenefit2}</span>
            </div>
            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-slate-200 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-teal-700 shrink-0" />
              <span className="text-base font-semibold text-slate-900">{t.whyBenefit3}</span>
            </div>
          </div>
        </section>

        {/* 5. SUBTLE DISCLAIMER */}
        <section className="p-5 rounded-xl bg-sky-50/80 border border-sky-200 flex items-start gap-3">
          <Info className="w-5 h-5 text-sky-800 shrink-0 mt-0.5" />
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            {t.disclaimerNote}
          </p>
        </section>

        {/* 6. FINAL CTA */}
        <section className="rounded-2xl bg-[#0F2942] text-white p-8 sm:p-12 text-center space-y-6">
          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-[28px] sm:text-[34px] font-bold text-white">
              {t.introCtaHeading}
            </h2>
            <p className="text-base sm:text-lg text-slate-300">{t.introCtaSubtitle}</p>
          </div>
          <div>
            <button
              type="button"
              onClick={onOpenDashboard}
              className="px-7 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#0F2942] text-base font-semibold transition-colors inline-flex items-center justify-center cursor-pointer min-h-[48px]"
            >
              <span>{t.btnOpenDashboard}</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
