const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");

module.exports = {
  entry: ["script-loader!mirador/dist/mirador.min", "./js/index.jsx"],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    path: __dirname + "/src/assets",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(
      [
        {
          from: "node_modules/mirador/dist/css/*",
          to: "../mirador/css",
          flatten: true
        },
        {
          from: "node_modules/mirador/dist/fonts/*",
          to: "../mirador/fonts",
          flatten: true
        },
        {
          from: "node_modules/mirador/dist/images/*",
          to: "../mirador/images",
          flatten: true
        },
        {
          from: "node_modules/mirador/dist/locales/en/translation.json",
          to: "../mirador/locales/en",
          flatten: true
        }
      ],
      { copyUnmodified: true }
    )
  ]
};
