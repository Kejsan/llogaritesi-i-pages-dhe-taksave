import { CORE_CONSTANTS, TAP_BRACKETS_2024 } from '../constants';

const VOLUNTARY_PENSION_CAP = 40000;

const clampVoluntaryPension = (value) => {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, Math.min(value, VOLUNTARY_PENSION_CAP));
};

const normalizeAmount = (value) => {
    if (!Number.isFinite(value)) return 0;
    return Math.max(0, value);
};

const calculateTap = (taxableIncome) => {
    const safeIncome = normalizeAmount(taxableIncome);

    if (safeIncome <= TAP_BRACKETS_2024[1].min) {
        return 0;
    }

    if (safeIncome > TAP_BRACKETS_2024[2].min) {
        const bracket = TAP_BRACKETS_2024[2];
        return Math.max(0, bracket.fixedTax + (safeIncome - bracket.deduction) * bracket.rate);
    }

    const middleBracket = TAP_BRACKETS_2024[1];
    return Math.max(0, (safeIncome - middleBracket.deduction) * middleBracket.rate);
};

const applyMinimumWageFloor = (grossSalary) => {
    if (grossSalary < CORE_CONSTANTS.PagaMinimale) {
        return CORE_CONSTANTS.PagaMinimale;
    }
    return grossSalary;
};

export const calculateJobFromGross = ({
    grossSalary,
    jobType,
    childDeduction = 0,
    voluntaryPension = 0,
}) => {
    const normalizedGross = applyMinimumWageFloor(normalizeAmount(grossSalary));
    const normalizedChildDeduction = jobType === 'primary' ? normalizeAmount(childDeduction) : 0;
    const voluntaryUsed = jobType === 'primary' ? clampVoluntaryPension(voluntaryPension) : 0;

    const contributionBase = Math.min(normalizedGross, CORE_CONSTANTS.PagaMaksimale);

    const employeeSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployee;
    const employeeHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployee;
    const totalEmployeeContributions = employeeSocial + employeeHealth;

    const employerSocial = contributionBase * CORE_CONSTANTS.ShkallaSigSocEmployer;
    const employerHealth = contributionBase * CORE_CONSTANTS.ShkallaSigShendetEmployer;
    const totalEmployerContributions = employerSocial + employerHealth;

    const taxableBase = Math.max(0, normalizedGross - normalizedChildDeduction - voluntaryUsed);
    const taxAmount = jobType === 'primary' ? calculateTap(taxableBase) : 0;

    const totalEmployeeDeductions = totalEmployeeContributions + taxAmount + voluntaryUsed;
    const netSalary = normalizedGross - totalEmployeeContributions - taxAmount - voluntaryUsed;
    const totalEmployerCost = normalizedGross + totalEmployerContributions;

    return {
        grossSalary: normalizedGross,
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
        taxableBase,
        childDeduction: normalizedChildDeduction,
        voluntaryPensionUsed: voluntaryUsed,
    };
};

const solveGrossFromNet = ({
    targetNet,
    jobType,
    childDeduction = 0,
    voluntaryPension = 0,
}) => {
    const normalizedTarget = normalizeAmount(targetNet);

    const minimumCalculation = calculateJobFromGross({
        grossSalary: CORE_CONSTANTS.PagaMinimale,
        jobType,
        childDeduction,
        voluntaryPension,
    });

    if (normalizedTarget <= minimumCalculation.netSalary) {
        return {
            grossSalary: minimumCalculation.grossSalary,
            calculation: minimumCalculation,
        };
    }

    let low = CORE_CONSTANTS.PagaMinimale;
    let high = Math.max(normalizedTarget, CORE_CONSTANTS.PagaMinimale * 1.5);
    let highCalculation = calculateJobFromGross({
        grossSalary: high,
        jobType,
        childDeduction,
        voluntaryPension,
    });
    let iterations = 0;

    while (highCalculation.netSalary < normalizedTarget && iterations < 60) {
        low = high;
        high *= 2;
        highCalculation = calculateJobFromGross({
            grossSalary: high,
            jobType,
            childDeduction,
            voluntaryPension,
        });
        iterations += 1;
    }

    let resultCalculation = highCalculation;

    for (let i = 0; i < 80; i++) {
        const mid = (low + high) / 2;
        const midCalculation = calculateJobFromGross({
            grossSalary: mid,
            jobType,
            childDeduction,
            voluntaryPension,
        });

        if (Math.abs(midCalculation.netSalary - normalizedTarget) <= 0.5) {
            resultCalculation = midCalculation;
            break;
        }

        if (midCalculation.netSalary >= normalizedTarget) {
            resultCalculation = midCalculation;
            high = mid;
        } else {
            low = mid;
        }
    }

    return {
        grossSalary: resultCalculation.grossSalary,
        calculation: resultCalculation,
    };
};

export const calculateJobByMode = ({
    amount,
    mode,
    jobType,
    childDeduction = 0,
    voluntaryPension = 0,
}) => {
    if (mode === 'net') {
        return solveGrossFromNet({
            targetNet: amount,
            jobType,
            childDeduction,
            voluntaryPension,
        }).calculation;
    }

    return calculateJobFromGross({
        grossSalary: amount,
        jobType,
        childDeduction,
        voluntaryPension,
    });
};

export const getVoluntaryPensionCap = () => VOLUNTARY_PENSION_CAP;
