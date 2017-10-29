const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'bin'),
    filename: 'client.bundle.js',
    publicPath: '/bin/'
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
  })
]
};
