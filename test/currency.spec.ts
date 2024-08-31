import Currency from "../src/classes/currency"
import { describe, expect, test } from "@jest/globals";
import { CurrencyError } from "../src/classes/currency.error";

describe("Currency", () => {
    test("should create an exact copy", () => {
        // Arrange
        const currency = new Currency({ keys: 350 });

        // Act
        const copy = currency.copy();

        // Assert
        expect(copy.stringify()).toBe(currency.stringify());
    });

    test("should return a", () => {
        // Arrange
        const currency = new Currency();

        // Act
        const result = currency.toString();

        // Assert
        expect(result).toBe("0 keys, 0 ref");
    });

    test("should ", () => {
        const currency = new Currency({ keys: 12, refined: 46.22 });

        const scrap = currency.toScrap(56.22);

        expect(scrap).toBe(6488);
    });

    test("should ", () => {
        const currency = new Currency({ keys: 12, refined: 46.22 });

        expect(() => currency.toScrap()).toThrow(CurrencyError)
    });

    test("", () => {
        const currency = new Currency({ keys: 2, refined: 37.11 });

        const keys = currency.toKeys(56.22);

        expect(keys).toBe(2.66);
    });

    test("", () => {
        const currency = new Currency({ keys: 22, refined: 13.55 });

        expect(() => currency.toKeys()).toThrow(CurrencyError)
    });
});
