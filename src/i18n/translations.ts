export type LanguageCode = 'en' | 'ta' | 'te' | 'kn' | 'ml';

export interface LanguageOption {
  code: LanguageCode;
  nativeName: string;
  englishName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English' },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil' },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu' },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada' },
  { code: 'ml', nativeName: 'മലയാളം', englishName: 'Malayalam' },
];

export interface TranslationDictionary {
  // Brand & Common
  brandSubtitle: string;
  tagline: string;
  navHome: string;
  navHowItWorks: string;
  navUses: string;
  navAbout: string;
  navLogin: string;
  navLogout: string;
  navProfile: string;
  navDashboard: string;
  navIntroGuide: string;
  backToHome: string;

  // Landing Page
  heroBadge: string;
  heroHeadingLine1: string;
  heroHeadingLine2: string;
  heroDescription: string;
  btnGetStarted: string;
  btnHowItWorks: string;
  cardWaterArea: string;
  cardDroughtRisk: string;
  riskModerate: string;
  riskLow: string;
  riskHigh: string;

  // Landing & Intro How It Works
  howTitle: string;
  howSubtitle: string;
  step1Title: string;
  step1LandingDesc: string;
  step1IntroDesc: string;
  step2Title: string;
  step2LandingDesc: string;
  step2IntroDesc: string;
  step3Title: string;
  step3LandingDesc: string;
  step3IntroDesc: string;

  // Landing Benefits
  glanceTitle: string;
  glanceSubtitle: string;
  glance1Title: string;
  glance1Desc: string;
  glance2Title: string;
  glance2Desc: string;
  glance3Title: string;
  glance3Desc: string;
  glance4Title: string;
  glance4Desc: string;
  landingCtaTitle: string;
  landingCtaSubtitle: string;

  // Login Page
  loginWelcomeBack: string;
  loginSubtitle: string;
  signupTitle: string;
  signupSubtitle: string;
  forgotTitle: string;
  forgotSubtitle: string;
  labelFullName: string;
  labelEmail: string;
  labelPassword: string;
  placeholderEmail: string;
  placeholderPassword: string;
  showPassword: string;
  hidePassword: string;
  rememberMe: string;
  forgotPasswordLink: string;
  btnLogin: string;
  btnSigningIn: string;
  btnCreateAccount: string;
  btnSendResetLink: string;
  orDivider: string;
  btnContinueGoogle: string;
  noAccountPrompt: string;
  signUpLink: string;
  haveAccountPrompt: string;
  signInLink: string;
  quickDemoAccess: string;
  fillDemoCredentials: string;
  errEnterName: string;
  errEnterEmail: string;
  errValidEmail: string;
  errEnterPassword: string;
  errShortPassword: string;
  errInvalidCredentials: string;
  errGoogleCancelled: string;
  googlePopupTitle: string;
  googlePopupSubtitle: string;

  // Post-Login Introduction Page (/intro)
  introWelcomeTitle: string;
  introWelcomeSubtitle: string;
  introWelcomeDesc: string;
  introUsesHeading: string;
  introUsesSubtitle: string;
  use1Title: string;
  use1Desc: string;
  use2Title: string;
  use2Desc: string;
  use3Title: string;
  use3Desc: string;
  use4Title: string;
  use4Desc: string;
  use5Title: string;
  use5Desc: string;
  whyHeading: string;
  whyDesc: string;
  whyBenefit1: string;
  whyBenefit2: string;
  whyBenefit3: string;
  disclaimerNote: string;
  introCtaHeading: string;
  introCtaSubtitle: string;
  btnOpenDashboard: string;

  // Dashboard
  tabOverview: string;
  tabAnalysis: string;
  tabTrends: string;
  tabForecast: string;
  tabRisk: string;
  tabAbout: string;
  btnExploreDemo: string;
  dashQuestionHeading: string;
  dashQuestionSubtitle: string;
  labelSelectWaterBody: string;
  placeholderSearchWaterBody: string;
  btnAnalyzeWaterBody: string;
  btnUseCurrentLocation: string;
  btnTryExample: string;
  btnClear: string;
  labelMonitoredWaterBodies: string;
  statusHeading: string;
  surfaceAreaNote: string;
  labelWaterSurfaceArea: string;
  fromBaseline: string;
  labelDroughtRisk: string;
  labelLastUpdated: string;
  statusHealthy: string;
  statusWatch: string;
  statusAtRisk: string;
  aiInsightTitle: string;
  aiWhatChanged: string;
  aiWhyItMatters: string;
  aiWhatToWatch: string;
  btnCompareDates: string;
  btnViewTrends: string;
  btnViewForecast: string;
  btnHowItWorksShort: string;
  emptyChooseTitle: string;
  emptyChooseDesc: string;
  btnExplore: string;
  loadingSatellite: string;
  dataUnavailableTitle: string;
  dataUnavailableDesc: string;
}

export const TRANSLATIONS: Record<LanguageCode, TranslationDictionary> = {
  en: {
    brandSubtitle: 'Satellite-AI Water Intelligence',
    tagline: 'See Water. Predict Change. Act Before Drought.',
    navHome: 'Home',
    navHowItWorks: 'How It Works',
    navUses: 'Uses',
    navAbout: 'About',
    navLogin: 'Login',
    navLogout: 'Logout',
    navProfile: 'Profile',
    navDashboard: 'Dashboard',
    navIntroGuide: 'Introduction',
    backToHome: 'Back to Home',

    heroBadge: 'Satellite + AI Water Intelligence',
    heroHeadingLine1: 'See Water.',
    heroHeadingLine2: 'Predict Change.',
    heroDescription:
      'Monitor lakes and reservoirs using satellite imagery and AI-powered water analysis.',
    btnGetStarted: 'Get Started',
    btnHowItWorks: 'How It Works',
    cardWaterArea: 'Water Area',
    cardDroughtRisk: 'Drought Risk',
    riskModerate: 'Moderate',
    riskLow: 'Healthy',
    riskHigh: 'High',

    howTitle: 'How HydroScope Works',
    howSubtitle: 'From satellite imagery to actionable water intelligence.',
    step1Title: 'Observe',
    step1LandingDesc:
      'Satellite imagery is used to monitor the visible surface area of lakes and reservoirs.',
    step1IntroDesc: 'Monitor visible surface-water changes using satellite imagery.',
    step2Title: 'Analyze',
    step2LandingDesc:
      'HydroScope analyzes historical water-area patterns and identifies significant changes.',
    step2IntroDesc: 'Understand historical patterns and identify significant changes.',
    step3Title: 'Predict',
    step3LandingDesc:
      'AI-powered forecasting helps identify future water stress and potential drought risk.',
    step3IntroDesc: 'Forecast future water trends and identify potential water stress.',

    glanceTitle: 'Water Intelligence at a Glance',
    glanceSubtitle: 'Simple, reliable insights for understanding lakes and reservoirs.',
    glance1Title: 'Satellite Monitoring',
    glance1Desc: 'Monitor lakes and reservoirs remotely.',
    glance2Title: 'Historical Trends',
    glance2Desc: 'Understand how water areas change over time.',
    glance3Title: 'AI Forecasting',
    glance3Desc: 'Identify future water stress.',
    glance4Title: 'Drought Awareness',
    glance4Desc: 'Detect early warning signals before conditions worsen.',
    landingCtaTitle: 'Ready to understand your water?',
    landingCtaSubtitle: 'Explore satellite-powered water intelligence with HydroScope.',

    loginWelcomeBack: 'Welcome back',
    loginSubtitle: 'Sign in to continue to HydroScope',
    signupTitle: 'Create your account',
    signupSubtitle: 'Sign up to continue to HydroScope',
    forgotTitle: 'Reset your password',
    forgotSubtitle: 'Enter your email address to receive a password reset link',
    labelFullName: 'Full Name',
    labelEmail: 'Email',
    labelPassword: 'Password',
    placeholderEmail: 'name@example.com',
    placeholderPassword: 'Enter your password',
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    rememberMe: 'Remember me',
    forgotPasswordLink: 'Forgot password?',
    btnLogin: 'Login',
    btnSigningIn: 'Signing in...',
    btnCreateAccount: 'Sign up',
    btnSendResetLink: 'Send Reset Link',
    orDivider: 'OR',
    btnContinueGoogle: 'Continue with Google',
    noAccountPrompt: "Don't have an account?",
    signUpLink: 'Sign up',
    haveAccountPrompt: 'Already have an account?',
    signInLink: 'Login',
    quickDemoAccess: 'Quick demo access',
    fillDemoCredentials: 'Fill Demo Credentials',
    errEnterName: 'Please enter your full name.',
    errEnterEmail: 'Please enter your email address.',
    errValidEmail: 'Please enter a valid email address.',
    errEnterPassword: 'Please enter your password.',
    errShortPassword: 'Password must be at least 6 characters.',
    errInvalidCredentials: 'Invalid email or password. Please try again.',
    errGoogleCancelled: 'Google sign-in was cancelled.',
    googlePopupTitle: 'Choose an account',
    googlePopupSubtitle: 'to continue to HydroScope',

    introWelcomeTitle: 'Welcome to HydroScope',
    introWelcomeSubtitle: 'Understand water changes. Detect risks. Make informed decisions.',
    introWelcomeDesc:
      'HydroScope combines satellite imagery, historical analysis, and AI-powered forecasting to help you understand changes in lakes and reservoirs.',
    introUsesHeading: 'What Can HydroScope Help You With?',
    introUsesSubtitle: 'Five clear capabilities designed for everyday decision-making.',
    use1Title: 'Water Monitoring',
    use1Desc: 'Track changes in the visible surface area of lakes and reservoirs.',
    use2Title: 'Historical Analysis',
    use2Desc: 'Compare current water conditions with historical trends.',
    use3Title: 'AI-Powered Analysis',
    use3Desc: 'Identify unusual changes and important patterns.',
    use4Title: 'Future Forecasting',
    use4Desc: 'Understand expected changes in water-area trends.',
    use5Title: 'Drought Risk Awareness',
    use5Desc: 'Identify early signs of increasing water stress.',
    whyHeading: 'Why HydroScope Matters',
    whyDesc:
      'Water conditions can change gradually. By combining satellite observations, historical trends, and AI forecasting, HydroScope helps users understand these changes earlier and make better-informed decisions.',
    whyBenefit1: 'Monitor remotely',
    whyBenefit2: 'Understand changes over time',
    whyBenefit3: 'Act before risks escalate',
    disclaimerNote:
      'HydroScope monitors visible surface-water area using satellite imagery. It does not directly measure groundwater level or water depth.',
    introCtaHeading: 'Ready to explore HydroScope?',
    introCtaSubtitle: 'View satellite-based water intelligence for your selected water body.',
    btnOpenDashboard: 'Open Dashboard →',

    tabOverview: 'Overview',
    tabAnalysis: 'Water Analysis',
    tabTrends: 'Trends',
    tabForecast: 'Forecast',
    tabRisk: 'Drought Risk',
    tabAbout: 'About / Methodology',
    btnExploreDemo: 'Explore Demo',
    dashQuestionHeading: 'What is happening to my water body?',
    dashQuestionSubtitle:
      'Monitor water extent, understand change, and anticipate drought risk using satellite data.',
    labelSelectWaterBody: 'Select a water body',
    placeholderSearchWaterBody: 'Search lake, reservoir, or location...',
    btnAnalyzeWaterBody: 'Analyze Water Body',
    btnUseCurrentLocation: 'Use current location',
    btnTryExample: 'Try an Example',
    btnClear: 'Clear',
    labelMonitoredWaterBodies: 'Monitored water bodies:',
    statusHeading: 'Current Status',
    surfaceAreaNote:
      'HydroScope monitors surface-water area using satellite imagery. It does not directly measure water depth.',
    labelWaterSurfaceArea: 'Water Surface Area',
    fromBaseline: 'from baseline',
    labelDroughtRisk: 'Drought Risk',
    labelLastUpdated: 'Last Updated',
    statusHealthy: 'Healthy (Low Risk)',
    statusWatch: 'Watch (Moderate)',
    statusAtRisk: 'At Risk (High)',
    aiInsightTitle: 'AI Insight',
    aiWhatChanged: 'What changed?',
    aiWhyItMatters: 'Why it matters?',
    aiWhatToWatch: 'What to watch?',
    btnCompareDates: 'Compare Dates',
    btnViewTrends: 'View Trends',
    btnViewForecast: 'View Forecast',
    btnHowItWorksShort: 'How it works',
    emptyChooseTitle: 'Choose a water body to begin',
    emptyChooseDesc: 'Search for a lake or reservoir to view satellite-based water intelligence.',
    btnExplore: 'Explore',
    loadingSatellite: 'Analyzing satellite data...',
    dataUnavailableTitle: 'Data temporarily unavailable',
    dataUnavailableDesc: 'Try another location or date.',
  },

  ta: {
    brandSubtitle: 'செயற்கைக்கோள்-AI நீர் நுண்ணறிவு',
    tagline: 'நீரைக் காணுங்கள். மாற்றத்தைக் கணியுங்கள். வறட்சிக்கு முன் செயல்படுங்கள்.',
    navHome: 'முகப்பு',
    navHowItWorks: 'எப்படி செயல்படுகிறது',
    navUses: 'பயன்கள்',
    navAbout: 'பற்றி',
    navLogin: 'உள்நுழைக',
    navLogout: 'வெளியேறு',
    navProfile: 'சுயவிவரம்',
    navDashboard: 'டாஷ்போர்டு',
    navIntroGuide: 'அறிமுகம்',
    backToHome: 'முகப்புக்குத் திரும்பு',

    heroBadge: 'செயற்கைக்கோள் + AI நீர் நுண்ணறிவு',
    heroHeadingLine1: 'நீரைக் காணுங்கள்.',
    heroHeadingLine2: 'மாற்றத்தைக் கணியுங்கள்.',
    heroDescription:
      'செயற்கைக்கோள் படங்கள் மற்றும் AI பகுப்பாய்வு மூலம் ஏரிகள் மற்றும் நீர்த்தேக்கங்களைக் கண்காணிக்கவும்.',
    btnGetStarted: 'தொடங்குங்கள்',
    btnHowItWorks: 'எப்படி செயல்படுகிறது',
    cardWaterArea: 'நீர் பரப்பளவு',
    cardDroughtRisk: 'வறட்சி அபாயம்',
    riskModerate: 'மிதமானது',
    riskLow: 'பாதுகாப்பானது',
    riskHigh: 'அதிகம்',

    howTitle: 'HydroScope எப்படி செயல்படுகிறது',
    howSubtitle: 'செயற்கைக்கோள் படங்களிலிருந்து பயனுள்ள நீர் நுண்ணறிவு வரை.',
    step1Title: 'கண்காணிப்பு (Observe)',
    step1LandingDesc:
      'ஏரிகள் மற்றும் நீர்த்தேக்கங்களின் மேற்பரப்பு நீரைக் கண்காணிக்க செயற்கைக்கோள் படங்கள் பயன்படுத்தப்படுகின்றன.',
    step1IntroDesc: 'செயற்கைக்கோள் படங்கள் மூலம் மேற்பரப்பு நீர் மாற்றங்களைக் கண்காணிக்கவும்.',
    step2Title: 'பகுப்பாய்வு (Analyze)',
    step2LandingDesc:
      'HydroScope கடந்தகால நீர் பரப்பளவு மாற்றங்களை ஒப்பிட்டு முக்கிய போக்குகளைக் கண்டறிகிறது.',
    step2IntroDesc: 'கடந்தகால தரவுகளை ஒப்பிட்டு முக்கிய மாற்றங்களைப் புரிந்து கொள்ளுங்கள்.',
    step3Title: 'கணிப்பு (Predict)',
    step3LandingDesc:
      'AI கணிப்பு எதிர்கால நீர் பற்றாக்குறை மற்றும் வறட்சி அபாயத்தை முன்கூட்டியே அறிய உதவுகிறது.',
    step3IntroDesc: 'எதிர்கால நீர் போக்குகள் மற்றும் வறட்சி அபாயத்தை முன்கூட்டியே கணிக்கவும்.',

    glanceTitle: 'ஒரு பார்வையில் நீர் நுண்ணறிவு',
    glanceSubtitle: 'ஏரிகள் மற்றும் நீர்த்தேக்கங்களைப் புரிந்துகொள்ள எளிய, நம்பகமான தகவல்கள்.',
    glance1Title: 'செயற்கைக்கோள் கண்காணிப்பு',
    glance1Desc: 'ஏரிகள் மற்றும் நீர்த்தேக்கங்களை தொலைவிலிருந்து கண்காணிக்கவும்.',
    glance2Title: 'கடந்தகால போக்குகள்',
    glance2Desc: 'காலப்போக்கில் நீர் பரப்பளவு எவ்வாறு மாறுகிறது என்பதை அறியவும்.',
    glance3Title: 'AI எதிர்கால கணிப்பு',
    glance3Desc: 'எதிர்கால நீர் அழுத்தத்தை முன்கூட்டியே கண்டறியவும்.',
    glance4Title: 'வறட்சி விழிப்புணர்வு',
    glance4Desc: 'நிலைமை மோசமடைவதற்கு முன்பே ஆரம்ப எச்சரிக்கைகளைப் பெறவும்.',
    landingCtaTitle: 'உங்கள் நீர்நிலையைப் புரிந்துகொள்ளத் தயாரா?',
    landingCtaSubtitle: 'HydroScope மூலம் செயற்கைக்கோள் நீர் நுண்ணறிவை ஆராயுங்கள்.',

    loginWelcomeBack: 'நல்வரவு',
    loginSubtitle: 'HydroScope-ஐ தொடர உள்நுழையவும்',
    signupTitle: 'புதிய கணக்கை உருவாக்கவும்',
    signupSubtitle: 'HydroScope-ஐ பயன்படுத்த பதிவு செய்யவும்',
    forgotTitle: 'கடவுச்சொல்லை மீட்டமைக்கவும்',
    forgotSubtitle: 'மீட்டமைப்பு இணைப்பைப் பெற உங்கள் மின்னஞ்சலை உள்ளிடவும்',
    labelFullName: 'முழு பெயர்',
    labelEmail: 'மின்னஞ்சல்',
    labelPassword: 'கடவுச்சொல்',
    placeholderEmail: 'name@example.com',
    placeholderPassword: 'உங்கள் கடவுச்சொல்லை உள்ளிடவும்',
    showPassword: 'கடவுச்சொல்லைக் காட்டு',
    hidePassword: 'கடவுச்சொல்லை மறை',
    rememberMe: 'என்னை நினைவில் கொள்',
    forgotPasswordLink: 'கடவுச்சொல் மறந்ததா?',
    btnLogin: 'உள்நுழைக',
    btnSigningIn: 'உள்நுழைகிறது...',
    btnCreateAccount: 'பதிவு செய்க',
    btnSendResetLink: 'இணைப்பை அனுப்பு',
    orDivider: 'அல்லது',
    btnContinueGoogle: 'Google மூலம் தொடரவும்',
    noAccountPrompt: 'கணக்கு இல்லையா?',
    signUpLink: 'பதிவு செய்க',
    haveAccountPrompt: 'ஏற்கனவே கணக்கு உள்ளதா?',
    signInLink: 'உள்நுழைக',
    quickDemoAccess: 'விரைவான டெமோ அணுகல்',
    fillDemoCredentials: 'டெமோ விவரங்களை நிரப்புக',
    errEnterName: 'தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்.',
    errEnterEmail: 'தயவுசெய்து உங்கள் மின்னஞ்சலை உள்ளிடவும்.',
    errValidEmail: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்.',
    errEnterPassword: 'தயவுசெய்து கடவுச்சொல்லை உள்ளிடவும்.',
    errShortPassword: 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்.',
    errInvalidCredentials: 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல்.',
    errGoogleCancelled: 'Google உள்நுழைவு ரத்து செய்யப்பட்டது.',
    googlePopupTitle: 'கணக்கைத் தேர்ந்தெடுக்கவும்',
    googlePopupSubtitle: 'HydroScope-க்கு தொடர',

    introWelcomeTitle: 'HydroScope-க்கு நல்வரவு',
    introWelcomeSubtitle:
      'நீர் மாற்றங்களைப் புரிந்து கொள்ளுங்கள். அபாயங்களைக் கண்டறியுங்கள். சரியான முடிவெடுங்கள்.',
    introWelcomeDesc:
      'HydroScope செயற்கைக்கோள் படங்கள், கடந்தகால தரவு மற்றும் AI கணிப்புகளை இணைத்து ஏரிகள் மற்றும் நீர்த்தேக்கங்களின் மாற்றங்களை எளிதாகப் புரிந்துகொள்ள உதவுகிறது.',
    introUsesHeading: 'HydroScope உங்களுக்கு எவ்வாறு உதவும்?',
    introUsesSubtitle: 'தெளிவான முடிவுகளை எடுக்க உதவும் 5 முக்கிய வசதிகள்.',
    use1Title: 'நீர் கண்காணிப்பு',
    use1Desc: 'ஏரிகள் மற்றும் நீர்த்தேக்கங்களின் மேற்பரப்பு நீர் மாற்றங்களைக் கண்காணிக்கவும்.',
    use2Title: 'கடந்தகால பகுப்பாய்வு',
    use2Desc: 'தற்போதைய நீர் நிலையை கடந்தகால போக்குகளுடன் ஒப்பிடவும்.',
    use3Title: 'AI பகுப்பாய்வு',
    use3Desc: 'வழக்கத்திற்கு மாறான மாற்றங்கள் மற்றும் முக்கிய போக்குகளைக் கண்டறியவும்.',
    use4Title: 'எதிர்கால கணிப்பு',
    use4Desc: 'நீர் பரப்பளவில் ஏற்படக்கூடிய எதிர்பார்க்கப்படும் மாற்றங்களை அறியவும்.',
    use5Title: 'வறட்சி அபாய விழிப்புணர்வு',
    use5Desc: 'அதிகரிக்கும் நீர் பற்றாக்குறையின் ஆரம்ப அறிகுறிகளைக் கண்டறியவும்.',
    whyHeading: 'HydroScope ஏன் முக்கியமானது',
    whyDesc:
      'நீர்நிலை மாற்றங்கள் மெதுவாக நிகழலாம். செயற்கைக்கோள் கண்காணிப்பு, கடந்தகால போக்குகள் மற்றும் AI கணிப்புகளை இணைப்பதன் மூலம், இந்த மாற்றங்களை முன்கூட்டியே புரிந்துகொள்ள HydroScope உதவுகிறது.',
    whyBenefit1: 'தொலைவிலிருந்து கண்காணிப்பு',
    whyBenefit2: 'காலப்போக்கில் மாற்றங்களைப் புரிந்துகொள்ளுதல்',
    whyBenefit3: 'அபாயம் அதிகரிக்கும் முன் செயல்படுதல்',
    disclaimerNote:
      'குறிப்பு: HydroScope செயற்கைக்கோள் படங்கள் மூலம் மேற்பரப்பு நீர் பரப்பளவை (Surface-Water Area) மட்டுமே கண்காணிக்கிறது. இது நிலத்தடி நீர் மட்டத்தையோ அல்லது நீரின் ஆழத்தையோ நேரடியாக அளவிடுவதில்லை.',
    introCtaHeading: 'HydroScope-ஐ ஆராயத் தயாரா?',
    introCtaSubtitle: 'நீங்கள் தேர்ந்தெடுத்த நீர்நிலையின் செயற்கைக்கோள் தகவல்களைப் பாருங்கள்.',
    btnOpenDashboard: 'டாஷ்போர்டைத் திறக்கவும் →',

    tabOverview: 'சுருக்கம்',
    tabAnalysis: 'நீர் பகுப்பாய்வு',
    tabTrends: 'போக்குகள்',
    tabForecast: 'கணிப்பு',
    tabRisk: 'வறட்சி அபாயம்',
    tabAbout: 'பற்றி / செய்முறை',
    btnExploreDemo: 'டெமோ வழிகாட்டி',
    dashQuestionHeading: 'எனது நீர்நிலையில் என்ன நடக்கிறது?',
    dashQuestionSubtitle:
      'செயற்கைக்கோள் தரவு மூலம் நீர் பரப்பளவைக் கண்காணித்து வறட்சி அபாயத்தை முன்கூட்டியே அறியவும்.',
    labelSelectWaterBody: 'நீர்நிலையைத் தேர்ந்தெடுக்கவும்',
    placeholderSearchWaterBody: 'ஏரி, நீர்த்தேக்கம் அல்லது இடத்தைத் தேடுங்கள்...',
    btnAnalyzeWaterBody: 'நீர்நிலையை ஆய்வு செய்',
    btnUseCurrentLocation: 'தற்போதைய இருப்பிடம்',
    btnTryExample: 'உதாரணத்தை முயற்சிக்கவும்',
    btnClear: 'அழி',
    labelMonitoredWaterBodies: 'கண்காணிக்கப்படும் நீர்நிலைகள்:',
    statusHeading: 'தற்போதைய நிலை',
    surfaceAreaNote:
      'HydroScope செயற்கைக்கோள் மூலம் மேற்பரப்பு நீர் பரப்பளவை அளவிடுகிறது (நேரடி ஆழத்தை அல்ல).',
    labelWaterSurfaceArea: 'நீர் மேற்பரப்பு பரப்பளவு',
    fromBaseline: 'சராசரியிலிருந்து',
    labelDroughtRisk: 'வறட்சி அபாயம்',
    labelLastUpdated: 'கடைசி புதுப்பிப்பு',
    statusHealthy: 'பாதுகாப்பானது (குறைந்த அபாயம்)',
    statusWatch: 'கவனிக்கவும் (மிதமானது)',
    statusAtRisk: 'அபாயம் (அதிகம்)',
    aiInsightTitle: 'AI நுண்ணறிவு',
    aiWhatChanged: 'என்ன மாறியது?',
    aiWhyItMatters: 'இது ஏன் முக்கியம்?',
    aiWhatToWatch: 'எதைக் கவனிக்க வேண்டும்?',
    btnCompareDates: 'தேதிகளை ஒப்பிடுக',
    btnViewTrends: 'போக்குகளைப் பார்க்க',
    btnViewForecast: 'கணிப்பைப் பார்க்க',
    btnHowItWorksShort: 'எப்படி செயல்படுகிறது',
    emptyChooseTitle: 'தொடங்க ஒரு நீர்நிலையைத் தேர்ந்தெடுக்கவும்',
    emptyChooseDesc: 'செயற்கைக்கோள் நீர் நுண்ணறிவைக் காண ஏரி அல்லது நீர்த்தேக்கத்தைத் தேடுங்கள்.',
    btnExplore: 'ஆராய்க',
    loadingSatellite: 'செயற்கைக்கோள் தரவு ஆய்வு செய்யப்படுகிறது...',
    dataUnavailableTitle: 'தரவு தற்காலிகமாக கிடைக்கவில்லை',
    dataUnavailableDesc: 'மற்றொரு இடம் அல்லது தேதியை முயற்சிக்கவும்.',
  },

  te: {
    brandSubtitle: 'ఉపగ్రహ-AI నీటి మేధస్సు',
    tagline: 'నీటిని చూడండి. మార్పును అంచనా వేయండి. కరువుకు ముందే స్పందించండి.',
    navHome: 'హోమ్',
    navHowItWorks: 'ఎలా పనిచేస్తుంది',
    navUses: 'ఉపయోగాలు',
    navAbout: 'గురించి',
    navLogin: 'లాగిన్',
    navLogout: 'లాగ్అవుట్',
    navProfile: 'ప్రొఫైల్',
    navDashboard: 'డ్యాష్‌బోర్డ్',
    navIntroGuide: 'పరిచయం',
    backToHome: 'హోమ్‌కు తిరిగి వెళ్ళు',

    heroBadge: 'ఉపగ్రహ + AI నీటి మేధస్సు',
    heroHeadingLine1: 'నీటిని చూడండి.',
    heroHeadingLine2: 'మార్పును అంచనా వేయండి.',
    heroDescription:
      'ఉపగ్రహ చిత్రాలు మరియు AI ఆధారిత నీటి విశ్లేషణతో చెరువులు మరియు జలాశయాలను పర్యవేక్షించండి.',
    btnGetStarted: 'ప్రారంభించండి',
    btnHowItWorks: 'ఎలా పనిచేస్తుంది',
    cardWaterArea: 'నీటి విస్తీర్ణం',
    cardDroughtRisk: 'కరువు ప్రమాదం',
    riskModerate: 'మధ్యస్థం',
    riskLow: 'సురక్షితం',
    riskHigh: 'అధికం',

    howTitle: 'HydroScope ఎలా పనిచేస్తుంది',
    howSubtitle: 'ఉపగ్రహ చిత్రాల నుండి ఆచరణాత్మక నీటి సమాచారం వరకు.',
    step1Title: 'పరిశీలన (Observe)',
    step1LandingDesc:
      'చెరువులు మరియు జలాశయాల ఉపరితల నీటి విస్తీర్ణాన్ని పర్యవేక్షించడానికి ఉపగ్రహ చిత్రాలు ఉపయోగించబడతాయి.',
    step1IntroDesc: 'ఉపగ్రహ చిత్రాల ద్వారా కనిపించే ఉపరితల నీటి మార్పులను పర్యవేక్షించండి.',
    step2Title: 'విశ్లేషణ (Analyze)',
    step2LandingDesc:
      'HydroScope గత నీటి విస్తీర్ణ ధోరణులను విశ్లేషించి ముఖ్యమైన మార్పులను గుర్తిస్తుంది.',
    step2IntroDesc: 'చారిత్రక నమూనాలను అర్థం చేసుకోండి మరియు ముఖ్యమైన మార్పులను గుర్తించండి.',
    step3Title: 'అంచనా (Predict)',
    step3LandingDesc:
      'AI ఆధారిత అంచనా భవిష్యత్తు నీటి ఒత్తిడిని మరియు కరువు ప్రమాదాన్ని గుర్తించడంలో సహాయపడుతుంది.',
    step3IntroDesc: 'భవిష్యత్తు నీటి ధోరణులను మరియు నీటి ఎద్దడిని ముందే అంచనా వేయండి.',

    glanceTitle: 'ఒక చూపులో నీటి మేధస్సు',
    glanceSubtitle: 'చెరువులు మరియు జలాశయాలను అర్థం చేసుకోవడానికి సరళమైన సమాచారం.',
    glance1Title: 'ఉపగ్రహ పర్యవేక్షణ',
    glance1Desc: 'చెరువులు మరియు జలాశయాలను దూరం నుండే పర్యవేక్షించండి.',
    glance2Title: 'చారిత్రక ధోరణులు',
    glance2Desc: 'కాలక్రమేణా నీటి విస్తీర్ణం ఎలా మారుతుందో తెలుసుకోండి.',
    glance3Title: 'AI భవిష్యత్తు అంచనా',
    glance3Desc: 'భవిష్యత్తులో నీటి ఒత్తిడిని గుర్తించండి.',
    glance4Title: 'కరువు అవగాహన',
    glance4Desc: 'పరిస్థితులు తీవ్రమయ్యే ముందే ముందస్తు హెచ్చరికలను గుర్తించండి.',
    landingCtaTitle: 'మీ నీటి వనరులను అర్థం చేసుకోవడానికి సిద్ధంగా ఉన్నారా?',
    landingCtaSubtitle: 'HydroScope తో ఉపగ్రహ ఆధారిత నీటి సమాచారాన్ని అన్వేషించండి.',

    loginWelcomeBack: 'తిరిగి స్వాగతం',
    loginSubtitle: 'HydroScope కొనసాగించడానికి సైన్ ఇన్ చేయండి',
    signupTitle: 'ఖాతాను సృష్టించండి',
    signupSubtitle: 'HydroScope ఉపయోగించడానికి నమోదు చేయండి',
    forgotTitle: 'పాస్‌వర్డ్ రీసెట్ చేయండి',
    forgotSubtitle: 'రీసెట్ లింక్ కోసం మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి',
    labelFullName: 'పూర్తి పేరు',
    labelEmail: 'ఇమెయిల్',
    labelPassword: 'పాస్‌వర్డ్',
    placeholderEmail: 'name@example.com',
    placeholderPassword: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
    showPassword: 'పాస్‌వర్డ్ చూపించు',
    hidePassword: 'పాస్‌వర్డ్ దాచు',
    rememberMe: 'నన్ను గుర్తుంచుకో',
    forgotPasswordLink: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    btnLogin: 'లాగిన్',
    btnSigningIn: 'సైన్ ఇన్ అవుతోంది...',
    btnCreateAccount: 'సైన్ అప్',
    btnSendResetLink: 'రీసెట్ లింక్ పంపండి',
    orDivider: 'లేదా',
    btnContinueGoogle: 'Google తో కొనసాగించండి',
    noAccountPrompt: 'ఖాతా లేదా?',
    signUpLink: 'సైన్ అప్',
    haveAccountPrompt: 'ఇప్పటికే ఖాతా ఉందా?',
    signInLink: 'లాగిన్',
    quickDemoAccess: 'త్వరిత డెమో యాక్సెస్',
    fillDemoCredentials: 'డెమో వివరాలు నింపండి',
    errEnterName: 'దయచేసి మీ పూర్తి పేరును నమోదు చేయండి.',
    errEnterEmail: 'దయచేసి మీ ఇమెయిల్ చిరునామాను నమోదు చేయండి.',
    errValidEmail: 'దయచేసి సరైన ఇమెయిల్ చిరునామాను నమోదు చేయండి.',
    errEnterPassword: 'దయచేసి మీ పాస్‌వర్డ్ నమోదు చేయండి.',
    errShortPassword: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.',
    errInvalidCredentials: 'తప్పు ఇమెయిల్ లేదా పాస్‌వర్డ్.',
    errGoogleCancelled: 'Google సైన్-ఇన్ రద్దు చేయబడింది.',
    googlePopupTitle: 'ఖాతాను ఎంచుకోండి',
    googlePopupSubtitle: 'HydroScope కు కొనసాగడానికి',

    introWelcomeTitle: 'HydroScope కు స్వాగతం',
    introWelcomeSubtitle:
      'నీటి మార్పులను అర్థం చేసుకోండి. ప్రమాదాలను గుర్తించండి. సరైన నిర్ణయాలు తీసుకోండి.',
    introWelcomeDesc:
      'చెరువులు మరియు జలాశయాలలో మార్పులను అర్థం చేసుకోవడానికి HydroScope ఉపగ్రహ చిత్రాలు, చారిత్రక విశ్లేషణ మరియు AI అంచనాలను కలుపుతుంది.',
    introUsesHeading: 'HydroScope మీకు ఎలా సహాయపడుతుంది?',
    introUsesSubtitle: 'సులభమైన నిర్ణయాల కోసం రూపొందించబడిన 5 ముఖ్య సదుపాయాలు.',
    use1Title: 'నీటి పర్యవేక్షణ',
    use1Desc: 'చెరువులు మరియు జలాశయాల ఉపరితల నీటి విస్తీర్ణంలో మార్పులను ట్రాక్ చేయండి.',
    use2Title: 'చారిత్రక విశ్లేషణ',
    use2Desc: 'ప్రస్తుత నీటి పరిస్థితులను గత చారిత్రక ధోరణులతో పోల్చండి.',
    use3Title: 'AI ఆధారిత విశ్లేషణ',
    use3Desc: 'అసాధారణ మార్పులు మరియు ముఖ్యమైన నమూనాలను గుర్తించండి.',
    use4Title: 'భవిష్యత్తు అంచనా',
    use4Desc: 'నీటి విస్తీర్ణ ధోరణులలో ఆశించిన మార్పులను అర్థం చేసుకోండి.',
    use5Title: 'కరువు ప్రమాద అవగాహన',
    use5Desc: 'పెరుగుతున్న నీటి ఒత్తిడి యొక్క ముందస్తు సంకేతాలను గుర్తించండి.',
    whyHeading: 'HydroScope ఎందుకు ముఖ్యం',
    whyDesc:
      'నీటి పరిస్థితులు క్రమంగా మారవచ్చు. ఉపగ్రహ పరిశీలనలు, చారిత్రక ధోరణులు మరియు AI అంచనాలను కలపడం ద్వారా ఈ మార్పులను ముందుగానే అర్థం చేసుకోవడానికి HydroScope సహాయపడుతుంది.',
    whyBenefit1: 'దూరం నుండే పర్యవేక్షించండి',
    whyBenefit2: 'కాలక్రమేణా మార్పులను అర్థం చేసుకోండి',
    whyBenefit3: 'ప్రమాదాలు పెరిగే ముందే స్పందించండి',
    disclaimerNote:
      'గమనిక: HydroScope ఉపగ్రహ చిత్రాల ద్వారా కనిపించే ఉపరితల నీటి విస్తీర్ణాన్ని (Surface-Water Area) మాత్రమే పర్యవేక్షిస్తుంది. ఇది భూగర్భ జల మట్టాన్ని లేదా నీటి లోతును నేరుగా కొలవదు.',
    introCtaHeading: 'HydroScope అన్వేషించడానికి సిద్ధంగా ఉన్నారా?',
    introCtaSubtitle: 'మీరు ఎంచుకున్న జలాశయం కోసం ఉపగ్రహ ఆధారిత నీటి సమాచారాన్ని చూడండి.',
    btnOpenDashboard: 'డ్యాష్‌బోర్డ్ తెరవండి →',

    tabOverview: 'అవలోకనం',
    tabAnalysis: 'నీటి విశ్లేషణ',
    tabTrends: 'ధోరణులు',
    tabForecast: 'అంచనా',
    tabRisk: 'కరువు ప్రమాదం',
    tabAbout: 'గురించి / విధానం',
    btnExploreDemo: 'డెమో చూడండి',
    dashQuestionHeading: 'నా జలాశయంలో ఏమి జరుగుతోంది?',
    dashQuestionSubtitle:
      'ఉపగ్రహ డేటాను ఉపయోగించి నీటి విస్తీర్ణాన్ని పర్యవేక్షించండి మరియు కరువు ప్రమాదాన్ని అంచనా వేయండి.',
    labelSelectWaterBody: 'జలాశయాన్ని ఎంచుకోండి',
    placeholderSearchWaterBody: 'చెరువు, జలాశయం లేదా ప్రాంతాన్ని వెతకండి...',
    btnAnalyzeWaterBody: 'జలాశయాన్ని విశ్లేషించండి',
    btnUseCurrentLocation: 'ప్రస్తుత స్థానం',
    btnTryExample: 'ఉదాహరణ చూడండి',
    btnClear: 'క్లియర్',
    labelMonitoredWaterBodies: 'పర్యవేక్షించబడుతున్న జలాశయాలు:',
    statusHeading: 'ప్రస్తుత స్థితి',
    surfaceAreaNote:
      'HydroScope ఉపగ్రహ చిత్రాల ద్వారా ఉపరితల నీటి విస్తీర్ణాన్ని కొలుస్తుంది (నేరుగా నీటి లోతును కాదు).',
    labelWaterSurfaceArea: 'నీటి ఉపరితల విస్తీర్ణం',
    fromBaseline: 'సగటు నుండి',
    labelDroughtRisk: 'కరువు ప్రమాదం',
    labelLastUpdated: 'చివరిగా నవీకరించబడింది',
    statusHealthy: 'సురక్షితం (తక్కువ ప్రమాదం)',
    statusWatch: 'గమనించండి (మధ్యస్థం)',
    statusAtRisk: 'ప్రమాదంలో ఉంది (అధికం)',
    aiInsightTitle: 'AI విశ్లేషణ',
    aiWhatChanged: 'ఏమి మారింది?',
    aiWhyItMatters: 'ఇది ఎందుకు ముఖ్యం?',
    aiWhatToWatch: 'ఏమి గమనించాలి?',
    btnCompareDates: 'తేదీలను పోల్చండి',
    btnViewTrends: 'ధోరణులను చూడండి',
    btnViewForecast: 'అంచనాను చూడండి',
    btnHowItWorksShort: 'ఎలా పనిచేస్తుంది',
    emptyChooseTitle: 'ప్రారంభించడానికి జలాశయాన్ని ఎంచుకోండి',
    emptyChooseDesc: 'ఉపగ్రహ నీటి సమాచారం కోసం చెరువు లేదా జలాశయాన్ని వెతకండి.',
    btnExplore: 'అన్వేషించండి',
    loadingSatellite: 'ఉపగ్రహ డేటా విశ్లేషించబడుతోంది...',
    dataUnavailableTitle: 'డేటా తాత్కాలికంగా అందుబాటులో లేదు',
    dataUnavailableDesc: 'మరొక ప్రాంతం లేదా తేదీని ప్రయత్నించండి.',
  },

  kn: {
    brandSubtitle: 'ಉಪಗ್ರಹ-AI ಜಲ ಬುದ್ಧಿಮತ್ತೆ',
    tagline: 'ನೀರನ್ನು ನೋಡಿ. ಬದಲಾವಣೆಯನ್ನು ಊಹಿಸಿ. ಬರಗಾಲಕ್ಕೆ ಮುನ್ನ செயல்பಡಿ.',
    navHome: 'ಮುಖಪುಟ',
    navHowItWorks: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    navUses: 'ഉಪಯೋಗಗಳು',
    navAbout: 'ಬಗ್ಗೆ',
    navLogin: 'ಲಾಗಿನ್',
    navLogout: 'ಲಾಗ್ಔಟ್',
    navProfile: 'ಪ್ರೊಫೈಲ್',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navIntroGuide: 'ಪರಿಚಯ',
    backToHome: 'ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ',

    heroBadge: 'ಉಪಗ್ರಹ + AI ಜಲ ಬುದ್ಧಿಮತ್ತೆ',
    heroHeadingLine1: 'ನೀರನ್ನು ನೋಡಿ.',
    heroHeadingLine2: 'ಬದಲಾವಣೆಯನ್ನು ಊಹಿಸಿ.',
    heroDescription:
      'ಉಪಗ್ರಹ ಚಿತ್ರಣ ಮತ್ತು AI ಆಧಾರಿತ ನೀರಿನ ವಿಶ್ಲೇಷಣೆಯೊಂದಿಗೆ ಕೆರೆಗಳು ಮತ್ತು ಜಲಾಶಯಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ.',
    btnGetStarted: 'ಪ್ರಾರಂಭಿಸಿ',
    btnHowItWorks: 'ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    cardWaterArea: 'ನೀರಿನ ವಿಸ್ತೀರ್ಣ',
    cardDroughtRisk: 'ಬರಗಾಲದ ಅಪಾಯ',
    riskModerate: 'ಮಧ್ಯಮ',
    riskLow: 'ಸುರಕ್ಷಿತ',
    riskHigh: 'ಹೆಚ್ಚು',

    howTitle: 'HydroScope ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    howSubtitle: 'ಉಪಗ್ರಹ ಚಿತ್ರಣದಿಂದ ಉಪಯುಕ್ತ ಜಲ ಮಾಹಿತಿಯವರೆಗೆ.',
    step1Title: 'ಗಮನಿಸಿ (Observe)',
    step1LandingDesc:
      'ಕೆರೆಗಳು ಮತ್ತು ಜಲಾಶಯಗಳ ಗೋಚರ ಮೇಲ್ಮೈ ನೀರಿನ ವಿಸ್ತೀರ್ಣವನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲು ಉಪಗ್ರಹ ಚಿತ್ರಗಳನ್ನು ಬಳಸಲಾಗುತ್ತದೆ.',
    step1IntroDesc: 'ಉಪಗ್ರಹ ಚಿತ್ರಣವನ್ನು ಬಳಸಿ ಮೇಲ್ಮೈ ನೀರಿನ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸಿ.',
    step2Title: 'ವಿಶ್ಲೇಷಿಸಿ (Analyze)',
    step2LandingDesc:
      'HydroScope ಐತಿಹಾಸಿಕ ನೀರಿನ ವಿಸ್ತೀರ್ಣದ ಮಾದರಿಗಳನ್ನು ವಿಶ್ಲೇಷಿಸುತ್ತದೆ ಮತ್ತು ಪ್ರಮುಖ ಬದಲಾವಣೆಗಳನ್ನು ಗುರುತಿಸುತ್ತದೆ.',
    step2IntroDesc: 'ಐತಿಹಾಸಿಕ ಮಾದರಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ ಮತ್ತು ಪ್ರಮುಖ ಬದಲಾವಣೆಗಳನ್ನು ಗುರುತಿಸಿ.',
    step3Title: 'ಊಹಿಸಿ (Predict)',
    step3LandingDesc:
      'AI ಮುನ್ಸೂಚನೆಯು ಭವಿಷ್ಯದ ನೀರಿನ ಒತ್ತಡ ಮತ್ತು ಸಂಭಾವ್ಯ ಬರಗಾಲದ ಅಪಾಯವನ್ನು ಗುರುತಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    step3IntroDesc: 'ಭವಿಷ್ಯದ ನೀರಿನ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು ಸಂಭಾವ್ಯ ನೀರಿನ ಒತ್ತಡವನ್ನು ಮುನ್ಸೂಚಿಸಿ.',

    glanceTitle: 'ಒಂದು ನೋಟದಲ್ಲಿ ಜಲ ಮಾಹಿತಿ',
    glanceSubtitle: 'ಕೆರೆಗಳು ಮತ್ತು ಜಲಾಶಯಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸರಳ, ವಿಶ್ವಾಸಾರ್ಹ ಒಳನೋಟಗಳು.',
    glance1Title: 'ಉಪಗ್ರಹ ಮೇಲ್ವಿಚಾರಣೆ',
    glance1Desc: 'ಕೆರೆಗಳು ಮತ್ತು ಜಲಾಶಯಗಳನ್ನು ದೂರದಿಂದಲೇ ಗಮನಿಸಿ.',
    glance2Title: 'ಐತಿಹಾಸಿಕ ಪ್ರವೃತ್ತಿಗಳು',
    glance2Desc: 'ಕಾಲಾನಂತರದಲ್ಲಿ ನೀರಿನ ವಿಸ್ತೀರ್ಣ ಹೇಗೆ ಬದಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ತಿಳಿಯಿರಿ.',
    glance3Title: 'AI ಮುನ್ಸೂಚನೆ',
    glance3Desc: 'ಭವಿಷ್ಯದ ನೀರಿನ ಒತ್ತಡವನ್ನು ಗುರುತಿಸಿ.',
    glance4Title: 'ಬರಗಾಲದ ಜಾಗೃತಿ',
    glance4Desc: 'ಪರಿಸ್ಥಿತಿ ಹದಗೆಡುವ ಮುನ್ನವೇ ಆರಂಭಿಕ ಎಚ್ಚರಿಕೆಗಳನ್ನು ಪಡೆಯಿರಿ.',
    landingCtaTitle: 'ನಿಮ್ಮ ಜಲಮೂಲವನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    landingCtaSubtitle: 'HydroScope ನೊಂದಿಗೆ ಉಪಗ್ರಹ ಆಧಾರಿತ ಜಲ ಬುದ್ಧಿಮತ್ತೆಯನ್ನು ಅನ್ವೇಷಿಸಿ.',

    loginWelcomeBack: 'ಮತ್ತೆ ಸ್ವಾಗತ',
    loginSubtitle: 'HydroScope ಮುಂದುವರಿಸಲು ಸೈನ್ ಇನ್ ಮಾಡಿ',
    signupTitle: 'ಖಾತೆಯನ್ನು ರಚಿಸಿ',
    signupSubtitle: 'HydroScope ಬಳಸಲು ನೋಂದಾಯಿಸಿ',
    forgotTitle: 'ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ',
    forgotSubtitle: 'ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಪಡೆಯಲು ನಿಮ್ಮ ಇಮೇಲ್ ನಮೂದಿಸಿ',
    labelFullName: 'ಪೂರ್ಣ ಹೆಸರು',
    labelEmail: 'ಇಮೇಲ್',
    labelPassword: 'ಪಾಸ್‌ವರ್ಡ್',
    placeholderEmail: 'name@example.com',
    placeholderPassword: 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ',
    showPassword: 'ಪಾಸ್‌ವರ್ಡ್ ತೋರಿಸಿ',
    hidePassword: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆಮಾಡಿ',
    rememberMe: 'ನನ್ನನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳಿ',
    forgotPasswordLink: 'ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರುವಿರಾ?',
    btnLogin: 'ಲಾಗಿನ್',
    btnSigningIn: 'ಸೈನ್ ಇನ್ ಆಗುತ್ತಿದೆ...',
    btnCreateAccount: 'ಸೈನ್ ಅಪ್',
    btnSendResetLink: 'ಲಿಂಕ್ ಕಳುಹಿಸಿ',
    orDivider: 'ಅಥವಾ',
    btnContinueGoogle: 'Google ನೊಂದಿಗೆ ಮುಂದುವರಿಯಿರಿ',
    noAccountPrompt: 'ಖಾತೆ ಇಲ್ಲವೇ?',
    signUpLink: 'ಸೈನ್ ಅಪ್',
    haveAccountPrompt: 'ಈಗಾಗಲೇ ಖಾತೆ ಇದೆಯೇ?',
    signInLink: 'ಲಾಗಿನ್',
    quickDemoAccess: 'ತ್ವರಿತ ಡೆಮೊ ಪ್ರವೇಶ',
    fillDemoCredentials: 'ಡೆಮೊ ವಿವರಗಳನ್ನು ತುಂಬಿಸಿ',
    errEnterName: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ.',
    errEnterEmail: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.',
    errValidEmail: 'ದಯವಿಟ್ಟು ಮಾನ್ಯವಾದ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ.',
    errEnterPassword: 'ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ.',
    errShortPassword: 'ಪಾಸ್‌ವರ್ಡ್ ಕನಿಷ್ಠ 6 ಅಕ್ಷರಗಳಾಗಿರಬೇಕು.',
    errInvalidCredentials: 'ಅಮಾನ್ಯ ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್.',
    errGoogleCancelled: 'Google ಸೈನ್-ಇನ್ ರದ್ದುಗೊಳಿಸಲಾಗಿದೆ.',
    googlePopupTitle: 'ಖಾತೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    googlePopupSubtitle: 'HydroScope ಗೆ ಮುಂದುವರಿಯಲು',

    introWelcomeTitle: 'HydroScope ಗೆ ಸ್ವಾಗತ',
    introWelcomeSubtitle:
      'ನೀರಿನ ಬದಲಾವಣೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ. ಅಪಾಯಗಳನ್ನು ಗುರುತಿಸಿ. ಸೂಕ್ತ ನಿರ್ಧಾರಗಳನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ.',
    introWelcomeDesc:
      'ಕೆರೆಗಳು ಮತ್ತು ಜಲಾಶಯಗಳಲ್ಲಿನ ಬದಲಾವಣೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು HydroScope ಉಪಗ್ರಹ ಚಿತ್ರಣ, ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆ ಮತ್ತು AI ಮುನ್ಸೂಚನೆಯನ್ನು ಸಂಯೋಜಿಸುತ್ತದೆ.',
    introUsesHeading: 'HydroScope ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡುತ್ತದೆ?',
    introUsesSubtitle: 'ದೈನಂದಿನ ನಿರ್ಧಾರಗಳಿಗಾಗಿ ವಿನ್ಯಾಸಗೊಳಿಸಲಾದ 5 ಪ್ರಮುಖ ಸೌಲಭ್ಯಗಳು.',
    use1Title: 'ನೀರಿನ ಮೇಲ್ವಿಚಾರಣೆ',
    use1Desc: 'ಕೆರೆಗಳು ಮತ್ತು ಜಲಾಶಯಗಳ ಗೋಚರ ಮೇಲ್ಮೈ ವಿಸ್ತೀರ್ಣದಲ್ಲಿನ ಬದಲಾವಣೆಗಳನ್ನು ಗಮನಿಸಿ.',
    use2Title: 'ಐತಿಹಾಸಿಕ ವಿಶ್ಲೇಷಣೆ',
    use2Desc: 'ಪ್ರಸ್ತುತ ನೀರಿನ ಸ್ಥಿತಿಯನ್ನು ಐತಿಹಾಸಿಕ ಪ್ರವೃತ್ತಿಗಳೊಂದಿಗೆ ಹೋಲಿಸಿ.',
    use3Title: 'AI ಆಧಾರಿತ ವಿಶ್ಲೇಷಣೆ',
    use3Desc: 'ಅಸಾಮಾನ್ಯ ಬದಲಾವಣೆಗಳು ಮತ್ತು ಪ್ರಮುಖ ಮಾದರಿಗಳನ್ನು ಗುರುತಿಸಿ.',
    use4Title: 'ಭವಿಷ್ಯದ ಮುನ್ಸೂಚನೆ',
    use4Desc: 'ನೀರಿನ ವಿಸ್ತೀರ್ಣ ಪ್ರವೃತ್ತಿಗಳಲ್ಲಿ ನಿರೀಕ್ಷಿತ ಬದಲಾವಣೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ.',
    use5Title: 'ಬರಗಾಲದ ಅಪಾಯದ ಜಾಗೃತಿ',
    use5Desc: 'ಹೆಚ್ಚುತ್ತಿರುವ ನೀರಿನ ಒತ್ತಡದ ಆರಂಭಿಕ ಸಂಕೇತಗಳನ್ನು ಗುರುತಿಸಿ.',
    whyHeading: 'HydroScope ಏಕೆ ಮುಖ್ಯ',
    whyDesc:
      'ನೀರಿನ ಪರಿಸ್ಥಿತಿಗಳು ಕ್ರಮೇಣ ಬದಲಾಗಬಹುದು. ಉಪಗ್ರಹ ವೀಕ್ಷಣೆಗಳು, ಐತಿಹಾಸಿಕ ಪ್ರವೃತ್ತಿಗಳು ಮತ್ತು AI ಮುನ್ಸೂಚನೆಯನ್ನು ಸಂಯೋಜಿಸುವ ಮೂಲಕ ಈ ಬದಲಾವಣೆಗಳನ್ನು ಮುಂಚಿತವಾಗಿ ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು HydroScope ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
    whyBenefit1: 'ದೂರದಿಂದಲೇ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ',
    whyBenefit2: 'ಕಾಲಾನಂತರದಲ್ಲಿ ಬದಲಾವಣೆಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಿ',
    whyBenefit3: 'ಅಪಾಯಗಳು ಹೆಚ್ಚಾಗುವ ಮುನ್ನ ಕಾರ್ಯನಿರ್ವಹಿಸಿ',
    disclaimerNote:
      'ಗಮನಿಸಿ: HydroScope ಉಪಗ್ರಹ ಚಿತ್ರಣವನ್ನು ಬಳಸಿ ಗೋಚರ ಮೇಲ್ಮೈ ನೀರಿನ ವಿಸ್ತೀರ್ಣವನ್ನು (Surface-Water Area) ಮಾತ್ರ ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡುತ್ತದೆ. ಇದು ಅಂತರ್ಜಲ ಮಟ್ಟ ಅಥವಾ ನೀರಿನ ಆಳವನ್ನು ನೇರವಾಗಿ ಅಳೆಯುವುದಿಲ್ಲ.',
    introCtaHeading: 'HydroScope ಅನ್ವೇಷಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?',
    introCtaSubtitle: 'ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ ಜಲಾಶಯದ ಉಪಗ್ರಹ ಆಧಾರಿತ ಜಲ ಮಾಹಿತಿಯನ್ನು ವೀಕ್ಷಿಸಿ.',
    btnOpenDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ →',

    tabOverview: 'ಅವಲೋಕನ',
    tabAnalysis: 'ನೀರಿನ ವಿಶ್ಲೇಷಣೆ',
    tabTrends: 'ಪ್ರವೃತ್ತಿಗಳು',
    tabForecast: 'ಮುನ್ಸೂಚನೆ',
    tabRisk: 'ಬರಗಾಲದ ಅಪಾಯ',
    tabAbout: 'ಬಗ್ಗೆ / ವಿಧಾನ',
    btnExploreDemo: 'ಡೆಮೊ ವೀಕ್ಷಿಸಿ',
    dashQuestionHeading: 'ನನ್ನ ಜಲಾಶಯದಲ್ಲಿ ಏನು ನಡೆಯುತ್ತಿದೆ?',
    dashQuestionSubtitle:
      'ಉಪಗ್ರಹ ಡೇಟಾವನ್ನು ಬಳಸಿ ನೀರಿನ ವಿಸ್ತೀರ್ಣವನ್ನು ಗಮನಿಸಿ ಮತ್ತು ಬರಗಾಲದ ಅಪಾಯವನ್ನು ಮುಂಗಾಣಿರಿ.',
    labelSelectWaterBody: 'ಜಲಾಶಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    placeholderSearchWaterBody: 'ಕೆರೆ, ಜಲಾಶಯ ಅಥವಾ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ...',
    btnAnalyzeWaterBody: 'ಜಲಾಶಯವನ್ನು ವಿಶ್ಲೇಷಿಸಿ',
    btnUseCurrentLocation: 'ಪ್ರಸ್ತುತ ಸ್ಥಳ ಬಳಸಿ',
    btnTryExample: 'ಉದಾಹರಣೆ ನೋಡಿ',
    btnClear: 'ತೆರವುಗೊಳಿಸಿ',
    labelMonitoredWaterBodies: 'ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಲಾದ ಜಲಾಶಯಗಳು:',
    statusHeading: 'ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ',
    surfaceAreaNote:
      'HydroScope ಉಪಗ್ರಹ ಚಿತ್ರಣದ ಮೂಲಕ ಮೇಲ್ಮೈ ನೀರಿನ ವಿಸ್ತೀರ್ಣವನ್ನು ಅಳೆಯುತ್ತದೆ (ನೇರ ಆಳವನ್ನಲ್ಲ).',
    labelWaterSurfaceArea: 'ಮೇಲ್ಮೈ ನೀರಿನ ವಿಸ್ತೀರ್ಣ',
    fromBaseline: 'ಸರಾಸರಿಯಿಂದ',
    labelDroughtRisk: 'ಬರಗಾಲದ ಅಪಾಯ',
    labelLastUpdated: 'ಕೊನೆಯ ನವೀಕರಣ',
    statusHealthy: 'ಸುರಕ್ಷಿತ (ಕಡಿಮೆ ಅಪಾಯ)',
    statusWatch: 'ಗಮನಿಸಿ (ಮಧ್ಯಮ)',
    statusAtRisk: 'ಅಪಾಯದಲ್ಲಿದೆ (ಹೆಚ್ಚು)',
    aiInsightTitle: 'AI ಒಳನೋಟ',
    aiWhatChanged: 'ಏನು ಬದಲಾಗಿದೆ?',
    aiWhyItMatters: 'ಇದು ಏಕೆ ಮುಖ್ಯ?',
    aiWhatToWatch: 'ಏನನ್ನು ಗಮನಿಸಬೇಕು?',
    btnCompareDates: 'ದಿನಾಂಕಗಳನ್ನು ಹೋಲಿಸಿ',
    btnViewTrends: 'ಪ್ರವೃತ್ತಿಗಳನ್ನು ನೋಡಿ',
    btnViewForecast: 'ಮುನ್ಸೂಚನೆ ನೋಡಿ',
    btnHowItWorksShort: 'ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ',
    emptyChooseTitle: 'ಪ್ರಾರಂಭಿಸಲು ಜಲಾಶಯವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    emptyChooseDesc: 'ಉಪಗ್ರಹ ಜಲ ಮಾಹಿತಿಗಾಗಿ ಕೆರೆ ಅಥವಾ ಜಲಾಶಯವನ್ನು ಹುಡುಕಿ.',
    btnExplore: 'ಅನ್ವೇಷಿಸಿ',
    loadingSatellite: 'ಉಪಗ್ರಹ ಡೇಟಾವನ್ನು ವಿಶ್ಲೇಷಿಸಲಾಗುತ್ತಿದೆ...',
    dataUnavailableTitle: 'ಡೇಟಾ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ',
    dataUnavailableDesc: 'ಮತ್ತೊಂದು ಸ್ಥಳ ಅಥವಾ ದಿನಾಂಕವನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
  },

  ml: {
    brandSubtitle: 'ഉപഗ്രഹ-AI ജല ഇന്റലിജൻസ്',
    tagline: 'ജലം കാണുക. മാറ്റം പ്രവചിക്കുക. വരൾച്ചയ്ക്ക് മുമ്പ് പ്രവർത്തിക്കുക.',
    navHome: 'ഹോം',
    navHowItWorks: 'പ്രവർത്തന രീതി',
    navUses: 'ഉപയോഗങ്ങൾ',
    navAbout: 'കുറിച്ച്',
    navLogin: 'ലോഗിൻ',
    navLogout: 'ലോഗൗട്ട്',
    navProfile: 'പ്രൊഫൈൽ',
    navDashboard: 'ഡാഷ്‌ബോർഡ്',
    navIntroGuide: 'ആമുഖം',
    backToHome: 'ഹോമിലേക്ക് മടങ്ങുക',

    heroBadge: 'ഉപഗ്രഹ + AI ജല ഇന്റലിജൻസ്',
    heroHeadingLine1: 'ജലം കാണുക.',
    heroHeadingLine2: 'മാറ്റം പ്രവചിക്കുക.',
    heroDescription:
      'ഉപഗ്രഹ ചിത്രങ്ങളും AI അധിഷ്ഠിത ജല വിശകലനവും ഉപയോഗിച്ച് തടാകങ്ങളെയും ജലാശയങ്ങളെയും നിരീക്ഷിക്കുക.',
    btnGetStarted: 'ആരംഭിക്കുക',
    btnHowItWorks: 'പ്രവർത്തന രീതി',
    cardWaterArea: 'ജല വിസ്തൃതി',
    cardDroughtRisk: 'വരൾച്ചാ സാധ്യത',
    riskModerate: 'മിതമായത്',
    riskLow: 'സുരക്ഷിതം',
    riskHigh: 'ഉയർന്നത്',

    howTitle: 'HydroScope എങ്ങനെ പ്രവർത്തിക്കുന്നു',
    howSubtitle: 'ഉപഗ്രഹ ചിത്രങ്ങളിൽ നിന്ന് പ്രായോഗിക ജല വിവരങ്ങളിലേക്ക്.',
    step1Title: 'നിരീക്ഷിക്കുക (Observe)',
    step1LandingDesc:
      'തടാകങ്ങളുടെയും ജലാശയങ്ങളുടെയും ഉപരിതല ജല വിസ്തൃതി നിരീക്ഷിക്കാൻ ഉപഗ്രഹ ചിത്രങ്ങൾ ഉപയോഗിക്കുന്നു.',
    step1IntroDesc: 'ഉപഗ്രഹ ചിത്രങ്ങൾ ഉപയോഗിച്ച് ഉപരിതല ജലത്തിലെ മാറ്റങ്ങൾ നിരീക്ഷിക്കുക.',
    step2Title: 'വിശകലനം (Analyze)',
    step2LandingDesc:
      'HydroScope മുൻകാല ജല വിസ്തൃതി പാറ്റേണുകൾ വിശകലനം ചെയ്ത് പ്രധാന മാറ്റങ്ങൾ കണ്ടെത്തുന്നു.',
    step2IntroDesc: 'മുൻകാല പ്രവണതകൾ മനസ്സിലാക്കുകയും പ്രധാന മാറ്റങ്ങൾ തിരിച്ചറിയുകയും ചെയ്യുക.',
    step3Title: 'പ്രവചിക്കുക (Predict)',
    step3LandingDesc:
      'AI പ്രവചനം ഭാവിയിലെ ജല ദൗർലഭ്യവും വരൾച്ചാ സാധ്യതയും തിരിച്ചറിയാൻ സഹായിക്കുന്നു.',
    step3IntroDesc: 'ഭാവിയിലെ ജല പ്രവണതകളും വരൾച്ചാ സാധ്യതയും മുൻകൂട്ടി അറിയുക.',

    glanceTitle: 'ജല വിവരങ്ങൾ ഒറ്റനോട്ടത്തിൽ',
    glanceSubtitle: 'തടാകങ്ങളെയും ജലാശയങ്ങളെയും മനസ്സിലാക്കാൻ ലളിതവും വിശ്വസനീയവുമായ വിവരങ്ങൾ.',
    glance1Title: 'ഉപഗ്രഹ നിരീക്ഷണം',
    glance1Desc: 'തടാകങ്ങളെയും ജലാശയങ്ങളെയും വിദൂരമായി നിരീക്ഷിക്കുക.',
    glance2Title: 'മുൻകാല പ്രവണതകൾ',
    glance2Desc: 'കാലക്രമേണ ജല വിസ്തൃതി എങ്ങനെ മാറുന്നുവെന്ന് മനസ്സിലാക്കുക.',
    glance3Title: 'AI പ്രവചനം',
    glance3Desc: 'ഭാവിയിലെ ജല സമ്മർദ്ദം തിരിച്ചറിയുക.',
    glance4Title: 'വരൾച്ചാ മുന്നറിയിപ്പ്',
    glance4Desc: 'സാഹചര്യങ്ങൾ രൂക്ഷമാകുന്നതിന് മുമ്പ് പ്രാരംഭ സൂചനകൾ കണ്ടെത്തുക.',
    landingCtaTitle: 'നിങ്ങളുടെ ജലസ്രോതസ്സുകളെ മനസ്സിലാക്കാൻ തയ്യാറാണോ?',
    landingCtaSubtitle: 'HydroScope ഉപയോഗിച്ച് ഉപഗ്രഹ ജല വിവരങ്ങൾ പര്യവേക്ഷണം ചെയ്യുക.',

    loginWelcomeBack: 'സ്വാഗതം',
    loginSubtitle: 'HydroScope-ലേക്ക് തുടരാൻ സൈൻ ഇൻ ചെയ്യുക',
    signupTitle: 'അക്കൗണ്ട് നിർമ്മിക്കുക',
    signupSubtitle: 'HydroScope ഉപയോഗിക്കാൻ രജിസ്റ്റർ ചെയ്യുക',
    forgotTitle: 'പാസ്‌വേഡ് പുനഃക്രമീകരിക്കുക',
    forgotSubtitle: 'റീസെറ്റ് ലിങ്ക് ലഭിക്കാൻ നിങ്ങളുടെ ഇമെയിൽ നൽകുക',
    labelFullName: 'പൂർണ്ണ നാമം',
    labelEmail: 'ഇമെയിൽ',
    labelPassword: 'പാസ്‌വേഡ്',
    placeholderEmail: 'name@example.com',
    placeholderPassword: 'നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക',
    showPassword: 'പാസ്‌വേഡ് കാണിക്കുക',
    hidePassword: 'പാസ്‌വേഡ് മറയ്ക്കുക',
    rememberMe: 'എന്നെ ഓർമ്മിക്കുക',
    forgotPasswordLink: 'പാസ്‌വേഡ് മറന്നോ?',
    btnLogin: 'ലോഗിൻ',
    btnSigningIn: 'സൈൻ ഇൻ ചെയ്യുന്നു...',
    btnCreateAccount: 'സൈൻ അപ്പ്',
    btnSendResetLink: 'ലിങ്ക് അയയ്ക്കുക',
    orDivider: 'അല്ലെങ്കിൽ',
    btnContinueGoogle: 'Google ഉപയോഗിച്ച് തുടരുക',
    noAccountPrompt: 'അക്കൗണ്ട് ഇല്ലേ?',
    signUpLink: 'സൈൻ അപ്പ്',
    haveAccountPrompt: 'നിലവിൽ അക്കൗണ്ട് ഉണ്ടോ?',
    signInLink: 'ലോഗിൻ',
    quickDemoAccess: 'വേഗത്തിലുള്ള ഡെമോ ആക്സസ്',
    fillDemoCredentials: 'ഡെമോ വിവരങ്ങൾ പൂരിപ്പിക്കുക',
    errEnterName: 'ദയവായി നിങ്ങളുടെ പൂർണ്ണ നാമം നൽകുക.',
    errEnterEmail: 'ദയവായി നിങ്ങളുടെ ഇമെയിൽ വിലാസം നൽകുക.',
    errValidEmail: 'ദയവായി ശരിയായ ഇമെയിൽ വിലാസം നൽകുക.',
    errEnterPassword: 'ദയവായി നിങ്ങളുടെ പാസ്‌വേഡ് നൽകുക.',
    errShortPassword: 'പാസ്‌വേഡിൽ കുറഞ്ഞത് 6 അക്ഷരങ്ങൾ ഉണ്ടായിരിക്കണം.',
    errInvalidCredentials: 'തെറ്റായ ഇമെയിൽ അല്ലെങ്കിൽ പാസ്‌വേഡ്.',
    errGoogleCancelled: 'Google സൈൻ-ഇൻ റദ്ദാക്കി.',
    googlePopupTitle: 'ഒരു അക്കൗണ്ട് തിരഞ്ഞെടുക്കുക',
    googlePopupSubtitle: 'HydroScope-ലേക്ക് തുടരാൻ',

    introWelcomeTitle: 'HydroScope-ലേക്ക് സ്വാഗതം',
    introWelcomeSubtitle:
      'ജലത്തിലെ മാറ്റങ്ങൾ മനസ്സിലാക്കുക. അപകടസാധ്യതകൾ കണ്ടെത്തുക. সঠিক തീരുമാനങ്ങൾ എടുക്കുക.',
    introWelcomeDesc:
      'തടാകങ്ങളിലെയും ജലാശയങ്ങളിലെയും മാറ്റങ്ങൾ മനസ്സിലാക്കാൻ ഉപഗ്രഹ ചിത്രങ്ങൾ, മുൻകാല വിശകലനം, AI പ്രവചനം എന്നിവ HydroScope സംയോജിപ്പിക്കുന്നു.',
    introUsesHeading: 'HydroScope നിങ്ങളെ എങ്ങനെ സഹായിക്കും?',
    introUsesSubtitle: 'ദൈനംദിന തീരുമാനങ്ങൾക്കായി രൂപകൽപ്പന ചെയ്ത 5 പ്രധാന സവിശേഷതകൾ.',
    use1Title: 'ജല നിരീക്ഷണം',
    use1Desc: 'തടാകങ്ങളുടെയും ജലാശയങ്ങളുടെയും ഉപരിതല വിസ്തൃതിയിലുള്ള മാറ്റങ്ങൾ നിരീക്ഷിക്കുക.',
    use2Title: 'മുൻകാല വിശകലനം',
    use2Desc: 'നിലവിലെ ജല സ്ഥിതി മുൻകാല പ്രവണതകളുമായി താരതമ്യം ചെയ്യുക.',
    use3Title: 'AI അധിഷ്ഠിത വിശകലനം',
    use3Desc: 'അസാധാരണമായ മാറ്റങ്ങളും പ്രധാന പാറ്റേണുകളും തിരിച്ചറിയുക.',
    use4Title: 'ഭാവി പ്രവചനം',
    use4Desc: 'ജല വിസ്തൃതിയിൽ പ്രതീക്ഷിക്കുന്ന മാറ്റങ്ങൾ മനസ്സിലാക്കുക.',
    use5Title: 'വരൾച്ചാ സാധ്യതാ ബോധവൽക്കരണം',
    use5Desc: 'വർദ്ധിച്ചുവരുന്ന ജല സമ്മർദ്ദത്തിന്റെ പ്രാരംഭ ലക്ഷണങ്ങൾ തിരിച്ചറിയുക.',
    whyHeading: 'HydroScope എന്തുകൊണ്ട് പ്രധാനമാണ്',
    whyDesc:
      'ജല സാഹചര്യങ്ങൾ സാവധാനത്തിൽ മാറാം. ഉപഗ്രഹ നിരീക്ഷണങ്ങളും മുൻകാല പ്രവണതകളും AI പ്രവചനവും സംയോജിപ്പിക്കുന്നതിലൂടെ ഈ മാറ്റങ്ങൾ നേരത്തെ മനസ്സിലാക്കാനും മികച്ച തീരുമാനങ്ങൾ എടുക്കാനും HydroScope സഹായിക്കുന്നു.',
    whyBenefit1: 'വിദൂരമായി നിരീക്ഷിക്കുക',
    whyBenefit2: 'കാലക്രമേണയുള്ള മാറ്റങ്ങൾ മനസ്സിലാക്കുക',
    whyBenefit3: 'അപകടസാധ്യതകൾ വർദ്ധിക്കുന്നതിന് മുമ്പ് പ്രവർത്തിക്കുക',
    disclaimerNote:
      'ശ്രദ്ധിക്കുക: ഉപഗ്രഹ ചിത്രങ്ങൾ ഉപയോഗിച്ച് ദൃശ്യമായ ഉപരിതല ജല വിസ്തൃതി (Surface-Water Area) മാത്രമാണ് HydroScope നിരീക്ഷിക്കുന്നത്. ഇത് ഭൂഗർഭജല നിരപ്പോ ജലത്തിന്റെ ആഴമോ നേരിട്ട് അളക്കുന്നില്ല.',
    introCtaHeading: 'HydroScope പര്യവേക്ഷണം ചെയ്യാൻ തയ്യാറാണോ?',
    introCtaSubtitle: 'നിങ്ങൾ തിരഞ്ഞെടുത്ത ജലാശയത്തിന്റെ ഉപഗ്രഹ അധിഷ്ഠിത വിവരങ്ങൾ കാണുക.',
    btnOpenDashboard: 'ഡാഷ്‌ബോർഡ് തുറക്കുക →',

    tabOverview: 'അവലോകനം',
    tabAnalysis: 'ജല വിശകലനം',
    tabTrends: 'പ്രവണതകൾ',
    tabForecast: 'പ്രവചനം',
    tabRisk: 'വരൾച്ചാ സാധ്യത',
    tabAbout: 'കുറിച്ച് / രീതിശാസ്ത്രം',
    btnExploreDemo: 'ഡെമോ കാണുക',
    dashQuestionHeading: 'എന്റെ ജലാശയത്തിൽ എന്താണ് സംഭവിക്കുന്നത്?',
    dashQuestionSubtitle:
      'ഉപഗ്രഹ ഡാറ്റ ഉപയോഗിച്ച് ജല വിസ്തൃതി നിരീക്ഷിക്കുകയും വരൾച്ചാ സാധ്യത മുൻകൂട്ടി അറിയുകയും ചെയ്യുക.',
    labelSelectWaterBody: 'ഒരു ജലാശയം തിരഞ്ഞെടുക്കുക',
    placeholderSearchWaterBody: 'തടാകം, ജലാശയം അല്ലെങ്കിൽ സ്ഥലം തിരയുക...',
    btnAnalyzeWaterBody: 'ജലാശയം വിശകലനം ചെയ്യുക',
    btnUseCurrentLocation: 'നിലവിലെ സ്ഥാനം',
    btnTryExample: 'ഒരു ഉദಾಹരണം കാണുക',
    btnClear: 'മായ്ക്കുക',
    labelMonitoredWaterBodies: 'നിരീക്ഷിക്കുന്ന ജലാശയങ്ങൾ:',
    statusHeading: 'നിലവിലെ സ്ഥിതി',
    surfaceAreaNote:
      'HydroScope ഉപഗ്രഹ ചിത്രങ്ങൾ വഴി ഉപരിതല ജല വിസ്തൃതി അളക്കുന്നു (നേരിട്ടുള്ള ആഴമല്ല).',
    labelWaterSurfaceArea: 'ജല ഉപരിതല വിസ്തൃതി',
    fromBaseline: 'ശരാശരിയിൽ നിന്ന്',
    labelDroughtRisk: 'വരൾച്ചാ സാധ്യത',
    labelLastUpdated: 'അവസാനം പുതുക്കിയത്',
    statusHealthy: 'സുരക്ഷിതം (കുറഞ്ഞ സാധ്യത)',
    statusWatch: 'ശ്രദ്ധിക്കുക (മിതമായത്)',
    statusAtRisk: 'അപകടാവസ്ഥയിൽ (ഉയർന്നത്)',
    aiInsightTitle: 'AI വിലയിരുത്തൽ',
    aiWhatChanged: 'എന്ത് മാറി?',
    aiWhyItMatters: 'ഇത് എന്തുകൊണ്ട് പ്രധാനമാണ്?',
    aiWhatToWatch: 'എന്താണ് ശ്രദ്ധിക്കേണ്ടത്?',
    btnCompareDates: 'തീയതികൾ താരതമ്യം ചെയ്യുക',
    btnViewTrends: 'പ്രവണതകൾ കാണുക',
    btnViewForecast: 'പ്രവചനം കാണുക',
    btnHowItWorksShort: 'പ്രവർത്തന രീതി',
    emptyChooseTitle: 'ആരംഭിക്കാൻ ഒരു ജലാശയം തിരഞ്ഞെടുക്കുക',
    emptyChooseDesc: 'ഉപഗ്രഹ ജല വിവരങ്ങൾ കാണാൻ ഒരു തടാകമോ ജലാശയമോ തിരയുക.',
    btnExplore: 'പര്യവേക്ഷണം ചെയ്യുക',
    loadingSatellite: 'ഉപഗ്രഹ ഡാറ്റ വിശകലനം ചെയ്യുന്നു...',
    dataUnavailableTitle: 'ഡാറ്റ താൽക്കാലികമായി ലഭ്യമല്ല',
    dataUnavailableDesc: 'മറ്റൊരു സ്ഥലമോ തീയതിയോ പരീക്ഷിക്കുക.',
  },
};
