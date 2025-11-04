import React, { useState, useMemo, useEffect } from 'react';
import { CORE_CONSTANTS, FREE_PROF_TAX_RATES } from '../constants';
import { formatCurrency, formatALL, calculateFreelancerTaxes } from '../utils';
import { ResultCard, SectionTitle, InfoAlert } from './Shared';
import { IconBriefcase, IconCamera } from './Icons';

const MAX_ANNUAL_INCOME = 500000000;

const clampToRange = (value, min, max) => Math.min(Math.max(value, min), max);

const parseNumericInput = (value) => {
    if (value === '' || value === null || value === undefined) return 0;
    const numeric = Number(value);
    if (!Number.isFinite(numeric) || numeric < 0) return 0;
    return numeric;
};

const parsePercentageInput = (value) => clampToRange(parseNumericInput(value), 0, 100);

const resolveRate = (currency, rates) => {
    if (!rates || typeof rates !== 'object') return 1;
    const rate = rates[currency];
    if (!rate || !Number.isFinite(rate) || rate <= 0) return 1;
    return rate;
};

export const FreeProfCalculator = ({ t, currency, rates, isInfluencer = false }) => {
    const [annualIncomeInput, setAnnualIncomeInput] = useState('');
    const [incomeCurrency, setIncomeCurrency] = useState(currency);
    const [hasTouchedCurrency, setHasTouchedCurrency] = useState(false);
    const [localShareInput, setLocalShareInput] = useState('70');
    const [topLocalClientInput, setTopLocalClientInput] = useState('55');
    const [topTwoLocalClientsInput, setTopTwoLocalClientsInput] = useState('85');

    useEffect(() => {
        if (!hasTouchedCurrency) {
            setIncomeCurrency(currency);
        }
    }, [currency, hasTouchedCurrency]);

    useEffect(() => {
        if (annualIncomeInput === '') {
            const baseALL = 5000000;
            const rate = resolveRate(incomeCurrency, rates);
            const derived = baseALL / rate;
            const rounded = Math.round(derived * 100) / 100;
            setAnnualIncomeInput(String(rounded));
        }
    }, [incomeCurrency, rates, annualIncomeInput]);

    const handleAnnualIncomeChange = (event) => {
        const raw = event.target.value;
        if (raw === '') {
            setAnnualIncomeInput('');
            return;
        }
        const numeric = Number(raw);
        if (Number.isNaN(numeric)) {
            return;
        }
        const capped = clampToRange(numeric, 0, MAX_ANNUAL_INCOME);
        setAnnualIncomeInput(String(capped));
    };

    const handlePercentageChange = (setter) => (event) => {
        const raw = event.target.value;
        if (raw === '') {
            setter('');
            return;
        }
        const numeric = Number(raw);
        if (Number.isNaN(numeric)) {
            return;
        }
        setter(String(clampToRange(numeric, 0, 100)));
    };

    const annualIncomeValue = useMemo(() => {
        const numeric = parseNumericInput(annualIncomeInput);
        return clampToRange(numeric, 0, MAX_ANNUAL_INCOME);
    }, [annualIncomeInput]);

    const localShare = useMemo(() => parsePercentageInput(localShareInput), [localShareInput]);
    const topLocalClientShare = useMemo(
        () => parsePercentageInput(topLocalClientInput),
        [topLocalClientInput]
    );
    const topTwoLocalClientsShare = useMemo(
        () => parsePercentageInput(topTwoLocalClientsInput),
        [topTwoLocalClientsInput]
    );

    const clientMix = useMemo(
        () => ({
            localShare,
            foreignShare: clampToRange(100 - localShare, 0, 100),
            topLocalClientShare,
            topTwoLocalClientsShare,
        }),
        [localShare, topLocalClientShare, topTwoLocalClientsShare]
    );

    const calculation = useMemo(
        () =>
            calculateFreelancerTaxes({
                annualIncome: annualIncomeValue,
                incomeCurrency,
                rates,
                clientMix,
            }),
        [annualIncomeValue, incomeCurrency, rates, clientMix]
    );

    const currencyOptions = useMemo(() => Object.keys(rates || { ALL: 1 }), [rates]);

    const validationMessages = [];
    if (topLocalClientShare > localShare && topLocalClientShare > 0) {
        validationMessages.push(t.freelancerCalculator.validation.topClientExceedsLocal);
    }
    if (topTwoLocalClientsShare > localShare && topTwoLocalClientsShare > 0) {
        validationMessages.push(t.freelancerCalculator.validation.topTwoClientsExceedsLocal);
    }

    const vatBand = calculation.vatInfo.band;
    const vatBadgeMap = {
        under: 'bg-emerald-100 text-emerald-700 border-emerald-200',
        monitor: 'bg-amber-100 text-amber-800 border-amber-200',
        over: 'bg-red-100 text-red-700 border-red-200',
    };
    const vatBadgeClass = vatBadgeMap[vatBand] || 'bg-brand-cyan/10 text-brand-navy border-brand-cyan/30';
    const vatBadgeLabel = t.freelancerCalculator.vatBadges[vatBand];
    const vatDescription = t.freelancerCalculator.vatDescriptions[vatBand];

    const warningsToDisplay = calculation.warnings;

    return (
        <div className="space-y-8">
            <SectionTitle
                icon={isInfluencer ? IconCamera : IconBriefcase}
                title={isInfluencer ? t.influencerTitle : t.freelancerTitle}
            />

            {isInfluencer ? (
                <InfoAlert title={t.influencerWarning} type="danger">
                    {t.influencerWarningText}
                </InfoAlert>
            ) : (
                <InfoAlert title={t.legislativeWarning} type="warning">
                    {t.legislativeWarningText}
                </InfoAlert>
            )}

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
                <div className="rounded-3xl border border-white/35 bg-white/70 p-6 shadow-xl backdrop-blur space-y-6">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-navy/60">
                            {t.freelancerCalculator.inputs.heading}
                        </h3>
                        <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
                            <label className="block text-sm font-medium text-brand-navy">
                                {t.freelancerCalculator.inputs.annualIncome}
                                <input
                                    type="number"
                                    min="0"
                                    max={MAX_ANNUAL_INCOME}
                                    value={annualIncomeInput}
                                    onChange={handleAnnualIncomeChange}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-lg font-semibold text-brand-navy shadow-sm focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/40"
                                />
                            </label>
                            <label className="block text-sm font-medium text-brand-navy">
                                {t.freelancerCalculator.inputs.currency}
                                <select
                                    value={incomeCurrency}
                                    onChange={(event) => {
                                        setHasTouchedCurrency(true);
                                        setIncomeCurrency(event.target.value);
                                    }}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-4 py-3 text-base font-semibold text-brand-navy shadow-sm focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/40"
                                >
                                    {currencyOptions.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-brand-navy/80">
                            {t.freelancerCalculator.inputs.localSplitHint}
                        </p>
                        <div className="grid gap-4 md:grid-cols-3">
                            <label className="block text-sm font-medium text-brand-navy">
                                {t.freelancerCalculator.inputs.localSplit}
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={localShareInput}
                                    onChange={handlePercentageChange(setLocalShareInput)}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-base font-semibold text-brand-navy shadow-sm focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/40"
                                />
                                <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-brand-navy/60">
                                    {t.freelancerCalculator.inputs.percentSuffix}
                                </span>
                            </label>
                            <label className="block text-sm font-medium text-brand-navy">
                                {t.freelancerCalculator.inputs.topClient}
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={topLocalClientInput}
                                    onChange={handlePercentageChange(setTopLocalClientInput)}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-base font-semibold text-brand-navy shadow-sm focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/40"
                                />
                                <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-brand-navy/60">
                                    {t.freelancerCalculator.inputs.percentSuffix}
                                </span>
                            </label>
                            <label className="block text-sm font-medium text-brand-navy">
                                {t.freelancerCalculator.inputs.topTwoClients}
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={topTwoLocalClientsInput}
                                    onChange={handlePercentageChange(setTopTwoLocalClientsInput)}
                                    className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-base font-semibold text-brand-navy shadow-sm focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/40"
                                />
                                <span className="mt-1 block text-xs font-medium uppercase tracking-wide text-brand-navy/60">
                                    {t.freelancerCalculator.inputs.percentSuffix}
                                </span>
                            </label>
                        </div>
                        {validationMessages.length > 0 && (
                            <div className="space-y-1 text-sm text-brand-red">
                                {validationMessages.map((message, index) => (
                                    <p key={index}>{message}</p>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <aside className="rounded-3xl border border-brand-cyan/30 bg-brand-cyan/10 p-6 shadow-lg backdrop-blur space-y-5">
                    <div>
                        <h3 className="text-lg font-semibold text-brand-navy">
                            {t.freelancerCalculator.summary.heading}
                        </h3>
                        <p className="mt-1 text-sm text-brand-navy/70">
                            {t.freelancerCalculator.explanations.vat(formatALL(CORE_CONSTANTS.VatThreshold))}
                        </p>
                    </div>
                    <div className={`flex items-center justify-between rounded-2xl border px-4 py-3 font-semibold ${vatBadgeClass}`}>
                        <span>{t.freelancerCalculator.summary.vatLabel}</span>
                        <span>{vatBadgeLabel}</span>
                    </div>
                    <p className="text-sm text-brand-navy/80">{vatDescription}</p>
                    <div className="rounded-2xl border border-brand-navy/10 bg-white/80 px-4 py-3 text-sm text-brand-navy">
                        <div className="flex justify-between font-semibold">
                            <span>{t.freelancerCalculator.summary.contributionsLabel}</span>
                            <span>{formatCurrency(calculation.contributionsAnnual, currency, rates)}</span>
                        </div>
                        <p className="mt-2 text-xs text-brand-navy/70">
                            {t.freelancerCalculator.explanations.contributions(
                                formatALL(CORE_CONSTANTS.PagaMinimale)
                            )}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-brand-navy/10 bg-white/80 px-4 py-3 text-sm text-brand-navy">
                        <div className="flex justify-between font-semibold">
                            <span>{t.freelancerCalculator.summary.profitTaxLabel}</span>
                            <span>{formatCurrency(calculation.profitTax, currency, rates)}</span>
                        </div>
                        <p className="mt-2 text-xs text-brand-navy/70">
                            {t.freelancerCalculator.explanations.profitTax(
                                formatALL(FREE_PROF_TAX_RATES.AnnualThreshold1)
                            )}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-sm font-semibold text-brand-navy/80">
                            {t.freelancerCalculator.summary.mixLabel}
                        </h4>
                        <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-brand-navy/10">
                            <div
                                className="h-full bg-brand-cyan transition-all"
                                style={{ width: `${calculation.normalizedMix.localShare}%` }}
                                aria-hidden="true"
                            />
                        </div>
                        <div className="mt-2 flex justify-between text-xs font-semibold uppercase tracking-wide text-brand-navy/70">
                            <span>
                                {t.freelancerCalculator.summary.local}: {calculation.normalizedMix.localShare}%
                            </span>
                            <span>
                                {t.freelancerCalculator.summary.foreign}: {calculation.normalizedMix.foreignShare}%
                            </span>
                        </div>
                    </div>
                </aside>
            </div>

            {warningsToDisplay.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-brand-red">
                        {t.freelancerCalculator.warnings.title}
                    </h3>
                    {warningsToDisplay.map((warning) => (
                        <InfoAlert
                            key={warning}
                            title={t.freelancerCalculator.warnings[warning].title}
                            type="danger"
                        >
                            {t.freelancerCalculator.warnings[warning].body}
                        </InfoAlert>
                    ))}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ResultCard
                    title={t.grossAnnualTurnoverCard}
                    value={calculation.annualIncomeALL}
                    currency={currency}
                    rates={rates}
                />
                <ResultCard
                    title={t.netAnnualIncome}
                    value={calculation.netIncomeAfterTax}
                    currency={currency}
                    rates={rates}
                    isNet={true}
                />
            </div>

            <div className="rounded-3xl border border-brand-cyan/20 bg-white/70 p-6 shadow-xl backdrop-blur space-y-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-brand-navy">
                            {t.freelancerCalculator.table.heading}
                        </h3>
                        <p className="text-sm text-brand-navy/70">
                            {t.freelancerCalculator.profitBands.zeroRate}
                        </p>
                        <p className="text-sm text-brand-navy/70">
                            {t.freelancerCalculator.profitBands.highRate}
                        </p>
                    </div>
                    <div className="rounded-2xl border border-brand-navy/10 bg-brand-navy/5 p-4 text-sm text-brand-navy/80">
                        <p className="font-semibold">
                            {t.freelancerCalculator.summary.netLabel}: {formatCurrency(calculation.netIncomeAfterTax, currency, rates)}
                        </p>
                        <p className="mt-1 text-xs">
                            {t.freelancerCalculator.explanations.profitTax(
                                formatALL(FREE_PROF_TAX_RATES.AnnualThreshold1)
                            )}
                        </p>
                    </div>
                </div>
                <div className="grid gap-3 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 p-4 text-sm text-brand-navy">
                    <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-navy/60">
                        {t.freelancerCalculator.profitBands.heading}
                    </h4>
                    {calculation.profitBands.map((band) => {
                        const minLabel = formatALL(band.min);
                        const maxLabelRaw = band.max === Infinity ? '∞' : formatALL(band.max);
                        const rangeLabel = t.freelancerCalculator.profitBands.rangeLabel(minLabel, maxLabelRaw);
                        const ratePercent = `${Math.round(band.rate * 100)}%`;
                        return (
                            <div
                                key={band.id}
                                className="flex flex-col gap-1 rounded-xl border border-brand-navy/10 bg-white/80 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <div className="text-sm font-semibold text-brand-navy">{rangeLabel}</div>
                                    <div className="text-xs text-brand-navy/60">
                                        {t.freelancerCalculator.profitBands.rateLabel(ratePercent)}
                                    </div>
                                </div>
                                <div className="text-xs text-brand-navy/60 text-right space-y-1">
                                    <div>
                                        {t.freelancerCalculator.profitBands.amountLabel}:{' '}
                                        <span className="font-semibold text-brand-navy">
                                            {formatCurrency(band.amount, currency, rates)}
                                        </span>
                                    </div>
                                    <div>
                                        {t.freelancerCalculator.profitBands.taxLabel}:{' '}
                                        <span className="font-semibold text-brand-navy">
                                            {formatCurrency(band.tax, currency, rates)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-brand-navy/10 text-sm text-brand-navy">
                        <thead className="bg-brand-cyan/10 text-xs uppercase tracking-wide text-brand-navy/70">
                            <tr>
                                <th scope="col" className="px-4 py-3 text-left">
                                    {t.freelancerCalculator.table.columns.obligation}
                                </th>
                                <th scope="col" className="px-4 py-3 text-right">
                                    {t.freelancerCalculator.table.columns.amount}
                                </th>
                                <th scope="col" className="px-4 py-3 text-left">
                                    {t.freelancerCalculator.table.columns.notes}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-brand-navy/10">
                            <tr>
                                <td className="px-4 py-3 font-semibold">
                                    {t.freelancerCalculator.table.rows.gross.label}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-brand-navy">
                                    {formatCurrency(calculation.annualIncomeALL, currency, rates)}
                                </td>
                                <td className="px-4 py-3 text-brand-navy/70">
                                    {t.freelancerCalculator.table.rows.gross.note}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-semibold">
                                    {t.freelancerCalculator.table.rows.contributions.label}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-brand-navy">
                                    {formatCurrency(calculation.contributionsAnnual, currency, rates)}
                                </td>
                                <td className="px-4 py-3 text-brand-navy/70">
                                    {t.freelancerCalculator.table.rows.contributions.note(
                                        formatALL(CORE_CONSTANTS.PagaMinimale)
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-semibold">
                                    {t.freelancerCalculator.table.rows.profitTax.label}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-brand-navy">
                                    {formatCurrency(calculation.profitTax, currency, rates)}
                                </td>
                                <td className="px-4 py-3 text-brand-navy/70">
                                    {t.freelancerCalculator.table.rows.profitTax.note(
                                        formatALL(FREE_PROF_TAX_RATES.AnnualThreshold1)
                                    )}
                                </td>
                            </tr>
                            <tr>
                                <td className="px-4 py-3 font-semibold">
                                    {t.freelancerCalculator.table.rows.net.label}
                                </td>
                                <td className="px-4 py-3 text-right font-bold text-brand-navy">
                                    {formatCurrency(calculation.netIncomeAfterTax, currency, rates)}
                                </td>
                                <td className="px-4 py-3 text-brand-navy/70">
                                    {t.freelancerCalculator.table.rows.net.note}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
