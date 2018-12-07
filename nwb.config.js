/* global module */

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'GroveCoreReactComponents',
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-router': 'ReactRouter'
      }
    }
  },
  karma: {
    testContext: 'tests/setupTests.js'
  }
};
