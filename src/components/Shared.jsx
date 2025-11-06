import React, { useId, useState } from 'react';
import { formatCurrency } from '../utils';
import { IconInfo, IconAlertTriangle } from './Icons';

export const ResultCard = ({ title, value, currency, rates, isNet = false }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const descriptionId = useId();

    const toggleFlip = () => setIsFlipped((prev) => !prev);

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleFlip();
        }
    };

    return (
        <div className="[perspective:1400px] h-48 relative">
            <div
                role="button"
                tabIndex={0}
                aria-pressed={isFlipped}
                aria-describedby={descriptionId}
                onClick={toggleFlip}
                onKeyDown={handleKeyDown}
                aria-label={isNet ? 'Karta e rezultatit neto' : 'Karta e rezultatit bruto'}
                className={`flip-card h-full w-full cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-cyan focus-visible:ring-opacity-40 ${
                    isFlipped ? 'is-flipped' : ''
                }`}
            >
                <div className="flip-card-face bg-gradient-to-br from-brand-navy to-[#02027a] text-white p-6 shadow-xl">
                    <div className="flex h-full flex-col justify-between gap-4">
                        <div>
                            <div className="text-sm uppercase tracking-wide text-white/70">{title}</div>
                            <div className="mt-2 text-right font-black leading-tight tracking-tight text-white text-[clamp(1.65rem,2vw,2.35rem)] drop-shadow-sm">
                                {formatCurrency(value, currency, rates)}
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-white/70">
                            <span className="tracking-wide">{isNet ? 'pas kontributeve' : 'para zbritjeve'}</span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 font-semibold uppercase">
                                {isFlipped ? 'Mbyll' : 'Shfaq detaje'}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flip-card-face flip-card-back bg-gradient-to-br from-brand-cyan to-brand-red text-white p-6 shadow-xl">
                    <div className="flex h-full flex-col justify-between gap-3" id={descriptionId}>
                        <p className="text-base font-semibold leading-snug">
                            {isNet ? 'Shuma që merrni në dorë pas TAP' : 'Totali i llogaritur nga paga bruto'}
                        </p>
                        <p className="text-sm text-white/85 leading-relaxed">
                            Kur prekni ose klikoni kartën, shfaqen sqarimet shtesë. Vlerat rifreskohen automatikisht sipas inputit të përzgjedhur.
                        </p>
                        <div className="text-xs uppercase tracking-wide text-white/80">Përditësuar në kohë reale</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center gap-4 mb-8">
        <div className="relative">
            <div className="absolute inset-0 blur-xl bg-brand-cyan/40 rounded-full" aria-hidden="true"></div>
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-navy text-white shadow-lg shadow-brand-cyan/40">
                <Icon className="h-7 w-7" />
            </div>
        </div>
        <h2 className="text-3xl font-bold text-brand-navy drop-shadow-sm">{title}</h2>
    </div>
);

export const InfoAlert = ({ title, children, type = 'info' }) => {
    const tones = {
        info: { IconComp: IconInfo, tone: 'info' },
        warning: { IconComp: IconAlertTriangle, tone: 'warning' },
        danger: { IconComp: IconAlertTriangle, tone: 'danger' },
    };

    const selected = tones[type] ?? tones.info;

    return (
        <div
            className={`theme-callout ${selected.tone} p-5 mb-6`}
            role={type === 'warning' || type === 'danger' ? 'alert' : undefined}
        >
            <div className="flex">
                <div className="flex-shrink-0">
                    <selected.IconComp className={`h-5 w-5 theme-callout__icon ${selected.tone}`} />
                </div>
                <div className="ml-3">
                    <p className="font-bold theme-callout__title">{title}</p>
                    <div
                        className="text-sm mt-1 theme-callout__content"
                        dangerouslySetInnerHTML={{ __html: children }}
                    />
                </div>
            </div>
        </div>
    );
};

export const InputGroup = ({ label, value, onChange, placeholder, currency, className = '' }) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-brand-navy mb-1.5">
            {label}
        </label>
        <div className="relative rounded-lg shadow-sm">
            <input
                type="number"
                min="0"
                step="100"
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full pl-4 pr-16 py-3 rounded-lg text-xl input-focus-effect theme-input ${className}`}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="sm:text-base font-semibold theme-input-suffix">{currency}</span>
            </div>
        </div>
    </div>
);

export const DetailRow = ({ label, value, currency, rates, isConstant = false, isHeader = false, isTotal = false }) => (
    <div className={`flex justify-between items-center py-2 ${isTotal ? 'text-base' : 'text-sm'}`}>
        <span className={`${isConstant ? 'theme-text-muted' : isHeader ? 'font-semibold text-brand-navy' : 'theme-text-primary'}`}>
            {label}
        </span>
        <span
            className={`font-bold ${
                isConstant ? 'theme-text-muted' : isTotal ? 'text-brand-navy text-lg' : 'text-brand-cyan'
            }`}
        >
            {formatCurrency(value, currency, rates)}
        </span>
    </div>
);
