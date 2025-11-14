import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';

const LanguageSelector = ({ lang, setLang }) => {
    const languages = [
        { code: 'sq', flag: '🇦🇱', label: 'Shqip' },
        { code: 'en', flag: '🇬🇧', label: 'English' },
        { code: 'it', flag: '🇮🇹', label: 'Italiano' },
    ];
    return (
        <div className="flex items-center gap-2 rounded-full theme-surface-muted px-1 py-1 backdrop-blur">
            {languages.map((l) => (
                <button
                    type="button"
                    key={l.code}
                    onClick={() => setLang(l.code)}
                    className={`flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 ${
                        lang === l.code
                            ? 'bg-gradient-to-r from-brand-cyan to-brand-navy text-white shadow-lg'
                            : 'theme-chip'
                    }`}
                    >
                    <span>{l.flag}</span>
                    <span className={`hidden sm:inline ${lang === l.code ? '' : 'theme-text-primary'}`}>{l.label}</span>
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
            <label htmlFor="currency" className="sr-only">
                {t.selectCurrency}
            </label>
            <button
                id="currency"
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 ${
                    open ? 'bg-gradient-to-r from-brand-cyan to-brand-navy text-white shadow-lg' : 'theme-chip'
                }`}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-controls="currency-selector-menu"
            >
                <span className={open ? 'text-white' : 'theme-text-primary'}>{currency}</span>
                <svg className={`h-4 w-4 transition ${open ? 'rotate-180' : ''} ${open ? 'text-white' : 'theme-text-muted'}`} viewBox="0 0 20 20" fill="none">
                    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            {open && (
                <div
                    className="absolute right-0 z-50 mt-3 w-40 rounded-2xl theme-surface p-2 shadow-xl"
                    id="currency-selector-menu"
                    role="listbox"
                >
                    <ul className="space-y-1 text-sm font-semibold text-brand-navy">
                        {currencies.map((c) => (
                            <li key={c}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setCurrency(c);
                                        setOpen(false);
                                    }}
                                    className={`w-full rounded-xl px-3 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 ${
                                        currency === c
                                            ? 'bg-gradient-to-r from-brand-cyan/80 to-brand-navy/90 text-white shadow'
                                            : 'theme-chip'
                                    }`}
                                >
                                    {c}
                                </button>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-2 rounded-xl theme-surface-muted px-3 py-2 text-xs theme-text-muted">
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

const ThemeToggle = ({ t }) => {
    const { theme, setTheme } = useTheme();
    const lightLabel = t?.themeLight ?? 'Light';
    const darkLabel = t?.themeDark ?? 'Dark';
    const ariaLabel = t?.themeToggleAria ?? 'Switch theme';

    return (
        <div
            role="group"
            aria-label={ariaLabel}
            className="flex items-center gap-1 rounded-full theme-surface-muted p-1 backdrop-blur"
        >
            <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 ${
                    theme === 'light'
                        ? 'bg-gradient-to-r from-brand-cyan to-brand-navy text-white shadow-lg'
                        : 'theme-chip'
                }`}
                aria-pressed={theme === 'light'}
            >
                <SunIcon className={`h-4 w-4 ${theme === 'light' ? 'text-white' : 'theme-text-primary'}`} />
                <span className={`hidden sm:inline ${theme === 'light' ? '' : 'theme-text-primary'}`}>{lightLabel}</span>
                <span className="sr-only">{`${ariaLabel}: ${lightLabel}`}</span>
            </button>
            <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/60 ${
                    theme === 'dark'
                        ? 'bg-gradient-to-r from-brand-navy to-brand-cyan text-white shadow-lg'
                        : 'theme-chip'
                }`}
                aria-pressed={theme === 'dark'}
            >
                <MoonIcon className={`h-4 w-4 ${theme === 'dark' ? 'text-white' : 'theme-text-primary'}`} />
                <span className={`hidden sm:inline ${theme === 'dark' ? '' : 'theme-text-primary'}`}>{darkLabel}</span>
                <span className="sr-only">{`${ariaLabel}: ${darkLabel}`}</span>
            </button>
        </div>
    );
};

const MobileToggleIcon = ({ open }) => (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {open ? (
            <>
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
            </>
        ) : (
            <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </>
        )}
    </svg>
);

export const Header = ({ lang, setLang, currency, setCurrency, t }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [calculatorsOpen, setCalculatorsOpen] = useState(false);
    const dropdownMenuRef = useRef(null);
    const dropdownButtonRef = useRef(null);
    const calculatorItemsRefs = useRef([]);
    const location = useLocation();

    const calculators = useMemo(
        () => [
            { to: '/employee', label: t.navEmployee, description: t.employeeTitle },
            { to: '/freelancer', label: t.navFreelancer, description: t.freelancerTitle },
            { to: '/influencer', label: t.navInfluencer, description: t.influencerTitle },
            { to: '/freelancer-guide', label: t.navFreelancerGuide, description: t.freelancerGuide?.title || t.navFreelancerGuide },
        ],
        [t]
    );

    const navItems = useMemo(
        () => [
            { type: 'link', to: '/', label: t.navHome, end: true },
            { type: 'dropdown', label: t.navCalculators },
            { type: 'link', to: '/news', label: t.navNews },
            { type: 'link', to: '/faq', label: t.navFAQ },
            { type: 'link', to: '/contact', label: t.navContact },
            { type: 'link', to: '/programs', label: t.navPrograms },
        ],
        [t]
    );

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 8);
        };
        onScroll();
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
        setCalculatorsOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!calculatorsOpen) {
            return;
        }

        const focusable = calculatorItemsRefs.current.filter(Boolean);
        if (focusable.length > 0) {
            focusable[0].focus();
        }

        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                setCalculatorsOpen(false);
                dropdownButtonRef.current?.focus();
            }

            if (event.key === 'Tab') {
                const items = calculatorItemsRefs.current.filter(Boolean);
                if (!items.length) {
                    return;
                }

                const first = items[0];
                const last = items[items.length - 1];

                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        };

        const handleClickOutside = (event) => {
            const menuEl = dropdownMenuRef.current;
            const buttonEl = dropdownButtonRef.current;
            if (menuEl && !menuEl.contains(event.target) && buttonEl && !buttonEl.contains(event.target)) {
                setCalculatorsOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [calculatorsOpen]);

    const toggleMobileMenu = () => {
        setMobileOpen((prev) => {
            const next = !prev;
            if (!next) {
                setCalculatorsOpen(false);
            }
            return next;
        });
    };

    const handleDropdownToggle = () => {
        setCalculatorsOpen((prev) => !prev);
    };

    const handleNavSelection = () => {
        setMobileOpen(false);
        setCalculatorsOpen(false);
    };

    const desktopNavLinkClass = ({ isActive }) =>
        `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
            isActive ? 'bg-white text-brand-navy shadow-lg' : 'text-white/80 hover:bg-white/20'
        }`;

    const mobileNavLinkClass = ({ isActive }) =>
        `flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
            isActive
                ? 'border-white/30 bg-white text-brand-navy shadow-lg'
                : 'border-white/10 bg-white/10 text-white hover:bg-white/20'
        }`;

    return (
        <header className={`sticky top-0 z-40 transition-shadow ${isScrolled ? 'shadow-2xl shadow-brand-navy/20' : ''}`}>
            <div className="relative overflow-visible bg-gradient-to-br from-brand-navy via-[#03035f] to-brand-cyan/40">
                <div
                    className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(251,97,99,0.35), transparent 55%)' }}
                    aria-hidden="true"
                ></div>
                <div className="max-w-7xl mx-auto flex flex-col gap-4 px-4 py-4 sm:px-6 lg:py-5">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-3 py-2 backdrop-blur transition hover:border-white/40"
                                aria-label="Shko në faqen kryesore"
                                onClick={handleNavSelection}
                            >
                                <img src="/Llogaritësi i Pagës dhe Taksave.png" alt="Llogaritësi i Pagës dhe Taksave" className="h-10 w-auto" />
                            </Link>
                            <div className="hidden sm:flex flex-col text-white">
                                <span className="text-xs uppercase tracking-[0.35em] text-white/70">Llogaritësi.al</span>
                                <span className="text-lg font-bold">Financat personale pa stres</span>
                            </div>
                        </div>

                        <QuickHint />

                        <div className="flex items-center gap-3">
                            <CurrencySelector currency={currency} setCurrency={setCurrency} t={t} />
                            <ThemeToggle t={t} />
                            <LanguageSelector lang={lang} setLang={setLang} />
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 p-2 text-white transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 lg:hidden"
                                onClick={toggleMobileMenu}
                                aria-expanded={mobileOpen}
                                aria-controls="mobile-primary-navigation"
                                aria-label={mobileOpen ? 'Mbyll menunë' : 'Hap menunë'}
                            >
                                <MobileToggleIcon open={mobileOpen} />
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4">
                        <nav className="hidden lg:block" aria-label="Navigimi kryesor">
                            <ul className="flex items-center gap-2">
                                {navItems.map((item) => {
                                    if (item.type === 'dropdown') {
                                        return (
                                            <li key={item.label} className="relative">
                                                <button
                                                    type="button"
                                                    ref={dropdownButtonRef}
                                                    onClick={handleDropdownToggle}
                                                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
                                                        calculatorsOpen ? 'bg-white/15 shadow-lg shadow-brand-cyan/30' : 'hover:bg-white/15'
                                                    }`}
                                                    aria-expanded={calculatorsOpen}
                                                    aria-haspopup="true"
                                                    aria-controls="desktop-calculators-menu"
                                                >
                                                    <span>{t.navCalculators}</span>
                                                    <svg className={`h-4 w-4 transition ${calculatorsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                        <path
                                                            d="M5 8l5 5 5-5"
                                                            stroke="currentColor"
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </button>
                                                {calculatorsOpen && (
                                                    <div
                                                        ref={dropdownMenuRef}
                                                        id="desktop-calculators-menu"
                                                        role="menu"
                                                        className="absolute left-0 z-50 mt-3 w-[22rem] rounded-3xl border border-white/15 bg-white/95 p-4 text-brand-navy shadow-2xl"
                                                    >
                                                        <div className="flex flex-col gap-3">
                                                            {calculators.map((calculator, index) => (
                                                                <NavLink
                                                                    key={calculator.to}
                                                                    to={calculator.to}
                                                                    className={({ isActive }) =>
                                                                        `flex items-start gap-3 rounded-2xl border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan ${
                                                                            isActive ? 'border-brand-cyan bg-brand-cyan/10 text-brand-navy' : 'border-transparent hover:border-brand-cyan/40 hover:bg-brand-cyan/10'
                                                                        }`
                                                                    }
                                                                    onClick={handleNavSelection}
                                                                    role="menuitem"
                                                                    ref={(el) => {
                                                                        calculatorItemsRefs.current[index] = el;
                                                                    }}
                                                                >
                                                                    <div className="flex-1">
                                                                        <p className="text-sm font-semibold uppercase tracking-wide">{calculator.label}</p>
                                                                        <p className="text-xs text-brand-navy/70 leading-relaxed">{calculator.description}</p>
                                                                    </div>
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </li>
                                        );
                                    }

                                    return (
                                        <li key={item.to}>
                                            <NavLink to={item.to} end={item.end} className={desktopNavLinkClass} onClick={handleNavSelection}>
                                                {item.label}
                                            </NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </nav>
                    </div>

                    {mobileOpen && (
                        <div
                            id="mobile-primary-navigation"
                            className="lg:hidden rounded-3xl border border-white/15 bg-brand-navy/95 p-4 text-white shadow-2xl"
                        >
                            <nav aria-label="Navigimi kryesor mobil">
                                <ul className="space-y-3">
                                    {navItems.map((item) => {
                                        if (item.type === 'dropdown') {
                                            return (
                                                <li key={item.label} className="space-y-2">
                                                    <button
                                                        type="button"
                                                        onClick={handleDropdownToggle}
                                                        className="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                                                        aria-expanded={calculatorsOpen}
                                                        aria-controls="mobile-calculators-menu"
                                                    >
                                                        <span>{t.navCalculators}</span>
                                                        <svg className={`h-4 w-4 transition ${calculatorsOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                            <path
                                                                d="M5 8l5 5 5-5"
                                                                stroke="currentColor"
                                                                strokeWidth="1.5"
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                            />
                                                        </svg>
                                                    </button>
                                                    {calculatorsOpen && (
                                                        <div
                                                            ref={dropdownMenuRef}
                                                            id="mobile-calculators-menu"
                                                            role="menu"
                                                            className="space-y-2 rounded-2xl border border-white/15 bg-white/90 p-3 text-brand-navy"
                                                        >
                                                            {calculators.map((calculator, index) => (
                                                                <NavLink
                                                                    key={`${calculator.to}-mobile`}
                                                                    to={calculator.to}
                                                                    className={({ isActive }) =>
                                                                        `flex flex-col gap-1 rounded-xl px-3 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan ${
                                                                            isActive ? 'bg-brand-cyan/15 text-brand-navy' : 'hover:bg-brand-cyan/10'
                                                                        }`
                                                                    }
                                                                    onClick={handleNavSelection}
                                                                    role="menuitem"
                                                                    ref={(el) => {
                                                                        calculatorItemsRefs.current[index] = el;
                                                                    }}
                                                                >
                                                                    <span className="uppercase tracking-wide">{calculator.label}</span>
                                                                    <span className="text-xs text-brand-navy/70 leading-relaxed">{calculator.description}</span>
                                                                </NavLink>
                                                            ))}
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        }

                                        return (
                                            <li key={`${item.to}-mobile`}>
                                                <NavLink to={item.to} end={item.end} className={mobileNavLinkClass} onClick={handleNavSelection}>
                                                    <span>{item.label}</span>
                                                    <svg className="h-3 w-3" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                                                        <path
                                                            d="M7 5l5 5-5 5"
                                                            stroke="currentColor"
                                                            strokeWidth="1.6"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
