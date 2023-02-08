const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const { dependencies } = require("./package.json");

module.exports = {
  entry: {
    main: path.join(__dirname, "src/index"),
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: "http://localhost:3000/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              [
                "@babel/preset-react",
                {
                  runtime: "automatic",
                },
              ],
              "@babel/preset-env",
            ],
            plugins: [["@babel/transform-runtime"]],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed,
    }),
    new ModuleFederationPlugin({
      name: "Host",
      remotes: {
        Remote: `Remote@${process.env.REMOTE_URL}/remoteEntry.js`,
      },
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      title: "Webpack App",
      filename: "index.html",
      chunks: ["main"],
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  target: "web",
};
