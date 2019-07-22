const webpack = require('webpack');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FlightStore',
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      }
    }
  },
  webpack: {
    html: {
      template: 'demo/src/index.html'
    },
  },
  devServer: {
    host: 'store.alces-flight.lvh.me',
  },
}
