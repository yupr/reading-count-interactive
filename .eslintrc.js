module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 13,
  },
  rules: {
    "no-console": "off", //consoleを許可しない
    "no-var": 2, // varは禁止
    "no-extra-semi": "warn", //余分なセミコロンは禁止(文末に ;; とか)
  },
};