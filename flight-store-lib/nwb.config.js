const webpack = require('webpack');

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
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
