const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');


module.exports = {
  entry: [
    'script-loader!mirador/dist/mirador.min',
    './src/index.js'
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'node_modules/mirador/dist/css/*', to: 'mirador/css', flatten: true },
      { from: 'node_modules/mirador/dist/fonts/*', to: 'mirador/fonts', flatten: true },
      { from: 'node_modules/mirador/dist/images/*', to: 'mirador/images', flatten: true },
      { from: 'node_modules/mirador/dist/locales/en/translation.json', to: 'mirador/locales/en', flatten: true },
    ], { copyUnmodified: true }),
    new HtmlWebpackPlugin({
      title: "Mirador 2 + Webpack 4 + React 16",
      template: "./src/index.html"
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['mirador/css/mirador-combined.min.css'],
      append: true
    })
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
};
