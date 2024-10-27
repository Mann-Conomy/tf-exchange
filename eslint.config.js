const tseslint = require("typescript-eslint");
const eslint = require("@mann-conomy/typescript-eslint-config");

module.exports = tseslint.config({
    extends: [
        ...eslint
    ],
    ignores: [
        "jest.d.ts",
        "dist/**/*",
        "test/**/*.ts",
        "examples/*.js",
        "jest.setup.ts",
        "jest.config.ts",
        "eslint.config.js"
    ]
});
