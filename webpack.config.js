const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/client.js',
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',    // where the fonts will go
            publicPath: '/bin/'       // override the default path
          }
        }]
      }
    ]
  },
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
