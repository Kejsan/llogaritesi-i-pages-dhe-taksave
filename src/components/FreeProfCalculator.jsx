import React, { useState, useMemo, useEffect } from 'react';
import { CORE_CONSTANTS, FREE_PROF_TAX_RATES } from '../constants';
import { formatCurrency, formatALL } from '../utils';
import { ResultCard, SectionTitle, InfoAlert, InputGroup, DetailRow } from './Shared';
import { IconBriefcase, IconCamera } from './Icons';

// Calculation logic specific to the freelancer/influencer
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
    let taxRateLabel = "0%";

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
        if(inputValue === 0) {
            const initialALL = 5000000;
            setInputValue(initialALL / (rates[currency] || 1));
        }
    }, [rates, currency]);

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
    let taxStatusClass = "bg-yellow-100 text-yellow-800";
    if (calculation.taxableProfit > FREE_PROF_TAX_RATES.AnnualThreshold1) {
        taxStatusClass = "bg-brand-red/10 text-brand-red";
    } else if (calculation.isUncertain) {
        taxStatusClass = "bg-yellow-100 text-yellow-800";
    } else {
        taxStatusClass = "bg-green-100 text-green-800";
    }

    const turnoverDisplayValue = inputValue === 0 ? '' : inputValue;
    const expenseDisplayValue = actualExpensesInput === 0 ? '' : actualExpensesInput;

    return (
        <div className="glassmorphism p-6 rounded-xl shadow-lg">
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

            <InputGroup
                label={t.grossAnnualTurnover}
                value={turnoverDisplayValue}
                onChange={handleTurnoverChange}
                placeholder="P.sh. 5000000"
                currency={currency}
                className="input-focus-effect"
            />

            <div className="my-8 text-center">
                <h3 className="text-xl font-bold text-brand-navy mb-4">{t.expenseMethod}</h3>
                <div className="inline-flex bg-gray-100 p-1 rounded-lg btn-3d">
                    <button
                        onClick={() => setExpenseMethod('presumed')}
                        className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                            expenseMethod === 'presumed'
                                ? 'bg-brand-cyan text-white shadow'
                                : 'text-gray-600 hover:text-brand-navy'
                        }`}
                    >
                        {t.presumedExpenses}
                    </button>
                    <button
                        onClick={() => setExpenseMethod('actual')}
                        className={`ml-1 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                            expenseMethod === 'actual'
                                ? 'bg-brand-cyan text-white shadow'
                                : 'text-gray-600 hover:text-brand-navy'
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 my-8 [perspective:1000px]">
                <ResultCard title={t.grossAnnualTurnoverCard} value={calculation.grossAnnualTurnover} currency={currency} rates={rates} />
                <ResultCard title={t.netAnnualIncome} value={calculation.netAnnualIncome} currency={currency} rates={rates} isNet={true} />
            </div>

            <div className="bg-white/50 p-6 rounded-xl mt-8">
                <h3 className="text-xl font-bold text-brand-navy mb-4">{t.obligationBreakdown}</h3>
                <div className="p-5 border rounded-xl shadow-sm bg-gray-50 space-y-3">
                    <DetailRow
                        label={`${t.calculatedExpenses} (${expenseMethod === 'presumed' ? '30%' : 'Manuale'})`}
                        value={calculation.deductibleExpenses}
                        currency={currency} rates={rates} isHeader={true}
                    />
                    <DetailRow label={t.annualContributions} value={calculation.annualMinWageContributions} currency={currency} rates={rates} isHeader={true} />
                    <DetailRow label={t.taxableProfit} value={calculation.taxableProfit} currency={currency} rates={rates} isHeader={true} />
                    <DetailRow label={t.incomeTax} value={calculation.taxAmount} currency={currency} rates={rates} isHeader={true} isTotal={true}/>

                    <div className="mt-4 pt-4 border-t border-dashed">
                        <div className="flex justify-between items-center text-sm sm:text-base font-bold">
                            <span>{t.taxRateUsed}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${taxStatusClass}`}>
                            {taxStatusText}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/50 p-6 rounded-xl mt-8">
                <h3 className="text-xl font-bold text-brand-navy mt-8 mb-4">{t.legalObligations}</h3>
                <div className="p-5 border rounded-xl shadow-sm bg-gray-50/50 space-y-4">
                    <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium">{t.vatObligation}</span>
                        <span className={`px-3 py-1 rounded-full font-bold text-xs ${calculation.requiresVAT ? 'bg-brand-red text-white' : 'bg-green-500 text-white'}`}>
                            {calculation.requiresVAT ? t.vatYes(formatALL(CORE_CONSTANTS.VatThreshold / (rates['ALL'] || 1))) : t.vatNo(formatALL(CORE_CONSTANTS.VatThreshold / (rates['ALL'] || 1)))}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-gray-700">
                        <span className="font-medium">{t.divaObligation}</span>
                        <span className={`px-3 py-1 rounded-full font-bold text-xs ${calculation.requiresDIVA ? 'bg-brand-red text-white' : 'bg-green-500 text-white'}`}>
                            {calculation.requiresDIVA ? t.divaYes(formatALL(CORE_CONSTANTS.IncomeThresholdDIVA / (rates['ALL'] || 1))) : t.divaNo}
                        </span>
                    </div>
                    <InfoAlert title={t.foreignClients}>
                        {t.foreignClientsText}
                    </InfoAlert>
                </div>
            </div>
        </div>
    );
};
