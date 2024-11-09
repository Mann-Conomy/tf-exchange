import { Currency } from "../src/classes/currency";
import { Calculator } from "../src/classes/calculator";

try {
    // Create a new Calculator instance with an exchange rate of 62.66 refined
    const calculator = new Calculator({ exchange: 62.66 });

    // Create a new Currency instance with keys and refined
    const currency = new Currency({ keys: 4, refined: 10.88 });

    // Multiply the currency values by a factor of 3
    const result = calculator.multiply(currency, 3);

    console.log(result.toString()); // 12 keys, 32.66 refined
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error multiplying the currency", error.message);
    }
}
