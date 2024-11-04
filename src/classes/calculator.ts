import { Currency } from "./currency";

/**
 * Represents the configuration options for the Calculator class.
 */
export interface ICalculator {
    /**
     * The exchange rate to convert from keys to refined metal.
     */
    exchange: number
}

/**
 * Perform various currency operations, such as addition, subtraction, multiplication, and division.
 */
export class Calculator {
    private readonly exchange: number;

    /**
     * Creates a new instance of `Calculator`.
     * @param options Exchange rate options for the calculator.
     */
    constructor(options: Partial<ICalculator> = {}) {
        this.exchange = options.exchange || 0;

        if (!(this.exchange >= 0)) {
            throw new RangeError("The exchange rate cannot be negative.");
        }
    }

    /**
     * Adds two currency instances together.
     * @param first The first Currency instance.
     * @param second The second Currency instance.
     * @returns A new Currency instance representing the sum of the two currencies.
     */
    add(first: Currency, second: Currency): Currency {
        const scrap = first.toScrap(this.exchange) + second.toScrap(this.exchange);

        return Currency.fromScrap(scrap, this.exchange);
    }

    /**
     * Subtracts one currency instance from another.
     * @param minuend The Currency instance to subtract from.
     * @param subtrahend The Currency instance to be subtracted.
     * @returns A new Currency instance representing the result of the subtraction.
     */
    subtract(minuend: Currency, subtrahend: Currency): Currency {
        const scrap = minuend.toScrap(this.exchange) - subtrahend.toScrap(this.exchange);

        return Currency.fromScrap(scrap, this.exchange);
    }

    /**
     * Multiplies a currency instance by a specified factor.
     * @param currency The Currency instance to multiply.
     * @param factor The factor by which to multiply the currency. 
     * @returns A new Currency instance representing the product.
     */
    multiply(currency: Currency, factor: number): Currency {
        if (factor === 0) {
            throw new RangeError("The multiplier cannot be zero.");
        }

        const scrap = currency.toScrap(this.exchange) * factor;

        return Currency.fromScrap(scrap, this.exchange);
    }

    /**
     * Divides a currency instance by a specified divisor.
     * @param currency The Currency instance to divide.
     * @param divisor The divisor by which to divide the currency.
     * @returns 
     */
    divide(currency: Currency, divisor: number): Currency {
        if (divisor === 0) {
            throw new RangeError("The divisor cannot be zero.");
        }

        const scrap = currency.toScrap(this.exchange) / divisor;

        return Currency.fromScrap(scrap, this.exchange);
    }

    /**
     * Sums an array of currency instances.
     * @param currencies An array of Currency instances to sum.
     * @returns A new Currency instance representing the total sum of the array.
     */
    sum(currencies: Currency[]): Currency {
        const sum = currencies.reduce((previous, current) => previous + current.toScrap(this.exchange), 0);

        return Currency.fromScrap(sum);
    }
}
