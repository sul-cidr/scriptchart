const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: ["script-loader!mirador/dist/mirador.min", "./js/index.jsx"],
  mode: "development",
  output: {
    path: path.resolve(__dirname, "src/assets"),
    filename: "bundle.js"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ["@babel/react", "@babel/env"]
        }
      },
      {
        test: /\.(css|less|scss)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader"
            /*options: {
              limit: 8192
            }*/
          }
        ]
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "assets/fonts/", // where the fonts will go
              publicPath: "fonts/", // override the default path
              useRelativePath: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
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
    ),
    new Dotenv()
  ]
};
