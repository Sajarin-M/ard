/** @type {import('prettier').Config} */
const config = {
  jsxSingleQuote: true,
  singleQuote: true,
  semi: true,
  tabWidth: 2,
  trailingComma: 'all',
  printWidth: 100,
  bracketSameLine: false,
  useTabs: false,
  arrowParens: 'always',
  endOfLine: 'auto',
  plugins: [
    '@prettier/plugin-oxc',
    '@ianvs/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
  tailwindStylesheet: './src/styles.css',
  tailwindAttributes: ['className', '/.*ClassName/'],
  tailwindFunctions: ['clsx', 'cn', 'cva'],
  importOrder: [
    '^react-scan',
    '^~/hooks/use-react-scan',
    '^react',
    '<BUILT_IN_MODULES>',
    '<THIRD_PARTY_MODULES>',
    '^~/lib',
    '^~/context',
    '^~/hooks',
    '^~/components',
    '^~/assets',
    '^~/types',
    '^[.]',
    '^[./]',
    '^.+\\.css(\\?.*)?$',
  ],
};

export default config;
