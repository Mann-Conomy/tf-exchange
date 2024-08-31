import { roundMetal, toScrap } from "../lib/utils";
import ICurrency from "../types/currency.interface";
import { CurrencyError } from "./currency.error";

export default class Currency {
    private readonly keys: number;
    private readonly refined: number;

    constructor(currency: Partial<ICurrency> = {}) {
        this.keys = currency.keys || 0;
        this.refined = roundMetal(currency.refined || 0);
    }

    static fromScrap(scrap: number, exchange = 0) {

    }

    static fromReclaimed(reclaimed: number, exchange = 0) {

    }

    static fromRefined(refined: number, exchange = 0) {

    }

    static fromKeys(keys: number, exchange = 0) {

    }

    addScrap(scrap: number) {

    }

    toScrap(exchange = 0): number {
        if (this.keys > 0 && !(exchange > 0)) {
            throw new CurrencyError("no");
        }

        const totalRefined = roundMetal(this.refined + (this.keys * exchange));

        return toScrap(totalRefined);
    }
    
    addReclaimed(reclaimed: number) {

    }

    toReclaimed(exchange = 0): number {
        return 0
    }

    addRefined(refined: number, exchange = 0) {

    }

    toRefined(exchange = 0): number {
        return 0
    }

    addKeys(keys: number) {

    }

    toKeys(exchange = 0): number {
        if (this.refined > 0 && !(exchange > 0)) {
            throw new CurrencyError("Also no");
        }

        const keys = Math.round(1 * this.refined / exchange * 100) / 100;

        return parseFloat((this.keys + keys).toFixed(2));
    }

    copy() {
        return new Currency(this.json());
    }

    toString(): string {
        if (!this.keys && !this.refined) {
            return "0 keys, 0 ref";
        }

        return "";
    }

    json() {
        return {
            keys: this.keys,
            refined: this.refined
        }
    }

    stringify(): string {
        return JSON.stringify(this.json());
    }
}