/* global module */

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MLTreehouse',
      externals: {
        react: 'React'
      }
    }
  },
  karma: {
    testContext: 'tests/setupTests.js'
  }
};
