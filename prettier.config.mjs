/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions & import('@ianvs/prettier-plugin-sort-imports').PluginConfig} */
const config = {
  endOfLine: 'auto',
  bracketSameLine: true,
  singleQuote: true,
  bracketSpacing: true,
  semi: true,
  plugins: [
    'prettier-plugin-tailwindcss',
    '@ianvs/prettier-plugin-sort-imports',
  ],
  importOrder: [
    '.css$',
    '.jpg$',
    '',
    '<BUILTIN_MODULES>',
    '',
    '<THIRD_PARTY_MODULES>',
    '',
    '^@/env.mjs$',
    '^@/components/(.*)$',
    '^@/app/(.*)$',
    '^@/lib/(.*)$',
    '^[./]',
    '',
    '<TYPES>',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  importOrderTypeScriptVersion: '5.0.0',
};

export default config;
