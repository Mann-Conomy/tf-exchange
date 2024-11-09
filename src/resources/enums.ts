/**
 * Represents the conversion values for metal.
 */
export enum MetalConversion {
    Scrap = 9,
    Reclaimed = 3,
    Refined = 1,
}

/**
 * Represents various types of in-game currencies.
 */
export enum CurrencyType {
    Scrap = "scrap",
    Reclaimed = "reclaimed",
    Refined = "ref",
    Key = "key",
    Keys = "keys"
}

/**
 * Represents the precision level of decimal values.
 */
export enum DecimalPrecision {
    None = 0,
    One = 1,
    Two = 2,
    Three = 3,
    Four = 4
}

/**
 * Represents character codes for specific characters.
 */
export enum CharCode {
    Space = 32,
    Comma = 44,
    Plural = 115
}
