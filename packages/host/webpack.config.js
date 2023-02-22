const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
// const { FederatedTypesPlugin } = require("@module-federation/typescript");

const dotenv = require("dotenv").config({
  path: path.join(__dirname, ".env"),
});
const { dependencies } = require("./package.json");
const federationConfig = {
  name: "Host",
  filename: "remoteEntry.js",

  remotes: {
    Remote: `Remote@${process.env.REMOTE_URL}/remoteEntry.js`,
  },
  shared: {
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
};
module.exports = {
  entry: {
    main: path.join(__dirname, "src/index"),
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 3000,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  infrastructureLogging: {
    level: "log",
  },
  output: {
    publicPath: "auto",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              "@babel/preset-react",
              "@babel/preset-env",
            ],
            // plugins: [["@babel/transform-runtime"]],
          },
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": dotenv.parsed,
    }),
    // new FederatedTypesPlugin({
    //   federationConfig,
    // }),
    new FederatedTypesPlugin({ federationConfig }),

    // new ModuleFederationPlugin(federationConfig),

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
