import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import astroPlugin from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import globals from 'globals';

export default [
  // 1. Global ignores
  {
    ignores: [
      'node_modules/',
      'dist/',
      '.astro/',
      '**/*.d.ts',
      'eslint.config.mjs',
      'prettier.config.cjs',
      '.husky/',
      'src/db/dev.db*',
    ],
  },

  // 2. Base JS Recommended Config
  js.configs.recommended,

  // 3. Base TypeScript Config (using imported plugin)
  {
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      // Apply TS recommended rules manually if needed, or use a specific config object if provided by the plugin
      ...tsPlugin.configs['eslint-recommended'].overrides[0].rules, // Get base JS overrides
      ...tsPlugin.configs.recommended.rules,
    },
  },

  // 4. Astro Plugin Config
  {
    plugins: {
      astro: astroPlugin,
    },
    rules: {
       // Apply Astro recommended rules manually
      ...astroPlugin.configs.recommended.rules,
    }
  },

  // 5. Specific configuration for Astro files
  {
    files: ['**/*.astro'],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
        'astro/astro': true,
        es2020: true,
      },
      parser: astroParser, // Use astro-eslint-parser
      parserOptions: {
        parser: tsParser, // Use TS parser for script tags
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      'prettier/prettier': 'off',
      // Additional Astro-specific rule overrides can go here
    },
  },

  // 6. Configuration for TS files
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser, // Use the imported TS parser
      parserOptions: {
        project: null,
      },
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      // Ensure TS plugin rules apply correctly
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // 7. General Rules
  {
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  }
];
