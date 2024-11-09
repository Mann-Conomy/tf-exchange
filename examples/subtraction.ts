import { Currency } from "../src/classes/currency";
import { Calculator } from "../src/classes/calculator";

try {
    // Create a new Calculator instance with an exchange rate of 66.88 refined
    const calculator = new Calculator({ exchange: 66.88 });

    // Create two Currency instances with keys and refined
    const first = new Currency({ keys: 5, refined: 23.88 });
    const second = new Currency({ keys: 2, refined: 47.33 });

    // Subtract the second currency from the first currency
    const currency = calculator.subtract(first, second);

    console.log(currency.toString()); // 2 keys, 43.44 refined
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error subtracting the two currencies", error.message);
    }
}
