import assert from 'node:assert/strict';
import { formatCurrency } from '../src/utils/index.js';

const sampleValue = 123.456789;
const mockRates = { ALL: 1, EUR: 1, USD: 1 };

const expectations = {
    ALL: '123,46',
    EUR: '123,46',
    USD: '123.46',
};

for (const [currency, expectedFragment] of Object.entries(expectations)) {
    const formatted = formatCurrency(sampleValue, currency, mockRates);
    console.log(`${currency}: ${formatted}`);
    assert(
        formatted.includes(expectedFragment),
        `Expected ${currency} format to include "${expectedFragment}", got "${formatted}"`
    );
}

console.log('formatCurrency precision check passed for ALL, EUR, and USD.');
