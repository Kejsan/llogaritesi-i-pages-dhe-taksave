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
    let colors = {
        info: {
            bg: 'bg-blue-50',
            border: 'border-blue-400',
            icon: 'text-blue-600',
            IconComp: IconInfo
        },
        warning: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-400',
            icon: 'text-yellow-600',
            IconComp: IconAlertTriangle
        },
        danger: {
            bg: 'bg-brand-red/10',
            border: 'border-brand-red',
            icon: 'text-brand-red',
            IconComp: IconAlertTriangle
        }
    }[type];

    return (
        <div className={`p-5 mb-6 rounded-2xl border ${colors.border} ${colors.bg} shadow-inner`}
            role={type === 'warning' || type === 'danger' ? 'alert' : undefined}>
            <div className="flex">
                <div className="flex-shrink-0">
                    <colors.IconComp className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <div className="ml-3">
                    <p className="font-bold text-gray-800">{title}</p>
                    <div className="text-sm mt-1 text-gray-700" dangerouslySetInnerHTML={{ __html: children }} />
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
                className={`w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg text-xl input-focus-effect ${className}`}
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-base font-semibold">{currency}</span>
            </div>
        </div>
    </div>
);

export const DetailRow = ({ label, value, currency, rates, isConstant = false, isHeader = false, isTotal = false }) => (
    <div className={`flex justify-between items-center py-2 ${isTotal ? 'text-base' : 'text-sm'}`}>
        <span className={`${isConstant ? 'text-gray-500' : isHeader ? 'font-semibold text-brand-navy' : 'text-gray-700'}`}>
            {label}
        </span>
        <span className={`font-bold ${isConstant ? 'text-gray-500' : isTotal ? 'text-brand-navy text-lg' : 'text-brand-cyan'}`}>
            {formatCurrency(value, currency, rates)}
        </span>
    </div>
);
