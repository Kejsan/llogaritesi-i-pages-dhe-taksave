import React from 'react';
import { formatCurrency } from '../utils';
import { IconInfo, IconAlertTriangle } from './Icons';

export const ResultCard = ({ title, value, currency, rates, isNet = false }) => (
    <div className="[transform-style:preserve-3d] transition-transform duration-500 [perspective:1000px] w-full h-24 group">
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-xl shadow-lg bg-gradient-to-br from-brand-navy to-blue-900 text-white p-5 flex flex-col justify-between">
            <div className="text-sm font-medium opacity-90">{title}</div>
            <div className="text-3xl font-bold mt-1 text-right">
                {formatCurrency(value, currency, rates)}
            </div>
        </div>
        <div className="absolute w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl shadow-lg bg-gradient-to-br from-brand-cyan to-teal-500 text-white p-5 flex flex-col justify-between items-center">
            <p className="text-lg font-semibold">{isNet ? 'Net Income' : 'Gross Income'}</p>
            <p className="text-2xl">Flip for details</p>
        </div>
    </div>
);

export const SectionTitle = ({ icon: Icon, title }) => (
    <h2 className="text-3xl font-bold text-brand-navy mb-8 flex items-center">
        <div className="p-2 bg-brand-cyan/10 rounded-lg mr-4">
            <Icon className="w-8 h-8 text-brand-cyan" />
        </div>
        {title}
    </h2>
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
        <div className={`p-4 mb-6 rounded-xl border-l-4 ${colors.border} ${colors.bg}`}>
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
        <span className={`${isConstant ? 'text-gray-500' : isHeader ? 'font-medium text-brand-navy' : 'text-gray-700'}`}>
            {label}
        </span>
        <span className={`font-bold ${isConstant ? 'text-gray-500' : isTotal ? 'text-brand-navy text-lg' : 'text-brand-cyan'}`}>
            {formatCurrency(value, currency, rates)}
        </span>
    </div>
);
