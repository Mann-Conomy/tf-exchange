import { Currency } from "../src/classes/currency";
import { Calculator } from "../src/classes/calculator";

try {
    // Create a new Calculator instance with an exchange rate of 62.66 refined
    const calculator = new Calculator({ exchange: 62.66 });

    // Create a new Currency instance with keys and refined
    const currency = new Currency({ keys: 4, refined: 10.88 });

    // Divide the currency valyes by a factor of 2
    const result = calculator.divide(currency, 2);

    console.log(result.toString()); // 2 keys, 5.44 refined
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error dividing the currency", error.message);
    }
}
