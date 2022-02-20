module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  plugins: ['unused-imports'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 13,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off', //consoleを許容
    'unused-imports/no-unused-imports': 'error',
    'no-var': 'error', // varは禁止
    'no-extra-semi': 'warn', //余分なセミコロンは禁止(文末に ;; とか)
  },
};
