import { CurrencyError } from "./errors/currency.error";
import { CharCode, DecimalPrecision, MetalConversion } from "../resources/enums";
import { isValidExchange, roundMetal, toScrap, toReclaimed, toRefined,convertMetal, toKeys, roundFloat, pluralize, createInclusiveString, roundBySign, convertExchangeToKeys } from "../lib/utils";

/**
 * Represents the configuration options for the Currency class.
 */
export interface ICurrency {
    /**
     * The number of keys associated with this currency (the primary unit).
     */
    keys: number,
    /**
     * The amount of refined metal associated with this currency (a smaller unit or fraction).
     */
    refined: number
}

/**
 * Represents the in-game items that make up currency in Team Fortress 2.
 */
export class Currency {
    /**
     * The number of keys associated with this instance.
     */
    private readonly keys: number;
    /**
     * The number of refined metal associated with this instance.
     */
    private readonly refined: number;

    /**
     * Creates a new instance of `Currency`.
     * @param currency The initial number of keys and refined metal to set up this `Currency` instance.
     */
    constructor(currency: Partial<ICurrency> = {}) {
        this.keys = currency.keys || 0;
        this.refined = roundMetal(currency.refined || 0);
    }

    /**
     * Creates a new `Currency` instance from the given amount of scrap metal.
     * @param scrap The total amount of scrap metal to convert.
     * @param exchange The exchange rate to convert from refined to keys.
     * @returns A new `Currency` instance with the converted number of keys and refined metal.
     */
    static fromScrap(scrap: number, exchange = 0) {
        const exchangeInScrap = toScrap(exchange);

        const keys = convertExchangeToKeys(scrap, exchangeInScrap);
        const metalInScrap = scrap - (keys * exchangeInScrap);

        const refined = convertMetal(metalInScrap, MetalConversion.Scrap);

        return new Currency({ keys, refined });
    }

    /**
     * Creates a new `Currency` instance from the given amount of reclaimed metal.
     * @param reclaimed The total amount of reclaimed metal to convert.
     * @param exchange The exchange rate to convert from refined to keys.
     * @returns A new `Currency` instance with the converted number of keys and refined metal.
     */
    static fromReclaimed(reclaimed: number, exchange = 0) {
        const exchangeInReclaimed = toReclaimed(exchange);

        const keys = convertExchangeToKeys(reclaimed, exchangeInReclaimed);
        const metalInReclaimed = reclaimed - (keys * exchangeInReclaimed);

        const refined = convertMetal(metalInReclaimed, MetalConversion.Reclaimed);

        return new Currency({ keys, refined });
    }

    /**
     * Creates a new `Currency` instance from the given amount of refined metal.
     * @param refined The total amount of refined metal to convert.
     * @param exchange The exchange rate to convert from refined to keys.
     * @returns A new `Currency` instance with the converted number of keys and refined metal.
     */
    static fromRefined(refined: number, exchange = 0) {
        const exchangeInRefined = roundMetal(exchange);

        const keys = convertExchangeToKeys(refined, exchangeInRefined);
        const metalInRefined = refined - (keys * exchangeInRefined);

        const remainder = convertMetal(metalInRefined, MetalConversion.Refined);

        return new Currency({ keys, refined: remainder });
    }

    /**
     * Creates a new `Currency` instance from the given amount of keys.
     * @param value The total amount of keys to convert.
     * @param exchange The exchange rate to convert from refined to keys.
     * @returns A new `Currency` instnace with the converted number of keys and refined metal.
     */
    static fromKeys(value: number, exchange = 0) {
        const keys = roundBySign(value);
        const refinedInKeys = roundFloat(value - keys, DecimalPrecision.Four);

        if (isValidExchange(refinedInKeys, exchange)) {
            throw new CurrencyError("An exchange value must be provided when the number of refined is greater than zero.");
        }

        const exchangeInScrap = toScrap(exchange);
        const scrap = Math.round(refinedInKeys * exchangeInScrap);

        const refined = convertMetal(scrap, MetalConversion.Scrap);

        return new Currency({ keys, refined });
    }

    /**
     * Adds the given amount of scrap metal to the current `Currency` instance.
     * @param scrap The amount of scrap metal to add.
     * @param exchange The exchange rate to convert from refined metal to keys.
     * @returns The updated `Currency` instance with the added scrap metal.
     */
    addScrap(scrap: number, exchange = 0): Currency {
        const total = this.toScrap(exchange) + scrap;
        const currency = Currency.fromScrap(total, exchange);

        return Object.assign(this, currency);
    }

    /**
     * Subtracts the given amount of scrap metal from the current `Currency` instance.
     * @param scrap The amount of scrap metal to subtract.
     * @param exchange The exchange rate to convert from refined metal to keys.
     * @returns The updated `Currency` instance with the subtracted scrap metal.
     */
    subtractScrap(scrap: number, exchange = 0): Currency {
        this.addScrap(-scrap, exchange);

        return this;
    }

    /**
     * Converts the current `Currency` instance to scrap metal.
     * @param exchange The exchange rate to convert from keys to refined metal.
     * @returns The total amount of scrap metal equivalent to the current `Currency` instance.
     */
    toScrap(exchange = 0): number {
        return toScrap(exchange, this.keys, this.refined);
    }

    /**
     * Adds the given amount of reclaimed metal to the current `Currency` instance.
     * @param reclaimed The amount of reclaimed metal to add.
     * @param exchange The exchange rate to convert from refined metal to keys.
     * @returns The updated `Currency` instance with the added reclaimed metal.
     */
    addReclaimed(reclaimed: number, exchange = 0): Currency {
        const total = this.toReclaimed(exchange) + reclaimed;
        const currency = Currency.fromReclaimed(total, exchange);

        return Object.assign(this, currency);
    }

    /**
     * Subtracts the given amount of reclaimed metal from the current `Currency` instance.
     * @param reclaimed The amount of reclaimed metal to subtract.
     * @param exchange The exchange rate to convert from refined metal to keys.
     * @returns The updated `Currency` instance with the subtracted reclaimed metal.
     */
    subtractReclaimed(reclaimed: number, exchange = 0): Currency {
        this.addReclaimed(-reclaimed, exchange);

        return this;
    }

    /**
     * Converts the current `Currency` instance to reclaimed metal.
     * @param exchange The exchange rate to convert from keys to refined metal.
     * @returns The total amount of reclaimed metal equivalent to the current `Currency` instance.
     */
    toReclaimed(exchange = 0): number {
        return toReclaimed(exchange, this.keys, this.refined);
    }

    /**
     * Adds the given amount of refined metal to the current `Currency` instance.
     * @param refined The amount of refined metal to add.
     * @param exchange The exchange rate to convert from refined metal to keys.
     * @returns The updated `Currency` instance with the added refined metal.
     */
    addRefined(refined: number, exchange = 0) {
        const total = this.toRefined(exchange) + refined;
        const currency = Currency.fromRefined(total, exchange);

        return Object.assign(this, currency);
    }

    /**
     * Subtracts the given amount of refined metal from the current `Currency` instance.
     * @param refined The amount of refined metal to subtract.
     * @param exchange The exchange rate to convert from refined metal to keys.
     * @returns The updated `Currency` instance with the subtracted refined metal.
     */
    subtractRefined(refined: number, exchange = 0): Currency {
        this.addRefined(-refined, exchange);

        return this;
    }

    /**
     * Converts the current `Currency` instance to refined metal.
     * @param exchange The exchange rate to convert from keys to refined metal.
     * @returns The total amount of refined metal equivalent to the current `Currency` instance.
     */
    toRefined(exchange = 0): number {
        return toRefined(exchange, this.keys, this.refined);
    }

    /**
     * Adds the given amount of keys to the current `Currency` instance.
     * @param keys The amount of keys to add.
     * @param exchange The exchange rate to convert from keys to refined metal.
     * @returns The updated `Currency` instance with the added keys.
     */    
    addKeys(keys: number, exchange = 0) {
        const total = toKeys(exchange, this.keys, this.refined, DecimalPrecision.Four) + keys;

        const currency = Currency.fromKeys(total, exchange);

        return Object.assign(this, currency);
    }

    /**
     * Subtracts the given amount of keys from the current `Currency` instance.
     * @param keys The amount of keys to subtract.
     * @param exchange The exchange rate to convert from keys to refined metal.
     * @returns The updated `Currency` instance with the subtracted keys.
     */
    subtractKeys(keys: number, exchange = 0): Currency {
        this.addKeys(-keys, exchange);

        return this;
    }

    /**
     * Converts the current `Currency` instance to keys.
     * @param exchange The exchange rate to convert from keys to refined metal.
     * @returns The total amount of keys equivalent to the current `Currency` instance.
     */
    toKeys(exchange = 0): number {
        return toKeys(exchange, this.keys, this.refined, DecimalPrecision.Two);
    }

    /**
     * Creates a copy of the current Currency instance.
     * @returns A copy of the current instance.
     */
    copy(): Currency {
        return new Currency(this.json());
    }

    /**
     * Converts the Currency object to a string.
     * @returns The string representation of the Currency object.
     */
    toString(): string {
        if (!this.keys && !this.refined) {
            return "0 keys, 0 ref";
        }

        const keys = pluralize("key", this.keys);
        const refined = createInclusiveString("ref", this.refined);

        const separator = String.fromCharCode(CharCode.Space);

        return [keys, refined].join(separator);
    }

    /**
     * Converts the Currency to a JSON object.
     * @returns The JSON representation of the Currency object.
     */
    json(): ICurrency {
        return {
            keys: this.keys,
            refined: this.refined
        };
    }

    /**
     * Converts the Currency object to a JSON string.
     * @returns The JSON string representation of the Currency object.
     */
    stringify(): string {
        return JSON.stringify(this.json());
    }
}
