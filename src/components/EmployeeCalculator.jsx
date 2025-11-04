import React, { useState, useMemo, useCallback } from 'react';
import { CORE_CONSTANTS, TAP_BRACKETS_2024 } from '../constants';
import { formatCurrency } from '../utils';
import { ResultCard, SectionTitle, InputGroup, DetailRow } from './Shared';
import { IconUser, IconAlertTriangle, IconX, IconUsers, IconTrendingUp, IconTrendingDown } from './Icons';

// Calculation logic specific to the employee
const calculateEmployeeTax = (grossMonthlySalary) => {
    if (grossMonthlySalary < CORE_CONSTANTS.PagaMinimale) {
        grossMonthlySalary = CORE_CONSTANTS.PagaMinimale;
    }

    const contributionBase = Math.min(grossMonthlySalary, CORE_CONSTANTS.PagaMaksimale);
    const employeeSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployee;
    const employeeHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployee;
    const totalEmployeeContributions = employeeSocial + employeeHealth;

    const employerSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployer;
    const employerHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployer;
    const totalEmployerContributions = employerSocial + employerHealth;

    let taxAmount = 0;
    if (grossMonthlySalary > 200000) {
        taxAmount = TAP_BRACKETS_2024[2].fixedTax + (grossMonthlySalary - TAP_BRACKETS_2024[2].deduction) * TAP_BRACKETS_2024[2].rate;
    } else if (grossMonthlySalary > 40000) {
        taxAmount = (grossMonthlySalary - TAP_BRACKETS_2024[1].deduction) * TAP_BRACKETS_2024[1].rate;
    }
    taxAmount = Math.max(0, taxAmount);

    const totalEmployeeDeductions = totalEmployeeContributions + taxAmount;
    const netSalary = grossMonthlySalary - totalEmployeeDeductions;
    const totalEmployerCost = grossMonthlySalary + totalEmployerContributions;

    return {
        grossSalary: grossMonthlySalary,
        netSalary,
        employeeSocial,
        employeeHealth,
        totalEmployeeContributions,
        taxAmount,
        totalEmployeeDeductions,
        employerSocial,
        employerHealth,
        totalEmployerContributions,
        totalEmployerCost,
        contributionBase,
    };
};

const solveGrossFromNet = (targetNetSalary) => {
    const minimumCalculation = calculateEmployeeTax(CORE_CONSTANTS.PagaMinimale);

    if (targetNetSalary <= minimumCalculation.netSalary) {
        return { grossSalary: minimumCalculation.grossSalary, calculation: minimumCalculation };
    }

    let low = CORE_CONSTANTS.PagaMinimale;
    let high = Math.max(targetNetSalary, CORE_CONSTANTS.PagaMinimale * 1.5);
    let highCalculation = calculateEmployeeTax(high);
    let iterations = 0;

    while (highCalculation.netSalary < targetNetSalary && iterations < 60) {
        low = high;
        high *= 2;
        highCalculation = calculateEmployeeTax(high);
        iterations += 1;
    }

    let resultCalculation = highCalculation;

    for (let i = 0; i < 80; i++) {
        const mid = (low + high) / 2;
        const midCalculation = calculateEmployeeTax(mid);
        if (Math.abs(midCalculation.netSalary - targetNetSalary) <= 0.5) {
            resultCalculation = midCalculation;
            break;
        }

        if (midCalculation.netSalary >= targetNetSalary) {
            resultCalculation = midCalculation;
            high = mid;
        } else {
            low = mid;
        }
    }

    return { grossSalary: resultCalculation.grossSalary, calculation: resultCalculation };
};

export const EmployeeCalculator = ({ t, currency, rates }) => {
    const [inputMode, setInputMode] = useState('gross');
    const [inputValue, setInputValue] = useState(74010);
    const [workingDays, setWorkingDays] = useState(22);
    const [showAlert, setShowAlert] = useState(true);

    const rate = useMemo(() => rates[currency] || 1, [rates, currency]);

    const baseAmountALL = useMemo(() => {
        const numValue = parseFloat(inputValue);
        if (isNaN(numValue) || numValue < 0) return 0;
        return numValue * rate;
    }, [inputValue, rate]);

    const displayValue = inputValue === 0 ? '' : inputValue;

    const handleSalaryChange = (e) => {
        const value = e.target.value;
        setInputValue(value === '' ? 0 : parseFloat(value));
    };

    const convertFromALLForInput = useCallback((valueALL) => {
        const converted = valueALL / rate;
        if (currency === 'ALL') {
            return Math.round(converted);
        }
        return parseFloat(converted.toFixed(2));
    }, [currency, rate]);

    const handleModeChange = useCallback((mode) => {
        if (mode === inputMode) return;

        const currentALL = baseAmountALL;

        if (mode === 'net') {
            const currentCalculation = calculateEmployeeTax(currentALL);
            setInputValue(convertFromALLForInput(currentCalculation.netSalary));
        } else {
            const { grossSalary } = solveGrossFromNet(currentALL);
            setInputValue(convertFromALLForInput(grossSalary));
        }

        setInputMode(mode);
    }, [inputMode, baseAmountALL, convertFromALLForInput]);

    const handleDaysChange = (e) => {
        const value = parseInt(e.target.value, 10);
        setWorkingDays(isNaN(value) || value < 1 ? 1 : value);
    };

    const calculation = useMemo(() => {
        if (inputMode === 'gross') {
            return calculateEmployeeTax(baseAmountALL);
        }

        return solveGrossFromNet(baseAmountALL).calculation;
    }, [inputMode, baseAmountALL]);

    const dailyGross = workingDays ? calculation.grossSalary / workingDays : 0;
    const dailyNet = workingDays ? calculation.netSalary / workingDays : 0;

    return (
        <div className="space-y-10">
            <SectionTitle icon={IconUser} title={t.employeeTitle} />

            <div className="relative overflow-hidden rounded-3xl border border-brand-red/20 bg-brand-red/10 p-6 text-brand-red shadow-lg shadow-brand-red/20">
                <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand-red/30 blur-3xl opacity-60" aria-hidden="true"></div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-3">
                        <IconAlertTriangle className="mt-0.5 h-6 w-6 flex-shrink-0" />
                        <p className="text-sm font-semibold leading-relaxed" dangerouslySetInnerHTML={{ __html: t.tapWarning }} />
                    </div>
                    <button
                        type="button"
                        onClick={() => setShowAlert((prev) => !prev)}
                        className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-white/30"
                    >
                        {showAlert ? <IconX className="h-4 w-4" /> : <IconAlertTriangle className="h-4 w-4" />}
                        {showAlert ? 'Fshih paralajmërimin' : 'Shfaq paralajmërimin'}
                    </button>
                </div>
                {showAlert && (
                    <div className="mt-4 grid gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-white/90 backdrop-blur-sm">
                        <p className="text-xs leading-relaxed">
                            Mbani parasysh që ndryshimet ligjore mund të hyjnë në fuqi më herët se Janari 2025. Rekomandohet kontrolli periodik tek burimet zyrtare.
                        </p>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_minmax(0,1fr)]">
                <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InputGroup
                            label={inputMode === 'gross' ? t.grossMonthlySalary : t.netMonthlySalary}
                            value={displayValue}
                            onChange={handleSalaryChange}
                            placeholder="P.sh. 74010"
                            currency={currency}
                            className="input-focus-effect"
                        />
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-semibold text-brand-navy">
                                    {t.workingDays}
                                </label>
                                <span className="text-xs font-semibold uppercase tracking-wide text-brand-cyan">smart split</span>
                            </div>
                            <div className="relative">
                                <input
                                    type="number"
                                    min="1"
                                    max="31"
                                    value={workingDays}
                                    onChange={handleDaysChange}
                                    className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xl font-semibold text-brand-navy shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40 input-focus-effect"
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs uppercase tracking-wide text-gray-400">
                                    ditë
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-cyan">
                            <span>Modaliteti i llogaritjes</span>
                        </div>
                        <div className="inline-flex flex-wrap gap-2 rounded-full bg-white/60 p-1 shadow-inner">
                            <button
                                type="button"
                                onClick={() => handleModeChange('gross')}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    inputMode === 'gross'
                                        ? 'bg-brand-navy text-white shadow-lg'
                                        : 'text-brand-navy/70 hover:text-brand-navy'
                                }`}
                            >
                                <IconTrendingDown className="h-4 w-4" />
                                {t.modeGrossToNet}
                            </button>
                            <button
                                type="button"
                                onClick={() => handleModeChange('net')}
                                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                    inputMode === 'net'
                                        ? 'bg-brand-navy text-white shadow-lg'
                                        : 'text-brand-navy/70 hover:text-brand-navy'
                                }`}
                            >
                                <IconTrendingUp className="h-4 w-4" />
                                {t.modeNetToGross}
                            </button>
                        </div>
                    </div>
                </div>

                <aside className="rounded-3xl border border-brand-cyan/20 bg-brand-cyan/10 p-6 shadow-lg backdrop-blur">
                    <h3 className="text-lg font-semibold text-brand-navy">Të dhënat kryesore</h3>
                    <p className="mt-2 text-sm text-brand-navy/70">
                        Rifreskoni vlerat për të parë ndikimin e menjëhershëm në pagën ditore dhe në kostot e punëdhënësit.
                    </p>
                    <dl className="mt-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <dt className="text-brand-navy/70">Baza e kontributeve</dt>
                            <dd className="font-semibold text-brand-navy">{formatCurrency(calculation.contributionBase, currency, rates)}</dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-brand-navy/70">Raport Neto / Bruto</dt>
                            <dd className="font-semibold text-brand-navy">
                                {calculation.grossSalary === 0 ? '—' : `${((calculation.netSalary / calculation.grossSalary) * 100).toFixed(1)}%`}
                            </dd>
                        </div>
                        <div className="flex justify-between">
                            <dt className="text-brand-navy/70">Ditët mujore</dt>
                            <dd className="font-semibold text-brand-navy">{workingDays}</dd>
                        </div>
                    </dl>
                </aside>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                <ResultCard title={t.grossSalary} value={calculation.grossSalary} currency={currency} rates={rates} />
                <ResultCard title={t.netSalary} value={calculation.netSalary} currency={currency} rates={rates} isNet={true} />
                <ResultCard title={t.employerTotalCost} value={calculation.totalEmployerCost} currency={currency} rates={rates} />
            </div>

            <div className="rounded-3xl border border-brand-cyan/20 bg-white/70 p-6 shadow-xl backdrop-blur">
                <h3 className="text-xl font-bold text-brand-navy mb-6">{t.deductionBreakdown}</h3>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-brand-cyan/20 bg-white/80 p-6 shadow-sm">
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-brand-navy">
                            <IconUser className="h-5 w-5 text-brand-cyan" />
                            Punonjësi
                        </h4>
                        <div className="mt-4 space-y-2">
                            <DetailRow label={t.employeeContributions} value={calculation.totalEmployeeContributions} currency={currency} rates={rates} isHeader={true} />
                            <DetailRow label={t.employeeTax} value={calculation.taxAmount} currency={currency} rates={rates} isHeader={true} />
                            <div className="mt-4 rounded-xl border border-dashed border-brand-cyan/40 bg-brand-cyan/5 px-4 py-3">
                                <DetailRow label={t.employeeDeductions} value={calculation.totalEmployeeDeductions} currency={currency} rates={rates} isTotal={true} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-brand-cyan/20 bg-white/80 p-6 shadow-sm">
                        <h4 className="flex items-center gap-2 text-lg font-semibold text-brand-navy">
                            <IconUsers className="h-5 w-5 text-brand-cyan" />
                            Punëdhënësi
                        </h4>
                        <div className="mt-4 space-y-2">
                            <DetailRow label={t.employerContributionsLabel} value={calculation.totalEmployerContributions} currency={currency} rates={rates} isHeader={true} />
                            <div className="rounded-xl border border-gray-200/70 bg-gray-50/80 p-4 text-sm space-y-2">
                                <DetailRow label={t.employerSocial} value={calculation.employerSocial} currency={currency} rates={rates} />
                                <DetailRow label={t.employerHealth} value={calculation.employerHealth} currency={currency} rates={rates} />
                            </div>
                            <div className="mt-4 rounded-xl border border-dashed border-brand-cyan/40 bg-brand-cyan/5 px-4 py-3">
                                <DetailRow label={t.employerTotalCost} value={calculation.totalEmployerCost} currency={currency} rates={rates} isTotal={true} />
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-brand-cyan/20 bg-white/80 p-6 shadow-sm">
                        <h4 className="text-lg font-semibold text-brand-navy">Analiza ditore</h4>
                        <div className="mt-4 space-y-3">
                            <DetailRow label={t.dailyGross} value={dailyGross} currency={currency} rates={rates} />
                            <DetailRow label={t.dailyNet} value={dailyNet} currency={currency} rates={rates} />
                            <div className="rounded-xl border border-brand-navy/10 bg-brand-navy/5 px-4 py-3 text-xs text-brand-navy/70">
                                Shënim: Ndryshoni ditët e punës për të simuluar kontrata fleksibël, pushime të papaguara ose orar të pjesshëm.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
