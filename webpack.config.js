const crypto = require("crypto");
const path = require("path");
const fs = require('fs');
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries");
const ReplaceInFileWebpackPlugin = require("replace-in-file-webpack-plugin");

const isDev = process.env.NODE_ENV !== 'production';
// uniqueId is an RFC 4122-compliant v4 UUID
// using file-hashes would be preferable, but is difficult because the hashes
//  are not known until after webpack completes.  This solution is adequate,
//  and keeps all the logic neatly together in webpack/node.
const uniqueId = ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(
    /[018]/g, b => (b ^ crypto.rng(1)[0] % 16 >> b / 4).toString(16));

module.exports = {
  entry: {
    bundle: ["script-loader!mirador/dist/mirador.min", "./js/index.jsx"],
    main: "./src/assets/main.scss"
  },
  mode: isDev ? "development" : "production",
  output: {
    path: path.resolve(__dirname, "_site/assets"),
    filename: isDev ? "[name].js" : `[name].${uniqueId}.js`
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
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
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
              outputPath: "fonts/", // where the fonts will go
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
    new Dotenv(),
    new FixStyleOnlyEntriesPlugin(),
    new MiniCssExtractPlugin({
      filename: isDev ? "[name].css" : `[name].${uniqueId}.css`
    }),
    ...(isDev ? [] : [
      new ReplaceInFileWebpackPlugin([
        {
          dir: path.resolve(__dirname, "_site"),
          test: /\.html$/,
          rules: [
            {
              search: "main.css",
              replace: `main.${uniqueId}.css`
            },
            {
              search: "bundle.js",
              replace: `bundle.${uniqueId}.js`
            }
          ]
        }
      ]),
      // quick hand-rolled plugin to set permissions correctly.
      //  (there are a million solutions for this, but having it
      //   all done together in webpack is neat.)
      // Note: this style of `Tapable.plugin` raises a deprecation
      //  warning -- it will need to be reimplemented if this
      //  project ever migrates to (as yet unreleased) Webpack 5.
      function() {
        this.plugin("done", () => {
          let setPerms = dir => {
            fs.readdirSync(dir).forEach(f => {
              let _path = path.join(dir, f);
              let isDirectory = fs.statSync(_path).isDirectory();
              if (isDirectory) {
                fs.chmodSync(_path, 0o755);
                setPerms(_path);
              } else {
                fs.chmodSync(_path, 0o644);
              }
            });
          };
          setPerms(path.resolve(__dirname, "_site"));
        });
      }
    ])
  ]
};
