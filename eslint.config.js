import eslintPluginAstro from 'eslint-plugin-astro'
import astroEslintParser from 'astro-eslint-parser'
import typescriptEslintParser from '@typescript-eslint/parser'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs['jsx-a11y-recommended'],
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': ['warn'],
    },
  },
  {
    files: ['**/*.astro'],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: typescriptEslintParser,
        extraFileExtensions: ['.astro'],
      },
    },
    rules: {
      'astro/no-set-html-directive': 'error',
    },
  },
  {
    ignores: ['dist', 'node_modules'],
  },
]
