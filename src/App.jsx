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
        <React.Fragment>
            <Header
                lang={language}
                setLang={setLanguage}
                currency={currency}
                setCurrency={setCurrency}
                t={t}
            />
            <div className="main-layout max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8 py-8 px-4">
                <Sidebar activePage={activePage} setActivePage={setActivePage} t={t} />
                <main className="flex-1 min-w-0">
                    {ActiveComponent}
                </main>
            </div>
            <Footer t={t} />
        </React.Fragment>
    );
};

export default App;
