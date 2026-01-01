import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import tseslint from 'typescript-eslint';

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  js.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.github/**',
    ],
    rules: {
      semi: 'warn',
      eqeqeq: 'warn',
      curly: 'warn',
    },
  },
];

export default eslintConfig;
