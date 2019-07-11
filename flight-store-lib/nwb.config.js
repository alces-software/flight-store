const dotenv = require('dotenv');
const webpack = require('webpack');

// Similar to the method used by create-react-app.  Differences are:
//
//  - create-react-app supports multipe dot env files
//  - create-react-app supports loading variables defined outside of the
//    dotenv file, e.g., exported directly from bash.
const clientEnv = Object.keys(dotenv.config().parsed)
  .filter(key => /^REACT_APP_/i.test(key))
  .reduce(
    (env, key) => {
      env[key] = process.env[key];
      return env;
    },
    {
      // Useful for determining whether we’re running in production mode.
      // Most importantly, it switches React into the correct mode.
      NODE_ENV: process.env.NODE_ENV || 'development',
    }
  );

module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'FlightStore',
      externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'flight-reactware': 'FlightReactware',
      }
    }
  },
  webpack: {
    html: {
      template: 'demo/src/index.html'
    },
    extra: {
      plugins: [
        new webpack.EnvironmentPlugin({
          ...clientEnv
        }),
      ]
    }
  }
}
