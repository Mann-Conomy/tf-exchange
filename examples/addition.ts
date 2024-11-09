import { Currency } from "../src/classes/currency";
import { Calculator } from "../src/classes/calculator";

try {
    // Create a new Calculator instance with an exchange rate of 55 refined
    const calculator = new Calculator({ exchange: 55 });

    // Create two Currency instances with keys and refined
    const first = new Currency({ refined: 23.44 });
    const second = new Currency({ refined: 31.55 });

    // Add the two currency instances together
    const currency = calculator.add(first, second);

    console.log(currency.toString()); // 1 key, 0 refined
} catch (error: unknown) {
    if (error instanceof Error) {
        console.error("Error adding the two currencies", error.message);
    }
}
