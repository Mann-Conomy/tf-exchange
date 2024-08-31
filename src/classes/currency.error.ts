/**
 * A wrapper for handling errors specific to the Currency class.
 * @extends Error
 */
export class CurrencyError extends Error {
    /**
     * Creates a new instance of CurrencyError.
     * @param { string } message The error message.
     */
    constructor(message: string) {
        super(message);

        this.name = "CurrencyError";
    }
}
