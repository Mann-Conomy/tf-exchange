import { expect } from "@jest/globals";
import type { DecimalPrecision } from "./jest";

function getDecimalPrecision(value: DecimalPrecision): number {
    const [_, decimalPart] = value.toString().split(".");

    return decimalPart ? decimalPart.length : 0;
}

expect.extend({
    toHavePrecision(actual: DecimalPrecision, expected: DecimalPrecision) {
        const pass = getDecimalPrecision(actual) === expected;
    
        if (pass) {
            return {
                pass: true,
                message: () => `Expected decimal precision to be ${expected}`
            }
        }
    
        return {
            pass: false,
            message: () => `Expected decimal precision to be ${expected}, but received ${actual}`
        }
    }
});
