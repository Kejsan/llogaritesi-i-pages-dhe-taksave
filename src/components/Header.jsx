import React, { useEffect, useRef, useState } from 'react';

const LanguageSelector = ({ lang, setLang }) => {
    const languages = [
        { code: 'sq', flag: '🇦🇱', label: 'Shqip' },
        { code: 'en', flag: '🇬🇧', label: 'English' },
        { code: 'it', flag: '🇮🇹', label: 'Italiano' },
    ];
    return (
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur">
            {languages.map((l) => (
                <button
                    type="button"
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                        lang === l.code
                            ? 'bg-white text-brand-navy shadow-lg'
                            : 'text-white/80 hover:bg-white/20'
                    }`}
                >
                    <span>{l.flag}</span>
                    <span className="hidden sm:inline">{l.label}</span>
                </button>
            ))}
        </div>
    );
};

const CurrencySelector = ({ currency, setCurrency, t }) => {
    const currencies = ['ALL', 'EUR', 'USD'];
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        if (!open) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [open]);
    return (
        <div className="relative" ref={menuRef}>
            <label htmlFor="currency" className="sr-only">{t.selectCurrency}</label>
            <button
                id="currency"
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/30"
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls="currency-selector-menu"
            >
                <span>{currency}</span>
                <svg className={`h-4 w-4 transition ${open ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none">
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute right-0 z-50 mt-3 w-40 rounded-2xl border border-white/40 bg-white/95 p-2 shadow-xl" id="currency-selector-menu" role="listbox">
                    <ul className="space-y-1 text-sm font-semibold text-brand-navy">
                        {currencies.map((c) => (
                            <li key={c}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrency(c);
                                        setOpen(false);
                                    }}
                                    className={`w-full rounded-xl px-3 py-2 text-left transition ${
                                        currency === c ? 'bg-brand-cyan/20 text-brand-navy' : 'hover:bg-brand-cyan/10'
                                    }`}
                                >
                                    {c}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 rounded-xl bg-brand-cyan/10 px-3 py-2 text-xs text-brand-navy/80">
                        {t.selectCurrency}: kursi përditësohet automatikisht.
                    </p>
                </div>
            )}
        </div>
    );
};

const QuickHint = () => (
    <div className="hidden lg:flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/80">
        <span className="h-2 w-2 rounded-full bg-brand-red animate-pulse" aria-hidden="true"></span>
        <span>Platformë e përditësuar për 2025</span>
    </div>
);

const SunIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
    </svg>
);

const MoonIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.79A9 9 0 0 1 11.21 3 7 7 0 1 0 21 12.79Z" />
    </svg>
);

const ThemeToggle = ({ theme, setTheme }) => (
    <div
        role="group"
        aria-label="Ndrysho temën"
        className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur"
    >
        <button
            type="button"
            onClick={() => setTheme('light')}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                theme === 'light'
                    ? 'bg-white text-brand-navy shadow-lg'
                    : 'text-white/80 hover:bg-white/20'
            }`}
            aria-pressed={theme === 'light'}
        >
            <SunIcon className="h-4 w-4" />
            <span className="hidden sm:inline">E çelët</span>
            <span className="sr-only">Përdor temën e çelët</span>
        </button>
        <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                theme === 'dark'
                    ? 'bg-brand-navy/80 text-white shadow-lg'
                    : 'text-white/80 hover:bg-white/20'
            }`}
            aria-pressed={theme === 'dark'}
        >
            <MoonIcon className="h-4 w-4" />
            <span className="hidden sm:inline">E errët</span>
            <span className="sr-only">Përdor temën e errët</span>
        </button>
    </div>
);

export const Header = ({ lang, setLang, currency, setCurrency, t, theme, setTheme }) => {
    const [isScrolled, setIsScrolled] = useState(false);

    React.useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <header className={`sticky top-0 z-40 transition-shadow ${isScrolled ? 'shadow-2xl shadow-brand-navy/20' : ''}`}>
            <div className="relative overflow-visible bg-gradient-to-br from-brand-navy via-[#03035f] to-brand-cyan/40">
                <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(251,97,99,0.35), transparent 55%)' }} aria-hidden="true"></div>
                <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:py-5">
                    <div className="flex items-center gap-4">
                        <a href="/" className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur transition hover:border-white/40" aria-label="Shko në faqen kryesore">
                            <img src="/Llogaritësi i Pagës dhe Taksave.png" alt="Llogaritësi i Pagës dhe Taksave" className="h-10 w-auto" />
                        </a>
                        <div className="hidden sm:flex flex-col text-white">
                            <span className="text-xs uppercase tracking-[0.35em] text-white/70">Llogaritësi.al</span>
                            <span className="text-lg font-bold">Financat personale pa stres</span>
                        </div>
                    </div>

                    <QuickHint />

                    <div className="flex items-center justify-end gap-3">
                        <CurrencySelector currency={currency} setCurrency={setCurrency} t={t} />
                        <ThemeToggle theme={theme} setTheme={setTheme} />
                        <LanguageSelector lang={lang} setLang={setLang} />
                    </div>
                </div>
            </div>
        </header>
    );
};
