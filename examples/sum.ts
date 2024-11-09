import { Currency } from "../src/classes/currency";
import { Calculator } from "../src/classes/calculator";

try {
    // Create a new Calculator instance with an exchange rate of 55 refined
    const calculator = new Calculator({ exchange: 55 });

    // Create an array of currencies to sum using the same exchange rate
    const currencies = [ Currency.fromKeys(1.15, 55), Currency.fromRefined(42.66, 55), Currency.fromKeys(4.74, 55) ];

    // Sum the currencies into a single Currency instance
    const currency = calculator.sum(currencies);

    console.log(currency.toKeys(55)); // 6.66 keys
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error calculating the sum of the currencies array", error.message);
    }
}