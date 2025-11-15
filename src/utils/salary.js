import { CORE_CONSTANTS, TAP_BRACKETS_2024 } from '../constants/index.js';

export const JOB_TYPES = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    TERTIARY: 'tertiary',
};

export const CHILD_DEDUCTION_PER_DEPENDENT = 2500;
export const VOLUNTARY_PENSION_CAP = 40000;
const SECONDARY_JOB_TAX_RATE = 0.23;

const roundToCents = (value) => {
    if (!Number.isFinite(value)) return 0;
    return Math.round((value + Number.EPSILON) * 100) / 100;
};

export const clampVoluntaryPension = (value) => {
    if (!Number.isFinite(value) || value <= 0) {
        return 0;
    }
    return Math.min(VOLUNTARY_PENSION_CAP, Math.max(0, value));
};

const calculatePrimaryTap = (taxableIncome) => {
    if (taxableIncome <= 0) return 0;

    if (taxableIncome > TAP_BRACKETS_2024[2].min) {
        const { fixedTax, deduction, rate } = TAP_BRACKETS_2024[2];
        return Math.max(0, fixedTax + (taxableIncome - deduction) * rate);
    }

    if (taxableIncome > TAP_BRACKETS_2024[1].min) {
        const { deduction, rate } = TAP_BRACKETS_2024[1];
        return Math.max(0, (taxableIncome - deduction) * rate);
    }

    return 0;
};

export const calculateJobPayroll = ({
    grossSalary = 0,
    jobType = JOB_TYPES.PRIMARY,
    dependents = 0,
    voluntaryPension = 0,
} = {}) => {
    let gross = Number.isFinite(grossSalary) ? grossSalary : 0;
    if (gross < 0) gross = 0;

    if (jobType === JOB_TYPES.PRIMARY) {
        gross = Math.max(gross, CORE_CONSTANTS.PagaMinimale);
    }

    const contributionBase = Math.min(gross, CORE_CONSTANTS.PagaMaksimale);
    const employeeSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployee;
    const employeeHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployee;
    const totalEmployeeContributions = employeeSocial + employeeHealth;

    const employerSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployer;
    const employerHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployer;
    const totalEmployerContributions = employerSocial + employerHealth;

    const voluntaryApplied = jobType === JOB_TYPES.PRIMARY ? clampVoluntaryPension(voluntaryPension) : 0;
    const childDeduction = jobType === JOB_TYPES.PRIMARY
        ? Math.max(0, Math.floor(dependents) * CHILD_DEDUCTION_PER_DEPENDENT)
        : 0;

    const taxableIncome = Math.max(0, gross - totalEmployeeContributions - voluntaryApplied - childDeduction);

    let taxAmount = 0;
    if (jobType === JOB_TYPES.PRIMARY) {
        taxAmount = calculatePrimaryTap(taxableIncome);
    } else {
        taxAmount = taxableIncome * SECONDARY_JOB_TAX_RATE;
    }

    taxAmount = Math.max(0, taxAmount);

    const totalEmployeeDeductions = totalEmployeeContributions + taxAmount + voluntaryApplied;
    const netSalary = Math.max(0, gross - totalEmployeeDeductions);
    const totalEmployerCost = gross + totalEmployerContributions;

    return {
        grossSalary: roundToCents(gross),
        netSalary: roundToCents(netSalary),
        taxableIncome: roundToCents(taxableIncome),
        employeeSocial: roundToCents(employeeSocial),
        employeeHealth: roundToCents(employeeHealth),
        totalEmployeeContributions: roundToCents(totalEmployeeContributions),
        taxAmount: roundToCents(taxAmount),
        totalEmployeeDeductions: roundToCents(totalEmployeeDeductions),
        employerSocial: roundToCents(employerSocial),
        employerHealth: roundToCents(employerHealth),
        totalEmployerContributions: roundToCents(totalEmployerContributions),
        totalEmployerCost: roundToCents(totalEmployerCost),
        voluntaryPensionApplied: roundToCents(voluntaryApplied),
        contributionBase: roundToCents(contributionBase),
        dependentsApplied: jobType === JOB_TYPES.PRIMARY ? Math.max(0, Math.floor(dependents)) : 0,
        jobType,
    };
};

export const solveGrossFromNet = ({
    targetNet = 0,
    jobType = JOB_TYPES.PRIMARY,
    dependents = 0,
    voluntaryPension = 0,
} = {}) => {
    const desiredNet = Number.isFinite(targetNet) ? Math.max(0, targetNet) : 0;
    const minimumGross = jobType === JOB_TYPES.PRIMARY ? CORE_CONSTANTS.PagaMinimale : 0;

    let low = minimumGross;
    let high = Math.max(minimumGross, desiredNet * 1.4 + CORE_CONSTANTS.PagaMinimale);
    let highCalculation = calculateJobPayroll({ grossSalary: high, jobType, dependents, voluntaryPension });
    let iterations = 0;

    while (highCalculation.netSalary < desiredNet && iterations < 60) {
        low = high;
        high *= 2;
        highCalculation = calculateJobPayroll({ grossSalary: high, jobType, dependents, voluntaryPension });
        iterations += 1;
    }

    let bestCalculation = highCalculation;

    for (let i = 0; i < 80; i += 1) {
        const mid = (low + high) / 2;
        const midCalculation = calculateJobPayroll({ grossSalary: mid, jobType, dependents, voluntaryPension });

        if (Math.abs(midCalculation.netSalary - desiredNet) <= 0.5) {
            bestCalculation = midCalculation;
            break;
        }

        if (midCalculation.netSalary >= desiredNet) {
            bestCalculation = midCalculation;
            high = mid;
        } else {
            low = mid;
        }
    }

    return {
        grossSalary: bestCalculation.grossSalary,
        calculation: bestCalculation,
    };
};

export const ensureNumber = (value) => {
    const numeric = parseFloat(value);
    if (!Number.isFinite(numeric)) return 0;
    return numeric;
};
