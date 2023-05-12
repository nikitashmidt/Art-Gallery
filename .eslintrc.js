module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    React: 'readonly',
    JSX: 'readonly',
  },
  extends: ['airbnb', 'airbnb-typescript', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'react', 'prettier', 'import'],
  rules: {
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'import/no-anonymous-default-export': 0,
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: ['**/*.stories.*', '**/.storybook/**/*.*'],
        peerDependencies: true,
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/require-default-props': 0,
    'react/function-component-definition': 0,
    'prettier/prettier': [1, { endOfLine: 'auto' }],
  },
};