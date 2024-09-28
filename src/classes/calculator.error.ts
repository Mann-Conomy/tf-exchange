/**
 * A wrapper for handling errors specific to the Calculator class.
 * @extends Error
 */
export class CalculatorError extends Error {
    /**
     * Creates a new instance of CalculatorError.
     * @param { string } message The error message.
     */
    constructor(message: string) {
        super(message);

        this.name = "CalculatorError";
    }
}
