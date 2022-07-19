module.exports = {
  endOfLine: 'auto',
  bracketSameLine: true,
  singleQuote: true,
  parser: 'typescript',
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.js',
};
