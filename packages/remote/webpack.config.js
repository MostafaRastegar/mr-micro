const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const { dependencies } = require("./package.json");

const federationConfig = {
  name: "Remote",
  filename: "remoteEntry.js",
  exposes: {
    "./Button": "./src/components/Button",
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
    main: path.join(__dirname, "./src/index.js"),
  },
  // cache: false,

  mode: "development",
  // devtool: "source-map",
  // optimization: {
  //   minimize: false,
  // },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 4000,
    hot: true,
    // com
    press: true,
    historyApiFallback: true,
  },
  output: {
    publicPath: "auto",
  },
  infrastructureLogging: {
    level: "log",
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/, // add |ts
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new FederatedTypesPlugin({
      federationConfig,
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
