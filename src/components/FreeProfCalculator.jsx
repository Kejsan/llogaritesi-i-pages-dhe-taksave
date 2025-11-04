import React, { useState, useMemo, useEffect } from 'react';
import { CORE_CONSTANTS, FREE_PROF_TAX_RATES } from '../constants';
import { formatCurrency, formatALL } from '../utils';
import { ResultCard, SectionTitle, InfoAlert, InputGroup, DetailRow } from './Shared';
import { IconBriefcase, IconCamera } from './Icons';

const calculateFreeProfTax = (grossAnnualTurnover, expenseMethod, actualExpenses = 0) => {
    let deductibleExpenses;
    let profitBeforeSocial;

    if (expenseMethod === 'presumed') {
        deductibleExpenses = grossAnnualTurnover * CORE_CONSTANTS.PresumedExpenseRate;
    } else {
        deductibleExpenses = actualExpenses;
    }
    profitBeforeSocial = grossAnnualTurnover - deductibleExpenses;

    const annualMinWageContributions = (CORE_CONSTANTS.PagaMinimale * CORE_CONSTANTS.TotalSelfEmployedRate) * 12;
    const taxableProfit = Math.max(0, profitBeforeSocial - annualMinWageContributions);

    let taxAmount = 0;
    let isUncertain = false;
    let taxRateLabel = '0%';

    if (taxableProfit > FREE_PROF_TAX_RATES.AnnualThreshold1) {
        const amountOverThreshold = taxableProfit - FREE_PROF_TAX_RATES.AnnualThreshold1;
        taxAmount = amountOverThreshold * FREE_PROF_TAX_RATES.RateHigh;
        isUncertain = true;
        taxRateLabel = `0% + 23% mbi ${formatALL(FREE_PROF_TAX_RATES.AnnualThreshold1)}`;
    } else if (taxableProfit > 0) {
        taxAmount = 0;
        isUncertain = true;
        taxRateLabel = `0% (Status i paqartë)`;
    }

    const netAnnualIncome = profitBeforeSocial - annualMinWageContributions - taxAmount;
    const requiresDIVA = grossAnnualTurnover > CORE_CONSTANTS.IncomeThresholdDIVA;
    const requiresVAT = grossAnnualTurnover > CORE_CONSTANTS.VatThreshold;

    return {
        grossAnnualTurnover,
        deductibleExpenses,
        annualMinWageContributions,
        taxableProfit,
        taxAmount,
        netAnnualIncome,
        requiresDIVA,
        requiresVAT,
        isUncertain,
        taxRateLabel,
    };
};

export const FreeProfCalculator = ({ t, currency, rates, isInfluencer = false }) => {
    const [inputValue, setInputValue] = useState(0);
    const [expenseMethod, setExpenseMethod] = useState('presumed');
    const [actualExpensesInput, setActualExpensesInput] = useState(0);

    useEffect(() => {
        if (inputValue === 0) {
            const initialALL = 5000000;
            setInputValue(initialALL / (rates[currency] || 1));
        }
    }, [rates, currency, inputValue]);

    const grossTurnoverALL = useMemo(() => {
        const numValue = parseFloat(inputValue);
        if (isNaN(numValue) || numValue < 0) return 0;
        return numValue * (rates[currency] || 1);
    }, [inputValue, currency, rates]);

    const actualExpensesALL = useMemo(() => {
        const numValue = parseFloat(actualExpensesInput);
        if (isNaN(numValue) || numValue < 0) return 0;
        return numValue * (rates[currency] || 1);
    }, [actualExpensesInput, currency, rates]);

    const handleTurnoverChange = (e) => {
        const value = e.target.value;
        setInputValue(value === '' ? 0 : parseFloat(value));
    };

    const handleExpenseChange = (e) => {
        const value = e.target.value;
        setActualExpensesInput(value === '' ? 0 : parseFloat(value));
    };

    const calculation = useMemo(
        () => calculateFreeProfTax(grossTurnoverALL, expenseMethod, actualExpensesALL),
        [grossTurnoverALL, expenseMethod, actualExpensesALL]
    );

    let taxStatusText = calculation.taxRateLabel;
    let taxStatusClass = 'bg-yellow-100 text-yellow-800';
    if (calculation.taxableProfit > FREE_PROF_TAX_RATES.AnnualThreshold1) {
        taxStatusClass = 'bg-brand-red/10 text-brand-red';
    } else if (calculation.isUncertain) {
        taxStatusClass = 'bg-yellow-100 text-yellow-800';
    } else {
        taxStatusClass = 'bg-green-100 text-green-800';
    }

    const turnoverDisplayValue = inputValue === 0 ? '' : inputValue;
    const expenseDisplayValue = actualExpensesInput === 0 ? '' : actualExpensesInput;

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
                <div className="rounded-3xl border border-white/35 bg-white/70 p-6 shadow-xl backdrop-blur">
                    <InputGroup
                        label={t.grossAnnualTurnover}
                        value={turnoverDisplayValue}
                        onChange={handleTurnoverChange}
                        placeholder="P.sh. 5000000"
                        currency={currency}
                        className="input-focus-effect"
                    />

                    <div className="my-6">
                        <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-brand-navy/60">{t.expenseMethod}</h3>
                        <div className="mt-3 inline-flex gap-2 rounded-full bg-brand-cyan/10 p-1">
                            <button
                                onClick={() => setExpenseMethod('presumed')}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    expenseMethod === 'presumed'
                                        ? 'bg-brand-navy text-white shadow-lg'
                                        : 'text-brand-navy/70 hover:text-brand-navy'
                                }`}
                            >
                                {t.presumedExpenses}
                            </button>
                            <button
                                onClick={() => setExpenseMethod('actual')}
                                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    expenseMethod === 'actual'
                                        ? 'bg-brand-navy text-white shadow-lg'
                                        : 'text-brand-navy/70 hover:text-brand-navy'
                                }`}
                            >
                                {t.actualExpenses}
                            </button>
                        </div>
                    </div>

                    {expenseMethod === 'actual' && (
                        <InputGroup
                            label="Shpenzimet Aktuale të Zbritshme (Vjetore)"
                            value={expenseDisplayValue}
                            onChange={handleExpenseChange}
                            placeholder="Fut shpenzimet totale"
                            currency={currency}
                            className="input-focus-effect"
                        />
                    )}
                </div>

                <aside className="rounded-3xl border border-brand-cyan/30 bg-brand-cyan/10 p-6 shadow-lg backdrop-blur">
                    <h3 className="text-lg font-semibold text-brand-navy">Snapshot financiar</h3>
                    <dl className="mt-4 space-y-3 text-sm text-brand-navy/80">
                        <div className="flex justify-between">
                            <dt>Xhiro bruto</dt>
                            <dd className="font-semibold text-brand-navy">{formatCurrency(calculation.grossAnnualTurnover, currency, rates)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>Shpenzime të zbritshme</dt>
                            <dd className="font-semibold text-brand-navy">{formatCurrency(calculation.deductibleExpenses, currency, rates)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt>Fitimi neto para tatimit</dt>
                            <dd className="font-semibold text-brand-navy">{formatCurrency(calculation.taxableProfit, currency, rates)}</dd>
                        </div>
                    </dl>
                </aside>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <ResultCard title={t.grossAnnualTurnoverCard} value={calculation.grossAnnualTurnover} currency={currency} rates={rates} />
                <ResultCard title={t.netAnnualIncome} value={calculation.netAnnualIncome} currency={currency} rates={rates} isNet={true} />
            </div>

            <div className="rounded-3xl border border-brand-cyan/20 bg-white/70 p-6 shadow-xl backdrop-blur">
                <h3 className="text-xl font-bold text-brand-navy mb-6">{t.obligationBreakdown}</h3>
                <div className="space-y-3">
                    <DetailRow
                        label={`${t.calculatedExpenses} (${expenseMethod === 'presumed' ? '30%' : 'Manuale'})`}
                        value={calculation.deductibleExpenses}
                        currency={currency}
                        rates={rates}
                        isHeader={true}
                    />
                    <DetailRow label={t.annualContributions} value={calculation.annualMinWageContributions} currency={currency} rates={rates} isHeader={true} />
                    <DetailRow label={t.taxableProfit} value={calculation.taxableProfit} currency={currency} rates={rates} isHeader={true} />
                    <DetailRow label={t.incomeTax} value={calculation.taxAmount} currency={currency} rates={rates} isHeader={true} isTotal={true} />
                    <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-brand-cyan/40 bg-brand-cyan/10 px-4 py-3 text-sm font-semibold text-brand-navy">
                        <span>{t.taxRateUsed}</span>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${taxStatusClass}`}>{taxStatusText}</span>
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-brand-navy/15 bg-white/70 p-6 shadow-xl backdrop-blur">
                <h3 className="text-xl font-bold text-brand-navy mb-4">{t.legalObligations}</h3>
                <div className="grid gap-4 lg:grid-cols-2">
                    <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-2xl border border-brand-navy/10 bg-white/80 px-4 py-3 text-sm text-brand-navy">
                            <span className="font-semibold">{t.vatObligation}</span>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${calculation.requiresVAT ? 'bg-brand-red' : 'bg-brand-cyan'}`}>
                                {calculation.requiresVAT ? t.vatYes(formatALL(CORE_CONSTANTS.VatThreshold / (rates['ALL'] || 1))) : t.vatNo(formatALL(CORE_CONSTANTS.VatThreshold / (rates['ALL'] || 1)))}
                            </span>
                        </div>
                        <div className="flex items-center justify-between rounded-2xl border border-brand-navy/10 bg-white/80 px-4 py-3 text-sm text-brand-navy">
                            <span className="font-semibold">{t.divaObligation}</span>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold text-white ${calculation.requiresDIVA ? 'bg-brand-red' : 'bg-brand-cyan'}`}>
                                {calculation.requiresDIVA ? t.divaYes(formatALL(CORE_CONSTANTS.IncomeThresholdDIVA / (rates['ALL'] || 1))) : t.divaNo}
                            </span>
                        </div>
                        <InfoAlert title={t.foreignClients}>
                            {t.foreignClientsText}
                        </InfoAlert>
                    </div>
                    <div className="space-y-3 text-sm text-brand-navy/80">
                        <p className="rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 p-4">
                            Për klientët e huaj përdorni valutën korrekte dhe ruani dëshmitë e eksportit për TVSH zero.
                        </p>
                        <p className="rounded-2xl border border-brand-navy/15 bg-brand-navy/5 p-4">
                            Mbani evidencë mujore të shpenzimeve dhe kontratave për të justifikuar fitimin neto në rast auditimi.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
