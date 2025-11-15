import React, { useId, useState } from 'react';
import { formatCurrency } from '../utils';
import { IconInfo, IconAlertTriangle } from './Icons';

export const ResultCard = ({ title, value, currency, rates, isNet = false }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const descriptionId = useId();

    const toggleFlip = () => setIsFlipped((prev) => !prev);

    const badgeStyles = isNet
        ? 'border-emerald-300 text-emerald-100 bg-emerald-400/10'
        : 'border-amber-300 text-amber-100 bg-amber-400/10';
    const badgeLabel = isNet ? 'Net pay' : 'Gross total';
    const flipLabel = isFlipped ? 'Mbyll' : 'Detaje';

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
                    <div className="flex h-full flex-col justify-between gap-5">
                        <div className="flex items-start justify-between gap-3">
                            <div className="text-xs uppercase tracking-wide text-white/60 font-medium">{title}</div>
                            <span
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${badgeStyles}`}
                            >
                                {badgeLabel}
                            </span>
                        </div>
                        <div className="text-right font-black leading-tight tracking-tight text-white text-3xl sm:text-4xl drop-shadow-sm">
                            {formatCurrency(value, currency, rates)}
                        </div>
                        <div className="flex justify-between items-center text-xs text-white/60">
                            <span className="tracking-wide font-medium">
                                {isNet ? 'pas kontributeve' : 'para zbritjeve'}
                            </span>
                            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 font-semibold uppercase tracking-wide text-white/85">
                                <IconInfo className="h-3.5 w-3.5" aria-hidden="true" />
                                {flipLabel}
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flip-card-face flip-card-back bg-gradient-to-br from-brand-cyan to-brand-red text-white p-6 shadow-xl">
                    <div className="flex h-full flex-col justify-between gap-4" id={descriptionId}>
                        <p className="text-sm leading-relaxed text-white/90">
                            {isNet
                                ? 'Ky rezultat tregon shumën neto që merrni në dorë, pasi janë zbatuar kontributet dhe tatimet përkatëse.'
                                : 'Ky rezultat përfaqëson totalin bruto para çdo zbritjeje, duke ju ndihmuar të kuptoni diferencën me pagën neto.'}
                        </p>
                        <div className="flex justify-end">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white/90">
                                <IconInfo className="h-3.5 w-3.5" aria-hidden="true" />
                                {flipLabel}
                            </span>
                        </div>
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
