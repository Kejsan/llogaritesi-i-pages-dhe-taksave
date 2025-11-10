import React, { useState, useMemo, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { translations } from './i18n';

const HomePage = lazy(() => import('./pages/HomePage.jsx'));
const EmployeeCalculatorRoute = lazy(() =>
    import('./components/EmployeeCalculator.jsx').then((module) => ({ default: module.EmployeeCalculator }))
);
const FreeProfCalculatorRoute = lazy(() =>
    import('./components/FreeProfCalculator.jsx').then((module) => ({ default: module.FreeProfCalculator }))
);
const FreelancerTaxGuideRoute = lazy(() =>
    import('./components/FreelancerTaxGuide.jsx').then((module) => ({ default: module.FreelancerTaxGuide }))
);
const NewsUpdatesSectionRoute = lazy(() =>
    import('./components/NewsUpdatesSection.jsx').then((module) => ({ default: module.NewsUpdatesSection }))
);
const InfoSectionRoute = lazy(() =>
    import('./components/InfoSection.jsx').then((module) => ({ default: module.InfoSection }))
);
const FAQSectionRoute = lazy(() =>
    import('./components/FAQSection.jsx').then((module) => ({ default: module.FAQSection }))
);
const LinksSectionRoute = lazy(() =>
    import('./components/LinksSection.jsx').then((module) => ({ default: module.LinksSection }))
);
const ContactSectionRoute = lazy(() =>
    import('./components/ContactSection.jsx').then((module) => ({ default: module.ContactSection }))
);
const ProgramsSectionRoute = lazy(() =>
    import('./components/ProgramsSection.jsx').then((module) => ({ default: module.ProgramsSection }))
);

const CardFallback = () => (
    <div className="flex flex-col items-center justify-center gap-3 py-16 theme-text-muted">
        <span className="h-3 w-3 animate-ping rounded-full bg-brand-cyan" aria-hidden="true"></span>
        <p className="text-xs font-semibold uppercase tracking-[0.4em]">Loading…</p>
    </div>
);

const LandingFallback = () => (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl theme-surface p-12 text-center shadow-xl">
        <span className="text-sm font-semibold uppercase tracking-[0.35em]">Llogaritësi.al</span>
        <p className="max-w-xl text-base theme-text-muted">Loading the latest data…</p>
    </div>
);

const Layout = ({ t, language, setLanguage, currency, setCurrency }) => {
    const location = useLocation();
    const pageKey = useMemo(() => {
        if (location.pathname === '/' || location.pathname === '') {
            return 'home';
        }
        const trimmed = location.pathname.replace(/^\/+/, '').split('/')[0];
        return trimmed || 'home';
    }, [location.pathname]);

    const isHome = pageKey === 'home';

    const routeMeta = useMemo(
        () => ({
            employee: {
                label: t.navEmployee,
                description: t.employeeTitle,
            },
            freelancer: {
                label: t.navFreelancer,
                description: t.freelancerTitle,
            },
            influencer: {
                label: t.navInfluencer,
                description: t.influencerTitle,
            },
            'freelancer-guide': {
                label: t.navFreelancerGuide,
                description: t.freelancerGuide?.title || t.navFreelancerGuide,
            },
            news: {
                label: t.navNews,
                description: t.newsTitle,
            },
            info: {
                label: t.navInfo,
                description: t.infoTitle,
            },
            faq: {
                label: t.navFAQ,
                description: t.faqTitle,
            },
            links: {
                label: t.navLinks,
                description: t.linksTitle,
            },
            contact: {
                label: t.navContact,
                description: t.navContact,
            },
            programs: {
                label: t.navPrograms,
                description: t.programsTitle,
            },
        }),
        [t]
    );

    const activeMeta = routeMeta[pageKey] || routeMeta.employee;

    return (
        <div className="page-shell">
            <Header
                lang={language}
                setLang={setLanguage}
                currency={currency}
                setCurrency={setCurrency}
                t={t}
            />

            {!isHome && (
                <section className="mx-4 mt-6 rounded-3xl theme-surface shadow-2xl backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 py-6 lg:py-10 flex flex-col gap-6 lg:flex-row lg:items-center">
                        <div className="flex-1 space-y-3">
                            <p className="text-xs uppercase tracking-[0.4em] theme-text-muted">{t.navTools}</p>
                            <h1 className="text-3xl lg:text-4xl font-extrabold text-brand-navy drop-shadow-sm">{activeMeta.label}</h1>
                            <p className="max-w-2xl text-sm lg:text-base leading-relaxed theme-text-muted">{activeMeta.description}</p>
                        </div>
                    </div>
                </section>
            )}

            <div className="main-layout max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10 py-10 px-4 lg:px-6">
                <Sidebar t={t} />
                <main className="flex-1 min-w-0 space-y-8">
                    {isHome ? (
                        <Suspense fallback={<LandingFallback />}>
                            <Outlet />
                        </Suspense>
                    ) : (
                        <div className="floating-card p-6 sm:p-8">
                            <Suspense fallback={<CardFallback />}>
                                <Outlet />
                            </Suspense>
                        </div>
                    )}
                </main>
            </div>
            <DisclaimerBanner t={t} />
            <Footer t={t} />
        </div>
    );
};

const App = () => {
    const [language, setLanguage] = useState('sq');
    const [currency, setCurrency] = useState('ALL');
    const [rates, setRates] = useState({ ALL: 1, EUR: 107.53, USD: 102.04 });
    const t = useMemo(() => translations[language], [language]);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await fetch('https://open.er-api.com/v6/latest/EUR');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                const rateALL = data.rates.ALL;
                const rateUSD = data.rates.USD;

                setRates({
                    ALL: 1,
                    EUR: rateALL,
                    USD: rateALL / rateUSD,
                });
            } catch (error) {
                console.error('Failed to fetch exchange rates, using fallback.', error);
                setRates({ ALL: 1, EUR: 107.53, USD: 102.04 });
            }
        };

        fetchRates();
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <Routes>
            <Route
                element={
                    <Layout
                        t={t}
                        language={language}
                        setLanguage={setLanguage}
                        currency={currency}
                        setCurrency={setCurrency}
                    />
                }
            >
                <Route index element={<HomePage t={t} />} />
                <Route path="employee" element={<EmployeeCalculatorRoute t={t} currency={currency} rates={rates} />} />
                <Route
                    path="freelancer"
                    element={<FreeProfCalculatorRoute t={t} currency={currency} rates={rates} isInfluencer={false} />}
                />
                <Route
                    path="influencer"
                    element={<FreeProfCalculatorRoute t={t} currency={currency} rates={rates} isInfluencer />}
                />
                <Route path="freelancer-guide" element={<FreelancerTaxGuideRoute t={t} />} />
                <Route path="news" element={<NewsUpdatesSectionRoute t={t} language={language} />} />
                <Route path="info" element={<InfoSectionRoute t={t} />} />
                <Route path="faq" element={<FAQSectionRoute t={t} />} />
                <Route path="links" element={<LinksSectionRoute t={t} />} />
                <Route path="programs" element={<ProgramsSectionRoute t={t} />} />
                <Route path="contact" element={<ContactSectionRoute t={t} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
        </Routes>
    );
};

export default App;
