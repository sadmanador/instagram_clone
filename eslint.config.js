// Import the necessary configuration files and plugins
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  // 1. Global ignores for files and folders ESLint should not check
  {
    ignores: ['dist', 'node_modules', '.git', 'vite.config.ts'],
  },

  // 2. Base configuration for all JavaScript/TypeScript/JSX files
  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    // 3. Define the language options and environment
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },

    // 4. Define the plugins to be used
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@typescript-eslint': tseslint.plugin,
      'jsx-a11y': jsxA11y,
    },

    // 5. Extend from recommended configurations
    extends: [
      js.configs.recommended, // Base ESLint recommended rules
      ...tseslint.configs.recommended, // TypeScript-specific rules
      react.configs.recommended, // React recommended rules
      react.configs['jsx-runtime'], // React's new JSX transform
      reactHooks.configs.recommended, // React Hooks rules
      reactRefresh.configs.recommended, // Vite HMR rules
      jsxA11y.configs.recommended, // Accessibility rules
    ],

    // 6. Custom rules or overrides
    rules: {
      // Basic ESLint rules
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],

      // TypeScript-specific rules (often disable conflicting JS rules)
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': 'error',

      // React-specific rules
      'react/jsx-uses-react': 'off', // Not needed with React 17+ JSX transform
      'react/react-in-jsx-scope': 'off', // Not needed with React 17+ JSX transform

      // React Hooks rules (already handled by recommended)
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibility rules
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
    },

    // 7. Settings for plugins
    settings: {
      react: {
        version: 'detect', // Automatically detect the version of React
      },
    },
  },
];