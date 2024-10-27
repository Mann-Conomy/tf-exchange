export type DecimalPrecision = number | string;

declare module "expect" {
    interface AsymmetricMatchers {
        toHavePrecision(value: DecimalPrecision): void;
    }
    interface Matchers<R> {
        toHavePrecision(value: DecimalPrecision): R;
    }
}
