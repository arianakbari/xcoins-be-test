module.exports = {
    root: true,
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "plugin:prettier/recommended",
    ],
    rules: {
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/ban-ts-comment": "off",
    },
    env: {
        node: true,
        es6: true,
    },
};
