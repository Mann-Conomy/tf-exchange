# tf-exchange

A collection of Node.js classes for easy conversion between TF2 currencies.

[![npm version](https://img.shields.io/npm/v/@mann-conomy/tf-exchange?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/tf-exchange)
[![npm downloads](https://img.shields.io/npm/d18m/@mann-conomy/tf-exchange?style=flat-square&logo=npm)](https://npmjs.com/package/@mann-conomy/tf-exchange)
[![Node.js version](https://img.shields.io/node/v/@mann-conomy/tf-exchange?style=flat-square&logo=nodedotjs)](https://nodejs.org/en/about/releases/)
[![GitHub actions](https://img.shields.io/github/actions/workflow/status/Mann-Conomy/tf-exchange/test.yml?branch=main&style=flat-square&logo=github&label=test)](https://github.com/Mann-Conomy/tf-exchange/blob/main/.github/workflows/test.yml)
[![GitHub license](https://img.shields.io/github/license/Mann-Conomy/tf-exchange?style=flat-square&logo=github)](https://github.com/Mann-Conomy/tf-exchange/blob/main/LICENSE)

## Installation

Using [npm](https://www.npmjs.com/package/@mann-conomy/tf-exchange):

```bash
$ npm install @mann-conomy/tf-exchange
```

Using [yarn](https://yarnpkg.com/package/@mann-conomy/tf-exchange):

```bash
$ yarn add @mann-conomy/tf-exchange
```

## Testing

Using [npm](https://docs.npmjs.com/cli/v8/commands/npm-run-script):
```bash
$ npm test
```

Using [yarn](https://classic.yarnpkg.com/lang/en/docs/cli/run/):
```bash
$ yarn test
```

## Examples

Easily convert between TF2 currencies with a single exchange rate for all arithmetic operations.

```js
try {
    const calculator = new Calculator({ exchange: 66.88 });

    const first = new Currency({ keys: 5, refined: 23.88 });
    const second = new Currency({ keys: 2, refined: 47.33 });
    
    const currency = calculator.subtract(first, second);

    console.log(currency.toString()); // 2 keys, 43.44 refined
} catch (error) {
    console.error("Error adding the two currencies", error.message);
}
```

Some more examples are available in the [examples](https://github.com/Mann-Conomy/tf-exchange/tree/main/examples) and [test](https://github.com/Mann-Conomy/tf-exchange/tree/main/test) directories.

## Documentation

See the [Wiki pages](https://github.com/Mann-Conomy/tf-exchange/wiki) for further documentation.

## License

[MIT](LICENSE)

Copyright 2024, The Mann-Conomy Project
