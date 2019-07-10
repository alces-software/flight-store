module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FlightStore',
      externals: {
        react: 'React'
      }
    }
  }
}
