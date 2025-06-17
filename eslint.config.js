import eslintPluginAstro from 'eslint-plugin-astro'
import astroEslintParser from 'astro-eslint-parser'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: ['.astro'],
      },
    },
    processor: 'astro/client-side-ts',
    rules: {
      'astro/no-set-html-directive': 'error',
      'prettier/prettier': 'warn',
    },
  },
  {
    files: ['**/*.tsx', '**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': 'warn',
    },
  },
  {
    files: ['**/*.astro/*.ts', '*.astro/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        sourceType: 'module',
        project: null,
      },
    },
    rules: {
      'prettier/prettier': 'off',
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
]
