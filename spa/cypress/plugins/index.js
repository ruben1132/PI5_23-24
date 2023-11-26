const wp = require('@cypress/webpack-preprocessor');
const ts = require('typescript');

module.exports = (on, config) => {
  const options = {
    webpackOptions: {
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
      },
      module: {
        rules: [
          {
            test: /\.(ts|tsx)$/,
            loader: 'ts-loader',
            options: { transpileOnly: true },
          },
        ],
      },
    },
    watchOptions: {},
  };

  on('file:preprocessor', wp(options));

  return Object.assign({}, config, {
    fixturesFolder: 'tests/e2e/fixtures',
    integrationFolder: 'tests/e2e/specs',
    screenshotsFolder: 'tests/e2e/screenshots',
    videosFolder: 'tests/e2e/videos',
  });
};
