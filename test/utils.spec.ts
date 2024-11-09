import { describe, expect, test } from "@jest/globals";
import { roundFloat, convertExchangeToKeys } from "../src/lib/utils";

describe("roundFloat", () => {
    test("should use 2 decimal precision by default", () => {
        // Arrange
        const float = roundFloat(5.563400098);

        // Assert
        expect(float).toBe(5.56);
        expect(float).toHavePrecision(2);
    });

    test("should use 4 decimal precision if supplied", () => {
        // Arrange
        const float = roundFloat(21.3489333301, 4);

        // Assert
        expect(float).toBe(21.3489);
        expect(float).toHavePrecision(4);
    });
});

describe("convertExchangeToKeys", () => {
    test("should return zero when no exchange value is provided", () => {
        // Arrange
        const keys = convertExchangeToKeys(45.77);

        // Assert
        expect(keys).toBe(0);
    });

    test("should return 2 keys when a exchange value is provided", () => {
        // Arrange
        const keys = convertExchangeToKeys(131.66, 55);

        // Assert
        expect(keys).toBe(2);
    });
});
