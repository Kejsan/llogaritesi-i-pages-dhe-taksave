import React, { useState, useMemo, useCallback } from 'react';
import { CORE_CONSTANTS } from '../constants';
import { formatCurrency } from '../utils';
import { calculateJobByMode, getVoluntaryPensionCap } from '../utils/salary';
import { SectionTitle, DetailRow, InfoAlert } from './Shared';
import {
    IconUser,
    IconUsers,
    IconTrendingUp,
    IconTrendingDown,
    IconChevronDown,
    IconCalculator,
} from './Icons';

const JOB_ROLES = [
    {
        key: 'primary',
        icon: IconUser,
        accent: 'from-brand-navy to-[#02027a]',
    },
    {
        key: 'secondary',
        icon: IconUsers,
        accent: 'from-brand-cyan to-brand-navy',
    },
    {
        key: 'tertiary',
        icon: IconCalculator,
        accent: 'from-brand-red/80 to-brand-navy',
    },
];

const DEFAULT_JOBS = [
    {
        key: 'primary',
        mode: 'gross',
        value: '74010',
        collapsed: false,
        active: true,
    },
    {
        key: 'secondary',
        mode: 'gross',
        value: '',
        collapsed: true,
        active: false,
    },
    {
        key: 'tertiary',
        mode: 'gross',
        value: '',
        collapsed: true,
        active: false,
    },
];

const VOLUNTARY_CAP = getVoluntaryPensionCap();

const parseNumber = (value) => {
    if (value === '' || value === null || value === undefined) return 0;
    const parsed = typeof value === 'number' ? value : parseFloat(String(value).replace(',', '.'));
    return Number.isFinite(parsed) ? parsed : 0;
};

const getJobMeta = (t, key) => ({
    title: t[`jobRole_${key}`],
    badge: t[`jobRoleBadge_${key}`],
    description: t[`jobRoleDescription_${key}`],
});

const EXAMPLE_PRESETS = (t) => ([
    {
        id: 'single-tech-2025',
        label: t.examplesSingleTechLabel,
        description: t.examplesSingleTechDescription,
        jobMode: 'single',
        jobs: {
            primary: { mode: 'gross', amountALL: 145000 },
            secondary: { active: false },
            tertiary: { active: false },
        },
        childDeductionALL: 0,
        voluntaryALL: 0,
    },
    {
        id: 'dual-educator-2025',
        label: t.examplesDualEducatorLabel,
        description: t.examplesDualEducatorDescription,
        jobMode: 'multi',
        jobs: {
            primary: { mode: 'net', amountALL: 82000 },
            secondary: { active: true, mode: 'gross', amountALL: 45000 },
            tertiary: { active: false },
        },
        childDeductionALL: 15000,
        voluntaryALL: 0,
    },
    {
        id: 'triple-healthcare-2025',
        label: t.examplesTripleHealthcareLabel,
        description: t.examplesTripleHealthcareDescription,
        jobMode: 'multi',
        jobs: {
            primary: { mode: 'gross', amountALL: 185000 },
            secondary: { active: true, mode: 'gross', amountALL: 38000 },
            tertiary: { active: true, mode: 'gross', amountALL: 22000 },
        },
        childDeductionALL: 0,
        voluntaryALL: 32000,
    },
]);

const JobModeToggle = ({ currentMode, onChange, t }) => (
    <div className="inline-flex flex-wrap gap-2 rounded-full bg-white/60 p-1 shadow-inner">
        <button
            type="button"
            onClick={() => onChange('gross')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentMode === 'gross' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'
            }`}
        >
            <IconTrendingDown className="h-4 w-4" />
            {t.modeGrossToNet}
        </button>
        <button
            type="button"
            onClick={() => onChange('net')}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                currentMode === 'net' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'
            }`}
        >
            <IconTrendingUp className="h-4 w-4" />
            {t.modeNetToGross}
        </button>
    </div>
);

const JobCard = ({
    job,
    meta,
    icon: Icon,
    accent,
    currency,
    rates,
    rate,
    childDeductionALL,
    voluntaryALL,
    onValueChange,
    onModeChange,
    onCollapseToggle,
    onActivationToggle,
    isMultiMode,
    calculation,
    t,
}) => {
    const displayValue = job.value === '' || job.value === null ? '' : job.value;

    const handleInputChange = (event) => {
        onValueChange(job.key, event.target.value);
    };

    const handleModeChange = (mode) => {
        if (mode === job.mode) return;
        const amountALL = parseNumber(job.value) * rate;
        if (amountALL <= 0) {
            onModeChange(job.key, mode, job.value);
            return;
        }

        let nextValueALL = amountALL;
        if (mode === 'net') {
            const grossCalc = calculateJobByMode({
                amount: amountALL,
                mode: 'gross',
                jobType: job.key,
                childDeduction: childDeductionALL,
                voluntaryPension: voluntaryALL,
            });
            nextValueALL = grossCalc.netSalary;
        } else {
            const netCalculation = calculateJobByMode({
                amount: amountALL,
                mode: 'net',
                jobType: job.key,
                childDeduction: childDeductionALL,
                voluntaryPension: voluntaryALL,
            });
            nextValueALL = netCalculation.grossSalary;
        }

        const converted = currency === 'ALL'
            ? Math.round(nextValueALL)
            : parseFloat((nextValueALL / rate).toFixed(2));
        onModeChange(job.key, mode, String(converted));
    };

    const cardClasses = job.active
        ? 'border-brand-cyan/30 bg-white/80'
        : 'border-dashed border-gray-300 bg-white/50 text-gray-400';

    return (
        <div className={`rounded-3xl border ${cardClasses} shadow-xl backdrop-blur`}> 
            <div className="flex items-start justify-between gap-4 p-6">
                <div className="flex items-start gap-4">
                    <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent} text-white shadow-lg`}>
                        <Icon className="h-6 w-6" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3">
                            <h3 className="text-lg font-semibold text-brand-navy">{meta.title}</h3>
                            <span className="rounded-full bg-brand-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-cyan">
                                {meta.badge}
                            </span>
                        </div>
                        <p className="mt-1 text-sm text-brand-navy/70">{meta.description}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={() => onCollapseToggle(job.key)}
                    className="flex items-center gap-2 rounded-full border border-brand-navy/10 bg-brand-navy/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-navy/80"
                >
                    <IconChevronDown className={`h-4 w-4 transition-transform ${job.collapsed ? '' : 'rotate-180'}`} />
                    {job.collapsed ? t.expandCard : t.collapseCard}
                </button>
            </div>

            {(!isMultiMode && job.key !== 'primary') ? null : (
                <div className={`${job.collapsed ? 'hidden' : 'block'} border-t border-brand-cyan/20 bg-white/70 px-6 py-5 space-y-6`}>
                    {job.key !== 'primary' && (
                        <div className="flex items-center justify-between rounded-2xl border border-dashed border-brand-navy/20 bg-brand-navy/5 px-4 py-3">
                            <span className="text-sm font-semibold text-brand-navy/70">{t.secondaryToggleLabel}</span>
                            <button
                                type="button"
                                onClick={() => onActivationToggle(job.key, !job.active)}
                                className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                                    job.active ? 'bg-brand-navy text-white' : 'bg-white text-brand-navy border border-brand-navy/20'
                                }`}
                            >
                                {job.active ? t.deactivateJob : t.activateJob}
                            </button>
                        </div>
                    )}

                    {job.active && (
                        <>
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div className="flex items-center gap-3 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-cyan">
                                    <span>{t.salaryInputMode}</span>
                                </div>
                                <JobModeToggle currentMode={job.mode} onChange={handleModeChange} t={t} />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-brand-navy mb-2">
                                    {job.mode === 'gross' ? t.grossMonthlySalary : t.netMonthlySalary}
                                </label>
                                <div className="relative rounded-2xl shadow-sm">
                                    <input
                                        type="number"
                                        min="0"
                                        step="100"
                                        value={displayValue}
                                        onChange={handleInputChange}
                                        placeholder="74010"
                                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xl font-semibold text-brand-navy shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40 input-focus-effect"
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs uppercase tracking-wide text-gray-400">
                                        {currency}
                                    </div>
                                </div>
                            </div>

                            {calculation && (
                                <div className="rounded-2xl border border-brand-cyan/20 bg-white/80 p-4 space-y-3">
                                    <DetailRow label={t.grossSalary} value={calculation.grossSalary} currency={currency} rates={rates} />
                                    <DetailRow label={t.netSalary} value={calculation.netSalary} currency={currency} rates={rates} />
                                    <DetailRow label={t.employeeContributions} value={calculation.totalEmployeeContributions} currency={currency} rates={rates} isHeader />
                                    {job.key === 'primary' && (
                                        <DetailRow label={t.employeeTax} value={calculation.taxAmount} currency={currency} rates={rates} isHeader />
                                    )}
                                    <DetailRow label={t.voluntaryPensionLabel} value={calculation.voluntaryPensionUsed} currency={currency} rates={rates} />
                                    <div className="pt-3 border-t border-dashed border-brand-cyan/30">
                                        <DetailRow label={t.employeeDeductions} value={calculation.totalEmployeeDeductions} currency={currency} rates={rates} isTotal />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {!job.active && job.key !== 'primary' && (
                        <p className="text-sm text-brand-navy/60">{t.secondaryJobDisabled}</p>
                    )}
                </div>
            )}
        </div>
    );
};

const convertFromALLForDisplay = (valueALL, currency, rate) => {
    if (!Number.isFinite(valueALL)) return '0';
    if (currency === 'ALL') {
        return String(Math.round(valueALL));
    }
    return String(parseFloat((valueALL / rate).toFixed(2)));
};

const getJobMeta = (t) => ({
    [JOB_TYPES.PRIMARY]: {
        title: t.jobCards.primary.title,
        badge: t.jobCards.primary.badge,
        accent: 'from-brand-navy via-[#020272] to-brand-cyan/60',
        icon: IconUser,
    },
    [JOB_TYPES.SECONDARY]: {
        title: t.jobCards.secondary.title,
        badge: t.jobCards.secondary.badge,
        accent: 'from-brand-cyan/70 via-brand-cyan to-brand-red/40',
        icon: IconUsers,
    },
    [JOB_TYPES.TERTIARY]: {
        title: t.jobCards.tertiary.title,
        badge: t.jobCards.tertiary.badge,
        accent: 'from-brand-red/70 via-brand-red to-brand-cyan/40',
        icon: IconUsers,
    },
});

const presetConfigs = (t) => ([
    {
        key: 'single-family',
        label: t.examples.presets.singleFamily.label,
        description: t.examples.presets.singleFamily.description,
        setup: {
            jobLayout: 'single',
            tertiary: false,
            dependents: 2,
            voluntaryPension: 25000,
            jobs: {
                [JOB_TYPES.PRIMARY]: {
                    mode: 'gross',
                    valueALL: 95000,
                    workingDays: 22,
                },
            },
        },
    },
    {
        key: 'dual-creative',
        label: t.examples.presets.dualCreative.label,
        description: t.examples.presets.dualCreative.description,
        setup: {
            jobLayout: 'multi',
            tertiary: false,
            dependents: 0,
            voluntaryPension: 0,
            jobs: {
                [JOB_TYPES.PRIMARY]: {
                    mode: 'gross',
                    valueALL: 120000,
                    workingDays: 21,
                },
                [JOB_TYPES.SECONDARY]: {
                    mode: 'net',
                    valueALL: 60000,
                    workingDays: 8,
                },
            },
        },
    },
    {
        key: 'triple-team',
        label: t.examples.presets.tripleTeam.label,
        description: t.examples.presets.tripleTeam.description,
        setup: {
            jobLayout: 'multi',
            tertiary: true,
            dependents: 1,
            voluntaryPension: 40000,
            jobs: {
                [JOB_TYPES.PRIMARY]: {
                    mode: 'gross',
                    valueALL: 150000,
                    workingDays: 22,
                },
                [JOB_TYPES.SECONDARY]: {
                    mode: 'gross',
                    valueALL: 45000,
                    workingDays: 12,
                },
                [JOB_TYPES.TERTIARY]: {
                    mode: 'net',
                    valueALL: 30000,
                    workingDays: 6,
                },
            },
        },
    },
]);

export const EmployeeCalculator = ({ t, currency, rates }) => {
    const [jobMode, setJobMode] = useState('single');
    const [jobs, setJobs] = useState(DEFAULT_JOBS);
    const [childDeductionValue, setChildDeductionValue] = useState('0');
    const [voluntaryPensionValue, setVoluntaryPensionValue] = useState('0');

    const rate = useMemo(() => rates[currency] || 1, [rates, currency]);
    const jobMeta = useMemo(() => getJobMeta(t), [t]);
    const presets = useMemo(() => presetConfigs(t), [t]);

    const childDeductionALL = useMemo(() => {
        const numeric = parseNumber(childDeductionValue);
        return numeric * rate;
    }, [childDeductionValue, rate]);

    const voluntaryALL = useMemo(() => {
        const numeric = parseNumber(voluntaryPensionValue);
        return Math.min(VOLUNTARY_CAP, numeric * rate);
    }, [voluntaryPensionValue, rate]);

    const activeJobs = useMemo(() => {
        if (jobMode === 'single') {
            return jobs.map(job => ({
                ...job,
                active: job.key === 'primary',
            }));
        }
        return jobs;
    }, [jobs, jobMode]);

    const jobCalculations = useMemo(() => {
        return activeJobs.map(job => {
            if (!job.active) return null;
            const amountALL = parseNumber(job.value) * rate;
            if (amountALL <= 0) {
                return null;
            }
            return calculateJobByMode({
                amount: amountALL,
                mode: job.mode,
                jobType: job.key,
                childDeduction: childDeductionALL,
                voluntaryPension: voluntaryALL,
            });
        });
    }, [activeJobs, childDeductionALL, voluntaryALL, rate]);

    const totals = useMemo(() => {
        return jobCalculations.reduce(
            (acc, calc) => {
                if (!calc) return acc;
                acc.gross += calc.grossSalary;
                acc.net += calc.netSalary;
                acc.employeeDeductions += calc.totalEmployeeDeductions;
                acc.employerCost += calc.totalEmployerCost;
                acc.contributionBase += calc.contributionBase;
                acc.taxableBase += calc.taxableBase;
                acc.tax += calc.taxAmount;
                return acc;
            },
            { gross: 0, net: 0, employeeDeductions: 0, employerCost: 0, contributionBase: 0, taxableBase: 0, tax: 0 }
        );
    }, [jobCalculations]);

    const pensionBaseCapped = jobCalculations.some(
        (calc) => calc && calc.contributionBase >= CORE_CONSTANTS.PagaMaksimale
    );

    const handleJobValueChange = (key, value) => {
        setJobs(prev => prev.map(job => (job.key === key ? { ...job, value } : job)));
    };

    const handleJobModeChange = (key, mode, nextValue) => {
        setJobs(prev => prev.map(job => (job.key === key ? { ...job, mode, value: nextValue } : job)));
    };

    const handleCollapseToggle = (key) => {
        setJobs(prev => prev.map(job => (job.key === key ? { ...job, collapsed: !job.collapsed } : job)));
    };

    const handleActivationToggle = (key, active) => {
        setJobs(prev => prev.map(job => (job.key === key ? { ...job, active } : job)));
    };

    const applyPreset = useCallback((preset) => {
        setJobMode(preset.jobMode === 'single' ? 'single' : 'multi');
        setJobs(prev => prev.map(job => {
            const overrides = preset.jobs[job.key] || {};
            const nextMode = overrides.mode || job.mode;
            const nextActive = overrides.active !== undefined ? overrides.active : job.key === 'primary';
            const amountALL = overrides.amountALL !== undefined ? overrides.amountALL : parseNumber(job.value) * rate;
            const valueForDisplay = overrides.amountALL !== undefined
                ? convertFromALLForDisplay(overrides.amountALL, currency, rate)
                : job.value;
            return {
                ...job,
                mode: nextMode,
                active: nextActive,
                value: nextActive ? valueForDisplay : '',
                collapsed: job.key === 'primary' ? false : !nextActive,
            };
        }));
        setChildDeductionValue(convertFromALLForDisplay(preset.childDeductionALL, currency, rate));
        setVoluntaryPensionValue(convertFromALLForDisplay(preset.voluntaryALL, currency, rate));
    }, [currency, rate]);

    const presets = useMemo(() => EXAMPLE_PRESETS(t), [t]);

    const voluntaryExceeded = useMemo(() => {
        const numeric = parseNumber(voluntaryPensionValue) * rate;
        return numeric > VOLUNTARY_CAP;
    }, [voluntaryPensionValue, rate]);

    return (
        <div className="space-y-10">
            <SectionTitle icon={IconUser} title={t.employeeTitle} />

            <InfoAlert title={t.tapWarningTitle} type="warning">
                {t.tapWarning}
            </InfoAlert>

            <div className="rounded-3xl border border-brand-cyan/20 bg-white/80 p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-brand-navy">{t.jobSelectorTitle}</h3>
                        <p className="text-sm text-brand-navy/70">{t.jobSelectorSubtitle}</p>
                    </div>
                    <div className="inline-flex rounded-full bg-brand-cyan/10 p-1 text-sm font-semibold uppercase tracking-wide text-brand-cyan">
                        <button
                            type="button"
                            onClick={() => setJobMode('single')}
                            className={`rounded-full px-4 py-2 transition ${jobMode === 'single' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'}`}
                        >
                            {t.jobSelectorSingle}
                        </button>
                        <button
                            type="button"
                            onClick={() => setJobMode('multi')}
                            className={`rounded-full px-4 py-2 transition ${jobMode === 'multi' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'}`}
                        >
                            {t.jobSelectorMultiple}
                        </button>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-2">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy" htmlFor="child-deduction">
                            {t.childDeductionLabel}
                            <span className="text-xs font-normal text-brand-navy/60" title={t.childDeductionTooltip}>ⓘ</span>
                        </label>
                        <div className="relative mt-2">
                            <input
                                id="child-deduction"
                                type="number"
                                min="0"
                                step="100"
                                value={childDeductionValue}
                                onChange={(event) => setChildDeductionValue(event.target.value)}
                                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-lg font-semibold text-brand-navy shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40 input-focus-effect"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs uppercase tracking-wide text-gray-400">
                                {currency}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy" htmlFor="voluntary-pension">
                            {t.voluntaryPensionLabel}
                            <span className="text-xs font-normal text-brand-navy/60" title={t.voluntaryPensionTooltip}>ⓘ</span>
                        </label>
                        <div className="relative mt-2">
                            <input
                                id="voluntary-pension"
                                type="number"
                                min="0"
                                step="100"
                                value={voluntaryPensionValue}
                                onChange={(event) => setVoluntaryPensionValue(event.target.value)}
                                className={`w-full rounded-2xl border px-4 py-3 text-lg font-semibold text-brand-navy shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40 input-focus-effect ${
                                    voluntaryExceeded ? 'border-brand-red' : 'border-gray-200 bg-white'
                                }`}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs uppercase tracking-wide text-gray-400">
                                {currency}
                            </div>
                        </div>
                        {voluntaryExceeded && (
                            <p className="mt-2 text-xs font-semibold text-brand-red">
                                {t.voluntaryPensionCapWarning.replace('{cap}', formatCurrency(VOLUNTARY_CAP, 'ALL', { ALL: 1 }))}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-brand-cyan/20 bg-brand-cyan/10 p-6 shadow-lg backdrop-blur">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-brand-cyan">{t.tryExamplesTitle}</h3>
                <div className="mt-4 grid gap-4 md:grid-cols-3">
                    {presets.map((preset) => (
                        <button
                            key={preset.id}
                            type="button"
                            onClick={() => applyPreset(preset)}
                            className="rounded-2xl border border-brand-cyan/20 bg-white/80 p-4 text-left transition hover:border-brand-cyan/40 hover:shadow-lg"
                        >
                            <div className="text-sm font-semibold text-brand-navy">{preset.label}</div>
                            <p className="mt-1 text-xs text-brand-navy/70">{preset.description}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {activeJobs.map((job, index) => {
                    const meta = getJobMeta(t, job.key);
                    const calculation = jobCalculations[index] || null;
                    const role = JOB_ROLES.find((item) => item.key === job.key);
                    return (
                        <JobCard
                            key={job.key}
                            job={job}
                            meta={meta}
                            icon={role?.icon || IconUser}
                            accent={role?.accent || 'from-brand-navy to-brand-cyan'}
                            currency={currency}
                            rates={rates}
                            rate={rate}
                            childDeductionALL={childDeductionALL}
                            voluntaryALL={voluntaryALL}
                            onValueChange={handleJobValueChange}
                            onModeChange={handleJobModeChange}
                            onCollapseToggle={handleCollapseToggle}
                            onActivationToggle={handleActivationToggle}
                            isMultiMode={jobMode === 'multi'}
                            calculation={calculation}
                            t={t}
                        />
                    );
                })}
            </div>

            <div className="rounded-3xl border border-brand-navy/10 bg-white/90 p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-brand-navy">{t.totalMonthlySummary}</h3>
                        <p className="text-sm text-brand-navy/70">{t.totalMonthlyDescription}</p>
                    </div>
                    {pensionBaseCapped && (
                        <span className="inline-flex items-center gap-2 rounded-full border border-brand-cyan/40 bg-brand-cyan/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-brand-cyan">
                            {t.pensionBaseCapAlert.replace('{limit}', formatCurrency(CORE_CONSTANTS.PagaMaksimale, 'ALL', { ALL: 1 }))}
                        </span>
                    )}
                </div>

                <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-brand-navy/10 bg-white/80 p-4 shadow">
                        <DetailRow label={t.grossSalary} value={totals.gross} currency={currency} rates={rates} />
                    </div>
                    <div className="rounded-2xl border border-brand-navy/10 bg-white/80 p-4 shadow">
                        <DetailRow label={t.netSalary} value={totals.net} currency={currency} rates={rates} />
                    </div>
                    <div className="rounded-2xl border border-brand-navy/10 bg-white/80 p-4 shadow">
                        <DetailRow label={t.employeeDeductions} value={totals.employeeDeductions} currency={currency} rates={rates} />
                    </div>
                    <div className="rounded-2xl border border-brand-navy/10 bg-white/80 p-4 shadow">
                        <DetailRow label={t.employerTotalCost} value={totals.employerCost} currency={currency} rates={rates} />
                    </div>
                </div>
            </div>
        </div>
    );
};
