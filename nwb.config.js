/* global module */

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'GroveCoreReactComponents',
      externals: {
        react: 'React'
      }
    }
  },
  karma: {
    testContext: 'tests/setupTests.js'
  }
};
