// eslint.config.mjs
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import astroEslintParser from 'astro-eslint-parser'; // Import the Astro parser
import * as tsParser from '@typescript-eslint/parser';     // Import the TypeScript parser

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([
  {
    // Base configuration for JavaScript/TypeScript files
    extends: compat.extends('eslint:recommended'),
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single']
    }
  },
  {
    // Override configuration for Astro files
    files: ['**/*.astro'], // Use a glob pattern for all .astro files
    languageOptions: {
      // Use the imported astroEslintParser instead of a string value.
      parser: astroEslintParser,
      parserOptions: {
        // For embedded scripts, use the TypeScript parser object.
        parser: tsParser,
        extraFileExtensions: ['.astro']
      }
    }
    // You can add Astro-specific rules here if desired.
  }
]);
