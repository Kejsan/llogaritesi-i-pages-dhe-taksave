export const CORE_CONSTANTS = {
    PagaMinimale: 40000,
    PagaMaksimale: 176416,
    ShkallaSigSocEmployee: 0.095,
    ShkallaSigShendetEmployee: 0.017,
    TotalEmployeeContributionRate: 0.112,

    ShkallaSigSocEmployer: 0.15,
    ShkallaSigShendetEmployer: 0.017,
    TotalEmployerContributionRate: 0.167,

    TotalSelfEmployedRate: 0.279,
    PresumedExpenseRate: 0.30,
    IncomeThresholdDIVA: 1200000,
    VatThreshold: 10000000,
};

export const TAP_BRACKETS_2024 = [
    { min: 0, max: 40000, rate: 0, deduction: 0, fixedTax: 0 },
    { min: 40001, max: 200000, rate: 0.13, deduction: 30000, fixedTax: 0 },
    { min: 200001, max: Infinity, rate: 0.23, deduction: 200000, fixedTax: 22100 }
];

export const FREE_PROF_TAX_RATES = {
    AnnualThreshold1: 14000000,
    RateHigh: 0.23,
    RateLow: 0.15,
};
