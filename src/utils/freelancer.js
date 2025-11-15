import { CORE_CONSTANTS, FREE_PROF_TAX_RATES } from '../constants/index.js';

const HEALTH_RATE = 0.034;
const SOCIAL_RATE = 0.23;
const TOTAL_RATE = HEALTH_RATE + SOCIAL_RATE;

const clamp = (value, min, max) => {
    if (Number.isNaN(value)) return min;
    return Math.min(Math.max(value, min), max);
};

const sanitizeNumber = (value, fallback = 0) => {
    const numeric = typeof value === 'string' ? parseFloat(value) : Number(value);
    if (!Number.isFinite(numeric) || numeric < 0) return fallback;
    return numeric;
};

const resolveRate = (currency, rates) => {
    if (!rates || typeof rates !== 'object') return 1;
    const rate = rates[currency];
    if (!rate || !Number.isFinite(rate) || rate <= 0) return 1;
    return rate;
};

const determineVatBand = (annualIncomeALL) => {
    const threshold = CORE_CONSTANTS.VatThreshold;
    if (annualIncomeALL <= threshold * 0.75) {
        return { band: 'under', requiresVAT: false };
    }
    if (annualIncomeALL < threshold) {
        return { band: 'monitor', requiresVAT: false };
    }
    return { band: 'over', requiresVAT: true };
};

const buildProfitTaxBands = (taxableProfit) => {
    const upperThreshold = FREE_PROF_TAX_RATES.AnnualThreshold1;
    const firstBandAmount = Math.min(taxableProfit, upperThreshold);
    const secondBandAmount = Math.max(taxableProfit - upperThreshold, 0);

    return [
        {
            id: 'band-zero',
            min: 0,
            max: upperThreshold,
            rate: 0,
            amount: firstBandAmount,
            tax: firstBandAmount * 0,
        },
        {
            id: 'band-high',
            min: upperThreshold,
            max: Infinity,
            rate: FREE_PROF_TAX_RATES.RateHigh,
            amount: secondBandAmount,
            tax: secondBandAmount * FREE_PROF_TAX_RATES.RateHigh,
        },
    ];
};

export const calculateFreelancerTaxes = ({
    annualIncome,
    incomeCurrency = 'ALL',
    rates,
    clientMix = {},
}) => {
    const sanitizedIncome = sanitizeNumber(annualIncome, 0);
    const rate = resolveRate(incomeCurrency, rates);
    const annualIncomeALL = sanitizedIncome * rate;

    const contributionsAnnual = CORE_CONSTANTS.PagaMinimale * TOTAL_RATE * 12;
    const taxableProfit = Math.max(annualIncomeALL - contributionsAnnual, 0);
    const profitBands = buildProfitTaxBands(taxableProfit);
    const profitTax = profitBands.reduce((total, band) => total + band.tax, 0);
    const netIncomeAfterTax = Math.max(annualIncomeALL - contributionsAnnual - profitTax, 0);

    const vatInfo = determineVatBand(annualIncomeALL);

    const normalizedMix = {
        localShare: clamp(sanitizeNumber(clientMix.localShare, 100), 0, 100),
        foreignShare: clamp(sanitizeNumber(clientMix.foreignShare, 0), 0, 100),
        topLocalClientShare: clamp(sanitizeNumber(clientMix.topLocalClientShare, 0), 0, 100),
        topTwoLocalClientsShare: clamp(sanitizeNumber(clientMix.topTwoLocalClientsShare, 0), 0, 100),
    };

    if (normalizedMix.foreignShare === 0) {
        normalizedMix.foreignShare = clamp(100 - normalizedMix.localShare, 0, 100);
    }

    const warnings = [];
    if (normalizedMix.topLocalClientShare > 80 && normalizedMix.localShare >= normalizedMix.topLocalClientShare) {
        warnings.push('singleClient');
    }
    if (normalizedMix.topTwoLocalClientsShare > 90 && normalizedMix.localShare >= normalizedMix.topTwoLocalClientsShare) {
        warnings.push('dualClient');
    }

    return {
        annualIncomeALL,
        contributionsAnnual,
        taxableProfit,
        profitTax,
        netIncomeAfterTax,
        profitBands,
        vatInfo,
        warnings,
        normalizedMix,
    };
};
