const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest, GenerateSW } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      // Insert HtmlWebPackPlugin here
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "JATE",
      }),
      new MiniCssExtractPlugin(),
      new WebpackPwaManifest({
        name: "A Short Text Editing Application",
        short_name: "ASTEA",
        description: "A web app you can use to edit text. Can be used offline!",
        background_color: "#ffffff",
        start_url: "/",
        publicPath: "/",
        crossorigin: "anonymous",
        fingerprints: false,
        icons: [
          {
            src: path.resolve("./src/images/logo.png"),
            sizes: [96, 128, 256, 384, 512],
            destination: path.join("assets", "icons"),
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
      new GenerateSW(),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
