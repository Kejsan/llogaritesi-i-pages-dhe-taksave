import React from 'react';
import { IconCalculator } from './Icons';

const LanguageSelector = ({ lang, setLang }) => {
    const languages = [
        { code: 'sq', flag: '🇦🇱' },
        { code: 'en', flag: '🇬🇧' },
        { code: 'it', flag: '🇮🇹' },
    ];
    return (
        <div className="flex space-x-1 bg-white/10 p-1 rounded-lg">
            {languages.map(l => (
                <button
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-md text-sm font-semibold flex items-center transition-all duration-200 ${
                        lang === l.code
                            ? 'bg-brand-white text-brand-navy shadow'
                            : 'text-white/80 hover:bg-white/20'
                    }`}
                >
                    <span className="mr-0 sm:mr-2">{l.flag}</span>
                    <span className="hidden sm:block">{l.code.toUpperCase()}</span>
                </button>
            ))}
        </div>
    );
};

const CurrencySelector = ({ currency, setCurrency, t }) => {
    const currencies = ['ALL', 'EUR', 'USD'];
    return (
        <div>
            <label htmlFor="currency" className="sr-only">{t.selectCurrency}</label>
            <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-white/10 text-white border-none p-2.5 rounded-lg text-sm font-semibold focus:ring-2 focus:ring-brand-cyan"
            >
                {currencies.map(c => (
                    <option key={c} value={c} className="text-black">{c}</option>
                ))}
            </select>
        </div>
    );
};

export const Header = ({ lang, setLang, currency, setCurrency, t }) => {
    return (
        <header className="bg-white/70 backdrop-blur-lg text-brand-navy shadow-sm p-4 sticky top-0 z-20">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="bg-brand-cyan p-2 rounded-lg shadow-md">
                        <IconCalculator />
                    </div>
                    <span className="text-xl font-bold">Llogaritësi.al</span>
                </div>

                <div className="flex items-center space-x-4">
                    <CurrencySelector currency={currency} setCurrency={setCurrency} t={t} />
                    <LanguageSelector lang={lang} setLang={setLang} />
                </div>
            </div>
        </header>
    );
};
