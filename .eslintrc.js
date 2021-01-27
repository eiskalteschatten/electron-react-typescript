module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'browser': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2020,
    'sourceType': 'module'
  },
  'plugins': [
    '@typescript-eslint',
    'promise'
  ],
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  'rules': {
    'indent': [
      'error',
      2,
      { 'SwitchCase': 1 }
    ],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-console': ['off'],
    'no-case-declarations': ['off'],
    'prefer-const': ['error'],
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': 'off',
    'promise/catch-or-return': 'error',
    'promise/param-names': 'error',
    'promise/no-return-wrap': 'error',
    'react/prop-types': 0,
    '@typescript-eslint/no-angle-bracket-type-assertion': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'no-public' }]
  },
  'overrides': [{
    'files': ['*.json'],
    'rules': {
      'quotes': ['error', 'double'],
      'semi': ['error', 'never']
    },
  },
  {
    'files': ['*.js'],
    'rules': {
      '@typescript-eslint/no-var-requires': ['off'],
      '@typescript-eslint/explicit-function-return-type': ['off']
    }
  }]
};
