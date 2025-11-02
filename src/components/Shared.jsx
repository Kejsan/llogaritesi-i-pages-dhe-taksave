import React from 'react';
import { formatCurrency } from '../utils';
import { IconInfo, IconAlertTriangle } from './Icons';

export const ResultCard = ({ title, value, currency, rates, isNet = false }) => (
    <div className={`p-5 rounded-xl shadow-lg ${isNet ? 'bg-brand-cyan' : 'bg-brand-navy'} text-white`}>
        <div className="text-sm font-medium opacity-90">{title}</div>
        <div className={`text-3xl font-bold mt-1`}>
            {formatCurrency(value, currency, rates)}
        </div>
    </div>
);

export const SectionTitle = ({ icon: Icon, title }) => (
    <h2 className="text-2xl font-bold text-brand-navy mb-6 flex items-center">
        <Icon className="w-7 h-7 mr-3 text-brand-cyan" />
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

export const InputGroup = ({ label, value, onChange, placeholder, currency }) => (
    <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
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
                className="w-full pl-4 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-brand-cyan focus:border-brand-cyan text-xl"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-base font-semibold">{currency}</span>
            </div>
        </div>
    </div>
);

export const DetailRow = ({ label, value, currency, rates, isConstant = false, isHeader = false, isTotal = false }) => (
    <div className={`flex justify-between items-center py-1.5 ${isTotal ? 'text-base' : 'text-sm'}`}>
        <span className={`${isConstant ? 'text-gray-500' : isHeader ? 'font-medium text-gray-800' : 'text-gray-700'}`}>
            {label}
        </span>
        <span className={`font-semibold ${isConstant ? 'text-gray-500' : isTotal ? 'text-brand-navy text-lg' : 'text-brand-cyan'}`}>
            {formatCurrency(value, currency, rates)}
        </span>
    </div>
);
