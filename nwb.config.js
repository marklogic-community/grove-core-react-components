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
  }
}
