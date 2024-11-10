import { CharCode, MetalConversion } from "../resources/enums";

/**
 * Rounds the amount of refined metal to the nearest valid increment
 * @param refined The amount of refined metal to round.
 * @returns The rounded amount of refined metal with te original sign value.
 */
export function roundMetal(refined: number): number {
    const absolute = Math.abs(refined);
    const whole = Math.floor(absolute);
    const decimal = Math.round((absolute - whole) / 0.11);

    const rounded = (whole + (MetalConversion.Scrap === decimal ? 1 : 0.11 * decimal)).toFixed(2);

    return parseFloat(rounded) * (refined < 0 ? -1 : 1);
}

/**
 * Converts an amount of metal based on a target conversion rate and rounds the result.
 * @param metal The amount of metal to convert.
 * @param target The conversion target that adjusts the value of the metal.
 * @returns The converted and rounded amount of metal.
 */
export function convertMetal(metal: number, target: number) {
    return roundMetal((metal / target * 100) / 100);
}

/**
 * * Rounds a number to the integer.
 * @param n The number to round.
 * @returns The rounded integer value.
 */
export function roundInt(n: number): number {
    return parseInt((Math.round(2 * n) / 2).toFixed(4));
}

/**
 * Converts refined metal to scrap metal.
 * @param refined The total amount of refined metal to convert.
 * @returns The converted number of scrap metal.
 */
export function toScrap(refined: number): number {
    return roundInt(Math.round(MetalConversion.Scrap * refined * 100) / 100);
}

/**
 * Converts refined metal to reclaimed metal.
 * @param refined The total amount of refined metal to convert.
 * @returns The converted number of reclaimed metal.
 */
export function toReclaimed(refined: number): number {
    return roundMetal(Math.round(MetalConversion.Reclaimed * refined * 100) / 100);
}

/**
 * Rounds a floating-point number to a specified number of decimal places.
 * @param value The number to be rounded.
 * @param decimal The number of decimal places to round to.
 * @returns The rounded number, with the specified number of decimal places.
 */
export function roundFloat(value: number, decimal = 2) {
    return parseFloat(value.toFixed(decimal));
}

/**
 * Checks if the provided exchange rate is valid.
 * @param currency The currency value to check against the exchange rate.
 * @param exchange The exchange rate to convert from refined metal to keys.
 * @returns True if the currency and exchange rate is valid, otherwise false.
 */
export function isValidExchange(currency: number, exchange: number): boolean {
    if (!(exchange >= 0)) {
        throw new RangeError("Exchange rate cannot be negative.");
    }

    return currency > 0 && !(exchange > 0);
}

/**
 * Combines a number and a string with a space separator in between.
 * @param text The text to be appended after the value.
 * @param value The numerical value to prefix the text with.
 * @returns A string with the `value` followed by a space and `text`.
 */
export function createInclusiveString(text: string, value: number, ) {
    const separator = String.fromCharCode(CharCode.Space);

    return value.toString().concat(separator, text);
}

/**
 * Pluralizes a given text based on the specified value.
 * @param text The text to pluralize based on `value`.
 * @param value The quantity that determines if `text` should be pluralized.
 * @returns The pluralized text followed by a comma with the formatted value`.
 */
export function pluralize(text: string, value: number) {
    const suffix = String.fromCharCode(CharCode.Plural);
    const keys = value === 1 ? text : text.concat(suffix);
    const separator = String.fromCharCode(CharCode.Comma);

    return createInclusiveString(keys.concat(separator), value);
}

/**
 * Rounds a currency value based on its sign.
 * @param currency The currency value to round.
 * @returns The rounded currency value.
 */
export function roundBySign(currency: number) {
    return currency < 0 ? Math.ceil(currency) : Math.floor(currency);
}

/**
 * Converts and rounds a currency amount using the exchange rate
 * @param exchange The exchange rate to convert from refined metal to keys.
 * @returns The converted and rounded currency value.
 */
export function convertExchangeToKeys(currency: number, exchange = 0) {
    return exchange ? roundBySign(currency / exchange) : 0;
}
