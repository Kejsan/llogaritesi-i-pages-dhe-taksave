import React, { useState, useMemo, useCallback } from 'react';
import { CORE_CONSTANTS } from '../constants';
import { formatCurrency } from '../utils';
import { SectionTitle, DetailRow } from './Shared';
import {
    IconUser,
    IconAlertTriangle,
    IconX,
    IconUsers,
    IconTrendingUp,
    IconTrendingDown,
    IconChevronDown,
    IconCalculator,
    IconInfo,
} from './Icons';
import {
    calculateJobPayroll,
    solveGrossFromNet,
    JOB_TYPES,
    clampVoluntaryPension,
    VOLUNTARY_PENSION_CAP,
} from '../utils/salary';

const JOB_ORDER = [JOB_TYPES.PRIMARY, JOB_TYPES.SECONDARY, JOB_TYPES.TERTIARY];

const createDefaultJobState = (role) => ({
    mode: 'gross',
    value: role === JOB_TYPES.PRIMARY ? '74010' : '',
    workingDays: 22,
    expanded: role === JOB_TYPES.PRIMARY,
});

const roundWorkingDays = (value) => {
    const numeric = parseInt(value, 10);
    if (Number.isNaN(numeric)) return 1;
    return Math.max(1, Math.min(31, numeric));
};

const convertAllToInputValue = (valueALL, currency, rate) => {
    if (!Number.isFinite(valueALL)) return '';
    const converted = currency === 'ALL' ? valueALL : valueALL / rate;
    if (currency === 'ALL') {
        return Math.round(converted).toString();
    }
    return converted.toFixed(2);
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
    const [showAlert, setShowAlert] = useState(true);
    const [jobLayout, setJobLayout] = useState('single');
    const [tertiaryEnabled, setTertiaryEnabled] = useState(false);
    const [jobs, setJobs] = useState(() => ({
        [JOB_TYPES.PRIMARY]: createDefaultJobState(JOB_TYPES.PRIMARY),
        [JOB_TYPES.SECONDARY]: createDefaultJobState(JOB_TYPES.SECONDARY),
        [JOB_TYPES.TERTIARY]: createDefaultJobState(JOB_TYPES.TERTIARY),
    }));
    const [dependents, setDependents] = useState(0);
    const [dependentsInput, setDependentsInput] = useState('0');
    const [dependentsClamped, setDependentsClamped] = useState(false);
    const [voluntaryPension, setVoluntaryPension] = useState(0);

    const rate = useMemo(() => rates[currency] || 1, [rates, currency]);
    const jobMeta = useMemo(() => getJobMeta(t), [t]);
    const presets = useMemo(() => presetConfigs(t), [t]);

    const activeRoles = useMemo(() => {
        if (jobLayout === 'single') {
            return [JOB_TYPES.PRIMARY];
        }
        if (tertiaryEnabled) {
            return [JOB_TYPES.PRIMARY, JOB_TYPES.SECONDARY, JOB_TYPES.TERTIARY];
        }
        return [JOB_TYPES.PRIMARY, JOB_TYPES.SECONDARY];
    }, [jobLayout, tertiaryEnabled]);

    const updateJobState = useCallback((role, updater) => {
        setJobs((prev) => ({
            ...prev,
            [role]: {
                ...prev[role],
                ...(typeof updater === 'function' ? updater(prev[role]) : updater),
            },
        }));
    }, []);

    const handleAmountChange = useCallback((role, value) => {
        updateJobState(role, { value });
    }, [updateJobState]);

    const handleModeChange = useCallback((role, nextMode) => {
        updateJobState(role, (current) => {
            if (current.mode === nextMode) return current;

            const numericValue = parseFloat(current.value);
            const hasAmount = current.value !== '' && Number.isFinite(numericValue) && numericValue >= 0;
            let nextValue = current.value;

            if (hasAmount) {
                const amountALL = numericValue * rate;
                if (nextMode === 'net') {
                    const { netSalary } = calculateJobPayroll({
                        grossSalary: amountALL,
                        jobType: role,
                        dependents,
                        voluntaryPension,
                    });
                    nextValue = convertAllToInputValue(netSalary, currency, rate);
                } else {
                    const { grossSalary } = solveGrossFromNet({
                        targetNet: amountALL,
                        jobType: role,
                        dependents,
                        voluntaryPension,
                    });
                    nextValue = convertAllToInputValue(grossSalary, currency, rate);
                }
            }

            return {
                ...current,
                mode: nextMode,
                value: nextValue,
            };
        });
    }, [currency, rate, dependents, voluntaryPension, updateJobState]);

    const handleWorkingDaysChange = useCallback((role, value) => {
        updateJobState(role, { workingDays: roundWorkingDays(value) });
    }, [updateJobState]);

    const handleLayoutChange = useCallback((layout) => {
        setJobLayout(layout);
        if (layout === 'single') {
            setTertiaryEnabled(false);
        }
    }, []);

    const handleTertiaryToggle = useCallback(() => {
        setTertiaryEnabled((prev) => !prev);
    }, []);

    const handleDependentsChange = useCallback((value) => {
        if (value === '') {
            setDependentsInput('');
            return;
        }

        if (!/^\d+$/.test(value)) {
            return;
        }

        setDependentsInput(value);

        const parsed = Number(value);
        if (parsed >= 0 && parsed <= 6) {
            setDependents(parsed);
            setDependentsClamped(false);
        }
    }, []);

    const handleDependentsBlur = useCallback(() => {
        if (dependentsInput === '') {
            setDependents(0);
            setDependentsInput('0');
            setDependentsClamped(false);
            return;
        }

        const parsed = Number(dependentsInput);
        if (!Number.isFinite(parsed)) {
            setDependents(0);
            setDependentsInput('0');
            setDependentsClamped(false);
            return;
        }

        const rounded = Math.round(parsed);
        const clamped = Math.max(0, Math.min(6, rounded));
        const sanitized = String(clamped);
        setDependents(clamped);
        setDependentsInput(sanitized);
        setDependentsClamped(sanitized !== dependentsInput);
    }, [dependentsInput]);

    const handleVoluntaryChange = useCallback((value) => {
        const parsed = parseFloat(value);
        if (Number.isNaN(parsed) || parsed < 0) {
            setVoluntaryPension(0);
            return;
        }
        setVoluntaryPension(parsed);
    }, []);

    const voluntaryApplied = clampVoluntaryPension(voluntaryPension);
    const voluntaryExceeded = voluntaryPension > VOLUNTARY_PENSION_CAP;

    const calculations = useMemo(() => {
        const result = {};
        activeRoles.forEach((role) => {
            const jobState = jobs[role];
            const numericValue = parseFloat(jobState.value);
            const amountALL = jobState.value !== '' && Number.isFinite(numericValue) && numericValue > 0 ? numericValue * rate : 0;

            let calculation;

            if (jobState.mode === 'gross') {
                calculation = calculateJobPayroll({
                    grossSalary: amountALL,
                    jobType: role,
                    dependents,
                    voluntaryPension: voluntaryApplied,
                });
            } else if (amountALL > 0) {
                calculation = solveGrossFromNet({
                    targetNet: amountALL,
                    jobType: role,
                    dependents,
                    voluntaryPension: voluntaryApplied,
                }).calculation;
            } else {
                calculation = calculateJobPayroll({
                    grossSalary: role === JOB_TYPES.PRIMARY ? CORE_CONSTANTS.PagaMinimale : 0,
                    jobType: role,
                    dependents,
                    voluntaryPension: voluntaryApplied,
                });
            }

            const workingDays = jobState.workingDays || 1;
            result[role] = {
                calculation,
                workingDays,
                dailyGross: workingDays ? calculation.grossSalary / workingDays : 0,
                dailyNet: workingDays ? calculation.netSalary / workingDays : 0,
            };
        });
        return result;
    }, [activeRoles, jobs, rate, dependents, voluntaryApplied]);

    const totals = useMemo(() => {
        return activeRoles.reduce(
            (acc, role) => {
                const entry = calculations[role];
                if (!entry) return acc;
                const { calculation } = entry;
                acc.gross += calculation.grossSalary;
                acc.net += calculation.netSalary;
                acc.deductions += calculation.totalEmployeeDeductions;
                acc.employer += calculation.totalEmployerCost;
                acc.voluntary += calculation.voluntaryPensionApplied;
                if (calculation.contributionBase >= CORE_CONSTANTS.PagaMaksimale) {
                    acc.capReached = true;
                }
                return acc;
            },
            { gross: 0, net: 0, deductions: 0, employer: 0, capReached: false, voluntary: 0 }
        );
    }, [activeRoles, calculations]);

    const applyPreset = useCallback((preset) => {
        handleLayoutChange(preset.jobLayout);
        setTertiaryEnabled(Boolean(preset.tertiary));
        const nextDependents = preset.dependents ?? 0;
        setDependents(nextDependents);
        setDependentsInput(String(nextDependents));
        setDependentsClamped(false);
        setVoluntaryPension(preset.voluntaryPension ?? 0);

        setJobs((prev) => {
            const next = { ...prev };
            JOB_ORDER.forEach((role) => {
                const jobPreset = preset.jobs?.[role];
                if (jobPreset) {
                    const valueALL = jobPreset.valueALL ?? 0;
                    const nextValue = convertAllToInputValue(valueALL, currency, rate);
                    next[role] = {
                        ...next[role],
                        mode: jobPreset.mode || 'gross',
                        value: nextValue,
                        workingDays: jobPreset.workingDays ?? next[role].workingDays,
                        expanded: true,
                    };
                } else {
                    next[role] = {
                        ...next[role],
                        value: role === JOB_TYPES.PRIMARY ? next[role].value : '',
                        mode: role === JOB_TYPES.PRIMARY ? next[role].mode : 'gross',
                        expanded: role === JOB_TYPES.PRIMARY,
                    };
                }
            });
            return next;
        });
    }, [currency, rate, handleLayoutChange]);

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
                        {showAlert ? t.hideTapNotice : t.showTapNotice}
                    </button>
                </div>
                {showAlert && (
                    <div className="mt-4 grid gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-white/90 backdrop-blur-sm">
                        <p className="text-xs leading-relaxed">{t.tapLegalReminder}</p>
                    </div>
                )}
            </div>

            <div className="rounded-3xl border border-white/40 bg-white/70 p-6 shadow-xl backdrop-blur space-y-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="text-xs font-semibold uppercase tracking-wide text-brand-cyan">{t.jobLayoutLabel}</div>
                    <div className="inline-flex flex-wrap gap-2 rounded-full bg-white/60 p-1 shadow-inner">
                        <button
                            type="button"
                            onClick={() => handleLayoutChange('single')}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                jobLayout === 'single' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'
                            }`}
                        >
                            <IconUser className="h-4 w-4" />
                            {t.jobLayoutSingle}
                        </button>
                        <button
                            type="button"
                            onClick={() => handleLayoutChange('multi')}
                            className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                jobLayout === 'multi' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'
                            }`}
                        >
                            <IconUsers className="h-4 w-4" />
                            {t.jobLayoutMulti}
                        </button>
                    </div>
                </div>

                {jobLayout === 'multi' && (
                    <div className="flex flex-col gap-3 rounded-2xl border border-brand-cyan/20 bg-brand-cyan/10 p-4 text-sm text-brand-navy">
                        <div className="flex items-center justify-between">
                            <div className="font-semibold uppercase tracking-wide text-brand-cyan">{t.thirdJobLabel}</div>
                            <button
                                type="button"
                                onClick={handleTertiaryToggle}
                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition ${
                                    tertiaryEnabled ? 'bg-brand-cyan text-white shadow-inner' : 'bg-white text-brand-cyan border border-brand-cyan/40'
                                }`}
                            >
                                {tertiaryEnabled ? t.thirdJobRemove : t.thirdJobAdd}
                            </button>
                        </div>
                        <p className="text-xs text-brand-navy/70">{t.thirdJobHelper}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                            {t.dependentsLabel}
                            <IconInfo className="h-4 w-4 text-brand-cyan" title={t.dependentsTooltip} />
                        </label>
                        <input
                            type="number"
                            min="0"
                            max="6"
                            step={1}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={dependentsInput}
                            onChange={(event) => handleDependentsChange(event.target.value)}
                            onBlur={handleDependentsBlur}
                            className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xl font-semibold text-brand-navy shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40"
                        />
                        <p className="mt-2 text-xs text-brand-navy/60">{t.dependentsHelper}</p>
                        {dependentsClamped && (
                            <p className="mt-1 text-xs font-semibold text-brand-cyan">{t.dependentsClampMessage}</p>
                        )}
                    </div>
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-brand-navy">
                            {t.voluntaryPensionLabel}
                            <IconInfo className="h-4 w-4 text-brand-cyan" title={t.voluntaryPensionTooltip(VOLUNTARY_PENSION_CAP)} />
                        </label>
                        <div className="mt-2 relative">
                            <input
                                type="number"
                                min="0"
                                max="100000"
                                value={voluntaryPension}
                                onChange={(event) => handleVoluntaryChange(event.target.value)}
                                className={`w-full rounded-2xl border px-4 py-3 text-xl font-semibold shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40 ${
                                    voluntaryExceeded ? 'border-brand-red text-brand-red' : 'border-gray-200 text-brand-navy'
                                }`}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold uppercase tracking-wide text-brand-cyan/70">
                                ALL
                            </div>
                        </div>
                        <p className="mt-2 text-xs text-brand-navy/60">{t.voluntaryPensionHelper(VOLUNTARY_PENSION_CAP)}</p>
                        {voluntaryExceeded && (
                            <p className="mt-2 text-xs font-semibold text-brand-red">{t.voluntaryPensionWarning(VOLUNTARY_PENSION_CAP)}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-brand-cyan/20 bg-white/70 p-6 shadow-xl backdrop-blur">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-wide text-brand-cyan font-semibold">{t.examples.title}</div>
                        <p className="mt-1 text-sm text-brand-navy/70">{t.examples.subtitle}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        {presets.map((preset) => (
                            <button
                                key={preset.key}
                                type="button"
                                onClick={() => applyPreset(preset.setup)}
                                className="group rounded-2xl border border-brand-cyan/30 bg-white/70 px-4 py-3 text-left shadow-sm transition hover:border-brand-cyan hover:shadow-lg"
                            >
                                <div className="text-sm font-semibold text-brand-navy group-hover:text-brand-cyan">{preset.label}</div>
                                <div className="mt-1 text-xs text-brand-navy/60 max-w-xs">{preset.description}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                {activeRoles.map((role) => {
                    const meta = jobMeta[role];
                    const jobState = jobs[role];
                    const entry = calculations[role];
                    const isExpanded = jobState.expanded;
                    const { calculation } = entry || {};
                    const IconComponent = meta.icon;

                    return (
                        <div key={role} className="overflow-hidden rounded-3xl border border-brand-cyan/20 bg-white/80 shadow-xl">
                            <button
                                type="button"
                                onClick={() => updateJobState(role, { expanded: !isExpanded })}
                                className={`flex w-full items-center justify-between gap-4 bg-gradient-to-r ${meta.accent} px-6 py-5 text-left`}
                            >
                                <div className={`flex items-center gap-4 text-white`}>
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-2xl blur-xl bg-white/40" aria-hidden="true"></div>
                                        <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.accent} text-white shadow-lg`}>
                                            <IconComponent className="h-6 w-6" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold uppercase tracking-wide text-white/80">{meta.badge}</div>
                                        <div className="text-xl font-bold text-white drop-shadow-sm">{meta.title}</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-xs font-semibold uppercase tracking-wide text-white/70">{t.jobCards.summaryNet}</span>
                                    <span className="text-lg font-bold text-white drop-shadow-sm">{formatCurrency(calculation?.netSalary || 0, currency, rates)}</span>
                                </div>
                                <IconChevronDown className={`h-5 w-5 text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                            {isExpanded && (
                                <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                                    <div className="space-y-6">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="text-sm font-semibold text-brand-navy">{jobState.mode === 'gross' ? t.jobCards.grossInputLabel : t.jobCards.netInputLabel}</label>
                                                <div className="relative mt-2">
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={jobState.value}
                                                        onChange={(event) => handleAmountChange(role, event.target.value)}
                                                        placeholder={t.jobCards.placeholder}
                                                        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xl font-semibold text-brand-navy shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-xs font-semibold uppercase tracking-wide text-brand-cyan/70">
                                                        {currency}
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex items-center justify-between">
                                                    <label className="text-sm font-semibold text-brand-navy">{t.jobCards.modeLabel}</label>
                                                    <span className="text-xs font-semibold uppercase tracking-wide text-brand-cyan">smart split</span>
                                                </div>
                                                <div className="mt-2 inline-flex gap-2 rounded-full bg-brand-cyan/10 p-1">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleModeChange(role, 'gross')}
                                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                            jobState.mode === 'gross' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'
                                                        }`}
                                                    >
                                                        <IconTrendingDown className="h-4 w-4" />
                                                        {t.modeGrossToNet}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleModeChange(role, 'net')}
                                                        className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
                                                            jobState.mode === 'net' ? 'bg-brand-navy text-white shadow-lg' : 'text-brand-navy/70 hover:text-brand-navy'
                                                        }`}
                                                    >
                                                        <IconTrendingUp className="h-4 w-4" />
                                                        {t.modeNetToGross}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="text-sm font-semibold text-brand-navy">{t.jobCards.workingDays}</label>
                                                <input
                                                    type="number"
                                                    min="1"
                                                    max="31"
                                                    value={jobState.workingDays}
                                                    onChange={(event) => handleWorkingDaysChange(role, event.target.value)}
                                                    className="mt-2 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-xl font-semibold text-brand-navy shadow-inner focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/40"
                                                />
                                                <p className="mt-2 text-xs text-brand-navy/60">{t.jobCards.workingDaysHint}</p>
                                            </div>
                                            <div className="rounded-2xl border border-brand-cyan/20 bg-brand-cyan/5 p-4 text-sm text-brand-navy">
                                                <div className="font-semibold uppercase tracking-wide text-brand-cyan">{t.jobCards.dailyBreakdown}</div>
                                                <div className="mt-3 space-y-2">
                                                    <DetailRow label={t.jobCards.dailyGross} value={entry?.dailyGross || 0} currency={currency} rates={rates} />
                                                    <DetailRow label={t.jobCards.dailyNet} value={entry?.dailyNet || 0} currency={currency} rates={rates} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-4 rounded-2xl border border-brand-cyan/20 bg-white/80 p-5 shadow-inner">
                                        <h4 className="text-sm font-semibold uppercase tracking-wide text-brand-cyan">{t.jobCards.breakdownTitle}</h4>
                                        <DetailRow label={t.jobCards.summaryGross} value={calculation?.grossSalary || 0} currency={currency} rates={rates} />
                                        <DetailRow label={t.jobCards.contributionsLabel} value={calculation?.totalEmployeeContributions || 0} currency={currency} rates={rates} />
                                        <DetailRow label={t.jobCards.taxLabel} value={calculation?.taxAmount || 0} currency={currency} rates={rates} />
                                        <DetailRow label={t.jobCards.voluntaryLabel} value={calculation?.voluntaryPensionApplied || 0} currency={currency} rates={rates} />
                                        <div className="rounded-2xl border border-dashed border-brand-cyan/40 bg-brand-cyan/5 p-4">
                                            <DetailRow label={t.jobCards.summaryDeductions} value={calculation?.totalEmployeeDeductions || 0} currency={currency} rates={rates} isTotal={true} />
                                        </div>
                                        <DetailRow label={t.jobCards.summaryNet} value={calculation?.netSalary || 0} currency={currency} rates={rates} />
                                        <DetailRow label={t.jobCards.summaryEmployer} value={calculation?.totalEmployerCost || 0} currency={currency} rates={rates} />
                                        <div className="rounded-xl border border-gray-200/70 bg-gray-50/80 p-3 text-xs text-brand-navy/70">
                                            <div className="font-semibold text-brand-navy">{t.jobCards.taxableCaption}</div>
                                            <div>{formatCurrency(calculation?.taxableIncome || 0, currency, rates)}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className={`overflow-hidden rounded-3xl border ${totals.capReached ? 'border-brand-red/60 bg-brand-red/5' : 'border-brand-cyan/20 bg-white/80'} p-6 shadow-2xl backdrop-blur`}
            >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-navy text-white shadow-lg">
                            <IconCalculator className="h-6 w-6" />
                        </div>
                        <div>
                            <div className="text-sm font-semibold uppercase tracking-wide text-brand-cyan">{t.totalMonthlyCard.title}</div>
                            {totals.capReached && (
                                <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-brand-red/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-red">
                                    {t.totalMonthlyCard.pensionCapAlert(CORE_CONSTANTS.PagaMaksimale)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="text-xs text-brand-navy/70">{t.totalMonthlyCard.subtitle}</div>
                </div>
                <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <div className="rounded-2xl border border-brand-cyan/20 bg-white/70 p-4 shadow-sm">
                        <div className="text-xs uppercase tracking-wide text-brand-cyan">{t.totalMonthlyCard.gross}</div>
                        <div className="mt-2 text-2xl font-bold text-brand-navy">{formatCurrency(totals.gross, currency, rates)}</div>
                    </div>
                    <div className="rounded-2xl border border-brand-cyan/20 bg-white/70 p-4 shadow-sm">
                        <div className="text-xs uppercase tracking-wide text-brand-cyan">{t.totalMonthlyCard.deductions}</div>
                        <div className="mt-2 text-2xl font-bold text-brand-navy">{formatCurrency(totals.deductions, currency, rates)}</div>
                    </div>
                    <div className="rounded-2xl border border-brand-cyan/20 bg-white/70 p-4 shadow-sm">
                        <div className="text-xs uppercase tracking-wide text-brand-cyan">{t.totalMonthlyCard.net}</div>
                        <div className="mt-2 text-2xl font-bold text-brand-navy">{formatCurrency(totals.net, currency, rates)}</div>
                    </div>
                    <div className="rounded-2xl border border-brand-cyan/20 bg-white/70 p-4 shadow-sm">
                        <div className="text-xs uppercase tracking-wide text-brand-cyan">{t.totalMonthlyCard.employer}</div>
                        <div className="mt-2 text-2xl font-bold text-brand-navy">{formatCurrency(totals.employer, currency, rates)}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
