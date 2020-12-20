module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:import/recommended'],
  overrides: [
    {
      files: ['**/*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: ['import', 'svelte3'],
  settings: {
    'svelte3/ignore-styles': ({ type }) => {
      if (type === 'text/scss') {
        return true
      }
      return false
    }
  }
}
