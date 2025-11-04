import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { EmployeeCalculator } from './components/EmployeeCalculator';
import { FreeProfCalculator } from './components/FreeProfCalculator';
import { FreelancerTaxGuide } from './components/FreelancerTaxGuide';
import { NewsUpdatesSection } from './components/NewsUpdatesSection';
import { InfoSection } from './components/InfoSection';
import { FAQSection } from './components/FAQSection';
import { LinksSection } from './components/LinksSection';
import { ContactSection } from './components/ContactSection';
import { translations } from './i18n';

const App = () => {
    const [activePage, setActivePage] = useState('employee');
    const [language, setLanguage] = useState('sq');
    const [currency, setCurrency] = useState('ALL');
    const [rates, setRates] = useState({ 'ALL': 1, 'EUR': 107.53, 'USD': 102.04 }); // Fallback values

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
                    'ALL': 1,
                    'EUR': rateALL,
                    'USD': rateALL / rateUSD
                });

            } catch (error) {
                console.error("Failed to fetch exchange rates, using fallback.", error);
                setRates({ 'ALL': 1, 'EUR': 107.53, 'USD': 102.04 });
            }
        };

        fetchRates();
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    const activeMeta = useMemo(() => ({
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
    }[activePage] || { label: t.navEmployee, description: t.employeeTitle }), [activePage, t]);

    let ActiveComponent;
    switch (activePage) {
        case 'employee':
            ActiveComponent = <EmployeeCalculator t={t} currency={currency} rates={rates} />;
            break;
        case 'freelancer':
            ActiveComponent = <FreeProfCalculator t={t} currency={currency} rates={rates} isInfluencer={false} />;
            break;
        case 'influencer':
            ActiveComponent = <FreeProfCalculator t={t} currency={currency} rates={rates} isInfluencer={true} />;
            break;
        case 'freelancer-guide':
            ActiveComponent = <FreelancerTaxGuide t={t} />;
            break;
        case 'news':
            ActiveComponent = <NewsUpdatesSection t={t} language={language} />;
            break;
        case 'info':
            ActiveComponent = <InfoSection t={t} />;
            break;
        case 'faq':
            ActiveComponent = <FAQSection t={t} />;
            break;
        case 'links':
            ActiveComponent = <LinksSection t={t} />;
            break;
        case 'contact':
            ActiveComponent = <ContactSection t={t} />;
            break;
        default:
            ActiveComponent = <EmployeeCalculator t={t} currency={currency} rates={rates} />;
    }

    return (
        <div className="page-shell">
            <Header
                lang={language}
                setLang={setLanguage}
                currency={currency}
                setCurrency={setCurrency}
                t={t}
            />

            <section className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl mx-4 mt-6 rounded-3xl">
                <div className="max-w-7xl mx-auto px-6 py-6 lg:py-10 flex flex-col gap-6 lg:flex-row lg:items-center">
                    <div className="flex-1 space-y-3 text-white">
                        <p className="text-xs uppercase tracking-[0.4em] text-white/70">{t.navTools}</p>
                        <h1 className="text-3xl lg:text-4xl font-extrabold drop-shadow-sm">{activeMeta.label}</h1>
                        <p className="text-white/80 max-w-2xl text-sm lg:text-base leading-relaxed">{activeMeta.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
                        {['employee', 'freelancer', 'influencer', 'freelancer-guide'].map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setActivePage(item)}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 border backdrop-blur-sm ${
                                    activePage === item
                                        ? 'bg-brand-white text-brand-navy border-brand-white shadow-lg shadow-brand-white/40'
                                        : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                                }`}
                            >
                                {(
                                    {
                                        employee: t.navEmployee,
                                        freelancer: t.navFreelancer,
                                        influencer: t.navInfluencer,
                                        'freelancer-guide': t.navFreelancerGuide,
                                    }[item]
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <div className="main-layout max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10 py-10 px-4 lg:px-6">
                <Sidebar activePage={activePage} setActivePage={setActivePage} t={t} />
                <main className="flex-1 min-w-0 space-y-8">
                    <div className="floating-card p-6 sm:p-8">
                        {ActiveComponent}
                    </div>
                </main>
            </div>
            <Footer t={t} />
        </div>
    );
};

export default App;
