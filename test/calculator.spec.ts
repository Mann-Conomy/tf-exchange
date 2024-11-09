import { Currency } from "../src/classes/currency";
import { Calculator } from "../src/classes/calculator";
import { describe, expect, test } from "@jest/globals";

describe("Calculator", () => {
    test("should create a new instance of Calculator", () => {
        // Arrange
        const calculator = new Calculator();

        // Assert
        expect(calculator).toBeInstanceOf(Calculator);
    });

    test("should throw if the exchange value is negative", () => {
        // Act and assert
        expect(() => new Calculator({ exchange: -71.22 })).toThrow(RangeError);
    });
});

describe("add", () => {
    test("should return a new Currency instance with exactly 1 key", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 55 });
        const first = new Currency({ refined: 23.44 });
        const second = new Currency({ refined: 31.55 });

        // Act
        const currency = calculator.add(first, second);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(1);
        expect(result.refined).toBe(0);
    });

    test("should return a new Currency instance with keys and refined", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: 5, refined: 23.88 });
        const second = new Currency({ keys: 2, refined: 47.33 });

        // Act
        const currency = calculator.add(first, second);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(8);
        expect(result.refined).toBe(8.55);
    });

    test("should return a new Currency instance using only refined", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 66.88 });
        const first = new Currency({ refined: 43.33 });
        const second = new Currency({ refined: 57.11 });

        // Act
        const currency = calculator.add(first, second);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(1);
        expect(result.refined).toBe(33.55);
    });

    test("should return a new Currency instance using only refined", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 66.88 });
        const first = new Currency({ keys: -3, refined: -7.33 });
        const second = new Currency({ keys: -7, refined: -16.44 });

        // Act
        const currency = calculator.add(first, second);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(-10);
        expect(result.refined).toBe(-23.77);
    });
});

describe("subtract", () => {
    test("should subtract 2 keys and 47.33 ref from 5 keys and 23.88", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 66.88 });
        const first = new Currency({ keys: 5, refined: 23.88 });
        const second = new Currency({ keys: 2, refined: 47.33 });

        // Act
        const currency = calculator.subtract(first, second);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(2);
        expect(result.refined).toBe(43.44);
    });

    test("should subtract 1 key and 11.22 ref from 1 key and 11.22", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: 1, refined: 11.22 });
        const second = new Currency({ keys: 1, refined: 11.22 });

        // Act
        const currency = calculator.subtract(first, second);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(0);
        expect(result.refined).toBe(0);
    });

    test("should subtract 2 keys and 47.33 ref from 1 key and 23.88", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 66.88 });
        const first = new Currency({ keys: 1, refined: 23.88 });
        const second = new Currency({ keys: 2, refined: 47.33 });

        // Act
        const currency = calculator.subtract(first, second);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(-1);
        expect(result.refined).toBe(-23.44);
    });
});

describe("multiply", () => {
    test("should multiply the Currency by a factor of 3", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: 4, refined: 10.88 });

        // Act
        const currency = calculator.multiply(first, 3);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(12);
        expect(result.refined).toBe(32.66);
    });

    test("should multiply the Currency by a factor of negative 2", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: 4, refined: 10.88 });

        // Act
        const currency = calculator.multiply(first, -2);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(-8);
        expect(result.refined).toBe(-21.77);
    });

    test("should multiply a negative Currency by a factor of 2", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: -4, refined: -10.88 });

        // Act
        const currency = calculator.multiply(first, 2);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(-8);
        expect(result.refined).toBe(-21.77);
    });

    test("should throw when the factor value is zero", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 66.88 });
        const currency = new Currency({ keys: 7, refined: 40.77 });

        // Act and assert
        expect(() => calculator.multiply(currency, 0)).toThrow(RangeError);
    });
});

describe("divide", () => {
    test("should divide 4 keys and 10.88 by 2", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: 4, refined: 10.88 });

        // Act
        const currency = calculator.divide(first, 2);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(2);
        expect(result.refined).toBe(5.44);
    });

    test("should divide 3 keys and 22.11 by negative 2", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: 3, refined: 22.11 });

        // Act
        const currency = calculator.divide(first, -2);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(-1);
        expect(result.refined).toBe(-42.44);
    });

    test("should divide -11 keys by 2", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 62.66 });
        const first = new Currency({ keys: -11 });

        // Act
        const currency = calculator.divide(first, 2);
        const result = currency.json();

        // Assert
        expect(result.keys).toBe(-5);
        expect(result.refined).toBe(-31.33);
    });

    test("should throw if the divisor is zero", () => {
        // Arrange
        const calculator = new Calculator({ exchange: 66.88 });
        const currency = new Currency({ keys: 7, refined: 40.77 });

        // Act and assert
        expect(() => calculator.divide(currency, 0)).toThrow(RangeError);
    });
});

describe("total", () => {
    test("should sum an array of positive Currency instances", () => {
        // Arrange
        const exchange = 55;
        const calculator = new Calculator({ exchange });
        const currencies = [ Currency.fromKeys(1.15, exchange), Currency.fromRefined(42.66, exchange), Currency.fromKeys(4.74, exchange) ];

        // Act
        const currency = calculator.sum(currencies);
        const total = currency.toKeys(exchange);

        // Assert
        expect(total).toBe(6.66);
    });

    test("should sum an array of negative Currency instances", () => {
        // Arrange
        const exchange = 55;
        const calculator = new Calculator({ exchange });
        const currencies = [ Currency.fromKeys(-2.7, exchange), Currency.fromRefined(-31.88, exchange), Currency.fromKeys(-2.74, exchange) ];

        // Act
        const currency = calculator.sum(currencies);
        const total = currency.toKeys(exchange);

        // Assert
        expect(total).toBe(-6.02);
    });

    test("should sum an array of mixed Currency instances", () => {
        // Arrange
        const exchange = 59;
        const calculator = new Calculator({ exchange });
        const currencies = [ Currency.fromKeys(3.4, exchange), Currency.fromRefined(21.55, exchange), Currency.fromKeys(-2.74, exchange) ];

        // Act
        const currency = calculator.sum(currencies);
        const total = currency.toKeys(exchange);

        // Assert
        expect(total).toBe(1.02);
    });
});
