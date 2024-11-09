import { Currency } from "../src/classes/currency"
import { describe, expect, test } from "@jest/globals";
import { CurrencyError } from "../src/classes/errors/currency.error";

describe("Currency", () => {
    describe("constructor", () => {
        test("should create a new instance of Currency", () => {
            // Arrange
            const currency = new Currency();
    
            // Assert
            expect(currency).toBeInstanceOf(Currency);
        });
    });

    describe("fromScrap", () => {
        test("should return a Currency object with only keys", () => {
            // Arrange
            const currency = Currency.fromScrap(576, 64);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(1);
            expect(result.refined).toBe(0);
        });

        test("should return a Currency object with only refined", () => {
            // Arrange
            const currency = Currency.fromScrap(377);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(41.88);
        });

        test("should return a Currency object with keys and refined", () => {
            // Arrange
            const currency = Currency.fromScrap(1564, 62.44);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(2);
            expect(result.refined).toBe(48.88);
        });
    });

    describe("fromReclaimed", () => {
        test("should return a Currency object with only keys", () => {
            // Arrange
            const currency = Currency.fromReclaimed(188, 62.66);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(1);
            expect(result.refined).toBe(0);
        });

        test("should return a Currency object with only refined", () => {
            // Arrange
            const currency = Currency.fromReclaimed(95);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(31.66);
        });

        test("should return a Currency object with keys and refined", () => {
            // Arrange
            const currency = Currency.fromReclaimed(470, 62.66);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(2);
            expect(result.refined).toBe(31.33);
        });
    });

    describe("fromRefined", () => {
        test("should return a Currency object with only keys", () => {
            // Arrange
            const currency = Currency.fromRefined(200.66, 66.88);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(3);
            expect(result.refined).toBe(0);
        });

        test("should create a new instance of Currency with only refined", () => {
            // Arrange
            const currency = Currency.fromRefined(37.55);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(37.55);
        });

        test("should return a new instance of Currency with keys and refined", () => {
            // Arrange
            const currency = Currency.fromRefined(377, 66.88);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(5);
            expect(result.refined).toBe(42.55);
        });
    });

    describe("fromKeys", () => {
        test("should return a Currency object with only keys", () => {
            // Arrange
            const currency = Currency.fromKeys(5, 62.44);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(5);
            expect(result.refined).toBe(0);
        });

        test("should return a Currency object with keys and refined", () => {
            // Arrange
            const currency = Currency.fromKeys(4.4, 66.88);

            // Act
            const result = currency.json();
    
            // Assert
            expect(result.keys).toBe(4);
            expect(result.refined).toBe(26.77);
        });

        test("should throw if the exchange value is missing", () => {
            // Act and assert
            expect(() => Currency.fromKeys(6.2)).toThrow(CurrencyError);
        });

        test("should throw if the exchange value is negative", () => {
            // Arrange
            expect(() => Currency.fromKeys(7.2, -66.88)).toThrow(RangeError);
        });
    });

    describe("toScrap", () => {
        test("should convert 1 key to 564 scrap", () => {
            // Arrange
            const currency = new Currency({ keys: 1 });
    
            // Act
            const scrap = currency.toScrap(62.66);
    
            // Assert
            expect(scrap).toBe(564);
        });

        test("should convert 33.22 ref to 299 scrap", () => {
            // Arrange
            const currency = new Currency({ refined: 33.22 });
    
            // Act
            const scrap = currency.toScrap();
    
            // Assert
            expect(scrap).toBe(299);
        });

        test("should convert 12 keys and 46.22 ref to 7183 scrap", () => {
            // Arrange
            const currency = new Currency({ keys: 12, refined: 46.22 });
    
            // Act
            const scrap = currency.toScrap(62.66);
    
            // Assert
            expect(scrap).toBe(7184);
        });
    
        test("should throw if the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 7, refined: 11.88 });
    
            // Act and assert
            expect(() => currency.toScrap()).toThrow(CurrencyError);
        });

        test("should throw if the exchange value is negative", () => {
            // Arrange
            const currency = new Currency({ keys: 7, refined: 11.88 });
    
            // Act and assert
            expect(() => currency.toScrap(-62.66)).toThrow(RangeError);
        });
    });

    describe("toReclaimed", () => {
        test("should convert 1 key to reclaimed", () => {
            // Arrange
            const currency = new Currency({ keys: 1 });
   
            // Act
            const reclaimed = currency.toReclaimed(62.66);
    
            // Assert
            expect(reclaimed).toBe(188);
        });

        test("should convert 32.33 refined to reclaimed", () => {
            // Arrange
            const currency = new Currency({ refined: 33.33 });
    
            // Act
            const reclaimed = currency.toReclaimed();
    
            // Assert
            expect(reclaimed).toBe(100);
        });

        test("should converts keys and refined to reclaimed", () => {
            // Arrange
            const currency = new Currency({ keys: 12, refined: 46.22 });
    
            // Act
            const reclaimed = currency.toReclaimed(66.88);

            // Assert
            expect(reclaimed).toBe(2546.55);
        });
    
        test("should throw if the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 1, refined: 5 });
    
            // Act and assert
            expect(() => currency.toReclaimed()).toThrow(CurrencyError);
        });

        test("should throw if the exchange value is negative", () => {
            // Arrange
            const currency = new Currency({ keys: 1, refined: 5 });
    
            // Act and assert
            expect(() => currency.toRefined(-66.88)).toThrow(RangeError);
        });
    });

    describe("toRefined", () => {
        test("should convert keys to refined", () => {
            // Arrange
            const currency = new Currency({ keys: 10 });
    
            // Act
            const refined = currency.toRefined(66.88);
    
            // Assert
            expect(refined).toBe(668.77);
        });

        test("should convert refined to refined", () => {
            // Arrange
            const currency = new Currency({ refined: 33.22 });
    
            // Act
            const scrap = currency.toRefined();
    
            // Assert
            expect(scrap).toBe(33.22);
        });

        test("should converts keys and refined to refined", () => {
            // Arrange
            const currency = new Currency({ keys: 4, refined: 53.55 });
    
            // Act
            const scrap = currency.toRefined(66.88);
    
            // Assert
            expect(scrap).toBe(321.11);
        });
    
        test("should throw if the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 2, refined: 46 });
    
            // Act and assert
            expect(() => currency.toRefined()).toThrow(CurrencyError);
        });

        test("should throw if the exchange value is negative", () => {
            // Arrange
            const currency = new Currency({ keys: 2, refined: 46 });
    
            // Assert
            expect(() => currency.toRefined(-66.88)).toThrow(RangeError);
        });
    });

    describe("toKeys", () => {
        test("should convert keys to keys", () => {
            // Arrange
            const currency = new Currency({ keys: 225 });
    
            // Act
            const keys = currency.toKeys();
    
            // Assert
            expect(keys).toBe(225);
        });

        test("should convert refined to keys", () => {
            // Arrange
            const currency = new Currency({ refined: 480.66 });
    
            // Act
            const keys = currency.toKeys(66.88);
    
            // Assert
            expect(keys).toBe(7.19);
        });

        test("should convert keys and refined to keys", () => {
            // Arrange
            const currency = new Currency({ keys: 49, refined: 50 });
    
            // Act
            const keys = currency.toKeys(66.88);
    
            // Assert
            expect(keys).toBe(49.75);
        });
    
        test("should throw if the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 47, refined: 50.88 });
    
            // Act and assert
            expect(() => currency.toKeys()).toThrow(CurrencyError);
        });

        test("should throw if the exchange value is negative", () => {
            // Arrange
            const currency = new Currency({ keys: 47, refined: 50.88 });
    
            // Act and assert
            expect(() => currency.toKeys(-66.88)).toThrow(RangeError);
        });
    });

    describe("addScrap", () => {
        test("should add 465 scrap to 9 keys", () => {
            // Arrange
            const currency = new Currency({ keys: 9 });

            // Act
            currency.addScrap(465, 62.66);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(9);
            expect(result.refined).toBe(51.66);
        });

        test("should add 329 scrap to 1.33 ref", () => {
            // Arrange
            const currency = new Currency({ refined: 1.33 });

            // Act
            currency.addScrap(329);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(37.88);
        });

        test("should add 2309 scrap to 3 keys and 33.11 ref", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act
            currency.addScrap(2307, 62.66);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(7);
            expect(result.refined).toBe(38.77);
        });

        test("should throw when the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act and assert
            expect(() => currency.addScrap(230)).toThrow(CurrencyError);
        });
    });

    describe("addReclaimed", () => {
        test("should add 54 reclaimed to 3 keys", () => {
            // Arrange
            const currency = new Currency({ keys: 3 });

            // Act
            currency.addReclaimed(54, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(3);
            expect(result.refined).toBe(18);
        });

        test("should add 7 reclaimed to 1.33 ref", () => {
            // Arrange
            const currency = new Currency({ refined: 1.33 });

            // Act
            currency.addReclaimed(7);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(3.66);
        });

        test("should add 304 reclaimed to 3 keys and 33.11 ref", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act
            currency.addReclaimed(304, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(5);
            expect(result.refined).toBe(0.66);
        });

        test("should throw when the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act and assert
            expect(() => currency.addReclaimed(230)).toThrow(CurrencyError);
        });
    });

    describe("addRefined", () => {
        test("should add 150 refined to 9 keys", () => {
            // Arrange
            const currency = new Currency({ keys: 9 });

            // Act
            currency.addRefined(150, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(11);
            expect(result.refined).toBe(16.22);
        });

        test("should add 11.88 refined to 1.33 ref", () => {
            // Arrange
            const currency = new Currency({ refined: 1.33 });

            // Act
            currency.addRefined(11.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(13.22);
        });

        test("should add 113.44 refined to 3 keys and 33.11 ref", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act
            currency.addRefined(113.44, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(5);
            expect(result.refined).toBe(12.77);
        });

        test("should throw when the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act and assert
            expect(() => currency.addRefined(145)).toThrow(CurrencyError);
        });
    });

    describe("addKeys", () => {
        test("should add 6.5 keys to 9 keys", () => {
            // Arrange
            const currency = new Currency({ keys: 9 });

            // Act
            currency.addKeys(6.5, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(15);
            expect(result.refined).toBe(33.44);
        });

        test("should add 9 keys to 1.33 ref", () => {
            // Arrange
            const currency = new Currency({ refined: 1.33 });

            // Act
            currency.addKeys(9, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(9);
            expect(result.refined).toBe(1.33);
        });

        test("should add 4.74 keys to 3 keys and 33.11 ref", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act
            currency.addKeys(4.74, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(8);
            expect(result.refined).toBe(15.77);
        });

        test("should throw when the exchange value is missing", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 33.11 });

            // Act and assert
            expect(() => currency.addKeys(5.7)).toThrow(CurrencyError);
        });
    });

    describe("subtractScrap", () => {
        test("should subtract 37 scrap from the Currency object", () => {
            // Arrange
            const currency = new Currency({ refined: 14.33 });

            // Act
            currency.subtractScrap(37);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(10.22);
        });

        test("should subtract 100 scrap from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 1, refined: 27.55 });

            // Act
            currency.subtractScrap(100, 66.88);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(1);
            expect(result.refined).toBe(16.44);
        });

        test("should subtract 44.88 ref in scrap from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 44.88 });

            // Act
            currency.subtractScrap(404, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(3);
            expect(result.refined).toBe(0);
        });

        test("should subtract 1 key in scrap from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 1 });

            // Act
            currency.subtractScrap(495, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(0);
        });

        test("should subtract enough scrap to create a Currency object with negative values", () => {
            // Arrange
            const currency = new Currency({ keys: 2, refined: 13.11 });

            // Act
            currency.subtractScrap(1804, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(-1);
            expect(result.refined).toBe(-22.33);
        });
    });

    describe("subtractReclaimed", () => {
        test("should subtract 26 reclaimed from the Currency object", () => {
            // Arrange
            const currency = new Currency({ refined: 40.66 });

            // Act
            currency.subtractReclaimed(26);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(32);
        });

        test("should subtract 45 reclaimed from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 20, refined: 18 });

            // Act
            currency.subtractReclaimed(45, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(20);
            expect(result.refined).toBe(3);
        });

        test("should subtract 26.66 ref in reclaimed from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 2, refined: 5.55 });

            // Act
            currency.subtractReclaimed(80, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(1);
            expect(result.refined).toBe(33.88);
        });

        test("should subtract 1 key in reclaimed from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 1 });

            // Act
            currency.subtractReclaimed(165, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(0);
        });

        test("should subtract enough reclaimed to create a Currency object with negative values", () => {
            // Arrange
            const currency = new Currency({ keys: 1, refined: 17.66 });

            // Act
            currency.subtractReclaimed(330, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(-37.33);
        });
    });

    describe("subtractRefined", () => {
        test("should subtract 12 refined from the Currency object", () => {
            // Arrange
            const currency = new Currency({ refined: 34.88 });

            // Act
            currency.subtractRefined(12);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(22.88);
        });

        test("should subtract 43.66 refined from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 5, refined: 6.11 });

            // Act
            currency.subtractRefined(70.11, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(3);
            expect(result.refined).toBe(46);
        });

        test("should subtract 44.88 ref from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 3, refined: 44.88 });

            // Act
            currency.subtractRefined(44.88, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(3);
            expect(result.refined).toBe(0);
        });

        test("should subtract 1 key in refined from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 1 });

            // Act
            currency.subtractRefined(55, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(0);
        });

        test("should subtract enough refined to create a Currency object with negative values", () => {
            // Arrange
            const currency = new Currency({ keys: 2, refined: 13.11 });

            // Act
            currency.subtractRefined(55, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(1);
            expect(result.refined).toBe(13.11);
        });
    });

    describe("subtractKeys", () => {
        test("should subtract 10 keys from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 18 });

            // Act
            currency.subtractKeys(13);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(5);
            expect(result.refined).toBe(0);
        });

        test("should subtract 10 keys from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 12, refined: 14.77 });

            // Act
            currency.subtractKeys(10, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(2);
            expect(result.refined).toBe(14.77);
        });

        test("should subtract 3.7 keys in scrap from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 8, refined: 44.88 });

            // Act
            currency.subtractKeys(3.7, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(5);
            expect(result.refined).toBe(6.33);
        });

        test("should subtract 1 key in scrap from the Currency object", () => {
            // Arrange
            const currency = new Currency({ keys: 6 });

            // Act
            currency.subtractKeys(1, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(5);
            expect(result.refined).toBe(0);
        });

        test("should subtract enough keys to create a Currency object with negative values", () => {
            // Arrange
            const currency = new Currency({ keys: 1, refined: 13.77 });

            // Act
            currency.subtractKeys(2.55, 55);
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(-1);
            expect(result.refined).toBe(-16.44);
        });
    });

    describe("toString", () => {
        test("should return 0 keys, 0 ref when the Currency object is empty", () => {
            // Arrange
            const currency = new Currency();
    
            // Act
            const result = currency.toString();
    
            // Assert
            expect(result).toBe("0 keys, 0 ref");
        });

        test("should return 1 key, 0 ref when the Currency object only contains 1 key", () => {
            // Arrange
            const currency = new Currency({ keys: 1 });
    
            // Act
            const result = currency.toString();
    
            // Assert
            expect(result).toBe("1 key, 0 ref");
        });

        test("should return 23 keys, 0 ref when the Currency object only contains 23 keys", () => {
            // Arrange
            const currency = new Currency({ keys: 23 });
    
            // Act
            const result = currency.toString();
    
            // Assert
            expect(result).toBe("23 keys, 0 ref");
        });

        test("should return 0 keys, 58.11 ref when the Currency object only contains 58.11 refined", () => {
            // Arrange
            const currency = new Currency({ refined: 58.11 });
    
            // Act
            const result = currency.toString();
    
            // Assert
            expect(result).toBe("0 keys, 58.11 ref");
        });

        test("should return 41 keys, 13.77 ref when the Currency object contains 41 keys and 13.77 refined", () => {
            // Arrange
            const currency = new Currency({ keys: 41, refined: 13.77 });
    
            // Act
            const result = currency.toString();
    
            // Assert
            expect(result).toBe("41 keys, 13.77 ref");
        });
    });

    describe("stringify", () => {
        test("should return an empty currency object", () => {
            // Arrange
            const currency = new Currency();
    
            // Act
            const result = currency.stringify();
    
            // Assert
            expect(result).toBe(JSON.stringify(currency));
        });

        test("should return a currency object with 11 keys", () => {
            // Arrange
            const currency = new Currency({ keys: 11 });
    
            // Act
            const result = currency.stringify();
    
            // Assert
            expect(result).toBe(JSON.stringify(currency));
        });

        test("should return a currency object with 17.44 refined", () => {
            // Arrange
            const currency = new Currency({ refined: 17.44 });
    
            // Act
            const result = currency.stringify();
    
            // Assert
            expect(result).toBe(JSON.stringify(currency));
        });

        test("should return a currency object with 11 keys and 17.44 refined", () => {
            // Arrange
            const currency = new Currency({ keys: 11, refined: 17.44 });
    
            // Act
            const result = currency.stringify();
    
            // Assert
            expect(result).toBe(JSON.stringify(currency));
        });
    });

    describe("copy", () => {
        test("should return a copy of the original object", () => {
            // Arrange
            const currency = new Currency({ keys: 145, refined: 42.55 });

            // Act
            const copy = currency.copy().json();
            const { keys, refined } = currency.json();

            // Assert
            expect(keys).toBe(copy.keys);
            expect(refined).toBe(copy.refined);
        });
    });

    describe("json", () => {
        test("should return the number of keys", () => {
            // Arrange
            const currency = new Currency({ keys: 14 });

            // Act
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(14);
            expect(result.refined).toBe(0);
        });

        test("should return the number of refined", () => {
            // Arrange
            const currency = new Currency({ refined: 54.55 });

            // Act
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(0);
            expect(result.refined).toBe(54.55);
        });

        test("should return the number of keys and refined", () => {
            // Arrange
            const currency = new Currency({ keys: 4, refined: 32.77 });

            // Act
            const result = currency.json();

            // Assert
            expect(result.keys).toBe(4);
            expect(result.refined).toBe(32.77);
        });
    });
});
