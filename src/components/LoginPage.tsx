import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Waves,
  X,
} from 'lucide-react';
import { SATELLITE_ASSETS } from '../data/hydroData';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';

export interface AuthenticatedUser {
  name: string;
  email: string;
  role: string;
  authMethod: 'email' | 'google' | 'demo';
}

interface LoginPageProps {
  onLoginSuccess: (user: AuthenticatedUser, remember: boolean) => void;
  onBackToHome?: () => void;
}

type AuthViewMode = 'login' | 'signup' | 'forgot';

const GOOGLE_ACCOUNTS = [
  {
    name: 'Yuvasri Ramesh',
    email: 'yuvasriramesh2008@gmail.com',
    role: 'Lead Water Intelligence Researcher',
  },
  {
    name: 'HydroScope Demo Analyst',
    email: 'analyst@hydroscope.earth',
    role: 'Environmental Monitoring Specialist',
  },
];

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  onBackToHome,
}) => {
  const { t } = useLanguage();
  const [mode, setMode] = useState<AuthViewMode>('login');
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [showGoogleAccountModal, setShowGoogleAccountModal] = useState<boolean>(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState<string>('');
  const [imgError, setImgError] = useState<boolean>(false);

  const validateEmailFormat = (value: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setNameError('');
    setFormError('');
    setResetSuccessMessage('');
  };

  const switchMode = (nextMode: AuthViewMode) => {
    clearErrors();
    setMode(nextMode);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearErrors();

    let hasError = false;
    const trimmedEmail = email.trim();

    if (mode === 'signup' && !name.trim()) {
      setNameError(t.errEnterName);
      hasError = true;
    }

    if (!trimmedEmail) {
      setEmailError(t.errEnterEmail);
      hasError = true;
    } else if (!validateEmailFormat(trimmedEmail)) {
      setEmailError(t.errValidEmail);
      hasError = true;
    }

    if (mode !== 'forgot') {
      if (!password) {
        setPasswordError(t.errEnterPassword);
        hasError = true;
      } else if (password.length < 6) {
        setPasswordError(t.errShortPassword);
        hasError = true;
      }
    }

    if (hasError) return;

    setIsSubmitting(true);

    setTimeout(() => {
      if (mode === 'forgot') {
        setIsSubmitting(false);
        setResetSuccessMessage(
          `Password reset instructions have been sent to ${trimmedEmail}.`
        );
        return;
      }

      if (
        password.toLowerCase() === 'wrongpassword' ||
        password.toLowerCase() === 'invalid' ||
        trimmedEmail.toLowerCase().startsWith('invalid@')
      ) {
        setIsSubmitting(false);
        setFormError(t.errInvalidCredentials);
        return;
      }

      const derivedName =
        mode === 'signup' && name.trim()
          ? name.trim()
          : trimmedEmail
              .split('@')[0]
              .replace(/[._-]/g, ' ')
              .replace(/\b\w/g, (l) => l.toUpperCase());

      setIsSubmitting(false);
      onLoginSuccess(
        {
          name: derivedName || 'HydroScope Researcher',
          email: trimmedEmail,
          role: 'Water Intelligence Analyst',
          authMethod: 'email',
        },
        rememberMe
      );
    }, 450);
  };

  const handleOpenGooglePopup = () => {
    clearErrors();
    setShowGoogleAccountModal(true);
  };

  const handleCancelGooglePopup = () => {
    setShowGoogleAccountModal(false);
    setFormError(t.errGoogleCancelled);
  };

  const handleSelectGoogleAccount = (account: {
    name: string;
    email: string;
    role: string;
  }) => {
    setShowGoogleAccountModal(false);
    setIsGoogleLoading(true);
    setTimeout(() => {
      setIsGoogleLoading(false);
      onLoginSuccess(
        {
          name: account.name,
          email: account.email,
          role: account.role,
          authMethod: 'google',
        },
        rememberMe
      );
    }, 450);
  };

  const handleQuickDemoFill = () => {
    clearErrors();
    setMode('login');
    setEmail('demo.analyst@hydroscope.org');
    setPassword('HydroScope2026');
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] text-[#0F172A] flex flex-col lg:flex-row overflow-x-hidden">
      {/* =====================================================================
          LEFT SECTION: CLEAN HYDROSCOPE BRANDING & CONTAINED SATELLITE CARD
         ===================================================================== */}
      <div className="lg:w-1/2 bg-[#0F2942] text-white flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16">
        {/* Top Brand & Back to Home Link */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300 shrink-0">
              <Waves className="w-5 h-5" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-white block leading-none">
                HydroScope
              </span>
              <span className="text-xs text-sky-300 mt-1 block">
                {t.brandSubtitle}
              </span>
            </div>
          </div>

          {onBackToHome && (
            <button
              type="button"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.backToHome}</span>
            </button>
          )}
        </div>

        {/* Center Message & Contained Satellite Visual Card */}
        <div className="my-8 lg:my-auto space-y-6 max-w-lg">
          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {t.heroHeadingLine1} {t.heroHeadingLine2}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {t.heroDescription}
            </p>
          </div>

          {/* Contained Satellite Visual Card with 2 Simple Analytical Indicators */}
          <div className="hidden sm:block rounded-2xl bg-white/5 border border-white/15 p-3">
            <div className="relative h-52 w-full rounded-xl overflow-hidden bg-[#0B2239]">
              {!imgError ? (
                <img
                  src={SATELLITE_ASSETS.baseline}
                  alt="Satellite water observation"
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover opacity-90"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0F2942] to-[#0D9488]" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent" />

              {/* Floating Indicator 1: Water Area */}
              <div className="absolute top-3 left-3 bg-white/95 text-slate-900 rounded-lg px-3 py-1.5 shadow-xs">
                <span className="block text-[11px] text-slate-500">{t.cardWaterArea}</span>
                <span className="text-sm font-mono font-bold tabular-nums text-[#0F2942]">
                  ↓ 12%
                </span>
              </div>

              {/* Floating Indicator 2: Drought Risk */}
              <div className="absolute bottom-3 right-3 bg-white/95 text-slate-900 rounded-lg px-3 py-1.5 shadow-xs">
                <span className="block text-[11px] text-slate-500">{t.cardDroughtRisk}</span>
                <span className="text-sm font-bold text-amber-700">{t.riskModerate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Footer */}
        <div className="hidden sm:flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
          <span>{t.tagline}</span>
        </div>
      </div>

      {/* =====================================================================
          RIGHT SECTION: LOGIN FORM
         ===================================================================== */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 bg-white relative">
        <div className="w-full max-w-md flex justify-end mb-4">
          <LanguageSelector />
        </div>

        <div className="w-full max-w-md space-y-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {mode === 'login'
                ? t.loginWelcomeBack
                : mode === 'signup'
                ? t.signupTitle
                : t.forgotTitle}
            </h2>
            <p className="text-sm text-slate-600">
              {mode === 'login'
                ? t.loginSubtitle
                : mode === 'signup'
                ? t.signupSubtitle
                : t.forgotSubtitle}
            </p>
          </div>

          {/* Demo Quick-Fill Helper */}
          {mode === 'login' && (
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-sky-700 shrink-0" />
                <span>{t.quickDemoAccess}</span>
              </div>
              <button
                type="button"
                onClick={handleQuickDemoFill}
                className="font-semibold text-sky-800 hover:text-sky-950 underline cursor-pointer whitespace-nowrap"
              >
                {t.fillDemoCredentials}
              </button>
            </div>
          )}

          {/* Error Banner */}
          {formError && (
            <div
              role="alert"
              className="p-3.5 rounded-lg bg-red-50 border border-red-200 flex items-start gap-2.5 text-xs text-red-800"
            >
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{formError}</span>
            </div>
          )}

          {/* Password Reset Success */}
          {resetSuccessMessage && (
            <div
              role="status"
              className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-start gap-2.5 text-xs text-emerald-800"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium leading-relaxed">{resetSuccessMessage}</p>
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-semibold text-emerald-900 underline cursor-pointer"
                >
                  {t.signInLink}
                </button>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {mode === 'signup' && (
              <div className="space-y-1.5">
                <label htmlFor="auth-name" className="block text-xs font-semibold text-slate-700">
                  {t.labelFullName}
                </label>
                <input
                  id="auth-name"
                  type="text"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (nameError) setNameError('');
                  }}
                  placeholder="Dr. Kavitha Ramesh"
                  className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                    nameError
                      ? 'border-red-400 focus:ring-red-500/30 focus:border-red-600'
                      : 'border-slate-300 focus:ring-sky-600/25 focus:border-sky-600'
                  }`}
                />
                {nameError && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{nameError}</span>
                  </p>
                )}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="auth-email" className="block text-xs font-semibold text-slate-700">
                {t.labelEmail}
              </label>
              <input
                id="auth-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError('');
                  if (formError) setFormError('');
                }}
                placeholder={t.placeholderEmail}
                aria-invalid={!!emailError}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                  emailError
                    ? 'border-red-400 focus:ring-red-500/30 focus:border-red-600'
                    : 'border-slate-300 focus:ring-sky-600/25 focus:border-sky-600'
                }`}
              />
              {emailError && (
                <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{emailError}</span>
                </p>
              )}
            </div>

            {mode !== 'forgot' && (
              <div className="space-y-1.5">
                <label
                  htmlFor="auth-password"
                  className="block text-xs font-semibold text-slate-700"
                >
                  {t.labelPassword}
                </label>
                <div className="relative">
                  <input
                    id="auth-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError('');
                      if (formError) setFormError('');
                    }}
                    placeholder={t.placeholderPassword}
                    aria-invalid={!!passwordError}
                    className={`w-full pl-3.5 pr-11 py-2.5 rounded-lg border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
                      passwordError
                        ? 'border-red-400 focus:ring-red-500/30 focus:border-red-600'
                        : 'border-slate-300 focus:ring-sky-600/25 focus:border-sky-600'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? t.hidePassword : t.showPassword}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-500 hover:text-slate-800 rounded-md transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passwordError}</span>
                  </p>
                )}
              </div>
            )}

            {mode === 'login' && (
              <div className="flex items-center justify-between gap-2 pt-0.5">
                <label className="inline-flex items-center gap-2 text-xs text-slate-700 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-sky-700 focus:ring-sky-600 cursor-pointer"
                  />
                  <span>{t.rememberMe}</span>
                </label>

                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  className="text-xs font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
                >
                  {t.forgotPasswordLink}
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isGoogleLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#0F2942] hover:bg-[#163A5F] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>{t.btnSigningIn}</span>
                </>
              ) : (
                <>
                  <span>
                    {mode === 'login'
                      ? t.btnLogin
                      : mode === 'signup'
                      ? t.btnCreateAccount
                      : t.btnSendResetLink}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {mode !== 'forgot' && (
            <>
              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-slate-200" />
                <span className="flex-shrink mx-3 text-xs font-medium text-slate-400 uppercase">
                  {t.orDivider}
                </span>
                <div className="flex-grow border-t border-slate-200" />
              </div>

              <button
                type="button"
                onClick={handleOpenGooglePopup}
                disabled={isSubmitting || isGoogleLoading}
                className="w-full py-2.5 px-4 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 disabled:opacity-60 disabled:cursor-not-allowed text-slate-800 text-sm font-semibold transition-colors flex items-center justify-center gap-2.5 cursor-pointer min-h-[44px]"
              >
                {isGoogleLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-slate-600" />
                    <span>{t.btnSigningIn}</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                      />
                    </svg>
                    <span>{t.btnContinueGoogle}</span>
                  </>
                )}
              </button>
            </>
          )}

          <div className="pt-2 text-center border-t border-slate-100">
            {mode === 'login' ? (
              <p className="text-xs sm:text-sm text-slate-600">
                {t.noAccountPrompt}{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
                >
                  {t.signUpLink}
                </button>
              </p>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600">
                {t.haveAccountPrompt}{' '}
                <button
                  type="button"
                  onClick={() => switchMode('login')}
                  className="font-semibold text-sky-700 hover:text-sky-900 transition-colors cursor-pointer"
                >
                  {t.signInLink}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================================
          GOOGLE ACCOUNT SELECTION POPUP MODAL
         ===================================================================== */}
      {showGoogleAccountModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="google-signin-title"
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white border border-slate-200 rounded-2xl shadow-xl max-w-md w-full overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="#4285F4"
                    d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                  />
                </svg>
                <span className="text-sm font-semibold text-slate-700">{t.btnContinueGoogle}</span>
              </div>
              <button
                type="button"
                onClick={handleCancelGooglePopup}
                aria-label="Close Google Sign-In"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 id="google-signin-title" className="text-lg font-bold text-slate-900">
                  {t.googlePopupTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{t.googlePopupSubtitle}</p>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                {GOOGLE_ACCOUNTS.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => handleSelectGoogleAccount(acc)}
                    className="w-full px-4 py-3.5 text-left hover:bg-slate-50 flex items-center gap-3.5 transition-colors cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-full bg-sky-700 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                      {acc.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">{acc.name}</p>
                      <p className="text-xs text-slate-500 truncate">{acc.email}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Use another Google account */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!validateEmailFormat(customGoogleEmail)) return;
                  const customName = customGoogleEmail
                    .split('@')[0]
                    .replace(/[._-]/g, ' ')
                    .replace(/\b\w/g, (l) => l.toUpperCase());
                  handleSelectGoogleAccount({
                    name: customName || 'Google User',
                    email: customGoogleEmail.trim(),
                    role: 'Water Intelligence Analyst',
                  });
                }}
                className="pt-2 space-y-2"
              >
                <label
                  htmlFor="custom-google-email"
                  className="block text-xs font-medium text-slate-600"
                >
                  Or sign in with another Google email
                </label>
                <div className="flex gap-2">
                  <input
                    id="custom-google-email"
                    type="email"
                    value={customGoogleEmail}
                    onChange={(e) => setCustomGoogleEmail(e.target.value)}
                    placeholder="yourname@gmail.com"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-600"
                  />
                  <button
                    type="submit"
                    disabled={!validateEmailFormat(customGoogleEmail)}
                    className="px-3.5 py-2 rounded-lg bg-[#0F2942] hover:bg-[#163A5F] disabled:opacity-40 text-white text-xs font-semibold cursor-pointer"
                  >
                    Continue
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
