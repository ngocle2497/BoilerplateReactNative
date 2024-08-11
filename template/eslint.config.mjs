import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import _import from 'eslint-plugin-import';
import _sortKeysFix from 'eslint-plugin-sort-keys-fix';

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    '@react-native',
  ),
  {
    languageOptions: {
      ecmaVersion: 5,
      parser: tsParser,
      sourceType: 'module',
    },

    plugins: {
      import: fixupPluginRules(_import),
      sortKeysFix: fixupPluginRules(_sortKeysFix),
    },

    rules: {
      '@typescript-eslint/ban-ts-comment': 2,
      '@typescript-eslint/explicit-module-boundary-types': 0,
      '@typescript-eslint/indent': 0,
      '@typescript-eslint/no-empty-function': 1,

      '@typescript-eslint/no-explicit-any': 1,
      camelcase: 0,
      'comma-dangle': 0,
      'for-direction': 2,
      'import/default': 0,
      'import/extensions': [
        'error',
        'never',
        {
          svg: 'always',
        },
      ],

      'import/named': 0,

      'import/namespace': 0,
      'import/no-anonymous-default-export': [
        'error',
        {
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowArray: true,
          allowArrowFunction: false,
          allowCallExpression: true,
          allowLiteral: false,
          allowNew: false,
          allowObject: false,
        },
      ],
      'import/no-deprecated': 0,
      'import/no-duplicates': 2,
      'import/no-extraneous-dependencies': 2,
      'import/no-named-as-default': 0,

      'import/no-named-as-default-member': 0,

      'import/no-unused-modules': 0,
      'import/no-useless-path-segments': 2,
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },

          groups: [
            'internal',
            'external',
            'builtin',
            'index',
            'sibling',
            'parent',
          ],

          'newlines-between': 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react+(|-native)',
              position: 'before',
            },
            {
              group: 'external',
              pattern: 'react+(|-*)',
              position: 'before',
            },
          ],

          pathGroupsExcludedImportTypes: [],
        },
      ],
      'import/prefer-default-export': 0,
      'jest/no-identical-title': 2,
      'jest/valid-expect': 2,
      'max-params': ['error', 3],
      'no-cond-assign': 2,
      'no-constant-condition': 2,
      'no-dupe-args': 2,
      'no-dupe-else-if': 2,
      'no-dupe-keys': 2,

      'no-duplicate-imports': 2,

      'no-empty-pattern': 1,

      'no-ex-assign': 2,

      'no-fallthrough': 2,

      'no-import-assign': 2,
      'no-inline-comments': 2,
      'no-nested-ternary': 2,
      'no-promise-executor-return': 2,
      'no-shadow': 0,
      'no-undef': 'off',
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: 'return',
          prev: '*',
        },
        {
          blankLine: 'always',
          next: 'export',
          prev: '*',
        },
        {
          blankLine: 'always',
          next: ['case'],
          prev: 'break',
        },
        {
          blankLine: 'always',
          next: 'default',
          prev: '*',
        },
        {
          blankLine: 'always',
          next: ['const', 'function', 'iife'],
          prev: ['import', 'cjs-import'],
        },
        {
          blankLine: 'always',

          next: '*',

          prev: [
            'default',
            'block-like',
            'cjs-import',
            'cjs-export',
            'const',
            'function',
            'iife',
            'expression',
          ],
        },
      ],
      'prefer-destructuring': 2,
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
        },
      ],
      quotes: [
        'error',
        'single',
        {
          avoidEscape: true,
        },
      ],
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useDidMount)',
        },
      ],
      'react-hooks/rules-of-hooks': 1,
      'react-native/no-color-literals': 0,

      'react-native/no-inline-styles': 0,

      'react-native/no-raw-text': 0,
      'react-native/no-unused-styles': 2,
      'react-native/split-platform-components': 2,
      'react/jsx-filename-extension': [
        'error',
        {
          extensions: ['.tsx'],
        },
      ],
      'sort-imports': [
        'error',
        {
          ignoreCase: true,
          ignoreDeclarationSort: true,
        },
      ],
      'sort-keys': [
        'error',
        'asc',
        { caseSensitive: true, minKeys: 2, natural: false },
      ],

      'sortKeysFix/sort-keys-fix': 'warn',
    },

    settings: {
      'import/resolver': {
        node: {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.d.ts',
            '.android.js',
            '.android.jsx',
            '.android.ts',
            '.android.tsx',
            '.ios.js',
            '.ios.jsx',
            '.ios.ts',
            '.ios.tsx',
            '.web.js',
            '.web.jsx',
            '.web.ts',
            '.web.tsx',
          ],
        },
      },
    },
  },
];
