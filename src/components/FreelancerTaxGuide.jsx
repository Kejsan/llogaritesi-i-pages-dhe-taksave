import React, { useState } from 'react';
import { SectionTitle, InfoAlert } from './Shared';
import { IconSettings, IconChevronDown } from './Icons';

export const FreelancerTaxGuide = ({ t }) => {
    const guide = t.freelancerGuide;
    const [revenueTier, setRevenueTier] = useState('under5');
    const [clientMix, setClientMix] = useState('singleLocal');

    const detail = guide.details?.[revenueTier]?.[clientMix] ?? { title: '', summary: '', actions: [] };

    const statusStyles = {
        required: 'bg-brand-red/10 text-brand-red border border-brand-red/40',
        threshold: 'bg-yellow-100 text-yellow-800 border border-yellow-200',
        recommended: 'bg-brand-cyan/10 text-brand-navy border border-brand-cyan/40',
        monitor: 'bg-blue-50 text-blue-700 border border-blue-200',
        caution: 'bg-orange-100 text-orange-800 border border-orange-300',
    };

    const obligationsOrder = [
        'registerNipt',
        'socialSecurity',
        'incomeTax',
        'vat',
        'diva',
        'invoicing',
        'accounting',
    ];

    const determineStatus = (obligationId) => {
        switch (obligationId) {
            case 'incomeTax':
                if (revenueTier === 'above14') return 'required';
                if (revenueTier === '10to14') return 'caution';
                return 'monitor';
            case 'vat':
                if (revenueTier === 'under5') return 'monitor';
                if (revenueTier === '5to10') return 'threshold';
                return 'required';
            case 'accounting':
                if (clientMix === 'singleLocal') return 'caution';
                if (revenueTier === 'under5' || revenueTier === '5to10') return 'recommended';
                return 'required';
            default:
                return 'required';
        }
    };

    const buildNote = (obligationId) => {
        const base = guide.obligations?.[obligationId]?.note ?? '';
        const tierNote = guide.dynamicNotes?.[obligationId]?.[revenueTier] ?? '';
        const clientNote = guide.clientNotes?.[obligationId]?.[clientMix] ?? '';
        return [base, tierNote, clientNote].filter(Boolean).join(' ');
    };

    const warnings = [];
    if (clientMix === 'singleLocal') {
        warnings.push({ type: 'warning', title: guide.warnings.disguisedTitle, body: guide.warnings.disguisedBody });
    }
    if (revenueTier === '10to14' || revenueTier === 'above14') {
        warnings.push({ type: 'warning', title: guide.warnings.vatTitle, body: guide.warnings.vatBody });
    }
    if (revenueTier === 'above14') {
        warnings.push({ type: 'danger', title: guide.warnings.profitTitle, body: guide.warnings.profitBody });
    }

    const narrativeContent = (
        <div className="space-y-4">
            <div>
                <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-navy/80">{guide.narrativeHeading}</h4>
                <h3 className="text-2xl font-semibold text-brand-navy mt-1">{detail.title}</h3>
                <p className="mt-3 text-gray-700 leading-relaxed">{detail.summary}</p>
            </div>
            {detail.actions?.length > 0 && (
                <div>
                    <h5 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{guide.actionsHeading}</h5>
                    <ul className="mt-3 space-y-3">
                        {detail.actions.map((action, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-brand-cyan flex-shrink-0" aria-hidden="true"></span>
                                <span className="text-gray-700">{action}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <SectionTitle icon={IconSettings} title={guide.title} />
            <p className="text-gray-600 mt-2">{guide.intro}</p>

            <div className="mt-6 space-y-6">
                <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">{guide.filtersTitle}</h3>
                    <div className="mt-4 grid gap-5 md:grid-cols-2">
                        <div>
                            <label htmlFor="freelancer-guide-revenue" className="block text-sm font-semibold text-gray-700">
                                {guide.revenueLabel}
                            </label>
                            <p className="text-xs text-gray-500 mt-1">{guide.revenueCaption}</p>
                            <select
                                id="freelancer-guide-revenue"
                                value={revenueTier}
                                onChange={(event) => setRevenueTier(event.target.value)}
                                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan"
                            >
                                {Object.entries(guide.revenueOptions).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="freelancer-guide-client" className="block text-sm font-semibold text-gray-700">
                                {guide.clientMixLabel}
                            </label>
                            <p className="text-xs text-gray-500 mt-1">{guide.clientMixCaption}</p>
                            <select
                                id="freelancer-guide-client"
                                value={clientMix}
                                onChange={(event) => setClientMix(event.target.value)}
                                className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-800 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan"
                            >
                                {Object.entries(guide.clientMixOptions).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-5">
                    <div className="lg:col-span-3 space-y-4">
                        <div className="hidden lg:block rounded-2xl border border-brand-cyan/20 bg-gradient-to-br from-brand-white to-brand-cyan/5 p-6 shadow-inner">
                            {narrativeContent}
                        </div>

                        <details className="lg:hidden rounded-xl border border-gray-200 bg-white shadow-sm group">
                            <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-semibold text-brand-navy [&::-webkit-details-marker]:hidden">
                                <span>{guide.mobileNarrativeSummary}</span>
                                <span className="transition-transform group-open:rotate-180">
                                    <IconChevronDown />
                                </span>
                            </summary>
                            <div className="border-t border-gray-100 px-4 py-4 text-sm text-gray-700">
                                {narrativeContent}
                            </div>
                        </details>
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                        {warnings.length > 0 && (
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500">{guide.warningsHeading}</h4>
                                {warnings.map((warning, index) => (
                                    <InfoAlert key={`${warning.title}-${index}`} title={warning.title} type={warning.type}>
                                        {warning.body}
                                    </InfoAlert>
                                ))}
                            </div>
                        )}

                        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white">
                            <div className="bg-brand-navy px-4 py-3 text-sm font-semibold text-white">{guide.table.heading}</div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 text-sm">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{guide.table.obligation}</th>
                                            <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{guide.table.status}</th>
                                            <th scope="col" className="px-4 py-3 text-left font-semibold text-gray-700">{guide.table.notes}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {obligationsOrder.map((obligationId) => {
                                            const label = guide.obligations?.[obligationId]?.label || obligationId;
                                            const status = determineStatus(obligationId);
                                            const note = buildNote(obligationId);
                                            const statusLabel = guide.statuses?.[status] || status;
                                            const statusDescription = guide.statusDescriptions?.[status] || '';
                                            return (
                                                <tr key={obligationId} className="align-top">
                                                    <td className="px-4 py-3 font-medium text-gray-800">{label}</td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status] || ''}`}
                                                            title={statusDescription}
                                                        >
                                                            {statusLabel}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-gray-600">{note}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
