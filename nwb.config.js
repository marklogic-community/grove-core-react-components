/* global module */

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'MuirCoreReactComponents',
      externals: {
        react: 'React'
      }
    }
  },
  karma: {
    testContext: 'tests/setupTests.js'
  }
};
