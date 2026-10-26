/* Minimal ESLint config so `npm run lint` works out of the box. */
module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  extends: ['eslint:recommended'],
  ignorePatterns: ['dist', 'node_modules'],
  rules: {
    // JSX usage of imported components/motion tags isn't tracked without the React plugin
    'no-unused-vars': ['warn', { varsIgnorePattern: '^(React|motion|[A-Z])', argsIgnorePattern: '^(_|[A-Z])' }],
  },
};
