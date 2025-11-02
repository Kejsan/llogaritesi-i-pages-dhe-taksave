import React, { useState, useMemo, useCallback } from 'react';
import { CORE_CONSTANTS, TAP_BRACKETS_2024 } from '../constants';
import { formatCurrency } from '../utils';
import { ResultCard, SectionTitle, InfoAlert, InputGroup, DetailRow } from './Shared';
import { IconUser, IconAlertTriangle, IconX, IconUsers } from './Icons';

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

    const dailyGross = calculation.grossSalary / workingDays;
    const dailyNet = calculation.netSalary / workingDays;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <SectionTitle icon={IconUser} title={t.employeeTitle} />

            {showAlert && (
                <div className="mb-6 p-4 rounded-xl bg-brand-red/10 border border-brand-red text-brand-red flex justify-between items-start">
                    <p className="text-sm font-medium flex items-center">
                        <IconAlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: t.tapWarning }} />
                    </p>
                    <button onClick={() => setShowAlert(false)} className="text-brand-red hover:opacity-75 ml-2">
                        <IconX className="w-5 h-5" />
                    </button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                <span className="text-sm font-semibold text-gray-700">{t.salaryInputMode}</span>
                <div className="inline-flex bg-gray-100 p-1 rounded-lg">
                    <button
                        type="button"
                        onClick={() => handleModeChange('gross')}
                        className={`px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                            inputMode === 'gross'
                                ? 'bg-brand-cyan text-white shadow'
                                : 'text-gray-600 hover:text-brand-navy'
                        }`}
                    >
                        {t.modeGrossToNet}
                    </button>
                    <button
                        type="button"
                        onClick={() => handleModeChange('net')}
                        className={`ml-1 px-3 py-1.5 text-sm font-semibold rounded-md transition-colors ${
                            inputMode === 'net'
                                ? 'bg-brand-cyan text-white shadow'
                                : 'text-gray-600 hover:text-brand-navy'
                        }`}
                    >
                        {t.modeNetToGross}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup
                    label={inputMode === 'gross' ? t.grossMonthlySalary : t.netMonthlySalary}
                    value={displayValue}
                    onChange={handleSalaryChange}
                    placeholder="P.sh. 74010"
                    currency={currency}
                />
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        {t.workingDays}
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="31"
                        value={workingDays}
                        onChange={handleDaysChange}
                        className="w-full pl-4 py-3 border border-gray-300 rounded-lg focus:ring-brand-cyan focus:border-brand-cyan text-xl"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 my-8">
                <ResultCard title={t.grossSalary} value={calculation.grossSalary} currency={currency} rates={rates} />
                <ResultCard title={t.netSalary} value={calculation.netSalary} currency={currency} rates={rates} isNet={true} />
                <ResultCard title={t.employerTotalCost} value={calculation.totalEmployerCost} currency={currency} rates={rates} />
            </div>

            <h3 className="text-xl font-bold text-brand-navy mb-4">{t.deductionBreakdown}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 border rounded-xl shadow-sm bg-gray-50/50">
                    <h4 className="font-semibold text-lg text-gray-800 flex items-center mb-3">
                        <IconUser className="w-5 h-5 mr-2 text-brand-cyan" />
                        Punonjësi
                    </h4>
                    <DetailRow label={t.employeeContributions} value={calculation.totalEmployeeContributions} currency={currency} rates={rates} isHeader={true}/>
                    <DetailRow label={t.employeeTax} value={calculation.taxAmount} currency={currency} rates={rates} isHeader={true}/>
                    <div className="border-t pt-3 mt-3">
                        <DetailRow label={t.employeeDeductions} value={calculation.totalEmployeeDeductions} currency={currency} rates={rates} isTotal={true}/>
                    </div>
                </div>

                <div className="p-5 border rounded-xl shadow-sm bg-gray-50/50">
                    <h4 className="font-semibold text-lg text-gray-800 flex items-center mb-3">
                        <IconUsers className="w-5 h-5 mr-2 text-brand-cyan" />
                        Punëdhënësi
                    </h4>
                    <DetailRow label={t.employerContributionsLabel} value={calculation.totalEmployerContributions} currency={currency} rates={rates} isHeader={true}/>
                    <div className="pl-4 text-sm space-y-1 mt-2">
                        <DetailRow label={t.employerSocial} value={calculation.employerSocial} currency={currency} rates={rates} />
                        <DetailRow label={t.employerHealth} value={calculation.employerHealth} currency={currency} rates={rates} />
                    </div>
                    <div className="border-t pt-3 mt-3">
                        <DetailRow label={t.employerTotalCost} value={calculation.totalEmployerCost} currency={currency} rates={rates} isTotal={true}/>
                    </div>
                </div>

                <div className="md:col-span-2 p-5 border rounded-xl shadow-sm bg-gray-50/50">
                    <h4 className="font-semibold text-lg text-gray-800 flex items-center mb-3">
                        Paga Ditore (Bazuar në {workingDays} ditë)
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <DetailRow label={t.dailyGross} value={dailyGross} currency={currency} rates={rates} />
                        <DetailRow label={t.dailyNet} value={dailyNet} currency={currency} rates={rates} />
                    </div>
                </div>

                <div className="md:col-span-2 border-t pt-4 mt-4 text-center">
                    <DetailRow label={t.maxContributionBase} value={CORE_CONSTANTS.PagaMaksimale} currency={currency} rates={rates} isConstant={true} />
                </div>
            </div>
        </div>
    );
};
