module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  plugins: ['unused-imports', '@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
  ],
  rules: {
    'no-console': 'off', //consoleを許容
    'unused-imports/no-unused-imports': 'error',
    'no-var': 'error', // varは禁止
    'no-extra-semi': 'warn', //余分なセミコロンは禁止(文末に ;; とか)
  },
};
