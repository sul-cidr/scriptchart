const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin");
const path = require("path");

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
        test: /\.(css|less)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      },
      {
         test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
         use: [{
           loader: 'file-loader',
           options: {
             name: '[name].[ext]',
             outputPath: 'fonts/',    // where the fonts will go
             publicPath: '../'       // override the default path
           }
         }]
       }
    ]
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
