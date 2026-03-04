/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  endOfLine: 'auto',
  bracketSameLine: true,
  singleQuote: true,
  bracketSpacing: true,
  semi: true,
  plugins: ['prettier-plugin-tailwindcss'],
};

export default config;
